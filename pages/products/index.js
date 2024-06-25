import { CartContext } from "@/lib/CartContext";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import Image from 'next/image';

// Utility function to format price with a comma for thousands
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function Products({ allProducts }) {
  const { addProduct, cartProducts } = useContext(CartContext);

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const filterProducts = () => {
    // Filtrar por propiedad "enabled"
    const filteredByEnabled = allProducts.filter((product) =>
      product.enabled === true
    );
  
    if (searchQuery === "") {
      // Filtrar por búsqueda
      setFilteredProducts(filteredByEnabled);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filteredBySearch = filteredByEnabled.filter((product) =>
        product.title.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredProducts(filteredBySearch);
    }
  };

  const isProductInCart = (productId) => {
    return cartProducts.includes(productId);
  };
  
  useEffect(() => {
    filterProducts();
  }, [searchQuery]);

  return (
    <div className="flex justify-center min-h-screen w-full">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen w-full">
          <Spinner />
        </div>
      ) : (
        <div className="mt-14 md:mt-14 w-full px-4 md:p-0">
          <input
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4 px-4 py-2 rounded-lg border border-gray-300 w-full" // Increased the input size
          />

          {filteredProducts.length === 0 ? ( // Display a message when no matching searches
            <p className="text-center text-gray-600">
              No matching products found.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-3 md:gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 xl:gap-x-8 px-2">
              {filteredProducts.map((product) => (
                <div key={product._id}>
                  <div className="group block overflow-hidden border border-accent rounded-xl border-opacity-10">
                    <div className="">
                      <div className="relative md:h-[300px] h-[200px]">
                        <Link href={'/products/' + product._id}>
                          <Image
                            src={product.images[0]}
                            alt=""
                            className="absolute inset-0 h-full w-full object-contain opacity-100 group-hover:opacity-0"
                          />
                          {/* <Image
                            src={product.images[1]}
                            alt=""
                            width={300}
                            height={300}
                            className="absolute inset-0 h-full w-full object-contain opacity-0 group-hover:opacity-100"
                          /> */}
                        </Link>
                      </div>

                      <div className="relative p-3 border-t">
                        <Link href={"/products/" + product._id}>
                          <h3 className="text-md text-colWolf group-hover:underline group-hover:underline-offset-4 truncate">
                            {product.title}
                          </h3>
                        </Link>

                        <div className="mt-1.5 space-y-3 flex flex-col items-center justify-between text-text">
                        <p className={`tracking-wide self-start ${product.coin === "USD" ? "text-green-500" : "text-blue-500"}`}>
                          <strong>{product.coin === "USD" ? "USD" : "ARS"}</strong><span className="text-black"> ${formatPrice(product.price)}</span>
                        </p>
                        
                          <button
                            onClick={() => {
                              addProduct(product._id);
                              toast.success('Item added to cart!');
                            }}
                            type="button"
                            disabled={isProductInCart(product._id) || product.cantidad === 0}
                            className={`flex items-center divide-x rounded-lg border border-bgWolf bg-white text-center text-md font-medium text-secondary-700 shadow-sm hover:bg-bgWolf ${isProductInCart(product._id) || product.cantidad === 0 ? 'cursor-not-allowed opacity-50 bg-gray-400 text-gray-700' : ''}`}
                          >
                            <div className="flex items-center space-x-3 py-2.5 px-3">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                              </svg>
                              <span>{product.cantidad === 0 ? 'Agotado' : 'Agregar'}</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const allProducts = await Product.find({}, null, { sort: { _id: 1 } });

  return {
    props: {
      allProducts: JSON.parse(JSON.stringify(allProducts)),
    },
  };
}
