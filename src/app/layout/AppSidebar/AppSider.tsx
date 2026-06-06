import { Layout } from 'antd';

import { useAppSiderStyles } from './appSider.styles';
import { MainMenu } from './MainMenu';
import { ThemeToggle } from './ThemeToggle';

const { Sider } = Layout;

interface AppSiderProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  width?: number;
}

export function AppSider({ collapsed = false, onCollapse, width = 240 }: AppSiderProps) {
  const { styles } = useAppSiderStyles();

  return (
    <Sider
      className={styles.sider}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={width}
      breakpoint="lg"
      collapsedWidth={64}
      trigger={null}
    >
      <div className={styles.inner}>
        <MainMenu collapsed={collapsed} onCollapse={onCollapse} />
        <div className={styles.footer}>
          <ThemeToggle />
        </div>
      </div>
    </Sider>
  );
}
