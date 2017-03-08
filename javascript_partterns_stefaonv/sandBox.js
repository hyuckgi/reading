
// 샌드박스 패턴

// 네임스페이스의 단점
// 1. 애플리케이션 전역객체가 단 하나의 전역변수에 의존하기 때문에 네임스페이스 패턴으로는
//    동일한 애플리케이션이나 라이브러리의 두가지 버전을 한 페이지에서 실행시키는 것이 불가능하다.
//    여러 버전들이 동일한 전역변수명을 쓰기 때문이다.

// 2. .notation으로 연결된 긴 이름은 런타임에 탐색작업을 거쳐야 한다.

// 샌드박스의 유일한 전역객체는 생성자다.
// 생성자를 통해 객체를 생성하고, 생성자에 콜백함수를 전달해 해당 코드를 샌드박스 내부환경으로 격리


// 원형
// new SandBox(function(box){
   // ...code
// });

// 1. new를 쓰지않고 강제하는 방법
// 2. 생성자가 선택적으로 인자를 하나 이상 받을 수 있게 한다.

function SandBox(){
    //arguments를 배열로 바꾼다.
    var args = Array.prototype.slice.call(arguments),
    //마지막 인자는 콜백함수다.
        callback = args.pop(),
    //모듈은 배열로 전달될 수도 있고 개별 인자로 전달될 수도 있다.
        modules = (args[0] && typeof args[0] === 'string') ? args : args[0];
    // 근데 생성자니까 초기상태를 주면 안될까? callback은 명시적으로 받고...
    // function SandBox(arg, callback){
    // var defaultOption = {
    //     arg: {
    //         name: 'kwon',
    //         version: '2.0'
    //     },
    //     callback: function(){
    //         return this.name;
    //     }
    // }
    // var modules = Object.assign({}, defaultOption, arg || {});
    // }

    // 함수가 생성자로 호출되도록 보장한다. 생성자강제패턴
    if(!(this instanceof SandBox)){
        return new SandBox(modules. callback);
    }
    // this가 인스턴스지만 생성타이밍이 아닐때는 instanceof로만 체크할수 없다.
    // var a = new SandBox("a", true);
    // SandBox.call(a) 할 경우
    // es6는 Symbol로 방어할 수 있지만 es3에서는 특수키를 부여해서 방어한다.  -by hika
    // if(!(this. instanceof SandBox) || this.hasOwnProperty("weweasdadwewew")) throw 1;
    // this.weweasdadwewew = true;

    this.a = 1;
    this.b = 2;

    if(!modules || modules === "*" || modules[0] === "*") {
        modules = [];
        for(i in SandBox.modules){
            if(SandBox.modules.hasOwnProperty(i)){
                modules.push(i);
            }
        }
    }

    for(var i =0; i<modules.length; i++){
        SandBox.modules[modules[i]](this);
    }
    callback(this);
}

SandBox.prototype = {
    name : "kwon",
    version : "2.0",
    getName : function(){
        return this.name;
    }
}


// var cloer = function(name){
//     var name = name;
//     return {
//         getName: function() {
//             return name;
//         }
//     }
// }
// function Parent() {
//
// }
// Parent.prototype.test = function(){
//     console.log("parent");
// }
// function Toggle() {
//
// }
// Toggle.prototype = new Parent();
//
// var t = new Toggle();
