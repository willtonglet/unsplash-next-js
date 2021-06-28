import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Masonry from '@components/Masonry';
import { apiRoute } from '@core/middleware/api';
import ContainerWrapper from '@components/ContainerWrapper';
import RenderIfVisible from '@components/RenderIfVisible';
import CollectionContent from '@components/CollectionContent';

interface MasonrySearchTabCollectionProps {
  collections: CollectionProps[];
}

const MasonrySearchTabCollection = (
  props: MasonrySearchTabCollectionProps,
): React.ReactElement => {
  const { collections } = props;
  const [page, setPage] = useState(1);
  const [collectionsData, setCollectionsData] = useState<CollectionProps[]>([]);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) setCollectionsData([]);
    setPage(1);
  }, [slug]);

  const getCollections = () => {
    apiRoute
      .get(`/search/collections`, {
        params: {
          query: slug,
          page: page,
          per_page: 12,
          xp: '',
        },
      })
      .then((response) => {
        const arr = [...collectionsData, ...response.data.results];
        setCollectionsData(arr);
      });
  };

  useEffect(() => {
    setCollectionsData(collections);
  }, [collections]);

  useEffect(() => {
    if (page > 1) getCollections();
  }, [page]);

  return (
    <ContainerWrapper className="py-12">
      <Masonry onScrollIntersection={() => setPage((prev) => prev + 1)}>
        {collectionsData?.map((collection) => (
          <RenderIfVisible key={collection.id}>
            <CollectionContent collection={collection} />
          </RenderIfVisible>
        ))}
      </Masonry>
    </ContainerWrapper>
  );
};

export default MasonrySearchTabCollection;
