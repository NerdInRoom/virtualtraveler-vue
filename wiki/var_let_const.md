# JavsScript의 변수 선언 var, let, const

> 2019-10-23 (작성자: 강민)



### var

- 재할당, 재선언이 가능한 변수 선언

- 함수 단위의 scope로 외부에서 접근이 가능

  ```javascript
  var a = 1
  a = 2
  console.log(a) // 2
  var a = 3
  console.log(a) // 3
  ```



### let

- 재할당은 가능하지만, 재선언은 불가능한 변수 선언

- 블록({ }) 단위의 scope로 오직 블록 안에서만 생명주기를 가짐

  ```javascript
  let b = 1
  b = 2
  console.log(b) // 2
  let b = 3 // SyntaxError: Identifier 'b' has already been declared
  ```

  

### const

- 재할당과 재선언이 불가능한 변수 선언. 상수로 많이 쓰임

- 블록({ }) 단위의 scope로 오직 블록 안에서만 생명주기를 가짐

  ```javascript
  const c = 1
  c = 2 // TypeError: Assignment to constant variable
  ```



### var, let, const 비교

|          | var  | let  | const |
| -------- | ---- | ---- | ----- |
| 재할당   | O    | O    | X     |
| 재선언   | O    | X    | X     |
| scope    | 함수 | 블록 | 블록  |
| 외부접근 | O    | X    | X     |



### 결론

- javascript의 대표적인 변수 선언들 중 가운데 var같은 경우 변수를 또 선언할 수 있기에 별다른 에러를 허용하는 원인이 된다. 또한 외부 접근이 가능하여 코드가 꼬일 수도 있다. 그러므로 var사용 대신, let과 const를 사용하자.
- let같은 경우 다시 할당할 수 있다는 점에서 값이 자주 바뀌는 변수로 선언할 때 사용하자
- const같은 경우 새로이 할당이 필요 없는 변수로 선언할 때, 즉, 상수처럼 사용할 때 사용하자.

