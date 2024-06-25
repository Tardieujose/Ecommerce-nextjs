import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../lib/CartContext";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from 'next/image';
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const { cartProducts } = useContext(CartContext);
  const router = useRouter();
  const { pathname } = router;
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    // Update the currentPath state on client side
    setCurrentPath(window.location.pathname);
  }, []);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const active = 'p-2 text-bgWolf bg-colWolf rounded-lg';
  const inActive = 'p-2';

  const categories = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <header className="bg-white sticky top-0 z-40 w-full px-2 md:px-4">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center gap-8 border-b border-bgWolf border-opacity-40">
          <Link className="flex gap-1 items-center text-text font-medium text-lg hover:text-bgWolf" href="/">
            <Image src="/BadWolf.png" alt="BadWolf" width={300} height={300} className="w-14 h-14" />
            <span>Bad Wolf</span>
          </Link>

          <div className="flex flex-1 items-center justify-end md:justify-between p-10 font-semibold">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-md">
                <li>
                  <Link className={`text-accent transition hover:text-accent/75 ${pathname === '/' ? active : inActive}`} href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className={`text-accent transition hover:text-accent/75 ${pathname === '/products' ? active : inActive}`} href="/products">
                    Todos los Productos
                  </Link>
                </li>
                <li className="hidden 3xl:table">
                  <Link className={`text-accent transition hover:text-accent/75 ${pathname === '/categories' ? active : inActive}`} href="/categories">
                    Categorias
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              {session ? (
                <div className="sm:flex sm:gap-2 border-r border-bgWolf pr-4" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                  <div className="h-9 w-9">
                    <Image width={300} height={300} className="h-full w-full rounded-full object-cover object-center" src={session.user.image} alt={session.user.email} />
                  </div>
                </div>
              ) : (
                <div className="sm:flex sm:gap-2 border-r pr-4">
                  <button
                    onClick={() => signIn('google')}
                    className="inline-block px-5 py-3 text-lg font-medium text-bgWolf hover:bg-bgWolf hover:text-white rounded-md focus:outline-none focus:ring"
                  >
                    Inicio / Registro
                  </button>
                </div>
              )}

              <div className="ml-4 flow-root lg:ml-4">
                <Link href="/cart" className="group -m-2 flex items-center p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <span className="ml-2 text-md text-bgWolf font-bold group-hover:text-text">{cartProducts.length}</span>
                  <span className="sr-only">items in cart, view bag</span>
                </Link>
              </div>

              {/* Mobile navigation button */}
              <div className="block mr-0 md:hidden">
                <button
                  onClick={toggleMobileNav}
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                >
                  {isMobileNavOpen ? (
                    // X icon for close
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    // Menu icon for open
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>

              {isMobileNavOpen && (
                <div className="sm:hidden absolute top-24 right-0 bg-white border border-zinc-200 rounded shadow-lg p-6 text-lg">
                  <nav aria-label="Global">
                    <ul className="flex flex-col items-start gap-4 text-md">
                      <li>
                        <Link className={`text-accent transition hover:text-accent/75 ${pathname === '/' ? active : inActive}`} href="/" onClick={toggleMobileNav}>
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link className={`text-accent transition hover:text-accent/75 ${pathname === '/products' ? active : inActive}`} href="/products" onClick={toggleMobileNav}>
                          Todos los Productos
                        </Link>
                      </li>
                        <MobileMenu categories={categories} />
                      <li>
                        {session && (
                          <button onClick={() => signOut()}>Logout</button>
                        )}
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
