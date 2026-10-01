import React from 'react';
import { Quote, Sparkles, Calendar, BookOpen } from 'lucide-react';
import { DAILY_SCRIPTURES } from '../data/scriptures';

export const DailyScripture: React.FC = () => {
  const todayDate = new Date();
  const todayDay = todayDate.getDate(); // 1 - 31
  const todayIndex = Math.min(Math.max(todayDay - 1, 0), DAILY_SCRIPTURES.length - 1);
  const currentScripture = DAILY_SCRIPTURES[todayIndex];

  return (
    <section id="daily-verse" className="py-20 bg-[#11161B] relative overflow-hidden border-t border-slate-800">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#B66D44]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#1A2229] border border-[#B66D44]/30 text-xs font-semibold text-[#B66D44] tracking-widest uppercase mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#B66D44]" />
            <span>Daily Iron & Scripture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FDFBF7] tracking-tight mb-3">
            Today&apos;s Scripture
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            A daily biblically grounded verse and reflection to encourage and sharpen your walk.
          </p>
        </div>

        {/* Main Verse Display Card */}
        <div className="bg-gradient-to-br from-[#1A2229] via-[#222B32] to-[#1A2229] rounded-3xl border border-[#B66D44]/40 p-8 sm:p-12 shadow-2xl relative">
          {/* Card Top Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#B66D44]/20 border border-[#B66D44]/40 text-xs font-bold text-[#F8EDE6] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#B66D44]" />
                Daily Word
              </span>
            </div>

            <span className="px-3 py-1 rounded-md bg-[#11161B] text-[11px] font-semibold text-[#B66D44] border border-slate-800">
              {currentScripture.theme}
            </span>
          </div>

          {/* Scripture Quote */}
          <div className="relative py-4 space-y-6">
            <Quote className="w-12 h-12 text-[#B66D44]/30 absolute -top-4 -left-2 pointer-events-none" />

            <p className="text-xl sm:text-3xl font-serif italic text-[#FDFBF7] leading-relaxed relative z-10 pl-6 border-l-2 border-[#B66D44]">
              &ldquo;{currentScripture.verse}&rdquo;
            </p>

            <div className="flex justify-end pt-2">
              <span className="text-base sm:text-lg font-sans font-extrabold text-[#B66D44] tracking-wide">
                — {currentScripture.reference}
              </span>
            </div>
          </div>

          {/* Practical Application Callout Box */}
          <div className="mt-8 p-5 rounded-2xl bg-[#11161B]/90 border border-slate-800 space-y-1 text-xs">
            <div className="font-bold text-[#F8EDE6] uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#B66D44]" />
              <span>Discipleship Takeaway:</span>
            </div>
            <p className="text-[#94A3B8] leading-relaxed sm:text-sm">
              {currentScripture.application}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
