"use client";
import { useState } from "react";
import { useScrolled } from "@/hooks/useScrolled";
import { NAV_ITEMS, PERSONAL } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
const scrolled = useScrolled(20);
const [open, setOpen] = useState(false);

return (
<header className={cn("fixed left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl transition-all duration-300", scrolled
    ? "top-2" : "top-4" )}>
    <nav
        className="flex items-center justify-between px-6 py-3 rounded-2xl border bg-white/80 backdrop-blur-md border-gray-200/60 shadow-sm">
        {/* Logo */}
        <a href="#home" className="font-bold text-lg text-[#0d1040] tracking-tight select-none">
            {PERSONAL.name.split(" ")[0]}<span className="text-[#2d3393]">.</span>dev
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
            <li key={item.label}>
                <a href={item.href} className="text-sm text-gray-500 hover:text-[#2d3393] transition-colors font-medium">
                    {item.label}
                </a>
            </li>
            ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
            <a href={PERSONAL.github} target="_blank" rel="noreferrer"
                className="text-gray-400 hover:text-[#2d3393] transition-colors text-lg">⌥</a>

            {/* Bungkus tombolnya pakai link email 👇 */}
            <a href={`mailto:${PERSONAL.email}`}>
                <Button size="sm" pill>Hire Me</Button>
            </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={()=> setOpen(!open)} aria-label="Toggle menu">
            <span className={cn("w-5 h-0.5 bg-gray-700 transition-all duration-200", open && "rotate-45 translate-y-2"
                )} />
            <span className={cn("w-5 h-0.5 bg-gray-700 transition-all duration-200", open && "opacity-0" )} />
            <span className={cn("w-5 h-0.5 bg-gray-700 transition-all duration-200", open && "-rotate-45 -translate-y-2"
                )} />
        </button>
    </nav>

    {open && (
    <div
        className="md:hidden mt-2 rounded-2xl bg-white/95 backdrop-blur-md border border-gray-200/60 shadow-lg px-6 py-4 flex flex-col gap-4">
        {NAV_ITEMS.map((item) => (
        <a key={item.label} href={item.href} onClick={()=> setOpen(false)}
            className="text-sm text-gray-700 hover:text-[#2d3393] font-medium transition-colors">
            {item.label}
        </a>
        ))}
        <Button size="sm" pill className="w-full">Hire Me</Button>
    </div>
    )}
</header>
);
}
