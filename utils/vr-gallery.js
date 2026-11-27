/**
 * Galerie VR des articles, adaptée de `portfolio-vr.js` du CV en ligne
 * (jhouedanou.github.io/Curriculum-vitae). Même principe : chaque panneau est
 * un canvas 2D plaqué sur un plan A-Frame, ce qui garde Figtree et les accents.
 *
 * `createVrGallery(options)` suppose qu'A-Frame est chargé (window.AFRAME,
 * window.THREE) et que la scène `#vr-scene` est dans la page.
 * Retourne { setFilter, select, destroy, cards, state }.
 */

// Charte du blog (assets/custom.scss).
const C = {
  bg: '#111522', surface: '#192236', paper: '#202b43', ink: '#f3eee5', muted: '#a8adbb',
  orange: '#c27a5b', orangeDark: '#e0a083',
  sage: '#8994e4', sageDark: '#b8beff',
  line: 'rgba(243, 238, 229, .16)', grid: 'rgba(137, 148, 228, .22)',
}
const SANS = '"Figtree", system-ui, sans-serif'
const MONO = '"JetBrains Mono", ui-monospace, Menlo, monospace'

// Géométrie de la galerie (valeurs du CV).
const RADIUS = 5.6 // distance des panneaux
const CARD = 1.9 // côté d'une carte, en mètres
const ROW_Y = [1.3, 3.3] // hauteur des deux rangées
const FIRST_ANGLE = 31 // les cartes commencent à ±31° de l'accueil
const STEP_ANGLE = 298 / 14 // écart entre deux colonnes
const WALK_RADIUS = 2.4 // zone où l'on peut marcher
export const VR_MAX_CARDS = 24 // deux rangées de 12 : fluide aussi sur téléphone

