import { mongooseConnect } from "@/lib/mongoose";
import { useContext, useEffect, useState } from "react";
import Hero from "./components/Hero";
import { Product } from "@/models/Product";
import Products from "./components/Products";
import Collection from "./components/Collection";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home({ featuredProduct, newProducts, collectionProduct1, allProducts }) {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  let categories = [1, 2, 3, 4, 5, 6];

  return (
    <main
      className={`min-h-screen p-4 bg-background `}
    >
      <Hero product={featuredProduct} />

      <hr class="my-1 h-px border-0 bg-gray-300" />

      <Products products={newProducts} />
      <hr class="my-1 h-px border-0 bg-gray-300" />
        <div className="flex items-center justify-center">
          <h2 className="text-xl mt-10 font-bold text-gray-900 sm:text-3x1">
            CATEGORIAS
          </h2>
        </div>
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
    </main>
  )
}

export async function getServerSideProps() {
  await mongooseConnect();
  const featuredId = '65e692df59a0b158b832561a';
  const collectionId = '6636ba3f4d7c6cba2ca034d1';

  const featuredProduct = await Product.findById(featuredId);
  const collectionProduct1 = await Product.findById(collectionId);
  const newProducts = await Product.find({}, null, {sort: {'_id': 1}, limit: 5})
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
