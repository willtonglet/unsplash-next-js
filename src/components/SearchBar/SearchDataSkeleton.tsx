const SearchDataSkeleton = (): React.ReactElement => (
  <div className="flex flex-wrap">
    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className="border rounded border-gray-300 p-3.5 animate-pulse mr-2 mt-2 flex"
      >
        {i % 2 ? (
          <span className="bg-gray-300 h-2 w-8 rounded-full animate-pulse block mr-2" />
        ) : null}
        <span className="bg-gray-300 h-2 w-16 rounded-full animate-pulse block" />
      </div>
    ))}
  </div>
);

export default SearchDataSkeleton;
