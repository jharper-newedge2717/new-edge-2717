import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, UserCheck, Heart } from 'lucide-react';
import { Logo } from './Logo';
import type { ModalTab } from '../types';

interface NavbarProps {
  onOpenModal: (tab?: ModalTab) => void;
  onOpenDonate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal, onOpenDonate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Tracks', href: '#tracks' },
    { name: 'Pathway', href: '#pathway' },
    { name: 'About', href: '#about' },
    { name: 'Daily Verse', href: '#daily-verse' },
    { name: 'Beliefs', href: '#beliefs' },
    { name: 'Readiness Quiz', href: '#quiz' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#11161B]/90 backdrop-blur-md border-b border-[#B66D44]/20 shadow-lg shadow-black/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center focus:outline-none">
            <Logo size="md" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-[#94A3B8] hover:text-[#FDFBF7] transition-colors duration-200 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B66D44] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenDonate}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-[#F8EDE6] bg-[#1A2229] hover:bg-[#222B32] border border-[#B66D44]/40 hover:border-[#B66D44] transition-all duration-200"
            >
              <Heart className="w-3.5 h-3.5 text-[#B66D44] fill-current" />
              <span>Give</span>
            </button>

            <button
              onClick={() => onOpenModal('mentee')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold text-[#FDFBF7] bg-[#B66D44] hover:bg-[#9E5933] transition-all duration-200 shadow-md shadow-[#B66D44]/20 hover:shadow-[#B66D44]/40 active:scale-95"
            >
              <UserCheck className="w-4 h-4" />
              <span>Get Connected</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#94A3B8] hover:text-[#FDFBF7] hover:bg-[#1A2229] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1A2229] border-b border-[#B66D44]/20 px-4 pt-4 pb-6 shadow-2xl animate-fadeIn">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium text-[#94A3B8] hover:text-[#FDFBF7] hover:bg-[#222B32] transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-[#B66D44]" />
              </a>
            ))}
            <div className="pt-3 border-t border-slate-700/50 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal('mentee');
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-[#FDFBF7] bg-[#B66D44] hover:bg-[#9E5933] transition-colors"
              >
                <UserCheck className="w-4 h-4" />
                <span>Find a Mentor</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDonate();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-[#FDFBF7] bg-[#222B32] hover:bg-[#2A3642] border border-[#B66D44]/40 transition-colors"
              >
                <Heart className="w-4 h-4 text-[#B66D44] fill-current" />
                <span>Donate / Partner</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
