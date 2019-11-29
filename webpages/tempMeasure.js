//temp measure file
//version:20180817
//240*180
//version:20181018
var windowNum = 0;
var spotNum = 0;
var img_tail=0;
var img_num=1;
var boxName = [true,true,true,true,true,true];
var spotName = [true,true,true,true,true,true];
var lineName = [true];
var BOX_NUM = 6, SPOT_NUM = 6, LINE_NUM = 1;
var boxDelAll = -1,spotDelAll = -1,lineDelAll = -1;
var spot1LeftCoor =[1,2,3,4,5,6];
var spot1TopCoor = [1,2,3,4,5,6];
var spot2LeftCoor =[1,2,3,4,5,6];
var spot2TopCoor = [1,2,3,4,5,6];
//区域温度
var maxTempValue = [1,2,3,4,5,6];
var minTempValue = [1,2,3,4,5,6];
var averTempValue = [1,2,3,4,5,6];
//点温度
var tempValue = [1,2,3,4,5,6];
//动态line:0:max;1:left;2:top;3:min:4:left;5:top;6:aver;
//初始line:0:left1;1:top1;2:left2;3:top2;
var lineValue = [1,2,3,4,5,6,7];
var lineMaxValue = [2];
var lineAverValue = [1];
var lineMinValue = [0];
var lineRedLeft = [1];
var lineRedTop = [1];
var lineBlueLeft = [1];
var lineBlueTop = [1];
//var spotMesaStr = '|area=0,X=430,Y=222|area=-1|area=2,X=600,Y=400|area=-1|area=-1|area=-1';
//var spotMesaStr = '';
//var boxMesaStr = '|area=0,X=430,Y=222,W=40,H=60;|area=-1|area=2,X=60,Y=400,W=600,H=70|area=-1|area=-1|area=-1';
//var boxMesaStr = '';
//var lineMesaStr = '|num=0,Xh=30,Yh=30,Xt=600,Yt=500';
//var lineMesaStr = '';
//spot image 偏移距离
var allTemp='|x=0,y=0';
var allAlarm='|a=-1|s=-1|l=-1';
var boxAlarmFlag = new InitArray(0,BOX_NUM);
var spotAlarmFlag = new InitArray(0,SPOT_NUM);
var lineAlarmFlag = new InitArray(0,LINE_NUM);
//全图温度
var lowTemp=0,highTemp=0;
var spotImgLeft = 15,spotImgTop = 15,spotTopOffset = 10;
//鼠标起始坐标
var startX, startY, diffX, diffY;
var startOffsetX=0,startOffsetY=0;
//分辨率*3
var imageWidth = 480;
var imageHeight = 360;
//全屏时参数
var widthMul = parseInt(window.screen.width)/imageWidth;
var heightMul = parseInt(window.screen.height)/imageHeight;
//init时，存储box坐标记宽高；fullscreen时，存储原坐标及宽高
var boxFlag = 0, spotFlag = 0, lineFlag = 0;
var boxStartLeft = [0,0,0,0,0,0];
var boxStartTop = [0,0,0,0,0,0];
var boxStartWidth = [0,0,0,0,0,0];
var boxStartHeight = [0,0,0,0,0,0];
//init时，存储spot坐标，fullscreen时，存储原坐标
var spotStartLeft = [0,0,0,0,0,0];
var spotStartTop = [0,0,0,0,0,0];
//全屏时，存储line原始值
var lineStartTop,lineStartLeft,lineStartWidth,lineStarDeg,lineEndTop,lineEndLeft;
// 是否拖动，初始为 false
var dragging = false,dragL = false;
//初始化标志
var initFlag = true,fullScreenFlag = false;
//测温曲线
var samplingPeriod=1;//采样周期
var peiodNum=1;
var tempRangeUp=140,tempRangeDown=-20;//测温范围，默认值-20~120
var curveLength = 980;
var curveFull = false;
//maxCurve其实代指curve1，因为历史原因，起名max，其实与最高温度并无关系，下面的min及aver同理
var maxCurve = new Array(curveLength);
var minCurve = new Array(curveLength);
var averCurve = new Array(curveLength);
var curveAllIndex=0;
var curveDataIndex0=0;
var curveDataIndex1=0;
var curveDataIndex2=0;
var curveTimeIndex=0;
var curveTimeIndex0=0;
var curveTimeIndex1=0;
var curveTimeIndex2=0;
var curveAllFlag=false;
//定义测量区域的值
var BOX0=0,BOX1=1,BOX2=2,BOX3=3,BOX4=4,BOX5=5,SPOT0=6,SPOT1=7,SPOT2=8,SPOT3=9,SPOT4=10,SPOT5=11,LINE0=12;
//定义温度为摄氏度或者华氏度
//0是摄氏度，1是华氏度，2是兰氏度等等。即此支持摄氏度及华氏度。
//华氏度与摄氏度转换公式为：F=1.8*C+32；
var tempName = '0';
//window.onload = function(ev) {
var mousedownFlag = false;
//测量工具ID
var boxToolID = ['boxButton0','boxButton1','boxButton2','boxButton3','boxButton4','boxButton5'];
var spotToolID = ['spotButton0','spotButton1','spotButton2','spotButton3','spotButton4','spotButton5'];
var lineToolID = ['lineButton0'];

//判断该测量工具是否存在
function is_half_used_tool(id){
	
	var tool = document.getElementById(id);
	var flag = '';
	
	if(id.indexOf('box')>-1){
		
		flag = 'rectangle1';
	}else if(id.indexOf('spot')>-1){

		flag = 'point1';
	}else if(id.indexOf('line')>-1){

		flag = 'line1';
	}else{

		return false;
	}
	
	if(tool.src.indexOf(flag)>-1){
		
		return true;
	}else{

		return false;
	}
}

function clear_half_used_tool(id){

	var tool = document.getElementById(id);
	var flag = '';

	if(id.indexOf('box')>-1){
		
		flag = 'rectangle';
	}else if(id.indexOf('spot')>-1){

		flag = 'point';
	}else if(id.indexOf('line')>-1){

		flag = 'line';
	}else{

		return false;
	}
	
	tool.src = './images/' + flag + '.png';
}

function is_used_tool(id){

	var plate = document.getElementById('frameHead');
	var len = plate.childNodes.length;
	var name = '';

	if(id.indexOf('box')>-1){
		
		name = 'activeBox' + id.replace('boxButton','');
	}else if(id.indexOf('spot')>-1){

		name = id.replace('Button','');
	}else if(id.indexOf('line')>-1){

		name = 'measureLine';
	}else{

		return false;
	}

	for(var i=0; i<len; i++){
		
		if(plate.childNodes[i].name == name)
			return true;
	}

	return false;
}


function patchBugMisopration(){
	
	var box_len = boxToolID.length;
	var spot_len = spotToolID.length;
	var line_len = lineToolID.length;
	
	for(var i=0; i<box_len; i++){
		
		if(boxToolID[i] != null && is_half_used_tool(boxToolID[i])){
			
			if(!is_used_tool(boxToolID[i])){
				
				clear_half_used_tool(boxToolID[i]);
			}
		}
	}

	for(var i=0; i<spot_len; i++){

		if(spotToolID[i] != null && is_half_used_tool(spotToolID[i])){

			if(!is_used_tool(spotToolID[i])){
				
				clear_half_used_tool(spotToolID[i]);
			}
		}
	}
	
	for(var i=0; i<line_len; i++){

		if(lineToolID[i] != null && is_half_used_tool(lineToolID[i])){

			if(!is_used_tool(lineToolID[i])){
				
				clear_half_used_tool(lineToolID[i]);
			}
		}
	}
	
}


//
function need_error_checking(name){
	if(name != 'frameHead')
		return true;
	else
		return false;
}

//
function dragElem(){
	//拖动与退出
	
	document.onmousedown = function(ev){
		//拖动div
		var name = ev.target.id;
		
		if(need_error_checking(name))
			patchBugMisopration();
		
		var line = document.getElementById('redLine');
		if(ev.target.className.match(/box/)){
			
			mousedownFlag = true;
			dragging = true;
			//startX = ev.pageX - ev.target.offsetLeft;
			//startY = ev.pageY - ev.target.offsetTop;
			//getOffset();
        	startX = ev.pageX - ev.target.offsetLeft;
       		startY = ev.pageY - ev.target.offsetTop;
            // 设置当前 box 的 id 为 moving_box
            if(document.getElementById("moving_box") !== null) {
                document.getElementById("moving_box").removeAttribute("id");
            }
            ev.target.id = "moving_box";
			
          	//alert("e");
            // 计算坐标差值
            diffX = startX;
            diffY = startY;
		}
		else if(ev.target.className === "circle"){
			mousedownFlag = true;
			dragging = true;
			startX = ev.pageX - ev.target.offsetLeft;
       		startY = ev.pageY - ev.target.offsetTop;
            // 设置当前 box 的 id 为 moving_box
            if(document.getElementById("spotMeasu") !== null) {
                document.getElementById("spotMeasu").removeAttribute("id");
            }
            ev.target.id = "spotMeasu";
			diffX = startX;
            diffY = startY;
		}
		else if(line != null){
			mousedownFlag = true;
			if(line.name === 'redLine'){
				startX = ev.pageX - startOffsetX;
				startY = ev.pageY - startOffsetY;
			}else if(ev.target.id === 'redLine'){
				dragL = true;
				//startX = ev.pageX - line.offsetLeft;
				//startY = ev.pageY - line.offsetTop;
				startX = ev.pageX - startOffsetX - line.offsetLeft;
       			startY = ev.pageY- startOffsetY - line.offsetTop;
			}
		}
		//当鼠标在范围外点击时，退出
		else if(ev.target.id !== "frameHead"){
			
			//document.getElementById("frameHead").onmousedown = null;
			//document.getElementById("frameHead").onmousemove = null;
			//document.getElementById("frameHead").onmouseup = null;	
		}
		if((ev.target.className.indexOf('alarm')<0)){
			hideAlarm();
		}
		if((ev.target.className.indexOf('envir')<0)){
			hideEnvir();
		}

		if((ev.target.className.indexOf('algor')<0)){
			hideAlgorithm();
		}
		
		if((ev.target.className.indexOf('Slide')<0)){
			hideIcon();
		}
		if((ev.target.className.indexOf('show')<0)){
			hidePlate();
		}
	}
	
	// 鼠标移动
	//document.getElementById("frameHead").onmousemove = function(e){
	document.onmousemove = function(e) {
        // 更新 box 尺寸
		var par = document.getElementById("frameHead");
		//var line = document.getElementById('redLine');
		var dx;
		var dy;
		e.onselectstart = function() {return false;};
		//alert(startX);
		if(e.pageX-startOffsetX>par.offsetWidth){
			dx = par.offsetWidth-startX;
		}else{
			dx = e.pageX - startOffsetX - startX;
			if(e.pageX-startOffsetX<0){
				dx = - startX;
			}	
		}
		if(e.pageY-startOffsetY>par.offsetHeight){
			dy = par.offsetHeight - startY;
		}else{
			dy = e.pageY - startOffsetY - startY;
			if(e.pageY-startOffsetY<0){
				dy = - startY;
			}	
		}
        if(document.getElementById("active_box") !== null) {
            var ab = document.getElementById("active_box");
			//alert('0');
			//if(dx<0) ab.style.left = e.pageX;
			//if(dx<0) ab.style.top = e.pageY;
			ab.style.width = dx + 'px';
            ab.style.height = dy + 'px';
        }
		
		if(document.getElementById('redLine') != null){
			var line = document.getElementById('redLine');
			//直线绘制功能
			if(line.name === 'redLine'){
				var degNum = getDeg(dx,dy);
				if(dx<0){
					if(e.pageX-startOffsetX<0){
						line.style.left = 0 +'px';
					}else{
						line.style.left = e.pageX - startOffsetX + 'px';
					}
					
					if(e.pageY-startOffsetY<0){
						line.style.top = 0 + 'px';
					}else if(e.pageY-startOffsetY<par.offsetHeight){
						line.style.top = e.pageY - startOffsetY + 'px';
					}else{
						line.style.top = par.offsetHeight + 'px';
					}
				}else{
					line.style.left = startX + 'px';
					line.style.top = startY + 'px';
				}
				line.style.width = Math.sqrt(dx*dx + dy*dy) + 'px';
				line.style.transform = 'rotate(' + degNum+ 'deg)';
			}else if(line.name === 'measureLine' && dragL){
				//直线拖动功能
				var deg = getSymbolNumeber(line.style.transform);
				var sinDeg = Math.sin(deg*Math.PI/180);
				var cosDeg = Math.cos(deg*Math.PI/180);
				//alert(e.pageX - startOffsetX - startX);
				//dx = e.pageX - startX;
				//dy = e.pageY  - startY;
				if(dx<0) dx=0;
				if(dy<0) dy=0;
				if(dx > par.offsetWidth - line.offsetWidth*cosDeg) dx = par.offsetWidth - line.offsetWidth*cosDeg;
				if(sinDeg<0){
					if(dy > par.offsetHeight) dy = par.offsetHeight;
					if(dy < -line.offsetWidth*sinDeg) dy = -line.offsetWidth*sinDeg;
					//alert(line.offsetWidth*sinDeg);
				}else{
					if(dy > par.offsetHeight - line.offsetWidth*sinDeg) dy = par.offsetHeight - line.offsetWidth*sinDeg;
				}
				
				line.style.left = dx + 'px';
				line.style.top = dy + 'px';
				if(fullScreenFlag){
					var offsetx,offsety;
					offsetx = lineStartLeft - dx/widthMul;
					offsety = lineStartTop - dy/heightMul;
					lineStartLeft = Math.round(dx/widthMul);
					lineStartTop = Math.round(dy/heightMul);
					lineEndLeft = Math.round(lineEndLeft - offsetx);
					lineEndTop = Math.round(lineEndTop - offsety);
				}
			}
		}
		//alert(dragging);
        // 移动，更新 box 坐标
        if(document.getElementById("moving_box") !== null && dragging) {
            var mb = document.getElementById("moving_box");
			dx = e.pageX - diffX;
			dy = e.pageY  - diffY;
			//box坐标
			if(dx<0) dx=0;
			if(dy<0) dy=0;
			if(dx>par.offsetWidth - mb.offsetWidth) dx = par.offsetWidth - mb.offsetWidth;
			if(dy>par.offsetHeight - mb.offsetHeight) dy = par.offsetHeight - mb.offsetHeight;

            mb.style.left = dx + 'px';
			mb.style.top = dy + 'px';
			
        }
		else if(document.getElementById("spotMeasu") !== null && dragging){
			var mb = document.getElementById("spotMeasu");
			
			dx = e.pageX - diffX;
			dy = e.pageY - diffY;
			if(dx<0) dx=0;
			if(dy<0) dy=0;
			if(dx>par.offsetWidth - mb.offsetWidth) dx = par.offsetWidth - mb.offsetWidth;
			if(dy>par.offsetHeight - mb.offsetHeight) dy = par.offsetHeight - mb.offsetHeight;
            mb.style.left = dx + 'px';
			mb.style.top = dy + 'px';
		}
    };	
	
	document.onmouseup = function(e) {
        // 禁止拖动
        
		var line = document.getElementById('redLine');
		if(line != null){
			line.name = 'measureLine';
		}
		dragL=false;
		dragging = false;

		document.getElementById("frameHead").onmousedown = null;
			
        if(document.getElementById("active_box") !== null) {
            var ab = document.getElementById("active_box");
			ab.removeAttribute("id");
        }
		if(document.getElementById("moving_box") !== null) {
            var ab = document.getElementById("moving_box");
            ab.removeAttribute("id");
        }
		if(document.getElementById("spotMeasu") !== null){
			var sm = document.getElementById("spotMeasu");
			sm.removeAttribute("id");
		}
		//alert(windowNum);
    };
}

//从字符串中获取数字
function getNumber(v){
	var s="" ;
	for(var i=0;i<v.length;i++)
	{
		if("0123456789".indexOf(v.substr(i,1))>-1)
			s+=v.substr(i,1);
	}
	return s;
}

//
function sendPlateParam(cmd,param)
{
	try{
		var url = 'set_param.cgi?&group_tag=hash_param.htm'/*tpa=http://192.168.100.2:8080/set_param.cgi?&group_tag=hash_param*/;
		url+='&set_cmd='+cmd;
		url+='&length='+param.length;
		url+= param;
		url+='&' + new Date().getTime() + Math.random();
		//alert(url);
        $.ajax({
               url: url,
               async: true,//改为异步方式
               type: "GET",
               timeout:400,
               data: {},
               success: function (result) {
			   }
        });
	 //location.reload();
	}catch(exception){
	return;
	}
}


//隐藏
function showValue(id,value){
	if(id == 'distance'){
		var text = document.getElementById('distanceText');
		text.innerText = (value/10) + 'm';
	}
	if(id == 'colorPlate'){
		initColorphoto(value);
	}
	
	plateFlag[id] = true;
	submitDate(id,value);
}

var plateNum = 13;
var plateObj = new Array(plateNum);
var plateFlag = {
	'tempNamePlate':'false',
	'colorPlate':'false',
	'videomodel':'false',
	'lighting':'false',
	'distance':'false',
	'direction':'false',
	'autoCorrection':'false',
	'envirDivPlate':'false',
	'finetuning':'false',
	'tempSection':'false',
	'analogVideo':'false',
	'videoRecord':'false',
	'IOValidDiv':'false',
};
// 滑动条
function envirReflectPlateChange(numId,textId){ 
	      var num=document.getElementById(numId); 
	      var text =document.getElementById(textId); 
	      text.innerText=num.value ; 
}

function submitDate(id,val){
	var cmd,param;
	var error = false;
	
	switch(id){
		case 'tempNamePlate':
			break;
		case 'colorPlate':
			//色板
			var color = document.getElementById('colorSelect');
			cmd = 'colorPlate';
			param = '&color='+color.value;
			break;
			
		case 'videomodel':
			//视频模式:红外，可见光，融合
			var video = document.getElementById('videoSelect');
			cmd = 'videoModel';
			param = '&video='+video.value;
			break;
			
		case 'lighting':
			//灯光补偿
			var light = document.getElementById('lightingSelect');
			cmd = 'lighting';
			param = '&light='+light.value;
			break;
			
		case 'distance':
			//距离调整
			var range = document.getElementById('distanceRange');
			cmd = 'distance';
			param = '&range='+range.value;
			break;
			
		case 'direction':
			//图像方向
			var hori = document.getElementById('horizontal');
			var vert = document.getElementById('vertical');
			var h=0,v=0;
			if(hori.checked)h=1;
			if(vert.checked)v=1;
			cmd = 'direction';
			param = '&horizontal='+h+'&vertical='+v;
			break;
		case 'autoCorrection':
			//自动校准
			var auto = document.getElementById('autoCorrectSelect');
			var enable = document.getElementById('autoCorrectEnable');
			
			if(enable.value != 0){

				if(checkNonnumeric(auto.value)<0){

					error = true;
					alert(_inputerror);
				}
				
				if((auto.value < 30 && auto.value != 0) || auto.value > 3600){

					error = true;
					alert(_autoCorrectError);
				}
				
				param = '&value=' + auto.value;
			}else
				param = '&value=' + '0';
			
			cmd = 'autoCorrection';
			break;
			
		case 'envirDivPlate':
			
			var reflectivity = significant_number($('#envirReflectPlate').val(),3);
			var airTemp = significant_number($('#envirAirTemPlate').val(),3);
			var targetTemp = significant_number($('#envirTargetTempPlate').val(),3);
			var atmosTrans = significant_number($('#envirAtmosTransPlate').val(),3);
			var distance = significant_number($('#envirDisPlate').val(),3);
			var infraredTemp = significant_number($('#envirInfTemPlate').val(),3);
			//var infraredRadia = significant_number($('#envirInfRadPlate').val(),3);
			
			if(checkEnvirParam(reflectivity,airTemp,targetTemp,atmosTrans,distance,infraredTemp)<0){

				error = true;
				alert(_inputerror);
				
			}else{

				cmd = 'envirParam';
				param = '&reflectivity=' + reflectivity + '&airTemp=' + airTemp + '&targetTemp=' + targetTemp
					+ '&atmosTrans=' + atmosTrans+'&distance=' + distance + '&infraredTemp=' + infraredTemp
					+ '&method=0' + '&index=0';
			}
			
			break;
			
		case 'finetuning':
			//视频微调
			var hori = document.getElementById('leftRight');
			var verti = document.getElementById('topButtom');
			var zoomx = document.getElementById('zoomX');
			var zoomy = document.getElementById('zoomY');
			
			val.value = Math.round(val.value);
			if(val.value%2 != 0)
				val.value = val.value - 1;
			
			if(checkNonnumeric(val.value)<0){
				alert(_inputerror);
				return 0;
			}
				
			if(hori.value>240 || hori.value<-240 || verti.value>180 || verti.value<-180 || zoomx.value<-240 || zoomx.value>240 || zoomy.value<-180 || zoomy.value>180){
				alert(_finetuningError);
				return 0;
			}
			
			rangeNumConect(val);
			
			cmd = 'finetuning';
			param = '&leftRight='+hori.value+'&topButtom='+verti.value+'&zoomx='+zoomx.value+'&zoomy='+zoomy.value;
			break;

		case 'tempSection':
			var temp = document.getElementById('tempSectionSelect');
			cmd = 'tempSection';
			param = '&value=' + temp.value;
			break;

		case 'analogVideo':
			var analog = document.getElementById('analogVideoSelect');
			cmd = 'analogVideo';
			param = '&value=' + analog.value;
			break;

		case 'IOValidDiv':
			var input = document.getElementById('inputValidSelect');
			var output = document.getElementById('outputValidSelect');
			cmd = 'IOValid';
			param = '&input=' + input.value + '&output=' + output.value;
			break;
		case 'videoRecord':
			var video = document.getElementById('videoRecordSelect');
			var record = document.getElementById('recordKey');
			var save = document.getElementById('saveFlag');

			if(is_sdcard_exist() < 0){
				alert(_sdcard_nonexist);
				return 0;
			}
			
			cmd = 'videoRecord';
			if(val>1){
				if(record.name == 'pause'){
					record.name = 'record';
					record.src = './images/record1.png';
				
					record.onmouseover = function(){
						showFocus(this,'record');
					};
					record.onmouseout = function(){
						showBlur(this,'record');
					};

					save.style.display = 'inline';
					save.innerText = _recording;
					val = 3;
				}else{
					record.name = 'pause';
					record.src = './images/video1.png';
					
					record.onmouseover = function(){
						showFocus(this,'video');
					};
					record.onmouseout = function(){
						showBlur(this,'video');
					};

					save.style.display = 'none';
					save.innerText = _recording;
					val = 2;
				}
				
			}
			param = '&value=' + val;
			break;
			
		default:
			break;
	}
	if(error === false){
		sendPlateParam(cmd,param);
	}
}

