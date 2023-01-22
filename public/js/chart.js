async function render(href) {

   let dbGoalData;

   if (Number.isInteger(href)) {
      dbGoalData = await fetch(`/api/goal/userid/${userID}`);
   } else {
      dbGoalData = await fetch(`/api/goal/dash`)
   }

   const goalData = await dbGoalData.json()

   const chartData = parse(goalData);

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

   let chartData = []
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
         const monthCompleted = moment(goal.updatedAt).format("MMM");
         let index = chartData.findIndex(obj => obj.month === monthCompleted);
         chartData[index].goalsCompleted++;
      }
   })

   return chartData;
}

const href_slice = document.location.href.split('/').slice(-1)[0];

render(href_slice);