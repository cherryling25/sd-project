//图像存储
/************************************************************************
*2018.08.21:解决IE图片下载问题，IE不支持download，所以采用window.open来实
*现，其中遇到返回值为null事件，乃为url不被信任所致，修改url属性，问题解决
*
*************************************************************************/
/*
var imgName=['20160121_085011_012','20160121_085104_123','20160121_085109_123','20160121_085129_123','20160121_085141_123',
'20160121_085159_123','20160121_085225_123','20160121_085256_123','20160121_085640_333','20160121_085658_123',
'2018_0907_140935_335','2018_0907_140936_335','2018_0907_140937_335','2018_0907_140938_335','2018_0907_140939_335',
'2018_0907_141126_335','2018_0907_141136_335','2018_0907_141146_335','2018_0907_141156_335','2018_0907_141166_335',
'2018_0907_141176_335','2018_0907_141186_335','2018_0907_141196_335','2018_0907_141206_335','2018_0907_141346_335'];
*/

var imgNumber = 24;
var imgWidth = 384;
var imgHeight = 288;
var SDCARD_FORMAT_ONGOING = 0;
var SDCARD_FORMAT_SUCCESS = 1;
var SDCARD_FORMAT_FAILED = 2;
var CHECK_FORMAT_TIMEOUT = 1800;

var	fmt_stat = 0;
var	fmt_inter = 100;
var	fmt_time = 0;
var	fmt_stat_cmd = 'formatStatus';
var	process = 0;
/*
var sd_fmt = {
	fmt_stat:'0',
	fmt_inter:'100',
	fmt_time:'0',
	fmt_stat_cmd:'formatStatus',
	process:'0',
};*/
//进度条
function hideProgress(){
	for(var i=0; i<=10; i++){
		var per = 10*i;
		var id = 'progress_' + per;
		var obj = document.getElementById(id);
		
		if(obj != null){
			obj.style.display = 'none';
		}
	}

	var cover = document.getElementById("cover_plate");
	var frame = document.getElementById("progress_frame");
	cover.style.backgroundColor = 'rgba(255,255,255,0.0)';
	cover.style.display = 'none';
	frame.style.display = 'none';
}

function progress_entry(per_current){
	
	if(typeof per_current != 'number' || per_current>100 || per_current<0)
		return 0;
	
	hideProgress();

	var curent_id = 'progress_' + per_current;
	var curent_obj = document.getElementById(curent_id);
	//var show = document.getElementById("progress-show");
	var cover = document.getElementById("cover_plate");
	var frame = document.getElementById("progress_frame");
	
	curent_obj.style.display = 'inline';
	//show.innerText = per_current + '%';
	cover.style.backgroundColor = 'rgba(100,100,100,0.4)';
	cover.style.display = 'inline';
	frame.style.display = 'inline';
	
}

//解析结果
function analyFormatResult(params){
	var result = {};

	analyParams(params,result);
	fmt_stat = result['fmt_stat'];
}

function getFormatStatus(cmd,param,length)
{
	try{
		var url = 'set_param.cgi?&group_tag=hash_param_bridge.htm'/*tpa=http://192.168.100.2:8080/set_param.cgi?&group_tag=hash_param_bridge*/;
		url+='&set_cmd='+cmd;
		url+='&length='+length;
		url+= param;
		url+='&' + Math.random();
		//alert(url);
		
		$.ajax({
			url: url,
			async: true,//改为yibu方式
			type: "GET",
			timeout:400,
			data: {},
			success: function (result) {
				analyFormatResult(result);
				return true;
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
				return false;
			}
        });
	}catch(exception){
		return false;
	}
}

//检测sdcard格式化状态
function checkFormatStatus(){
	
	if((fmt_stat == SDCARD_FORMAT_ONGOING) && (fmt_time < CHECK_FORMAT_TIMEOUT)){
		fmt_time++;
		process++;
	
		if(process>10)
			process = 0;

		if(fmt_time%100 == 0)
			getFormatStatus(fmt_stat_cmd,'',0);
		
		progress_entry(process*10);
		setTimeout(checkFormatStatus,fmt_inter);
	}else if(fmt_stat == SDCARD_FORMAT_SUCCESS){
		fmt_time = 0;
		fmt_stat = SDCARD_FORMAT_ONGOING;
		hideProgress();
		alert(_fmt_success);
	}else if(fmt_stat == SDCARD_FORMAT_FAILED){
		fmt_time = 0;
		fmt_stat = SDCARD_FORMAT_ONGOING;
		hideProgress();
		alert(_fmt_failed);
	}else if(fmt_time == CHECK_FORMAT_TIMEOUT){
		fmt_time = 0;
		fmt_stat = SDCARD_FORMAT_ONGOING;
		hideProgress();
		alert(_fmt_timeout);
	}
}