//微调range和text互联
function rangeNumConect(obj){
	var val;
	val = parseInt(obj.value);
	
	switch(obj.id){
		case 'offsetXRange':
			val = val - 240;
			$("#leftRight").val(val);
			break;

		case 'leftRight':
			val = val + 240;
			$("#offsetXRange").val(val);
			break;

		case 'offsetYRange':
			val = val - 180;
			$("#topButtom").val(val);
			break;

		case 'topButtom':
			val = val + 180;
			$("#offsetYRange").val(val);
			break;

		case 'zoomXRange':
			val = val - 240;
			$("#zoomX").val(val);
			break;

		case 'zoomX':
			val = val + 240;
			$("#zoomXRange").val(val);
			break;

		case 'zoomYRange':
			val = val - 180;
			$("#zoomY").val(val);
			break;

		case 'zoomY':
			val = val + 180;
			$("#zoomYRange").val(val);
			break;

		default:
			break;
	}
}

function hidePlate(){
	plateObj[0] = document.getElementById('tempNamePlate');
	plateObj[1] = document.getElementById('colorPlate');
	plateObj[2] = document.getElementById('videomodel');
	plateObj[3] = document.getElementById('lighting');
	plateObj[4] = document.getElementById('distance');
	plateObj[5] = document.getElementById('direction');
	plateObj[6] = document.getElementById('autoCorrection');
	plateObj[7] = document.getElementById('envirDivPlate');
	plateObj[8] = document.getElementById('finetuning');
	plateObj[9] = document.getElementById('tempSection');
	plateObj[10] = document.getElementById('analogVideo');
	plateObj[11] = document.getElementById('videoRecord');
	plateObj[12] = document.getElementById('IOValidDiv');
	var obj0 = document.getElementById('setupList');
	var obj1 = document.getElementById('languageList');
	for(var num=0; num<plateNum; num++){
		if(plateObj[num] != null){
			//判断当前显示板块
			if(plateObj[num].style.display == 'inline'){
				plateObj[num].style.display = 'none';
				//判断参数有没有被修改
				if(plateFlag[plateObj[num].id] == true){
					plateFlag[plateObj[num].id] = false;
					//submitDate(plateObj[num].id);
				}
			}
		}
	}
	obj0.style.display='none';
	obj1.style.display='none';
}

function showPlate(id){
	var plate = document.getElementById(id);
	plate.style.display = 'inline';
}

function showFocus(e,name){
	var img = name+'1';
	e.src = './images/'+img+'.png';
	if(e.id == 'playPause'){
		if(e.name == 'pause'){
			e.src='./images/pause1.png';
		}else{
			e.src='./images/play1.png';
		}
	}
}
function showBlur(e,name){
	e.src = './images/'+name+'.png';
	if(e.id == 'playPause'){
		if(e.name == 'pause'){
			e.src='./images/pause.png';
		}else{
			e.src='./images/play.png';
		}
	}
}



//init plate title
function initPlateTitle(){
	//视频模式
	$("#imgVideoMode").attr('title',_video_mode);
	//微调
	$("#imgFinetuning").attr('title',_fine_tuning);
	//视距调整
	$("#imgDistance").attr('title',_dist_adjust);
	//灯光补偿
	$("#imgLight").attr('title',_lighting);
	//图像方向
	$("#imgDirection").attr('title',_dire_adjust);
	//s色板
	$("#colorPlateDiv").attr('title',_color_plate);
	//快门校正
	$("#shutterCorrection").attr('title',_shutter_correction);
	//自动快门校正
	$("#imgAutoShut").attr('title',_auto_shutter);
	//环境参数
	$("#bcgCorrction").attr('title',_envir_param);
	//温度单位
	$("#waveform").attr('title',_measurement);
	//测温区域
	$("#imgTempArea").attr('title',_temp_zone);
	//模拟视频
	$("#imgAnalogVideo").attr('title',_analog_video);
	//录像
	$("#imgVideoRecord").attr('title',_record);
	//温度单位
	$("#tempName").attr('title',_temp_unit);

}
//
function initForthDivTitle(){
	$("#playPause").attr('title',_stop);
	$("#snapshot").attr('title',_snapshot);
	$("#recordKey").attr('title',_record);
	$("#showHide").attr('title',_hideTool);
	$("#fullScreen").attr('title',_fullScreen);
}

function initTitle(){
	initPlateTitle();
	initForthDivTitle();
}

function initPlate(){
	
	if((typeof gvideo_model == 'undefined') || (typeof gleftRight == 'undefined')){
			//视频模式
		$("#videoSelect").val(0);
		//微调
		$("#offsetXRange").val(240);
		$("#leftRight").val(0);
		$("#offsetYRange").val(180);
		$("#topButtom").val(0);
		$("#zoomXRange").val(240);
		$("#zoomX").val(0);
		$("#zoomYRange").val(180);
		$("#zoomY").val(0);
		//视距调整
		$("#distanceRange").val(0);
		var text = document.getElementById('distanceText');
		text.innerText = (0/10) + 'm';
		//灯光补偿
		$("#lightingSelect").val(0);
		//图像方向
		$("#horizontal").val(0);
		$("#vertical").val(0);
		//自动校准
		$("#autoCorrectSelect").val(0);
		$("#autoCorrectEnable").val(0);
		//温度区域
		$("#tempSectionSelect").val(0);
		//模拟视频输出
		$("#analogVideoSelect").val(0);
		//视频录像
		$("#videoRecordSelect").val(0);
		//温度单位
		$("#celsius").attr('checked','checked');
		//报警IO
		$("#inputValidSelect").val(1);
		$("#outputValidSelect").val(1);
	}else{
		//视频模式
		$("#videoSelect").val(gvideo_model);
		//微调
		$("#offsetXRange").val(parseInt(gleftRight)+240);
		$("#leftRight").val(gleftRight);
		$("#offsetYRange").val(parseInt(gtopButtom)+180);
		$("#topButtom").val(gtopButtom);
		$("#zoomXRange").val(parseInt(gzoomx)+240);
		$("#zoomX").val(gzoomx);
		$("#zoomYRange").val(parseInt(gzoomy)+180);
		$("#zoomY").val(gzoomy);
		//视距调整
		$("#distanceRange").val(grange);
		var text = document.getElementById('distanceText');
		text.innerText = (grange/10) + 'm';
		//灯光补偿
		$("#lightingSelect").val(glight);
		//图像方向
		$("#horizontal").val(ghorizontal);
		$("#vertical").val(gvertical);
		//自动校准
		$("#autoCorrectSelect").val(gauto_correction);
		if(gauto_correction != 0){
			$("#autoCorrectEnable").val(1);
		}
		//温度区域
		$("#tempSectionSelect").val(gtempSection);
		//模拟视频输出
		$("#analogVideoSelect").val(ganalogVideo);
		//视频录像
		$("#videoRecordSelect").val(gvideoRecord);
		//温度单位
		$("#celsius").attr('checked','checked');
		//报警IO
		$("#inputValidSelect").val(ginput);
		$("#outputValidSelect").val(goutput);
	}
}

//摄氏度向各种温度转换
var CELSIUS='0',FAHRENHEIT='1',RANKINE='2',REAUMUR='3',ABSOLUTE='4';

function setTempName(obj){
	var box = document.getElementById('tempNameBox');
	var spot = document.getElementById('tempNameSpot');
	var line = document.getElementById('tempNameLine');
	tempName = obj.value;
	switch(tempName){
		case CELSIUS:

			box.innerHTML = "<strong>"+_temperature_name+"℃</strong>";
			spot.innerHTML = "<strong>"+_temperature_name+"℃</strong>";
			line.innerHTML = "<strong>"+_temperature_name+"℃</strong>";
			break;
		//华氏度
		case FAHRENHEIT:

			box.innerHTML = "<strong>"+_temperature_name+"℉</strong>";
			spot.innerHTML = "<strong>"+_temperature_name+"℉</strong>";
			line.innerHTML = "<strong>"+_temperature_name+"℉</strong>";
			break;
		//兰氏度
		case RANKINE:

			box.innerHTML = "<strong>"+_temperature_name+"°R</strong>";
			spot.innerHTML = "<strong>"+_temperature_name+"°R</strong>";
			line.innerHTML = "<strong>"+_temperature_name+"°R</strong>";
			break;
		//列氏度
		case REAUMUR:

			box.innerHTML = "<strong>"+_temperature_name+"°Re</strong>";
			spot.innerHTML = "<strong>"+_temperature_name+"°Re</strong>";
			line.innerHTML = "<strong>"+_temperature_name+"°Re</strong>";
			break;
		//绝对温度
		case ABSOLUTE:

			box.innerHTML = "<strong>"+_temperature_name+"K</strong>";
			spot.innerHTML = "<strong>"+_temperature_name+"K</strong>";
			line.innerHTML = "<strong>"+_temperature_name+"K</strong>";
			break;
		default:

			box.innerHTML = "<strong>"+_temperature_name+"℃</strong>";
			spot.innerHTML = "<strong>"+_temperature_name+"℃</strong>";
			line.innerHTML = "<strong>"+_temperature_name+"℃</strong>";
			break;
	}
	//alert(tempConversion(tempName,25.7));
}

function tempConversion(name,value){
	var ret=0;
	switch(name){
		//摄氏度
		case CELSIUS:
			ret = value;
			break;
		//华氏度
		case FAHRENHEIT:
			ret = 1.8*value+32;
			break;
		//兰氏度
		case RANKINE:
			ret = 1.8*value+32+459.67; 
			break;
		//列氏度
		case REAUMUR:
			ret = value*0.8;
			break;
		//绝对温度
		case ABSOLUTE:
			ret = value + 273.15;
			break;
		default:
			ret =value;
			break;
	}
	//保留两位小数
	ret = Math.round(ret*100)/100;
	return ret;
}

//
function showBoxCoordinate(){
	var frameList = document.getElementById('frameHead');
	var frameListLen = frameList.childNodes.length;
	
	for(var spotNumber=0; spotNumber<6; spotNumber++){
		for(var i=0; i<frameListLen; i++){
			if(frameList.childNodes[i].name === ('activeBox'+spotNumber)){
				
				//更新box中spot的坐标
				var boxSpot1 = document.getElementById('activeBox'+spotNumber+'1');
				var boxSpot2 = document.getElementById('activeBox'+spotNumber+'2');
	
				if(!fullScreenFlag){
					boxSpot1.style.left = spot1LeftCoor[spotNumber] - spotImgLeft + 'px';
					boxSpot1.style.top = spot1TopCoor[spotNumber] - spotImgTop + 'px';
					boxSpot2.style.left = spot2LeftCoor[spotNumber] - spotImgLeft  + 'px';
					boxSpot2.style.top = spot2TopCoor[spotNumber] - spotImgTop + 'px';
				}else{
					boxSpot1.style.left = (spot1LeftCoor[spotNumber]*widthMul - spotImgLeft)+'px';
					boxSpot1.style.top = (spot1TopCoor[spotNumber]*heightMul - spotImgTop)+'px';
					boxSpot2.style.left = (spot2LeftCoor[spotNumber]*widthMul - spotImgLeft) + 'px';
					boxSpot2.style.top = (spot2TopCoor[spotNumber]*heightMul - spotImgTop) + 'px';
				}
				
				//更新box的温度值
				var maxVal = document.getElementById('maxValue'+spotNumber);
				var minVal = document.getElementById('minValue'+spotNumber);
				var averVal = document.getElementById('averValue'+spotNumber);
				maxVal.value = tempConversion(tempName,maxTempValue[spotNumber]/10);
				minVal.value = tempConversion(tempName,minTempValue[spotNumber]/10);
				averVal.value = tempConversion(tempName,averTempValue[spotNumber]/10);
			}
		}
	}
}

function showSpotCoordinate(){
	var frameList = document.getElementById('frameHead');
	var frameListLen = frameList.childNodes.length;
	
	for(var spotNumber=0; spotNumber<6; spotNumber++){
		for(var i=0; i<frameListLen; i++){
			if(frameList.childNodes[i].name === ('spot'+spotNumber)){
				//更新spot的温度值
				var spotVal = document.getElementById('spotValue'+spotNumber);
				spotVal.value = tempConversion(tempName,tempValue[spotNumber]/10);
			}
		}
	}
}

//显示线上温度
function showLineCoordinateBack(){
	var line = document.getElementById('redLine');
	if(line != null){
		var lineMax = document.getElementById('lineMaxValue0');
		var lineMin = document.getElementById('lineMinValue0');
		var lineAver = document.getElementById('lineAverValue0');
		var lineSpot1 = document.getElementById('lineSpot01');
		var lineSpot2 = document.getElementById('lineSpot02');
	
		if(!fullScreenFlag){
			lineSpot1.style.left = lineValue[1] - spotImgLeft +'px';
			lineSpot1.style.top = lineValue[2] - spotImgTop +'px';
			lineSpot2.style.left = lineValue[4] - spotImgLeft + 'px';
			lineSpot2.style.top = lineValue[5] - spotImgTop + 'px';
		}else{
			lineSpot1.style.left = (lineValue[1]*widthMul - spotImgLeft) +'px';
			lineSpot1.style.top = (lineValue[2]*heightMul - spotImgTop) +'px';
			lineSpot2.style.left = (lineValue[4]*widthMul - spotImgLeft) + 'px';
			lineSpot2.style.top = (lineValue[5]*heightMul - spotImgTop) + 'px';
		}
		lineMax.value = tempConversion(tempName,lineValue[0]/10);
		lineMin.value = tempConversion(tempName,lineValue[3]/10);
		lineAver.value = tempConversion(tempName,lineValue[6]/10);
	}
}
//显示线上温度
function showLineCoordinate(){
	var line = document.getElementById('redLine');
	if(line != null){
		var lineMax = document.getElementById('lineMaxValue0');
		var lineMin = document.getElementById('lineMinValue0');
		var lineAver = document.getElementById('lineAverValue0');
		var lineSpot1 = document.getElementById('lineSpot01');
		var lineSpot2 = document.getElementById('lineSpot02');
	
		if(!fullScreenFlag){
			lineSpot1.style.left = lineRedLeft[0] - spotImgLeft +'px';
			lineSpot1.style.top = lineRedTop[0] - spotImgTop +'px';
			lineSpot2.style.left = lineBlueLeft[0] - spotImgLeft + 'px';
			lineSpot2.style.top = lineBlueTop[0] - spotImgTop + 'px';
		}else{
			lineSpot1.style.left = (lineRedLeft[0]*widthMul - spotImgLeft) +'px';
			lineSpot1.style.top = (lineRedTop[0]*heightMul - spotImgTop) +'px';
			lineSpot2.style.left = (lineBlueLeft[0]*widthMul - spotImgLeft) + 'px';
			lineSpot2.style.top = (lineBlueTop[0]*heightMul - spotImgTop) + 'px';
		}
		lineMax.value = tempConversion(tempName,lineMaxValue[0]/10);
		lineMin.value = tempConversion(tempName,lineMinValue[0]/10);
		lineAver.value = tempConversion(tempName,lineAverValue[0]/10);
	}
}

function showAllTemp(){
	var low = document.getElementById('allLowTemp');
	var high = document.getElementById('allHighTemp');
	low.value = tempConversion(tempName,lowTemp/10);
	high.value = tempConversion(tempName,highTemp/10);
}
/*
//调整spot的坐标，以及更新温度值
function showCoordinate(){
	var frameList = document.getElementById('frameHead');
	var frameListLen = frameList.childNodes.length;
	
	for(var spotNumber=0; spotNumber<6; spotNumber++){
		for(var i=0; i<frameListLen; i++){
			if(frameList.childNodes[i].name === ('spot'+spotNumber)){
				//更新spot的温度值
				var spotVal = document.getElementById('spotValue'+spotNumber);
				
				spotVal.value = tempValue[spotNumber];
			}else if(frameList.childNodes[i].name === ('activeBox'+spotNumber)){
				//更新box中spot的坐标
				var boxSpot1 = document.getElementById('activeBox'+spotNumber+'1');
				var boxSpot2 = document.getElementById('activeBox'+spotNumber+'2');
				
				boxSpot1.style.left = spot1LeftCoor[spotNumber]+'px';
				boxSpot1.style.top = spot1TopCoor[spotNumber]+'px';
				boxSpot2.style.left = spot2LeftCoor[spotNumber] + 'px';
				boxSpot2.style.top = spot2TopCoor[spotNumber] + 'px';
				//更新box的温度值
				var maxVal = document.getElementById('maxValue'+spotNumber);
				var minVal = document.getElementById('minValue'+spotNumber);
				var averVal = document.getElementById('averValue'+spotNumber);
				
				maxVal.value = maxTempValue[spotNumber];
				minVal.value = minTempValue[spotNumber];
				averVal.value = averTempValue[spotNumber];
			}
		}
	}
	sendBoxCoordinate();
}
*/
//把line坐标发送到后台
function sendLineCoordinate(){
	var line =document.getElementById('redLine');
	var str = '';
	if(line != null){
		var leftCoor0,topCoor0,leftCoor1,topCoor1;
		var deg = getSymbolNumeber(line.style.transform);
		var sinDeg = Math.sin(deg*Math.PI/180);
		var cosDeg = Math.cos(deg*Math.PI/180);
		var dy = line.offsetWidth*sinDeg;
		var dx = line.offsetWidth*cosDeg;
		if(!fullScreenFlag){
			leftCoor0 = parseInt(line.style.left);
			topCoor0 = parseInt(line.style.top);
			leftCoor1 = parseInt(leftCoor0+dx);
			topCoor1 = parseInt(topCoor0+dy);
			lineStartLeft = leftCoor0;
			lineStartTop = topCoor0;
			lineEndLeft = leftCoor1;
			lineEndTop = topCoor1;
			lineStarDeg = deg;
			lineStartWidth = line.offsetWidth;
		}else{
			leftCoor0 = lineStartLeft;
			topCoor0 = lineStartTop;
			leftCoor1 = lineEndLeft;
			topCoor1 = lineEndTop;
		}
		lineFlag = bit_or(lineFlag,bit_valid[0]);
		str = '&LHX0=' + leftCoor0 + '&LHY0=' + topCoor0 + '&LTX0=' + leftCoor1 + '&LTY0=' + topCoor1;
	}
	
	str = '&lineFlag=' + lineFlag + str;
	return str;
}

