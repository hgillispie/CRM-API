import express from 'express';
import { products } from '../data/products.js';

const router = express.Router();

// GET /api/products - List all products
router.get('/', (req, res) => {
  let filtered = [...products];
  
  // Apply filters
  if (req.query.category) {
    filtered = filtered.filter(p => 
      p.category.toLowerCase() === req.query.category.toLowerCase()
    );
  }
  if (req.query.type) {
    filtered = filtered.filter(p => 
      p.type.toLowerCase() === req.query.type.toLowerCase()
    );
  }
  if (req.query.targetMarket) {
    filtered = filtered.filter(p => 
      p.targetMarket.toLowerCase().includes(req.query.targetMarket.toLowerCase())
    );
  }
  if (req.query.status) {
    filtered = filtered.filter(p => 
      p.status.toLowerCase() === req.query.status.toLowerCase()
    );
  }
  if (req.query.minPrice) {
    filtered = filtered.filter(p => p.basePrice >= parseInt(req.query.minPrice));
  }
  if (req.query.maxPrice) {
    filtered = filtered.filter(p => p.basePrice <= parseInt(req.query.maxPrice));
  }
  
  // Sorting
  if (req.query.sort) {
    const sortField = req.query.sort;
    const sortOrder = req.query.order === 'desc' ? -1 : 1;
    filtered.sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1 * sortOrder;
      if (a[sortField] > b[sortField]) return 1 * sortOrder;
      return 0;
    });
  }
  
  res.json({
    data: filtered,
    total: filtered.length,
    categories: [...new Set(products.map(p => p.category))],
    types: [...new Set(products.map(p => p.type))]
  });
});

// GET /api/products/catalog - Product catalog grouped by category
router.get('/catalog', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  
  const catalog = categories.map(category => ({
    category,
    products: products
      .filter(p => p.category === category)
      .map(p => ({
        id: p.id,
        name: p.name,
        type: p.type,
        description: p.description,
        basePrice: p.basePrice,
        billingCycle: p.billingCycle,
        targetMarket: p.targetMarket
      }))
  }));
  
  res.json({
    catalog,
    summary: {
      totalProducts: products.length,
      categories: categories.length,
      licenses: products.filter(p => p.type === 'License').length,
      addOns: products.filter(p => p.type === 'Add-on').length,
      services: products.filter(p => p.type === 'Service').length
    }
  });
});

// GET /api/products/:id - Get product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  // If product has required products, include their details
  let requiredProducts = null;
  if (product.requiredProducts) {
    requiredProducts = product.requiredProducts.map(reqId => {
      const reqProd = products.find(p => p.id === reqId);
      return reqProd ? {
        id: reqProd.id,
        name: reqProd.name,
        basePrice: reqProd.basePrice
      } : null;
    }).filter(p => p !== null);
  }
  
  res.json({
    ...product,
    requiredProductDetails: requiredProducts
  });
});

export default router;
