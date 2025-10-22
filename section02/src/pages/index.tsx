import BookItem from '@/components/book-item';
import SearchableLayout from '@/components/searchable-layout';
import fetchBooks from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/fetch-random-books';
import style from '@/pages/index.module.css';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { ReactNode } from 'react';

export const getStaticProps = async () => {
  const [allBooks, randomBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);
  return {
    props: {
      allBooks,
      randomBooks,
    },
  };
};

export default function Home({
  allBooks,
  randomBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        {/* 페이지 이름 */}
        <title>한입북스</title>
        {/* 오픈 그래프 태그 */}
        {/* 1. 썸네일 - 이때 contexts는 public 폴더를 의미한다. */}
        <meta property="og:image" content="/thumbnail.png" />
        {/* 2. 타이틀 */}
        <meta property="og:title" content="한입북스" />
        {/* 3. 설명 */}
        <meta property="og:description" content="한입북스에 등록된 도소들을 만나보세요" />
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {randomBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
