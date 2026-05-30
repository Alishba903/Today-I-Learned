export function sendResponse(res, statusCode, contentType, payLoads){
    res.statusCode = statusCode
    res.setHeader('Content-Type', contentType)
    res.end(payLoads)
}