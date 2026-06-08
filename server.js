import http from "node:http";
import path from "node:path";
import fs from "node:fs/promises";
import { serveStatic } from "./utils/serveStatic.js";
import { sendResponse } from "./utils/sendResponse.js";
import { handleGet, handlePost, handleDelete } from "./handlers/routeHandlers.js";

const PORT = 2000;
const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  try {
    //serve data endpoint
    if (req.url.startsWith("/api")) {
      if (req.method === "GET") {
        return await handleGet(res);
      } else if (req.method === "POST") {
        return await handlePost(req, res);
      }else if(req.method === "DELETE"){
        const id = Number(req.url.split("/")[2])
        return await handleDelete(id, res);
      }else if (req.method === "PATCH"){
        const id = Number(req.url.split("/")[3])
        return await handlePatch(id, res);
      }
    }

    serveStatic(req, res, __dirname);
  } catch (err) {
    sendResponse(res, 200, "application/json", {
      message: "Not Found",
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server is connected : ${PORT}`);
});
