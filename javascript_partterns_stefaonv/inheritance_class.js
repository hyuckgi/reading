
// 상속

// 클래스(생성자) 방식 vs 새로운 방식



// 생성자 방식 #1

// 부모생성자
function Parent(name) {
    this.name = name || 'Adam';
};

// 생성자의 프로토타입에 기능을 추가한다.
Parent.prototype.say = function() {
    return this.name;
};

// 아무내용이 없는 자식 생성자
function Child(name) {}

inherit(Child, Parent);

function inherit(C, P) {
    C.prototype = new P();
}

var kid = new Child();
kid.say(); //"Adam"

// 프로토타입 체인 추적을 통해 Parent의 name 속성을 Child의 인스턴스인 kid가 갖게 되었다( 두번째 __proto__ 인 Parent에 name프로퍼티이다.)
// Parent의 prototype 메서드인 say 역시 상속되었다. (3단계 __proto__)

// 단점
// 1. 부모객체의 this에 추가된 객체 자신의 프로퍼티와 프로토타입 프로퍼티를 모두 물려받게된다.
//    대부분의 경우 객체 자신의 프로퍼티는 특정 인스턴스에 한정되어 재사용할 수 없기 때문에 필요가 없다.
// 2. 범용 inherit()함수는 인자를 처리하지 못하는 문제가 있다.
//    즉 자식 생성자에 인자를 넘겨도 부모 생성자에게 전달하지 못한다.
//      var s = new Child("Seth");
//      s.say(); // "Adam"
//    자식객체가 부모 생성자에 인자를 전달하는 방법도 있지만 이방법은 인스턴스를 생성할 때마다 상속을 실행해야 하기 때문에
//    결국 부모 객체를 계속해서 재생성하는 셈이고 따라서 비효율적이다.




// 생성자 방식 #2
// 자식이 부모로 인자전달 하지못했던 #1패턴의 문제를 해결하기 위해
// 부모생성자의 this에 자식객체를 바인등하고 자식 생성자가 받은 인자를 모두 넘겨준다.
function Child(a, b, c, d) {
    Parent.apply(this, arguments);
};
// 이렇게하면 부모 생성자 함수내부의 this에 추가된 프로퍼티만 물려받게 된다. 프로토타입에 추가된 멤버는 상속되지 않는다.
// 생성자 빌려쓰기 패턴을 사용하면 자식객체는 상속된 멤버의 복사본을 받게 된다.
//  #1패턴에서 자식객체가 상속된 멤버의 참조를 물려받은 것과는 다르다. 차이점을 보자

// 부모생성자
function Article() {
    this.tags = ['js', 'css'];
}
var article = new Article();

// 클래스 방식의 패턴 #1을 사용헤 article객체를 상속하는 blog객체를 생성한다.
function BlogPost(){}
BlogPost.prototype = article;
var blog = new BlogPost();
// 여기서는 이미 인스턴스가 존재하기 때문에 'new Article()'을 쓰지않았다.

//생성자 빌려쓰기 패턴을 사용해 article을 상속하는 page객체를 생성한다.
function StaticPage() {
    Article.call(this);
};
var page = new StaticPage();

alert(article.hasOwnProperty('tags')); //true
alert(blog.hasOwnProperty('tags')); //false 프로토타입체인에 있기 때문에
alert(page.hasOwnProperty('tags')); //true

blog.tags.push('html');
page.tags.push('php');
alert(article.tags.join(", ")); //js, css, html

// blog객체가 tags프러퍼티를 수정하면 동시에 부모의 멤버변수도 수정된다.
// 본질적으로 blog.tags는 article.tags와 동일한 배열을 가리키고 있기 때문이다.
// 그러나 page.tags의 변경은 부모인 article에 영향을 미치지 않는다.
// page.tags는 상속과정에서 별개로 생성된 복사본이기 때문이다.

// 단점
// 1. 빌려쓰기 패턴은 부모객체의 프로토타입 프로퍼티를 상속하지 않는다.
//    새로운 객체를 복사한 것이기 때문? 자식의 프로토타입은 빈객체이다.
// 2. 때문에 빌려쓰기의 상속은 부모객체의 자신만의 프로퍼티를 상속?(복제)받는 것이다.

