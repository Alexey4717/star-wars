import { Avatar, Card, Col, Row, Tag, Typography } from 'antd';

import type { Character } from '../common/types';
import { useCharacterDetailStyles } from './characterDetail.styles';

interface CharacterDetailViewProps {
  character: Character;
  metaLine: string;
}

const STAT_ITEMS = [
  { key: 'height', label: 'Рост', field: 'height' },
  { key: 'mass', label: 'Вес', field: 'mass' },
  { key: 'birth_year', label: 'Год рождения', field: 'birth_year' },
  { key: 'eye_color', label: 'Цвет глаз', field: 'eye_color' },
  { key: 'hair_color', label: 'Цвет волос', field: 'hair_color' },
  { key: 'gender', label: 'Пол', field: 'gender' },
] as const satisfies ReadonlyArray<{
  key: string;
  label: string;
  field: keyof Character;
}>;

const PLACEHOLDER_SECTIONS = [
  { key: 'films', title: 'Фильмы' },
  { key: 'starships', title: 'Звездолёты' },
] as const;

export const CharacterDetailView = ({ character, metaLine }: CharacterDetailViewProps) => {
  const { styles } = useCharacterDetailStyles();

  return (
    <div className={styles.root}>
      <div className={styles.hero}>
        <Avatar className={styles.avatar} size={72}>
          {character.name.charAt(0)}
        </Avatar>

        <div className={styles.heroContent}>
          <Typography.Title className={styles.name} level={2}>
            {character.name}
          </Typography.Title>

          <Typography.Text className={styles.meta} type="secondary">
            {metaLine}
          </Typography.Text>
        </div>
      </div>

      <Row className={styles.statsGrid} gutter={[16, 16]}>
        {STAT_ITEMS.map((item) => (
          <Col key={item.key} lg={8} md={12} xs={24}>
            <Card className={styles.statCard} size="small" variant="outlined">
              <Typography.Text className={styles.statLabel}>{item.label}</Typography.Text>
              <Typography.Text className={styles.statValue}>
                {String(character[item.field])}
              </Typography.Text>
            </Card>
          </Col>
        ))}
      </Row>

      {PLACEHOLDER_SECTIONS.map((section) => (
        <div className={styles.section} key={section.key}>
          <Typography.Text className={styles.sectionTitle}>{section.title}</Typography.Text>
          <div className={styles.tagList}>
            <Tag className={styles.tag}>Скоро</Tag>
          </div>
        </div>
      ))}
    </div>
  );
};