function showFocus(e,name){
	var img = name+'1';
	e.src = './images/'+img+'.png';
	
}
function showBlur(e,name){
	e.src = './images/'+name+'.png';
	
}

//选择图片和录像存储
function showPlate(id){
	var plate1 = document.getElementById('imagePlate');
	var plate2 = document.getElementById('recordPlate');
	var storage1 = document.getElementById('imageStorage');
	var storage2 = document.getElementById('recordStorage');

	if(id == 'imagePlate'){
		
		plate1.style.display = 'inline';
		storage1.style.backgroundColor = '#ddd';
		plate2.style.display = 'none';
		storage2.style.backgroundColor = '#eee';
	}else{
		
		plate1.style.display = 'none';
		storage1.style.backgroundColor = '#eee';
		plate2.style.display = 'inline';
		storage2.style.backgroundColor = '#ddd';
	}
}

//新建视频索引

function set_video_index(){
	var img = document.getElement.ById('videoIndex');
	img.src = '';
}

//var infraredName = ["http://192.168.100.2:8080/image1_F.mp4","http://192.168.100.2:8080/image2_F.mp4","http://192.168.100.2:8080/image3_F.mp4","http://192.168.100.2:8080/image4_F.mp4","http://192.168.100.2:8080/image5_F.mp4","http://192.168.100.2:8080/image6_F.mp4","http://192.168.100.2:8080/image7_F.mp4"];
//var visibleName = ["http://192.168.100.2:8080/image8_A.mp4","http://192.168.100.2:8080/image9_A.mp4","http://192.168.100.2:8080/image10_A.mp4","http://192.168.100.2:8080/image11_A.mp4","http://192.168.100.2:8080/image12_A.mp4"];

//将视频导入播放器
function set_video_video(id){
	var name = '', source = '', direction = '';
	
	name = id;
	if(id.indexOf('.jpg')>-1){
			
		name = id.replace('.jpg','.mp4');
	}
	var video = document.getElementById('example_video_1');

	if(name.indexOf('_F')>-1){

		source = './video/VIDEO-CIF/';
		direction = './video/THUMB-CIF/';
	}else if(name.indexOf('_A')>-1){

		source = './video/VIDEO-FRONT/';
		direction = './video/THUMB-FRONT/';
	}

	video.poster = direction + id;
	video.src = source + name;

}

function creatVideoImg(source,name){
	var box = document.getElementById('videoPreview');
	var node = document.createElement('div');
	var img = document.createElement('img');
	var cover = document.createElement('div');
	var checkDiv = document.createElement('div');
	var checkImg = document.createElement('img');
	var nameData = '';

	nameData = name;
	if(name.indexOf('.mp4')>-1){
		nameData = name.replace('.mp4','.jpg');
	}
	
	img.src = source + nameData;
	img.className = 'imgVideoCell';
	img.id = nameData;
	img.onmouseover = function(){
		var coverId = 'cover_' + this.id;
		var coverDiv = document.getElementById(coverId);

		coverDiv.style.display = 'inline';
	}
	img.onclick = function(e){
	
		set_video_video(this.id);
	}
	img.ondragstart = function(e){
		return false;
	}
	img.onselectstart = function(e){
		return false;
	}

	cover.className = 'coverLayer';
	cover.id = 'cover_' + nameData;
	cover.innerText = name;
	//cover.align = 'center';
	cover.onmouseout = function(){
		
		this.style.display = 'none';
	}
	cover.onmousedown = function(){
		var imgId = this.id.replace('cover_','');
		
		set_video_video(imgId);
	}

	checkImg.id = 'checkimg_' + nameData;
	checkImg.src = './images/select.png';
	checkImg.className = 'checkimg';
	

	//checkbox.type = 'checkbox';
	checkDiv.id = 'checkbox_' + nameData;
	checkDiv.checked = 'undefined';
	checkDiv.className = 'coverCheckbox';
	checkDiv.onmousedown = function(){
		var imgID = this.id.replace('checkbox_','checkimg_');
		var imgObj = document.getElementById(imgID);
		
		if(this.checked == 'undefined'){

			this.checked = 'checked';
			imgObj.style.display = 'inline';
		}else{

			this.checked = 'undefined';
			imgObj.style.display = 'none';
		}
	}

	checkDiv.appendChild(checkImg);
	
	node.className = 'divVideoIndex';
	node.id = 'video_'+nameData;
	node.appendChild(img);
	node.appendChild(cover);
	node.appendChild(checkDiv);
	box.appendChild(node);

}