//把spot坐标发送到后台
function sendSpotCoordinate(){
	//
	var frameList = document.getElementById('frameHead');
	var frameListLen = frameList.childNodes.length;
	var spotStr = '',str,spotIndex = true;
	var leftCoor,topCoor;
	//将spot坐标合成字符串，发送给后台
	for(var spotNumber=0; spotNumber<6; spotNumber++){
		for(var i=0; i<frameListLen; i++){
			if(frameList.childNodes[i].name === ('spot'+spotNumber))
			{
				if(!fullScreenFlag){
					leftCoor = parseInt(frameList.childNodes[i].style.left) + spotImgLeft;
					topCoor = parseInt(frameList.childNodes[i].style.top) + spotImgTop + 10;
				}else{
					leftCoor = Math.round(parseInt(frameList.childNodes[i].style.left)/widthMul + spotImgLeft);
					topCoor = Math.round(parseInt(frameList.childNodes[i].style.top)/heightMul + spotImgTop + 10);
				}

				spotFlag = bit_or(spotFlag,bit_valid[spotNumber]);
				str = '&SX' + spotNumber + '=' + leftCoor + '&SY' + spotNumber + '=' + topCoor;
				spotStr += str;
				spotIndex = false;
				break;
			}
		}
		/*
		if(spotIndex){
			//str = '|num='+'-1'+',X='+'-1'+',Y='+'-1';
			str = '|num=-1';
			spotStr += str;
		}
		spotIndex = true;
		*/
	}
	spotStr = '&spotFlag=' + spotFlag + spotStr;
	return spotStr;
}

//把box坐标发送到后台
function sendBoxCoordinate(){
	var frameList = document.getElementById('frameHead');
	var frameListLen = frameList.childNodes.length;
	var boxStr = '',str,boxIndex = true;
	var leftCoor,topCoor,boxWidth,boxHeight;
	
	for(var boxNumber=0; boxNumber<6; boxNumber++){
		for(var i=0; i<frameListLen; i++){
			if(frameList.childNodes[i].name === ('activeBox'+boxNumber))
			{
				if(!fullScreenFlag){
					leftCoor = parseInt(frameList.childNodes[i].style.left);
					topCoor = parseInt(frameList.childNodes[i].style.top);
					boxWidth = parseInt(frameList.childNodes[i].style.width);
					boxHeight = parseInt(frameList.childNodes[i].style.height);
				}else{
					leftCoor = Math.round(parseInt(frameList.childNodes[i].style.left)/widthMul);
					topCoor = Math.round(parseInt(frameList.childNodes[i].style.top)/heightMul);
					boxWidth = Math.round(parseInt(frameList.childNodes[i].style.width)/widthMul);
					boxHeight = Math.round(parseInt(frameList.childNodes[i].style.height)/heightMul);
				}
				boxFlag = bit_or(boxFlag,bit_valid[boxNumber]);
				str = '&BX' + boxNumber + '=' + leftCoor 
						+'&BY' + boxNumber + '=' + topCoor 
						+'&BW' + boxNumber + '=' + boxWidth 
						+'&BH' + boxNumber + '='+boxHeight;
				boxStr += str;
				boxIndex = false;
				break;
			}
		}
		/*
		if(boxIndex){
			//str = '|num=-1'+',X=-1'+',Y=-1'+',W=-1'+',H=-1';
			str = '|num=-1';
			boxStr += str;
		}
		boxIndex = true;
		*/
	}
	boxStr = '&boxFlag=' + boxFlag + boxStr;
	return boxStr
}


function sendMouseCoordinate(){
	var mouseStr = '';
	var coor_x = mouse_tool['coor_x'], coor_y = mouse_tool['coor_y'];

	coor_x = mouse_originalx(coor_x);
	coor_y = mouse_originaly(coor_y);

	if(!fullScreenFlag){
		if(mouse_tool['mouseFlag'] != 0)
			mouseStr = '&MX=' + coor_x + '&MY=' + coor_y;
	}else{
		if(mouse_tool['mouseFlag'] != 0)
			mouseStr = '&MX=' + (coor_x/widthMul) + '&MY=' + (coor_y/heightMul);
	}
	
	mouseStr = '&mouseFlag=' + mouse_tool['mouseFlag'] + mouseStr;

	return mouseStr;
}

//从字符串中获取有符号型数字
function getSymbolNumeber(v){
	var s = '';
	if(v === ''){
		return -1;
	}
	for(var n=0;n<v.length;n++){
		if('-.0123456789'.indexOf(v.substr(n,1))>-1){
			s += v.substr(n,1);
		}
	}
	return s;
}
//将源字符串依据分隔符分割为若干个字符串
function spitString(dst,src,sym){
	var index = 0;
	
	for(var i=0; i<src.length; i++){
		
		if((sym.indexOf(src.substr(i,1))>-1) && (i>0)){
			index++;
		}
		
		if(sym.indexOf(src.substr(i,1))<0){
			dst[index] += src.substr(i,1);
		}
	}
	return index;
}
//将值赋给box
function setBoxElement(index,name,value){
	switch(name){
		case 0:
			break;
		case 1:
			maxTempValue[index] = value;
			break;
		case 2:
			spot1LeftCoor[index] = value;
			break;
		case 3:
			spot1TopCoor[index] = value;
			break;
		case 4:
			minTempValue[index] = value;
			break;
		case 5:
			spot2LeftCoor[index] = value;
			break;
		case 6:
			spot2TopCoor[index] = value;
			break;
		case 7:
			averTempValue[index] = value;
			break;
		default:
			break;
	}
}
//从后台获取box坐标
//注：从后台获取数据的方式沿袭rockchip，即变量定义在后台定义。但这有个缺点，即如果后台传输出错，可能导致整个程序运行崩坏
//即无法做到纠错。正确的做法无疑是变量在本地定义，后台传值过来赋值，并在赋值前，对此值进行类型判断。
//但此工作量有点大，可待有暇时修改。
function getBoxCoordinate(){
	var boxMess = ['','','','','',''];
	var index = 0;
	//boxMesaStr = '|area=1,max_t=1200,x=450,y=245,min_t=400,x=200,y=300,ave_t=800|area=-1|area=2,max_t=300,x=250,y=120,min_t=400,x=40,y=60,ave_t=800|area=-1|area=-1|area=-1';
	if(typeof boxMesaStr == 'undefined'){

		initFlag = 0;
	}else{
	
		//将字符串分割为6部分
		spitString(boxMess,boxMesaStr,'|');
		//index=6
		for(var i=0;i<6;i++){
			var value = ['','','','','','','',''];
			index = spitString(value,boxMess[i],',');
			if(!initFlag){
				for(var m=0;m<=index;m++){
					var s='';
					s = getSymbolNumeber(value[m]);
					setBoxElement(i,m,s);
					//alert(value[m]);
				}
			}else{
				if(getSymbolNumeber(value[0])>-1){
	            	boxName[i] = false;
					boxStartLeft[i] = getSymbolNumeber(value[1]);
					boxStartTop[i] = getSymbolNumeber(value[2]);
					boxStartWidth[i] = getSymbolNumeber(value[3]);
					boxStartHeight[i] = getSymbolNumeber(value[4]);
				}
			}
		}
	}
}

//从后台获取spot坐标以及温度值
function getSPotCoordinate(){
	var spotMess = ['','','','','',''];
	var index = 0;
	//spotMesaStr = '|area=1,ave_t=800|area=-1|area=2,ave_t=800|area=-1|area=-1|area=-1';

	if(typeof spotMesaStr == 'undefined'){

		initFlag = 0;
	}else{

		//将字符串分割为6部分
		spitString(spotMess,spotMesaStr,'|');
		for(var i=0;i<6;i++){
			var value = ['',''];
			var s='';
			index = spitString(value,spotMess[i],',');
			if(!initFlag){
				if(index>0){
					s = getSymbolNumeber(value[1]);
					tempValue[i] = s;
				}
			}else{
				if(getSymbolNumeber(value[0])>-1){
					spotName[i] = false;
					spotStartLeft[i] = getSymbolNumeber(value[1]);
					spotStartTop[i] = getSymbolNumeber(value[2]);
				}
			}
		}
	}
}

//从后台获取line数据
function getLineCoordinate(){
	var lineMess,index;
	var value = ['','',''];
	var s='';

	if(typeof lineMesaStr == 'undefined'){

		initFlag = 0;
	}else{

		index = spitString(value,lineMesaStr,',');
		if(initFlag){
			if(getSymbolNumeber(value[0])>-1){
	    		lineName[0] = false;
			}
		}
		for(var m=0;m<=index;m++){
			s = getSymbolNumeber(value[m]);
			if(m>0){
				lineValue[m-1] = s;
			}
		}
	}
}

function getAllTemp(){
	//allTemp	= '|x=300,y=21';
	var allMes=['',''],value=['',''];
	spitString(allMes,allTemp,'|');
	spitString(value,allMes[0],',');
	highTemp = getSymbolNumeber(value[0]);
	lowTemp = getSymbolNumeber(value[1]);	
}

function optionCurve(){
	if((curveAllIndex==0)&&(!curveAllFlag)){
		curveAllIndex=0;
	}else{
		curveAllIndex++;
		if(curveAllIndex>=curveLength){
			curveAllIndex=0;
			curveFull = true;
		}
	}
	curveAllFlag = true;
	maxCurve[curveAllIndex] = highTemp/10;
	minCurve[curveAllIndex] = lowTemp/10;
}

//
function boxTempCoorControl(param,value)
{
	try{
		var url = 'set_param.cgi?&group_tag=temp_coor.htm'/*tpa=http://192.168.100.2:8080/set_param.cgi?&group_tag=temp_coor*/;
		url+='&set_cmd='+param;
		url+='&length='+value.length;
		url+='&value='+value;
		url+='&' + new Date().getTime() + Math.random();
        $.ajax({
               url: url,
               async: true,//改为yibu方式
               type: "GET",
               timeout:400,
               data: {},
               success: function (result) {
					boxMesaStr = result;
					getBoxCoordinate();
					showBoxCoordinate();
					//alert(boxMesaStr);
			   }
        });
	 //location.reload();
	}catch(exception){
	return;
	}
}

function spotTempCoorControl(param,value)
{
	try{
		var url = 'set_param.cgi?&group_tag=temp_coor.htm'/*tpa=http://192.168.100.2:8080/set_param.cgi?&group_tag=temp_coor*/;
		url+='&set_cmd='+param;
		url+='&length='+value.length;
		url+='&value='+value;
		url+='&' + new Date().getTime() + Math.random();
		//alert(url);
        $.ajax({
               url: url,
               async: true,//改为yibu方式
               type: "GET",
               timeout:400,
               data: {},
               success: function (result) {
					spotMesaStr = result;
					getSPotCoordinate();
					showSpotCoordinate();
					//alert(result);
			   }
        });
	 //location.reload();
	}catch(exception){
	return;
	}
}

function lineTempCoorControl(param,value)
{
	try{
		var url = 'set_param.cgi?&group_tag=temp_coor.htm'/*tpa=http://192.168.100.2:8080/set_param.cgi?&group_tag=temp_coor*/;
		url+='&set_cmd='+param;
		url+='&length='+value.length;
		url+='&value='+value;
		url+='&' + new Date().getTime() + Math.random();
		//alert(url);
        $.ajax({
               url: url,
               async: true,//改为yibu方式
               type: "GET",
               timeout:400,
               data: {},
               success: function (result) {
					lineMesaStr = result;
					getLineCoordinate();
					showLineCoordinate();
					//alert(result);
			   }
        });
	 //location.reload();
	}catch(exception){
	return;
	}
}

//对报警状态记录
var boxAlarmMess=[false,false,false,false,false,false];
var spotAlarmMess=[false,false,false,false,false,false];
var lineAlarmMess=[false,false,false,false,false,false];

function checkNum(dst,src,len){
	var ret = false;
	for(var i=0; i<=len; i++){
		if(dst == src[i]){
			ret = true;
		}
	}
	return ret;
}

function getShowAlarm(){
	var allMes=['','',''],value=['','','','','',''],index=0,sa='',se='';
	var number=new InitArray(-1, 6);
	var aflag=false,eflag=false;
	var imgID='alarmImg',imgObj;
	
	spitString(allMes,allAlarm,'|');

	//box
	index=spitString(value,allMes[0],',');
	for(var i=0; i<=index; i++){
		var num = getSymbolNumeber(value[i]);
		if(num>-1 && num != ''){
			number[i] = num;
		}else{
			break;
		}
	}
	for(var i=0;i<6;i++){
		imgObj = document.getElementById(imgID+'Box'+i);
		if(checkNum(i,number,index)){
			//该区域报警
			if(!boxAlarmMess[i]){
				//新添报警事件
				aflag = true;
				sa += _area+i;
				imgObj.src='./images/redAlarm.png';
			}
			boxAlarmMess[i]=true;
		}else{
			if(boxAlarmMess[i]){
				//该区域报警取消
				eflag = true;
				se += _area+i;
				if(imgObj.src.indexOf('redAlarm')>-1){
					imgObj.src='./images/yellowAlarm.png';
				}
			}
			boxAlarmMess[i]=false;
		}
	}

	//spot
	value=['','','','','',''];
	number=[-1,-1,-1,-1,-1,-1];
	index=spitString(value,allMes[1],',');
	for(var i=0; i<=index; i++){
		var num = getSymbolNumeber(value[i]);
		if(num>-1 && num != ''){
			number[i] = num;
		}else{
			break;
		}
	}

	for(var i=0;i<6;i++){
		imgObj = document.getElementById(imgID+'Spot'+i);
		if(checkNum(i,number,index)){
			//该区域报警
			if(!spotAlarmMess[i]){
				//新添报警事件
				aflag = true;
				sa += _spot+i;
				imgObj.src='./images/redAlarm.png';
			}
			spotAlarmMess[i]=true;
		}else{
			if(spotAlarmMess[i]){
				//该区域报警取消
				eflag = true;
				se += _spot+i;
				if(imgObj.src.indexOf('redAlarm')>-1){
					imgObj.src='./images/yellowAlarm.png';
				}
			}
			spotAlarmMess[i]=false;
		}
	}

	//line
	value=['','','','','',''];
	number=[-1,-1,-1,-1,-1,-1];
	index=spitString(value,allMes[2],',');
	for(var i=0; i<=index; i++){
		var num = getSymbolNumeber(value[i]);
		if(num>-1 && num != ''){
			number[i] = num;
		}else{
			break;
		}
	}
	for(var i=0;i<1;i++){
		imgObj = document.getElementById(imgID+'Line'+i);
		if(checkNum(i,number,index)){
			//该区域报警
			if(!lineAlarmMess[i]){
				//新添报警事件
				aflag = true;
				sa += _aline+i;
				imgObj.src='./images/redAlarm.png';
			}
			lineAlarmMess[i]=true;
		}else{
			if(lineAlarmMess[i]){
				//该区域报警取消
				eflag = true;
				se += _aline+i;
				if(imgObj.src.indexOf('redAlarm')>-1){
					imgObj.src='./images/yellowAlarm.png';
				}
			}
			lineAlarmMess[i]=false;
		}
	}

	//弹框报警
	if(aflag){
		sa += _alarm;
		alert(sa);
	}
	if(eflag){
		se += _elimination;
		alert(se);
	}
}

//报警提示
function showAlarm(){
	var imgObj, imgID='alarmImg';
	var alarm_flag = false, cancel_flag = false;
	var alarm_string = '', cancel_string = '';
	
	for(var i=0; i<BOX_NUM; i++){
		imgObj = document.getElementById(imgID+'Box'+i);

		if(boxAlarmFlag[i]>-1){
			if(boxAlarmFlag[i] != 0){                         //alarm
				if(!boxAlarmMess[i]){
					alarm_flag = true;
					alarm_string += _area + i;
				
					imgObj.src='./images/redAlarm.png';
				}
				boxAlarmMess[i]=true;
			}else{                                           //cancel alarm
				if(boxAlarmMess[i]){
					cancel_flag = true;
					cancel_string += _area+i;
				
					if(imgObj.src.indexOf('redAlarm')>-1)
						imgObj.src='./images/yellowAlarm.png';
				}
				boxAlarmMess[i]=false;
			}
		}
	}

	for(var i=0; i<SPOT_NUM; i++){
		imgObj = document.getElementById(imgID+'Spot'+i);

		if(spotAlarmFlag[i]>-1){
			if(spotAlarmFlag[i] != 0){
				if(!spotAlarmMess[i]){
					alarm_flag = true;
					alarm_string += _spot + i;
				
					imgObj.src='./images/redAlarm.png';
				}
				spotAlarmMess[i]=true;
			}else{
				if(spotAlarmMess[i]){
					cancel_flag = true;
					cancel_string += _spot + i;
				
					if(imgObj.src.indexOf('redAlarm')>-1)
						imgObj.src='./images/yellowAlarm.png';
				}
				spotAlarmMess[i]=false;
			}
		}
	}

	for(var i=0; i<LINE_NUM; i++){
		imgObj = document.getElementById(imgID+'Line'+i);

		if(lineAlarmFlag[i]>-1){
			if(lineAlarmFlag[i] != 0){
				if(!lineAlarmMess[i]){
					alarm_flag = true;
					alarm_string += _aline + i;
				
					imgObj.src='./images/redAlarm.png';
				}
				lineAlarmMess[i]=true;
			}else{
				if(lineAlarmMess[i]){
					cancel_flag = true;
					cancel_string += _aline + i;
				
					if(imgObj.src.indexOf('redAlarm')>-1)
						imgObj.src='./images/yellowAlarm.png';
				}
				lineAlarmMess[i]=false;
			}
		}
	}
	
	alarm_string += _alarm;
	cancel_string += _elimination;

	if(cancel_flag)
		alert(cancel_string);                                  //cancel alarm, alert message

	if(alarm_flag)
		alert(alarm_string);                                   //alarm, alert message
}

function getAllAlarm(){
	//allAlarm='|a=0,a=1,a=2,|a=2,a=3,a=5|a=0';
	//allAlarm='|a=-1,|s=-1,|l=-1,';
	var allMes=['','',''],value=['','','','','',''],index=0;
	for(var i=0;i<6;i++){
		boxAlarmMess[i]=false;
		spotAlarmMess[i]=false;
		lineAlarmMess[i]=false;
	}
	spitString(allMes,allAlarm,'|');
	index=spitString(value,allMes[0],',');
	for(var i=0;i<=index;i++){
		var num=getSymbolNumeber(value[i]);
		if(num>-1){
			boxAlarmMess[num]=true;
		}
	}
	value=['','','','','','']
	index=spitString(value,allMes[1],',');
	for(var i=0;i<=index;i++){
		var num=getSymbolNumeber(value[i]);
		if(num>-1){
			spotAlarmMess[num]=true;
		}
	}
	value=['','','','','','']
	index=spitString(value,allMes[2],',');
	for(var i=0;i<=index;i++){
		var num=getSymbolNumeber(value[i]);
		if(num>-1){
			lineAlarmMess[num]=true;
		}
	}
	for(var i=0;i<6;i++){
		//alert(boxAlarmMess[i]);
	}
}

