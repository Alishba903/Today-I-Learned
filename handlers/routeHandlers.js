import { addNewLearning } from "../utils/addNewLearning.js";
import { getData } from "../utils/getData.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { sendResponse } from "../utils/sendResponse.js";


export async function handleGet(res) {
    const data = await getData()
    sendResponse(res, 200,'application/json', JSON.stringify(data) )
    
}

export async function handlePost(req, res){
    try{
        const parsedBody = await parseJSONBody(req)
        await addNewLearning(parsedBody)
        sendResponse(res, 201, 'application/json', JSON.stringify(parsedBody) )
    }catch(err){
        sendResponse(res, 400, 'application/json', JSON.stringify({'error': err}))
    }
}