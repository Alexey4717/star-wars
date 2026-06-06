import type { ReactNode } from 'react';

import { Grid, Layout } from 'antd';

import { useAppLayoutStyles } from './appLayout.styles';
import { DesktopLayout } from './DesktopLayout';
import { MobileLayout } from './MobileLayout';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { styles } = useAppLayoutStyles();
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;

  return (
    <Layout className={styles.layout}>
      {isMobile ? (
        <MobileLayout>{children}</MobileLayout>
      ) : (
        <DesktopLayout>{children}</DesktopLayout>
      )}
    </Layout>
  );
}
