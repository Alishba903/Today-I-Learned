import path from "node:path";
import fs from "node:fs/promises";
import { getData } from "./getData.js";
import { writeData } from "./writeData.js";

export async function addNewLearning(newLearning) {
  const learning = {
    id: Date.now(),
    favorite: false,
    ...newLearning,
  };
  try {

    let learnings = await getData();
    learnings.push(learning);
    await writeData(learnings)
    return learning;

  } catch (err) {
    throw new Error(err);
  }
}
