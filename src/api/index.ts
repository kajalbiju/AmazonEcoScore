import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();

// Get all products
router.get('/products', async (req, res) => {
  try {
    const productsPath = path.join(process.cwd(), 'src', 'products.json');
    const data = await fs.readFile(productsPath, 'utf-8');
    const products = JSON.parse(data);
    res.json({ products });
  } catch (error) {
    console.error('Error reading products:', error);
    res.status(500).json({ error: 'Failed to load products' });
  }
});

// Save products
router.post('/saveProducts', async (req, res) => {
  try {
    const { products } = req.body;
    const productsPath = path.join(process.cwd(), 'src', 'products.json');
    await fs.writeFile(productsPath, JSON.stringify(products, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving products:', error);
    res.status(500).json({ error: 'Failed to save products' });
  }
});

export default router; 