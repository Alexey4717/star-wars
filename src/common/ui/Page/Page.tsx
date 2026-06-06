import type { ReactNode } from 'react';

import { PageHeader } from './PageHeader';
import { usePageStyles } from './page.styles';

interface PageProps {
  title: string;
  children: ReactNode;
}

export const Page = ({ title, children }: PageProps) => {
  const { styles } = usePageStyles();

  return (
    <main className={styles.main}>
      <PageHeader title={title} />
      <section className={styles.section}>{children}</section>
    </main>
  );
};
