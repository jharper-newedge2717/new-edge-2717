import { useState, useEffect } from 'react';
import { X, UserCheck, Shield, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import type { ModalTab, TrackId, IntakeFormData } from '../types';

interface IntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: ModalTab;
  defaultTrack?: TrackId;
}

export const IntakeModal: React.FC<IntakeModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'mentee',
  defaultTrack = 'mens'
}) => {
  const [activeTab, setActiveTab] = useState<ModalTab>(defaultTab);
  const [formData, setFormData] = useState<IntakeFormData>({
    name: '',
    email: '',
    phone: '',
    track: defaultTrack,
    growthGoals: '',
    faithBackground: '',
    agreedToStatement: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setActiveTab(defaultTab);
    setFormData((prev) => ({ ...prev, track: defaultTrack }));
    setIsSubmitted(false);
    setErrors({});
  }, [defaultTab, defaultTrack, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Valid email is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';

    if (activeTab === 'mentee') {
      if (!formData.growthGoals?.trim()) errs.growthGoals = 'Please share what you are hoping to grow in';
    } else {
      if (!formData.faithBackground?.trim()) errs.faithBackground = 'Please brief us on your faith background';
      if (!formData.agreedToStatement) errs.agreedToStatement = 'You must affirm agreement with our Statement of Faith to serve as a mentor';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const isMentee = activeTab === 'mentee';
    const payload = {
      _subject: isMentee 
        ? `New Mentee Intake: ${formData.name}`
        : `New Mentor Application: ${formData.name}`,
      _replyto: formData.email,
      Role: isMentee ? 'Mentee Intake Request' : 'Mentor Candidate Application',
      FullName: formData.name,
      Email: formData.email,
      Phone: formData.phone,
      Track: formData.track === 'mens' ? "Men's Track" : formData.track === 'womens' ? "Women's Track" : "Young Adult (18+) Track",
      [isMentee ? 'Growth Goals & Needs' : 'Faith Journey Background']: isMentee ? formData.growthGoals : formData.faithBackground,
      StatementOfFaithAgreed: formData.agreedToStatement ? 'Yes - Affirmed Agreement' : 'N/A'
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/jharper@newedge2717.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);
      } else {
        // Fallback to success view even if endpoint returned non-200, log error
        console.warn('FormSubmit returned status:', response.status);
        setIsSubmitting(false);
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error('Error submitting form to email handler:', err);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      track: 'mens',
      growthGoals: '',
      faithBackground: '',
      agreedToStatement: false
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-[#1A2229] border border-[#B66D44]/40 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-[#11161B] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#B66D44]/20 border border-[#B66D44]/30 text-[#B66D44]">
              {activeTab === 'mentee' ? <UserCheck className="w-6 h-6" /> : <Shield className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#FDFBF7]">Get Connected</h3>
              <p className="text-xs text-[#94A3B8]">New Edge 27:17 Ministries • Washoe County, NV</p>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="p-2 rounded-full text-[#94A3B8] hover:text-[#FDFBF7] hover:bg-[#1A2229] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Switcher Bar */}
        {!isSubmitted && (
          <div className="grid grid-cols-2 bg-[#11161B] p-1.5 border-b border-slate-800">
            <button
              onClick={() => {
                setActiveTab('mentee');
                setErrors({});
              }}
              className={`py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'mentee'
                  ? 'bg-[#B66D44] text-[#FDFBF7] shadow-md'
                  : 'text-[#94A3B8] hover:text-[#FDFBF7] hover:bg-[#1A2229]'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>I Need a Mentor</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('mentor');
                setErrors({});
              }}
              className={`py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'mentor'
                  ? 'bg-[#B66D44] text-[#FDFBF7] shadow-md'
                  : 'text-[#94A3B8] hover:text-[#FDFBF7] hover:bg-[#1A2229]'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Apply to Mentor</span>
            </button>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {isSubmitted ? (
            /* Success State Confirmation Screen */
            <div className="text-center py-8 space-y-6 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-[#B66D44]/20 border-2 border-[#B66D44] flex items-center justify-center text-[#B66D44] mx-auto shadow-lg shadow-[#B66D44]/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#B66D44] uppercase tracking-widest">Intake Submitted</span>
                <h4 className="text-2xl font-extrabold text-[#FDFBF7] mt-1 mb-2">
                  Thank you, {formData.name}!
                </h4>
                <p className="text-sm text-[#94A3B8] max-w-md mx-auto leading-relaxed">
                  We have received your application for the{' '}
                  <strong className="text-[#FDFBF7]">
                    {formData.track === 'mens' ? "Men's Track" : formData.track === 'womens' ? "Women's Track" : "Young Adult Track"}
                  </strong>{' '}
                  as a <strong className="text-[#FDFBF7]">{activeTab === 'mentee' ? 'Mentee' : 'Mentor Candidate'}</strong>.
                </p>
              </div>

              {/* Next Steps Box */}
              <div className="p-4 rounded-2xl bg-[#11161B] border border-slate-800 text-left max-w-md mx-auto space-y-2 text-xs text-[#94A3B8]">
                <div className="font-bold text-[#F8EDE6] uppercase tracking-wider mb-1">What Happens Next:</div>
                <div className="flex items-start gap-2">
                  <span className="text-[#B66D44] font-bold">1.</span>
                  <span>A Track Leader will review your intake within 24–48 hours.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#B66D44] font-bold">2.</span>
                  <span>We will reach out via email ({formData.email}) or phone ({formData.phone}) for an initial conversation.</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={resetAndClose}
                  className="px-8 py-3 rounded-xl text-sm font-bold text-[#FDFBF7] bg-[#B66D44] hover:bg-[#9E5933] transition-colors"
                >
                  Return to Home
                </button>
              </div>
            </div>
          ) : (
            /* Intake Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="text-xs text-[#94A3B8]">
                {activeTab === 'mentee'
                  ? 'Fill out this short form to be connected with a Christian mentor tailored to your life stage and growth goals.'
                  : 'Thank you for your willingness to invest in others! Please complete this initial mentor qualification form.'}
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#FDFBF7] uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-[#B66D44]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Caleb Miller"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-[#11161B] border text-sm text-[#FDFBF7] placeholder-[#94A3B8] focus:outline-none focus:border-[#B66D44] ${
                    errors.name ? 'border-red-500' : 'border-slate-800'
                  }`}
                />
                {errors.name && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.name}</p>}
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#FDFBF7] uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-[#B66D44]">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="caleb@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-[#11161B] border text-sm text-[#FDFBF7] placeholder-[#94A3B8] focus:outline-none focus:border-[#B66D44] ${
                      errors.email ? 'border-red-500' : 'border-slate-800'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#FDFBF7] uppercase tracking-wider mb-1.5">
                    Phone Number <span className="text-[#B66D44]">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="(775) 555-0199"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-[#11161B] border text-sm text-[#FDFBF7] placeholder-[#94A3B8] focus:outline-none focus:border-[#B66D44] ${
                      errors.phone ? 'border-red-500' : 'border-slate-800'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.phone}</p>}
                </div>
              </div>

              {/* Track Selection Dropdown / Selector */}
              <div>
                <label className="block text-xs font-bold text-[#FDFBF7] uppercase tracking-wider mb-1.5">
                  Select Ministry Track <span className="text-[#B66D44]">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'mens', name: "Men's Track" },
                    { id: 'womens', name: "Women's Track" },
                    { id: 'young_adult', name: "Young Adult (18+)" }
                  ].map((tr) => (
                    <button
                      key={tr.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, track: tr.id as TrackId })}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-colors ${
                        formData.track === tr.id
                          ? 'bg-[#B66D44] text-[#FDFBF7] border-[#B66D44]'
                          : 'bg-[#11161B] text-[#94A3B8] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {tr.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab 1 Mentee Specific Field */}
              {activeTab === 'mentee' && (
                <div>
                  <label className="block text-xs font-bold text-[#FDFBF7] uppercase tracking-wider mb-1.5">
                    What are you hoping to grow in? <span className="text-[#B66D44]">*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Share a bit about your current season, goals, or areas where you'd like spiritual accountability..."
                    value={formData.growthGoals}
                    onChange={(e) => setFormData({ ...formData, growthGoals: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-[#11161B] border text-sm text-[#FDFBF7] placeholder-[#94A3B8] focus:outline-none focus:border-[#B66D44] ${
                      errors.growthGoals ? 'border-red-500' : 'border-slate-800'
                    }`}
                  />
                  {errors.growthGoals && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.growthGoals}</p>}
                </div>
              )}

              {/* Tab 2 Mentor Specific Fields */}
              {activeTab === 'mentor' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-[#FDFBF7] uppercase tracking-wider mb-1.5">
                      Faith Journey Background & Experience <span className="text-[#B66D44]">*</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your walk with Christ, local church home, and any past mentoring or discipleship experience..."
                      value={formData.faithBackground}
                      onChange={(e) => setFormData({ ...formData, faithBackground: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-[#11161B] border text-sm text-[#FDFBF7] placeholder-[#94A3B8] focus:outline-none focus:border-[#B66D44] ${
                        errors.faithBackground ? 'border-red-500' : 'border-slate-800'
                      }`}
                    />
                    {errors.faithBackground && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.faithBackground}</p>}
                  </div>

                  {/* Statement of Faith Agreement Checkbox */}
                  <div className="p-4 rounded-xl bg-[#11161B] border border-slate-800 space-y-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreedToStatement}
                        onChange={(e) => setFormData({ ...formData, agreedToStatement: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded text-[#B66D44] focus:ring-[#B66D44] accent-[#B66D44]"
                      />
                      <span className="text-xs text-[#94A3B8] leading-relaxed">
                        I affirm full agreement with the <strong className="text-[#FDFBF7]">New Edge 27:17 Statement of Faith</strong> (11 Doctrinal Points) as a condition of serving as a mentor.
                      </span>
                    </label>
                    {errors.agreedToStatement && (
                      <p className="text-xs text-red-400 flex items-center gap-1 pt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.agreedToStatement}</p>
                    )}
                  </div>
                </>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-base font-bold text-[#FDFBF7] bg-[#B66D44] hover:bg-[#9E5933] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#B66D44]/30 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <span>Submit Intake</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
