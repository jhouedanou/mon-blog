import { useSSRContext, ref, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderTeleport } from 'vue/server-renderer';
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
  __name: "Youtube",
  __ssrInlineRender: true,
  props: {
    video: String,
    title: String
  },
  setup(__props) {
    const showVideo = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "video-container" }, _attrs))} data-v-93f026d1><div class="video-wrapper" data-v-93f026d1><img${ssrRenderAttr("src", `https://img.youtube.com/vi/${__props.video}/sddefault.jpg`)}${ssrRenderAttr("alt", __props.title)} data-v-93f026d1><div class="play-overlay" data-v-93f026d1><span class="material-icons" data-v-93f026d1>play_circle</span></div></div>`);
      if (unref(showVideo)) {
        ssrRenderTeleport(_push, (_push2) => {
          _push2(`<div class="modal" data-v-93f026d1><div class="modal-content" data-v-93f026d1><iframe${ssrRenderAttr("src", `https://www.youtube.com/embed/${__props.video}?autoplay=1`)} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen data-v-93f026d1></iframe></div></div>`);
        }, "body", false, _parent);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/Youtube.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Youtube = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-93f026d1"]]);

export { Youtube as default };
//# sourceMappingURL=Youtube-BQhOyxrR.mjs.map
