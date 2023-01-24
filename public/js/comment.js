const submitCommentFormHandler = async (event) => {
    event.preventDefault();

console.log(event.target[1].dataset);

    const comment = document.querySelector('#user-comment').value.trim();
    const goalId = event.target[1].dataset.postId;

    console.log(comment);

    // if (comment) {
    if (comment) {
      const response = await fetch(`/api/comment/${goalId}`, {
        method: 'POST',
        body: JSON.stringify({ comment }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/goal/${goalId}`);
      } else {
        alert('Failed to save comment.');
      }
    }
  };

  document
  .querySelector('.comment-form')
  .addEventListener('submit', submitCommentFormHandler);
  
async function deleteComment(event) {
  const commentId = event.target.dataset.id
  const response = await fetch("/api/comment/" + commentId, {
    // creating http delete request
    method: "DELETE",
  });
  if (response.ok) {
    console.log("ok response");
    // console.log(req.body.content);
    document.location.reload();
  } else {
    ("failed to delete comment");
  }
}

document.querySelectorAll('.js-delete-btn')
  .forEach((button) => {
  button.addEventListener('click', deleteComment)
  })

