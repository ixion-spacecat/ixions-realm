const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

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
      <img src="${src}" alt="${title}" eleventy:widths="800px" class="gallery-item-image"/>
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

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// which file extensions to process
		extensions: "html",

		// Add any other Image utility options here:

		// optional, output image formats
		formats: ["webp", "jpeg"],
		// formats: ["auto"],

		// optional, output image widths
		// widths: ["auto"],

		// optional, attributes assigned on <img> override these values.
		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},
	});
  
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/js");

  eleventyConfig.addPairedShortcode("gallery", galleryShortcode);
  eleventyConfig.addShortcode("galleryImage", galleryImageShortcode);

  return {
    passthroughFileCopy: true,
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
    },
  };
};