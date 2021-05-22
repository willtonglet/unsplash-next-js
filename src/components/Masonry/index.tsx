import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Spinner from '@components/Spinner';
import { StyledMasonry } from './styles';

interface MasonryProps {
  children: React.ReactNode;
  columnsCount?: number;
  gutter?: string;
  setStateSpinner?: Dispatch<SetStateAction<number>>;
}

const Masonry = (props: MasonryProps): JSX.Element => {
  const { children, columnsCount = 3, gutter = '0', setStateSpinner } = props;
  const [indexColumnRef, setIndexColumnRef] = useState<number>(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);

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

  const spinner = (
    <div className="flex w-full my-6 justify-center" ref={spinnerRef}>
      <Spinner />
    </div>
  );

  const renderColumns = getColumn().map((column, i) => (
    <div
      key={i}
      className="column"
      style={{
        marginLeft: i > 0 ? gutter : undefined,
      }}
    >
      {renderColumn(column)}
      {columnsCount > 1 && indexColumnRef === i && spinner}
    </div>
  ));

  useEffect(() => {
    const arrColumnsHeight = Array.from({ length: columnsCount }).map(
      (_, i) =>
        mainRef.current &&
        Math.round(mainRef.current.children[i].getBoundingClientRect().height),
    );

    setIndexColumnRef(
      arrColumnsHeight.indexOf(Math.min(...(arrColumnsHeight as number[]))),
    );
  }, [children]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting)
      setStateSpinner && setStateSpinner((prev: number) => prev + 1);
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (spinnerRef.current && indexColumnRef)
      observer.observe(spinnerRef.current);
  }, [handleObserver, indexColumnRef]);

  return (
    <>
      <StyledMasonry ref={mainRef}>{renderColumns}</StyledMasonry>
      {columnsCount === 1 && spinner}
    </>
  );
};

export default Masonry;
