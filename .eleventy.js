const removeLineBreaks = (text) => text.replaceAll(/(\r\n|\n|\r)/gm, "");

function galleryShortcode(content, name) {
  content = content.replaceAll("{#gallery-name#}", name);
  return removeLineBreaks(`
    <div class="gallery">
      ${content}
    </div>
  `);
}

function galleryImageShortcode(src, title, description) {
  title = title ?? "";
  description = description ?? "";
  const imageElement = `
    <a href="${src}"
      class="glightbox gallery-image"
      data-gallery="gallery-{#gallery-name#}"
      data-title="${title}"
      data-description="${description}"
    >
      <img src="${src}" alt="${title}" class="gallery-item-image"/>
    </a>
  `;
  const titleElement = title ? `<p class="gallery-item-title">${title}</p>` : '';
  const descriptionElement = description ? `<p class="gallery-item-description">${description}</p>` : '';
  const element = `
    <div class="gallery-item">
      <div class="gallery-item-image-container">
        ${imageElement}
      </div>
      <div class="gallery-item-text-container">
        ${titleElement}
        ${descriptionElement}
      </div>
    </div>
  `;
  return removeLineBreaks(element);
}

function outlinkShortcode(content, url) {
  return removeLineBreaks(`
    <a href="${url}" rel="external" target="_blank" class="external-link">${content}</a>
  `);
}

module.exports = function (eleventyConfig) {
  
  eleventyConfig.addPassthroughCopy({"./assets/": "/"});
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

  eleventyConfig.addPairedShortcode("gallery", galleryShortcode);
  eleventyConfig.addShortcode("galleryImage", galleryImageShortcode);
  eleventyConfig.addPairedShortcode("link", outlinkShortcode);

  return {
    passthroughFileCopy: true,
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "content",
      output: "_site",
      includes: "../structure",
    },
    pathPrefix: "/",
  };
};