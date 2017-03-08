# 기초

## 고급 자바스크립트 코드를 작성하는데 핵심이 되는 모범적인 관행, 습관, 패턴
* 전역변수 최소화
* var 선언은 한번만
* 루프 내에서 length는 캐시해두고 사용
* 코딩규칙 준수

## 유지보수 가능한 코드 작성
* 읽기쉽다.
* 일관적이다.
* 예측 가능하다
* 한 사람이 작성한 것처럼 보인다.
* 문서화되어 있다.

## 전역변수 최소화
* 자바스크립트는 함수를 사용하여 유효범위를 관리한다.(ES6는 block단위)
* 함수 안에서 선언된 변수는 해당 함수의 지역변수가 되며 함수 외부에서는 사용할 수 없다.
* 전역변수는 어떤 함수에도 속하지 않고 선언되거나 아예 선언되지 않은 채로 사용되는 변수
* 실행환경에는 전역객체가 존재한다. 전역 변수를 생성하는 것은 전역객체의 프로퍼티를 만드는 것과 같다.
* 편의상 브라우저에는 전역객체에 window라는 부가적인 프로퍼티가 존재하며, 전역객체가 자신을 가리킨다.

## 전역변수의 문제점
* 자바스크립트 애플리케이션이나 웹페이지 내 모든 코드 사이에서 공유되기 때문에 애플리케이션 내의 다른 영역에서 목적이 다른 전역 변수를 동일한 이름으로 정의할 경우 서로 덮어쓰게 된다. cf) 네임스페이스 패턴, 즉시실행함수를 쓰는 이유.
* 자바스크립트의 암묵적 전역(implied globals)개념때문에 선언하지 않고 사용한 변수는 자동으로 전역객체의 프로퍼티가 되어 명시적으로 선언된 전역 변수와 별 차이없이 사용할 수 있다.
    - 암묵전 전역을 생성하는 패턴
        1. var 키워드 미사용
            `result = 100;`
        2. 연쇄적인 var선언
            `var a = b = 0;`
    - var 선언을 안한 변수는 delete로 지울수 있다. 이는 암묵적 전역변수가 전역객체의 프로퍼티라는 사실
    - strict모드에서는 `var`키워드를 선언하지 않으면 오류가 난다.

* 단일 var 패턴
    - 함수에서 필요로 하는 모든 지역변수를 한군데서 찾을 수 있다.
    - 변수를 선언하기 전에 사용할 때 발생하는 로직상의 오류를 막아준다.
    - 전역변수 최소화에 도움을 준다.     ~~변수를 정할때 생각할 시간을 주기 때문일까?~~
    - 코드량이 줄아든다.(작성량과 전송량 모두 줄어든다.) .     ~~역시 필요한 변수를 미리 생각해보기 때문일까?~~


* 호이스팅(hoisting): 분산된 var 선언의 문제점
> 함수안에서 변수가 선언되었을때 끌어올려진다. 때문에 동일한 유효범위 안에서 변수를 선언전에 사용하면 오류를 일으킬 수 있다.

```
 <!-- 안티패턴 -->
myname = "globals"; <!-- 전역변수 -->
function func() {
    alert(myname); <!-- "undefined" 전역변수가 아닌 유효범위 안의 지역변수 myname이 호이스팅 되었지만 값을 할당하기 전이기 때문에 undefined -->
    var myname = "local";
    alert(myname);  <!-- "local" -->
}
func();
```

## for루프
* for문의 캐싱

```
    <!-- 최적화되지 않은 루프 -->
    for(var i=0; i< myarrary.length; i++){
        myarrary[i];
    }

    <!-- 루프 순회시마다 배열의 length에 접근한다. length가 길거나 HTMLCollection이면 비용이 크다. -->
```

```
    <!-- 단일 var 패턴을 적용해 리펙토링 -->
    function looper(){
        var i, max;

        for(i=0;max = myarrary.length; i< max; i++){
            myarrary[i];
        }
    }

    <!-- looper를 다시 리펙토링하게되면 더 힘들듯. 이게 무슨 의미가 있을지... -->
    <!-- JSLint에서는 ++ 방법을 '과도한 기교'를 조장한다는 이유에서 권장하지 않음 i+=1 or i = i+1 -->
```

    - 미세최적화 패턴
        + 변수하나를 덜 쓴다(max가 없다)
```
                var i, myarrary = [];
                for(i=myarrary.length; i--;){
                    myarrary[i];
                }
```
        + 카운트를 거꾸로 하여 0으로 내려간다.
```
                var myarrary = [],
                    i = myarrary.length;

                while (i--) {
                    myarrary[i]
                }

                <!-- 0과 비교하는 것이 배열의 length 또는 0이 아닌 값고 비교하는 것보다 대개 더 빠르기 때문이다. -->
```

