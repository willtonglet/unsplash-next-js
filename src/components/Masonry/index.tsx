import React, { useEffect, useRef, useState } from 'react';
import useMediaQuery from '@hooks/useMediaQuery';

import { StyledMasonry } from './styles';

interface MasonryProps {
  children: React.ReactNode;
  onScrollIntersection?: () => void;
  visibleOffset?: number;
}

const Masonry = (props: MasonryProps): React.ReactElement => {
  const { children, onScrollIntersection, visibleOffset = 1000 } = props;
  const [intersectionHeight, setIntersectionHeight] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const infiniteScrollRef = useRef<HTMLDivElement>(null);
  const isXs = useMediaQuery('xs');
  const isMd = useMediaQuery('md');
  const isLg = useMediaQuery('lg');

  const getColumnsNumber = isLg ? 3 : isMd ? 2 : isXs ? 1 : 1;

  const getColumn = () => {
    const columns: React.ReactNodeArray[] = Array.from(
      { length: getColumnsNumber },
      () => [],
    );

    React.Children.map(children, (child, index) => {
      columns[index % getColumnsNumber].push(child);
    });

    return columns;
  };

  const renderColumn = (column: React.ReactNodeArray) => {
    return column.map((item, i) => (
      <div key={i} style={{ marginTop: i > 0 ? '1.5rem' : undefined }}>
        {item}
      </div>
    ));
  };

  const renderColumns = getColumn().map((column, i) => (
    <div
      key={i}
      className="column"
      style={{
        marginLeft: i > 0 ? '1.5rem' : undefined,
      }}
    >
      {renderColumn(column)}
    </div>
  ));

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: `${visibleOffset}px 0px ${visibleOffset}px 0px`,
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && onScrollIntersection) onScrollIntersection();
    }, option);
    if (infiniteScrollRef.current) observer.observe(infiniteScrollRef.current);
  }, []);

  useEffect(() => {
    const columnsHeight = Array.from({ length: getColumnsNumber }).map(
      (_, i) =>
        mainRef.current &&
        Math.round(mainRef.current.children[i].getBoundingClientRect().height),
    );

    setIntersectionHeight(
      Math.max(...(columnsHeight as number[])) -
        Math.min(...(columnsHeight as number[])),
    );
  }, [children]);

  return (
    <div className="relative">
      <StyledMasonry ref={mainRef}>{renderColumns}</StyledMasonry>
      <div
        className="absolute bottom-0 left-0 w-full min-h-screen"
        style={{ height: intersectionHeight }}
        ref={infiniteScrollRef}
      />
    </div>
  );
};

export default Masonry;
