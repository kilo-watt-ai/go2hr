"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { SITE_NAME, NAV_ITEMS } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">G2</span>
            </div>
            <span className="text-xl font-bold text-primary">{SITE_NAME}</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item) =>
              "children" in item && item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(item.label)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <button
                    className="flex items-center gap-1 px-4 py-2 text-neutral-700 hover:text-primary rounded-lg hover:bg-neutral-50 transition-colors font-medium"
                    aria-expanded={dropdownOpen === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {dropdownOpen === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-neutral-200 py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-neutral-700 hover:bg-primary-50 hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={"href" in item ? item.href : "#"}
                  className="px-4 py-2 text-neutral-700 hover:text-primary rounded-lg hover:bg-neutral-50 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm" href="/login">
              Log In
            </Button>
            <Button variant="primary" size="sm" href="/signup/business">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-neutral-700 hover:bg-neutral-50 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) =>
              "children" in item && item.children ? (
                <div key={item.label} className="space-y-1">
                  <p className="px-4 py-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">
                    {item.label}
                  </p>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary rounded-lg transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={"href" in item ? item.href : "#"}
                  className="block px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary rounded-lg transition-colors font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="pt-4 border-t border-neutral-200 space-y-2">
              <Button variant="outline" size="md" href="/login" className="w-full">
                Log In
              </Button>
              <Button variant="primary" size="md" href="/signup/business" className="w-full">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
