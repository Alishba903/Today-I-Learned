export async function parseJSONBody(req){
    let body = ""
    for await (const chunk of req){
        body += chunk.toString()
    }

    try{
        if(!body.trim()){
            throw new Error("Request body is empty")
        }
        return JSON.parse(body)
    }catch(err){
        throw new Error(
            `Invalid JSON format: ${err.message}`
        )
    }
}