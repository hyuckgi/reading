# 객체 생성 패턴

## 모듈 패턴
> 모듈패턴은 늘어나는 코드를 구조화하고 정리하는 데 도움이 되기 때문에 널리 쓰인다.
> 다른 언어와는 달리 자바스크립트에는 패키지를 위한 별도의 문법이 없다. 하지만 모듈패턴을 사용하면 개별적인 코드를 느슨하게 결합시킬 수 있다. 따라서 각 기능들을 블랙박스처럼 다루면서도 소프트웨어 개발 중에 요구사항에 따라 기능을 추가하거나 교체하거나 삭제하는 것도 자유롭게 할 수 있다.


### 모듈 구조 순서
1. 네임스페이스 설정

``` javascript

    <!-- 앞서 공부한 네임스페이스 함수로 객체 트리 생성 -->
    MYAPP.makeObjTree('MYAPP.utilities.array');

```

2. 모듈 정의

``` javascript

    MYAPP.utilities.array = (function(){

        <!-- 객체의 내용 구현 -->

        var uobj = {};


        return {

        }
    }());

```

3. 의존관계 선언

``` javascript

    MYAPP.utilities.array = (function(){

        <!-- 의존관계 선언은 최상단에 한다. -->

        var uobj = MYAPP.utilities.object,
            ulang = MYAPP.utilities.lang,

        return {

        }
    }());

```

4. 공개 인터페이스에 메서드 추가

``` javascript

    MYAPP.utilities.array = (function(){
        <!-- 객체의 내용 구현 -->

        var uobj = MYAPP.utilities.object,
            ulang = MYAPP.utilities.lang;


        <!-- 공개 API -->
        return {
            isArray: function(a) {
                return toString.call(a) === astr;
            },
            indexOf: function(haystack, needle) {
                var i = 0,
                    max = haystack.length;
                for(; i< max; i++) {
                    if(haystack[i] === needle) {
                        return true;
                    }
                }
            }
            <!-- 더 필요한 프로퍼티와 메서드를 여기에 추가한다. -->
        }
    }());

```

5. 완성

``` javascript

    MYAPP.utilities.array = (function(){

        var uobj = MYAPP.utilities.object,
            ulang = MYAPP.utilities.lang,

            <!-- 비공개 프로퍼티 -->
            astr = "[object Array]",
            toString = Object.prototype.toString;


        <!-- 비공개 메서드 -->

        <!-- 필요하면 초기화 절차 실행 -->


        return {
            isArray: function(a) {
                return toString.call(a) === astr;
            },
            indexOf: function(haystack, needle) {
                var i = 0,
                    max = haystack.length;
                for(; i< max; i++) {
                    if(haystack[i] === needle) {
                        return true;
                    }
                }
            }
        }
    }());

```  

> 모듈패턴은 특히 점점 늘어가는 코드를 정리할 때 널리 사용되며 매우 추천하는 방법이다.


### 모듈 노출 패턴

``` javascript

    MYAPP.utilities.array = (function(){

        var uobj = MYAPP.utilities.object,
            ulang = MYAPP.utilities.lang,

            <!-- 비공개 메서드 추가  -->
            astr = "[object Array]",
            toString = Object.prototype.toString,

            isArray = function(a) {
                return toString.call(a) === astr;
            },
            indexOf: function(haystack, needle) {
                var i = 0,
                    max = haystack.length;
                for(; i< max; i++) {
                    if(haystack[i] === needle) {
                        return i;
                    }
                }
                return -1;
            };

        <!-- 공개 API 노출 -->
        return {
            isArray: isArray,
            indexOf: indexOf
        };
    }());

```

### 생성자를 생성하는 모듈

```javascript

    MYAPP.makeObjTree('MYAPP.utilities.array');

    MYAPP.utilities.array = (function(){

        <!-- 의존관계 선언 -->
        var uobj = MYAPP.utilities.object,
            ulang = MYAPP.utilities.lang,

            Constr;


        <!-- 공개 API - 생성자함수 -->
        Constr = function(o){
            this.elements = this.toArray(o);
        };

        Constr.prototype = {
            constructor : MYAPP.utilities.array,
            version : "2.0",
            toArray: function(obj){
                for(var i = 0, a = [], len = obj.length; i<len; i++){
                    a[i] = obj[i];
                }
                return a;
            }
        }

        <!-- 생성자 함수를 반환한다 -->
        <!-- 이 함수가 새로운 네임스페이스에 할당될 것이다 -->
        return Constr;
    }());


    var obj = [1, 3, 4, 5, 43, 45];
    var arr = new MYAPP.utilities.array(obj)

```

### 모듈에 전역변수 가져오기
> 이 패턴의 흔한 변형 패컨으로는 모듈을 감싼 즉시 실행 함수에 인자를 전달하는 형태가 있다.

```javascript

    MYAPP.utilities.array = (function(app, global){
        <!-- 전역 객체에 대한 참조와 -->
        <!-- 전역 애플리케이션 네임스페이스 객체에 대한 참조가 지역 변수화된다 -->
        <!-- code -->
    }(MYAPP, this))
```
