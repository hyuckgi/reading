# 디자인 패턴

## 감시자 패턴
> 감시자 패턴은 클라이언트 측 자바스크립트 프로그래밍에서 널리 사용되는 패턴이다.
> mouseover, keypress와 같은 모든 브라우저 이벤트가 감시자 패턴의 예이다.
> 감시자 패턴은 커스텀 이벤트(custom event), 구독자/발행자(subscriber/publisher) 패턴이라고도 한다

> 이 패턴의 주요 목적은 결합도를 낮추는 것이다. 어떤 객체가 다른 객체의 메서드를 호출하는 대신 객체의 특별한 행동을 구독해 알림을 받는다. 구독자(subscriber)는 감시자(observer)라고도 부르며, 관찰되는 객체는 발행자(publisher) 또는 감시 대상(subject)이라고 부른다.

> 발행자는 중요한 이벤트가 발생했을 때 모든 구독자에게 알려주며(구독자를 호출한다) 주로 이벤트 객체의 형태로 메시지를 전달한다.


### 감시자 패턴 예제 1

```javascript

    var publisher = {
        subscribers: {
            any: [] <!-- 이벤트 타입 : 구독자의 배열의 형식 -->
        },
        subscribe: function(fn, type) {
            type = type || 'any';
            if(typeof this.subscribers[type] === 'undefined') {
                this.subscribers[type] = [];
            }
            this.subscribers[type].push(fn);
        },
        unsubscribe: function(fn, type) {
            this.visitSubscribers('publish', fn, type);
        },
        publish: function(publication, type) {
            this.visitSubscribers('publish', publication, type);

        },
        visitSubscribers: function(action, arg, type) {
            var pubtype = type || 'any',
                subscribers = this.subscribers[pubtype],
                i,
                max = subscribers.length;

            for(i = 0; i < max; i+=1) {
                if(action === 'publish'){
                    subscribers[i](arg);
                } else {
                    if (subscribers[i] === arg ) {
                        subscribers.splice(i, 1);
                    }
                }
            }
        }
    };

    <!-- 객체를 받아 발행자 객체로 바꿔주는 함수로 해당 객체에 범용 발행자 메서드들을 복사해 넣는다 -->
    function makePublisher(o) {
        var i;
        for(i in publisher){
            if(publisher.hasOwnProperty(i) && typeof publisher[i] === "function") {
                o[i] = publisher[i];
            }
        }
        o.subscribers = {any: []};
    }

    <!-- 일간 또는 월간으로 출판하는 일만하는 paper객체 구현 -->
    var paper = {
        daily: function() {
            this.publish("big new today");
        },
        monthly: function() {
            this.publish("interesting analysis", "monthly");
        }
    };

    <!-- paper를 발행자로 만든다 -->
    makePublisher(paper);

    <!-- 구독자 joe객체 구현 -->
    var joe = {
        drinkCoffee: function(paper) {
            console.log(paper + ' 를 읽었습니다.');
        },
        sundayPreNap: function(monthly) {
            console.log("잠들기 전에" + monthly + "를 읽고 있습니다.");
        }
    };

    paper.subscribe(joe.drinkCoffee);
    paper.subscribe(joe.sundayPreNap, 'monthly');

    paper.daily();  <!-- big news today를 읽었습니다 -->
    paper.monthly();  <!-- 잠들기 전에 interesting analysis를 읽고 있습니다 --> 

```

> paper 객체 내에서 joe를 하드코딩하지 않았고, joe객체안에서도 역시 paper객체를 하드코딩하지 않았다는 점에서 이 코드는 훌륭하다. 모든 내용을 알고있는 중재자 객체가 존재하지도 않는다. 객체들은 느슨하게 결합되었고, 이 객체들은 전혀 수정하지 않고 paper에 수많은 구독자를 추가할 수 있다. 또한 joe는 언제든지 구독을 해지할 수 있다.
