import path from 'node:path'
import fs from 'node:fs/promises'
import { getContentType } from './getContentType.js';
import { sendResponse } from './sendResponse.js';

export async function serveStatic(req, res, baseDir) {
  const publicDir = path.join(baseDir, 'public');
  const pathToResource = path.join(
    publicDir,
    req.url == "/" ? "index.html" : req.url,
  );

  const ext = path.extname(pathToResource);
  const contentType = getContentType(ext);

  try {
    const content = await fs.readFile(pathToResource);
    sendResponse(res, 200, contentType, content);
  } catch (err) {
    res.statusCode = 404;
    res.end("File not found");
  }
}
