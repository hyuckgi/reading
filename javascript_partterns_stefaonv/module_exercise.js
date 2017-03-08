
// 모듈패턴


// MYAPP 하위의 utilities.array를 만든다.
MYAPP.makeObjTree('MYAPP.utilities.array');

// 공개여부를 제한하기 위해 즉시실행함수로 비공개 유효범위를 만든다.
// 즉시실행함수는 모듈이 될 객체를 반환한다.
// 이 객체에는 모듈사용자에게 제공할 공개 인터페이스가 담기게 될 것이다.
MYAPP.utilities.array = (function(){
    // 즉시실행함수의 비공개 유효범위를 사용하면, 비공개 프로퍼티와 메서드를 마음껏 선언할 수 있다.

    // 모듈에 의존관계가 있다면 상단에 선언하라.
    var uobj = MYAPP.utilities.object,
        ulang = MYAPP.utilities.lang;

    // 비공개 프로퍼티
    var arrayString = "[object Array]",
        ops = Object.prototype.toString;

    // 비공개 메서드 추가
    var isArray = function(a){
        return ops.call(a) === arrayString;
    }

    // 필요하면 일회선 초기화 절차 실행

    // 공개 API
    return {
        inArray : function(needle, haystack){
            for(var i=0;i<haystack.length;i++){
                if(haystack[i] === needle){
                    return true;
                }
            }
        },
        isArray : isArray
        // etc
    };
}());
