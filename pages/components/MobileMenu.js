import React, { useState } from "react";

export default function MobileMenu({ categories }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderCategory = (product) => {
    let headerText, linkHref, imgSrc, imgAlt;

    switch (product) {
      case 1:
        headerText = "Resistencias Algodones";
        linkHref = "/categories/ResistenciasyAlgodones";
        imgSrc = "https://res.cloudinary.com/drvrc6y7b/image/upload/v1716497625/Bad-Wolf-Tienda/CoilandCotton_inl9zc.jpg";
        imgAlt = "Category 1";
        break;
      case 2:
        headerText = "Líquidos Nacionales";
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
      <div key={product} className="px-4 py-2">
        <a href={linkHref}>{headerText}</a>
      </div>
    );
  };

  return (
    <div className="md:hidden">
      <button onClick={toggleMenu} className="p-2 text-lg font-medium text-accent transition hover:text-accent/75">
        Categorias
      </button>
      {isMenuOpen && (
        <div className="bg-white shadow-md mt-4 rounded-md">
          {categories.map((category) => renderCategory(category))}
        </div>
      )}
    </div>
  );
}
