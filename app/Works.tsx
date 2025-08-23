import Work from './components/work/Work';
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

const Works = async () => {
  const res = await fetch('https://bpcghheadless.wpenginepowered.com/wp-json/cgh/work/?total=-1&home=true&sort=curated');
  const works: Work[] = await res.json();

  return (
    <section className="pageContent--workThumbnails js-fade__quick">
      {works?.map((work, index) => {
        const source = index % 2 === 0 ? work.thumbnailReverse : work.thumbnail;
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
      })}
    </section>
  );
};

export default Works;

