/*任务描述
参考以下示例代码，用户输入城市名称和空气质量指数后，点击“确认添加”按钮后，就会将用户的输入在进行验证后，添加到下面的表格中，新增一行进行显示
用户输入的城市名必须为中英文字符，空气质量指数必须为整数
用户输入的城市名字和空气质量指数需要进行前后去空格及空字符处理（trim）
用户输入不合规格时，需要给出提示（允许用alert，也可以自行定义提示方式）
用户可以点击表格列中的“删除”按钮，删掉那一行的数据*/
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var city=document.getElementById('aqi-city-input');
var index=document.getElementById('aqi-value-input');
var btn=document.getElementById('add-btn');
var table=document.getElementById('aqi-table');
var txt1,txt2;
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
var reg1=/^[\u4e00-\u9fa5a-zA-Z]+$/;
	var reg2=/^[0-9]+$/;
function addAqiData() {
	txt1=city.value.trim().match(/^[\u4e00-\u9fa5a-zA-Z]+$/);
	txt2=index.value.trim().match(/^[0-9]+$/);
	if(txt1!=undefined&&txt2!=undefined){
		aqiData[txt1]=txt2;	
	}else{alert('格式错误');}
}

/**
 * 渲染aqi-table表格
 */
 
function renderAqiList() {
	table.innerHTML='<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
	for(var i in aqiData){
		table.innerHTML+="<tr><td>"+i+"</td><td>"+aqiData[i]+"</td><td><button>删除</button></td></tr>";
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();

}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  delete aqiData[city];
  renderAqiList();
}

function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  btn.onclick=addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  table.onclick=function(e){
  	if(e.target.nodeName=='BUTTON'){
  		var delcity=e.target.parentNode.parentNode.firstChild.innerHTML;
  		delBtnHandle(delcity);
  	}
  };
}

init();