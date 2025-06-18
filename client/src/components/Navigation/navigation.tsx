"use client";

// -----------------------------
// Imports
// -----------------------------
import { fallDown as Menu } from "react-burger-menu";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Logo from "../../../public/Logo2.svg";
import Logout from "../../../public/assets/icons/logout.svg"
import profile from "../../../public/assets/icons/Profile.svg";
import Socials from "@/components/UI/SocialMedia/socials";
import Button from "@/components/UI/UniversalButton/button";
import type { NavLink } from "@/types";
import "./navigation.styled.css";

// -----------------------------
// Navigation links configuration
// -----------------------------
const navLinks: NavLink[] = [
  // public
  { to: "/",           text: "HOME",         desktopOnly: true },
  { to: "/all-events", text: "EVENTS",       desktopOnly: true },
  { to: "/contact",    text: "CONTACT",      desktopOnly: true },
  { to: "/gallery",    text: "GALLERY",      desktopOnly: true },
  // useraccessible
  { to: "/favorites",  text: "FAVORITES",    requiresAuth: true },
  { to: "/my-tickets", text: "MY TICKETS",   requiresAuth: true },
  { to: "/settings",   text: "SETTINGS",     requiresAuth: true },
];

// User-specific links (shown in dropdown)
const userLinks = [
  { to: "/favorites",  text: "Favorites" },
  { to: "/settings",   text: "Settings" },
  { to: "/my-tickets", text: "My Tickets" },
];

// -----------------------------
// Main Navigation Component
// -----------------------------
const Navigation: React.FC = () => {
  // Routing and session hooks
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  // State for responsive/mobile and dropdowns
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Ref for user dropdown (to detect outside clicks)
  const dropdownWrapperRef = useRef<HTMLDivElement>(null);

  // -----------------------------
  // Effects
  // -----------------------------

  // Detect mobile viewport
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const y = window.scrollY;
    document.body.style.cssText = `position:fixed;top:-${y}px;overflow:hidden;width:100%`;
    return () => {
      document.body.style.cssText = "";
      window.scrollTo(0, y);
    };
  }, [menuOpen]);


  // Close user dropdown on outside click
  useEffect(() => {
    if (!userMenuOpen) return;
    const close = (e: MouseEvent) => {
      if (!dropdownWrapperRef.current?.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [userMenuOpen]);








  // -----------------------------
  return (
    <div className="navWrapper font-squada">
    <nav className="navbar">
      {/* Logo */}
      <Link href="/"
      onClick={() => setMenuOpen(false)}
      className="flex align-center "
      >
        <Image src={Logo} alt="Logo" className="Logo" priority />
      </Link>

      {/* ------------------------- */}
      {/* Desktop Navigation */}
      {/* ------------------------- */}
      {!isMobile && (
        <div className="flex items-center gap-6">
          {/* Main navigation links */}
          {navLinks
            .filter((l) => l.desktopOnly)
            .map(({ to, text }) => (
              <Link
                key={to}
                href={to}
                className={`text-white text-2xl px-2 font-semibold hover:text-[var(--color-acidYellow)] transition ${
                  pathname === to ? "text:[var(--color-acidYellow)]" : ""
                }`}
              >
                {text}
              </Link>
            ))}

          {/* User dropdown menu */}
          <div className="relative" 
            ref={dropdownWrapperRef}>
            <Button
              onClick={() => setUserMenuOpen((v) => !v)}
              variant="default"
              className="text-xl leading-none px-2 py-1 bg-transparent"
            >
              <Image src={profile} alt="Profile" />
            </Button>

            {/* Dropdown content */}
            {userMenuOpen && (
              <div className="absolute right-[-2rem] top-[4rem] w-[150px] border border-[var(--color-acidYellow)] rounded shadow-lg z-50">
                {/* If not logged in, show login */}
                {!isLoggedIn ? (
                  <Link
                    href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}
                    className="mt-4 w-full text-center text-xl px-3 py-1 rounded transition font-medium bg-blue-600 text-white hover:bg-blue-700 block"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Log in
                  </Link>
                ) : (
                  <>
                    {/* Authenticated user links */}
                    {userLinks.map(({ to, text }) => (
                    <Link
                      key={to}
                      href={to}
                      onClick={() => setMenuOpen(false)}
                      className={`text-white text-sm font-bold py-4 w-full flex flex-col text-center hover:text-[var(--color-acidYellow)] transition ${
                        pathname === to ? "text-[var(--color-acidYellow)]" : ""
                      }`}
                    >
                      {text}
                    </Link>
                    ))}
                    <Button
                      onClick={() => signOut()}
                      variant="danger"
                      className="w-full text-left px-4 py-2"
                    >
                      Log out
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      </nav>
      {/* ------------------------- */}
      {/* Mobile Navigation (Burger Menu) */}
      {/* ------------------------- */}
      {isMobile && (
      <div className="flexbox justify-between items-center ">
          {/* Burger menu */}
          <Menu
            isOpen={menuOpen}
            onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
            right
            burgerButtonClassName={
              menuOpen ? "bm-burger-button open" : "bm-burger-button"
            }
          >
            {/* All navigation links */}
          {navLinks.map(({ to, text, requiresAuth }) => (
            <Link
              key={to}
              href={
                requiresAuth && !isLoggedIn
                  ? `/login?callbackUrl=${encodeURIComponent(to)}`
                  : to
              }
              onClick={() => setMenuOpen(false)}
              className={`text-white text-2xl font-bold py-4 w-full text-center hover:text-[var(--color-acidYellow)] transition ${
                pathname === to ? "text-[var(--color-acidYellow)]" : ""
              }`}
            >
              {text}
            </Link>
          ))}

            <footer className="flex justify-center mt-6">
              <Socials />
            </footer>
          </Menu>

          {/* Login/Logout button - OUTSIDE the menu */}
          <div className="absolute z-50 right-[105px] top-9">
            {!isLoggedIn ? (
              <Link className=""
                onClick={() => setMenuOpen(false)}
                href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}
                aria-label="Login"
              >
                <Image src={profile} alt="Profile" width={32} height={32} className="w-9 h-9" />
              </Link>
            ) : (
              <Button
                onClick={() => signOut()}
                className=""
              >
                <Image src={Logout} alt="Profile" width={400} height={400} className="w-9 h-9" />
              </Button>
            )}
          </div>
      </div>
      )}
    
    </div>
  );
};

// -----------------------------
// Helper function to check if a URL is a safe redirect - helps prevent open redirects to external sites.
// -----------------------------
function isSafeRedirect(url: string) {
  // Kun relative interne links tillades
  return url.startsWith("/") && !url.startsWith("//");
}

export default Navigation;
