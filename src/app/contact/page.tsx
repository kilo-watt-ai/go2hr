"use client";

import { useState } from "react";
import { Mail, MapPin, Clock, Send } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    detail: "hello@go2hr.com",
    description: "We typically respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Location",
    detail: "United States",
    description: "Consultants available nationwide",
  },
  {
    icon: Clock,
    title: "Business Hours",
    detail: "Mon - Fri, 8am - 6pm EST",
    description: "Consultants available evenings by appointment",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-primary-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Have a question about Go2HR? We&apos;re here to help. Reach out and
            we&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  Contact Information
                </h2>
                <p className="text-neutral-600">
                  Whether you&apos;re a business looking for HR help or a
                  consultant interested in joining, we&apos;d love to hear from
                  you.
                </p>
              </div>
              {contactInfo.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">
                      {item.title}
                    </h3>
                    <p className="text-primary font-medium">{item.detail}</p>
                    <p className="text-sm text-neutral-500">{item.description}</p>
                  </div>
                </div>
              ))}

              <div className="bg-neutral-50 rounded-xl p-6">
                <h3 className="font-semibold text-neutral-900 mb-2">
                  Looking for HR Help Now?
                </h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Skip the contact form and book directly with a certified HR
                  consultant.
                </p>
                <Button href="/find-a-consultant" size="sm">
                  Find a Consultant
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-neutral-600 max-w-md mx-auto">
                      Thanks for reaching out. We&apos;ll get back to you within
                      24 hours during business days.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                      Send Us a Message
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input
                        label="First Name"
                        name="firstName"
                        placeholder="Jane"
                        required
                      />
                      <Input
                        label="Last Name"
                        name="lastName"
                        placeholder="Smith"
                        required
                      />
                    </div>
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="jane@company.com"
                      required
                    />
                    <Input
                      label="Company Name"
                      name="company"
                      placeholder="Acme Inc."
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor="inquiry-type"
                        className="block text-sm font-medium text-neutral-700"
                      >
                        What can we help with?
                      </label>
                      <select
                        id="inquiry-type"
                        name="inquiryType"
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[44px]"
                      >
                        <option value="">Select a topic...</option>
                        <option value="business">I need HR help for my business</option>
                        <option value="consultant">I want to join as a consultant</option>
                        <option value="partnership">Partnership inquiry</option>
                        <option value="support">Account support</option>
                        <option value="other">Something else</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-neutral-700"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Tell us how we can help..."
                        required
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-y"
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
