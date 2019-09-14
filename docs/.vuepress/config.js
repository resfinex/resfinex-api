const { fs, path } = require('@vuepress/shared-utils')

module.exports = ctx => ({
  dest: './dist',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Resfinex',
      description: 'Resfinex Trading API Documentation'
    },
  },
  head: [
    ['link', { rel: 'icon', href: `/icon.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  // theme: '@vuepress/vue',
  themeConfig: {
    repo: 'resfinex/resfinex-api',
    editLinks: true,
    docsDir: 'docs',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: require('./nav/en'),
        sidebar: {
          '/guide/': getGuideSidebar('Guide', 'Advanced'),
        }
      },
    }
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }],
    ['@vuepress/medium-zoom', true],
    ['@vuepress/google-analytics', {
      ga: 'UA-143758952-1'
    }],
    ['container', {
      type: 'vue',
      before: '<pre class="vue-container"><code>',
      after: '</code></pre>',
    }],
    ['container', {
      type: 'upgrade',
      before: info => `<UpgradePath title="${info}">`,
      after: '</UpgradePath>',
    }],
    ['container', {
      type: 'method',
      before: info => `<div class="request ${info}"> `,
      after: '</div>',
    }],
    'tabs'
  ],
  extraWatchFiles: [
    '.vuepress/nav/en.js',
  ]
})


function getGuideSidebar () {
  return [
    {
      title: "Introduction",
      collapsable: false,
      children: [
        'introduction',
        'changelog',
      ]
    },
    {
      title: "Rest APIs",
      collapsable: false,
      children: [
        'rest',
        'rest-public',
        'rest-authen',
        'rest-public-endpoints',
        'rest-auth-endpoints',
      ]
    },
  ]
}