var alarmFlag = '';
function showAllAlarm(){
	var alarmMessage ='';
	var imgID='alarmImg',imgObj;
	for(var i=0;i<6;i++){
		imgObj = document.getElementById(imgID+'Box'+i);
		if(boxAlarmMess[i]){
			alarmMessage += 'box='+i;
			imgObj.src='./images/redAlarm.png';
		}else{
			if(imgObj.src.indexOf('redAlarm')>-1){
				imgObj.src='./images/yellowAlarm.png';
			}
		}
		imgObj = document.getElementById(imgID+'Spot'+i);
		if(spotAlarmMess[i]){
			alarmMessage += 'spot='+i;
			imgObj.src='./images/redAlarm.png';
		}else{
			if(imgObj.src.indexOf('redAlarm')>-1){
				imgObj.src='./images/yellowAlarm.png';
			}
		}
		if(i<1){
			imgObj = document.getElementById(imgID+'Line'+i);
			if(lineAlarmMess[i]){
				alarmMessage += 'line='+i;
				imgObj.src='./images/redAlarm.png';
			}else{
				if(imgObj.src.indexOf('redAlarm')>-1){
					imgObj.src='./images/yellowAlarm.png';
				}
			}
		}
	}
	if(alarmFlag !== alarmMessage){
		var ret=cutString(alarmFlag,alarmMessage);
		if(ret == -1){
			ret = cutString(alarmMessage,alarmFlag);
			if(ret != -1){
				alarmEvent(ret,'alarm',alarmFlag,alarmMessage);
			}
		}else{
			alarmEvent(ret,'elimination',alarmFlag,alarmMessage);
		}
		alarmFlag = alarmMessage;
	}
}
function alarmEvent(name,ev,ex1,ex2){
	var s='';
	var index='';
	if(name.match(/box/) != null){
		index = name.match(/box=\d+/g);
		if(index != null){
			for(var i=0; i<index.length; i++){
				s += _area+getNumber(index[i]);
			}
		}
	}
	if(name.match(/spot/) != null){
		index = name.match(/spot=\d+/g);
		if(index != null){
			for(var i=0; i<index.length; i++){
				s += _spot+getNumber(index[i]);
			}
		}
	}
	if(name.match(/line/) != null){
		index = name.match(/line=\d+/g);
		if(index != null){
			for(var i=0; i<index.length; i++){
				s += _aline+getNumber(index[i]);
			}
		}
	}
	if(ev === 'elimination'){
		s += _elimination;
	}else{
		s += _alarm;
	}
	if(s != ''){
		alert(s+'-'+name+'-'+ex1+'-'+ex2);
	}
}

//自定义函数，将初始字符串中非最终字符串的部分截取出来，并作为返回值
//比如'abcde'作为初始值，'abc'作为最终值，则返回'de'
function cutString(original,final){
	var ret=-1;
	var leno=original.length,lenf=final.length;
	var reString='';
	var s='';
	for(var i=0; i<lenf; i++){
		reString += final[i]+'.'+'*';
	}
	//若初始值不能包括最终值，则返回-1，否则，返回字符串
	var regex=new RegExp(reString,'gi');
	if(original.match(regex) != null){
		//原始值能与新值匹配
		var num=0;
		for(var i=0; i<leno; i++){
			if(original[i] === final[num]){
				num++;
			}else{
				s += original[i];
			}
		}
		return s;
	}
	return ret;
}

function showCoordinate(){
	getBoxCoordinate();
	showBoxCoordinate();
	getSPotCoordinate();
	showSpotCoordinate();
	getLineCoordinate();
	showLineCoordinate();
	getAllTemp();
	showAllTemp();
	getShowAlarm();
}

function splitCoordinate(value){
	var dst = ['','','','',''];
	spitString(dst,value,'#');
	boxMesaStr = dst[0];
	spotMesaStr = dst[1];
	lineMesaStr = dst[2];
	allTemp = dst[3];
	allAlarm = dst[4];
}

//显示温度及坐标
function showTempCoor(){
	showBoxCoordinate();
	showSpotCoordinate();
	showLineCoordinate();
	showAllTemp();
	showAlarm();
}

//解析后端传来的数据，并存储
function analyTempCoor(params){
	var temp_coor = {};
	
	analyParams(params,temp_coor);

	if(temp_coor['answer'] != SESSION_ID_VALID)
		jumpToLogonPage();

	highTemp = temp_coor['a_max'];
	lowTemp = temp_coor['a_min'];

	for(var i=0; i<BOX_NUM; i++){

		if(bit_and(temp_coor['boxFlag'],bit_valid[i]) != 0){
			maxTempValue[i] = temp_coor['b_max'+i];
			minTempValue[i] = temp_coor['b_min'+i];
			averTempValue[i] = temp_coor['b_aver'+i];
			
			spot1LeftCoor[i] = temp_coor['bred_x'+i];
			spot1TopCoor[i] = temp_coor['bred_y'+i];
			spot2LeftCoor[i] = temp_coor['bblue_x'+i];
			spot2TopCoor[i] = temp_coor['bblue_y'+i];
			
			boxAlarmFlag[i] = temp_coor['b_alarm'+i];
		}else
			boxAlarmFlag[i] = -1;                              //no this num box
	}
	
	for(var i=0; i<SPOT_NUM; i++){

		if(bit_and(temp_coor['spotFlag'],bit_valid[i]) != 0){
			
			tempValue[i] = temp_coor['s_aver'+i];
			
			spotAlarmFlag[i] = temp_coor['s_alarm'+i];
		}else
			spotAlarmFlag[i] = -1;                            //no this num spot
	}

	for(var i=0; i<LINE_NUM; i++){
		if(bit_and(temp_coor['lineFlag'],bit_valid[i]) != 0){
			lineMaxValue[i] = temp_coor['l_max'+i];
			lineAverValue[i] = temp_coor['l_aver'+i];
			lineMinValue[i] = temp_coor['l_min'+i];
			
			lineRedLeft[i] = temp_coor['lred_x'+i];
			lineRedTop[i] = temp_coor['lred_y'+i];
			lineBlueLeft[i] = temp_coor['lblue_x'+i];
			lineBlueTop[i] = temp_coor['lblue_y'+i];
			
			lineAlarmFlag[i] = temp_coor['l_alarm'+i];
		}else
			lineAlarmFlag[i] = -1;                            //no this num line
	}

	if(bit_and(temp_coor['mouseFlag'],bit_valid[0]) != 0){
		var mouseDiv = document.getElementById('mouseDiv');
		mouse_tool['temp'] = temp_coor['m_aver'];

		if(mouseDiv){
			//mouseDiv.style.left = mouse_tool['coor_x'] + 'px';
			//mouseDiv.style.top = (mouse_tool['coor_y'] -20) + 'px';
			mouseDiv.innerText = mouse_tool['temp']/10;
		}
	}
	
}

function allTempCoorControl(param,value)
{
	try{
		var url = 'set_param.cgi?&group_tag=hash_param_bridge.htm'/*tpa=http://192.168.100.2:8080/set_param.cgi?&group_tag=hash_param_bridge*/;
		url+='&set_cmd='+param;
		url+='&length='+value.length;
		url+=value;
		url+=getURLSession() + '&' + Math.random();
		//console.log(url);
        $.ajax({
               url: url,
               async: true,//改为yibu方式
               type: "GET",
               timeout:400,
               data: {},
               success: function (result) {
					analyTempCoor(result);
					showTempCoor();
					diffComputation();
					drawCurver();
			   }
        });
	 //location.reload();
	}catch(exception){
	return;
	}
}
//var you=0;

function sendTempCoor(){
	var param,value;
	var boxStr = '', spotStr = '', lineStr = '', mouseStr = '';
	var video = document.getElementById('playPause');

	if(video.name != 'pause')
		return -1;
	
	boxFlag = 0;
	spotFlag = 0;
	lineFlag = 0;

	boxStr = sendBoxCoordinate();
	spotStr = sendSpotCoordinate();
	lineStr = sendLineCoordinate();
	mouseStr = sendMouseCoordinate();
	
	param = 'getAllTempCoor';
	value = boxStr + spotStr + lineStr + mouseStr;
	
	allTempCoorControl(param,value);	//debug 201911
}

function intervalSendCoor(){
	sendTempCoor();
	setTimeout(intervalSendCoor,500);
}

function getpicture()
{
	try{
		var url = 'get_picture.cgi?&get_picture.cgi';
	//	url+='&set_cmd='+get_pictrue.cgi;
	//	url+='&method='+method;
	//	url+='&index='+index;
	//	url+=param;
		url+='&' + new Date().getTime() + Math.random();
		//alert(url);
        $.ajax({
               url: url,
               async: true,//改为异步方式
               type: "GET",
               data: {},
               success: function (result){
			   }
        });
	}catch(exception){
	return;
	}

}

function delpicture()
{
	try{
		var url = 'get_delpicture.cgi?&get_delpicture.cgi';
	//	url+='&set_cmd='+get_pictrue.cgi;
	//	url+='&method='+method;
	//	url+='&index='+index;
	//	url+=param;
		url+='&' + new Date().getTime() + Math.random();
		//alert(url);
        $.ajax({
               url: url,
               async: true,//改为异步方式
               type: "GET",
               data: {},
               success: function (result){
			   }
        });
	}catch(exception){
	return;
	}

}

var imagefps;
var imageError=0;

function refreshImage(rate) {
	
	var blocked = false;
	var image = document.getElementById('imgDiv');
	var video = document.getElementById('playPause');
	
	image.addEventListener('load', function () {
		blocked = false;
	});
	
   	image.addEventListener('error', function () {
	//	image.src = './images/blackScreen.jpg';
		blocked = false;});
	
	imagefps = setInterval(function () {
		if(video.name === 'pause'){
			if(imageError >= 5){
				imageError=0;
				blocked = false;
			}
			if (blocked) {
				imageError++;
				return;
			}
			blocked = true;
			
			getpicture();	//新增加
			image.src = './video/infrared.jpg?' + getTime() + '?' + Math.random();		//debug  201911    video/infrared.jpg
		//	delpicture();	//删除文件建立同步
		}
	}, 150);		//100是10帧
}





//实时显示鼠标位置温度
var mouse_tool = {'mouseFlag':'0','coor_x':'','coor_y':'','temp':''};

function mouse_offsetx(x){
	var ret;
	ret = parseInt(x) + 10;
	return ret;
}

function mouse_offsety(y){
	var ret;
	ret = parseInt(y) + 10;
	return ret;
}

function mouse_originalx(x){
	var ret;
	ret = parseInt(x) - 10;
	return ret;
}

function mouse_originaly(x){
	var ret;
	ret = parseInt(x) - 10;
	return ret;
}


function show_mouse_temp(){
	var tempPlate = document.getElementById('frameHead');

	tempPlate.onmouseover = function(e){
		var mouseDiv = document.createElement('div');
		var tempPlate = document.getElementById('frameHead');

		mouseDiv.id = 'mouseDiv';
		mouseDiv.className = 'mouseDiv';
		tempPlate.appendChild(mouseDiv);		
	}
	
	tempPlate.onmousemove = function(e){
		var mouseDiv = document.getElementById('mouseDiv');
		var dx = e.offsetX + e.target.offsetLeft;
		var dy = e.offsetY + e.target.offsetTop;

		dx = mouse_offsetx(dx);
		dy = mouse_offsety(dy);

		if(mouseDiv){
			mouseDiv.style.left = dx + 'px';
			mouseDiv.style.top = dy + 'px';
			mouseDiv.innerText = mouse_tool['temp']/10;
		}
		//console.log(e.offsetX);
		mouse_tool['mouseFlag'] = '1';
		mouse_tool['coor_x'] = dx;
		mouse_tool['coor_y'] = dy;
	}

	tempPlate.onmouseout = function(e){
		var mouseDiv = document.getElementById('mouseDiv');
		var tempPlate = document.getElementById('frameHead');
		
		if(mouseDiv)
			tempPlate.removeChild(mouseDiv);
	
		mouse_tool['mouseFlag'] = '0';
	}
}

function clear_mouse_temp(){
	var mouseDiv = document.getElementById('mouseDiv');
	var tempPlate = document.getElementById('frameHead');

	if(mouseDiv)
		tempPlate.removeChild(mouseDiv);
	
	mouse_tool['mouseFlag'] = '0';

	tempPlate.onmouseover = null;
	tempPlate.onmousemove = null;
	tempPlate.onmouseout = null;
}

function show_mouse_tool(val){
	if(val == 1)
		show_mouse_temp();
	else
		clear_mouse_temp();
}

$().ready(function(e) {
//	refreshImage(40);
	setTimeout(refreshImage(40),300000);
	setTimeout(intervalSendCoor,3000);
	dragElem();
	show_mouse_temp(1);
});

function camera_control(param,value)
{
	try{
		var url = 'set_param.cgi?&group_tag=set_value.htm'/*tpa=http://192.168.100.2:8080/set_param.cgi?&group_tag=set_value*/;
		url+='&set_cmd='+param;
		url+='&value='+value;
		url+='&' + new Date().getTime() + Math.random();
        $.ajax({
               url: url,
               async: false,//改为同步方式
               type: "GET",
               data: {},
               success: function (result) {}
        });
	 //location.reload();
	}catch(exception){
	return;
	}
}

function checkField(param,check){           //SET SWITCH
	if(check == -1)
		check = 0;
	var status=0;
	if(param=="MovingSensitivity" || param== "ODTLevel" ||param=="colorPlate" ||param=="dataOutType")
		status=check;
	else if(check)
		status=1;
	camera_control(param,status);
}

function init_switch(){
	document.getElementById("extendTemp").checked=extendTemp;
	document.getElementById("colorPlate").value=colorPlate;
	document.getElementById("dataOutType").value=dataOutType;
}

function getOffset(){
	var pageH = document.getElementById('pageHead');
	startOffsetX = pageH.offsetLeft - pageH.offsetWidth/2;
	startOffsetY = pageH.offsetTop;
}

function setBox(leftX,topY,num){
	var active_box = document.createElement("div");
	var boxSpot1 = document.createElement("img");
	var boxSpot2 = document.createElement("img");
	var box_number = document.createElement("div");
	//box
	active_box.id = "active_box";
	active_box.name = 'activeBox' + num;
	active_box.className = "box";
	active_box.style.top = topY + 'px';
	active_box.style.left = leftX + 'px';
	//tip
	box_number.innerText = 'B'+num;
	box_number.className = 'tips';
	//spot img 1
	active_box.appendChild(box_number);
	boxSpot1.src = './images/maxSpot.png';
	boxSpot1.name = 'imgBox1';
	boxSpot1.ondragstart = function(e){e.preventDefault();};
	boxSpot1.id = "activeBox"+num + '1';
	boxSpot1.style.left = leftX + 'px';
	boxSpot1.style.top = topY + 'px';
	boxSpot1.style.width = 30+'px';
	boxSpot1.style.height = 30+'px';
	boxSpot1.style.position = 'absolute';
	//spot img 2
	boxSpot2.src = './images/minSpot.png';
	boxSpot2.name = 'imgBox2';
	boxSpot2.ondragstart = function(e){e.preventDefault();};
	boxSpot2.id = "activeBox"+num + '2';
	leftX = parseInt(leftX)+5;
	boxSpot2.style.left = leftX + 'px';
	topY = parseInt(topY)+5;
	boxSpot2.style.top = topY + 'px';
	boxSpot2.style.width = 30+'px';
	boxSpot2.style.height = 30+'px';
	boxSpot2.style.position = 'absolute';
	//append
	document.getElementById("frameHead").appendChild(boxSpot1);
	document.getElementById("frameHead").appendChild(boxSpot2);
	document.getElementById("frameHead").appendChild(active_box);
	boxDelAll = 1;
	//null
	boxSpot1 = null;
	boxSpot2 = null;
	box_number = null;
	checkAlgorSelect('Box'+num);
	//添加曲线可测温区域
	addCurveArea('box'+num);
}

function setBoxBuckup(e){
	e = e || window.event;
	e.src = './images/rectangle1.png';
	//e.style.backgroundColor = '#F00';
	var thisName = e.name;
	var thisNum = getNumber(e.name);
	var alarmImg=document.getElementById('alarmImgBox'+thisNum);
	document.getElementById("frameHead").onmousedown=function(ev){
		getOffset();
		alarmImg.src='./images/blueAlarm.png';
        startX = ev.pageX - startOffsetX;
        startY = ev.pageY - startOffsetY;
        // 在页面创建 box
		if(boxName[thisNum]){
			setBox(startX,startY,thisNum);
			boxName[thisNum] = false;
		}
    }; 
}

function setBoxInit(leftX,topY,width,height,num){
	var box = document.getElementById('boxButton'+num);
	var alarmImg=document.getElementById('alarmImgBox'+num);
	if(box != null){
		box.src = './images/rectangle1.png';
		//box.style.backgroundColor = '#F00';
		getOffset();
		setBox(leftX,topY,num);
		var boxId = document.getElementById('active_box');
		if(boxId != null){
			boxId.style.width = width + 'px';
			boxId.style.height = height + 'px';
			boxId.removeAttribute('id');
		}
	}
	alarmImg.src='./images/blueAlarm.png';
}

function delBox(e){
	e.src = './images/rectangle.png';
	//e.style.backgroundColor = '#CCC';
	var num;
	var list = document.getElementById("frameHead");
	var list2 = document.getElementById("boxPanel");
	var listLen = list.childNodes.length;
	var maxVal = document.getElementById('maxValue'+getNumber(e.name));
	var minVal = document.getElementById('minValue'+getNumber(e.name));
	var averVal = document.getElementById('averValue'+getNumber(e.name));
	var thisNum = getNumber(e.name);
	var alarmImg=document.getElementById('alarmImgBox'+thisNum);
	boxName[thisNum] = true;
	maxVal.value = '___/___';
	minVal.value = '___/___';
	averVal.value = '___/___';
	//将删除的标记释放
	boxName[getNumber(e.name)] = true;
	for(num=0;num<6;num++){
		
		if(!boxName[num])
			break;
	}
	if(num > 5){
		boxDelAll = 0;
	}
	//删除链接的div，并把按钮也同时删除
	for(var i =1;i<listLen;i++){
		if(list.childNodes[i].name === e.name){
			var spot1 = document.getElementById(list.childNodes[i].name + '1');
			var spot2 = document.getElementById(list.childNodes[i].name + '2');
			list.removeChild(list.childNodes[i]);
			list.removeChild(spot1);
			list.removeChild(spot2);
			break;
		}
	}
	//删除测温区域，同时报警信息清除
	alarmImg.src='./images/alarm.png';
	deleteAlarm(e.id);
	removeAlgorOther(e.id);
	removeCurveArea(e.id);
}

function boxChange(e){
	
	if(e.src.indexOf('rectangle1')>-1){
		delBox(e);
	}else{
		setBoxBuckup(e);
	}
}

function setSpot(leftX,topY,num){
	var spotDiv = document.createElement("div");
	var imgTip = document.createElement('div');
	var spotImg = document.createElement("img");
	//spot属性
	spotImg.src = './images/singleSpot.png';
	spotImg.ondragstart = function(e){e.preventDefault();};
	spotImg.style.left = 0 + 'px';
	spotImg.style.top = spotTopOffset + 'px';
	spotImg.style.cursor = 'move';
	spotImg.className = 'imgType';
	//tip属性		
	imgTip.className = 'tips';
	imgTip.style.backgroundColor = '#f90';
	imgTip.innerText = 'S'+num;
	//div属性
	spotDiv.id = 'spotLabel' + num;
	spotDiv.style.left = leftX + 'px';
	spotDiv.style.top = topY + 'px';
	spotDiv.style.position = "absolute";
	spotDiv.className = 'circle';
	spotDiv.name = 'spot'+num;
	
	spotDiv.appendChild(imgTip);
	spotDiv.appendChild(spotImg);
	document.getElementById("frameHead").appendChild(spotDiv);
	spotDelAll = 1;
	imgTip = null;
	spotImg = null;
	spotDiv = null;
	checkAlgorSelect('Spot'+num);
	//添加curve的可测温区域
	addCurveArea('spot'+num);
}

function setSpotBuckup(e){
	//浏览器兼容处理
	e = e || window.event; 
	e.src = './images/point1.png';
	var thisName = e.name;
	var thisNum = getNumber(e.name);
	var alarmImg=document.getElementById('alarmImgSpot'+thisNum);
	//alert(spotName[thisNum]);
	//创建spot对象
	document.getElementById("frameHead").onmousedown=function(ev){
		alarmImg.src='./images/blueAlarm.png';
		getOffset();
        startX = ev.pageX - startOffsetX - spotImgLeft;
        startY = ev.pageY - startOffsetY - spotImgTop -spotTopOffset;
		//创建spot
		if(spotName[thisNum]){
			//在div新建一个spot
			setSpot(startX,startY,thisNum);
			spotName[thisNum] = false;
		}
	}
}

