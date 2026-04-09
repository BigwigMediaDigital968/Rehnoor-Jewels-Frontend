// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import { Star, X, Camera, Check, ChevronDown, ThumbsUp } from "lucide-react";

// // ─────────────────────────────────────────────────────────────────
// // TYPES & DATA
// // ─────────────────────────────────────────────────────────────────
// interface Review {
//   id: number;
//   name: string;
//   avatar: string;
//   city: string;
//   rating: number;
//   date: string;
//   title: string;
//   body: string;
//   images?: string[];
//   helpful: number;
//   verified: boolean;
//   size?: string;
// }

// const SAMPLE_REVIEWS: Review[] = [
//   {
//     id: 1,
//     name: "Arjun Mehta",
//     avatar: "AM",
//     city: "Mumbai",
//     rating: 5,
//     date: "Jan 12, 2025",
//     title: "Absolutely stunning piece",
//     body: "The finish is exceptional. Solid weight, mirror finish — got compliments at every event. The BIS hallmark gave me complete confidence. Packaging was premium — felt like a luxury brand.",
//     images: [
//       "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&q=80",
//     ],
//     helpful: 24,
//     verified: true,
//     size: '18"',
//   },
//   {
//     id: 2,
//     name: "Rohan Singhania",
//     avatar: "RS",
//     city: "Delhi",
//     rating: 5,
//     date: "Dec 28, 2024",
//     title: "Value for money, premium quality",
//     body: "Had my doubts buying jewellery online but Rehnoor exceeded all expectations. The chain feels solid and the gold colour is consistent throughout. Will definitely order again.",
//     images: [],
//     helpful: 18,
//     verified: true,
//     size: '20"',
//   },
//   {
//     id: 3,
//     name: "Vikram Nair",
//     avatar: "VN",
//     city: "Bangalore",
//     rating: 4,
//     date: "Nov 15, 2024",
//     title: "Great design, minor sizing issue",
//     body: "Love the design and weight. Had a minor sizing issue but their free adjustment service sorted it within 3 days. Customer support was very responsive throughout.",
//     images: [
//       "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&q=80",
//       "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&q=80",
//     ],
//     helpful: 12,
//     verified: true,
//     size: "22",
//   },
//   {
//     id: 4,
//     name: "Dev Sharma",
//     avatar: "DS",
//     city: "Hyderabad",
//     rating: 5,
//     date: "Oct 3, 2024",
//     title: "फोटो जैसा ही है, पैसे वसूल",
//     body: "बिल्कुल वैसा ही है जैसा फोटो में दिखाया है। वजन और finish दोनों बहुत अच्छे हैं। Packaging भी बहुत premium था। जरूर recommend करूँगा।",
//     images: [],
//     helpful: 31,
//     verified: true,
//   },
//   {
//     id: 5,
//     name: "Karan Oberoi",
//     avatar: "KO",
//     city: "Jaipur",
//     rating: 5,
//     date: "Sep 20, 2024",
//     title: "Best purchase this year",
//     body: "Bought this as an anniversary gift — she loved it! The quality is far better than what I expected at this price point. The engraving service was also perfect.",
//     images: [
//       "https://images.unsplash.com/photo-1574169208507-84376144848b?w=200&q=80",
//     ],
//     helpful: 9,
//     verified: true,
//   },
// ];

// const RATING_DIST = [
//   { stars: 5, count: 142, pct: 72 },
//   { stars: 4, count: 38, pct: 19 },
//   { stars: 3, count: 12, pct: 6 },
//   { stars: 2, count: 4, pct: 2 },
//   { stars: 1, count: 2, pct: 1 },
// ];

// // ─────────────────────────────────────────────────────────────────
// // ADD REVIEW MODAL
// // ─────────────────────────────────────────────────────────────────
// function AddReviewModal({ onClose }: { onClose: () => void }) {
//   const [rating, setRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");
//   const [name, setName] = useState("");
//   const [city, setCity] = useState("");
//   const [size, setSize] = useState("");
//   const [images, setImages] = useState<string[]>([]);
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!rating || !body.trim()) return;
//     setSubmitted(true);
//     setTimeout(onClose, 2000);
//   };

//   const inputStyle = {
//     background: "#fff",
//     border: "1px solid var(--rj-bone)",
//     borderRadius: "8px",
//     color: "var(--rj-charcoal)",
//     fontFamily: "var(--font-body,'DM Sans'),sans-serif",
//     fontSize: "0.9rem",
//     outline: "none",
//     width: "100%",
//     padding: "0.75rem 1rem",
//     transition: "border-color 0.2s",
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-6"
//       style={{
//         background: "rgba(0,0,0,0.65)",
//         backdropFilter: "blur(6px)",
//         cursor: "pointer",
//       }}
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 40 }}
//         transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
//         className="w-full sm:max-w-lg overflow-y-auto"
//         style={{
//           background: "#fff",
//           borderRadius: "20px 20px 0 0",
//           maxHeight: "92vh",
//           cursor: "default",
//         }}
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Drag handle */}
//         <div className="sm:hidden flex justify-center pt-3 pb-1">
//           <div
//             className="w-10 h-1 rounded-full"
//             style={{ background: "var(--rj-bone)" }}
//           />
//         </div>

//         {submitted ? (
//           <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: "spring", stiffness: 300 }}
//               className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
//               style={{ background: "var(--gradient-gold)" }}
//             >
//               <Check size={28} style={{ color: "var(--rj-emerald)" }} />
//             </motion.div>
//             <h3
//               className="font-cormorant text-2xl font-light mb-2"
//               style={{ color: "var(--rj-charcoal)" }}
//             >
//               Review Submitted!
//             </h3>
//             <p
//               className="font-cinzel text-xs tracking-wider"
//               style={{ color: "var(--rj-ash)" }}
//             >
//               Thank you for sharing your experience.
//             </p>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="p-6 sm:p-7">
//             {/* Header */}
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <p
//                   className="label-accent mb-1"
//                   style={{ color: "var(--rj-emerald)" }}
//                 >
//                   ✦ Your Review
//                 </p>
//                 <h3
//                   className="font-cormorant text-xl font-light"
//                   style={{ color: "var(--rj-charcoal)" }}
//                 >
//                   Share Your Experience
//                 </h3>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
//                 style={{
//                   background: "var(--rj-charcoal)",
//                   color: "#fff",
//                   cursor: "pointer",
//                 }}
//               >
//                 <X size={13} />
//               </button>
//             </div>

