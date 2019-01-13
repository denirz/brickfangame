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
        var a = new Quadrant(0,0);
        a.m=2;
        a.n=2;
        listitems.addQuadrant(a);
        a.setcoords(canvas,2,1)
        listitems.addQuadrant(a);
        a.setcoords(canvas,4,1)
        listitems.addQuadrant(a);
        var  result = mashinegame(canvas,listmashineitems,listitems,a);

        drawgrid(canvas)

        // listitems.draw(canvas)
        // a.clear(canvas)
        // result = mashinegame(canvas,listmashineitems,listitems);

        $("#nomoresteps").text("result="+result);
        // let newm = new Quadrant(listmashineitems.items[0].n,listmashineitems.items[0].m);
        // newm.n=listmashineitems.items[0].n;
        // newm.m=listmashineitems.items[0].m;
        // newm.setcoords(canvas,listmashineitems.items[0].x,listmashineitems.items[0].y);
        // let result1 = newm.checkcorrectness(listitems);
        // $("#nomoresteps").text("result="+result1);
        // expect( result1).toEqual('Cross')
    })

});
