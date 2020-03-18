module.exports = {
  title: 'Fireback',
  description: "Firebase Backup CLI that makes backing up and restoring Firebase services a breeze.",
  themeConfig: {
    heroImage: '/logo.png',
    logo: '/logo.png',
    repo: 'lupas/fireback',

    sidebar: {
      '/guide/': [
        {
          title: 'Guide', // required
          collapsable: false, // optional, defaults to true
          sidebarDepth: 3, // optional, defaults to 1
          children: [
            '/guide/introduction/',
            '/guide/getting-started/',
            '/guide/backup-and-restore/'
          ]
        }
      ]
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/introduction/' },
      { text: 'Sponsor', link: 'https://github.com/sponsors/lupas' }
    ]
  }
}
