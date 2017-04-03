# 기본

## javascript vs ECMAScript
* javascript : 프로그래밍 언어
* ECMAScript : 언어 명세에서 사용하는 이름

## 문과 표현식
> 자바스크립트 문법을 이해하려면 주요 문법적 카테고리인 문(statement)과 표현식(expression)을 알아야 한다.

### 문(statement)
* 문은 '동작'을 나타내며, 프로그램은 기본적으로 문의 연속이다.
> ex) var foo;

* 표현식은 값을 생성하며, 함수 매개변수와 할당문의 오른편 등을 말한다.
> ex) 3 * 7

* 자바스크립트는 식을 문으로 인정한다.
> ex) 3;

```javascript

    <!-- 문과 표현식의 차이점을 가장 잘표현한 if-then-else문 -->
    var x;
    if ( y >= 0 ) {
        x = y;
    } else {
        x = -y;
    }

    <!-- 표현식은 다음과 같다 -->
    var x = y >= 0 ? y : -y;

    <!-- 표현식은 함수 매개변수로 쓸수 있다 -->
    myFunction(y >= 0 ? y : -y);

    <!-- 문을 쓸 수 있는 곳에서는 표현식도 쓸 수 있다. -->
    <!-- 함수 호출도 표현식이다. -->
    foo(7, 1);

```

## 세미콜론
> 자바스크립트에서 세미콜론의 사용은 옵션이지만 항상 세미콜론을 쓰자.

```javascript

    <!-- 세미콜론의 함정 #1 -->
    return
    {
        name : 'John'
    }

    <!-- 세미콜론의 함정 #2 -->
    func()
    ['ul', 'ol'].foreach(function(t) {handleTag(t)})

```

> 세미콜론은 문은 끝내지만, 블록을 끝내지는 않는다. 블록 뒤에 세미콜론을 쓰는 경우는 함수표현식이 블록으로 끝나는 표현식일 경우 한가지 뿐이다. 이런 표현식을 문 마지막에 쓰면 그 다음에는 세미콜론은 쓴다.

```javascript

    var k = {abc: 'def'};
    var k = {abc: 'def'}

    <!-- 사실 블록 뒤에 세미콜론을 쓰는 경우는 없다. 본문에서 예를 든 것은 할당문이고 함수표현식의 중괄호는 블록이라기보다는 그냥 중괄호이다. -->

```

## 원시 값 vs 객체
> 자바스크립트는 값을 다소 모호하게 구분한다.

* 원시 값은 불리언, 숫자, 문자열, null, undefined
* 다른 값은 모두 객체

```javascript

    <!-- 각 객체는 고유하며, 엄격히 말해 그 자신과 일치한다 -->
    var obj1 = {};
    var obj2 = {};
    obj1 === obj2;   <!-- false -->
    obj1 === obj1;   <!-- true -->

    <!-- 원시 값은 값이 같으면 같다고 본다 -->
    var prim1 = 123;
    var prim2 = 123;
    prim1 === prim2;   <!-- true -->

```

### 원시 값
* 값(내용)으로 비교
* 항상 불변한다. 프로퍼티를 바꾸거나 추가하거나, 제거할 수 없습니다.

### 객체
* 유일성을 비교하며, 각 값은 모두 고유하여 참조로 비교한다.
* 일반적으로 프로퍼티를 자유롭게 추가, 변경, 제거할 수 있다.

## undefined와 null
* 값이 아닌 값
* undefined
    1. 초기화되지 않은 변수
    2. 생략된 매개변수
    3. 존재하지 않는 프로퍼티를 읽으려 할때
* null : '객체가 아니다'라는 뜻으로, 객체가 올 자리(매개변수, 객체 체인의 마지막 등)에 '값 아닌 값'으로 사용

> undefined와 null에는 프로퍼티도 없고 toString()같은 표준 메서드도 없다.

### undefined인지 null인지 체크

```javascript

    if ( x === undefined || x === null ) {
        ...
    }

    or
    <!-- undefined와 null을 모두 false로 본다는 점을 활용 -->
    if (!x) {
        ...
    }

```
> false, 0, NaN, '' 도 모두 false로 취급한다.

### 참 같은 값, 거짓 같은 값
> 자바스크립에서는 불리언 값을 받는다고 예상하는 곳(if문의 조건절 등)에는 어떤 겂이든 쓸 수 있으며, 제공된 값은 true나 false로 해석된다.

* false로 해석되는 값
    1. undefined, null
    2. 불리언 : false
    3. 숫자 : -0, NaN
    4. 문자열 : ''

## typeof와 instanceof를 통한 값 분류
> 값을 분류하는 연산자는 모두 2가지 이다. typeof는 주로 원시 값에 사용하고 instanceof는 객체에 사용한다.

```javascript

    typeof undefined  <!-- 'undefined' -->
    typeof null   <!-- 'object' -->
    typeof 'abc'  <!-- 'string' -->

    <!-- typeof null이 'object'를 반환하는 건 수정할 수 없는 버그이다. 물론 null은 객체가 아니다 -->

```

