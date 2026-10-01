import { useState, useEffect } from 'react';
import { X, Heart, ShieldCheck, AlertCircle, Sparkles, Building2, Repeat, Clock } from 'lucide-react';
import type { DonateFormData } from '../types';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount?: number;
  initialFrequency?: 'monthly' | 'one_time';
}

export const DonateModal: React.FC<DonateModalProps> = ({
  isOpen,
  onClose,
  initialAmount = 50,
  initialFrequency = 'monthly'
}) => {
  const [formData, setFormData] = useState<DonateFormData>({
    frequency: initialFrequency,
    amount: initialAmount,
    customAmount: '',
    name: '',
    email: '',
    paymentMethod: 'card'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsSubmitted(false);
    setErrors({});
    setFormData((prev) => ({
      ...prev,
      amount: initialAmount,
      frequency: initialFrequency
    }));
  }, [isOpen, initialAmount, initialFrequency]);

  if (!isOpen) return null;

  const monthlyTiers = [
    {
      amount: 30,
      label: '$30 / mo',
      impact: 'Covers background screening & training for 1 new mentor.'
    },
    {
      amount: 50,
      label: '$50 / mo',
      impact: 'Funds study curriculum & guides for 1 mentor-mentee pair.'
    },
    {
      amount: 100,
      label: '$100 / mo',
      impact: 'Supports Young Adult Discipleship weekly venue space & food.'
    },
    {
      amount: 250,
      label: '$250 / mo',
      impact: 'Sponsors quarterly brotherhood & women’s fellowship events.'
    }
  ];

  const oneTimeTiers = [
    {
      amount: 50,
      label: '$50',
      impact: 'Purchases core study materials for a mentor-mentee pair.'
    },
    {
      amount: 150,
      label: '$150',
      impact: 'Fully sponsors background screening & training for 1 mentor.'
    },
    {
      amount: 300,
      label: '$300',
      impact: 'Sponsors 2 young adults for the annual off-site retreat.'
    },
    {
      amount: 500,
      label: '$500',
      impact: 'Underwrites a community-wide iron-sharpening workshop.'
    }
  ];

  const activeGivingTiers = formData.frequency === 'monthly' ? monthlyTiers : oneTimeTiers;

  const getEffectiveAmount = (): number => {
    if (formData.amount === 0) {
      return parseFloat(formData.customAmount || '0') || 0;
    }
    return formData.amount;
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Valid email is required';
    if (getEffectiveAmount() <= 0) errs.amount = 'Please select or enter a valid donation amount';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitted(true);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setFormData({
      frequency: 'monthly',
      amount: 50,
      customAmount: '',
      name: '',
      email: '',
      paymentMethod: 'card'
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-[#1A2229] border border-[#B66D44]/40 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-[#11161B] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#B66D44]/20 border border-[#B66D44]/30 text-[#B66D44]">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-[#FDFBF7]">Support the Mission</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#B66D44]/20 text-[10px] font-bold text-[#B66D44] border border-[#B66D44]/30 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#B66D44]" />
                  Coming Soon (501c3 Pending)
                </span>
              </div>
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

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {isSubmitted ? (
            /* Success Confirmation Screen */
            <div className="text-center py-8 space-y-6 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-[#B66D44]/20 border-2 border-[#B66D44] flex items-center justify-center text-[#B66D44] mx-auto shadow-lg shadow-[#B66D44]/20">
                <Sparkles className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#B66D44] uppercase tracking-widest">
                  Early Pledge Registered
                </span>
                <h4 className="text-2xl font-extrabold text-[#FDFBF7] mt-1 mb-2">
                  Thank You, {formData.name}!
                </h4>
                <p className="text-sm text-[#94A3B8] max-w-md mx-auto leading-relaxed">
                  We have registered your pledged {formData.frequency === 'monthly' ? 'monthly' : 'one-time'} support of{' '}
                  <strong className="text-[#FDFBF7]">${getEffectiveAmount()}</strong>. We will notify you at{' '}
                  <strong className="text-[#FDFBF7]">{formData.email}</strong> as soon as online giving officially launches upon final 501(c)(3) determination!
                </p>
              </div>

              {/* Legal & Tax Notice Box */}
              <div className="p-4 rounded-2xl bg-[#11161B] border border-slate-800 text-left max-w-md mx-auto space-y-2 text-xs text-[#94A3B8]">
                <div className="flex items-center gap-2 font-bold text-[#F8EDE6] uppercase tracking-wider">
                  <Building2 className="w-4 h-4 text-[#B66D44]" />
                  <span>Stewardship & Governance Notice</span>
                </div>
                <p>
                  New Edge 27:17 Ministries is a Nevada Nonprofit Corporation (501(c)(3) tax-exempt status pending).
                </p>
                <p className="text-[11px] text-[#94A3B8]/70 italic">
                  *This submission was processed in Demo Mode. No actual charge occurred.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={resetAndClose}
                  className="px-8 py-3 rounded-xl text-sm font-bold text-[#FDFBF7] bg-[#B66D44] hover:bg-[#9E5933] transition-colors"
                >
                  Close & Return Home
                </button>
              </div>
            </div>
          ) : (
            /* Donation Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Frequency Selector */}
              <div className="grid grid-cols-2 bg-[#11161B] p-1.5 rounded-2xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, frequency: 'monthly' })}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    formData.frequency === 'monthly'
                      ? 'bg-[#B66D44] text-[#FDFBF7] shadow-md'
                      : 'text-[#94A3B8] hover:text-[#FDFBF7]'
                  }`}
                >
                  <Repeat className="w-3.5 h-3.5" />
                  <span>Give Monthly (Partner)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, frequency: 'one_time' })}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    formData.frequency === 'one_time'
                      ? 'bg-[#B66D44] text-[#FDFBF7] shadow-md'
                      : 'text-[#94A3B8] hover:text-[#FDFBF7]'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>One-Time Gift</span>
                </button>
              </div>

              {/* Giving Tiers Grid */}
              <div>
                <label className="block text-xs font-bold text-[#FDFBF7] uppercase tracking-wider mb-2">
                  Select Giving Tier {formData.frequency === 'monthly' && '(Monthly)'} <span className="text-[#B66D44]">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {activeGivingTiers.map((tier) => (
                    <button
                      key={tier.amount}
                      type="button"
                      onClick={() => setFormData({ ...formData, amount: tier.amount, customAmount: '' })}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        formData.amount === tier.amount
                          ? 'bg-[#B66D44] text-[#FDFBF7] border-[#B66D44] shadow-md'
                          : 'bg-[#11161B] text-[#94A3B8] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-base font-extrabold text-[#FDFBF7] mb-1">{tier.label}</div>
                      <div className="text-[10px] leading-tight opacity-90">{tier.impact}</div>
                    </button>
                  ))}
                </div>

                {/* Custom Amount Field */}
                <div className="mt-3">
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#94A3B8] font-bold">$</span>
                    <input
                      type="number"
                      placeholder="Or enter custom amount..."
                      value={formData.customAmount}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          amount: 0,
                          customAmount: e.target.value
                        });
                      }}
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-[#11161B] border border-slate-800 text-sm text-[#FDFBF7] placeholder-[#94A3B8] focus:outline-none focus:border-[#B66D44]"
                    />
                  </div>
                  {errors.amount && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.amount}</p>}
                </div>
              </div>

              {/* Name & Email Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#FDFBF7] uppercase tracking-wider mb-1.5">
                    Your Full Name <span className="text-[#B66D44]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Caleb Miller"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#11161B] border text-sm text-[#FDFBF7] placeholder-[#94A3B8] focus:outline-none focus:border-[#B66D44] ${
                      errors.name ? 'border-red-500' : 'border-slate-800'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#FDFBF7] uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-[#B66D44]">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="caleb@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#11161B] border text-sm text-[#FDFBF7] placeholder-[#94A3B8] focus:outline-none focus:border-[#B66D44] ${
                      errors.email ? 'border-red-500' : 'border-slate-800'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.email}</p>}
                </div>
              </div>

              {/* Payment Method Switcher */}
              <div>
                <label className="block text-xs font-bold text-[#FDFBF7] uppercase tracking-wider mb-1.5">
                  Payment Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'card', name: 'Credit Card / Apple Pay' },
                    { id: 'paypal', name: 'PayPal / Venmo' },
                    { id: 'check', name: 'Zelle / Mail Check' }
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: pm.id as any })}
                      className={`py-2 px-3 rounded-xl text-[11px] font-bold border transition-colors ${
                        formData.paymentMethod === pm.id
                          ? 'bg-[#222B32] text-[#FDFBF7] border-[#B66D44]'
                          : 'bg-[#11161B] text-[#94A3B8] border-slate-800'
                      }`}
                    >
                      {pm.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Legal Notice Footer */}
              <div className="flex items-center gap-2 text-[11px] text-[#94A3B8]/80 bg-[#11161B] p-3 rounded-xl border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-[#B66D44] shrink-0" />
                <span>New Edge 27:17 Ministries • Nevada 501(c)(3) status pending. 100% focused on Washoe County.</span>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="button"
                  disabled={true}
                  className="w-full py-4 rounded-xl text-sm font-bold text-[#94A3B8] bg-[#11161B] border border-[#B66D44]/30 cursor-not-allowed opacity-75 flex items-center justify-center gap-2"
                >
                  <Clock className="w-4 h-4 text-[#B66D44]" />
                  <span>Send Gift (Disabled — Online Giving Launching Soon)</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
