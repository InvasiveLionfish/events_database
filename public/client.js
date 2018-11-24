function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
}

const defaultCity = getQueryVariable('city')

if (defaultCity){
 document.getElementById("citySelect").value = defaultCity
}

function formSubmitted(){
  var city = document.getElementById("tableForm").value
  window.location.href = window.location.host + '/?city=' + city
}
