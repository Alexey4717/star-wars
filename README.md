# Star Wars

Pet-проект на React: каталог и информация о вселенной Star Wars. Сейчас это стартовый каркас с настроенным инструментарием; бизнес-логика и FEOD-структура папок будут наращиваться по мере разработки.

## Стек

| Технология | Назначение |
|---|---|
| [React 19](https://react.dev/) | UI |
| [TypeScript 6](https://www.typescriptlang.org/) | типизация |
| [Vite 8](https://vite.dev/) | сборка и dev-сервер |
| [Ant Design 6](https://ant.design/) | UI-компоненты |
| [TanStack Router](https://tanstack.com/router/latest) | типизированный роутинг (file-based) |
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
| `bun run check:generated` | Проверяет артефакты кодогенераций, например что `routeTree.gen.ts` совпадает с актуальным деревом маршрутов (запускать **после** `build`) |
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
| `@tanstack/router-plugin` | file-based роутинг, генерация `routeTree.gen.ts`, code splitting |
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

## Роутинг

Роутинг построен на **[TanStack Router](https://tanstack.com/router/latest)** с **file-based routing**: файлы в `src/app/router/routes/` автоматически превращаются в дерево маршрутов (генерируется `src/app/router/routeTree.gen.ts`).

Роутинг разделён на два слоя по FEOD:

| Слой | Папка | Ответственность |
|---|---|---|
| **App** | `src/app/router/routes/` | тонкие route-адаптеры: `createFileRoute`, pending/error, передача params |
| **Pages** | `src/pages/{entity}/` | UI страниц, без привязки к роутеру |

```
src/app/router/
├── router.ts              # createRouter
├── routeTree.gen.ts       # автогенерация (не редактировать вручную)
├── navigation.tsx         # конфиг sidenav
└── routes/
    ├── __root.tsx         # AppProviders + Outlet
    ├── _layout.tsx        # pathless layout: AppLayout + Outlet
    └── _layout/
        ├── index.tsx      # /
        ├── films/
        │   ├── index.tsx  # /films
        │   └── $filmId.tsx # /films/:filmId
        └── ...
```

Pathless layout `_layout` оборачивает все страницы в shell приложения (sidebar + content). URL остаётся «чистым»: `/films`, а не `/_layout/films`.

### Добавить новый раздел (list + detail)

Пример — раздел **droids** с маршрутами `/droids` и `/droids/:droidId`.

**1. Страницы** (`src/pages/droids/`):

```tsx
// DroidsPage.tsx
export const DroidsPage = () => <Page title="Дроиды">...</Page>;

// DroidDetailPage.tsx
interface DroidDetailPageProps {
  droidId: string;
}

export const DroidDetailPage = ({ droidId }: DroidDetailPageProps) => (
  <Page title={`Дроид ${droidId}`}>...</Page>
);
```

**2. Route-файлы** (`src/app/router/routes/_layout/droids/`):

```tsx
// index.tsx — список
import { createFileRoute } from '@tanstack/react-router';

import { createRouteError } from '@/common/ui/ErrorBoundary/ErrorBoundary';
import { createRoutePending } from '@/common/ui/RoutePending/RoutePending';

import { DroidsPage } from '@/pages/droids/DroidsPage';

export const Route = createFileRoute('/_layout/droids/')({
  component: DroidsPage,
  pendingComponent: createRoutePending('дроидов'),
  errorComponent: createRouteError('дроиды'),
});
```

```tsx
// $droidId.tsx — детальная страница
import { createFileRoute } from '@tanstack/react-router';

import { createRouteError } from '@/common/ui/ErrorBoundary/ErrorBoundary';
import { createRoutePending } from '@/common/ui/RoutePending/RoutePending';

import { DroidDetailPage } from '@/pages/droids/DroidDetailPage';

export const Route = createFileRoute('/_layout/droids/$droidId')({
  component: () => {
    const { droidId } = Route.useParams();
    return <DroidDetailPage droidId={droidId} />;
  },
  pendingComponent: createRoutePending('дроида'),
  errorComponent: createRouteError('дроид', { notFoundTitle: 'Дроид не найден' }),
});
```

Params читаются **только в route-адаптере** через `Route.useParams()` — так TypeScript проверяет имена параметров. Page получает их через props и не импортирует роутер.

**3. Sidenav** — [`src/app/router/navigation.tsx`](src/app/router/navigation.tsx):

```tsx
import { Route as DroidsRoute } from './routes/_layout/droids/index';

// добавить в union NavListRouteTo:
// | '/droids'

export const NAV_ITEMS = [
  // ...
  {
    route: DroidsRoute,
    label: 'Дроиды',
    icon: <AndroidOutlined />,
  },
] as const satisfies readonly NavItem<{ readonly to: NavListRouteTo }>[];
```

Пункт меню ссылается на объект `Route`, а не на строку — путь берётся из `route.to` и типизируется автоматически.

**4. Проверка** — после сохранения файлов Vite-плагин перегенерирует `routeTree.gen.ts`. Запустите `bun run dev` или `bun run build`, затем закоммитьте обновлённый `routeTree.gen.ts`. Локально можно проверить актуальность: `bun run build && bun run check:generated`.

### Добавить только list-страницу (без detail)

Достаточно шагов 1–2 с одним `index.tsx` (как `/transports`). Detail-файл `$id.tsx` не создавать.

### Изменить существующий роут

| Задача | Что менять |
|---|---|
| Переименовать URL | файлы/папки в `routes/_layout/`, path в `createFileRoute(...)`, page-компонент |
| Переименовать param | `$filmId.tsx` → `$id.tsx`, props в Page, `Route.useParams()` в адаптере |
| Сменить UI | `src/pages/...` — route-файл можно не трогать |
| Текст загрузки / ошибки | `createRoutePending('...')`, `createRouteError('...')` в route-файле |
| Пункт sidenav | `navigation.tsx`: label, icon, `route` |

После переименования route-файлов плагин обновит `routeTree.gen.ts`. TypeScript подскажет места, где сломалась типизация (navigation, navigate, Link).

### Удалить роут

1. Удалить папку route-файлов: `src/app/router/routes/_layout/{entity}/`
2. Удалить page-компоненты: `src/pages/{entity}/`
3. Убрать запись из `NAV_ITEMS` и union `NavListRouteTo` в `navigation.tsx`
4. Убедиться, что нет импортов удалённых страниц в других файлах
5. `bun run build` — пересобрать `routeTree.gen.ts` и закоммитить изменения; `bun run check:generated` должен завершиться без diff

### Pending и error UI

В route-файлах используются фабрики из Common:

- `createRoutePending('фильмов')` → «Загрузка фильмов...»
- `createRouteError('фильм', { notFoundTitle: 'Фильм не найден' })` → `404` при `notFound()` в loader, иначе `error`

Глобальный fallback — `defaultErrorComponent` в [`src/app/router/router.ts`](src/app/router/router.ts).

### Типизация

- [`src/global/tanstack-router.d.ts`](src/global/tanstack-router.d.ts) — augmentation `Register` для типобезопасных `Link`, `useNavigate`, `useParams`
- `routeTree.gen.ts` — типы путей (`FileRouteTypes['to']`); файл генерируется автоматически при `dev`/`build`, в Biome исключён из проверки. В CI после сборки запускается `check:generated`: если маршруты менялись, а файл не закоммичен — пайплайн упадёт
- `tsconfig.app.json` — `"strict": true` (обязательно для TanStack Router)

### Ссылки по роутингу

- [TanStack Router — File-Based Routing](https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing)
- [TanStack Router — Code Splitting](https://tanstack.com/router/latest/docs/framework/react/guide/code-splitting)

## Текущее состояние кодовой базы

Реализован каркас приложения:

- **App** — layout (desktop/mobile), sidebar, theme toggle, TanStack Router, провайдеры
- **Pages** — заглушки для всех SWAPI-сущностей (films, characters, planets и др.)
- **Common** — `Page`, `RoutePending`, `ErrorBoundary`
- **Global** — augmentation типов для Ant Design и TanStack Router

Модули (`modules/`) и интеграция со SWAPI — следующий этап.

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
4. `bun run check:generated` — `routeTree.gen.ts` должен совпадать с результатом сборки

**Release** (на push в `main`):

- [semantic-release](https://semantic-release.gitbook.io/) анализирует коммиты, поднимает версию, пишет `CHANGELOG.md`, создаёт GitHub Release
- релизные коммиты помечаются `[skip ci]`, чтобы не запускать лишние прогоны

## TypeScript

Проект использует project references:

- `tsconfig.app.json` — исходники приложения (`src/`)
- `tsconfig.node.json` — конфигурация Vite (`vite.config.ts`, `config/`)

Строгие опции: `strict`, `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, `erasableSyntaxOnly`.

## Переменные окружения

| Переменная | Назначение |
|---|---|
| `PUBLIC_URL` | Базовый путь для деплоя (например, `/star-wars/`). По умолчанию — корень `/` |

## Полезные ссылки

- [FEOD на Habr](https://habr.com/ru/companies/sportmaster_lab/articles/972410/) — описание архитектурного подхода
- [SWAPI](https://swapi.dev/) — Star Wars API, планируемый источник данных
- [MobX](https://mobx.js.org/) — реактивное управление состоянием (будет добавлен в модули)
