import React, { useEffect, useRef, useState } from 'react';
import useMediaQuery from '@hooks/useMediaQuery';
import { isServer } from '@core/utils/isServer';
import Spinner from '@components/Spinner';
import { StyledMasonry } from './styles';

interface MasonryProps {
  children: React.ReactNode;
  onScrollIntersection?: () => void;
  visibleOffset?: number;
}

const Masonry = (props: MasonryProps): React.ReactElement => {
  const { children, onScrollIntersection, visibleOffset = 200 } = props;
  const [isLoading, setIsLoading] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const intersectionRef = useRef<HTMLDivElement>(null);
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
    const observer = new IntersectionObserver(
      (entries) => {
        if (typeof window !== undefined && window.requestIdleCallback) {
          window.requestIdleCallback(
            () => {
              if (entries[0].isIntersecting && onScrollIntersection)
                onScrollIntersection();
            },
            {
              timeout: 600,
            },
          );
        } else {
          if (entries[0].isIntersecting && onScrollIntersection)
            onScrollIntersection();
        }
      },
      {
        root: null,
        rootMargin: `${visibleOffset}px 0px ${visibleOffset}px 0px`,
      },
    );

    if (intersectionRef.current) observer.observe(intersectionRef.current);
    return () => {
      if (intersectionRef.current) observer.unobserve(intersectionRef.current);
    };
  }, [intersectionRef]);

  useEffect(() => {
    if (!isServer) window.addEventListener('scroll', () => setIsLoading(true));

    return () => {
      if (!isServer)
        window.removeEventListener('scroll', () => setIsLoading(true));
    };
  }, []);

  return (
    <div className="relative">
      <StyledMasonry ref={mainRef}>{renderColumns}</StyledMasonry>
      {onScrollIntersection && (
        <div
          ref={intersectionRef}
          className={`flex justify-center items-center w-full ${
            isLoading ? 'h-96' : ''
          }`}
        >
          {isLoading && <Spinner />}
        </div>
      )}
    </div>
  );
};

export default Masonry;
