const express = require('express');
const app = express();
const cors = require('cors');
const socket = require('socket.io');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/test', (req, res) => {
    return res.status(200).json({ message: "Successfully" });
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
