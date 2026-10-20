import { HeroSection } from "@/components/sections/HeroSection";
import {
  BrandStory,
  GalleryPreview,
  HowItWorks,
  ServicesHighlight,
  SignatureMenu,
  SignaturePackages,
  WhyUs,
} from "@/components/sections/HomeSections";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandStory />
      <ServicesHighlight />
      <SignatureMenu />
      <WhyUs />
      <SignaturePackages />
      <GalleryPreview />
      <HowItWorks />
      <Testimonials />
      <CtaBand />
    </>
  );
}
