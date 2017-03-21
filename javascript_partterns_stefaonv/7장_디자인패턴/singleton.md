# 디자인 패턴

## 싱글톤 패턴
> 싱글톤 패턴은 특정 클래스의 인스턴스를 오직 하나만 유지한다.
> 즉 동일한 클래스를 사용하여 새로운 객체를 생성하면, 두 번째부터는 처음 만들어진 객체를 얻게 된다.

### 자바스크립트에서의 싱글톤 패턴
> 자바스크립트에는 클래스가 없고 오직 객체만 있다. 새로운 객체를 만들면 실제로 이 객체는 다른 어떤 객체와도 같지 않기 때문에 이미 싱글톤이다.

```javascript

    <!-- 객체리터럴로 만든 객체 또한 싱글톤의 예이다-->
    var obj = {
        myprop: 'my value'
    };

    var obj2 = {
        myprop: 'my value'
    };

    <!-- 자바스크립트에서 객체들은 동일한 객체가 아니고서는 절대로 같을 수 없다. -->
    <!-- 완전히 같은 멤버를 가지는 똑같은 객체를 만들더라도 이전에 만들어진 객체와 동일하지는 않다 -->

    obj == obj2;   <!-- false -->
    obj === obj2;   <!-- false -->

```

> 따라서 객체 리터럴을 이용해 객체를 생성할때마다 사실은 싱글톤을 만드는 것이고, 싱글톤을 만들기 위한 별도의 문법이 존재하지 않는다고 할 수 있다.

> 자바스크립트의 문맥에서 '싱글톤' 이라고 예기하는 것은 때로는 모듈패턴을 뜻하기도 한다.

### new 사용하기
> 자바스크립트에는 클래스가 없다. 따라서 말 그대로의 싱글톤이라는 정의는 엄밀히 말하면 이치에 맞지 않다.
> 생성자 함수를 사용해 객체를 만드는 new구문을 사용해서 싱글톤 패턴을 구현하고자 할 수도 있다.
> 동일한 생성자로 new를 사용하여 여러 개의 객체를 만들 경우, 실제로는 동일한 객체에 대한 새로운 포인터만 반환하도록 구현하는 것이다.

```javascript

    var uni = new Universe();
    var uni2 = new Universe();

    uni === uni2 <!-- true -->

```
> 객체의 인스턴스인 this가 생성되면 Universe 생성자는 이를 캐시한 수 그 다음 번에 생성자가 호출되었을 때 캐시된 인스턴스를 반환한다.

* 자바스크립트에서는 어떻게 가능할까?
    1. 인스턴스를 저장하기 위해 전역 변수를 사용한다. ~~전역변수 선언은 좋지않고 덮어질수 있기때문에 쓰지않는다~~
    2. 생성자의 스태틱 프로퍼티에 인스턴스를 저장한다. ~~단, 외부에서 인스턴스 값을 변경하면 인스턴스를 읽어버릴 수 있다.~~
    3. 인스턴스를 클로저로 감싼다. ~~추가적인 클로저가 필요하다~~

### 스태틱 프로퍼티에 인스턴스 저장하기

```javascript

    function Universe() {
        <!-- instance check -->
        if(typeof Universe.instance === "object"){
            return Universe.instance;
        }
        this.start_time = 0;
        this.bang = "Bang";

        <!-- 인스턴스를 캐시한다 -->
        Universe.instance = this;
        return this;
    }

    var uni = new Universe();
    var uni2 = new Universe();

    uni === uni2 <!-- true -->
```
> instance가 공개되어 있다는 게 유일한 단점이다. 다른 코드가 instance를 실수로 변경하지는 않겠지만 그럴 가능성은 있다.


### 클로저에 인스턴스 저장하기
> 클래스 방식의 싱글톤을 만드는 또다른 방법으로 클로저를 사용해 단일 인스턴스를 보호하는 방법이 있다.
> 비공개 스태틱 멤버 패턴을 사용해서 이 방법을 구현할 수 있다. 이 구현의 비기는 생성자를 작성하는 것이다.

```javascript

    function Universe() {

        <!-- 캐싱된 인스턴스 -->
        var instance = this;

        <!-- 정상적으로 진행한다 -->
        this.start_time = 0;
        this.bang = "Bang";

        <!-- 생성자를 재작성한다 -->
        Universe = function() {
            return instance;
        };
    }

    var uni = new Universe();
    var uni2 = new Universe();

    uni === uni2 <!-- true -->

```
> Universe()를 재정의하므로 lazy function 패턴인데 이패턴의 문제점은 Universe()의 프로토타입에 무언가를 추가해도 원본 생성자로 생성된 인스턴스와 연결되지 않는다.

```javascript

    <!-- 문제점을 확인해보자 -->

    <!-- 프로토타입에 추가한다 -->
    Universe.prototype.nothing = true;

    var uni = new Universe();

    <!-- 첫 번째 객체가 만들어진 이후 -->
    <!-- 다시 프로토타입에 추가한다 -->
    Universe.prototype.everything = true;

    var uni2 = new Universe();

    uni.nothing; <!-- true -->
    uni2.nothing; <!-- true -->
    <!-- 원래의 프로토타입만 객체와 연결된다 -->

    uni.everything; <!-- undefined -->
    uni2.everything; <!-- undefined -->

    uni.constructor.name;  <!-- Universe -->
    uni.constructor === Universe;   <!-- false -->
    <!-- uni.constructor가 더이상 Universe() 생성자와 같지 않은 이유는 uni.constructor가 재정의된 생성자가 아닌 원본 생성자를 가리키고 있기 때문이다. -->

```
> 프로토타입과 생성자 포인터가 제대로 동작해야 하는 것이 요구사항이라면 수정을 해야 한다.

```javascript

    function Universe() {
         <!-- 캐싱된 인스턴스 -->
         var instance;
        console.log("instance1", instance);   <!-- 1. undefined -->

         <!-- 생성자를 재작성한다 -->
         Universe = function Universe() {
             console.log("instance2", instance);    <!-- 3. undefined -->
             return instance;
         };

         <!-- prototype 프로퍼티를 변경한다 -->
        Universe.prototype = this;
        console.log("instance3", instance);        <!-- 2. undefined -->
        <!-- instance -->
        instance = new Universe();
        console.log("instance4", instance);         <!-- 4. undefined -->

        <!-- 생성자 포인터를 재지정한다 -->
        instance.constructor = Universe;

        <!-- 정상적으로 진행한다 -->
        instance.start_time = 0;
        instance.bang = "Big";

        console.log("instance5", instance);          <!-- 5. undefined -->

        return instance;
    }

    <!-- 프로토타입에 추가한다 -->
    Universe.prototype.nothing = true;

    var uni = new Universe();

    <!-- 첫 번째 객체가 만들어진 이후 -->
    <!-- 다시 프로토타입에 추가한다 -->
    Universe.prototype.everything = true;

    var uni2 = new Universe();

    <!-- 동일한 단일 인스턴스다 -->
    uni === uni2 <!-- true -->

    <!-- 모든 프로토타입 프로퍼티가 언제 선언되었는지와 상관없이 동작한다 -->
    uni.nothing && uni.everything && uni2.nothing && uni2.everything;
    <!-- true -->

    uni.constructor === Universe;  <!-- true -->  

```

> 다른 대안으로 생성자와 인스턴스를 즉시 실행 함수로 감싸는 방법이 있다.

```javascript

    var Universe;

    (function(){
        var instance;

        Universe = function Universe() {
            if(instance){
                return instance;
            }
            instance = this;

            this.start_time = 0;
            this.bang = "Big";
        };
    }());

```
