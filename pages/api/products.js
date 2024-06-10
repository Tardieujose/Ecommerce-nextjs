import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === 'POST') {
    const { title, description, price, images, category, topprod, enabled, brand, sizes, cantidad } = req.body;

    const productDoc = await Product.create({
      title,
      description,
      price,
      images,
      category,
      topprod,
      enabled,
      brand, sizes, cantidad
    })

    res.json(productDoc);
  }

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {

      res.json(await Product.find());
    }
  }

  if (method === 'PUT') {
    const { title, description, price, _id, images, category, topprod, enabled, brand, sizes, cantidad } = req.body;
    await Product.updateOne({ _id }, {
      title, description, price, images, category, topprod, enabled, brand, sizes, cantidad
    });
    res.json(true);
  }

  if (method === 'PATCH') {
    const { id, cantidad } = req.body;

    try {
      const result = await Product.updateOne({ _id: id }, { cantidad: cantidad });

      if (result.nModified === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }

      return res.json({ success: true });
    } catch (error) {
      console.error('Error updating product quantity:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Product.deleteOne({_id:req.query?.id});
      res.json(true)
    }
  }
}