function setSpotInit(leftX,topY,num){
	var spot = document.getElementById('spotButton'+num);
	var alarmImg=document.getElementById('alarmImgSpot'+num);
	if(spot != null){
		spot.src = './images/point1.png';
		//spot.style.backgroundColor = '#F00';
		setSpot(leftX-spotImgLeft,topY-spotImgTop-10,num);
	}
	alarmImg.src='./images/blueAlarm.png';
}
function delSpot(e){
	e.src = './images/point.png';
	//e.style.backgroundColor = '#CCC';
	var num;
	var thisNum = getNumber(e.name);
	var list = document.getElementById("frameHead");
	var list2 = document.getElementById("spotPanel");
	var listLen = list.childNodes.length;
	var spotVal = document.getElementById('spotValue'+getNumber(e.name));
	var alarmImg=document.getElementById('alarmImgSpot'+thisNum);
	spotName[thisNum] = true;
	for(num=0;num<6;num++){
		if(!spotName[num])
			break;
	}
	if(num>=6){
		spotDelAll = 0;
	}
	spotVal.value = '___/___';
	//将删除的标记释放
	spotName[getNumber(e.name)] = true;
	//删除链接的div，并把按钮也同时删除
	for(var i =1;i<listLen;i++){
		if(list.childNodes[i].name === e.name){
			list.removeChild(list.childNodes[i]);
			break;
		}
	}
	//删除点后，同时将报警信息清除
	alarmImg.src='./images/alarm.png';
	
	removeAlgorOther(e.id);
	removeCurveArea(e.id);
	deleteAlarm(e.id);
}

function spotChange(e){
	if(e.src.indexOf('point1')>-1){
		delSpot(e);
	}else{
		setSpotBuckup(e);
	}
}

function getDeg(dx,dy){
	return 360*Math.atan(dy/dx)/(2*Math.PI);
}
//线标准绘制
function setLine(leftX,topY,Name){
	var list = document.getElementById('frameHead');
	var lineDiv = document.createElement('div');
	var lineSpot1 = document.createElement("img");
	var lineSpot2 = document.createElement("img"); 
	
	lineDiv.id = 'redLine';
	lineDiv.name = Name;
	
	lineDiv.style.left = leftX + 'px';
	lineDiv.style.top = topY + 'px';
	lineDiv.style.cursor = 'move';
	//lineDiv.style.width = 10 + 'px';
	lineDiv.style.border = '1px #FFF solid';
	lineDiv.style.position = 'absolute';
	lineDiv.style.transformOrigin = '0% 0%';

	lineSpot1.src = './images/maxSpot.png';
	lineSpot1.name = 'imgLine1';
	lineSpot1.ondragstart = function(e){e.preventDefault();};
	lineSpot1.id = "lineSpot01";
	lineSpot1.style.left = leftX + 'px';
	lineSpot1.style.top = topY + 'px';
	lineSpot1.style.width = 30+'px';
	lineSpot1.style.height = 30+'px';
	lineSpot1.style.position = 'absolute';
	
	lineSpot2.src = './images/minSpot.png';
	lineSpot2.name = 'imgLine2';
	lineSpot2.ondragstart = function(e){e.preventDefault();};
	lineSpot2.id = "lineSpot02";
	leftX = parseInt(leftX)+5;
	lineSpot2.style.left = parseInt(leftX+5) + 'px';
	topY = parseInt(topY)+5;
	lineSpot2.style.top = topY + 'px';
	lineSpot2.style.width = 30+'px';
	lineSpot2.style.height = 30+'px';
	lineSpot2.style.position = 'absolute';
	lineDelAll = 1;

	list.appendChild(lineSpot1);
	list.appendChild(lineSpot2);
	list.appendChild(lineDiv);
	checkAlgorSelect('Line'+0);
	//添加curve的可测温区域
	addCurveArea('line'+0);
}
//线动态绘制
function setLineBuckup(e){
	e = e || window.event;
	e.src = './images/line1.png'; 
	//e.style.backgroundColor = '#F00';
	var list = document.getElementById('frameHead');
	var alarmImg=document.getElementById('alarmImgLine0');
	list.onmousedown = function(e){
		if(lineName[0]){
			alarmImg.src='./images/blueAlarm.png';
			getOffset();
        	startX = e.pageX - startOffsetX;
        	startY = e.pageY - startOffsetY;
			setLine(startX,startY,'redLine');
			lineName[0] = false;
		}
	}
}
//线初始绘制
function setLineInit(){
	//line的create键反置
	var lineBut = document.getElementById('lineButton0');
	var alarmImg=document.getElementById('alarmImgLine0');
	lineBut.src = './images/line1.png';
	//lineBut.style.backgroundColor = '#F00';
	//创建线
	getOffset();
	//setLine(lineValue[0],lineValue[1],'measureLine');
	setLine(lineStartLeft,lineStartTop,'measureLine');
	//补充线
	var line = document.getElementById('redLine');
	if(line != null){
		//var dx = lineValue[2] - lineValue[0];
		//var dy = lineValue[3] - lineValue[1];
		var dx = lineEndLeft - lineStartLeft;
		var dy = lineEndTop - lineStartTop;
		var degNum = getDeg(dx,dy);
		line.style.width = Math.sqrt(dx*dx + dy*dy) + 'px';
		line.style.transform = 'rotate(' + degNum+ 'deg)';
	}
	alarmImg.src='./images/blueAlarm.png';
}

//删除线
function delLine(e){
	e.src = './images/line.png';
	//e.style.backgroundColor = '#CCC';
	if(!lineName[0]){
		lineName[0] = true;
		var list = document.getElementById('frameHead');
		var line = document.getElementById('redLine');
		var lineMax = document.getElementById('lineMaxValue0');
		var lineMin = document.getElementById('lineMinValue0');
		var lineAver = document.getElementById('lineAverValue0');
		var lineSpot1 = document.getElementById('lineSpot01');
		var lineSpot2 = document.getElementById('lineSpot02');
		var alarmImg=document.getElementById('alarmImgLine0');

		lineMax.value = '___/___';
		lineMin.value = '___/___';
		lineAver.value = '___/___';
		
		list.removeChild(line);
		list.removeChild(lineSpot1);
		list.removeChild(lineSpot2);
		//删除线测温，同时将报警信息清除
		alarmImg.src='./images/alarm.png';
		deleteAlarm(e.id);
		removeAlgorOther('Line0');
		removeCurveArea('line'+0);
		lineDelAll = 0;
	}
}
function lineChange(e){
	if(e.src.indexOf('line1')>-1){
		delLine(e);
	}else{
		setLineBuckup(e);
	}
}
//初始化工具坐标
function initToolCoor(){
	if(typeof tool_coor != 'undefined'){

		for(var i=0; i<BOX_NUM; i++){

			if(bit_and(tool_coor['boxFlag'],bit_valid[i]) != 0){
				
				boxName[i] = false;
				boxStartLeft[i] = tool_coor['b_coorx'+i];
				boxStartTop[i] = tool_coor['b_coory'+i];
				boxStartWidth[i] = tool_coor['b_width'+i];
				boxStartHeight[i] = tool_coor['b_height'+i];
			}
		}
		
		for(var i=0; i<SPOT_NUM; i++){

			if(bit_and(tool_coor['spotFlag'],bit_valid[i]) != 0){
				
				spotName[i] = false;
				spotStartLeft[i] = tool_coor['s_coorx'+i];
				spotStartTop[i] = tool_coor['s_coory'+i];
			}
		}

		for(var i=0; i<LINE_NUM; i++){
			if(bit_and(tool_coor['lineFlag'],bit_valid[i]) != 0){
				
				lineName[0] = false;
				lineStartLeft = tool_coor['l_headx'+i];
				lineStartTop = tool_coor['l_heady'+i];
				lineEndLeft = tool_coor['l_tailx'+i];
				lineEndTop = tool_coor['l_taily'+i];
			}
		}
	}
}

//初始化box,spot,line
function initBoxSpotLine(){
	//获取spot、box、line信息后，对其处理
	//getBoxCoordinate();
	//getSPotCoordinate();
	//getLineCoordinate();
	initToolCoor();
	initFlag = false;
	//判断box
	for(var i=0;i<6;i++){
		if(!boxName[i]){
			//创建box
			setBoxInit(boxStartLeft[i],boxStartTop[i],boxStartWidth[i],boxStartHeight[i],i);
		}
	}
	//判断spot
	for(var i=0;i<6;i++){
		if(!spotName[i]){
			//创建spot
			setSpotInit(spotStartLeft[i],spotStartTop[i],i)
		}
	}
	//判断line
	if(!lineName[0]){
		//创建line
		setLineInit();
	}

}

//全屏时box等比例方大
function boxInScreen(){
	var list= document.getElementById('frameHead');
	var listLen = list.childNodes.length;
	
	for(var i=0; i<6; i++){
		for(var j=0; j<listLen; j++){
			if(list.childNodes[j].name === ('activeBox'+i)){
				var box = list.childNodes[j];
				//保存初始参数
				boxStartLeft[i] = parseInt(box.style.left);
				boxStartTop[i] = parseInt(box.style.top);
				boxStartWidth[i] = parseInt(box.style.width);
				boxStartHeight[i] = parseInt(box.style.height);
				//全屏时box等倍放大
				box.style.left = Math.round(boxStartLeft[i]*widthMul)+'px';
				box.style.top = Math.round(boxStartTop[i]*heightMul)+'px';
				box.style.width = Math.round(boxStartWidth[i]*widthMul)+'px';
				box.style.height = Math.round(boxStartHeight[i]*heightMul)+'px';
			}
		}
	}
}

//全屏时spot等比例移动
function spotInScreen(){
	var list= document.getElementById('frameHead');
	var listLen = list.childNodes.length;
	
	for(var i=0; i<6; i++){
		for(var j=0; j<listLen; j++){
			if(list.childNodes[j].name === ('spot'+i)){
				var spot = list.childNodes[j];
				//保存初始参数
				spotStartLeft[i] = parseInt(spot.style.left);
				spotStartTop[i] = parseInt(spot.style.top);
				//全屏时spot等倍偏移
				spot.style.left = Math.round(spotStartLeft[i]*widthMul)+'px';
				spot.style.top = Math.round(spotStartTop[i]*heightMul)+'px';
			}
		}
	}
}

//
//全屏时line等比例移动
function lineInScreen(){
	var line= document.getElementById('redLine');
	var fullStartLeft,fullStartTop,fullEndLeft,fullEndTop,dx,dy,degNum;
	if(line != null){
		//lineStartLeft = parseInt(line.style.left);
		//lineStartTop = parseInt(line.style.top);
		//lineStartWidth = parseInt(line.style.width);
		//因为全屏时，视频所在区域的高宽并不是等比扩大，直线角度并非原来的角度，所以需要重新计算
		fullStartLeft = lineStartLeft*widthMul;
		fullStartTop = lineStartTop*heightMul;
		fullEndLeft = lineEndLeft*widthMul;
		fullEndTop = lineEndTop*heightMul;
		dx = fullEndLeft-fullStartLeft;
		dy = fullEndTop-fullStartTop;
		degNum = getDeg(dx,dy);
		line.style.left = fullStartLeft+'px';
		line.style.top = fullStartTop+'px';
		line.style.width = Math.sqrt(dx*dx + dy*dy) + 'px';
		line.style.transform = 'rotate(' + degNum+ 'deg)';
		//line.style.left = Math.round(lineStartLeft*widthMul)+'px';
		//line.style.top = Math.round(lineStartTop*heightMul)+'px';
		//line.style.width = Math.round(lineStartWidth*widthMul)+'px';
	}
}

function boxOutScreen(){
	var list= document.getElementById('frameHead');
	var listLen = list.childNodes.length;

	for(var i=0; i<6; i++){
		for(var j=0; j<listLen; j++){
			if(list.childNodes[j].name === ('activeBox'+i)){
				var box = list.childNodes[j];
				//alert(box);
				box.style.left = boxStartLeft[i]+'px';
				box.style.top = boxStartTop[i]+'px';
				box.style.width = boxStartWidth[i]+'px';
				box.style.height = boxStartHeight[i]+'px';
			}
		}
	}
}

function spotOutScreen(){
	var list= document.getElementById('frameHead');
	var listLen = list.childNodes.length;

	for(var i=0; i<6; i++){
		for(var j=0; j<listLen; j++){
			if(list.childNodes[j].name === ('spot'+i)){
				var spot = list.childNodes[j];
				
				spot.style.left = spotStartLeft[i]+'px';
				spot.style.top = spotStartTop[i]+'px';
			}
		}
	}
}

function lineOutScreen(){
	var line= document.getElementById('redLine');
	if(line != null){
		line.style.left = lineStartLeft+'px';
		line.style.top = lineStartTop+'px';
		line.style.width = lineStartWidth + 'px';
		line.style.transform = 'rotate(' + lineStarDeg + 'deg)';
	}
}

function imageScreen(){
	var scrHeight = window.screen.height;
	var scrWidth = window.screen.width;
	var image = document.getElementById('imgDiv');
	var imgDiv = document.getElementById('frameHead');
	console.log('fullScreenFlag='+fullScreenFlag);
	if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.				msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (imgDiv.requestFullScreen) {
            imgDiv.requestFullScreen();
        } else if (imgDiv.mozRequestFullScreen) {
            imgDiv.mozRequestFullScreen();
        } else if (imgDiv.webkitRequestFullScreen) {
            imgDiv.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (imgDiv.msRequestFullscreen) {
            imgDiv.msRequestFullscreen();
        }
		imgDiv.style.width = scrWidth+'px';
		imgDiv.style.height = scrHeight+'px';
		image.style.width = scrWidth+'px';
		image.style.height = scrHeight+'px';
		boxInScreen();
		spotInScreen();
		lineInScreen();
		fullScreenFlag = true;
		
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
		imgDiv.style.width = imageWidth+'px';
		imgDiv.style.height = imageHeight+'px';
		image.style.width = imageWidth+'px';
		image.style.height = imageHeight+'px';
		if(fullScreenFlag){
			boxOutScreen();
			spotOutScreen();
			lineOutScreen();
		}
		fullScreenFlag = false;
    }
}

var escFullScreen = false;
var time1=0,timeFlag1=true,time2=0,timeFlag2=true;
function recordTime(){
	var date = new Date();
	if(timeFlag1){
		timeFlag1 = false;
		timeFlag2 = true;
		time1 = date.getTime();
	}else{
		timeFlag1 = true;
		timeFlag2 = false;
		time2= date.getTime();
	}
	return Math.abs(time1-time2);
}
//延迟ms
function delay(num){
	var date = new Date();
	var st = date.getTime();
	var et = st;
	while((et-st)<num){
		var eDate = new Date();
		et = eDate.getTime();
	}
}

window.onresize = function (){
	var scrHeight = window.screen.height;
	var scrWidth = window.screen.width;
	var image = document.getElementById('imgDiv');
	var imgDiv = document.getElementById('frameHead');
	delay(50);
	if(!checkFull()){
		//要执行的动作
		image.style.width = imageWidth+'px';
		image.style.height = imageHeight+'px';
		imgDiv.style.width = imageWidth+'px';
		imgDiv.style.height = imageHeight+'px';
		if(fullScreenFlag){
			boxOutScreen();
			spotOutScreen();
			lineOutScreen();
			fullScreenFlag = false;
		}
	}else{
		imgDiv.style.width = scrWidth+'px';
		imgDiv.style.height = scrHeight+'px';
		image.style.width = scrWidth+'px';
		image.style.height = scrHeight+'px';
		if(!fullScreenFlag){
			boxInScreen();
			spotInScreen();
			lineInScreen();
			fullScreenFlag = true;
		}
	}
}
//检测是否全屏，分别测试了IE,chrome,firefox
function checkFull(){
    var explorer = window.navigator.userAgent.toLowerCase();
    if(explorer.indexOf('chrome')>0){
        if (window.innerHeight === window.screen.height && document.body.scrollWidth === window.screen.width) {
            return true;
        } else {
            return false;
        }
    }else{
        if (window.outerHeight === window.screen.height && window.outerWidth === window.screen.width) {
            return true;
        } else {
            return false;
        }
    }
}

function changeColorPhoto(value){
	checkField('colorPlate',value);
	initColorphoto(value);
}
function initColorphoto(value){
	var img = document.getElementById('hotImg');
	var color = document.getElementById('colorSelect');
	if(color != null){
		color.value = value;
	}
	if(value == 0){
		img.src = './images/whitehot.bmp';
	}else if(value == 1){
		img.src = './images/blackhot.bmp';
	}else if(value == 2){
		img.src = './images/ironhot.bmp';
	}else if(value == 3){
		img.src = './images/redyellow.bmp';
	}else if(value == 4){
		img.src = './images/bluegreenred.bmp';
	}else if(value == 5){
		img.src = './images/rainbow1.bmp';
	}else if(value == 6){
		img.src = './images/blackred.bmp';
	}else if(value == 7){
		img.src = './images/rainbow2.bmp';
	}
}

function alarmDisplay(e){
	var id;
	var obj;
	var method = analyBoxSpotLine(e.id);
	var lMethod = method.toLocaleLowerCase();
	var index = getNumber(e.id);
	var alarmImg=document.getElementById('alarmImg'+method+index);
	//var key = document.getElementById(lMethod+'Button'+index);
	//initAlarm();
	//if((key.src.indexOf('rectangle1')>-1) || (key.src.indexOf('point1')>-1) || (key.src.indexOf('line1')>-1)){
	if(alarmImg.src.indexOf('Alarm')>-1){
		if(e.id.indexOf('Box')>-1){
			id = 'boxAlarmDiv';
		}else if(e.id.indexOf('Spot')>-1){
			id = 'spotAlarmDiv';
		}else if(e.id.indexOf('Line')>-1){
			id = 'lineAlarmDiv';
		}
		id = id + getNumber(e.id);
		obj = document.getElementById(id);
		hideAlarm();
		if(obj.style.display != 'inline-block'){
			obj.style.display = 'inline-block';
		}
	}else{
		alert(_alarm_submit);
	}
	
}

function numberToBool(num){
	var ret=true;
	if(num === '0' || num===undefined || num===null){
		ret = false;
	}
	return ret;
}

//可以初始化数组构造函数
function InitArray(num,length){
	var array= new Array(length);
	for(var i=0; i<length; i++){
		array[i]=num;
	}
	return array;
}
//alarm初始化变量
var initAlarmData = new InitArray('0',10);
//自定义函数，在此函数中，特将-1也作为false值
function ansysBool(s){
	var ret = true;
	if(s==0 || s=='' || s==undefined || s==NaN || s==-1){
		ret = false;
	}
	return ret;
}

//设置单个报警页面
//value值必须是个数组，或者类数组，暂时未加判断语句
function setSingleAlarm(method,index,value){
	var active = document.getElementById('activeAlarm'+method+index);
	var condition = document.getElementById('condition'+method+index);
	var capture = document.getElementById('capture'+method+index);
	var threshold = document.getElementById('threshold'+method+index);
	var hysteresis = document.getElementById('hysteresis'+method+index);
	var thresholeTime = document.getElementById('thresholeTime'+method+index);
	//var disableCalib = document.getElementById('disableCalib'+method+index);
	var email = document.getElementById('email'+method+index);
	var digital = document.getElementById('digital'+method+index);
	var ftp = document.getElementById('ftp'+method+index);
	
	active.value = getSymbolNumeber(value[0]);
	condition.value = getSymbolNumeber(value[1]);
	capture.value = getSymbolNumeber(value[2]);
	threshold.value = simplify_number(getSymbolNumeber(value[3]));
	hysteresis.value = simplify_number(getSymbolNumeber(value[4]));
	thresholeTime.value = getSymbolNumeber(value[5]);
	//disableCalib.checked = ansysBool(getSymbolNumeber(value[6]));
	email.checked = ansysBool(getSymbolNumeber(value[7]));
	digital.checked = ansysBool(getSymbolNumeber(value[8]));
	ftp.checked = ansysBool(getSymbolNumeber(value[9]));
}

