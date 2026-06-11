import fs from "node:fs/promises"
import path from "node:path"

export async function writeData(data) {
    const dataPath = path.join("data", "data.json");
    try{
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf8")
    }catch(err){
        console.error(err);
        throw err
    }
}