# 객체 생성 패턴

## 네임스페이스 패턴
> 네임스페이스는 프로그램에서 필요로 하는 전역 변수의 개수를 줄이는 동시에 과도한 접두어를 사용하지 않고도 이름이 겹치지 않게 해준다.

### 네임스페이스 패턴의 장, 단점
* 장점 : 코드 내의 이름 충돌 뿐 아니라 이 코드와 같은 페이지에 존재하는 자바스크립트 라이브러리나 위젯 등 서프파티 코드와의 이름 충돌도 방지해준다.

* 단점  
    - 모든 변수와 함수에 접두어를 붙여야 하기 때문에 전체적으로 코드량이 약간 더 많아지고 따라서 다운로드해야 하는 파일 크기도 늘어난다.
    - 전역 인스턴스가 단 하나뿐이기 때문에 코드의 어느 한 부분이 수정되어도 전역 인스턴스를 수정하게 된다. 즉 나머지 기능들도 갱신된 상태를 물려받는다.
    - 이름이 중첩되고 길어지므로 프로퍼티를 판별하기 위한 검색 작업도 길고 느려진다.


``` javascript

    <!-- 네임스페이스로 사용할 객체가 있는지 확인해 있으면 MYAPP으로 없으면 빈객체를 생성한다. -->
    var MYAPP = MYAPP || {};

    <!-- but, 혹시나 모를 중복이 발생할 수 있다. 그래서 고유키를 설정하고 키로 확인하는 방법을 추가한다.  - by hika -->
    var MYAPP = MYAPP && MYAPP.hasOwnProperty('ownKey') ? MYAPP : {ownKey:true}

    MYAPP.Parent = function() {};
    MYAPP.Child = function() {};
    MYAPP.some_var = 1;
    MYAPP.modules = {};

    MYAPP.modules.module1 = {};
    MYAPP.modules.module1.data = {a: 1, b: 2};
    MYAPP.modules.module2 = {};

```

### 범용 네임스페이스 함수
> 그러나 단지 존재여부만 확인하는 코드는 MYAPP하위의 객체, 메서드명이 중복되면 덮어써져 기존 코드에 영향을 준다 범용 네임스페이스 함수는 .notation으로 객체를 생성할때 중복을 방지한 객체 트리를 생성해줄 수 있다.

```javascript

    MYAPP.makeObjTree = function(ns_string){
        <!-- makeObjTree 파라미터로 받은 .notation으로 하위 객체를 생성한다. -->
        var parts = ns_string.split('.'),  
            parent = MYAPP;

        if(parts[0] === "MYAPP"){
            parts = parts.slice(1);
        }

        for(var i = 0;i<parts.length; i++){
            <!-- 이때 하위객체명이 없으면 빈객체를 새로 생성한다. -->
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

```

* 의문점
    1. makeObjTree의 이름이 겹치면 log를 찍게 해두웠지만 뭔가 불안하다. 이렇게 하면 override가 안 된다.
    2. 좀더 범용성있게 할 수 있을까?  parent = MYAPP 부분도 거슬린다.
