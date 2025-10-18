import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Automatically provided in node.js's CommonJS, but need to be imported in ESModules
const __filename = fileURLToPath(import.meta.url); // Get file URL and convert it to path
const __dirname = dirname(__filename); // get the directory containing this file path

const app = express();
const PORT = 5500;

// Serve client folder as web root : '/workspaces/T-WEB-501-REN_4/client'
app.use(express.static(path.join(__dirname, '../client')));

app.listen(PORT, () => {
    console.log(`Client dev server: http://localhost:${PORT}`);
});