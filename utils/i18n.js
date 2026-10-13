// Aides de routage bilingue.
//
// Les articles sont rangés par langue dans content/<locale>/<slug>.md et leur
// `_path` Nuxt Content (/fr/<slug>, /en/<slug>) est aussi leur URL publique.
// Le même slug désigne le même billet dans les deux langues.

export const LOCALE_CODES = ['fr', 'en']

const ARTICLE_PATH = /^\/(fr|en)\/([^/]+)\/?$/

/** Locale portée par un chemin d'article, ou null si ce n'est pas un article. */
export function articleLocaleFromPath(path) {
  const match = ARTICLE_PATH.exec(path || '')
  return match ? match[1] : null
}

/** Chemin du même article dans une autre langue, ou null si `path` n'est pas un article. */
export function translatedArticlePath(path, targetLocale) {
  const match = ARTICLE_PATH.exec(path || '')
  if (!match || !LOCALE_CODES.includes(targetLocale)) return null
  return `/${targetLocale}/${match[2]}`
}

// Langue du visiteur : français si son navigateur est en français, anglais
// sinon. Un clic sur FR / EN dans le sélecteur est mémorisé et l'emporte.
export const LANG_CHOICE_KEY = 'lang-choice'

/** Mémorise la langue choisie dans le sélecteur (sans effet si le stockage est bloqué). */
export function rememberLanguage(code) {
  try {
    localStorage.setItem(LANG_CHOICE_KEY, code)
  } catch {}
}

// Script inline exécuté dans <head>, avant le rendu : sur la première page de
// la visite, il envoie vers l'autre langue si ce n'est pas celle du visiteur.
// Le site est statique, la redirection ne peut donc se faire que côté client.
// Les robots ne sont jamais redirigés : Google doit continuer à indexer les
// deux langues. Les slugs d'articles commencent par une date (AAAAMMJJ) ;
// c'est ce qui distingue /en/<slug> d'une page comme /en/tags.
export const LANGUAGE_REDIRECT_SCRIPT = String.raw`(function(){try{
if(/bot|crawl|spider|slurp|mediapartners|lighthouse|headless|preview|facebookexternalhit|embedly|whatsapp|telegram|discord|slack|linkedin|twitter|skype|yandex|baidu|duckduck|semrush|ahrefs/i.test(navigator.userAgent))return;
var s=window.sessionStorage;if(s.getItem('lang-checked'))return;s.setItem('lang-checked','1');
var c=null;try{c=localStorage.getItem('${LANG_CHOICE_KEY}')}catch(e){}
var n=((navigator.languages&&navigator.languages[0])||navigator.language||'').toLowerCase();
var w=(c==='fr'||c==='en')?c:(n.indexOf('fr')===0?'fr':'en');
var p=location.pathname.replace(/\/+$/,'')||'/';
var cur=(p==='/en'||p.indexOf('/en/')===0)?'en':'fr';
if(cur===w)return;
var m=/^\/(fr|en)\/(\d{8}[^\/]*)$/.exec(p),t;
if(m)t='/'+w+'/'+m[2];else if(w==='en')t='/en'+(p==='/'?'':p);else t=p.slice(3)||'/';
location.replace(t+location.search+location.hash);
}catch(e){}})();`

/** Étiquette Intl pour formater les dates dans la langue courante. */
export function dateLocale(locale) {
  return locale === 'en' ? 'en-GB' : 'fr-FR'
}
