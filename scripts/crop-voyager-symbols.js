const path = require('path');
const { Jimp } = require('jimp');

const presets = {
  grid8: [
    ['voyager_pineapple.png', 0, 0, 1 / 3, 1 / 3],
    ['voyager_conch.png', 1 / 3, 0, 1 / 3, 1 / 3],
    ['voyager_surfboard.png', 0.66, 0, 0.34, 0.6],
    ['voyager_spiral.png', 0, 1 / 3, 0.35, 1 / 3],
    ['voyager_turtle.png', 0.25, 0.25, 0.4, 0.35],
    ['voyager_starfish2.png', 0, 0.55, 0.5, 0.45],
    ['voyager_coconut2.png', 0.5, 0.45, 0.5, 0.35],
    ['voyager_seahorse2.png', 0.4, 0.75, 0.5, 0.25],
  ],
  grid4: [
    ['voyager_spiky_conch.png', 0, 0, 0.5, 0.5],
    ['voyager_crab.png', 0.5, 0, 0.5, 0.5],
    ['voyager_octopus.png', 0, 0.5, 0.5, 0.5],
    ['voyager_oyster.png', 0.5, 0.5, 0.5, 0.5],
  ],
};

const [, , presetName, inputPath] = process.argv;

if (!presets[presetName] || !inputPath) {
  console.error('Usage: node scripts/crop-voyager-symbols.js <grid8|grid4> <source-image>');
  process.exit(1);
}

processImages(presets[presetName], inputPath).catch((error) => {
  console.error(error);
  process.exit(1);
});

async function processImages(sections, sourcePath) {
  const image = await Jimp.read(sourcePath);
  const { width, height } = image.bitmap;

  for (const [name, x, y, w, h] of sections) {
    const clone = image.clone();
    clone.crop({
      x: Math.floor(width * x),
      y: Math.floor(height * y),
      w: Math.floor(width * w),
      h: Math.floor(height * h),
    });
    clone.autocrop();

    await clone.write(path.join(process.cwd(), 'assets', name));
    console.log(`Saved assets/${name}`);
  }
}
