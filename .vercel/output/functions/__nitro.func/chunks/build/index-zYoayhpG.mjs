import { _ as _export_sfc, a as useLocalePath, u as useI18n, c as useAsyncData, q as queryContent, f as __nuxt_component_0$1 } from './server.mjs';
import { useSSRContext, ref, withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass } from 'vue/server-renderer';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'consola/core';
import 'unified';
import 'mdast-util-to-string';
import 'micromark';
import 'unist-util-stringify-position';
import 'micromark-util-character';
import 'micromark-util-chunked';
import 'micromark-util-resolve-all';
import 'micromark-util-sanitize-uri';
import 'slugify';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'remark-emoji';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'detab';
import 'hast-util-to-string';
import 'github-slugger';
import 'feed';
import 'node:url';
import 'ipx';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'property-information';

const articlesPerPage = 6;
const _sfc_main$1 = {
  __name: "ArticleList",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const localePath = useLocalePath();
    const { locale, t } = useI18n();
    const currentPage = ref(1);
    const { data: articles } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "articles",
      () => queryContent(locale.value).find().then((articles2) => {
        return articles2.map((article) => {
          if (article.createdAt) {
            const [jour, mois, annee] = article.createdAt.split("-");
            article.timestamp = new Date(annee, mois - 1, jour).getTime();
          }
          return article;
        }).sort((a, b) => b.timestamp - a.timestamp);
      })
    )), __temp = await __temp, __restore(), __temp);
    const paginatedArticles = computed(() => {
      const start = (currentPage.value - 1) * articlesPerPage;
      const end = start + articlesPerPage;
      return articles.value.slice(start, end);
    });
    const totalPages = computed(() => Math.ceil(articles.value.length / articlesPerPage));
    function formatDate(createdAt) {
      if (createdAt) {
        const [jour, mois, annee] = createdAt.split("-");
        const date = new Date(annee, mois - 1, jour);
        return new Intl.DateTimeFormat("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric"
        }).format(date);
      }
      return "Date non disponible";
    }
    function getExcerpt(article) {
      const content = article.description || article._raw || "";
      return content.length > 150 ? content.slice(0, 150) + "..." : content;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-list is-flex flex-column align-items-center justify-center is-justify-content-center" }, _attrs))} data-v-e25b6e12><div class="article-list-container container" data-v-e25b6e12>`);
      if (paginatedArticles.value.length) {
        _push(`<div class="columns is-multiline" data-v-e25b6e12><!--[-->`);
        ssrRenderList(paginatedArticles.value, (article) => {
          var _a;
          _push(`<div class="is-4-desktop column is-4-desktop is-6-tablet is-12-mobile" data-v-e25b6e12><div class="article-item p-4 m-3" data-v-e25b6e12>`);
          if (article.image) {
            _push(`<div class="cover-image" style="${ssrRenderStyle({ backgroundImage: `url(${article.image})` })}" data-v-e25b6e12></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<br data-v-e25b6e12><h2 class="article-title" data-v-e25b6e12>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: unref(localePath)(article._path),
            class: "article-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(article.title)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(article.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</h2><span class="article-date" data-v-e25b6e12>${ssrInterpolate(formatDate(article.createdAt))}</span><p class="article-excerpt" data-v-e25b6e12>${(_a = getExcerpt(article)) != null ? _a : ""}</p>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: unref(localePath)(article._path),
            class: "read-more"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(_ctx.$t("readMore"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(_ctx.$t("readMore")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<p class="no-articles" data-v-e25b6e12>${ssrInterpolate(_ctx.$t("noArticles"))}</p>`);
      }
      _push(`<nav class="pagination is-centered" role="navigation" aria-label="pagination" data-v-e25b6e12><a class="pagination-previous"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-e25b6e12>${ssrInterpolate(_ctx.$t("previous"))}</a><a class="pagination-next"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-e25b6e12>${ssrInterpolate(_ctx.$t("next"))}</a><ul class="pagination-list" data-v-e25b6e12><!--[-->`);
      ssrRenderList(totalPages.value, (page) => {
        _push(`<li data-v-e25b6e12><a class="${ssrRenderClass([{ "is-current": page === currentPage.value }, "pagination-link"])}" data-v-e25b6e12>${ssrInterpolate(page)}</a></li>`);
      });
      _push(`<!--]--></ul></nav></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ArticleList.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e25b6e12"]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_ArticleList = __nuxt_component_0;
  _push(`<main${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_ArticleList, null, null, _parent));
  _push(`</main>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-zYoayhpG.mjs.map
