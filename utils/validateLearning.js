export function validateLearning(data) {
  if (!data.topic?.trim()) {
    return {
      valid: false,
      message: "Topic is required",
    };
  }

  if (!data.category?.trim()) {
    return {
      valid: false,
      message: "Category is required",
    };
  }

  if (!data.description?.trim()) {
    return {
      valid: false,
      message: "Description is required",
    };
  }

  return {
    valid: true,
  };
}