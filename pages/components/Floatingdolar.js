import { useState, useEffect } from 'react';

const FloatingDollarPrice = () => {
  const [dollarBluePrice, setDollarBluePrice] = useState(null);

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

  return (
<div className="fixed top-16 left-1 w-28 bg-bgWolf bg-opacity-90 font-medium text-black p-0 rounded z-50 flex items-center justify-center text-center">
        {dollarBluePrice !== null ? (
        <span>Dólar Blue: ${dollarBluePrice}</span>
      ) : (
        <span>Cargando...</span>
      )}
    </div>
  );
};

export default FloatingDollarPrice;