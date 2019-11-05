## MVVM 패턴

> 2019-11-03 작성자 곽빛나라

![img](https://wnstkdyu.github.io/2018/04/20/mvvmdesignpattern/mvvm.png)



그림 출처 : https://wnstkdyu.github.io



##### MVVM 패턴 정의

MVVM은 `View` - `ViewModel` - `Model` 을 이용해 각각의 역할을 분리하여 가독성과 재사용성을 높인 디자인 패턴이다.

* View : 사용자의 눈에 보이는 인터페이스(디자이너가 만듦), 유저 인터랙션을 받아 ViewModel에게 명령을 내린다.

* Model : 데이터 처리, 즉 데이터베이스와 통신, ViewModel이 소유하고 갱신하며 가공하여 View에 표시한다.

* ViewModel : View와는 Binding, Command로 연결하고, Model과는 데이터를 주고 받는 역할,

  Model을 가공해 View에 전달하거나, 유저 인터랙션이 올 경우 그에 따른 작업을 수행한다. 작업이 끝난 후 View를 이에 맞춰 바꿔줘야 하는데 Data Binding을 통해 이를 달성한다.
  
  

##### MVVM 패턴의 처리 플로우

1. View에 요청이 들어오면 Command를 통해 ViewModel로 보낸다.

2. ViewModel은 Model에 데이터를 요청한다. 그리고 Model은 데이터를 응답한다.

3. 이를 받은 ViewModel은 필요한만큼 가공한다.

4. View는 ViewModel과의 Data Binding을 통해 데이터를 자동으로 갱신한다.

   ![img](https://blog.yena.io/assets/post-img19/190316-mvc-mvvm.png)

   그림 출처 : http://blog.yena.io/

   View에서 ViewModel로, ViewModel에서 Model로 작업을 처리하며, View에서 Model을 직접 참조하지 않음
   
   대신, View에서 ViewModel을 관찰하며 data의 변경사항을 감지한다.

##### MVC와의 차이점

* MVVM은 MVC의 단점인 View와 Model의 의존성이 없음
* Model, View는 동일하나, Controller가 ViewModel로 바뀐 것이라고 보면 된다. 그리고 이 ViewModel은 UI단에 위치한다.(어디는 UI레이어 아래에 위차한다던데 흠)

##### MVVM의 큰 특징

* Command와 Data Binding을 통해 View의 의존성을 끊어버렸고 그럼으로써 View와 Model의 분리가 이루어짐

* Data Binding :

  * Model과 UI 요소 간의 싱크를 맞춰주는 것, 이 패턴을 통해 View와 로직이 분리되어 있어도 한쪽이 바뀌면 다른 쪽도 업데이트가 이루어져 데이터의 일관성을 유지할 수 있다.
  * MVVM패턴에서는 작업 흐름 제어보다는 view와 ViewModel의 상태를 동기화 해줄 구성요소가 필요함, 이 것이 data binding
  * 데이터 바인딩으로 인해 뷰모델 상태가 변경되면 뷰의 상태가 함께 변경된다. (그 역도 보장이 된다.)
  * MVVM 패턴은 data binding에 의존함

* Command : 쉽게 말하면 해당 이벤트에 대한 명령

  View에 입력이 들어오면 Command 패턴을 통해 ViewModel에 명령을 내리게 되고, ViewModel은 Model에게 필요한 data를 요청한다.

  Command를 통하여 Behavior를 View의 특정한 ViewAction(Event)와 연결할 수 있다.

##### MVVM 장점

1. View가 Data를 실시간으로 관찰한다.
   * Observable(식별할수있는?관찰할수있는?) 패턴을 이용하기 때문에 database를 관찰하고 자동으로 UI를 갱신한다. 직접 View를 바꾸어 주는 번거로움이 사라지며, data와 불일치할 확률이 줄어든다.
2. 생명주기로 부터 안전, Memory Leak 방지
   * ViewModel을 통해 data를 참조하기 때문에 액티비티/프래그먼트의 생명주기를 따르지 않는다. 화면전환과 같이 액티비티가 파괴된 후 재구성 되어도 ViewModel이 data를 홀드하고 있기때문에 영향을 받지 않는다.
   * View가 활성화 되어있을 경우에만 작동하기 때문에 불필요한 메모리 사용을 줄일 수 있다.
3. 역할 분리와 모듈화
   * UI, 비지니스 로직, 데이터베이스가 기능별로 모듈화되어있어 유닛테스트에 용이하다.

##### MVVM 단점

* 기존에 비해 추가로 만들어주어야 하는 클래스가 많아지고, 이들을 연결해주어야 한다. 이 과정이 복잡해지면 기존의 프로젝트에 적용하는 시간적, 인적 자원이 많이 요구된다.

  





![img](https://miro.medium.com/max/885/1*_L5tkaXY-tgIFy4ZOikj9g.png)그림 출처 :https://medium.com/@lgvalle/firebase-viewmodels-livedata-cb64c5ee4f95![img](https://miro.medium.com/max/2400/1*6YYuni9J8nDNjMAYh1TIAQ.jpeg)

그림 출처 : https://android.jlelse.eu/android-architecture-components-now-with-100-more-mvvm-11629a630125?gi=d84490235325



https://www.slideshare.net/DongHoLee23/acrhitecture-deisign-patternmvcmvpmvvm



-----------

출처

[MVVM 패턴이란?]( https://sarc.io/index.php/development/1332-mvvm)

[[Android] MVVM & 안드로이드 아키텍쳐 컴포넌트 시작하기](https://blog.yena.io/studynote/2019/03/16/Android-MVVM-AAC-1.html)

[[디자인패턴] MVC, MVP, MVVM 비교](https://beomy.tistory.com/43)