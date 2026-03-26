#!/usr/bin/env python3
"""
Parcourt les fichiers Markdown dans content/fr/ (exclut _archived/),
parse la clé createdAt depuis le frontmatter et :
 - génère un ID basé sur la date (YYYYMMDD)
 - gère collisions en ajoutant -n (séquence)
 - met à jour la clé `id:` dans le frontmatter
 - renomme le fichier pour préfixer par le nouvel ID

Règles et hypothèses :
 - createdAt est au format DD-MM-YYYY ou YYYY-MM-DD (ou variant avec / ou -)
 - si createdAt est introuvable, le fichier est ignoré
 - nouvel id utilisé dans le frontmatter sera une chaîne de la forme 'YYYY-MM-DD' ou 'YYYY-MM-DD-n' en cas de collision
 - le préfixe de fichier sera YYYYMMDD ou YYYYMMDD-n

Usage: python3 scripts/rebase_ids_from_createdAt.py
"""

import re
import os
from datetime import datetime

ROOT = os.path.join(os.path.dirname(__file__), '..')
CONTENT_FR = os.path.join(ROOT, 'content', 'fr')
ARCHIVE_DIR = os.path.join(CONTENT_FR, '_archived')

md_files = [f for f in os.listdir(CONTENT_FR) if f.endswith('.md') and not f.startswith('_')]
md_files.sort()

id_counts = {}  # base_date_str (YYYYMMDD) -> count (for collisions)
renames = []

createdAt_regex = re.compile(r'^createdAt:\s*["\']?([^"\'\n]+)["\']?', re.IGNORECASE)
id_regex = re.compile(r'^id:\s*(.+)$', re.IGNORECASE)
frontmatter_delim = re.compile(r'^---\s*$')

def parse_date(createdAt_raw):
    s = createdAt_raw.strip()
    # Try common formats
    for fmt in ('%d-%m-%Y', '%Y-%m-%d', '%d/%m/%Y', '%Y/%m/%d', '%d.%m.%Y'):
        try:
            dt = datetime.strptime(s, fmt)
            return dt
        except Exception:
            pass
    # Try to extract numbers and guess
    m = re.search(r'(\d{2})[-/\.](\d{2})[-/\.](\d{4})', s)
    if m:
        d, mth, y = m.groups()
        try:
            return datetime.strptime(f"{d}-{mth}-{y}", '%d-%m-%Y')
        except Exception:
            pass
    return None

for fname in md_files:
    path = os.path.join(CONTENT_FR, fname)
    with open(path, 'r', encoding='utf-8') as h:
        lines = h.readlines()
    # locate frontmatter block: find first '---' line and next '---'
    if not lines:
        continue
    start_idx = None
    for i, ln in enumerate(lines[:200]):
        if frontmatter_delim.match(ln):
            start_idx = i
            break
    if start_idx is None:
        # no frontmatter
        #print(f"SKIP {fname}: no frontmatter start")
        continue
    second_idx = None
    for i in range(start_idx+1, min(len(lines), start_idx+300)):
        if frontmatter_delim.match(lines[i]):
            second_idx = i
            break
    if second_idx is None:
        #print(f"SKIP {fname}: no frontmatter end")
        continue
    fm_lines = lines[start_idx+1:second_idx]
    createdAt_val = None
    id_line_idx = None
    for idx, ln in enumerate(fm_lines):
        m = createdAt_regex.match(ln)
        if m:
            createdAt_val = m.group(1).strip()
        mi = id_regex.match(ln)
        if mi:
            id_line_idx = idx
    if not createdAt_val:
        print(f"SKIP {fname}: createdAt not found")
        continue
    dt = parse_date(createdAt_val)
    if not dt:
        print(f"SKIP {fname}: createdAt could not be parsed ({createdAt_val})")
        continue
    base_date = dt.strftime('%Y-%m-%d')
    base_prefix = dt.strftime('%Y%m%d')
    # manage collisions
    cnt = id_counts.get(base_prefix, 0) + 1
    id_counts[base_prefix] = cnt
    if cnt == 1:
        new_id = base_date
        prefix = base_prefix
    else:
        new_id = f"{base_date}-{cnt}"
        prefix = f"{base_prefix}-{cnt}"
    # update frontmatter: replace id line if exists, else insert after createdAt line
    new_fm_lines = fm_lines.copy()
    if id_line_idx is not None:
        # replace that line
        new_fm_lines[id_line_idx] = f"id: {new_id}\n"
    else:
        # insert after createdAt line
        inserted = False
        for idx, ln in enumerate(new_fm_lines):
            if createdAt_regex.match(ln):
                new_fm_lines.insert(idx+1, f"id: {new_id}\n")
                inserted = True
                break
        if not inserted:
            # append at end of frontmatter
            new_fm_lines.append(f"id: {new_id}\n")
    # reconstruct file
    new_lines = []
    new_lines.append(lines[0])
    new_lines.extend(new_fm_lines)
    new_lines.append(lines[second_idx])
    new_lines.extend(lines[second_idx+1:])
    # determine slug (original name without leading numeric prefix)
    # remove leading digits and optional hyphen
    slug = re.sub(r'^[0-9]+-?', '', fname)
    new_fname = f"{prefix}-{slug}"
    new_path = os.path.join(CONTENT_FR, new_fname)
    # if new_path equals current path, just overwrite content
    if os.path.abspath(new_path) == os.path.abspath(path):
        with open(path, 'w', encoding='utf-8') as h:
            h.writelines(new_lines)
        renames.append((fname, fname, new_id))
    else:
        # write new file then remove old
        if os.path.exists(new_path):
            print(f"Collision on filename {new_fname}, skipping")
            continue
        with open(new_path, 'w', encoding='utf-8') as h:
            h.writelines(new_lines)
        os.remove(path)
        renames.append((fname, new_fname, new_id))

# report
print('\nSummary:')
for old, new, nid in renames:
    print(f"{old} -> {new} (id={nid})")

print('\nDone.')
