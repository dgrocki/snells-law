var createCanvas = document.getElementById("Sim");
createCanvas.onload = function(){
	workArea.create();
}

var startSim = document.getElementById("start-sim");
startSim.addEventListener('click', function(){
	display();
	workArea.start();
})


	var part;
	var points = [];
	var theta2;
	var line =[];

function perpLine(x){
	var slope;
	var yint;
	this.equation = function(angle, yint){
		this.slope = ((Math.tan(90-angle)));
		this.yint = yint;
		document.getElementById("me").innerHTML = this.slope;
//		slope = (-1*(1/s1));
		
	}
	this.f1 = function(x,y){
		return (this.slope*x);
	
	}



}
//distance = sqrt((x2-x1)sqr + (y2-y1)sqr)
function display(){
	var debug = [];
	var x = document.getElementById("partNum");
	var i;
	var numberOfParticles = parseInt(x.elements[0].value);//access first element of input and turns it into an int
	var temp;
	//WILL GET USER INPUT FOR THESE!!!!
	var intervalSize = 100;		//What interval will the particles be evenly spaced over?
	
	var angle = 80*Math.PI/180;			//how far below the x axis do you want to be? This value is theta1 for snells law
	var theta1 = (Math.PI/2) - angle;
	theta2 = Math.asin((.5/1)*Math.sin(theta1));

	debug.push(theta2);	

	var originx = 100;		//This is where we are centered around		we want half of the interval to be above and below this point.
	var originy =100; 		//This is where we are centered around
	
	var startx = 100;
	var starty = 100;
	var prevx = startx;
	var prevy = starty;
	var h = (intervalSize)/(numberOfParticles);	//h is the distance between each point, depends on interval size and number of points
	
	var f = new perpLine;
	f.equation(angle, originy);
	for(i = 0; i < numberOfParticles; i++){
		//slope formula plugged into distance formula simplified thourgh qudratic forumula
		/*
		var a = (Math.pow(f.f1(1),2)+1);
		var b =  (2*prevx+2*f.f1(1)*prevy);
		var c = (Math.pow(prevx,2)+ Math.pow(prevy,2) - Math.pow(intervalSize,2));
		var newx = b + Math.pow(Math.pow(b,2)-(4*a*c), .5);
		newx = newx/(2*a);
		var newy = f.f1(newx);
		*/

		var newx = Math.cos(angle)*h;
		var newy = Math.sin(angle)*h;
		
		part = new particle(10,10, "red", prevx-newx, prevy-newy,1,angle);
		
		points.push(part);
	   	prevx += newx;
		prevy -= newy;
		//debug.push(newx);
		//debug.push(newy);

			

		part = new particle(10,10,"red", 100, 100,0,angle);
//		console.log(part.color)
//		part.update();

/*
		debug.push(i);
		if(i%2 == 0 ){
//			debug.push("in the 1");
			//temp = (i*h*Math.pow(-1,i));
			temp = ((i/2)*h*Math.pow(-1,i));
			debug.push(temp);
			part = new particle(10,10, "red", originx-temp, originy + f.f1(temp),1);
//			debug.push(originx+temp);
//			debug.push(originy - f.f1(temp));
			points.push(part);
		}else{
//			debug.push("in else");
	//		temp = ( (i-(i-1)/2)*h*Math.pow(-1,i));
			temp = (((i/2)+1)*h*Math.pow(-1,i));
			
			debug.push(temp);
			part = new particle(10,10, "red", originx+temp, originy - f.f1(temp),1);
			points.push(part);
//			debug.push(originx+temp);
//			debug.push(originy - f.f1(temp));
		}
	*/
	}


/*	

for (i = (originx-(intervalSize/2)); i<= (originx + (intervalSize/2)); i+= h){	//Start at the front of our interval, take our origin and subtract off half of the interval.
	//incrememnt to the next x val in the interval with i +=h
		part = new particle(10,10,"red", i, f.f1(-1*i), 1);
		points.push(part);
		if(h == 0){
			break;
		}

		
	}*/

//	part = new particle(10,10,"green", 50, 50, 1);
//	points.push(part);

	document.getElementById("me").innerHTML = debug;
}

function startMove(){
//	part = new particle(10,10,"red", 10,10); //creates a particle
	
	
//	workArea.start();  //calls the start method of thsi object
	
}
function particle(width, height, color, x,y, n1, angle){
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.speed= n1;
	this.angle = angle;
	this.color = color;
	
	this.update = function(){ //create a function to draw my object
/*		ctx = workArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height)	;	
*/
		ctx = workArea.context;
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(this.x,this.y,10,0,2*Math.PI);
		ctx.fill();
		ctx.stroke();

	}
	this.changeSpeed = function(n){
		this.speed = n;
	}
	this.pos = function(){
		this.x += this.speed*Math.sin(this.angle);
		this.y += this.speed*Math.cos(this.angle);
	}
}

var workArea = {
	canvas: document.createElement("canvas"),
	create: function(){
	
		this.canvas.width = 1000;
		this.canvas.height = 500;
		this.context = this.canvas.getContext("2d");
		
		var canvasLocation = document.getElementById("sim-body");
		canvasLocation.appendChild(this.canvas);
	
	},
	start: function() {
		this.interval = setInterval(move, 20);
	},
	
	clear : function(){
		this.context.clearRect(0,0,this.canvas.width, 
		this.canvas.height);
	}

}
function move(){
	var x = document.getElementById("partNum");
	workArea.clear(); //clears the entire canvas
	//create array here of particles to update all of them//
	var numberOfParticles = parseInt(x.elements[0].value);//access first element of input and turns it into an int
	var i;
//	part.x += 1;
//	part.update();
	var mid = Math.floor(numberOfParticles/2);
	line.push(new particle(1,1, "green", points[mid].x, points[mid].y, 0, 0) );
	var j;
	for(j = 0; j< line.length; j++ ){
		line[j].update();
	}

	for(i = 0; i < numberOfParticles; i++){
		//check if we have reached the first threshold
		if(points[i].x >= 300){
			points[i].speed = .5
			points[i].angle = (Math.PI/2)-theta2;
		}

		points[i].pos();
		points[i].update(); //redraws the particle
		
	}
}

