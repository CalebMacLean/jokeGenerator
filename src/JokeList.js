// Imports
import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";

/** List of Jokes */
const JokeList = ({ numJokesToGet = 5 }) => {
    // State
    const [jokes, setJokes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Side Effects
    useEffect(function () {
        async function getJokes() {
            let j = [...jokes];
            let seenJokes = new Set();
            try {
                while (j.length < numJokesToGet) {
                    let res = await axios.get("https://icanhazdadjoke.com", {
                        headers: {Accept: "application/json"}
                    });
                    let {...jokeObj} = res.data;
                    
                    if (!seenJokes.has(jokeObj.id)) {
                        seenJokes.add(jokeObj.id);
                        j.push({...jokeObj, votes: 0});
                    } else {
                        console.error("duplicate found!");
                    }
                }
                setJokes(j);
                setIsLoading(old => !old);
            }
            catch(err) {
                console.error(err);
            }

        }
        if (jokes.length === 0) getJokes();
    }, [jokes, numJokesToGet])

    // Handlers
    const generateNewJokes = () => {
        setJokes([]);
        setIsLoading(bool => !bool);
    };

    const vote = (id, delta) => {
        setJokes(jokes.map(j => {
            return j.id === id ? { ...j, votes: j.votes + delta } : j;
        }))
    }

    let sortedJokes = [...jokes].sort((a,b) => b.votes - a.votes);

    return (
        <div className="JokeList">
            <button
                className="JokeList-getmore"
                onClick={generateNewJokes}>
                    Get New Jokes
            </button>

            {sortedJokes.map(j => (
                <Joke
                    text={j.joke}
                    key={j.id}
                    id={j.id}
                    votes={j.votes}
                    vote={j.vote} 
                />
            ))}
        </div>
    )
};

// Exports
export default JokeList;