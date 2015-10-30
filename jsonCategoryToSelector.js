/**
 * json无限级分类数据转换成选择标签插件
 * 配合oneThink里的list_to_tree方法
 * @depends jQuery 1.7+
 * @author Hwl<weigewong@gmail.com>
 */
;(function($){
    $.fn.jsonCategoryToSelector = function(options){
        var _this = this;
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
            class_name : '',
            //无值的选项
            defaultOpt : {
                name  : '--请选择分类--',
                value : 0,
                show  : 1
            }
        };

        opts = $.extend(opts,options);
        var cur_val = getValue();
        var $select = $('<select></select>');

        $select.addClass(opts.class_name);

        /**
         * 生成select标签
         */
        function generateView(){
            $.ajax({
                url : opts.dataUrl,
                success : function(data){
                    _this.hide();
                    //如果显示无选项的值
                    if(opts.defaultOpt.show){
                        $opt = $('<option></option>');
                        $opt.val(opts.defaultOpt.value);
                        $opt.html(opts.defaultOpt.name);
                        $select.append($opt);
                    }
                    generateOptions(data,0);
                    _this.after($select);
                    $select.off('change').on('change',function(){
                        setValue($(this).val())
                    });
                }
            });
        }

        /**
         * 生成选项
         * @param data
         * @param level
         */
        function generateOptions(data,level){
            var len = data.length;
            level = isNumber(level) ?  level : 0;

            for(var i = 0; i < len; i++){
                var $opt = $('<option></option>');
                var _val = data[i][opts.valueKey];
                $opt.html(str_pad('','&nbsp;',level) +  data[i][opts.nameKey]).val(_val);
                if(cur_val == _val){
                    $opt.attr('selected','selected');
                }
                $select.append($opt);
                if(data[i][opts.subKey]){
                    generateOptions(data[i][opts.subKey],level + 1);
                }
            }
        }

        /**
         * 字符填充
         * @param str
         * @param char
         * @param len
         * @returns {*}
         */
        function str_pad(str,char,len){
            var str_len = str.length;
            var dif_len = len - str_len;
            if(dif_len > 0){
                for(var i = 0; i < dif_len; i++){
                    str += char;
                }
            }
            return str;
        }

        /**
         * 判断是不是数字类型
         * @param value
         * @returns {boolean}
         */
        function isNumber(value){
            return typeof(value) == 'number' ? true : false;
        }

        /**
         * 获取表单的值
         * @returns {*}
         */
        function getValue(){
            if( _this.is('input') || _this.is('textarea') ){
               return _this.val();
            }else{
                return _this.attr(opts.val_attr);
            }
        }

        /**
         * 设置表单的值
         * @param value
         */
        function setValue(value){
            if( _this.is('input') || _this.is('textarea') ){
                    _this.val(value);
                    return;
            }else{
                _this.attr(opts.val_attr,value);
                return;
            }
        }

        //生成视图
        generateView();

        return _this;
    }
})(jQuery);