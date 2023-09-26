# create-react-app创建项目之基于craco的配置

代码在Github仓库：https://github.com/smalllhui/webpack-react-init-template

## 背景介绍

1、react-scripts 是 create-react-app 的一个核心包，一些脚本和工具的默认配置都集成在里面，而 yarn eject 命令执行后会将封装在 create-react-app 中的配置全部反编译到当前项目，这样用户就能完全取得 webpack 文件的控制权。所以，eject 命令存在的意义就是更改 webpack 配置。

2、npm run eject 会复制所有依赖文件和相应的依赖（webpack、babel等）到你的项目，是不可逆操作。

3、配置过于繁琐，配置文件代码过多,不易快速寻找

![eject.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7edf83b9e6844a08b9a6889712493ce7~tplv-k3u1fbpfcp-watermark.image?)

## craco介绍


- **C**reate **R**eact **A**pp **C**configuration **O**verride是**一个用于 create-react-app**的简单易懂的配置层。
- 通过在应用程序的根目录添加单个配置（例如）文件并自定义 eslint、babel、webpack配置等等，无需使用“弹出”即可获得 create-react-app**和自定义的所有好处。**

- 您所要做的就是使用[create-react-app](https://github.com/facebook/create-react-app/)创建您的应用程序并自定义配置文件。

  **须知：**`craco适用于使用 create-react-app 创建项目,不想 eject 项目但想对项目中 wepback 进行自定义配置的开发者。`

## 开发环境的安装

### 1、vscode安装插件

Prettier、ESLint、Stylelint、EditorConfig

### 2、安装Node

#### 安装nvm及配置

```
//1、下载nvm
https://github.com/coreybutler/nvm-windows/releases/tag/1.1.10
//2.安装到指定路径
打开nvm/settings.txt 加上
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
//3、配置环境变量
//3.1、环境变量配置
  NVM_HOME:D:\SoftwareInstall\nvm
  NVM_SYMLINK:D:\SoftwareInstall\nodejs
//3.2、path 后新增 
  %NVM_HOME%
  %NVM_SYMLINK%

$ nvm -v //验证是否安装成功
$ nvm list //查看本地已经安装的node版本列表
```

#### 安装node

```
//安装node 注意：安装LTS 版本
$ nvm install [version] //安装指定版本的node 例如：nvm install 14.15.1 
$ nvm use [version] //使用node 例如：nvm use 14.15.1
$ nvm uninstall [version] //卸载node  例如：nvm uninstall 14.15.1

通过npm安装 cnpm,替代 npm
  npm install -g cnpm --registry=https://registry.npm.taobao.org
```

**安装yarn**

```
cnpm install -g yarn //全局安装   卸载: npm uninstall -g yarn
yarn --version	//查看版本
yarn 或 yarn install  //安装项目的全部依赖
yarn add [package] // 添加依赖包 生产环境中
yarn add [package] --dev  //将依赖项添加到不同依赖项类别中 开发依赖
yarn remove [package] // 移除依赖包
yarn upgrade [package]  // 升级依赖包

yarn的下载的源服务器，替换为淘宝的镜像服务器：
yarn config set registry https://registry.npm.taobao.org
```

## 1、使用create-react-app创建项目

```bash
yarn add create-react-app -g //全局安装脚手架
```

```bash
1.创建项目
	yarn create react-app webpack-react-permission-system-demo --template typescript
2.进入项目文件夹
	cd  webpack-react-permission-system-demo
3.启动项目
	yarn start
启动成功看见界面。安装ok
```

## 2、开发规范配置

### 1、配置.editorconfig

.editorconfig文件是一种用于定义和维护跨多个编辑器和IDE的代码风格的文件格式。它可以帮助团队成员在不同的编辑器和IDE中保持一致的代码格式，从而减少代码风格带来的问题。例如，它可以定义缩进、换行符、字符集等细节。编辑器和IDE可以通过插件或内置功能来支持.editorconfig文件。

在项目根目录创建.editorconfig文件

```tex
# http://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
trim_trailing_whitespace = true
insert_final_newline = true
quote_type = single
```

### 2、Eslint+prettier

#### 1、Eslint

```bash
// yarn add eslint -D 脚手架已经安装了
npx eslint --init
```

选择如下:

>Q:How would you like to use ESLint? ...
>	🔥A:To check syntax, find problems, and enforce code style
>
>Q:What type of modules does your project use? ...
>	A:JavaScript modules (import/export)
>
>Q:Which framework does your project use? ...
>	A:React
>
>Q:Does your project use TypeScript? » No / Yes
>	A:Yes
>
>Q:Where does your code run? ...
>	A:Browser
>
>Q:How would you like to define a style for your project? ...
>	 🔥A:Answer questions about your style
>
>Q:What format do you want your config file to be in? ...
>	JavaScript
>
>后面按照提示选就行了 。最后将.eslintrc.js重新命名为.eslintrc.cjs  			[.js]=>[.cjs]

添加一个eslint忽略校验的文件,`.eslintignore`

```
node_modules
public
scripts
config
build
dist
```

修改package.json中的scripts为。执行 yarn lint 会进行代码检查及代码修复

```
"lint": "eslint . --ext .js,.ts,.jsx,.tsx",
"lint:fix": "eslint --fix . --ext .js,.ts,.jsx,.tsx",
// "lint": "eslint --fix --ext .js,.ts,.jsx,.tsx src"  // src 代表修复src下面 .从根目录开始
```

#### 2、prettier

1、安装

```
yarn add prettier -D
```

2、项目根目录添加 .prettierrc 文件

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "avoid"
}

```

配置描述

```
printWidth: 80, // 每行代码长度（默认80）
tabWidth: 2, // 每个tab相当于多少个空格（默认2）
useTabs: false, // 是否使用tab进行缩进（默认false）
semi: false, // 声明结尾使用分号(默认true)
singleQuote: true, // 使用单引号（默认false）
trailingComma: 'all', // 多行使用拖尾逗号（默认none）
bracketSpacing: true, // 对象字面量的大括号间使用空格（默认true）
arrowParens: 'avoid', // 只有一个参数的箭头函数的参数是否带圆括号（默认avoid）
jsxBracketSameLine: false, // 多行JSX中的>放置在最后一行的结尾，而不是另起一行（默认false）
```

.prettierignore

```tex
# .prettierrc忽略校验
/public/**
/.husky/**
/node_modules/**
/dist/**
```

#### 3、eslint prettier 冲突解决

```
// 安装依赖
yarn add eslint-config-prettier eslint-plugin-prettier -D
```

修改 `.eslintrc.cjs`

```js
module.exports = {
  // .....
  extends: [
 	// .....
    'plugin:prettier/recommended', // 加上这一行，解决eslint prettier 冲突问题
  ],
  // .....
}
```

#### 5、.eslintignore

```tex
# 忽略文件或文件夹
dist/
build/
.husky/
config/
```

#### 6、.eslintrc.cjs文件配置如下

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended', // 加上这一行，解决eslint prettier 冲突问题
  ],
  overrides: [
    {
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {},
  /*
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // js 详细规则：http://eslint.cn/docs/rules/
    /** @js */
    quotes: [2, 'single'], // 强制使用一致的单引号
    semi: [2, 'never'], // 强制是否使用分号
    'no-undef': 'error', // 不能有未定义的变量
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'no-debugger': 'off', // 是否允许使用debugger
    'no-console': 'off', //  是否允许使用console

    // ts 详细规则：https://typescript-eslint.io/rules/
    /** @typescript */
    '@typescript-eslint/no-unused-vars': 'error', // 定义变量没有使用
    '@typescript-eslint/no-explicit-any': 'off', //不能使用any

    /** @react */
    'react-refresh/only-export-components': 'off',

    // vue 详细规则：https://eslint.vuejs.org/rules/
    /** @vue */
  },
}
```

#### 6、修改package.json文件

```tex
// 在scripts中添加
"lint": "eslint . --ext .js,.ts,.jsx,.tsx",
"lint:fix": "eslint --fix . --ext .js,.ts,.jsx,.tsx",
```

执行`yarn lint` 可以检测错误，是否符合配置规范
执行`yarn lint:fix` 可以检测错误并修复

### 3、lint-staged+husky配置

#### 1、lint-staged

`lint-staged` 是一个前端文件过滤工具，它仅过滤 `Git` 代码暂存区文件。当 `git commit` 时，`pre-commit` 钩子会启动，执行 `lint-staged` 命令。

```bash
yarn add lint-staged -D
```

#### 2、husky

每次手动去运行命令检查太麻烦了，而且也很考验小伙伴的自觉性。

husky 是一个 Git 钩子（Git hooks）工具，它可以让你在 Git 事件发生时执行脚本，进行代码格式化、测试等操作。

常见的钩子

- `pre-commit`：在执行 Git `commit` 命令之前触发，用于在提交代码前进行代码检查、格式化、测试等操作。
- `commit-msg`：在提交消息（commit message）被创建后，但提交操作尚未完成之前触发，用于校验提交消息的格式和内容。
- `pre-push`：在执行 Git `push` 命令之前触发，用于在推送代码前进行额外检查、测试等操作。

具体的使用步骤如下：

1. 安装 husky

```bash
yarn add husky -D
```

2. 初始化 **husky**, 会在根目录创建 **.husky** 文件夹

```bash
npm set-script prepare "husky install"
yarn prepare 			# 初始化husky,将 git hooks 钩子交由,husky执行
```

3. **pre-commit** 执行 **yarn lint-staged --allow-empty** 指令

```bash
npx husky add .husky/pre-commit "yarn lint-staged --allow-empty"
```

4. 在**package.json**中添加

```bash
"lint-staged": {
    "*.{js,jsx,vue,ts,tsx}": [
      "prettier --write",
      "eslint --fix"
    ],
    "*.{css,less,scss}": [
      "prettier --write"
    ]
},
```

某一次提交想要禁用 `husky`，可以添加参数`--no-verify`

```bash
git commit --no-verify -m "xxx"
```

### 4、配置git代码提交规范

#### 1、Commitizen  

 Commitizen 是一个用于规范化提交信息的工具，它能够帮助项目团队创建一致、易读的 Git 提交消息。通过使用 Commitizen，你可以确保提交信息按照预定义的规范格式化，方便后续查看和管理项目历史记录。

使用步骤：

1. 运行以下命令，安装 Commitizen 和 Commitizen 适配器，比如 `cz-conventional-changelog`：

```bash
yarn add commitizen cz-conventional-changelog -D
```

2. 安装完成后，在 package.json 中添加一个 config.commitizen 的字段，并设置它的值为 cz-conventional-changelog。

```json
"config": {
    "commitizen": {
    "path": "cz-conventional-changelog"
    }
}
```

3. 在 `package.json` 中的 `scripts` 字段中添加一个 `commit` 的命令。 示例如下：

```json
"scripts": {
  "commit": "git-cz"
}
```



`git add .`后在执行 `yarn commit` 就可以进行交互式提交了。

#### 2、commitlint

Commitizen是用来创建规范化提交的，如果项目成员没有使用 `npm run commit` 来提交，而是直接使用 git commit 的话还是有可能生成不规范提交的，所以还需要对最终的提交格式做一下校验，接下来添加提交格式校验，

1. 安装：

```bash
yarn add commitlint @commitlint/config-conventional -D
```

2. 添加 commit-msg 钩子

```bash
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

