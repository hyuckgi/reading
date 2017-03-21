# 디자인 패턴

## 장식자 패턴
> 장식자 패턴을 이용하면 런타임시에 기능을 추가하고 객체를 변경하는 유연한 방법이다.
> 스태틱 클래스에서는 쉽지않은 작업이지만, 객체를 변형할 수 있는 자바스크립트에서는 객체에 기능을 추가하는 절차에 아무런 문제가 없다.

> 장식자 패턴의 편리한 특징은 기대되는 행위를 사용자화하거나 설정할 수 있다는 것이다. 처음에는 기본적인 몇 가지 기능을 가지는 평범한 객체로 시작한다. 그런 다음 사용 가능한 장식자들의 풀(pool)에서 원하는 것을 골라 객체에 기능을 덧붙여 간다. 순서가 중요하다면 어떤 순서로 기능을 추가할지도 지정할 수 있다.

### 장식자 구현 방법
* 모든 장식자 객체에 특정 메서드를 포함시킨 후, 이 메서드를 덮어쓰게 만든다. => 상속



### 상속을 통한 구현
> 각 장식자는 이전의 장식자로 기능이 추가된 객체를 상속한다. 장식 기능을 담당하는 메서드들은 uber(상속된 객체)에 있는 동일한 메서드를 호출하여 값을 가져온 다음 추가 작업을 덧붙이는 방식으로 진행한다.

```javascript

    <!-- 생성자 -->
    function Sale(price) {
        this.price = price || 100;
    }

    Sale.prototype.getPrice = function() {
        return this.price;
    };

    <!-- 장식자 객체들의 생성자 프로퍼티 -->
    Sale.decorators = {};

    Sale.decorators.fedtax = {
        getPrice: function() {
            var price = this.uber.getPrice();
            price += price * 5 / 100;
            return price;
        }
    };

    <!-- 이런 방법으로 장식자들은 플러그인처럼 Sale()의 핵심 기능을 확장하여 구현할 것이다.(별도 파일에서 개발할 수도 있고, 서드파티 개발자와 공유할 수도 있다.) -->

    Sale.decorators.quebec = {
        getPrice: function() {
            var price = this.uber.getPrice();
            price += price * 7.5 / 100;
            return price;
        }
    };

    Sale.decorators.money = {
        getPrice: function() {
            return "$" + this.uber.getPrice().toFixed(2);
        }
    };

    Sale.decorators.cdn = {
        getPrice: function() {
            return "CDN$" + this.uber.getPrice().toFixed(2);
        }
    };

    <!-- decorate() 정의 -->
    Sale.prototype.decorate = function(decorator) {
        var F = function() {},
            overrides = this.constructor.decorators[decorator],
            i, newobj;
        F.prototype = this;
        newobj = new F();
        newobj.uber = F.prototype;
        for(i in overrides) {
            if(overrides.hasOwnProperty(i)){
                newobj[i] = overrides[i];
            }
        }
        return newobj;
    };

```

### 목록을 사용한 구현
> 상속을 전혀 사용하지 않고 각각의 꾸며진 메서드가 체인 안에 있는 이전의 메서드를 호출하는 대신에 간단하게 이전 메서드의 결과를 다음 메서드에 매개변수로 전달한다.

> 이 구현 방법을 사용하면 장식을 취소하거나 제거하기 쉽다. 장식자 목록에서 요소를 삭제하기만 하면된다.

```javascript

    <!-- decorate()는 목록에 장식자를 추가하기만 할 뿐, 객체에는 아무런 일도 하지 않는다. -->
    function Sale(price) {
        this.price = (price > 0) || 100;
        this.decorators_list = [];
    }

    Sale.decorators = {};

    Sale.decorators.fedtax = {
        getPrice: function(price) {
            return price + price * 5 / 100;
        }
    };

    Sale.decorators.quebec = {
        getPrice: function(price) {
            return price + price * 7.5 / 100;
        }
    };

    Sale.decorators.money = {
        getPrice: function(price) {
            return "$" + price.toFixed(2);
        }
    };

    Sale.decorators.cdn = {
        getPrice: function(price) {
            return "CDN$" + price.toFixed(2);
        }
    };

    <!-- 장식자를 목록에 추가만 한다 -->
    Sale.prototype.decorate = function(decorator){
        this.decorators_list.push(decorator);
    };

    <!-- 각각의 getPrice() 메서드를 호출하면서 이전 반환값을 전달한다.
    Sale.prototype.getPrice = function(){
        var price = this.price,
            i,
            max = this.decorators_list.length,
            name;

        for(i=0; i < max; i+=1) {
            name = this.decorators_list[i];
            price = Sale.decorators[name].getPrice(price);
        }
        return price;
    };

```
> 두번째 장식자 패턴 구현방법이 더 간단하고 상속과 관련이 없다. 장식 메서드도 더 간단하다.
> 장식되기로 "동의한" 메서드에 의해서만 모든 작업이 수행된다.

> 더 많은 메서드를 장식하고 싶다면, 추가되는 메서드에도 모두 장식자 목록을 순회하는 부분이 반복해서 들어가야 한다. 이런 작업은 메서드를 인자로 받아 '장식가능' 하게 만들어주는 도우미 메서드로 쉽게 분리해낼 수 있다. 그러기 위해서는 decorators_list프로퍼티를 객체로 변경하여, 메서드 이름을 키로하고 해당 메서드의 장식자 객체들의 배열을 값으로 가지도록 해야할 것이다.

```javascript

    <!-- decorate()는 목록에 장식자를 추가하기만 할 뿐, 객체에는 아무런 일도 하지 않는다. -->
    function Sale(price) {
        this.price = (price > 0) ? price : 100;
        this.count = 0;
        this.decorators_list = {
            getPrice: [],
            getCount: []
        };
    }

    Sale.decorators = {};

    Sale.decorators.fedtax = {
        getPrice: function(price) {
            return price + price * 5 / 100;
        }
    };

    Sale.decorators.increase = {
        getCount: function(count){
            return count + 1;
        }
    };

    Sale.decorators.decrease = {
        getCount: function(count){
            return count - 1;
        }
    };

    Sale.decorators.reset = {
        getCount: function(count){
            return count = 0;
        }
    };

    Sale.decorators.quebec = {
        getPrice: function(price) {
            return price + price * 7.5 / 100;
        }
    };

    Sale.decorators.money = {
        getPrice: function(price) {
            return "$" + price.toFixed(2);
        }
    };

    Sale.decorators.cdn = {
        getPrice: function(price) {
            return "CDN$" + price.toFixed(2);
        }
    };

    <!-- 장식자를 목록에 추가만 한다 -->
    Sale.prototype.decorate = function(method, decorator){
        this.decorators_list[method].push(decorator);
    };

    Sale.prototype.decorateHelper = function(value, method){
        var value = value,
            i,
            max = this.decorators_list[method].length,
            name;

        for(i=0; i < max; i+=1) {
            name = this.decorators_list[method][i];
            value = Sale.decorators[name][method](value);
        }
        return value;
    };

    <!-- 각각의 getPrice() 메서드를 호출하면서 이전 반환값을 전달한다.
    Sale.prototype.getPrice = function(){
        return Sale.prototype.decorateHelper.apply(this, [this.price, 'getPrice']);
    };
    Sale.prototype.getCount = function(){
        return Sale.prototype.decorateHelper.apply(this, [this.count, 'getCount']);
    };

```
