# JavaScript 비동기

> [자바스크립트 헷갈리는 개념 바로알기]: https://goo.gl/PXuiDB
> [자바스크립트 Promise 쉽게 이해하기]: https://joshua1988.github.io/web-development/javascript/promise-for-beginners/



## Promise

>- 자바스크립트 비동기 처리에 사용되는 객체
>
>- resolve를 통해 Promise 객체에 반환하고자하는 값을 담을 수 있고, reject를 통해 예외를 발생시킬수 있다. 



#### 일반적인 callback 패턴과 Promise 패턴 비교

###### 일반적인 callback 패턴

> 비동기 함수를 순차적으로 호출하기 위해서는 아래와 같이 복잡한 코드 구조를 가져야된다.

```javascript
function delay(sec, callback){
    setTimeout(() => {
        callback(new Date());
    }, sec * 1000);
}
```

```javascript
delay(1, (result) => {
    console.log(1, result);
    delay(1, (result) => {
        console.log(2, result);
        dealy(1, (result) => {
            console.log(3, result);
        });
    });
});
```



###### Promise 패턴

> .then()을 사용해서 코드 구조가 명료해진다.

```javascript
function delayPromise(sec){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Date());
        }, sec * 1000);
    });
}
```

```javascript
delayPromise(1).then((result) => {
    console.log(1, result);
    return delayPromise(1);
}).then((result) => {
    console.log(2, result);
    return delayPromise(1);
}).then((result) => {
    console.log(3, result);
});
```



#### Promise 예외처리

> Promise 객체의 catch()를 통해 예외를 처리한다.

```javascript
function wait(sec) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('error!');
        }, sec * 1000);
    });
}

wait(3)
    .then(()=>{
    	// 비동기 로직이 정상적으로 완료되었을 때
	})
	.catch(()=>{
    	// 비동기 로직에서 예외가 발생했을 때
	})
```



## async

###### async로 선언된 함수는 Promise 객체를 반환한다

```javascript
// 두 함수 모두 Promise 객체를 반환
async function myAsync(){
    return 'async';
}

function myPromise(){
    return new Promise((resolve, reject) => {
        resolve('async');
    });
}
```

###### Promise 객체에 담긴 resolved 값은 .then의 callback 함수의 인자로 접근 할 수 있다

```javascript
myAsync().then((result) => {
    // result가 Promise 객체에 담긴 resolved value
    // 위 예제에서 result === 'async'
})
```



## await

###### await는 비동기 로직이 이행(fulfilled) 또는 실패(rejected) 할 때까지 기다리기(pending) 위해 사용되는 문법으로, async로 선언된 함수내에서만 사용가능하다.

```javascript
// delay없이 바로 'test' 출력
function test(){
    delayPromise(3);
    console.log('test');
}

// 3초 후 'test' 출력
async function testAwait(){
    await delayPromise(3);
    console.log('test');
}
```



## async/await 예외처리

###### async/await는 동기로직에서처럼 try/catch 구문으로 처리가능하다.

```javascript
function wait(sec){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('wait Error!!!');
        }, sec * 1000);
    });
}
```

```javascript
async function myAsync(){
    console.log(new Date());
    try{
        await wait(3);
    }catch(e){
        console.error(e);
    }
    console.log(new Date());
}
```

###### Promise 객체의 catch()를 사용해서도 예외처리가 가능하다.

```javascript
async function myAsync(){
    console.log(new Date());
    await wait(3).catch(e => {
        console.error(e);
    });
    console.log(new Date());
}
```

###### 단, 예외가 발생하면 예외 Promise 객체가 반환되므로 조심해야한다.

```javascript
async function myAsync(){
    console.log(new Date());
    const result = await wait(3).catch(e => {
        console.error(e);
    });
    console.log(result); // result === 예외 promise 객체
    					 // 예외가 발생하지 않으면 wait에서 resolved 된 값이 반환된다.
    console.log(new Date());
}
```

