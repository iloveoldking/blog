import 'package:flutter/material.dart';
import './list.dart';

class HomePage extends StatefulWidget {
  HomePage({Key key}) : super(key: key);

  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('文章列表'), centerTitle: true, actions: [
        Container(
          margin: EdgeInsets.only(right: 10.0),
          child: IconButton(
            iconSize: 28.0,
            tooltip: '搜索',
            icon: Icon(Icons.search),
            onPressed: () {
              print('搜索');
            },
          ),
        )
      ]),
      body: ArticleList(),
      floatingActionButton: FloatingActionButton(
        tooltip: '发表文章',
        child: Icon(Icons.create),
        onPressed: () {
          print('发表');
        },
      ),
    );
  }
}
