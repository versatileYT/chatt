const express = require('express');
const fetch = require('node-fetch'); // Библиотека для выполнения HTTP-запросов

const app = express();
const port = 3000;

// Middleware для разрешения CORS (не рекомендуется использовать в продакшене без ограничений)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Разрешить все домены (не рекомендуется в продакшене)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/suggestions', async (req, res) => {
    const query = req.query.q;

    if (!query) {
        res.status(400).json({ error: 'Query parameter "q" is required.' });
        return;
    }

    try {
        const response = await fetch(`https://duckduckgo.com/ac/?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
