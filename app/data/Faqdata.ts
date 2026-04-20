import { FAQAnswerSegment, FAQsProps } from "../component/website/FAQ";

/* ─────────────────────────────────────────────
   HELPER — builds a rich answer from segments
   Usage: richAnswer("Visit our ", link("shipping page", "/shipping"), " for details.")
───────────────────────────────────────────── */
function t(value: string): FAQAnswerSegment {
  return { type: "text", value };
}
function l(value: string, href: string, external = false): FAQAnswerSegment {
  return { type: "link", value, href, external };
}

/* ═══════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════ */
export const homeFAQProps: FAQsProps = {
  tagline: "Here to help",
  title: "Frequently Asked Questions",
  subtitle:
    "Everything you need to know before you shop. Can't find your answer? Reach out to our team anytime.",
  theme: "light",
  items: [
    {
      question: "What is one gram gold jewellery?",
      answer:
        "One gram gold jewellery is crafted using a base metal electroplated with one gram of real gold, giving it the rich look of solid gold at an affordable price without compromising on style or finish.",
    },
    {
      question: "What jewellery collections are available at Rehnoor Jewels?",
      answer:
        "We offer a wide range, including necklaces, earrings, bangles, bracelets, rings, anklets, maang tikkas, and jewellery sets perfect for everyday wear as well as festive and special occasions.",
    },
    {
      question: "Do you offer jewellery for both men and women?",
      answer:
        "Absolutely! Rehnoor Jewels offers a diverse collection of one-gram gold-plated jewellery for both men and women, ranging from elegant everyday pieces to bold festive designs.",
    },
    {
      question: "Can I wear gold plated jewellery daily?",
      answer:
        "Yes! Our jewellery is lightweight, comfortable, and durable for everyday wear. For best results, avoid contact with water, sweat, and perfumes, and store in a dry, airtight pouch when not in use.",
    },
    {
      question: "Does gold-plated jewellery have an anti-tarnish?",
      answer:
        "Yes! Our one-gram gold-plated jewellery comes with a protective anti-tarnish coating that helps preserve its shine and lustre against moisture, sweat, and daily exposure.",
    },
    {
      question: "Does the colour fade over time?",
      answer:
        "With prolonged exposure to water, sweat, and chemicals, some fading may occur. However, our premium gold plating and anti-tarnish finish significantly extend the life and colour of each piece.",
    },
    {
      question: "How should I clean gold-plated jewellery?",
      answer:
        "Use a soft, lint-free cloth to gently wipe your jewellery after every use. For a more thorough clean, mix a drop of mild soap in lukewarm water, wipe gently, and pat dry completely. Keep your jewellery away from chemicals, perfumes, and excess moisture.",
    },
    {
      question: "Is your jewellery suitable for sensitive skin?",
      answer:
        "Our jewellery is crafted with skin-safe materials and a smooth gold-plated finish, suitable for most skin types. If you have a known metal allergy, we recommend consulting a specialist before purchase.",
    },
    {
      question: "Do you deliver across India?",
      answer:
        "Yes! We deliver pan-India with safe and secure packaging, ensuring your jewellery arrives in perfect condition. Visit our website or contact our support team for delivery details.",
    },
  ],
};

/* ═══════════════════════════════════════════
   COLLECTION PAGE
═══════════════════════════════════════════ */
export const collectionFAQProps: FAQsProps = {
  tagline: "About our collections",
  title: "Collection Questions",
  subtitle:
    "Curious about materials, care, or what makes each collection unique? We've got you covered.",
  theme: "dark",
  items: [
    {
      question: "What materials are used in the Men's Collection?",
      answer:
        "The Men's Collection is crafted from 925 sterling silver with a precision gold vermeil finish. Select pieces feature stainless steel cores for added durability, making them resistant to everyday wear, tarnish, and moisture.",
    },
    {
      question: "How should I care for my jewellery to maintain its finish?",
      answer: [
        t(
          "Store pieces individually in the provided anti-tarnish pouch. Avoid prolonged contact with perfumes, lotions, and water. For detailed care instructions by metal type, visit our ",
        ),
        l("jewellery care guide", "/care-guide"),
        t("."),
      ],
    },
    {
      question:
        "Are the Women's Collection pieces suitable for sensitive skin?",
      answer:
        "Yes. All pieces in the Women's Collection are nickel-free and hypoallergenic. We use surgical-grade alloys on any part that contacts the skin directly, making them safe for daily wear even for those with metal sensitivities.",
    },
    {
      question: "Do you release limited edition collections?",
      answer: [
        t(
          "Yes — we launch seasonal limited editions for festivals like Diwali, Eid, and Christmas, as well as occasional collaborations with independent designers. Sign up for our ",
        ),
        l("newsletter", "/newsletter"),
        t(" or follow us on "),
        l("Instagram", "https://instagram.com", true),
        t(" to be the first to know."),
      ],
    },
    {
      question:
        "Can I mix and match pieces from Men's and Women's collections?",
      answer:
        "Absolutely — many of our customers layer pieces across collections. Our sizing guide includes unisex sizing recommendations, and our style team is happy to suggest complementary combinations via live chat.",
    },
    {
      question: "Is customisation available within a collection?",
      answer: [
        t(
          "We offer engraving, stone substitution, and size adjustments on most collection pieces. Lead time is 7–10 business days. Submit a customisation request through the ",
        ),
        l("custom order form", "/custom"),
        t(" or email us at "),
        l("custom@rjjewels.com", "mailto:custom@rjjewels.com"),
        t("."),
      ],
    },
  ],
};

