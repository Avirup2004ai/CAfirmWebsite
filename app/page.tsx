"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Shield, TrendingUp, Users, Clock, Award, ArrowRight, BookOpen, Briefcase, Building2, ChevronRight } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { CTAGroup /* , BookConsultationButton */ } from "@/components/CTAButtons";
import HeroBanner from "@/components/HeroBanner";
import ServiceCard from "@/components/ServiceCard";
import PartnerCard from "@/components/PartnerCard";
import KnowledgeCard from "@/components/KnowledgeCard";
import PageTransition from "@/components/PageTransition";
import { siteConfig } from "@/content/site";
import { serviceCategories } from "@/content/services";
import { partners } from "@/content/partners";
import { sectors } from "@/content/sectors";
import { blogPosts } from "@/content/blog";
import { staggerContainer, staggerItem, fadeInUp, fadeInLeft, fadeInRight } from "@/lib/motion";

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield size={24} />,
  Receipt: <TrendingUp size={24} />,
  Building2: <Building2 size={24} />,
  Lightbulb: <Award size={24} />,
  Plane: <Briefcase size={24} />,
};

const whyChooseUs = [
  { icon: <Shield size={24} />, title: "20+ Years of Expertise", desc: "Two decades of trusted advisory in audit, tax, and compliance." },
  { icon: <Users size={24} />, title: "35+ Member Team", desc: "Dedicated professionals across audit, GST, tax, and advisory." },
  { icon: <TrendingUp size={24} />, title: "5,000+ Engagements", desc: "Successfully completed projects across diverse industries." },
  { icon: <Clock size={24} />, title: "Timely Compliance", desc: "Zero deadline misses with proactive compliance management." },
  { icon: <Award size={24} />, title: "Multi-disciplinary", desc: "CA, CS, CMA, and legal expertise under one roof." },
  { icon: <BookOpen size={24} />, title: "Technology-Driven", desc: "Modern tools and digital-first approach to practice." },
];

