# 코드 재사용 패턴

## 클래스 방식 vs 새로운 방식의 상속 패턴
> 많은 개발자들이 자바스크립트를 클래스 관점에서 생각하고 클래스를 전제한 상속페턴을 발전시켜 왔다.
> 이러한 구현방법을 "클래스 방식" 이라 부를 수 있다.
> 또한 클래스에 대해 생각할 필요가 없는 나머지 모든 패턴은 "새로운 방식"이라고 저자는 정의했다.

### 새로운 방식의 상속 패턴 1 - 프로토타입을 활용한 상속
> 이 패턴에서 클래스(생성자)는 찾아볼 수 없다. 객체가 객체를 상속받는다.
> 재사용하려는 객체가 하나 있고, 또 다른 객체를 만들어 이 첫번째 객체의 기능을 가져온다고 생각하면 된다.

```javascript

    <!-- 상속해줄 객체 -->
    var parent = {
        name: 'Papa'
    };

    <!-- 새로운 객체 -->
    var child = object(parent);

    <!-- 테스트 -->
    console.log(child.name); <!-- Papa -->


    function object(o) {
        <!-- 빈 임시 생성자 함수 F()를 사용한다 -->
        function F() {};
        <!-- F()의 프로토타입에 parent객체를 지정한다.
        F.prototype = o;
        <!-- 임시생성자의 새로운 인스턴스를 반환한다 -->
        return new F();
    }

```
> 프로토타입을 활용한 상속 패턴에서 부모 객체 리터럴로 생성되어야만 하는 것은 아니다.(흔히 쓰는 방식이긴 하지만)
> 생성자 함수로 부모를 생성할 경우 부모 객체 자신의 프로퍼티와 생성자 함수의 프로토타입에 포함된 프로퍼티가 모두 상속된다는 점도 유의해야 한다.

```javascript

    <!-- 부모생성자 -->
    function Person() {
        this.name = 'Adam';
    }
    <!-- 프로토타입에 추가된 프로퍼티 -->
    Person.prototype.getName = function() {
        return this.name;
    };

    <!-- Person 인스턴스를 생성한다. -->
    var papa = new Person();

    <!-- 이 인스턴스를 상속한다. -->
    var kid = object(papa);
    kid.getName(); <!-- Adam -->

    <!-- Person()의 프로퍼티와 프로토타입 모두를 상속받았다. -->

```

```javascript

    <!-- 생성자 함수의 프로토타입 객체만 상속받을 수 있도록 변경 -->
    <!-- 부모생성자 -->
    function Person() {
        this.name = 'Adam';
    }
    <!-- 프로토타입에 추가된 프로퍼티 -->
    Person.prototype.getName = function() {
        return this.name;
    };

    <!-- 상속  -->
    var kid = object(Person,prototype);

    typeof kid.getName; <!-- 이 메서드는 프로토타입안에 존재하기 때문에 'function' -->
    typeof kid.name; <!-- 'undefined' -->

```

### ECMAScript 5의 추가사항
> ECMAScript 5에서는 프로토타입을 활용한 상속패턴이 언어의 공식 요소가 되었다. Object.create()가 이 패턴을 구현하고 있다.

```javascript

    var child = Object.create(parent);

    <!-- Object.create()은 두번째 선택적 매개변수로 객체를 받는다. -->
    <!-- 전달된 객체의 프로퍼티는 반환되는 child 객체 자신의 프로퍼티로 추가된다. -->

    var child = Object.create(parent, {
        age: { value: 2 },
        name: { value: "kwon"}
    });

    child.hasOwnProperty("age");  <!-- true -->

```


### 새로운 방식의 상속 패턴 2 - 프로퍼티 복사를 통한 상속 패턴
> 프로퍼티 복사를 통한 상속 패턴은 객체가 다른 객체의 기능을 단순히 복사를 통해 가져온다.

``` javascript

    <!-- extend()함수 구현 -->

    function extend(parent, child) {
        var i;
        child = child || {};
        for (i in parent) {
            if (parent.hasOwnProperty(i)){
                child[i] = parent[i];
            }
        }
        return child;
    }

    var dad = { name: 'Adam' };
    var kid = extend(dad);
    kid.name; <!-- Adam -->

    <!-- 얕은 복사, 자바스크립트에서 객체는 참조만 전달되기 때문에 얕은 복사를 통해 상속을 실행한 경우, 자식 쪽에서 객체 타입인 프로퍼티 값을 수정하면 부모의 프로퍼티도 수정되어 버린다. -->

```
> 함수역시 객체이고 참조만 전달되기 때문에, 메서드는 이런 방식으로 복사되는 게 더 좋을 수 있다.
> 그러나 객체와 배열을 다룰 때는 예기치 못한 결과가 나올 수 있다.

```javascript

    var dad = {
        counts: [1, 2, 3],
        reads: {paper: true}
    };

    var kid = extend(dad);
    kid.counts.push(4);
    dad.counts.toString();  <!-- 1, 2, 3, 4 -->
    dad.reads === kid.reads;  <!-- true -->

```
> Deep copy, 프로퍼티의 타입이 객체인지 확인한 후 객체이면 프로퍼티를 재귀적으로 복사

