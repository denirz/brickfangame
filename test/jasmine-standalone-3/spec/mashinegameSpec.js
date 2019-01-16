describe("Mashinegame function test ",function(){
 beforeEach(function(){
        nlines = 25;

        $("body").append('<p id="nomoresteps"></p>');
        $("body").append('<canvas id="main" width="400" height="400"></canvas>')
        listitems = new Qlist();
        listmashineitems = new Qlist();
        listmashineitems.color="rgb(00,256,00)";
        canvas = document.getElementById("main");
     drawgrid(canvas)
     });

    it("FirstStep",function(){
        let a = new Quadrant(0,0);
        a.m = 2;
        a.n = 2;
        a.setcoords(canvas,nlines-4,1);
        listitems.addQuadrant(a);
        a.setcoords(canvas,a.x+2,1);
        listitems.addQuadrant(a);
        a.setcoords(canvas,a.x+2,1);
        var  result = mashinegame(canvas,listmashineitems,listitems);
        expect(result).toEqual(1);
    });

    it("Second Step",function(){
    let a = new Quadrant(10,10);
        a.m = 2;
        a.n = 2;


        a.setcoords(canvas,nlines-4,1);
        listitems.addQuadrant(a);
        a.setcoords(canvas,a.x+2,1);
        // listitems.addQuadrant(a);
        a.fix(canvas,listitems,listmashineitems);
        a.setcoords(canvas,a.x+2,1);
        console.log(a.fix(canvas,listitems,listmashineitems))
        var  result = mashinegame(canvas,listmashineitems,listitems);
        expect(result).toEqual(1);
        a.m = 3;
        a.n = 4;
        var  result = mashinegame(canvas,listmashineitems,listitems,a);
        expect(result).toEqual(1);
        var  result = mashinegame(canvas,listmashineitems,listitems,a);
        expect(result).toEqual(1);
        var  result = mashinegame(canvas,listmashineitems,listitems);
        expect(result).toEqual(1);
        drawgrid(canvas)


    });
    it("Game with self",function () {

        expect(mashinegame(canvas,listitems,listmashineitems)).toEqual(1);
        expect(mashinegame(canvas,listmashineitems,listitems)).toEqual(1);
        expect(mashinegame(canvas,listitems,listmashineitems)).toEqual(1);
        expect(mashinegame(canvas,listmashineitems,listitems)).toEqual(1);
        expect(mashinegame(canvas,listitems,listmashineitems)).toEqual(1);
        expect(mashinegame(canvas,listmashineitems,listitems)).toEqual(1);
        expect(mashinegame(canvas,listitems,listmashineitems)).toEqual(1);
        expect(mashinegame(canvas,listmashineitems,listitems)).toEqual(1);
        expect(mashinegame(canvas,listitems,listmashineitems)).toEqual(1);
        expect(mashinegame(canvas,listmashineitems,listitems)).toEqual(1);

        console.log(listmashineitems);

    })

    it("setup some items",function () {
        mashinegame(canvas,listitems,listmashineitems);
        mashinegame(canvas,listmashineitems,listitems);
        mashinegame(canvas,listitems,listmashineitems);
        mashinegame(canvas,listmashineitems,listitems);
        mashinegame(canvas,listitems,listmashineitems);
        mashinegame(canvas,listmashineitems,listitems);
        mashinegame(canvas,listitems,listmashineitems);
        mashinegame(canvas,listmashineitems,listitems);

        for ( item of listmashineitems.items){
            console.log(item)
            $('#nomoresteps').html($('#nomoresteps').html() + item.x+ ':'+item.y+':')
            $('#nomoresteps').text($('#nomoresteps').text() + item.n+ ':'+item.m+'\n')
            $('#nomoresteps').text($('#nomoresteps').text() + '|')
        }
            $('#nomoresteps').text($('#nomoresteps').text() + '|||')

        for ( item of listitems.items){
            console.log(item)
            $('#nomoresteps').html($('#nomoresteps').html() + item.x+ ':'+item.y+':')
            $('#nomoresteps').text($('#nomoresteps').text() + item.n+ ':'+item.m+'\n')
            $('#nomoresteps').text($('#nomoresteps').text() + '|')
        }


    });

    //11:5:1:5 |6:3:2:6 |6:1:2:2 |6:0:1:3 ||||4:6:6:3 |0:2:4:5 |5:0:4:1 |7:6:3:6 |
    //4:3:6:5 |2:0:2:5 |1:0:1:5 |0:0:1:3 ||||11:12:2:2 |11:7:1:5 |10:2:4:5 |14:0:4:6 |
    it("Setup position",function () {
        a=new Quadrant(4,3,6,5)
        listitems.addQuadrant(a);
        delete  a
        a=new Quadrant(2,0,2,5)
        listitems.addQuadrant(a);
        delete  a
        a=new Quadrant(1,0,1,5)
        listitems.addQuadrant(a);
        delete  a
        a=new Quadrant(0,0,1,3)
        listitems.addQuadrant(a);
        delete  a


        a=new Quadrant(11,12,2,2);
        listmashineitems.addQuadrant(a);
        delete  a
        a=new Quadrant(11,7,1,5);
        listmashineitems.addQuadrant(a);
        delete  a
        a=new Quadrant(10,2,4,5);
        listmashineitems.addQuadrant(a);
        delete  a;
        a=new Quadrant(14,0,4,6);
        listmashineitems.addQuadrant(a);
        delete  a;

        let binit = new Quadrant(0,0,6,5)
        let res = mashinegame(canvas,listmashineitems,listitems,binit);

        // $('#nomoresteps').text(res)


        drawgrid(canvas)


    })
});
