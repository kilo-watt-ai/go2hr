import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, User, ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { blogPosts, getBlogPostBySlug } from "@/lib/mock-data";
import Button from "@/components/ui/Button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <>
      {/* Article Header */}
      <section className="bg-primary-50 py-12 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1 text-primary hover:text-primary-dark text-sm font-medium mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Resources
          </Link>
          <span className="inline-block bg-primary-100 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.authorSlug ? (
                <Link
                  href={`/consultants/${post.authorSlug}`}
                  className="text-primary hover:underline"
                >
                  {post.author}
                </Link>
              ) : (
                <span>{post.author}</span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(post.publishDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12">
            {/* Main Content */}
            <article className="max-w-3xl">
              <div className="prose prose-lg text-neutral-700 space-y-4">
                {paragraphs.map((p, i) => {
                  if (p.startsWith("## ")) {
                    return (
                      <h2
                        key={i}
                        className="text-2xl font-bold text-neutral-900 mt-8 mb-4"
                      >
                        {p.replace("## ", "")}
                      </h2>
                    );
                  }
                  return (
                    <p key={i} className="leading-relaxed">
                      {p}
                    </p>
                  );
                })}
              </div>

              {/* Author Bio */}
              <div className="mt-12 pt-8 border-t border-neutral-200">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-lg">
                      {post.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">
                      {post.author}
                    </p>
                    <p className="text-sm text-neutral-600 mt-1">
                      certified HR consultant on the Go2HR platform.
                      Specializing in NC employment law and small business HR.
                    </p>
                    {post.authorSlug && (
                      <Link
                        href={`/consultants/${post.authorSlug}`}
                        className="text-sm text-primary hover:underline mt-1 inline-block"
                      >
                        View Profile
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* CTA Card */}
              <div className="bg-primary rounded-xl p-6 text-white sticky top-24">
                <h3 className="text-lg font-bold mb-2">
                  Get Expert HR Help
                </h3>
                <p className="text-primary-200 text-sm mb-4">
                  Need personalized guidance on this topic? Book a $150
                  session with a certified HR consultant.
                </p>
                <Button
                  href="/find-a-consultant"
                  variant="secondary"
                  size="sm"
                  className="w-full"
                >
                  Find a Consultant
                </Button>
              </div>

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <div>
                  <h3 className="font-bold text-neutral-900 mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/resources/${related.slug}`}
                        className="block p-4 rounded-lg border border-neutral-200 hover:border-primary-200 hover:bg-primary-50 transition-all"
                      >
                        <span className="text-xs font-semibold text-primary uppercase">
                          {related.category}
                        </span>
                        <h4 className="text-sm font-semibold text-neutral-900 mt-1 leading-snug">
                          {related.title}
                        </h4>
                        <div className="flex items-center gap-1 mt-2 text-xs text-neutral-500">
                          <Clock className="w-3 h-3" />
                          <span>{related.readTime} min read</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-neutral-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-3">
            Need Help With This Topic?
          </h2>
          <p className="text-neutral-600 mb-6">
            Book a one-on-one session with a certified HR consultant who
            specializes in this area.
          </p>
          <Button href="/find-a-consultant" size="lg">
            Book a $150 Consultation
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </>
  );
}
