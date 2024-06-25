  import { useContext, useEffect, useState } from "react";
  import { CartContext } from "../../lib/CartContext";
  import axios from "axios";
  import Link from "next/link";
  import Spinner from "../components/Spinner";
  import { signIn, signOut, useSession } from "next-auth/react";
  import Success from "../components/Success";
  import toast from "react-hot-toast";
  import { useRouter } from 'next/router';
  import Image from 'next/image';

  export default function Cart() {
    const { cartProducts, removeProduct, addProduct, clearCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [zip, setZip] = useState('');
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();
    const [dollarBluePrice, setDollarBluePrice] = useState(null);

    useEffect(() => {
      setLoading(true);
      if (cartProducts.length > 0) {
        axios.post('/api/cart', { ids: cartProducts })
          .then(response => {
            setProducts(response.data);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching cart products:', error);
            setLoading(false);
          });
      } else {
        setProducts([]);
        setLoading(false);
      }
    }, [cartProducts]);

    useEffect(() => {
      if (typeof window === 'undefined') {
        return;
      }
      if (window?.location.href.includes('success')) {
        setIsSuccess(true);
        setProducts([]);
      }
    }, []);
    
    useEffect(() => {
      const fetchDollarBluePrice = async () => {
         try {
           const response = await fetch("https://dolarapi.com/v1/dolares/blue");
           const data = await response.json();
           setDollarBluePrice(data.venta);
         } catch (error) {
        }
      };
    
      fetchDollarBluePrice();
    }, []);

    let total = 0;
      for (const productId of cartProducts) {
        const product = products.find(p => p._id === productId);
        if (product) {
          total += product.price * (product.coin === "USD" ? dollarBluePrice : 1);
        }
      }

    async function increaseProduct(id) {
    const product = products.find(p => p._id === id);
    const currentQuantity = cartProducts.filter(productId => productId === id).length;

    if (product && currentQuantity < product.cantidad) {
      addProduct(id);
    } else {
      toast.error('No more stock available!');
    }
  }

    async function decreaseProduct(id) {
      removeProduct(id);
    }

    function deleteCart(id) {
      clearCart();
      toast.success('Cart cleared!');
    }

    const formatPrice = (price) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    async function stripeCheckout() {
      try {
        const response = await axios.post('/api/checkout', {
          email: session.user.email,
          name: session.user.name,
          address,
          country,
          zip,
          city,
          cartProducts,
        });
    
        if (response.data.success) {
          toast.success('Order placed successfully!');
          setIsSuccess(true);
        } else {
          toast.error('Failed to place order. Please try again.');
        }
      } catch (error) {
        console.error('Error saving to MongoDB:', error);
        // toast.error('An error occurred while placing the order.');
      }
    }

    if (isSuccess) {
      return <Success cartProducts={cartProducts} products={products} />;
    }

    if (session) {
      return (
        <section className="flex justify-between max-md:flex-col space-x-4">
          <div className="md:w-2/3 px-4">
            <div className="mt-16 md:mt-6">
              <header className="text-center flex justify-between w-full">
                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl"></h1>
              </header>
              {loading ? (
                <div className="flex justify-center items-center h-screen">
                  <Spinner />
                </div>
              ) : !products.length ? (
                <p className="my-10 text-xl text-colWolf text-center">Tu carrito esta vacio</p>
              ) : (
                <>
                  {products.length > 0 && products.map(product => (
                    <div key={product._id} className="mt-8">
                      <ul className="space-y-4">
                        <li className="flex items-center gap-4 justify-between">
                          <Image
                            src={product.images[0]}
                            alt=""
                            width={300}
                            height={300}
                            className="h-16 w-16 rounded object-cover"
                          />
                          <div>
                            <h3 className="text-md text-text max-w-md">{product.title}</h3>
                            <dl className="mt-0.5 space-y-px text-[10px] text-text text-center">
                            <p>
                              {dollarBluePrice && product.coin === "USD" ? (
                                <>
                                  <del className="mr-2">{product.coin} ${cartProducts.filter(id => id === product._id).length * product.price}</del>{" "}
                                  ARS ${cartProducts.filter(id => id === product._id).length * product.price * dollarBluePrice}
                              </>
                              ) : (
                                <>
                                  {product.coin} ${cartProducts.filter(id => id === product._id).length * product.price}
                                </>
                              )}
                            </p>

                            </dl>
                          </div>
                          <div>
                            <label htmlFor="Quantity" className="sr-only">Quantity</label>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                className="w-10 h-10 leading-10 text-text transition hover:opacity-75 border"
                                onClick={() => decreaseProduct(product._id)}
                              >
                                -
                              </button>
                              <input
                                type="number"
                                id="Quantity"
                                value={cartProducts.filter(id => id === product._id).length}
                                className="h-10 w-16 rounded border border-secondary text-bgWolf font-bold text-center [-moz-appearance:_textfield] sm:text-md [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                              />
                              <button
                                type="button"
                                className="w-10 h-10 leading-10 text-text transition hover:opacity-75 border"
                                onClick={() => increaseProduct(product._id)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  ))}
                  <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                    <div className="max-w-md space-y-4">
                      <dl className="space-y-0.5 text-md text-gray-700">
                        <div className="flex justify-end text-bgWolf border-b mb-3">
                          <button onClick={deleteCart}>Vaciar carrito</button>
                        </div>
                        <div className="flex justify-between !text-lg font-medium">
                          <dt>Subtotal</dt>
                          <dd>ARS ${formatPrice(total)}</dd>
                        </div>
                        {/* <div className="flex justify-between">
                          <dt>VAT</dt>
                          <dd>ARS. {formatPrice(total / 1000)}</dd>
                        </div> */}
                        <div className="flex justify-between !text-base font-medium">
                          <dt>Total</dt>
                          <dd>ARS ${formatPrice(total)}</dd>
                        </div>
                      </dl>
                      <div className="flex justify-end">
                        <Link
                          className="group flex items-center justify-between gap-4 rounded-lg border border-current px-4 py-2 text-bgWolf transition-colors hover:bg-bgWolf focus:outline-none focus:ring active:bg-bgWolf"
                          href="/products"
                        >
                          <span className="font-medium transition-colors group-hover:text-white">
                            Continuar Comprando
                          </span>
                          <span
                            className="shrink-0 rounded-full border border-bgWolf bg-white p-2 group-active:border-orange-500"
                          >
                            <svg
                              className="h-4 w-4 rtl:rotate-180"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {!products.length ? '' : (
            <div className="md:1/3 mt-16 md:mt-6">
              <header className="text-start flex flex-col w-full">
                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Detalles de envio</h1>
                <p className="mt-2 text-text text-lg">Usaremos tus datos para realizar el envio.</p>
              </header>
              <div className="mx-auto max-w-xl p-4 border shadow-xl h-[400px] my-3">
                <div className="space-y-5">
                  <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-6">
                      <label className="mb-1 block text-sm font-medium text-text">Email</label>
                      <input type="email" name="email" className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" value={session.user.email} placeholder='Email' />
                    </div>
                    <div className="col-span-6">
                      <label className="mb-1 block text-sm font-medium text-text">Nombre Completo</label>
                      <input type="text" name="name" className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" value={session.user.name} placeholder='Nombre y Apellido' />
                    </div>
                    <div className="col-span-12">
                      <label className="mb-1 block text-sm font-medium text-text">Direccion</label>
                      <input type="text" name="address" className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="Pasaje salta 1315" value={address} onChange={ev => setAddress(ev.target.value)} required />
                    </div>
                    <div className="col-span-6">
                      <label className="mb-1 block text-sm font-medium text-text">Ciudad</label>
                      <input type="text" name="city" className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="" value={city} onChange={ev => setCity(ev.target.value)} required />
                    </div>
                    <div className="col-span-4">
                      <label className="mb-1 block text-sm font-medium text-text">Provincia</label>
                      <input type="text" name="state" className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="" value={country} onChange={ev => setCountry(ev.target.value)} required />
                    </div>
                    <div className="col-span-2">
                      <label className="mb-1 block text-sm font-medium text-text">CP</label>
                      <input type="text" name="zip" className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="" value={zip} onChange={ev => setZip(ev.target.value)} required />
                    </div>
                    <div className="col-span-12 text-center w-full">
                      <button
                        onClick={stripeCheckout}
                        className="disabled block rounded bg-bgWolf px-5 py-3 text-md text-text transition hover:bg-bgWolf hover:text-white w-full"
                      >
                        Terminar Pedido
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      );
    }

    return (
      <div className="grid h-screen px-4 bg-white place-content-center">
        <div className="text-center">
          <p className="mt-4 text-bgWolf rounded-md border border-accent px-6 py-3 text-2xl">Debes ingresar para ver el carrito</p>
          <button
            onClick={() => signIn('google')}
            className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-colWolf rounded hover:bg-bgWolf focus:outline-none focus:ring"
          >
            Inicio / Registro
          </button>
        </div>
      </div>
    );
  }
