"use client";
import React from "react";
import Link from "next/link";
import { FaSearch, FaShoppingCart, FaBars, FaPlus, FaAngleRight } from "react-icons/fa";

export default function V146() {
  return (
    <header className="bg-[#010d17] text-white px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div style={{backgroundColor:"white",padding:"10px",borderRadius:"20px"}}>
      <Link href="/">
        <img src="https://gramentheme.com/html/fresheat/assets/img/logo/logo.svg" alt="logo" className="h-10" />
      </Link>
</div>
      {/* Desktop Menu */}
      <nav className="hidden md:block">
        <ul className="flex items-center gap-6">
          {/* Home */}
          <li className="relative group">
            <Link href="#" className="flex items-center gap-1 font-semibold hover:text-red-500">
              Home <FaPlus className="text-xs" />
            </Link>
            <ul className="absolute left-0 top-full mt-2 w-48 bg-white text-black shadow-lg 
                           opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                           transition-all text-left">
              <li><Link href="/index.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Home 01</Link></li>
              <li><Link href="/index-2.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Home 02</Link></li>
              <li><Link href="/index-3.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Home 03</Link></li>
            </ul>
          </li>

          {/* About Us */}
          <li className="relative group">
            <Link href="#" className="flex items-center gap-1 font-semibold hover:text-red-500">
              About Us <FaPlus className="text-xs" />
            </Link>
            <ul className="absolute left-0 top-full mt-2 w-48 bg-white text-black shadow-lg 
                           opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                           transition-all text-left">
              <li><Link href="/about.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">About Us 01</Link></li>
              <li><Link href="/about-2.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">About Us 02</Link></li>
            </ul>
          </li>

          {/* Shop */}
          <li className="relative group">
            <Link href="#" className="flex items-center gap-1 font-semibold hover:text-red-500">
              Shop <FaPlus className="text-xs" />
            </Link>
            <ul className="absolute left-0 top-full mt-2 w-56 bg-white text-black shadow-lg 
                           opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                           transition-all text-left">
              <li><Link href="/shop.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Shop</Link></li>
              <li><Link href="/shop-right-sidebar.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Shop Right Sidebar</Link></li>
              <li><Link href="/shop-list.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Shop List</Link></li>
              <li><Link href="/shop-list-right-sidebar.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Shop List Right Sidebar</Link></li>
              <li><Link href="/shop-details.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Shop Details</Link></li>
              <li><Link href="/cart.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Cart List</Link></li>
              <li><Link href="/checkout.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Checkout</Link></li>
              <li><Link href="/wishlist.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Wishlist</Link></li>
            </ul>
          </li>

          {/* Pages (with nested dropdowns) */}
          <li className="relative group">
            <Link href="#" className="flex items-center gap-1 font-semibold hover:text-red-500">
              Pages <FaPlus className="text-xs" />
            </Link>

            {/* First Level */}
            <ul className="absolute left-0 top-full mt-2 w-56 bg-white text-black shadow-lg 
                           opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                           transition-all text-left">
              {/* Chef */}
              <li className="relative group/child">
                <Link href="#" className="flex justify-between items-center px-4 py-2 hover:bg-[#EB0029] hover:text-white font-semibold">
                  Chef <FaAngleRight className="text-xs" />
                </Link>
                {/* Second Level */}
                <ul className="absolute left-full top-0 w-48 bg-white text-black shadow-lg 
                               opacity-0 invisible group-hover/child:opacity-100 
                               group-hover/child:visible transition-all text-left">
                  <li><Link href="/chef.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Chef</Link></li>
                  <li><Link href="/chef-details.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Chef Details 01</Link></li>
                  <li><Link href="/chef-details2.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Chef Details 02</Link></li>
                </ul>
              </li>

              {/* Food Menu */}
              <li className="relative group/child">
                <Link href="#" className="flex justify-between items-center px-4 py-2 hover:bg-[#EB0029] hover:text-white font-semibold">
                  Food Menu <FaAngleRight className="text-xs" />
                </Link>
                <ul className="absolute left-full top-0 w-48 bg-white text-black shadow-lg 
                               opacity-0 invisible group-hover/child:opacity-100 
                               group-hover/child:visible transition-all text-left">
                  <li><Link href="/menu.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Food Menu 01</Link></li>
                  <li><Link href="/menu2.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Food Menu 02</Link></li>
                </ul>
              </li>

              {/* Services */}
              <li className="relative group/child">
                <Link href="#" className="flex justify-between items-center px-4 py-2 hover:bg-[#EB0029] hover:text-white font-semibold">
                  Services <FaAngleRight className="text-xs" />
                </Link>
                <ul className="absolute left-full top-0 w-48 bg-white text-black shadow-lg 
                               opacity-0 invisible group-hover/child:opacity-100 
                               group-hover/child:visible transition-all text-left">
                  <li><Link href="/services.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Services</Link></li>
                  <li><Link href="/service-details.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Service Details</Link></li>
                </ul>
              </li>

              {/* Single pages */}
              <li><Link href="/gallery.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Gallery</Link></li>
              <li><Link href="/testimonials.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Testimonials</Link></li>
              <li><Link href="/reservation.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Reservation</Link></li>
              <li><Link href="/faq.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Faq&apos;s</Link></li>
              <li><Link href="/account.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">My Account</Link></li>
              <li><Link href="/404.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">404 Page</Link></li>
            </ul>
          </li>

          {/* Blog */}
          <li className="relative group">
            <Link href="#" className="flex items-center gap-1 font-semibold hover:text-red-500">
              Blog <FaPlus className="text-xs" />
            </Link>
            <ul className="absolute left-0 top-full mt-2 w-48 bg-white text-black shadow-lg 
                           opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                           transition-all text-left">
              <li><Link href="/blog.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Blog</Link></li>
              <li><Link href="/blog-standard.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Blog Standard</Link></li>
              <li><Link href="/blog-left-sidebar.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Blog Left Sidebar</Link></li>
              <li><Link href="/blog-details.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Blog Details</Link></li>
            </ul>
          </li>

          {/* Contact */}
          <li className="relative group">
            <Link href="#" className="flex items-center gap-1 font-semibold hover:text-red-500">
              Contact Us <FaPlus className="text-xs" />
            </Link>
            <ul className="absolute left-0 top-full mt-2 w-48 bg-white text-black shadow-lg 
                           opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                           transition-all text-left">
              <li><Link href="/contact.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Contact Us 01</Link></li>
              <li><Link href="/contact2.html" className="block px-4 py-2 hover:bg-[#EB0029] hover:text-white">Contact Us 02</Link></li>
            </ul>
          </li>
        </ul>
      </nav>

      {/* Right side icons */}
      <div className="flex items-center gap-4">
        <FaSearch className="hover:text-red-500 cursor-pointer" />
        <div className="relative cursor-pointer">
          <FaShoppingCart className="hover:text-red-500" />
          <span className="absolute -top-2 -right-2 bg-orange-500 text-xs px-1 rounded-full">3</span>
        </div>
        <FaBars className="hover:text-red-500 cursor-pointer text-xl" />
      </div>
    </header>
  );
}