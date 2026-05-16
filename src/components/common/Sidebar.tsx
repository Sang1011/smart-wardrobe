"use client";

import Link from "next/link";
import { useState } from "react";
import {
    MdDashboard,
    MdOutlineCheckroom,
    MdPeople,
    MdPerson,
    MdNotificationsNone,
    MdSettings,
    MdLogout,
    MdAdd,
    MdChevronRight,
    MdChevronLeft,
    MdAutoAwesome,
} from "react-icons/md";

type NavItem = {
    label: string;
    path: string;
    active: boolean;
    icon: React.ReactNode;
};

type SidebarProps = {
    open?: boolean;
    onClose?: () => void;
    activePath?: string;
};

const NAV_ITEMS: NavItem[] = [
    { label: "Dashboard", path: "/", active: true, icon: <MdDashboard size={20} /> },
    { label: "Wardrobe", path: "/wardrobe", active: false, icon: <MdOutlineCheckroom size={20} /> },
    { label: "Studio", path: "/studio", active: false, icon: <MdAutoAwesome size={20} /> },
    { label: "Social", path: "/social", active: false, icon: <MdPeople size={20} /> },
    { label: "Profile", path: "/profile", active: false, icon: <MdPerson size={20} /> },
];

const BOTTOM_NAV_ITEMS: NavItem[] = [
    { label: "Notifications", path: "/notifications", active: false, icon: <MdNotificationsNone size={20} /> },
    { label: "Settings", path: "/settings", active: false, icon: <MdSettings size={20} /> },
];

export default function Sidebar({ open = false, onClose, activePath = "/" }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);

    // Shared row class: khi collapsed thì căn giữa tuyệt đối, khi mở thì căn trái với padding
    const rowClass = (extra = "") =>
        [
            "flex items-center transition-all duration-200",
            collapsed ? "justify-center w-full px-0" : "gap-4 px-4",
            extra,
        ].join(" ");

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={[
                    "fixed top-0 left-0 h-screen z-30",
                    "flex flex-col py-4 overflow-y-auto",
                    "bg-[#EDF4F3] border-r border-[#C5D8D6]/40",
                    "transition-all duration-300 ease-in-out",
                    "lg:sticky lg:top-0 lg:z-auto lg:flex-shrink-0",
                    collapsed ? "w-[72px] px-0" : "w-64 px-4",
                    open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                ].join(" ")}
            >
                {/* ── Logo ── */}
                <div className={rowClass("pb-6")}>
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#004643] flex-shrink-0">
                        <MdOutlineCheckroom size={22} color="white" />
                    </div>
                    <div
                        className={[
                            "overflow-hidden whitespace-nowrap transition-all duration-200",
                            collapsed ? "w-0 opacity-0" : "w-auto opacity-100",
                        ].join(" ")}
                    >
                        <div className="text-[#004643] font-bold text-[18px] leading-7">Smart Wardrobe</div>
                        <div className="text-[#324B49]/60 font-bold text-[10px] tracking-[0.5px] uppercase leading-[15px]">
                            Luxury Virtual Fashion
                        </div>
                    </div>
                </div>

                {/* ── Primary nav ── */}
                <nav className="flex flex-col gap-1 flex-1">
                    {NAV_ITEMS.map((item) => {
                        const isActive = item.path === activePath || (item.active && activePath === "/");
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={onClose}
                                title={collapsed ? item.label : undefined}
                                className={[
                                    rowClass("py-3 rounded-3xl"),
                                    isActive
                                        ? "bg-[#C5D8D6] text-[#1C3330]"
                                        : "text-[#324B49] hover:bg-[#C5D8D6]/40",
                                ].join(" ")}
                            >
                                <span className="flex-shrink-0">{item.icon}</span>
                                <span
                                    className={[
                                        "text-sm leading-5 overflow-hidden whitespace-nowrap transition-all duration-200",
                                        isActive ? "font-semibold" : "font-medium",
                                        collapsed ? "w-0 opacity-0" : "w-auto opacity-100",
                                    ].join(" ")}
                                >
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* ── CTA Button ── */}
                <div className="py-2">
                    <button
                        title={collapsed ? "Create New Outfit" : undefined}
                        className={rowClass(
                            "w-full py-3.5 rounded-3xl bg-[#004643] shadow-sm text-white font-bold text-base leading-6"
                        )}
                    >
                        <MdAdd size={18} className="flex-shrink-0" />
                        <span
                            className={[
                                "overflow-hidden whitespace-nowrap transition-all duration-200",
                                collapsed ? "w-0 opacity-0" : "w-auto opacity-100",
                            ].join(" ")}
                        >
                            Create New Outfit
                        </span>
                    </button>
                </div>

                {/* ── Bottom nav ── */}
                <div className="flex flex-col gap-1 py-4 border-t border-b border-[#C5D8D6]/40">
                    {BOTTOM_NAV_ITEMS.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            onClick={onClose}
                            title={collapsed ? item.label : undefined}
                            className={rowClass("py-3 rounded-3xl text-[#324B49] hover:bg-[#C5D8D6]/40 transition-colors")}
                        >
                            <span className="flex-shrink-0">{item.icon}</span>
                            <span
                                className={[
                                    "text-sm font-medium leading-5 overflow-hidden whitespace-nowrap transition-all duration-200",
                                    collapsed ? "w-0 opacity-0" : "w-auto opacity-100",
                                ].join(" ")}
                            >
                                {item.label}
                            </span>
                        </Link>
                    ))}

                    <Link
                        href="/logout"
                        onClick={onClose}
                        title={collapsed ? "Logout" : undefined}
                        className={rowClass("py-3 rounded-3xl text-[#BA1A1A] hover:bg-red-50 transition-colors")}
                    >
                        <span className="flex-shrink-0"><MdLogout size={20} /></span>
                        <span
                            className={[
                                "text-sm font-medium leading-5 overflow-hidden whitespace-nowrap transition-all duration-200",
                                collapsed ? "w-0 opacity-0" : "w-auto opacity-100",
                            ].join(" ")}
                        >
                            Logout
                        </span>
                    </Link>
                </div>

                {/* ── Collapse toggle ── */}
                <div className={["hidden lg:flex items-center pt-2", collapsed ? "justify-center" : "justify-end px-2"].join(" ")}>
                    <button
                        onClick={() => setCollapsed((v) => !v)}
                        className="p-2 rounded-3xl hover:bg-[#C5D8D6]/40 transition-colors"
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {collapsed ? <MdChevronRight size={18} /> : <MdChevronLeft size={18} />}
                    </button>
                </div>
            </aside>
        </>
    );
}