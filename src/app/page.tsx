"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const DynamicScrollytellingCanvas = dynamic(
  () => import("@/components/3d/ScrollytellingCanvas").then((mod) => mod.ScrollytellingCanvas),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-50 px-6 py-6 flex items-center justify-between mix-blend-difference text-white">
        <div className="text-2xl font-bold tracking-tighter">ENDEW.</div>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="/catalog" className="hover:opacity-70 transition-opacity">Collections</Link>
          <Link href="#" className="hover:opacity-70 transition-opacity">New Arrivals</Link>
          <Link href="#" className="hover:opacity-70 transition-opacity">Editorial</Link>
          <Link href="#" className="hover:opacity-70 transition-opacity">About</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/profile" className="text-sm font-medium hover:opacity-70 transition-opacity font-plus-jakarta">Account</Link>
          <button className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity font-plus-jakarta">
            <ShoppingBag className="w-5 h-5" />
            <span>(0)</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=3270&auto=format&fit=crop"
            alt="Fashion Hero"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6"
          >
            ELEVATE <br /> YOUR STYLE
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl font-light mb-10 max-w-xl mx-auto"
          >
            Discover the new Fall/Winter collection. <br className="hidden md:block" /> Crafted for the modern minimalist.
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link 
              href="/catalog"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-black hover:text-white transition-all duration-300 font-plus-jakarta"
            >
              Shop the Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 3D Scrollytelling Experience */}
      <section className="relative w-full">
        <DynamicScrollytellingCanvas />
      </section>

      {/* Categories */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Curated for You</h2>
          <Link href="/catalog" className="hidden md:flex items-center gap-1 font-medium hover:opacity-70 transition-opacity text-black">
            View all categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Women", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop" },
            { title: "Men", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1400&auto=format&fit=crop" },
            { title: "Accessories", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1400&auto=format&fit=crop" },
          ].map((category, index) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative h-[500px] overflow-hidden rounded-2xl cursor-pointer"
            >
              <img 
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-white text-2xl font-semibold mb-2">{category.title}</h3>
                <span className="text-white/80 flex items-center gap-2 group-hover:gap-3 transition-all">
                  Shop now <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter mb-4 md:mb-0">ENDEW.</div>
          <div className="text-sm text-white/50">© 2026 ENDEW Fashion. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
