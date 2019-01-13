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
        a.m = 3;
        a.n = 4;
        var  result = mashinegame(canvas,listmashineitems,listitems,a);
        expect(result).toEqual(1);
        var  result = mashinegame(canvas,listmashineitems,listitems,a);
        expect(result).toEqual(1);


    })

});
