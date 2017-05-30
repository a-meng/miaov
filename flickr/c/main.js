(function () {
    var Maybe = function (v) {
        this.__vlaue = v;
    };
    Maybe.of = v => new Maybe(v);

    Maybe.prototype.map = function (f) {
        return Maybe.of(f(this.__value));
    };


    window.ImgList=function (target) {


        return {
            fetch(url){

            }
        }
    }
})();