# JavaScript import/export

> <a href="https://www.daleseo.com/js-module-import/">참고자료</a>를 정리한 내용입니다.

### `require`

NodeJs에서 사용되는 CommonJS 키워드

```js
const module = require('moduleA');
```



### `import`

ES6에서 새롭게 도입된 키워드

```js
import module from 'moduleA';
```

- 비동기 방식으로 작동한다.
- 모듈에서 실제 쓰이는 부분만 불러오기 때문에 성능과 메모리 부분에서 유리한 측면이 있다.



#### 복수 객체 export / import

##### export

- Named Exports

  내보낼 때 변수, 함수의 이름을 그대로 불러온다.

  ```js
  //currency-functions.js
  
  const exchangeRate = 0.91;
  
  // 안 내보냄
  function roundTwoDecimals(amount) {
    return Math.round(amount * 100) / 100;
  }
  
  // 내보내기 1
  export function canadianToUs(canadian) {
    return roundTwoDecimals(canadian * exchangeRate);
  }
  
  // 내보내기 2
  const usToCanadian = function(us) {
    return roundTwoDecimals(us / exchangeRate);
  };
  export { usToCanadian };
  ```



- Default Export

  단일 객체 내보내기, 내보낼 때 이름을 지정하지 않기 때문에 불러올 때 아무 이름이나 사용할 수 있다.

  ```js
  //currency-object.js
  
  const exchangeRate = 0.91;
  
  // 안 내보냄
  function roundTwoDecimals(amount) {
    return Math.round(amount * 100) / 100;
  }
  
  // 내보내기
  export default {
    canadianToUs(canadian) {
      return roundTwoDecimals(canadian * exchangeRate);
    },
  
    usToCanadian: function(us) {
      return roundTwoDecimals(us / exchangeRate);
    }
  };
  ```

  변수에 할당하여 내보내고 싶다면 다음과 같이 가능하고 불러올 때 변수 이름을 강제하지도 않는다.

  ```js
  const obj = {
    canadianToUs(canadian) {
      return roundTwoDecimals(canadian * exchangeRate);
    }
  };
  
  obj.usToCanadian = function(us) {
    return roundTwoDecimals(us / exchangeRate);
  };
  
  export default obj;
  ```

  

##### import

- 여러 객체(Named Exports)를 불러올 때는 ES6의 Destructuring 문법을 사용해서 필요한 객체만 선택적으로 전역에서 사용하거나, 모든 객체에 별명을 붙이고 그 별명을 통해서 접근할 수도 있습니다.

  ```js
  // test-currency-functions.js
  
  // Destructuring
  import { canadianToUs } from './currency-functions';
  
  console.log('50 Canadian dollars equals this amount of US dollars:');
  console.log(canadianToUs(50));
  
  // Alias
  import * as currency from './currency-functions';
  
  console.log('30 US dollars equals this amount of Canadian dollars:');
  console.log(currency.usToCanadian(30));
  ```

  



- 단일 객체를 불러올 때는 원하는 이름을 주고 해당 객체를 통해 속성에 접근하면 된다.

  ```js
  //test-currency-object.js
  
  import currency from './currency-object';
  
  console.log('50 Canadian dollars equals this amount of US dollars:');
  console.log(currency.canadianToUs(50));
  
  console.log('30 US dollars equals this amount of Canadian dollars:');
  console.log(currency.usToCanadian(30));
  ```

  