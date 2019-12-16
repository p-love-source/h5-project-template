# dyd-h5

### 1、简介
点一点-h5移动端项目

### 2、运行及打包
运行命令，需要dyd-h5-cli脚手架配合使用，
脚手架项目文档：https://code.aliyun.com/dyd666/dyd-h5-cli

+ 常用命令：

  ```bash
  # 全局安装脚手架
  npm i dyd-h5-cli -g
  
  # 创建子项目
  dyd init 子项目名
  
  # 启动子项目（默认dev环境）
  dyd start 子项目名
  
  # 以指定环境启动子项目
  # 目前环境有dev、test、beta、prod，具体以项目的.env相关文件为准
  dyd start 子项目名 环境模式
  
  # 打包子项目（默认prod环境）
  dyd build 子项目名
  
  # 以指定环境打包子项目
  # 目前环境有dev、test、beta、prod，具体以项目的.env相关文件
  dyd build 子项目名 环境模式
  ```

  

### 4、结构

  ```bash
  ├── dist                              // 打包好的文件
  ├── public                            // 模板静态文件
  ├── src                               // 核心源代码
  │   ├── projects                      // 存储所有子项目
  │   │   ├── demo                      // 子项目模板
  │   │   │   ├── api                   // api请求列表
  │   │   │   ├── assets                // 图片、字体等
  │   │   │   ├── components            // 公共组件
  │   │   │   ├── utils                 // 公共js
  │   │   │   │   ├── http.js           // ajax请求封装
  │   │   │   │   ├── importVant.js     // vant按需引入
  │   │   │   │   └── routerGuards.js   // 路由导航守卫
  │   │   │   ├── views                 // 页面源码
  │   │   │   ├── config.js             // 子项目配置文件
  │   │   │   └── index.html            // html模板
  │   │   └── ......                    // 其他子项目
  │   ├── resources                     // 存储全局公共资源
  │   │   ├── assets                    // 全局公共图片、字体等
  │   │   ├── components                // 全局公共组件
  │   │   ├── styles                    // 全局公共样式
  │   │   ├── utils                     // 全局公共js
  │   │   │   ├── flexible.js           // rem适配
  │   │   │   ├── request.js            // 全局axios请求封装
  │   │   │   ├── tools.js              // 全局公共函数
  │   │   │   └── vconsole.js           // vconsole调试工具
  ├── .env                              // 全局环境配置
  ├── .env.beta                         // beta环境配置
  ├── .env.dev                          // 本地环境配置
  ├── .env.prod                         // 生产环境配置
  ├── .env.test                         // test环境配置
  ├── .eslintrc                         // eslint配置
  ├── .prettierrc                       // prettier配置
  └── postcss.config.js                 // postcss插件配置
  ```

### 5、目录介绍
+ src目录包含projects和resources两个文件夹，
+ resources存放公共资源文件，
+ projects存放所有子项目，该目录下每个文件夹都是一个子项目，每个子项目相互独立，单独编译及打包，

### 6、代码规范
+ 代码规范的目的是提高项目的可维护性。
+ 请阅读以上目录结构，了解每个文件和文件夹的作用，按照项目结构风格来编程。
+ 项目已配置eslint + prettier，需要自行配置好编辑器才能生效。
+ vscode的eslint配置：
1、安装eslint插件。
2、打开vscode设置的settings.json，添加以下配置：
```
"eslint.validate": [
  "javascript",
  "javascriptreact",
  "vue-html",
  { "language": "vue", "autoFix": true }
],
"eslint.options": {
  "plugins": ["html"]
},
"eslint.autoFixOnSave": true,
```
+ vscode的prettier配置：
1、安装prettier插件。
2、打开vscode设置的settings.json，添加以下配置：
```
"[html]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[css]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[less]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[scss]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[javascript]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[vue]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"vetur.format.defaultFormatter.html": "js-beautify-html",
"vetur.format.defaultFormatterOptions": {
  "prettier": {
    "eslintIntegration": true,
    "singleQuote": true,
    "semi": true
  }
},
```
+ 另外vscode还需要安装个插件：EditorConfig for VS Code
用来自动识别项目的.editorconfig文件配置，保持编辑器编码风格的统一。
