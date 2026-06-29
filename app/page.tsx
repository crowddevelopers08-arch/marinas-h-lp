import { BookingModal } from "@/components/hernia/BookingModal";
import { BenefitsSection } from "@/components/hernia/BenefitsSection";
import { BeforeAfterSection } from "@/components/hernia/BeforeAfterSection";
import { ConsultationSection } from "@/components/hernia/ConsultationSection";
import { DoctorSection } from "@/components/hernia/DoctorSection";
import { FaqSection } from "@/components/hernia/FaqSection";
import { FinalCtaSection } from "@/components/hernia/FinalCtaSection";
import { Footer } from "@/components/hernia/Footer";
import { Header } from "@/components/hernia/Header";
import { HeroSection } from "@/components/hernia/HeroSection";
import { ImageCarouselSection } from "@/components/hernia/ImageCarouselSection";
import { MistakeSection } from "@/components/hernia/MistakeSection";
import { StickyBar } from "@/components/hernia/StickyBar";
import { StatsBanner } from "@/components/hernia/StatsBanner";
import { StoriesSection } from "@/components/hernia/StoriesSection";
import { SymptomCheckSection } from "@/components/hernia/SymptomCheckSection";
import { TrustStrip } from "@/components/hernia/TrustStrip";
import { WhoShouldBookSection } from "@/components/hernia/WhoShouldBookSection";
import { WomenSection } from "@/components/hernia/WomenSection";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <TrustStrip />
      <StatsBanner />
      <SymptomCheckSection />
      <ImageCarouselSection />
      <MistakeSection />
      <WomenSection />
      <DoctorSection />
      <BenefitsSection />
      <BeforeAfterSection />
      <StoriesSection />
      <ConsultationSection />
      <WhoShouldBookSection />
      <FinalCtaSection />
      <FaqSection />
      <Footer />
      <StickyBar />
      <BookingModal />
    </>
  );
}
