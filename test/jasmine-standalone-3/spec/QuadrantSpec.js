describe("Quadrant draw",function () {
    // var  nlines=25;
    beforeEach(function () {
        nlines = 25;
        let body = document.getElementsByTagName("body")[0];
        let canv = document.createElement('canvas');
        canv.id ="main";
        canv.width="400";
        canv.height="400";
        body.appendChild(canv);
        listitems = new Qlist();
        listmashineitems = new Qlist();
        a = new Quadrant(2,3);
        canvas = document.getElementById("main");
        drawgrid(canvas)
    });

    it("create new Quadrant",function() {
        console.log(a);
        expect( a instanceof Quadrant).toBeTruthy();
    });
    it("let's draw element",function() {
       a.draw(canvas);
       // sleep(22000);
       a.clear(canvas)
    });

});

describe('QuadrantMove ', function () {
    beforeEach(function () {
        nlines = 25;
        let body = document.getElementsByTagName("body")[0];
        let canv = document.createElement('canvas');
        var test_text = document.createElement('pre');
        test_text.id="QuadrantMove";
        canv.id = "main";
        canv.width = "400";
        canv.height = "400";
        body.appendChild(test_text);
        body.appendChild(canv);

        listitems = new Qlist();
        listmashineitems = new Qlist();


        canvas = document.getElementById("main");
        drawgrid(canvas);

        a = new Quadrant(2,2);

    });

    it("put Quadrant on border and check if it size out of the border",function() {
        a.n=2;
        a.m=2;
        var newContent = document.createTextNode("Quadrant size "+a.n +":"+a.m +"\n");
        var test_text=document.getElementById('QuadrantMove');
        test_text.appendChild(newContent);
        let coords = [a.x,a.y];
        let retcode = a.setcoords(canvas,nlines+6,0);
        expect(retcode).toEqual(-1);
        let orig = [a.x,a.y];
        expect(coords[0]==orig[0] && coords[1]==orig[1]).toBeTruthy()
        coords = [a.x,a.y];
        retcode = a.setcoords(canvas,1,nlines);
        expect(retcode).toEqual(-1);
        orig = [a.x,a.y];
        expect(coords[0]==orig[0] && coords[1]==orig[1]).toBeTruthy()

        coords = [a.x,a.y];
        retcode = a.setcoords(canvas,nlines-4,0);
        orig = [a.x,a.y];
        expect(retcode).toBeUndefined();
        // retcode = a.moveright(canvas);
        expect(a.moveright(canvas)).toBeUndefined();
        expect(a.moveright(canvas)).toBeUndefined();
        expect(a.moveright(canvas)).toEqual(-1,"some message");
        expect(a.moveright(canvas)).toEqual(-1);
        expect(a.moveleft(canvas)).toBeUndefined();
        expect(a.moveright(canvas)).toBeUndefined();

// output on screen:

        var newContent = document.createTextNode("Orig:" + coords +"\n");
        var testtext=document.getElementById('QuadrantMove');
        testtext.appendChild(newContent);
        newContent = document.createTextNode("new:" + orig +"\n");
        testtext.appendChild(newContent);
        newContent = document.createTextNode("Retcode = "+retcode);
        testtext.appendChild(newContent);
        a.draw(canvas);
    });

    it("Comparing Square",function(){
        /// проверяем сравнение прмоугольников
        a.n = 2;
        a.m = 5;
        b= new Quadrant(4,4);
        b.m =2;
        b.n=2;
        // console.log(a.x);
        expect(a.x+a.n).toEqual(4);
        let retcode  = a.checkother(b.x,b.y,b.n,b.m);
        expect(retcode).toEqual(1);

        b.setcoords(canvas,b.x,b.y+1);
        retcode  = a.checkother(b.x,b.y,b.n,b.m);
        expect(retcode).toEqual(1);

        b.setcoords(canvas,b.x,b.y+1);
        retcode  = a.checkother(b.x,b.y,b.n,b.m);
        expect(retcode).toEqual(1);


        b.setcoords(canvas,b.x,b.y+1);
        retcode  = a.checkother(b.x,b.y,b.n,b.m);
        expect(retcode).toEqual(0);

        b.setcoords(canvas,b.x-1,b.y);
        retcode  = a.checkother(b.x,b.y,b.n,b.m);
        expect(retcode).toEqual(1);

        b.setcoords(canvas,b.x-1,b.y);
        retcode  = a.checkother(b.x,b.y,b.n,b.m);
        expect(retcode).toEqual(1);

        b.setcoords(canvas,b.x-1,b.y);
        retcode  = a.checkother(b.x,b.y,b.n,b.m);
        expect(retcode).toEqual(1);

        b.n=2;
        b.setcoords(canvas,b.x-1,b.y);
        retcode  = a.checkother(b.x,b.y,b.n,b.m);
        expect(retcode).toEqual(0);

        b.setcoords(canvas,b.x,b.y-1);
        retcode  = a.checkother(b.x,b.y,b.n,b.m);
        expect(retcode).toEqual(1);

        a.n=6;
        a.m=2;
        b.n=2;
        b.m=4;

        a.setcoords(canvas,5,5);
        b.setcoords(canvas,11,3);
        retcode  = a.checkother(b.x,b.y,b.n,b.m);
        expect(retcode).toEqual(1);
        retcode  = b.checkother(a.x,a.y,a.n,a.m);
        expect(retcode).toEqual(1);

        b.setcoords(canvas,b.x,b.y+1);
        retcode  = a.checkother(b.x,b.y,b.n,b.m);
        expect(retcode).toEqual(1);
        b.setcoords(canvas,b.x,b.y+1);
        retcode  = a.checkother(b.x,b.y,b.n,b.m);
        expect(retcode).toEqual(1);
        b.setcoords(canvas,b.x,b.y+1);
        retcode  = a.checkother(b.x,b.y,b.n,b.m);
        expect(retcode).toEqual(1);
        b.setcoords(canvas,b.x,b.y+1);
        retcode  = a.checkother(b.x,b.y,b.n,b.m);
        expect(retcode).toEqual(0);

        for(let i=1;i<a.n+b.n;i++){
        b.setcoords(canvas,b.x-1,b.y);
        retcode  = a.checkother(b.x,b.y,b.n,b.m);
        expect(retcode).toEqual(1);
        retcode  = b.checkother(a.x,a.y,a.n,a.m);
        expect(retcode).toEqual(1);
        }

        b.setcoords(canvas,b.x-1,b.y);
        retcode  = a.checkother(b.x,b.y,b.n,b.m);
        expect(retcode).toEqual(0);
        retcode  = b.checkother(a.x,a.y,a.n,a.m);
        expect(retcode).toEqual(0);


        var newConten = document.createTextNode("checkother retcode  = "+retcode);
        // console.log("testtext:",test_text);
        var test_text=document.getElementById('QuadrantMove');
        test_text.appendChild(newConten);


        a.draw(canvas);
        b.draw(canvas);
    });

});


