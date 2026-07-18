const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

try {
  console.log("Building static pages...");
  execSync("npm run build", { stdio: "inherit" });

  const outDir = path.join(__dirname, "out");
  if (!fs.existsSync(outDir)) {
    throw new Error("Build output directory 'out' not found.");
  }

  // Create .nojekyll to ensure folders starting with underscores (_next) are hosted
  fs.writeFileSync(path.join(outDir, ".nojekyll"), "");

  console.log("Preparing deployment folder...");
  execSync("git init", { cwd: outDir, stdio: "inherit" });
  execSync("git checkout -b gh-pages", { cwd: outDir, stdio: "inherit" });
  execSync("git add .", { cwd: outDir, stdio: "inherit" });
  execSync("git commit -m \"Deploy static site to GitHub Pages\"", { cwd: outDir, stdio: "inherit" });

  console.log("Uploading files to GitHub gh-pages branch...");
  execSync("git push --force https://github.com/Amansharma85-DEV/gym.git gh-pages", { cwd: outDir, stdio: "inherit" });

  console.log("Website successfully uploaded and online!");
} catch (error) {
  console.error("Deployment script failed:", error);
  process.exit(1);
}
