const sources = [
    {
        "context": {
            "name": "sitemap:urls",
            "description": "Set with the `sitemap.urls` config."
        },
        "urls": [],
        "sourceType": "user"
    },
    {
        "context": {
            "name": "@nuxt/content:urls",
            "description": "Generated from your markdown files.",
            "tips": [
                "Enabled because you're using `@nuxt/content` with `documentDriven: true`."
            ]
        },
        "fetch": "/__sitemap__/nuxt-content-urls.json",
        "sourceType": "app"
    },
    {
        "context": {
            "name": "nuxt:pages",
            "description": "Generated from your static page files.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:pages'] }`."
            ]
        },
        "urls": [
            {
                "loc": "/",
                "_sitemap": "fr-FR",
                "alternatives": [
                    {
                        "hreflang": "fr-FR",
                        "href": "/"
                    },
                    {
                        "hreflang": "en-US",
                        "href": "/en"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/"
                    }
                ]
            },
            {
                "loc": "/en",
                "_sitemap": "en-US",
                "alternatives": [
                    {
                        "hreflang": "fr-FR",
                        "href": "/"
                    },
                    {
                        "hreflang": "en-US",
                        "href": "/en"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/"
                    }
                ]
            },
            {
                "loc": "/sitemap.xml",
                "_sitemap": "fr-FR"
            },
            {
                "loc": "/index-sitemap.xml",
                "_sitemap": "fr-FR"
            },
            {
                "loc": "/fr-FR-sitemap.xml",
                "_sitemap": "fr-FR"
            },
            {
                "loc": "/en-US-sitemap.xml",
                "_sitemap": "fr-FR"
            }
        ],
        "sourceType": "app"
    },
    {
        "context": {
            "name": "nuxt:route-rules",
            "description": "Generated from your route rules config.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:route-rules'] }`."
            ]
        },
        "urls": [
            "/"
        ],
        "sourceType": "app"
    },
    {
        "context": {
            "name": "nuxt:prerender",
            "description": "Generated at build time when prerendering.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:prerender'] }`."
            ]
        },
        "urls": [
            {
                "loc": "/",
                "_sitemap": "fr-FR",
                "images": [
                    {
                        "loc": "https://houedanou.com/images/1837389.webp"
                    }
                ]
            }
        ],
        "sourceType": "app"
    }
];

export { sources };
//# sourceMappingURL=global-sources.mjs.map