function showVideoImg(){
	var source = '';
	var len = 0;

	if(typeof infraredName == 'undefined')
		return 0;
	
	len	= infraredName.length;
	for(var i=0; i<len; i++){
		source = './video/THUMB-CIF/';
		
		if(infraredName[i] != '')
			creatVideoImg(source,infraredName[i]);
	}

	if(typeof visibleName == 'undefined')
		return 0;
	
	len = visibleName.length;
	for(var i=0; i<len; i++){
		source = './video/THUMB-FRONT/';
		
		if(visibleName[i] != '')
			creatVideoImg(source,visibleName[i]);
	}
}

var videoIndex = 0;
function init_video_record(){
	var video = document.getElementById('example_video_1');

	if((typeof infraredName == 'undefined') || (typeof visibleName == 'undefined')){

		video.src = '';
	}else if(infraredName[0] != ''){
		
		video.src = './video/VIDEO-CIF/' + infraredName[0];
	}else if(visibleName[0] != ''){
		
		video.src = './video/VIDEO-FONT/' + visibleName[0];
	}
	
	video.onerror = function(){
		//alert('video is error!');
	}
}
//向后台传递删除信息
function deleteVideo(cmd,param,length)
{
	try{
		var url = 'set_param.cgi?&group_tag=hash_param_bridge.htm'/*tpa=http://192.168.100.2:8080/set_param.cgi?&group_tag=hash_param_bridge*/;
		url+='&set_cmd='+cmd;
		url+='&length='+length;
		url+= param;
		url+='&' + Math.random();
		//alert(url);
		$.ajax({
			url: url,
			async: true,//改为yibu方式
			type: "GET",
			timeout:400,
			data: {},
			success: function (result) {
				
				//initAllParam();
				return true;
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				
				//initAllParam();
				console.log(textStatus);
				return false;
			}
        });
	 //location.reload();
	}catch(exception){
		
		//initAllParam();
		return false;
	}
	
}

//总checkobox控制子checkbox
function subVideoSelect(checked,arrayName){
	if(Array.isArray(arrayName)){
		var len = 0, name = '';
	
		len = arrayName.length;
		for(var i=0; i<len; i++){
			if(arrayName[i] != ''){
				
				if(arrayName[i].indexOf('.mp4')>-1){
					name = arrayName[i].replace('.mp4','.jpg');
				}
				
				var checkDiv = document.getElementById('checkbox_'+name);
				var imgObj = document.getElementById('checkimg_'+name);
				
				checkDiv.checked = checked;
				
				if(checked == 'checked'){
					
					imgObj.style.display = 'inline';
				}else{

					imgObj.style.display = 'none';
				}
			}
		}
	}
}


//全选或全部撤销
function allVideoSelect(check){
	if(check){
		
		subVideoSelect('checked',infraredName);
		subVideoSelect('checked',visibleName);
	}else{
		
		subVideoSelect('undefined',infraredName);
		subVideoSelect('undefined',visibleName);
	}
}

//删除视频时，做video.src的判断，若在删除之列，清src
function clearVideoSource(name){
	if(name != ''){
		var video = document.getElementById('example_video_1'); 
		if(video.src.indexOf(name)>-1){
			
			video.src = '';
		}
	}
}

//巡历删除函数
function forInDeleteVideo(len,arrayName,index){
	var ret = '';
	if(Array.isArray(arrayName)){
	
		for(var i=0; i<len; i++){
			var recordID = arrayName[i];
			
			if(arrayName[i] != '' && arrayName[i] != undefined){
				var name = arrayName[i];

				if(arrayName[i].indexOf('.mp4')>-1){
					name = arrayName[i].replace('.mp4','.jpg');
				}
				
				var checkDiv = document.getElementById('checkbox_'+name);
				var div = document.getElementById('video_'+name);
				var parent = document.getElementById('videoPreview');
				
				if(checkDiv.checked == 'checked'){
					
					parent.removeChild(div);
					clearVideoSource(arrayName[i]);
					ret += '&' + index[1] + index[0] + '=' + arrayName[i];
					index[0]++;
					arrayName[i] = '';
				}
			}
		}
	}
	return ret;
}

