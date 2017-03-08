
// 모듈패턴 2 - 생성자를 생성하는 모듈


MYAPP.makeObjTree('MYAPP.utilities.array');

MYAPP.utilities.array = (function(){

    // 의존관계 선언
    var uobj = MYAPP.utilities.object,
        ulang = MYAPP.utilities.lang;

    // 비공개 프로퍼티
    var arrayString = "[object Array]",
        ops = Object.prototype.toString;

    // 비공개 메서드 추가
    var isArray = function(a){
        return ops.call(a) === arrayString;
    }

    var Constr;

    // 필요하면 일회선 초기화 절차 실행

    // 공개 API - 생성자함수
    Constr = function(o){
        this.elements = this.toArray(o);
    };

    Constr.prototype = {
        constructor : MYAPP.utilities.Array,
        version : "2.0",
        toArray: function(obj){
            for(var i =0;a=[],len=obj.length;i<len;i++){
                a[i] = obj[i];
            }
            return a;
        }
    }
    return Constr;
}());

var arr = new MYAPP.utilities.Array(obj)