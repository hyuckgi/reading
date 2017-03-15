# 객체 생성 패턴


## 샌드박스 패턴

* 네임스페이스의 단점
    1. 애플리케이션 전역객체가 단 하나의 전역변수에 의존하기 때문에 네임스페이스 패턴으로는 동일한 애플리케이션이나 라이브러리의 두가지 버전을 한 페이지에서 실행시키는 것이 불가능하다. 여러 버전들이 동일한 전역변수명을 쓰기 때문이다.

    2. .notation으로 연결된 긴 이름은 런타임에 탐색작업을 거쳐야 한다.


### 전역 생성자
> 샌드박스의 유일한 전역객체는 생성자다. 생성자를 통해 객체를 생성하고, 생성자에 콜백함수를 전달해 해당 코드를 샌드박스 내부환경으로 격리

``` javascript

    new Sandbox(function(box){
       <!-- code -->
    });

```

### 생성자 구현

``` javascript

    function Sandbox(){
        <!-- arguments를 배열로 바꾼다. -->
        var args = Array.prototype.slice.call(arguments),

            <!-- 마지막 인자는 콜백함수다. -->
            callback = args.pop(),

            <!-- 모듈은 배열로 전달될 수도 있고 개별 인자로 전달될 수도 있다. -->
            modules = (args[0] && typeof args[0] === 'string') ? args : args[0],
            i;

        <!-- 함수가 생성자로 호출되도록 보장한다. 생성자강제패턴 -->
        if(!(this instanceof Sandbox)){
            return new Sandbox(modules, callback);
        }

        <!-- this에 필요한 프로퍼티를 추가한다 -->
        this.a = 1;
        this.b = 2;

        <!-- 코어 this 객체에 모듈을 추가한다 -->
        <!-- 모듈이 없거나 "*" 이면 사용가능한 모든 모듈을 사용한다는 의미다 -->
        if(!modules || modules === "*" || modules[0] === "*") {
            modules = [];
            for(i in Sandbox.modules){
                if(Sandbox.modules.hasOwnProperty(i)){
                    modules.push(i);
                }
            }
        }

        <!-- 필요한 모듈을 초기화한다, 각 모듈을 구현한 함수를 호출한다. -->
        for(i =0; i<modules.length; i++){
            Sandbox.modules[modules[i]](this);
        }
        callback(this);
    }

    <!-- 필요한 프로토타입 프로퍼티들을 추가한다 -->
    Sandbox.prototype = {
        name : "kwon",
        version : "2.0",
        getName : function(){
            return this.name;
        }
    };

    Sandbox('*', function(box) {
        console.log(box);
    });

```

### 모듈 추가하기
> 각 모듈을 구성하는 함수들이 현재의 인스턴스 box를 인자로 받아들인 다음 이 인스턴스에 프로ㅓ티와 메서드를 추가하게 된다.

``` javascript

    Sandbox.modules = {};

    Sandbox.modules = {};

    Sandbox.modules.event = function(box) {
        box.bar = 'bar';
    };

    Sandbox.modules.ajax = function(box) {
        box.zoo = "zoo";
    };

    Sandbox('ajax', 'dom', function(box) {
        console.log(box);
    });

```

### 추가
* new키워드를 강제하는 패턴에서 instanceof만으로 체크하는 것은 week하다.

```javascript

    var a = new SandBox("a", true);
    SandBox.call(a);
    <!-- this가 인스턴스지만 생성타이밍이 아닐때는 instanceof만으로 체크할수 없다. -->

    <!-- es6는 Symbol로 방어할 수 있지만 es3에서는 특수키를 부여해서 방어한다.  - by hika -->
    if(!(this instanceof Sandbox) || this.hasOwnProperty("weweasdadwewew")){
        return new Sandbox(modules, callback);
    }

    this.weweasdadwewew = true;

```
