# 开发记录

### 代码风格
>从开发过程以及阅读过程可以体验到flutter风格很像react，即在组件中定义变量，定义方法，build渲染组件结构，数据驱动，用户交互修改数据
>>Flutter widgets are built using a modern framework that takes inspiration from React. The central idea is that you build your UI out of widgets. Widgets describe what their view should look like given their current configuration and state. When a widget’s state changes, the widget rebuilds its description, which the framework diffs against the previous description in order to determine the minimal changes needed in the underlying render tree to transition from one state to the next.

### 组件化
>在需要引用的组件中import即可，路径为package:blog/拼接前缀（指定为lib目录），也可以使用相对路径，组件本身无需export，组件的文件名称无影响，但是组件class名称是要准确的，否则会匹配不到

### 父向子传值
```
父组件调用子组件并创建时，以传参的形式传入
Button(buttonText: 'this is parent text', buttonText2:'666')
子组件接受
const Button({Key key, this.buttonText, this.buttonText2}) : super(key: key);
final String buttonText;
final String buttonText2;
使用
child: Text(
  buttonText + buttonText2,
  style: TextStyle(color: Colors.red),
),
```
### 有状态组件StatefulWidget(stores mutable state)
>需要两部分组成 StatefulWidget + State(储存状态，可参考react)(In Flutter, these two types of objects have different life cycles.)，有状态组件才可以在State中setState
+ The state class contains the widget’s mutable state and the widget’s build() method.

### 无状态组件StatelessWidget(stores immutable state)
>Stateless widgets receive arguments from their parent widget

### 有状态组件和无状态组件交互
>无状态组件接受父级传递的参数
```
class CounterDisplay extends StatelessWidget {
  CounterDisplay({this.count});

  final int count;

  @override
  Widget build(BuildContext context) {
    return Text('Count: $count');
  }
}

class CounterIncrementor extends StatelessWidget {
  CounterIncrementor({this.onPressed});

  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return RaisedButton(
      onPressed: onPressed,
      child: Text('Increment'),
    );
  }
}

class Counter extends StatefulWidget {
  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _counter = 0;

  void _increment() {
    setState(() {
      ++_counter;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Row(children: <Widget>[
      CounterIncrementor(onPressed: _increment),
      CounterDisplay(count: _counter),
    ]);
  }
}
```

### 常用组件
+ >Text: Text部件允许你在应用程序中创建样式文本

+ >Row, Column: 这些flex部件允许你在水平方向和垂直方向创建弹性布局，他是基于网页中的弹性布局模式进行设计的

+ >Stack: Instead of being linearly oriented (either horizontally or vertically), a Stack widget lets you stack widgets on top of each other in paint order. You can then use the Positioned widget on children of a Stack to position them relative to the top, right, bottom, or left edge of the stack. Stacks are based on the web’s absolute positioning layout model.

+ >Container: The Container widget lets you create a rectangular visual element. A container can be decorated with a BoxDecoration, such as a background, a border, or a shadow. A Container can also have margins, padding, and constraints applied to its size. In addition, a Container can be transformed in three dimensional space using a matrix.

+ >Expanded:it expands to fill any remaining available space that hasn’t been consumed by the other children. 

### 常用样式
+ >mainAxisAlignment设置主轴对齐方式
+ >crossAxisAlignment设置副轴对齐方式

### _开头的变量或者函数表示私有

### 字符模版 '$变量'或者'${变量}'

### 状态管理，3种方式
+ 组件自己管理状态（简单的状态可以自己管理或者外界不需要的状态，组件自己处理即可）
+ 父级组件管理状态（推荐或者在犹豫不决时优选）
+ 混合管理，父级和自己各管理一部分

### 修改app图标
https://flutter.dev/docs/development/ui/assets-and-images#platform-assets
>在.../android/app/src/main/res文件夹中可以找到对应的文件，替换即可

### 修改app启动页面图片
>在.../android/app/src/main/drawable文件夹中修改launch_background.xml

### 路由跳转(下面介绍的是flutter自带路由工具，可以安装第三方路由工具fluro)
```
跳转
Navigator.push(context, MaterialPageRoute(
  builder: (context) => SecondPage()
));
返回
Navigator.pop(context, arguments);
返回携带数据
Navigator.pop(context);
传参
Navigator.push(context, MaterialPageRoute(
  builder: (context) => SecondPage(arguments)
));
解析
在SecondPage的构造函数中解析
```
### MaterialApp中title 是设定了应用的名称，如果用手机切换多任务界面时候，你的app的名字就是你的title

### 网络接口请求
>dio是一个强大的Dart Http请求库，支持Restful API、FormData、拦截器、请求取消、Cookie管理、文件上传/下载、超时、自定义适配器等...

### list..add()..add()..add();
>..语法为级联调用，简单来说就是返回调用者本身,这里list后用了..add()，还会返回list，然后就一直使用..语法

### fluro提供的路由跳转
```
import 'package:fluro/fluro.dart';
final router = Router();
void defineRoutes(Router router) {
  router.define("second", handler: Handler(
      handlerFunc: (BuildContext context, Map<String, dynamic> params) {
    return SecondScreen();
  }), transitionType: TransitionType.inFromLeft);
}
```

### 函数定义参数时，[]中的变量表示选填