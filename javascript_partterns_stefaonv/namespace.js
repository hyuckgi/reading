
//네임스페이스 패턴


// 네임스페이스로 사용할 객체가 있는지 확인해 있으면 MYAPP으로 없으면 빈객체를 생성한다.
// 대중적이지만 혹시나 모를 중복이 발생할 수 있다.
// var MYAPP = MYAPP || {};

// 그래서 고유키를 설정하고 키로 확인하는 방법을 추가한다.  -by hika
var MYAPP = MYAPP && MYAPP.hasOwnProperty('ownKey') ? MYAPP : {ownKey:true}

// 이렇게해서 전역변수의 네임스페이스를 MYAPP으로 하나만 만들었다.
// 그러나 MYAPP하위의 객체, 메서드명이 중복되면 어떻게 할까?
// makeObjTree 파라미터로 받은 .notation애 의거해 하위 객체를 생성한다.
// 이때 하위객체명이 없으면 빈객체를 새로 생성한다.
MYAPP.makeObjTree = function(ns_string){
    var parts = ns_string.split('.'),
        parent = MYAPP;

    if(parts[0] === "MYAPP"){
        parts = parts.slice(1);
    }

    for(var i = 0;i<parts.length; i++){
        if(typeof parent[parts[i]] === "undefined"){
            parent[parts[i]] = {};
        }else{
            console.log(parent[parts[i]]);
        }
        parent = parent[parts[i]];
    }
    return parent;
};

MYAPP.makeObjTree("MYAPP.utils.api.upon.was.this") //이렇게 쓸수 있다.


// 의문점
// 1. makeObjTree의 이름이 겹치면 log를 찍게 해두웠지만 뭔가 불안하다. 이렇게 하면 override가 안 된다.
// 2. 또 각 네임스페이스마다 makeObjTree를 만들어야 한다.
// 3. 전역변수 영역을 안더럽힐려고 만들었는데 makeObjTree를 전역변수 영역으로 빼야하나?
// 4. 전역변수로 빼면 좀더 범용성있게 할 수 있을까?  parent = MYAPP 부분도 거슬린다.
