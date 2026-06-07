import path from "node:path";
import fs from "node:fs/promises";
import { getData } from "./getData.js";
import { writeData } from "./writeData.js";

export async function addNewLearning(newLearning) {
  const learningWithId = {
    id: Date.now(),
    favorite: false,
    ...newLearning,
  };
  try {

    let learnings = await getData();
    learnings.push(learningWithId);
    await writeData(learnings)
    return learningWithId;

  } catch (err) {
    throw new Error(err);
  }
}
