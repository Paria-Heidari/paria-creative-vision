import {Hero} from "@/components/Hero";
import {TextBlock} from "@/components/TextBlock";
import {FeaturedGallery} from "@/components/FeaturedGallery";
import {textBlockData} from "@/data/data";
import { getFeaturedPhotos } from "@/lib/api/photos";

export default async function Home() {
  const featuredPhotos = await getFeaturedPhotos();

  return (
    <>
      <Hero />
      <TextBlock content={textBlockData.content} />
      <FeaturedGallery featuredPhotos={featuredPhotos}/>
    </>
  );
}
