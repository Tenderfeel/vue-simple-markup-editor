# Vue Simple Markup Editor

> 長文をざっくりマークアップするやつ

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 変換ルール
* 空白行を挟むと&lt;p&gt;に変換
* 句読点＋改行または改行のみ→&lt;br&gt;
* ■テキスト → &lt;b&gt;■テキスト&lt;/b&gt;
* ・から始まる行と段落をリストに変換