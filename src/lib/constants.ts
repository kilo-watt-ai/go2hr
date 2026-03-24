export const SITE_NAME = "Go2HR";
export const SITE_TAGLINE = "Expert HR Consulting for Small Business";
export const SITE_DESCRIPTION =
  "Connect with vetted, certified HR consultants. Book a session in minutes. Transparent pricing starting at $150/hr.";
export const SITE_URL = "https://go2hr.com";
export const SITE_LOCATION = "Raleigh, NC";

export const NAV_ITEMS = [
  {
    label: "How It Works",
    children: [
      { label: "For Businesses", href: "/how-it-works/businesses" },
      { label: "For Consultants", href: "/how-it-works/consultants" },
    ],
  },
  { label: "Find a Consultant", href: "/find-a-consultant" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
] as const;

export const SPECIALTIES = [
  "Compliance & Audits",
  "Employee Handbooks",
  "Terminations & Offboarding",
  "FMLA Administration",
  "Compensation & Benefits",
  "Hiring & Onboarding",
  "Employee Relations",
  "Training & Development",
  "Workplace Investigations",
  "HR Policy Development",
] as const;

export const INDUSTRIES = [
  "Healthcare",
  "Construction",
  "Nonprofits",
  "Government Contractors",
  "Retail",
  "Technology",
  "Professional Services",
  "Manufacturing",
  "Hospitality",
  "Education",
] as const;

export const CREDENTIALS = [
  "SHRM-CP",
  "SHRM-SCP",
  "PHR",
  "SPHR",
] as const;

export const COMPANY_SIZES = [
  "1-10 employees",
  "11-25 employees",
  "26-50 employees",
] as const;

export const STATES = [
  "North Carolina",
  "Virginia",
  "South Carolina",
] as const;

export const PRICING_TIERS = [
  {
    name: "Single Session",
    price: "$150",
    period: "per hour",
    description: "One-time expert consultation for immediate HR needs",
    features: [
      "60-minute video consultation",
      "Certified HR professional",
      "Session notes & action items",
      "Follow-up email summary",
    ],
    cta: "Book a Session",
    highlighted: false,
  },
  {
    name: "HR Audit",
    price: "$599",
    period: "flat fee",
    description: "Comprehensive review of your HR practices and compliance",
    features: [
      "Full compliance assessment",
      "Policy & handbook review",
      "Risk identification report",
      "Prioritized action plan",
      "30-day follow-up session",
    ],
    cta: "Schedule an Audit",
    highlighted: true,
  },
  {
    name: "5-Hour Package",
    price: "$650",
    period: "per month",
    description: "Ongoing support for growing businesses",
    features: [
      "5 hours of consulting/month",
      "Dedicated HR consultant",
      "Priority scheduling",
      "Document review & creation",
      "Email support between sessions",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "10-Hour Package",
    price: "$1,200",
    period: "per month",
    description: "Comprehensive HR partnership for scaling teams",
    features: [
      "10 hours of consulting/month",
      "Dedicated senior consultant",
      "Same-day scheduling",
      "Unlimited document support",
      "Slack/email access",
      "Quarterly strategy reviews",
    ],
    cta: "Get Started",
    highlighted: false,
  },
] as const;

export const LOCATIONS = [
  { name: "Raleigh", slug: "raleigh-nc", state: "NC" },
  { name: "Durham", slug: "durham-nc", state: "NC" },
  { name: "Chapel Hill", slug: "chapel-hill-nc", state: "NC" },
  { name: "Cary", slug: "cary-nc", state: "NC" },
  { name: "Charlotte", slug: "charlotte-nc", state: "NC" },
] as const;
