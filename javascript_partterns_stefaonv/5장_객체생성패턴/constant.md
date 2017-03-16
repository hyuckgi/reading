# 객체 생성 패턴

## 객체 상수
> 자바스크립트에는 ~~상수가 없지만~~(es6에서 const 추가) 대다수 최신브라우저 환경에서는 const문을 통해 상수를 생성할 수 있다.
> 정해진것은 아니지만 대부분 상수는 대문자와 _ 로 쓰는 명명 규칙이 있다.
> 실제 값이 변경되지 않게 하고 싶다면 비공개 프로퍼티를 만든후, 값을 설정하는 메서드(setter)없이 값을 반환하는 메서드(getter)만 제공하는 방법도 고려해볼만 하지만 대부분의 경우 과도하다

### 범용 constant 객체 구현

* 구현조건
1. 원시데이터 타입만 허용
2. hasOwnProperty로 겹치지않도록 예외추가
3. 모든 상수의 이름앞에 임의로 생성된 접두어 추가

```javascript
    var constant = (function(){
        var constants = {},
            ownProp = Object.prototype.hasOwnProperty,
            allowed = {
                string: 1,
                number: 1,
                boolean: 1
            },
            prefix = (Math.random() + "_").slice(2);
        return {
            set: function(name, value){
                if( this.isDefined(name)){
                    return false;
                }
                if(!ownProp.call(allowed, typeof value)){
                    return false;
                }
                constants[prefix + name] = value;
                return true;
            },
            isDefined: function(name){
                return ownProp.call(constants, prefix + name);
            },
            get: function(name){
                if(this.isDefined(name)){
                    return constants[prefix + name];
                }
                return null;
            }
        }
    }());

    constant.isDefined("maxwidth");   <!-- false -->

    constant.set("maxwidth", 480);  <!-- true -->

    constant.isDefined("maxwidth"); <!-- false -->

    constant.set("maxwidth", 320); <!-- false -->

    constant.get("maxwidth");   <!-- 480 -->


```
