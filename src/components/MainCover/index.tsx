import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import { ImageProps } from '../../pages/_home';
import { StyledMainCover } from './styles';

export interface MainCoverProps {
  image?: ImageProps;
  trends?: { title: string; id: string }[];
}

const MainCover = (props: MainCoverProps) => {
  const { image, trends } = props;

  return (
    <StyledMainCover className="text-white" image={image?.urls.full}>
      <div className="h-full bg-opacity-50 bg-black w-screen flex flex-col justify-between">
        <div className="flex items-center justify-center flex-1">
          <div className="flex flex-col w-2/3">
            <h2 className="text-5xl font-bold mb-5">Unsplash</h2>
            <p className="text-lg font-light mb-7">
              The internet’s source of freely-usable images.
              <br />
              Powered by creators everywhere.
            </p>
            <form>
              <div className="flex rounded shadow-md">
                <button
                  type="button"
                  className="h-14 bg-white text-gray-500 pl-3 rounded-l focus:outline-none"
                >
                  <IoIosSearch size={24} />
                </button>
                <input
                  type="text"
                  className="text-gray-800 w-full px-2 text-sm h-14 rounded-r focus:outline-none"
                  placeholder="Search free-high resolution photos"
                />
              </div>
            </form>
            <p className="text-sm mt-4">
              Trending:{' '}
              {trends?.map((trend, index) => (
                <span
                  className="text-white text-gray-300 hover:text-white"
                  key={trend.id}
                >
                  {trend.title}
                  {index + 1 < trends.length && ', '}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-400 p-5">
          <div className="font-light">
            <span className="text-white">Photo of the Day</span> by{' '}
            <span className="text-white">{image?.user.name}</span>
          </div>
        </div>
      </div>
    </StyledMainCover>
  );
};

export default MainCover;
