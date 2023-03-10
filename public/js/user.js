// this is how to use api routs see above.

//post milestones.
//update milestones
//delete milestones

//post goals
const goalPostHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector("#content").value.trim();
  const finish_by = document.querySelector("#finish-date").value.trim();
  const completed =
    document.querySelector("#completed").value == "yes" ? true : false;

  //userid not necessary

  const response = await fetch("/api/goal", {
    method: "POST",
    body: JSON.stringify({ content, finish_by, completed }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to post goal.");
  }
};

  
async function deleteUser(event) {
  const userId = event.target.dataset.id
  const response = await fetch("/api/user/" + userId, {
    // creating http delete request
    method: "DELETE",
  });
  if (response.ok) {
    console.log("ok response");
    // console.log(req.body.content);
    document.location.reload();
  } else {
    ("failed to delete user");
  }
}

document.querySelectorAll('.js-delete-btn')
  .forEach((button) => {
  button.addEventListener('click', deleteUser)
  })


// //post milestone
// const milestonePostHandler = async (event) => {
//   event.preventDefault();

//   const content = document
//     .querySelector(/*waiting for handlebars names*/)
//     .value.trim();
//   const date_completed = document
//     .querySelector(/*waiting for handlebars names*/)
//     .value.trim();
//   //goal_id not necessary??

//   const response = await fetch("/api/milestone/", {
//     method: "POST",
//     body: JSON.stringify({ content, date_completed }),
//     headers: { "Content-Type": "application/json" },
//   });
//   if (response.ok) {
//     document.location.replace("/" /*waiting for handlebars names*/);
//   } else {
//     alert("Failed to post milestone.");
//   }
// };

// //update milestone
// const milestoneUpdateHandler = async (event) => {
//   event.preventDefault();
//   //console.log("event listener works");

//   //const id = document.querySelector(".update-btn").value;
//   //we will want to assign the milestone id value to the update button once created in Handlebars. ^^^
//   //this will allow us to pass the Milestone ID value through quick and easy.

//   const content = document
//     .querySelector(/*waiting for handlebars names*/)
//     .value.trim();
//   const date_completed = document
//     .querySelector(/*waiting for handlebars names*/)
//     .value.trim();

//   console.log(content);
//   console.log(date_completed);
//   // both print out correctly
//   if (content && date_completed) {
//     const response = await fetch("/api/milestone/" /* + id*/, {
//       method: "PUT",
//       body: JSON.stringify({ content, date_completed }),
//       headers: { "Content-Type": "application/json" },
//     });
//     if (response.ok) {
//       document.location.replace("/" /*waiting for handlebars names*/);
//       // console.log(req.body.title);
//     } else {
//       ("failed to update milestone");
//     }
//   }
// };

// //delete milestone
// const milestoneDeleteHandler = async (event) => {
//   event.preventDefault();
//   console.log("event listener works");

//   //const id = document.querySelector(".delete-btn").value;
//   //we will want to assign the milestone id value to the update button once created in Handlebars. ^^^
//   //this will allow us to pass the Milestone ID value through quick and easy.

//   const response = await fetch("/api/milestone" /* + id*/, {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//   });
//   if (response.ok) {
//     document.location.replace("/");
//   } else {
//     alert("Failed to delete milestone.");
//   }
// };

//listen for goal post
document
  .querySelector(".create-post")
  .addEventListener("submit", goalPostHandler); //likely "submit" instead of click.

// //listen for milestone post
// document
//   .querySelector(/*waiting for handlebars names*/) //since it's a form listen for the entire form click.
//   .addEventListener("click", milestonePostHandler); //likely "submit" instead of click.

// //listen for milestone update
// document
//   .querySelector(/*waiting for handlebars names*/) //since it's a form listen for the entire form click.
//   .addEventListener("click", milestoneUpdateHandler); //likely "submit" instead of click.

// //listen for milestone delete
// document
//   .querySelector(/*waiting for handlebars names*/) //since it's a single button, listen for class on button itself
//   .addEventListener("click", milestoneDeleteHandler); //likely need "click" since it's not a form.
