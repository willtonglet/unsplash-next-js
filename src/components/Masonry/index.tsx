import React, { useEffect, useRef } from 'react';

import { StyledMasonry } from './styles';

interface MasonryProps {
  children: React.ReactNode;
  columnsCount?: number;
  gutter?: string;
  onColumnsDifferenceSizes?: (difference: number) => void;
}

const Masonry = (props: MasonryProps): JSX.Element => {
  const {
    children,
    columnsCount = 3,
    gutter = '0',
    onColumnsDifferenceSizes,
  } = props;
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

  const renderColumns = getColumn().map((column, i) => (
    <div
      key={i}
      className="column"
      style={{
        marginLeft: i > 0 ? gutter : undefined,
      }}
    >
      {renderColumn(column)}
    </div>
  ));

  useEffect(() => {
    const columnsHeight = Array.from({ length: columnsCount }).map(
      (_, i) =>
        mainRef.current &&
        Math.round(mainRef.current.children[i].getBoundingClientRect().height),
    );

    onColumnsDifferenceSizes &&
      onColumnsDifferenceSizes(
        Math.max(...(columnsHeight as number[])) -
          Math.min(...(columnsHeight as number[])),
      );
  }, [children, onColumnsDifferenceSizes]);

  return <StyledMasonry ref={mainRef}>{renderColumns}</StyledMasonry>;
};

export default Masonry;