```javascript

    {} instanceof Object  <!-- true -->
    [] instanceof Array   <!-- true -->
    undefined instanceof Object  <!-- false -->
    null instanceof Object  <!-- false -->

```

## 2항 논리 연산자
> 자바스크립트의 2항 논리 연산자는 단축평가(쇼트 서킷 - short circuit), 즉 on/off 식이다.

* And(&&) : 첫번째 피연산자가 '거짓같은 값'이면 첫번째 피연산자를 반환하고, 그렇지 않으면 두번째 피연산자를 반환
* Or(||) : 첫번째 피연산자가 '참 같은 값'이면 첫번째 피연산자를 반환하고, 그렇지 않으면 두번째 피연산자를 반환


## 숫자
> 자바스크립트의 숫자는 모두 부동소수점형 숫자이다.

```javascript

    1 === 1.0;   <!-- true -->

```

* NaN(Not a Number) : 에러 값

```javascript

    Number('xyz');   <!-- NaN -->

```

* Infinity : 에러로 생긴 값일 때가 많다.

```javascript

    3/0   <!-- Infinity -->

    <!-- Infinity는 NaN을 제외한 어떤 숫자보다 크고, -Infinity는 NaN을 제외한 어떤 숫자보다 작다 -->
    <!-- 이런 성질을 응용해서 기본 값(최소값, 최대값 등)으로 쓸 때가 있다. -->

```

## 문자열
> 문자열은 문자열 리터럴을 통해 바로 만들 수 있으며, 문자열 리터럴은 따옴표로 구분한다. 역슬래시는 몇 가지 문자를 이스케이프해 제어문자(control character)를 만든다.

> 다른 원시값과 마찬가지로 문자열도 불변이다. 문자열을 바꿀때는 새 문자열이 생성되어 기존 문자열을 대체한다.

### 문자열 연산
> 문자열은 + 연산자로 합친다. + 연산자는 피연산자 중 하나가 문자열이면 다른 피연산자도 문자열로 바꿔서 합친다.
> 문자열을 단계적으로 합칠 때 += 연산자를 사용할 수 있다.

## 문

### 조건문
> while문의 case 다음의 '피연산자'에는 어떤 표현식이든 써도 된다. 이 표현식을 평가한 결과와 ===을 사용한 switch의 매개변수를 비교한다.

## 함수

### 함수선언

```javascript

    function add(param1, param2) {
        return param1 + param2;
    }

```

### 함수 표현식

```javascript

    var add = function (param1, param2) {
        return param1 + param2;
    };

    <!-- 함수 표현식은 값을 반환하므로 매개변수로서 다른 함수에 직접 전달될 수 있다 -->
    someFunction(function(p1, p2) { ... });

```

### 함수 hoisting
> 자바스크립트는 해당 scope에서 함수 선언을 가장 먼저 처리하는데, 이런 특징을 hoisting이라고 한다.

```javascript

    function foo() {
        bar();    <!-- hoisting으로 선언하기전에 참조할 수 있다 -->
        function bar(){
            ...
        }
    }

    <!-- var 선언역시 끌어올려지지만 할당은 그렇지 않다.
    function foo() {
        bar();    <!-- 불가능, Uncaught TypeError: bar is not a function, bar는 undefined 이다 -->
        var bar = function(){
            ...
        }
    }


```

### arguments를 배열로 변환

```javascript

    function toArray(arrayLikeObject) {
        return Array.prototype.slice.call(arrayLikeObject);
    }

```

## 변수의 스코프와 클로저
> var문 하나에서 변수를 여러개 선언하고 초기화할 수도 있다.
> 하지만 문 하나당 변수 하나만 선언하길 권한다. 왜냐하면 행을 삽입 및 삭제하거나 재배열하기가 편하며, 자동으로 정확히 들여 써지는 장점이 있다.


### 클로저
> 모든 함수는 자신이 들어있는 스코프에 들어 있던 변수와 연결되며, 해당 함수가 그 스코프를 떠나더라도 연결은 유지된다.

```javascript

    function createIncrementor(start) {
        return function() {  <!-- 자신이 생성된 콘텍스트를 떠나지만, start와는 계속 연결된다 -->
            start++;
            return start;
        }
    }

    var inc = createIncrementor(5);

    inc()  <!-- 6 -->
    inc()  <!-- 7 -->

```
> 클로저는 이렇게 자신의 스코프에 존재하던 변수와 연결된 함수이다. 즉 createIncrementor()는 클로저를 반환한다.


### IIFE(Immediately Invoked Function Expression) : 새 스코프 도입
> 어떤 변수가 전역변수가 되지 않게 하기 위해, 이따금 새 변수 스코프가 필요할때 자바스크립트에서는 블록으로 변수 스코프를 생성할 수 없고 반두시 함수를 써야 하는데 함수를 블록처럼 사용하는 패턴을 즉시실행함수(IIFE)라고 한다.
