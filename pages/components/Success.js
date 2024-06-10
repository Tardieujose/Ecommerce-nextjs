import Link from "next/link";

export default function Success({ cartProducts, products }) {
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  let total = 0;
  const cartProductsArray = Array.isArray(cartProducts) ? cartProducts : [cartProducts];
    for (const productId of cartProductsArray) {
      const price = products && products.find(p => p._id === productId)?.price || 0;
    total += price;
  }

  if (!products || !products.length) {
    return <div>No products found.</div>;
  }


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-center">
          <div className="rounded-full bg-green-100 p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-12 w-12 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div className="text-center mt-4">
          <h2 className="text-2xl font-semibold text-gray-800">Checkout Successful</h2>
          <p className="text-gray-600 mt-2 max-w-sm">
            Your order has been received and is being processed. We&apos;ll send you an email with more details.
          </p>
          <Link href="/products"
             className="block mt-4 text-sm font-medium text-white bg-primary py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring"
             >
              Continue Shopping
          </Link>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">Order Summary</h3>
            {products.length > 0 && products.map(product => (
              <div key={product._id} className="mt-4 flex items-center justify-between">
                <img
                  src={product.images[0]}
                  alt=""
                  className="h-16 w-16 rounded object-cover"
                />
                <div>
                  <h3 className="text-md text-text">{product.title}</h3>
                  <dl className="mt-0.5 space-y-px text-[10px] text-text">
                    <p>ksh. {cartProducts.filter(id => id === product._id).length * product.price}</p>
                  </dl>
                </div>
                <div className="text-right">
                  <p className="text-md text-text">
                    Quantity: {cartProducts.filter(id => id === product._id).length}
                  </p>
                </div>
              </div>
            ))}
            <div className="mt-8 border-t pt-4">
              <div className="flex justify-between !text-lg font-medium">
                <dt>Total</dt>
                <dd>Ksh. {formatPrice(total)}</dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
