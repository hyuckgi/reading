# 코드 재사용 패턴

## 클래스 방식 vs 새로운 방식의 상속 패턴
> 많은 개발자들이 자바스크립트를 클래스 관점에서 생각하고 클래스를 전제한 상속페턴을 발전시켜 왔다.
> 이러한 구현방법을 "클래스 방식" 이라 부를 수 있다.
> 또한 클래스에 대해 생각할 필요가 없는 나머지 모든 패턴은 "새로운 방식"이라고 저자는 정의했다.

### 클래스 방식의 상속 패턴 1 - 기본패턴
> 가장 널리 쓰이는 기본패턴은 상속할 생성자함수를 사용해 객체를 생성한다음 이 객체를 상속받을 객체의 프로토타입에 할당하는 것이다.

```javascript

    <!-- 부모생성자-->
    function Parent(name) {
        this.name = name || 'Adam';
    };

    <!-- 생성자의 프로토타입에 기능을 추가한다.-->
    Parent.prototype.say = function() {
        return this.name;
    };

    <!-- 아무내용이 없는 자식 생성자-->
    function Child(name) {}

    <!-- 재사용이 가능한 inherit()의 구현 -->
    function inherit(C, P) {
        C.prototype = new P();   <!-- new키워드를 써서 객체를 할당하는 것이 핵심이다 -->
    }

    inherit(Child, Parent);

    var kid = new Child();
    kid.say(); <!--"Adam"-->

```

> 여기서는 prototype 프로퍼티가 함수가 아니라 객체를 가리키게 하는 것이 중요하다.
> 즉 프로토타입이 부모 생성자 함수 자체가 아니라 부모 생성자 함수로 생성한 객체 인스턴스를 가리켜야 한다.
> 기본 패턴을 사용하면 부모 객체의 프로토타입에 추가된 프로퍼티와 메서드들과 함께, 부모 객체 자신의 프로퍼티도 모두 물려받게 된다.

* 프로토타입체인 탐색 : 자신에게 없는 프로퍼티와 메서드는 체인을 따라 올라가면서 찾는다.

* 단점
    1. 부모객체의 this에 추가된 객체 자신의 프로퍼티와 프로토타입 프로퍼티를 모두 물려받게된다.대부분의 경우 객체 자신의 프로퍼티는 특정 인스턴스에 한정되어 재사용할 수 없기 때문에 필요가 없다.
    2. 범용 inherit()함수는 인자를 처리하지 못하는 문제가 있다. 즉 자식 생성자에 인자를 넘겨도 부모 생성자에게 전달하지 못한다.

    ```javascript
        <!-- 생성자에 인자를 전달하지만 부모의 프로토타입에 say()
         var s = new Child("Seth");
         s.say(); <!-- "Adam" -->

    ```
    > 자식객체가 부모 생성자에 인자를 전달하는 방법도 있지만 이방법은 인스턴스를 생성할 때마다 상속을 실행해야 하기 때문에 결국 부모 객체를 계속해서 재생성하는 셈이고 따라서 비효율적이다.


### 클래스 방식의 상속 패턴 2 - 생성자 빌려쓰기
> 생성자 빌려쓰기 패턴은 자식이 부모로 인자전달 하지못했던 #1패턴의 문제를 해결한다
> 부모생성자의 this에 자식객체를 바인딩하고 자식 생성자가 받은 인자를 모두 넘겨준다.

```javascript

    function Child(a, b, c, d) {
        Parent.apply(this, arguments);
    };

```
> 이렇게하면 부모 생성자 함수내부의 this에 추가된 프로퍼티만 물려받게 된다. 프로토타입에 추가된 멤버는 상속되지 않는다. #1패턴에서 자식객체가 상속된 멤버의 참조를 물려받은 것과는 다르게 생성자 빌려쓰기 패턴을 사용하면 자식객체는 상속된 멤버의 복사본을 받게 된다.

