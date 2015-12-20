
var widgets = [
  { id : 1,
    name : 'My Special Widget',
    price : 100.00
  }
]

// 위젯 색인 목록 index, GET method
exports.index = function(req, res) {
  res.render('widgets', {title: 'Widgets', widgets: widgets});
};

// 새 위젯 폼을 표시, GET method
exports.new = function(req, res) {
  var filePath = require('path').normalize(__dirname + '/../static/new.html');
  res.sendFile(filePath);
};

// 새 위젯 생성(추가), POST method
exports.create = function(req, res) {
  var indx = widgets.length + 1;
  widgets[widgets.length] =
    { id : indx,
      name : req.body.widgetname,
      price : parseFloat(req.body.widgetprice) 
    };
  console.log(widgets[indx-1]);
  res.render('added', {title: 'Widget Added', widget: widgets[indx-1]});
};

// 특정 위젯 조회, GET method
exports.show = function(req, res) {
  var indx = parseInt(req.params.id) - 1;
  if (!widgets[indx]) 
    res.send('There is no widget with id of ' + req.params.id);
  else
    res.render('show', {title: 'Show Widget', widget:widgets[indx]}); 
};

// 특정 위젯 삭제, DELETE method
exports.destroy = function(req, res) {
  var indx = req.params.id - 1;
  delete widgets[indx];
  console.log('deleted ' + req.params.id);
  res.send('deleted ' + req.params.id);
};

// 편집 폼 표시, GET method
exports.edit = function(req, res) {
  var indx = parseInt(req.params.id) - 1;
  res.render('edit', {title: 'Edit Widget', widget: widgets[indx]});
};

// 위젯업데이트, PUT method
exports.update = function(req, res) {
  var indx = parseInt(req.params.id) - 1;
  widgets[indx] = 
    { id : req.params.id,
      name : req.body.widgetname,
      price : parseFloat(req.body.widgetprice)
    };
  console.log(widgets[indx]);
  res.render('added', {title: 'Widget Edited', widget: widgets[indx]});
}; 
