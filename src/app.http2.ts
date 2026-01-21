import fs from 'fs';
import http2 from 'http2';
import path from 'path';


const mimeTypes: Record<string, string> = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
};

const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
},(req, res) => {

    console.log(req.url);

    const filePath = req.url === '/'
        ? './public/index.html'
        : `./public${req.url}`;

    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'text/plain';

    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        res.writeHead(200, {'content-type': contentType});
        res.end(content);
    } else {
        res.writeHead(404);
        res.end();
    }

})


server.listen(8080, () => {

    console.log('sever running on port 8080')

})