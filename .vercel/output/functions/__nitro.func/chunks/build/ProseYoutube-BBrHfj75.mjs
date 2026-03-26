import { useSSRContext, ref, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "ProseYoutube",
  __ssrInlineRender: true,
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const isModalOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "youtube-container" }, _attrs))} data-v-8eead76c><div class="youtube-thumbnail" data-v-8eead76c><img${ssrRenderAttr("src", `https://img.youtube.com/vi/${__props.id}/maxresdefault.jpg`)} alt="YouTube Thumbnail" data-v-8eead76c><div class="play-button" data-v-8eead76c></div></div>`);
      if (isModalOpen.value) {
        _push(`<div class="youtube-modal" data-v-8eead76c><div class="modal-overlay" data-v-8eead76c></div><div class="modal-content" data-v-8eead76c><button class="close-button" data-v-8eead76c>\xD7</button><iframe${ssrRenderAttr("src", `https://www.youtube.com/embed/${__props.id}`)} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen data-v-8eead76c></iframe></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/ProseYoutube.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ProseYoutube = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8eead76c"]]);

export { ProseYoutube as default };
//# sourceMappingURL=ProseYoutube-BBrHfj75.mjs.map
