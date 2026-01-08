import {Hero} from "@/components/Hero";
import {TextBlock} from "@/components/TextBlock";
import {FeaturedGallery} from "@/components/FeaturedGallery";
import {textBlockData} from "@/data/data";

export default function Home() {
  return (
    <>
      <Hero />
      <TextBlock content={textBlockData.content} />
      <FeaturedGallery />
    </>
  );
}
