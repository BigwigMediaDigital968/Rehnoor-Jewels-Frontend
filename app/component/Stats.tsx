export default function Stats() {
  return (
    <>
      {/* Trust numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 px-14 border-y border-[var(--rj-bone)] bg-[var(--rj-emerald)]">
        {[
          {
            value: "4.9",
            label: "Average Rating",
            sub: "Based on 2,400+ reviews",
          },
          {
            value: "98%",
            label: "Satisfaction Rate",
            sub: "Would recommend us",
          },
          { value: "50K+", label: "Happy Customers", sub: "Across India" },
          { value: "5★", label: "Google Rating", sub: "Verified reviews" },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <p className="font-[var(--font-cinzel)] text-[var(--rj-gold)] text-3xl font-bold mb-1">
              {item.value}
            </p>
            <p className="font-medium text-[var(--rj-gold-light)] text-sm">
              {item.label}
            </p>
            <p className="text-[var(--rj-bone)] text-xs mt-0.5">{item.sub}</p>
          </div>
        ))}
      </div>
    </>
  );
}
