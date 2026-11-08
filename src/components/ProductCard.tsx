"use client";

import React from "react";
import { Card, Chip, Separator } from "@heroui/react";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { IProduct } from "@/types/type";

export default function ProductCard({ product }: { product: IProduct }) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link href={`/product/${product.id}`} className="block h-full group">
      <Card className="h-full p-5 rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:border-blue-200 transition-all flex flex-col justify-between">
        {/* Top Part: Icon, Category, Route & Duration */}
        <Card.Content className="p-0 flex flex-col gap-4">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              {/* Transport Emoji Box */}
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shrink-0">
                {product.image}
              </div>

              {/* Category Badge & Service Type */}
              <div className="flex flex-col items-start gap-1">
                <Chip
                  size="sm"
                  className="px-2.5 py-0.5 h-5 rounded-full bg-blue-50 text-[#0d6efd] font-bold text-[11px]"
                >
                  {product.nameBn}
                </Chip>
                <span className="text-xs text-slate-500 font-medium">
                  প্রতি কেজি
                </span>
              </div>
            </div>

            {/* Percentage Change Badge */}
            <Chip
              size="sm"
              className={`px-2.5 py-0.5 h-6 rounded-full text-xs font-bold flex items-center gap-1 border ${
                isUp
                  ? "bg-[#fff1f2] text-[#e11d48] border-[#ffe4e6]"
                  : isDown
                    ? "bg-[#ecfdf5] text-[#059669] border-[#d1fae5]"
                    : "bg-slate-100 text-slate-600 border-slate-200"
              }`}
            >
              {isUp && "▲ "}
              {isDown && "▼ "}
              {!isUp && !isDown && "— "}
              {Math.abs(product.change.pct).toLocaleString("bn-BD", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
              %
            </Chip>
          </div>

          {/* Route Title & Meta Info */}
          <div className="flex flex-col gap-1.5 mt-0.5">
           

            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              {/* <Clock size={13} className="shrink-0" /> */}
              {/* <span>আজকের দাম</span> */}
              
              {/* <span> <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#0d6efd] transition-colors leading-snug">
              <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#0d6efd] transition-colors leading-snug">
              {product.nameBn}
            </h3>
            <h3>{product.today}</h3>টাকা</span> */}
<div>
<h2>আজকের দাম</h2>
<span className="flex items-center gap-1"><h2 className="text-lg font-bold text-slate-900 group-hover:text-[#0d6efd]">{product.today}</h2>
টাকা
</span>
</div>


            </div>
          </div>
        </Card.Content>

        {/* Bottom Part: Today's Fare & Action Circle */}
        <div className="mt-5">
          <Separator className="w-full bg-slate-100 mb-3.5" />

          <Card.Footer className="p-0 flex items-end justify-between">
            <div className="flex flex-col gap-0.5">
              
              <div className="flex items-baseline gap-1">
                {/* <span className="text-xl font-extrabold text-slate-900">
                  {product.today.toLocaleString("bn-BD")} টাকা
                </span> */}
                
              </div>
            </div>

            {/* <div className="w-9 h-9 rounded-full bg-slate-100/80 group-hover:bg-[#0d6efd] text-slate-500 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
              <ArrowRight size={16} />
            </div> */}
          </Card.Footer>
        </div>
      </Card>
    </Link>
  );
}
