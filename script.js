const input = document.querySelectorAll(".inputField");
const label = document.querySelectorAll(".labelInput");
const point = document.querySelectorAll(".point");
const pointCategories = document.querySelectorAll("point-categories");

const input_birthday = document.getElementById("input-birthday");
const title = document.getElementById("sumMonth");
const raster = document.getElementById('containerGrid');
const containerInput = document.getElementById("containerInput")

const colorPallet = [
"gray", 
"#f5bd1f",
"#014f86",
"#ff4800",
"#248277",
"#ad080f",
"#ad8042",
"#2b6a4d",
"#c3c4e9ff",
"#9cc76dff",
"#2dffdfff"];

var birthday;
var birthday_month;
var arrMonth = [];
var sumMonth = 0;

wertauslese();

//Eventlistener Hinzufügen
input.forEach(element => {
  element.addEventListener("input", function(event){
    wertauslese();
  })
});

input_birthday.addEventListener("input", function(event){
  wertauslese();
})


//Funktionen
function resetMonth(){
  // Erzeuge Punkte im Raster
  raster.innerHTML = "";
  for (let i = 0; i < 936; i++) {
    const point = document.createElement('div');
    point.classList.add('point');
    point.setAttribute("id", i);
    point.addEventListener("click", function(){
      label.forEach(element => {
        element.style.backgroundColor = "";
      })

      

      var categoriesClick = point.getAttribute("categorie");
      var inputCategorie = document.getElementById(categoriesClick);
      var backgroundColorLabel = window.getComputedStyle(point).backgroundColor;
      if(backgroundColorLabel){
        inputCategorie.style.backgroundColor = backgroundColorLabel;
      }
    })
    raster.appendChild(point);
  }
}

function updateMonths(){
  resetMonth();

  //Summe der Monate
  sumMonth = 0;
  arrMonth.forEach(element => {
    if(element[0]){
      sumMonth += element[0];
      title.textContent = sumMonth + "/936 month's";
    }
  });

  //Monate einfärben
  var monthId = 0;
  arrMonth.forEach((element, index) => {
    for (let i = 0; i < element[0]; i++) {
      var pointOfMonth = document.getElementById(monthId);
      pointOfMonth.style.backgroundColor = colorPallet[index];
      pointOfMonth.setAttribute("categorie", element[1]);
      monthId +=1;
    }

    pointCategories.forEach(element => {
      element.style.backgroundColor = "";
    });
  
    var idPointCategories = "point-" + element[1];
    var pointCategoriesToChangeColor = document.getElementById(idPointCategories);

    if(pointCategoriesToChangeColor){
      pointCategoriesToChangeColor.style.backgroundColor = colorPallet[index];
    }
  })

  
}

function ageConverter(startDatum){
  //Alter in Monate umrechnen
  var start = new Date(startDatum);
  var end = new Date(); // Aktuelles Datum

  var jahre = end.getFullYear() - start.getFullYear();
  var monate = end.getMonth() - start.getMonth();

  var differenzInMonaten = jahre * 12 + monate;
    
  return differenzInMonaten;
}

function wertauslese(){
  arrMonth = [];
  if(input_birthday.value){
    birthday = input_birthday.value;
    birthday_month = ageConverter(birthday);
  }else{
    birthday_month = 0;
  }

  arrMonth.push([birthday_month, "birthsday"]);
  
  input.forEach(element => {

    var selectValueElement = document.getElementById("select-"  + element.name);
    var selectValue = selectValueElement.value
    var time = parseFloat(element.value);
    var convertetTime = timeConverter(time, selectValue);
    var categories = element.name;

    arrMonth.push([convertetTime, categories]);
  });

  updateMonths();
}

function timeConverter(time, selectValue){
  var remainingMonths = 936 - birthday_month; 
  var timeConverted;

  switch(selectValue) {
    case "h/d":
      timeConverted = remainingMonths / 24 * time;
      break;
    case "h/w":
      timeConverted = remainingMonths / 24 * time / 7;
      break;
    case "d/w":
      timeConverted = remainingMonths / 7 * time;
      break;
    case "d/m":
      timeConverted = remainingMonths / (365 / 12) * time;
      break;
    case "d/y":
      timeConverted = remainingMonths / 365 * time;
      break;
    case "w/y":
      timeConverted = remainingMonths / (365 / 7) * time;
      break;
    case "m/y":
      timeConverted = remainingMonths / 12 * time;
      break;
    case "y/lt":
      timeConverted = time * 12;
      break;
    default:
      alert("Ungültiger Versuch");
  }

  return Math.round(timeConverted);
}