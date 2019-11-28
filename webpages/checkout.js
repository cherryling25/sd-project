//2018.09.06 qzhu

//拉开时，间距20px，闭合时，间距10px, 抬头高度50，信息栏高度40。
//全展开时
var autotiming_down = 0, manualtiming_down = 210, device_down = 420,  email_down = 550, ftp_down = 800, plate_down = 930;
//全闭合时
var autotiming_up = 0, manualtiming_up = 50, device_up = 100, email_up = 150,ftp_up = 200, plate_up = 250;
//各班高度
var autotiming_height = 160, manualtiming_height = 160, dev_height = 80, email_height = 200, ftp_height = 80, plate_height = 440;

function analyObj(id){
	var ret='';
	if(id.indexOf('email')>-1){
		ret = 'email';
	}else if(id.indexOf('ftp')>-1){
		ret = 'ftp';
	}else if(id.indexOf('platform')>-1){
		ret = 'platform';
	}else if(id.indexOf('device')>-1){
		ret = 'device';
	}else if(id.indexOf('autoTiming')>-1){
		ret = 'autoTiming_show';
	}else if(id.indexOf('manualTiming')>-1){
		ret = 'manualTiming_show';
	}else{
		return -1;
	}
	
	return ret;
}
//扩展后间距为40*num+20px,闭合后要留下10px的间距，所以减值为40*num+10px。
//同理，downObject中的加值也是如此计算
//收缩
function upObject(){
	var img_auto = document.getElementById('autoTiming_setting');
	var img_manual = document.getElementById('manualTiming_setting');
	var img_email = document.getElementById('email_setting');
	var img_ftp = document.getElementById('ftp_setting');
	var img_plate = document.getElementById('platform_access');
	var img_device = document.getElementById('device_setting');
	
	var obj_auto = document.getElementById('autoTiming_show');
	var obj_manual = document.getElementById('manualTiming_show');
	var obj_email = document.getElementById('email');
	var obj_ftp = document.getElementById('ftp');
	var obj_plate = document.getElementById('platform');
	var obj_device = document.getElementById('device');
	
	var div_auto = document.getElementById('autoTimingDiv');
	var div_manual = document.getElementById('manualTimingDiv');
	var div_ftp = document.getElementById('ftpDiv');
	var div_plate = document.getElementById('platformDiv');
	var div_device = document.getElementById('deviceDiv');
	var div_email = document.getElementById('emailDiv');
	var div_submit = document.getElementById('submitDiv');
	
	var autotiming_top = autotiming_down, manualtiming_top = manualtiming_down, ftp_top = ftp_down, plate_top = plate_down, device_top = device_down, email_top = email_down;

	if(img_auto.name === 'up'){
		manualtiming_top = manualtiming_top - autotiming_height;
		device_top = device_top - autotiming_height;
		email_top = email_top - autotiming_height;
		ftp_top = ftp_top - autotiming_height;
		plate_top = plate_top - autotiming_height;
		obj_auto.style.display = 'none';
	}
	if(img_manual.name === 'up'){
		device_top = device_top - manualtiming_height;
		email_top = email_top - manualtiming_height;
		ftp_top = ftp_top - manualtiming_height;
		plate_top = plate_top - manualtiming_height;
		obj_manual.style.display = 'none';
	}
	if(img_device.name === 'up'){
		email_top = email_top - dev_height;
		ftp_top = ftp_top - dev_height;
		plate_top = plate_top - dev_height;
		obj_device.style.display = 'none';
	}
	if(img_email.name === 'up'){
		ftp_top = ftp_top - email_height;
		plate_top = plate_top - email_height;
		obj_email.style.display = 'none';
	}
	if(img_ftp.name === 'up'){
		plate_top = plate_top - ftp_height;
		obj_ftp.style.display = 'none';
	}
	if(img_plate.name === 'up'){
		obj_plate.style.display = 'none';		
	}

	div_auto.style.top = autotiming_top + 'px';
	div_manual.style.top = manualtiming_top + 'px';
	div_email.style.top = email_top + 'px';
	div_ftp.style.top = ftp_top + 'px';
	div_plate.style.top = plate_top + 'px';
	div_device.style.top = device_top + 'px';
}

