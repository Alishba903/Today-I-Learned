import { addNewLearning } from "../utils/addNewLearning.js";
import { getData } from "../utils/getData.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { sendResponse } from "../utils/sendResponse.js";
import { validateLearning } from "../utils/validateLearning.js";
import { writeData } from "../utils/writeData.js";

export async function handleGet(res) {
  const data = await getData();
  return sendResponse(res, 200, "application/json", data);
}

export async function handleGetById(id, res) {
  const data = await getData();

  const learning = data.find((lrning) => {
    return lrning.id === id;
  });

  try {
    if (!learning) {
      return sendResponse(res, 404, "application/json", {
        message: "Learning Not Found",
      });
    }
    return sendResponse(res, 200, "application/json", learning);
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, "application/json", {
      message: "Internal Server Error",
    });
  }
}

export async function handlePost(req, res) {
  try {
    const parsedBody = await parseJSONBody(req);
    const validLearning = validateLearning(parsedBody);
    if (!validLearning.valid) {
      return sendResponse(res, 400, "application/json", {
        message: validLearning.message,
      });
    }
    const newLearning = await addNewLearning(parsedBody);
    return sendResponse(res, 201, "application/json", newLearning);
  } catch (err) {
    return sendResponse(res, 400, "application/json", { error: err.message });
  }
}

export async function handleDelete(id, res) {
  const learnings = await getData();

  const updatedLearnings = learnings.filter((learning) => learning.id !== id);

  if (updatedLearnings.length === learnings.length) {
    return sendResponse(res, 404, "application/json", {
      message: "Learning Not Found",
    });
  }

  await writeData(updatedLearnings);

  return sendResponse(res, 200, "application/json", {
    message: "Deleted Successfully",
  });
}

export async function handlePatch(id, res) {
  const learnings = await getData();
  const learning = learnings.find((learning) => learning.id === id);

  try {
    if (!learning) {
      return sendResponse(res, 404, "application/json", {
        message: "Learning Not Found!",
      });
    }

    learning.favorite = !learning.favorite;
    await writeData(learnings);
    return sendResponse(res, 200, "application/json", {
      message: "Learning Updated Successfully",
      favorite: learning.favorite,
    });
  } catch (err) {
    console.error(err);

    return sendResponse(res, 500, "application/json", {
      message: "Internal Server Error",
    });
  }
}

export async function handlePut(id, req, res) {

  const data = await getData();
  const learning = data.find((lrning) => lrning.id === id);

  try {
    if (!learning) {
      return sendResponse(res, 404, "application/json", {
        message: "Learning Not Found",
      });
    }

    const parsedBody = await parseJSONBody(req);
    const validLearning = validateLearning(parsedBody);
    if (!validLearning.valid) {
      return sendResponse(res, 400, "application/json", {
        message: validLearning.message,
      });
    }

    const {topic , category, description, date} = parsedBody;

    learning.topic = topic;
    learning.category = category;
    learning.description = description;
    learning.date = date;

    await writeData(data);
    return sendResponse(res, 200, "application/json", {
      message: "Learning Updated Successfully",
      learning,
    });

  } catch (err) {
    return sendResponse(res, 400, "application/json", { error: err.message });
  }
}
