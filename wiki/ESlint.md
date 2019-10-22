### ESLint

- 마지막 `;` 의 사용

- trailing comma `,` 의 사용

  ```js
  ...
  components: {
  	'컴포넌트 이름': 컴포넌트 내용,
  }
  ...
  ```

- 등...



 ### ESLint disable

- 컴포넌트 내 주석 처리

  ```js
  ...
  /* eslint-disable */
  ...
  ```

- 파일 생성

  - `src/vue.config.js` 생성

    ```js
    module.exports = {
    	lintOnSave: false
    }
    ```

    

  