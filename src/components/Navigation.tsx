'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navigation() {
  const activePath = usePathname();

  const routes = [
    { name: "Home", path: "/" },
    { name: "Buyer Dashboard", path: "/dashboard/buyer" },
    { name: "Seller Dashboard", path: "/dashboard/seller" },
  ];

  return (
    <nav className="bg-white shadow-sm ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              DataMarket
            </Link>
          </div>

          {/* Nav Links */}
          <ul className="hidden sm:flex sm:space-x-8 items-center">
            {routes.map((route) => (
              <li key={route.path} className="relative flex items-center">
                <Link
                  href={route.path}
                  className={`text-sm font-medium transition ${
                    activePath === route.path
                      ? "text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {route.name}
                </Link>

                {activePath === route.path && (
                  <motion.div
                    layoutId="Smooth-active"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-black rounded-full"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
