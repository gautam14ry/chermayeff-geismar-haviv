// import Link from 'next/link';
import './Work.css';
import Image from 'next/image';

interface Props {
    slug: string;
    title: string;
    subtitle: string;
    thumbnail: string;
    height: number;
    width: number;
    priority: boolean;
}

const Work = ({ title, subtitle, thumbnail, height, width, priority }: Props) => {
    return (
        <div className="workThumbnail">
                <div className="workThumbnail--thumbnail">
                    <Image
                        src={thumbnail}
                        alt={subtitle || title}
                        width={width} height={height}
                        unoptimized
                        priority={priority}
                    />
                </div>

                <span className="workThumbnail--projectInformation hasSubtitle">
                    <span className="workThumbnail--title">{title}</span>
                    <span className="workThumbnail--subtitle">{subtitle}</span>
                </span>
        </div>
    )
}

export default Work