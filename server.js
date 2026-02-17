const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

app.use(cors());

// Qui inseriremo le tue chiavi API in modo sicuro su Render
const CLIENT_ID = process.env.ZAKEKE_CLIENT_ID;
const CLIENT_SECRET = process.env.ZAKEKE_CLIENT_SECRET;

app.get('/get-token', async (req, res) => {
    try {
        const response = await axios.post('https://api.zakeke.com/token', 
            `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Errore nel recupero del token' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Ponte Zakeke attivo sulla porta ${PORT}`));
