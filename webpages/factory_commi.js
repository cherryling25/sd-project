//factory commissioning
//2018.12.13 qzhu
//
//
var local_access;
var local_seesion;
var value = {
	'factoryEmiss':'0',
	'factoryHumdi':'0',
	'factoryEmiTem':'0',
	'factoryEnvTem':'0',
	'factoryDista':'0',
	'factoryCorre':'0',
	'factory120a':'0',
	'factory120b':'0',
	'factory120Correa':'0',
	'factory120Correb':'0',
	'factory120Correc':'0',
	'factory400a':'0',
	'factory400b':'0',
	'factory400Correa':'0',
	'factory400Correb':'0',
	'factory400Correc':'0',
};

var valueBack = {
	'factoryEmiss':'0',
	'factoryHumdi':'0',
	'factoryEmiTem':'0',
	'factoryEnvTem':'0',
	'factoryDista':'0',
	'factoryCorre':'0',
	'factory120a':'0',
	'factory120b':'0',
	'factory120Correa':'0',
	'factory120Correb':'0',
	'factory120Correc':'0',
	'factory400a':'0',
	'factory400b':'0',
	'factory400Correa':'0',
	'factory400Correb':'0',
	'factory400Correc':'0',
};
var alias = {
	'factoryEmiss':'1',
	'factoryHumdi':'2',
	'factoryEmiTem':'3',
	'factoryEnvTem':'4',
	'factoryDista':'5',
	'factoryCorre':'6',
	'factory120a':'7',
	'factory120b':'8',
	'factory120Correa':'9',
	'factory120Correb':'10',
	'factory120Correc':'11',
	'factory400a':'12',
	'factory400b':'13',
	'factory400Correa':'14',
	'factory400Correb':'15',
	'factory400Correc':'16',
	'all':'0',
};

//sumbit
function sendFactoryParam(cmd,param)
{
	try{
		var url = 'set_param.cgi-&group_tag=hash_param.htm'/*tpa=http://192.168.100.2:8080/set_param.cgi?&group_tag=hash_param*/;
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
				return true;
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
				return false;
			}
        });
	 //location.reload();
	}catch(exception){
		return false;
	}
}

//get _params
function getFactoryParam(cmd,param)
{
	try{
		var url = 'set_param.cgi-&group_tag=hash_param_bridge.htm'/*tpa=http://192.168.100.2:8080/set_param.cgi?&group_tag=hash_param_bridge*/;
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
				analyParams(result,value);
				initAllParam();
				return true;
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				
				initAllParam();
				console.log(textStatus);
				return false;
			}
        });
	 //location.reload();
	}catch(exception){
		
		initAllParam();
		return false;
	}
	
}

//check buck
function getAllBUckElement(){

	valueBack['factoryEmiss'] = $('#factoryEmiss').val();
	valueBack['factoryHumdi'] = $('#factoryHumdi').val();
	valueBack['factoryEmiTem'] = $('#factoryEmiTem').val();
	valueBack['factoryEnvTem'] = $('#factoryEnvTem').val();
	valueBack['factoryDista'] = $('#factoryDista').val();
	valueBack['factoryCorre'] = $('#factoryCorre').val();

	valueBack['factory120a'] = $('#factory120a').val();
	valueBack['factory120b'] = $('#factory120b').val();
	valueBack['factory120Correa'] = $('#factory120Correa').val();
	valueBack['factory120Correb'] = $('#factory120Correb').val();
	valueBack['factory120Correc'] = $('#factory120Correc').val();

	valueBack['factory400a'] = $('#factory400a').val();
	valueBack['factory400b'] = $('#factory400b').val();
	valueBack['factory400Correa'] = $('#factory400Correa').val();
	valueBack['factory400Correb'] = $('#factory400Correb').val();
	valueBack['factory400Correc'] = $('#factory400Correc').val();
}

//get element
function getAllElement(){

	value['factoryEmiss'] = $('#factoryEmiss').val();
	value['factoryHumdi'] = $('#factoryHumdi').val();
	value['factoryEmiTem'] = $('#factoryEmiTem').val();
	value['factoryEnvTem'] = $('#factoryEnvTem').val();
	value['factoryDista'] = $('#factoryDista').val();
	value['factoryCorre'] = $('#factoryCorre').val();

	value['factory120a'] = $('#factory120a').val();
	value['factory120b'] = $('#factory120b').val();
	value['factory120Correa'] = $('#factory120Correa').val();
	value['factory120Correb'] = $('#factory120Correb').val();
	value['factory120Correc'] = $('#factory120Correc').val();

	value['factory400a'] = $('#factory400a').val();
	value['factory400b'] = $('#factory400b').val();
	value['factory400Correa'] = $('#factory400Correa').val();
	value['factory400Correb'] = $('#factory400Correb').val();
	value['factory400Correc'] = $('#factory400Correc').val();
}

