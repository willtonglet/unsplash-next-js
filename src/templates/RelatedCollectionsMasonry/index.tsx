import dynamic from 'next/dynamic';
import Masonry from '@components/Masonry';
import RenderIfVisible from '@components/RenderIfVisible';

const CollectionContent = dynamic(
  () => import('@components/CollectionContent'),
  {
    ssr: false,
  },
);

interface RelatedCollectionsMasonryProps {
  collections: CollectionProps[];
}

const RelatedCollectionsMasonry = (
  props: RelatedCollectionsMasonryProps,
): React.ReactElement => {
  const { collections } = props;

  return (
    <Masonry>
      {collections?.map((collection, index) =>
        index <= 2 ? (
          <CollectionContent collection={collection} key={collection.id} />
        ) : (
          <RenderIfVisible key={collection.id}>
            <CollectionContent collection={collection} key={collection.id} />
          </RenderIfVisible>
        ),
      )}
    </Masonry>
  );
};

export default RelatedCollectionsMasonry;
