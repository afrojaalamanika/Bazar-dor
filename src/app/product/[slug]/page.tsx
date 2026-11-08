
import React from "react";
import Link from "next/link";
import { Home, ChevronRight, TrendingDown, TrendingUp } from "lucide-react";
import { IProduct } from "@/types/type";

const formatPrice = (price: number) =>
  price.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });

const getUnitName = (unit: string) => {
  const units: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    l: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    pcs: "প্রতি পিস",
    piece: "প্রতি পিস",
  };

  return units[unit.toLowerCase()] || `প্রতি ${unit}`;
};

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  let product: IProduct | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`,
      { cache: "no-store" }
    );

    if (res.ok) {
      product = await res.json();
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <h1 className="text-3xl font-black text-slate-800">
          ERROR 404
        </h1>

        <p className="text-slate-500">
          পণ্যটি খুঁজে পাওয়া যায়নি।
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors"
        >
          <Home size={18} />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  // Market data
  const markets = [...product.markets].sort(
    (a, b) => a.min - b.min
  );

  // Minimum price
  const minPrice = Math.min(
    ...markets.map((market) => market.min)
  );

  // Maximum price
  const maxPrice = Math.max(
    ...markets.map((market) => market.max)
  );

  // Average price of all markets
  const avgPrice =
    markets.length > 0
      ? markets.reduce(
          (sum, market) =>
            sum + (market.min + market.max) / 2,
          0
        ) / markets.length
      : 0;

  const changeColor =
    product.change.dir === "up"
      ? "text-rose-500"
      : product.change.dir === "down"
        ? "text-green-600"
        : "text-slate-500";

  return (
    <main className="min-h-screen bg-[#f0f5f1] py-6 sm:py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-5">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-green-600"
          >
            <Home size={14} />
            হোম
          </Link>

          <ChevronRight size={14} />

          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-600"
          >
            {product.categoryNameBn}
          </Link>

          <ChevronRight size={14} />

          <span className="font-bold text-slate-800">
            {product.nameBn}
          </span>
        </div>

        {/* Product Header */}
        <section className="bg-white rounded-2xl border border-slate-200/70 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#f0f5f1] flex items-center justify-center text-4xl shrink-0">
              {product.image}
            </div>

            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {product.nameBn}
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>{product.categoryNameBn}</span>
                <span>·</span>
                <span>{getUnitName(product.unit)}</span>
              </div>

              <p className="text-xs text-slate-500">
                বাংলাদেশের বিভিন্ন বাজারে {product.nameBn} এর বর্তমান দামের তুলনা।
              </p>
            </div>
          </div>

          {/* Today's Price */}
          <div className="bg-[#f0f5f1] rounded-xl px-5 py-3 text-center sm:text-right shrink-0">
            <p className="text-xs text-slate-500">
              আজকের দাম
            </p>

            <h2 className="text-2xl font-black text-slate-800">
              {formatPrice(product.today)}
            </h2>

            <p className="text-xs text-slate-500">
              টাকা / {product.unit === "kg" ? "কেজি" : product.unit}
            </p>

            <div className={`flex items-center justify-center sm:justify-end gap-1 text-xs font-bold mt-1 ${changeColor}`}>
              {product.change.dir === "up" ? (
                <TrendingUp size={13} />
              ) : product.change.dir === "down" ? (
                <TrendingDown size={13} />
              ) : null}

              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}

              {formatPrice(Math.abs(product.change.pct))}%
            </div>
          </div>
        </section>

        {/* Price Summary */}
        <section className="bg-white rounded-2xl border border-slate-200/70 p-4 sm:p-6 space-y-4">

          <h2 className="text-base font-extrabold text-slate-800">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

            {/* Minimum */}
            <div className="rounded-xl border border-slate-200/70 bg-[#fbfdfb] p-4 space-y-1">
              <p className="text-xs font-medium text-slate-500">
                সর্বনিম্ন দাম
              </p>

              <h3 className="text-2xl font-black text-green-600">
                {formatPrice(minPrice)} টাকা
              </h3>

              <p className="text-[11px] text-slate-500">
                বাজারে পাওয়া সর্বনিম্ন দাম
              </p>
            </div>

            {/* Maximum */}
            <div className="rounded-xl border border-slate-200/70 bg-[#fbfdfb] p-4 space-y-1">
              <p className="text-xs font-medium text-slate-500">
                সর্বোচ্চ দাম
              </p>

              <h3 className="text-2xl font-black text-rose-500">
                {formatPrice(maxPrice)} টাকা
              </h3>

              <p className="text-[11px] text-slate-500">
                বাজারে পাওয়া সর্বোচ্চ দাম
              </p>
            </div>

            {/* Average */}
            <div className="rounded-xl border border-slate-200/70 bg-[#fbfdfb] p-4 space-y-1">
              <p className="text-xs font-medium text-slate-500">
                গড় দাম
              </p>

              <h3 className="text-2xl font-black text-green-600">
                {formatPrice(avgPrice)} টাকা
              </h3>

              <p className="text-[11px] text-slate-500">
                প্রতি বাজারের গড় দামের ভিত্তিতে
              </p>
            </div>

          </div>

          {/* Market Table */}
          <div className="space-y-3 pt-1">

            <h2 className="text-base font-extrabold text-slate-800">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="overflow-x-auto rounded-xl border border-slate-200/70">
              <table className="w-full min-w-600px text-left border-collapse">

                <thead>
                  <tr className="bg-[#f8faf9] text-xs font-bold text-slate-500 border-b border-slate-200">
                    <th className="py-3 px-4">বাজার</th>
                    <th className="py-3 px-4">বিভাগ</th>
                    <th className="py-3 px-4 text-right">সর্বনিম্ন</th>
                    <th className="py-3 px-4 text-right">সর্বোচ্চ</th>
                    <th className="py-3 px-4 text-right">গড়</th>
                  </tr>
                </thead>

                <tbody className="text-xs sm:text-sm text-slate-700">

                  {markets.map((market, index) => {
                    const marketAvg =
                      (market.min + market.max) / 2;

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className={`border-b border-slate-200 last:border-b-0 ${
                          index % 2 === 0
                            ? "bg-white"
                            : "bg-[#f0f5f1]"
                        }`}
                      >
                        <td className="py-3 px-4 font-semibold">
                          {market.market}
                        </td>

                        <td className="py-3 px-4">
                          {market.division}
                        </td>

                        <td className="py-3 px-4 text-right">
                          {formatPrice(market.min)} টাকা
                        </td>

                        <td className="py-3 px-4 text-right">
                          {formatPrice(market.max)} টাকা
                        </td>

                        <td className="py-3 px-4 text-right font-semibold">
                          {formatPrice(marketAvg)} টাকা
                        </td>
                      </tr>
                    );
                  })}

                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};

export default ProductDetailsPage;
