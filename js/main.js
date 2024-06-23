 
 var weather_details=document.getElementById('Weather-container');
 var inputvalue=document.getElementById('inputfield');
 var btn=document.querySelector('.btn');


 /*** event button to get city value  */
 btn.addEventListener('btn',function(){

    getWeatherDays(inputvalue.value);


 });




 /*****event of input to get value */

 inputvalue.addEventListener("input",function(e){

  console.log(e.target.value);

  if(e.target.value.trim().length>=3)
    {

        getWeatherDays(e.target.value);

    }





 });


 /****get Details of weather */
 
 async function getWeatherDays(city)
{


   try {
    var urldata= await fetch(`http://api.weatherapi.com/v1/forecast.json?key=1df205486fb84bf7a2e213948242206&q=${city}&days=3`,{


        method:'GET'
  
  
      });
  
  
      
      var  data= await urldata.json(); 

      display(data);

      console.log(data);
    
   } catch (error) {

    console.log(error);
    
   }
    

}




/******method display */

function display(data)
{
    var box=``;

    box+=`<div class="weather-details">
            <div class="card">
                <div class="card-head">
                    <span>${dayName(getDate(data.location.localtime).getDay())}</span>
                    <span>${getDate(data.location.localtime).getDate()}${monthName(getDate(data.location.localtime).getMonth())}</span>
                    </div>
                    <div class="card-content">
                        <h3>${data.location.name}</h3>
                        <h4>${data.current.temp_c}<sup>o</sup>C</h4>
                         <img src="${'https:'+data.current.condition.icon}" alt="">
                    
                    </div>

                    <div class="card-footer">
                        <span>${data.current.condition.text}</span>
                        <ul>
                            <li>
                                <img src="images/icon-umberella@2x.png" alt="">
                                <span>20%</span>
                            </li>
                            <li>
                                <img src="images/icon-wind@2x.png" alt="">
                                <span>18km/h</span>
                            </li>
                            <li>
                                <img src="images/icon-compass@2x.png" alt="">
                                <span>East</span>
                            </li>
                        </ul>
                    </div>
           
            </div>
         
            <div class="card">
                <div class="card-head">
                    <span>${dayName(getDate(data.forecast.forecastday[1].date).getDay())}</span>
                    
                    </div>
                   <div class="card-content-details">
                    <div class="card-content">
                        <img src="${'https:'+data.forecast.forecastday[1].day.condition.icon}" alt="">
                        <h3>${data.forecast.forecastday[1].day.maxtemp_c}<Sup>o</Sup>C
                        </h3>
                        <p>27.1</p>
                        <p>${data.forecast.forecastday[1].day.condition.text}</p>
                         
                    
                    </div>
                   </div>

           
           
            </div>
            <div class="card">
                <div class="card-head">
                    <span>${dayName(getDate(data.forecast.forecastday[2].date).getDay())}</span>
                    
                    </div>
                   <div class="card-content-details">
                    <div class="card-content">
                       <img src="${'https:'+data.forecast.forecastday[2].day.condition.icon}" alt="">
                        <h3>${data.forecast.forecastday[2].day.maxtemp_c}<Sup>o</Sup>C
                        </h3>
                        <p>27.1</p>
                        <p>${data.forecast.forecastday[2].day.condition.text}</p>
                         
                    
                    </div>
                   </div>

           
           
            </div>
        </div> `


        weather_details.innerHTML=box
}





/******Method to get Date */
function getDate(dateValue)
{
   
    
    return  new Date(dateValue);
}



/***get Name of day */
function dayName(index)
{
    var days=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


    return days[index];

}

/*****get name of month */

function monthName(index)
{
    var  monthName = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ]

      return monthName[index]
      
}








/*************************Get current location****************************************** */

async function  convertLatlong(lat,long)
{

  try {
    var urldata=await fetch(`https://api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}`);

    var data=await urldata.json();


    getWeatherDays(data.countryName);
    console.log('current',data);



    
  } catch (error) {

    console.log('error',error.message);
    
  }

}




/**
 * 
 * 
 * 
 * 
 * If you need location data without user interaction, you have a few alternative approaches:

IP Geolocation Services:

You can use IP-based geolocation services to get an approximate location of the user based on their IP address. This method doesn't require user permission but is less accurate than GPS-based geolocation.
 * 
 * 
 * 





 */


/*****function to get current location without taking permssion from user */

async function fetchLocation() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
  
      convertLatlong(data.latitude,data.longitude);

      console.log('new',data.latitude);
    } catch (error) {
      console.log('Error fetching location:', error);
    }
  }

  fetchLocation();





  /*** get current location  with take permsiion from user */




//  (function findMyCoordinate()
// {
//     if(navigator.geolocation)
//         {


//             navigator.geolocation.getCurrentPosition((position)=>{



           
//                 console.log(position.coords.latitude,position.coords.longitude);

//                // convertLatlong(position.coords.latitude,position.coords.longitude);

//             },(err)=>{


//                 alert(err.message)
//             })
//         }

//         else
//         {
//             alert('Geolocation is not supported by your browser')
//         }
// })();
