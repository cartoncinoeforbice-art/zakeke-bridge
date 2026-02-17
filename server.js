const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.ZAKEKE_CLIENT_ID;
const CLIENT_SECRET = process.env.ZAKEKE_CLIENT_SECRET;

// 1. Endpoint per il Token (già funzionante)
app.get('/token', async (req, res) => {
    try {
        const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
        const response = await axios.post('https://api.zakeke.com/token', 
            'grant_type=client_credentials',
            { headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Errore token' });
    }
});

// 2. NUOVO: Endpoint per il Catalogo Prodotti
// Questo sblocca l'errore "Product Catalog API"
app.get('/catalog', (req, res) => {
    const products = [
        {
            id: "10071943",
            name: "Felpa Rosa HSTYLE",
            description: "Felpa personalizzabile",
            price: 39.90,
            imageUrl: "https://www.hstyle.it/logo-white.png" // Puoi mettere l'URL della foto reale
        }
    ];
    res.json({ products: products });
});

app.get('/', (req, res) => res.send('Ponte attivo!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
