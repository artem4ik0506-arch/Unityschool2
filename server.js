const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'database.json');

app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname));

// Базові дані системи
const DEFAULT_DATA = {
    currentUser: null,
    users: [
        {
            id: 'usr_root_admin',
            login: 'root_admin',
            password: 'Root_Admin_2026_Full',
            fullName: 'Головний Адміністратор',
            role: 'superadmin'
        }
    ],
    classes: ['7-А', '7-Б', '8-А', '9-А', '10-A', '11-А'],
    subjects: ['Математика', 'Українська мова', 'Фізика', 'Історія України', 'Англійська мова', 'Інформатика'],
    schedule: [],
    lessons: [],
    grades: []
};

// Читання бази даних
app.get('/api/data', (req, res) => {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_DATA, null, 2));
    }
    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        res.json(data);
    } catch (e) {
        res.json(DEFAULT_DATA);
    }
});

// Збереження бази даних
app.post('/api/data', (req, res) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ error: 'Failed to save data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});