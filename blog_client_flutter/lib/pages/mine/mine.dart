import 'package:flutter/material.dart';

class MinePage extends StatelessWidget {
  const MinePage({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('个人中心'),
        centerTitle: true,
      ),
      body: Center(
        child: Text('mine'),
      ),
    );
  }
}