3. 项目根目录添加`commitlint.config.cjs`文件

```javascript
/*
 * @Description: commit-msg提交信息格式规范
 *
 * commit-msg格式: <type>(scope?): <subject>
 *   - type: 用于表明我们这次提交的改动类型，是新增了功能？还是修改了测试代码？又或者是更新了文档？
 *       - feat, // 新增功能、页面
 *       - fix, // 修补bug
 *       - docs, // 修改文档、注释
 *       - style, // 格式：不影响代码运行的变动、空格、格式化等等
 *       - ui, // ui修改：布局、css样式等等
 *       - hotfix, // 修复线上紧急bug
 *       - build, // 改变构建流程，新增依赖库、工具等（例如:修改webpack）
 *       - refactor, // 代码重构，未新增任何功能和修复任何bug
 *       - revert, // 回滚到上一个版本
 *       - perf, // 优化：提升性能、用户体验等
 *       - ci, // 对CI/CD配置文件和脚本的更改
 *       - chore, // 其他不修改src或测试文件的更改
 *       - test, // 测试用例：包括单元测试、集成测试
 *       - update // 更新：普通更新
 *   - scope：一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。
 *   - Subject：一句话描述此次提交的主要内容，做到言简意赅
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'], // body上面有换行
    'footer-leading-blank': [1, 'always'], // footer上面有换行
    'header-max-length': [2, 'always', 108], // header上最大108字符
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新增功能、页面
        'fix', // 修补bug
        'docs', // 修改文档、注释
        'style', // 格式：不影响代码运行的变动、空格、格式化等等
        'ui', // ui修改：布局、css样式等等
        'hotfix', // 修复线上紧急bug
        'build', // 改变构建流程，新增依赖库、工具等（例如:修改webpack）
        'refactor', // 代码重构，未新增任何功能和修复任何bug
        'revert', // 回滚到上一个版本
        'perf', // 优化：提升性能、用户体验等
        'ci', // 对CI/CD配置文件和脚本的更改
        'chore', // 其他不修改src或测试文件的更改
        'test', // 测试用例：包括单元测试、集成测试
        'update', // 更新：普通更新
      ],
    ],
  },
}
```

#### 3、commitlint自定义提交规范

1. 安装依赖

```bash
yarn add commitlint-config-cz  cz-customizable -D
```

2. 变更 **commitlint.config.cjs** 这里采用自己定义的规范,将会覆盖上面那个

```js
/*
 * @Description: commit-msg提交信息格式规范
 *
 * commit-msg格式: <type>(scope?): <subject>
 *   - type: 用于表明我们这次提交的改动类型，是新增了功能？还是修改了测试代码？又或者是更新了文档？
 *       - feat, // 新增功能、页面
 *       - fix, // 修补bug
 *       - docs, // 修改文档、注释
 *       - style, // 格式：不影响代码运行的变动、空格、格式化等等
 *       - ui, // ui修改：布局、css样式等等
 *       - hotfix, // 修复线上紧急bug
 *       - build, // 改变构建流程，新增依赖库、工具等（例如:修改webpack）
 *       - refactor, // 代码重构，未新增任何功能和修复任何bug
 *       - revert, // 回滚到上一个版本
 *       - perf, // 优化：提升性能、用户体验等
 *       - ci, // 对CI/CD配置文件和脚本的更改
 *       - chore, // 其他不修改src或测试文件的更改
 *       - test, // 测试用例：包括单元测试、集成测试
 *       - update // 更新：普通更新
 *   - scope：一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。
 *   - Subject：一句话描述此次提交的主要内容，做到言简意赅
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'], // body上面有换行
    'footer-leading-blank': [1, 'always'], // footer上面有换行
    'header-max-length': [2, 'always', 108], // header上最大108字符
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新增功能、页面
        'fix', // 修补bug
        'docs', // 修改文档、注释
        'style', // 格式：不影响代码运行的变动、空格、格式化等等
        'ui', // ui修改：布局、css样式等等
        'hotfix', // 修复线上紧急bug
        'build', // 改变构建流程，新增依赖库、工具等（例如:修改webpack）
        'refactor', // 代码重构，未新增任何功能和修复任何bug
        'revert', // 回滚到上一个版本
        'perf', // 优化：提升性能、用户体验等
        'ci', // 对CI/CD配置文件和脚本的更改
        'chore', // 其他不修改src或测试文件的更改
        'test', // 测试用例：包括单元测试、集成测试
        'update', // 更新：普通更新
      ],
    ],
  },
}
```

3. 根目录增加 .cz-config.cjs
   关于`commitlint-config-cz`更高级的用法可以查看 👉[commitlint-config-cz](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwhizark%2Fcommitlint-config-cz)

```js
module.exports = {
  types: [
    { value: 'feat', name: '新增:新增功能、页面' },
    { value: 'fix', name: 'bug:修复某个bug' },
    { value: 'docs', name: '文档:修改增加文档、注释' },
    { value: 'style', name: '格式:不影响代码运行的变动、空格、格式化等等' },
    { value: 'ui', name: 'ui修改:布局、css样式等等' },
    { value: 'hotfix', name: 'bug:修复线上紧急bug' },
    { value: 'build', name: 'build: 变更项目构建或外部依赖' },
    { value: 'refactor', name: '重构:代码重构,未新增任何功能和修复任何bug' },
    { value: 'revert', name: '回滚:代码回退到某个版本节点' },
    { value: 'perf', name: '优化:提升性能、用户体验等' },
    { value: 'ci', name: '自动化构建:对CI/CD配置文件和脚本的更改' },
    { value: 'chore', name: 'chore: 变更构建流程或辅助工具' },
    { value: 'test', name: '测试:包括单元测试、集成测试' },
    { value: 'update', name: '更新:普通更新' },
  ],
  scopes: [],
  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: "TICKET-",
  ticketNumberRegExp: "\\d{1,5}",
  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  messages: {
    type: "选择一种你的提交类型:",
    scope: "选择一个scope (可选):",
    // used if allowCustomScopes is true
    customScope: "表示此更改的范围:",
    subject: "简短说明(最多40个字):\n",
    body: '长说明,使用"|"换行(可选):\n',
    breaking: "非兼容性说明 (可选):\n",
    footer: "关联关闭的issue,例如:#12, #34(可选):\n",
    confirmCommit: "确定提交?",
  },
  allowCustomScopes: true,
  // 设置选择了那些type,才询问 breaking message
  allowBreakingChanges: ['feat', 'fix', 'ui', 'hotfix', 'update', 'perf'],
  // 想跳过的问题
  skipQuestions: ["scope", "body", "breaking"],
  // limit subject length
  subjectLimit: 100,
};
```

