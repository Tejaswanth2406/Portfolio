const { Jimp } = require('jimp');
const path = require('path');

async function processImages() {
  try {
    const inputPath = 'C:\\Users\\tejas\\.gemini\\antigravity\\brain\\d8dabe62-1b69-493a-96fe-036f4def6810\\media__1777727454121.png';
    const image = await Jimp.read(inputPath);
    
    const w = image.bitmap.width;
    const h = image.bitmap.height;

    const sections = [
      { name: 'voyager_spiky_conch.png', rect: [0, 0, Math.floor(w/2), Math.floor(h/2)] },
      { name: 'voyager_crab.png', rect: [Math.floor(w/2), 0, Math.floor(w/2), Math.floor(h/2)] },
      { name: 'voyager_octopus.png', rect: [0, Math.floor(h/2), Math.floor(w/2), Math.floor(h/2)] },
      { name: 'voyager_oyster.png', rect: [Math.floor(w/2), Math.floor(h/2), Math.floor(w/2), Math.floor(h/2)] },
    ];

    for (const sec of sections) {
      const clone = image.clone();
      clone.crop({x: sec.rect[0], y: sec.rect[1], w: sec.rect[2], h: sec.rect[3]});
      clone.autocrop();
      
      const outPath = path.join(__dirname, 'assets', sec.name);
      await clone.write(outPath);
      console.log(`Saved ${sec.name}`);
    }
  } catch (err) {
    console.error("Error processing image:", err);
  }
}

processImages();
