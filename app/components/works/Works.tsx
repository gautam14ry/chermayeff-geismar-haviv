import MasonryGrid from '@/app/(site)/work/[...slug]/MasonryGrid';
import Work from './Work';
import './Works.css';

type ImageSize = [string, number, number];

interface Thumbnail {
  sizes: ImageSize[];
  w: number;
  h: number;
}

interface Work {
  slug: string;
  title: string;
  subtitle: string;
  thumbnail: Thumbnail;
  thumbnailReverse: Thumbnail;
}

interface WorksProps {
  type?: "logo" | "graphic" | "art-in-architecture";
  sort?: "curated" | "az" | "new";
  home?: boolean;
}

const BASE_URL = "https://bpcghheadless.wpenginepowered.com/wp-json/cgh/work/";

const Works = async ({ type, sort = "curated", home }: WorksProps) => {
  const params = new URLSearchParams({ total: "-1", sort });

  if (type) params.append("type", type);
  if (home) params.append("home", "true");

  const url = `${BASE_URL}?${params.toString()}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  const works: Work[] = await res.json();

  const items = works?.map((work, index) => {
    const source = index % 2 === 0 ? work.thumbnailReverse ? work.thumbnailReverse : work.thumbnail : work.thumbnail;
    const thumbnailUrl = source?.sizes?.[0]?.[0] ?? "";
    return (
      <Work
        key={work.slug}
        slug={work.slug}
        title={work.title}
        subtitle={work.subtitle}
        thumbnail={thumbnailUrl}
        width={source?.w}
        height={source?.h}
        priority={index === 0}
      />
    );
  })

  return (
    <>
      {type === 'graphic' ?
        <MasonryGrid>
          {items}
        </MasonryGrid> :
        <section className="pageContent--workThumbnails js-fade__quick">
          {items}
        </section>
      }
    </>

  );
};

export default Works;