4. package.json 中,将原来commit配置,变更为自定义配置

```json
  "config": {
    "commitizen": {
      "path": "cz-customizable"
    },
    "cz-customizable": {
      "config": ".cz-config.cjs"
    }
  },
```

### 5、配置Stylelint

#### 1、安装依赖(只配置less)

建议先配**步骤3.2**之后在回到该步骤

```bash
yarn add less less-loader -D
yarn add stylelint stylelint-config-standard stylelint-config-prettier stylelint-order  stylelint-less postcss-less  -D
```

**stylelint**：stylelint的核心代码
**stylelint-config-standard**：预设的Stylelint配置文件，其定义了一组约定俗成的代码规则和最佳实践，可以帮助开发者避免一些常见的CSS错误和问题，保持代码风格的统一性和可维护性
**stylelint-config-prettier**：关闭与 Prettier 可能冲突的规则，解决 Stylelint + Prettier 时的冲突问题
**stylelint-less**：对Less文件进行语法检查和规则校验。它能够识别Less中的变量、混合函数等特性，并提供了相应的规则校验
**stylelint-order**：用于样式表（CSS、Sass、Less等）中规则的排序和风格检查工具
**postcss-less**：支持检查 less

#### 2、新建.stylelintrc.cjs文件

```js
module.exports = {
  processors: [],
  plugins: ['stylelint-order'], // 添加规则插件
  extends: ['stylelint-config-standard', 'stylelint-config-prettier', 'stylelint-less'],
  // 不同格式的文件指定自定义语法
  overrides: [
    {
      files: ['**/*.(less|css)'],
      customSyntax: "postcss-less", // 处理.less文件时使用postcss-less语法解析器
    }
  ],
  // 忽略检测文件
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml',
  ],
  // 自定义配置规则
  rules: {
    'no-empty-source': null,
    // 禁止空块
    'block-no-empty': null,
    // 指定类选择器的模式
    'selector-class-pattern': null,
    'selector-id-pattern': null,
    // 不验证@未知的名字，为了兼容scss的函数
    'at-rule-no-unknown': null,
    // 指定样式的排序 修复后会帮我们自动整理CSS样式的顺序
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'float',
      'width',
      'height',
      'max-width',
      'max-height',
      'min-width',
      'min-height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'margin-collapse',
      'margin-top-collapse',
      'margin-right-collapse',
      'margin-bottom-collapse',
      'margin-left-collapse',
      'overflow',
      'overflow-x',
      'overflow-y',
      'clip',
      'clear',
      'font',
      'font-family',
      'font-size',
      'font-smoothing',
      'osx-font-smoothing',
      'font-style',
      'font-weight',
      'line-height',
      'letter-spacing',
      'word-spacing',
      'color',
      'text-align',
      'text-decoration',
      'text-indent',
      'text-overflow',
      'text-rendering',
      'text-size-adjust',
      'text-shadow',
      'text-transform',
      'word-break',
      'word-wrap',
      'white-space',
      'vertical-align',
      'list-style',
      'list-style-type',
      'list-style-position',
      'list-style-image',
      'pointer-events',
      'cursor',
      'background',
      'background-color',
      'border',
      'border-radius',
      'content',
      'outline',
      'outline-offset',
      'opacity',
      'filter',
      'visibility',
      'size',
      'transform',
    ],
  },
}
```

#### 3、创建.stylelintignore文件

```tex
# .stylelintignore
# 旧的不需打包的样式库
*.min.css

# 其他类型文件
*.js
*.jsx
*.ts
*.tsx
*.jpg
*.png
*.eot
*.ttf
*.woff
*.json

# 测试和打包目录
/node_modules/*
/dist/*
/public/*
```

#### 4、修改package.json

在scripts中添加

```
"stylelint": "stylelint src/**/*.{css,less}",
"stylelint:fix": "stylelint --fix src/**/*.{css,less}"
```

修改 lint-staged

```json
"lint-staged": {
    "*.{js,jsx,vue,ts,tsx}": [
        "prettier --write",
        "eslint --fix"
    ],
    "*.{css,less}": [
        "stylelint --fix",
        "prettier --write"
    ]
},
```

### 6、standard-version（自动生成、打tag）

```bash
yarn add standard-version -D
```

```tex
// scripts中添加
"release": "standard-version"
```

版本升级、需要 yarn release，就可以有 yarn  version 的功能，而且提交信息是标准的 commitizen 规范，而且自动生成 changelog 自动打 tag，自动 commit。你只需要 push 即可。

## 3、项目初始化配置

### 1、配置@别名

1、配置@别名

```bash
yarn add @craco/craco @craco/types -D 
yarn add @babel/plugin-proposal-private-property-in-object -D // 缺少依赖
```

在项目根目录也就是package.json平级目录,新建一个`craco.config.cjs`文件

```javascript
/* eslint-disable @typescript-eslint/no-var-requires */

// 具体配置见官网：https://craco.js.org/docs/
const path = require('path')
module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src'),
    },
  },
}
```

2、修改tsconfig.json，在compilerOptions内添加

```javascript
// 解析非相对模块名的基准目录
"baseUrl": ".",
// 模块名到基于 baseUrl的路径映射的列表。
"paths": {
   "@/*": ["src/*"]
}
```

3、在package.json更改 命令

```tex
/* package.json */
"scripts": {
-   "start": "react-scripts start",
-   "build": "react-scripts build",
-   "test": "react-scripts test",
+   "start": "craco start",
+   "build": "craco build",
+   "test": "craco test",
}
即

"scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
}
```

### 2、配置全局less

**配置less**

```bash
yarn add less less-loader craco-less -D
```

修改craco.config.cjs

```js
const CracoLessPlugin = require('craco-less')
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
    },
  ],
}

```

测试1

```less
//app.less
.container{
	background-color: red;
}
```

```tsx
// App.tsx
import React from 'react'
import '@/app.less'

/**
 * @Description:App页面
 */
const App: React.FC = () => {
  return <div className="container">App</div>
}

export default App
```

测试2

```less
// app.module.less
.container{
	background-color: red;
}
```

```tsx
// App.tsx
import React from 'react'
import styles from '@/app.module.less'

/**
 * @Description:App页面
 */
const App: React.FC = () => {
  return <div className={styles.container}>App</div>
}

export default App
```

vscode引入less报错、在src/react-app-env.d.ts文件中添加

```tsx
declare module '*.module.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.less' //app.less不报错 该行可以不配
```

**配置全局less**

```tex
yarn add -D craco-plugin-stylus-resources-loader
```

在src/assets/styles/less/下、创建global.less文件

```less
@hot-color: green;
```

修改craco.config.cjs

```tsx
// 与plugins里面配置 plugins:[]

// 配置全局less
// https://www.npmjs.com/package/craco-plugin-stylus-resources-loader
const path = require('path')
const CracoLessPlugin = require('craco-less') //配置less
const cracoPluginStyleResourcesLoader = require('craco-plugin-stylus-resources-loader')
module.exports = {
// 插件配置
  plugins: [
    {
      plugin: CracoLessPlugin,
    },
    {
      plugin: cracoPluginStyleResourcesLoader,
      options: {
        patterns: [path.join(__dirname, 'src/assets/styles/less/global.less')],
        styleType: 'less',
      },
    },
  ],
}
```

```less
// app.module.less
.container{
  background-color:@hot-color;
}
```

`yarn start` 运行项目、背景色变了就表示配置成功

### 3、配置跨域代理

修改craco.config.cjs、添加

