import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.resolve(__dirname, '../public/images');
const originalDir = path.join(imagesDir, 'original');

// Ensure backup directory exists
if (!fs.existsSync(originalDir)) {
    fs.mkdirSync(originalDir);
}

async function optimizeImages() {
    console.log('Starting safe image optimization...');

    // Get list of images in the main directory
    const files = fs.readdirSync(imagesDir);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));
    console.log(`Found ${imageFiles.length} images.`);

    // Step 1: Backup all images first
    console.log('Backing up images...');
    for (const file of imageFiles) {
        const srcPath = path.join(imagesDir, file);
        const destPath = path.join(originalDir, file);
        if (!fs.existsSync(destPath)) {
            try {
                fs.copyFileSync(srcPath, destPath);
            } catch (err) {
                console.error(`Failed to backup ${file}:`, err.message);
            }
        }
    }

    // Step 2: Optimize reading FROM backup and writing TO main directory
    console.log('Optimizing images...');
    for (const file of imageFiles) {
        const inputPath = path.join(originalDir, file);
        const outputPath = path.join(imagesDir, file);

        try {
            // Read from backup, Resize, Compress, Write to main
            await sharp(inputPath)
                .resize({ width: 1600, withoutEnlargement: true })
                .jpeg({ quality: 80, mozjpeg: true })
                .toFile(outputPath); // Atomic write usually safer

            console.log(`Optimized: ${file}`);
        } catch (error) {
            console.error(`Error processing ${file}:`, error.message);
        }
    }

    console.log('Optimization complete!');
}

optimizeImages();
