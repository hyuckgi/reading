# 객체 생성 패턴

## 비공개 프로퍼티와 메서드
> 자바스크립트는 자바 등 다른 언어와는 달리 private, protected, public 프로퍼티와 메서드를 나타내는 별도의 문법이 없다. 객체의 모든 멤버는 public, 즉 공개되어 있다.

``` javascript

    var myobj = {
        myprop: 1,
        getProp: function() {
            return this.myprop;
        }
    };

    myobj.myprop;  <!-- 1 -->
    myobj.getProp();  <!-- 1 -->

    <!-- 생성자 함수를 사용해 객체를 생성할 때도 공개되어 있다. -->

    function Gadget() {
        this.name = 'iPod';
        this.stretch = function() {
            return 'iPad';
        };
    }

    var toy = new Gadget();
    toy.name <!-- iPod -->
    toy.stretch() <!-- iPad -->

```

### 비공개 멤버
> 비공개 멤버에 대한 별도의 문법은 없지만 클로저를 사용해서 구현할수 있다.

``` javascript

    <!-- 생성자 함수에서 비공개 멤버 -->
    function Gadget() {

        <!-- 비공개 멤버 -->
        var name = 'iPod';

        <!-- getName()은 비공개 멤버에 접근할 수 있는 특권메서드임 -->
        this.getName = function() {
            return name;
        };
    }

    var toy = new Gadget();
    toy.name <!-- undefined -->
    toy.getName() <!-- iPod -->


    <!-- 객체리터럴에서 비공개멤버 -->
    var myobj = (function() {

        <!-- 비공개 멤버 -->
        var name = 'my, oh my';

        <!-- 공개될 부분 -->
        return {
            getName: function() {
                return name;
            }
        };
    }());

    myobj.getName();  <!-- my, oh my -->

```

### 비공개 멤버의 허점
> 특권 메서드에서 비공개 변수의 값을 바로 반환한 경우 이 변수가 객체나 배열이라면 값이 아닌 참조가 반환되기 때문에 외부 코드에서 비공개 변수 값을 수정할 수 있다.

``` javascript

    function Gadget() {

        <!-- 비공개 멤버 -->
        var specs = {
            screen_width: 320,
            screen_height: 480,
            color: 'white'
        };

        <!-- 공개 함수 -->
        this.getSpecs = function() {
            return specs;
        };
    }

    var toy = new Gadget(),
        toy2 = toy.getSpecs();

    toy2.color = "black";
    toy2.price = "free";

    toy.getSpecs();  <!-- 객체의 참조링크가 변경되면서 비공개 멤버인 specs의 값도 변경되었다. -->

```
> 이러한 문제를 해결하기 위해서는 참조링크가 아니라 새로운 객체를 만들어 반환하는 것이다. 최소 권한의 원칙에 따라 가공한 정보를 반환하는 기능들로 분리하는 것이 올바르다. 혹 specs전부를 반환하기를 원한다면 specs을 복사해서 복사본을 반환하는 방법이 있다.


### 비공개 함수를 공개 메서드로 노출시키는 방법
> 노출패턴(revelation pattern)은 비공개 메서드를 구현하면서 동시에 공개 메서드로도 노출하는 것을 말한다.
> 객체의 모든 기능이 객체가 수행하는 작업에 필수불가결한 것들이라서 최대한의 보호가 필요한데, 동시에 이 기능들의 유용성 때문에 공개적인 접근도 허용하고 싶은 경우가 있을 수 있다. 노출패턴은 이러한 경우에 유용하다.

```javascript

    var myarray;

    (function(){
        var astr = "[object Array]",
            toString = Object.prototype.toString;

        function isArray(a) {
            return toString.call(a) === astr;
        }
        function indexOf(haystack, needle) {
            var i = 0,
                max = haystack.length;
            for(; i< max; i++) {
                if(haystack[i] === needle) {
                    return i;
                }
            }
            return -1;
        }

        <!-- 공개적인 접근을 허용한 기능들이 myarray에 채워진다. -->
        myarray = {
            isArray: isArray,
            indexOf: indexOf,
            inArray: indexOf
        };
    }());

    myarray.isArray([1,2]);  <!-- true -->
    myarray.indexOf([1,2]);  <!-- 2-->
    myarray.inArray([1,2]);  <!-- 2 -->

    <!-- 이제 공개된 메서드인 indexOf()에 예기치 못한 일이 일어나더라도 비공개 함수인 indexOf()는 안전하게 보호되기 때문에 inArray()는 계속해서 동작할 것이다. -->

```
