import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight, User } from "lucide-react";
import { blogPosts } from "@/lib/mock-data";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "HR Resources & Blog",
  description:
    "Expert articles on NC employment law, HR compliance, employee handbooks, FMLA, hiring, and more for small business owners.",
};

const categories = ["All", "Compliance", "FMLA", "Terminations", "Hiring"];

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            HR Resources for Small Business
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Expert guidance on North Carolina employment law, compliance,
            and HR best practices — written by certified HR professionals.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-4">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  cat === "All"
                    ? "bg-primary text-white"
                    : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
              >
                {/* Category Banner */}
                <div className="bg-primary-50 px-6 py-3">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-xl font-bold text-neutral-900 mb-3 leading-tight">
                    <Link
                      href={`/resources/${post.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-neutral-600 text-sm mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-neutral-500">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-primary rounded-2xl p-8 lg:p-12 text-center text-white">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Need Personalized HR Guidance?
            </h2>
            <p className="text-primary-200 text-lg mb-6 max-w-xl mx-auto">
              Our blog is a great starting point, but every business is unique.
              Book a session with a certified HR consultant for advice tailored
              to your situation.
            </p>
            <Button href="/find-a-consultant" variant="secondary" size="lg">
              Find a Consultant
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
