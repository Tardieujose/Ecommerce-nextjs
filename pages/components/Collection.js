import Link from "next/link";

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
        headerText = "Resistencias y Algodones";
        linkHref = "/categories/ResistenciasyAlgodones";
        imgSrc = "https://res.cloudinary.com/drvrc6y7b/image/upload/v1716497625/Bad-Wolf-Tienda/CoilandCotton_inl9zc.jpg";
        imgAlt = "Category 1";
        break;
      case 2:
        headerText = "Liquidos Nacionales";
        linkHref = "/categories/Liquidosnacionales";
        imgSrc = "https://res.cloudinary.com/drvrc6y7b/image/upload/v1716497625/Bad-Wolf-Tienda/Image2.jpg";
        imgAlt = "Category 2";
        break;
      case 3:
        headerText = "Sales Nacionales";
        linkHref = "/categories/Salesnacionales";
        imgSrc = "https://res.cloudinary.com/drvrc6y7b/image/upload/v1716497625/Bad-Wolf-Tienda/Image3.jpg";
        imgAlt = "Category 3";
        break;
      case 4:
        headerText = "Resistencias Comerciales";
        linkHref = "/categories/Resistenciascomerciales";
        imgSrc = "https://res.cloudinary.com/drvrc6y7b/image/upload/v1716497625/Bad-Wolf-Tienda/Image4.jpg";
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
          <div className="max-w-screen-2xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
            <header className="text-center">
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                {headerText}
              </h2>

              <p className="max-w-lg mx-auto mt-4 text-gray-500">
                Explore our latest arrivals and elevate your style with our exclusive new collection.
              </p>
            </header>

            <div>
              <div className="max-w-screen-2xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
                  <div className="lg:col-span-3 lg:py-8">
                    <ul className="grid grid-cols-1 gap-4">
                      <li>
                        <div className="block group">
                        <Link href={linkHref}>
                          <img
                            src={imgSrc}
                            alt={imgAlt}
                            className="object-cover w-full rounded aspect-square"
                          />
                            {/* <img
                              src={product.images[0]}
                              alt=""
                              className="object-cover w-full rounded aspect-square"
                            /> */}
                          </Link>
                        </div>
                      </li>
                      {/* Other product images can be added similarly if needed */}
                    </ul>
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