function initAlarm(){
	//var boxAlarm='|n=1,a=1,b=1,c=2,d=33,e=37,f=26,g=0,h=1,i=0,j=1|n=-1,a=1,c=0,c=0,t=0,h=0,t=1|n=-1,a=1,c=0,c=0,t=0,h=0,t=22|n=3,a=1,c=0,c=0,t=0,h=0,t=33|n=4,a=1,c=0,c=0,t=0,s=0,t=44|n=5,a=1,c=0,c=0,t=0,h=0,t=55';
	//var spotAlarm='|num=0,act=1,con=1,cap=2,thr=11,hys=16,ths=216|num=-1,act=1,con=0,cap=0,thr=0,hys=0,ths=0|num=-2,act=1,con=0,cap=0,thr=0,hys=0,ths=0|num=-3,act=1,con=0,cap=0,thr=0,hys=0,ths=0|num=4,act=1,con=0,cap=0,thr=0,hys=0,ths=0|num=5,act=1,con=0,cap=0,thr=0,hys=0,ths=0';
	//var lineAlarm='|num=0,act=1,con=1,cap=1,thr=14,hys=454,ths=2546';
	var methValue=[['','','','','','','','','',''],['','','','','','','','','',''],['','','','','','','','','','']];
	var method=['Box','Spot','Line'];
	if((typeof boxAlarm == 'undefined')||(typeof spotAlarm == 'undefined')||(typeof lineAlarm == 'undefined')){

		for(var i=0; i<3; i++){
			var num=6;
			if(i == 2){
				num = 1;
			}
			for(var j=0; j<num; j++){
				setSingleAlarm(method[i],j,initAlarmData);
			}
		}
	}else{
		spitString(methValue[0],boxAlarm,'|');
		spitString(methValue[1],spotAlarm,'|');
		spitString(methValue[2],lineAlarm,'|');
		for(var i=0;i<3;i++){
			var num=6;
			if(i == 2){
				num = 1;
			}
			for(var index=0;index<num;index++){
				var value=['','','','','','','','','',''];
				var alarmImg=document.getElementById('alarmImg'+method[i]+index);
				spitString(value,methValue[i][index],',');
				if(getSymbolNumeber(value[0])>-1){
					alarmImg.src='./images/yellowAlarm.png';
					setSingleAlarm(method[i],index,value);
				}else{
					setSingleAlarm(method[i],index,initAlarmData);
				}
			}
		}
	}
}

function hideAlarm(){
	for(var i=0;i<6;i++){
		var imgBoxDiv = document.getElementById('boxAlarmDiv'+i);
		var imgSpotDiv = document.getElementById('spotAlarmDiv'+i);
		var imgLineDiv = document.getElementById('lineAlarmDiv'+i);
		if(imgBoxDiv != null){
			if(imgBoxDiv.style.display === 'inline-block'){
				imgBoxDiv.style.display="none";
			}
		}
		if(imgSpotDiv != null){
			if(imgSpotDiv.style.display === 'inline-block'){
				imgSpotDiv.style.display="none";
			}
		}
		if(imgLineDiv != null){
			if(imgLineDiv.style.display === 'inline-block'){
				imgLineDiv.style.display="none";
			}
		}
	}
}

function videoControl(){
	var video = document.getElementById('playPause');
	if(video != null){
		if(video.name === 'play'){
			video.name = 'pause';
			video.title = _stop;
			video.src = './images/pause1.png';
		}else{
			video.name = 'play';
			video.title = _play;
			video.src = './images/play1.png';
		}
	}
}

function sendAlarmParam(cmd,method,index,param)
{
	try{
		var url = 'set_param.cgi?&group_tag=alarm_param.htm'/*tpa=http://192.168.100.2:8080/set_param.cgi?&group_tag=alarm_param*/;
		url+='&set_cmd='+cmd;
		url+='&method='+method;
		url+='&index='+index;
		url+=param;
		url+='&' + new Date().getTime() + Math.random();
		//alert(url);
        $.ajax({
               url: url,
               async: true,//改为异步方式
               type: "GET",
               data: {},
               success: function (result){
			   }
        });
	}catch(exception){
	return;
	}
}

function testEmail(){

}

function testFTP(){

}

function analyBoxSpotLine(id){
	var id0;
	if(id.indexOf('Box')>-1 || id.indexOf('box')>-1){
		id0 = 'Box';
	}else if(id.indexOf('Spot')>-1 || id.indexOf('spot')>-1){
		id0 = 'Spot';
	}else if(id.indexOf('Line')>-1 || id.indexOf('line')>-1){
		id0 = 'Line';
	}
	return id0;
}

function analyActive(id){
	var ret = -1;
	var id0 = analyBoxSpotLine(id);
	var id1 = getNumber(id);
	var obj = document.getElementById('activeAlarm' + id0 + id1);
	if(obj != null){
		ret = obj.value;
	}
	return ret;
}

function bellControl(id,value){
	var id0,id1,id2;
	id0 = analyBoxSpotLine(id);
	id1 = getNumber(id);
	id2 = 'alarmImg' + id0 + id1;
	if(value ==1){
		document.getElementById(id2).src='./images/yellowAlarm.png';
	}else{
		document.getElementById(id2).src='./images/alarm.png';
	}
}

function is_transfinite_alarm(index,param){
	var ret = -1;

	switch(index){
		//报警阈值
			case 0:
			var temp = document.getElementById('tempSectionSelect').value;

			if(temp == 0){
				if(param<-20 || param>160)
					return ret;
			}else{

				if(param<-20 || param>400)
					return ret;
			}
			break;	
		//迟滞温度
		case 1:
			if(param<-20 || param>20)
				return ret;
			break;

		//阈值时间
		case 2:
			if(param<0 || param>10000)
				return ret;
			break;

		default:
			break;
	}
	return 0;
}


//检测报警输入参数
function checkAlarmParam(param){
	var ret = -1, len = arguments.length;
	
	for(var i=0; i<len; i++){
		
		if(checkNonnumeric(arguments[i])<0 || is_transfinite_alarm(i,arguments[i])<0)
			return ret;
	}
	return 0;
}

function alarmControl(id){
	var method = analyBoxSpotLine(id);
	var lMethod = method.toLocaleLowerCase();
	var index = getNumber(id);
	var key = document.getElementById(lMethod+'Button'+index);
	
	//initAlarm();
	
	if((key.src.indexOf('rectangle1')>-1) || (key.src.indexOf('point1')>-1) || (key.src.indexOf('line1')>-1)){
		var cmd,param;
		var img = document.getElementById('alarmImg'+method+index);
		var active = document.getElementById('activeAlarm' + method + index).value;
		var condition = document.getElementById('condition'+method+index).value;
		var capture = document.getElementById('capture'+method+index).value;
		var threshold = significant_number(document.getElementById('threshold'+method+index).value,1);
		var hysteresis = significant_number(document.getElementById('hysteresis'+method+index).value,1);
		var thresholeTime = document.getElementById('thresholeTime'+method+index).value;
		//ftp
		//var disableCalib = document.getElementById('disableCalib'+method+index).checked;
		var email = document.getElementById('email'+method+index).checked;
		var digital = document.getElementById('digital'+method+index).checked;
		var ftp = document.getElementById('ftp'+method+index).checked;
		
		if(email){
			if(guseremail.indexOf('1')<0){
				alert(_confirm+_email);
				return 0;
			}
		}
		
		if(ftp){
			
		}
		if(checkAlarmParam(threshold,hysteresis,thresholeTime)<0){

			alert(_inputerror);
			return 0;
		}

		
		cmd = 'alarmParam';
		param = '&active='+active+'&condition='+condition+'&capture='+capture+'&threshold='+threshold+'&hysteresis='
				+hysteresis+'&thresholeTime='+thresholeTime+'&disableCalib='+'0'+'&email='+Number(email)
				+'&digital='+Number(digital)+'&ftp='+Number(ftp);
		sendAlarmParam(cmd,method,index,param);
		if(analyActive(id) == 1){
			img.src='./images/yellowAlarm.png';
		}else if(analyActive(id) == 0){
			img.src='./images/blueAlarm.png';
		}
	}else{
		alert(_alarm_submit);
	}
}

function deleteAlarm(id){
	var method = analyBoxSpotLine(id);
	var index = getNumber(id);
	var cmd,param;
	cmd = 'alarmParam';
	param = '&active='+0+'&condition='+0+'&capture='+0+'&threshold='+0+'&hysteresis='
			+0+'&thresholeTime='+0+'&disableCalib='+'0'+'&email='+0
			+'&digital='+0+'&ftp='+0;
	setSingleAlarm(method,index,initAlarmData);
	sendAlarmParam(cmd,method,index,param);
}


//box,spot,line分别有1,2,3表示,0表示plate全局
function getMehodNum(method){
	var ret = -1;

	if(method == ''){

		return ret; 
	}
	
	if(method == 'Box' || method == 'box'){

		ret = 1; 
	}else if(method == 'Spot' || method == 'spot'){

		ret = 2;
	}else{

		ret = 3;
	}

	return ret;
}

//检验环境参数输入是否超限
function is_transfinite_envir(index,param){
	var ret = -1;
	
	switch(index){
		//发射率
		case 0:
			if(param<0 || param>1)
				return ret;
			break;
			
		//空气温度
		case 1:
			if(param<-200 || param>10000)
				return ret;
			break;
			
		//反射目标温度
		case 2:
			if(param<-200 || param>10000)
				return ret;
			break;
			
		//大气透过率
		case 3:
			if(param<0 || param>1)
				return ret;
			
			break;
			
		//距离
		case 4:
			if(param<0 || param>50)
				return ret;
			break;
			
		//红外窗口温度
		case 5:
			if(param<-200 || param>10000)
				return ret;
			break;
			
		//红外窗口热辐射量
		case 6:
			if(param<0 || param>100)
				return ret;
			break;
			
		default:
			break;
	}
	return 0;
}

//检验全部环境参数
function checkEnvirParam(param){
	var ret = -1, len = arguments.length;
	
	for(var i=0; i<len; i++){
		
		if(checkNonnumeric(arguments[i])<0 || is_transfinite_envir(i,arguments[i])<0)
			return ret;
	}
	return 0;
}

//环境参数提交
function envirControl(id){
	var cmd,param;
	
	//提取类型名及类型下标
	var method = analyBoxSpotLine(id);
	var index = getNumber(id);
	
	//获取各参数数值
	var reflectivity = significant_number($('#envirRadi'+method+index).val(),3);
	var airTemp = significant_number($('#envirEmis'+method+index).val(),3);
	var targetTemp = significant_number($('#envirRelHum'+method+index).val(),3);
	var atmosTrans = significant_number($('#envirAirTem'+method+index).val(),3);
	var distance = significant_number($('#envirDis'+method+index).val(),3);
	//var infraredTemp = significant_number($('#envirInfTem'+method+index).val(),3);
	//var infraredRadia = significant_number($('#envirInfRad'+method+index).val(),3);
	
	//以类型名和类型下标，区别各环境参数
	if(checkEnvirParam(reflectivity,airTemp,targetTemp,atmosTrans,distance/*,infraredTemp*/)<0){
		alert(_inputerror);
	}else{
		
		cmd = 'envirParam';
		param = '&method=' + getMehodNum(method) + '&index=' + index + '&reflectivity=' + reflectivity + '&airTemp=' + airTemp
			+ '&targetTemp=' + targetTemp + '&atmosTrans=' + atmosTrans + '&distance=' + distance
			+ '&infraredTemp=' + 0;

		sendPlateParam(cmd, param);
	}
}

//隐藏全部环境参数界面
function hideEnvir(){

	for(var i=0; i<6; i++){
		
		$('#envirDivBox'+i).css('display','none');
		$('#envirDivSpot'+i).css('display','none');
	}
	
	$('#envirDivLine0').css('display','none');
}

//确定测温范围后，方能显示环境参数设置界面
function envirDisplay(obj){
	//提取类型和下标号
	var method = analyBoxSpotLine(obj.id);
	var index = getNumber(obj.id);
	//获取报警灯对象
	var alarmImg=document.getElementById('alarmImg'+method+index);
	
	//若报警灯颜色改变，则测温范围建立，可以显示界面，否则，弹框警告
	if(alarmImg.src.indexOf('Alarm')>-1){
		
		hideEnvir();
		$('#envirDiv'+method+index).css('display','inline');

	}else{
		
		alert(_alarm_submit);
		
	}
}

//环境参数初始化
function initEnvirParams(){

	var valid = true;

	if((typeof envirAll == 'undefined')||(typeof envirBox == 'undefined')||(typeof envirSpot == 'undefined')){
		valid = false;
	}
	
	//初始化全局环境参数
	if(valid){
		$('#envirReflectPlate').val(simplify_number(envirAll['reflectivity']));
		$('#envirAirTemPlate').val(simplify_number(envirAll['airTemp']));
		$('#envirTargetTempPlate').val(simplify_number(envirAll['targetTemp']));
		$('#envirAtmosTransPlate').val(simplify_number(envirAll['atmosTrans']));
		$('#envirDisPlate').val(simplify_number(envirAll['distance']));
		$('#envirInfTemPlate').val(simplify_number(envirAll['infraredTemp']));
		//$('#envirInfRadPlate').val(simplify_number(envirAll['infraredRadia']));
	}else{
		$('#envirReflectPlate').val('0.0');
		$('#envirAirTemPlate').val('0.0');
		$('#envirTargetTempPlate').val('0.0');
		$('#envirAtmosTransPlate').val('0.0');
		$('#envirDisPlate').val('0.0');
		$('#envirInfTemPlate').val('0.0');
		//$('#envirInfRadPlate').val('0.0');
	}
	

	//初始化box环境参数
	for(var i=0; i<6; i++){

		if(valid){
			$('#envirRadiBox'+i).val(simplify_number(envirBox[i]['reflectivity']));
			$('#envirEmisBox'+i).val(simplify_number(envirBox[i]['airTemp']));
			$('#envirRelHumBox'+i).val(simplify_number(envirBox[i]['targetTemp']));
			$('#envirAirTemBox'+i).val(simplify_number(envirBox[i]['atmosTrans']));
			$('#envirDisBox'+i).val(simplify_number(envirBox[i]['distance']));
			//$('#envirInfTemBox'+i).val(simplify_number(envirBox[i]['infraredTemp']));
			//$('#envirInfRadBox'+i).val(simplify_number(envirBox[i]['infraredRadia']));
		}else{
			$('#envirRadiBox'+i).val('0.0');
			$('#envirEmisBox'+i).val('0.0');
			$('#envirRelHumBox'+i).val('0.0');
			$('#envirAirTemBox'+i).val('0.0');
			$('#envirDisBox'+i).val('0.0');
			//$('#envirInfTemBox'+i).val('0.0');
			//$('#envirInfRadBox'+i).val(0.0);
		}
	}
	
	//初始化spot环境参数
	for(var j=0; j<6; j++){

		if(valid){
			$('#envirRadiSpot'+j).val(simplify_number(envirSpot[j]['reflectivity']));
			$('#envirEmisSpot'+j).val(simplify_number(envirSpot[j]['airTemp']));
			$('#envirRelHumSpot'+j).val(simplify_number(envirSpot[j]['targetTemp']));
			$('#envirAirTemSpot'+j).val(simplify_number(envirSpot[j]['atmosTrans']));
			$('#envirDisSpot'+j).val(simplify_number(envirSpot[j]['distance']));
			//$('#envirInfTemSpot'+j).val(simplify_number(envirSpot[j]['infraredTemp']));
			//$('#envirInfRadSpot'+j).val(simplify_number(envirSpot[j]['infraredRadia']));
		}else{
			$('#envirRadiSpot'+j).val('0.0');
			$('#envirEmisSpot'+j).val('0.0');
			$('#envirRelHumSpot'+j).val('0.0');
			$('#envirAirTemSpot'+j).val('0.0');
			$('#envirDisSpot'+j).val('0.0');
			//$('#envirInfTemSpot'+j).val('0.0');
			//$('#envirInfRadSpot'+j).val('0.0');
		}
	}

	//初始化line环境参数
	for(var n=0; n<1; n++){

		if(valid){
			$('#envirRadiLine'+n).val(simplify_number(envirLine[n]['reflectivity']));
			$('#envirEmisLine'+n).val(simplify_number(envirLine[n]['airTemp']));
			$('#envirRelHumLine'+n).val(simplify_number(envirLine[n]['targetTemp']));
			$('#envirAirTemLine'+n).val(simplify_number(envirLine[n]['atmosTrans']));
			$('#envirDisLine'+n).val(simplify_number(envirLine[n]['distance']));
			//$('#envirInfTemLine'+n).val(simplify_number(envirLine[n]['infraredTemp']));
			//$('#envirInfRadLine'+n).val(simplify_number(envirLine[n]['infraredRadia']));
		}else{
			$('#envirRadiLine'+n).val('0.0');
			$('#envirEmisLine'+n).val('0.0');
			$('#envirRelHumLine'+n).val('0.0');
			$('#envirAirTemLine'+n).val('0.0');
			$('#envirDisLine'+n).val('0.0');
			//$('#envirInfTemLine'+n).val('0.0');
			//$('#envirInfRadLine'+n).val('0.0');
		}
	}
}

//算法框变量
var tempTool = {
	'0':'Box0','1':'Box1','2':'Box2','3':'Box3','4':'Box4','5':'Box5',
	'6':'Spot0','7':'Spot1','8':'Spot2','9':'Spot3','10':'Spot4','11':'Spot5',
	'12':'Line0',
};
var algorthm = {
	/*save self value*/
	'BOX0':'0','BOX1':'0','BOX2':'0','BOX3':'0','BOX4':'0','BOX5':'0',
	'SPOT0':'0','SPOT1':'0','SPOT2':'0','SPOT3':'0','SPOT4':'0','SPOT5':'0',
	'LINE0':'0',
	'1':'MAX','2':'MIN','2':'AVG',
	/*option value*/
	'algorAreaNum':'14','shutdown':'OFF','allAreaHigh':'ALL-MAX','allAreaLow':'ALL-MIN','autoSet':'AUTOSET',
	
};
	
var toolValue = {
	/*box*/
	'BOX0-MAX':'0','BOX0-MIN':'0','BOX0-AVG':'0','BOX1-MAX':'0','BOX1-MIN':'0','BOX1-AVG':'0',
	'BOX2-MAX':'0','BOX2-MIN':'0','BOX2-AVG':'0','BOX3-MAX':'0','BOX3-MIN':'0','BOX3-AVG':'0',
	'BOX4-MAX':'0','BOX4-MIN':'0','BOX4-AVG':'0','BOX5-MAX':'0','BOX5-MIN':'0','BOX5-AVG':'0',
	/*spot*/
	'SPOT0-AVER':'0','SPOT1-AVG':'0','SPOT2-AVG':'0','SPOT3-AVG':'0','SPOT4-AVG':'0','SPOT5-AVG':'0',
	/*line*/
	'LINE0-MAX':'0','LINE0-MIN':'0','LINE0-AVG':'0',
	/*all area*/
	'ALL-MAX':'0','ALL-MIN':'0',
};
	
var algorAreaFlag = new InitArray(false,algorthm['algorAreaNum']-1);
//daixiashitihuanwenducunchu
function getTemp(){
	
	for(var i=0; i<6; i++){
		
		if(i == 0){
			toolValue['LINE'+i+'-MAX'] = lineMaxValue[i]/10;
			toolValue['LINE'+i+'-MIN'] = lineMinValue[i]/10;
			toolValue['LINE'+i+'-AVG'] = lineAverValue[i]/10;
		}
	
		toolValue['BOX'+i+'-MAX'] = maxTempValue[i]/10;
		toolValue['BOX'+i+'-MIN'] = minTempValue[i]/10;
		toolValue['BOX'+i+'-AVG'] = averTempValue[i]/10;

		toolValue['SPOT'+i+'-AVG'] = tempValue[i]/10;
	}

	toolValue['ALL-MAX'] = highTemp/10;
	toolValue['ALL-MIN'] = lowTemp/10;
}

function getMinuend(index){
	var name = tempTool[index];
	var val = $("#algorSelf"+name+" option:selected").val();;
	var ret = val;

	if(val == algorthm['shutdown']){
		return ret;
	}

	ret = toolValue[val];
	return ret;
}

function getReduction(index){
	var name = tempTool[index];
	var val = $("#algorOther"+name+" option:selected").val();;
	var ret = val;

	if(val == algorthm['shutdown']){
		return ret;
	}

	ret = toolValue[val];
	return ret;
}

function getResult(index){
	var name = tempTool[index];
	var obj = $("#algorAnswer"+name);

	return obj;
}

