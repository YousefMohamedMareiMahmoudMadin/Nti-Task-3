const http = require('http');
const bookController = require('./controllers/bookController');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const { url, method } = req;

    
    if (url === '/books' && method === 'GET') {
        return bookController.getAllBooks(req, res);
    }

    
    if (url === '/books' && method === 'POST') {
        return bookController.addBook(req, res);
    }


    const idParamPattern = /^\/books\/([0-9]+)$/;
    const match = url.match(idParamPattern);

    if (match) {
        const bookId = match[1]; 

        if (method === 'GET') {
            return bookController.getBookById(req, res, bookId);
        }
        if (method === 'PUT') {
            return bookController.updateBook(req, res, bookId);
        }
        if (method === 'DELETE') {
            return bookController.deleteBook(req, res, bookId);
        }
    }

    
    bookController.sendJSON(res, 404, { error: 'Route not found. Please check your URL and HTTP Method.' });
});

server.listen(PORT, () => {
    console.log(`Library API is running on http://localhost:${PORT}`);
});