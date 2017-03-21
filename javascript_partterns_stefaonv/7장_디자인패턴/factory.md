# 디자인 패턴

## 팩터리 패턴
> 팩토리 패턴의 목적은 객체들을 생성하는 것이다.
> 팩토리 패턴은 흔히 클래스 내부에서 또는 클래스의 스태틱 메서드로 구현되며 다음과 같은 목적으로 사용된다
> * 비슷한 객체를 생성하는 반복 작업을 수행한다.
> * 팩터리 패턴의 사용자가 컴파일 타임에 구체적인 타입(클래스)을 모르고도 객체를 생성할 수 있게 해준다.

### 자바스크립트에서의 팩터리 패턴
> 정적 클래스 언어에서는 (컴파일 타임에)클래스에 대한 정보 없이 인스턴스를 생성하기 쉽지않다. 그러나 자바스크립트에서는 이를 구현하기가 상당히 쉽다.
> 팩터리 메서드(또는 클래스)로 만들어진 객체들은 의도적으로 동일한 부모 객체를 상속한다. 즉 이들은 특화된 기능을 구현하는 구채적인 서브 클래스들이다. 어떤 경우에는 공통의 부모 클래스가 팩터리 메서드를 갖고 있기도 하다.

```javascript

    <!-- 부모 생성자 -->
    function CarMaker() {}

    <!-- 부모의 메서드 -->
    CarMaker.prototype.drive = function() {
        return "Vroom, I have " + this.doors + " doors";
    };

    <!-- 스태틱 factory 메서드 -->
    CarMaker.factory = function (type) {
        var constr = type,
            newcar;

        <!-- 생성자가 존재하지 않으면 에러를 발생한다 -->
        if(typeof CarMaker[constr] !== "function" ) {
            throw {
                name: "Error",
                message: constr + " doesn't exist"
            };
        }

        <!-- 생성자의 존재를 확인했으므로 부모를 상속한다. -->
        <!-- 상속은 단 한번만 실행하도록 한다. -->
        if(typeof CarMaker[constr].prototype.drive !== "function" ) {
            CarMaker[constr].prototype = new CarMaker();
        }

        <!-- 새로운 인스턴스를 생성한다 -->
        newcar = new CarMaker[constr]();

        <!-- 다른 메서드 호출이 필요하면 여기서 실행한 후, 인스턴스를 반환한다 -->
        return newcar;
    };

    <!-- 구체적인 자동차 메이커들을 선언한다 -->
    CarMaker.Compact = function() {
        this.doors = 4;
    };
    CarMaker.Convertible = function() {
        this.doors = 2;
    };
    CarMaker.SUV = function() {
        this.doors = 24;
    };

    <!-- 사용하기 -->
    var corolla = CarMaker.factory('Compact');   
    <!-- 팩터리 패턴의 특징적인 부분으로 이 메서드는 런타임시 문자열로 타입을 받아 해당 타입의 객체를 생성하고 반환한다 -->
    <!-- new와 함께 생성자를 사용하지 않고, 객체리터럴도 보이지 않지만 문자열로 식별되는 타입에 기반하여 객체들을 생성하는 함수가 있다 -->

    var solstice = CarMaker.factory('Convertible');
    var cherokee = CarMaker.factory('SUV');

    corolla.drive(); <!-- "Vroom, I have 4 doors"
    solstice.drive(); <!-- "Vroom, I have 2 doors"
    cherokee.drive(); <!-- "Vroom, I have 24 doors"

```

> 공통적으로 반복되는 코드를 모든 생성자에서 반복하는 대신 팩터리 메서드 안에 모아놓기 위해 상속을 사용했다.

### 내장 객체 팩터리
> 언어에 내장되어 있는 전역 Object() 생성자도 입력 값에 따라 다른 객체를 생성하기 때문에 팩터리처럼 동작한다고 할 수 있다.
> 숫자 원시 데이터 타입을 전달하면 이 생성자는 내부적으로 Number()생성자로 객체를 만든다. 문자열이나 불린 값 또한 동일하게 적용된다. 입력 값이 없거나 어떤 다른 값을 전달하면 일반적인 객체를 생성한다. 


```javascript

    var o = new Object(),
        n = new Object(1),
        s = new Object('1'),
        b = new Object(true);

    <!-- 테스트 -->
    o.constructor == Object; <!-- true -->
    n.constructor == Number; <!-- true -->
    s.constructor == String; <!-- true -->
    b.constructor == Boolean; <!-- true -->

```
> Object()가 팩터리라는 사실은 그다지 실용적인 사용 예제는 아니고, 단지 팩터리 패턴이 실제로 흔히 사용된다는 사실을 보여주는데 의미가 있다.
