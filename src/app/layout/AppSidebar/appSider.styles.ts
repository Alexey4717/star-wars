import { createStyles } from 'antd-style';

export const useAppSiderStyles = createStyles(({ token }) => ({
  sider: {
    borderInlineEnd: `1px solid ${token.colorBorder}`,
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: '100svh',
  },
  homeIcon: {
    color: token.colorCrawlGold,
    fontSize: 22,
  },
  homeLabel: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  homeTitle: {
    fontFamily: token.fontFamilyHeading,
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 1.2,
    color: token.colorText,
  },
  homeSubtitle: {
    fontSize: 12,
    color: token.colorTextSecondary,
    lineHeight: 1.3,
  },
  menu: {
    flex: 1,
    borderInlineEnd: 'none',
    padding: `${token.paddingSM}px ${token.paddingXS}px`,
  },
  footer: {
    marginTop: 'auto',
    padding: `${token.paddingSM}px ${token.paddingXS}px`,
    borderTop: `1px solid ${token.colorBorder}`,
  },
}));
