const Chart = require('chartjs');

Chart.defaults.color = '#153243';

async function render(userID) {
   const fetchURL = 'api/goal/userid/' + userID
   const goalData = await fetch(fetchURL, )
}