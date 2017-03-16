# 리터럴과 생성자

## 배열 리터럴

```javascript

    <!-- 세 개의 원소를 갖는 배열 -->
    <!-- 내장 Array 생성자로 배열 생성 //안티패턴 -->
    var a = new Array("itsy", "bitsy", "spider");

    <!-- 권장패턴 -->
    var a = ["itsy", "bitsy", "spider"];

```
> new Array()는 인자로 숫자를 전달할 경우 배열의 길이를 지정한다.
> 뿐만 아니라 부동소수점을 전달하면 RangeError가 발생한다.

### 배열인지 판별하는 방법

* `isArray()` 사용
```javascript
    Array.isArray([]);
```

* `Object.prototype.toString()` 사용
```javascript
    if(typeof Array.isArray === "undefined"){
        Array.isArray = function(arg) {
            return Object.prototype.toString.call(arg) === "[Object Array]";
        };
    }
```

## ETC

### JSON
> JSON(javascript Object Notation)은 데이터 전송형식의 일종이다.

* `JSON.parse()`와  `JSON.stringify()` ES5부터 지원한다.

### 원시데이터 타입 래퍼
> 자바스크립트에는 숫자, 문자열, 불린, null, undefined의 다섯가지 원시데이터 타입이 있다. null과 undefined를 제외한 나머지 세 개는 원시 데이터 타입 래퍼라 불리는 객체를 가지고 있다. 이 래퍼 객체는 각각 내장 생성자인 Number(), String(), Boolean()을 사용하여 생성된다.

```javascript
    <!-- 원시 데이터 타입 숫자 -->
    var n = 100;
    console.log(typeof n);  <!-- number -->

    <!-- 숫자객체 -->
    var nobj = new Number(100);
    console.log(typeof nobj);  <!-- object -->

    <!-- 원시데이터타입은 객체는 아니자만 래퍼객체의 메서드를 활용할 수 있다. 메서드를 호출하는 순간 내부적으로는 원시 데이터 타입 값이 객체로 임시 변환되어 객체처럼 동작한다. -->
```
> 그러나 값을 확장하거나 상태를 지속시키기위헤 래퍼객체를 쓰는 경우도 있다.
> 원시 데이터 타입은 객체가 아니기 때문에 프로퍼티를 추가하여 확장할 수가 없다.

```javascript

    <!-- 원시 데이터 타입 문자열 -->
    var greet = "Hello there";

    <!-- split() 메서드를 쓰기위해 원시 데이터 타입이 객체로 변환된다 -->
    greet.split(' ')[0];  <!-- Hello -->

    <!-- 원시 데이터 타입에 확장을 시도할 경우 에러는 발생하지 않지만 동작하지도 않는다 -->
    greet.smile = true;
    typeof greet.smile;   <!-- undefined -->

    <!-- new String()으로 생성했다면 smile프로퍼티는 생성되었을 것이다 -->
    <!-- new 를 쓰지 않으면 래퍼생성자가 인자를 원시데이터 타입으로 변경한다.-->
```

## Error 객체
> 자바스트립트에는 Error(), SyntaxError(), TypeError() 등 여러가지 에러 생성자가 내장되어 있으며 throw 문과 함께 사용된다.

* name : 객체를 생성한 함수릐 name 프로퍼티. 범용적인 "Error" 일수도 있고, "RangeError"와 같이 좀더 특화된 생성자 일 수도 있다.

* message : 객체를 생성할 때 생성자에 전달된 문자열

```javascript
    try {
        <!-- 에러를 발생시킨다. -->
        throw {
            name: 'MyErrorType',  <!-- 임의의 에러타입 -->
            message: 'oops',
            extra: 'This was rather embarrassing',
            remedy: genericErrorHandler  <!-- 에러를 처리할 함수 -->
        };
    } catch (e) {
        <!-- 사용자에게 공지한다 -->
        alert(e.message); <!-- oops -->

        <!-- 훌륭하게 에러를 처리한다 -->
        e.remedy(); <!--genericErrorHandler() 호출-->
    }
