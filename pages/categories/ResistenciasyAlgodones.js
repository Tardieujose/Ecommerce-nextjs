import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { CartContext } from "@/lib/CartContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import Image from 'next/image';

// Utility function to format price with a comma for thousands
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function Categories({ categoryProducts }) {
  const { addProduct } = useContext(CartContext);

  const [loading, setLoading] = useState(true);
  const [brandFilter, setBrandFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(categoryProducts);

  const predefinedBrands = ["Jack", "Alchemist"]; // Predefined brands

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const filterProducts = () => {
    
    let filtered = categoryProducts || [];

      // Filtrar por propiedad "enabled"
    filtered = filtered.filter((product) => product.enabled === true);

    if (brandFilter !== "") {
      const lowerCaseBrandFilter = brandFilter.toLowerCase();
      filtered = filtered.filter((product) =>
        product.brand?.toLowerCase().includes(lowerCaseBrandFilter)
      );
    }

    if (searchQuery !== "") {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(lowerCaseQuery)
      );
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [searchQuery, brandFilter]);

  return (
    <div className="flex justify-center min-h-screen w-full">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen w-full">
          <Spinner />
        </div>
      ) : (
        <div className="mt-18 md:mt-14 w-full px-4 md:p-0">
          <div className="mb-4 flex gap-4">
            {predefinedBrands.map((brand) => (
              <button
                key={brand}
                onClick={() => setBrandFilter(brand)}
                className={`px-4 py-2 rounded-lg border ${
                  brandFilter === brand ? "bg-blue-500 text-white" : "bg-white text-blue-500 border-blue-500"
                }`}
              >
                {brand}
              </button>
            ))}
            <button
              onClick={() => setBrandFilter("")}
              className={`px-4 py-2 rounded-lg border ${
                brandFilter === "" ? "bg-gray-500 text-white" : "bg-white text-gray-500 border-gray-500"
              }`}
            >
              All Brands
            </button>
          </div>
          <input
                  type="text"
                  placeholder="Search products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-4 px-4 py-2 rounded-lg border border-gray-300 w-full" // Increased the input size
                />

          {filteredProducts.length === 0 ? (
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
                        <Image
                          src={product.images[0]}
                          alt=""
                          width={300}
                          height={300}
                          className="absolute inset-0 h-full w-full object-contain opacity-100 group-hover:opacity-0"
                        />
                        <Image
                          src={product.images[1]}
                          alt=""
                          width={300}
                          height={300}
                          className="absolute inset-0 h-full w-full object-contain opacity-0 group-hover:opacity-100"
                        />
                      </div>

                      <div className="relative p-3 border-t">
                        <Link href={"/products/" + product._id}>
                          <h3 className="text-md text-gray-700 group-hover:underline group-hover:underline-offset-4 truncate">
                            {product.title}
                          </h3>
                        </Link>

                        <p className="text-sm text-gray-500">{product.brand}</p>

                        <div className="mt-1.5 flex flex-col items-center justify-between text-text">
                          <p className="tracking-wide text-primary text-sm md:text-md">
                            Ars$ {formatPrice(product.price)}
                          </p>

                          <div className="col-span-12 text-center w-full mt-3">
                            <button
                              onClick={() => {
                                addProduct(product._id);
                                toast.success("Item added to cart!");
                              }}
                              className="disabled block rounded bg-secondary px-5 py-3 text-md text-text w-full transition hover:bg-purple-300"
                            >
                              Add to cart
                            </button>
                          </div>
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
  const category = '6657237c959519a5ab3c4046'; // Tu ID de categoría

  // Buscar productos por categoryId
  const categoryProducts = await Product.find({ category }).sort({ _id: 1 }).lean();

  return {
    props: {
      categoryProducts: JSON.parse(JSON.stringify(categoryProducts)),
    },
  };
}
