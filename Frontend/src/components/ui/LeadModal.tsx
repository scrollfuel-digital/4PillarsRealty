import { useState, useEffect, FormEvent } from 'react';
import { PROJECTS } from '../../data';
import { useInquiry } from '../../hooks/useInquiry';
import { X, Calendar, User, Mail, Phone, MessageSquare, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectSlug?: string;
  initialMessage?: string;
  accessibilityTextSize: 'sm' | 'md' | 'lg' | 'xl';
}

export default function LeadModal({ isOpen, onClose, projectSlug = 'melbourne-city-sector-ii', initialMessage = '', accessibilityTextSize }: LeadModalProps) {
  const { submit, loading, error, success, reset } = useInquiry();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectSlug,
    message: initialMessage,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form whenever modal opens with new project/message
  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', email: '', phone: '', projectSlug, message: initialMessage });
      setErrors({});
      reset();
    }
  }, [isOpen, projectSlug, initialMessage]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email (e.g. name@domain.com)';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[\s-+]/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.projectSlug) errs.projectSlug = 'Please select a project';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await submit({ ...formData, phone: formData.phone.replace(/[\s-+]/g, '') });
  };

  const getHeadingClass = () => {
    if (accessibilityTextSize === 'sm') return 'text-base';
    if (accessibilityTextSize === 'lg') return 'text-2xl';
    if (accessibilityTextSize === 'xl') return 'text-3xl';
    return 'text-xl';
  };

  const labelClass = 'block text-xs font-bold text-slate-400 tracking-wider uppercase mb-1 font-mono';

  return (
    <div
      className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950/40 shrink-0">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span className={`font-serif text-slate-100 font-bold ${getHeadingClass()}`}>
              {success ? 'Inquiry Submitted' : 'Schedule Physical Tour'}
            </span>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-all" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {success ? (
            <div className="flex flex-col gap-5 text-center py-6">
              <div className="mx-auto w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold font-serif text-white tracking-tight">Inquiry Received!</h4>
              <p className="text-emerald-400 text-xs bg-emerald-950/20 border border-emerald-900/30 px-4 py-3.5 rounded-2xl max-w-md mx-auto leading-relaxed">
                Our team will contact you shortly to confirm your site visit. Complimentary transport from Besa Square is included.
              </p>
              <button onClick={onClose} className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-6 rounded-xl text-xs max-w-[200px] mx-auto">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {(errors.submit || error) && (
                <div className="bg-red-950/30 border border-red-500/40 text-red-400 text-xs py-3 px-4 rounded-xl">
                  {errors.submit || error}
                </div>
              )}

              <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/30 p-3 rounded-xl border border-slate-800/40">
                <strong>Private Transport Included:</strong> Site tours run 7 days a week, 9 AM – 6 PM.
              </p>

              {/* Project */}
              <div>
                <label className={labelClass}>Select Project</label>
                <select
                  value={formData.projectSlug}
                  onChange={(e) => setFormData({ ...formData, projectSlug: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  {PROJECTS.map((p) => (
                    <option key={p.slug} value={p.slug}>{p.name} ({p.location})</option>
                  ))}
                </select>
                {errors.projectSlug && <p className="text-red-400 text-[10px] mt-1">{errors.projectSlug}</p>}
              </div>

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text" placeholder="Jane Doe" value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-[10px] mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email" placeholder="jane@example.com" value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-[10px] mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <span className="absolute left-10 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500">+91</span>
                  <input
                    type="tel" placeholder="9373233777" value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-18 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                {errors.phone && <p className="text-red-400 text-[10px] mt-1">{errors.phone}</p>}
              </div>

              {/* Message */}
              <div>
                <label className={labelClass}>Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <textarea
                    rows={3} placeholder="Any specific requirements or questions?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-2 flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-800">
                <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure Submission
                </span>
                <button
                  type="submit" disabled={loading}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-2.5 px-6 rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  {loading ? 'Submitting...' : 'Request Site Tour'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
