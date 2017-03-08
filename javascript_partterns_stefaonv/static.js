
// 스태틱 멤버

//스태틱 프로퍼티와 메서드란 인스턴스에 따라 달라지지 않는 프로퍼티와 메서드를 말한다.
//인스턴스를 생성하지 않고, 메서드를 바로 호출할 수 있으면, 공개스태틱멤버이다. ex)MathUtils.max(3.5)
//비공개 스태틱맴버는 클래스 사용자에게는 보이지 않지만 인스턴스들은 모두 함께 사용할 수 있다.

//공개 스태틱멤버
//자바스크립트에서는 별도 문법이 없지만 생성자에 프로퍼티를 추가함으로써 구현할수 있다.

// 생성자
var Gadget = function(price){
    this.price = price;
};

// 스태틱 메서드
Gadget.isShiny = function(){
    return "you bet";
}

// 프로토타입에 일반 함수 추가
Gadget.prototype.setPrice = function(price){
    this.price = price;
}

// 스태틱메서드를 호출하는 방법
Gadget.isShiny();  //"you bet"

// 인스턴스를 생성한후 메서드를 호출핟다.
var iphone = new Gadget();
iphone.setPrice(500);

typeof Gadget.setPrice; //undefined
typeof iphone.isShiny; //undefined

// 스태틱메서드가 인스턴스도 호출할 수 있게 하려면
Gadget.prototype.isShiny = Gadget.isShiny;
iphone.isShiny(); //"you bet"

// 하지만 이럴경우 스태틱메서드의 this 사용에 주의해야한다. this가 다르기 때문에..
// 그래서 아래처럼 instanceof로 분기처리가 되어야 한다.

Gadget.isShiny = function(){
    var msg = 'you bet';
    if(this instanceof Gadget) {
        msg += ", it costs $" + this.price + "!";
    }
    return msg;
}

Gadget.prototype.isShiny = function(){
    return Gadget.isShiny.call(this);
}


// 비공개 스태틱멤버
// 1. 동일한 생성자 함수로 생선된 객체들이 공유하는 멤버
// 2. 생성자 외부에서는 접근할 수 없다.

var Gadget = (function(){
    //스태틱 변수 / 프로퍼티
    var counter = 0;
    //생성자의 새로운 구현버전을 반환한다.
    return function(){
        console.log(counter += 1);
    };
}());
// 1. 비공개프로퍼티를 위해 클로저 함수를 만들고
// 2. 비공개 멤버를 함수로 감싼 후
// 3. 즉시실행한 결과를 새로운 함수를 반환하게 한다.
// 4. 반환된 함수는 Gadget변수에 할당되어 새로운 생성자가 될 것이다.
var g1 = new Gadget(); // 1
var g2 = new Gadget(); // 2
var g3 = new Gadget(); // 3

// 위 예제의 비공개스태틱멤버는 Gadget생성자를 통해 생성된 개별 객체의 유일성을 식별하는 ID가 될 수 있다.
// 유일한 식별자는 쓸모가 많으니 특권메서드로 노출시켜도 좋지 않을까?
// 비공개 스태틱프로퍼티에 접근할 수 있는 getLastId()라는 특권 메서드를 추가해보자

var Gadget = (function(){
    var counter = 0,
        NewGadget;

    NewGadget = function(){
        counter += 1;
    };

    NewGadget.prototype.getLastId = function(){
        return counter;
    };

    // 생성자를 덮어쓴다
    return NewGadget;
}());

var iphone = new Gadget();
iphone.getLastId() // 1
