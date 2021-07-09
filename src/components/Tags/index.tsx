import Link from 'next/link';

interface TagsProps {
  tags: ImageProps['tags'];
}

const Tags = ({ tags }: TagsProps): React.ReactElement => {
  return (
    <div>
      {tags?.map((tag, index) => (
        <Link
          key={index}
          href={
            tag.type === 'search'
              ? `/s/photos/${tag.title}`
              : `/images/${tag.title}`
          }
        >
          <a className="bg-gray-200 rounded-sm text-sm text-gray-600 inline-block px-2 py-1 mr-2 mb-2 capitalize hover:bg-gray-300 hover:text-black">
            {tag.type === 'search' ? tag.title : tag.source.title}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Tags;
