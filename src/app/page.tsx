import {Hero} from "@/components/Hero/Hero";
import {TextBlock} from "@/components/TextBlock/TextBlock";
import {FeaturedGallery} from "@/components/FeaturedGallery/FeaturedGallery";
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
