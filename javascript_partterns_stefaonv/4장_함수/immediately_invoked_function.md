# 함수

## 즉시 실행 함수
> 즉시 실행 함수(immediately invoked function)은 함수가 선언되자마자 실행되도록 하는 문법이다.

```javascript

    (function(){
        <!-- code -->
    }());  <!-- JSLint는 실행()를 안에 넣는 패턴을 선호한다 -->

```

### 즉시 실행 함수의 구성
* 함수를 함수 표현식으로 선언한다. (함수 선언문으로는 동작하지 않는다)
* 함수가 즉시 실행될 수 있도록 마지막에 괄호쌍을 추가한다.
* 전체 함수를 괄호로 감싼다 (함수를 변수에 할당하지 않을 경우에만 필요하다)

> 이 패턴은 초기화 코드의 유효범위 샌드박스(sandbox)를 제공한다는 점에서 유용하다. 모든 코드를 지역 유효범위로 감싸고 어떤 변수도 전역 유효범위로 새어나가지 않게 한다.

```javascript

    (function () {
        var days = ['sun', "mon", 'tue', 'wed' ...],
            today = new Date(),
            msg = 'Today is ' + days[today.getDay()] + ', ' + today.getDate();

        console.log(msg);
    }());

    <!-- 즉시 실행 함수가 아니었다면 days, today, msg 는 전역변수가 되었을 것이다 -->

```

### 즉시 실행 함수의 반환 값

```javascript

    <!-- 원형 -->
    var result = (function () {
        return 2 + 2;
    }());

    <!-- 반환값으로 사용할때는 감싼 ()를 생략해도 되지만 일관성을 유지하기 위해 넣어준다 -->
    var result = function () {
        return 2 + 2;
    }();

    <!-- 감싼 () 밖에 실행 () -->
    var result = (function () {
        return 2 + 2;
    })();

```

* 즉시 실행 함수의 유효범위를 사용해 특정 데이터를 비공개 상태로 저장하고 반환되는 내부함수에서만 접근하도록 할 수 있다.

```javascript

    <!-- closure와 함께 사용 -->
    var getResult = (function () {
        var res = 2 + 2;
        return function() {
            return res;
        };
    }());

```
* 객체의 프로퍼티를 정의할 때
    - 객체의 프로퍼티가 생명주기 동안에는 값이 변하지 않고
    - 처음에 값을 정의할 때는 적절한 계산을 위한 작업이 필요

```javascript

    var o = {
        message: (function () {
            var who = 'me',
                what = 'call';
            return what + ' ' + who;
        }()),
        getMsg: function () {
            return this.message;
        }
    };

    o.getMsg(); <!-- call me -->
    o.message; <!-- call me -->

    <!-- o.message는 함수가 아닌 문자열 프로퍼티이지만 값을 정의하려면 함수가 필요하다. 즉시실행 함수를 사용하면 스크립트가 로딩될 때 실행되어 프로퍼티를 정의한다 -->

```
