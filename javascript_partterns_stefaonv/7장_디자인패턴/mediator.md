# 디자인 패턴

## 중재자 패턴
> 크기에 상관없이 애플리케이션은 독립된 객체들로 만들어진다. 객체간 통신은 유지보수가 쉽고 다른 객체를 건드리지 않으면서 애플리케이션의 일부분을 안전하게 수정할 수 있는 방식으로 이루어져야 한다.

> 애플리케이션이 점차 커져가면서 더욱 많은 객체들이 추가된다. 애플리케이션을 리팩터링하는 동안, 객체들이 제거되거나 재배치되기도 한다. 객체들이 서로에 대해 너무 많은 정보를 아는 상태로(서로의 메서드를 호출하거나 프로퍼티를 변경하는 등) 직접 통신을 하게 되면 서로간에 결합도가 높아져 바람직하지 않다.객체들이 강하게 결합되면 다른 객체들에 영향을 주지 않고 하나의 객체를 수정하기가 어렵다. 매우 간단한 변경도 어려워지고 수정에 필요한 시간을 예측하는 것이 사실상 불가능해진다.

> 중재자 패턴은 결합도를 낮추고 유지보수를 쉽게 개선하여 이런 문제를 완화시킨다. 이패턴에서 독립된 동료 객체들은 직접 통신하지않고 중재자 객체를 거친다. ~~redux의 Action과 같은 것인가?~~ 동료들은 자신의 상태가 변경되면 중재자에게 알리고, 중재자는 이 변경 사항을 알아야 하는 다른 동료 객체들에게 알린다.

### 중재자 패턴 예제

```javascript

    <!-- 플레이어 객체 생성자 -->
    function Player(name) {
        this.points = 0;
        this.name = name;
    }

    <!-- 점수를 올려주고 중재자에게 알린다 -->
    Player.prototype.play = function() {
        this.points += 1;
        mediator.played();
    };

    var scoreboard = {

        <!-- 점수를 표시할 HTML 엘리먼트 -->
        element: document.getElementById('result'),

        <!-- 점수 표시를 갱신한다. -->
        update: function(score) {
            var i, msg = '';
            for(i in score) {
                if( score.hasOwnProperty(i) ){
                    msg += '<p><strong>' + i + '</strong>: ';
                    msg += score[i];
                    msg += '</p>';
                }
            }
            this.element.innerHTML = msg;
        }
    };

    var mediator = {
        <!-- 모든 player객체 -->
        players: {},

        <!-- 초기화 -->
        setup: function(){
            var players = this.players;
            players.home = new Player('home');
            players.guest = new Player('guest');
        },

        <!-- 누군가 play하고 점수를 업데이트 한다 -->
        played: function() {
            var players = this.players,
                score = {
                    Home: players.home.points,
                    Guest: players.guest.points
                };
            scoreboard.update(score);
        },

        <!-- 사용자 인터렉션을 핸들링한다 -->
        keypress: function(e) {
            e = e || window.event;
            if(e.which === 49) {
                mediator.players.home.play();
                return;
            }
            if(e.which === 48) {
                mediator.players.guest.play();
                return;
            }
        }
    };

    <!-- 게임 실행 / 종료 -->
    mediator.setup();
    window.onkeypress = mediator.keypress;

    <!-- "30초 후에 게임을 종료" -->
    setTimeout(function(){
        window.onkeypress = null;
        alert("Game over");
    }, 30000);

```
> 위의 예제가 구린것인가 전혀 독립된 객체로 보이지 않는다.
> 그냥 home, guest의 개별 인스턴스가 서로다른 액션을 하고 scoreboard.update()를 호출을 한번만 하고 있다는 것에서 의의를 두고 싶다.
