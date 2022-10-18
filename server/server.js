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

const server = app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

const voteList = {
    '0' : {
        SriLanka : 0,
        Namibia : 0
    },
    '1' : {
        UAE : 0,
        Netherlands : 0
    },
    '2' : {
        WestIndies : 0,
        Scotland : 0
    }
}

// Socket.io code
const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000'
    },
});

io.on('connection', function (socket) {
    console.log(`Made a Socket connection 🔌 : ${socket.id}`);
    // Register an event to console the data which coming from Client.
    socket.on('vote', (vote) => {
        const element = Number(Object.keys(vote)[0]);
        if(voteList[element]) {
            if(Object.keys(vote[0])[0] === '0') {
                voteList[0].SriLanka +=1;
            }
            else if(Object.keys(vote[0])[0] === '1') {
                voteList[0].Namibia +=1;
            }
        }
        else if (voteList[vote[1]]) {
            console.log('something');
        }
        // broadcast the event to all connected users
        io.emit('broadcast', voteList);
    });
    io.emit('broadcast', voteList);
});