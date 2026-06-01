export default function Stats() {
  return (
    <>
      {/* Trust numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 px-14 border-y border-[var(--rj-bone)] bg-[#ffefd2]">
        {[
          {
            value: "4.9✦",
            label: "Customer Rating",
            sub: "Loved by our buyers",
          },
          {
            value: "98%",
            label: "Satisfaction Rate",
            sub: "Quality you can trust",
          },
          { value: "20K+", label: "Happy Customers", sub: "Across India" },
          { value: "6+", label: "Years Of", sub: "Authenticity" },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <p className="text-(--rj-gold) text-3xl font-bold mb-1">
              {item.value}
            </p>
            <p className="font-medium text-(--rj-charcoal) text-md">
              {item.label}
            </p>
            <p className="text-(--rj-emerald)/50 text-sm mt-0.5">{item.sub}</p>
          </div>
        ))}
      </div>
    </>
  );
}
