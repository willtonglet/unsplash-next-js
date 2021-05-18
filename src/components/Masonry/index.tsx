import React, { forwardRef } from 'react';
import Spinner from '../Spinner';
import { StyledMasonry } from './styles';

interface MasonryProps {
  children: React.ReactNode;
  columnsCount?: number;
  gutter?: string;
}

const Masonry = forwardRef<HTMLDivElement, MasonryProps>(
  (props: MasonryProps, spinnerRef) => {
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
        {i === 1 && (
          <div
            className="animate-pulse bg-gray-200 w-full h-96 flex items-center"
            style={{ marginTop: i > 0 ? gutter : undefined }}
          >
            <div className="flex w-full justify-center" ref={spinnerRef}>
              <Spinner />
            </div>
          </div>
        )}
      </div>
    ));

    return <StyledMasonry>{renderColumns}</StyledMasonry>;
  },
);

export default Masonry;