## for-in 루프
* `for-in`루프는 배열이 아닌 객체를 순회할때만 사용해야한다. 할수있지만 권장사항이 아니다.
* `for-in`으로 루프를 도는 것을 열거(enumeration)라고도 한다.
* 인덱스 요소가 없기때문에 열거하는 순서가 정해져있지 않다.
* 프로토타입 체인을 따라 상속되는 프로퍼티들을 걸러내기 위해서는 `hasOwnProperty()` 메서드를 사용한다.
```
    <!-- man 객체의 프로퍼티만 걸러내기 -->
    for(var i in man){
        if(man.hasOwnProperty(i)){
            console.log(i, ":", man[i]);
        }
    }

    <!-- Object.prototype에서 hasOwnProperty호출해서 걸러내기 -->
    for(var i in man){
        if(Object.prototype.hasOwnProperty.call(man, i)){
            console.log(i, ":", man[i]);
        }
    }
    <!-- man 객체가 hasOwnProperty를 재정의했을때도 사용할수 있지만 탐색작업이 Object까지 거슬러 올라간다. -->

    <!-- hasOwnProperty를 지역변수로 캐시한다 -->
    var i, hasOwn = Object.prototype.hasOwnProperty;
    for(i in man){
        if(hasOwn.call(man, i)){
            console.log(i, ":", man[i]);
        }
    }
```

## switch패턴
```
    <!-- 가독성과 견고성을 향상하는 코딩패턴 -->
    var inspect_me = 0,
        result = "";

    switch (inspect_me) {
    case 0:                 <!-- case문을 switch문과 같은 줄로 정렬한다 -->
        result = "zero";
        break;
    case 1:
        result = "one";
        break;
    default:
        result = "unkwon"
    }
```

## 암묵적 타입캐스팅 피하기
* 자바스크립트는 변수를 비교할 때 암묵적으로 타입캐스팅을 실행한다. ex) false == 0, "" == 0
* 암묵적 타입캐스팅을 막기 위해서는 항상 ===와 !==를 사용해야 한다.
* JSLint에서는 완전항등연산자(일치연산자)를 요구한다. 이를 통해서 코드의 일관성을 유지하고 동등연산자의 의미를 파악하는 수고를 줄여준다.

## eval() 피하기
* eval()은 동적으로 코드를 받아 실행할 수 있지만 보안과 유효성을 보장하기 위해서 피하는것이 좋다.
* 대신 [] notation으로 작성해라.
* setTimeout(), setInterval()에서 인자로 함수호출 또는 인자가포함된 함수를 문자열로 넘기는 것도 eval()과 같다.
```
    <!-- 안티패턴 -->
    setTimeout("myFunc()", 1000);
    setTimeout("myFunc(1,2,3)", 1000);

    <!-- 권장안 -->
    setTimeout(myFunc, 1000);
    setTimeout(function(){
        myFunc(1,2,3);
    }, 1000)
```
* new Function() 생성자를 사용하는 것도 eval()과 비슷하다. 차라리 new Function()을 쓰자.
> new Function() 안에서 평가되는 코드는 함수의 유효범위엔에서 실행되기에 전역변수가 되지는 않는다.

```
    <!-- eval()의 전역변수 증명하기 -->
    console.log(type of un) <!-- undefined -->
    console.log(type of deux) <!-- undefined -->
    console.log(type of trois) <!-- undefined -->

    var jsstring = "var un = 1; console.log(un);"; <!-- eval() -->
    eval(jsstring); <!-- "1" -->

    var jsstring = "var deux = 2; console.log(deux);"; <!-- new Function -->
    new Function(jsstring)();  <!-- "2" -->

    var jsstring = "var trois = 3; console.log(trois);"; <!-- 즉시실행함수로 호출 -->
    (function(){
        eval(jsstring); <!-- "3" -->
    }());

    console.log(type of un) <!-- number -->
    console.log(type of deux) <!-- undefined -->
    console.log(type of trois) <!-- undefined -->

    이와 비슷하게 유효범위 체인에 간섭을 일으킬수 있다.

    <!-- eval() 바깥쪽 유효범위에 접근하고 수정할 수 있다. -->
    (function() {
        var local = 1;
        eval("local = 3; console.log(local)"); <!-- 3 -->
        console.log(local) <!-- 3 -->
    }());

    <!-- new Function or Function을 사용하면 전역유효범위를 바라본다. -->
    (function(){
        var local = 1;
        Function("console.log(typeof local);")(); <!-- undefined -->
    }());
```
## parseInt()를 통한 숫자 변환
    1.
