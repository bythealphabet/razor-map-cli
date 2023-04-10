#!/usr/bin/env node

import path from "path";
import fs from "fs";
import { ContentTransform } from "./content-transform";
import { findFiles } from "./find";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

interface CommandLineArgs {
  folder: string;
  _: (string | number)[];
  $0: string;
}

const argv: CommandLineArgs = yargs(hideBin(process.argv))
  .options({
    folder: {
      type: "string",
      default: "Pages",
      alias: "f",
      describe: "Specify the folder containing the .cshtml files"
    }
  })
  .strict()
  .parseSync();


async function main(): Promise<void> {
  const folderPath = argv.folder;
  const razorFiles = findFiles(folderPath, '.cshtml');
  const partialMap: Record<string, string[]> = {};

  for (const filePath of razorFiles) {
    await processFileRecursively(filePath, partialMap);
  }

  for (const view of Object.keys(partialMap)) {
    printTree(view, partialMap, new Set());
  }
}

function printTree(view: string, partialMap: Record<string, string[]>, visited: Set<string>, level: number = 0): void {
  const indent = '  '.repeat(level);
  console.log(`${indent}${view}:`);

  if (visited.has(view)) {
    console.log(`${indent}  [Circular reference detected]`);
    return;
  }

  visited.add(view);

  const partials = partialMap[view];
  if (partials) {
    for (const partial of partials) {
      printTree(partial, partialMap, new Set(visited), level + 1);
    }
  }
}

async function processFileRecursively(filePath: string, partialMap: Record<string, string[]>): Promise<void> {
  const [fileName, partials] = await processFile(filePath);
  if (partials.length > 0) {
    partialMap[fileName] = partials;
    for (const partial of partials) {
      const partialFolderPath = path.dirname(filePath);
      const partialFilePath = path.join(partialFolderPath, `${partial}.cshtml`);
      if (fs.existsSync(partialFilePath)) {
        await processFileRecursively(partialFilePath, partialMap);
      }
    }
  }
}


function processFile(filePath: string): Promise<[string, string[]]> {
  return new Promise(async (resolve, reject) => {
    const fileName = path.basename(filePath);

    const fileStream = fs.createReadStream(filePath, { encoding: "utf-8" });
    const contentTransform = new ContentTransform((partials: string[]) => {
      resolve([fileName, partials]);
    });

    fileStream.on("error", reject);
    fileStream.pipe(contentTransform).on("error", reject);
  });
}

main();