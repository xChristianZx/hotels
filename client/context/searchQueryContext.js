import { createContext, useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { filterQuery } from '../utils/helper';

const SearchQueryContext = createContext();

function useSearchQuery() {
  const context = useContext(SearchQueryContext);

  if (!context) {
    throw new Error('useSearchQuery must be used within a SearchQueryProvider');
  }

  return context;
}

function SearchQueryProvider(props) {
  const router = useRouter();
  const initSearchQuery = filterQuery(router.query, ['hotelId']);

  const [searchQuery, setSearchQuery] = useState(initSearchQuery || {});

  const value = useMemo(() => [searchQuery, setSearchQuery], [searchQuery]);

  return <SearchQueryContext.Provider value={value} {...props} />;
}

export { SearchQueryProvider, useSearchQuery };
