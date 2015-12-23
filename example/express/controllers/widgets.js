var Widget = require('../models/widget.js');

// 위젯 색인 목록 index, GET method
exports.index = function(req, res) {
  Widget.find({}, function(err, docs) {
    console.log(docs);
    res.render('widgets/index', {title: 'Widgets', widgets: docs});
  });
};

// 새 위젯 폼을 표시, GET method
exports.new = function(req, res) {
  var filePath = require('path').normalize(__dirname + '/../static/widgets/new.html');
  res.sendFile(filePath);
};

// 새 위젯 생성(추가), POST method
exports.create = function(req, res) {
  widget = { 
    sn : req.body.widgetsn,
    name : req.body.widgetname,
    price : parseFloat(req.body.widgetprice),
    desc: req.body.widgetdesc
  };

  var widgetObj = new Widget(widget);

  widgetObj.save(function(err, data) {
    if (err) {
      res.send(err);
    } else {
      console.log(data);
      res.render('widgets/added', {title: 'Widget Added', widget: widget});
    }
  });
};

// 특정 위젯 조회, GET method
exports.show = function(req, res) {
  var sn = req.params.sn; 

  Widget.findOne({sn: sn}, function(err, doc) {
    if (err) 
      res.send('There is no widget with sn of ' + sn);
    else
      res.render('widgets/show', {title: 'Show Widget', widget: doc}); 
  });
  
};

// 특정 위젯 삭제, DELETE method
exports.destroy = function(req, res) {
  var sn = req.params.sn;

  Widget.remove({sn: sn}, function(err) {
    if (err) {
      res.send('There is no widget with sn of ' + sn);
    } else {
      console.log('deleted ' + sn);
      res.send('deleted ' + sn);
    }
  });  
};

// 편집 폼 표시, GET method
exports.edit = function(req, res) {
  var sn = req.params.sn;
  Widget.findOne({sn: sn}, function(err, doc) {
    console.log(doc);

    if (err) 
      res.send('There is no widget with sn of ' + sn);
    else
      res.render('widgets/edit', {title: 'Edit Widget', widget: doc});
  });
};

// 위젯업데이트, PUT method
exports.update = function(req, res) {
  var sn = req.params.sn;

  var widget = {
    sn: req.body.widgetsn,
    name: req.body.widgetname,
    price: parseFloat(req.body.widgetprice),
    desc: req.body.widgetdesc
  };

  Widget.update({sn: sn}, widget, function(err) {
    if (err)
      res.send('Problem occured with update' + err);
    else
      res.render('widgets/added', {title: 'Widget Edited', widget: widget});
  });
}; 
