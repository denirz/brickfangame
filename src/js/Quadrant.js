
    class Qlist{
            constructor(){
                this.items = new Array();
                this.color = "rgba(0,0 ,255, 1)"
            }
          addQuadrant(Item,fix=1){
                var b=Object.assign({},Item);
                b.perimeter = Item.perimeter;
                b.checkpoint_in = Item.checkpoint_in;
                var nerrors = 0;
                var nsiebling = 0
                this.items.forEach(function (e) {
                    var res =Item.checkother(e.x,e.y,e.n,e.m);
                    if(res == '-1'){nerrors++}
                    if(res == '1'){nsiebling++}
                });
                // console.log(" Number of errors ",nerrors);
                // console.log(" Number of siebling ",nsiebling);
                if (fix ===2 && nerrors===0){
                    return 1
                }
                if (nerrors===0 && nsiebling >= 1 )
                  {
                  if (fix===1){this.items.push(b);}
                      return 1
                  }
                if (this.items.length === 0)
                    {
                  if (fix===1){this.items.push(b)}
                        return 1
                  }
                return 0
          }
          drawQlist(canvas){
                let color =this.color;
              var ctx = canvas.getContext("2d");
              var s = getCellsize();
              this.items.forEach(function (e) {

                  ctx.save()
                  ctx.fillStyle=color;
                  ctx.fillRect(e.x*s[0],e.y*s[1],e.n*s[0],e.m*s[1]);
                  ctx.strokeStyle="rgba(0,0 ,127, 1)";
                  ctx.strokeRect(e.x*s[0],e.y*s[1],e.n*s[0],e.m*s[1]);
                  ctx.restore();
              })

          }

          checkToRemove(candidate){
                ///  должеен возвращать индекс элемента который  можно удалить
                if(!(candidate instanceof Quadrant)){ return "Error" }
                for(var index in  this.items){
                    let i =this.items[index];
                    if( (candidate.n===i.n) && (candidate.m===i.m) && (candidate.x===i.x) && (candidate.y===i.y)) {
                        return index
                    }
                }
                return -1
          }
          removeItem(candidate){
                // удаляеет кандидата из списка если он найден.  еслинет, то возвращает -1
                if(!(candidate instanceof Quadrant)){ return "Error" }
                let index=this.checkToRemove(candidate);
                if (index !==-1){
                    this.items.splice(index,1);
                    //после удаления надо удалить его и на картинке
                    // candidate.clear(canvas);
                    // drawgrid(canvas);
                    return 1 ///  Success!
                }
                return -1
          }
          score(){
                /// calculates scores
                let score=0;
                this.items.forEach(function(item){
                    score = score + item.n*item.m;
                });
                return score;
          }
          find_bySize(n,m){
                // возвращает список индексов объектов  размера (n,m) + признак необходимости транспонировать
              // или  -1  если ничего не найдено.
                console.log(n,m);
                let resarray= new  Array();
              for (let index in this.items){
                    let i=this.items[index];
                    if (
                        ((i.n===n) && (i.m === m)) ||
                        ((i.n===m) && (i.m === n))
                    )
                  {
                        resarray.push(index)
                    }
              }
              return resarray
          }

    }
    class Quadrant{
        constructor(x,y,n,m){
            this.x=x;
            this.y=y;

            if (n === undefined){this.n=this.randsize()[0]}else {this.n=n};
            if (m === undefined){this.m=this.randsize()[1]}else {this.m=m};
            // this.m=this.randsize()[1];
        }
        setcoords(canvas,x,y){
            if (x<0 || x>nlines-this.n){return -1}
            if (y<0 || y>nlines-this.m){return -1}

            var ctx = canvas.getContext("2d");
            var s = getCellsize();
            ctx.clearRect(this.x*s[0],this.y*s[1],this.n*s[0],this.m*s[1]);
            ctx.fillStyle="rgba(255,0 , 0, 0.5)";
            this.x=x;
            this.y=y;
            drawgrid(canvas);
            ctx.fillRect(this.x*s[0],this.y*s[1],this.n*s[0],this.m*s[1]);

        }

        move_one(canvas){
            //  todo приделать  тесты - их тут нет  пока что
            if(this.setcoords(canvas,this.x+1,this.y) === -1){
                if(this.setcoords(canvas,0,this.y+1) === -1){
                    if(this.setcoords(canvas,0,0) === -1){
                        return 1
                    }
                }
            }
            return 1
        }

        randsize(){
            var n= parseInt(Math.random()*6)+1;
            var m= parseInt(Math.random()*6)+1;
            return [n,m]
        }
        output(){
            console.log(this.x,this.n);
            console.log(this.y,this.m);
        }
        fix(canvas,listitems,listother=listmashineitems){

            let foreinres = this.checkcorrectness(listother);
            console.log("Foreine status ",foreinres);
            if (foreinres==='Cross') {
                return 0
            }

            let res = listitems.addQuadrant(this);
            // console.log(res);
            if (res ===1){
                if (foreinres instanceof Array && foreinres[0]==='Cross'){
                console.log("Removing item "+foreinres);
                listother.removeItem(this);
                }
                this.reload(canvas);
                return 1 // успешно вставили
                }
            else{
                return 0
            }
        }
        reload(canvas){
            this.clear(canvas)
            this.n=this.randsize()[0];
            this.m=this.randsize()[1];
            if (this.x<0 || this.x>nlines-this.n){this.x=0}
            if (this.y<0 || this.y>nlines-this.m){this.y=0}

            this.draw(canvas);
            drawgrid(canvas)
        }
        rotate(canvas){
            this.clear(canvas);
            let temp=this.n;
            this.n=this.m;
            this.m=temp;
            this.draw(canvas);
            drawgrid(canvas);
        }
        checkother(x,y,n,m){
            // console.log("CHECKOTHER")
            // просто проверка на пересечения:
            for(var x_t=this.x;x_t<this.x+this.n;x_t++){
                for(var y_t=this.y;y_t<this.y+this.m;y_t++){
                    if( x_t>x-1 && x_t<x+n && y_t>y-1 && y_t<y+m){
                        // console.log("ERROR X",x_t,x,x+n);
                        // console.log("ERROR Y",y_t,y,y+m);
                        return '-1';
                    }
                }
            }
            //  проверка на соседство
            var sieb =0
            if (this.x===x+n && (this.y>=y && this.y< y+m)){sieb++}
            if (this.x===x+n && (this.y<y && this.y+this.m > y)){sieb++}
            if (this.x===x+n && (this.y+this.m >y && this.y+this.m < y+m)){sieb++}
            if (this.x===x+n && (this.y+this.m < y && this.y+this.m > y+m)){sieb++}

            if (this.x+this.n===x && (this.y>=y && this.y< y+m)) {sieb++}
            // if (this.x+this.n===x && (this.y>=y && this.y< y+m)) {sieb++}
            if (this.x+this.n===x && (this.y+this.m >y && this.y+this.m < y+m)) {sieb++}
            if (this.x+this.n===x && (this.y+this.m <y && this.y+this.m > y+m)) {sieb++}
            if (this.x+this.n===x && (this.y < y && this.y+this.m >= y+m)) {sieb++}

            if (this.y === y+m && (this.x>=x && this.x < x+n)){sieb++}
            if (this.y === y+m && (this.x<x && this.x+this.n > x)){sieb++}
            if (this.y+this.m === y && (this.x>=x && this.x <x+n)){sieb++}
            // if (this.y+this.m === y && (this.x<x && this.x+this.n <x+n)){sieb++}
            if (this.y+this.m === y && (this.x<x && this.x+this.n >x)){sieb++}
            // console.log("Sieb",sieb);
            if (sieb >=1)
            {
                // console.log("GOOD PLACE");
                return 1;
            }
            return 0;
        }

        clear(canvas){
            var ctx = canvas.getContext("2d");
            var s = getCellsize();
            ctx.clearRect(this.x*s[0],this.y*s[1],this.n*s[0],this.m*s[1])
        }
        draw(canvas){
                  var ctx = canvas.getContext("2d");
                  ctx.fillStyle="rgba(255,0 , 0, 0.5)";
                  // ctx.fillStyle="FFFF00";
                  var s = getCellsize();
                  // console.log("sizes",s)
                  ctx.fillRect(this.x*s[0],this.y*s[1],this.n*s[0],this.m*s[1]);
        }
        testdraw(){
                  let canvas = document.getElementById("main");
                  var ctx = canvas.getContext("2d");
                  ctx.save()
                  ctx.fillStyle="rgba(255,255 , 0, 0.8)";
                  // ctx.fillStyle="FFFF00";
                  var s = getCellsize();
                  // console.log("sizes",s)
                  ctx.fillRect(this.x*s[0],this.y*s[1],this.n*s[0],this.m*s[1]);
                  ctx.restore()
        }
        moveright(canvas){
            let ctx = canvas.getContext("2d");
            let s = getCellsize();
            ctx.save()
            ctx.clearRect(this.x*s[0],this.y*s[1],this.n*s[0],this.m*s[1]);
            ctx.fillStyle="rgba(255,0 , 0, 0.5)";
            let status = this.setcoords(canvas,this.x+1,this.y);
            drawgrid(canvas);
            ctx.fillRect(this.x*s[0],this.y*s[1],this.n*s[0],this.m*s[1]);
            ctx.restore()
            if (status === -1){return status}
        }
        moveleft(canvas){
            var ctx = canvas.getContext("2d");
            var s = getCellsize();
            ctx.clearRect(this.x*s[0],this.y*s[1],this.n*s[0],this.m*s[1]);
            ctx.fillStyle="rgba(255,0 , 0, 0.5)";
            let status = this.setcoords(canvas,this.x-1,this.y);
            drawgrid(canvas);
            ctx.fillRect(this.x*s[0],this.y*s[1],this.n*s[0],this.m*s[1]);
            if (status === -1){return status};
        }
        moveup(canvas){
            let ctx = canvas.getContext("2d");
            let s = getCellsize();
            ctx.clearRect(this.x*s[0],this.y*s[1],this.n*s[0],this.m*s[1]);
            ctx.fillStyle="rgba(255,0 , 0, 0.5)";
            // this.y=this.y-1;
            let status = this.setcoords(canvas,this.x,this.y-1);
            drawgrid(canvas);
            ctx.fillRect(this.x*s[0],this.y*s[1],this.n*s[0],this.m*s[1]);
            if (status === -1){return status}
        }
        movedown(canvas){
            let ctx = canvas.getContext("2d");
            let  s = getCellsize();
            ctx.clearRect(this.x*s[0],this.y*s[1],this.n*s[0],this.m*s[1]);
            ctx.fillStyle="rgba(255,0 , 0, 0.5)";
            let status = this.setcoords(canvas,this.x,this.y+1);
            drawgrid(canvas);
            ctx.fillRect(this.x*s[0],this.y*s[1],this.n*s[0],this.m*s[1]);
            if (status === -1){return status}
        }
        perimeter(){
            var p =  new Array();
            for(var x_t=this.x; x_t<this.x+this.n; x_t++){
                p.push([x_t,this.y-1]);
                p.push([x_t,this.y+this.m]);
            }
            for( var y_t=this.y;y_t<this.y+this.m;y_t++){
                p.push([this.x-1,y_t]);
                p.push([this.x+this.n,y_t])
            }
            return p
        }
        checkcorrectness(set){
            ///returns either number of neoghboors either "cross"
            /// if number of neihgbors = 0  so it is not allowed to put  as well
            if (! set instanceof Qlist){return 'Error'}
            let sumres = 0;
            for (var item of set.items){
                // console.log("X",item.x,item.n,"Y",item.y,item.m)
                let res = this.checkother(item.x,item.y,item.n,item.m);
                // console.log("Res = ",res)
                if (res === '-1'){
                    let possibleremove = set.checkToRemove(this);
                    if (possibleremove === -1){return "Cross"}
                    return ["Cross",possibleremove]
                }
                sumres = sumres + res
            }
            return sumres

        }
        perimeter_draw(canvas){
            var p=this.perimeter();

            var ctx = canvas.getContext("2d");
            ctx.save()
            ctx.fillStyle="rgba(255,255,0,0.5)";
            var s = getCellsize();
            for (var cell of p){
                  ctx.fillRect(cell[0]*s[0],cell[1]*s[1],s[0],s[1]);
            }
            ctx.restore()

        }
        checkpoint_in(x,y){
            if (x>=this.x && x < this.x + this.n && y >=this.y && y <this.y+this.m) {
              return 1
              }
            return 0
            }


    }

