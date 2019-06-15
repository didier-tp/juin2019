import express , { Request, Response } from 'express';
var app :express.Application = express();
app.get('/', function(req :Request, res :Response ) {
    res.setHeader('Content-Type', 'text/html');
    res.write("<html> <body>");
    res.write('<p>hello world</p>');
    res.write("</body></html>");
    res.end();
});

app.listen(8282 , function () {
    console.log("simple express node server listening at 8282");
});