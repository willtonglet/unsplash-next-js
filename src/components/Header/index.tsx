import SearchBar from '@components/SearchBar';
import TopicsNav from '@components/TopicsNav';
import Link from 'next/link';

interface HeaderProps {
  topics?: { title: string; slug: string; id: string }[];
}

const Header = ({ topics }: HeaderProps): React.ReactElement => {
  return (
    <header className="sticky z-20 bg-white top-0 w-screen">
      <nav className="flex items-center py-3 px-3 md:px-5 w-full border-box">
        <div className="flex-1 flex items-center">
          <Link href="/">
            <a className="text-black leading-3 flex items-center focus:outline-none">
              <svg
                className="w-6"
                version="1.1"
                viewBox="0 0 32 32"
                aria-labelledby="unsplash-home"
                aria-hidden="false"
              >
                <title id="unsplash-home">Unsplash Home</title>
                <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
              </svg>
              <div className="hidden md:flex flex-col justify-center whitespace-nowrap ml-3 leading-tight">
                <strong className="block">Unsplash</strong>
                <span className="text-xs font-medium">Photos for everyone</span>
              </div>
            </a>
          </Link>
          <div className="pl-4 w-full">
            <SearchBar />
          </div>
        </div>
      </nav>
      {topics && <TopicsNav topics={topics} />}
    </header>
  );
};

export default Header;