//删除录像
function deleteVideoCell(){
	var cmd = '', value = '', length = 0;
	var active_a = -1, active_f = -1, len = 0, index = [0,''];
	var ret = confirm(_delete_record);
	if(ret){
		var allSelect = document.getElementById('allVideoSelect');

		len = infraredName.length;
		index[1] = 'infrared';
		active_f = forInDeleteVideo(len,infraredName,index);
		active_f += '&length_f=' + index[0];

		len = visibleName.length;
		index[0] = 0;
		index[1] = 'videble';
		active_a = forInDeleteVideo(len,visibleName,index);
		active_a += '&length_a=' + index[0];
		
		if(active_f || active_a){

			cmd = 'deleteVideoParam';
			value = active_f + active_a;
			length = index[0];

			if(allSelect.checked){
			
				allSelect.checked = false;                 //若全选框被选中，则清除勾选标志
				length = 128;                               //录像数目暂定64，超出64，默认全部删除
			}
			
			deleteVideo(cmd,value,length);
		}
	}
}

//全部删除
function delAllVide(){
	var len = 0;

	if((typeof infraredName == 'undefined') || (typeof visibleName == 'undefined'))
		return 0;
	
	len = infraredName.length;
	for(var i=0; i<len; i++){
		var recordID = infraredName[i];
		
		if(infraredName[i] != '' && infraredName[i] != undefined){
			var name = infraredName[i];

			if(infraredName[i].indexOf('.mp4')>-1){
				name = infraredName[i].replace('.mp4','.jpg');
			}
			
			var div = document.getElementById('video_'+name);
			var parent = document.getElementById('videoPreview');
				
			parent.removeChild(div);
			clearVideoSource(infraredName[i]);
			infraredName[i] = '';
		}
	}

	len = visibleName.length;
	for(var i=0; i<len; i++){
		var recordID = visibleName[i];
		
		if(visibleName[i] != '' && visibleName[i] != undefined){
			var name = visibleName[i];

			if(visibleName[i].indexOf('.mp4')>-1){
				name = visibleName[i].replace('.mp4','.jpg');
			}
			
			var div = document.getElementById('video_'+name);
			var parent = document.getElementById('videoPreview');
				
			parent.removeChild(div);
			clearVideoSource(visibleName[i]);
			visibleName[i] = '';
		}
	}
}
//格式化命令
function format(){
	var ret = confirm(_format);
	if(ret){
		var cmd = '', value = '', length = 0; 

		if(is_sdcard_exist() < 0){
			alert(_sdcard_nonexist);
			return 0;
		}

		delAllVide();

		cmd = 'formatVideo';
		value = '&index=' + 'all';
		length = 0;
		
		deleteVideo(cmd,value,length);
		deleteAllSnapshot();
		checkFormatStatus();
	}
}

//snapshot
function creatCell(nameDate){
	var box = document.getElementById('divNode');
	var node = document.createElement('div');
	var check=document.createElement('input');
	var img = document.createElement('img');
	var date = document.createElement('label');
	var down = document.createElement('img');

	check.type = 'checkbox';
	check.id = 'checkCell'+nameDate;
	check.className = 'checkCell';
	//alert(nameDate);
	img.src='./snapshot/image_'+nameDate+'.jpg';
	img.className = 'imgCell';
	img.id = 'img'+nameDate;
	img.onclick = function(e){
		var preview = document.getElementById('imgPreview');
		preview.src = img.src;
		preview.style.display = 'inline';
		preview.style.width = imgWidth + 'px';
		preview.style.height = imgHeight + 'px';
	}
	img.ondragstart = function(e){return false;};

	date.type = 'text';
	date.innerText = 'image_'+nameDate+'.jpg';
	date.className = 'textCell';

	down.src='./images/imgLoad.png';
	down.className = 'downCell';
	down.ondragstart = function(e){return false;};
	down.onclick = function(){
		download(img.src,'img_'+nameDate+'.png');
	};
	down.onmouseover = function(e){
		this.src='./images/imgLoad1.png';
	};
	down.onmouseout = function(e){
		this.src='./images/imgLoad.png';
	}
	
	node.className = 'divNode';
	node.id = 'img_'+nameDate;
	node.appendChild(check);
	node.appendChild(img);
	node.appendChild(date);
	node.appendChild(down);
	box.appendChild(node);

	//check=null;img=null;date=null;down=null;node=null;
}

function creatNullDiv(){
	var box = document.getElementById('divNode');
	var node = document.createElement('div');
	node.className = 'divNode';
	box.appendChild(node);
}

function allSelect(check){
	if(check){
		for(var i=0;i<imgNumber;i++){
			var img = imgName[i];
			if(img !== '' && img!==undefined){
				var id = 'checkCell'+imgName[i];
				var box = document.getElementById(id);
				box.checked = true;
			}
		}
	}else{
		for(var i=0;i<imgNumber;i++){
			var img = imgName[i];
			if(img !== '' && img!==undefined){
				var id = 'checkCell'+imgName[i];
				var box = document.getElementById(id);
				box.checked = false;
			}
		}
	}
}


