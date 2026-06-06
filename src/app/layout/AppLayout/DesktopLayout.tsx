import { type ReactNode, useState } from 'react';

import { Layout } from 'antd';

import { AppSider } from '../AppSidebar/AppSider';
import { useAppLayoutStyles } from './appLayout.styles';

const { Content } = Layout;

interface DesktopLayoutProps {
  children: ReactNode;
}

export const DesktopLayout = ({ children }: DesktopLayoutProps) => {
  const { styles } = useAppLayoutStyles();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <AppSider collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </>
  );
};
