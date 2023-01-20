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