function deleteSnapshot(param,value)
{
	try{
		var url = 'set_param.cgi-&group_tag=temp_coor.htm'/*tpa=http://192.168.100.2:8080/set_param.cgi?&group_tag=temp_coor*/;
		url+='&set_cmd='+param;
		url+='&length='+value.length;
		url+='&value='+value;
		url+='&' + new Date().getTime() + Math.random();
		//alert(url);
        $.ajax({
               url: url,
               async: true,//改为异步方式
               type: "GET",
               data: {},
               success: function (result) {
			   }
        });
	}catch(exception){
	return;
	}
}


//快照全部删除
function deleteAllSnapshot(){
	var param='',value='',active=false;

	if(typeof imgName == 'undefined')
		return 0;

	if(imgName.length <= 0)
		return 0;
	
	for(var i=0;i<imgNumber;i++){
		var img = imgName[i];
		if(img !== '' && img!==undefined){
			//var id = 'checkCell'+imgName[i];
			//var box = document.getElementById(id);
			var div = document.getElementById('divNode');
			
			var img = document.getElementById('img'+imgName[i]);
			var preview = document.getElementById('imgPreview');
			active = true;
			value += '|' + imgName[i];
			
			if(img.src === preview.src){
				preview.src='';
				preview.style.display = 'none';
			}
			div.removeChild(img.parentNode);
			imgName[i] = '';
		}
	}
	
	param = 'deleteSnapshot';
	deleteSnapshot(param,value);
}


function deleteCell(){
	var param='',value='',active=false;
	var ret = confirm(_delete_photo);
	
	if(ret){
		for(var i=0;i<imgNumber;i++){
			var img = imgName[i];
			if(img !== '' && img!==undefined){
				var id = 'checkCell'+imgName[i];
				var box = document.getElementById(id);
				var div = document.getElementById('divNode');
				if(box.checked){
					var img = document.getElementById('img'+imgName[i]);
					var preview = document.getElementById('imgPreview');
					active = true;
					value += '|' + imgName[i];
					
					if(img.src === preview.src){
						preview.src='';
						preview.style.display = 'none';
					}
					div.removeChild(box.parentNode);
					imgName[i] = '';
				}
			}
		}
		if(active){
			var allSelect = document.getElementById('allSelect');
			if(allSelect != null){
				allSelect.checked = false;
			}
			param = 'deleteSnapshot';
			deleteSnapshot(param,value);
		}
	}
}

function iframeResize(){ 
	var pIframe = parent.document.getElementById("main"); 
	pIframe.height = this.document.body.scrollHeight;
} 	 

function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
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

//IE浏览器图片保存本地
function SaveAs5(imgURL,imgname)
{
    var oPop = parent.document.open(imgURL,'_blank','',false);
	oPop.document.execCommand("SaveAs",true);
	oPop.close();
	return false;
}

function download(src,imgname) {
    if (myBrowser()==="IE"||myBrowser()==="Edge"){
        SaveAs5(src,imgname);
    }else if(myBrowser()==="FF"){
		downloadFire(src,imgname);
	}else{
        downloadCho(src,imgname);
    }
}

//谷歌，360极速等浏览器下载
function downloadCho(src,imgname) {
    var $a = document.createElement('a');
    $a.setAttribute("href", src);
    $a.setAttribute("download", imgname);
    $a.click();
};


function downloadFire(src,imgname) {
	
    var img = src;
    var alink = document.createElement("a");
    alink.href = img;
    alink.download = imgname;
	document.body.appendChild(alink);
	alink.click();
}

function onscrollImg(){
	parent.window.onscroll = function(){
		var preview = document.getElementById('divPreview');
		var scroolTop = parent.document.body.scrollTop;
		if(scroolTop>150){
			preview.style.top = scroolTop - 90 +'px'; 
		}else{
			preview.style.top = 60 +'px'; 
		}
	}
}

function loadImg(){
	var nullDiv = false;
	
	setCurrentUrl('..');
	showLoginName();
	init_video_record();
	showVideoImg();
	
	for(var i=0;i<imgNumber+1;i++){
		var img = imgName[i];
		if(img !== '' && img!==undefined){
			creatCell(img);
		}else if(!nullDiv){
			nullDiv = true;
			creatNullDiv();
		}else{
			break;
		}
	}
	
	onscrollImg();
}
