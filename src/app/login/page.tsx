"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background px-4 py-8 sm:py-12">
            <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                {/* Left Side */}
                <div className="hidden lg:flex relative lg:w-[55%] flex-shrink-0 flex-col justify-between p-10 lg:p-16 overflow-hidden min-h-[400px]">
                    {/* Background image */}
                    <img
                        src="/images/fashion1.png"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-[var(--dark-overlay-80)] mix-blend-multiply" />
                    {/* Gradient overlay */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(135deg, var(--dark-overlay) 0%, rgba(0,70,67,0) 50%, rgba(0,0,0,0.30) 100%)",
                        }}
                    />

                    {/* Content */}
                    <div className="relative flex flex-col justify-between h-full gap-10">
                        {/* Branding */}
                        <div className="flex flex-col gap-4">
                            <h1 className="font-heading font-bold text-white text-4xl lg:text-5xl leading-tight">
                                Smart Wardrobe
                            </h1>
                            <p className="text-white/70 font-body text-base lg:text-lg leading-7">
                                Luxury Virtual Fashion. Organize, plan, and elevate your
                                personal style with intelligent wardrobe management.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="flex flex-col gap-10 pb-10">
                            {/* Feature 1 */}
                            <div className="flex items-start gap-5">
                                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl border border-white/10 bg-white/10">
                                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                                        <path
                                            d="M1 16C0.716667 16 0.479167 15.9042 0.2875 15.7125C0.0958333 15.5208 0 15.2833 0 15C0 14.8333 0.0333333 14.6792 0.1 14.5375C0.166667 14.3958 0.266667 14.2833 0.4 14.2L9 7.75V6C9 5.71667 9.1 5.47917 9.3 5.2875C9.5 5.09583 9.74167 5 10.025 5C10.4417 5 10.7917 4.85 11.075 4.55C11.3583 4.25 11.5 3.89167 11.5 3.475C11.5 3.05833 11.3542 2.70833 11.0625 2.425C10.7708 2.14167 10.4167 2 10 2C9.58333 2 9.22917 2.14583 8.9375 2.4375C8.64583 2.72917 8.5 3.08333 8.5 3.5H6.5C6.5 2.53333 6.84167 1.70833 7.525 1.025C8.20833 0.341667 9.03333 0 10 0C10.9667 0 11.7917 0.3375 12.475 1.0125C13.1583 1.6875 13.5 2.50833 13.5 3.475C13.5 4.25833 13.2708 4.95833 12.8125 5.575C12.3542 6.19167 11.75 6.61667 11 6.85V7.75L19.6 14.2C19.7333 14.2833 19.8333 14.3958 19.9 14.5375C19.9667 14.6792 20 14.8333 20 15C20 15.2833 19.9042 15.5208 19.7125 15.7125C19.5208 15.9042 19.2833 16 19 16H1V16M4 14H16L10 9.5L4 14V14"
                                            fill="white"
                                        />
                                    </svg>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="font-heading font-bold text-white text-xl leading-7">
                                        Tổ chức thông minh
                                    </h3>
                                    <p className="text-white/70 font-sans text-base leading-relaxed">
                                        Quản lý toàn bộ trang phục của bạn trong một không gian ảo
                                        gọn gàng và dễ tìm kiếm.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex items-start gap-5">
                                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl border border-white/10 bg-white/10">
                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                                        <path
                                            d="M18 6L17.05 3.95L15 3L17.05 2.05L18 0L18.95 2.05L21 3L18.95 3.95L18 6V6M6.5 6L5.55 3.95L3.5 3L5.55 2.05L6.5 0L7.45 2.05L9.5 3L7.45 3.95L6.5 6V6M18 17.5L17.05 15.45L15 14.5L17.05 13.55L18 11.5L18.95 13.55L21 14.5L18.95 15.45L18 17.5V17.5M3.1 20.7L0.3 17.9C0.1 17.7 0 17.4583 0 17.175C0 16.8917 0.1 16.65 0.3 16.45L11.45 5.3C11.65 5.1 11.8917 5 12.175 5C12.4583 5 12.7 5.1 12.9 5.3L15.7 8.1C15.9 8.3 16 8.54167 16 8.825C16 9.10833 15.9 9.35 15.7 9.55L4.55 20.7C4.35 20.9 4.10833 21 3.825 21C3.54167 21 3.3 20.9 3.1 20.7V20.7M3.85 18.6L11 11.4L9.6 10L2.4 17.15L3.85 18.6V18.6"
                                            fill="white"
                                        />
                                    </svg>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="font-heading font-bold text-white text-xl leading-7">
                                        Gợi ý phong cách
                                    </h3>
                                    <p className="text-white/70 font-sans text-base leading-relaxed">
                                        AI phân tích và đề xuất các phối đồ hoàn hảo dựa trên sở
                                        thích và thời tiết.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <p className="text-white/40 font-sans text-sm leading-5">
                            © 2026 Smart Wardrobe. Luxury Virtual Fashion Experience.
                        </p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-16 bg-white">
                    <div className="w-full max-w-[448px] flex flex-col gap-8 sm:gap-10">
                        {/* Header */}
                        <div className="flex flex-col gap-2 sm:gap-3">
                            <h2 className="font-heading font-bold text-on-background text-2xl sm:text-[28px] lg:text-[36px] leading-tight">
                                Đăng nhập
                            </h2>
                            <p className="text-on-surface-variant font-sans text-sm sm:text-base lg:text-lg leading-6 sm:leading-7">
                                Chào mừng bạn quay trở lại với Smart Wardrobe.
                            </p>
                        </div>

                        {/* Form */}
                        <div className="flex flex-col gap-5 sm:gap-6">
                            {/* Email Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-on-surface-variant font-sans font-medium text-sm leading-5">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg width="17" height="14" viewBox="0 0 17 14" fill="none">
                                            <path
                                                d="M1.66667 13.3333C1.20833 13.3333 0.815972 13.1701 0.489583 12.8438C0.163194 12.5174 0 12.125 0 11.6667V1.66667C0 1.20833 0.163194 0.815972 0.489583 0.489583C0.815972 0.163194 1.20833 0 1.66667 0H15C15.4583 0 15.8507 0.163194 16.1771 0.489583C16.5035 0.815972 16.6667 1.20833 16.6667 1.66667V11.6667C16.6667 12.125 16.5035 12.5174 16.1771 12.8438C15.8507 13.1701 15.4583 13.3333 15 13.3333H1.66667V13.3333M8.33333 7.5L1.66667 3.33333V11.6667H15V3.33333L8.33333 7.5V7.5M8.33333 5.83333L15 1.66667H1.66667L8.33333 5.83333V5.83333"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Nhập email của bạn"
                                        className="w-full pl-11 pr-4 py-4 rounded-xl border border-outline-variant bg-surface-container-low text-on-background font-sans text-base placeholder-outline/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-outline"
                                        style={{ color: 'var(--on-background)', borderColor: 'var(--outline-variant)', backgroundColor: 'var(--surface-container-low)' }}
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-on-surface-variant font-sans font-medium text-sm leading-5">
                                        Mật khẩu
                                    </label>
                                    <a
                                        href="#"
                                        className="text-primary font-sans font-medium text-sm leading-5 hover:underline"
                                    >
                                        Quên mật khẩu?
                                    </a>
                                </div>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                                            <path
                                                d="M1.66667 17.5C1.20833 17.5 0.815972 17.3368 0.489583 17.0104C0.163194 16.684 0 16.2917 0 15.8333V7.5C0 7.04167 0.163194 6.64931 0.489583 6.32292C0.815972 5.99653 1.20833 5.83333 1.66667 5.83333H2.5V4.16667C2.5 3.01389 2.90625 2.03125 3.71875 1.21875C4.53125 0.40625 5.51389 0 6.66667 0C7.81944 0 8.80208 0.40625 9.61458 1.21875C10.4271 2.03125 10.8333 3.01389 10.8333 4.16667V5.83333H11.6667C12.125 5.83333 12.5174 5.99653 12.8438 6.32292C13.1701 6.64931 13.3333 7.04167 13.3333 7.5V15.8333C13.3333 16.2917 13.1701 16.684 12.8438 17.0104C12.5174 17.3368 12.125 17.5 11.6667 17.5H1.66667V17.5M6.66667 13.3333C7.125 13.3333 7.51736 13.1701 7.84375 12.8438C8.17014 12.5174 8.33333 12.125 8.33333 11.6667C8.33333 11.2083 8.17014 10.816 7.84375 10.4896C7.51736 10.1632 7.125 10 6.66667 10C6.20833 10 5.81597 10.1632 5.48958 10.4896C5.16319 10.816 5 11.2083 5 11.6667C5 12.125 5.16319 12.5174 5.48958 12.8438C5.81597 13.1701 6.20833 13.3333 6.66667 13.3333V13.3333M4.16667 5.83333H9.16667V4.16667C9.16667 3.47222 8.92361 2.88194 8.4375 2.39583C7.95139 1.90972 7.36111 1.66667 6.66667 1.66667C5.97222 1.66667 5.38194 1.90972 4.89583 2.39583C4.40972 2.88194 4.16667 3.47222 4.16667 4.16667V5.83333V5.83333"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Nhập mật khẩu"
                                        className="w-full pl-11 pr-12 py-4 rounded-xl border border-outline-variant bg-surface-container-low text-on-background font-sans text-base placeholder-outline/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                        style={{ color: 'var(--on-background)', borderColor: 'var(--outline-variant)', backgroundColor: 'var(--surface-container-low)' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <svg width="19" height="13" viewBox="0 0 19 13" fill="none">
                                                <path
                                                    d="M9.16667 10C10.2083 10 11.0938 9.63542 11.8229 8.90625C12.5521 8.17708 12.9167 7.29167 12.9167 6.25C12.9167 5.20833 12.5521 4.32292 11.8229 3.59375C11.0938 2.86458 10.2083 2.5 9.16667 2.5C8.125 2.5 7.23958 2.86458 6.51042 3.59375C5.78125 4.32292 5.41667 5.20833 5.41667 6.25C5.41667 7.29167 5.78125 8.17708 6.51042 8.90625C7.23958 9.63542 8.125 10 9.16667 10V10M9.16667 8.5C8.54167 8.5 8.01042 8.28125 7.57292 7.84375C7.13542 7.40625 6.91667 6.875 6.91667 6.25C6.91667 5.625 7.13542 5.09375 7.57292 4.65625C8.01042 4.21875 8.54167 4 9.16667 4C9.79167 4 10.3229 4.21875 10.7604 4.65625C11.1979 5.09375 11.4167 5.625 11.4167 6.25C11.4167 6.875 11.1979 7.40625 10.7604 7.84375C10.3229 8.28125 9.79167 8.5 9.16667 8.5V8.5M9.16667 12.5C7.13889 12.5 5.29167 11.934 3.625 10.8021C1.95833 9.67014 0.75 8.15278 0 6.25C0.75 4.34722 1.95833 2.82986 3.625 1.69792C5.29167 0.565972 7.13889 0 9.16667 0C11.1944 0 13.0417 0.565972 14.7083 1.69792C16.375 2.82986 17.5833 4.34722 18.3333 6.25C17.5833 8.15278 16.375 9.67014 14.7083 10.8021C13.0417 11.934 11.1944 12.5 9.16667 12.5V12.5M9.16667 10.8333C10.7361 10.8333 12.1771 10.4201 13.4896 9.59375C14.8021 8.76736 15.8056 7.65278 16.5 6.25C15.8056 4.84722 14.8021 3.73264 13.4896 2.90625C12.1771 2.07986 10.7361 1.66667 9.16667 1.66667C7.59722 1.66667 6.15625 2.07986 4.84375 2.90625C3.53125 3.73264 2.52778 4.84722 1.83333 6.25C2.52778 7.65278 3.53125 8.76736 4.84375 9.59375C6.15625 10.4201 7.59722 10.8333 9.16667 10.8333V10.8333"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        ) : (
                                            <svg width="19" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                                <line x1="1" y1="1" x2="23" y2="23" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="button"
                                className="w-full py-4 px-6 bg-primary hover:bg-primary-hover text-white font-heading font-bold text-base leading-6 rounded-xl transition shadow-[0_10px_15px_-3px_rgba(46,103,100,0.25),0_4px_6px_-4px_rgba(46,103,100,0.15)] hover:shadow-[0_14px_20px_-3px_rgba(46,103,100,0.30)]"
                            >
                                Đăng nhập
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-4 py-2">
                                <div className="flex-1 h-px bg-outline-variant" />
                                <span className="text-outline-variant font-sans font-bold text-xs leading-4 tracking-[2.4px] uppercase">
                                    Hoặc
                                </span>
                                <div className="flex-1 h-px bg-outline-variant" />
                            </div>

                            {/* Social Login */}
                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 sm:gap-3 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl border border-outline-variant hover:bg-gray-50 transition text-xs sm:text-sm"
                                >
                                    <img
                                        src="/images/google.webp"
                                        alt="Google"
                                        className="w-4 sm:w-5 h-4 sm:h-5"
                                    />
                                    <span className="text-on-background font-sans font-semibold leading-5 hidden sm:inline">
                                        Google
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 sm:gap-3 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl border border-outline-variant hover:bg-gray-50 transition text-xs sm:text-sm"
                                >
                                    <img
                                        src="/images/facebook.webp"
                                        alt="Facebook"
                                        className="w-4 sm:w-5 h-4 sm:h-5"
                                    />
                                    <span className="text-on-background font-sans font-semibold leading-5 hidden sm:inline">
                                        Facebook
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-center gap-1 pt-2">
                            <span className="text-on-surface-variant font-sans text-base leading-6">
                                Chưa có tài khoản?
                            </span>
                            <Link
                                href="/register"
                                className="text-primary font-sans font-bold text-base leading-6 hover:underline"
                            >
                                Đăng ký ngay
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
