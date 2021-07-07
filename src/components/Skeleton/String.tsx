interface StringProps {
  size?: number;
  height?: number;
  minWidth?: number;
  className?: string;
}

const String = ({
  size = 1,
  height = 1,
  minWidth = 40,
  className,
}: StringProps): React.ReactElement => {
  const renderStringBySize = Array.from({ length: size }).map((_, i) => (
    <span
      key={i}
      className="mr-1 bg-gray-300 rounded-full block animate-pulse"
      style={{ height: `${height}rem`, width: i % 2 ? minWidth * 2 : minWidth }}
    />
  ));

  return (
    <div className={`flex${className ? ` ${className}` : ''}`}>
      {renderStringBySize}
    </div>
  );
};

export { String };
