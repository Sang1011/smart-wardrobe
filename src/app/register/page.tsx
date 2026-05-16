"use client"

import Link from "next/link";
import { useState } from "react";

const colorSwatches = [
    { bg: "#2E6764", label: "Forest Teal" },
    { bg: "#6B7280", label: "Slate Gray" },
    { bg: "#006A60", label: "Deep Teal" },
    { bg: "#111E1D", label: "Charcoal" },
    { bg: "#FFFFFF", label: "White", border: true },
];

export default function Register() {
    const [selectedColor, setSelectedColor] = useState(0);
    const [gender, setGender] = useState("");
    const [genderOpen, setGenderOpen] = useState(false);

    const genderOptions = ["Nam", "Nữ", "Khác"];

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background px-4 py-8 sm:py-12">
            <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                {/* Left Side */}
                <div className="hidden lg:flex relative lg:w-[48%] flex-shrink-0 flex-col justify-between p-10 lg:p-16 overflow-hidden min-h-[400px]">
                    {/* Background image */}
                    <img
                        src="/images/fashion2.png"
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
                <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 lg:p-16">
                    {/* Heading */}
                    <div className="mb-1.5 sm:mb-2">
                        <h2 className="font-vietnam text-xl sm:text-2xl lg:text-3xl font-bold text-brand-foreground leading-8 sm:leading-9">
                            Tạo tài khoản
                        </h2>
                    </div>
                    <div className="mb-6 sm:mb-8">
                        <p className="text-brand-muted text-sm sm:text-base leading-5 sm:leading-6">
                            Bắt đầu hành trình nâng tầm phong cách của bạn ngay hôm nay.
                        </p>
                    </div>

                    <form className="flex flex-col gap-5 sm:gap-6" onSubmit={(e) => e.preventDefault()}>
                        {/* Full Name */}
                        <div className="flex flex-col gap-2">
                            <label className="text-brand-foreground text-base leading-6">
                                Tên đầy đủ
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray pointer-events-none">
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6 6C5.175 6 4.46875 5.70625 3.88125 5.11875C3.29375 4.53125 3 3.825 3 3C3 2.175 3.29375 1.46875 3.88125 0.88125C4.46875 0.29375 5.175 0 6 0C6.825 0 7.53125 0.29375 8.11875 0.88125C8.70625 1.46875 9 2.175 9 3C9 3.825 8.70625 4.53125 8.11875 5.11875C7.53125 5.70625 6.825 6 6 6ZM0 12V9.9C0 9.475 0.109375 9.08437 0.328125 8.72812C0.546875 8.37187 0.8375 8.1 1.2 7.9125C1.975 7.525 2.7625 7.23438 3.5625 7.04063C4.3625 6.84688 5.175 6.75 6 6.75C6.825 6.75 7.6375 6.84688 8.4375 7.04063C9.2375 7.23438 10.025 7.525 10.8 7.9125C11.1625 8.1 11.4531 8.37187 11.6719 8.72812C11.8906 9.08437 12 9.475 12 9.9V12H0ZM1.5 10.5H10.5V9.9C10.5 9.7625 10.4656 9.6375 10.3969 9.525C10.3281 9.4125 10.2375 9.325 10.125 9.2625C9.45 8.925 8.76875 8.67188 8.08125 8.50313C7.39375 8.33438 6.7 8.25 6 8.25C5.3 8.25 4.60625 8.33438 3.91875 8.50313C3.23125 8.67188 2.55 8.925 1.875 9.2625C1.7625 9.325 1.67187 9.4125 1.60312 9.525C1.53437 9.6375 1.5 9.7625 1.5 9.9V10.5ZM6 4.5C6.4125 4.5 6.76562 4.35312 7.05937 4.05937C7.35312 3.76562 7.5 3.4125 7.5 3C7.5 2.5875 7.35312 2.23437 7.05937 1.94062C6.76562 1.64687 6.4125 1.5 6 1.5C5.5875 1.5 5.23438 1.64687 4.94063 1.94062C4.64688 2.23437 4.5 2.5875 4.5 3C4.5 3.4125 4.64688 3.76562 4.94063 4.05937C5.23438 4.35312 5.5875 4.5 6 4.5Z"
                                            fill="#627C7A"
                                        />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Nhập tên của bạn"
                                    className="w-full pl-10 pr-4 py-3.5 rounded-lg border border-brand-border bg-brand-mint text-brand-foreground placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                                />
                            </div>
                        </div>

                        {/* Age + Gender row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {/* Age */}
                            <div className="flex flex-col gap-2">
                                <label className="text-brand-foreground text-base leading-6">
                                    Tuổi
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray pointer-events-none">
                                        <svg
                                            width="14"
                                            height="15"
                                            viewBox="0 0 14 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M0.75 15C0.5375 15 0.359375 14.9281 0.215625 14.7844C0.071875 14.6406 0 14.4625 0 14.25V10.5C0 10.0875 0.146875 9.73438 0.440625 9.44063C0.734375 9.14688 1.0875 9 1.5 9V6C1.5 5.5875 1.64687 5.23438 1.94062 4.94063C2.23437 4.64688 2.5875 4.5 3 4.5H6V3.4125C5.775 3.2625 5.59375 3.08125 5.45625 2.86875C5.31875 2.65625 5.25 2.4 5.25 2.1C5.25 1.9125 5.2875 1.72813 5.3625 1.54688C5.4375 1.36562 5.55 1.2 5.7 1.05L6.75 0L7.8 1.05C7.95 1.2 8.0625 1.36562 8.1375 1.54688C8.2125 1.72813 8.25 1.9125 8.25 2.1C8.25 2.4 8.18125 2.65625 8.04375 2.86875C7.90625 3.08125 7.725 3.2625 7.5 3.4125V4.5H10.5C10.9125 4.5 11.2656 4.64688 11.5594 4.94063C11.8531 5.23438 12 5.5875 12 6V9C12.4125 9 12.7656 9.14688 13.0594 9.44063C13.3531 9.73438 13.5 10.0875 13.5 10.5V14.25C13.5 14.4625 13.4281 14.6406 13.2844 14.7844C13.1406 14.9281 12.9625 15 12.75 15H0.75ZM3 9H10.5V6H3V9ZM1.5 13.5H12V10.5H1.5V13.5Z"
                                                fill="#627C7A"
                                            />
                                        </svg>
                                    </span>
                                    <input
                                        type="number"
                                        placeholder="Nhập tuổi"
                                        min="1"
                                        max="120"
                                        className="w-full pl-10 pr-4 py-3.5 rounded-lg border border-brand-border bg-brand-mint text-brand-foreground placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Gender */}
                            <div className="flex flex-col gap-2">
                                <label className="text-brand-foreground text-base leading-6">
                                    Giới tính
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray pointer-events-none z-10">
                                        <svg
                                            width="13"
                                            height="15"
                                            viewBox="0 0 13 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1.125 15V9.375H0V5.25C0 4.8375 0.146875 4.48438 0.440625 4.19063C0.734375 3.89688 1.0875 3.75 1.5 3.75H3.75C4.1625 3.75 4.51562 3.89688 4.80937 4.19063C5.10312 4.48438 5.25 4.8375 5.25 5.25V9.375H4.125V15H1.125ZM2.625 3C2.2125 3 1.85937 2.85313 1.56562 2.55938C1.27187 2.26563 1.125 1.9125 1.125 1.5C1.125 1.0875 1.27187 0.734375 1.56562 0.440625C1.85937 0.146875 2.2125 0 2.625 0C3.0375 0 3.39063 0.146875 3.68438 0.440625C3.97813 0.734375 4.125 1.0875 4.125 1.5C4.125 1.9125 3.97813 2.26563 3.68438 2.55938C3.39063 2.85313 3.0375 3 2.625 3ZM8.25 15V10.5H6L7.9125 4.7625C8.0125 4.4375 8.19687 4.1875 8.46562 4.0125C8.73437 3.8375 9.0375 3.75 9.375 3.75C9.7125 3.75 10.0156 3.8375 10.2844 4.0125C10.5531 4.1875 10.7375 4.4375 10.8375 4.7625L12.75 10.5H10.5V15H8.25ZM9.375 3C8.9625 3 8.60938 2.85313 8.31563 2.55938C8.02188 2.26563 7.875 1.9125 7.875 1.5C7.875 1.0875 8.02188 0.734375 8.31563 0.440625C8.60938 0.146875 8.9625 0 9.375 0C9.7875 0 10.1406 0.146875 10.4344 0.440625C10.7281 0.734375 10.875 1.0875 10.875 1.5C10.875 1.9125 10.7281 2.26563 10.4344 2.55938C10.1406 2.85313 9.7875 3 9.375 3Z"
                                                fill="#627C7A"
                                            />
                                        </svg>
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setGenderOpen(!genderOpen)}
                                        className="w-full pl-10 pr-10 py-3.5 rounded-lg border border-brand-border bg-brand-mint text-base text-left focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                                    >
                                        <span className={gender ? "text-brand-foreground" : "text-brand-foreground"}>
                                            {gender || "Chọn giới tính"}
                                        </span>
                                    </button>
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg
                                            width="8"
                                            height="4"
                                            viewBox="0 0 8 4"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M3.75 3.75L0 0H7.5L3.75 3.75Z" fill="#627C7A" />
                                        </svg>
                                    </span>
                                    {genderOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-brand-border rounded-lg shadow-lg z-20 overflow-hidden">
                                            {genderOptions.map((opt) => (
                                                <button
                                                    key={opt}
                                                    type="button"
                                                    className="w-full text-left px-4 py-3 text-brand-foreground hover:bg-brand-mint transition-colors text-base"
                                                    onClick={() => {
                                                        setGender(opt);
                                                        setGenderOpen(false);
                                                    }}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* City */}
                        <div className="flex flex-col gap-2">
                            <label className="text-brand-foreground text-base leading-6">
                                Thành phố
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray pointer-events-none">
                                    <svg
                                        width="14"
                                        height="15"
                                        viewBox="0 0 14 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0 14.25V3.75H4.5V2.25L6.75 0L9 2.25V6.75H13.5V14.25H0ZM1.5 12.75H3V11.25H1.5V12.75ZM1.5 9.75H3V8.25H1.5V9.75ZM1.5 6.75H3V5.25H1.5V6.75ZM6 12.75H7.5V11.25H6V12.75ZM6 9.75H7.5V8.25H6V9.75ZM6 6.75H7.5V5.25H6V6.75ZM6 3.75H7.5V2.25H6V3.75ZM10.5 12.75H12V11.25H10.5V12.75ZM10.5 9.75H12V8.25H10.5V9.75Z"
                                            fill="#627C7A"
                                        />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Nhập thành phố bạn đang sống"
                                    className="w-full pl-10 pr-4 py-3.5 rounded-lg border border-brand-border bg-brand-mint text-brand-foreground placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                                />
                            </div>
                        </div>

                        {/* Favorite Color */}
                        <div className="flex flex-col gap-2.5 sm:gap-3 pb-1.5 sm:pb-2">
                            <label className="text-brand-foreground text-sm sm:text-base leading-5 sm:leading-6">
                                Màu sắc yêu thích
                            </label>
                            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                                {colorSwatches.map((swatch, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setSelectedColor(i)}
                                        className="relative w-8 sm:w-10 h-8 sm:h-10 rounded-full focus:outline-none transition-transform hover:scale-110"
                                        style={{ backgroundColor: swatch.bg }}
                                        title={swatch.label}
                                    >
                                        {swatch.border && (
                                            <span className="absolute inset-0 rounded-full border border-brand-border" />
                                        )}
                                        {selectedColor === i && (
                                            <span className="absolute inset-0 rounded-full ring-2 ring-offset-1 ring-brand" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 px-6 bg-brand text-white font-vietnam font-bold text-base leading-6 rounded-lg shadow-sm hover:bg-brand-dark transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                        >
                            Hoàn tất Đăng ký
                        </button>

                        {/* Login link */}
                        <p className="text-center text-sm sm:text-base leading-5 sm:leading-6">
                            <span className="text-brand-muted">Đã có tài khoản? </span>
                            <Link
                                href="/login"
                                className="text-brand font-medium hover:underline"
                            >
                                Đăng nhập
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