//             {/* Star rating */}
//             <div className="mb-5">
//               <p
//                 className="font-cinzel text-[10px] tracking-widest uppercase mb-2.5 font-bold"
//                 style={{ color: "var(--rj-charcoal)" }}
//               >
//                 Your Rating <span style={{ color: "#ef4444" }}>*</span>
//               </p>
//               <div className="flex gap-2">
//                 {[1, 2, 3, 4, 5].map((s) => (
//                   <button
//                     key={s}
//                     type="button"
//                     onClick={() => setRating(s)}
//                     onMouseEnter={() => setHoverRating(s)}
//                     onMouseLeave={() => setHoverRating(0)}
//                     style={{
//                       cursor: "pointer",
//                       background: "none",
//                       border: "none",
//                       padding: 0,
//                     }}
//                   >
//                     <Star
//                       size={28}
//                       style={{
//                         fill:
//                           s <= (hoverRating || rating)
//                             ? "var(--rj-gold)"
//                             : "transparent",
//                         color:
//                           s <= (hoverRating || rating)
//                             ? "var(--rj-gold)"
//                             : "var(--rj-bone)",
//                         transition: "all 0.15s",
//                       }}
//                     />
//                   </button>
//                 ))}
//                 {rating > 0 && (
//                   <span
//                     className="self-center font-cinzel text-xs ml-1"
//                     style={{ color: "var(--rj-ash)" }}
//                   >
//                     {
//                       ["", "Poor", "Fair", "Good", "Very Good", "Excellent"][
//                         rating
//                       ]
//                     }
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Title */}
//             <div className="mb-4">
//               <label
//                 className="font-cinzel text-[10px] tracking-widest uppercase mb-1.5 block font-bold"
//                 style={{ color: "var(--rj-charcoal)" }}
//               >
//                 Review Title
//               </label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Summarize your experience…"
//                 style={inputStyle}
//                 onFocus={(e) =>
//                   (e.target.style.borderColor = "var(--rj-emerald)")
//                 }
//                 onBlur={(e) => (e.target.style.borderColor = "var(--rj-bone)")}
//               />
//             </div>

//             {/* Body */}
//             <div className="mb-4">
//               <label
//                 className="font-cinzel text-[10px] tracking-widest uppercase mb-1.5 block font-bold"
//                 style={{ color: "var(--rj-charcoal)" }}
//               >
//                 Review <span style={{ color: "#ef4444" }}>*</span>
//               </label>
//               <textarea
//                 value={body}
//                 onChange={(e) => setBody(e.target.value)}
//                 rows={4}
//                 placeholder="Tell us about the quality, fit, and your overall experience…"
//                 style={{
//                   ...inputStyle,
//                   resize: "vertical",
//                   minHeight: "100px",
//                 }}
//                 onFocus={(e) =>
//                   (e.target.style.borderColor = "var(--rj-emerald)")
//                 }
//                 onBlur={(e) => (e.target.style.borderColor = "var(--rj-bone)")}
//               />
//             </div>

//             {/* Name + City */}
//             <div className="grid grid-cols-2 gap-3 mb-4">
//               <div>
//                 <label
//                   className="font-cinzel text-[10px] tracking-widest uppercase mb-1.5 block font-bold"
//                   style={{ color: "var(--rj-charcoal)" }}
//                 >
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Your name"
//                   style={inputStyle}
//                   onFocus={(e) =>
//                     (e.target.style.borderColor = "var(--rj-emerald)")
//                   }
//                   onBlur={(e) =>
//                     (e.target.style.borderColor = "var(--rj-bone)")
//                   }
//                 />
//               </div>
//               <div>
//                 <label
//                   className="font-cinzel text-[10px] tracking-widest uppercase mb-1.5 block font-bold"
//                   style={{ color: "var(--rj-charcoal)" }}
//                 >
//                   City
//                 </label>
//                 <input
//                   type="text"
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                   placeholder="Your city"
//                   style={inputStyle}
//                   onFocus={(e) =>
//                     (e.target.style.borderColor = "var(--rj-emerald)")
//                   }
//                   onBlur={(e) =>
//                     (e.target.style.borderColor = "var(--rj-bone)")
//                   }
//                 />
//               </div>
//             </div>

//             {/* Size worn */}
//             <div className="mb-5">
//               <label
//                 className="font-cinzel text-[10px] tracking-widest uppercase mb-1.5 block font-bold"
//                 style={{ color: "var(--rj-charcoal)" }}
//               >
//                 Size Purchased
//               </label>
//               <input
//                 type="text"
//                 value={size}
//                 onChange={(e) => setSize(e.target.value)}
//                 placeholder='e.g. 18", M, 20'
//                 style={inputStyle}
//                 onFocus={(e) =>
//                   (e.target.style.borderColor = "var(--rj-emerald)")
//                 }
//                 onBlur={(e) => (e.target.style.borderColor = "var(--rj-bone)")}
//               />
//             </div>

//             {/* Image upload hint */}
//             <div
//               className="mb-6 p-3 rounded-xl flex items-center gap-3"
//               style={{
//                 background: "rgba(0,55,32,0.04)",
//                 border: "1px dashed var(--rj-bone)",
//               }}
//             >
//               <Camera
//                 size={18}
//                 style={{ color: "var(--rj-emerald)", flexShrink: 0 }}
//               />
//               <p
//                 className="font-cinzel text-[9px] tracking-wider"
//                 style={{ color: "var(--rj-ash)" }}
//               >
//                 Photo upload coming soon — we'll notify you when it's available.
//               </p>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={!rating || !body.trim()}
//               className="w-full py-3 font-cinzel text-[11px] tracking-widest uppercase font-bold rounded-full transition-all duration-300 active:scale-95 disabled:opacity-40"
//               style={{
//                 background: "var(--gradient-gold)",
//                 color: "var(--rj-emerald)",
//                 cursor: rating && body.trim() ? "pointer" : "not-allowed",
//                 boxShadow: "0 4px 20px rgba(252,193,81,0.3)",
//               }}
//             >
//               Submit Review
//             </button>
//           </form>
//         )}
//       </motion.div>
//     </motion.div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────
// // REVIEW CARD
// // ─────────────────────────────────────────────────────────────────
// function ReviewCard({ review }: { review: Review }) {
//   const [helpfulCount, setHelpfulCount] = useState(review.helpful);
//   const [voted, setVoted] = useState(false);
//   const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

//   return (
//     <>
//       {lightboxSrc && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-[9999] flex items-center justify-center"
//           style={{ background: "rgba(0,0,0,0.9)", cursor: "zoom-out" }}
//           onClick={() => setLightboxSrc(null)}
//         >
//           <div
//             className="relative w-full max-w-xl"
//             style={{ aspectRatio: "1/1" }}
//           >
//             <Image
//               src={lightboxSrc}
//               alt="Review photo"
//               fill
//               className="object-contain"
//               sizes="90vw"
//             />
//           </div>
//         </motion.div>
//       )}

//       <div
//         className="p-5 rounded-2xl"
//         style={{
//           background: "#fff",
//           border: "1px solid var(--rj-bone)",
//           boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
//         }}
//       >
//         {/* Header */}
//         <div className="flex items-start justify-between mb-3">
//           <div className="flex items-center gap-3">
//             <div
//               className="w-9 h-9 rounded-full flex items-center justify-center font-cinzel text-xs font-bold flex-shrink-0"
//               style={{
//                 background: "var(--gradient-gold)",
//                 color: "var(--rj-emerald)",
//               }}
//             >
//               {review.avatar}
//             </div>
//             <div>
//               <div className="flex items-center gap-2 flex-wrap">
//                 <p
//                   className="font-cinzel text-xs font-bold"
//                   style={{ color: "var(--rj-charcoal)" }}
//                 >
//                   {review.name}
//                 </p>
//                 {review.verified && (
//                   <span
//                     className="font-cinzel text-[8px] tracking-wider px-2 py-0.5 rounded-full"
//                     style={{
//                       background: "rgba(0,55,32,0.08)",
//                       color: "var(--rj-emerald)",
//                     }}
//                   >
//                     ✓ Verified
//                   </span>
//                 )}
//               </div>
//               <p className="text-[10px]" style={{ color: "var(--rj-ash)" }}>
//                 {review.city} · {review.date}
//                 {review.size ? ` · Size: ${review.size}` : ""}
//               </p>
//             </div>
//           </div>
//           <div className="flex gap-0.5 flex-shrink-0">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <Star
//                 key={i}
//                 size={11}
//                 style={{
//                   fill: i < review.rating ? "var(--rj-gold)" : "transparent",
//                   color:
//                     i < review.rating ? "var(--rj-gold)" : "var(--rj-bone)",
//                 }}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Title */}
//         {review.title && (
//           <p
//             className="font-cinzel text-xs font-bold mb-1.5"
//             style={{ color: "var(--rj-charcoal)" }}
//           >
//             {review.title}
//           </p>
//         )}