describe("check_correctness",function () {
   beforeEach(function () {
        nlines = 25;
        let body = document.getElementsByTagName("body")[0];
        let canv = document.createElement('canvas');

        var test_text = document.createElement('pre');
        test_text.id="test_correctness";

        canv.id ="main";
        canv.width="400";
        canv.height="400";

        body.appendChild(test_text);
        body.appendChild(canv);
        canvas = document.getElementById("main");

        listitems = new Qlist();
        listmashineitems = new Qlist();
        listmashineitems.color="rgba(0,255,255, 1)"
        a = new Quadrant(2,3);
        a.n=5;a.m=5;
        listitems.addQuadrant(a);

       a.setcoords(canvas,a.x+a.n,a.y);

       a.clear(canvas)
       a.n=2;a.m=4;

       listitems.addQuadrant(a);
       a.setcoords(canvas,a.x,a.y+a.m);
       a.clear(canvas);
       a.m=a.m-1;
        listitems.addQuadrant(a);
        a.clear(canvas);

        drawgrid(canvas)

   });

   it("showinitial",function () {
       let candidate = new Quadrant(9,8)
       candidate.n=4;
       candidate.m=5;
       candidate.draw(canvas);
       drawgrid(canvas);
       let rescode = candidate.checkcorrectness(listitems);
       expect(rescode).toEqual(1);


       candidate.movedown(canvas);
       rescode = candidate.checkcorrectness(listitems);
       expect(rescode).toEqual(1);

       candidate.movedown(canvas);
       rescode = candidate.checkcorrectness(listitems);
       expect(rescode).toEqual(0);

       for (let i=0;i<4;i++){candidate.moveup(canvas)}
       rescode = candidate.checkcorrectness(listitems);
       expect(rescode).toEqual(2);

       candidate.setcoords(canvas,3,8);
       rescode = candidate.checkcorrectness(listitems);
       expect(rescode).toEqual(2);

       candidate.moveleft(canvas);
       rescode = candidate.checkcorrectness(listitems);
       expect(rescode).toEqual(1);

       candidate.movedown(canvas);
       rescode = candidate.checkcorrectness(listitems);
       expect(rescode).toEqual(0);

       for (let i=0;i<2;i++){candidate.moveup(canvas)}
       rescode = candidate.checkcorrectness(listitems);
       expect(rescode).toEqual('Cross');

       candidate.clear(canvas);
       candidate.n=2;
       candidate.m=4;
       candidate.setcoords(canvas,7,3);
       candidate.draw(canvas);

       rescode = candidate.checkcorrectness(listitems);
       expect(rescode).toContain('Cross');/// вот тут надо не просто определить пересечение а поймать соответсвие!
       expect(Number(rescode[1])).toEqual(1);

       candidate.clear(canvas);
       candidate.n=5;
       candidate.m=5;
       candidate.setcoords(canvas,2,3);
       candidate.draw(canvas);

       rescode = candidate.checkcorrectness(listitems);
       expect(rescode).toContain('Cross');/// вот тут надо не просто определить пересечение а поймать соответсвие!
       expect(Number(rescode[1])).toEqual(0); // этот элемент именно первый!



       let test_text=document.getElementById('test_correctness');
       test_text.appendChild(document.createTextNode("Res code "+rescode));
   });

    it("fix-test",function () {
       let candidate = new Quadrant(9,8);
       candidate.n=4;
       candidate.m=5;
       candidate.draw(canvas);
       let l1 = listitems.items.length;
       let l2 = listmashineitems.items.length;

       rescode = candidate.fix(canvas,listmashineitems,listitems);
       expect(listmashineitems.items.length).toBeGreaterThan(l2);
       expect(listitems.items.length).toEqual(l1);

       // двигаем его точно на  одного из сущемствующих но по соседству со своим.
       candidate.clear(canvas);
       candidate.n=2;
       candidate.m=3;
       candidate.moveup(canvas);
       candidate.moveleft(canvas);
       candidate.moveleft(canvas);

       rescode = candidate.fix(canvas,listmashineitems,listitems);
       expect(listitems.items.length).toBeLessThan(l1);
       expect(rescode).toEqual(1);

       // теперь  добавляем кандидата  в  синие - но далеко от своих
        candidate.n=4;
        candidate.m=5;
        candidate.setcoords(canvas,9,8);
        // candidate.draw(canvas);


        rescode = candidate.fix(canvas,listitems,listmashineitems);
       expect(rescode).toEqual(0);
       expect(listitems.items.length).toEqual(2);
       expect(listmashineitems.items.length).toEqual(2);

        // переставлем кандидата  поближе к своим
        candidate.n=2;
        candidate.m=3;
        candidate.setcoords(canvas,7,7);
       rescode = candidate.fix(canvas,listitems,listmashineitems);
       expect(rescode).toEqual(1);
       expect(listitems.items.length).toEqual(3);
       expect(listmashineitems.items.length).toEqual(1);


        drawgrid(canvas);
        candidate.draw(canvas);



       let test_text=document.getElementById('test_correctness');
       test_text.appendChild(document.createTextNode("Res code "+rescode));
       test_text.appendChild(document.createTextNode("\nlength listmashineitems:"+listmashineitems.items.length));
       test_text.appendChild(document.createTextNode("\nlength listitems:"+listitems.items.length));
   });

});


