import { MapPin, Mail, Phone, ArrowUp, Heart } from 'lucide-react';
import { Logo } from './Logo';
import type { ModalTab } from '../types';

interface FooterProps {
  onOpenModal: (tab: ModalTab) => void;
  onOpenDonate: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal, onOpenDonate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#11161B] text-[#94A3B8] border-t border-[#B66D44]/30 relative pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Logo size="lg" />
            <p className="text-sm leading-relaxed max-w-md text-[#94A3B8]">
              Christ-centered mentorship walking alongside men, women, and young adults in Washoe County, NV as they grow in faith, character, and calling.
            </p>

            <div className="p-4 rounded-xl bg-[#1A2229] border border-slate-800 text-xs text-[#F8EDE6]/90 italic font-serif">
              &ldquo;As iron sharpens iron, so one person sharpens another.&rdquo;
              <span className="block not-italic font-sans font-bold text-[#B66D44] mt-1 uppercase text-[10px] tracking-wider">
                — Proverbs 27:17
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#FDFBF7] uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#tracks" className="hover:text-[#FDFBF7] transition-colors">Ministry Tracks</a>
              </li>
              <li>
                <a href="#pathway" className="hover:text-[#FDFBF7] transition-colors">Discipleship Pathway</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#FDFBF7] transition-colors">Why We Exist (Gospel)</a>
              </li>
              <li>
                <a href="#beliefs" className="hover:text-[#FDFBF7] transition-colors">Statement of Faith</a>
              </li>
              <li>
                <a href="#quiz" className="hover:text-[#FDFBF7] transition-colors">Readiness Assessment</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#FDFBF7] transition-colors">FAQ & Answers</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Get Connected & Contact */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-[#FDFBF7] uppercase tracking-wider">Connect & Location</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#FDFBF7]">
                <MapPin className="w-4 h-4 text-[#B66D44] shrink-0" />
                <span>Washoe County / Reno, NV</span>
              </div>
              <a
                href="mailto:jharper@newedge2717.com"
                className="flex items-center gap-2 text-[#94A3B8] hover:text-[#FDFBF7] transition-colors group"
              >
                <Mail className="w-4 h-4 text-[#B66D44] group-hover:text-[#FDFBF7] shrink-0 transition-colors" />
                <span className="group-hover:underline">jharper@newedge2717.com</span>
              </a>
              <a
                href="tel:7752717646"
                className="flex items-center gap-2 text-[#94A3B8] hover:text-[#FDFBF7] transition-colors group"
              >
                <Phone className="w-4 h-4 text-[#B66D44] group-hover:text-[#FDFBF7] shrink-0 transition-colors" />
                <span className="group-hover:underline">(775) 27:17-MIN</span>
              </a>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => onOpenModal('mentee')}
                className="px-4 py-2.5 rounded-lg text-xs font-bold text-[#FDFBF7] bg-[#B66D44] hover:bg-[#9E5933] transition-colors text-center"
              >
                Find a Mentor
              </button>
              <button
                onClick={onOpenDonate}
                className="px-4 py-2.5 rounded-lg text-xs font-bold text-[#F8EDE6] bg-[#1A2229] hover:bg-[#222B32] border border-[#B66D44]/40 transition-colors flex items-center justify-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 text-[#B66D44] fill-current" />
                <span>Donate</span>
              </button>
            </div>
          </div>
        </div>

        {/* Legal Notice & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-semibold text-[#FDFBF7]">
              New Edge 27:17 Ministries — A Nevada Nonprofit Corporation
            </p>
            <p className="text-[#94A3B8]/80 text-[11px]">
              (501(c)(3) tax-exempt status pending) • Washoe County / Reno, NV
            </p>
            <p className="text-[#94A3B8]/60 text-[10px] pt-1">
              &copy; {new Date().getFullYear()} New Edge 27:17 Ministries. All rights reserved.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-[#1A2229] border border-slate-800 text-[#B66D44] hover:text-[#FDFBF7] hover:bg-[#222B32] transition-colors"
            title="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
