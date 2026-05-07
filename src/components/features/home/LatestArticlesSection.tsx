import { getMediumArticles } from "@/lib/api/mediumArticles";
import LatestArticles from "./LatestArticles";
import { Divider } from "@/components/ui/Divider";

const mediumUsername = process.env.MEDIUM_USERNAME as string;

export function LatestArticlesSkeleton() {
  return (
    <div className="space-y-10">
      <Divider orientation="horizontal" weight="medium" />
      {/* TextBlock: title + 3-line paragraph */}
      <div className="space-y-4">
        <div className="h-7 w-40 skeleton" />
        <div className="space-y-2">
          <div className="h-4 w-full skeleton" />
          <div className="h-4 w-full skeleton" />
          <div className="h-4 w-2/3 skeleton" />
        </div>
      </div>
      {/* ArticleList — mt-10 md:mt-20 matches real ul */}
      <ul className="mt-10 md:mt-20">
        {[0, 1, 2].map((i) => (
          <li key={i}>
            {i > 0 && <div className="my-8 h-px bg-border md:my-12" />}
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="h-3 w-28 skeleton" />
                <div className="h-3 w-20 skeleton" />
              </div>
              <div className="h-7 w-3/4 skeleton" />
              <div className="space-y-2">
                <div className="h-4 w-full skeleton" />
                <div className="h-4 w-full skeleton" />
                <div className="h-4 w-5/6 skeleton" />
              </div>
              <div className="h-4 w-36 skeleton" />
            </div>
          </li>
        ))}
      </ul>
      {/* "View all articles" CTA — mt-14 md:mt-20 matches real motion.div */}
      <div className="mt-14 text-center md:mt-20">
        <div className="mx-auto h-5 w-32 skeleton" />
      </div>
    </div>
  );
}

export const LatestArticlesSection = async () => {
  const articles = await getMediumArticles(mediumUsername);
  if (!articles) return null;
  return <LatestArticles articles={articles} />;
};
