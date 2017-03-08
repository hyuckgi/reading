
// 상속 #2

// 클래스(생성자) 방식 vs 새로운 방식



// 새로운 방식
// 프로토타입을 활용한 상속
// 이방식에서는 클래스를 찾아볼수 없다. 객체가 객체를 상속받는다.
// 재사용하려는 객체가 하나 있고, 또 다른 객체를 만들어 이 첫번째 객체의 기능을 가져온다고 생각하면 되겠다.

// 상속해줄 객체
var parent = {
    name: 'PAPA'
};

// 새로운 객체
var child = object(parent);

console.log(child.name); // PAPA

// object함수를 통해 parent객체의 name프로퍼티를 child가 상속받았다. 

function object(o) {
    function F() {};
    F.prototype = o;
    return new F();
}
