# 함수

## 콜백 패턴
> 함수는 객체다. 즉 함수를 다른 함수에 인자로 전달할 수 있다. 이때 인자로 전달한 함수가 콜백함수이다.

```javascript

    function writeCode(callback) {
        <!-- code -->
        callback();
    }
    <!-- callback 함수 -->
    function introduceBugs() {
        <!-- code -->
    }

    writeCode(introduceBugs);
```

### 콜백과 유효범위
> 콜백이 일회성의 익명함수나 전역 함수가 아니고 객체의 메서드인 경우 콜백 메서드가 자신이 속해있는 객체를 참조하기 위해 this를 사용하면 예상치 않게 동작할 수도 있다.

```javascript

    <!-- 콜백으로 사용할 메서드를 갖고 있는 myapp 객체 생성 -->
    var myapp = {};
    myapp.color = "green";
    myapp.paint = function(node) {
        node.style.color = this.color;
    };

    <!-- 콜백 함수를 파라미터로 받는 전역함수 -->
    var findNodes = function(callback) {
        <!-- code -->
        if(typeof callback === 'function'){
            callback(found);
        }
        <!-- code -->
    }

    findNodes(myapp.paint);

    <!-- findNodes는 전역함수이기 때문에 myapp.paint()의 this는 전역객체를 참조한다. -->

    <!-- 이 문제를 해결하기 위해서는 콜백함수와 함께 콜백이 속해있는 객체를 전달하면 된다. -->
    findNodes(myapp.paint, myapp);

    <!-- 전달받은 객체를 바인딩하도록 findNodes함수도 수정한다. -->
    var findNodes = function(callback, callback_obj) {
        <!-- code -->
        if(typeof callback === 'function'){
            callback.call(callback_obj, found);
        }
        <!-- code -->
    }

    <!-- 콜백으로 사용될 메서드와 객체를 전달할 때 메서드를 문자열로 전달할 수 있다. -->
    findNodes('paint', myapp);

    <!-- 이렇게 하면 객체명을 두번 반복하지 않아도 된다. -->
    var findNodes = function(callback, callback_obj) {
        <!-- code -->
        if(typeof callback === 'string'){
            callback = callback_obj[callback];
        }
        if(typeof callback === 'function'){
            callback.call(callback_obj, found);
        }
        <!-- code -->
    }
```

### ETC 콜백
* 비동기 이벤트 리스너
* 타임아웃 : `setTimeout()`, `setInterval()`
* 라이브러리에서의 콜백 : 콜백형태로 연결고리(hook)을 제공하면 라이브러리가 심플하고 확장가능하도록 다듬을 수 있다.  
