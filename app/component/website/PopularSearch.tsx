import React from "react";

interface SearchCategory {
  title: string;
  links: string[];
}

const searchData: SearchCategory[] = [
  {
    title: "For Women",
    links: [
      "Demi-Fine Jewellery",
      "Rings For Women",
      "Earrings For Women",
      "Bracelet For Women",
      "Pendants For Women",
      "Necklaces For Women",
    ],
  },
  {
    title: "For Men",
    links: ["Rings For Men", "Pendant For Men", "Chain For Men"],
  },
  {
    title: "Mangalsutra",
    links: ["Gold Mangalsutra", "Diamond Mangalsutra", "Infinity Mangalsutra"],
  },
  {
    title: "Pendants",
    links: [
      "Gold Pendants",
      "Diamond Pendants",
      "Solitaire Pendants",
      "Evil Eye Pendants",
    ],
  },
  {
    title: "Bracelets",
    links: [
      "Gold Bracelets",
      "Diamond Bracelets",
      "Pearl Bracelets",
      "Evil Eye Bracelets",
      "Chain Bracelets",
      "Stone Bracelets",
      "Cuff Bracelets",
    ],
  },
  {
    title: "Necklace",
    links: [
      "Gold Necklace",
      "Diamond Necklace",
      "Pearl Necklace",
      "Necklaces For Women",
      "Evil Eye Necklace",
      "Name Necklace",
      "Emerald Necklace",
    ],
  },
  {
    title: "Rings",
    links: [
      "Diamond Rings",
      "Gold Rings",
      "Silver Rings",
      "Solitaire Rings",
      "Gemstone Rings",
      "Mens Rings",
      "Engagement Ring",
      "Couple Ring",
      "Wedding Ring",
      "Statement Ring",
      "Emerald Ring",
    ],
  },
];

const PopularSearch = () => {
  return (
    <section className="bg-rj-ivory py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto border border-amber-500 rounded-2xl p-4">
        <h2 className="heading-sm font-semibold text-rj-emerald mb-8 tracking-tight">
          Popular Searches
        </h2>

        <div className="space-y-6">
          {searchData.map((category, index) => (
            <div
              key={index}
              className="border-b border-rj-bone pb-6 last:border-0"
            >
              <h3 className="text-green-800 text-sm font-medium mb-3 uppercase tracking-wider">
                {category.title}
              </h3>

              <div className="flex flex-wrap items-center gap-y-2">
                {category.links.map((link, linkIndex) => (
                  <React.Fragment key={linkIndex}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-rj-emerald-muted hover:text-rj-gold-dark transition-colors duration-200 text-sm md:text-base leading-relaxed"
                    >
                      {link}
                    </a>
                    {linkIndex < category.links.length - 1 && (
                      <span className="mx-3 text-rj-bone hidden md:inline">
                        |
                      </span>
                      /* Mobile Spacer */
                    )}
                    {linkIndex < category.links.length - 1 && (
                      <span className="mx-2 text-rj-bone md:hidden">|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSearch;
