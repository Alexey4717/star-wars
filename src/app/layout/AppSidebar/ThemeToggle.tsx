import { useMemo } from 'react';

import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

import { useTheme } from '../../providers/ThemeProvider';

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const items: MenuProps['items'] = useMemo(() => {
    const isDark = resolvedTheme === 'dark';
    const Icon = isDark ? MoonOutlined : SunOutlined;

    return [
      {
        key: 'theme-toggle',
        icon: <Icon />,
        label: isDark ? 'Изменить на светлую' : 'Изменить на тёмную',
        onClick: () => setTheme(isDark ? 'light' : 'dark'),
      },
    ];
  }, [resolvedTheme, setTheme]);

  return <Menu mode="inline" selectable={false} items={items} />;
};