//         {/* Body */}
//         <p
//           className="text-sm leading-relaxed mb-4"
//           style={{
//             color: "var(--rj-charcoal)",
//             fontFamily: "var(--font-body,'DM Sans'),sans-serif",
//           }}
//         >
//           {review.body}
//         </p>

//         {/* Review photos */}
//         {review.images && review.images.length > 0 && (
//           <div className="flex gap-2 mb-4">
//             {review.images.map((img, i) => (
//               <button
//                 key={i}
//                 onClick={() => setLightboxSrc(img)}
//                 className="relative rounded-lg overflow-hidden flex-shrink-0 transition-all hover:scale-105"
//                 style={{
//                   width: 64,
//                   height: 64,
//                   border: "1px solid var(--rj-bone)",
//                   cursor: "zoom-in",
//                 }}
//               >
//                 <Image
//                   src={img}
//                   alt={`Review photo ${i + 1}`}
//                   fill
//                   className="object-cover"
//                   sizes="64px"
//                 />
//               </button>
//             ))}
//           </div>
//         )}

//         {/* Helpful */}
//         <div
//           className="flex items-center gap-2 pt-3"
//           style={{ borderTop: "1px solid var(--rj-bone)" }}
//         >
//           <p
//             className="font-cinzel text-[9px] tracking-wider"
//             style={{ color: "var(--rj-ash)" }}
//           >
//             Helpful? ({helpfulCount})
//           </p>
//           <button
//             onClick={() => {
//               if (!voted) {
//                 setHelpfulCount((c) => c + 1);
//                 setVoted(true);
//               }
//             }}
//             disabled={voted}
//             className="flex items-center gap-1 font-cinzel text-[9px] tracking-wider uppercase px-2.5 py-1 rounded-full transition-all"
//             style={{
//               border: `1px solid ${voted ? "var(--rj-emerald)" : "var(--rj-bone)"}`,
//               background: voted ? "rgba(0,55,32,0.06)" : "transparent",
//               color: voted ? "var(--rj-emerald)" : "var(--rj-ash)",
//               cursor: voted ? "default" : "pointer",
//             }}
//           >
//             <ThumbsUp size={10} /> Yes
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// // ─────────────────────────────────────────────────────────────────
// // MAIN REVIEWS SECTION
// // ─────────────────────────────────────────────────────────────────
// export default function ProductReviews() {
//   const [showModal, setShowModal] = useState(false);
//   const [filterRating, setFilterRating] = useState(0);
//   const [showAll, setShowAll] = useState(false);
//   const [sortBy, setSortBy] = useState("recent");

//   const avgRating = (
//     SAMPLE_REVIEWS.reduce((s, r) => s + r.rating, 0) / SAMPLE_REVIEWS.length
//   ).toFixed(1);
//   const totalCount = RATING_DIST.reduce((s, d) => s + d.count, 0);

//   const filtered =
//     filterRating === 0
//       ? SAMPLE_REVIEWS
//       : SAMPLE_REVIEWS.filter((r) => r.rating === filterRating);

//   const visible = showAll ? filtered : filtered.slice(0, 3);

//   return (
//     <>
//       <AnimatePresence>
//         {showModal && <AddReviewModal onClose={() => setShowModal(false)} />}
//       </AnimatePresence>

//       <section
//         id="reviews"
//         className="section-padding"
//         style={{ background: "var(--rj-ivory)" }}
//       >
//         <div className="container-rj">
//           {/* Heading */}
//           <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
//             <div>
//               <p
//                 className="label-accent mb-2"
//                 style={{ color: "var(--rj-emerald)" }}
//               >
//                 ✦ Customer Reviews
//               </p>
//               <h2
//                 className="heading-md leading-tight"
//                 style={{ color: "var(--rj-charcoal)" }}
//               >
//                 Real people,
//                 <br />
//                 <em className="text-gold-shimmer font-normal">real gold</em>
//               </h2>
//             </div>
//             <button
//               onClick={() => setShowModal(true)}
//               className="btn-primary self-start sm:self-auto flex-shrink-0"
//               style={{
//                 display: "inline-flex",
//                 background: "var(--gradient-gold)",
//                 color: "var(--rj-emerald)",
//                 cursor: "pointer",
//               }}
//             >
//               Write a Review
//             </button>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
//             {/* Summary sidebar */}
//             <div>
//               {/* Aggregate */}
//               <div
//                 className="p-6 rounded-2xl mb-6"
//                 style={{
//                   background: "#fff",
//                   border: "1px solid var(--rj-bone)",
//                 }}
//               >
//                 <p
//                   className="font-cormorant font-light leading-none mb-1"
//                   style={{ fontSize: "4rem", color: "var(--rj-charcoal)" }}
//                 >
//                   {avgRating}
//                 </p>
//                 <div className="flex gap-0.5 mb-1">
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <Star
//                       key={i}
//                       size={14}
//                       style={{
//                         fill:
//                           i < Math.floor(+avgRating)
//                             ? "var(--rj-gold)"
//                             : "transparent",
//                         color:
//                           i < Math.floor(+avgRating)
//                             ? "var(--rj-gold)"
//                             : "var(--rj-bone)",
//                       }}
//                     />
//                   ))}
//                 </div>
//                 <p
//                   className="font-cinzel text-[10px] tracking-wider"
//                   style={{ color: "var(--rj-ash)" }}
//                 >
//                   Based on {totalCount} reviews
//                 </p>

//                 {/* Distribution bars */}
//                 <div className="mt-5 space-y-2">
//                   {RATING_DIST.map((d) => (
//                     <button
//                       key={d.stars}
//                       onClick={() =>
//                         setFilterRating(filterRating === d.stars ? 0 : d.stars)
//                       }
//                       className="w-full flex items-center gap-2 group"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <div className="flex gap-0.5 flex-shrink-0">
//                         {Array.from({ length: 5 }).map((_, i) => (
//                           <Star
//                             key={i}
//                             size={9}
//                             style={{
//                               fill:
//                                 i < d.stars ? "var(--rj-gold)" : "transparent",
//                               color:
//                                 i < d.stars
//                                   ? "var(--rj-gold)"
//                                   : "var(--rj-bone)",
//                             }}
//                           />
//                         ))}
//                       </div>
//                       <div
//                         className="flex-1 h-1.5 rounded-full overflow-hidden"
//                         style={{ background: "var(--rj-bone)" }}
//                       >
//                         <div
//                           className="h-full rounded-full transition-all duration-500"
//                           style={{
//                             width: `${d.pct}%`,
//                             background:
//                               filterRating === d.stars
//                                 ? "var(--rj-emerald)"
//                                 : "var(--rj-gold)",
//                           }}
//                         />
//                       </div>
//                       <span
//                         className="font-cinzel text-[9px] flex-shrink-0 w-6 text-right"
//                         style={{ color: "var(--rj-ash)" }}
//                       >
//                         {d.count}
//                       </span>
//                     </button>
//                   ))}
//                 </div>

