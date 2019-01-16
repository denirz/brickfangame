 //  делает один ход за компьютер

  function mashinegame(canvas,listmashineitems,listitems,binit){ // todo  вообще это бы вынести в отдельный модуль и протестировать
        console.log("binit=",binit);
        // if(binit===undefined){var b = new Quadrant(randid(nlines-6),randid(nlines-6))};
        // console.log("Typeof binit",typeof(binit));
        // console.log("Typeof binit",type(binit));
        // if(binit !== undefined){ let  b=new Quadrant(binit.n,binit.m);b.x=binit.x;b.y=binit.y}

        if(binit === undefined){
            var b = new Quadrant(randid(nlines-6),randid(nlines-6));
        }else{
        var b=binit;
        }

        console.log("b=",b);
        console.log("LENTH",listmashineitems.items.length,b);
        if (listmashineitems.items.length ===0){
            let iscorrect   = b.checkcorrectness(listitems);
            if (typeof(iscorrect) === "number" ){
                let res = b.fix(canvas,listmashineitems,listitems);
                return res
            }
            while (typeof(iscorrect) !== "number" ){
                console.log("Iscorrect", iscorrect);
                if(iscorrect[0]==='Cross' || iscorrect ==='Cross'){
                    let result = b.move_one(canvas);
                    if (result !== 1){return 0 }
                    console.log("result move",result);
                }
                iscorrect   = b.checkcorrectness(listitems);
                console.log("iscorrect 2 ",iscorrect)
                }
                let res = b.fix(canvas,listmashineitems,listitems);
                return res

          // listmashineitems.drawQlist(canvas); // todo добавить проверку на корректность! ибо верхняя не особенно хороша
          // b.reload(canvas);
          //   return 0;
        }


        // вот тут попробуем сначала проверить кандидатов на удаление
        if (listmashineitems.items.length !==0) {
            let candidates_to_delete = listitems.find_bySize(b.n, b.m);
            for (let i of candidates_to_delete) {
                console.log("existing:", b);
                console.log(b);
                console.log("candidate:" , listitems.items[i]);

                if (((listitems.items[i].m === b.m) && (listitems.items[i].n === b.n))) {
                    // b.rotate(canvas);
                    console.log("HEre")
                    console.log(b)
                    console.log(b.checkcorrectness(listmashineitems));
                        if (b.checkcorrectness(listmashineitems) >= 0) {
                        console.log(b.fix(canvas, listmashineitems, listitems))
                        // b.reload(canvas);
                        $("#nomoresteps").text("съел!")
                        return 1;}
                }
            }
        }

        for(i=0;i<nlines;i++){
            for(j=0;j<nlines;j++){
                b.setcoords(canvas,j,i); //todo проверить  что коордианата установилась.
                // sleep(1000)
                // console.log("Quad1:",b,"correctness:",b.checkcorrectness(listmashineitems));
                if((b.checkcorrectness(listmashineitems) > 0)&& ((b.checkcorrectness(listitems) ==0)
                || (b.checkcorrectness(listitems) > 0)) )
                {
                    console.log("Found",b);
                    let fixresult = b.fix(canvas,listmashineitems,listitems)
                    console.log("fixresult:"+fixresult);
                    if (fixresult===1){
                        $("#nomoresteps").text("нашел");
                        return 1;
                    }

                }
            }
        }

        console.log("NO moves!");
        $("#nomoresteps").text("NO more steps")// todo - проверить  еще транспонированный вариант!
        b.reload(canvas)
    }