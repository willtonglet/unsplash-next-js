import React from 'react';
import { StyledMasonry } from './styles';

interface MasonryProps {
  children: React.ReactNode;
  columnsCount?: number;
  gutter?: string;
}

const Masonry = (props: MasonryProps) => {
  const { children, columnsCount = 3, gutter = '0' } = props;

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
      className="columns"
      style={{
        marginLeft: i > 0 ? gutter : undefined,
      }}
    >
      {renderColumn(column)}
    </div>
  ));

  return <StyledMasonry>{renderColumns}</StyledMasonry>;
};

export default Masonry;
