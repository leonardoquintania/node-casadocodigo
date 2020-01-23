const http = require('http');

const servidor = http.createServer((request, response) => {
    response.end(` 
        <html>
            <head>
                <meta charset="utf-8">
            </head>
            <body>
                <h1> Casa do Código </h1>
            </body> 
        </html>
    `)
});

servidor.listen(3000);