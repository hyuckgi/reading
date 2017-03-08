
// 체이닝 패턴

// 체이닝패턴이란 객체에 연쇄적으로 메서드를 호출할 수 있도록 하는 패턴이다.
// 즉 여러가지 동작을 수행할때 먼저 수행한 동작의 반환값을 변수에 할당한 후
// 다음작업을 할 필요가 없기 때문에 호출을 여러줄에 걸쳐 쪼개지 않아도 된다.

// 메서드에 의미있는 반환값이 존재하지 않는다면 현재 작업중인 객체의 인스턴스인 this를 반환
var obj = {
    value: 1,
    increment: function() {
        this.value += 1;
        return this;
    },
    add: function(v) {
        this.value += v;
        return this;
    },
    shout: function() {
        alert(this.value);
    }
}

// 메서드 체이닝 호출
obj.increment().add(3).shout(); //5

// 위와 달리 메서드를 하나씩 호출하려면 다음과 같이 해야한다.
obj.increment();
obj.add(3);
obj.shout(); // 5

// 체이닝 패턴의 장. 단점

// 장점
// 1. 코드량이 줄고 코드가 좀더 간결해져 거의 하나의 문장처럼 읽히게 할 수 있다.
// 2. 함수를 쪼개는 방법을 생각하게 되어 좀더 작고 특화된 함수를 만들게 된다. -> 이런방법은 장기적으로 유지보수에 도움이 된다.

// 단점
// 1. 디버깅이 어렵다. '열차사고' 패턴


//jQuery, DOM API에 사용되고 있다.



// 메소드 체이닝패턴
// 생성자에 추가한 메서드는 인스턴스를 만들때마다 메모리를 차지하기 때문에 비효율적이다.
// 그래서 prototype을 확장해서 메서드를 정의하곤 한다.
// 또 다른 방법으로는 크록포드가 제안한 method 체이닝 패턴이 있다.

var Person = function(name){
    this.name = name;
}.
    method('getName', function(){
        return this.name;
    }).
    method('setName', function(NewName){
        this.name = NewName;
        return this;
    });

if(typeof Function.prototype.method !== "function"){
    Function.prototype.method = function(name, implementation){
        this.prototype[name] = implementation;
        return this;
    };
}

// 근데 뭔가 전역객체에 프로토타입도 정의해야되고, 생성자의 문법도 눈에 익숙하지 않는다.
// 그냥 프로토타입을 쓰면 안될까?

var Person = function(name) {
    this.name = name;
};

Person.prototype.setName = function(NewName){
    this.name = NewName;
    return this;
}

Person.prototype.getName = function(){
    return this.name;
}

// 이렇게 하면 되는거 아닌가 암튼 결론은 return this를 반환하는 것이 핵심
