import Link from 'next/link';
import './Work.css';
import Image from 'next/image';

interface Props {
    slug: string;
    title: string;
    subtitle: string;
    thumbnail: string;
    height: number;
    width: number
}

const Work = ({ slug, title, subtitle, thumbnail, height, width }: Props) => {
    return (
        <div className="workThumbnail">
            <Link href={`/work/project/${slug}`}>
                <div className="workThumbnail--thumbnail">
                    <Image src={thumbnail} alt={subtitle || title} width={width} height={height} unoptimized />
                </div>

                <span className="workThumbnail--projectInformation hasSubtitle">
                    <span className="workThumbnail--title">{title}</span>
                    <span className="workThumbnail--subtitle">{subtitle}</span>
                </span>
            </Link>
        </div>
    )
}

export default Work