//생성자 빌려쓰기를 적용한 다중 상속

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



// 생성자 방식 #3
// #2의 자식생성자의 인스턴스가 부모객체의 프로토타입 프로퍼티에 접근하려면 어떻게 해야할까?
// 앞의 #1, #2패턴을 결합해보자

// 생성자 빌려쓰고 프로토타입 지정해주기

// 부모생성자 빌려오기
function Child(a, b, c, d) {
    Parent.apply(this, arguments);
};

// 자식의 프로토타입이 부모 생성자를 통해 생성된 인스턴스를 가리키도록 지정
Child.prototype = new Parent();

// 이렇게 하면 자식객체는 부모객체의 복사본을 갖고 부모의 프로토타입멤버들도 참조형태로 상속받는다.
// 자식이 부모에게 인자를 넘길수도 있다.
// 자바의 상속과 유사하게 부모가 가진 모든 것을 상속하는 동시에 부모의 프로퍼티를 덮어쓸 위험없이
// 자신만의 프로퍼티를 마음놓고 변경할 수 있다.

// 단점 : 부모 생성자를 비효율적으로 두번 호출한다. name은 두번 상속된다.
//부모생성자
function Parent(name) {
    this.name = name || "Adam";
};

// 프로토타입 프로퍼티 추가
Parent.prototype.say = function() {
     return this.name;
};

//자식생성자
function Child(name) {
    Parent.apply(this, arguments);
};

Child.prototype = new Parent();

var kid = new Child("Patrick");
kid.name; // "Patrick"
kid.say(); // "Patrick"
delete kid.name;
kid.say(); // "Adam"



// 생성자 방식 #4
// 프로토타입 공유
function inherit(C, P) {
    C.prototype = P.prototype;
};
// 이방법을 쓰면 부모 생성자를 호출하지 않는다.
// 모든 객체가 실제로 동일한 프로토타입을 공유하기 때문에 프로토타입 체인 검색은 짧고 간단해진다.
// 하지만 상속체인 어디선가 프로토타입을 수정하면 모든 상속받은 객체에 영향을 미친다.



// 생성자방식 #5 임시생성자
// 프로토타입 체인의 이점은 유지하면서 동일한 프로토타입을 공유할 때의 문제를 해결하기 위해
// 부모와 자식의 프로토타입 사이에 직접적인 링크를 끊는다.

function inherit(C, P) {
    var F = function() {};
    F.prototype = P.prototype;
    C.prototype = new F();
};
// 빈 함수 F가 부모와 자식사이에서 프록시 기능을 맡는다.
// F()의 프로토타입 프로퍼티는 부모의 프로토타입을 가리킨다.
// 이 빈 함수의 인스턴스가 자식의 프로토타입이 된다.
// 프로토타입은 재사용가능한 기능을 모아두는 장소이기 때문에 이패턴에 따르면 부모 생성자에서 this에 추가한 멤버는 상속되지 않는다.

// 상위 클래스 저장
function inherit(C, P) {
    var F = function() {};
    F.prototype = P.prototype;
    C.prototype = new F();
    C.uber = P.prototype;
};
// 이패턴을 기반으로 하여 부모 원본에 대한 참조를 추가할 수도 있다.


// 나중을 위한 생성자 함수를 가리키는 포인터를 재설정
// 생성자 포인터를 재설정하지 않으면 모든 자식들의 객체들의 생성자는 Parent()로 지정되어 있을 것이고,
// 이런 상황은 유용성이 떨어진다.
// 생성자 포인터 재설정
function inherit(C, P) {
    var F = function() {};
    F.prototype = P.prototype;
    C.prototype = new F();
    C.uber = P.prototype;
    C.prototype.constructor = C;
};

// 마지막으로 프록시가 되는 F()함수는 inherit()이 호출될때마다 생성된다.
// 임시생성자는 한번만 만들어두고 임시 생성자의 프로토타입만 변경해도 충분하다.
// 즉시실행함수를 활용하면 프록시 함수를 클로저 안에 저장할 수 있다.

var inherit = (function() {
    var F = function() {};
    return function(C, P){
        F.prototype = P.prototype;
        C.prototype = new F();
        C.uber = P.prototype;
        C.prototype.constructor = C;
    }
}());
