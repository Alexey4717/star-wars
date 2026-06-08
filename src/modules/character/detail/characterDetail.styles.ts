import { createStyles } from 'antd-style';

export const useCharacterDetailStyles = createStyles(({ token }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: token.marginXL,
  },
  hero: {
    display: 'flex',
    alignItems: 'center',
    gap: token.marginLG,
  },
  avatar: {
    flexShrink: 0,
    backgroundColor: token.colorPrimary,
    fontFamily: token.fontFamilyHeading,
    fontWeight: token.fontWeightStrong,
  },
  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: token.marginXS,
    minWidth: 0,
  },
  name: {
    margin: 0,
    fontFamily: token.fontFamilyHeading,
  },
  meta: {
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
  },
  statsGrid: {
    width: '100%',
  },
  statCard: {
    height: '100%',
    backgroundColor: token.colorBgContainer,
    borderColor: token.colorBorder,
  },
  statLabel: {
    display: 'block',
    marginBottom: token.marginXS,
    fontSize: token.fontSizeSM,
    color: token.colorTextSecondary,
  },
  statValue: {
    display: 'block',
    fontSize: token.fontSizeLG,
    fontWeight: token.fontWeightStrong,
    color: token.colorText,
    lineHeight: token.lineHeightLG,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: token.marginSM,
  },
  sectionTitle: {
    fontSize: token.fontSizeSM,
    fontWeight: token.fontWeightStrong,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: token.colorTextSecondary,
  },
  tagList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: token.marginXS,
  },
  tag: {
    margin: 0,
    paddingInline: token.paddingMD,
    paddingBlock: token.paddingXS,
    borderRadius: token.borderRadiusLG,
    backgroundColor: 'transparent',
    borderColor: token.colorBorder,
    color: token.colorText,
  },
}));
