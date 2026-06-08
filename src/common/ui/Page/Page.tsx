import type { ReactNode } from 'react';

import { PageHeader } from './PageHeader';
import { usePageStyles } from './page.styles';
import type { PageBreadcrumbItem } from './types';

interface PageProps {
  title?: string;
  breadcrumbs?: PageBreadcrumbItem[];
  children: ReactNode;
}

export const Page = ({ title, breadcrumbs, children }: PageProps) => {
  const { styles } = usePageStyles();

  return (
    <main className={styles.main}>
      <PageHeader breadcrumbs={breadcrumbs} title={title} />
      <section className={styles.section}>{children}</section>
    </main>
  );
};
