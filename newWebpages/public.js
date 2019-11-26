//session
var USER_NO_LOGGED = 10;
var USER_IN_LOGGED = 11;
var USER_OUT_LOGGED = 12;
var OTHER_USER_LOGGED = 13;
var SESSION_ID_VALID = 14;
var SESSION_ID_INVALID = 15;

//bit
var BIT0_VALID = 1;
var BIT1_VALID = 2;
var BIT2_VALID = 4;
var BIT3_VALID = 8;
var BIT4_VALID = 16;
var BIT5_VALID = 32;
var bit_valid = [BIT0_VALID,BIT1_VALID,BIT2_VALID,BIT3_VALID,BIT4_VALID,BIT5_VALID];

var server_param = {};

//检验参数是否有效，出现非数字，则判错
function checkNonnumeric(ele){
	var ret = -1;
	
	if(ele == ''){
		return ret;
	}
	//正则表达式
	if(ele.match(/^\d+.?\d+$/) || ele.match(/^\d+$/) || ele.match(/^-\d+$/)){
		ret = 0;
	}
	
	return ret;
}

//位或
function bit_or(val0,val1){
	if(typeof val0 == 'undefined' || typeof val1 == 'undefined')
			return 0;

	if(typeof val0 == 'string'){
		if(val0.match(/^0-9/g) != null)
			return 0
	}

	if(typeof val1 == 'string'){
		if(val1.match(/^0-9/g) != null)
			return 0
	}
	
	return val0|val1;
}

//位与
function bit_and(val0,val1){
	if(typeof val0 == 'undefined' || typeof val1 == 'undefined')
		return 0;

	if(typeof val0 == 'string'){
		if(val0.match(/^0-9/g) != null)
			return 0
	}

	if(typeof val1 == 'string'){
		if(val1.match(/^0-9/g) != null)
			return 0
	}
	
	return val0&val1;
}

//解析后端传来的参数
function analyParams(params,obj){
	var ret = -1;
	
	if(typeof params != 'string' || typeof obj != 'object')
		return ret;
	
	var length = params.length, name, value, name_local, value_local, end_local;

	for(var i=0; i<length; i++){

		if(params.substr(i,1) == '&')
			name_local = i;

		if(params.substr(i,1) == '=')
			value_local = i;

		if(params.substr(i,1) == ';'){
			end_local = i;
			name = params.substr(name_local+1,value_local-name_local-1);
			value = params.substr(value_local+1,end_local-value_local-1);
			obj[name] = value;
		}
	}

	return 0;
}

//判断变量有无定义
function is_valid(arg){
	if(typeof arg != 'undefined')
		return true;
	else
		return false;
}

//获取cookie登录信息
function getURLSession(){
	var ret = '';
	var local_access = getcookie('jaccess');
	var local_seesion = getcookie('jsession_id');
	var local_url;
	
	if(local_access != '' && local_seesion != ''){
		local_url = '&jaccess=' + local_access + '&jseesion_id=' + local_seesion;
		return local_url;
	}else
		return ret;
}

//跳转登录界面
function jumpToLogonPage(){
	window.location = 'index.htm'/*tpa=http://192.168.100.2:8080/index.htm*/;
}

//根据后端返回值，判断当前登录状态
function checkLoadState(params){
	var ret = -1;

	if(analyParams(params,server_param)>=0){
		
		if(typeof server_param['answer'] != 'undefined'){
			if(server_param['answer'] == USER_NO_LOGGED || server_param['answer'] == OTHER_USER_LOGGED){
				//未登录，或有其他用户登录，转登录界面
				jumpToLogonPage();
				return ret;
			}else if(server_param['answer'] == SESSION_ID_VALID)
				return 0;
		}else
			jumpToLogonPage();
	}
}

//向后端提交session
function getLoadingState(cmd,param)
{
	try{
		var url = 'set_param.cgi?&group_tag=hash_param_bridge.htm'/*tpa=http://192.168.100.2:8080/set_param.cgi?&group_tag=hash_param_bridge*/;
		url+='&set_cmd='+cmd;
		url+='&length='+param.length;
		url+= param;
		url+='&' + Math.random() + getURLSession();
		//alert(url);
		$.ajax({
			url: url,
			async: true,//改为yibu方式
			type: "GET",
			timeout:400,
			data: {},
			success: function (result) {
					checkLoadState(result);
				return true;
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				return false;
			}
        });
	}catch(exception){
		return false;
	}
}

//封装,作为库函数，供各个页面调用
function getLogonStatus(){
	getLoadingState('logonStatus','&logonStatus');
}

//禁止点击
function no_click(id){
	$("#"+id).addClass('nonclick');
}

//判断sdcard存不存在
function is_sdcard_exist(){
	var ret = -1;
	if((typeof sd_info == 'undefined') || (sd_info == 0))
		return ret;
	else 
		ret = 0;

	return ret;
}

