const path = require("path");
const fs = require("fs");
const fsp = require("fs/promises");
const { pipeline } = require("node:stream/promises");
const ExifTransformer = require("exif-be-gone");

const srcDir = "assets";
const extensions = ["png", "jpg", "jpeg"];

const results = {
  fileCount: 0,
};

run();

async function run() {
  await processDirectoryRecursively(srcDir);
  console.log(
    `Removed EXIF data from ${results.fileCount} files in ${srcDir} and subdirectories.`
  );
}

async function processDirectoryRecursively(dirPath) {
  try {
    const entries = await fsp.readdir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const entryPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        // console.log("dir:", entryPath);
        await processDirectoryRecursively(entryPath);
      } else if (
        entry.isFile() &&
        extensions.some((ext) => entry.name.endsWith(ext))
      ) {
        // console.log("file:", entryPath);
        const tempPath = `${entryPath}_temp`;
        const reader = fs.createReadStream(entryPath, {
          autoClose: true,
          flush: true,
        });
        const writer = fs.createWriteStream(`${entryPath}_temp`, {
          autoClose: true,
          flush: true,
        });
        await pipeline(reader, new ExifTransformer(), writer);

        await fsp.rm(entryPath);
        await fsp.rename(tempPath, entryPath);

        results.fileCount++;
      }
    }
  } catch (err) {
    console.error(err);
  }
}
