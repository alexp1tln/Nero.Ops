import { Jimp } from 'jimp';

async function checkSize() {
  const image = await Jimp.read('public/logo-cropped.png');
  console.log(`Cropped size: ${image.bitmap.width}x${image.bitmap.height}`);
  const original = await Jimp.read('https://i.postimg.cc/CLH54FCs/IMG-6070.png');
  console.log(`Original size: ${original.bitmap.width}x${original.bitmap.height}`);
}

checkSize();
