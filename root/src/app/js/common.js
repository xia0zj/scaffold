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
