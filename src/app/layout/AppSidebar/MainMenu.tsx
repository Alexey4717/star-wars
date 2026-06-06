import { useCallback, useMemo } from 'react';

import { MenuFoldOutlined, MenuUnfoldOutlined, StarFilled } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppSiderStyles } from './appSider.styles';
import { navItems } from './navItems';

const SIDER_TOGGLE_KEY = 'sider-toggle';
const HOME_NAV_KEY = '/';

interface MainMenuProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export const MainMenu = ({ collapsed = false, onCollapse }: MainMenuProps) => {
  const { styles } = useAppSiderStyles();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const selectedKey = useMemo(() => {
    if (pathname === HOME_NAV_KEY) {
      return [HOME_NAV_KEY];
    }

    const matchedItem = navItems.find((item) => item && 'key' in item && item.key === pathname);

    return matchedItem ? [String(matchedItem.key)] : [HOME_NAV_KEY];
  }, [pathname]);

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
      key: HOME_NAV_KEY,
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
    items.push(...navItems);

    return items;
  }, [collapsed, onCollapse, styles]);

  const handleMenuClick: MenuProps['onClick'] = useCallback(
    ({ key }) => {
      if (key === SIDER_TOGGLE_KEY) {
        return;
      }

      navigate(String(key));
    },
    [navigate],
  );

  return (
    <Menu
      className={styles.menu}
      mode="inline"
      selectedKeys={selectedKey}
      items={menuItems}
      onClick={handleMenuClick}
    />
  );
};
