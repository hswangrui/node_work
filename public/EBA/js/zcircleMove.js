// JavaScript Document
// create by zcy 2016/10/10
    
	function runCircle(settings){
		 var defaultSetting={ 
			url:'images/aa.png',   //飞机小图地址
			obj:'',                  //场景添加的canvas id 名
			percent:0.5,               //圆环转动的百分比  0-1 
			circleBottomColor:"#06214f",//圆环底色
            outerColorStart:'#061839',  //外部圆环 渐变色
			outerColorMid:'#061839',
			outerColorEnd:'#061839',
			innerColorStart:'#186ae7',  //内部圆环 渐变色
			innerColorEnd:'#186ae7'
		  }; 
         var option=$.extend({},defaultSetting,settings); 
		
		 var imageUrl=option.url;
		 var obj=option.obj;
		 var percent=option.percent;
		 var outerColorStart=option.outerColorStart;
		 var outerColorMid=option.outerColorMid;
		 var outerColorEnd=option.outerColorEnd;
		 var innerColorStart=option.innerColorStart;
		 var innerColorEnd=option.innerColorEnd;
		 var circleBottomColor=option.circleBottomColor;
		 
		 var preA=Math.PI/180;
		
		var canvasC=document.getElementById(obj);
		/*控制运动*/
		var context=canvasC.getContext('2d');
		var windowW=parseInt($(canvasC).parent().width());
		var lineW1=12;
		var lineW0=5;
		var R0,R1;
		if(windowW>500){
			lineW1=36;
			lineW0=10;
		}
		var canvasW=windowW*0.76;
		
		R=parseInt(canvasW/2-2*lineW1-2*lineW0-10);
		R0=parseInt(canvasW/2-lineW0-4);
		R1=parseInt(canvasW/2-lineW1);
		var ra=parseInt(canvasW/2-lineW0/2-5);
		var canvasH=canvasW;
		var rotateAngle=percent*360;
		var anotherA=0;
		if(percent>0.5){
			anotherA=(percent-0.5)*360*preA;
		}
		var rotataRadians=preA*rotateAngle;
		canvasC.width = canvasW;
		canvasC.height = canvasH;

		var x=canvasC.width/2;
		var y=canvasC.height/2;
		var startAa=-Math.PI/2;
		var startA=0;
		var Timer;
		var preSceond=100/(Math.PI*2)
		var imageAir=new Image();
		imageAir.onload=CanvasApp;
		imageAir.src=imageUrl;
		
		 //-imageAir.width/4-2,-imageAir.height/4,imageAir.width/2,imageAir.height/2
		function CanvasApp(){
			var loading=0;
			canvasC.setAttribute("data-run","1")
			var imgWidth=option.imgWidth||imageAir.width/2;
			var imgHeight=option.imgHeight||imageAir.height/2;
			console.log(imgWidth)
			var imgX=-imgWidth/2-2;
			 var imgY=-imgHeight/2;
			function drawScreen(){
				if(startA<rotataRadians){
					startA+=0.1;
				}
				//

				context.fillStyle='rgba(0,0,0,0)';
				context.fillRect(0,0,canvasC.width,canvasC.height);
				//
				context.save();
				context.setTransform(1,0,0,1,0,0);
				context.fillStyle='rgba(0,0,0,0)';
				context.fillRect(0,0,canvasC.width,canvasC.height);
				context.translate(x,y);
				context.rotate(-Math.PI/2);
				//外环
				context.beginPath();
				//50,50,25,100,100,100
				var gradient1 = context.createLinearGradient(R1, 0,-R1,0);
				gradient1.addColorStop(0,outerColorStart);
				gradient1.addColorStop(0.01,outerColorMid);
				gradient1.addColorStop(1,outerColorEnd );
				context.strokeStyle=gradient1;
				context.lineWidth=0;
				context.arc(0,0,R0,0,Math.PI/2,false);
				context.stroke();
				context.closePath();
				//中环
				context.beginPath();
				context.strokeStyle=circleBottomColor;
				context.lineWidth=10;
				context.arc(0,0,R1,0,300,false);
				context.stroke();
				context.closePath();
				context.beginPath();
				// Linear gradients
				var gradient2 = context.createLinearGradient(R1, 0,-R1,0);
				gradient2.addColorStop(0, innerColorStart);
				gradient2.addColorStop(1, innerColorEnd);
				context.lineCap="square";
				context.strokeStyle=gradient2;
				context.lineWidth=14;
				context.arc(0,0,R1,0,startA,false);
				context.stroke();
				context.closePath();
				
			
				//内环
				context.beginPath();
				context.strokeStyle='rgba(0,0,0,0)';
				context.lineWidth=lineW0;
				context.arc(0,0,R,0,Math.PI*2,false);
				context.stroke();
				context.closePath();
				context.restore();
          
                //文字  进度
				 
			
				//画图
				if(startAa<rotataRadians-Math.PI/2){
					startAa+=0.1;
					canvasC.setAttribute("data-run","1")
				}else{
					clearInterval(Timer);
					canvasC.setAttribute("data-run","0")
				}
				context.save();
				context.setTransform(1,0,0,1,0,0);
				var ax=ra*Math.cos(startAa) ;
				var ay=ra*Math.sin(startAa) ;
				context.translate(x+ax,y+ay);
				context.rotate(startAa);
				context.drawImage(imageAir,imgX,imgY,imgWidth,imgHeight)
				context.restore();
       
			  
			}
			drawScreen();
			Timer=setInterval(drawScreen,20)
			
			
		}
	}