import {Hero} from "@/components/Hero";
import {TextBlock} from "@/components/TextBlock";
import {FeaturedGallery} from "@/components/FeaturedGallery";
import {LatestArticles} from "@/components/LatestArticles";
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
