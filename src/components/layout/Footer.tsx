import Link from "next/link";
import { SITE_NAME, LOCATIONS } from "@/lib/constants";

const footerLinks = {
  "For Businesses": [
    { label: "How It Works", href: "/how-it-works/businesses" },
    { label: "Find a Consultant", href: "/find-a-consultant" },
    { label: "Pricing", href: "/pricing" },
    { label: "Sign Up", href: "/signup/business" },
  ],
  "For Consultants": [
    { label: "How It Works", href: "/how-it-works/consultants" },
    { label: "Apply Now", href: "/signup/consultant" },
    { label: "Log In", href: "/login" },
  ],
  Resources: [
    { label: "Blog & Articles", href: "/resources" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G2</span>
              </div>
              <span className="text-xl font-bold text-white">{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-neutral-400 mb-4">
              Connecting small businesses with vetted, SHRM-certified HR consultants.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white mb-3 text-sm">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Location Links */}
        <div className="mt-10 pt-8 border-t border-neutral-800">
          <h3 className="font-semibold text-white mb-3 text-sm">HR Consultants By Location</h3>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {LOCATIONS.map((loc) => (
              <Link
                key={loc.slug}
                href={`/hr-consultants/${loc.slug}`}
                className="text-sm text-neutral-400 hover:text-white transition-colors"
              >
                {loc.name}, {loc.state}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-sm text-neutral-500">
            Expert HR Consulting for Small Business
          </p>
        </div>
      </div>
    </footer>
  );
}
