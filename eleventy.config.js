import * as sass from "sass";
import path from "path";
import { DateTime } from "luxon";
import readingTime from "eleventy-plugin-reading-time";

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
      <img src="${src}" alt="${title}" class="gallery-item__image"/>
    </a>
  `;
  const titleElement = title
    ? `<p class="gallery-item__title">${title}</p>`
    : "";
  const descriptionElement = description
    ? `<p class="gallery-item__description">${description}</p>`
    : "";
  const element = `
    <div class="gallery-item">
      <div class="gallery-item__content">
        ${imageElement}
      </div>
      <div class="gallery-item__caption">
        ${titleElement}
        ${descriptionElement}
      </div>
    </div>
  `;
  return removeLineBreaks(element);
}

function outlinkShortcode(content, url) {
  return removeLineBreaks(`
    <a href="${url}" rel="external" target="_blank" >${content}</a>
  `);
}

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(readingTime);

  eleventyConfig.addTemplateFormats("scss");

  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: async function (inputContent, inputPath) {
      let parsed = path.parse(inputPath);
      if (parsed.name.startsWith("_")) {
        return;
      }
      let result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || ".", this.config.dir.includes],
      });
      this.addDependencies(inputPath, result.loadedUrls);
      return async (data) => {
        return result.css;
      };
    },
  });

  eleventyConfig.addPassthroughCopy({ "./assets/": "/" });
  eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

  console.log("process.env.ELEVENTY_RUN_MODE", process.env.ELEVENTY_RUN_MODE);

  eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
      return false;
    }
  });

  eleventyConfig.addPairedShortcode("gallery", galleryShortcode);
  eleventyConfig.addShortcode("galleryImage", galleryImageShortcode);
  eleventyConfig.addPairedShortcode("link", outlinkShortcode);

  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
    return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
      format || "LLLL dd, yyyy",
    );
  });
  eleventyConfig.addFilter("monthAndDay", (dateObj, format, zone) => {
    return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
      format || "LLLL dd",
    );
  });
  eleventyConfig.addFilter("hyphenatedDate", (dateObj, format, zone) => {
    return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
      format || "yyyy-LL-dd",
    );
  });
  eleventyConfig.addFilter("first", function (array, count = 1) {
    return array.slice(0, count);
  });
  eleventyConfig.addFilter("last", function (array, count = 1) {
    return array.slice(-count);
  });
}

export const config = {
  passthroughFileCopy: true,
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
  dir: {
    input: "content",
    output: "_site",
    includes: "../includes",
    data: "../data",
  },
  pathPrefix: "/",
};
