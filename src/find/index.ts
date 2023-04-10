import fs from 'fs';
import path from 'path';

export function findPartials(content: string): string[] {
  const partialRegex = /@await\s+Html\.PartialAsync\(\s*["']([^"']+)["']\s*(?:,|\))/g;
  const partials: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = partialRegex.exec(content)) !== null) {
    partials.push(match[1]);
  }

  return partials;
}

export function findFiles(root: string, extension: string): string[] {
  const files: string[] = [];
  const traverse = (dir: string) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(extension)) {
        files.push(fullPath);
      }
    }
  };
  traverse(root);
  return files;
}
