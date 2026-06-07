import fs from "node:fs/promises"
import path from "node:path"

export async function writeData(data){
    const pathToData = path.join("data", "data.json");
    await fs.writeFile(pathToData, JSON.stringify(data, null, 2), "utf8")
}