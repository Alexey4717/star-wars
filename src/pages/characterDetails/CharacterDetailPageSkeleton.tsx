import { Card, Col, Row, Skeleton } from 'antd';

import { useCharacterDetailStyles } from '@/modules/character/detail/characterDetail.styles';

const STAT_SKELETON_KEYS = [
  'height',
  'mass',
  'birth_year',
  'eye_color',
  'hair_color',
  'gender',
] as const;
const SECTION_SKELETON_KEYS = ['films', 'starships'] as const;

export const CharacterDetailPageSkeleton = () => {
  const { styles } = useCharacterDetailStyles();

  return (
    <div className={styles.root}>
      <div className={styles.hero}>
        <Skeleton.Avatar active size={72} />

        <div className={styles.heroContent}>
          <Skeleton.Input active size="large" style={{ width: 220 }} />
          <Skeleton.Input active size="small" style={{ width: 320 }} />
        </div>
      </div>

      <Row className={styles.statsGrid} gutter={[16, 16]}>
        {STAT_SKELETON_KEYS.map((key) => (
          <Col key={key} lg={8} md={12} xs={24}>
            <Card className={styles.statCard} size="small" variant="outlined">
              <Skeleton active paragraph={{ rows: 1, width: '60%' }} title={{ width: '40%' }} />
            </Card>
          </Col>
        ))}
      </Row>

      {SECTION_SKELETON_KEYS.map((key) => (
        <div className={styles.section} key={key}>
          <Skeleton.Input active size="small" style={{ width: 96 }} />
          <Skeleton.Button active size="small" style={{ width: 72 }} />
        </div>
      ))}
    </div>
  );
};
