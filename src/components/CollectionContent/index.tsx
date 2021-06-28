import Link from 'next/link';
import { useRouter } from 'next/router';
import ImageWithPreview from '../ImageWithPreview';

interface CollectionContentProps {
  collection: CollectionProps;
}

const CollectionContent = (
  props: CollectionContentProps,
): React.ReactElement => {
  const { collection } = props;
  const { tags, preview_photos } = collection;
  const { query } = useRouter();

  return (
    <>
      <div className="relative" style={{ paddingBottom: '70%' }}>
        <Link href={`/collections/${collection.id}/${query.slug}`}>
          <a className="absolute h-full w-full rounded overflow-hidden flex hover:opacity-80">
            <div className="w-3/4 bg-grey-100">
              <ImageWithPreview
                key={preview_photos[0].id}
                src={preview_photos[0].urls.regular}
                hash={preview_photos[0].blur_hash}
                color={preview_photos[0].color}
                alt={preview_photos[0].alt_description}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="w-1/4 flex flex-col ml-1">
              {preview_photos
                .filter((_, i) => i > 0 && i <= 2)
                .map((collection, i) => (
                  <div
                    key={i}
                    className={`flex-grow bg-grey-100 relative${
                      i === 0 ? ' mb-1' : ''
                    }`}
                  >
                    <ImageWithPreview
                      key={collection.id}
                      src={collection.urls.regular}
                      hash={collection.blur_hash}
                      color={collection.color}
                      alt={collection.alt_description}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                ))}
            </div>
          </a>
        </Link>
      </div>
      <div className="h-40 mt-4">
        <h3 className="text-xl font-semibold">{collection.title}</h3>
        <div className="items-baseline text-sm text-gray-500">
          <span>{collection.total_photos} photos</span>
          <span className="mx-1">·</span>
          <span>Curated by {collection.name}</span>
        </div>
        {tags && tags.length && (
          <div className="mt-4">
            {tags
              ?.filter((_, i) => i < 3)
              .map((tag, index) => (
                <Link
                  key={index}
                  href={
                    tag.type === 'search'
                      ? `/s/photos/${tag.title}`
                      : `/images/${tag.title}`
                  }
                >
                  <a className="bg-gray-200 rounded text-sm text-gray-600 inline-block px-2 py-1 mr-2 mb-2 capitalize">
                    {tag.type === 'search' ? tag.title : tag.source.title}
                  </a>
                </Link>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CollectionContent;
