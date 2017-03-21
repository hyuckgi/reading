# 함수

## 함수 프로퍼티 - Memoization 패턴
> 함수에 프로퍼티를 추가하여 결과(반환 값)를 캐시하면 다음 호출 시점에 복잡한 연산을 반복하지 않을 수 있다. 이런 방법을 메모이제이션 패턴이라고 한다.

```javascript

    var myFunc = function (param) {
        if(!myFunc.cache[param]){
            var result = {};
            <!-- 비용이 많이 드는 수행 -->
            myFunc.cache[param] = result;
        }
        return myFunc.cache[param];
    };

    <!-- 캐시 저장 공간 -->
    myFunc.cache = {};


    <!-- 여러개의 매개변수를 받을 때는 매개변수를 직렬화 한다.-->
    var myFunc = function () {
        var cacheKey = JSON.stringify(Array.prototype.slice.call(arguments)),
            result;

        if(!myFunc.cache[cacheKey]){
            var result = {};
            <!-- 비용이 많이 드는 수행 -->
            myFunc.cache[cacheKey] = result;
        }
        return myFunc.cache[cacheKey];
    };

    <!-- 캐시 저장 공간 -->
    myFunc.cache = {};

    <!-- 단, 직렬화하면 객체를 식별할 수 없게 된다. 같은 프로퍼티를 가지는 두 개의 다른 객체를 직렬화하면 이 두 객체는 같은 캐시 항목을 공유한다-->

```