//                 {filterRating > 0 && (
//                   <button
//                     onClick={() => setFilterRating(0)}
//                     className="mt-4 w-full font-cinzel text-[9px] tracking-wider uppercase py-1.5 rounded-full transition-all"
//                     style={{
//                       border: "1px solid var(--rj-bone)",
//                       color: "var(--rj-ash)",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Clear filter
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Reviews list */}
//             <div className="lg:col-span-2">
//               {/* Sort */}
//               <div className="flex items-center justify-between mb-5">
//                 <p
//                   className="font-cinzel text-[10px] tracking-wider"
//                   style={{ color: "var(--rj-ash)" }}
//                 >
//                   Showing {visible.length} of {filtered.length} reviews
//                 </p>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="font-cinzel text-[10px] tracking-wider outline-none px-3 py-1.5 rounded-lg"
//                   style={{
//                     border: "1px solid var(--rj-bone)",
//                     background: "#fff",
//                     color: "var(--rj-ash)",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <option value="recent">Most Recent</option>
//                   <option value="helpful">Most Helpful</option>
//                   <option value="highest">Highest Rated</option>
//                   <option value="lowest">Lowest Rated</option>
//                 </select>
//               </div>

//               <div className="flex flex-col gap-4">
//                 <AnimatePresence mode="popLayout">
//                   {visible.map((r, i) => (
//                     <motion.div
//                       key={r.id}
//                       initial={{ opacity: 0, y: 16 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, scale: 0.96 }}
//                       transition={{ duration: 0.35, delay: i * 0.06 }}
//                     >
//                       <ReviewCard review={r} />
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </div>

//               {filtered.length > 3 && (
//                 <div className="text-center mt-6">
//                   <button
//                     onClick={() => setShowAll((s) => !s)}
//                     className="inline-flex items-center gap-2 font-cinzel text-[10px] tracking-widest uppercase px-6 py-2.5 rounded-full transition-all"
//                     style={{
//                       border: "1.5px solid var(--rj-emerald)",
//                       color: "var(--rj-emerald)",
//                       cursor: "pointer",
//                     }}
//                   >
//                     {showAll
//                       ? "Show Less"
//                       : `Show All ${filtered.length} Reviews`}
//                     <ChevronDown
//                       size={12}
//                       className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
//                     />
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// app/products/[slug]/component/Productreviews.tsx
// Live API-integrated reviews section for Rehnoor Jewels product page
// Handles: fetch approved reviews, submit new review, pagination,
//          sort, star filter, image upload, helpful votes, lightbox
"use client";

import { useState, useEffect, useCallback, useRef, useTransition } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  X,
  Camera,
  Check,
  ChevronDown,
  ThumbsUp,
  Loader2,
  WifiOff,
  RefreshCw,
  Upload,
  AlertCircle,
  MessageSquarePlus,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import {
  fetchProductReviews,
  submitProductReview,
  hasVotedHelpful,
  markVotedHelpful,
  type Review,
  type RatingBreakdown,
  type ReviewsPagination,
} from "@/app/lib/api/reviews";

// ─────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────
const REVIEWS_PER_PAGE = 5;

