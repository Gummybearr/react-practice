# 무엇을 만들 것인가

나라 정보(코드, 수도, 이름, 대륙, 국가 전화번호)를 GET 으로 가져와 정보를 리스팅 해주는 페이지.

## Server 
Data URL
https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes
 
## 요구 사항
1. react, webpack을 베이스로 사용하여 개발
2. 보일러 플레이트(create-react-app 등)를 사용하지 않아야 함.
3. 버튼을 누르면 각 필드별 오름차순, 내림차순 정렬이 되어야 함.
4. 검색 창이 있어 통합 검색이 되어야 함. (Case insensitive, 부분일치)
5. 각 나라의 데이터 Row에 삭제 버튼이 있어 누르면 삭제되어야 함.
6. 나라 정보를 입력해서 Row를 추가할 수 있어야 함.
7. 모든 상태(나라 목록, 정렬 상태, 검색어 등)는 데이터 관리 라이브러리(Redux, MobX 등)에 저장되어야 함.
8. Network 통신은 redux middleware를 통해 되어야 함.
 
## 추가 요구 사항
1. 일부만 로딩 후 스크롤 아래로 갈 시 추가 로딩
2. form 라이브러리(redux-form, formik 등) 사용
3. cross browsing 적용
4. 검색 기능 (Rate limiting(debounce, throttle) 적용하여 타이핑 시 바로 검색)

## 어떻게 구현할 것인가
### Part 1. 요구사항 분석 
ux에 대한 고민
사용자가 프로그램을 어떻게 사용할 것인가? 라는 주제로 요구사항에 대한 문의를 한 이후 요구사항을 정확하게 이해할 수 있었다. ux의 흐름은 다음과 같다.

1. 검색창이 있고 검색창에 나라의 정보를 입력한다

2. 일치/부분일치 하는 데이터들의 리스트를 볼 수 있다.

3. 리스트에 있는 나라들을 [삭제]버튼을 눌러 삭제할 수 있다(업데이트는 바로 되어야 됨).

4. 추가하고 싶은 나라가 있을 경우 [추가]버튼을 누를 수 있다.

5. [추가]버튼을 눌러 모달 등의 방법으로 기존의 리스트가 날아가지 않는 선에서 검색을 진행할 수 있고 추가할 수 있다.  

6. 리스트의 정렬은 과제에서 주어진 바와 같이 모든 요소로 정렬이 가능해야 한다.

* 단, 이때 모든 작업은 하나의 페이지에서 일어나야 한다. /list에서 정보를 보고, /search에서 검색을 하고 이런식이 아니다. 

### Part 2. 설계
> 어떻게 해야 redux를 잘 쓸 수 있을까?

Redux를 사용한다면 컴포넌트/객체들의 상태는 이러한 흐름으로 관리가 될 것이다.


### Part 3. 요구사항 구현
> 일단은 하나씩 하자.

`1번 & 2번`
```shell
mkdir country-search //프로젝트 진행할 디렉토리 만들고
cd country-search //디렉토리 안으로 들어가서
npm -y init //리액트, 웹팩 등등 설치하기 위해 패키지 매니저 연동
npm i react react-dom //리액트, 돔 접근 라이브러리 설치
npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin //모듈 번들러, 프론트 서버, html지원 플러그인 설치
npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader @babel/preset-react css-loader node-sass sass-loader style-loader //크로스브라우징을 위한 트랜스파일러 및 스타일 적용 라이브러리 설치
```

```js
// webpack.config.js 작성
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: './src/index.js'
    },
    mode: 'development',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}
```
```js
// src/index.js
import React from 'react'
import ReactDom from 'react-dom'

import App from './App'

ReactDom.render(<App />, document.getElementById('root'))
```
```js
// src/App.js
import React from 'react'

function App(){
    return <div>
        <h1>It works</h1>
    </div>
}

export default App;
```
```html
<!-- public/index.html -->
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Country Search</title>
    <meta content="ie=edge">
</head>

<body>
    <div id='root'></div>
</body>

</html>
```
이렇게 1,2번을 해결하나 했는데...! 
```shell
Error: Cannot find module 'webpack-cli/bin/config-yargs'
```
이런 에러가 떴다. npm-cli의 특정 버전에서 레포 구조가 달라져서 이런 일이 생긴 거였는데, [공식 레포](https://github.com/webpack/webpack-dev-server/issues/2029)에서 해답을 찾고 고칠 수 있었다.

1번과 2번을 해결한 자료의 커밋로그는 `Init webpack-based environment`로, 깃헙에서 확인할 수 있다.

`다음 요구사항들을 충족하기 위한 준비단계`

1번째 준비: 설계 반영 

App.js에 header, article, footer의 구조를 나타내고, article에 SearchBar, Container, Country, Button, ModalBox가 다 잘 Mount된다는 것을 확인하고, css가 동작하는지만 확인 하였다. 

1번째 준비과정을 마치고 `Add skeleton component` 커밋을 남겼다. 

2번째 준비: Redux연동

3번째 준비: Redux-middlware를 통한 네트워크 통신

4번째 준비: 통신을 통해 가져온 값으로 컴포넌트 상태 변경


## 참고자료
> With Google and Internet, you're standing on the shoulders of giants

[Create react project without CRA in 10 min](https://www.youtube.com/watch?v=TkMpKCJEFB4)

[리액트 웹팩으로 개발환경 구축하기](https://velog.io/@_uchanlee/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%9B%B9%ED%8C%A9%EC%9C%BC%EB%A1%9C-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0without-CRA)

[CRA 없이 리액트 앱 시작하기](https://lsy26499.tistory.com/68)