```javascript

    function extendDeep(parent, child) {
        var i,
            toStr = Object.prototype.toString,
            astr = "[object Array]";

        child = child || {};

        for (i in parent) {
            if (parent.hasOwnProperty(i)) {
                if (typeof parent[i] === "object") {
                    child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
                    extendDeep(parent[i], child[i]);
                }else{
                    child[i] = parent[i];
                }
            }
        }
        return child;
    }

    var dad = {
        counts: [1, 2, 3],
        reads: {paper: true}
    };

    var kid = extendDeep(dad);
    kid.counts.push(4);
    kid.counts.toString();  <!-- 1, 2, 3, 4 -->
    dad.counts.toString();  <!-- 1, 2, 3 -->

    dad.reads === kid.reads;  <!-- false -->

    dad.reads.paper = false;
    dad.reads.web = true;
    dad.reads.paper = true;

```
> jQuery의 extend()메서드는 깊은 복사를 수행한다.


### 새로운 방식의 상속 패턴 3 - 믹스-인
> 하나의 객체를 복사하는 것을 넘어 여러 객체에서 복사해온 것을 한 객체 안에 섞어 넣을 수도 있다.

```javascript

    function mix() {
        var arg, prop, child = {};
        for (arg = 0; arg < arguments.length; arg++) {
            for( prop in arguments[arg]) {
                if(arguments[arg].hasOwnProperty(prop)) {
                    child[prop] = arguments[arg][prop];
                }
            }
        }
        return child;
    }
    var obj = {
        flour: {name: 'kwon'}
    };
    var buu = {
        butter: 3
    }
    var cake = mix(
        {eggs: 2, large: true},
        {butter: 1, salted: true},
        obj,
        buu,
        {sugar: 'sure'}
    );

```
> 믹스-인 개념이 공식적으로 내장된 언어에 익숙하다면, 부모에 수정을 가할 경우 자식에도 영향을 미치는 결과를 기대할지도 모르겠다. 그러나 이 구현 방법에서 그런 결과는 나오지 않는다.
> 단순히 루프를 돌고, 프로퍼티를 복사한 것 뿐이기 때문에 부모 들과의 연결고리는 끊어진 상태다.

~~왜? 연결고리가 끊어졌을까.. 위에 extend()함수에서는 참조로 복사가 되었는데 왜 여기서는 아닐까.... arguments로 받아서 일까?~~

> 여기서도 참조객체를 링크 한다. 자식의 프로퍼티를 수정하면 부모의 프로퍼티에도 영향을 준다, 하지만 부모의 프로퍼티를 수정해도 자식은 영향을 받지 않는다. 결론 복사본을 사용하자

### 새로운 방식의 상속 패턴 4 - 메서드 빌려쓰기
> 쓸일이 없는 모든 메서드를 상속받지 않고 원하는 메서드만 골라서 사용하고 싶다면 메서드 빌려쓰기 패턴을 사용
> 함수의 메서드인 call(), apply()를 활용해서 다른 객체의 기능을 빌려 올 수 있다.

```javascript

    <!-- call() 예제 -->
    notmyobj.doStuff.call(myobj, param1, p2, p3);

     <!-- apply() 예제 -->
    notmyobj.doStuff.apply(myobj, [param1, p2, p3]);

```

* 이 패턴은 배열 메서드를 빌려오는데 많이 사용된다.
```javascript
    function f() {
        var args = [].slice.call(arguments, 1, 3);
        return args;
    }

    f(1, 2, 3, 4, 5, 6);    <!-- [2, 3] -->
    <!-- call()의 두번째 인자는 slice()의 매개변수가 된다 -->

```
* 빌려쓰기와 바인딩
> call(), apply()를 사용하거나 단순한 할당을 통해 메서드를 빌려오게 되면, 빌려 온 메서드 안에서 this가 가리키는 객체는 호출식에 따라 정해지게 된다. 그러나 어떤 경우에는 this 값을 고정시키거나 특정 객체에 바인딩되도록 처음부터 정해놓는 것이 최선일 때가 있다.

```javascript

    var one = {
        name: 'object',
        say: function (greet) {
            return greet + ", " + this.name;
        }
    };

    one.say("hi"); <!-- hi, object -->

    var two = {
        name: 'another object'
    };

    one.say.apply(two, ['hello']);  <!-- hello, another object -->
    <!-- this가 two가 되었기 때문에 say()의 this.name 은 two의 name을 가리킴 -->

```

```javascript

    <!-- 함수를 변수에 할당하면 함수 안의 this는 전역객체를 가리키게 된다 -->
    var say = one.say;
    say("hoho");   <!-- hoho, undefined -->

    <!-- 콜백 함수로 전달한 경우 -->
    var yetanother = {
        name: "Yet another object",
        method: function (callback) {
            return callback("hola");
        }
    };

    yetanother.method(one.say);    <!--holla, undefined -->

```
> 메서드와 객체를 묶어놓기 위해서는 바인딩을 해야한다.

```javascript

    function bind(o, m) {
        return function() {
            return m.apply(o, [].slice.call(arguments));
        };
    }
    <!-- o라는 객체와 m이라는 메서드를 인자로 받은 다음, 이둘을 바인딩한 새로운 함수를 반환하다. -->
    <!-- 반환되는 함수는 클로저를 통해 o,m에 접근할 수 있다 -->
    var twosay = bind(two, one.say);
    twosay("yo") <!-- yo, another object -->

```

* Function.prototype.bind()
> ECMAScript 5에서는 Function.prototype에 bind() 메서드가 추가되어, apply()나 call()과 마찬가지로 쉽게 사용할 수 있다.

```javascript   
    <!-- bind() 구현 -->
    if(typeof Function.prototype.bind === 'undefined') {
        Function.prototype.bind = function(thisArg) {
            var fn = this,
                slice = Array.prototype.slice,
                args = slice.call(arguments, 1);
            return function() {
                return fn.apply(thisArg, args.concat(slice.call(arguments)));
            };
        };
    }

```
