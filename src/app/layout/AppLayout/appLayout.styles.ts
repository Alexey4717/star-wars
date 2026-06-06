import { createStyles } from 'antd-style';

export const useAppLayoutStyles = createStyles(({ token }) => ({
  layout: {
    minHeight: '100svh',
  },
  content: {
    padding: token.paddingLG,
  },
}));
