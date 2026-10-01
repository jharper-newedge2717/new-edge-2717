import React, { useState } from 'react';
import { UserPlus, GitMerge, Zap, Users, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { PATHWAY_STEPS } from '../data/pathway';

export const DiscipleshipPathway: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const getStepIcon = (iconName: string, isActive: boolean) => {
    const iconClass = isActive ? "w-6 h-6 text-[#FDFBF7]" : "w-6 h-6 text-[#B66D44]";
    switch (iconName) {
      case 'UserPlus': return <UserPlus className={iconClass} />;
      case 'GitMerge': return <GitMerge className={iconClass} />;
      case 'Zap': return <Zap className={iconClass} />;
      case 'Users': return <Users className={iconClass} />;
      default: return <UserPlus className={iconClass} />;
    }
  };

  return (
    <section id="pathway" className="py-24 bg-[#1A2229] border-y border-slate-800/80 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B66D44]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#11161B] border border-[#B66D44]/30 text-xs font-semibold text-[#B66D44] tracking-widest uppercase mb-4">
            Proven Process
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FDFBF7] tracking-tight mb-4">
            The Discipleship Pathway
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8]">
            From initial connection to reproducing mentors, our 4-step framework ensures every pair walks with clear direction and intentionality.
          </p>
        </div>

        {/* Desktop Horizontal Step Navigation Tabs */}
        <div className="hidden lg:grid grid-cols-4 gap-4 mb-12 relative">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />

          {PATHWAY_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStep(idx)}
                className={`relative z-10 p-6 rounded-2xl flex flex-col items-center text-center transition-all duration-300 ${
                  isActive
                    ? 'bg-[#222B32] border-2 border-[#B66D44] shadow-xl shadow-[#B66D44]/15 scale-105'
                    : 'bg-[#11161B]/80 border border-slate-800 hover:border-[#B66D44]/40 hover:bg-[#11161B]'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all ${
                    isActive
                      ? 'bg-[#B66D44] shadow-md shadow-[#B66D44]/40'
                      : 'bg-[#1A2229] border border-[#B66D44]/30'
                  }`}
                >
                  {getStepIcon(step.iconName, isActive)}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#B66D44] mb-1">
                  Step 0{step.stepNumber}
                </div>
                <h3 className="text-lg font-bold text-[#FDFBF7] mb-1">{step.title}</h3>
                <div className="text-xs text-[#94A3B8] font-medium">{step.duration}</div>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Card Container */}
        <div className="bg-[#11161B] rounded-2xl border border-[#B66D44]/30 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#B66D44] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider">
                  Step 0{PATHWAY_STEPS[activeStep].stepNumber} of 4
                </span>
                <span className="flex items-center gap-1.5 text-xs text-[#94A3B8] font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#B66D44]" />
                  {PATHWAY_STEPS[activeStep].duration}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-[#FDFBF7] mb-2">
                  {PATHWAY_STEPS[activeStep].title}: <span className="text-[#B66D44] font-normal text-xl sm:text-2xl">{PATHWAY_STEPS[activeStep].tagline}</span>
                </h3>
                <p className="text-base text-[#94A3B8] leading-relaxed">
                  {PATHWAY_STEPS[activeStep].description}
                </p>
              </div>

              {/* Action items checklist */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="text-xs font-bold text-[#F8EDE6] uppercase tracking-wider">
                  Key Actions & Milestones:
                </div>
                {PATHWAY_STEPS[activeStep].keyActions.map((action, actionIdx) => (
                  <div key={actionIdx} className="flex items-center gap-3 text-sm text-[#FDFBF7]">
                    <CheckCircle2 className="w-5 h-5 text-[#B66D44] shrink-0" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>

              {/* Mobile Step Selector Buttons */}
              <div className="lg:hidden flex items-center justify-between pt-6 border-t border-slate-800">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-[#1A2229] text-[#94A3B8] disabled:opacity-40"
                >
                  Previous Step
                </button>
                <div className="text-xs font-bold text-[#B66D44]">
                  {activeStep + 1} / 4
                </div>
                <button
                  disabled={activeStep === PATHWAY_STEPS.length - 1}
                  onClick={() => setActiveStep((prev) => Math.min(PATHWAY_STEPS.length - 1, prev + 1))}
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-[#B66D44] text-[#FDFBF7] disabled:opacity-40"
                >
                  Next Step
                </button>
              </div>
            </div>

            {/* Right Graphic Box */}
            <div className="lg:col-span-5 bg-[#1A2229] rounded-xl border border-slate-800 p-6 flex flex-col justify-center items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-2xl bg-[#B66D44]/15 border border-[#B66D44]/40 flex items-center justify-center">
                {getStepIcon(PATHWAY_STEPS[activeStep].iconName, false)}
              </div>
              <h4 className="text-xl font-bold text-[#FDFBF7]">
                {PATHWAY_STEPS[activeStep].title} Focus
              </h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                {activeStep === 0 && "We remove barriers so you can have an honest initial conversation with no pressure."}
                {activeStep === 1 && "Pairings are carefully prayed over and evaluated for maximum long-term growth compatibility."}
                {activeStep === 2 && "Bi-weekly rhythms keep mentorship consistent, focused on Christ, and practical for everyday life."}
                {activeStep === 3 && "The ultimate outcome: discipled believers stepping up to disciple others."}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B66D44]">
                  Proverbs 27:17 Guided <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Dual Delivery Model Callout (1:1 Mentorship & Small Group Discipleship) */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#11161B] via-[#1A2229] to-[#11161B] border border-[#B66D44]/40 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="px-3 py-1 rounded-full bg-[#B66D44]/20 border border-[#B66D44]/40 text-xs font-bold text-[#F8EDE6] uppercase tracking-wider">
              Flexible Ministry Delivery
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FDFBF7] mt-3 mb-2">
              Two Models, One Mission
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Whether you thrive in deep 1-on-1 accountability or a vibrant small group, New Edge 27:17 offers both structured formats across all three tracks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: 1-on-1 Mentorship */}
            <div className="p-6 rounded-2xl bg-[#11161B] border border-slate-800 space-y-4 hover:border-[#B66D44]/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#B66D44]/15 text-[#B66D44]">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#FDFBF7]">1-on-1 Mentorship Model</h4>
                  <p className="text-xs text-[#94A3B8]">Individual pairing • 6–12 Month Arc</p>
                </div>
              </div>

              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Single mentor matched 1-on-1 with a mentee for maximum personal depth, tailored spiritual goal setting, and private accountability.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-[#FDFBF7]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B66D44]" />
                  <span>Customized meeting times & public check-in locations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B66D44]" />
                  <span>Direct mentor milestone verification every month</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B66D44]" />
                  <span>Deep focus on personal spiritual application</span>
                </div>
              </div>
            </div>

            {/* Card 2: Small Group Discipleship */}
            <div className="p-6 rounded-2xl bg-[#11161B] border border-[#B66D44]/50 space-y-4 relative overflow-hidden">
              <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#B66D44] text-[10px] font-bold text-[#FDFBF7] uppercase tracking-wider">
                Multiplication Model
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#B66D44]/25 text-[#B66D44]">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#FDFBF7]">Small Group Discipleship</h4>
                  <p className="text-xs text-[#94A3B8]">4–8 Members • Group Leader + Pairs</p>
                </div>
              </div>

              <p className="text-xs text-[#94A3B8] leading-relaxed">
                One Group Leader facilitates 4–8 members with weekly group discussion (30m) + nested accountability pairs/triads (20m) for deep vulnerability.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-[#FDFBF7]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B66D44]" />
                  <span>Dual Confidentiality: Group-level & Pair-level privacy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B66D44]" />
                  <span>3 Pace Options: 6 Mo (Accelerated), 9 Mo, 12 Mo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B66D44]" />
                  <span>Group Multiplication: Leaders seed & commission new groups</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
