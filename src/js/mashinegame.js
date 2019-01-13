 //  делает один ход за компьютер

  function mashinegame(canvas,listmashineitems,listitems,binit){ // todo  вообще это бы вынести в отдельный модуль и протестировать

        if(binit===undefined){var b = new Quadrant(randid(nlines-6),randid(nlines-6))};
        if(binit instanceof Quadrant){ var b=binit}

        console.log("LENTH",listmashineitems.items.length,b)
        if (listmashineitems.items.length ===0){
            // resfix = b.fix(canvas, listmashineitems, listitems);
            let iscorrect   = b.checkcorrectness(listitems)
            console.log("resfix = ",iscorrect)
            console.log("TYPE1",typeof(iscorrect))
            if (typeof(iscorrect) === "number" ){
                let res = b.fix(canvas,listmashineitems,listitems)
                return res
            }
            b.setcoords(canvas,b.x+3,b.y);
            while(!(type(iscorrect) === 'number' )){
                        b.y=b.y+1;
                        iscorrect  = b.checkcorrectness(listitems);
                        console.log("iscorrect",iscorrect)
                        console.log("TYPE",typeof(iscorrect))
                    }


            // console.log("iscorrect2 = ",iscorrect)

            if (typeof(iscorrect) === "number" ){
                let res = b.fix(canvas,listmashineitems,listitems)
                console.log("FIXED",res)
                return res
            }

            // b.setcoords(canvas,b.x+3,b.y);



            // var allowed_u = listitems.addQuadrant(b,fix=0);

            // var allowed_m = listmashineitems.addQuadrant(b);
            //   var resfix = 0;
            //   while (resfix===0) { //todo  ограничить количество итераций
            //       b.reload(canvas)
            // b.x = b.x+1;
                // console.log("restfix",resfix)
            // }
          listmashineitems.drawQlist(canvas); // todo добавить проверку на корректность! ибо верхняя не особенно хороша
          b.reload(canvas);
            return 0;
        }


        // вот тут попробуем сначала проверить кандидатов на удаление
        if (listmashineitems.items.length !==0) {
            let candidates_to_delete = listitems.find_bySize(b.n, b.m);
            for (let i of candidates_to_delete) {
                console.log("existing:" + b);
                console.log("candidate:" + listitems.items[i]);
                if (!((listitems.items[i].m === b.m) && (listitems.items[i].n === b.n))) {
                    b.rotate(canvas);
                }
                if (b.checkcorrectness(listmashineitems) > 0) {
                    b.fix(canvas, listmashineitems, listitems)
                    b.reload(canvas);
                    $("#nomoresteps").text("съел!")
                    return 1;
                }
            }
        }
        for(i=0;i<nlines;i++){
            for(j=0;j<nlines;j++){
                b.setcoords(canvas,j,i); //todo может быть добавить немнго ума в  такой перебор
                sleep(1000)
                // console.log("Quad1:",b,"correctness:",b.checkcorrectness(listmashineitems));
                if((b.checkcorrectness(listmashineitems) > 0)&& ((b.checkcorrectness(listitems) ==0)
                || (b.checkcorrectness(listitems) > 0)) )
                {
                    console.log("Found",b);
                    listmashineitems.addQuadrant(b); // todo вот это надо бы заменить на fix но сходу оно не заработало
                    // let fixresult = 1
                    let fixresult = b.fix(canvas,listmashineitems,listitems)
                    console.log("fixresult:"+fixresult);
                    if (fixresult===1){
                        b.reload(canvas);
                        $("#nomoresteps").text("нашел");
                        // console.log("нашел")
                        return 1;
                    }

                }
            }
        }

        console.log("NO moves!");
        $("#nomoresteps").text("NO more steps")// todo - проверить  еще транспонированный вариант!
        b.reload(canvas)
    }