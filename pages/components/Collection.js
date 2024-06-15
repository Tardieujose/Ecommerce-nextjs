import Link from "next/link";
import Image from 'next/image';

export default function Collection({ product }) {
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
  }

  return (
    <>
      <section>
        <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4 xl:gap-y-8">
          <div className="mx-auto sm:px-1 sm:my-auto lg:px-2 group block overflow-hidden border border-accent rounded-xl border-opacity-100">
            <header className="text-center">
              <h2 className="text-sm font-bold text-gray-900 sm:text-lg border-b p-3">
                <Link href={linkHref}>
                  {headerText}
                </Link>
              </h2>
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
                          </Link>
                        </div>
                      </li>
                      
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
