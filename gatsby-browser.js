// I got his from here... https://github.com/gatsbyjs/gatsby/issues/7261
// If I refresh a 'step' page and then press the back button, I'll get a 404.  This fixes that bug - brutally! Maybe I can find something better.

exports.onInitialClientRender = () => {
  // dirty fix for missing popstate listener
  const GATSBY_NAVIGATE = window.___navigate || {}

  window.addEventListener('popstate', () =>
    GATSBY_NAVIGATE(window.location.pathname, { replace: true })
  )
}