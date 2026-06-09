import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROUTE_TREE_PATH = path.join(ROOT, 'src/app/router/routeTree.gen.ts');
const OUTPUT_PATH = path.join(ROOT, 'src/common/navigation/routes.gen.ts');

const GENERATED_HEADER = `/* eslint-disable */

// @ts-nocheck

// This file was automatically generated from routeTree.gen.ts.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should exclude this file from your linter and/or formatter.
`;

const extractToPaths = (content: string): string[] => {
  const fileRouteTypesMatch = content.match(/export interface FileRouteTypes \{[\s\S]*?\n\}/);

  if (!fileRouteTypesMatch) {
    throw new Error('FileRouteTypes not found in routeTree.gen.ts');
  }

  const lines = fileRouteTypesMatch[0].split('\n');
  const toLineIndex = lines.findIndex((line) => line.trim() === 'to:');

  if (toLineIndex === -1) {
    throw new Error('FileRouteTypes.to union not found in routeTree.gen.ts');
  }

  const paths: string[] = [];

  for (let index = toLineIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    const pathMatch = line.match(/^\s+\| '([^']+)'/);

    if (!pathMatch) {
      break;
    }

    paths.push(pathMatch[1]);
  }

  if (paths.length === 0) {
    throw new Error('FileRouteTypes.to union is empty in routeTree.gen.ts');
  }

  return paths;
};

const buildRoutesTree = (paths: string[]): Record<string, unknown> => {
  const root: Record<string, unknown> = {};

  for (const routePath of [...paths].sort()) {
    if (routePath === '/') {
      root.home = '/';
      continue;
    }

    const segments = routePath.split('/').filter(Boolean);
    const section = segments[0];

    if (segments.length === 1) {
      if (!root[section]) {
        root[section] = { $url: routePath };
      } else {
        (root[section] as Record<string, string>).$url = routePath;
      }

      continue;
    }

    const paramSegment = segments[1];

    if (!paramSegment.startsWith('$')) {
      throw new Error(`Unsupported route path segment in ${routePath}`);
    }

    if (!root[section]) {
      root[section] = {};
    }

    const sectionObject = root[section] as Record<string, string>;
    sectionObject[`$${paramSegment.slice(1)}`] = routePath;
  }

  return root;
};

const serializeValue = (value: unknown, indent: number): string => {
  const spaces = '  '.repeat(indent);

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  const objectValue = value as Record<string, unknown>;
  const lines = ['{'];

  for (const [key, nestedValue] of Object.entries(objectValue)) {
    lines.push(`${spaces}  ${key}: ${serializeValue(nestedValue, indent + 1)},`);
  }

  lines.push(`${spaces}}`);

  return lines.join('\n');
};

export const generateRoutes = (): void => {
  const content = fs.readFileSync(ROUTE_TREE_PATH, 'utf-8');
  const paths = extractToPaths(content);
  const tree = buildRoutesTree(paths);

  const output = `${GENERATED_HEADER}
import type { FileRouteTypes } from '@/app/router/routeTree.gen';

export type AppRouteTo = FileRouteTypes['to'];

export const ROUTES = ${serializeValue(tree, 0)} as const;
`;

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, output);
};

const isCliInvocation =
  process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isCliInvocation) {
  generateRoutes();
}
