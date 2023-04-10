

export function printHelp() {
  console.log("razor-map usage:");
  console.log("   razor-map --folder={FILENAME}");
  console.log("");
  console.log("--help                     print this help");
  console.log("--file={FILENAME}          process the file");
  console.log("");
}
exports.printHelp = printHelp;
export function error(msg: string, includeHelp: boolean) {
  if (includeHelp === void 0) { includeHelp = false; }
  console.error(msg);
  if (includeHelp) {
    console.log("");
    printHelp();
  }
}
exports.error = error;
