import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TracksGrid } from './components/TracksGrid';
import { DiscipleshipPathway } from './components/DiscipleshipPathway';
import { GospelCallout } from './components/GospelCallout';
import { StatementOfFaith } from './components/StatementOfFaith';
import { DailyScripture } from './components/DailyScripture';
import { MentorshipQuiz } from './components/MentorshipQuiz';
import { DonateSection } from './components/DonateSection';
import { BudgetOverview } from './components/BudgetOverview';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { IntakeModal } from './components/IntakeModal';
import { DonateModal } from './components/DonateModal';
import type { ModalTab, TrackId } from './types';

export function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<ModalTab>('mentee');
  const [modalTrack, setModalTrack] = useState<TrackId>('mens');

  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [donateAmount, setDonateAmount] = useState<number>(50);
  const [donateFrequency, setDonateFrequency] = useState<'monthly' | 'one_time'>('monthly');

  const handleOpenModal = (tab: ModalTab = 'mentee', trackId: TrackId = 'mens') => {
    setModalTab(tab);
    setModalTrack(trackId);
    setModalOpen(true);
  };

  const handleOpenDonate = (amount = 50, frequency: 'monthly' | 'one_time' = 'monthly') => {
    setDonateAmount(amount);
    setDonateFrequency(frequency);
    setDonateModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#11161B] text-[#FDFBF7] selection:bg-[#B66D44] selection:text-[#FDFBF7]">
      {/* Navigation */}
      <Navbar onOpenModal={handleOpenModal} onOpenDonate={() => handleOpenDonate(50, 'monthly')} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero onOpenModal={handleOpenModal} onOpenDonate={() => handleOpenDonate(50, 'monthly')} />

        {/* Ministry Tracks Grid (3 Cards) */}
        <TracksGrid onOpenModal={handleOpenModal} />

        {/* The Discipleship Pathway (4-Step Process) */}
        <DiscipleshipPathway />

        {/* Gospel Callout / Why We Exist */}
        <GospelCallout onOpenModal={handleOpenModal} />

        {/* Daily Iron & Scripture (31 Daily Rotating Verses) */}
        <DailyScripture />

        {/* Statement of Faith Accordion */}
        <StatementOfFaith />

        {/* Interactive Readiness Assessment Quiz */}
        <MentorshipQuiz onOpenModal={handleOpenModal} />

        {/* Dedicated Giving / Financial Partnership Section */}
        <DonateSection onOpenDonate={handleOpenDonate} />

        {/* Governance & Stewardship Transparency */}
        <BudgetOverview onOpenDonate={() => handleOpenDonate(50, 'monthly')} />

        {/* FAQ Section */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer onOpenModal={handleOpenModal} onOpenDonate={() => handleOpenDonate(50, 'monthly')} />

      {/* Dual-Tab Intake Modal */}
      <IntakeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultTab={modalTab}
        defaultTrack={modalTrack}
      />

      {/* Donate Modal (Demo Mode) */}
      <DonateModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        initialAmount={donateAmount}
        initialFrequency={donateFrequency}
      />
    </div>
  );
}

export default App;
