// import { useState, FormEvent } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { PROJECTS } from "../data";
// import { Mail, Phone, MapPin, CheckCircle, Navigation } from "lucide-react";

// interface ContactViewProps {
//   lightMode: boolean;
//   openLeadModal: (projectSlug: string, message?: string) => void;
// }

// const CHECKPOINTS = [
//   { point: "Besa Square Crossing", distance: "Immediate neighborhood access" },
//   { point: "Nagpur Metro Corridor (Wardha Rd)", distance: "8 min commute" },
//   { point: "Dr. Ambedkar Int. Airport", distance: "12 min by highway" },
//   { point: "MIHAN Technology Corridor", distance: "15 min arterial reach" },
// ];

// type ContactRowProps = {
//   icon: React.ReactNode;
//   label: string;
//   children: React.ReactNode;
// };

// const ContactRow = ({ icon, label, children }: ContactRowProps) => {
//   return (
//     <div className="flex items-start gap-4">
//       <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/8 flex items-center justify-center shrink-0">
//         {icon}
//       </div>
//       <div>
//         <span className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-[0.15em] block">
//           {label}
//         </span>
//         <div className="text-sm text-[#0A2540] leading-relaxed mt-1.5 font-medium">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// type FieldProps = {
//   label: string;
//   error?: string;
//   focused?: boolean;
//   children: React.ReactNode;
// };

// const Field = ({ label, error, focused, children }: FieldProps) => {
//   return (
//     <div>
//       <label
//         className={`block text-[11px] font-semibold uppercase mb-1.5 tracking-[0.1em] transition-colors duration-200 ${
//           focused ? "text-[#D4AF37]" : "text-white/50"
//         }`}
//       >
//         {label}
//       </label>
//       {children}
//       <AnimatePresence>
//         {error && (
//           <motion.p
//             initial={{ opacity: 0, height: 0, marginTop: 0 }}
//             animate={{ opacity: 1, height: "auto", marginTop: 6 }}
//             exit={{ opacity: 0, height: 0, marginTop: 0 }}
//             className="text-red-400 text-[11px]"
//           >
//             {error}
//           </motion.p>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default function ContactView({
//   lightMode,
//   openLeadModal,
// }: ContactViewProps) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     projectSlug: "melbourne-city-sector-ii",
//     message: "",
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successResponse, setSuccessResponse] = useState<any | null>(null);
//   const [focusedField, setFocusedField] = useState<string | null>(null);

//   const validate = () => {
//     const errs: Record<string, string> = {};
//     if (!formData.name.trim()) errs.name = "Full name is required";
//     if (!formData.email.trim()) {
//       errs.email = "Email address is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       errs.email = "Enter a valid email address";
//     }
//     if (!formData.phone.trim()) {
//       errs.phone = "Phone number is required";
//     } else if (!/^\d{10}$/.test(formData.phone.replace(/[\s-+]/g, ""))) {
//       errs.phone = "Enter a valid 10-digit mobile number";
//     }
//     setErrors(errs);
//     return Object.keys(errs).length === 0;
//   };

