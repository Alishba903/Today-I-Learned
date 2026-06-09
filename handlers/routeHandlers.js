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
  const UpdateFavLearning = learnings.find((learning) => learning.id === id);

  try {
    if (!UpdateFavLearning) {
      sendResponse(res, 404, "application/json", {
        message: "Learning Not Found!",
      });
    }

    UpdateFavLearning.favorite = !UpdateFavLearning.favorite;
    await writeData(learnings);
    sendResponse(res, 200, "application/json", {
      message: "Learning Updated Successfully",
      favorite: UpdateFavLearning.favorite,
    });
  } catch (err) {
    console.error(err);

    sendResponse(res, 500, "application/json", {
      message: "Internal Server Error",
    });
  }
}
