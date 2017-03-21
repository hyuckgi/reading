# 디자인 패턴

## 전략 패턴
> 전략패턴은 런타임에 알고리즘을 선택할 수 있게 해준다. 사용자는 동일한 인터페이스를 유지하면서, 특정한 작업을 처리할 알고리즘을 여러가지 중에서 상황에 맞게 선택할 수 있다.

> 전략패턴을 사용하는 예제로 폼(입력양식) 유효성 검사를 들 수 있다.

### 데이터 유효성 검사 예제
* validator객체의 validate()메서드는 폼의 특정한 타입에 관계없이 호출되고, 유효성 검사를 통과하지 못한 데이터 목록과 함께 에러 메시지를 반환한다.
> 사용자는 구체적인 폼과 검사할 데이터에 따라서 다른 종류의 검사 방법을 선택할 수도 있다. 유효성검사기가 작업을 처리할 최선의 '전략'을 선택하고, 그에 해당하는 적절한 알고리즘에 실질적인 데이터 검증 작업을 위임한다.

```javascript

    <!-- 유효성 검사 대상 -->
    var data = {
        first_name: "Super",
        last_name: "Man",
        age: "unknown",
        username: "o_0"
    };

    var validator = {
        <!-- 사용할 수 있는 모든 검사 방법들 -->
        types: {},

        <!-- 현재 유효성검사 세션의 에러 메시지들 -->
        messages: [],

        <!-- 현재 유효성 검사 설정 -->
        <!-- '데이터 필드명 : 사용할 검사 방법'의 형식 -->
        config: {},

        <!-- 인터페이스 메서드 -->
        <!-- 'data'는 이름 => 값 쌍이다 -->
        validate: function(data) {
            var i, msg, type, checker, result_ok;

            <!-- 모든 메시지를 초기화한다 -->
            this.messages = [];

            for(i in data) {
                if(data.hasOwnProperty(i)){
                    type = this.config[i];
                    checker = this.types[type];

                    if(!type) {
                        continue;
                        <!-- 설정된 검사 방법이 없을 경우 검증할 필요가 없으므로 건너뛴다 -->
                    }
                    if(!checker) {
                        <!-- 설정이 존재하나 해당하는 검사 방법을 찾을 수 없을 경우 오류 발생 -->
                        throw {
                            name: 'ValidationError',
                            message: type + '값을 처리할 유효성 검사가 존재하지 않습니다.'    
                        };
                    }
                    result_ok = checker.validate(data[i]);
                    if(!result_ok) {
                        msg = "\'" + i + "\' 값이 유효하지 않습니다." + checker.instructions;
                    }
                    this.messages.push(msg);
                }
            }
            return this.hasErrors()
        },

        <!-- 도우미 메서드 -->
        hasErrors: function() {
            return this.messages.length !== 0;
        }

    };

    <!-- 유효성 검사값 설정 -->
    validator.config = {
        first_name: 'isNonEmpty',
        age: 'isNumber',
        username: 'isAlphaNum'
    };

    <!-- 값을 가지는지 확인한다 -->
    validator.types.isNonEmpty = {
        validate: function(value) {
            return value !== "";
        },
        <!-- 에러 메시지에 사용될 한 줄짜리 도움말 정보 -->
        instructions: "이 값은 필수 입니다."
    };

    <!-- 숫자 값인지 확인한다 -->
    validator.types.isNumber = {
        validate: function(value){
            return !isNaN(value);
        },
        instructions: "숫자만 사용할 수 있습니다. 예 : 1, 3.14 or 2010"
    };

    <!-- 값이 문자와 숫자로만 이루어졌는지 확인한다. -->
    validator.types.isAlphaNum = {
        validate: function(value){
            return !/[^a-z0-9]/i.test(value);
        },
        instructions: "특수 문자를 제외한 글자와 숫자만 사용할 수 있습니다."
    };


    <!-- test -->
    validator.validate(data);
    if(validator.hasErrors()){
        console.log(validator.messages.join("\n"));
    }


```
