import { Link } from '@tanstack/react-router';
import { Breadcrumb } from 'antd';

import { usePageStyles } from './page.styles';
import type { PageBreadcrumbItem } from './types';

interface PageHeaderProps {
  title?: string;
  breadcrumbs?: PageBreadcrumbItem[];
}

export const PageHeader = ({ title, breadcrumbs }: PageHeaderProps) => {
  const { styles } = usePageStyles();

  if (breadcrumbs?.length) {
    return (
      <header className={styles.header}>
        <Breadcrumb
          className={styles.breadcrumb}
          items={breadcrumbs.map((item, index) => ({
            key: index,
            title: item.to ? <Link to={item.to}>{item.title}</Link> : item.title,
          }))}
        />
      </header>
    );
  }

  if (!title) {
    return null;
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
};
