# 디자인 패턴

## 반복자 패턴
> 반복자 패턴에서 객채는 일종의 집합적인 데이터를 가진다.
> 객체의 사용자는 데이터가 어떻게 구조화되었는지 알 필요가 없고 개별 요소로 원하는 작업을 할 수만 있으면 된다.

> 반복자 패턴에서 객체는 next()메서드를 제공한다. next()를 연이어 호출하면 반드시 다음 순서의 요소를 반환해야 한다. 데이터 구조 내에서 '다음 순서'가 무엇을 의미하는지는 개발자에게 달려있다.

```javascript

    <!-- 반복자 패턴을 구현할 때, 데이터는 물론 다음에 사용할 요소를 가리키는 포인터(인덱스)도 비공개로 저장해두는 것이 좋다. 예제 구현 방법을 설명하기 위해 데이터는 단순한 보통의 배열이고, 다음번 순서의 요소를 가져오는 next()는 배열요소를 하나 걸러 반환한다고 가정하자 -->

    var agg = (function () {
        var index = 0,
            data = [1, 2, 3, 4, 5],
            length = data.length;

        return {
            next: function() {
                var element;
                if(!this.hasNext()) {
                    return null;
                }
                element = data[index];
                index = index + 2;
                return element;
            },
            hasNext: function() {
                return index < length;
            }
        };
    }());

    <!-- 확장 -->

    var agg = (function () {
        var index = 0,
            data = [1, 2, 3, 4, 5],
            length = data.length;

        return {
            next: function() {
                var element;
                if(!this.hasNext()) {
                    return null;
                }
                element = data[index];
                index = index + 2;
                return element;
            },
            hasNext: function() {
                return index < length;
            },
            <!-- rewind() : 포인터를 다시 처음으로 되돌린다. -->
            rewind: function() {
                index = 0;
            },
            <!-- current() : 현재 요소를 반환한다. -->
            current: function() {
                return data[index];
            }
        };
    }());


    <!-- 테스트 -->
    while (agg.hasNext()) {
        console.log(agg.next());
    }
    agg.rewind();
    console.log(agg.current());   <!-- 1 -->
```
