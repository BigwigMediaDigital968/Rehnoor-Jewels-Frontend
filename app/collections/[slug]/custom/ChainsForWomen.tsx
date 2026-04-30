"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  ShieldCheck,
  Star,
  Sparkles,
  Heart,
  Plus,
  Minus,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Gift,
  Search,
  Gem,
} from "lucide-react";
import Link from "next/link";

/**
 * REHNOOR JEWELS - Chains for Women
 * A comprehensive, premium category page featuring full provided content.
 */

const ChainsForWomen = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentReview, setCurrentReview] = useState(0);
  const reviewRef = useRef<HTMLDivElement>(null);

  // SEO Schema Generation
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: "Gold Plated Chains for Women",
      brand: { "@type": "Brand", name: "Rehnoor Jewels" },
      description:
        "Premium 1 gram gold plated chains for women with anti-tarnish protection and high-quality gold plating.",
      category: "Jewelry > Necklaces",
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  const features = [
    {
      title: "Premium Gold Plating",
      desc: "Every chain in our collection is finished with high-quality gold plating that gives it the warm, rich glow of real gold. The kind that makes people look twice and ask where you got it from.",
    },
    {
      title: "Anti-Tarnish Protection",
      desc: "Our gold plated chains for women come with a protective anti-tarnish coating that keeps the shine and colour intact through daily wear and adventures.",
    },
    {
      title: "Lightweight & Comfortable",
      desc: "Our 1 gram gold chain for women is designed to sit comfortably around the neck all day without feeling heavy, irritating, or intrusive.",
    },
    {
      title: "Skin-Friendly Materials",
      desc: "Crafted with skin-safe base metals and a smooth gold plated finish, our chains are gentle on all skin types and designed for long daily wear.",
    },
    {
      title: "Versatile by Design",
      desc: "Wear it alone, layer it with a pendant, or stack multiple chains. Our gold plated chains for women work beautifully every single way.",
    },
    {
      title: "Affordable Everyday Luxury",
      desc: "Premium quality, warm gold finish, and a price that makes complete sense. That is the Rehnoor promise.",
    },
  ];

  const stylingTips = [
    {
      title: "The Everyday Essential",
      desc: "A slim 1 gram gold chain worn simply around the neck with a casual kurta, tee, or shirt - clean, elegant, and quietly beautiful every single day.",
    },
    {
      title: "The Pendant Partner",
      desc: "Pair your gold plated chain with a meaningful pendant - a god locket, an initial, or a floral charm, for a personalised look that tells your story without saying a word.",
    },
    {
      title: "The Layered Look",
      desc: "Stack two or three chains of varying lengths and thicknesses for a curated, fashion-forward layered look that feels effortlessly styled and completely unique to you.",
    },
    {
      title: "The Festive Touch",
      desc: "Let a slightly bolder gold chain sit over a silk saree or embroidered kurta for a festive look that is understated yet undeniably elegant, the kind of look that does not try too hard but always gets noticed.",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      city: "Delhi",
      text: "I ordered a gold chain from Rehnoor Jewels and honestly it is the piece I wear the most. Simple, elegant, and the gold finish is so warm and real-looking. Worth every rupee!",
    },
    {
      name: "Sneha Patel",
      city: "Mumbai",
      text: "Been wearing my chain every single day for months and it still looks as beautiful as day one. The anti-tarnish coating genuinely works. So happy with my purchase from Rehnoor Jewels!",
    },
    {
      name: "Ananya Reddy",
      city: "Hyderabad",
      text: "The chain I ordered pairs so beautifully with my god locket pendant. The gold finish is smooth, warm, and looks absolutely premium. Nobody believes it is not real gold!",
    },
    {
      name: "Meera Iyer",
      city: "Bangalore",
      text: "Gifted a gold chain to my sister on her birthday and she absolutely loved it. The packaging was so elegant and the chain was even more beautiful in person. Rehnoor Jewels never disappoints!",
    },
    {
      name: "Ritu Agarwal",
      city: "Jaipur",
      text: "Finally found a chain that goes with absolutely everything - ethnic, western, formal, casual. The gold finish is gorgeous and it is so light and comfortable to wear all day. Love it!",
    },
    {
      name: "Kavita Joshi",
      city: "Pune",
      text: "Ordered the layered chain look by buying two chains from Rehnoor Jewels and the combination looks stunning. So many compliments and nobody can believe the price. Truly exceptional quality!",
    },
    {
      name: "Simran Kaur",
      city: "Chandigarh",
      text: "My mother gifted me a chain from Rehnoor Jewels for Diwali and it is my most worn piece of jewellery. Lightweight, beautiful, and the shine has not faded one bit. A truly wonderful gift!",
    },
    {
      name: "Ishita Bose",
      city: "Kolkata",
      text: "The chain I ordered from Rehnoor Jewels is so versatile and elegant. I wear it to the office, to family functions, and even casually on weekends. It just works with everything. Absolutely love it!",
    },
  ];

  const faqs = [
    {
      q: "What is a 1 gram gold chain?",
      a: "A 1 gram gold chain for women is a chain crafted from a base metal and electroplated with one gram of real gold, giving it the warm, rich appearance of solid gold at a fraction of the cost. At Rehnoor Jewels, every chain comes with an anti-tarnish coating for lasting shine.",
    },
    {
      q: "Are gold plated chains for women suitable for daily wear?",
      a: "Absolutely! Our gold plated chains are lightweight, comfortable, and designed for everyday use. With proper care, they retain their beautiful gold finish for a long time.",
    },
    {
      q: "How long does a gold plated chain last?",
      a: "With regular and mindful care, a gold plated chain for women from Rehnoor Jewels can last 1 to 2 years or more, thanks to our premium anti-tarnish coating and high-quality gold plating.",
    },
    {
      q: "Can I wear my chain with a pendant?",
      a: "Yes! Our gold plated chains for women are designed to pair beautifully with pendants. Many styles in our collection can be worn as standalone chains or paired with your favourite pendant for a personalised look.",
    },
  ];

  const nextReview = () =>
    setCurrentReview((prev) => (prev + 1) % testimonials.length);
  const prevReview = () =>
    setCurrentReview(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );

  return (
    <div className="bg-[#faf8f3] text-[#1a1a1a] selection:bg-[#fcc151] selection:text-[#003720] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-[#002410] via-[#003720] to-[#004d2d]">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-20 left-[10%] w-[30rem] h-[30rem] rounded-full bg-[#fcc151] blur-[150px] mix-blend-soft-light" />
          <div className="absolute bottom-20 right-[10%] w-[35rem] h-[35rem] rounded-full bg-[#004d2d] blur-[180px] mix-blend-overlay" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-bold tracking-[0.2em] text-[#fcc151] uppercase border border-[#fcc151]/30 rounded-full bg-[#fcc151]/5 backdrop-blur-sm"
            >
              <Sparkles className="w-3 h-3" /> The Rehnoor Collection
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-5xl font-serif text-white mb-8 leading-[1.1]"
            >
              The Quiet Power of a{" "}
              <span className="text-[#fcc151] italic">Gold Chain</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-md text-[#faf8f3]/90 leading-relaxed max-w-4xl mx-auto font-light"
            >
              Sometimes the most powerful accessory is the one that sits quietly
              around your neck, making you feel effortlessly put together
              without even trying.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Intro Context - Full Content Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <motion.div {...fadeIn} className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl font-serif text-[#003720] leading-tight">
                  What Makes Our Gold Plated Chains for Women Worth Wearing
                  Every Day
                </h2>

                <p className="text-[#6b6b6b] text-lg leading-relaxed">
                  That is exactly what our gold plated chains for women are
                  designed to do. At Rehnoor Jewels, we believe a beautiful
                  chain is the piece you reach for first, wear the most, and
                  notice the most when it is missing. Simple, versatile, and
                  endlessly elegant, our 1 gram gold chain for women collection
                  is crafted to be exactly that kind of everyday essential.
                </p>
              </div>

              <div className="p-8 bg-[#003720] rounded-3xl text-white shadow-xl">
                <h3 className="text-2xl font-serif mb-6 text-[#fcc151]">
                  Why Choose Rehnoor Jewels?
                </h3>
                <div className="space-y-4 text-white/80">
                  <p>
                    There are many places to buy a gold chain online. At Rehnoor
                    Jewels, every gold plated chain for women is crafted with a
                    level of care and precision that you can actually see and
                    feel.
                  </p>
                  <p>
                    From the smoothness of each link to the strength of the
                    clasp and the richness of the gold plating, every detail is
                    attended to because we know that a chain you wear every day
                    deserves to be made right.
                  </p>
                  <p>
                    We are also honest with our customers. Our 1 gram gold chain
                    for women gives you the look and feel of real gold jewellery
                    at a fraction of the cost, no exaggerated claims. Just
                    beautiful, well-made chains delivered anywhere across India
                    with safe and careful packaging.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...fadeIn}
              transition={{ delay: 0.3 }}
              className="sticky top-28 grid grid-cols-1 gap-6"
            >
              <h3 className="text-3xl font-serif text-[#003720] mb-2">
                Worth Wearing Every Day
              </h3>
              <div className="grid gap-4">
                {features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="group p-6 bg-white rounded-2xl shadow-sm border border-[#e8e3da] hover:border-[#fcc151] transition-all"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#faf8f3] flex items-center justify-center text-[#fcc151] group-hover:bg-[#003720] group-hover:text-white transition-all">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#003720] text-lg mb-1">
                          {feat.title}
                        </h4>
                        <p className="text-[#6b6b6b] text-sm leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Styling Section */}
      <section className="py-32 bg-[#003720] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#fcc151]/5 -skew-x-12 transform translate-x-1/2" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-serif mb-6 text-[#fcc151]">
              From Minimal to Layered - How to Style Your Gold Plated Chain?
            </h2>
            <p className="text-[#faf8f3]/80 text-md leading-relaxed">
              The beauty of a gold plated chain for women lies in how
              effortlessly it adapts to every look and every mood. Here are a
              few of our favourite ways to wear yours:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {stylingTips.map((tip, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md transition-all flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-[#fcc151] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(252,193,81,0.2)] group-hover:scale-110 transition-all">
                  <Gem className="text-[#003720] w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif mb-4 text-[#fcc151]">
                  {tip.title}
                </h3>
                <p className="text-[#faf8f3]/70 leading-relaxed">{tip.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gifting Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
            <motion.div {...fadeIn} className="lg:w-1/2 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#fcc151]/10 rounded-full blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80"
                alt="Luxury jewelry gift packaging"
                className="rounded-[3rem] shadow-2xl relative z-10 w-full object-cover aspect-[4/5]"
              />
              <div className="absolute -bottom-8 -right-8 bg-[#003720] p-8 rounded-3xl text-white shadow-xl z-20">
                <Gift className="w-10 h-10 text-[#fcc151] mb-4" />
                <p className="text-xl font-serif">Thoughtful Gifting</p>
              </div>
            </motion.div>

            <motion.div
              {...fadeIn}
              transition={{ delay: 0.3 }}
              className="lg:w-1/2 space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-serif text-[#003720]">
                A Gift She Will Reach for Every Single Day
              </h2>
              <div className="space-y-6 text-lg text-[#6b6b6b] leading-relaxed">
                <p>
                  If you are looking for a gift that is thoughtful, wearable,
                  and genuinely appreciated, a gold plated chain for women from
                  Rehnoor Jewels is one of the best choices you can make.
                </p>
                <p>
                  Unlike occasion-specific jewellery, a beautiful chain is
                  something a woman reaches for every single day. It goes with
                  everything, suits every mood, and never goes out of style.
                  Whether it is a birthday, an anniversary, Rakhi, or simply a
                  moment you want to mark, our 1 gram gold chain for women
                  collection has a piece that says exactly what you want to say,
                  beautifully and simply.
                  <br />
                  <br />
                  Every piece arrives carefully packaged and ready to gift,
                  because thoughtful giving deserves a beautiful presentation.
                </p>
                <div className="flex items-center gap-4 text-[#003720] font-bold">
                  <CheckCircle2 className="text-[#fcc151]" /> Ready to gift,
                  elegant packaging
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-[#faf8f3] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-serif text-[#003720]">
              Real Women, Real Shine <br /> Here Is What Our Customers Say
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative px-12 md:px-20">
            <div className="overflow-hidden">
              <motion.div
                className="flex transition-all duration-500 ease-in-out"
                animate={{ x: `-${currentReview * 100}%` }}
              >
                {testimonials.map((test, idx) => (
                  <div key={idx} className="min-w-full px-4 py-10">
                    <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-[#e8e3da] text-center relative group">
                      <div className="absolute top-10 left-10 text-[#fcc151]/10">
                        <Star className="w-24 h-24 fill-current" />
                      </div>
                      <div className="flex justify-center gap-1 mb-8">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-6 h-6 fill-[#fcc151] text-[#fcc151]"
                          />
                        ))}
                      </div>
                      <blockquote className="text-md md:text-xl font-serif text-[#003720] mb-10 leading-relaxed italic">
                        "{test.text}"
                      </blockquote>
                      <div className="space-y-1">
                        <cite className="not-italic font-bold text-xl text-[#003720]">
                          {test.name}
                        </cite>
                        <p className="text-[#6b6b6b] uppercase tracking-widest text-xs">
                          {test.city}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={prevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-lg border border-[#e8e3da] flex items-center justify-center text-[#003720] hover:bg-[#fcc151] hover:border-[#fcc151] transition-all z-20 group cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={nextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-lg border border-[#e8e3da] flex items-center justify-center text-[#003720] hover:bg-[#fcc151] hover:border-[#fcc151] transition-all z-20 group cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-3 mt-12">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentReview(idx)}
                  className={`h-2 rounded-full transition-all ${currentReview === idx ? "w-8 bg-[#003720]" : "w-2 bg-[#e8e3da]"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Care Tips */}
      <section className="py-24 bg-[#002410]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-[#faf8f3] rounded-[4rem] p-10 md:p-20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 text-[#fcc151] opacity-10">
              <Sparkles className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif text-[#003720] mb-4">
                  Care Tips: Keep Your Chain Shining Every Day
                </h2>
                <div className="w-24 h-1 bg-[#fcc151] mx-auto rounded-full" />
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#003720] text-[#fcc151] flex items-center justify-center flex-shrink-0 font-serif text-xl">
                    01
                  </div>
                  <p className="text-lg text-[#1a1a1a] leading-relaxed">
                    Wipe your gold plated chain gently with a soft, dry cloth
                    after every wear to remove moisture and dust.
                  </p>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#003720] text-[#fcc151] flex items-center justify-center flex-shrink-0 font-serif text-xl">
                    02
                  </div>
                  <p className="text-lg text-[#1a1a1a] leading-relaxed">
                    For a deeper clean, use a soft cloth dampened with mild
                    soapy lukewarm water, wipe carefully, and dry completely.
                  </p>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#003720] text-[#fcc151] flex items-center justify-center flex-shrink-0 font-serif text-xl">
                    03
                  </div>
                  <p className="text-lg text-[#1a1a1a] leading-relaxed">
                    Store your 1 gram gold chain for women in a dry, airtight
                    jewellery pouch to protect it from humidity and air
                    exposure.
                  </p>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#003720] text-[#fcc151] flex items-center justify-center flex-shrink-0 font-serif text-xl">
                    04
                  </div>
                  <p className="text-lg text-[#1a1a1a] leading-relaxed">
                    Always remove your chain before bathing, swimming, or
                    applying perfumes and skincare products to preserve plating.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-[#003720] mb-4">
              FAQs: Gold Plated Chains for Women
            </h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="group bg-[#faf8f3] rounded-[1rem] border border-[#e8e3da] overflow-hidden transition-all hover:border-[#fcc151]"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-5 flex items-center justify-between text-left cursor-pointer"
                >
                  <h3 className="text-md font-medium  text-[#003720]">
                    {faq.q}
                  </h3>
                  <div
                    className={`p-2 rounded-full transition-all ${activeFaq === idx ? "bg-[#003720] text-white rotate-180" : "bg-white text-[#003720]"}`}
                  >
                    <Plus
                      className={`w-5 h-5 transition-transform ${activeFaq === idx ? "hidden" : "block"}`}
                    />
                    <Minus
                      className={`w-5 h-5 transition-transform ${activeFaq === idx ? "block" : "hidden"}`}
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 text-[#6b6b6b] text-sm leading-relaxed border-t border-[#e8e3da]/50 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Shop CTA */}
      <section className="py-24 bg-[#003720] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-6 h-full gap-4 rotate-12 scale-150">
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className="aspect-square border border-[#fcc151] rounded-full"
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-8">
            Ready to Find Yours?
          </h2>
          <p className="text-[#faf8f3]/80 mb-12 text-md md:text-lg max-w-3xl mx-auto leading-relaxed">
            Shop Gold Plated Chains for Women at Rehnoor Jewels. Find the one
            that was made for you—to feel elegant, confident, and beautifully
            yourself.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/collection"
              className="group px-12 py-6 bg-[#fcc151] text-[#003720] font-bold rounded-full hover:scale-105 transition-all shadow-[0_20px_50px_rgba(252,193,81,0.4)] flex items-center gap-3 text-xl"
            >
              Shop The Collection <ShoppingBag className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChainsForWomen;