```javascript
<!-- 부모생성자-->
    function Article() {
        this.tags = ['js', 'css'];
    }
    var article = new Article();

    <!-- 클래스 방식의 패턴 #1을 사용헤 article객체를 상속하는 blog객체를 생성한다.-->
    function BlogPost(){}
    BlogPost.prototype = article;
    var blog = new BlogPost();
    <!-- 여기서는 이미 인스턴스가 존재하기 때문에 'new Article()'을 쓰지않았다.-->

    <!--생성자 빌려쓰기 패턴을 사용해 article을 상속하는 page객체를 생성한다.-->
    function StaticPage() {
        Article.call(this);
    };
    var page = new StaticPage();

    alert(article.hasOwnProperty('tags')); <!--true-->
    alert(blog.hasOwnProperty('tags')); <!--false 프로토타입체인에 있기 때문에-->
    alert(page.hasOwnProperty('tags')); <!--true-->

```
> blog객체의 tags프러퍼티를 수정하면 동시에 부모의 멤버변수도 수정된다. 본질적으로 blog.tags는 article.tags의 참조이기 때문이다.
> 그러나 page.tags는 상속과정에서 별개로 생성된 복사본이기 때문에 빌려온 부모 article에 영향을 미치지 않는다.

```javascript

    blog.tags.push('html');
    page.tags.push('php');
    alert(article.tags.join(", ")); <!--js, css, html-->

```

1. 빌려쓰기 패턴은 부모객체의 프로토타입 프로퍼티를 상속하지 않는다.
2. 새로운 객체를 복사한 것이기 때문? 자식의 프로토타입은 빈객체이다.
3. 빌려쓰기의 상속은 부모객체의 자신만의 프로퍼티를 복사해주는 일회성 동작이며, __proto__ 라는 링크는 유지되지 않는다. -->

```javascript

    <!--생성자 빌려쓰기를 적용한 다중 상속-->
    function Cat() {
        this.legs = 4;
        this.say = function() {
            return "meaowww";
        };
    };

    function Bird() {
        this.wing = 2;
        this.fly = true;
    };

    function CatWings() {
        Cat.apply(this);
        Bird.apply(this);
    }

    var jane = new CatWings();
    console.dir(jane);
    <!-- 중복된 프로퍼티가 있다면 마지막 프로퍼티 값으로 덮어쓰게 된다 -->

```

### 생성자 빌려쓰기 패턴의 장, 단점

* 장점 : 부모 생성자 자신의 멤버에 대한 복사본을 가져올 수 있다.(자식이 실수로 부모의 프로퍼티를 덮어쓰는 위험을 방지)

* 단점 : 프로토타입이 전혀 상속되지 않는다.


### 클래스 방식의 상속 패턴 3 - 생성자 빌려쓰고 프로토타입 지정해주기
> 부모 생성자를 빌려온 후, 자식의 프로토타입이 부모 생성자를 통해 생성된 인스턴스를 가리키도록 지정한다.  
> 즉 1패턴과 2패턴의 결합

```javascript

    <!-- 부모생성자 빌려오기-->
    function Child(a, b, c, d) {
        Parent.apply(this, arguments);
    };

    <!-- 자식의 프로토타입이 부모 생성자를 통해 생성된 인스턴스를 가리키도록 지정-->
    Child.prototype = new Parent();

```
> 이렇게 하면 자식객체는 부모객체의 복사본을 갖고 부모의 프로토타입멤버들도 참조형태로 상속받는다. 자식이 부모에게 인자를 넘길수도 있다.
> 자바의 상속과 유사하게 부모가 가진 모든 것을 상속하는 동시에 부모의 프로퍼티를 덮어쓸 위험없이 자신만의 프로퍼티를 마음놓고 변경할 수 있다.

> 하지만 부모 생성자를 비효율적으로 두번 호출해 부모가 가진 자신만의 프로퍼티는 두번 상속된다.

```javascript

    <!--부모생성자-->
    function Parent(name) {
        this.name = name || "Adam";
    };

    <!-- 프로토타입 프로퍼티 추가-->
    Parent.prototype.say = function() {
         return this.name;
    };

    <!--자식생성자-->
    function Child(name) {
        Parent.apply(this, arguments);
    };

    Child.prototype = new Parent();

    var kid = new Child("Patrick");
    kid.name; <!-- "Patrick"-->
    kid.say(); <!-- "Patrick"-->
    delete kid.name;
    kid.say(); <!-- "Adam" Child의 name프로퍼티는 지워졌지만 Parent의 name속성은 남아있다.-->

```



