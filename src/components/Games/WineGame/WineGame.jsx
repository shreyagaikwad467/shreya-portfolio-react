import { useState } from "react";
import "./WineGame.css";

import { createGrapes } from "./WineGame.js";

function WineGame() {

    const [gameState, setGameState] = useState("intro");

    const [grapes, setGrapes] = useState([]);


    const pickedCount = grapes.filter(
        (grape) => grape.picked
    ).length;


    /* ========================================= */
    /* ============== START GAME ================ */
    /* ========================================= */

    const startGame = () => {

        setGrapes(createGrapes());

        setGameState("playing");
    };


    /* ========================================= */
    /* ============== PICK GRAPE ================ */
    /* ========================================= */

    const pickGrape = (id) => {

        setGrapes((currentGrapes) => {

            const updatedGrapes = currentGrapes.map(
                (grape) =>
                    grape.id === id
                        ? {
                            ...grape,
                            picked: true
                        }
                        : grape
            );


            const allPicked = updatedGrapes.every(
                (grape) => grape.picked
            );


            if (allPicked) {

                setTimeout(() => {
                    setGameState("finished");
                }, 500);

            }


            return updatedGrapes;

        });

    };


    return (

        <div className="wine-game-section">


            {/* ================================= */}
            {/* ============ INTRO =============== */}
            {/* ================================= */}

            {gameState === "intro" && (

                <div className="wine-game-card intro-card">

                    <div className="wine-game-icon">
                        🍇
                    </div>

                    <h2>
                        The Harvest
                    </h2>

                    <p>
                        Pick the grapes
                        <br />
                        and make your wine.
                    </p>

                    <button
                        className="wine-game-button"
                        onClick={startGame}
                    >
                        Play
                    </button>

                </div>

            )}


            {/* ================================= */}
            {/* ============= GAME =============== */}
            {/* ================================= */}

            {gameState === "playing" && (

                <div className="wine-game-card">

                    <div className="wine-game-header">

                        <div>

                            <span className="wine-game-label">
                                THE HARVEST
                            </span>

                            <h2>
                                Pick the grapes
                            </h2>

                        </div>


                        <div className="grape-counter">
                            {pickedCount} / {grapes.length}
                        </div>

                    </div>


                    <p className="wine-game-instruction">
                        Pick them all!
                    </p>


                    <div className="vineyard">

                        <div className="vineyard-sky"></div>


                        <div className="vine">

                            <span className="vine-leaf leaf-one"></span>

                            <span className="vine-leaf leaf-two"></span>

                            <span className="vine-leaf leaf-three"></span>

                        </div>


                        {grapes.map((grape) => (

                            <button
                                key={grape.id}
                                className={`grape ${
                                    grape.picked
                                        ? "picked"
                                        : ""
                                }`}
                                style={{
                                    left: `${grape.x}%`,
                                    top: `${grape.y}%`
                                }}
                                onClick={() =>
                                    pickGrape(grape.id)
                                }
                                disabled={grape.picked}
                                aria-label="Pick grape"
                            >
                                🍇
                            </button>

                        ))}


                        <div className="vineyard-ground"></div>

                    </div>

                </div>

            )}


            {/* ================================= */}
            {/* ============ FINISHED ============ */}
            {/* ================================= */}

            {gameState === "finished" && (

                <div className="wine-game-card finished-card">


                    <div className="wine-glass">

                        <div className="wine-liquid"></div>

                        <div className="wine-glass-bowl"></div>

                        <div className="wine-glass-stem"></div>

                        <div className="wine-glass-base"></div>

                    </div>


                    <h2>
                        A Fine Harvest.
                    </h2>


                    <p>
                        You picked all the grapes.
                        <br />
                        Your wine is ready. 🍷
                    </p>


                    <button
                        className="wine-game-button"
                        onClick={startGame}
                    >
                        Play Again
                    </button>

                </div>

            )}

        </div>

    );
}

export default WineGame;