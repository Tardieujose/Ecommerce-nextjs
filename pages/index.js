import { mongooseConnect } from "@/lib/mongoose";
import { useContext, useEffect, useState } from "react";
import Hero from "./components/Hero";
import { Product } from "@/models/Product";
import Products from "./components/Products";
import Collection from "./components/Collection";

export default function Home({ featuredProduct, newProducts, collectionProduct1, allProducts }) {

  let categories = [1, 2, 3, 4];

  return (
    <main
      className={`min-h-screen p-4 bg-background `}
    >
      <Hero product={featuredProduct} />

      <hr class="my-1 h-px border-0 bg-gray-300" />

      <Products products={newProducts} />
      <hr class="my-1 h-px border-0 bg-gray-300" />
        <div className="flex items-center justify-center">
          <h2 className="text-xl mt-10 mb-14 font-bold text-gray-900 sm:text-3x1 hidden md:block">
            CATEGORIAS
          </h2>
        </div>
        <div className="hidden md:block">
          <div className="flex">
            <div className="flex-1 px-2">
              <Collection product={categories[0]} />
            </div>
            <div className="flex-1 px-2 ">
              <Collection product={categories[1]} />
            </div>
            <div className="flex-1 px-1">
              <Collection product={categories[2]} />
            </div>
            <div className="flex-1 px-1">
              <Collection product={categories[3]} />
            </div>
          </div>
          <div className="flex">
            
          </div>
        </div>
    </main>
  )
}

export async function getServerSideProps() {
  await mongooseConnect();
  const featuredId = '6671f3a409fdecf2b5d7bf8c';
  const collectionId = '6671f3a409fdecf2b5d7bf8c';

  const featuredProduct = await Product.findById(featuredId);
  const collectionProduct1 = await Product.findById(collectionId);
  const newProducts = await Product.find({}, null, {sort: {'_id': 1}}) //, limit: 10
  const allProducts = await Product.find({}, null, {sort: {'_id': 1}})

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      collectionProduct1: JSON.parse(JSON.stringify(collectionProduct1)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      allProducts: JSON.parse(JSON.stringify(allProducts)),
    }
  }
}