/* ═══════════════════════════════════════════
   PRODUCT PAGE
═══════════════════════════════════════════ */
export const productFAQProps: FAQsProps = {
  tagline: "Product details",
  title: "About This Piece",
  subtitle:
    "Specific questions about materials, sizing, and delivery for this product.",
  theme: "light",
  items: [
    {
      question: "What metal and finish does this piece use?",
      answer:
        "This piece is crafted from 925 sterling silver with an 18-karat gold vermeil finish applied through electrolysis. The finish is 2.5 microns thick — significantly thicker than standard gold-plated jewellery — giving it a longer-lasting lustrous appearance.",
    },
    {
      question: "Will this piece tarnish over time?",
      answer: [
        t(
          "With proper care, the finish remains vibrant for 2–3 years of regular wear. Avoid exposure to chlorine, harsh chemicals, and saltwater. Our ",
        ),
        l("care guide", "/care-guide"),
        t(
          " provides a full list of dos and don'ts to extend the life of your piece.",
        ),
      ],
    },
    {
      question: "How do I select the right size?",
      answer: [
        t(
          "Each product page includes a size guide specific to that jewellery type. For rings, use a string or paper strip to measure your finger's circumference and compare it to our ",
        ),
        l("ring size chart", "/sizing-guide#rings"),
        t(". If you are between sizes, we recommend sizing up."),
      ],
    },
    {
      question:
        "Can I customise this piece — engrave a name or change a stone?",
      answer: [
        t(
          "Yes. Use the 'Customise' button on this page to select engraving, alternate stone colours, or metal finish. Custom orders have a 7–10 day additional lead time. For complex requests, contact us at ",
        ),
        l("custom@rjjewels.com", "mailto:custom@rjjewels.com"),
        t("."),
      ],
    },
    {
      question: "When will my order be dispatched?",
      answer:
        "In-stock items are dispatched within 1–2 business days. Express next-day dispatch is available at checkout for an additional charge. You will receive a tracking link via SMS and email as soon as your order ships.",
    },
    {
      question: "Is this piece available in a gift box?",
      answer:
        "Every order arrives in our branded kraft box with a gold-foil RJ Jewels seal. You can upgrade to our premium rigid gift box at checkout. A complimentary personalised message card can be added for any occasion.",
    },
  ],
};

/* ═══════════════════════════════════════════
   ABOUT PAGE
═══════════════════════════════════════════ */
export const aboutFAQProps: FAQsProps = {
  tagline: "Our story",
  title: "About RJ Jewels",
  subtitle:
    "Learn about our heritage, values, and the people behind every piece.",
  theme: "dark",
  items: [
    {
      question: "When was RJ Jewels founded and what is our story?",
      answer: [
        t(
          "RJ Jewels was founded in 2014 in Jaipur — the jewellery capital of India. What began as a small workshop of three artisans has grown into a team of over 60 craftspeople. Our story is rooted in the belief that fine jewellery should be accessible without compromising on quality. ",
        ),
        l("Read the full story", "/about#story"),
        t("."),
      ],
    },
    {
      question: "Where are your pieces designed and manufactured?",
      answer:
        "All jewellery is designed in our Jaipur studio and manufactured entirely in India. We work exclusively with artisans trained in traditional Kundan, Meenakari, and filigree techniques, blending heritage craft with contemporary aesthetics.",
    },
    {
      question: "What is your approach to ethical and sustainable sourcing?",
      answer: [
        t(
          "We source gold and silver only from RJC-certified (Responsible Jewellery Council) suppliers. Gemstones are sourced through traceable supply chains with documented provenance. We publish an annual ",
        ),
        l("sustainability report", "/sustainability"),
        t(" detailing our progress and commitments."),
      ],
    },
    {
      question: "Do you have physical stores?",
      answer: [
        t(
          "We have flagship stores in Jaipur, Mumbai, and Delhi, plus a growing network of authorised retail partners across 18 cities. Use our ",
        ),
        l("store locator", "/stores"),
        t(
          " to find the nearest location, check timings, and book a private styling appointment.",
        ),
      ],
    },
    {
      question: "How can I collaborate with or stock RJ Jewels?",
      answer: [
        t(
          "We welcome wholesale, retail partnerships, and brand collaborations. For wholesale enquiries, visit our ",
        ),
        l("partner portal", "/partners"),
        t(". For creative collaborations, reach out to our brand team at "),
        l("collab@rjjewels.com", "mailto:collab@rjjewels.com"),
        t("."),
      ],
    },
    {
      question: "How can I join the RJ Jewels team?",
      answer: [
        t(
          "We are always looking for passionate craftspeople, designers, and customer experience professionals. View open positions on our ",
        ),
        l("careers page", "/careers"),
        t(" or send a speculative application to "),
        l("careers@rjjewels.com", "mailto:careers@rjjewels.com"),
        t("."),
      ],
    },
  ],
};