//算法式
function diffComputation(){
	var minu, redu, result;
	
	getTemp();
	
	for(var i=0; i<algorthm['algorAreaNum']-1; i++){
		if(algorAreaFlag[i]){
			
			minu = getMinuend(i);
			redu = getReduction(i);
			result = getResult(i);
			
			if(minu != algorthm['shutdown'])
				result.val(significant_number((minu-redu)+'',1));
			else
				result.val('');
		}
	}
}

//算法框
function setAlgorithm(obj){
	var method = analyBoxSpotLine(obj.id);
	var index = getNumber(obj.id);
	var other = $('#algorOther'+method+index);
/*
	if(obj.value == algorthm['shutdown'])
		other.val(algorthm['shutdown']);
*/
	diffComputation();
}

//当选择平均值时，调整下拉框选项
function adjustOption(){
	
}

//根据测温工具，添加下拉框选项
function addAlgorOther(id){
	var method = analyBoxSpotLine(id);
	var num = getNumber(id);
	var text = method.toUpperCase()+num;
	var tmp;
	
	if(getOptionValue(text)>-1){
		
		var val = getOptionValue(text);
		algorAreaFlag[val] = true;
	
		//保存selected值,删除option
		for(var i=0; i<algorthm['algorAreaNum']-1; i++){
			if(algorAreaFlag[i]){
				text = getOptionText(i);
				algorthm[text] = $("#algorSelf"+id+" option:selected").val();
				$("#algorOther"+tempTool[i]+" option").remove();
			}
		}
		
		//按顺序添加option
		for(var i=0; i<algorthm['algorAreaNum']-1; i++){
			
			if(algorAreaFlag[i]){
				text = getOptionText(i);
			
				//$("#algorOther"+tempTool[i]).append("<option class='algor' value="+algorthm['shutdown']+">"+'关闭'+"</option>");
				
				for(var j=0; j<algorthm['algorAreaNum']; j++){
					if(j>=(algorthm['algorAreaNum']-1) && algorthm[text]==2)
						break;
					if(algorAreaFlag[j]){
						var tmp = getOptionText(j);
						if(j<6 || j>11){
							$("#algorOther"+tempTool[i]).append("<option class='algor' value="+tmp+'-MAX'+">"+tmp+'-MAX'+"</option>");
							$("#algorOther"+tempTool[i]).append("<option class='algor' value="+tmp+'-MIN'+">"+tmp+'-MIN'+"</option>");
						}
						$("#algorOther"+tempTool[i]).append("<option class='algor' value="+tmp+'-AVG'+">"+tmp+'-AVG'+"</option>");
					}
				}
				
				$("#algorOther"+tempTool[i]).append("<option class='algor' value="+algorthm['allAreaHigh']+">"+_globalmaxval+"</option>");
				$("#algorOther"+tempTool[i]).append("<option class='algor' value="+algorthm['allAreaLow']+">"+_globalminval+"</option>");
				//$("#algorOther"+method+i).append("<option value="+'15'+">"+'自设置温度'+"</option>");
			}
		}
	}
}

//判断算法框下拉选项
function checkAlgorSelect(id){
	var other = $('#algorOther'+id);
	var val = $('#algorSelf'+id).val();
	
	addAlgorOther(id);
}

//删除area的可测量区域
function removeAlgorOther(id){
	var method = analyBoxSpotLine(id);
	var num = getNumber(id);
	var text = method.toUpperCase()+num;

	if(getOptionValue(text)>-1){
		var val = getOptionValue(text);
		algorAreaFlag[val] = false;

		for(var i=0; i<algorthm['algorAreaNum']-1; i++){
			
			if(algorAreaFlag[i]){
				if(val<6 || val>11){
					$("#algorOther"+tempTool[i]+" option[value="+text+'-MAX'+"]").remove();
					$("#algorOther"+tempTool[i]+" option[value="+text+'-MIN'+"]").remove();
				}
				$("#algorOther"+tempTool[i]+" option[value="+text+'-AVG'+"]").remove();
			}
		}
	}
}

//隐藏算法框
function hideAlgorithm(){
	for(var i=0; i<6; i++){
		$('#alogrDivBox'+i).css('display','none');
		$('#alogrDivSpot'+i).css('display','none');
	}
	
	$('#alogrDivLine0').css('display','none');
}

//显示算法框
function algorithmDisplay(obj){

	var method = analyBoxSpotLine(obj.id);
	var index = getNumber(obj.id);
	//获取报警灯对象
	var alarmImg=document.getElementById('alarmImg'+method+index);
	
	//若报警灯颜色改变，则测温范围建立，可以显示界面，否则，弹框警告
	if(alarmImg.src.indexOf('Alarm')>-1){
		
		hideAlgorithm();
		$('#alogrDiv'+method+index).css('display','inline');

	}else{
		
		alert(_alarm_submit);
		
	}

}


function hideBoxSpotLine(){
	var showHide = document.getElementById('showHide');
	var frameList = document.getElementById('frameHead');
	var frameListLen = frameList.childNodes.length;
	var display;
	if(showHide != null){
		if(showHide.name === 'show'){
			showHide.name ='hide';
			display = 'none';
		}else{
			showHide.name ='show';
			display = 'inline';
		}
		for(var i=0; i<frameListLen; i++){
			if(frameList.childNodes[i].name != null){
				if(frameList.childNodes[i].name.indexOf('Box')>-1 || frameList.childNodes[i].name.indexOf('spot')>-1 || frameList.childNodes[i].name.indexOf('Line')>-1){
					frameList.childNodes[i].style.display = display;
				}
			}
		}
	}
}

function getTime(){
	var time;
	var date = new Date();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	var milli = date.getMilliseconds();
	month = month>9?month:'0'+month;
	day = day>9?day:'0'+day;
	hour = hour>9?hour:'0'+hour;
	minute = minute>9?minute:'0'+minute;
	second = second>9?second:'0'+second;
	milli = milli>99?milli:(milli>9?'0'+milli:'00'+milli);
	time = ''+date.getFullYear()+month+day+'_'+hour+minute+second+'_'+milli;
	return time;
}

function hideSaveFlag(){
	var save = document.getElementById('saveFlag');
	if(save != null){
		save.style.display = 'none';
	}
}

function snapshotControl(param,value)
{
	try{
		var url = 'set_param.cgi?&group_tag=temp_coor.htm'/*tpa=http://192.168.100.2:8080/set_param.cgi?&group_tag=temp_coor*/;
		url+='&set_cmd='+param;
		url+='&length='+(value.length+1);
		url+='&value=|'+value;
		url+='&' + new Date().getTime() + Math.random();
		//alert(url);
        $.ajax({
               url: url,
               async: true,//改为异步方式
               type: "GET",
               data: {},
               success: function (result) {
                   hideSaveFlag();
			   }
        });
	}catch(exception){
	return;
	}
}

function snapShot(id){
	var save = document.getElementById('saveFlag');
	var time = getTime();

	if(is_sdcard_exist() < 0){
		alert(_sdcard_nonexist);
		return 0;
	}
	
	if(save != null){
		if(save.style.display != 'inline'){
			save.style.display = 'inline';
			save.innerText = _snapshotSave;
			snapshotControl(id,time);
		}else{
			alert(_shopRecordTip);
		}
	}
}


function iframeResize(){ 
	var pIframe = parent.document.getElementById("main");
	pIframe.height = '100%';
} 

function initIcon(name){
	$('#colorPlateDiv').click(function () {
			$('.iconSlideNav2').slideDown();
            $('.iconSlideInfo').slideDown();
        });
}

function hideIcon(){
	$('.iconSlideInfo').slideUp();
	$('.iconSlideNav2').slideUp();
}

//canvas

function clearCanvas(){
	var drawing = document.getElementById("drawing");
	if(drawing.getContext){
		var context = drawing.getContext("2d");
		drawing.height = drawing.height;
	}
}

var lastX=0,lastY=0;
var currentX=0,currentY=0;
var overrunX=false,overrunY=false;

function drawLine(x,y){
	var draging = document.getElementById('drawing');
	if(draging.getContext){
		var context = draging.getContext('2d');
		
		context.beginPath();
		context.moveTo(lastX,lastY);
		context.lineTo(x,y);
		context.stroke();
		context.closePath();
	}
	lastX = x;
	lastY = y;
}

function getData(){
	if(currentX == 1100){
		currentX=0;
		overrunY=0;
		lastX=0;
		lastY=0;
		clearCanvas();
		overrunX=true;
	}
	if(currentY == 100){
		overrunY=true;
	}
	if(currentX == 0){
		overrunX=false;
	}
	if(currentY == 0){
		overrunY=false;
	}
	if(overrunX){
		currentX--;
		currentX--;
	}else{
		currentX++;
		currentX++;
	}
	if(overrunY){
		currentY--;
		currentY--;
	}else{
		currentY++;
		currentY++;
	}
}

//判断是整数
function isInterage(obj){
	return typeof obj === 'number' && obj%1 === 0;
}
//获取原点y轴位置
function getOriginY(){
	var ret=0,temp=0;
	if(tempRangeDown>=0){
		//160+20
		ret = 180;
	}else{
		temp = tempRangeUp-tempRangeDown;
		ret = Math.round(tempRangeUp/temp*160)+20;
	}
	return ret;
}
//获取原点x轴位置
function getOriginX(){
	var ret=0;
	var width = document.getElementById('drawing').width;
	ret = width-curveLength;
	return ret;
}
//迁移原点
function drawOrigin(x,y){
	var drawing = document.getElementById('drawing');
	if(drawing.getContext){
		var context = drawing.getContext('2d');
		context.beginPath();
		context.translate(x,y);
		context.closePath();
	}
}

function drawDate(symbol){
	var date = new Date();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	hour = hour>9?hour:'0'+hour;
	minute = minute>9?minute:'0'+minute;
	second = second>9?second:'0'+second;
	var ret = hour+symbol+minute+symbol+second;
	return ret;
}

//绘制canvas背景坐标轴
function drawCanvasBack(){
	var drawing = document.getElementById('drawing');
	var unit = (tempRangeUp-tempRangeDown)/8;
	var upNum = parseInt(tempRangeUp/unit);
	var downNum = parseInt(tempRangeDown/unit);
	if(drawing.getContext){
		var context = drawing.getContext('2d');
		context.beginPath();
		//context.lineWidth = 2;
		//x,y坐标轴
		context.strokeStyle = "black";
		context.lineWidth = 3;
		context.moveTo(0,0);
		context.lineTo(0,-getOriginY());
		context.moveTo(0,0);
		context.lineTo(0,200-getOriginY());
		context.moveTo(0,0);
		context.lineTo(curveLength,0);
		context.stroke();
		context.closePath();
		context.beginPath();
		//x轴和y轴的标尺
		context.lineWidth = 1;
		context.font = "10px Arial";
		context.textAlign = "end";
		context.textBaseline = "middle";
		for(var i=upNum;i>=downNum;i--){
			if(tempRangeDown<=0){
				context.moveTo(0,-(20*i));
				context.lineTo(curveLength,-(20*i));
				context.fillText(unit*i,(-2),-(20*i));
			}else{
				context.moveTo(0,-(20*(i-downNum)));
				context.lineTo(curveLength,-(20*(i-downNum)));
				context.fillText(unit*i,(-2),-(20*(i-downNum)));
			}
		}
		context.stroke();
		context.closePath();
	}
}
var corrX = new Array(5);
var dateX = new Array(5);
function drawCoorX(x){
	var drawing = document.getElementById('drawing');
	var date = drawDate(':');
	if(drawing.getContext){
		var context = drawing.getContext('2d');
		var width = Math.round(curveLength/5);
		if(x==0 || x ==(width-1) || x == (width*2-1) || x == (width*3-1) || x == (width*4-1)){
			context.beginPath();
			context.strokeStyle = "black";
			context.font = "10px Arial";
			context.textAlign = "start";
			context.textBaseline = "middle";
			context.moveTo(x,200-getOriginY());
			context.lineTo(x,-getOriginY());
			context.fillText(date,x,190-getOriginY());
			context.stroke();
			context.closePath();
			corrX[Math.round((x+1)/width)]=x;
			dateX[Math.round((x+1)/width)]=date;
		}
	}
}

function drawAllCoorX(){
	var drawing = document.getElementById('drawing');
	if(drawing.getContext){
		var context = drawing.getContext('2d');
		context.beginPath();
		context.strokeStyle = "black";
		context.font = "10px Arial";
		context.textAlign = "start";
		context.textBaseline = "middle";
		for(var i=0; i<5; i++){
			if(curveTimeIndex>=curveLength){
				corrX[i]--;
			}
			if((corrX[i]<0) && (curveTimeIndex>=curveLength)){
				var date = drawDate(':');
				corrX[i] = curveLength-1;
				dateX[i] = date;
				//alert(dateX[i])
			}
			context.moveTo(corrX[i],200-getOriginY());
			context.lineTo(corrX[i],-getOriginY());
			context.fillText(dateX[i],corrX[i],190-getOriginY());
		}
		context.stroke();
		context.closePath();
	}
}

//x是x上的坐标，curveTimeIndex，y是y上的坐标,curveAllIndex
function drawMaxLine(x,y){
	var drawing = document.getElementById('drawing');
	var coory1=0,coory2=0;
	if(tempRangeDown<=0){
		coory1 = -maxCurve[y-1]*getCoorYMul();
		coory2 = -maxCurve[y]*getCoorYMul();
	}else{
		coory1 = (tempRangeDown-maxCurve[y-1])*getCoorYMul();
		coory2 = (tempRangeDown-maxCurve[y])*getCoorYMul();
	}
	if(drawing.getContext){
		var context = drawing.getContext('2d');

		context.beginPath();
		context.strokeStyle = "red";
		
		if(y == 0 || y==undefined){
			context.moveTo(x,0);
		}else{
			context.moveTo(x,coory1);
		}
		context.lineTo(x+1,coory2);
		
		//alert(x);
		context.stroke();
		context.closePath();
	}
}

function drawAverLine(x,y){
	var drawing = document.getElementById('drawing');
	var coory1=0,coory2=0;
	if(tempRangeDown<=0){
		coory1 = -averCurve[y-1]*getCoorYMul();
		coory2 = -averCurve[y]*getCoorYMul();
	}else{
		coory1 = (tempRangeDown-averCurve[y-1])*getCoorYMul();
		coory2 = (tempRangeDown-averCurve[y])*getCoorYMul();
	}
	if(drawing.getContext){
		var context = drawing.getContext('2d');
		context.beginPath();
		context.strokeStyle = "green";
		
		if(y == 0 || y==undefined){
			context.moveTo(x,0);
		}else{
			context.moveTo(x,coory1);
		}
		context.lineTo(x+1,coory2);
		
		//alert(x);
		context.stroke();
		context.closePath();
	}
}


function drawMinLine(x,y){
	var drawing = document.getElementById('drawing');
	var coory1=0,coory2=0;
	if(tempRangeDown<=0){
		coory1 = -minCurve[y-1]*getCoorYMul();
		coory2 = -minCurve[y]*getCoorYMul();
	}else{
		coory1 = (tempRangeDown-minCurve[y-1])*getCoorYMul();
		coory2 = (tempRangeDown-minCurve[y])*getCoorYMul();
	}
	if(drawing.getContext){
		var context = drawing.getContext('2d');

		context.beginPath();
		context.strokeStyle = "blue";
		if(y == 0 || y==undefined){
			context.moveTo(x,0);
		}else{
			context.moveTo(x,coory1);
		}
		context.lineTo(x+1,coory2);

		context.stroke();
		context.closePath();
	}
}
//求一个像素与数值的映射
function getCoorYMul(){
	var ret=160/(tempRangeUp-tempRangeDown);
	return ret;
}

function drawAllMaxLine(x,y){
	var num,coory1=0,coory2=0;
	var drawing = document.getElementById('drawing');

	if(drawing.getContext){
		var context = drawing.getContext('2d');
		context.beginPath();
		context.strokeStyle = "red";
		for(num=x-1;num>1;num--,y--){
			if(y-1<0){
				y = x;
			}
			if(tempRangeDown<=0){
				coory1 = -maxCurve[y-1]*getCoorYMul();
				coory2 = -maxCurve[y]*getCoorYMul();
			}else{
				coory1 = (tempRangeDown-maxCurve[y-1])*getCoorYMul();
				coory2 = (tempRangeDown-maxCurve[y])*getCoorYMul();
			}
			context.moveTo(num,coory2);
			context.lineTo(num-1,coory1);
			//alert('coory1='+coory1+'coory2='+coory2);
		}
		context.stroke();
		context.closePath();
		//alert(num);
	}
}

function drawAllAverLine(x,y){
	var num,coory1=0,coory2=0;
	var drawing = document.getElementById('drawing');
	if(drawing.getContext){
		var context = drawing.getContext('2d');
		context.beginPath();
		context.strokeStyle = "green";
		
		for(num=x-1;num>1;num--,y--){
			if(y-1<0){
				y = x;
			}
			if(tempRangeDown<=0){
				coory1 = -averCurve[y-1]*getCoorYMul();
				coory2 = -averCurve[y]*getCoorYMul();
			}else{
				coory1 = (tempRangeDown-averCurve[y-1])*getCoorYMul();
				coory2 = (tempRangeDown-averCurve[y])*getCoorYMul();
			}
			context.moveTo(num,coory2);
			context.lineTo(num-1,coory1);
		}

		context.stroke();
		context.closePath();
	}
}


function drawAllMinLine(x,y){
	var num,coory1=0,coory2=0;
	var drawing = document.getElementById('drawing');
	if(drawing.getContext){
		var context = drawing.getContext('2d');
		context.beginPath();
		context.strokeStyle = "blue";
		
		for(num=x-1;num>1;num--,y--){
			if(y-1<0){
				y = x;
			}
			if(tempRangeDown<=0){
				coory1 = -minCurve[y-1]*getCoorYMul();
				coory2 = -minCurve[y]*getCoorYMul();
			}else{
				coory1 = (tempRangeDown-minCurve[y-1])*getCoorYMul();
				coory2 = (tempRangeDown-minCurve[y])*getCoorYMul();
			}
			context.moveTo(num,coory2);
			context.lineTo(num-1,coory1);
		}

		context.stroke();
		context.closePath();
	}
}

function showCurveData(){
	var active0 = document.getElementById('activeCurve0').value;
	var active1 = document.getElementById('activeCurve1').value;
	var active2 = document.getElementById('activeCurve2').value;
	if(active0 == 1){
		var value0 = document.getElementById('valueCurve0').value;
		var area0 = document.getElementById('areaCurve0').value;
		getCurve1Data(maxCurve,curveDataIndex0,value0,area0);
	}
	if(active1 == 1){
		var value1 = document.getElementById('valueCurve1').value;
		var area1 = document.getElementById('areaCurve1').value;
		getCurve1Data(averCurve,curveDataIndex1,value1,area1);
	}
	if(active2 == 1){
		var value2 = document.getElementById('valueCurve2').value;
		var area2 = document.getElementById('areaCurve2').value;
		getCurve1Data(minCurve,curveDataIndex2,value2,area2);
	}
	
}

function getCurve1Data(curve,index,value,area){
	var num = area%6;
	if(value == 0){
		//表示测最高温度
		if((area>=0)&&(area<6)){
			curve[index] = maxTempValue[num]/10;
		}else if(area == 12){
			//curve[index] = lineValue[0]/10;
			curve[index] = lineMaxValue[0]/10;
		}else if(area == 13){
			curve[index] = highTemp/10;
		}
	}else if(value == 1){
		//表示测平均温度
		if((area>=0)&&(area<6)){
			curve[index] = averTempValue[num]/10;
		}else if((area>=6)&&(area<12)){
			curve[index] = tempValue[num]/10;
		}else if(area == 12){
			//curve[index] = lineValue[3]/10;
			curve[index] = lineAverValue[0]/10;
		}
	}else if(value == 2){
		//表示测最低温度
		if((area>=0)&&(area<6)){
			curve[index] = minTempValue[num]/10;
		}else if(area == 12){
			//curve[index] = lineValue[6]/10;
			curve[index] = lineMinValue[0]/10;
		}else if(area == 13){
			curve[index] = lowTemp/10;
		}
	}
}

