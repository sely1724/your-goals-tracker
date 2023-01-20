const Chart = require('chartjs');
const moment = require('moment');
moment().format();

async function render(userID) {

   const goalData = await fetch(`api/goal/userid/${userID}`)

   const chartData = parse(goalData);

   console.log(chartData);

   // new Chart(
   //    document.getElementById('chart'),
   //    {
   //       type: bar,

   //    }
   // )
}

function parse(goalData) {

   chartData = []
   // populate array with objects
   for (let i = 1; i <= 12; i++) {
      chartData.push({
         month: moment(i, "M").format("MMM"),
         goalsCompleted: 0
      })
   };

   // iterate through goal data
   goalData.forEach((goal) => {
      // if the goal is completed,
      if (goal.completed) {
         // add 1 to the goalsCompleted property of the month object
         // corresponding to the month the goal was completed on
         chartData.find((month) => month === moment(goal.updatedAt).month())
            .goalsCompleted += 1;
      }
   })

   return chartData;
}

render(1);