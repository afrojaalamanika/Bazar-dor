"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { Chip } from "@heroui/react";
import Link from "next/link";

const LIVE_FARES = [
  {
    "id": 1,
    "nameBn": "স্বর্ণমাছি চাল",
    "unit": "kg",
    "image": "🍚",
    "today": 148,
  
    "change": {
      "dir": "up",
      "pct": 2.1}
  },
  {
    "id": 4,
    "nameBn": "বাটাম সাইজ চাল",
    "unit": "kg",
    "image": "🍚",
    "today": 66,
    
    "change": {
      "dir": "up",
      "pct": 3.1}
  },
  {
     "id": 5,
      "unit": "kg",
    "slug": "mosur-dal",
    "nameBn": "মসুর ডাল",
    "image": "🫘",
    "today": 142,
    "change": {
      "dir": "up",
      "pct": 2.9
    },
  },
  {
    "id": 7,
    "slug": "chola-dal",
    "nameBn": "ছোলা",
    "unit": "kg",
    "image": "🫘",
    "today": 120,
    "change": {
      "dir": "down",
      "pct": -2.4
    },
  },
  {
     "id": 8,
    "slug": "aman-dal-khosasila",
    "nameBn": "আমন ডাল (খোসাসিলা)",
    "unit": "kg",
    "image": "🫘",
    "today": 156,
     "change": {
      "dir": "up",
      "pct": 2.6
    },
  },
  
 
];

export default function Marque() {
  return (
    <div className="w-full bg-[#0b1324] text-white flex items-center h-11 overflow-hidden border-b border-slate-800">
      {/* Scrolling Marquee Section */}
      <Marquee
        pauseOnHover={true}
        speed={45}
        gradient={false}
        className="flex items-center h-full overflow-hidden"
      >
        {LIVE_FARES.map((item) => {
          const isUp = item.change.dir === "up";
          const isDown = item.change.dir === "down";

          return (
            <Link
              key={item.id}
              href={`/product/${item.slug}`}
              className="flex items-center gap-2 mx-3 px-3 py-1 rounded-lg hover:bg-slate-800/80 transition-colors whitespace-nowrap text-xs sm:text-sm"
            >
              {/* Transport Icon */}
              <span className="text-base leading-none">{item.image}</span>

              {/* Route Name */}
              <span className="font-bold text-white">{item.nameBn}</span>

              {/* Service Type */}
              

              {/* Today's Fare */}
              <span className="font-bold text-[#fbbf24]">
                {item.today} টাকা/{item.unit}
              </span>

              {/* Price Change Chip */}
              <Chip
                size="sm"
                className={`px-2 py-0.5 h-5 rounded-full text-[11px] font-bold flex items-center gap-0.5 ${
                  isUp
                    ? "bg-[#ffe4e6] text-[#e11d48]"
                    : isDown
                      ? "bg-[#d1fae5] text-[#059669]"
                      : "bg-slate-200 text-slate-700"
                }`}
              >
                {isUp && "▲ "}
                {isDown && "▼ "}
                {!isUp && !isDown && "— "}
                {item.change.pct}
              </Chip>
            </Link>
          );
        })}
      </Marquee>
    </div>
  );
}
