const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

// Recupera le chiavi dalle variabili d'ambiente di Render
const CLIENT_ID = process.env.ZAKEKE_CLIENT_ID;
const CLIENT_SECRET = process.env.ZAKEKE_CLIENT_SECRET;

app.get('/token', async (req, res) => {
    try {
        const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
        const response = await axios.post('https://api.zakeke.com/token', 
            'grant_type=client_credentials',
            { 
                headers: { 
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded' 
                } 
            }
        );
        console.log("Token generato con successo");
        res.json(response.data);
    } catch (error) {
        console.error("Errore API Zakeke:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Errore nel recupero del token' });
    }
});

// Serve per verificare che il server sia vivo sulla home
app.get('/', (req, res) => {
    res.send('Ponte Zakeke attivo! Vai su /token per il pass.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server in ascolto sulla porta ${PORT}`));
