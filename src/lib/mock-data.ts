export interface Consultant {
  slug: string;
  name: string;
  credentials: string[];
  headline: string;
  bio: string;
  specialties: string[];
  industries: string[];
  states: string[];
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  yearsExperience: number;
  nextAvailable: string;
  imageInitials: string;
  companySizes: string[];
  verified: boolean;
}

export interface Review {
  id: string;
  consultantSlug: string;
  authorName: string;
  authorCompany: string;
  rating: number;
  text: string;
  date: string;
  response?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  publishDate: string;
  author: string;
  authorSlug?: string;
  content: string;
}

export const consultants: Consultant[] = [
  {
    slug: "sarah-mitchell",
    name: "Sarah Mitchell",
    credentials: ["SHRM-SCP", "SPHR"],
    headline: "Strategic HR leader helping small businesses build compliant, people-first workplaces",
    bio: "With over 15 years of HR leadership experience, I specialize in helping small businesses in North Carolina navigate complex employment law and build sustainable HR practices. Previously VP of People at a 200-person tech company in the Triangle, I now focus on bringing enterprise-level HR expertise to businesses that need it most. I'm passionate about making compliance approachable and helping founders create workplaces where people thrive.",
    specialties: ["Compliance & Audits", "Employee Handbooks", "HR Policy Development", "Compensation & Benefits"],
    industries: ["Technology", "Professional Services", "Healthcare"],
    states: ["North Carolina"],
    rating: 4.9,
    reviewCount: 47,
    hourlyRate: 150,
    yearsExperience: 15,
    nextAvailable: "Tomorrow",
    imageInitials: "SM",
    companySizes: ["11-25 employees", "26-50 employees"],
    verified: true,
  },
  {
    slug: "marcus-johnson",
    name: "Marcus Johnson",
    credentials: ["SHRM-CP", "PHR"],
    headline: "Practical HR solutions for growing teams in the Triangle",
    bio: "I help small business owners in Raleigh-Durham stop worrying about HR and start focusing on growth. My background includes 10 years in corporate HR at major healthcare systems, and I bring that structured approach to businesses of all sizes. Whether you need a handbook from scratch or help navigating a tricky termination, I provide clear, actionable guidance.",
    specialties: ["Terminations & Offboarding", "Hiring & Onboarding", "Employee Relations", "Workplace Investigations"],
    industries: ["Healthcare", "Construction", "Manufacturing"],
    states: ["North Carolina"],
    rating: 4.8,
    reviewCount: 32,
    hourlyRate: 150,
    yearsExperience: 10,
    nextAvailable: "Today",
    imageInitials: "MJ",
    companySizes: ["1-10 employees", "11-25 employees"],
    verified: true,
  },
  {
    slug: "jennifer-okafor",
    name: "Jennifer Okafor",
    credentials: ["SHRM-SCP"],
    headline: "Nonprofit HR specialist with deep NC regulatory knowledge",
    bio: "Nonprofits face unique HR challenges, and I've spent 12 years mastering them. From volunteer management policies to grant-funded position compliance, I understand the specific needs of mission-driven organizations in North Carolina. I've worked with over 50 nonprofits across the Triangle and love helping organizations focus on their mission instead of paperwork.",
    specialties: ["Compliance & Audits", "HR Policy Development", "Training & Development", "FMLA Administration"],
    industries: ["Nonprofits", "Education", "Government Contractors"],
    states: ["North Carolina", "Virginia"],
    rating: 5.0,
    reviewCount: 28,
    hourlyRate: 150,
    yearsExperience: 12,
    nextAvailable: "This week",
    imageInitials: "JO",
    companySizes: ["1-10 employees", "11-25 employees", "26-50 employees"],
    verified: true,
  },
  {
    slug: "david-chen",
    name: "David Chen",
    credentials: ["PHR", "SHRM-CP"],
    headline: "Tech-savvy HR consultant for startups and scaling companies",
    bio: "I've helped over 30 startups in the Research Triangle Park area build their HR foundations from day one. My focus is creating scalable people operations — from your first hire to your fiftieth. I bring a modern approach to HR that works with your tools, your culture, and your budget. Previously led People Ops at two YC-backed startups.",
    specialties: ["Hiring & Onboarding", "Compensation & Benefits", "Employee Handbooks", "HR Policy Development"],
    industries: ["Technology", "Professional Services"],
    states: ["North Carolina"],
    rating: 4.7,
    reviewCount: 21,
    hourlyRate: 150,
    yearsExperience: 8,
    nextAvailable: "Tomorrow",
    imageInitials: "DC",
    companySizes: ["1-10 employees", "11-25 employees"],
    verified: true,
  },
  {
    slug: "patricia-williams",
    name: "Patricia Williams",
    credentials: ["SPHR", "SHRM-SCP"],
    headline: "Senior HR executive bringing Fortune 500 expertise to small business",
    bio: "After 20 years leading HR at major corporations including two Fortune 500 companies, I transitioned to consulting to help small businesses access the same caliber of HR guidance. I specialize in complex compliance situations, organizational restructuring, and building HR departments from the ground up. Based in Raleigh, I serve clients throughout North Carolina.",
    specialties: ["Compliance & Audits", "Workplace Investigations", "Terminations & Offboarding", "Compensation & Benefits"],
    industries: ["Manufacturing", "Retail", "Construction", "Government Contractors"],
    states: ["North Carolina", "South Carolina"],
    rating: 4.9,
    reviewCount: 53,
    hourlyRate: 150,
    yearsExperience: 20,
    nextAvailable: "This week",
    imageInitials: "PW",
    companySizes: ["11-25 employees", "26-50 employees"],
    verified: true,
  },
  {
    slug: "james-rivera",
    name: "James Rivera",
    credentials: ["SHRM-CP"],
    headline: "Bilingual HR consultant specializing in construction and hospitality",
    bio: "I serve the growing Hispanic business community in North Carolina, offering bilingual HR consulting services. With 9 years of experience in construction and hospitality industries, I understand the unique workforce challenges these sectors face. From I-9 compliance to safety training programs, I help businesses stay compliant and competitive.",
    specialties: ["Compliance & Audits", "Hiring & Onboarding", "Training & Development", "Employee Relations"],
    industries: ["Construction", "Hospitality", "Retail"],
    states: ["North Carolina"],
    rating: 4.8,
    reviewCount: 19,
    hourlyRate: 150,
    yearsExperience: 9,
    nextAvailable: "Today",
    imageInitials: "JR",
    companySizes: ["1-10 employees", "11-25 employees", "26-50 employees"],
    verified: true,
  },
  {
    slug: "amanda-foster",
    name: "Amanda Foster",
    credentials: ["SHRM-SCP", "PHR"],
    headline: "FMLA and leave management expert for NC employers",
    bio: "Leave management is one of the most complex areas of HR, and it's my specialty. I've helped hundreds of North Carolina employers navigate FMLA, ADA accommodations, and state-specific leave requirements. I also provide comprehensive compensation benchmarking and benefits strategy for small businesses looking to attract top talent without enterprise budgets.",
    specialties: ["FMLA Administration", "Compensation & Benefits", "Compliance & Audits", "HR Policy Development"],
    industries: ["Healthcare", "Technology", "Professional Services", "Education"],
    states: ["North Carolina", "Virginia"],
    rating: 4.6,
    reviewCount: 15,
    hourlyRate: 150,
    yearsExperience: 11,
    nextAvailable: "This week",
    imageInitials: "AF",
    companySizes: ["11-25 employees", "26-50 employees"],
    verified: true,
  },
  {
    slug: "robert-kim",
    name: "Robert Kim",
    credentials: ["SHRM-CP", "PHR"],
    headline: "Employee relations specialist focused on workplace culture",
    bio: "Great workplaces don't happen by accident. I help small business owners in the Triangle build cultures that retain talent and prevent costly disputes. My background in employee relations and workplace investigations means I can help you handle difficult situations with confidence and legal compliance. Every business deserves an HR partner who understands both the people and the regulations.",
    specialties: ["Employee Relations", "Workplace Investigations", "Training & Development", "Terminations & Offboarding"],
    industries: ["Technology", "Retail", "Hospitality", "Professional Services"],
    states: ["North Carolina"],
    rating: 4.7,
    reviewCount: 24,
    hourlyRate: 150,
    yearsExperience: 7,
    nextAvailable: "Tomorrow",
    imageInitials: "RK",
    companySizes: ["1-10 employees", "11-25 employees"],
    verified: true,
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    consultantSlug: "sarah-mitchell",
    authorName: "Mike T.",
    authorCompany: "Apex Digital Solutions",
    rating: 5,
    text: "Sarah completely overhauled our employee handbook and made sure we were compliant with NC regulations. Worth every penny.",
    date: "2026-02-15",
  },
  {
    id: "r2",
    consultantSlug: "sarah-mitchell",
    authorName: "Lisa K.",
    authorCompany: "Triangle Wellness Group",
    rating: 5,
    text: "Incredibly knowledgeable about healthcare HR compliance. She identified risks we didn't even know we had.",
    date: "2026-01-28",
  },
  {
    id: "r3",
    consultantSlug: "sarah-mitchell",
    authorName: "James P.",
    authorCompany: "RTP Innovations",
    rating: 5,
    text: "Best HR consultant we've worked with. Clear, practical advice that we could implement immediately.",
    date: "2026-01-10",
  },
  {
    id: "r4",
    consultantSlug: "marcus-johnson",
    authorName: "Sandra W.",
    authorCompany: "Durham Builders Co.",
    rating: 5,
    text: "Marcus helped us navigate a really difficult termination situation. His guidance was calm, clear, and legally sound.",
    date: "2026-02-20",
  },
  {
    id: "r5",
    consultantSlug: "marcus-johnson",
    authorName: "Tom R.",
    authorCompany: "CareFirst Medical",
    rating: 5,
    text: "Helped us set up our entire onboarding process. Our new hire experience is completely transformed.",
    date: "2026-01-15",
  },
  {
    id: "r6",
    consultantSlug: "jennifer-okafor",
    authorName: "Rachel M.",
    authorCompany: "Wake County Arts Alliance",
    rating: 5,
    text: "Jennifer understands nonprofits like no one else. She knew exactly what compliance issues to prioritize for our budget.",
    date: "2026-03-01",
  },
  {
    id: "r7",
    consultantSlug: "patricia-williams",
    authorName: "Carlos D.",
    authorCompany: "Precision Manufacturing NC",
    rating: 5,
    text: "Patricia brought a level of expertise we thought was only available to big corporations. Game changer for our 40-person shop.",
    date: "2026-02-10",
  },
  {
    id: "r8",
    consultantSlug: "david-chen",
    authorName: "Emily S.",
    authorCompany: "LaunchPad Tech",
    rating: 5,
    text: "David gets startups. No unnecessary bureaucracy - just the HR foundation we needed to scale from 5 to 25 people.",
    date: "2026-02-05",
  },
  {
    id: "r9",
    consultantSlug: "james-rivera",
    authorName: "Miguel A.",
    authorCompany: "Rivera Construction LLC",
    rating: 5,
    text: "Having a bilingual consultant who truly understands construction HR was invaluable. James kept us out of compliance trouble.",
    date: "2026-01-20",
  },
  {
    id: "r10",
    consultantSlug: "robert-kim",
    authorName: "Anna L.",
    authorCompany: "Bright Retail Group",
    rating: 4,
    text: "Robert helped us handle a workplace investigation professionally. His training session on manager best practices was excellent.",
    date: "2026-02-25",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "nc-employee-handbook-requirements-2026",
    title: "NC Employee Handbook Requirements: What Every Small Business Must Include in 2026",
    excerpt: "North Carolina doesn't mandate employee handbooks, but having one is critical for legal protection. Here's what yours needs to cover.",
    category: "Compliance",
    readTime: 8,
    publishDate: "2026-03-15",
    author: "Sarah Mitchell",
    authorSlug: "sarah-mitchell",
    content: `An employee handbook is one of the most important documents your small business can have. While North Carolina does not legally require employers to maintain a handbook, operating without one exposes your business to significant legal and operational risk.

A well-crafted handbook establishes clear expectations, communicates policies consistently, and provides documentation that can protect you in employment disputes. For NC employers, there are specific policies that should be addressed given state-level regulations and at-will employment considerations.

## Essential Policies for NC Employers

Every North Carolina employee handbook should address at-will employment status, equal employment opportunity, anti-harassment and anti-discrimination policies, leave policies including sick leave and FMLA (if applicable), workplace safety expectations, and disciplinary procedures.

## At-Will Employment Statement

North Carolina is an at-will employment state, meaning either the employer or employee can end the employment relationship at any time, for any legal reason. Your handbook should clearly state this while being careful not to create implied contract language that could undermine at-will status.

## Wage and Hour Policies

Your handbook should clearly outline pay periods, overtime policies, and how final paychecks are handled. Under NC law, employers must pay final wages on the next regular payday — there is no exception for terminated employees.

## Next Steps

If your current handbook is more than two years old, or if you don't have one at all, it's time to act. An experienced HR consultant can review your existing policies or help you build a handbook from scratch that protects both your business and your employees.`,
  },
  {
    slug: "fmla-guide-nc-small-business",
    title: "FMLA for NC Small Businesses: When It Applies and How to Comply",
    excerpt: "Many NC small business owners aren't sure if FMLA applies to them. Here's a clear breakdown of when federal leave requirements kick in.",
    category: "FMLA",
    readTime: 6,
    publishDate: "2026-03-08",
    author: "Amanda Foster",
    authorSlug: "amanda-foster",
    content: `The Family and Medical Leave Act (FMLA) is one of the most misunderstood employment laws among small business owners. Understanding when it applies and how to manage leave requests properly is critical for North Carolina employers approaching the 50-employee threshold.

## Does FMLA Apply to Your Business?

FMLA applies to private employers with 50 or more employees within a 75-mile radius. This is measured using the payroll count for 20 or more calendar workweeks in the current or preceding year. If you're approaching this threshold, it's time to start preparing your leave administration policies.

## Employee Eligibility

Even at covered employers, not every employee qualifies for FMLA leave. Employees must have worked for your company for at least 12 months, logged at least 1,250 hours in the previous 12 months, and work at a location where you employ 50 or more people within 75 miles.

## Common Mistakes NC Employers Make

The most frequent FMLA compliance errors include failing to designate qualifying leave as FMLA, not providing required notices, retaliating against employees who take protected leave, and miscounting intermittent leave usage.

## Getting Ahead of Compliance

Don't wait until you hit 50 employees to establish leave management processes. Start building your FMLA compliance framework at 35-40 employees so you're ready when the threshold triggers.`,
  },
  {
    slug: "termination-checklist-nc-employers",
    title: "The Complete Termination Checklist for North Carolina Employers",
    excerpt: "Terminating an employee in NC? Follow this step-by-step checklist to protect your business and handle the process professionally.",
    category: "Terminations",
    readTime: 7,
    publishDate: "2026-02-28",
    author: "Marcus Johnson",
    authorSlug: "marcus-johnson",
    content: `Terminating an employee is one of the most stressful tasks a business owner faces. In North Carolina's at-will employment environment, you generally have broad discretion to end an employment relationship, but doing it wrong can still create legal exposure.

## Before the Termination Meeting

Documentation is your first line of defense. Before scheduling a termination meeting, ensure you have written records of performance issues, policy violations, or the business reason for the separation. Review the employee's file for any protected class considerations, recent complaints, or leave requests that could suggest retaliation.

## During the Termination

Keep the meeting brief, professional, and factual. Have a witness present — ideally someone from HR or management. Provide a clear statement that employment is being terminated and the effective date. Avoid debating the decision or providing excessive justification.

## Final Pay Requirements in NC

North Carolina law requires that final wages be paid on or before the next regular payday, regardless of whether the termination was voluntary or involuntary. This includes all earned wages, accrued vacation (if your policy provides for payout), and any commissions or bonuses owed.

## Post-Termination Considerations

After the meeting, handle practical matters: collect company property, revoke system access, provide COBRA information if applicable, and document the exit process. Send any required state separation notices within the mandated timeframe.`,
  },
  {
    slug: "hiring-first-employee-nc",
    title: "Hiring Your First Employee in North Carolina: A Complete Guide",
    excerpt: "Ready to make your first hire? Here's everything NC business owners need to know about employment requirements and onboarding.",
    category: "Hiring",
    readTime: 9,
    publishDate: "2026-02-15",
    author: "David Chen",
    authorSlug: "david-chen",
    content: `Making your first hire is an exciting milestone for any North Carolina business. It's also the moment you become an employer with a new set of legal obligations. Getting the fundamentals right from day one saves you from costly corrections later.

## State and Federal Registration

Before your first employee starts, you need an Employer Identification Number (EIN) from the IRS, registration with the NC Division of Employment Security for unemployment insurance, registration with the NC Department of Revenue for income tax withholding, and workers' compensation insurance (required in NC for businesses with 3+ employees).

## Required New Hire Paperwork

Every new hire in North Carolina requires Form I-9 (Employment Eligibility Verification), Form W-4 (Federal Tax Withholding), NC-4 (State Tax Withholding), and a new hire report filed with NC Child Support Services within 20 days.

## Setting Up Payroll

You'll need to decide between handling payroll yourself, using software like Gusto or ADP, or outsourcing to a payroll service. For most small businesses making their first hire, a payroll software solution offers the best balance of cost and compliance support.

## Creating an Offer Letter

While not legally required in NC, an offer letter establishes clear expectations. Include the position title, start date, compensation, work schedule, at-will employment statement, and any contingencies like background checks.`,
  },
  {
    slug: "nc-wage-hour-laws-small-business",
    title: "NC Wage and Hour Laws: What Small Business Owners Need to Know",
    excerpt: "From minimum wage to overtime rules, understand the wage and hour requirements that apply to your North Carolina business.",
    category: "Compliance",
    readTime: 7,
    publishDate: "2026-02-01",
    author: "Patricia Williams",
    authorSlug: "patricia-williams",
    content: `Wage and hour compliance is one of the most common areas where small businesses in North Carolina run into trouble. Understanding both federal (FLSA) and state requirements is essential for avoiding costly violations.

## Minimum Wage in NC

North Carolina follows the federal minimum wage, currently set at $7.25 per hour. Tipped employees can be paid a base rate of $2.13 per hour, provided their tips bring total compensation to at least the minimum wage. Employers must make up any shortfall.

## Overtime Requirements

Non-exempt employees must receive overtime pay at 1.5 times their regular rate for any hours worked over 40 in a workweek. The key question for most small businesses is whether their employees are properly classified as exempt or non-exempt.

## Common Classification Mistakes

The most expensive wage and hour mistake is misclassifying employees as exempt from overtime. To qualify for exemption, employees must meet specific salary and duties tests. Simply paying someone a salary does not make them exempt.

## Record-Keeping Requirements

North Carolina employers must maintain payroll records for at least three years. Records should include employee name and address, hours worked each day, total wages paid each pay period, and deductions made from wages.

## Deduction Rules

NC law places restrictions on what employers can deduct from employee wages. Written authorization is required for most deductions, and certain deductions — like those for cash register shortages — are prohibited unless very specific conditions are met.`,
  },
];

export function getConsultantBySlug(slug: string): Consultant | undefined {
  return consultants.find((c) => c.slug === slug);
}

export function getReviewsForConsultant(slug: string): Review[] {
  return reviews.filter((r) => r.consultantSlug === slug);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
