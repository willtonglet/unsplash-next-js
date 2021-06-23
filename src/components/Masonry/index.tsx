import React, { useEffect, useRef, useState } from 'react';
import useMediaQuery from '@hooks/useMediaQuery';
import { isServer } from '@core/utils/isServer';

import { StyledMasonry } from './styles';

interface MasonryProps {
  children: React.ReactNode;
  onScrollIntersection?: () => void;
  visibleOffset?: number;
}

const Masonry = (props: MasonryProps): React.ReactElement => {
  const { children, onScrollIntersection, visibleOffset = 1000 } = props;
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
      <div className="intersection" />
    </div>
  ));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (typeof window !== undefined && window.requestIdleCallback) {
          window.requestIdleCallback(
            () => {
              if (entries[0].isIntersecting && onScrollIntersection) {
                setIsLoading(true);
                onScrollIntersection();
              } else {
                setIsLoading(false);
              }
            },
            {
              timeout: 600,
            },
          );
        } else {
          if (entries[0].isIntersecting && onScrollIntersection) {
            onScrollIntersection();
          } else {
            setIsLoading(false);
          }
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
        window.removeEventListener('scroll', () => setIsLoading(false));
    };
  }, []);

  return (
    <div className="relative">
      <StyledMasonry ref={mainRef}>{renderColumns}</StyledMasonry>
      <div
        ref={intersectionRef}
        className={`flex justify-center items-center w-full absolute left-0 bottom-0 ${
          isLoading ? 'h-screen' : ''
        }`}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-6 w-6 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
      </div>
    </div>
  );
};

export default Masonry;
