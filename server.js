import http from "node:http";
import { serveStatic } from "./utils/serveStatic.js";
import { sendResponse } from "./utils/sendResponse.js";
import {
  handleGet,
  handlePost,
  handleDelete,
  handlePatch,
  handleGetById
} from "./handlers/routeHandlers.js";

const PORT = 2000;
const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  try {
    const segments = req.url.split("/");
    //serve data endpoint
    if (req.url.startsWith("/api")) {
      if (req.method === "GET") {
        if(segments.length === 2 && segments[1] === "api"){
         return await handleGet(res);
        } else if (segments.length === 3){
          const id = Number(segments[2]);
          return await handleGetById(id, res);
        }
      } else if (req.method === "POST") {
        return await handlePost(req, res);
      } else if (
        req.method === "DELETE"
      ) {
        const id = Number(segments[2]);
        return await handleDelete(id, res);
      } else if (
        req.method === "PATCH" &&
        req.url.startsWith("/api/favorite/")
      ) {
        const id = Number(segments[3]);
        return await handlePatch(id, res);
      }

      return sendResponse(res, 404, "application/json", {
        message: "API Route Not Found"
      })
    }

    serveStatic(req, res, __dirname);
  } catch (err) {
    sendResponse(res, 500, "application/json", {
      message: "Internal Server Error"
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server is connected : ${PORT}`);
});
