import { Jimp } from 'jimp';

async function processImage() {
  try {
    const image = await Jimp.read('https://i.postimg.cc/CLH54FCs/IMG-6070.png');
    
    // Autocrop removes borders of the same color
    image.autocrop({ tolerance: 0.1 }); // Use some tolerance
    
    // Write out the cropped image
    await image.write('public/logo-cropped.png');
    console.log('Successfully cropped logo');
  } catch (err) {
    console.error('Error processing image:', err);
  }
}

processImage();
