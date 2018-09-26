describe("IndexJs", function() {
    var bar;
 
    //This will be called before running each spec
	beforeEach(function() {
        var barDiv = '<div id="fixture"><div id="wrapper"><div class="bar-container" id="bar1">'
    +'</div>'
    +'<div class="bar-container" id="bar2">'
    +'</div>'
    +'<div class="bar-container" id="bar3">'
    +'</div>'
    +'<select id="progressList" >'
	+'<option value="0">Bar 1</option>'
	+'<option value="1">Bar 2</option>'
	+'<option value="2">Bar 3</option>'
    +'</select>'
	+' <button class="w3-button" id="btnMin25" >-25</button> '
    +'<button class="w3-button" id="btnMin10">-10</button> '
    +'<button class="w3-button" id="btnPlus10">+10</button> '
	+'<button class="w3-button" id="btnPlus25">+25</button> '
	+'</div></div>'
	;

        document.body.insertAdjacentHTML(
            'afterbegin',
            barDiv);
		
    });

    // remove the html fixture from the DOM
    afterEach(function() {
        document.body.removeChild(document.getElementById('fixture'));
    });
 
	beforeEach(function() {
		window.main.init();

	});
    describe("when progress bar is 0 and limit 120 and selector=0", function(){
         beforeEach(function() {
			window.selector.bar[0].width=0;
			window.selector.bar[0].limit=120;
		});

        it("move 10, should increase to 10", function() {
			
			document.getElementById("btnPlus10").click();
            expect(window.selector.bar[0].width).toEqual(10);
        });
 
        it("move 25, should increase to 25", function() {
			document.getElementById("btnPlus25").click();
            expect(window.selector.bar[0].width).toEqual(25);
        });

        it("move -10, should stays 0", function() {
			document.getElementById("btnMin10").click();
            expect(window.selector.bar[0].width).toEqual(0);
        });
		
         
    });
	
	describe("when progress bar is 100 and limit 120  and selector=0", function(){
         
		beforeEach(function() {
			window.selector.bar[0].width=100;
			window.selector.bar[0].limit=120;
		});

        it("move +25, should increase to 120 and change color to red", function() {
			
			document.getElementById("btnPlus25").click();
            expect(window.selector.bar[0].width).toEqual(120);
			expect(window.selector.bar[0].elem.className).toEqual("bar-progress-red");
        });

        it("move 10, should increase to 110", function() {
			document.getElementById("btnPlus10").click();
            expect(window.selector.bar[0].width).toEqual(110);
        });
 

        it("move -25, should decrase to 75", function() {
			
			document.getElementById("btnMin25").click();

            expect(window.selector.bar[0].width).toEqual(75);
        });
    });
	
	
	
	describe("when selector=1", function(){
         
		beforeEach(function() {
			window.selector.bar[1].width=100;
			window.selector.bar[1].limit=120;
			document.getElementById('progressList').selectedIndex = 1;
			document.getElementById('progressList').dispatchEvent(new Event('change'));
		});

        it("move +25, should increase to 120 and change color to red", function() {
			document.getElementById("btnPlus25").click();
            expect(window.selector.bar[1].width).toEqual(120);
			expect(window.selector.bar[1].elem.className).toEqual("bar-progress-red");
        });

        it("move 10, change selector = 0, move 10, should result bar0.width=10, bar1.width=110", function() {
			document.getElementById("btnPlus10").click();
            
			document.getElementById('progressList').selectedIndex = 0;
			document.getElementById('progressList').dispatchEvent(new Event('change'));
			document.getElementById("btnPlus10").click();
			expect(window.selector.bar[0].width).toEqual(10);
			expect(window.selector.bar[1].width).toEqual(110);
		});
 

        it("move -25, should decrase to 75", function() {
			document.getElementById("btnMin25").click();
            expect(window.selector.bar[1].width).toEqual(75);
			
        });



});
	
	
		
	
	
	
});