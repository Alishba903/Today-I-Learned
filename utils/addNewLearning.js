import path from 'node:path'
import fs from 'node:fs/promises'
import { getData } from './getData.js'

export async function addNewLearning(newLearning){
    try{
        let learnings = await getData()
        learnings.push(newLearning)
        const pathToData = path.join('data', 'data.json')
        await fs.writeFile(pathToData, JSON.stringify(learnings, null, 2), 'utf8')
    }catch(err){
        throw new Error(err)
    }
}
