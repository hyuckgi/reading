# 디자인 패턴

## 프록시 패턴
> 프록시 디자인 패턴에서는 하나의 객체가 다른 객체에 대한 인터페이스로 동작한다.

> 퍼사드 패턴이 메서드 호출 몇개를 결합시켜 편의를 제공하는 것에 불과하다면, 프록시는 클라이언트 객체와 실제 대상 객체 사이에 존재하면서 접근을 통제한다.

> 이패턴은 비용이 증가하는 것처럼 보일 수 있지만 실제로는 성능 개선에 도움을 준다. 프록시는 실제 대상 객체를 보호하며 되도록 일을 적게 시키기 때문이다.

### 예제
* 프록시 패턴은 실제 대상 객체가 비용이 많이 드는 작업을 할 때 유용하다. 네트워크 요청은 웹 어플리케이션에서 가장 비용이 많이 드는 작업 중 하나다. 따라서 가능한 많은 HTTP요청들을 하나로 결합하는 게 효과적이다.
> 책의 내용은 동영상 리스트의 HTTP요청을 프록시 패턴으로 50밀리초 간 발생한 요청을 모아 한번에 처리한다.
> 책의 예제는 실행되지 않는다. [구글신에서 찾은 다른 예제](http://www.dofactory.com/javascript/proxy-design-pattern)

```javascript

    function GeoCoder() {
        this.getLatLng = function(address) {

            if (address === "Amsterdam") {
                return "52.3700° N, 4.8900° E";
            } else if (address === "London") {
                return "51.5171° N, 0.1062° W";
            } else if (address === "Paris") {
                return "48.8742° N, 2.3470° E";
            } else if (address === "Berlin") {
                return "52.5233° N, 13.4127° E";
            } else {
                return "";
            }
        };
    }

    function GeoProxy() {
        var geocoder = new GeoCoder();
        var geocache = {};
        <!-- 이전 요청 결과를 캐시해두면 실제 객체를 보호할수 있고, 캐시 결과를 반환해서 네트워크 라운드 트립(HTTP 라면)을 줄인다. -->

        return {
            getLatLng: function(address) {
                if (!geocache[address]) {
                    geocache[address] = geocoder.getLatLng(address);
                }
                log.add(address + ": " + geocache[address]);
                return geocache[address];
            },
            getCount: function() {
                var count = 0;
                for (var code in geocache) { count++; }
                return count;
            }
        };
    };

    // log helper

    var log = (function() {
        var log = "";

        return {
            add: function(msg) { log += msg + "\n"; },
            show: function() { alert(log); log = ""; }
        }
    })();

    function run() {
        var geo = new GeoProxy();

        // geolocation requests

        geo.getLatLng("Paris");
        geo.getLatLng("London");
        geo.getLatLng("London");
        geo.getLatLng("London");
        geo.getLatLng("London");
        geo.getLatLng("Amsterdam");
        geo.getLatLng("Amsterdam");
        geo.getLatLng("Amsterdam");
        geo.getLatLng("Amsterdam");
        geo.getLatLng("London");
        geo.getLatLng("London");

        log.add("\nCache size: " + geo.getCount());
        log.show();
    }

```
> 대충 이해는 가지만 어렵다. 나중에 다시보자! 두고보자 프록시