```tsx
// 具体配置见官网：https://craco.js.org/docs/
module.exports = {
 // 本地服务配置
  devServer: {
    port: 8000,
    // 跨域配置
    proxy: {
      '/api': {
        //请求转发给谁
        target: 'http://localhost:8080',
        changeOrigin: true, //是否对告诉真实服务器真实的源，false不改变源(真实的源) true(改变源)-----用于控制请求头中的host值
        pathRewrite: { '^/api': '' }, //重写请求路径(必须)
        ws: true, //用于支持websocket
      },
    },
  },
}
```

### 4、完整的简单配置

`craco.config.js`

```tsx
/* eslint-disable @typescript-eslint/no-var-requires */
//配置less
const CracoLessPlugin = require('craco-less')
//配置全局less
const cracoPluginStyleResourcesLoader = require('craco-plugin-stylus-resources-loader')
// 具体配置见官网：https://craco.js.org/docs/
const path = require('path')
module.exports = {
  // 本地服务配置
  devServer: {
    port: 8000, //端口号
    // 跨域配置
    proxy: {
      '/api': {
        //请求转发给谁
        target: 'http://localhost:8080',
        //是否对告诉真实服务器真实的源，false不改变源(真实的源) true(改变源)-----用于控制请求头中的host值
        changeOrigin: true,
        pathRewrite: { '^/api': '' }, //重写请求路径(必须)
        ws: true, //用于支持websocket
      },
    },
  },
  // 插件配置
  plugins: [
    { plugin: CracoLessPlugin }, // 配置less
    {
      plugin: cracoPluginStyleResourcesLoader, //配置全局less
      options: {
        patterns: [path.join(__dirname, 'src/assets/styles/less/global.less')],
        styleType: 'less',
      },
    },
  ],
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src'),
    },
  },
}
```

## 4、项目打包配置

### 1、打包开启 gzip 压缩

```bash
yarn add --dev @babel/plugin-proposal-private-property-in-object // 缺少依赖
yarn add -D compression-webpack-plugin
```

在`craco.config.cjs`中配置

```tsx
const CompressionPlugin = require('compression-webpack-plugin');//引入gzip压缩插件

// 使用gzip压缩超过1M的js和css文件
new CompressionPlugin({
    // filename: "[path][base].gz", // 这种方式是默认的，多个文件压缩就有多个.gz文件
    algorithm: 'gzip', // 官方默认压缩算法也是gzip
    test: /\.(js|css)$/, // 使用正则给匹配到的文件做压缩，这里是给css、js
    threshold: 1024, //以字节为单位压缩超过此大小的文件，使用默认值10240吧
    minRatio: 0.8, // 最小压缩比率，官方默认0.8
    //是否删除原有静态资源文件，即只保留压缩后的.gz文件，建议这个置为false，还保留源文件。以防：
    // 假如出现访问.gz文件访问不到的时候，还可以访问源文件双重保障
    deleteOriginalAssets: false,
}),
```

### 2、happypack多线程打包

由于运行在 Node.js 之上的 webpack 是单线程模型的，我们需要 webpack 能同一时间处理多个任务，发挥多核 CPU 电脑的威力

`HappyPack` 就能实现多线程打包，它把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程，来提升打包速度

```bash
yarn add happypack -D
```

```js
// 多线程打包
const HappyPack = require('happypack')
const os = require('os')
// 开辟一个线程池，拿到系统CPU的核数，happypack 将编译工作利用所有线程
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

// 添加到plugins中
// 多线程打包
new HappyPack({
  // id标识happyPack处理那一类文件
  id: 'happyBabel',
  loaders: ['babel-loader'],
  // 共享进程池
  threadPool: happyThreadPool,
}),
```

### 3、分析打包后的文件体积

```bash
yarn add -D webpack-bundle-analyzer
```

在`craco.config.cjs`中配置

```js
/* eslint-disable @typescript-eslint/no-var-requires */

// 具体配置见官网：https://craco.js.org/docs/
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {

  // ....
  // webpack 配置
  webpack: {
    plugins: {
      add: [
        new BundleAnalyzerPlugin(), // 使用默认配置
      ],
    },
  },
  // ....
}

```

参数配置

```javascript
new BundleAnalyzerPlugin(options?: object)
```

| 名称                    | 类型描述                                                     | 描述                                                         |
| ----------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **`analyzerMode`**      | One of: `server`, `static`, `json`, `disabled`               | 默认值：server。 在server 模式下，分析器将启动 HTTP 服务器以显示 bundle 报告。 在 static 模式下，将生成带有 bundle 报告的单个 HTML 文件。 在 json 模式下，将生成带有捆绑报告的单个 JSON 文件。 在 disable 模式下，您可以使用此插件通过将 generateStatsFile 设置为 true 来生成 Webpack Stats JSON 文件。 |
| **`analyzerHost`**      | `{String}`                                                   | 默认值：127.0.0.1。 在 server 模式下用于启动 HTTP 服务器的主机。 |
| **`analyzerPort`**      | `{Number}` or `auto`                                         | 默认值：8888。在 server 模式下用于启动 HTTP 服务器的端口     |
| **`reportFilename`**    | `{String}`                                                   | 默认值：report.html。 在 static 模式下生成的捆绑报告文件的路径。 它可以是绝对路径，也可以是相对于 bundle 文件输出目录的路径（在 webpack 配置中是 output.path）。 |
| **`reportTitle`**       | `{String|function}`                                          | 默认值：返回打印当前日期和时间的函数。 HTML 的 title 元素的内容； 或获取该内容的 () => string 形式的函数。 |
| **`defaultSizes`**      | One of: `stat`, `parsed`, `gzip`                             | 默认值：parsed。 默认情况下在报告中显示的模块大小。stat：这是文件的“输入”大小，在进行任何转换（如缩小）之前。之所以称为“stat size”，是因为它是从 Webpack 的 stats 对象中获取的。parsed：这是文件的“输出”大小。 如果你使用的是 Uglify 之类的 Webpack 插件，那么这个值将反映代码的缩小后的大小。gzip：这是通过 gzip 压缩运行解析的包/模块的大小。 |
| **`openAnalyzer`**      | `{Boolean}`                                                  | 默认值：true。 在默认浏览器中自动打开报告。                  |
| **`generateStatsFile`** | `{Boolean}`                                                  | 默认值：false。 如果为 true，将在 bundle 输出目录中生成 webpack stats JSON 文件 |
| **`statsFilename`**     | `{String}`                                                   | 默认值：stats.json。 如果 generateStatsFile 为 true，表示将生成的 webpack stats JSON 文件的名称。 它可以是绝对路径，也可以是相对于bundle文件输出目录的路径（在 webpack 配置中是 output.path）。 |
| **`statsOptions`**      | `null` or `{Object}`                                         | 默认值：null。 stats.toJson() 方法的选项。 例如，您可以使用 source: false 选项从统计文件中排除模块的源代码。 |
| **`excludeAssets`**     | `{null|pattern|pattern[]}` 其中 pattern 可以是 `{String|RegExp|function}` | 默认值：null。 用于匹配将从报告中排除的资源名称的模式。 如果 pattern 是一个字符串，它将通过 new RegExp(str) 转换为 RegExp。 如果 pattern 是一个函数，它应该具有以下签名 (assetName: string) => boolean 并且应该返回 true 以排除匹配的资源。 如果提供了多个模式，资源应至少匹配其中一个以被排除。 |
| **`logLevel`**          | One of: `info`, `warn`, `error`, `silent`                    | 默认值：info。 用于控制插件输出多少细节                      |

### 4、优化CDN配置

通过 craco 来修改 webpack 配置，从而实现 CDN 优化
`public/index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="description" content="Web site created using create-react-app" />
  <title>React App</title>
  <!-- 加载第三发包的 CDN CSS链接 -->
  <% htmlWebpackPlugin.options.cdn.css.forEach(cdnURL=> { %>
    <link rel="stylesheet" href="<%= cdnURL %>">
    </link>
    <% }) %>
</head>

<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
  <!-- 加载第三发包的 CDN JS链接 -->
  <% htmlWebpackPlugin.options.cdn.js.forEach(cdnURL=> { %>
    <script src="<%= cdnURL %>"></script>
    <% }) %>
</body>

</html>
```

`配置部分代码`

