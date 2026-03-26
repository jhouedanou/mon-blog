import { ssrRenderAttr, ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
import { useSSRContext, ref, computed, mergeProps } from 'vue';
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

const _sfc_main$1 = {
  __name: "YoutubePopup",
  __ssrInlineRender: true,
  props: {
    videoId: String,
    isOpen: Boolean
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const videoUrl = computed(() => {
      return `https://www.youtube.com/embed/${props.videoId}`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "youtube-modal" }, _attrs))} data-v-32855c1b><div class="modal-overlay" data-v-32855c1b></div><div class="modal-content" data-v-32855c1b><button class="close-button" data-v-32855c1b>\xD7</button><iframe${ssrRenderAttr("src", videoUrl.value)} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen data-v-32855c1b></iframe></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/YoutubePopup.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const YoutubePopup = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-32855c1b"]]);
const _sfc_main = {
  __name: "YoutubeLink",
  __ssrInlineRender: true,
  props: {
    videoId: String
  },
  setup(__props) {
    const isModalOpen = ref(false);
    const closeModal = () => {
      isModalOpen.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="youtube-thumbnail" data-v-877db959><img${ssrRenderAttr("src", `https://img.youtube.com/vi/${__props.videoId}/maxresdefault.jpg`)} alt="YouTube Thumbnail" data-v-877db959><div class="play-button" data-v-877db959></div></div>`);
      _push(ssrRenderComponent(YoutubePopup, {
        "video-id": __props.videoId,
        "is-open": isModalOpen.value,
        onClose: closeModal
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/YoutubeLink.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const YoutubeLink = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-877db959"]]);

export { YoutubeLink as default };
//# sourceMappingURL=YoutubeLink-DzfuEyFY.mjs.map