const SORT_OPTIONS = [
  { value: "recent", label: "Most Recent" },
  { value: "helpful", label: "Most Helpful" },
  { value: "highest", label: "Highest Rated" },
  { value: "lowest", label: "Lowest Rated" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

// deterministic avatar colour from name
const AVATAR_COLORS = [
  ["#003720", "#FCC151"],
  ["#a07800", "#fff"],
  ["#1a3a5c", "#FCC151"],
  ["#5c1a3a", "#FCC151"],
  ["#1a5c3a", "#fff"],
] as const;

function avatarColor(name: string): readonly [string, string] {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// ─────────────────────────────────────────────────────────────────
// STAR ROW
// ─────────────────────────────────────────────────────────────────
function StarRow({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          style={{
            fill:
              i < Math.floor(rating)
                ? "var(--rj-gold)"
                : i < rating
                  ? "var(--rj-gold)"
                  : "transparent",
            color: i < rating ? "var(--rj-gold)" : "var(--rj-bone)",
            opacity: i < rating ? 1 : 0.5,
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// LIGHTBOX
// ─────────────────────────────────────────────────────────────────
function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: { src: string; alt: string }[];
  startIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);
  const prev = () => setIdx((i) => Math.max(0, i - 1));
  const next = () => setIdx((i) => Math.min(images.length - 1, i + 1));

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.93)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(255,255,255,0.12)",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={onClose}
      >
        <X size={16} />
      </button>

      {/* Counter */}
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 font-cinzel text-[10px] tracking-widest"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        {idx + 1} / {images.length}
      </div>

      {/* Image */}
      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-xl mx-12"
        style={{ aspectRatio: "1/1" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[idx].src}
          alt={images[idx].alt}
          fill
          className="object-contain"
          sizes="90vw"
        />
      </motion.div>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            disabled={idx === 0}
            className="absolute left-4 w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-20 transition-all"
            style={{
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            disabled={idx === images.length - 1}
            className="absolute right-4 w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-20 transition-all"
            style={{
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// REVIEW CARD
// ─────────────────────────────────────────────────────────────────
function ReviewCard({ review }: { review: Review }) {
  const [helpful, setHelpful] = useState(review.helpfulVotes);
  const [voted, setVoted] = useState(false);
  const [lightbox, setLightbox] = useState<{
    images: typeof review.images;
    idx: number;
  } | null>(null);
  const [expanded, setExpanded] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    setVoted(hasVotedHelpful(review._id));
  }, [review._id]);

  const handleHelpful = () => {
    if (voted) return;
    setHelpful((c) => c + 1);
    setVoted(true);
    markVotedHelpful(review._id);
  };

  const [bg, fg] = avatarColor(review.username);
  const isLong = review.reviewDescription.length > 300;
  const displayText =
    isLong && !expanded
      ? review.reviewDescription.slice(0, 300) + "…"
      : review.reviewDescription;

  return (
    <>
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            startIndex={lightbox.idx}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl overflow-hidden"
        style={{
          background: "#fff",
          border: "1px solid var(--rj-bone)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
        }}
      >
        {/* Featured banner */}
        {review.isFeatured && (
          <div
            className="flex items-center gap-2 px-5 py-2"
            style={{ background: "var(--rj-emerald)" }}
          >
            <Sparkles size={11} style={{ color: "var(--rj-gold)" }} />
            <span
              className="font-cinzel text-[8px] tracking-widest uppercase font-bold"
              style={{ color: "var(--rj-gold)" }}
            >
              Featured Review
            </span>
          </div>
        )}

        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-cinzel text-xs font-bold flex-shrink-0"
                style={{ background: bg, color: fg }}
              >
                {getInitials(review.username)}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="font-cinzel text-xs font-bold"
                    style={{ color: "var(--rj-charcoal)" }}
                  >
                    {review.username}
                  </span>
                  {review.isVerifiedPurchase && (
                    <span
                      className="flex items-center gap-1 font-cinzel text-[8px] tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(0,55,32,0.08)",
                        color: "var(--rj-emerald)",
                      }}
                    >
                      <BadgeCheck size={9} /> Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                  {review.userCity && (
                    <span
                      className="text-[10px]"
                      style={{ color: "var(--rj-ash)" }}
                    >
                      {review.userCity}
                    </span>
                  )}
                  {review.userCity && (
                    <span
                      className="text-[10px]"
                      style={{ color: "var(--rj-bone)" }}
                    >
                      ·
                    </span>
                  )}
                  <span
                    className="text-[10px]"
                    style={{ color: "var(--rj-ash)" }}
                  >
                    {formatDate(review.createdAt)}
                  </span>
                  {review.sizePurchased && (
                    <>
                      <span
                        className="text-[10px]"
                        style={{ color: "var(--rj-bone)" }}
                      >
                        ·
                      </span>
                      <span
                        className="font-cinzel text-[8px] tracking-wider px-1.5 py-0.5 rounded-full"
                        style={{
                          background: "rgba(252,193,81,0.1)",
                          color: "#a07800",
                        }}
                      >
                        Size: {review.sizePurchased}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Stars */}
            <div className="flex-shrink-0">
              <StarRow rating={review.rating} size={13} />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px mb-4" style={{ background: "var(--rj-bone)" }} />

          {/* Title */}
          {review.reviewTitle && (
            <p
              className="font-cinzel text-xs font-bold mb-2"
              style={{ color: "var(--rj-charcoal)" }}
            >
              {review.reviewTitle}
            </p>
          )}

          {/* Body */}
          <p
            className="text-sm leading-relaxed"
            style={{
              color: "var(--rj-charcoal)",
              fontFamily: "var(--font-body,'DM Sans'),sans-serif",
              lineHeight: "1.75",
            }}
          >
            {displayText}
          </p>
          {isLong && (
            <button
              onClick={() => setExpanded((e) => !e)}
              className="font-cinzel text-[9px] tracking-wider mt-1 transition-opacity hover:opacity-70"
              style={{ color: "var(--rj-emerald)", cursor: "pointer" }}
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}

          {/* Review images */}
          {review.images && review.images.length > 0 && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {review.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox({ images: review.images, idx: i })}
                  className="relative rounded-xl overflow-hidden flex-shrink-0 group"
                  style={{
                    width: 72,
                    height: 72,
                    border: "1px solid var(--rj-bone)",
                    cursor: "zoom-in",
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt || `Review photo ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="72px"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "rgba(0,55,32,0.3)" }}
                  >
                    <ZoomIn size={14} style={{ color: "#fff" }} />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Footer — helpful votes */}
          <div
            className="flex items-center justify-between mt-4 pt-3"
            style={{ borderTop: "1px solid var(--rj-bone)" }}
          >
            <p
              className="font-cinzel text-[9px] tracking-wider"
              style={{ color: "var(--rj-ash)" }}
            >
              Was this helpful?
            </p>
            <button
              onClick={handleHelpful}
              disabled={voted}
              className="flex items-center gap-1.5 font-cinzel text-[9px] tracking-wider uppercase px-3 py-1.5 rounded-full transition-all"
              style={{
                border: `1px solid ${voted ? "var(--rj-emerald)" : "var(--rj-bone)"}`,
                background: voted ? "rgba(0,55,32,0.06)" : "transparent",
                color: voted ? "var(--rj-emerald)" : "var(--rj-ash)",
                cursor: voted ? "default" : "pointer",
              }}
            >
              <ThumbsUp size={10} />
              Yes {helpful > 0 && `(${helpful})`}
              {voted && <Check size={9} />}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// SKELETON CARD
// ─────────────────────────────────────────────────────────────────
function SkeletonReviewCard() {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "#fff", border: "1px solid var(--rj-bone)" }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full animate-pulse"
          style={{ background: "var(--rj-bone)" }}
        />
        <div className="flex flex-col gap-1.5 flex-1">
          <div
            className="h-3 rounded-full animate-pulse w-1/3"
            style={{ background: "var(--rj-bone)" }}
          />
          <div
            className="h-2.5 rounded-full animate-pulse w-1/4"
            style={{ background: "var(--rj-ivory-dark)" }}
          />
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ background: "var(--rj-bone)" }}
            />
          ))}
        </div>
      </div>
      <div
        className="h-px mb-4"
        style={{ background: "var(--rj-ivory-dark)" }}
      />
      <div className="flex flex-col gap-2">
        <div
          className="h-3 rounded-full animate-pulse w-2/5"
          style={{ background: "var(--rj-bone)" }}
        />
        <div
          className="h-2.5 rounded-full animate-pulse w-full"
          style={{ background: "var(--rj-ivory-dark)" }}
        />
        <div
          className="h-2.5 rounded-full animate-pulse w-4/5"
          style={{ background: "var(--rj-ivory-dark)" }}
        />
        <div
          className="h-2.5 rounded-full animate-pulse w-3/5"
          style={{ background: "var(--rj-ivory-dark)" }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// ADD REVIEW MODAL
// ─────────────────────────────────────────────────────────────────
interface AddReviewModalProps {
  productId: string;
  productName: string;
  onClose: () => void;
  onSuccess: () => void;
}

function AddReviewModal({
  productId,
  productName,
  onClose,
  onSuccess,
}: AddReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [username, setUsername] = useState("");
  const [userCity, setUserCity] = useState("");
  const [sizePurchased, setSizePurchased] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const totalFiles = [...imageFiles, ...files].slice(0, 5);
    setImageFiles(totalFiles);
    const previews = totalFiles.map((f) => URL.createObjectURL(f));
    setImagePreviews(previews);
  };

  const removeImage = (idx: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== idx);
    const newPreviews = imagePreviews.filter((_, i) => i !== idx);
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      setError("Please select a star rating");
      return;
    }
    if (!reviewDescription.trim()) {
      setError("Please write your review");
      return;
    }
    if (!username.trim()) {
      setError("Please enter your name");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await submitProductReview(productId, {
        rating,
        reviewTitle:
          reviewTitle.trim() ||
          `${["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]} experience`,
        reviewDescription: reviewDescription.trim(),
        username: username.trim(),
        userCity: userCity.trim(),
        sizePurchased: sizePurchased.trim(),
        images: imageFiles,
      });
      setSubmitted(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2500);
    } catch (err: any) {
      setError(err.message || "Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls: React.CSSProperties = {
    background: "#fff",
    border: "1px solid var(--rj-bone)",
    borderRadius: "10px",
    color: "var(--rj-charcoal)",
    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
    fontSize: "0.875rem",
    outline: "none",
    width: "100%",
    padding: "0.7rem 1rem",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9998] flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="w-full sm:max-w-lg overflow-hidden flex flex-col"
        style={{
          background: "#fff",
          borderRadius: "24px 24px 0 0",
          maxHeight: "94vh",
          cursor: "default",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="sm:hidden flex justify-center pt-3 pb-0.5 flex-shrink-0">
          <div
            className="w-10 h-1 rounded-full"
            style={{ background: "var(--rj-bone)" }}
          />
        </div>

        {submitted ? (
          // ── Success State ──
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center flex-1">
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
              style={{ background: "var(--gradient-gold)" }}
            >
              <Check size={32} style={{ color: "var(--rj-emerald)" }} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p
                className="font-cinzel text-[9px] tracking-widest uppercase mb-2"
                style={{ color: "var(--rj-emerald)" }}
              >
                ✦ Review Submitted
              </p>
              <h3
                className="font-cormorant text-2xl font-light mb-3"
                style={{ color: "var(--rj-charcoal)" }}
              >
                Thank you for your review!
              </h3>
              <p
                className="font-cinzel text-[10px] tracking-wider leading-relaxed max-w-xs"
                style={{ color: "var(--rj-ash)" }}
              >
                Your review is pending approval and will appear within 24 hours
                once verified by our team.
              </p>
            </motion.div>
          </div>
        ) : (
          // ── Form ──
          <>
            {/* Modal Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                background: "var(--rj-emerald)",
                borderBottom: "1px solid rgba(252,193,81,0.15)",
              }}
            >
              <div>
                <p
                  className="font-cinzel text-[9px] tracking-widest uppercase"
                  style={{ color: "rgba(252,193,81,0.6)" }}
                >
                  ✦ Share Your Experience
                </p>
                <h3 className="font-cormorant text-xl font-light text-white leading-tight">
                  Write a Review
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:opacity-70"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Product Name */}
            <div
              className="px-6 py-3 flex-shrink-0"
              style={{
                borderBottom: "1px solid var(--rj-bone)",
                background: "var(--rj-ivory)",
              }}
            >
              <p
                className="font-cinzel text-[9px] tracking-widest uppercase"
                style={{ color: "var(--rj-ash)" }}
              >
                Reviewing:
              </p>
              <p
                className="font-cormorant text-base font-light line-clamp-1"
                style={{ color: "var(--rj-charcoal)" }}
              >
                {productName}
              </p>
            </div>

            {/* Scrollable form body */}
            <div className="overflow-y-auto flex-1">
              <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl"
                      style={{
                        background: "#fef2f2",
                        border: "1px solid #fca5a5",
                      }}
                    >
                      <AlertCircle
                        size={14}
                        style={{ color: "#ef4444", flexShrink: 0 }}
                      />
                      <p
                        className="font-cinzel text-[10px] tracking-wider"
                        style={{ color: "#ef4444" }}
                      >
                        {error}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Star Rating */}
                <div>
                  <p
                    className="font-cinzel text-[10px] tracking-widest uppercase mb-3 font-bold"
                    style={{ color: "var(--rj-charcoal)" }}
                  >
                    Your Rating <span style={{ color: "#ef4444" }}>*</span>
                  </p>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        onMouseEnter={() => setHoverRating(s)}
                        onMouseLeave={() => setHoverRating(0)}
                        style={{
                          cursor: "pointer",
                          background: "none",
                          border: "none",
                          padding: 0,
                        }}
                      >
                        <Star
                          size={32}
                          style={{
                            fill:
                              s <= (hoverRating || rating)
                                ? "var(--rj-gold)"
                                : "transparent",
                            color:
                              s <= (hoverRating || rating)
                                ? "var(--rj-gold)"
                                : "var(--rj-bone)",
                            transition: "all 0.15s",
                          }}
                        />
                      </button>
                    ))}
                    {(hoverRating || rating) > 0 && (
                      <motion.span
                        key={hoverRating || rating}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-cinzel text-xs font-bold ml-1"
                        style={{ color: "var(--rj-emerald)" }}
                      >
                        {RATING_LABELS[hoverRating || rating]}
                      </motion.span>
                    )}
                  </div>
                </div>

                {/* Review Title */}
                <div>
                  <label
                    className="font-cinzel text-[10px] tracking-widest uppercase mb-1.5 block font-bold"
                    style={{ color: "var(--rj-charcoal)" }}
                  >
                    Review Title
                  </label>
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="Summarize your experience…"
                    maxLength={120}
                    style={inputCls}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--rj-emerald)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(0,55,32,0.06)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--rj-bone)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Review Body */}
                <div>
                  <label
                    className="font-cinzel text-[10px] tracking-widest uppercase mb-1.5 block font-bold"
                    style={{ color: "var(--rj-charcoal)" }}
                  >
                    Your Review <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <textarea
                    value={reviewDescription}
                    onChange={(e) => setReviewDescription(e.target.value)}
                    rows={4}
                    maxLength={2000}
                    placeholder="Tell us about the quality, fit, and your overall experience…"
                    style={{
                      ...inputCls,
                      resize: "vertical",
                      minHeight: "100px",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--rj-emerald)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(0,55,32,0.06)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--rj-bone)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <p
                    className="font-cinzel text-[8px] text-right mt-1"
                    style={{ color: "var(--rj-ash)" }}
                  >
                    {reviewDescription.length} / 2000
                  </p>
                </div>

                {/* Name + City */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      className="font-cinzel text-[10px] tracking-widest uppercase mb-1.5 block font-bold"
                      style={{ color: "var(--rj-charcoal)" }}
                    >
                      Name <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Your name"
                      maxLength={80}
                      style={inputCls}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--rj-emerald)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--rj-bone)";
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="font-cinzel text-[10px] tracking-widest uppercase mb-1.5 block font-bold"
                      style={{ color: "var(--rj-charcoal)" }}
                    >
                      City
                    </label>
                    <input
                      type="text"
                      value={userCity}
                      onChange={(e) => setUserCity(e.target.value)}
                      placeholder="Your city"
                      maxLength={80}
                      style={inputCls}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--rj-emerald)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--rj-bone)";
                      }}
                    />
                  </div>
                </div>

                {/* Size */}
                <div>
                  <label
                    className="font-cinzel text-[10px] tracking-widest uppercase mb-1.5 block font-bold"
                    style={{ color: "var(--rj-charcoal)" }}
                  >
                    Size Purchased
                  </label>
                  <input
                    type="text"
                    value={sizePurchased}
                    onChange={(e) => setSizePurchased(e.target.value)}
                    placeholder='e.g. 18", M, 20'
                    style={inputCls}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--rj-emerald)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--rj-bone)";
                    }}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label
                    className="font-cinzel text-[10px] tracking-widest uppercase mb-2 block font-bold"
                    style={{ color: "var(--rj-charcoal)" }}
                  >
                    Add Photos
                    <span
                      className="font-normal ml-1"
                      style={{ color: "var(--rj-ash)" }}
                    >
                      (up to 5)
                    </span>
                  </label>

                  {/* Preview grid */}
                  {imagePreviews.length > 0 && (
                    <div className="flex gap-2 flex-wrap mb-3">
                      {imagePreviews.map((src, i) => (
                        <div key={i} className="relative">
                          <div
                            className="relative rounded-xl overflow-hidden"
                            style={{
                              width: 64,
                              height: 64,
                              border: "1px solid var(--rj-bone)",
                            }}
                          >
                            <Image
                              src={src}
                              alt={`Upload ${i + 1}`}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                            style={{
                              background: "#ef4444",
                              color: "#fff",
                              cursor: "pointer",
                            }}
                          >
                            <X size={10} />
                          </button>
                        </div>
                      ))}

                      {/* Add more */}
                      {imagePreviews.length < 5 && (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex flex-col items-center justify-center rounded-xl transition-all hover:opacity-70"
                          style={{
                            width: 64,
                            height: 64,
                            border: "1.5px dashed var(--rj-bone)",
                            background: "var(--rj-ivory-dark)",
                            cursor: "pointer",
                          }}
                        >
                          <Upload
                            size={14}
                            style={{ color: "var(--rj-ash)" }}
                          />
                        </button>
                      )}
                    </div>
                  )}

                  {imagePreviews.length === 0 && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-xl transition-all hover:opacity-80"
                      style={{
                        border: "1.5px dashed var(--rj-bone)",
                        background: "rgba(0,55,32,0.03)",
                        cursor: "pointer",
                      }}
                    >
                      <Camera
                        size={18}
                        style={{ color: "var(--rj-emerald)" }}
                      />
                      <span
                        className="font-cinzel text-[10px] tracking-wider"
                        style={{ color: "var(--rj-ash)" }}
                      >
                        Tap to add photos of your purchase
                      </span>
                    </button>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={
                    submitting ||
                    !rating ||
                    !reviewDescription.trim() ||
                    !username.trim()
                  }
                  className="w-full flex items-center justify-center gap-2 py-3.5 font-cinzel text-[11px] tracking-widest uppercase font-bold rounded-full transition-all duration-300 active:scale-95 disabled:opacity-40"
                  style={{
                    background: "var(--gradient-gold)",
                    color: "var(--rj-emerald)",
                    cursor: submitting || !rating ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 20px rgba(252,193,81,0.3)",
                  }}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Submitting…
                    </>
                  ) : (
                    <>
                      <MessageSquarePlus size={14} /> Submit Review
                    </>
                  )}
                </button>

                <p
                  className="text-center font-cinzel text-[8px] tracking-wider"
                  style={{ color: "var(--rj-ash)" }}
                >
                  Your review will be visible after approval by our team (within
                  24 hrs).
                </p>
              </form>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// RATING SUMMARY SIDEBAR
// ─────────────────────────────────────────────────────────────────
function RatingSummary({
  avgRating,
  totalCount,
  breakdown,
  filterRating,
  onFilterChange,
}: {
  avgRating: number;
  totalCount: number;
  breakdown: RatingBreakdown;
  filterRating: number;
  onFilterChange: (r: number) => void;
}) {
  const pct = (count: number) =>
    totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid var(--rj-bone)", background: "#fff" }}
    >
      {/* Big rating */}
      <div className="p-6" style={{ borderBottom: "1px solid var(--rj-bone)" }}>
        <div className="flex items-end gap-3 mb-2">
          <span
            className="font-cormorant font-light leading-none"
            style={{
              fontSize: "4.5rem",
              color: "var(--rj-charcoal)",
              letterSpacing: "-0.02em",
            }}
          >
            {avgRating > 0 ? avgRating.toFixed(1) : "—"}
          </span>
          <div className="pb-2">
            <StarRow rating={avgRating} size={16} />
            <p
              className="font-cinzel text-[9px] tracking-wider mt-1"
              style={{ color: "var(--rj-ash)" }}
            >
              {totalCount > 0
                ? `${totalCount} review${totalCount !== 1 ? "s" : ""}`
                : "No reviews yet"}
            </p>
          </div>
        </div>
      </div>

      {/* Breakdown bars */}
      <div className="p-5">
        <p
          className="font-cinzel text-[9px] tracking-widest uppercase font-bold mb-3"
          style={{ color: "var(--rj-emerald)" }}
        >
          Rating Breakdown
        </p>
        <div className="flex flex-col gap-2">
          {([5, 4, 3, 2, 1] as const).map((stars) => {
            const count = breakdown[stars] || 0;
            const p = pct(count);
            const active = filterRating === stars;
            return (
              <button
                key={stars}
                onClick={() => onFilterChange(active ? 0 : stars)}
                className="w-full flex items-center gap-2 group transition-all"
                style={{ cursor: "pointer" }}
              >
                <div className="flex gap-0.5 flex-shrink-0 w-14">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={8}
                      style={{
                        fill: i < stars ? "var(--rj-gold)" : "transparent",
                        color: i < stars ? "var(--rj-gold)" : "var(--rj-bone)",
                      }}
                    />
                  ))}
                </div>
                <div
                  className="flex-1 h-1.5 rounded-full overflow-hidden"
                  style={{ background: "var(--rj-ivory-dark)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${p}%` }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                      delay: 0.1 * (5 - stars),
                    }}
                    style={{
                      background: active
                        ? "var(--rj-emerald)"
                        : "var(--rj-gold)",
                    }}
                  />
                </div>
                <span
                  className="font-cinzel text-[9px] w-8 text-right flex-shrink-0"
                  style={{
                    color: active ? "var(--rj-emerald)" : "var(--rj-ash)",
                    fontWeight: active ? 700 : 400,
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {filterRating > 0 && (
          <button
            onClick={() => onFilterChange(0)}
            className="mt-4 w-full font-cinzel text-[9px] tracking-widest uppercase py-1.5 rounded-full transition-all hover:opacity-70"
            style={{
              border: "1px solid var(--rj-bone)",
              color: "var(--rj-ash)",
              cursor: "pointer",
            }}
          >
            Clear filter ×
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN REVIEWS SECTION
// ─────────────────────────────────────────────────────────────────
interface ProductReviewsProps {
  productId: string;
  productName: string;
  /** Pass slug if your route is /api/reviews/:slug */
  productSlug?: string;
}

export default function ProductReviews({
  productId,
  productName,
  productSlug,
}: ProductReviewsProps) {
  const identifier = productSlug || productId;

  const [reviews, setReviews] = useState<Review[]>([]);
  const [breakdown, setBreakdown] = useState<RatingBreakdown>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [pagination, setPagination] = useState<ReviewsPagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const [sortBy, setSortBy] = useState<SortValue>("recent");
  const [filterRating, setFilterRating] = useState(0);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const avgRating =
    pagination && pagination.total > 0
      ? Object.entries(breakdown).reduce(
          (sum, [stars, count]) => sum + Number(stars) * count,
          0,
        ) / pagination.total
      : 0;

  // ── Fetch Reviews ──────────────────────────────────────────────
  const fetchReviews = useCallback(
    async (pageNum: number, append = false) => {
      if (append) setLoadingMore(true);
      else setLoading(true);
      setError("");

      try {
        const res = await fetchProductReviews(identifier, {
          page: pageNum,
          limit: REVIEWS_PER_PAGE,
          sort: sortBy,
        });

        if (res.success) {
          setReviews((prev) => (append ? [...prev, ...res.data] : res.data));
          setBreakdown(res.ratingBreakdown);
          setPagination(res.pagination);
        } else {
          setError(res.message || "Failed to load reviews");
        }
      } catch (err: any) {
        setError(err.message || "Network error");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [identifier, sortBy],
  );

  // Reset + refetch when sort changes
  useEffect(() => {
    setPage(1);
    setFilterRating(0);
    fetchReviews(1, false);
  }, [sortBy, fetchReviews]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchReviews(nextPage, true);
  };

  const handleReviewSuccess = () => {
    // Refetch from page 1 to show pending message; real review appears after approval
    fetchReviews(1, false);
  };

  // Filter reviews client-side by star rating
  const displayedReviews =
    filterRating === 0
      ? reviews
      : reviews.filter((r) => r.rating === filterRating);

  const hasMore = pagination ? page < pagination.totalPages : false;

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <AddReviewModal
            productId={productId}
            productName={productName}
            onClose={() => setShowModal(false)}
            onSuccess={handleReviewSuccess}
          />
        )}
      </AnimatePresence>

      <section
        id="reviews"
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          {/* ── Section Heading ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
          >
            <div>
              <p
                className="label-accent mb-2"
                style={{ color: "var(--rj-emerald)" }}
              >
                ✦ Customer Reviews
              </p>
              <h2
                className="heading-md leading-tight"
                style={{ color: "var(--rj-charcoal)" }}
              >
                Real people,
                <br />
                <em className="text-gold-shimmer font-normal pe-2">
                  real gold
                </em>
              </h2>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="self-start sm:self-auto flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full font-cinzel text-[10px] tracking-widest uppercase font-bold transition-all duration-300 hover:opacity-90 active:scale-95"
              style={{
                background: "var(--gradient-gold)",
                color: "var(--rj-emerald)",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(252,193,81,0.3)",
              }}
            >
              <MessageSquarePlus size={13} /> Write a Review
            </button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* ── Left: Summary ── */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-28">
                <RatingSummary
                  avgRating={avgRating}
                  totalCount={pagination?.total ?? 0}
                  breakdown={breakdown}
                  filterRating={filterRating}
                  onFilterChange={setFilterRating}
                />
              </div>
            </div>

            {/* ── Right: Reviews List ── */}
            <div className="lg:col-span-2">
              {/* Sort + count bar */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  {filterRating > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <span
                        className="flex items-center gap-1.5 font-cinzel text-[9px] tracking-wider px-3 py-1.5 rounded-full"
                        style={{
                          background: "var(--rj-emerald)",
                          color: "var(--rj-gold)",
                        }}
                      >
                        <StarRow rating={filterRating} size={9} />
                        only
                        <button
                          onClick={() => setFilterRating(0)}
                          style={{ cursor: "pointer" }}
                        >
                          <X size={9} />
                        </button>
                      </span>
                    </motion.div>
                  )}
                  {!filterRating && (
                    <p
                      className="font-cinzel text-[10px] tracking-wider"
                      style={{ color: "var(--rj-ash)" }}
                    >
                      {loading
                        ? "Loading…"
                        : `${pagination?.total ?? 0} review${pagination?.total !== 1 ? "s" : ""}`}
                    </p>
                  )}
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortValue)}
                  className="font-cinzel text-[10px] tracking-wider outline-none px-3 py-1.5 rounded-xl"
                  style={{
                    border: "1px solid var(--rj-bone)",
                    background: "#fff",
                    color: "var(--rj-charcoal)",
                    cursor: "pointer",
                  }}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Loading */}
              {loading && (
                <div className="flex flex-col gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <SkeletonReviewCard />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Error */}
              {!loading && error && (
                <div
                  className="flex flex-col items-center py-16 gap-4 rounded-2xl"
                  style={{ border: "1px dashed var(--rj-bone)" }}
                >
                  <WifiOff size={28} style={{ color: "var(--rj-bone)" }} />
                  <p
                    className="font-cinzel text-xs tracking-wider"
                    style={{ color: "var(--rj-ash)" }}
                  >
                    {error}
                  </p>
                  <button
                    onClick={() => fetchReviews(1)}
                    className="flex items-center gap-2 font-cinzel text-[10px] tracking-widest uppercase px-5 py-2 rounded-full transition-all"
                    style={{
                      background: "var(--rj-emerald)",
                      color: "var(--rj-gold)",
                      cursor: "pointer",
                    }}
                  >
                    <RefreshCw size={12} /> Try Again
                  </button>
                </div>
              )}

              {/* Empty state */}
              {!loading && !error && displayedReviews.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center py-16 gap-4 rounded-2xl"
                  style={{
                    border: "1.5px dashed var(--rj-bone)",
                    background: "rgba(0,55,32,0.02)",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(0,55,32,0.06)" }}
                  >
                    <Star
                      size={22}
                      style={{ color: "var(--rj-emerald)", opacity: 0.4 }}
                    />
                  </div>
                  <p
                    className="font-cormorant text-xl font-light"
                    style={{ color: "var(--rj-charcoal)" }}
                  >
                    {filterRating > 0
                      ? `No ${filterRating}-star reviews yet`
                      : "Be the first to review"}
                  </p>
                  <p
                    className="font-cinzel text-[9px] tracking-wider text-center max-w-xs"
                    style={{ color: "var(--rj-ash)" }}
                  >
                    {filterRating > 0
                      ? "Try removing the star filter to see all reviews."
                      : "Share your experience to help other customers make informed decisions."}
                  </p>
                  {!filterRating && (
                    <button
                      onClick={() => setShowModal(true)}
                      className="flex items-center gap-2 font-cinzel text-[10px] tracking-widest uppercase px-5 py-2.5 rounded-full transition-all"
                      style={{
                        background: "var(--rj-emerald)",
                        color: "var(--rj-gold)",
                        cursor: "pointer",
                      }}
                    >
                      <MessageSquarePlus size={12} /> Write a Review
                    </button>
                  )}
                </motion.div>
              )}

              {/* Reviews */}
              {!loading && !error && displayedReviews.length > 0 && (
                <div className="flex flex-col gap-4">
                  {/* Featured reviews first */}
                  {[...displayedReviews]
                    .sort(
                      (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0),
                    )
                    .map((review, i) => (
                      <motion.div
                        key={review._id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: Math.min(i, 4) * 0.07,
                        }}
                      >
                        <ReviewCard review={review} />
                      </motion.div>
                    ))}
                </div>
              )}

              {/* Load More */}
              {!loading && !error && hasMore && filterRating === 0 && (
                <div className="text-center mt-8">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="inline-flex items-center gap-2 font-cinzel text-[10px] tracking-widest uppercase px-7 py-3 rounded-full transition-all duration-300 disabled:opacity-60"
                    style={{
                      border: "1.5px solid var(--rj-emerald)",
                      color: "var(--rj-emerald)",
                      cursor: loadingMore ? "wait" : "pointer",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "var(--rj-emerald)";
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--rj-gold)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--rj-emerald)";
                    }}
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 size={12} className="animate-spin" /> Loading…
                      </>
                    ) : (
                      <>
                        <ChevronDown size={12} /> Load More Reviews
                      </>
                    )}
                  </button>
                  {pagination && (
                    <p
                      className="font-cinzel text-[9px] tracking-wider mt-3"
                      style={{ color: "var(--rj-ash)" }}
                    >
                      Showing {reviews.length} of {pagination.total}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
