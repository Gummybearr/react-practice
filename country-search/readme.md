# 무엇을 만들 것인가

나라 정보(코드, 수도, 이름, 대륙, 국가 전화번호)를 GET 으로 가져와 정보를 리스팅 해주는 페이지.

# Server 
Data URL
https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes
 
# 요구 사항
1. react, webpack을 베이스로 사용하여 개발
2. 보일러 플레이트(create-react-app 등)를 사용하지 않아야 함.
3. 버튼을 누르면 각 필드별 오름차순, 내림차순 정렬이 되어야 함.
4. 검색 창이 있어 통합 검색이 되어야 함. (Case insensitive, 부분일치)
5. 각 나라의 데이터 Row에 삭제 버튼이 있어 누르면 삭제되어야 함.
6. 나라 정보를 입력해서 Row를 추가할 수 있어야 함.
7. 모든 상태(나라 목록, 정렬 상태, 검색어 등)는 데이터 관리 라이브러리(Redux, MobX 등)에 저장되어야 함.
8. Network 통신은 redux middleware를 통해 되어야 함.
 
# 추가 요구 사항
1. 일부만 로딩 후 스크롤 아래로 갈 시 추가 로딩
2. form 라이브러리(redux-form, formik 등) 사용
3. cross browsing 적용
4. 검색 기능 (Rate limiting(debounce, throttle) 적용하여 타이핑 시 바로 검색)

# 어떻게 구현할 것인가
## Part 1. 요구사항 분석 
ux에 대한 고민
사용자가 프로그램을 어떻게 사용할 것인가? 라는 주제로 요구사항에 대한 문의를 한 이후 요구사항을 정확하게 이해할 수 있었다. ux의 흐름은 다음과 같다.

1. 검색창이 있고 검색창에 나라의 정보를 입력한다

2. 일치/부분일치 하는 데이터들의 리스트를 볼 수 있다.

3. 리스트에 있는 나라들을 [삭제]버튼을 눌러 삭제할 수 있다(업데이트는 바로 되어야 됨).

4. 추가하고 싶은 나라가 있을 경우 [추가]버튼을 누를 수 있다.

5. [추가]버튼을 눌러 모달 등의 방법으로 기존의 리스트가 날아가지 않는 선에서 검색을 진행할 수 있고 추가할 수 있다.  

6. 리스트의 정렬은 과제에서 주어진 바와 같이 모든 요소로 정렬이 가능해야 한다.

* 단, 이때 모든 작업은 하나의 페이지에서 일어나야 한다. /list에서 정보를 보고, /search에서 검색을 하고 이런식이 아니다. 

## Part 2. 설계
> 어떻게 해야 redux를 잘 쓸 수 있을까?

Redux를 사용한다면 컴포넌트/객체들의 상태는 이러한 흐름으로 관리가 될 것이다.


## Part 3. 요구사항 구현
> 일단은 하나씩 하자.

### 📝 1번 & 2번

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


### 📝 다음 요구사항들을 충족하기 위한 준비단계

`1번째 준비: 설계 반영` 

App.js에 header, article, footer의 구조를 나타내고, article에 SearchBar, Container, Country, Button, ModalBox가 다 잘 Mount된다는 것을 확인하고, css가 동작하는지만 확인 하였다. 

1번째 준비과정을 마치고 `Add skeleton component` 커밋을 남겼다. 

`2번째 준비: Redux연동`

```shell
npm i -D redux react-redux
```
이후에 reducer, store와 같은 내용은 예제 깃헙과 이전에 뜨문뜨문 봐왔던 프로젝트 구조와 기억에 의존하여 react와 redux를 연동하였다.

2번째 준비과정을 마치고 `Link react and redux` 커밋을 남겼다.

### 📝 8번

```shell
npm i -D axios redux-thunk
```

Redux-middleware는 사용해본적이 없던 터라, 공부가 조금 필요했다. 다행히 Redux-middleware를 이용한 네트워크는 기존의 ajax와 크게 다르지 않았고, Axios와 같은 라이브러리 또한 자유롭게 사용할 수 있었다. redux의 reducer로 요청이 오면 요청을 통해 객체들으 상태를 바꾸기 이전에 middleware와 연동된 동작을 미리 수행한다는 것이 핵심인데, 이를 통해 기존에 middleware를 사용하지 않는 것에 비해 조금 더 객체들의 상태를 바꿔줄 수 있다는 장점이 있어보였다.

8번을 마치고 `Add GET request with redux middleware` 커밋을 남겼다.

### 📝 7번(1/2)

통신을 통해 가져온 값으로 컴포넌트를 업데이트하는 과정이 필요한데, 그러기 위해서는 redux에 데이터를 저장해야 한다. 또, mapStateToProps을 사용하여 객체들이 redux의 상태변화를 subscribe하도록 해야 한다. 또, 객체들이 처음 생성될때만 렌더가 되도록 해야 한다. React hook을 사용하려면 useState말고 useEffect를 사용하여 해당 로직을 구현할 수 있다.

