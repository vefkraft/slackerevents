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

import Logo from "../../../public/Logo.png";
import profile from "../../../public/assets/icons/Profile.svg";
import Socials from "@/components/UI/SocialMedia/socials";
import Button from "@/components/UI/UniversalButton/button";
import type { NavLink } from "@/types";
import "./navigation.styled.css";

// -----------------------------
// Navigation links configuration
// -----------------------------
const navLinks: NavLink[] = [
  { to: "/",           text: "HOME",         desktopOnly: true },
  { to: "/all-events", text: "EVENTS",       desktopOnly: true },
  { to: "/gallery",    text: "GALLERY",      desktopOnly: true },
  { to: "/contact",    text: "CONTACT US",   desktopOnly: true },
  { to: "/favorites",  text: "FAVORITES",    requiresAuth: true },
  { to: "/my-tickets", text: "MY TICKETS",   requiresAuth: true },
  { to: "/settings",   text: "SETTINGS",     requiresAuth: true },
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
  // Render
  // -----------------------------
  return (
    <nav className="navbar flex items-center justify-between px-4 py-2">
      {/* Logo (always visible) */}
      <Link href="/">
        <Image src={Logo} alt="Logo" className="Logo" priority />
      </Link>

      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="flex items-center gap-6">
          {/* Main navigation links */}
          {navLinks
            .filter((l) => l.desktopOnly)
            .map(({ to, text }) => (
              <Link
                key={to}
                href={to}
                className={`text-white font-semibold hover:text-pink-400 transition ${
                  pathname === to ? "underline" : ""
                }`}
              >
                {text}
              </Link>
            ))}

          {/* User dropdown menu */}
          <div className="relative" ref={dropdownWrapperRef}>
            <Button
              onClick={() => setUserMenuOpen((v) => !v)}
              variant="secondary"
              className="text-xl leading-none px-2 py-1 bg-transparent"
            >
              <Image src={profile} alt="Profile" />
            </Button>

            {/* Dropdown content */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg py-2 z-[9999]">
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
                    <Link
                      href="/favorites"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Favorites
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <Link
                      href="/my-tickets"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      My Tickets
                    </Link>
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

      {/* Mobile Navigation (Burger Menu) */}
      {isMobile && (
        <Menu
          isOpen={menuOpen}
          onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
          right
          burgerButtonClassName={
            menuOpen ? "bm-burger-button open" : "bm-burger-button"
          }
          className="position-absolute"
        >
          {/* All navigation links */}
          {navLinks.map(({ to, text, requiresAuth }) => (
            <button
              key={to}
              onClick={() => {
                setMenuOpen(false);
                // If link requires auth and user is not logged in, redirect to login with callback
                if (requiresAuth && !isLoggedIn) {
                  router.push(`/login?callbackUrl=${encodeURIComponent(to)}`);
                } else {
                  router.push(to);
                }
              }}
              className={`text-white text-2xl font-bold py-4 w-full text-center hover:text-pink-400 transition ${
                pathname === to ? "underline" : ""
              }`}
            >
              {text}
            </button>
          ))}

          {/* Login/Logout button for mobile */}
          {!isLoggedIn ? (
            <Link
              href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}
              className="mt-4 w-full text-center text-xl px-3 py-1 rounded transition font-medium bg-blue-600 text-white hover:bg-blue-700 block"
              onClick={e => {
                e.preventDefault(); // Prevent default navigation
                setMenuOpen(false); // Close menu
                router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`); // Navigate to login
              }}
            >
              Log in
            </Link>
          ) : (
            <Button
              onClick={() => {
                setMenuOpen(false);
                signOut();
              }}
              variant="danger"
              className="mt-4 w-full text-center text-xl"
            >
              Log out
            </Button>
          )}

          {/* Social media footer */}
          <footer className="flex justify-center mt-6">
            <Socials />
          </footer>
        </Menu>
      )}
    </nav>
  );
};

export default Navigation;