/*
//check is or not number
function checkNonnumeric(ele){
	var ret = -1;
	
	if(ele == ''){
		return ret;
	}

	if(ele.match(/^\d+.?\d+$/) || ele.match(/^\d+$/)){
		ret = 0;
	}
	
	return ret;
}
*/

//check element
function checkAllElement(){

	for(var key in valueBack){
		if(checkNonnumeric(valueBack[key])<0){

			alert('输入数值错误，请重新输入！');
			return -1;
		}
	}

	return 0;
}

function getSumbitValue(id){
	var cmd,param = '',type = 0;

	//check valid
	getAllBUckElement();
	if(checkAllElement()<0){

		return -1;
	}
	//if valid ,save 
	getAllElement();
	
	switch(id){

		case 'factoryEmiss':

			type = alias['factoryEmiss'];
			break;

		case 'factoryHumdi':

			type = alias['factoryHumdi'];
			break;

		case 'factoryEmiTem':

			type = alias['factoryEmiTem'];
			break;

		case 'factoryEnvTem':

			type = alias['factoryEnvTem'];
			break;

		case 'factoryDista':

			type = alias['factoryDista'];
			break;

		case 'factoryCorre':

			type = alias['factoryCorre'];
			break;

		case 'factory120a':

			type = alias['factory120a'];
			break;

		case 'factory120b':

			type = alias['factory120b'];
			break;

		case 'factory120Correa':

			type = alias['factory120Correa'];
			break;

		case 'factory120Correb':

			type = alias['factory120Correb'];
			break;

		case 'factory120Correc':

			type = alias['factory120Correc'];
			break;

		case 'factory400a':

			type = alias['factory400a'];
			break;

		case 'factory400b':

			type = alias['factory400b'];
			break;

		case 'factory400Correa':

			type = alias['factory400Correa'];
			break;

		case 'factory400Correb':

			type = alias['factory400Correb'];
			break;

		case 'factory400Correc':

			type = alias['factory400Correc'];
			break;
			
		default:
			
			type = alias['all'];
			break;
	}

	cmd='factorySetParam';
	param = '&factoryEmiss=' + (value['factoryEmiss']*10) + '&factoryHumdi=' + (value['factoryHumdi']*10)
			+ '&factoryEmiTem=' + (value['factoryEmiTem']*10) + '&factoryEnvTem=' + (value['factoryEnvTem']*10)
			+ '&factoryDista=' + (value['factoryDista']*10) + '&factoryCorre=' + (value['factoryCorre']*10)
			+ '&factory120a=' + (value['factory120a']*10) + '&factory120b=' + (value['factory120b']*10)
			+ '&factory120Correa=' + (value['factory120Correa']*10) + '&factory120Correb=' + (value['factory120Correb']*10)
			+ '&factory120Correc=' + (value['factory120Correc']*10) + '&factory400a=' + (value['factory400a']*10)
			+ '&factory400b=' + (value['factory400b']*10) + '&factory400Correa=' + (value['factory400Correa']*10)
			+ '&factory400Correb=' + (value['factory400Correb']*10) + '&factory400Correc=' + (value['factory400Correc']*10);

	
	param += '&paramType=' + type;
	sendFactoryParam(cmd,param);

	return 0;
}

//init 
function initAllParam(){

		$('#factoryEmiss').val(parseInt(value['factoryEmiss'])/10);
		$('#factoryHumdi').val(parseInt(value['factoryHumdi'])/10);
		$('#factoryEmiTem').val(parseInt(value['factoryEmiTem'])/10);
		$('#factoryEnvTem').val(parseInt(value['factoryEnvTem'])/10);
		$('#factoryDista').val(parseInt(value['factoryDista'])/10);
		$('#factoryCorre').val(parseInt(value['factoryCorre'])/10);

		$('#factory120a').val(parseInt(value['factory120a'])/10);
		$('#factory120b').val(parseInt(value['factory120b'])/10);
		$('#factory120Correa').val(parseInt(value['factory120Correa'])/10);
		$('#factory120Correb').val(parseInt(value['factory120Correb'])/10);
		$('#factory120Correc').val(parseInt(value['factory120Correc'])/10);

		$('#factory400a').val(parseInt(value['factory400a'])/10);
		$('#factory400b').val(parseInt(value['factory400b'])/10);
		$('#factory400Correa').val(parseInt(value['factory400Correa'])/10);
		$('#factory400Correb').val(parseInt(value['factory400Correb'])/10);
		$('#factory400Correc').val(parseInt(value['factory400Correc'])/10);
	
}

//get all params
function getAllParam(){

	getFactoryParam('factoryGetParam','factory');
}

$().ready(function(e){
	showLoginName();
	getLogonStatus();
	getAllParam();

});

