//2018.10.12 qzhu
//登陆界面相关代码
//跳转主页面
var douLoad = true;

var ADMIN_LOADING = 0;
var OPTION_LOADING = 1;

var LOADING_SYSTEM_ERROR = 0;
var LOADING_NAME_ERROR = 1;
var LOADING_PSW_ERROR = 2;
var LOADING_ADMIN_CONF = 3;
var LOADING_OPTION_CONF = 4;

var login = {};
var access = 0;

function save_sesson_cookie(){
	if((typeof login['session_id'] != 'undefined') && (typeof login['access'] != 'undefined')){
		setcookie('jaccess',login['access'],0);
		setcookie('jsession_id',login['session_id'],0);
	}
}

//admin登录成功
function jumpToAdminPage(){
	save_sesson_cookie();
	window.location = 'temp_messure.htm'/*tpa=http://192.168.100.2:8080/temp_messure.htm*/;
}

//option登录成功
function jumpToOptionPage(){
	save_sesson_cookie();
	window.location = 'factory_commi.htm'/*tpa=http://192.168.100.2:8080/factory_commi.htm*/;
}
//cookie及错误处理
function loading_process(params){

	if(analyParams(params,login)>=0){
		
		if(typeof login['answer'] != 'undefined'){
			
			if(login['answer'].indexOf(LOADING_ADMIN_CONF)>-1)
				jumpToAdminPage();
			else if(login['answer'].indexOf(LOADING_OPTION_CONF)>-1)
				jumpToOptionPage();
			else if(login['answer'].indexOf(LOADING_PSW_ERROR)>-1)
				alert('登录密码错误！');
			else if(login['answer'].indexOf(LOADING_NAME_ERROR)>-1)
				alert('登录账号错误！');
			else
				alert('系统错误！');
		}else
			alert('系统错误！');
		
	}else
		alert('系统错误！');
}

//检验登录信息是否合乎规范
function checkMessage(){
	var ret = '';
	var textName = $("#loadName").val();
	var textPwd = $("#loadPwd").val();
	var access = 0;
	
	if(textName.match(/\W/)!=null || textName=='' || textName.length>20 || textName.length<4){
		
		$("#nameRemind").show();
		$("#nameRemind").text(_nameRemind);
		return ret;
	}else if(textPwd == ''){
		//$("#pwdRemind").show();
		$("#nameRemind").show();
		$("#nameRemind").text(_pswRemind);
		return ret;
	}
	
	ret = '&name='+textName+'&password='+encodeURIComponent(textPwd);

	if(textName == 'adimin')
		access = ADMIN_LOADING;
	else if(textName == 'option')
		access = OPTION_LOADING;

	ret += '&access=' + access;
	
	return ret;
}


//提交登录信息
function sendLoadParam(cmd,param)
{
	try{
		var url = 'set_param.cgi?&group_tag=hash_param_bridge.htm'/*tpa=http://192.168.100.2:8080/set_param.cgi?&group_tag=hash_param_bridge*/;
		url+='&set_cmd='+cmd;
		url+='&length='+param.length;
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
				loading_process(result);
				return true;
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
				setTimeout(submitMessage,3000);	//设置重复时间。
			//	submitMessage();
				return false;
			}
			   
        });
	 //location.reload();
	}catch(exception){
		console.log(exception);
		return false;
	}
}

//将登录信息提交
function submitMessage(){
	var cmd='loading';
	var value = checkMessage();
	
	if(value != ''){
		//cookie
		saveAutoLoad();
		//submit
		sendLoadParam(cmd,value);
	}
}
//将div做出按钮效果，当鼠标滑过时，颜色变化
function addSubmitEvent(){
	$("#loadSubmit").hover(function(){
		
		$("#loadSubmit").css('background','#ccc');
		
	},function(){
		
		$("#loadSubmit").css('background','#eee');
		
	}).click(function(){
		
		submitMessage();
		
	});
}

//按下enter键时，提交登陆信息
function enterKeyLoading(){
	$(document).keydown(function(e){
		if(e.keyCode == 13){
			submitMessage();
		}
	});
}


//当焦点在输入框时，提醒文字变淡。当用户输入字符时，删除提醒文字，当用户取消输入文字时，回复提醒文字
/*
function addInputEvent(){
	$("#loadName").focus(function(){
		//$("#loadName").css('border-style','none').next("label").hide();
		$("#nameRemind").hide();
	}).blur(function(){
		if($("#loadName").val() == ''){
			$("#loadName").css('color','000');
		}
		//$("#loadName").next("label").css('color','#999');
	});
	$("#loadPwd").focus(function(){
		//$("#loadPwd").next("label").hide();
		$("#nameRemind").hide();
	}).blur(function(){
		//$("#loadPwd").next("label").css('color','#999');
		if($("#loadPwd").val() == ''){
			$("#loadPwd").css('color','000');
		}
	});
	$("#loadName").keydown(function(){
		//$("#loadName").css('color','000').next("label").hide();
	}).keyup(function(e){
		if($("#loadName").val() == ''){
			//$("#loadName").next("label").show();
		}
	});
	$("#loadPwd").keydown(function(){
		//$("#loadPwd").css('color','000').next("label").hide();
	}).keyup(function(e){
		if($("#loadPwd").val() == ''){
			//$("#loadPwd").next("label").show();
		}
	});
}
*/
//当前登陆信息
function addAccessEvent(){
	var option = $("#optionAccess");
	$("#optionAccess").click(function(e){
		$("#optionAccess").css('background','#ccc');
		$("#optionAccess").attr('name','active');
		$("#adminAccess").css('background','#eee');
		$("#adminAccess").attr('name','disabled');
	});
	$("#adminAccess").click(function(e){
		$("#optionAccess").css('background','#eee');
		$("#optionAccess").attr('name','disabled');
		$("#adminAccess").css('background','#ccc');
		$("#adminAccess").attr('name','active');
	});
}

//将用户信息保存在cookie
function saveAutoLoad(){
	var che = $("#autoLoad").attr('checked');
	if(che){
		var name = $("#loadName").val();
		var psw = $("#loadPwd").val();
		$.cookie('name',name,{expires: 7});
		$.cookie('password',psw,{expires: 7});
		$.cookie('check','true',{expires: 7});
	}else{
		$.cookie('name','',{expires: -1});
		$.cookie('password','',{expires: -1});
		$.cookie('check','false',{expires: -1});
	}
}
//初始化用户信息
function getAutoLoad(){
	if($.cookie('check') == 'true'){
		$("#autoLoad").attr('checked','checked');
		$("#loadName").val($.cookie('name'));
		$("#loadPwd").val($.cookie('password'));
		if($("#loadName").val() != ''){
			$("#loadName").css('color','000');
		}
		if($("#loadPwd").val() != ''){
			$("#loadPwd").css('color','000');
		}
	}else{
		$("#loadName").val('');
		$("#loadPwd").val('');
	}
}
var obj={};
//初始函数
$().ready(function(e){
	analyParams('&abc=1;&qingbai=ikng;',obj);
	enterKeyLoading();
	addSubmitEvent();
	addAccessEvent();
	//addInputEvent();
	getAutoLoad();
});
