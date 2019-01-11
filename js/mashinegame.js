 //  делает один ход за компьютер

  function mashinegame(canvas,listmashineitems,listitems){ // todo  вообще это бы вынести в отдельный модуль и протестировать
        console.log("LENTH",listmashineitems.items.length)
        if (listmashineitems.items.length ===0){
          var allowed_u = listitems.addQuadrant(b,fix=0);
          var allowed_m = listmashineitems.addQuadrant(b);
          listmashineitems.drawQlist(canvas); // todo добавить проверку на корректность! ибо верхняя не особенно хороша
          b.reload(canvas);
            return 0;
        }
        // вот тут попробуем сначала проверить кандидатов на удаление
        let candidates_to_delete =  listitems.find_bySize(b.n,b.m);
        for (let i of candidates_to_delete){
            console.log("existing:"+b);
            console.log("candidate:"+listitems.items[i]);
            if (!((listitems.items[i].m === b.m) && (listitems.items[i].n === b.n))){
                 b.rotate(canvas);
            }
            if (b.checkcorrectness(listmashineitems)>0){
                b.fix(canvas,listmashineitems,listitems)
                b.reload(canvas);
                $("#nomoresteps").text("съел!")
                return 1;

            }
        }

        for(i=0;i<nlines;i++){
            for(j=0;j<nlines;j++){
                b.setcoords(canvas,j,i); //todo может быть добавить немнго ума в  такой перебор
                // console.log("Quad1:",b,"correctness:",b.checkcorrectness(listmashineitems));
                if((b.checkcorrectness(listmashineitems) > 0)&& ((b.checkcorrectness(listitems) ==0)
                || (b.checkcorrectness(listitems) > 0)) )
                {
                    console.log("Found",b);
                    listmashineitems.addQuadrant(b); // todo вот это надо бы заменить на fix но сходу оно не заработало
                    let fixresult = 1
                    // let fixresult = b.fix(listmashineitems,listitems)
                    console.log("fixresult:"+fixresult);
                    if (fixresult===1){
                        b.reload(canvas);
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