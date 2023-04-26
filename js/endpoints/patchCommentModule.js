export function patchCommentModule(commentId, text) {
  try {
    const response = await fetch(`http://localhost:3000/comments`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({
        _id: commentId,
        text: text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.text();

    // Return an object containing the status code and data
    return {
      status: response.status,
      data,
    };
  } catch (error) {
    console.error(error);
  }
}
