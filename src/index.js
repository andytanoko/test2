


class Bar
{
	

	constructor (elem)
	{
		this.loadDoc();
		elem.innerHTML='<div  class="bar-progress" style="width:0%"></div>' 
			+	'<div  class="bar-text" style="position:absolute;top:0;left:0;width:100%;text-align:center"></div>';
		this.elem = elem.children[0]; 
		this.elemText = elem.children[1];
		this.width = 0;
		this.target =0;
		this.elemText.innerHTML= this.elem.style.width;
		this.limit = 100;
		//this.elemText.innerHTML= this.bean;
		
	}

	loadDoc() {
		var xhttp = new XMLHttpRequest();
		var bar = this;
		xhttp.onreadystatechange=function() {
		if (this.readyState == 4 && this.status == 200) {
			bar.bean=JSON.parse(this.responseText);
			bar.limit = bar.bean.limit;
		}
		};
		xhttp.open("GET", "http://pb-api.herokuapp.com/bars" , true);
		xhttp.send();
	}

	calculateWidth(delta)
	{
		this.width = this.width + delta;
		if (this.width<0)
		{
			this.width=0;
		} else if (this.width>this.limit){
			this.width=this.limit
			
		}
		

		this.target =this.width;
		if (this.target < 0)
		{
			this.target= 0;
			this.elem.className="bar-progress";
		} else if (this.target > 100)
		{
			this.elem.className="bar-progress-red";
			this.target=100;
		} else{
			this.elem.className="bar-progress";
		}
	}
	
	move(delta)
	{
		
		var bar = this;
		this.calculateWidth(delta);
		this.elemText.innerHTML= this.width + "%";
		var id = (delta>0)?setInterval(moveUp, 10):setInterval(moveDown, 10);
		var str = bar.elem.style.width; 
		var w =  0;
		if (str.endsWith("%"))
		{ 
			w= str.substr(0,str.length-1); 
		}

		function moveDown() {
			if (w <= bar.target) {
			  clearInterval(id);
			} else {
			  w--; 
			  bar.elem.style.width =  w + '%'; 
			  
			}
		}

		function moveUp() {
			if (w >= bar.target) {
			  clearInterval(id);
			} else {
			  w++; 
			  bar.elem.style.width =  w + '%'; 
			}
		}
	}
	
	
	
}

class Selector
{
	constructor(document, allElementName)
	{
		
		this.allElement = [];
		this.bar = [];
		for ( var i=0;i<=2;i++)
		{
			this.allElement [i] = document.getElementById(allElementName[i]);
			this.bar [i] = new Bar(this.allElement [i]);
		}
		this.currentIdx=0;
	}
	
	move(val)
	{
		this.bar[this.currentIdx].move(val);
	}


}

window.main = (function() {
	return {
        init: init
    }
	function init() {
		const allElement = ['bar1','bar2','bar3']
		window.selector = new Selector(document,allElement);
		var selectorDom = document.getElementById('progressList');
		selectorDom.addEventListener('change',function() {window.selector.currentIdx=selectorDom.selectedIndex});
		document.getElementById('btnPlus25').addEventListener('click',function(){selector.move(25)});
		document.getElementById('btnPlus10').addEventListener('click',function(){selector.move(10)});
		document.getElementById('btnMin25').addEventListener('click',function(){selector.move(-25)});
		document.getElementById('btnMin10').addEventListener('click',function(){selector.move(-10)});
	}
})();