export function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export function createVrGallery({ scene, articles, filters, matches, texts, formatDate, onSelect }) {
  const { AFRAME, THREE } = window
  const $ = (id) => scene.querySelector(`#${id}`)
  const state = { filter: 'all', selected: null }
  const images = new Map() // chemin d'image -> HTMLImageElement chargé
  const cards = []
  const buttons = []
  let intro
  let detail

  // Garde la caméra dans la zone de marche (hors casque : en VR, le casque décide).
  if (!AFRAME.components['stay-inside']) {
    AFRAME.registerComponent('stay-inside', {
      schema: { radius: { default: WALK_RADIUS } },
      tick() {
        if (this.el.sceneEl.is('vr-mode')) return
        const p = this.el.object3D.position
        const d = Math.hypot(p.x, p.z)
        if (d > this.data.radius) { const k = this.data.radius / d; p.x *= k; p.z *= k }
        p.y = 1.6
      },
    })
  }

  // ── Outils de dessin ─────────────────────────────────────────────────
  function makeCanvas(w, h) {
    const cv = document.createElement('canvas')
    cv.width = w; cv.height = h
    return { cv, ctx: cv.getContext('2d') }
  }
  function spacing(ctx, px) { if ('letterSpacing' in ctx) ctx.letterSpacing = `${px}px` }
  function wrap(ctx, text, maxW, maxLines) {
    const words = String(text || '').split(/\s+/).filter(Boolean)
    const lines = []
    let line = ''
    for (let i = 0; i < words.length; i++) {
      const test = line ? `${line} ${words[i]}` : words[i]
      if (ctx.measureText(test).width <= maxW || !line) { line = test; continue }
      lines.push(line); line = words[i]
      if (lines.length === maxLines) break
    }
    if (lines.length < maxLines && line) lines.push(line)
    const used = lines.join(' ').split(/\s+/).length
    if (used < words.length && lines.length) {
      let last = lines[lines.length - 1]
      while (last && ctx.measureText(`${last}…`).width > maxW) last = last.slice(0, -1)
      lines[lines.length - 1] = `${last.replace(/[\s,;:·-]+$/, '')}…`
    }
    return lines
  }
  function paragraph(ctx, text, x, y, maxW, lineH, maxLines) {
    const lines = wrap(ctx, text, maxW, maxLines)
    lines.forEach((l, i) => ctx.fillText(l, x, y + i * lineH))
    return y + lines.length * lineH
  }
  function cover(ctx, img, x, y, w, h) {
    const s = Math.max(w / img.naturalWidth, h / img.naturalHeight)
    const sw = w / s
    const sh = h / s
    ctx.drawImage(img, (img.naturalWidth - sw) / 2, (img.naturalHeight - sh) / 2, sw, sh, x, y, w, h)
  }
  function panelBackground(ctx, w, h, from = C.surface, to = C.bg) {
    const g = ctx.createLinearGradient(0, 0, w, h)
    g.addColorStop(0, from); g.addColorStop(1, to)
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h)
  }
  function border(ctx, w, h, color, lw) {
    ctx.strokeStyle = color || C.line; ctx.lineWidth = lw || 2
    ctx.strokeRect(ctx.lineWidth / 2, ctx.lineWidth / 2, w - ctx.lineWidth, h - ctx.lineWidth)
  }
  function gridPattern(ctx, x, y, w, h, cell) {
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip()
    ctx.strokeStyle = 'rgba(137, 148, 228, .16)'; ctx.lineWidth = 1
    for (let gx = x; gx <= x + w; gx += cell) { ctx.beginPath(); ctx.moveTo(gx, y); ctx.lineTo(gx, y + h); ctx.stroke() }
    for (let gy = y; gy <= y + h; gy += cell) { ctx.beginPath(); ctx.moveTo(x, gy); ctx.lineTo(x + w, gy); ctx.stroke() }
    ctx.restore()
  }

  // ── Panneaux 3D ──────────────────────────────────────────────────────
  function addPanel(parent, cv, w, h, clickable) {
    const el = document.createElement('a-entity')
    if (clickable) el.classList.add('clickable')
    parent.appendChild(el)
    const tex = new THREE.CanvasTexture(cv)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex }))
    el.setObject3D('mesh', mesh)
    return { el, tex, mesh }
  }
  function addOutline(panel, w, h, color) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w + 0.06, h + 0.06), new THREE.MeshBasicMaterial({ color }))
    m.position.z = -0.01; m.visible = false
    panel.el.object3D.add(m)
    return m
  }
  function place(el, angleDeg, radius, y, tiltDeg) {
    const a = THREE.MathUtils.degToRad(angleDeg)
    el.object3D.position.set(radius * Math.sin(a), y, -radius * Math.cos(a))
    el.object3D.rotation.set(THREE.MathUtils.degToRad(tiltDeg || 0), -a, 0, 'YXZ')
  }
  function pointer(on) { if (scene.canvas) scene.canvas.classList.toggle('is-pointing', on) }

  function imageFor(article, redraw) {
    if (!article?.image) return null
    const cached = images.get(article.image)
    if (cached) return cached.complete && cached.naturalWidth ? cached : null
    const img = new Image()
    img.onload = redraw
    img.src = article.image
    images.set(article.image, img)
    return null
  }

  // ── Carte d'un article (640 × 640) ───────────────────────────────────
  function drawCard(card) {
    const { ctx, article } = card
    const W = 640
    const TH = 400
    if (!article) return
    panelBackground(ctx, W, W)
    const img = imageFor(article, () => { if (card.article === article) drawCard(card) })
    if (img) cover(ctx, img, 0, 0, W, TH)
    else { ctx.fillStyle = C.paper; ctx.fillRect(0, 0, W, TH); gridPattern(ctx, 0, 0, W, TH, 40) }
    ctx.fillStyle = C.line; ctx.fillRect(0, TH, W, 2)

    ctx.fillStyle = C.sageDark; ctx.font = `600 19px ${MONO}`; spacing(ctx, 2)
    const meta = [formatDate(article.createdAt), article.readingTime ? `${article.readingTime} ${texts.readingTime}` : '']
      .filter(Boolean).join(' · ')
    ctx.fillText(meta.toUpperCase(), 34, 446)

    ctx.fillStyle = C.ink; ctx.font = `600 38px ${SANS}`; spacing(ctx, -1.5)
    paragraph(ctx, article.title, 34, 500, 572, 44, 3)
    border(ctx, W, W)
    card.panel.tex.needsUpdate = true
  }

  // ── Panneau d'accueil (1440 × 960) : le blog, pas l'auteur en vedette ─
  function drawIntro() {
    const { ctx } = intro
    const W = 1440
    const H = 960
    panelBackground(ctx, W, H, C.paper, C.surface)
    gridPattern(ctx, 0, 0, W, H, 72)
    const x = 110
    const maxW = W - 220
    ctx.fillStyle = C.sageDark; ctx.font = `600 28px ${MONO}`; spacing(ctx, 4)
    ctx.fillText(texts.kicker.toUpperCase(), x, 250)
    ctx.fillStyle = C.ink; ctx.font = `600 104px ${SANS}`; spacing(ctx, -4)
    let y = paragraph(ctx, texts.title, x, 380, maxW, 110, 2)
    ctx.fillStyle = C.muted; ctx.font = `400 40px ${SANS}`; spacing(ctx, 0)
    y = paragraph(ctx, texts.lede, x, y + 10, maxW, 58, 3)
    ctx.fillStyle = C.line; ctx.fillRect(x, 760, maxW, 2)
    ctx.fillStyle = C.orangeDark; ctx.font = `600 26px ${MONO}`; spacing(ctx, 2)
    ctx.fillText(texts.lookAround.toUpperCase(), x, 824)
    ctx.fillStyle = C.muted
    ctx.fillText(`${articles.length} ${texts.articles.toUpperCase()}`, x, 868)
    border(ctx, W, H)
    intro.panel.tex.needsUpdate = true
  }

  // ── Bouton de la console (320 × 104) ─────────────────────────────────
  function drawButton(btn) {
    const { ctx } = btn
    const W = 320
    const H = 104
    const active = btn.filter === state.filter
    ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H)
    ctx.fillStyle = active ? 'rgba(137, 148, 228, .30)' : C.surface
    ctx.fillRect(0, 0, W, H)
    border(ctx, W, H, active || btn.hover ? C.sage : C.line, active || btn.hover ? 5 : 2)
    ctx.fillStyle = active ? C.sageDark : (btn.hover ? C.ink : C.muted)
    ctx.font = `600 30px ${SANS}`; spacing(ctx, 0); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText(wrap(ctx, btn.label, W - 30, 1)[0] || '', W / 2, H / 2 + 2)
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'
    btn.panel.tex.needsUpdate = true
  }

  // ── Fiche dans la scène, pour le casque (1280 × 880) ─────────────────
  function drawDetail(card) {
    const { ctx } = detail
    const article = card.article
    const W = 1280
    const H = 880
    panelBackground(ctx, W, H, C.paper, C.surface)
    const lx = 56
    const lw = 520
    const img = imageFor(article, () => { if (state.selected === card) drawDetail(card) })
    if (img) cover(ctx, img, lx, 60, lw, 325)
    else { ctx.fillStyle = C.surface; ctx.fillRect(lx, 60, lw, 325); gridPattern(ctx, lx, 60, lw, 325, 40) }
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.strokeRect(lx, 60, lw, 325)

    const x = 640
    const mw = 584
    ctx.fillStyle = C.sageDark; ctx.font = `600 20px ${MONO}`; spacing(ctx, 2)
    ctx.fillText(formatDate(article.createdAt).toUpperCase(), x, 86)
    ctx.fillStyle = C.ink; ctx.font = `600 50px ${SANS}`; spacing(ctx, -2)
    const y = paragraph(ctx, article.title, x, 150, mw, 56, 4)
    ctx.fillStyle = C.muted; ctx.font = `400 27px ${SANS}`; spacing(ctx, 0)
    paragraph(ctx, article.description, x, y + 26, mw, 38, 8)

    ctx.fillStyle = C.line; ctx.fillRect(56, H - 78, W - 112, 2)
    ctx.fillStyle = C.muted; ctx.font = `600 19px ${MONO}`; spacing(ctx, 2)
    ctx.fillText(texts.clickClose.toUpperCase(), 56, H - 36)
    border(ctx, W, H, C.sage, 3)
    detail.panel.tex.needsUpdate = true
  }

  // ── Décor : sol quadrillé, anneaux, points lumineux ──────────────────
  function buildFloor(root) {
    const c = makeCanvas(128, 128)
    c.ctx.fillStyle = C.bg; c.ctx.fillRect(0, 0, 128, 128)
    c.ctx.fillStyle = C.grid; c.ctx.fillRect(0, 0, 128, 2); c.ctx.fillRect(0, 0, 2, 128)
    const tex = new THREE.CanvasTexture(c.cv)
    tex.colorSpace = THREE.SRGBColorSpace; tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(80, 80); tex.anisotropy = 8
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.MeshBasicMaterial({ map: tex }))
    floor.rotation.x = -Math.PI / 2
    root.object3D.add(floor)

    for (const [radius, color, opacity] of [[WALK_RADIUS + 0.35, C.orange, 0.55], [RADIUS + 0.9, C.sage, 0.45]]) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(radius, radius + 0.035, 128),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide })
      )
      ring.rotation.x = -Math.PI / 2; ring.position.y = 0.01
      root.object3D.add(ring)
    }

    const pts = []
    for (let i = 0; i < 260; i++) {
      const a = Math.random() * Math.PI * 2
      const e = 0.25 + Math.random() * 1.2
      const d = 22 + Math.random() * 8
      pts.push(d * Math.cos(e) * Math.sin(a), d * Math.sin(e), d * Math.cos(e) * Math.cos(a))
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
    root.object3D.add(new THREE.Points(geo, new THREE.PointsMaterial({ color: C.sageDark, size: 0.09, transparent: true, opacity: 0.55, fog: false })))
  }

  // ── Assemblage ───────────────────────────────────────────────────────
  function refreshRaycasters() {
    scene.querySelectorAll('[raycaster]').forEach((el) => el.components.raycaster?.refreshObjects())
    scene.components.raycaster?.refreshObjects()
  }

  // Les 24 cartes sont réutilisées : un filtre change les articles qu'elles portent.
  function layout() {
    const shown = articles.filter((a) => matches(a, state.filter)).slice(0, VR_MAX_CARDS)
    cards.forEach((card, n) => {
      const article = shown[n] || null
      card.article = article
      card.panel.el.object3D.visible = Boolean(article)
      card.panel.el.classList.toggle('clickable', Boolean(article))
      if (!article) return
      // Colonnes de 2 cartes, posées en alternance à droite puis à gauche de l'accueil.
      const col = Math.floor(n / 2)
      const row = n % 2
      const side = col % 2 === 0 ? 1 : -1
      const rank = Math.floor(col / 2)
      card.angle = side * (FIRST_ANGLE + STEP_ANGLE * (rank + 0.5))
      place(card.panel.el, card.angle, RADIUS, ROW_Y[row], row === 1 ? 16 : 0)
      drawCard(card)
    })
    refreshRaycasters()
  }

  const inHeadset = () => scene.is('vr-mode')

  function showDetail(card) {
    if (!card || !inHeadset()) {
      detail.panel.el.object3D.visible = false
      detail.panel.el.classList.remove('clickable')
      return
    }
    drawDetail(card)
    place(detail.panel.el, card.angle, 3.3, 1.7, 0)
    detail.panel.el.object3D.visible = true
    detail.panel.el.classList.add('clickable')
  }

  function select(card) {
    if (state.selected) state.selected.outline.visible = false
    state.selected = card && card !== state.selected ? card : null
    if (state.selected) state.selected.outline.visible = true
    showDetail(state.selected)
    refreshRaycasters()
    // Hors casque, la fiche est affichée par la page (ArticleSheet).
    onSelect(state.selected && !inHeadset() ? state.selected.article : null)
  }

  function setFilter(filter) {
    state.filter = filter
    if (state.selected) select(null)
    buttons.forEach(drawButton)
    layout()
  }

  function hoverable(target, onEnter, onLeave) {
    target.addEventListener('mouseenter', () => { pointer(true); onEnter() })
    target.addEventListener('mouseleave', () => { pointer(false); onLeave() })
  }

  function build() {
    buildFloor($('vr-floor'))

    const ic = makeCanvas(1440, 960)
    intro = { ctx: ic.ctx, panel: addPanel($('vr-intro'), ic.cv, 3.6, 2.4, false) }
    place(intro.panel.el, 0, RADIUS, 2.2, 0)
    drawIntro()

    // Console des filtres, inclinée devant l'accueil.
    filters.forEach((f, i) => {
      const c = makeCanvas(320, 104)
      const btn = { ctx: c.ctx, hover: false, filter: f.id, label: f.label, panel: addPanel($('vr-controls'), c.cv, 0.56, 0.182, true) }
      place(btn.panel.el, (i - (filters.length - 1) / 2) * 10.4, 3.4, 0.8, -30)
      hoverable(btn.panel.el, () => { btn.hover = true; drawButton(btn) }, () => { btn.hover = false; drawButton(btn) })
      btn.panel.el.addEventListener('click', () => { setFilter(f.id); options.onFilter?.(f.id) })
      buttons.push(btn)
    })

    for (let i = 0; i < VR_MAX_CARDS; i++) {
      const c = makeCanvas(640, 640)
      const panel = addPanel($('vr-gallery'), c.cv, CARD, CARD, true)
      const card = { article: null, ctx: c.ctx, panel, angle: 0, outline: addOutline(panel, CARD, CARD, C.orange) }
      hoverable(panel.el,
        () => { card.outline.visible = true; panel.mesh.scale.setScalar(1.04) },
        () => { card.outline.visible = state.selected === card; panel.mesh.scale.setScalar(1) })
      panel.el.addEventListener('click', () => select(card))
      cards.push(card)
    }

    const dc = makeCanvas(1280, 880)
    detail = { ctx: dc.ctx, panel: addPanel($('vr-detail'), dc.cv, 2.7, 1.86, false) }
    detail.panel.el.object3D.visible = false
    detail.panel.el.addEventListener('click', () => select(null))
    scene.addEventListener('enter-vr', () => { onSelect(null); showDetail(state.selected) })
    scene.addEventListener('exit-vr', () => showDetail(null))

    buttons.forEach(drawButton)
    layout()
  }

  const options = { onFilter: null }
  build()

  return {
    state,
    cards,
    setFilter,
    select,
    // La page ferme sa fiche : on retire aussi le contour de la carte.
    clearSelection() { if (state.selected) select(null) },
    set onFilter(fn) { options.onFilter = fn },
  }
}
