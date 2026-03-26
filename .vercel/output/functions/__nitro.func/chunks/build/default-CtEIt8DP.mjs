import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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

const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "layout" }, _attrs))} data-v-0f21497f><main class="main" data-v-0f21497f>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="footer" data-v-0f21497f><div class="footer-content" data-v-0f21497f><p data-v-0f21497f>\xA9 ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())}Jean Luc Houedanou. Tous droits r\xE9serv\xE9s.</p><div class="social-icons" data-v-0f21497f><a href="https://linkedin.com/in/votre-profil" target="_blank" rel="noopener noreferrer" data-v-0f21497f><i class="fab fa-linkedin" data-v-0f21497f></i></a><a href="https://facebook.com/votre-page" target="_blank" rel="noopener noreferrer" data-v-0f21497f><i class="fab fa-facebook" data-v-0f21497f></i></a><a href="https://github.com/votre-profil" target="_blank" rel="noopener noreferrer" data-v-0f21497f><i class="fab fa-github" data-v-0f21497f></i></a><a href="https://instagram.com/votre-profil" target="_blank" rel="noopener noreferrer" data-v-0f21497f><i class="fab fa-instagram" data-v-0f21497f></i></a><a href="https://twitter.com/votre-profil" target="_blank" rel="noopener noreferrer" data-v-0f21497f><i class="fab fa-twitter" data-v-0f21497f></i></a></div></div></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0f21497f"]]);

export { _default as default };
//# sourceMappingURL=default-CtEIt8DP.mjs.map
