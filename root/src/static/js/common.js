/**
 * 公用方法库
 * Created By xia0zj at 2014/10/28
 */

/**
 * 获取地址栏参数
 * @param  {string} name 参数名
 * @return {string}
 */
function getUrlQuery(name) {
    var params = {};
    var arr = window.location.search.substr(1).split('&');
    for (var i=0; i<arr.length; i++) {
        params[arr[i].split("=")[0].toLowerCase()] = arr[i].split("=")[1];
    }

    // 利用惰性函数避免每次都重新生成params对象
    getUrlQuery = function(name) {
        return params[name.toLowerCase()] || "";
    }
    return params[name.toLowerCase()] || "";
};

/**
 * 获取图片物理尺寸
 * @param  {string}   url      图片地址
 * @param  {Function} callback 回调方法
 * @return {array}             宽高组成的数据
 */
function getImageSize(url, callback) {
    if ( !url ) return;
    var img = new Image();
    img.src = url;

    function _return() {
        if ( typeof(callback) === "function") {
            callback(img.Width, img.Height);
        }
        return [img.Width, img.Height];
    }

    var check = function() {
        if (img.Width > 0 || img.Height > 0 ) {
            clearInterval(timer);
            _return();
        }
    }

    var timer = setInterval(check, 40);

    img.onload = function() {
        _return();
    }
}

/**
 * 图片上传预览
 * @param  {DOM} input 上传控件
 * @param  {DOM} img   预览控件
 * @return {   }
 */
function previewImage(input, img) {
    if ( window.FileReader ) {
        if ( input.files && input.files[0] ) {
            var reader = new FileReader();
            reader.onload = function(e) {
                img.src = e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
        }
    } else {
        img.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = input.value();
    }
}

(function($) {
    /**
    * TAB切换效果
    * @param  {string} trigger 切换方式click或mouseenter
    * @param  {selector} navItemSelector 事件触发对象选择器
    * @param  {selector} contentItemSelector 内容主体对象选择器
    * @param  {int} beginIndex 默认显示第几个
    * @return {}
    */
    $.fn.tab = function(option) {
        return this.each(function() {
            var opts = $.extend({}, {
                trigger             : "click",
                navItemSelector     : ".tab-nav-items li",
                contentItemSelector : ".tab-content-item",
                navItemActiveClass  : "active",
                beginIndex          : 0
            }, option || {});

            var $container    = $(this);
            var $navItems     = $container.find(opts.navItemSelector);
            var $contentItems = $container.find(opts.contentItemSelector);

            if (!$container.length) return;
            if ($container.data("tabid")) return;

            $container.data( "tabid", (new Date()).getTime() );

            var _handler = function() {
                var _this = arguments[0].type ? $(this) : $navItems.eq(arguments[0]);
                if ( _this.hasClass( opts.navItemActiveClass ) ) return;

                var index = $navItems.index(_this);
                var target = _this.data("target") ? $(_this.data("target")) : $contentItems.eq(index);

                $navItems.removeClass(opts.navItemActiveClass);
                $contentItems.addClass("hide").hide();

                _this.addClass(opts.navItemActiveClass);
                target.removeClass("hide").show();

                return false;
            }

            $container.on(opts.trigger, opts.navItemSelector, _handler);

            _handler(opts.beginIndex);
        });
    };

    $(function() {
        var $tab = $(".J_Tab[data-toggle='tab']");
        if ( $tab.length ) {
            $tab.each(function() {
                var $this = $(this);
                $this.tab({
                    trigger             : $this.data("trigger"),
                    navItemSelector     : $this.data("nav"),
                    contentItemSelector : $this.data("content"),
                    navItemActiveClass  : $this.data("active"),
                    beginIndex          : $this.data("begin")
                });
            });
        }
    });
    /**
     * IE7、8、9文本框占位符
     * @param  {fontsize} option 占位符文本大小
     * @param  {fontcolor} option 占位符文本颜色
     * @return {}
     */
    $.fn.inputPlaceHolder = function(option) {
        var setting = {
            fontsize : "12px",
            fontcolor : "#ccc"
        };
        return this.each(function(i) {
            var isPlaceholderSupport = "placeholder" in document.createElement("input");
            if ( isPlaceholderSupport ) return;

            var $this = $(this);
            var t = $this.attr("placeholder");
            if ( !t ) return;

            var opts = $.extend({}, setting, option);

            var _l = $this.offset().left;
            var _t = $this.offset().top;
            var $placeholder = $("<div>" + t + "</div>").css({
                "position" : "absolute",
                "left" : parseInt(_l) + 5,
                "top" : _t,
                "height" : $this.outerHeight() + "px",
                "line-height" : $this.outerHeight() + "px",
                "width" : $this.width(),
                "overflow" : "hidden",
                "color" : opts.fontcolor,
                "font-size" : opts.fontsize
            }).appendTo($("body"));

            $this.bind({
                focus : function() {
                    $placeholder.hide();
                },
                blur : function() {
                    if (!$.trim($this.val())) $placeholder.show(); // 失去焦点时判断是否有输入，没有则恢复TIPS
                },
                keyup : function() {
                    if (!!$.trim($this.val())) $placeholder.hide();
                }
            });
            $placeholder.bind("click focus", function() {
                $this.focus(); // 解决IE点击TIPS时文本框未获得焦点
            });
        });
    };
})(jQuery);
