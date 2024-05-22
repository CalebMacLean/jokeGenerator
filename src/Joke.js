// Imports
import React from "react";

/** A single joke, along with vote up/down buttons. */
const Joke = ({ id, vote, votes, text}) => {
    // Event Handlers
    function upVote(evt) { vote(id, +1); }
    function downVote(evt) { vote(id, -1); }
    // Render
    return (
        <div className="Joke">
            <div className="Joke-votearea">
                <button onClick={upVote}>
                    <i className="fas fa-thumbs-up" />
                </button>

                <button onClick={downVote}>
                    <i className="fas fa-thumbs-down" />
                </button>

                { votes }
            </div>

            <div className="Joke-text">{ text }</div>
        </div>
    )
};

// Exports
export default Joke;