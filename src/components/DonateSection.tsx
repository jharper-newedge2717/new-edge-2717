import React, { useState } from 'react';
import { Heart, Repeat, ShieldCheck, ArrowRight, Sparkles, CheckCircle2, Info, Clock } from 'lucide-react';

interface DonateSectionProps {
  onOpenDonate: (amount?: number, frequency?: 'monthly' | 'one_time') => void;
}

export const DonateSection: React.FC<DonateSectionProps> = ({ onOpenDonate }) => {
  const [frequency, setFrequency] = useState<'monthly' | 'one_time'>('monthly');

  const monthlyTiers = [
    {
      amount: 30,
      title: 'Mentor Readiness',
      subtitle: '$30 / month',
      badge: 'Mentor Partner',
      impact: 'Covers background check screening fees and initial mentor training materials for 1 new mentor.',
      features: ['1 Mentor Background Check', 'Mentor Training Workbook', 'Pastoral Vetting Support']
    },
    {
      amount: 50,
      title: 'Discipleship Pair',
      subtitle: '$50 / month',
      badge: 'Most Popular',
      impact: 'Funds core teaching curriculum and study guides for 1 mentor-mentee pair for a full year.',
      features: ['2 Core Curriculum Books', 'Bi-Weekly Study Guides', 'Quarterly Progress Tracking']
    },
    {
      amount: 100,
      title: 'Young Adult Discipleship',
      subtitle: '$100 / month',
      badge: 'Community Sponsor',
      impact: 'Supports venue space, weekly refreshments, and teaching materials for the 18+ post-high-school track.',
      features: ['Weekly Gathering Venue', 'Refreshments & Food', 'Off-Site Retreat Scholarship Fund']
    },
    {
      amount: 250,
      title: 'Cohort Fellowship',
      subtitle: '$250 / month',
      badge: 'Ministry Catalyst',
      impact: 'Sponsors quarterly brotherhood and women’s fellowship gatherings across Washoe County.',
      features: ['Quarterly Fellowship Events', 'Track Leader Development', 'Community Outreach Events']
    }
  ];

  const oneTimeTiers = [
    {
      amount: 50,
      title: 'Curriculum Gift',
      subtitle: '$50 One-Time',
      badge: 'Direct Impact',
      impact: 'Purchases a full set of core discipleship study materials for a newly matched mentor-mentee pair.',
      features: ['2 Study Guides & Workbooks', 'Discipleship Growth Binder', 'Biblical Study Series']
    },
    {
      amount: 150,
      title: 'Mentor Cohort Sponsor',
      subtitle: '$150 One-Time',
      badge: 'Most Popular',
      impact: 'Fully sponsors background check, reference checks, and training materials for 1 mentor candidate.',
      features: ['Background & Vetting Fee', 'Mentor Training Cohort', 'Leader Equipping Pack']
    },
    {
      amount: 300,
      title: 'Retreat Scholarship',
      subtitle: '$300 One-Time',
      badge: 'Student Sponsor',
      impact: 'Provides full off-site retreat scholarships for 2 young adults navigating post-high-school faith.',
      features: ['2 Retreat Registration Fees', 'Lodging & Meal Coverage', 'Discipleship Materials']
    },
    {
      amount: 500,
      title: 'Regional Workshop',
      subtitle: '$500 One-Time',
      badge: 'Community Catalyst',
      impact: 'Underwrites a community-wide iron-sharpening workshop for mentors across Washoe County.',
      features: ['Workshop Venue & AV', 'Guest Speaker & Training', 'Community Leader Packets']
    }
  ];

  const activeTiers = frequency === 'monthly' ? monthlyTiers : oneTimeTiers;

  return (
    <section id="give" className="py-24 bg-[#1A2229] border-t border-slate-800 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#B66D44]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#11161B] border border-[#B66D44]/30 text-xs font-semibold text-[#B66D44] tracking-widest uppercase">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Financial Partnership</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B66D44]/20 border border-[#B66D44]/40 text-xs font-bold text-[#F8EDE6]">
              <Clock className="w-3.5 h-3.5 text-[#B66D44]" />
              <span>Coming Soon • 501(c)(3) Pending</span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FDFBF7] tracking-tight mb-4">
            Invest in Sharpening Lives Across Washoe County
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8]">
            Mentorship is 100% free for mentees. Your financial support directly equips mentors, provides curriculum, and builds lasting discipleship community in Reno.
          </p>

          {/* Coming Soon Alert Box */}
          <div className="mt-6 p-4 rounded-2xl bg-[#11161B]/90 border border-[#B66D44]/40 text-xs text-[#94A3B8] max-w-xl mx-auto flex items-start gap-3 text-left shadow-lg">
            <Clock className="w-5 h-5 text-[#B66D44] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-[#FDFBF7]">Online Giving Launching Soon:</strong> We are currently completing our official Nevada 501(c)(3) incorporation & tax-exempt determination. You can preview our giving tiers below or pledge early support to be notified upon launch!
            </p>
          </div>

          {/* Monthly vs One-Time Frequency Switcher */}
          <div className="flex flex-col items-center gap-3 mt-8">
            <div className="inline-flex bg-[#11161B] p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => setFrequency('monthly')}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  frequency === 'monthly'
                    ? 'bg-[#B66D44] text-[#FDFBF7] shadow-md shadow-[#B66D44]/20'
                    : 'text-[#94A3B8] hover:text-[#FDFBF7]'
                }`}
              >
                <Repeat className="w-3.5 h-3.5" />
                <span>Give Monthly (Sharpening Partner)</span>
              </button>

              <button
                onClick={() => setFrequency('one_time')}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  frequency === 'one_time'
                    ? 'bg-[#B66D44] text-[#FDFBF7] shadow-md shadow-[#B66D44]/20'
                    : 'text-[#94A3B8] hover:text-[#FDFBF7]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>One-Time Gift</span>
              </button>
            </div>

            {/* Explanatory note on monthly recurring processing */}
            <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] bg-[#11161B]/60 px-3 py-1.5 rounded-full border border-slate-800/80">
              <Info className="w-3.5 h-3.5 text-[#B66D44]" />
              <span>
                {frequency === 'monthly'
                  ? 'Monthly partnerships are processed securely via Stripe/PayPal with automated monthly receipts — no user account creation required.'
                  : 'One-time gifts provide immediate equipment and study materials for mentors & mentees.'}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Giving Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {activeTiers.map((tier) => (
            <div
              key={tier.amount}
              className={`flex flex-col justify-between bg-[#11161B] rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-xl ${
                tier.badge === 'Most Popular'
                  ? 'border-[#B66D44] shadow-[#B66D44]/15'
                  : 'border-slate-800 hover:border-[#B66D44]/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-[#1A2229] border border-[#B66D44]/30 text-[10px] font-bold text-[#B66D44] uppercase tracking-wider">
                    {tier.badge}
                  </span>
                  <Heart className="w-5 h-5 text-[#B66D44]" />
                </div>

                <h3 className="text-lg font-bold text-[#FDFBF7] mb-1">{tier.title}</h3>
                <div className="text-2xl font-black text-[#B66D44] mb-3">
                  ${tier.amount}
                  <span className="text-xs font-normal text-[#94A3B8]">
                    {frequency === 'monthly' ? ' / month' : ' one-time'}
                  </span>
                </div>

                <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                  {tier.impact}
                </p>

                {/* Features checklist */}
                <div className="space-y-2 pt-4 border-t border-slate-800/80 mb-6">
                  {tier.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#FDFBF7]/90">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B66D44] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onOpenDonate(tier.amount, frequency)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  tier.badge === 'Most Popular'
                    ? 'bg-[#B66D44] hover:bg-[#9E5933] text-[#FDFBF7] shadow-lg shadow-[#B66D44]/30'
                    : 'bg-[#1A2229] hover:bg-[#222B32] text-[#FDFBF7] border border-[#B66D44]/40 hover:border-[#B66D44]'
                }`}
              >
                <span>Give ${tier.amount} {frequency === 'monthly' ? 'Monthly' : 'One-Time'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Custom Amount / Stewardship Banner */}
        <div className="bg-[#11161B] rounded-3xl border border-[#B66D44]/30 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#B66D44] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Nevada 501(c)(3) Nonprofit Ministry</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#FDFBF7]">
              Desire to Give a Custom Amount or Mail a Check?
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl leading-relaxed">
              Every dollar goes directly toward program training, background screenings, and discipleship curriculum across Reno.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => onOpenDonate(0, frequency)}
              className="px-6 py-3.5 rounded-xl text-xs font-bold text-[#FDFBF7] bg-[#B66D44] hover:bg-[#9E5933] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#B66D44]/20"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Give Custom Gift</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
