# 함수

## 커리


### 함수적용
> 순수한 함수형 프로그래밍언어에서 함수는 불려지거나 호출된다고 표현하기보다 적용(apply)된다고 표현할 수 있다.

```javascript

    <!-- 함수 적용의 예 -->

    <!-- 함수를 정의한다. -->
    var sayHi = function(who) {
        return "Hello" + (who ? ", " + who : "") + "!";
    }
    <!-- 함수를 호출한다. -->
    sayHi(); <!-- Hello -->
    sayHi('world'); <!-- Hello world -->

    <!-- 함수를 적용한다 -->
    sayHi.apply(null, ["hello"]);  <!-- Hello hello -->

```
* apply(this와 바인딩할 객체(null 이면 this는 전역객체), 배열 또는 인자로 함수 내부에서 배열과 비슷한 행태의 arguments객체로 사용) : 함수가 객체의 메서드일때는 첫번째 인자로 객체를 전달한다.

```javascript

    var alien = {
        sayHi: function(who) {
            return "Hello" + (who ? ", " + who : "") + "!";
        }
    };

    alien.sayHi('world');  <!--Hello world -->
    sayHi.apply(alien, ['humans']);  <!--Hello humans -->
```

* call(this와 바인딩할 객체(null 이면 this는 전역객체), 하나의 매개변수)

```javascript

    sayHi.apply(alien, ['humans']);  <!--Hello humans -->
    sayHi.call(alien, 'humans');  <!--Hello humans -->

```

### 부분적인 적용
> 두개 이상의 인자를 받는 함수에 인자를 나눠 부분적으로 수행하면 얻을 수 있는 또 다른 함수에 나머지 인자를 적용하는 개념

```javascript

    var add = function(x, y) {
        return x + y;
    };

    <!-- 모든 인자 적용 -->
    add.apply(null, [5, 4]);

    <!-- 인자를 부분적으로만 적용 -->
    var newadd = add.partialApply(null, [5]);

    <!-- 새로운 함수에 나머지 인자 적용 -->
    newadd.apply(null, [4]);   

```
> 자바스크립트의 함수는 기본적으로는 이렇게 동작하지 않는다. 그러나 자바스크립트는 굉장이 동적이기 때문에 이렇게 동작하도록 만들수 있다.
> 함수가 부분적인 적용을 이해하고 처리할 수 있도록 만드는 과정을 커링이라고 한다.

### 커링
> 커링은 함수를 변형하는 과정이다. 다른 함수형 언어에서는 커링 기능이 언어 자체에 내장되어 있어 모든 함수가 기본적으로 커링된다. 자바스크립트에서는 함수를 수정하여 부분적용을 처리하는 커링함수로 만들 수 있다.

```javascript

    <!-- 커링된 add 함수 -->
    var add = function(x, y) {
        var x = x, oldy = y;
        if( typeof oldy === 'undefined') {   <!-- 부분적인 적용 -->
            return function(newy) {
                return oldx + newy;
            };
        }
        <!-- 전체 인자를 적용 -->
        return x + y;
    };

    <!-- 모든 인자 적용 -->
    add.apply(null, [5, 4]);

    <!-- 인자를 부분적으로만 적용 -->
    var newadd = add.partialApply(null, [5]);

    <!-- 새로운 함수에 나머지 인자 적용 -->
    newadd.apply(null, [4]);

    <!-- 기본개념은 함수내부에 클로저를 만드는 것 -->

    <!-- add() 함수 리팩토링 -->
    var add = function(x, y) {
        if( typeof y === 'undefined') {   <!-- 부분적인 적용 -->
            return function(y) {
                return x + y;
            };
        }
        <!-- 전체 인자를 적용 -->
        return x + y;
    };

    <!-- 부분적인 매개변수를 받는 범용 함수 -->

    function schonfinkelize(fn) {
        var slice = Array.prototype.slice,
            stored_args = slice.call(arguments, 1); <!-- schonfinkelize() 함수를 할당할때의 첫번째 인자를 제외한 나머지를 저장한다. -->

        return function() {
            var new_args = slice.call(arguments),
                args = stored_args.concat(new_args);
            return fn.apply(null, args);
        };
    }

    function add(x, y) {
        return x + y;
    }

    var newadd = schonfinkelize(add, 5);
    newadd(4)    <!-- 9 -->

```

* 커링을 사용해야 하는 경우
> 어떤 함수를 호출할 때 대부분의 매개변수가 항상 비슷하다면, 커링의 적합한 후보라고 할 수 있다. 매개변수 일부를 적용하여 새로운 함수를 동적으로 생성하면 이 함수는 반복되는 매개변수를 내부적으로 저장하여, 매번 인자를 전달하지 않아도 원본 함수가 기대하는 전체 목록을 미리 채워 놓을 것이다

<!-- 무슨말인지 모르겠지만 클로저로 만든 새로운 함수와 초기함수의 인자에 넘긴 함수를 잘 이용하면 다양한 기능을 만들수 있을 것 같다. --> 
