import { createCanvas, loadImage } from 'canvas'
import fs from 'fs'
import path from 'path'

const imagePath = process.argv[2] || 'public/ascii.jpg'
const outputPath = process.argv[3] || 'public/ascii-art.txt'

// Character sets for different brightness levels (dark to light)
const chars = [
  'ILOVEYOU',  // Darkest - dense
  'ILOVEYO',
  'ILOVEY',
  'ILOVY',
  'ILOV',
  'ILO',
  'IL',
  'I',
  '.',
  ' ',
]

async function generateAscii() {
  try {
    // Load image
    const image = await loadImage(imagePath)
    const imgWidth = image.width
    const imgHeight = image.height

    // Calculate dimensions for ASCII art (maintain aspect ratio)
    const fontRatio = 0.5 // Characters are roughly 2x taller than wide
    const asciiWidth = 100
    const asciiHeight = Math.floor((imgHeight / imgWidth) * asciiWidth * fontRatio)

    // Create canvas
    const canvas = createCanvas(asciiWidth, asciiHeight)
    const ctx = canvas.getContext('2d')

    // Draw image and convert to grayscale
    ctx.drawImage(image, 0, 0, asciiWidth, asciiHeight)
    const imageData = ctx.getImageData(0, 0, asciiWidth, asciiHeight)
    const pixels = imageData.data

    // Convert to grayscale and map to ASCII
    let asciiArt = ''
    for (let y = 0; y < asciiHeight; y++) {
      for (let x = 0; x < asciiWidth; x++) {
        const offset = (y * asciiWidth + x) * 4
        const r = pixels[offset]
        const g = pixels[offset + 1]
        const b = pixels[offset + 2]

        // Grayscale conversion (luminosity method)
        const gray = 0.299 * r + 0.587 * g + 0.114 * b

        // Map brightness to character index
        const charIndex = Math.floor((gray / 255) * (chars.length - 1))
        asciiArt += chars[charIndex]
      }
      asciiArt += '\n'
    }

    // Save to file
    fs.writeFileSync(outputPath, asciiArt)
    console.log(`ASCII art saved to ${outputPath}`)
    console.log(`Dimensions: ${asciiWidth}x${asciiHeight}`)

  } catch (error) {
    console.error('Error generating ASCII art:', error)
    process.exit(1)
  }
}

generateAscii()
