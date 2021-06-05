import SearchBar from '@components/SearchBar';
import TopicsNav from '@components/TopicsNav';
import Link from 'next/link';

const Header = (): JSX.Element => {
  return (
    <header className="sticky z-20 bg-white top-0 w-screen shadow-md">
      <div className="grid grid-cols-12 p-4">
        <div className="col-start-1 col-end-3 flex items-center">
          <Link href="/">
            <a className="text-black leading-3 focus:outline-none">
              <strong className="block">Unsplash</strong>
              <span className="text-sm font-medium">Photos for everyone</span>
            </a>
          </Link>
        </div>
        <div className="col-start-3 col-end-8">
          <SearchBar />
        </div>
      </div>
      <TopicsNav />
    </header>
  );
};

export default Header;
