import { Navbar }              from "@/components/layout/Navbar";
import { Footer }              from "@/components/layout/Footer";
import { HeroSection }         from "@/components/sections/HeroSection";
import { SkillsSection }       from "@/components/sections/SkillsSection";
import { ProcessSection }      from "@/components/sections/ProcessSection";
import { ProjectsSection }     from "@/components/sections/ProjectsSection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { GuestbookSection }      from "@/components/sections/GuestbookSection";
import { ContactSection }      from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SkillsSection />
        <ProcessSection />
        <ProjectsSection />
        <CertificatesSection />
        <GuestbookSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
