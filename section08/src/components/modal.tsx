'use client';

import style from '@/components/modal.module.css';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, []);

  return createPortal(
    <dialog
      onClose={() => router.back()}
      onClick={(e) => {
        // 모달의 배경이 클릭된거면 뒤로가기
        if ((e.target as any).nodeName === 'DIALOG') {
          router.back();
        }
      }}
      ref={dialogRef}
      className={style.modal}
    >
      {children}
    </dialog>,
    document.getElementById('modal-root') as HTMLElement
  );
}
