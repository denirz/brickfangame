describe("Qlist tests",function(){
     beforeEach(function(){
         nlines = 25;
        let body = document.getElementsByTagName("body")[0];
        let canv = document.createElement('canvas');

        var test_text = document.createElement('pre');
        test_text.id="Qlist_test";
        body.appendChild(test_text);
        body.appendChild(canv);

        canv.id ="main";
        canv.width="400";
        canv.height="400";

        listitems = new Qlist();
        listmashineitems = new Qlist();
        a = new Quadrant(2,3);
        canvas = document.getElementById("main");
        listitems.addQuadrant(a);
        a.setcoords(canvas,a.x+a.n,a.y);
        a.clear(canvas)
        // a.m=randid(6);
        // a.n=randid(6);
        a.m=randid(6)+1;
        a.n=randid(6)+1;

        listitems.addQuadrant(a);
        a.setcoords(canvas,a.x,a.y+a.m);
        a.clear(canvas)
        a.m=a.m-1;
        if(a.m === 0){a.m=1}
        listitems.addQuadrant(a);
        a.clear(canvas)

        drawgrid(canvas)

     });

     it("Check Candidate in for remove from  Qlist",function(){
         // a.reload(canvas);
         // let rescode = listitems.addQuadrant(a);
         expect(listitems.items.length > 1).toBeTruthy();
         let candidate  = listitems.items[1];
         let candidate_obj = new Quadrant(1,1);
         candidate_obj.x=candidate.x;
         candidate_obj.y=candidate.y;
         candidate_obj.n=candidate.n;
         candidate_obj.m=candidate.m;
         let found = listitems.checkToRemove('d');
         expect(found).toEqual("Error");

         found = listitems.checkToRemove(candidate_obj);
         expect(found).toEqual('1');// должен найти так  и вернуть 1

         candidate_obj.setcoords(canvas,candidate_obj.x+1,candidate_obj.y);
        found = listitems.checkToRemove(candidate_obj);
         expect(found).toEqual(-1);// не должен найти и вернуть -1



         var testtext=document.getElementById('Qlist_test');
         var newContent;
         newContent =document.createTextNode("Found=" + found);
         // console.log(found)
         testtext.appendChild(newContent);
         newContent =document.createTextNode("\nTotal Elements=" + listitems.items.length);
         // console.log(found)
         testtext.appendChild(newContent);
     });

     it("Remove Candidate from Qlist",function(){
          expect(listitems.items.length > 1).toBeTruthy();
         let candidate  = listitems.items[1];
         let candidate_obj = new Quadrant(1,1)
         candidate_obj.x=candidate.x;
         candidate_obj.y=candidate.y;
         candidate_obj.n=candidate.n;
         candidate_obj.m=candidate.m;

         var rescode = listitems.removeItem(candidate_obj);
         expect(rescode).toEqual(1);

         rescode = listitems.checkToRemove(candidate_obj);
         expect(rescode).toEqual(-1);

         candidate_obj.x=candidate_obj.x+1;
         rescode = listitems.removeItem(candidate_obj);
         expect(rescode).toEqual(-1);
     });

     it("Calculate Qlist score",function () {
         let score ;
         let emptylist = new Qlist();
         score =emptylist.score();
         expect(score).toEqual(0);

         score =listitems.score();
         expect(score).toBeGreaterThan(0);

         var testtext=document.getElementById('Qlist_test');
         var newContent;
         newContent =document.createTextNode("Score=" + score);
         testtext.appendChild(newContent);

     });

     it("check candidate to remove by size",function () {
         let itemnum = 2;
         let candidate = listitems.items[itemnum];
         console.log(candidate);
         console.log(listitems);
         // let candidate_obj = new Quadrant(1,1)
         // candidate_obj.x=candidate.x;
         // candidate_obj.y=candidate.y;
         // candidate_obj.n=candidate.n;
         // candidate_obj.m=candidate.m;

         let rescode = listitems.find_bySize(candidate.n,candidate.m);
         expect(rescode instanceof Array).toBeTruthy();
         expect(rescode).toContain(String(itemnum));

         // транспонируем
         rescode = listitems.find_bySize(candidate.m,candidate.n)
         expect(rescode instanceof Array).toBeTruthy();
         expect(rescode).toContain(String(itemnum));


         var testtext=document.getElementById('Qlist_test');
         var newContent;
         newContent =document.createTextNode("number of items:"+listitems.items.length);
         testtext.appendChild(newContent);
         newContent =document.createTextNode("\ncandidates:"+rescode);
         testtext.appendChild(newContent);
         drawgrid(canvas)
     });
});