```js
whenProd(() => {
    // 只有生产环境才配置
    webpackConfig.externals = {
        // 线上替换cdn key:value key为库的名字 value为umd模块导出到global对象的key名
        react: 'React',
        'react-dom': 'ReactDOM',
        axios: 'axios',
    }
})

// 根据插件名获取插件 返回是否找到和匹配的插件
const { isFound: isHtmlWebpackPluginFound, match: htmlWebpackPlugin } = getPlugin(
    webpackConfig,
    pluginByName('HtmlWebpackPlugin'),
)

if (isHtmlWebpackPluginFound) {
    // cdn url要按照库的相互依赖优先级填写 被依赖的写前面优先加载
    htmlWebpackPlugin.userOptions.cdn = whenProd(
        () => ({
            // 配置现成的cdn 资源数组 现在是公共为了测试、实际开发的时候 用公司自己花钱买的cdn服务器
            js: [
                'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.0/axios.min.js',
            ],
            css: ['https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.min.css'],
        }),
        // 本地环境设为空 防止页面遍历报错
        {
            js: [],
            css: [],
        },
    )
}
```

### 5、上述配置如下

craco.config.cjs

```js
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
//配置less
const CracoLessPlugin = require('craco-less')
//配置全局less
const cracoPluginStyleResourcesLoader = require('craco-plugin-stylus-resources-loader')
//引入gzip压缩插件
const CompressionPlugin = require('compression-webpack-plugin')
// 多线程打包
const HappyPack = require('happypack')
// 系统信息
const os = require('os')
// 开辟一个线程池，拿到系统CPU的核数，happypack 将编译工作利用所有线程
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
// 打包后的文件体积分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { getPlugin, pluginByName, whenProd } = require('@craco/craco')
// 具体配置见官网：https://craco.js.org/docs/
module.exports = {
  // 插件配置
  plugins: [
    { plugin: CracoLessPlugin }, // 配置less
    {
      plugin: cracoPluginStyleResourcesLoader, //配置全局less
      options: {
        patterns: [path.join(__dirname, 'src/assets/styles/less/global.less')],
        styleType: 'less',
      },
    },
  ],
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src'),
    },

    configure: (webpackConfig, { paths }) => {
      // 修改打包输出文件目录
      paths.appBuild = path.resolve(__dirname, 'dist')
      webpackConfig.output = {
        ...webpackConfig.output,
        clean: true, // 自动将上次打包目录资源清空
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/', //资源名
      }

      // 生产环境 才会下面配置

      whenProd(() => {
        // 删除log
        const TerserPlugin = webpackConfig.optimization.minimizer.find(i => i.constructor.name === 'TerserPlugin')
        if (TerserPlugin) {
          // TerserPlugin.options.minimizer.options.compress['drop_console'] = true // 删除所有console语句
          TerserPlugin.options.minimizer.options.compress['drop_debugger'] = true
          TerserPlugin.options.minimizer.options.compress['pure_funcs'] = ['console.log'] //删除打印语句
        }

        // webpack添加插件
        webpackConfig.plugins.push(
          // 配置完以后，暂时还不能使用，还需要后端做一下配置，这里后端以nginx为例
          // 使用gzip压缩超过1M的js和css文件
          new CompressionPlugin({
            // filename: "[path][base].gz", // 这种方式是默认的，多个文件压缩就有多个.gz文件
            algorithm: 'gzip', // 官方默认压缩算法也是gzip
            test: /\.(js|css)$/, // 使用正则给匹配到的文件做压缩，这里是给css、js
            threshold: 10240, //以字节为单位压缩超过此大小的文件，小于10KB就不进行压缩
            minRatio: 0.8, // 最小压缩比率，官方默认0.8
            //是否删除原有静态资源文件，即只保留压缩后的.gz文件，建议这个置为false，还保留源文件。以防：假如出现访问.gz文件访问不到的时候，还可以访问源文件双重保障
            deleteOriginalAssets: false,
          }),

          // 使用多线程打包
          new HappyPack({
            // id标识happyPack处理那一类文件
            id: 'babel',
            loaders: ['babel-loader'],
            // 共享进程池
            threadPool: happyThreadPool,
          }),

          // 打包体积分析插件
          new BundleAnalyzerPlugin({
            openAnalyzer: true, // 在默认浏览器中是否自动打开报告，默认 true
          }),
        )
      })

      whenProd(() => {
        // 只有生产环境才配置
        webpackConfig.externals = {
          // 线上替换cdn key:value key为库的名字 value为umd模块导出到global对象的key名
          react: 'React',
          'react-dom': 'ReactDOM',
          axios: 'axios',
        }
      })

      // 根据插件名获取插件 返回是否找到和匹配的插件
      const { isFound: isHtmlWebpackPluginFound, match: htmlWebpackPlugin } = getPlugin(
        webpackConfig,
        pluginByName('HtmlWebpackPlugin'),
      )

      if (isHtmlWebpackPluginFound) {
        // cdn url要按照库的相互依赖优先级填写 被依赖的写前面优先加载
        htmlWebpackPlugin.userOptions.cdn = whenProd(
          () => ({
            // 配置现成的cdn 资源数组 现在是公共为了测试、实际开发的时候 用公司自己花钱买的cdn服务器
            js: [
              'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
              'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
              'https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.0/axios.min.js',
            ],
            css: ['https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.min.css'],
          }),
          // 本地环境设为空 防止页面遍历报错
          {
            js: [],
            css: [],
          },
        )
      }

      return webpackConfig
    },
  },
}
```

## 5、网络请求

```bash
yarn add qs axios
yarn add @types/qs -D
```

对axios网络请求接口二次封装、request.ts

```tsx
/*
 * @Author: PanZongHui
 * @Description: axios二次封装网络请求接口
 */
import Qs from 'qs'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const baseURL = '/api'

function getToken() {
  return '123'
}
// 创建axios实例
const service = axios.create({
  baseURL,
  timeout: 30000,
  withCredentials: true,
})

const ContentType = {
  json: 'application/json;charset=utf-8', // json格式
  form: 'application/x-www-form-urlencoded;charset=UTF-8', // 表单
  multipart: 'multipart/form-data', // 文件上传
}

// service.defaults.headers.post['Content-Type'] = ContentType.form
service.defaults.headers.post['Content-Type'] = ContentType.json
service.defaults.headers.put['Content-Type'] = ContentType.json

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map()
/**
 * @description: 添加请求
 * @param {AxiosRequestConfig} config
 * @return {*}
 */
const addPending = (config: AxiosRequestConfig): void => {
  const url = [config.baseURL, config.method, config.url].join('')
  config.cancelToken = new axios.CancelToken(cancel => {
    if (!pending.has(url)) {
      // 如果 pending 中不存在当前请求，则添加进去
      pending.set(url, cancel)
    }
  })
}
/**
 * @description: 移除请求
 *   移除未响应完的相同请求，避免重复请求
 * @param {AxiosRequestConfig} config
 * @return {*}
 */
const removePending = (config: AxiosRequestConfig): void => {
  const url = [config.baseURL, config.method, config.url].join('')
  if (pending.has(url)) {
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    removePending(config) // 在请求开始前，移除未响应完的相同请求，避免重复请求
    addPending(config) // 将当前请求添加到 pending 中
    // console.log('请求拦截器getToken:', getToken())
    if (getToken()) {
      config.headers.Authorization = getToken()
    }
    return config
  },
  error => {
    console.log('请求异常', error)
    // 错误抛到业务代码
    error.data = {}
    error.data.code = -1
    error.data.message = '发送请求出现异常！'
    return Promise.reject(error)
  },
)

/**
 * 响应拦截
 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    removePending(response) // 在请求结束后，移除本次请求
    if (response.status === 200) {
      // 请求结果正常
      const { code } = response.data
      if (code === 200) {
        // 请求成功
        return Promise.resolve(response.data)
      } else {
        // vite中使用 import.meta.env.BASE_URL 项目资源路径 /admin/
        // const resourceName = import.meta.env.BASE_URL
        // window.location.href = `${resourceName}/login`
        // 请求异常处理

        // 处理系统自定义异常
        return Promise.reject(response.data)
      }
    } else {
      console.log('响应请求异常', response)
      return Promise.reject(response)
    }
  },
  error => {
    if (axios.isCancel(error)) {
      // 重复请求的错误
      // 中断promise
      return new Promise(() => {})
    }
    console.log('响应请求出现异常！', error)
    // 错误抛到业务代码
    error.data = {}
    error.data.code = -2
    error.data.message = '响应请求出现异常！'
    return Promise.reject(error.data)
  },
)

/**
 * @description: Http网络请求返回的数据类型接口
 */
interface IResult<T> {
  code?: number
  data: T
  message?: string
}

type Method = 'get' | 'post' | 'put' | 'delete'
/**
 * axios二次封装
 * @param url 请求路径
 * @param method 请求方法
 * @param data 传递参数
 * @param config 配置文件
 * @returns  [Promise<HttpResponse<T>>]
 */
const request = <T = any>(url: string, method: Method, data?: unknown, config?: AxiosRequestConfig) => {
  let newConfig = { ...config }
  if (method === 'get' || method === 'delete') {
    newConfig = { ...config, paramsSerializer: data => Qs.stringify(data, { indices: false }) }
  }

  return service<T, IResult<T>>({
    url,
    method,
    // get,delete请求用params接收，其他请求用data
    [method.toLowerCase() === 'get' || method.toLowerCase() === 'delete' ? 'params' : 'data']: data,
    ...newConfig,
  })
}

export default request
```

