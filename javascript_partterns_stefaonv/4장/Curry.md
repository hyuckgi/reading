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
        var oldx = x, oldy = y;
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

```