//展开
function downObject(){

	var img_auto = document.getElementById('autoTiming_setting');
	var img_manual = document.getElementById('manualTiming_setting');
	var img_email = document.getElementById('email_setting');
	var img_ftp = document.getElementById('ftp_setting');
	var img_plate = document.getElementById('platform_access');
	var img_device = document.getElementById('device_setting');

	var obj_auto = document.getElementById('autoTiming_show');
	var obj_manual = document.getElementById('manualTiming_show');
	var obj_email = document.getElementById('email');
	var obj_ftp = document.getElementById('ftp');
	var obj_plate = document.getElementById('platform');
	var obj_device = document.getElementById('device');

	var div_auto = document.getElementById('autoTimingDiv');
	var div_manual = document.getElementById('manualTimingDiv');
	var div_ftp = document.getElementById('ftpDiv');
	var div_plate = document.getElementById('platformDiv');
	var div_device = document.getElementById('deviceDiv');
	var div_email = document.getElementById('emailDiv');
	var div_submit = document.getElementById('submitDiv');
	
	var autotiming_top = autotiming_up, manualtiming_top = manualtiming_up, ftp_top = ftp_up, plate_top = plate_up, device_top = device_up, email_top = email_up;

	if(img_auto.name === 'down'){
		manualtiming_top = manualtiming_top + autotiming_height;
		device_top = device_top + autotiming_height;
		email_top = email_top + autotiming_height;
		ftp_top = ftp_top + autotiming_height;
		plate_top = plate_top + autotiming_height;
		obj_auto.style.display = 'inline';
	}
	if(img_manual.name === 'down'){
		device_top = device_top + manualtiming_height;
		email_top = email_top + manualtiming_height;
		ftp_top = ftp_top + manualtiming_height;
		plate_top = plate_top + manualtiming_height;
		obj_manual.style.display = 'inline';
	}
	if(img_device.name === 'down'){
		email_top = email_top + dev_height;
		ftp_top = ftp_top + dev_height;
		plate_top = plate_top + dev_height;
		obj_device.style.display = 'inline';
	}
	if(img_email.name === 'down'){
		ftp_top = ftp_top + email_height;
		plate_top = plate_top + email_height;
		obj_email.style.display = 'inline';
	}
	if(img_ftp.name === 'down'){
		plate_top = plate_top + ftp_height;
		obj_ftp.style.display = 'inline';
	}
	if(img_plate.name === 'down'){
		obj_plate.style.display = 'inline';
	}
	div_auto.style.top = autotiming_top + 'px';
	div_manual.style.top = manualtiming_top + 'px';
	div_email.style.top = email_top + 'px';
	div_ftp.style.top = ftp_top+'px';
	div_plate.style.top = plate_top+'px';
	div_device.style.top = device_top + 'px';
}

function upDown(id){
	var img = document.getElementById(id);
	var obj = document.getElementById(analyObj(id));
	
	if(img.name === 'up'){
		img.src = './images/up.jpg';
		img.name = 'down';
		if(obj != null){
			downObject();
		}
	}else if(img.name === 'down'){
		img.src = './images/down.jpg';
		img.name = 'up';
		if(obj != null){
			upObject();
		}
	}
}