## 6、reduxjs/toolkit安装使用

### 1、安装依赖

```bash
yarn add @reduxjs/toolkit react-redux @types/react-redux // redux及工具包
yarn add @types/redux-logger redux-logger //日志包
yarn add redux-persist //数据缓存
```

### 2、创建slice

**目录结构**

```
|-- store
|   |-- index.ts
|   `-- modules
|       |-- index.ts
|       `-- testSlice.ts
```

#### 1、创建testSlice

```tsx
// modules/testSlice.ts
import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

// 数据接口列席
interface ICountState {
  count: number
  movieList: any[]
  total: number
}

//电影API
const MovieAPI = {
  /**
   * 请求电影列表
   */
  getMovieListApi: () =>
    fetch('https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=24&page_id=1&ret_num=48').then(
      res => res.json(),
    ),
}

// thunk函数允许执行异步逻辑, 通常用于发出异步请求。
// createAsyncThunk 创建一个异步action，方法触发的时候会有三种状态：pending（进行中）、fulfilled（成功）、rejected（失败）
// 导出异步action方法
export const getMovieData = createAsyncThunk('movie/getMovie', async (params: { pageSize: number }) => {
  console.log('传递参数')
  console.log(params)
  const res = await MovieAPI.getMovieListApi()
  return res
})

// 初始值
const initialState: ICountState = {
  count: 0,
  movieList: [],
  total: 0,
}

/**
 * 创建一个Count的slice
 */
const CountSlice = createSlice({
  name: 'count-slice',
  initialState,
  reducers: {
    /**
     *加1操作
     */
    increment: (state: Draft<ICountState>) => {
      state.count = state.count + 1
    },
    /**
     *数字加 根据参数
     */
    incrementByAmount: (
      state: Draft<ICountState>,
      action: PayloadAction<{
        num: number
      }>,
    ) => {
      state.count = state.count + action.payload.num
    },
  },

  // extraReducers 字段让 slice 处理在别处定义的 actions,包括由 createAsyncThunk或其它slice生成的action。
  extraReducers(builder) {
    // 处理createAsyncThunk 生成的 actions
    builder
      .addCase(getMovieData.pending, (state, action) => {
        console.log('🚀 ~ 进行中！')
        console.log(state, action)
      })
      .addCase(getMovieData.fulfilled, (state, { payload }) => {
        console.log('🚀 ~ fulfilled', payload)
        state.movieList = payload.data.list
        state.total = payload.data.list.length
      })
      .addCase(getMovieData.rejected, (state, action) => {
        console.log('🚀 ~ rejected')
        console.log(state, action)
      })
  },
})

// 导出同步action方法
export const { incrementByAmount, increment } = CountSlice.actions
// 默认导出
export default CountSlice.reducer
```

#### 2、合并所有slice

```tsx
// modules/index.ts

/**
 * 该文件用于合并所有slice
 */

// 多个Slice的引入；
import testSlice from './testSlice'

// test：表示testSlice的模块名称  store.test.xxx 就可以取到testSlice管理的数据
export default {
  test: testSlice,
}
```

### 3、配置store文件、整合slice

```tsx
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
// persistStore 为redux-persist内置的状态管理仓库；persistReducer 为内置的切片管理；
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // 本地存储
import storage from 'redux-persist/lib/storage/session' // 会话存储

// 多个Slice的引入；
import modules from './modules'

// 配置要存储的Slice；
const persistConfig = {
  key: 'root', // key是放入localStorage中的key
  storage,
  // whitelist: ['language'], // 需要缓存的数据  默认缓存所有
  // blacklist: ['navigation'], // navigation不会被存入缓存中，其他会，适用于少部分数据需要实时更新
}

// 合并多个Slice
const rootReducer = combineReducers(modules)
const myPersistReducer = persistReducer(persistConfig, rootReducer)
// configureStore创建一个redux数据
const store = configureStore({
  reducer: myPersistReducer,
  // 配置中间键
  middleware: getDefaultMiddleware =>
    // getDefaultMiddleware({ serializableCheck: false }).concat(), //不打印logger
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// 二次封装：对useDispatch，useSelector进行封装，解决每次使用都要导入RootState,AppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const persistor = persistStore(store)
export default store
```

### 4、将store注入到项目中

```tsx
// 项目入口文件 index.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'

// store
import { Provider } from 'react-redux'
import store, { persistor } from '@/store'
// PersistGate的作用是向下分发persistStore对象；
import { PersistGate } from 'redux-persist/lib/integration/react'

// 样式
import './reset.css'
// 入口页面
import App from '@/App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
```

### 5、UI中如何使用store

```tsx
import React from 'react'
import { useAppSelector, useAppDispatch } from '@/store'
import { increment, incrementByAmount, getMovieData } from '@/store/modules/testSlice'
/**
 * @Description:Store测试
 */
const StoreTest: React.FC = () => {
  const testStore = useAppSelector(store => store.test)
  const dispatch = useAppDispatch()

  // 加  同步测试
  const onIncrementByAmount = (num: number) => {
    dispatch(incrementByAmount({ num }))
  }
  // 加1 同步
  const onIncrement = () => {
    dispatch(increment())
  }

  // 查询电影列表 异步action测试
  const onQueryMovieList = () => {
    dispatch(getMovieData({ pageSize: 9 }))
  }
  
  return (
    <div style={{ height: '100%' }}>
      <h1>Store测试-----当前count:{testStore.count}</h1>
      <button onClick={onIncrement}>+1</button>
      <button onClick={() => onIncrementByAmount(2)}>count+5</button>
      <button onClick={() => onIncrementByAmount(-1)}>count-1</button>
      <h1>电影列表----共有{testStore.total}个</h1>
      <button onClick={onQueryMovieList}>获取电影列表</button>
      <ul>
        {testStore.movieList.map((movie, index) => {
          return <li key={index}>{movie.name}</li>
        })}
      </ul>
    </div>
  )
}

export default StoreTest
```

## 7、react路由V6

