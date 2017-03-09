# 리터럴과 생성자

## 객체 리터럴
> 자바스크립트에서 생성한 객체는 언제라도 변경할 수 있으며, 내장 네이티브 객체의 프로퍼티들도 대부분 변경이 가능하다. 빈 객체를 정의해놓고 기능을 추가해나갈 수도 있다. 객체리터럴 표기법은 필요에 따라 객체를 생성할 때 이상적이다.

```javascript

    <!-- 빈 객체에서 시작한다 -->
    var dog = {};

    <!-- 프로퍼티 하나를 추가한다. -->
    dog.name = "Benji";

    <!-- 이번에는 메서드를 추가한다. -->
    dog.getName = function() {
        return dog.name;
    }
```

### 객체리터럴 문법
* 객체를 중괄호({ })로 감싼다.
* 객체 내의 프로퍼티와 메서드를 쉼표(,)로 분리한다.
* 프로퍼티명과 프로퍼티값은 콜론으로 분리한다.
* 객체를 변수에 할당할 때는 닫는 중괄호 뒤에 세미콜론을 빼먹지 않도록 한다.  

### 생성자 함수로 객체 생성하기
> 객체리터럴 사용

```javascript
    var car = {goes: 'far'};
```

> 내장 생성자 사용

```javascript
    <!-- 이방법은 안티패턴이다 -->
    var car = new Object();
    car.goes = "far";

    <!-- 내장생성자는 받는 인자에 따라 예기치 않은 결과가 반환될 수 있다. 객체리터럴을 사용할 수 없는 상황에서만 사용하라 -->
```

> 사용자 정의 생성자 함수

```javascript
    var Person = function (name) {
        this.name = name;
        this.say = function(){
            return "I am " + this.name;
        };
    };

    var adam = new Person("Adam");
    adam.say();  <!-- "I am Adam" -->
```
* `new`와 함께 생성자 함수를 호출하면 함수 안에서 다음과 같은 일이 일어난다.
    1. 빈 객체가 생성된다. 이 객체는 `this`라는 변수로 참조할 수 있고, 해당 함수의 프로토타입을 상속받는다.
    2. `this`로 참조되는 객체에 프로퍼티와 메서드가 추가된다.
    3. 마지막에 다른 객체가 명시적으로 반환되지 않을 경우, `this`로 참조된 이 객체가 반환된다.

```javascript

    var Person = function (name) {

        <!-- 객체 리터럴로 새로운 객체를 생성한다. -->
        var this = {};
        <!-- 프로토타입을 상속받기 때문에 실제는 var this = Object.create(Person.prototype); 과 더 가깝다 -->

        <!-- 프로퍼티와 메서드를 추가한다. -->
        this.name = name;
        this.say = function(){
            return "I am " + this.name;
        };

        <!-- this를 반환한다 -->
        <!-- return this; -->
    };

```

### `new`를 강제하는 패턴
>`new`없이 생성자 함수를 호출하면 생성자 내부의 this는 전역객체를 가리키게 되기 때문에 바람직하지 않다.

* that 사용
> 첫글자를 대문자로 쓰는 명명규칙만으로는 올바른 동작방식을 권고할 뿐이지 강제하지 못한다.
> `this`에 모든 멤버를 추가하는 대신 `that`(`this`와 비교하기 위한 임시어 `self`, `me` 로도 사용할 수 있다.)을 사용하는 방법

```javascript
    function Waffle(){
        var that = {};
        that.tastes = "yummy";
        return that;
    };
    <!-- 그러나 이 방법은 프로토타입과의 연결고리를 잃어버리게 된다. -->
```
* 스스로 호출하는 생성자
> 생성자 내부에서 this가 해당 생성자의 인스턴스인지를 확인 그렇지 않은 경우 new와 함께 스스로를 재호출 하는것

```javascript

    function Waffle() {
        if(!(this instanceof Waffle)){
            return new Waffle();
        }
        this.tastes = "yummy";
    }
    Waffle.prototype.wantAnother = true;

```
