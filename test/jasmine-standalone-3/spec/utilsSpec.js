describe("Utils",function () {
    let ms =2000;

    beforeEach(function() {
        nlines = 25;
        let body = document.getElementsByTagName("body")[0];
        let canv = document.createElement('canvas');
        canv.id ="main";
        canv.width="800";
        canv.height="800";
        body.appendChild(canv);
        listitems = new Qlist();
        listmashineitems = new Qlist();
    });

    it("Should Pause for sometime and return 1",function(){
        expect(sleep(ms)).toEqual(1)
    });

    it("testing Getcellsize",function(){
        // let dom = new DOMImplementation();
        console.log(getCellsize())
        expect(getCellsize() instanceof Array).toBeTruthy();
        expect(getCellsize().length).toEqual(2);
    });

    xit ("testing draw grid!",function(){
        let canvas = document.getElementById("main");
        drawgrid(canvas);
    });

    it ("drawpixel 2-2",function(){
        let canvas = document.getElementById("main");
        drawgrid(canvas);
        drawpixel(2,4)
    });

    it ("testing randid(nlines)",function(){
       let r = randid(nlines);
       console.log(r instanceof Number);
       console.log(r);
       expect(r).toEqual(jasmine.any(Number));
       expect(r).toBeLessThan(nlines);
    })
});

