module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/js");

  eleventyConfig.addShortcode("gallery", function(columns, ...paths) {
    const pageWidth = 680;
    const width = pageWidth / columns;
    const lines = paths.map(path => `<a href="${path}"><img src="${path}" width=${width}px/></a>`);
    return lines.join('\n');
  });

  eleventyConfig.addShortcode("imglink", function(width, path) {
    const pageWidth = 680;
    return `<a href="${path}"><img src="${path}" width=${width}px/></a>`;
  });

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