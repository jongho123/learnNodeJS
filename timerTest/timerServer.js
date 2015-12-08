function on_OpenAndReadFile(filename, res) {
  console.log('opening ' + filename);
  // 파일을 엵 내용을 읽는다
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err)
      res.write('Could not find or open file for reading\n');
    else
      res.write(data);
    res.end();
  });
  
  setTimeout(on_OpenAndReadFile, 2000, filename, res);
}

