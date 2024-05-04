import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.json('Should be a post request');
    return;
  }

  const { email, name, address, city, country, zip, cartProducts } = req.body;

  await mongooseConnect();

  const productIds = cartProducts;
  const uniqueIds = [...new Set(productIds)];
  const productsInfo = await Product.find({ _id: uniqueIds });

  let line_items = [];

  for (const productId of uniqueIds) {
    const productInfo = productsInfo.find(p => p._id.toString() === productId);

    const quantity = productIds.filter(id => id === productId)?.length || 0;

    if (quantity > 0 && productInfo) {
      line_items.push({
        productId: productInfo._id,
        quantity,
        name: productInfo.title,
        price: productInfo.price,
        total: quantity * productInfo.price
      });
    }
  }

  const orderDoc = await Order.create({
    line_items,
    email,
    name,
    address,
    city,
    country,
    zip,
    paid: false
  });

  res.json({ success: true });
}
