import { useCallback, useMemo } from 'react';

import { MenuFoldOutlined, MenuUnfoldOutlined, StarFilled } from '@ant-design/icons';
import { useRouter, useRouterState } from '@tanstack/react-router';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

import { HomeRoute, NAV_ITEMS, resolveNavPath } from '../../router/navigation';
import { useAppSiderStyles } from './appSider.styles';

const SIDER_TOGGLE_KEY = 'sider-toggle';

interface MainMenuProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export const MainMenu = ({ collapsed = false, onCollapse }: MainMenuProps) => {
  const { styles } = useAppSiderStyles();
  const router = useRouter();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  const selectedKey = useMemo(() => resolveNavPath(pathname), [pathname]);

  const menuItems = useMemo<MenuProps['items']>(() => {
    const items: MenuProps['items'] = [];

    if (onCollapse) {
      items.push({
        key: SIDER_TOGGLE_KEY,
        icon: collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />,
        label: collapsed ? 'Развернуть' : 'Свернуть',
        onClick: () => onCollapse(!collapsed),
      });
    }

    items.push({
      key: HomeRoute.to,
      icon: <StarFilled className={styles.homeIcon} />,
      label: collapsed ? (
        'Главная'
      ) : (
        <div className={styles.homeLabel}>
          <span className={styles.homeTitle}>SWAPI Explorer</span>
          <span className={styles.homeSubtitle}>Star Wars Library</span>
        </div>
      ),
    });

    items.push({ type: 'divider' });

    items.push(
      ...NAV_ITEMS.map((item) => ({
        key: item.route.to,
        icon: item.icon,
        label: item.label,
      })),
    );

    return items;
  }, [collapsed, onCollapse, styles]);

  const handleMenuClick: MenuProps['onClick'] = useCallback(
    ({ key }: { key: string }) => {
      if (key === SIDER_TOGGLE_KEY) {
        return;
      }

      router.navigate({ to: key });
    },
    [router],
  );

  return (
    <Menu
      className={styles.menu}
      mode="inline"
      selectedKeys={[selectedKey]}
      items={menuItems}
      onClick={handleMenuClick}
    />
  );
};
