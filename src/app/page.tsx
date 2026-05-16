"use client"

import Sidebar from "@/components/common/Sidebar";
import { useState } from "react";
import {
  MdOutlineCheckroom,
  MdVisibility,
  MdAdd,
  MdAutoAwesome,
  MdBarChart,
  MdArrowForward,
  MdAddPhotoAlternate,
  MdCloud,
} from "react-icons/md";
import { PiWashingMachine } from "react-icons/pi";
import { LuShirt } from "react-icons/lu";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-sw-bg font-['Be_Vietnam_Pro',sans-serif]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-sw-surface border-b border-sw-light/30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl hover:bg-sw-light/30 transition-colors"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <path d="M0 14V12H20V14H0ZM0 8V6H20V8H0ZM0 2V0H20V2H0Z" fill="#324B49" />
            </svg>
          </button>
          <span className="text-sw-primary font-bold text-base">Smart Wardrobe</span>
        </div>

        {/* Page content — w-full, no max-width cap so it fills the space */}
        <div className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-16 lg:pb-32">

          {/* Welcome section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 lg:mb-10">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sw-dark tracking-tight leading-none">
                Welcome back, Sarah
              </h1>
              <p className="text-sw-mid text-base sm:text-lg leading-7">
                Here's your wardrobe overview for today.
              </p>
            </div>

            {/* Weather widget */}
            <div className="flex items-center gap-3 px-4 lg:px-6 py-3 lg:py-4 rounded-3xl border border-sw-light/20 bg-sw-surface shadow-sm self-start sm:self-auto flex-shrink-0">
              <div className="flex items-center justify-center p-3 rounded-full bg-white shadow-sm">
                <MdCloud size={26} className="text-sw-primary" />
              </div>
              <div>
                <div className="text-sw-mid font-semibold text-sm tracking-[0.7px] uppercase leading-5">
                  ĐÀ LẠT
                </div>
                <div className="text-sw-primary font-bold text-lg leading-7">
                  18°C — Chilly
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard grid — 3 cols on xl so right column isn't empty */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">

            {/* Left column: 8/12 */}
            <div className="xl:col-span-8 flex flex-col gap-6 lg:gap-8">

              {/* Look of the Day */}
              <div className="relative rounded-3xl border border-sw-light/10 bg-white shadow-sm overflow-hidden p-6 lg:p-8">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-sw-mint/30 blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-sw-primary/5 blur-2xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />

                <div className="relative flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
                  {/* Text side */}
                  <div className="flex flex-col justify-between gap-6 flex-1 min-w-0">
                    <div className="flex flex-col gap-4">
                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sw-light/20 bg-sw-surface self-start">
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                          <path d="M7.5 2.25V0H9V2.25H7.5V2.25M7.5 16.5V14.25H9V16.5H7.5V16.5M14.25 9V7.5H16.5V9H14.25V9M0 9V7.5H2.25V9H0V9M13.275 4.275L12.225 3.225L13.5375 1.875L14.625 2.9625L13.275 4.275V4.275M2.9625 14.625L1.875 13.5375L3.225 12.225L4.275 13.275L2.9625 14.625V14.625M13.5375 14.625L12.225 13.275L13.275 12.225L14.625 13.5375L13.5375 14.625V14.625M3.225 4.275L1.875 2.9625L2.9625 1.875L4.275 3.225L3.225 4.275V4.275M8.25 12.75C7 12.75 5.9375 12.3125 5.0625 11.4375C4.1875 10.5625 3.75 9.5 3.75 8.25C3.75 7 4.1875 5.9375 5.0625 5.0625C5.9375 4.1875 7 3.75 8.25 3.75C9.5 3.75 10.5625 4.1875 11.4375 5.0625C12.3125 5.9375 12.75 7 12.75 8.25C12.75 9.5 12.3125 10.5625 11.4375 11.4375C10.5625 12.3125 9.5 12.75 8.25 12.75V12.75M8.25 11.25C9.0875 11.25 9.79688 10.9594 10.3781 10.3781C10.9594 9.79688 11.25 9.0875 11.25 8.25C11.25 7.4125 10.9594 6.70312 10.3781 6.12187C9.79688 5.54062 9.0875 5.25 8.25 5.25C7.4125 5.25 6.70312 5.54062 6.12187 6.12187C5.54062 6.70312 5.25 7.4125 5.25 8.25C5.25 9.0875 5.54062 9.79688 6.12187 10.3781C6.70312 10.9594 7.4125 11.25 8.25 11.25V11.25" fill="#004643" />
                        </svg>
                        <span className="text-sw-primary font-bold text-sm leading-5">
                          Today's Suggestion
                        </span>
                      </div>

                      <h2 className="text-sw-dark font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight">
                        Vì trời lạnh 18°C<br />
                        tại Đà Lạt, hãy<br />
                        thử set đồ này
                      </h2>

                      <p className="text-sw-mid text-base sm:text-lg leading-7">
                        A layered look perfect for the cool highland breeze,
                        combining warmth with effortless style. Features your
                        favorite cream knit and tailored trousers.
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2 lg:pt-6">
                      <button className="flex items-center justify-center gap-2 px-6 lg:px-8 py-3.5 rounded-3xl bg-sw-primary shadow-sm text-white font-semibold text-base leading-6">
                        <MdOutlineCheckroom size={18} />
                        Wear This
                      </button>
                      <button className="flex items-center justify-center gap-2 px-6 lg:px-8 py-3.5 rounded-3xl border border-sw-light/30 bg-sw-surface text-sw-primary font-semibold text-base leading-6">
                        <MdVisibility size={18} />
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Outfit image */}
                  <div className="w-full sm:w-64 lg:w-72 xl:w-80 flex-shrink-0 self-stretch rounded-3xl border-4 border-sw-surface bg-white shadow-lg overflow-hidden min-h-48 sm:min-h-0">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/0e484905caca157d12cdb4adca6bc1a1b2e56862?width=626"
                      alt="Outfit suggestion"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="flex items-center gap-4 px-6 py-5 rounded-3xl border border-sw-light/20 bg-white shadow-sm hover:shadow-md transition-shadow text-left">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-sw-light/30 flex-shrink-0">
                    <MdAdd size={24} className="text-sw-primary" />
                  </div>
                  <div>
                    <div className="text-sw-dark font-bold text-lg leading-7">Add New Item</div>
                    <div className="text-sw-mid text-sm leading-5">Scan or upload clothes</div>
                  </div>
                </button>

                <button className="flex items-center gap-4 px-6 py-5 rounded-3xl border border-sw-light/20 bg-white shadow-sm hover:shadow-md transition-shadow text-left">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-sw-mint flex-shrink-0">
                    <MdAutoAwesome size={24} className="text-sw-primary" />
                  </div>
                  <div>
                    <div className="text-sw-dark font-bold text-lg leading-7">Open AI Studio</div>
                    <div className="text-sw-mid text-sm leading-5">Mix and match visually</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Right column: 4/12 */}
            <div className="xl:col-span-4 flex flex-col gap-6 lg:gap-8">

              {/* Wardrobe Stats */}
              <div className="rounded-3xl border border-sw-light/20 bg-white shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sw-dark font-bold text-xl leading-7">Wardrobe Stats</h3>
                  <div className="flex items-center justify-center w-9 h-9 rounded-3xl bg-sw-light/40">
                    <MdBarChart size={18} className="text-sw-primary" />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between px-4 py-4 rounded-3xl border border-sw-light/10 bg-sw-surface">
                    <div className="flex items-center gap-3">
                      <LuShirt size={20} className="text-sw-mid" />
                      <span className="text-sw-mid font-medium text-base leading-6">Total Items</span>
                    </div>
                    <span className="text-sw-primary font-bold text-2xl leading-8">142</span>
                  </div>

                  <div className="flex items-center justify-between px-4 py-4 rounded-3xl border border-sw-light/10 bg-sw-surface">
                    <div className="flex items-center gap-3">
                      <MdOutlineCheckroom size={20} className="text-sw-mid" />
                      <span className="text-sw-mid font-medium text-base leading-6">Outfits Created</span>
                    </div>
                    <span className="text-sw-primary font-bold text-2xl leading-8">38</span>
                  </div>

                  <div className="flex items-center justify-between px-4 py-4 rounded-3xl border border-red-200/30 bg-red-50/10">
                    <div className="flex items-center gap-3">
                      <PiWashingMachine size={20} className="text-sw-error" />
                      <span className="text-sw-error font-medium text-base leading-6">Needs Washing</span>
                    </div>
                    <span className="text-sw-error font-bold text-2xl leading-8">5</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-3xl border border-sw-primary/30 text-sw-primary font-bold text-sm leading-5 hover:bg-sw-surface transition-colors">
                    Manage Wardrobe
                    <MdArrowForward size={16} />
                  </button>
                </div>
              </div>

              {/* Recent Adds */}
              <div className="rounded-3xl border border-sw-light/20 bg-white shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sw-dark font-bold text-xl leading-7">Recent Adds</h3>
                  <button className="text-sw-primary font-bold text-sm leading-5">View All</button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative rounded-3xl border border-sw-light/20 bg-sw-surface overflow-hidden aspect-[100/83]">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/d14c469d9896d25c13aab2230b1ef6b5446193bd?width=276"
                      alt="Silk Shirt"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-3">
                      <span className="text-white text-xs font-medium leading-4">Silk Shirt</span>
                    </div>
                  </div>

                  <div className="relative rounded-3xl border border-sw-light/20 bg-sw-surface overflow-hidden aspect-[100/83]">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/88eaa35ee4e52e0fcca4aafe0998bf6a1454d09e?width=276"
                      alt="White Sneakers"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-3">
                      <span className="text-white text-xs font-medium leading-4">White Sneakers</span>
                    </div>
                  </div>

                  <div className="relative rounded-3xl border border-sw-light/20 bg-sw-surface overflow-hidden aspect-[100/83]">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/51a12565729f7efcbab01ee24aa38ea3ed9497fa?width=276"
                      alt="Trench Coat"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-3">
                      <span className="text-white text-xs font-medium leading-4">Trench Coat</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center rounded-3xl border border-sw-light/20 bg-sw-surface overflow-hidden aspect-[100/83] gap-2 cursor-pointer hover:bg-sw-mint transition-colors">
                    <MdAddPhotoAlternate size={28} className="text-sw-mid" />
                    <span className="text-sw-mid text-sm font-medium leading-5">Add More</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}