# 디자인 패턴

## 퍼사드 패턴
> 퍼사드패턴은 객체의 대체 인터페이스를 제공한다. 메서드를 짧게 유지하고 하나의 메서드가 너무 많은 작업을 처리하지 않게 하는 방법은 설계상 좋은 습관이다.  

> 하지만 이렇게 하다보면 메서드 숫자가 엄청나게 많아지거나 uber메서드에 엄청나게 많은 매개변수를 전달하게 될 수 있다. 두 개 이상의 메서드가 함께 호출되는 경우가 많다면, 이런 메서드 호출들을 하나로 묶어주는 새로운 메서드를 만드는 게 좋다

### 브라우저 이벤트 처리
* stopPropagation() : 이벤트가 상위 노드로 전파되지 않게 중단시킨다.
* preventDefault() : 브라우저의 기본 동작을 막는다.
> 위의 두 메서드는 서로 다른 목적을 가지고 있기 때문에 별도로 유지되어야 하지만, 한꺼번에 호출되는 일이 많은 것도 사실이다. 따라서 두 개의 메서드 호출을 애플리케이션 여기저기에서 반복하기보다는, 이 둘을 함께 호출하는 퍼사드 메서드를 생성하는 게 좋다

```javascript

    var myevent = {
        <!-- code.. -->
        stop: function(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        <!-- code.. -->
    };

    <!-- 크로스브라우징에도 사용될 수 있다. 브라우저 간 차이를 퍼사드 뒤편에 숨길 수 있다. -->
    var myevent = {
        <!-- code.. -->
        stop: function(e) {
            <!-- IE 이외의 모든 브라우저 -->
            if (typeof e.preventDefault === 'function'){
                e.preventDefault();
            }
            if(typeof ee.stopPropagation === 'function'){
                e.stopPropagation();
            }

            <!-- IE -->
            if(typeof e.returnValue === 'boolean'){
                e.returnValue = false;
            }
            if(typeof e.cancelBuble === 'boolean') {
                e.cancelBuble = true;
            }
        }
        <!-- code.. -->
    };

```

> 또한 퍼사드 패턴은 설계변경과 리펙토링 수고를 덜어준다. 복잡한 객체의 구현 내용을 교체하는 데는 상당한 시간이 걸리는 데, 이와 동시에 이 객체를 사용하는 새로운 코드가 계속되서 작성되고 있을 것이다. 이런 경우 우선 새로운 객체의 API를 생각해보고 기존객체 앞에 이 API의 역할을 하는 퍼사드를 생성해 적용해 볼 수 있다. 이렇게 하면 기존 객체를 완전히 교체하기 전에 최신 코드가 새로운 API를 사용하게 하면, 최종 교체시 변경폭을 줄일 수 있다. 
