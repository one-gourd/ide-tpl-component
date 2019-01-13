## 概览

[NAME]

## 安装使用

npm 包方式：
```shell
npm install --save [NAME]
```

web 方式：
```html
<script src="https://unpkg.com/[NAME]@[VERSION]/dist/index.umd.js"></script>
```
引入之后将会暴露全局变量 `[LIBNAME]`.

> 如果你想要在 webpack 中 external 该库，可以使用以下配置：
```js
{
    externals: {"[NAME]": "[LIBNAME]"}
}
```

## 如何本地开发？

### 本地调试

首先从 git 仓库拉取代码，安装依赖项：
```shell
git clone [REPO]

npm install

## 安装 peerDependencies 依赖包
npm install [PEERLIST]
```

运行以下命令后，访问 demo 地址： http://localhost:9000
```shell
npm run dev
```

也可访问 [storybook](https://github.com/storybooks/storybook) 参考具体的使用案例：http://localhost:9001/
```shell
npm run storybook
```

### 运行测试用例

使用 [jest](https://jestjs.io) 进行测试，执行：

```shell
npm test
```

### 打包发布

普通的 npm 发布即可，记得发布前需要手动打包：

```shell
npm run build && npm publish
```


