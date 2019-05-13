启动服务 npm run dev

分页   
skip  
limit

toObejct: {
  transform(doc, ret, options){
    return ret;
  }
}

将mongoose.Document转化为纯js对象
lean

将某字段正向排序
sort：'field'
将某字段反向排序
sort：'-field'


事物处理
bulkWrite

创建
create({})
批量创建
create([{}, {}, {}...])

