import { createStyles } from 'antd-style';

export const usePageStyles = createStyles(({ token }) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: token.marginLG,
  },
  header: {
    margin: 0,
  },
  breadcrumb: {
    fontSize: token.fontSize,
    color: token.colorTextSecondary,
  },
  title: {
    margin: 0,
    fontSize: token.fontSizeHeading2,
    fontWeight: token.fontWeightStrong,
    lineHeight: token.lineHeightHeading2,
  },
  section: {
    flex: 1,
  },
}));
