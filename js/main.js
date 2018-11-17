let table = document.querySelector('.facTable')
let title = document.createElement('tr');
title.innerHTML = '<td>Location Name</td>' + '<td>City</td>' + '<td>State</td>' + '<td>Temperature</td>'
table.appendChild(title);
// Make a call to the NASA api
fetch(`https://data.nasa.gov/resource/9g7e-7hzz.json?$select=facility,location,city,state`)
  .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
  .then(response => {
      let facilities = response;
      // Loop through facilities to extract longitude and latitude
      facilities.forEach(function(facility){
        let lon = facility.location.coordinates[0]
        let lat = facility.location.coordinates[1]
        // Make a call to Weather api with lon & lat of each facility
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=77b6ed34c4305b2130474187d222a49c&units=imperial`)
        .then(res => res.json())
        .then(response => {
            // For each facility extract temperature
            let temp = response.main.temp
            console.log(temp)
            // Attach temp property to each facility
            facility.temp = temp;
            // Display each facility in the DOM
            displayFacility(facility);
        })
      })
  })
  // Catch any errors in api call
  .catch(err => {
      console.log(`error ${err}`)
      alert("sorry, there are no results for your search")
  })
// Displays facility data by appending to table in DOM
function displayFacility(facility) {
  let row = document.createElement('tr');
  let name = `<td>${facility.facility}</td>`;
  let city = `<td>${facility.city}</td>`;
  let state = `<td>${facility.state}</td>`;
  let temp = `<td>${facility.temp}</td>`;
  row.innerHTML = name+city+state+temp;
  table.appendChild(row);
}
