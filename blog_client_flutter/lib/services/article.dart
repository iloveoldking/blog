import '../utils/request.dart';

Future findAllArticle(params) {
  return request('/article/findAll', params);
}
