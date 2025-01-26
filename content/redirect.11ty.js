// Based on the "Eleventy Redirect From" template here: https://brianm.me/posts/eleventy-redirect-from/

export const data = {
  pagination: {
    data: "collections.all",
    size: 1,
    alias: "redirect",
    before: function (data) {
      return data.reduce((redirects, page) => {
        if (Array.isArray(page.data.redirect_from)) {
          for (let url of page.data.redirect_from) {
            redirects.push({ to: page.url, from: url });
          }
        } else if (typeof page.data.redirect_from === "string") {
          redirects.push({ to: page.url, from: page.data.redirect_from });
        }
        return redirects;
      }, []);
    },
    addAllPagesToCollections: false,
  },
  permalink: function (data) {
    return `${data.redirect.from}/index.html`;
  },
  eleventyExcludeFromCollections: true,
};

export function render(data) {
  return `
    <title>Redirecting&hellip;</title>
    <link rel="canonical" href="${this.url(data.redirect.to)}" />
    <script>
    location = '${this.url(data.redirect.to)}';
    </script>
    <meta http-equiv="refresh" content="0; url=${this.url(data.redirect.to)}" />
    <meta name="robots" content="noindex" />
    <h1>Redirecting&hellip;</h1>
    <a href="${this.url(
      data.redirect.to
    )}">Click here if you are not redirected</a>
  `;
}
