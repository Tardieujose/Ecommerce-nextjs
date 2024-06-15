import Link from "next/link";
import Image from 'next/image';

// Utility function to format price with a comma for thousands
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function Collection({ product }) {
  if (product) {
    let headerText;
    let linkHref;
    let imgSrc;
    let imgAlt;

    switch (product) {
      case 1:
        headerText = "Resistencias Algodones";
        linkHref = "/categories/ResistenciasyAlgodones";
        imgSrc = "https://res.cloudinary.com/drvrc6y7b/image/upload/v1716497625/Bad-Wolf-Tienda/CoilandCotton_inl9zc.jpg";
        imgAlt = "Category 1";
        break;
      case 2:
        headerText = "Liquidos Nacionales";
        linkHref = "/categories/Liquidosnacionales";
        imgSrc = "https://res.cloudinary.com/drvrc6y7b/image/upload/v1716497625/Bad-Wolf-Tienda/CoilandCotton_inl9zc.jpg";
        imgAlt = "Category 2";
        break;
      case 3:
        headerText = "Sales Nacionales";
        linkHref = "/categories/Salesnacionales";
        imgSrc = "https://res.cloudinary.com/drvrc6y7b/image/upload/v1716497625/Bad-Wolf-Tienda/CoilandCotton_inl9zc.jpg";
        imgAlt = "Category 3";
        break;
      case 4:
        headerText = "Resistencias Comerciales";
        linkHref = "/categories/Resistenciascomerciales";
        imgSrc = "https://res.cloudinary.com/drvrc6y7b/image/upload/v1716497625/Bad-Wolf-Tienda/CoilandCotton_inl9zc.jpg";
        imgAlt = "Category 4";
        break;
      case 5:
        headerText = "es distinto e";
        linkHref = "/categories/Category5";
        imgSrc = "https://res.cloudinary.com/drvrc6y7b/image/upload/v1716497625/Bad-Wolf-Tienda/Image5.jpg";
        imgAlt = "Category 5";
        break;
      case 6:
        headerText = "es distinto f";
        linkHref = "/categories/Category6";
        imgSrc = "https://res.cloudinary.com/drvrc6y7b/image/upload/v1716497625/Bad-Wolf-Tienda/Image6.jpg";
        imgAlt = "Category 6";
        break;
      default:
        headerText = "New Collection";
        linkHref = "/categories/ResistenciasyAlgodones";
        imgSrc = "https://res.cloudinary.com/drvrc6y7b/image/upload/v1716497625/Bad-Wolf-Tienda/CoilandCotton_inl9zc.jpg";
        imgAlt = "Resistencias y Algodones";
        break;
    }

    return (
      <>
        <section>
          <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4 xl:gap-y-8">
          <div className="mx-auto sm:px-1 sm:my-auto lg:px-2 group block overflow-hidden border border-accent rounded-xl border-opacity-0">
            <header className="text-center">
              <h2 className="text-sm font-bold text-gray-900 sm:text-lg border-b p-3">
                {headerText}
              </h2>
    
              {/* <p className="max-w-lg text-xs mx-auto mt-4 text-gray-500">
                Explore our latest arrivals and elevate your style with our exclusive new collection.
              </p> */}
            </header>
    
            <div className="group">
              <div className="group block overflow-hidden">
                <div className="p-4">
                  <div className="relative h-[90px] sm:h-[110px]">
                    <ul className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                      <li>
                        <div className="group relative">
                          <Link href={linkHref}>
                            <Image
                              src={imgSrc}
                              alt={imgAlt}
                              width={300}
                              height={300}
                              className="absolute w-full aspect-square rounded-2xl"
                            />
                            {/* <img
                              src={product.images[0]}
                              alt=""
                              className="object-cover w-full rounded aspect-square"
                            /> */}
                          </Link>
                        </div>
                      </li>
                      {/* Otros elementos de producto pueden ser añadidos de forma similar */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>
      </>
    );
  }
  return null;
}