function set_platform()
{	
	var url;
	url='set_param.cgi?&group_tag=platform_cfg.htm'/*tpa=http://192.168.100.2:8080/set_param.cgi?&group_tag=platform_cfg*/;
	url+='&local_port='+$("#localport").val();
	url+='&sipserver_id='+$("#sip_id").val();
	url+='&reg_pwd='+$(reg_pwd).val();
	url+='&device_id='+$("#sip_username").val();
	url+='&sipserver_domain='+$("#sipserver_field").val();
	url+='&sipserver_ip='+$("#sip_address").val();
	url+='&sipserver_port='+$("#sip_port").val();
	url+='&keepalive_interval='+$("#keepalive_interval").val();
	url+='&register_period='+$("#register_period").val();
	url+='&heartbeat_fail='+$("#heartbeat_fail").val();
	url+='&alarmID='+ alarmID0 ;
	url+='&realm='+ realm0 ;
	url+='&transfer_protocol='+ transfer_protocol0 ;
	url+='&device_name='+ device_name0 ;
	url+='&manufacturer='+ manufacturer0 ;
	url+='&model='+ model0 ;
	url+='&iotc_uid='+ iotc_uid0 ;
	url+='&alarm_guard='+ alarm_guard0 ;
	url+='&avpassword='+ avpassword0 ;
	url+='&' + new Date().getTime() + Math.random();
//	$.getScript(url);
//	url='get_param.cgi-next_url=platform_access.htm'/*tpa=http://192.168.100.2:8080/get_param.cgi?next_url=platform_access.htm*/;
//	url=encodeURIComponent (url);
	url = url.replace(/\+/g, "%2B");
	$.ajax({
		url: url,
		async: false,//改为同步方式
		type: "GET",
		data: {},
		success: function (result) {
	 }
	 });
//	$.getScript(url);
	$.getScript(url,function(){
	});
	location.reload();
}


//匹配IP地址的正则表达式
function checkIP(value){
	//if (isNull(value)) return false;
	var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g 
	if(re.test(value))
	{
		if( RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256) return true;
	}
	return false;
}

function setPlateParam(param,value)
{
	try{
		var url = 'set_param.cgi?&group_tag=hash_param.htm'/*tpa=http://192.168.100.2:8080/set_param.cgi?&group_tag=hash_param*/;
		url+='&set_cmd='+param;
		url+='&length='+value.length;
		url+= value;
		url+='&' + new Date().getTime() + Math.random();
		//alert(url);
        $.ajax({
               url: url,
               async: true,//改为异步方式
               type: "GET",
               timeout:400,
               data: {},
               success: function (result) {
               		alert(_set_success);
			   }
        });
	 //location.reload();
	}catch(exception){
	return;
	}
}
//exchange infomation by bridge
function bridgeExchangeInfo(cmd,value){
	try{
		var url = 'set_param.cgi?&group_tag=hash_param_bridge.htm'/*tpa=http://192.168.100.2:8080/set_param.cgi?&group_tag=hash_param_bridge*/;
		url+='&set_cmd='+cmd;
		url+='&length='+value.length;
		url+= value;
		url+='&' + Math.random();
		//alert(url);
        $.ajax({
               url: url,
               async: true,//改为异步方式
               type: "GET",
               timeout:400,
               data: {},
               success: function (result) {
               		analyInformation(result);
			   }
        });
	 //location.reload();
	}catch(exception){
		return;
	}
}

function setPlatform(){
	var url='';
	var platform = document.getElementById('platform_access');
	
	
	return url;
}

function setFTP(){
	var url='&address=0' + '&ftpPort=0' + '&document=0';
	if(!checkIP($("#address").val())) {
		alert(_valid_ip); 
		$("#address").focus();
		$("#address").select();
		return '';
	}else{
		//url = '&address=' + $("#address").val() + '&ftpPort=' + $("#ftp_port").val() + '&document=' + $("#document").val();
		url = '&address=' + $("#address").val() + '&ftpPort=' + '0' + '&document=' + '0';
	}
	return url;
}

function setEmail(){
	var url='&recipient=0' + '&user_email=0' + '&pwd_email=0' + '&sender=0';
	var email = document.getElementById('email_setting');
	var enable = ($("#authenticate").attr('checked') == 'checked')?1:0;
	if(false){
		return '';
	}else{
		//url = '&recipient=' + $("#recipient").val() + '&user_email=' + $("#user_email").val() + '&pwd_email=' + $("#pwd_email").val() + '&sender=' + $("#sender").val();
		url = '&recipient=' + $("#recipient").val() + '&user_email=' + enable + '&pwd_email=' + $("#pwd_email").val() + '&sender=' + $("#sender").val();

	}
	return url;
}

