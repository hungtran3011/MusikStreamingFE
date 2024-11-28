import Loading from '@/app/app-components/loading/loading';
import { ReactNode } from 'react';
import { Suspense } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<Loading/>}>
    {children}
    </Suspense>
  );
}