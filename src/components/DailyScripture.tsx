import React, { useState } from 'react';
import { Quote, Sparkles, ChevronLeft, ChevronRight, Calendar, Bookmark } from 'lucide-react';
import { DAILY_SCRIPTURES } from '../data/scriptures';

export const DailyScripture: React.FC = () => {
  const todayDate = new Date();
  const todayDay = todayDate.getDate(); // 1 - 31
  // Day of month mapped 1:1 to verse index (Index 0 = Day 1, Index 30 = Day 31)
  const defaultIndex = Math.min(Math.max(todayDay - 1, 0), DAILY_SCRIPTURES.length - 1);

  const [currentIndex, setCurrentIndex] = useState<number>(defaultIndex);

  const isToday = currentIndex === defaultIndex;
  const currentScripture = DAILY_SCRIPTURES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DAILY_SCRIPTURES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + DAILY_SCRIPTURES.length) % DAILY_SCRIPTURES.length);
  };

  const handleToday = () => {
    setCurrentIndex(defaultIndex);
  };

  return (
    <section id="daily-verse" className="py-20 bg-[#11161B] relative overflow-hidden border-t border-slate-800">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#B66D44]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#1A2229] border border-[#B66D44]/30 text-xs font-semibold text-[#B66D44] tracking-widest uppercase mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#B66D44]" />
            <span>Daily Iron & Scripture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FDFBF7] tracking-tight mb-3">
            A New Verse Every Day
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            31 daily biblically grounded scriptures and practical discipleship insights — rotating automatically each day of the month.
          </p>
        </div>

        {/* Main Verse Display Card */}
        <div className="bg-gradient-to-br from-[#1A2229] via-[#222B32] to-[#1A2229] rounded-3xl border border-[#B66D44]/40 p-8 sm:p-12 shadow-2xl relative">
          {/* Card Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#11161B] border border-[#B66D44]/30 text-xs font-bold text-[#F8EDE6] flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-[#B66D44]" />
                Day {currentScripture.id} of 31
              </span>

              {isToday && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#B66D44] text-[#FDFBF7] text-[10px] font-extrabold uppercase tracking-wider animate-pulse">
                  Today&apos;s Word
                </span>
              )}
            </div>

            <span className="px-3 py-1 rounded-md bg-[#11161B] text-[11px] font-semibold text-[#B66D44]">
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

          {/* Controls Footer Bar */}
          <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-[#11161B] border border-slate-800 hover:border-[#B66D44] text-[#94A3B8] hover:text-[#FDFBF7] transition-colors"
                title="Previous Day"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-[#11161B] border border-slate-800 hover:border-[#B66D44] text-[#94A3B8] hover:text-[#FDFBF7] transition-colors"
                title="Next Day"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {!isToday && (
              <button
                onClick={handleToday}
                className="px-4 py-2.5 rounded-xl bg-[#B66D44] text-xs font-bold text-[#FDFBF7] hover:bg-[#9E5933] transition-colors shadow-md shadow-[#B66D44]/20"
              >
                Return to Today (Day {todayDay})
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
