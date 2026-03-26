import { _ as _export_sfc, u as useI18n, a as useLocalePath, b as useSwitchLocalePath, c as useAsyncData, q as queryContent, d as useHead, e as _sfc_main$A, f as __nuxt_component_0$1 } from './server.mjs';
import { useSSRContext, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
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
import 'property-information';

const _sfc_main$1 = {
  props: {
    pageUrl: {
      type: String,
      required: true
    },
    pageIdentifier: {
      type: String,
      required: true
    }
  },
  mounted() {
  },
  methods: {
    loadDisqus() {
      (function() {
        var d = void 0, s = d.createElement("script");
        s.src = "https://houedanou.disqus.com/embed.js";
        s.setAttribute("data-timestamp", +/* @__PURE__ */ new Date());
        (d.head || d.body).appendChild(s);
      })();
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ id: "disqus_thread" }, _attrs))}></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DisqusComments.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const DisqusComments = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "[...slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useI18n();
    useLocalePath();
    useSwitchLocalePath();
    const { data: article } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "article",
      () => queryContent(route.path).findOne()
    )), __temp = await __temp, __restore(), __temp);
    useHead({
      title: article.value.title,
      meta: [
        // Meta tags standards pour SEO
        { name: "description", content: article.value.description || "Description par d\xE9faut" },
        { name: "keywords", content: article.value.keywords || "" },
        // Open Graph tags (pour les partages sociaux)
        { property: "og:title", content: article.value.title },
        {
          property: "og:description",
          content: article.value.description || "Description par d\xE9faut"
        },
        { property: "og:url", content: `https://houedanou.com${route.path}` },
        { property: "og:image", content: `https://houedanou.com${article.value.image}` },
        { property: "og:site_name", content: "Jean-Luc Hou\xE9danou" },
        // Twitter Card tags
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: `https://houedanou.com${article.value.image}` },
        { name: "twitter:title", content: article.value.title },
        {
          name: "twitter:description",
          content: article.value.description || "Description par d\xE9faut"
        }
      ]
    });
    const currentUrl = `https://houedanou.com${route.path}`;
    function formatDate(createdAt) {
      if (createdAt) {
        const [day, month, year] = createdAt.split("-");
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });
      }
      return "Date inconnue";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentDoc = _sfc_main$A;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-wrapper" }, _attrs))} data-v-deaa9779>`);
      if (unref(article).image) {
        _push(`<div class="cover-image" style="${ssrRenderStyle({ backgroundImage: `url(${unref(article).image})` })}" data-v-deaa9779><h1 class="article-title" data-v-deaa9779>${ssrInterpolate(unref(article).title)}</h1></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<article class="article-container" data-v-deaa9779><header class="article-header" data-v-deaa9779><div class="article-meta" data-v-deaa9779><span class="article-date" data-v-deaa9779>${ssrInterpolate(formatDate(unref(article).createdAt))}</span></div>`);
      if (unref(article).summary) {
        _push(`<div class="article-summary" data-v-deaa9779><p data-v-deaa9779>${ssrInterpolate(unref(article).summary)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header><div class="article-content" data-v-deaa9779>`);
      _push(ssrRenderComponent(_component_ContentDoc, null, null, _parent));
      _push(`<div class="social-share" data-v-deaa9779><div class="sharethis-inline-share-buttons" data-v-deaa9779></div></div>`);
      _push(ssrRenderComponent(DisqusComments, {
        pageUrl: currentUrl,
        pageIdentifier: unref(article)._path
      }, null, _parent));
      _push(`<a href="https://houedanou.com" rel="dofollow" data-v-deaa9779>Jean-Luc Hou\xE9danou</a><br data-v-deaa9779><a target="_blank" href="https://jeanluchouedanou.blogspot.com/" data-v-deaa9779>Mes anciens articles</a></div><footer class="article-footer" data-v-deaa9779>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "back-to-articles"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("backToArticles"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("backToArticles")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</footer></article></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ____slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-deaa9779"]]);

export { ____slug_ as default };
//# sourceMappingURL=_...slug_-Dy0hUIGb.mjs.map
