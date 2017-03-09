# 함수

## 함수 개요
> 자바스크립트는 함수를 다양한 방법으로 사용한다. 따라서 함수를 완벽히 익히는 것은 자바스크립트 개발자에게 필수 기술이다. 다른 언어에서는 별도의 문법으로 처리하는 다양한 작업들을 자바스크립트에서는 함수가 실핼한다.


### 함수의 특징
* 자바스크립트의 함수는 일급 객체(first-class)이다.
* 함수는 유효범위(scope)를 제공한다.
* 런타임, 즉 프로그램 실행중에 동적으로 생성할 수 있다.
* 변수에 할당할 수 있고, 다른변수에 참조를 복사할 수 있으며, 확장가능하고 몇몇 특별한 경우를 제외하면 삭제할수 있다.
* 다른 함수의 인자로 전달할 수 있고, 다른 함수의 반환값이 될 수 있다.
* 자기자신의 프로퍼티와 메서드를 가질수 있다.


### 용어 정리
* 기명 함수 표현식
```javascript
    var add = function add(a, b) {
        console.log(add.name);
        return a + b;
    };
```
* 함수 표현식(또는 무명 함수 표현식, 익명 함수)
```javascript
    var add = function (a, b) {
        return a + b;
    };
    <!-- 책에서는 익명과 기명의 차이를 함수의 name프로퍼티에 있다고 했는데 익명도 name프로퍼티가 비어있지 않고 변수로 받은 이름이 있더라 -->
    <!-- 고로 표현식에서 기명은 재귀함수때 사용하자 -->
```
* 함수선언문
```javascript
    function add(a, b) {
        return a + b;
    }
```
> 함수 리터럴이라는 용어도 자주 사용되지만 이 용어는 함수표현식을 뜻할 수도 있고, 기명 함수 표현식을 뜻할 수도 있다. 따라서 애매한 표현이다.

### 함수 선언문 vs 함수표현식
> 함수표현식을 사용하면 다른 객체들과 마찬가지로 객체의 일종이며 어떤 특별한 언어 구성요소가 아니라는 사실이 좀더 드러난다.
> 함수표현식을 선호하라

```javascript

    <!-- 함수 표현식을 callMe 함수의 인자로 전달한다 -->
    callMe(function (){
        <!-- 이 함수는 무명 함수(익명 함수) 표현식이다 -->
    });

    <!-- 기명 함수 표현식을 callMe 함수의 인자로 전달한다 -->
    callMe(function me(){
        <!-- 이 함수는 'me'라는 기명 함수 표현식이다 -->
    });

    <!-- 함수 표현식을 객체의 프로퍼티로 저장한다. -->
    var myobject = {
        say: function () {
            <!-- 이 함수는 함수 표현식이다 -->
        }
    };

```

### 함수 호이스팅
> 함수선언문과 기명함수 표현식은 호이스팅 동작에 차이점이 있다.

* 함수 선언문을 사용하면 변수 선언뿐 아니라 함수 정의 자체도 호이스팅되기 때문에 자칫 오류를 만들어 내기 쉽다.
```javascript

    <!-- 안티패턴 -->
    <!-- 전역함수 -->
    function foo() {
        alert('global foo');
    }

    function bar() {
        alert('global bar');
    }

    function hoistMe() {
        console.log(typeof foo);  <!-- 'function' -->
        console.log(typeof bar);  <!-- 'undefined' -->

        foo(); <!-- 'local foo' -->
        bar(); <!-- TypeError: bar is not a 'function' -->

        <!-- 함수 선언문 : 변수 foo와 정의된 함수 모두 호이스팅 된다 -->
        function foo() {
            console.log('local foo');
        }

        <!-- 함수 표현식 : 변수 'bar'는 호이스팅 되지만 정의된 함수는 호이스팅되지 않는다. -->

        var bar = function() {
            console.log('local bar');
        };
    }
    hoistMe();
```