[React Router |官网](https://reactrouter.com/docs/en/v6/getting-started/overview)

**安装**

```bash
yarn add react-router-dom -S
```

**整合到项目中**

```tsx
// 入口index.tsx文件
import { BrowserRouter } from 'react-router-dom'

// 最外层使用BrowserRouter包裹
<BrowserRouter>
   xxxxx
</BrowserRouter>
```

### 使用介绍

#### 将 Switch 升级为 Routes、路由匹配组件参数 由 component 改为 element

```tsx
// before V6 
<Switch>
 <Route path="/home" component={Home}></Route>
</Switch>

// V6 
<Routes>
    // 注意，这里是 jsx 语法，需要配合标签, 传参也可以直接写为组件传参
    <Route path="/home" element={<Home animate={true} />}></Route>
</Routes>
```

#### 相对路径识别（子路由不需要补全父路由的path，react会自动补全）

```tsx
<Routes>
   <Route path="user" element={<Invoices />}>
       <Route path=":id" element={<Invoice />} />
       <Route path="me" element={<SentInvoices />} />
   </Route>
</Routes>

// path: /user
// path: /user/:id
// path: /user/me
```

#### 优化路由嵌套，添加 outlet 标签

```tsx
import {
    Routes,
    Route,
    Link,
    Outlet,
    BrowserRouter
  } from "react-router-dom";
  
  function Layout() {
    return (
      <div>
        <h1>Welcome to the V6!</h1>
        <nav>
          <Link to="product">产品页</Link>
          <br/>
          <Link to="detail">详情页</Link>
        </nav>
        <div className="content">
  
          {/* 子路由将会显示在这里，用outlet占位 */}
          <Outlet />
  
        </div>
      </div>
    );
  }
  
  function Product() {
    return <h1>产品页</h1>;
  }
  
  function Detail() {
    return <h1>详情页</h1>;
  }
 
  function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="product" element={<Product />} />
                    <Route path="detail" element={<Detail />} />
                </Route>
            </Routes>
             {/* 一级路由 */}
             <Outlet />
        </BrowserRouter>
    );
  }
  
  export default App
```

#### 使用 index 标识默认路由

```tsx
<Routes>
   <Route path="/" element={<Layout />}>
       <Route index element={<Activity />} />
       <Route path="invoices" element={<Invoices />} />
       <Route path="activity" element={<Activity />} />
   </Route>
</Routes>
```

#### link 标签跳转的path 将支持 . 和 .. 这种语法（类比于 terminal 中的 cd .. 返回上级菜单 ）

```tsx
// 这里直接拿了官网的示例
 
function App() {
  return (
   <BrowserRouter>
     <Routes>
       <Route path="users" element={<Users />}>
         <Route path=":id" element={<UserProfile />} />
       </Route>
     </Routes>
   <BrowserRouter>
 
  );
}
 
function Users() {
  return (
    <div>
      <h2>
        {/* This links to /users - the current route */}
        <Link to=".">Users</Link>
      </h2>
 
      <ul>
        {users.map((user) => (
          <li>
            {/* This links to /users/:id - the child route */}
            <Link to={user.id}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
 
function UserProfile() {
  return (
    <div>
      <h2>
        {/* This links to /users - the parent route */}
        <Link to="..">All Users</Link>
      </h2>
 
      <h2>
        {/* This links to /users/:id - the current route */}
        <Link to=".">User Profile</Link>
      </h2>
 
      <h2>
        {/* This links to /users/mj - a "sibling" route */}
        <Link to="../mj">MJ</Link>
      </h2>
    </div>
  );
}
```

#### path 通配符将只支持 * 和 ：(以前的？等将不再支持)

```tsx
// 这里直接拿了官网的例子，让我们看下 * 的作用（子孙路由）
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users/*" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}
 
function Users() {
  return (
    <div>
      <nav>
        // path: user/me
        <Link to="me">My Profile</Link>
      </nav>
 
      <Routes>
        // path:  user/:id
        <Route path=":id" element={<UserProfile />} />
 
        // path:  user/me
        <Route path="me" element={<OwnUserProfile />} />
      </Routes>
    </div>
  );
}
```

#### 添加 useOutletContext 用于 路由之间共享状态

我们可以用 useOutletContext 在子路由与父路由之间共享一些值

```tsx
function Parent() {
  const [count, setCount] = React.useState(0);
  return <Outlet context={[count, setCount]} />;
}
 
 
import { useOutletContext } from "react-router-dom";
 
function Child() {
  const [count, setCount] = useOutletContext();
  const increment = () => setCount((c) => c + 1);
  return <button onClick={increment}>{count}</button>;
}
```

#### Navigate 标签实现路由重定向

```tsx
import { Navigate } from "react-router-dom";

function App() {
  return <Navigate to="/home" replace state={state} />;
}

/*
    v5默认<Redirect />使用 replace 逻辑
    v6默认<Navigate />使用 push 逻辑 ，可以通过参数设置为 replace
*/
```

#### 用 useNavigate 替代  useHistory  

```tsx
// 函数组件使用编程式跳转

// V5
let history = useHistory();
history.push("/home");

// V6
let navigate = useNavigate();
navigate('/home')

// 如果需要类比 history.replace, 可以添加参数replace为true
navigate(to, { replace: true })

// 如果需要类比隐式传参，可以添加参数 state
navigate(to, { state })

// 同时 link 也添加了单独的参数 state
<Link to="/home" state={state} />


// 如果需要类比 goBack，go等语法，也可直接在 navigate中 传层级参数
// 等价于 history.go(-1)
<button onClick={() => navigate(-2)}>
    Go 2 pages back
</button>
<button onClick={() => navigate(-1)}>Go back</button>
<button onClick={() => navigate(1)}>
    Go forward
</button>
<button onClick={() => navigate(2)}>
    Go 2 pages forward
</button>
```

#### useParams 动态路由取值

新版路由里面实现动态路由，也变得很灵活，可以通过 useParams 来获取 url 上的动态路由信息。比如如下
**配置：**

```tsx
<Route element={<List/>} path="/list/:id"></Route>
```

**跳转动态路由页面：**

```
<button onClick={()=>{ navigate('/list/1'})}} >跳转列表页</button>
```

**useParams获取动态路由参数**

```tsx
function List(){
    const params = useParams()
    console.log(params,'params') // {id: '1'} 'params'
    return <div>
        let us learn React !
    </div>
}
```

#### useLocation 获取传递的state值

1.传递参数

```tsx
 <Link to={`/b/child2`}
     state={{ id: 999, name: "i love merlin" }} //要传递的参数写在此处
 >
    Child2
</Link>
// 或 
let navigate = useNavigate();
navigate("/b/child2", { state: { id: 999, name: "i love merlin" }});
```

2.接收参数

```tsx
import { useLocation } from "react-router-dom";
const { state } = useLocation();
//state参数 => {id: 999, name: "i love merlin"}
//刷新也可以保留参数
```

#### useSearchParams 读取和设置url参数

useSerachParams 可以读取和修改当前位置url的查询参数（?id=123）, 具体使用方式类比于 useState，但用法略有不同。

```
获取某个searchParams： searchParams.get(key)
设置某个searchParams： setSearchParams({key:value})
```

```tsx
import {
    Routes,
    Route,
    Link,
    Outlet,
    BrowserRouter,
    useResolvedPath,
    useSearchParams
  } from "react-router-dom";
  
  function Layout() {
    return (
      <div>
        <h1>Welcome to the V6!</h1>
        <nav>
          <Link to="product">产品页</Link>
          <Link to="detail?id=123">详情页</Link>
        </nav>
        <div className="content">
  
          <Outlet />
  
        </div>
      </div>
    );
  }
  
  function Product() {
    const path = useResolvedPath('id');
    console.log(path);
    return <h1>产品页</h1>;
  }
  
  function Detail() {
    const [searchParams,setSearchParams] = useSearchParams()
 
    const handleSubmit = ()=>{
        // 输入键值对，设置对应的 search 参数
        setSearchParams({id:456})
    }
 
    // 通过 get 方法获取key对应的value
    console.log(searchParams.get('id'));
 
    return (
        <h1>
            详情页 : {searchParams.get('id')} 
            <br/>
            <button onClick={()=>handleSubmit()}>update searchParams</button>
        </h1>
    );
  }
 
  function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="product" element={<Product />} />
                    <Route path="detail" element={<Detail />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
  }
  
  export default App
```

#### 传参方式总结

| 传参方式          | 使用                                                         | 取参                |
| ----------------- | ------------------------------------------------------------ | ------------------- |
| searchParams 传参 | navigate("/page1?name=Eula&age=18");                         | useSearchParams（） |
| params传参        | navigate("/page1/Eula/18")需要路由表添加占位: path: “/page1/:name/:age” | useParams（）       |
| state传参         | navigate("/page1",{ state: {name:'Eula',age:"18"}})          | useLocation（）     |

## 8、国际化配置(i18n)

### 1、安装依赖

```bash
yarn add i18next react-i18next i18next-browser-languagedetector i18next-http-backend
```

### 2、配置国际化语言

**中文** /locales/zh/zh.json

```json
{
  "语言": {
    "简体中文": "简体中文",
    "英语": "英语",
    "日语": "日语"
  },
  "用户操作": {
    "个人中心": "个人中心",
    "个人设置": "个人设置",
    "退出登录": "退出登录"
  }
}
```

**英文** /locales/en/en.json

```json
{
  "语言": {
    "简体中文": "Chinese",
    "英语": "English",
    "日语": "Japanese"
  },
  "用户操作": {
    "个人中心": "Personal center",
    "个人设置": "Personal Settings",
    "退出登录": "Log out"
  }
}
```

**日文** /locales/ja/ja.json

```json
{
  "语言": {
    "简体中文": "簡体字中国語",
    "英语": "英語です",
    "日语": "日本語"
  },
  "用户操作": {
    "个人中心": "個人センターです",
    "个人设置": "個人設定です",
    "退出登录": "ログアウトします"
  }
}
```

### 3、将语言整合到i18n中

```tsx
// i18n/index.ts
/**
 * 多语言切换管理
 */
// yarn add i18next react-i18next i18next-browser-languagedetector i18next-http-backend
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
// i18next-browser-languagedetector插件 这是一个 i18next 语言检测插件，用于检测浏览器中的用户语言，
// 详情请访问：https://github.com/i18next/i18next-browser-languageDetector
// 可以通过localStorage.getItem('i18nextLng')取出当前语言环境
import LanguageDetector from 'i18next-browser-languagedetector'

// 引入需要实现国际化的简体、英文两种数据的json文件
import zhTranslation from './locales/zh/zh.json'
import enTranslation from './locales/en/en.json'
import jaTranslation from './locales/ja/ja.json'

i18n
  // 加入Backend插件,用于从远程服务器获取国际化资源
  // 插件详见: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // 嗅探当前浏览器语言 zh_CN
  // 插件详见: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // 将 i18n 向下传递给 react-i18next
  .use(initReactI18next)
  // 初始化 i18next
  // 配置参数的文档: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      en_GB: { translation: enTranslation },
      zh_CN: { translation: zhTranslation },
      ja_JP: { translation: jaTranslation },
    },
    fallbackLng: 'zh_CN', // 默认当前环境的语言
    debug: false, // 是否启用调试模式
    interpolation: { escapeValue: false },
  })

export default i18n
```

### 4、将i18n整合到项目中

```tsx
// 入口index.tsx文件

// 导入国际化
import '@/i18n'
```

### 5、语言列表

i18n/language.ts

```tsx
export type LanguageType = {
  key: string
  language: string
}

const languageList: LanguageType[] = [
  { key: 'en_GB', language: '语言.英语' },
  { key: 'zh_CN', language: '语言.简体中文' },
  { key: 'ja_JP', language: '语言.日语' },
]

export default languageList
```

### 6、测试

```tsx
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

// 导入语言列表
import languageList from '@/i18n/language'

/**
 * @Description:多语言测试页面
 */
const I18nTest: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [selectedKey, setSelectedKey] = useState(i18n.language)

  // 切换语言事件
  const onChangeLanguage = (key: string) => {
    setSelectedKey(key)
    i18n.changeLanguage(key)
  }

  return (
    <div>
      <h1>多语言测试</h1>
      <ul>
        {languageList.map(item => {
          return (
            <li
              key={item.key}
              onClick={() => onChangeLanguage(item.key)}
              style={{ color: selectedKey === item.key ? 'red' : '' }}
            >
              {t(`${item.language}`)}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default I18nTest
```

## 9、项目插件

### 1、滚动条美化

[美化滚动条插件](https://github.com/malte-wessel/react-custom-scrollbars)

**安装**

```bash
yarn add react-custom-scrollbars -S
yarn add @types/react-custom-scrollbars -D
```

**使用**

```tsx
import { Scrollbars } from 'react-custom-scrollbars'

<Scrollbars style={{ height: `calc(100vh - ${LOGO_HEIGHT}px)` }}>
{/* 更多信息 */}
</Scrollbars>

// 或者

<Scrollbars>
{/* 更多信息 */}
</Scrollbars>
```

### 2、全屏

[全屏插件](https://www.npmjs.com/package/react-full-screen)

**安装**

```bash
yarn add react-full-screen -S
```

**使用**

```tsx
import type { FullScreenHandle } from "react-full-screen";

const handle = useFullScreenHandle() // 创建一个fullScreen的handle
const [fullScreenState, setFullScreenState] = useState(false) // 全屏状态的状态标识
  

// 改变全屏事件的方法
const handleChangeFullScreen = () => {
    if (fullScreenState) {
      setFullScreenState(false)
      props.screenHandle
        .exit()
        .then(() => {})
        .catch(err => {
          console.log(err)
        })
    } else {
      setFullScreenState(true)
      props.screenHandle
        .enter()
        .then(() => {})
        .catch(err => {
          console.log(err)
        })
    }
  }


<FullScreen handle={handle}>
    // 包裹在 Layout最外层(需要全屏的组件外面)
 </FullScreen>
```

### 3、路由懒加载

[官网](https://loadable-components.com/docs/loadable-vs-react-lazy/)

**安装**

```bash
yarn add @loadable/component -S
yarn add @types/loadable__component -D
```

**使用**

```tsx
import Loadable from '@loadable/component'

// React.lazy 不支持动态导入 import(`./${value}`)
/**
 * 动态懒加载路由
 * @param path 路由路径
 * @returns
 */
export const LazyComponent = (path: string) => {
  // const Module = Loadable(() => import(`@/${path}`))
  const Module = Loadable(() => import(`@/${path}`), {
    fallback: <div>Loading...</div>,
  })
  return <Module />
}
```

### 4、immer提升性能优化

[Immer](https://immerjs.github.io/immer/zh-CN/) 是 **mobx** 的作者写的一个 **immutable** 库，核心实现是利用 **ES6** 的 **Proxy**(不支持**Proxy**的环境会自动使用**Object.defineProperty**来实现)，几乎以最小的成本实现了 **js** 的不可变数据结构，简单易用、体量小巧、设计巧妙，满足了我们对**js**不可变数据结构的需求。

```bash
yarn add immer
```

#### 优化性能

修改用户信息

```tsx
const [ userInfo, setUserInfo ] = useState({ name: 'immer', info: { age: 6 } })
const onChange = (age: number) => {
  setUserInfo({...userInfo, info: {
    ...userinfo.info,
    age: age
  }})
}
```

上面某次修改**age**没有变，但**setUserInfo**时每次都生成了一个新对象，更新前后引用变化了，组件就会刷新。

使用**immer**后,**age**没变时不会生成新的引用，同时语法也更简洁，可以优化性能。

```tsx
import produce from 'immer'

const [ userInfo, setUserInfo ] = useState({ name: 'immer', age: 5 })
const onChange = (age: number) => {
  setUserInfo(
    produce(darft => {
      darft.age = age
    })
  )
}
```

#### 简化写法

**react**遵循不可变数据流的理念，每次修改状态都要新生成一个引用，不能在原先的引用上进行修改，所以在对引用类型对象或者数组做操作时，总要浅拷贝一下，再来做处理，当修改的状态层级比较深的时候，写法会更复杂。

以数组为例，修改购物车某个商品的数量：

```tsx
import produce from 'immer'

const [ list, setList ] = useState([{ price: 100, num: 1 }, { price: 200, num: 1 }])

// 不使用用immer
const onAdd = (index: number) => {
  /** 不使用immer */
  // const item = { ...list[index] }
  // item.num++
  // list[index] = item
  // setList([...list])

  /** 使用immer */
  setList(
    produce(darft => {
      darft[index].num++
    }),
  )
}

```

#### 使用use-immer简化useState写法

```tsx
import useImmer from 'use-immer'

const [ list, setList ] = useImmer([{ price: 100, num: 1 }, { price: 200, num: 1 }])

const onAdd = (index: number) => {
  setList(darft => {
      darft[index].num++
  })
}
```

## Tailwind CSS的使用(扩展)

[tailwindcss 官网](https://www.tailwindcss.cn/docs/installation/using-postcss)

### 1、安装

```bash
yarn add tailwindcss postcss autoprefixer -D
yarn remove tailwindcss postcss autoprefixer -D
```

### 2、生成 Tailwind 配置文件

生成 Tailwind 的配置文件 `tailwind.config.js`，同时会生成一个 `postcss.config.js`. 输入以下命令并执行：

```bash
npx tailwindcss init -p
```

### 3、添加模板文件路径

在 `tailwind.config.js` 件中添加所有模板文件的路径。

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,  // 禁用 Tailwind 的全局基本样式 解决与antd样式冲突
  },
}
```

### 4、在 CSS 中引入 Tailwind

接着，创建 `src/tailwind.css` 文件。

```css
/* @import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities'; */

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5、引入css

```tsx
// main.ts
import './tailwind.css'
```

### 6、测试

```tsx
import React from 'react'

const App: React.FC = () => {
  return (
    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
      Click me
    </button>
  )
}

export default App
```

出现一个大绿色按钮，代表配置成功。

## Vite中的配置

### 1、打包开启 gzip 压缩

```bash
yarn add rollup-plugin-gzip -D
```

```tsx
//vite.config.ts
import { defineConfig } from 'vite'
import gzipPlugin from 'rollup-plugin-gzip'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      plugins: [gzipPlugin()]
    }
  }
})

```

### 2、vite打包分析插件

执行：npm run build 后，会在项目根路径生成一个start.html,该文件即可显示出项目依赖关系

```bash
yarn add rollup-plugin-visualizer -D
```

`vite.config.ts`

```tsx
// 打包分析插件
import { visualizer } from 'rollup-plugin-visualizer'
//在 plugins: []里面添加
visualizer({
    open: true,
    gzipSize: true,
    brotliSize: true,
}),
```

