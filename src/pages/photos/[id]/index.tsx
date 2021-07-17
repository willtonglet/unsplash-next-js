import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { unsplash } from '@core/middleware/api';
import { useRouter } from 'next/router';
import PhotoContent from '@templates/PhotoContent';
import PageWrapper from '@templates/PageWrapper';
import { getSearchParams } from '@core/middleware/apiSearchCalls';
import ModalInfo from '@templates/ModalInfo';
import MasonryCustomSection from '@templates/MasonryCustomSection';
import PhotoHeader from '@templates/PhotoHeader';
import PhotoInfo from '@templates/PhotoInfo';
import Tags from '@components/Tags';
import PhotoRelatedTitleWithChildren from '@templates/PhotoRelatedTitleWithChildren';
import React from 'react';
import RelatedCollectionsMasonry from '@templates/RelatedCollectionsMasonry';
import ContainerWrapper from '@components/ContainerWrapper';

const ModalPhoto = dynamic(() => import('@templates/ModalPhoto'), {
  ssr: false,
});

const Photo = ({
  cover,
  photos,
  searchListData,
}: PageProps): React.ReactElement => {
  const router = useRouter();
  return (
    <PageWrapper searchListData={searchListData} backgroundColor="bg-white">
      <div className="relative">
        <PhotoHeader
          photoData={cover}
          className="sticky rounded-t px-4 bg-white z-20"
          style={{ top: 64 }}
        />
        <div className="w-full flex justify-center">
          <PhotoContent image={cover} />
        </div>
        <PhotoInfo photoInfo={cover} />
      </div>
      <ContainerWrapper className="mt-16 pb-24">
        {cover.tags && cover.tags.length && (
          <PhotoRelatedTitleWithChildren title="Related tags">
            <Tags tags={cover.tags} />
          </PhotoRelatedTitleWithChildren>
        )}
        <PhotoRelatedTitleWithChildren className="mt-16" title="Related photos">
          <MasonryCustomSection photos={photos} />
        </PhotoRelatedTitleWithChildren>
        {cover?.related_collections.total > 0 && (
          <PhotoRelatedTitleWithChildren
            className="mt-16"
            title="Related collections"
          >
            <RelatedCollectionsMasonry
              collections={cover?.related_collections.results}
            />
          </PhotoRelatedTitleWithChildren>
        )}
      </ContainerWrapper>
      <ModalPhoto isOpen={router.query.id !== cover.id} />
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data: cover } = await unsplash.get(`/napi/photos/${query.id}`);
  const { data: photos } = await unsplash.get(
    `/napi/photos/${query.id}/related`,
  );
  const { data: searchListData } = await getSearchParams();

  return { props: { cover, photos: photos.results, searchListData } };
};

export default Photo;
