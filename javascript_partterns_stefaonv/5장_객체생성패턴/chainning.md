# 객체 생성 패턴

## 체이닝 패턴
> 체이닝패턴이란 객체에 연쇄적으로 메서드를 호출할 수 있도록 하는 패턴이다.
> 즉 여러가지 동작을 수행할때 먼저 수행한 동작의 반환값을 변수에 할당한 후
> 다음작업을 할 필요가 없기 때문에 호출을 여러줄에 걸쳐 쪼개지 않아도 된다.

```javascript

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
    <!-- 메서드에 의미있는 반환값이 존재하지 않는다면 현재 작업중인 객체의 인스턴스인 this를 반환 -->

    obj.increment().add(3).shout();  <!-- 5 -->

    <!-- 위와 달리 메서드를 하나씩 호출하려면 다음과 같이 해야한다. -->
    obj.increment();
    obj.add(3);
    obj.shout();  <!-- 5 -->

```
* 체이닝 패턴의 장점
    1. 코드량이 줄고 코드가 좀더 간결해져 거의 하나의 문장처럼 읽히게 할 수 있다.
    2. 함수를 쪼개는 방법을 생각하게 되어 좀더 작고 특화된 함수를 만들게 된다. -> 이런방법은 장기적으로 유지보수에 도움이 된다.

* 체이닝 패턴의 단점 : 디버깅이 어렵다. '열차사고' 패턴


### 메서드 체이닝패턴
> 그냥 알아만 두자.
> 생성자에 추가한 메서드는 인스턴스를 만들때마다 메모리를 차지하기 때문에 비효율적이다.
> 그래서 prototype을 확장해서 인스턴스 메서드를 정의하는데 더글라스 형이 고안한 method() 메서드 개념으로 생성자 함수에서 인스턴스 메서드를 생성할 수 있다.

```javascript

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
        <!-- method(새로운 메서드 이름, 메서드 구형내용)는 두개의 매개변수를 받는다. -->  

    <!-- 내장 Function의 프로토타입을 건드리는게 초보개발자인 나로서는 부담이다 -->
    if(typeof Function.prototype.method !== "function"){
        Function.prototype.method = function(name, implementation){
            this.prototype[name] = implementation;
            return this;
        };
    }

    var a = new Person('Adam');
    a.getName(); <!-- Adam -->
    a.setName('Eve').getName();  <!-- Eve -->

    <!-- 근데 뭔가 전역객체에 프로토타입도 정의해야되고, 생성자의 문법도 눈에 익숙하지 않는다. -->
    <!-- 그냥 프로토타입을 쓰면 안될까? -->

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
    <!-- 그냥 prototype 을 사용하자 -->
