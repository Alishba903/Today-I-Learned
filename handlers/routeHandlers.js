import { addNewLearning } from "../utils/addNewLearning.js";
import { getData } from "../utils/getData.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { sendResponse } from "../utils/sendResponse.js";
import { writeData } from "../utils/writeData.js";

export async function handleGet(res) {
  const data = await getData();
  sendResponse(res, 200, "application/json", data);
}

export async function handlePost(req, res) {
  try {
    const parsedBody = await parseJSONBody(req);
    const newLearning = await addNewLearning(parsedBody);
    sendResponse(res, 201, "application/json", newLearning);
  } catch (err) {
    sendResponse(res, 400, "application/json", { error: err });
  }
}

export async function handleDelete(id, res) {
  const learnings = await getData();

  const updatedLearnings = learnings.filter((learning) => learning.id !== id);

  await writeData(updatedLearnings);

  sendResponse(res, 200, "application/json", {
    message: "Deleted Successfully",
  });
}

export async function handlePatch(id, res) {
  const learnings = await getData();
  const learning = learnings.find((learning) => learning.id === id);
  if (!learning) {
    sendResponse(res, 404, "application/json", {
      message: "Learning not found",
    });
    
  } else {
    learning.favorite = !learning.favorite;
    await writeData(learnings);
    sendResponse(res, 200, "application/json", {
        message: "Favorite updated",
        favorite: learning.favorite
    })
    
  }
}
