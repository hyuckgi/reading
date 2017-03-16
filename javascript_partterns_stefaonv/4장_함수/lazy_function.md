# 함수

## 자기 자신을 정의하는 함수
> 게으른 함수 선언(lazy function definition)이라고도 불리는 이 패턴은 최초 사용 시점 전까지 함수를 완전히 정의하지 않고 있다가 호출된 이후에는 더 게을러져서 더 적게 일하기 때문이다.

```javascript

    var scareMe = function() {
        console.log('Boo');
        scareMe = function() {
            console.log("Double Boo");
        };
    };

    scareMe();  <!-- Boo -->
    scareMe();  <!-- Double Boo -->

    <!-- 이 패턴은 함수가 어떤 초기화 준비 작업을 단 한번만 수행할 경우에 유용하다. 불필요한 작업을 반복할 이유가 없기 때문에 함수의 일부는 더 이상 쓸모가 없다. -->

```
> 이 패턴의 단점은 자기 자신을 재정의한 후에는 이전에 원본 함수에 추가했던 프로퍼티들을 모두 찾을 수 없게된다는 것이다. 또한 함수가 다른 이름으로 사용된다면(다른 변수에 할당, 객체의 메서드로 사용) 원본 함수의 본문이 실행된다.

```javascript

    <!-- 새로운 프로퍼티 추가 -->
    scareMe.property = 'scareMeeee';

    <!-- 다른 이름으로 할당 -->
    var prank = scareMe;

    <!-- 메서드로 사용 -->
    var spooky = {
        boo : scareMe
    };

    <!-- 새로운 이름으로 호출한다. -->
    prank();    <!-- Boo -->
    prank();    <!-- Boo -->
    console.log(prank.property);    <!-- property -->

    <!-- 메서드로 호출한다. -->
    spooky.boo();    <!-- Boo -->
    spooky.boo();    <!-- Boo -->
    console.log(spooky.boo.property);    <!-- property -->

    <!-- 자기 자신을 재정의한 함수 사용 -->
    scareMe();    <!-- Double Boo, Boo가 아닌 이유는 위에서 다른 이름과 메서드로 scareMe가 최초호출 된 이후 이기 때문이다-->
    scareMe();    <!-- Double Boo -->
    console.log(scareMe.property);    <!-- 'undefined' -->

```
