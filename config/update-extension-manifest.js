const fs = require('fs/promises');
const path = require('path');
const basePath = path.resolve(path.join(__dirname, '../dist/ask-me'));
const jsTypes = ['main', 'polyfills', 'runtime'];
const cssTypes = ['styles'];

const updateManifest = () => new Promise(async () => {

  const jsonManifest = await fs.readFile(`${basePath}/manifest.json`, 'utf-8');
  const manifest = JSON.parse(jsonManifest);
  manifest.content_scripts[0].js = [];
  manifest.content_scripts[0].css = [];

  const files = await fs.readdir(basePath);

  jsTypes.map((type) => {
    const jsFile = files.find(name => name.includes(type));
    manifest.content_scripts[0].js.push(jsFile);
  });

  cssTypes.map((type) => {
    const cssFile = files.find(name => name.includes(type));
    manifest.content_scripts[0].css.push(cssFile);
  });

 await fs.writeFile(`${basePath}/manifest.json`, JSON.stringify(manifest), 'utf-8');
});

updateManifest();
