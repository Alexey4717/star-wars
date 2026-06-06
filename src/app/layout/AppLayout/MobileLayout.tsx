import { type ReactNode, useState } from 'react';

import { MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Drawer, Layout } from 'antd';

import { AppSider } from '../AppSidebar/AppSider';
import { useAppLayoutStyles } from './appLayout.styles';

const { Content } = Layout;

interface MobileLayoutProps {
  children: ReactNode;
}

export const MobileLayout = ({ children }: MobileLayoutProps) => {
  const { styles } = useAppLayoutStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Layout>
        <Content className={styles.content}>
          <Button
            type="text"
            icon={<MenuUnfoldOutlined />}
            onClick={() => setDrawerOpen(true)}
            style={{ marginBottom: 16 }}
            aria-label="Открыть меню"
          />
          {children}
        </Content>
      </Layout>
      <Drawer
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        size={240}
        styles={{ body: { padding: 0 } }}
      >
        <AppSider />
      </Drawer>
    </>
  );
};