export default function HomePage() {
  const reduceMotion = useReducedMotion();

  return (
    <PageTransition>
      {/* Hero Banner Carousel */}
      <h1 className="sr-only">S.A.M.P.N. & Associates – Chartered Accountants | Audit, Taxation, GST, Advisory</h1>
      <HeroBanner />

      {/* Trust Metrics */}
      <section className="border-y border-neutral-200 bg-white">
        <div className="section-container grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {[
            { end: siteConfig.stats.yearsExperience, suffix: "+", label: "Years Experience" },
            { end: siteConfig.stats.clients, suffix: "+", label: "Clients Served" },
            { end: siteConfig.stats.offices, label: "Office Locations" },
            { end: siteConfig.stats.projectsCompleted, suffix: "+", label: "Engagements" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-primary-600 font-heading">
                <AnimatedCounter end={stat.end} suffix={stat.suffix || ""} />
              </p>
              <p className="mt-1 text-sm text-neutral-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-neutral-50">
        <div className="section-container">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
            <h2 className="text-3xl font-bold text-neutral-900 font-heading">Our Services</h2>
            <p className="mx-auto mt-3 max-w-2xl text-neutral-600">Comprehensive chartered accountancy services covering every aspect of your financial and compliance needs.</p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.slice(0, 5).map((cat) => (
              <ServiceCard key={cat.slug} title={cat.title} description={cat.description} href={`/services/${cat.slug}`} icon={iconMap[cat.icon] || <Shield size={24} />} />
            ))}
            <motion.div variants={staggerItem}>
              <Link href="/services" className="card group flex h-full flex-col items-center justify-center bg-primary-50 text-center hover:bg-primary-100">
                <ArrowRight size={32} className="mb-3 text-primary-500" />
                <span className="text-lg font-semibold text-primary-600">View All Services</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
            <h2 className="text-3xl font-bold text-neutral-900 font-heading">Why Choose Us</h2>
            <p className="mx-auto mt-3 max-w-2xl text-neutral-600">Built on trust, driven by expertise, and committed to your success.</p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item) => (
              <motion.div key={item.title} variants={staggerItem} className="flex items-start gap-4 rounded-xl bg-neutral-50 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600">{item.icon}</div>
                <div>
                  <h3 className="text-base font-semibold text-neutral-800">{item.title}</h3>
                  <p className="mt-1 text-sm text-neutral-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partner Highlights */}
      <section className="section-padding bg-neutral-50">
        <div className="section-container">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
            <h2 className="text-3xl font-bold text-neutral-900 font-heading">Meet Our Partners</h2>
            <p className="mx-auto mt-3 max-w-2xl text-neutral-600">Experienced professionals leading our practice across disciplines.</p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-10 grid gap-6 md:grid-cols-3">
            {partners.map((p) => (
              <PartnerCard key={p.slug} partner={p} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sectors */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-neutral-900 font-heading">Industries We Serve</h2>
            <p className="mt-3 max-w-2xl text-neutral-600">Deep sector expertise across India&apos;s key industries.</p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((s) => (
              <motion.div key={s.slug} variants={staggerItem}>
                <Link href={`/about/sectors#${s.slug}`} className="group flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 hover:border-primary-200 hover:shadow-md transition-all">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-800">{s.title}</h3>
                    <p className="text-xs text-neutral-500 line-clamp-1">{s.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Knowledge Bank Preview */}
      <section className="section-padding bg-neutral-50">
        <div className="section-container">
          <motion.div variants={fadeInRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 font-heading">Knowledge Bank</h2>
              <p className="mt-3 max-w-xl text-neutral-600">Stay updated with our resources, tools, and calculators.</p>
            </div>
            <Link href="/knowledge" className="hidden items-center gap-1 text-sm font-medium text-primary-500 hover:text-primary-700 md:flex">
              View all <ChevronRight size={16} />
            </Link>
          </motion.div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "GST Calculator", desc: "Calculate GST amount and total price instantly.", href: "/knowledge/calculators/gst-calculator", cat: "Calculator" },
              { title: "HRA Exemption Calculator", desc: "Estimate your HRA exemption under Section 10(13A).", href: "/knowledge/calculators/hra-exemption", cat: "Calculator" },
              { title: "Compliance Calendar", desc: "Month-wise due dates for all statutory filings.", href: "/knowledge/utilities", cat: "Utility" },
              { title: "TDS Rate Chart", desc: "Complete TDS/TCS rates for FY 2025-26.", href: "/knowledge/utilities", cat: "Utility" },
            ].map((item) => (
              <KnowledgeCard key={item.title} title={item.title} description={item.desc} href={item.href} category={item.cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Insights Preview */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
            <h2 className="text-3xl font-bold text-neutral-900 font-heading">Insights & Updates</h2>
            <p className="mx-auto mt-3 max-w-2xl text-neutral-600">Expert analysis and practical guidance from our team.</p>
          </motion.div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <Link key={post.slug} href={`/knowledge/bulletins/${post.slug}`} className="card group">
                <div className="mb-3 aspect-[16/9] overflow-hidden rounded-lg bg-neutral-100">
                  <Image src={post.image} alt={post.title} width={400} height={225} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <span className="text-xs font-medium text-primary-500">{post.category}</span>
                <h3 className="mt-1 text-base font-semibold text-neutral-800 line-clamp-2 font-heading">{post.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 line-clamp-2">{post.excerpt}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-neutral-50">
        <div className="section-container">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
            <h2 className="text-3xl font-bold text-neutral-900 font-heading">What Our Clients Say</h2>
            <p className="mx-auto mt-3 max-w-2xl text-neutral-600">Trusted by 1,500+ businesses across India.</p>
          </motion.div>
          <div className="mt-10">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-primary-700 text-white">
        <div className="section-container flex flex-col items-center gap-6 py-16 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <h2 className="text-2xl font-bold font-heading lg:text-3xl">Ready to get started?</h2>
            <p className="mt-2 max-w-xl text-primary-200">Book a free consultation with our experts and discover how we can help your business.</p>
          </div>
          {/* <BookConsultationButton className="!bg-accent-500 hover:!bg-accent-600" /> */}
        </div>
      </section>

      {/* Office Cards */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <h2 className="text-center text-3xl font-bold text-neutral-900 font-heading">Our Offices</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {siteConfig.addresses.map((addr) => (
              <div key={addr.id} className="card">
                <h3 className="text-lg font-semibold text-neutral-800 font-heading">{addr.label}</h3>
                <p className="mt-2 text-sm text-neutral-600">{addr.line1}</p>
                <p className="text-sm text-neutral-600">{addr.line2}</p>
                <div className="mt-3 flex flex-col gap-1 text-sm text-neutral-600">
                  <a href={`tel:${addr.phone}`} className="hover:text-primary-500 transition-colors">📞 {addr.phone}</a>
                  <a href={`mailto:${addr.email}`} className="hover:text-primary-500 transition-colors">✉️ {addr.email}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
