import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

const PRODUCTS_FILE = join(process.cwd(), 'src', 'products.json');

export async function getProducts() {
  try {
    const data = await readFile(PRODUCTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products:', error);
    return { products: [] };
  }
}

export async function saveProducts(products: any[]) {
  try {
    await writeFile(PRODUCTS_FILE, JSON.stringify({ products }, null, 2));
    return { success: true };
  } catch (error) {
    console.error('Error saving products:', error);
    throw new Error('Failed to save products');
  }
} 