function setDevice(){
	var url = '&deviceName=0';
	var name = document.getElementById('deviceName').value;

	if(false){
		return '';
	}else
		url = '&deviceName=' + name;

		return url;
}

function set_param(){
	var email, ftp, devName;
	email=setEmail();
	ftp = setFTP();
	devName = setDevice();
	if(!(email === '' && ftp === '' && devName === '')){
		var param = 'setPlateParam';
		var value = email + ftp + devName;
		setPlateParam(param,value);
	}else{
		alert('null');
	}
}


function set_email(){
	var cmd, param;
	var enable = ($("#authenticate").attr('checked') == 'checked')?1:0;
	
	cmd = 'setEmail';
	param = '&rec_email=' + $("#recipient").val() + '&email_enable=' + enable + '&email_psw=' + 
			$("#pwd_email").val() + '&send_email=' + $("#sender").val();

	bridgeExchangeInfo(cmd,param);
}

function set_tftp(){
	var cmd, param;
	
	if(!checkIP($("#address").val())) {
		alert(_valid_tftp); 
		$("#address").focus();
		$("#address").select();
		return 0;
	}else
		param = '&tftp_addr=' + $("#address").val() ;
	
	cmd = 'setTFTP';

	bridgeExchangeInfo(cmd,param);
}
//检测ntp地址是否合法
function checkNTP(){
	var ret = -1;
	var val = $("#ntpAddress").val();
	
	if(val == '')
		return ret;

	if(!checkIP(val))
		//return ret;

	return 0;
}

function set_dev_param(){
	var cmd, param, name;

	name = $("#deviceName").val();

	cmd = 'setDevParam';
	param = '&dev_name=' + name;

	bridgeExchangeInfo(cmd,param);
}

function set_auto_timing(){
	var cmd, param;
	var enable = ($("#autoTiming").attr('checked') == 'checked')?1:0;

	if(enable != 0 && checkNTP() == -1){
		alert(_ntp_tips);
		return 0;
	}
	
	cmd = 'setAutoTiming';
	param = '&autotime_en=' + enable + '&ntp_addr=' + $("#ntpAddress").val();

	bridgeExchangeInfo(cmd,param);
}

function set_manual_timing(){
	var cmd, param;
	var enable = ($("#manualTiming").attr('checked') == 'checked')?1:0;

	if(enable == 0){
		return 0;
	}
	
	cmd = 'setManualDate';
	param = '&webtime_year=' + $("#manualYear").val()
			+ '&webtime_mon=' + $("#manualMonth").val() + '&webtime_day=' + $("#manualDay").val();
		//	+ '&webtime_hour=' + $("#manualHour").val() + '&webtime_min=' + $("#manualMinute").val()
		//	+ '&webtime_sec=' + $("#manualSecond").val();
	bridgeExchangeInfo(cmd,param);
	cmd = 'setManualTime';
	//param = //'&webtime_year=' + $("#manualYear").val()
		//	+ '&webtime_mon=' + $("#manualMonth").val() + '&webtime_day=' + $("#manualDay").val()
		param = '&webtime_hour=' + $("#manualHour").val() + '&webtime_min=' + $("#manualMinute").val()
			+ '&webtime_sec=' + $("#manualSecond").val();
	bridgeExchangeInfo(cmd,param);

}

function submitInfo(id){

	switch(id){
		case 'autoTimeSubmit':
			set_auto_timing();
			break;

		case 'manualTimeSubmit':
			set_manual_timing();
			break;

		case 'deviceSubmit':
			set_dev_param();
			break;
	
		case 'emailSubmit':
			set_email();
			break;

		case 'ftpSubmit':
			set_tftp();
			break;

		default:
			break;
	}
}