### 클래스 방식의 상속 패턴 4 - 프로토타입 공유
> 앞서 3패턴이 부모생성자를 두번 호출한 것과는 달리 프로토타입 공유 패턴은 부모 생성자를 한번도 호출하지 않는다.
> 원칙적으로 재사용할 멤버는 this가 아니라 프로토타입에 추가되어야 한다. 따라서 상속되어야 하는 모든 것들도 프로토타입 안에 존재해야 한다.
> 그렇다면 부모의 프로토타입을 똑같이 자식의 프로토타입으로 지정하기만 하면 될 것이다.

```javascript

    function inherit(C, P) {
        C.prototype = P.prototype;
    };

```
> 이방법을 쓰면 부모 생성자를 호출하지 않는다.모든 객체가 실제로 동일한 프로토타입을 공유하기 때문에 프로토타입 체인 검색은 짧고 간단해진다.하지만 상속체인 어디선가 프로토타입을 수정하면 모든 상속받은 객체에 영향을 미친다.

### 클래스 방식의 상속 패턴 5 - 임시생성자
> 프로토타입 체인의 이점은 유지하면서 동일한 프로토타입을 공유할 때의 문제를 해결하기 위해 부모와 자식의 프로토타입 사이에 직접적인 링크를 끊는다.

```javascript

    function inherit(C, P) {
        var F = function() {};
        F.prototype = P.prototype;
        C.prototype = new F();
    };

    <!-- 빈 함수 F()가 부모와 자식사이에서 프록시 기능을 맡는다.-->
    <!-- F()의 프로토타입 프로퍼티는 부모의 프로토타입을 가리킨다.-->
    <!-- 이 빈 함수의 인스턴스가 자식의 프로토타입이 된다.-->

```
> 프로토타입은 재사용가능한 기능을 모아두는 장소이기 때문에 이패턴에 따르면 부모 생성자에서 this에 추가한 멤버는 상속되지 않는다.

### 임시생성자 패턴을 기반으로 한 상위클래스 저장 - 프록시 함수 또는 프록시 생성자 활용 패턴
> 이 패턴을 기반으로 하여 부모 원본에 대한 참조를 추가할 수도 있다.

```javascript

    function inherit(C, P) {
        var F = function() {};
        F.prototype = P.prototype;
        C.prototype = new F();
        C.uber = P.prototype;   <!-- uber는 상위 클래스 super를 의미한다 -->
    };

```

### 나중을 위한 생성자 함수를 가리키는 포인터를 재설정
> 생성자 포인터를 재설정하지 않으면 모든 자식들의 객체들의 생성자는 Parent()로 지정되어 있을 것이고 이런 상황은 유용성이 떨어진다.

```javascript

    function inherit(C, P) {
        var F = function() {};
        F.prototype = P.prototype;
        C.prototype = new F();
        C.uber = P.prototype;   <!-- uber는 상위 클래스 super를 의미한다 -->
    };

    <!-- 부모와 자식을 두고 상속관계를 만든다 -->
    function Parent(){}
    function Child(){}
    inherit(Child, Parent);

    var kid = new Child();
    kid.constructor.name; <!-- Parent -->
    kid.constructor === Parent;  <!-- true -->
    <!-- 생성자를 확인하면 Child()로 생성한 kid의 constructor가 Parent이다 -->

```
> constructor 프로퍼티는 자주 사용되진 않지만 런타임 객체 판별에 유용하다. 거의 정보성으로만 사용되는 프로퍼티이기 때문에 원하는 생성자 함수를 가리키도록 재설정해도 기능에는 영향을 미치지 않는다.

```javascript

    <!-- 생성자 포인터 재설정-->
    function inherit(C, P) {
        var F = function() {};
        F.prototype = P.prototype;
        C.prototype = new F();
        C.uber = P.prototype;
        C.prototype.constructor = C;
    };

```

### 일반적인 최적화 방안
> 프록시가 되는 F()함수는 inherit()이 호출될때마다 생성된다.
> 임시생성자는 한번만 만들어두고 임시 생성자의 프로토타입만 변경해도 충분하다.
> 즉시실행함수를 활용하면 프록시 함수를 클로저 안에 저장할 수 있다.

```javascript

    var inherit = (function() {
        var F = function() {};
        return function(C, P){
            F.prototype = P.prototype;
            C.prototype = new F();
            C.uber = P.prototype;
            C.prototype.constructor = C;
        }
    }());

```
