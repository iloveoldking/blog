import 'package:flutter/material.dart';
import '../../config/config.dart';
import '../../services/article.dart';

class ArticleList extends StatefulWidget {
  ArticleList({Key key}) : super(key: key);

  _ArticleListState createState() => _ArticleListState();
}

class _ArticleListState extends State<ArticleList> {
  List articleList = [];

  @override
  void initState() {
    super.initState();
    final params = {'pageNum': 1, 'pageSize': 10};
    findAllArticle(params).then((res) {
      setState(() {
        articleList = res['data']['list'];
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: articleList.length,
      itemBuilder: (BuildContext context, int index) {
        final authorPhoto = articleList[index]['user']['photo'];
        final authorName = articleList[index]['user']['nickname'];
        return Column(
          children: <Widget>[
            ListTile(
              leading: authorPhoto != null
                  ? CircleAvatar(
                      backgroundImage: NetworkImage('$baseUrl$authorPhoto'),
                    )
                  : CircleAvatar(
                      child: Text(
                        '${authorName.substring(0, 1).toUpperCase()}',
                        style: TextStyle(color: Colors.white),
                      ),
                      backgroundColor: Colors.grey[400],
                    ),
              title: Text(
                articleList[index]['title'],
                overflow: TextOverflow.ellipsis,
                maxLines: 1,
              ),
              subtitle: Container(
                margin: EdgeInsets.only(top: 5.0),
                alignment: Alignment.centerRight,
                child: Text(articleList[index]['createdAt']),
              ),
            ),
            Divider(
              height: 2.0,
              color: Colors.grey[300],
            )
          ],
        );
      },
    );
  }
}
