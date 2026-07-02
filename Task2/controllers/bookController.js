const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/books.json');


function getRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            if (!body.trim()) {
                return resolve({});
            }
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(new Error('Invalid JSON format in request body.'));
            }
        });

        req.on('error', (err) => {
            reject(err);
        });
    });
}


function readBooksFromFile() {
    try {
        if (!fs.existsSync(filePath)) return [];
        const data = fs.readFileSync(filePath, 'utf8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        throw new Error('Database read error.');
    }
}


function writeBooksToFile(books) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(books, null, 2), 'utf8');
    } catch (error) {
        throw new Error('Database write error.');
    }
}


function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}


function getAllBooks(req, res) {
    try {
        const books = readBooksFromFile();
        sendJSON(res, 200, books);
    } catch (error) {
        sendJSON(res, 500, { error: error.message });
    }
}


function getBookById(req, res, id) {
    try {
        const books = readBooksFromFile();
        const book = books.find(b => b.id === parseInt(id));
        
        if (!book) {
            return sendJSON(res, 404, { error: `Book with ID ${id} not found.` });
        }
        sendJSON(res, 200, book);
    } catch (error) {
        sendJSON(res, 500, { error: error.message });
    }
}


async function addBook(req, res) {
    try {
        const body = await getRequestBody(req);
        const { title, author, price, available } = body;

        if (!title || !author || price === undefined) {
            return sendJSON(res, 400, { error: 'Missing required fields: title, author, and price.' });
        }

        const books = readBooksFromFile();
        const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;

        const newBook = {
            id: newId,
            title,
            author,
            price: Number(price),
            available: available !== undefined ? available : true
        };

        books.push(newBook);
        writeBooksToFile(books);

        sendJSON(res, 201, newBook);
    } catch (error) {
        sendJSON(res, error.message.includes('JSON') ? 400 : 500, { error: error.message });
    }
}


async function updateBook(req, res, id) {
    try {
        const books = readBooksFromFile();
        const index = books.findIndex(b => b.id === parseInt(id));

        if (index === -1) {
            return sendJSON(res, 404, { error: `Book with ID ${id} not found.` });
        }

        const body = await getRequestBody(req);
        
        books[index] = { 
            ...books[index], 
            ...body, 
            id: books[index].id 
        };

        writeBooksToFile(books);
        sendJSON(res, 200, books[index]);
    } catch (error) {
        sendJSON(res, error.message.includes('JSON') ? 400 : 500, { error: error.message });
    }
}


function deleteBook(req, res, id) {
    try {
        const books = readBooksFromFile();
        const filteredBooks = books.filter(b => b.id !== parseInt(id));

        if (books.length === filteredBooks.length) {
            return sendJSON(res, 404, { error: `Book with ID ${id} not found.` });
        }

        writeBooksToFile(filteredBooks);
        sendJSON(res, 200, { message: `Book with ID ${id} deleted successfully.` });
    } catch (error) {
        sendJSON(res, 500, { error: error.message });
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
    sendJSON
};