import path from 'node:path'
import fs from 'node:fs/promises'
import { getContentType } from './getContentType.js'
import { sendResponse } from './sendResponse.js'

export async function serveStatic(req, res, baseDir){

    const PUBLIC_DIR = path.join(baseDir, "public");
    const filePath = path.join(
        PUBLIC_DIR,
        req.url === '/' ? 'index.html' : req.url.split("?")[0]
    )

    const ext = path.extname(filePath)
    const contentType = getContentType(ext)

    try{
        const content = await fs.readFile(filePath)
        return sendResponse(res, 200, contentType, content)
    }catch(err){
        console.error(`Failed to serve ${filePath}:`, err.message)
        return sendResponse(res, 404, "application/json", {
            message: "File not found"
        })
    }
}