/**
 * @name 防抖函数
 * @author wangchong
 * @param handler 参数函数
 * @param time 时间
 * @param reset 剩余参数 为执行函数的参数。
 */
;(function(w,undefined){
    function debounce(handler, time) {
        var timer = null;
        var _self = this;
        var args = [].slice.call(arguments,2); 
        var drag = true;
        return function(e){
            if(drag) {
                args.unshift(e);
                drag = false;
            }
            clearTimeout(timer);
            timer = setTimeout(function(){
                handler.apply(_self, args);
            }, time);
            if(e.target.value ==''){
                clearTimeout(timer);
            }
        }
    }
    w.debounce = debounce;
}(window));

/**
 * @name 节流函数
 * @author wangchong
 * @param handler 参数函数
 * @param time 节流时间
 */
(function(w,undefined){
    function throttle(handler,time){
        var lastTime = 0; 
        var _self = this;
        var args = [].slice.call(arguments,2);
        return function(){
            var nowTime = new Date().getTime();
            if(nowTime - lastTime >time){
                handler.apply(_self,args);
                lastTime = nowTime;
            }
        }
    }
    w.throttle = throttle;
}(window))