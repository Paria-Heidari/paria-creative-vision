import { GalleryCardItem } from "@/components/GalleryCardItem/GalleryCardItem";
import  {Hero}  from "@/components/Hero/Hero";
import {TextBlock}  from "@/components/TextBlock/TextBlock";
import {textBlockData} from "@/data/data";

export default function Home() {
  return (
    <>
      <Hero />
      <TextBlock content={textBlockData.content} />
      <GalleryCardItem />
    </>
  );
}
