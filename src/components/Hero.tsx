"use client";

import React from "react";
import { Button, Card, Chip } from "@heroui/react";
import { Sparkles, ArrowDown, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";


export default function HeroSection() {
  return (
    <section className="w-full  from-[#f0f6ff] via-[#f8fafc] to-white py-12 sm:py-20 border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Text Content & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Top Update Badge */}
          {/* <Chip className="px-3.5 py-1.5 h-auto rounded-full bg-blue-50/90 border border-blue-200/80 text-[#0d6efd] text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-2xs mb-5">
            <Sparkles size={15} className="text-[#0d6efd] shrink-0" />
            <span>বাংলাদেশের ভ্রমণ ভাড়ার আপডেট</span>
          </Chip> */}

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.2] sm:leading-[1.18] text-slate-900">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Subtitle / Description */}
          <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Action Row */}
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href={"/#all-products"}>
              <Button
                type="button"
                variant="primary"
                className="h-12 px-6 rounded-2xl bg-[#0d6efd] hover:bg-blue-700 text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-[0_10px_25px_-5px_rgba(13,110,253,0.4)] transition-all cursor-pointer"
              >
                <span>সব পণ্য দেখুন</span>
                <ArrowDown size={18} />
              </Button>
            </Link>

            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 font-medium">
            </div>
          </div>
        </div>

     
        {/* Right Column: Popular Routes Card */}
  <div className="lg:col-span-5 w-full flex justify-center">
  
  <Image
    src="/images/bazar-hero.png"
    alt="Bazar Dor"
    width={700} height={500}
    className="w-full max-w-600px h-auto object-contain"
    priority
    
  />
  </div>
      </div>
    </section>
  );
}