//初始化页面设置
function init_header_tips(val){
	if(val == 1){
		/*english*/
		
	}else if(val == 2){
		/*simple chinese*/
	}else{
		/*trantional chinese*/
	}
}

function foucus_header_tips(id,color){
	var len = arguments.length;
	
	if(len < 2)
		$("#"+id).css("color","red");
	else
		$("#"+id).css("color",color);
}

function defoucus_header_tips(id,color){
	var len = arguments.length;
	
	if(len < 2)
		$("#"+id).css("color","#2c2c2c");
	else
		$("#"+id).css("color",color);
}

//注销
function logout(){
	setcookie('jaccess','',0);
	setcookie('jsession_id','',0);
	jumpToLogonPage();
}

// 设置当前url
function setCurrentUrl(str){
	var stateObject = {};
	var title = 'ShiDe';
	/*
	if (!!(window.history && history.pushState)) {
		
		history.replaceState(stateObject, title, str);
		
	}
	*/
	//init_header_tips(current_language);
	getLogonStatus();
}

//退出页面时，弹框提示
function close_tips(){
	
	window.onbeforeunload=function(e){     
	　　var e = window.event||e;  
	　　e.returnValue=("正在上传文件，确定离开当前页面吗？");
	}
}

var PRI_REFUSE=0;
var PRI_VISITOR=1;
var PRI_OPERATOR=2;
var PRI_ADMINISTRATOR=255;

//setup list show and hide
function setupList(){
	//alert('00');
	var obj = document.getElementById('setupList');
	
	obj.style.display = 'block';
	
	
}

function hideSetup(){
	var obj = document.getElementById('setupList');
	var lang = document.getElementById('languageList');
	if(obj != null)
		obj.style.display = 'none';
	if(lang != null)
		lang.style.display = 'none';
}

document.onmousedown = function(ev){
	if((ev.target.className.indexOf('show')<0)){
		hideSetup();
	}
}

//更换语言
function languageList(){
	var obj = document.getElementById('languageList');
	obj.style.display = 'inline';
}

var LANGUAGE_ENGLISH = 1;
var LANGUAGE_SIMPLE_CHINESE = 2;
var LANGUAGE_TRAD_CHINESE = 3;

var current_language;

function set_language(language){
	var val =language;
	
	current_language = val;
	if(val==2){
		setcookie('language',"simple_chinese",720);
	}else if(val==3){
		setcookie('language',"traditional_chinese",720);
	}else{
		setcookie('language',"english",720);
	} 
	parent.location.reload();
}
//var login_name = 'operator';
function showLoginName(){

	if(typeof login_name != 'undefined')
		$("#loginName").text(_user+': '+login_name);
	else
		$("#loginName").text(_user+': '+'admin');

}

function getcookie(name)
{
	var strCookie=document.cookie;
    var arrCookie=strCookie.split('; ');
    for (var i=0;i<arrCookie.length;i++)
    {
		var arr=arrCookie[i].split('=');
        if (arr[0]==name)
			return unescape(arr[1]);
    }
    return '';
}
function setcookie(name,value,expirehours)
{
	var cookieString=name+'='+escape(value);
    if (expirehours>0)
    {
		var date=new Date();
        date.setTime(date.getTime()+expirehours*3600*1000);
        cookieString=cookieString+'; expires='+date.toGMTString();
	}
    document.cookie=cookieString;
}
function setDocTitle(name)
{
	top.document.title = name;
}

//��ֹF5ˢ��
var check=function(e){
   e=e||window.event;
   //alert(e.which||e.keyCode);
   if((e.which||e.keyCode)==116){
    if(e.preventDefault){
    e.preventDefault();}
    else{event.keyCode = 0;
     e.returnValue=false;} 
   } 
}
if(document.addEventListener){
   document.addEventListener("keydown",check,false);
}
else{
   document.attachEvent("onkeydown",check);
}

var language=getcookie('language');
if (language==''){
		if (navigator.appName == 'Netscape') 
				language = navigator.language; 
		else 
				language = navigator.browserLanguage; 	
		language=language.toLowerCase();
		if (language.indexOf('zh-cn') > -1) 
			language = 'simple_chinese'; 
		else if (language.indexOf('zh-tw') > -1) 
			language = 'traditional_chinese'; 
		else if (language.indexOf('es') > -1) 
			language = 'spanish'; 
		else if (language.indexOf('fr') > -1) 
			language = 'french'; 
		else if (language.indexOf('ru') > -1) 
			language = 'russian'; 
		else if (language.indexOf('pl') > -1) 
			language = 'polski'; 
		else if (language.indexOf('it') > -1) 
			language = 'italian'; 
		else if (language.indexOf('pt') > -1) 
			language = 'Portuguese'; 
		else if (language.indexOf('de') > -1) 
			language = 'deutsch'; 	
		else if (language.indexOf('po') > -1) 
			language = 'portugal'; 
		else if (language.indexOf('ko') > -1) 
			language = 'Korea';
		else if (language.indexOf('ja') > -1) 
			language = 'Japan';
		else 
			language = 'english'; 	
}

