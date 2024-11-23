const fs = require("node:fs/promises");
const path = require("path");

const targetVersion = "0.12.2";

const examplesPath = path.join(__dirname, "../examples-legacy");


async function main() {
  console.log(`Updating ml5.js to version ${targetVersion}...`);

  const sketches = await fs.readdir(examplesPath);

  for (const sketch of sketches) {
    const sketchFiles = await fs.readdir(path.join(examplesPath, sketch));
    for (const file of sketchFiles) {
      if (file === "index.html") {
        const filePath = path.join(examplesPath, sketch, file);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const updatedContent = fileContent.replace(
          /<script src="https:\/\/unpkg\.com\/ml5@\d+\.\d+\.\d+\/dist\/ml5\.min\.js"><\/script>/,
          `<script src="https://unpkg.com/ml5@${targetVersion}/dist/ml5.min.js"></script>`
        );
        await fs.writeFile(filePath, updatedContent);
      }
    }
  }

  console.log("ml5.js version updated successfully!");
}

main();
