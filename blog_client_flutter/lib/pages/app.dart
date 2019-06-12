import 'package:flutter/material.dart';
import './home/home.dart';
import './mine/mine.dart';

class App extends StatefulWidget {
  App({Key key}) : super(key: key);

  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  int _currentIndex = 0;
  List<Widget> screens = List();

  @override
  void initState() {
    super.initState();
    screens.addAll([HomePage(), MinePage()]);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '博客',
      home: Scaffold(
        body: screens[_currentIndex],
        bottomNavigationBar: BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          backgroundColor: Colors.grey[200],
          selectedFontSize: 12.0,
          items: [
            BottomNavigationBarItem(
                icon: Icon(Icons.home), title: Text('首页')),
            BottomNavigationBarItem(
                icon: Icon(Icons.person), title: Text('我的')),
          ],
          currentIndex: _currentIndex,
          onTap: (int index) {
            setState(() {
              _currentIndex = index;
            });
          },
        ),
      ),
      debugShowCheckedModeBanner: false,
    );
  }
}