function realLine(){
	var active0 = document.getElementById('activeCurve0').value;
	var active1 = document.getElementById('activeCurve1').value;
	var active2 = document.getElementById('activeCurve2').value;
	//若有曲线激活，则开始绘制背景
	if(active0==1 || active1==1 || active2==1){
		if(curveTimeIndex>=curveLength){
			clearCanvas();
			drawOrigin(getOriginX(),getOriginY());
			drawCanvasBack();
			drawAllCoorX();
		}else{
			drawCoorX(curveTimeIndex);
			curveTimeIndex++;
		}
	}
	if(active0==1){
		if(curveTimeIndex>=curveLength){
			drawAllMaxLine(curveTimeIndex0,curveDataIndex0);
		}else{
			drawMaxLine(curveTimeIndex0,curveDataIndex0);
		}
		if(curveTimeIndex0<curveLength){
			curveTimeIndex0++;
		}
		curveDataIndex0++;
		if(curveDataIndex0>=curveLength){
			curveDataIndex0 = 0;
		}
	}
	if(active1==1){
		if(curveTimeIndex>=curveLength){
			drawAllAverLine(curveTimeIndex1,curveDataIndex1);
		}else{
			drawAverLine(curveTimeIndex1,curveDataIndex1);
		}
		if(curveTimeIndex1<curveLength){
			curveTimeIndex1++;
		}
		curveDataIndex1++;
		if(curveDataIndex1>=curveLength){
			curveDataIndex1 = 0;
		}
	}
	if(active2==1){
		if(curveTimeIndex>=curveLength){
			drawAllMinLine(curveTimeIndex2,curveDataIndex2);
		}else{
			drawMinLine(curveTimeIndex2,curveDataIndex2);
		}
		if(curveTimeIndex2<curveLength){
			curveTimeIndex2++;
		}
		curveDataIndex2++;
		if(curveDataIndex2>=curveLength){
			curveDataIndex2 = 0;
		}
	}
}
//可选曲线坐标周期
function drawCurver(){
	if(peiodNum >= samplingPeriod){
		peiodNum=1;
		showCurveData();
		realLine();
	}
	peiodNum++;
}

//自测试随机数
function setCurveDateBack(){
	var active0 = document.getElementById('activeCurve0').value;
	var active1 = document.getElementById('activeCurve1').value;
	var active2 = document.getElementById('activeCurve2').value;
	var value0 = document.getElementById('valueCurve0').value;
	var area0 = document.getElementById('areaCurve0').value;
	if(active0){
		getCurve1Data(maxCurve,curveDataIndex0,value0,area0);
	}
	maxCurve[curveDataIndex0] = (20+5*Math.random());
	averCurve[curveDataIndex1] = (15+5*Math.random());
	minCurve[curveDataIndex2] = (10*Math.random());
}
//自测试曲线
function realLineBack(){
	var active0 = document.getElementById('activeCurve0').value;
	var active1 = document.getElementById('activeCurve1').value;
	var active2 = document.getElementById('activeCurve2').value;
	//setCurveDateBack();
	if(active0==1 || active1==1 || active2==1){
		if(curveTimeIndex>=curveLength){
			clearCanvas();
			drawOrigin(getOriginX(),getOriginY());
			drawCanvasBack();
			drawAllCoorX();
		}else{
			drawCoorX(curveTimeIndex);
			curveTimeIndex++;
		}
	
	}
	if(active0==1){
		if(curveTimeIndex>=curveLength){
			drawAllMaxLine(curveTimeIndex0,curveDataIndex0);
		}else{
			drawMaxLine(curveTimeIndex0,curveDataIndex0);
		}
		if(curveTimeIndex0<curveLength){
			curveTimeIndex0++;
		}
		curveDataIndex0++;
		if(curveDataIndex0>=curveLength){
			curveDataIndex0 = 0;
		}
	}
	if(active1==1){
		if(curveTimeIndex>=curveLength){
			drawAllAverLine(curveTimeIndex1,curveDataIndex1);
		}else{
			drawAverLine(curveTimeIndex1,curveDataIndex1);
		}
		if(curveTimeIndex1<curveLength){
			curveTimeIndex1++;
		}
		curveDataIndex1++;
		if(curveDataIndex1>=curveLength){
			curveDataIndex1 = 0;
		}
	}
	if(active2==1){
		if(curveTimeIndex>=curveLength){
			drawAllMinLine(curveTimeIndex2,curveDataIndex2);
		}else{
			drawMinLine(curveTimeIndex2,curveDataIndex2);
		}
		if(curveTimeIndex2<curveLength){
			curveTimeIndex2++;
		}
		curveDataIndex2++;
		if(curveDataIndex2>=curveLength){
			curveDataIndex2 = 0;
		}
	}
	//setTimeout(realLineBack,10);
}
//可调节采样周期
function drawCurverBuck(){
	if(peiodNum >= samplingPeriod){
		peiodNum=1;
		setCurveDateBack();
		realLineBack();
	}
	peiodNum++;
	setTimeout(drawCurverBuck,10);
}
function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera";
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
    if (userAgent.indexOf("Trident") > -1) {
        return "Edge";
    } //判断是否Edge浏览器
}

function SaveAsImageIE(imgURL){
	var drawing = document.getElementById('drawing');
	if (drawing.msToBlob) {
		var blob = drawing.msToBlob();
		window.navigator.msSaveBlob(blob,'canvas.png'/*tpa=http://192.168.100.2:8080/canvas.png*/);
	} 
}


function download() {
	var drawing = document.getElementById('drawing');
	var src = drawing.toDataURL();
    if (myBrowser()==="IE"||myBrowser()==="Edge"){
        SaveAsImageIE(src);
    }else{
		saveCanvasToImage(src);
	}
}

function saveCanvasToImage(src){
	var a = document.getElementById('aDownCanvas');
	a.href = src;
}

function clearCurveIndex(num){
	var max;
	var param = (num==0)?(curveTimeIndex0=0):((num==1)?(curveTimeIndex1=0):((num==2)?(curveTimeIndex2=0):undefined));
	max = curveTimeIndex0;
	if(curveTimeIndex<curveLength){
		if(max<curveTimeIndex1){
			max = curveTimeIndex1;
		}
		if(max<curveTimeIndex2){
			max = curveTimeIndex2;
		}
		curveTimeIndex = max;
	}
	//alert('index0='+curveTimeIndex0+';index1='+curveTimeIndex1+';index2='+curveTimeIndex2+'index='+curveTimeIndex);
	return param;
}

function clearAllCurve(){
	curveTimeIndex=0;
	curveTimeIndex0=0;
	curveTimeIndex1=0;
	curveTimeIndex2=0;
	curveDataIndex0=0;
	curveDataIndex1=0;
	curveDataIndex2=0;
	for(var i=0;i <5; i++){
		corrX[i] = 0;
		dateX[i] = '';
	}
}

function clearCurveData(num){
	for(var i=0; i<curveLength; i++){
		if(num == 0){
			maxCurve[i]=0;
		}else if(num == 1){
			averCurve[i]=0;
		}else if(num == 2){
			minCurve[i]=0;
		}
	}
}

function setCurveData(num){
	return (num==0)?(curveDataIndex0=0,clearCurveData(0)):((num==1)?(curveDataIndex1=0,clearCurveData(1)):((num==2)?(curveDataIndex2=0,clearCurveData(2)):undefined));
}

function setCurveIndex(num){
	return (num ==0)?(curveTimeIndex0=curveTimeIndex):((num == 1)?(curveTimeIndex1=curveTimeIndex):(num==2)?(curveTimeIndex2=curveTimeIndex):undefined);
}

//曲线激活时，以前残留痕迹清除，其他曲线保存，若此前已无曲线，则连坐标及日期一起清除
//为保证时间一直，刚激活的曲线下标要求与最大下标，即代表当前时间的下标保持一直,curveTimeIndex
function clearCurve(num){
	if(curveTimeIndex0==0 && curveTimeIndex1==0 && curveTimeIndex2==0){
		clearAllCurve();
	}
	clearCanvas();
	drawOrigin(getOriginX(),getOriginY());
	drawCanvasBack();
	drawAllCoorX();
	//清除以前曲线残留
	setCurveData(num);
	setCurveIndex(num);
	//alert('index0='+curveDataIndex0+';index1='+curveDataIndex1+';index2='+curveDataIndex2+'index='+curveTimeIndex);
	if(curveTimeIndex0 != 0){
		drawAllMaxLine(curveTimeIndex0,curveDataIndex0-1);
	}
	if(curveTimeIndex1 != 0){
		drawAllAverLine(curveTimeIndex1,curveDataIndex1-1);
	}
	if(curveTimeIndex2 != 0){
		drawAllMinLine(curveTimeIndex2,curveDataIndex2-1);
	}
}
//激活曲线
function activeCurve(obj){
	var num = getNumber(obj.id);
	if(obj.value == 0){
		clearCurveIndex(num);
	}if(obj.value == 1){
		clearCurve(num);
	}
}
//根据option的text获取value
function getOptionValue(text){
	var ret = -1;
	
	switch(text){
		case 'BOX0':
			ret = BOX0;
			break;
		
		case 'BOX1':
			ret = BOX1;
			break;
		
		case 'BOX2':
			ret = BOX2;
			break;
		
		case 'BOX3':
			ret = BOX3;
			break;
		
		case 'BOX4':
			ret = BOX4;
			break;
		
		case 'BOX5':
			ret = BOX5;
			break;
		case 'SPOT0':
			ret = SPOT0;
			break;
		
		case 'SPOT1':
			ret = SPOT1;
			break;
		
		case 'SPOT2':
			ret = SPOT2;
			break;
		
		case 'SPOT3':
			ret = SPOT3;
			break;
		
		case 'SPOT4':
			ret = SPOT4;
			break;
		
		case 'SPOT5':
			ret = SPOT5;
			break;
		
		case 'LINE0':
			ret = LINE0;
			break;
	}
	
	return ret;
}
//根据option的value获取text
function getOptionText(num){
	var ret = '';
	switch(num){
		case 0:
			ret = 'BOX0';
			break;
		case 1:
			ret = 'BOX1';
			break;
		case 2:
			ret = 'BOX2';
			break;
		case 3:
			ret = 'BOX3';
			break;
		case 4:
			ret = 'BOX4';
			break;
		case 5:
			ret = 'BOX5';
			break;
		case 6:
			ret = 'SPOT0';
			break;
		case 7:
			ret = 'SPOT1';
			break;
		case 8:
			ret = 'SPOT2';
			break;
		case 9:
			ret = 'SPOT3';
			break;
		case 10:
			ret = 'SPOT4';
			break;
		case 11:
			ret = 'SPOT5';
			break;
		case 12:
			ret = 'LINE0';
			break;
		case 13:
			ret = _global;
			break;
	}
	return ret;
}
//标记可测温区域
var curveAreaNum = 14;
var curveAreaFlag = new InitArray(false,curveAreaNum-1);
//全局测温永远可测
curveAreaFlag[13] = true;
//添加area的可测量区域
function addCurveArea(id){
	var method = analyBoxSpotLine(id);
	var num = getNumber(id);
	var text = method.toUpperCase()+num;
	if(getOptionValue(text)>-1){
		var val = getOptionValue(text);
		curveAreaFlag[val] = true;
		//保存selected值
		var selval0=$("#areaCurve0 option:selected").val();
		var selval1=$("#areaCurve1 option:selected").val();
		var selval2=$("#areaCurve2 option:selected").val();
		//先把所有option删除
		$("#areaCurve0 option").remove();
		$("#areaCurve1 option").remove();
		$("#areaCurve2 option").remove();
		//按顺序添加option
		for(var i=0;i<curveAreaNum;i++){
			if(curveAreaFlag[i] === true){
				text = getOptionText(i);
				$("#areaCurve0").append("<option value="+i+">"+text+"</option>");
				$("#areaCurve1").append("<option value="+i+">"+text+"</option>");
				$("#areaCurve2").append("<option value="+i+">"+text+"</option>");
			}
		}
		//selected值保持不变
		$("#areaCurve0 option[value="+selval0+"]").attr('selected','selected');
		$("#areaCurve1 option[value="+selval1+"]").attr('selected','selected');
		$("#areaCurve2 option[value="+selval2+"]").attr('selected','selected');
	}
}
//删除area的可测量区域
function removeCurveArea(id){
	var method = analyBoxSpotLine(id);
	var num = getNumber(id);
	var text = method.toUpperCase()+num;


	for(var i=0; i<3; i++){
		var val = $("#areaCurve"+i).val();
		if(val == getOptionValue(text)){
			$("#valueCurve"+i).val(0);
			$("#valueCurve"+i).removeAttr('disabled');
			$("#valueCurve"+num+" option[value=0]").removeAttr("disabled");
			$("#valueCurve"+num+" option[value=1]").removeAttr("disabled");
			$("#valueCurve"+num+" option[value=2]").removeAttr('disabled');
		}	
	}
	
	if(getOptionValue(text)>-1){
		var val = getOptionValue(text);
		curveAreaFlag[val] = false;
		$("#areaCurve0 option[value="+val+"]").remove();
		$("#areaCurve1 option[value="+val+"]").remove();
		$("#areaCurve2 option[value="+val+"]").remove();
	}

	for(var i=0; i<3; i++){
		var val = $("#areaCurve"+i).val();
		
		if(val > LINE0){
			$("#valueCurve"+i+" option[value=1]").attr("disabled","disabled");
		}
		
		if(val <= SPOT5 && val >= SPOT0){
			
			$("#valueCurve"+i+" option[value=1]").attr('selected','selected');
			$("#valueCurve"+i).attr('disabled','disabled');
		}
		
	}
}
//当测量点温度时，采样值只能选择平均值，其他值禁止
function curveCheckValue(obj){
	var num = getNumber(obj.id);
	var value = document.getElementById('valueCurve'+num);
	value.value = 0;
	if((obj.value==SPOT0)||(obj.value==SPOT1)||(obj.value==SPOT2)||(obj.value==SPOT3)||(obj.value==SPOT4)||(obj.value==SPOT5)){
		value.value = 1;
		value.setAttribute('disabled','disabled');
	}else if(obj.value == 13){
		value.removeAttribute('disabled');
		$("#valueCurve"+num+" option[value=0]").removeAttr("disabled");
		$("#valueCurve"+num+" option[value=1]").removeAttr("disabled");
		$("#valueCurve"+num+" option[value=2]").removeAttr('disabled');
		$("#valueCurve"+num+" option[value=1]").attr("disabled","disabled");
	}else{
		value.removeAttribute('disabled');
		$("#valueCurve"+num+" option[value=0]").removeAttr("disabled");
		$("#valueCurve"+num+" option[value=1]").removeAttr("disabled");
		$("#valueCurve"+num+" option[value=2]").removeAttr('disabled');
	}
}
//显示或隐藏测温曲线
function optionWaveform(){
	
	var image = document.getElementById('waveform');
	var plate = document.getElementById('curveDiv');
	var mp=document.getElementById('curverMeasurePanel');
	var me=document.getElementById('curveMeasureSet');
	var sp=document.getElementById('curversettingsPanel');
	var se=document.getElementById('curveSettingsSet');
	if(image.name === 'show'){
		image.name = 'hide';
		plate.style.display = 'inline';
	}else{
		image.name = 'show';
		plate.style.display = 'none';
	}
	if(!mp.classList.contains('curverShow')){
		mp.classList.remove('curverHide');
		se.classList.remove('curveSetFocus');
		mp.classList.add('curverShow');
		me.classList.add('curveSetFocus');
		sp.classList.remove('curverShow');
		sp.classList.add('curverHide');
	}
	
}
//控制曲线面板当前页
function curvePageControl(e){
	var me=document.getElementById('curveMeasureSet');
	var mp=document.getElementById('curverMeasurePanel');
	var se=document.getElementById('curveSettingsSet');
	var sp=document.getElementById('curversettingsPanel');
	me.classList.remove('curveSetFocus');
	se.classList.remove('curveSetFocus');
	e.classList.add('curveSetFocus');
	if(me.classList.contains('curveSetFocus')){
		mp.classList.remove('curverHide');
		mp.classList.add('curverShow');
	}else{
		mp.classList.remove('curverShow');
		mp.classList.add('curverHide');
	}
	if(se.classList.contains('curveSetFocus')){
		sp.classList.remove('curverHide');
		sp.classList.add('curverShow');
	}else{
		sp.classList.remove('curverShow');
		sp.classList.add('curverHide');
	}
}
//
function setSamplingPeriod(val){
	//500ms一次采样，一个像素点一次采样，则总共710个像素点，时长355s，约6分钟。
	if(val == 0){
		//5分钟选项，实际时长约6分钟
		samplingPeriod=1;
	}else if(val == 1){
		//1小时
		samplingPeriod=8;
	}else if(val == 2){
		//1天
		samplingPeriod=96;
	}else if(val == 3){
		//3天
		samplingPeriod=288;
	}
}
//大5入10，小5减1
function decValue(val){
	var dec=Math.round(val/10);
	return dec*10;
}
//检测温度范围输入是否合法
function isRight(upper,lower){
	var unit = (upper-lower)/8;
	if(isInterage(lower/unit)&&isInterage(upper/unit)){
		return 0;
	}
	return -1;
}

//检校温度范围值
function checkTempRange(valUp,valDown){
	var ret=-1;
	if(valUp>140||valUp<0){
		alert(_upTransfiniteError);
		return ret;
	}else if(valDown>100||valDown<-20){
		alert(_downTransfiniteError);
		return ret;
	}else if(isRight(valUp,valDown)<0){
		alert(_inputerror);
		return ret;
	}
	return 0;
}
//save 
function saveCurverSet(){
	var sp=document.getElementById('samplingPeriod');
	var tu=document.getElementById('curverTempUp');
	var td=document.getElementById('curverTempDown');
	//td必须大于-20，tu小于120
	if(checkTempRange(tu.value,td.value)>-1){
		setSamplingPeriod(sp.value);
		tempRangeUp = decValue(tu.value);
		tempRangeDown = decValue(td.value);
		tu.value = tempRangeUp;
		td.value = tempRangeDown;
		clearCurve(4);
	}
}
//初始化温度范围及采样周期
function initSampling(){
	var sp=document.getElementById('samplingPeriod');
	var tu=document.getElementById('curverTempUp');
	var td=document.getElementById('curverTempDown');
	sp.value = 0;
	tu.value = 140;
	td.value = -20;
}
function selfLocation(){
	try{
		location='temp_storage.htm'/*tpa=http://192.168.100.2:8080/temp_storage.htm*/;
	}catch(message){
		alert(message);
	}
	return false;
}

function saveDocument(){
	var blobObject = new Blob(["I scream. You scream. We all scream for ice cream."]); 
    window.navigator.msSaveOrOpenBlob(blobObject, 'http://192.168.100.2:8080/msSaveBlob_testFile.txt');
    alert('File save request made using msSaveBlob() - note the single "Save" button below.'); 
}

//判断是否是float型
function is_float(string){

	if(string.match(/\./g) != null)
		return true;
	else
		return false;
}

//取float有效位，length为小数点后有效长度
function significant_number(string,length){
	var str = '', len = 0;
	
	if(typeof string == 'string' && is_float(string) && length>=0){

		for(var i=0; i<string.length; i++){
			if(string.substr(i,1) == '.'){
				if(length == 0)
					len = i;
				else
					len = (i+1+length<string.length)?(i+1+length):(string.length);
				
				return string.substr(0,len);
			}
		}
	}else{
		
		return string;
	}
}

//去掉float型后缀的0
function simplify_number(string){
	var str = '';
	if(typeof string == 'string' && is_float(string)){

		for(var i=string.length-1; i>=0; i--){
			if(string.substr(i,1) != 0){
				if(string.substr(i,1) == '.'){
					return string.substr(0,i+1) + '0';
				}
				return string.substr(0,i+1);
			}
		}
	}else{
		return string;
	}
}


function body_onload()
{
	setCurrentUrl('..');
	//initBoxSpotLine();
	initTitle();
	showLoginName();
	getOriginX();
	//canvas原点迁移
	drawOrigin(getOriginX(),getOriginY());
	//绘制canvas背景图
	drawCanvasBack();
	//自测试曲线函数
	//drawCurverBuck();
	//初始化采样数据
	initSampling();
	//initIcon();
	//初始化色板
	if(typeof gcolorPlate == 'undefined'){
		initColorphoto(0);
	}else{
		initColorphoto(gcolorPlate);
	}
	//初始化抬头个功能参数
	initPlate();
	//初始化测温区域，点，线
	initBoxSpotLine();
	initAlarm();
	//初始化环境参数
	initEnvirParams();
}
