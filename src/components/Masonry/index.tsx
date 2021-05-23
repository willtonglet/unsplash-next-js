import Spinner from '@components/Spinner';
import React, { useEffect, useRef, useState } from 'react';

import { StyledMasonry } from './styles';

interface MasonryProps {
  children: React.ReactNode;
  columnsCount?: number;
  gutter?: string;
  spinnerRef?: React.RefObject<HTMLDivElement>;
}

const Masonry = (props: MasonryProps): JSX.Element => {
  const { children, columnsCount = 3, gutter = '0', spinnerRef } = props;
  const [indexColumnWithRef, setIndesConlumnWithRef] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  const getColumn = () => {
    const columns: React.ReactNodeArray[] = Array.from(
      { length: columnsCount },
      () => [],
    );

    React.Children.map(children, (child, index) => {
      columns[index % columnsCount].push(child);
    });

    return columns;
  };

  const renderColumn = (column: React.ReactNodeArray) => {
    return column.map((item, i) => (
      <div key={i} style={{ marginTop: i > 0 ? gutter : undefined }}>
        {item}
      </div>
    ));
  };

  const renderColumns = getColumn().map((column, i) => {
    const hasSpinner = indexColumnWithRef === i;
    return (
      <div
        key={i}
        className="column"
        style={{
          marginLeft: i > 0 ? gutter : undefined,
        }}
      >
        {renderColumn(column)}
        <div ref={hasSpinner ? spinnerRef : null}>
          {hasSpinner && <Spinner />}
        </div>
      </div>
    );
  });

  useEffect(() => {
    const columnsHeight = Array.from({ length: columnsCount }).map(
      (_, i) =>
        mainRef.current &&
        Math.round(mainRef.current.children[i].getBoundingClientRect().height),
    );
    setIndesConlumnWithRef(
      columnsHeight.indexOf(Math.min(...(columnsHeight as number[]))),
    );
  }, [children]);

  return <StyledMasonry ref={mainRef}>{renderColumns}</StyledMasonry>;
};

export default Masonry;
