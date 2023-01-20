moment().format();

async function render(userID) {

   const dbGoalData = await fetch(`/api/goal/userid/${userID}`);

   const goalData = await dbGoalData.json()

   const chartData = parse(goalData);

   console.log(chartData);

   const myChart = new Chart(
      document.getElementById('chart'),
      {
         type: 'bar',
         data: {
            labels: chartData.map(obj => obj.month),
            datasets: [
               {
                  label: 'Goals Completed',
                  data: chartData.map(obj => obj.goalsCompleted)
               }
            ]
         },
         options: {
            scales: {
               x: {
                  title: {
                     text: 'Month',
                     display: true
                  }
               },
               y: {
                  title: {
                     text: 'Goals completed',
                     display: true
                  }
               }
            },
            plugins: {
               title: {
                  display: true,
                  text: 'Goals Completed Per Month'
               },
               legend: {
                  display: false
               }
            },
            elements: {
               bar: {

               }
            }
         },

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

const userID = document.location.href.split('/').slice(-1)[0];

console.log(userID);

render(1);