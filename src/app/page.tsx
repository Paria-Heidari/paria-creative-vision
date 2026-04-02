import Hero from "@/components/features/home/Hero";
import FeaturedGallery from "@/components/features/home/FeaturedGallery";
import LatestArticles from "@/components/features/home/LatestArticles";
import {TextBlock} from "@/components/ui/TextBlock";
import {textBlockData} from "@/data/data";
import { getFeaturedPhotos } from "@/lib/api/photos";
import { getMediumArticles } from "@/lib/api/mediumArticles";

const mediumUsername = process.env.MEDIUM_USERNAME as string;

export default async function Home() {
  const [featuredPhotos, articles] = await Promise.all([
    getFeaturedPhotos(),
    getMediumArticles(mediumUsername),
  ]);

  return (
    <>
      <Hero />
      <TextBlock content={textBlockData.content} />
      <FeaturedGallery featuredPhotos={featuredPhotos}/>
      {articles.length > 0 && <LatestArticles articles={articles} />}
    </>
  );
}
