
// 객체 상수

// 범용 constant 객체 구현
// 1. 원시데이터 타입만 허용
// 2. hasOwnProperty로 겹치지않도록 예외추가
// 3. 모든 상수의 이름앞에 임의로 생성된 접두어 추가

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
