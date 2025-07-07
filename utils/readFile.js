import { readFile } from "node:fs/promises";
const path = path.resolve("../", "data/riddles.txt");

export default async function fileReader(level = "Easy") {
  try {
    const data = await readFile(path, "utf8");
    const jsonData = JSON.parse(data);
    console.log(jsonData[level]);
    return jsonData[level];
  } catch (err) {
    console.error(err);
  }
}