function initPlatform(){
	if(typeof e_recipient != 'undefined')
		$("#recipient").val(e_recipient);
	if(typeof e_sender != 'undefined')
		$("#sender").val(e_sender);
	if(typeof e_pwdemail != 'undefined')
		$("#pwd_email").val(e_pwdemail);
	if(typeof e_useremail != 'undefined')
		$("#authenticate").val(e_useremail);
	if(typeof gaddress != 'undefined')
		$("#address").val(email_address);
	if(typeof device_name != 'undefined')
		$("#deviceName").val(device_name);
	if(typeof ntp_address != 'undefined')
		$("#ntpAddress").val(ntp_address);
	if(typeof auto_timing != 'undefined'){
		if(auto_timing == '1')
			$("#autoTiming").attr('checked','checked');
	}
	
	//$("#ftp_port").val(gftpPort);
	//$("#document").val(gdocument);
}

var dev = new Object();
dev.year = '00';
dev.month = '00';
dev.day = '00';
dev.hour = '00';
dev.minute = '00';
dev.second = '00';

function analyInformation(params){
	analyParams(params,dev);
}

function setManualTiming(){

	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()>9?(date.getMonth()+1):('0'+(date.getMonth()+1));
	var day = date.getDate()>9?(date.getDate()):('0'+date.getDate());
	var hour = date.getHours()>9?(date.getHours()):('0'+date.getHours());
	var minute = date.getMinutes()>9?(date.getMinutes()):('0'+date.getMinutes());
	var second = date.getSeconds()>9?(date.getSeconds()):('0'+date.getSeconds());
	
	$("#manualYear").val(year);
	$("#manualMonth").val(month);
	$("#manualDay").val(day);
	$("#manualHour").val(hour);
	$("#manualMinute").val(minute);
	$("#manualSecond").val(second);
}

function getDeviceTiming(){
	var cmd, param;

	cmd = 'getDevTime';
	param = '&getDevTime';
	bridgeExchangeInfo(cmd,param);
}

//修饰时间，使时间对齐
function alignTime(time){
	return time>9?(time):('0'+time);
}

function setDeviceTiming(){
	var year = parseInt(dev.year);
	var month = parseInt(dev.month);
	var day = parseInt(dev.day);
	var hour = parseInt(dev.hour);
	var minute = parseInt(dev.minute);
	var second = parseInt(dev.second);

	$("#devicelYear0").val(alignTime(year));
	$("#deviceMonth0").val(alignTime(month));
	$("#deviceDay0").val(alignTime(day));
	$("#deviceHour0").val(alignTime(hour));
	$("#deviceMinute0").val(alignTime(minute));
	$("#deviceSecond0").val(alignTime(second));

	$("#devicelYear1").val(alignTime(year));
	$("#deviceMonth1").val(alignTime(month));
	$("#deviceDay1").val(alignTime(day));
	$("#deviceHour1").val(alignTime(hour));
	$("#deviceMinute1").val(alignTime(minute));
	$("#deviceSecond1").val(alignTime(second));
}

//update time
function updateTime(){
	setManualTiming();
//	getDeviceTiming();		//debug  201911
	setDeviceTiming();
	setTimeout(updateTime,1000);
}


function body_onload()
{
	setCurrentUrl('..');
	showLoginName();
	initPlatform();
	updateTime();
	if (heartbeat_fail0 < 3)
		heartbeat_fail0 = 3;
	$("#sip_id").val(sipserver_id);
	$("#localport").val(local_port);
	$("#sipserver_field").val(sipserver_domain);
	$("#sip_address").val(sipserver_ip);
	$("#sip_port").val(sipserver_port);
	$("#sip_username").val(deviceid);
	$("#reg_pwd").val(reg_pwd0);
	$("#keepalive_interval").val(keepalive_interval0);
	$("#register_period").val(register_period0);
	$("#heartbeat_fail").val(heartbeat_fail0);
}


