import { addNewLearning } from "../utils/addNewLearning.js";
import { getData } from "../utils/getData.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { sendResponse } from "../utils/sendResponse.js";
import { writeData } from "../utils/writeData.js";


export async function handleGet(res) {
    const data = await getData()
    sendResponse(res, 200,'application/json', JSON.stringify(data) )
    
}

export async function handlePost(req, res){
    try{
        const parsedBody = await parseJSONBody(req)
        const newLearning = await addNewLearning(parsedBody)
        sendResponse(res, 201, 'application/json', JSON.stringify(newLearning) )
    }catch(err){
        sendResponse(res, 400, 'application/json', JSON.stringify({'error': err}))
    }
}

export async function handleDelete(id, res){
const learnings = await getData()

    const updatedLearnings = learnings.filter(
        learning => learning.id !== id
    )

    console.log(learnings)
    console.log(updatedLearnings)

    await writeData(updatedLearnings)

    sendResponse(res, 200, "application/json", JSON.stringify({
        message: "Deleted Successfully"
    }))

}