if (language=='simple_chinese')
	document.write('<script src="simple_chinese/string.js"><\/script><script src="oem.js"/*tpa=http://192.168.100.2:8080/simple_chinese/oem.js*/><\/script>');
else if (language=='traditional_chinese')	
	document.write('<script src = "traditional_chinese/string.js"><\/script><script src = "oem-1.js"/*tpa=http://192.168.100.2:8080/traditional_chinese/oem.js*/><\/script>');
else if (language=='spanish')
	document.write('<script src="spanish/string.js"><\/script><script src="oem-2.js"/*tpa=http://192.168.100.2:8080/spanish/oem.js*/><\/script>');
else if (language=='french')
	document.write('<script src="french/string.js"><\/script><script src="oem-3.js"/*tpa=http://192.168.100.2:8080/french/oem.js*/><\/script>');
else if (language=='russian')
	document.write('<script src="russian/string.js"><\/script><script src="oem-4.js"/*tpa=http://192.168.100.2:8080/russian/oem.js*/><\/script>');
else if (language=='polski')
	document.write('<script src="polski/string.js"><\/script><script src="oem-5.js"/*tpa=http://192.168.100.2:8080/polski/oem.js*/><\/script>');
else if (language=='italian')
	document.write('<script src="italian/string.js"><\/script><script src="oem-6.js"/*tpa=http://192.168.100.2:8080/italian/oem.js*/><\/script>');
else if (language=='deutsch')
	document.write('<script src="deutsch/string.js"><\/script><script src="oem-7.js"/*tpa=http://192.168.100.2:8080/deutsch/oem.js*/><\/script>');
else if (language=='portugal')
	document.write('<script src="portugal/string.js"><\/script><script src="oem-8.js"/*tpa=http://192.168.100.2:8080/portugal/oem.js*/><\/script>');
else if (language=='Korea')
	document.write('<script src="korea/string.js"><\/script><script src="oem-9.js"/*tpa=http://192.168.100.2:8080/korea/oem.js*/><\/script>');
else if (language=='Japan')
	document.write('<script src="Japan/string.js"><\/script><script src="oem-10.js"/*tpa=http://192.168.100.2:8080/Japan/oem.js*/><\/script>');	
else
	document.write('<script src="english/string.js"><\/script><script src="oem-11.js"/*tpa=http://192.168.100.2:8080/english/oem.js*/><\/script>');
function upgrade()
{
	var url;
	if (confirm("upgrade"))
	{
		top.reboot_seconds = 180;
		url='cmd.cgi-cmd_tag=factory_reset&group_tag=process&next_url=reboot.htm'/*tpa=http://192.168.100.2:8080/cmd.cgi?cmd_tag=factory_reset&group_tag=process&next_url=reboot.htm*/;
		url+='&' + new Date().getTime() + Math.random();
		location=url;
		//$.getScript(url);
	}
}	
	
function reboot()
{
	var url;
	if (confirm(_sure_reboot))
	{
		top.reboot_seconds = 30;
		url='cmd.cgi?cmd_tag=reboot&group_tag=cms_info&next_url=reboot.htm'/*tpa=http://192.168.100.2:8080/cmd.cgi?cmd_tag=reboot&group_tag=cms_info&next_url=reboot.htm*/;
		location=url;
		//$.getScript(url);
	}
}
function restore_factory()
{
	var url;
	if (confirm(_sure_restore))
	{
		top.reboot_seconds = 30;
		url='cmd.cgi?cmd_tag=factory_reset&group_tag=process&next_url=reboot.htm'/*tpa=http://192.168.100.2:8080/cmd.cgi?cmd_tag=factory_reset&group_tag=process&next_url=reboot.htm*/;
		location=url;
		//$.getScript(url);
	}
}

	
function removeSelfClass(){
	$("#dd-status", parent.document).removeClass("selected");
	$("#dd-alias", parent.document).removeClass("selected");
	$("#dd-datetime", parent.document).removeClass("selected");
	//$("#dd-media", parent.document).removeClass("selected");
	$("#dd-recordpath", parent.document).removeClass("selected");
	
	$("#dd-alarm", parent.document).removeClass("selected");
	$("#dd-mail", parent.document).removeClass("selected");
	$("#dd-ftp", parent.document).removeClass("selected");
	$("#dd-log", parent.document).removeClass("selected");
	
	$("#dd-ip", parent.document).removeClass("selected");
	$("#dd-ap", parent.document).removeClass("selected");
	$("#dd-wireless", parent.document).removeClass("selected");
	$("#dd-ddns", parent.document).removeClass("selected");
	
	
	$("#dd-ptz", parent.document).removeClass("selected");
	
	$("#dd-multidev", parent.document).removeClass("selected");
	$("#dd-user", parent.document).removeClass("selected");
	$("#dd-upgrade", parent.document).removeClass("selected");

}

