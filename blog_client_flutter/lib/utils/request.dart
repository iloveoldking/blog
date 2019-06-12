import 'package:dio/dio.dart';
import 'package:dio_flutter_transformer/dio_flutter_transformer.dart';
import '../config/config.dart';

dynamic request(path, [params]) async {
  var dio = Dio();
  dio.transformer = new FlutterTransformer();
  Response response = await dio.post("${baseUrl + path}", data: params);
  return response.data;
}
