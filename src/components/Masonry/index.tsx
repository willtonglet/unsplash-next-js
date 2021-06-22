import React, { useEffect, useRef } from 'react';
import useMediaQuery from '@hooks/useMediaQuery';

import { StyledMasonry } from './styles';

interface MasonryProps {
  children: React.ReactNode;
  onScrollIntersection?: () => void;
  visibleOffset?: number;
}

const Masonry = (props: MasonryProps): React.ReactElement => {
  const { children, onScrollIntersection, visibleOffset = 1000 } = props;
  const mainRef = useRef<HTMLDivElement>(null);
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
      <div className="intersection" />
    </div>
  ));

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: `${visibleOffset}px 0px ${visibleOffset}px 0px`,
    };

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && onScrollIntersection) onScrollIntersection();
    }, option);

    const intersectionElement = (colIndex: number) =>
      mainRef.current &&
      mainRef.current.children[colIndex] &&
      mainRef.current.children[colIndex].children[
        mainRef.current.children[colIndex].children.length - 1
      ];

    if (intersectionElement(0))
      observer.observe(intersectionElement(0) as Element);
    if (intersectionElement(1))
      observer.observe(intersectionElement(1) as Element);
    if (intersectionElement(2))
      observer.observe(intersectionElement(2) as Element);

    return () => {
      if (intersectionElement(0))
        observer.unobserve(intersectionElement(0) as Element);
      if (intersectionElement(1))
        observer.unobserve(intersectionElement(1) as Element);
      if (intersectionElement(2))
        observer.unobserve(intersectionElement(2) as Element);
    };
  }, []);

  return <StyledMasonry ref={mainRef}>{renderColumns}</StyledMasonry>;
};

export default Masonry;
