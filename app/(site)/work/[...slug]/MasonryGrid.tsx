'use client';
import Masonry from 'react-masonry-css'
import './MasonryGrid.css'

const MasonryGrid = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const breakpointColumnsObj = {
    default: 3,
    960: 2,
    639: 1
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid pageContent--workThumbnails js-fade__quick"
      columnClassName="my-masonry-grid_column"
    >
      {children}
    </Masonry>
  )
}

export default MasonryGrid