해당 과정을 끝내고 `Update screen after search button click` 커밋을 남겼다.

### 📝 4번

그냥 검색을 아무렇게나 하게 해도 되지만, 그렇게 될 경우 구현 로직이 다소 복잡해질 수 있다. 어떤 필드에 입력값을 대조해야 하는지 알 수 없기 때문이다. 그렇기 때문에 form 형식을 써서 검색을 구체화할 수 있도록 하였다. 

이를 끝내고 `Add form style in search` 커밋을 남겼다.

커밋을 하고 보니 여전히 구현 로직이 다소 복잡해질 수 있음을 발견했다. 입력한 값들을 redux에 전달하거나, middleware에서 처리해야 하는데 값을 보내는 방식이 모든 객체에 일일이 접근해서 값을 얻어오는 방식으로 구현될 것이었기 때문이었다. 

react에서 사용할 수 있는 form 라이브러리 중 Formik을 사용하였다. redux-form를 먼저 사용하려고 했으나, 독스가 다소 덜 정돈된 느낌을 받아서 예제가 개인적인 선호에 맞았던 Formik을 사용했다. 

검색의 경우 우선 모든 나라를 받아 온 뒤 검색 조건에 맞게 나라들을 필터링해주었다. 간결하게 함수를 짜고 싶었지만, 현재로서는 이정도에 만족해야 할 것 같다.

```javascript
function stringSubMatch(country1, country2){
  let flag = {
    name: false,
    alpha2Code: false,
    callingCodes: false,
    capital: false,
    region: false
  }
  for(let i in country2){
    if(!country2[i]){
      flag[i]=true
    } else{
      if(country1[i]?.toLowerCase().includes(country2[i]?.toLowerCase())){
        flag[i] = true
      }
    }
  }
  return flag.name&flag.alpha2Code&flag.callingCodes&flag.capital&flag.region
}
```

4번을 끝내고 `Add Search function` 커밋을 남겼다.

### 📝 5번

4번을 하는 과정 중에서 redux에 저장된 나라 정보를 업데이트하는 dispatcher와 이와 연결된 reducer를 추가해주는 것으로 해결할 수 있다. 

5번을 끝내고 `Add remove row function` 커밋을 남겼다.

### 📝 3번

각 항목별로 정렬이 되어야 한다.

오름차순과 내림차순이 토글되면서 적용되도록 구현한다. 

```javascript
// onSort가 정렬 파트
const mapDispatchToProps = (dispatch) => {
    return {
        list: () => {
            dispatch({type: 'GET_DATA', payload: []})
        },
        onSort: (props) => {
            let field = ''
            let method = ''
            let countries = props.countries.map((country)=>(country))

            if(props.sort.field==props.target){
                method = props.sort.method==='ASCENDING'?'DESCENDING':'ASCENDING'
            } else{
                method='ASCENDING'
            }

            field = props.target

            if(countries?.length){
                countries.sort((a,b)=> {
                    if(method==='ASCENDING'){
                        return a[field]>b[field]?1:-1
                    } else{
                        return a[field]<b[field]?1:-1
                    }
                })
            }

            dispatch({type: 'SORT_DATA', payload: 
                {
                    sort: {'field': field, 'method': method},
                    countries: countries
                }
            })
        }
    }
}
```

3번을 끝내고 `Add sort function` 커밋을 남겼다.


# 예상 질문과 대답

<details>
    <summary>왜 테이블을 div로 구현하였나요?</summary>
    table이 성능상 별로 좋지 않기 때문에 div로 table을 대체했습니다.
</details>

<details>
    <summary>왜 비즈니스 로직을 실행한 이휴에 reducer에 상태를 넘기나요?</summary>
    reducer는 공유자원으로 사용되고 있고, 따라서 접점이 많기 때문에 부하를 줄이기 위해 그렇게 했습니다.
</details>


# 참고자료

> With Google and Internet, you're standing on the shoulders of giants

[Create react project without CRA in 10 min](https://www.youtube.com/watch?v=TkMpKCJEFB4)

[리액트 웹팩으로 개발환경 구축하기](https://velog.io/@_uchanlee/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%9B%B9%ED%8C%A9%EC%9C%BC%EB%A1%9C-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0without-CRA)

[CRA 없이 리액트 앱 시작하기](https://lsy26499.tistory.com/68)

[react-redux 강의](https://www.youtube.com/watch?v=Cwwsv_OaWhM)

[react-redux 예제](https://github.com/gothinkster/react-redux-realworld-example-app/blob/master/src/reducer.js)

[redux middleware get request](https://www.youtube.com/watch?v=tcCS4mGAq7Q)

[redux form](https://www.youtube.com/watch?v=l_Yp8_SuGgU)

[formik]()

[div table generator](https://divtable.com/generator/) 