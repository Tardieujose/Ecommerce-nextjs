import { mongooseConnect } from "../../lib/mongoose";
import { Product } from "@/models/Product";
import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Image from 'next/image';
import { CartContext } from "@/lib/CartContext";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

// Utility function to format price with a comma for thousands
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function Categories({ categoryProducts }) {
  const { addProduct, cartProducts } = useContext(CartContext);

  const [loading, setLoading] = useState(true);
  const [brandFilter, setBrandFilter] = useState("Todas las marcas");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(categoryProducts);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4; // Número de productos por página

  const predefinedBrands = ["Jack Vaper", "The Alchemist", "GyC"]; // Marcas predefinidas

  const isProductInCart = (productId) => {
    return cartProducts.includes(productId);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // Función para filtrar productos
  const filterProducts = () => {
    let filtered = categoryProducts || [];

    // Filtrar por propiedad "enabled"
    filtered = filtered.filter((product) => product.enabled === true);

    if (brandFilter !== "Todas las marcas") {
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

  // Función para obtener los productos de la página actual
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  };

  // Manejar el cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex justify-center min-h-screen w-full">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen w-full">
          <Spinner />
        </div>
      ) : (
        <div className="mt-14 md:mt-14 w-full px-4 md:p-0">
          <div className="mb-4 flex gap-14 relative">
            <button
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="px-4 py-2 rounded-lg border bg-white text-blue-500 border-blue-500"
            >
              Buscar por marca
            </button>
            <span className={`px-4 py-2 rounded-lg border ${
              brandFilter === "Todas las marcas" ? "bg-gray-500 text-white" : "bg-blue-500 text-white"
            }`}
            >
              {brandFilter}
            </span>
            {isFilterMenuOpen && (
              <div className="absolute top-full left-0 ml-2 bg-white shadow-lg p-4 rounded-lg z-10">
                {predefinedBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => {
                      setBrandFilter(brand);
                      setIsFilterMenuOpen(false);
                      setCurrentPage(1); // Resetear la página al seleccionar un filtro
                    }}
                    className={`block w-full text-left px-4 py-2 rounded-lg border mb-2 ${
                      brandFilter === brand ? "bg-blue-500 text-white" : "bg-white text-blue-500 border-blue-500"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setBrandFilter("Todas las marcas");
                    setIsFilterMenuOpen(false);
                    setCurrentPage(1); // Resetear la página al seleccionar un filtro
                  }}
                  className={`block w-full text-left px-4 py-2 rounded-lg border ${
                    brandFilter === "Todas las marcas" ? "bg-gray-500 text-white" : "bg-white text-gray-500 border-gray-500"
                  }`}
                >
                  Todas las marcas
                </button>
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Buscar productos"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4 px-4 py-2 rounded-lg border border-gray-300 w-full"
          />

          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-600">
              No se encontraron productos que coincidan.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-3 md:gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 xl:gap-x-8 px-2">
              {getCurrentPageProducts().map((product) => (
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
                        {/* <Image
                          src={product.images[1]}
                          alt=""
                          width={300}
                          height={300}
                          className="absolute inset-0 h-full w-full object-contain opacity-0 group-hover:opacity-100"
                        /> */}
                      </div>

                      <div className="relative p-3 border-t">
                        <Link href={"/products/" + product._id}>
                          <h3 className="text-md text-gray-700 group-hover:underline group-hover:underline-offset-4 truncate">
                            {product.title}
                          </h3>
                        </Link>

                        <p className="text-sm text-gray-500">{product.brand}</p>

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

          {/* Paginación */}
          <div className="mt-4 flex justify-center">
            {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 border ${index + 1 === currentPage ? "border-blue-500 text-blue-500" : "border-gray-300 text-gray-500"}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


export async function getServerSideProps() {
  await mongooseConnect();
  const category = '6679fca9838eb24e4869d7bb'; // ID de categoría

  // Buscar productos por categoryId
  const categoryProducts = await Product.find({ category }).sort({ _id: 1 }).lean();

  return {
    props: {
      categoryProducts: JSON.parse(JSON.stringify(categoryProducts)),
    },
  };
}
