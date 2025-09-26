import React, { useEffect, useState } from 'react';
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import './App.css';
import * as S from './App.styles.js';

export const DATA_LIMIT = 5;

type BookDoc = {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
};

type SearchResponse = {
  num_found: number;
  docs: BookDoc[];
};

// getPosts 함수 정의
const getPosts = async ({
  pageParam = 0,
  queryKey,
}: QueryFunctionContext<string[], number>): Promise<SearchResponse> => {
  const [, searchTerm] = queryKey;
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(
      searchTerm
    )}&limit=${DATA_LIMIT}&page=${pageParam + 1}`
  );
  return response.json();
};

const App = () => {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('tolkien');

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', searchTerm], // 검색어를 queryKey에 포함함
    queryFn: getPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage.num_found;
      const currentCount = allPages.flatMap((p) => p.docs).length;
      return currentCount < total ? allPages.length : undefined;
    },
  });

  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer
  ) => {
    if (entry.isIntersecting && hasNextPage) {
      observer.unobserve(entry.target);
      await fetchNextPage();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.2 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  if (isFetching && !isFetchingNextPage) {
    return <div>fetching</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <S.Container>
      {/* 🔍 검색창 + 버튼 */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
        <S.SearchBar
          type='text'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder='검색어를 입력하세요...'
        />
        <button
          onClick={() => setSearchTerm(searchInput)}
          style={{ padding: '8px 16px' }}>
          검색
        </button>
      </div>

      {data?.pages.map((group, idx) => (
        <React.Fragment key={idx}>
          {group.docs.map(
            ({ key, title, author_name, first_publish_year, cover_i }) => (
              <S.ProductCard key={key}>
                {cover_i ? (
                  <S.ProductImage
                    src={`https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`}
                    alt={title}
                  />
                ) : (
                  <S.ProductImage
                    src='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                    alt='no cover'
                  />
                )}
                <S.ProductDetails>
                  <p>{title}</p>
                  <p>저자: {author_name?.join(', ')}</p>
                  <p>첫 출판: {first_publish_year}</p>
                </S.ProductDetails>
              </S.ProductCard>
            )
          )}
        </React.Fragment>
      ))}

      <S.LoadMoreButton ref={(el) => setTarget(el)}>
        {hasNextPage ? '다음 아이템 불러오기' : '마지막 아이템'}
      </S.LoadMoreButton>
    </S.Container>
  );
};

export default App;
