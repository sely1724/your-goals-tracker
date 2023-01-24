async function render(href) {

   let response;

   if (href !== "dashboard") {
      response = await fetch(`/api/goal/userid/${href}`);
   } else {
      response = await fetch(`/api/goal/dash`)
   }

   // console.log(response);

   const dbGoalData = await response.json();

   console.log(dbGoalData);

   const chartData = parse(dbGoalData);

   console.log(chartData);

   new Chart(
      document.getElementById('chart'),
      {
         type: 'bar',
         data: {
            labels: chartData.map(obj => obj.month),
            datasets: [
               {
                  label: 'Goals Completed',
                  data: chartData.map(obj => obj.goalsCompleted),
                  backgroundColor: '#42423a'
               }
            ]
         },
         options: {
            aspectRatio: 1.7,
            scales: {
               yAxes: [{
                  ticks: {
                     beginAtZero: true,
                     callback: (value) => {
                        if (Number.isInteger(value)) return value;
                     }
                  }
               }]
            }
         }

      }
   )
}

function parse(goalData) {

   let temp = []
   // populate array with objects
   for (let i = 1; i <= 12; i++) {
      temp.push({
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
         const month = goal.updatedAt.substring(5, 7);
         console.log(month);
         const monthCompleted = moment(month, "MM").format("MMM");
         let index = temp.findIndex(obj => obj.month === monthCompleted);
         temp[index].goalsCompleted++;
      }
   })

   return temp;
}

const href_slice = document.location.href.split('/').slice(-1)[0];
console.log(href_slice);

render(href_slice);