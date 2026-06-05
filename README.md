# Star Wars

Pet-проект на React: каталог и информация о вселенной Star Wars. Сейчас это стартовый каркас с настроенным инструментарием; бизнес-логика и FEOD-структура папок будут наращиваться по мере разработки.

## Стек

| Технология | Назначение |
|---|---|
| [React 19](https://react.dev/) | UI |
| [TypeScript 6](https://www.typescriptlang.org/) | типизация |
| [Vite 8](https://vite.dev/) | сборка и dev-сервер |
| [Ant Design 6](https://ant.design/) | UI-компоненты |
| [Biome](https://biomejs.dev/) | линтинг и форматирование |
| [Bun](https://bun.sh/) | пакетный менеджер и рантайм |

## Быстрый старт

```bash
bun install
bun run dev
```

Приложение откроется на [http://localhost:3000](http://localhost:3000).

## Скрипты

| Команда | Что делает |
|---|---|
| `bun run dev` | Запускает dev-сервер Vite с HMR |
| `bun run build` | Проверяет типы (`tsc -b`) и собирает production-бандл в `build/` |
| `bun run preview` | Локальный просмотр production-сборки |
| `bun run lint` | Проверка кода Biome (линт + формат) |
| `bun run lint:fix` | Автоисправление замечаний Biome |
| `bun run lint:staged` | Проверка только staged-файлов (используется в pre-commit) |
| `bun run format` | Форматирование кода Biome |
| `bun run prepare` | Устанавливает Husky git-хуки |

## Конфигурация Vite

Конфиг разбит на модули в папке `config/` — так проще читать и менять отдельные части сборки.

### `vite.config.ts`

Точка входа. Собирает конфигурацию из модулей и учитывает режим запуска (`serve` / `build`):

- **`base`** — публичный путь приложения из `PUBLIC_URL` (удобно для деплоя не в корень домена)
- **`plugins`** — плагины (зависят от режима)
- **`resolve`** — алиасы и резолв путей
- **`server`** — настройки dev-сервера
- **`build`** — production-сборка
- **`optimizeDeps.force`** — принудительный пересчёт pre-bundling зависимостей
- **`publicDir`** — статика из `public/`

### `config/vite.plugins.ts`

| Плагин | Назначение |
|---|---|
| `@vitejs/plugin-react` | JSX/TSX, Fast Refresh |
| `vite-plugin-svgr` | импорт SVG как React-компонентов |
| `vite-plugin-checker` | проверка TypeScript в dev-режиме с оверлеем ошибок (отключён при `build`) |

### `config/vite.server.ts`

Dev-сервер:

- порт **3000**
- `host: true` — доступ с других устройств в сети
- `open: true` — автоматически открывает браузер

### `config/vite.resolve.ts`

- `tsconfigPaths: true` — алиас `@/*` → `src/*` из `tsconfig.app.json`

### `config/vite.build.ts`

Production-сборка:

- выходная папка: **`build/`**
- ассеты: **`build/static/`**
- **`manifest: true`** — манифест для интеграции со статическим хостингом
- минификация через **Oxc** (`minify: 'oxc'`)
- **`dropConsole: true`** — `console.*` убираются из production
- **code splitting** по группам:
  - `antd`, `@ant-design/icons`, `@ant-design/cssinjs`
  - `rc-*` компоненты
  - `dayjs`
  - `react-vendor` (react, react-dom, scheduler)

Sourcemap генерируются только вне production-сборки.

## Архитектура

Проект планируется по подходу **[FEOD](https://habr.com/ru/companies/sportmaster_lab/articles/972410/)** (Fractal Entity Oriental Design) — модульная структура с чёткими слоями и правилами импортов. Внутри модулей — **MVVM** на базе **MobX**: View (React-компоненты), ViewModel (реактивная логика и состояние), Model (данные и работа с API).

### Слои FEOD

```
src/
├── app/        # точка входа, роутинг, глобальные провайдеры, layout
├── pages/      # страницы — собирают экраны из модулей
├── modules/    # бизнес-логика, изолированные фичи
├── common/     # переиспользуемые утилиты и UI без бизнес-логики
└── global/     # (опционально) глобальные shim-ы, типы, декларации
```

#### Правила импортов между слоями

| Слой | Может импортировать | Нельзя |
|---|---|---|
| **App** | всё | импортировать **из** App |
| **Pages** | App, Modules, Common | — |
| **Modules** | другие Modules (только публичный API), Common | Common → Modules |
| **Common** | только внешние пакеты | другие Common-сущности между собой |
| **Global** | — | нигде не импортируется явно |

Ключевые принципы:

- **Фрактальность** — модуль может содержать подмодули с той же структурой.
- **Публичный API** — из модуля импортируется только через `index.ts` (или аналог). Внутренности модуля приватны.
- **Common без barrel-файлов** — в `common/` не используются индексные файлы: прямые импорты сохраняют tree-shaking и не превращают слой в «склад всего подряд».

### MVVM внутри модуля

Планируемая структура модуля (пример `modules/characters/`):

```
modules/characters/
├── index.ts              # публичный API модуля
├── model/
│   ├── types.ts          # типы домена
│   └── characters.api.ts # запросы к SWAPI
├── view-model/
│   └── characters.vm.ts  # MobX store: состояние, действия, вычисляемые поля
└── view/
    ├── CharactersList.tsx
    └── CharacterCard.tsx
```

- **Model** — чистые данные и сетевой слой, без React.
- **ViewModel** — MobX-класс или store: загрузка, фильтрация, пагинация, обработка ошибок.
- **View** — React-компоненты, обёрнутые в `observer`, без бизнес-логики.

Связь View ↔ ViewModel — через хуки или контекст модуля; View не ходит в API напрямую.

### Алиасы путей

В `tsconfig.app.json` настроен алиас:

```json
"@/*": ["./src/*"]
```

Примеры импортов:

```ts
import { Button } from '@/common/ui/Button';
import { CharactersList } from '@/modules/characters';
import { HomePage } from '@/pages/home';
```

Порядок импортов в Biome уже настроен под слои FEOD (`global` → `common` → `modules` → `pages` → `app`).

## Текущее состояние кодовой базы

Сейчас реализован минимальный каркас:

- `src/main.tsx` — монтирование React-приложения
- `src/App.tsx` — заглушка главного экрана
- `src/index.css` — базовые CSS-переменные и стили
- подключены Ant Design reset-стили и иконки

Папки FEOD-слоёв (`app/`, `pages/`, `modules/`, `common/`) пока не созданы — структура будет появляться по мере добавления фич. Biome и алиасы уже подготовлены под эту организацию.

## Инструменты качества

### Biome

Единый инструмент для линтинга и форматирования. Проверяет `src/`, `config/`, `vite.config.ts`, `index.html`.

Основные настройки:

- одинарные кавычки, точки с запятой
- ширина строки: 100
- правила React Hooks включены (`useHookAtTopLevel`, `useExhaustiveDependencies`)

### Git-хуки (Husky)

| Хук | Действие |
|---|---|
| `pre-commit` | `bun run lint:staged` — Biome проверяет staged-файлы |
| `commit-msg` | `commitlint` — сообщения в формате [Conventional Commits](https://www.conventionalcommits.org/) |

Примеры сообщений: `feat: add character list`, `fix: pagination offset`, `chore: update deps`.

### CI/CD (GitHub Actions)

**CI** (на push/PR в `main`):

1. `bun install --frozen-lockfile`
2. `bun run lint`
3. `bun run build`

**Release** (на push в `main`):

- [semantic-release](https://semantic-release.gitbook.io/) анализирует коммиты, поднимает версию, пишет `CHANGELOG.md`, создаёт GitHub Release
- релизные коммиты помечаются `[skip ci]`, чтобы не запускать лишние прогоны

## TypeScript

Проект использует project references:

- `tsconfig.app.json` — исходники приложения (`src/`)
- `tsconfig.node.json` — конфигурация Vite (`vite.config.ts`, `config/`)

Строгие опции: `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, `erasableSyntaxOnly`.

## Переменные окружения

| Переменная | Назначение |
|---|---|
| `PUBLIC_URL` | Базовый путь для деплоя (например, `/star-wars/`). По умолчанию — корень `/` |

## Полезные ссылки

- [FEOD на Habr](https://habr.com/ru/companies/sportmaster_lab/articles/972410/) — описание архитектурного подхода
- [SWAPI](https://swapi.dev/) — Star Wars API, планируемый источник данных
- [MobX](https://mobx.js.org/) — реактивное управление состоянием (будет добавлен в модули)
