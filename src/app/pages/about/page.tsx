'use client';

import {
  AboutPageHero,
  ProfileCard,
  DualCardSection,
} from '@/components/features/about';
import { CtaSection } from '@/components/ui/CtaSection';
import {
  aboutPageHeroInfo,
  profileCardInfo,
  twoWorldsSectionInfo,
  aboutCtaSectionInfo,
} from '@/data/staticData';

export default function About() {
  return (
    <>
      <AboutPageHero info={aboutPageHeroInfo} />
      <ProfileCard info={profileCardInfo} />
      <DualCardSection {...twoWorldsSectionInfo} className="my-20 md:my-40" />
      <CtaSection
        {...aboutCtaSectionInfo}
        align="center"
        className="my-10 md:my-20"
      />
    </>
  );
}
