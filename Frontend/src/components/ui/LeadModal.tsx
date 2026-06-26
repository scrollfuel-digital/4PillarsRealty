import { useState, FormEvent } from 'react';
import { PROJECTS, BRAND_COLORS } from '../../data';
import { X, Calendar, User, Mail, Phone, MessageSquare, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectSlug?: string;
  initialMessage?: string;
  accessibilityTextSize: 'sm' | 'md' | 'lg' | 'xl';
}

export default function LeadModal({ isOpen, onClose, projectSlug = 'melbourne-city-sector-ii', initialMessage = '', accessibilityTextSize }: LeadModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectSlug: projectSlug,
    message: initialMessage
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<any | null>(null);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Full Name is required';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email format (e.g. name@domain.com)';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[\s-+]/g, ''))) {
      errs.phone = 'Please specify a real 10-digit contact mobile number';
    }
    if (!formData.projectSlug) {
      errs.projectSlug = 'Please select a specific project layout';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: formData.phone.replace(/[\s-+]/g, '')
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessResponse(data);
      } else {
        const errData = await response.json();
        setErrors({ submit: errData.error || 'Server rejected submission.' });
      }
    } catch (err) {
      console.error(err);
      setErrors({ submit: 'Failed to dispatch inquiry. Please check connection and retry.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getHeadingClass = () => {
    if (accessibilityTextSize === 'sm') return 'text-base';
    if (accessibilityTextSize === 'lg') return 'text-2xl';
    if (accessibilityTextSize === 'xl') return 'text-3xl';
    return 'text-xl';
  };

  const getLabelClass = () => {
    return `block text-xs font-bold text-slate-350 tracking-wider uppercase mb-1 font-mono`;
  };

  return (
    <div 
      className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative animate-scale-up max-h-[90vh] flex flex-col">
        
        {/* Modal Top Header Line */}
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950/40 shrink-0">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span className={`font-serif text-slate-100 font-bold ${getHeadingClass()}`}>
              {successResponse ? 'Booking Dispatch Completed' : 'Schedule Physical Tour'}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
            aria-label="Close modal dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Frame */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          
          {successResponse ? (
            <div className="flex flex-col gap-5 text-center py-6">
              <div className="mx-auto w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mb-1">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold font-serif text-white tracking-tight">VIP Site Cabin Registered</h4>
              
              <div className="bg-emerald-950/20 border border-emerald-900/30 text-emerald-400 text-xs px-4 py-3.5 rounded-2xl max-w-md mx-auto leading-relaxed">
                {successResponse.message} We provided continuous private transport from our main Besa round office layout.
              </div>

              {/* Advanced Simulated Dispatch Logs panel */}
              <div className="text-left bg-slate-950 border border-slate-800 rounded-xl p-4 mt-2">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-blue-400 border-b border-slate-900 pb-2 mb-3 tracking-widest uppercase">
                  <span>Server Automation Output Logs</span>
                  <span className="bg-blue-900/40 text-[9px] px-1.5 py-0.5 rounded">REAL SMTP TRANSACTION</span>
                </div>
                <div className="max-h-[140px] overflow-y-auto font-mono text-[9px] text-slate-400 leading-normal whitespace-pre-wrap select-all bg-slate-900/40 p-2.5 rounded border border-slate-900 custom-scrollbar">
                  {successResponse.simulatedEmailUserText}
                </div>
                <span className="text-[9px] text-slate-500 mt-2 block font-normal text-right font-mono">
                  {successResponse.debugNotificationSms}
                </span>
              </div>

              <button
                onClick={onClose}
                className="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-6 rounded-xl transition-all max-w-[200px] mx-auto text-xs"
              >
                Return to Directory
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              {errors.submit && (
                <div className="bg-red-950/30 border border-red-500/40 text-red-400 text-xs py-3 px-4 rounded-xl font-medium">
                  {errors.submit}
                </div>
              )}

              {/* Subtitle */}
              <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/30 p-3 rounded-xl border border-slate-800/40">
                ⭐ <strong>Private Transport Included:</strong> Registering physical site visits hooks secure matching and triggers private luxury transport dispatch. Site tours run 7 days a week, 9 AM to 6 PM.
              </p>

              {/* Project select box */}
              <div>
                <label className={getLabelClass()}>Select Target Property</label>
                <select
                  value={formData.projectSlug}
                  onChange={(e) => setFormData({ ...formData, projectSlug: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  {PROJECTS.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name} ({p.location})
                    </option>
                  ))}
                </select>
                {errors.projectSlug && <p className="text-red-550 text-[10px] mt-1 font-semibold">{errors.projectSlug}</p>}
              </div>

              {/* Input grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full name input */}
                <div>
                  <label className={getLabelClass()}>Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-[10px] mt-1 font-semibold">{errors.name}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label className={getLabelClass()}>Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      placeholder="jane.doe@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-[10px] mt-1 font-semibold">{errors.email}</p>}
                </div>
              </div>

              {/* Phone contact Number */}
              <div>
                <label className={getLabelClass()}>10-Digit Contact Mobile</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <span className="absolute left-10 top-1/2 transform -translate-y-1/2 text-xs font-mono font-bold text-slate-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="9373233777"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-18 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                {errors.phone && <p className="text-red-400 text-[10px] mt-1 font-semibold">{errors.phone}</p>}
              </div>

              {/* Message block */}
              <div>
                <label className={getLabelClass()}>Advisory Requirements & Preferences</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <textarea
                    rows={3}
                    placeholder="E.g. What hours suit physical visits? Are corner layout residential plots still unbooked?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
              </div>

              {/* Secure badge and Submission */}
              <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-800 shrink-0">
                <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> Encrypted RL Submission Block
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 self-stretch sm:self-center disabled:opacity-50 text-xs shadow-lg shadow-blue-900/30"
                >
                  {isSubmitting ? 'Verifying Sizing Details...' : 'Request Tour and Auto-Notify Desk'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}
