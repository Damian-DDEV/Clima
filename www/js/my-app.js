  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/consulta/',
        url: 'consulta.html',
      },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');
var ciudad= '';
var item = '';
var arraydatos;

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized

    $$('#consultar').on('click', Consulta2);
    var url="https://ws.smn.gob.ar/map_items/forecast/1"; 
    app.request.json(url, function(datos) {
        Consulta(datos);
        

    });
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="about"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
        for(i=0; i<arraydatos.length; i++) {
          if (arraydatos[i].name == item) {
            item = arraydatos[i];
            miciudad = item.name;
            tempM = item.weather.morning_temp;
            tempT = item.weather.afternoon_temp;
            idM = item.weather.morning_id;
            idT = item.weather.afternoon_id;
            descM = item.weather.morning_desc;
            descT = item.weather.afternoon_desc;
            $$('#ciudad').html(miciudad);
            $$('#tempM').html(tempM + " ºC");
            $$('#descM').html(descM);
            $$('#tempT').html(tempT + " ºC");
            $$('#descT').html(descT);
            $$('#imgM').attr('src', 'http://openweathermap.org/img/w/'+idM+'d.png');
            $$('#imgT').attr('src', 'http://openweathermap.org/img/w/'+idT+'n.png');
          }

        }
    
})
function Consulta(e) {
  arraydatos = e;
  for (i=0; i<e.length; i++ ) {
  ciudad = $$('#ubicacion').append("<option value='"+ e[i]._id +"'>" + e[i].name + "</option>");
  }
}

function Consulta2(){
  item = $$('.item-after').html();
  mainView.router.navigate('/consulta/');
  console.log(item);

}