//   const handleLocalSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setIsSubmitting(true);
//     try {
//       const response = await fetch("/api/inquiries", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           phone: formData.phone.replace(/[\s-+]/g, ""),
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setSuccessResponse(data);
//       } else {
//         const errData = await response.json();
//         setErrors({
//           submit: errData.error || "Something went wrong on our end.",
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       setErrors({ submit: "Could not send your inquiry. Please try again." });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const inputBaseClass =
//     "w-full bg-white border border-[#0A2540]/15 rounded-lg px-4 py-3 text-sm text-[#0A2540] placeholder:text-[#6b7280]/60 outline-none transition-colors duration-200 focus:border-[#D4AF37]";

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-[#fdfcfa]">
//       {/* 1. Header Banner */}
//       <motion.div
//         initial={{ opacity: 0, y: 16 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//         className="text-center mb-16 mt-15"
//       >
//         <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#D4AF37]">
//           Get in touch
//         </span>
//         <h1 className="font-serif tracking-tight font-bold mt-3 text-[#0A2540] text-4xl sm:text-5xl">
//           Contact 4 Pillars Realty
//         </h1>
//         <p className="text-[#4b5563] mt-3 text-sm sm:text-base max-w-md mx-auto">
//           Speak with our advisory team and book a private site visit today.
//         </p>
//         <motion.div
//           initial={{ width: 0 }}
//           whileInView={{ width: 64 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
//           className="h-[2px] bg-[#D4AF37] mx-auto mt-6 rounded-full"
//         />
//       </motion.div>

//       {/* 2. Main content split */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
//         {/* Left: HQ card + checkpoints */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//           className="lg:col-span-5 flex flex-col gap-6"
//         >
//           <h3 className="font-serif font-bold text-lg text-[#0A2540]">
//             Corporate Headquarters
//           </h3>

//           <motion.div
//             whileHover={{ y: -4 }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//             className="p-7 rounded-2xl flex flex-col gap-6 bg-white border border-[#0A2540]/8 shadow-[0_8px_30px_-12px_rgba(10,37,64,0.18)] hover:shadow-[0_20px_45px_-15px_rgba(10,37,64,0.28)] transition-shadow duration-300"
//           >
//             <ContactRow
//               icon={<MapPin className="w-5 h-5 text-[#D4AF37]" />}
//               label="Corporate HQ Address"
//             >
//               Plot No. 52-71, Gouri Meadows II, Wing-B, Behind Indian Oil Petrol
//               Pump, Besa Square, New Nagpur, Maharashtra
//             </ContactRow>

//             <div className="h-px bg-[#0A2540]/8" />

//             <ContactRow
//               icon={<Phone className="w-5 h-5 text-[#D4AF37]" />}
//               label="Sales Helpline Desks"
//             >
//               <div className="flex flex-col gap-1">
//                 <a
//                   href="tel:+919373233777"
//                   className="hover:text-[#D4AF37] transition-colors"
//                 >
//                   +91 93732 33777
//                 </a>
//                 <a
//                   href="tel:+919371612666"
//                   className="hover:text-[#D4AF37] transition-colors"
//                 >
//                   +91 93716 12666
//                 </a>
//               </div>
//             </ContactRow>

//             <div className="h-px bg-[#0A2540]/8" />

//             <ContactRow
//               icon={<Mail className="w-5 h-5 text-[#D4AF37]" />}
//               label="Electronic Enquiries"
//             >
//               <a
//                 href="mailto:info@4pillarsrealty.com"
//                 className="hover:text-[#D4AF37] transition-colors"
//               >
//                 info@4pillarsrealty.com
//               </a>
//             </ContactRow>
//           </motion.div>

//           {/* Checkpoints */}
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="p-7 rounded-2xl flex flex-col gap-4 bg-[#0A2540] shadow-[0_8px_30px_-12px_rgba(10,37,64,0.35)]"
//           >
//             <div className="flex items-center gap-2">
//               <Navigation className="w-4 h-4 text-[#D4AF37]" />
//               <span className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-[0.2em]">
//                 Location &amp; Connectivity
//               </span>
//             </div>

//             <div className="flex flex-col">
//               {CHECKPOINTS.map((loc, index) => (
//                 <motion.div
//                   key={loc.point}
//                   initial={{ opacity: 0, x: -8 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.4, delay: 0.15 + index * 0.07 }}
//                   className={`flex justify-between items-center gap-4 py-3 ${
//                     index !== CHECKPOINTS.length - 1
//                       ? "border-b border-white/8"
//                       : ""
//                   }`}
//                 >
//                   <span className="text-sm text-white/90 font-medium">
//                     {loc.point}
//                   </span>
//                   <span className="text-[11px] text-white/50 font-medium whitespace-nowrap">
//                     {loc.distance}
//                   </span>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* Right: Form panel */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//           className="lg:col-span-7"
//         >
//           <div className="rounded-3xl p-8 sm:p-10 relative bg-[#0A2540] shadow-[0_25px_60px_-15px_rgba(10,37,64,0.45)] overflow-hidden">
//             {/* faint corner glow, signature element */}
//             <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#D4AF37]/10 blur-3xl" />

//             <AnimatePresence mode="wait">
//               {successResponse ? (
//                 <motion.div
//                   key="success"
//                   initial={{ opacity: 0, scale: 0.97 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
//                   className="text-center py-8 flex flex-col gap-4 relative z-10"
//                 >
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{
//                       delay: 0.15,
//                       type: "spring",
//                       stiffness: 200,
//                       damping: 14,
//                     }}
//                     className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-2"
//                   >
//                     <CheckCircle className="w-8 h-8" />
//                   </motion.div>
//                   <h4 className="text-xl font-serif font-bold text-white tracking-tight">
//                     Your Inquiry Has Been Sent
//                   </h4>

//                   <p className="text-sm text-white/60 max-w-md mx-auto leading-relaxed">
//                     Our advisory team will call you shortly to discuss your
//                     requirements.
//                   </p>

//                   {successResponse.simulatedEmailUserText && (
//                     <div className="text-left bg-white/5 p-4 border border-white/10 rounded-xl mt-2">
//                       <span className="text-[10px] font-semibold text-[#D4AF37] block mb-2 uppercase tracking-wide">
//                         Confirmation email preview
//                       </span>
//                       <pre className="text-[11px] text-white/50 leading-normal whitespace-pre-wrap">
//                         {successResponse.simulatedEmailUserText}
//                       </pre>
//                     </div>
//                   )}

//                   <button
//                     onClick={() => setSuccessResponse(null)}
//                     className="bg-[#D4AF37] hover:bg-[#c4a132] text-[#0A2540] font-semibold py-2.5 px-6 rounded-xl text-sm max-w-[220px] mx-auto mt-4 transition-colors"
//                   >
//                     Send another inquiry
//                   </button>
//                 </motion.div>
//               ) : (
//                 <motion.form
//                   key="form"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   onSubmit={handleLocalSubmit}
//                   className="flex flex-col gap-5 relative z-10"
//                 >
//                   <div className="mb-1">
//                     <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37]">
//                       Inquiry Form
//                     </span>
//                     <h3 className="font-serif font-bold text-2xl text-white mt-1">
//                       Talk to Our Advisors
//                     </h3>
//                   </div>

//                   <Field
//                     label="Full Name"
//                     error={errors.name}
//                     focused={focusedField === "name"}
//                   >
//                     <input
//                       type="text"
//                       placeholder="Jane Doe"
//                       value={formData.name}
//                       onFocus={() => setFocusedField("name")}
//                       onBlur={() => setFocusedField(null)}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                       className={inputBaseClass}
//                     />
//                   </Field>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                     <Field
//                       label="Email Address"
//                       error={errors.email}
//                       focused={focusedField === "email"}
//                     >
//                       <input
//                         type="email"
//                         placeholder="name@domain.com"
//                         value={formData.email}
//                         onFocus={() => setFocusedField("email")}
//                         onBlur={() => setFocusedField(null)}
//                         onChange={(e) =>
//                           setFormData({ ...formData, email: e.target.value })
//                         }
//                         className={inputBaseClass}
//                       />
//                     </Field>

//                     <Field
//                       label="Phone Number"
//                       error={errors.phone}
//                       focused={focusedField === "phone"}
//                     >
//                       <div className="relative">
//                         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#0A2540]/50">
//                           +91
//                         </span>
//                         <input
//                           type="tel"
//                           placeholder="93732 33777"
//                           value={formData.phone}
//                           onFocus={() => setFocusedField("phone")}
//                           onBlur={() => setFocusedField(null)}
//                           onChange={(e) =>
//                             setFormData({ ...formData, phone: e.target.value })
//                           }
//                           className={`${inputBaseClass} pl-11`}
//                         />
//                       </div>
//                     </Field>
//                   </div>

//                   <Field
//                     label="Project of Interest"
//                     focused={focusedField === "project"}
//                   >
//                     <select
//                       value={formData.projectSlug}
//                       onFocus={() => setFocusedField("project")}
//                       onBlur={() => setFocusedField(null)}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           projectSlug: e.target.value,
//                         })
//                       }
//                       className={`${inputBaseClass} appearance-none cursor-pointer`}
//                     >
//                       {PROJECTS.map((p) => (
//                         <option key={p.slug} value={p.slug}>
//                           {p.name}
//                         </option>
//                       ))}
//                     </select>
//                   </Field>

//                   <Field
//                     label="Your Message"
//                     focused={focusedField === "message"}
//                   >
//                     <textarea
//                       rows={3}
//                       placeholder="E.g. Are corner plots still available? What financing options apply?"
//                       value={formData.message}
//                       onFocus={() => setFocusedField("message")}
//                       onBlur={() => setFocusedField(null)}
//                       onChange={(e) =>
//                         setFormData({ ...formData, message: e.target.value })
//                       }
//                       className={`${inputBaseClass} resize-none`}
//                     />
//                   </Field>

//                   <AnimatePresence>
//                     {errors.submit && (
//                       <motion.p
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         className="text-red-400 text-xs"
//                       >
//                         {errors.submit}
//                       </motion.p>
//                     )}
//                   </AnimatePresence>

//                   <motion.button
//                     type="submit"
//                     disabled={isSubmitting}
//                     whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
//                     whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
//                     className="w-full bg-[#D4AF37] hover:bg-[#c4a132] disabled:opacity-60 disabled:cursor-not-allowed text-[#0A2540] font-bold py-4 rounded-xl transition-colors mt-1 text-sm tracking-wide"
//                   >
//                     {isSubmitting ? "Sending your inquiry…" : "Send Inquiry"}
//                   </motion.button>

//                   <p className="text-center text-[11px] text-white/35 -mt-1">
//                     We'll respond within one business day.
//                   </p>
//                 </motion.form>
//               )}
//             </AnimatePresence>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }


import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "../data";
import { Mail, Phone, MapPin, CheckCircle, Navigation } from "lucide-react";

interface ContactViewProps {
  lightMode: boolean;
  openLeadModal: (projectSlug: string, message?: string) => void;
}

type Checkpoint = { point: string; distance: string };

const CHECKPOINTS: Checkpoint[] = [
  { point: "Besa Square Crossing", distance: "Immediate neighborhood access" },
  { point: "Nagpur Metro Corridor (Wardha Rd)", distance: "8 min commute" },
  { point: "Dr. Ambedkar Int. Airport", distance: "12 min by highway" },
  { point: "MIHAN Technology Corridor", distance: "15 min arterial reach" },
];

const HQ_PHOTO_URL =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80&auto=format&fit=crop";

type PillarMarkProps = { className?: string };

/** Quiet "4 Pillars" motif: four bars, varied height/opacity. Used once, near the headline. */
const PillarMark = ({ className = "" }: PillarMarkProps) => {
  return (
    <div className={`flex items-end justify-center gap-1.5 ${className}`}>
      <span className="w-1.5 h-6 bg-[#C23A4A] rounded-full" />
      <span className="w-1.5 h-9 bg-[#2B86C5] rounded-full" />
      <span className="w-1.5 h-5 bg-white/25 rounded-full" />
      <span className="w-1.5 h-9 bg-[#2B86C5] rounded-full" />
    </div>
  );
};

type ContactRowProps = {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
};

const ContactRow = ({ icon, label, children }: ContactRowProps) => {
  return (
    <div className="group flex items-start gap-3.5">
      <div className="w-8 h-8 rounded-lg bg-[#2B86C5]/8 flex items-center justify-center shrink-0 transition-colors duration-200 group-hover:bg-[#2B86C5]/15">
        {icon}
      </div>
      <div>
        <span className="text-[10px] font-semibold text-[#2B86C5] uppercase tracking-[0.15em] block">
          {label}
        </span>
        <div className="text-sm text-[#003A78] leading-relaxed mt-1 font-medium">
          {children}
        </div>
      </div>
    </div>
  );
};

type FieldProps = {
  label: string;
  error?: string;
  focused?: boolean;
  children: React.ReactNode;
};

const Field = ({ label, error, focused, children }: FieldProps) => {
  return (
    <div className="group">
      <label
        className={`block text-[11px] font-semibold uppercase mb-1.5 tracking-[0.1em] transition-colors duration-200 ${
          focused ? "text-[#C23A4A]" : "text-[#003A78]/45 group-focus-within:text-[#C23A4A]"
        }`}
      >
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 6 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="text-[#C23A4A] text-[11px]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ContactView({
  lightMode,
  openLeadModal,
}: ContactViewProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectSlug: "melbourne-city-sector-ii",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<any | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[\s-+]/g, ""))) {
      errs.phone = "Enter a valid 10-digit mobile number";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLocalSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: formData.phone.replace(/[\s-+]/g, ""),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessResponse(data);
      } else {
        const errData = await response.json();
        setErrors({
          submit: errData.error || "Something went wrong on our end.",
        });
      }
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Could not send your inquiry. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClass =
    "w-full bg-[#F2F2F2] border border-[#003A78]/12 rounded-lg px-4 py-3 text-sm text-[#003A78] placeholder:text-[#003A78]/35 outline-none transition-all duration-200 focus:border-[#2B86C5] focus:bg-white focus:ring-2 focus:ring-[#2B86C5]/15";

  return (
    <div className="bg-[#f2f2f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* 1. Header banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          
          <h1 className="font-serif tracking-tight font-bold mt-3 text-[#003A78] text-4xl sm:text-5xl mt-15">
            Contact 4 Pillars Realty
          </h1>
          <p className="text-[#003A78]/60 mt-3 text-sm sm:text-base max-w-md mx-auto">
            Speak with our advisory team and book a private site visit today.
          </p>
        </motion.div>

        {/* 2. Main content split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-16">
          {/* Left column: photo with overlapping HQ card, then connectivity panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            {/* Photo panel */}
            <div className="group relative rounded-2xl overflow-hidden h-[360px] sm:h-[420px] ring-1 ring-white/10">
              <img
                src={HQ_PHOTO_URL}
                alt="4 Pillars Realty corporate headquarters"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003A78]/85 via-[#003A78]/15 to-transparent" />
              
            </div>

            {/* Floating overlap card — signature element, mirrors reference's overlap trick */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 -mt-95 mx-4 sm:mx-6 bg-white rounded-2xl p-6 sm:p-7 flex flex-col gap-5 shadow-[0_20px_50px_-15px_rgba(0,58,120,0.35)] ring-1 ring-[#003A78]/5 border-t-[3px] border-[#C23A4A]"
            >
              <ContactRow
                icon={<MapPin className="w-4 h-4 text-[#2B86C5]" />}
                label="Corporate HQ Address"
              >
                Plot No. 52-71, Gouri Meadows II, Wing-B, Behind Indian Oil
                Petrol Pump, Besa Square, New Nagpur, Maharashtra
              </ContactRow>

              <div className="h-px bg-[#003A78]/8" />

              <ContactRow
                icon={<Phone className="w-4 h-4 text-[#2B86C5]" />}
                label="Sales Helpline Desks"
              >
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+919373233777"
                    className="hover:text-[#C23A4A] transition-colors"
                  >
                    +91 93732 33777
                  </a>
                  <a
                    href="tel:+919371612666"
                    className="hover:text-[#C23A4A] transition-colors"
                  >
                    +91 93716 12666
                  </a>
                </div>
              </ContactRow>

              <div className="h-px bg-[#003A78]/8" />

              <ContactRow
                icon={<Mail className="w-4 h-4 text-[#2B86C5]" />}
                label="Electronic Enquiries"
              >
                <a
                  href="mailto:info@4pillarsrealty.com"
                  className="hover:text-[#C23A4A] transition-colors"
                >
                  info@4pillarsrealty.com
                </a>
              </ContactRow>
            </motion.div>

            {/* Connectivity panel */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-15 p-7 rounded-2xl flex flex-col gap-4 bg-white/[0.04] border border-white/10 ring-1 ring-white/5"
            >
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#2B86C5]" />
                <span className="text-[11px] font-semibold text-[#2B86C5] uppercase tracking-[0.2em]">
                  Location &amp; Connectivity
                </span>
              </div>

              <div className="flex flex-col divide-y divide-white/8">
                {CHECKPOINTS.map((loc, index) => (
                  <motion.div
                    key={loc.point}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + index * 0.07 }}
                    className="flex justify-between items-center gap-4 py-3"
                  >
                    <span className="text-sm text-[#003A78] font-medium">
                      {loc.point}
                    </span>
                    <span className="text-[11px] text-[#003A78]/45 font-medium whitespace-nowrap">
                      {loc.distance}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: form panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl p-8 sm:p-10 bg-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] ring-1 ring-[#003A78]/5">
              <AnimatePresence mode="wait">
                {successResponse ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center py-8 flex flex-col gap-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.15,
                        type: "spring",
                        stiffness: 200,
                        damping: 14,
                      }}
                      className="w-16 h-16 bg-[#2B86C5]/10 border border-[#2B86C5]/30 text-[#2B86C5] rounded-full flex items-center justify-center mx-auto mb-2"
                    >
                      <CheckCircle className="w-8 h-8" />
                    </motion.div>
                    <h4 className="text-xl font-serif font-bold text-[#003A78] tracking-tight">
                      Your Inquiry Has Been Sent
                    </h4>

                    <p className="text-sm text-[#003A78]/60 max-w-md mx-auto leading-relaxed">
                      Our advisory team will call you shortly to discuss your
                      requirements.
                    </p>

                    {successResponse.simulatedEmailUserText && (
                      <div className="text-left bg-[#F2F2F2] p-4 border border-[#003A78]/8 rounded-xl mt-2">
                        <span className="text-[10px] font-semibold text-[#2B86C5] block mb-2 uppercase tracking-wide">
                          Confirmation email preview
                        </span>
                        <pre className="text-[11px] text-[#003A78]/55 leading-normal whitespace-pre-wrap">
                          {successResponse.simulatedEmailUserText}
                        </pre>
                      </div>
                    )}

                    <button
                      onClick={() => setSuccessResponse(null)}
                      className="bg-[#C23A4A] hover:bg-[#a82f3d] text-white font-semibold py-2.5 px-6 rounded-xl text-sm max-w-[220px] mx-auto mt-4 transition-colors"
                    >
                      Send another inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleLocalSubmit}
                    className="flex flex-col gap-5"
                  >
                    <div className="mb-1">
                      <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C23A4A]">
                        Inquiry Form
                      </span>
                      <h3 className="font-serif font-bold text-2xl text-[#003A78] mt-1">
                        Talk to Our Advisors
                      </h3>
                    </div>

                    <Field
                      label="Full Name"
                      error={errors.name}
                      focused={focusedField === "name"}
                    >
                      <input
                        type="text"
                        placeholder="Jane Doe"
                        value={formData.name}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={inputBaseClass}
                      />
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field
                        label="Email Address"
                        error={errors.email}
                        focused={focusedField === "email"}
                      >
                        <input
                          type="email"
                          placeholder="name@domain.com"
                          value={formData.email}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className={inputBaseClass}
                        />
                      </Field>

                      <Field
                        label="Phone Number"
                        error={errors.phone}
                        focused={focusedField === "phone"}
                      >
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#003A78]/45">
                            +91
                          </span>
                          <input
                            type="tel"
                            placeholder="93732 33777"
                            value={formData.phone}
                            onFocus={() => setFocusedField("phone")}
                            onBlur={() => setFocusedField(null)}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            className={`${inputBaseClass} pl-11`}
                          />
                        </div>
                      </Field>
                    </div>

                    <Field
                      label="Project of Interest"
                      focused={focusedField === "project"}
                    >
                      <select
                        value={formData.projectSlug}
                        onFocus={() => setFocusedField("project")}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            projectSlug: e.target.value,
                          })
                        }
                        className={`${inputBaseClass} appearance-none cursor-pointer`}
                      >
                        {PROJECTS.map((p) => (
                          <option key={p.slug} value={p.slug}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field
                      label="Your Message"
                      focused={focusedField === "message"}
                    >
                      <textarea
                        rows={3}
                        placeholder="E.g. Are corner plots still available? What financing options apply?"
                        value={formData.message}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            message: e.target.value,
                          })
                        }
                        className={`${inputBaseClass} resize-none`}
                      />
                    </Field>

                    <AnimatePresence>
                      {errors.submit && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[#C23A4A] text-xs"
                        >
                          {errors.submit}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                      className="w-full bg-[#C23A4A] hover:bg-[#a82f3d] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors mt-1 text-sm tracking-wide"
                    >
                      {isSubmitting ? "Sending your inquiry…" : "Send Inquiry"}
                    </motion.button>

                    <p className="text-center text-[11px] text-[#003A78]/35 -mt-1">
                      We'll respond within one business day.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}