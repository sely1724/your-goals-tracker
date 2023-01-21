const goalDeleteHandler = async (event) => {
  event.preventDefault();
  console.log("event listener works");
  const id = document.querySelector("#delete-btn").value;

  //const id = document.querySelector(".delete-btn").value;
  //we will want to assign the goal id value to the update button once created in Handlebars. ^^^
  //this will allow us to pass the Goal ID value through quick and easy.

  const response = await fetch("/api/goal/" + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert("Failed to delete goal.");
  }
};

const goalUpdateHandler = async (event) => {
  event.preventDefault();
  console.log("event listener works");
  const id = document.querySelector(".update-btn").value;

  const content = document.querySelector("#update-content").value.trim();
  const finish_by = document.querySelector("#update-finish").value.trim();
  const completed =
    document.querySelector("#update-completed").value == "yes" ? true : false;
  console.log(id);

  console.log(content);
  console.log(finish_by);
  console.log(completed);
  // both print out correctly
  //if (content && finish_by && completed) {
  const response = await fetch("/api/goal/" + id, {
    method: "PUT",
    body: JSON.stringify({ content, finish_by, completed }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    console.log("ok response");
    // console.log(req.body.content);
    document.location.replace("/dashboard/");
  } else {
    ("failed to update goal");
  }
};

// //listen for goal update
document
  .querySelector("#update-post")
  .addEventListener("submit", goalUpdateHandler); //likely "submit" instead of click.

// //listen for goal delete
document
  .querySelector("#delete-btn")
  .addEventListener("click", goalDeleteHandler); //likely need "click" since it's not a form.
