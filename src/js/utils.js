/// some utils that are useful for different staff

function sleep(milliseconds) {
    /// just sleep
  let start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
  return 1
}

function randid(nlines){
    /// возвращает случайное число от 0 до nlines:
    var n= parseInt(Math.random()*nlines);
    return n
};


function getCellsize(){
// Возвращает размеры ячеек в пикселях  [x,y]
    // требует определения nlines
  var canvas = document.getElementById("main"); // todo  научиться передавать в  аргументе тоже
  // var el = event.srcElement;
  var q_w = parseFloat(canvas.width/nlines);
  var q_h = parseFloat(canvas.height/nlines);
  return [q_w,q_h]
    }

function drawgrid(canvas){
       let ctx = canvas.getContext("2d");
        var step = canvas.width/nlines;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for ( let  i=0;i<nlines;i++ ){
            ctx.moveTo(step*i,0);
            ctx.lineTo(step*i,canvas.height);
        }

        var step = canvas.height/nlines;
        for ( let  i=0; i< nlines ;i++ ){
            ctx.moveTo(0,step*i);
            ctx.lineTo(canvas.width,step*i);
        }
        ctx.stroke();
        listitems.drawQlist(canvas);
        listmashineitems.drawQlist(canvas);
    }

function  drawpixel(x,y) {
        let canvas = document.getElementById("main");
        let ctx = canvas.getContext("2d");
            ctx.save();
            ctx.fillStyle="rgba(255,255,0,0.5)";
            let s = getCellsize();
            ctx.fillRect(x*s[0],y*s[1],s[0],s[1]);
            ctx.restore();

    }

    function  clearpixel(x,y) {
        let canvas = document.getElementById("main");
        let ctx = canvas.getContext("2d");
            ctx.save();
            ctx.fillStyle="rgba(255,255,255,1)";
            let s = getCellsize();
            ctx.clearRect(x*s[0],y*s[1],s[0],s[1]);
            ctx.restore();

    }

