import { generateCruiseBrochurePDF } from './pdf/brochure';
import fs from 'fs';
import path from 'path';

// Simula la respuesta real del REST API — specifications vienen como objetos
const mockCruise = {
  id: 'test-horizon',
  name: 'Horizon',
  capacity: 16,
  origin: 'galapagos',
  type: 'catamaran',
  category: 'luxury-class',
  shortDescription: 'Imagine the marvelous sunsets you will enjoy from your private balcony after a day of fantastic excursions in the enchanted isles.',
  description: 'The Horizon Trimaran was designed and built specifically to offer luxury liveaboard cruising vacations in the Galapagos Islands.',
  specifications: [
    { specification: 'Length: 26m' },
    { specification: 'Beam: 12m' },
    { specification: 'Capacity: 16 passengers' },
    { specification: 'Cabins: 8' },
    { specification: 'Built: 2019' },
    { specification: 'Flag: Ecuador' },
  ] as any,
  includes: [
    { include: 'All meals on board' },
    { include: 'Guided excursions' },
    { include: 'Snorkeling equipment' },
  ] as any,
  notInclude: [
    { notInclude: 'International flights' },
    { notInclude: 'Travel insurance' },
  ] as any,
  cabins: [
    {
      title: 'Standard Double',
      size: '30',
      maxOccupancy: 2,
      description: 'The Horizon can accommodate up to 16 passengers in 8 cabins. Panoramic windows with balcony.',
    },
  ],
  mainImage: [{ url: 'https://picsum.photos/800/400' }],
};

async function main() {
  console.log('Generating cruise brochure PDF...');
  try {
    const base64 = await generateCruiseBrochurePDF(mockCruise);
    const outPath = path.join(__dirname, '..', 'test-output-cruise3.pdf');
    fs.writeFileSync(outPath, Buffer.from(base64, 'base64'));
    console.log(`✅ PDF written: ${outPath}`);
    console.log(`   Size: ${(Buffer.from(base64, 'base64').length / 1024).toFixed(1)} KB`);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

main();
