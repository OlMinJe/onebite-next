import style from '@/components/searchable-layout.module.css';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

export default function SearchableLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  // React의 Change 이벤트를 의미하며, input element에서 발생한 이벤트 타입임을 의미한다.
  const onChengeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const oneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search}
          onKeyDown={oneKeyDown}
          placeholder="검색어를 입력해주세요..."
          onChange={onChengeSearch}
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
