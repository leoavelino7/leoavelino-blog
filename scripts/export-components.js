const fs = require("fs");
const path = require("path");

function exportComponents(folderName) {
  console.time(`Exported components in folder: src/${folderName}`);

  const inputPath = path.join(process.cwd(), "src", folderName);

  const outputPath = path.join(inputPath, "index.tsx");

  const filesName = fs.readdirSync(inputPath).filter((filename) => filename !== "index.tsx");

  const indexContent = filesName
    .reduce((acc, current) => {
      const componentName = current.replace(".tsx", "");

      return acc + `\nexport * from "./${componentName}";`;
    }, `// Do not modify this content! It is automatically generated by script magic:components`)
    .trim() + "\n";

  fs.writeFileSync(outputPath, indexContent, {
    encoding: "utf-8"
  });

  console.timeEnd(`Exported components in folder: src/${folderName}`);
}

exportComponents("components");
exportComponents("icons");
exportComponents("hooks");
