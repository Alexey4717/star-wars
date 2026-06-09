import type { ReactNode } from 'react';

import type { AppRouteTo } from '@/common/navigation/routes.gen';

export interface PageBreadcrumbItem {
  title: ReactNode;
  to?: AppRouteTo;
}
