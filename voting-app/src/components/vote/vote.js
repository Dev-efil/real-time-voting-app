import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

function Vote() {
    const [result, setResult] = useState();

    useEffect(() => {
        socket.on('broadcast', (voteList) => {
            const res = voteList;
            setResult(res);
        })
    }, [])

    const voteSriLanka = () => {
        const vote = 0;
        const result = {
            '0': {
                '0': vote
            }
        }
        socket.emit('vote', result);
    }
    const voteNamibia = () => {
        const vote = 1;
        const result = {
            '0': {
                '1': vote
            }
        }
        socket.emit('vote', result);
    }
    return (
        <div>
            <button onClick={voteSriLanka}>Sri lanka</button>
            <button onClick={voteNamibia}>Namibia</button>
            <div>
                <code>{JSON.stringify(result)}</code>
            </div>
        </div>
    )
}

export default Vote;
