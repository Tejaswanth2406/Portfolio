const { Jimp } = require('jimp');
const path = require('path');

async function processImages() {
  try {
    const inputPath = 'C:\\Users\\tejas\\.gemini\\antigravity\\brain\\d8dabe62-1b69-493a-96fe-036f4def6810\\media__1777726695977.png';
    const image = await Jimp.read(inputPath);
    
    const w = image.bitmap.width;
    const h = image.bitmap.height;

    const sections = [
      { name: 'voyager_pineapple.png', rect: [0, 0, Math.floor(w/3), Math.floor(h/3)] },
      { name: 'voyager_conch.png', rect: [Math.floor(w/3), 0, Math.floor(w/3), Math.floor(h/3)] },
      { name: 'voyager_surfboard.png', rect: [Math.floor(w*0.66), 0, Math.floor(w*0.34), Math.floor(h*0.6)] },
      { name: 'voyager_spiral.png', rect: [0, Math.floor(h/3), Math.floor(w*0.35), Math.floor(h/3)] },
      { name: 'voyager_turtle.png', rect: [Math.floor(w*0.25), Math.floor(h*0.25), Math.floor(w*0.4), Math.floor(h*0.35)] },
      { name: 'voyager_starfish2.png', rect: [0, Math.floor(h*0.55), Math.floor(w*0.5), Math.floor(h*0.45)] },
      { name: 'voyager_coconut2.png', rect: [Math.floor(w*0.5), Math.floor(h*0.45), Math.floor(w*0.5), Math.floor(h*0.35)] },
      { name: 'voyager_seahorse2.png', rect: [Math.floor(w*0.4), Math.floor(h*0.75), Math.floor(w*0.5), Math.floor(h*0.25)] },
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
