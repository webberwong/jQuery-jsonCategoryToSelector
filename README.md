jsonCategoryTreeToSelect 插件
====================================
功能简述:<br>
将从服务端取到的分类数据生成select标签,并控制表单的值

### 依赖

* jquery 1.7+

### 使用说明
首先需要一个表单的标签来存放name值<br>
```html
<input type="text" name="cat_id" value="" />
```
初始化代码<br>
```js
$('input[name=cat_id]').jsonCategoryToSelector(opts);
```
插件首先会从提取数据链接的地址,向服务器请求数据,请求回数据后解析<br>
请求成功后,会将表单隐藏,生成select标签在原有的表单后面,<br>
select标签绑定事件,值改变后会将值传给原有的表单<br>

### 插件参数选项
```js
		//默认的参数
		var opts = {
            dataUrl : '/data/category.json',

            //显示的key值
            nameKey  : 'cat_name',
            //分类选项的值
            valueKey : 'id',
            //子分类的key值
            subKey   : '_child',
            //值是标识在标签的哪个属性里
            val_attr : 'value',
            //选择标签的样式名
            class_name : ''
        };
```

### 服务端返回的数据格式例子
```js
[
	{
		"id":"2",
		"cat_name":"PC\u7ad9",
		"pid":"0",
		"_child":[
			{
				"id":"3",
				"cat_name":"PHP\u7f51\u7ad9",
				"pid":"2"
			},
			{
				"id":"5",
				"cat_name":"Java\u7ad9",
				"pid":"2"
			}
		]
	},
	{"id":"4","cat_name":"\u624b\u673a\u7ad9","pid":"0"}
]
```
