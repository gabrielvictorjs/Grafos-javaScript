
function generate() {
    function x() {
        return Math.round(Math.random()*1000);
    }
    function y() {
        return Math.round(Math.random()*400);
    }
    return [x(),y()];
}

var c = document.getElementById("canvas");
var view = c.getContext("2d");

function points(p,color) {
    console.log(p);
    view.beginPath();
    view.arc(p[0],p[1], 20, 0, 2 * Math.PI);
    view.fillStyle = ''+color+'';
    view.fill();
}


var controller = 0;
    

var a =   setInterval(function () {
    points(generate(),'red')
    controller+=1;
    console.log(controller)
    if (controller == 10) {
     clearInterval(a);   
    }
    
    
    },100) 
  





