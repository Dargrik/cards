import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "./useFetch";

const ShowGame = () => {
    const { id } = useParams();
    let { difficultyLevel } = useParams();        // number of words to guess
    difficultyLevel = parseInt(difficultyLevel);   // convert to number
    const { data, isPending, error } = useFetch('http://localhost:8000/Games');
    const [selectedItems, setSelectedItems] = useState([]);
    const [countdown, setCountdown] = useState(3);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [readableAnswer, setReadableAnswer] = useState();
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(true);
    const navigate = useNavigate();

    const [reloadDOM, setReloadDOM] = useState(false);

    const [dateStarted, setDateStarted] = useState(null);

    const arrayEquals = (a, b) => {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }

    const HandleClick = (e) => {
        const tempArray = selectedItems;
        if (e.currentTarget.classList.contains('clicked')) {
            e.currentTarget.classList.remove('clicked');
            tempArray.splice(tempArray.indexOf(e.currentTarget.id), 1);
        } else {
            e.currentTarget.classList.add('clicked');
            tempArray.push(e.currentTarget.id);
        }
        setSelectedItems(tempArray);

        setReloadDOM(!reloadDOM)
    }

    const HandleConfirm = () => {
        let correct = 0;
        for (let i = 0; i < selectedItems.length; i++) {
            if (correctAnswers[i] === selectedItems[i]) {
                correct++;
            }
        }

        // check if the selected items are correct and order is correct
        navigate(`/results/${(new Date().getTime() - dateStarted.getTime()) / 1000}/${Math.floor((correct / correctAnswers.length) * 100)}/${arrayEquals(selectedItems, correctAnswers)}/${difficultyLevel}/${id}`);

    }


    useEffect(() => {

        let localCountdown = 3;
        const wordShowTime = 2;         // in seconds

        // calculate the countdown
        const interval = setInterval(() => {
            setCountdown(countdown => countdown - 1);
            localCountdown -= 1;

            if (countdown < 1) {
                clearInterval(interval);
            }
        }, 1000);

        // show the words, save them to array, words cannot repeat
        const interval2 = setInterval(() => {

            if (localCountdown < 1 && data) {
                let tempArray = correctAnswers;


                if (tempArray.length !== difficultyLevel) {

                    for (let i = 0; i < 100; i++) {
                        const randomWord = Math.floor(Math.random() * data[id].length);
                        const randomWordName = data[id][randomWord].name;

                        if (!tempArray.includes(randomWordName) && tempArray.length < difficultyLevel) {
                            tempArray.push(randomWordName);
                            setReadableAnswer(randomWordName)
                            setCorrectAnswers(tempArray);
                            break;
                        }
                        if (tempArray.length === difficultyLevel) {
                            if (dateStarted === null) {
                                setDateStarted(new Date());
                            }

                            setShowCorrectAnswers(false);
                            setReadableAnswer("")
                            break;
                        }
                    }
                } else {
                    if (dateStarted === null) {
                        setDateStarted(new Date());
                    }

                    setShowCorrectAnswers(false);
                    setReadableAnswer("")
                }


            }

        }, wordShowTime * 1000);

        return () => {
            clearInterval(interval2)
            clearInterval(interval)
        };

    }, [data]);

    return (
        <div className="game-container">
            <div className="game-list">
                {countdown < 1 && !isPending && !error && correctAnswers && showCorrectAnswers && readableAnswer && <div className="correct-answers">{readableAnswer}</div>}
                {error && <div>{error}</div>}
                {countdown > 0 && <div className="game-countdown">{countdown}</div>}
                {countdown < 1 && isPending && <div>Loading...</div>}

                {countdown < 1 &&
                    data && !showCorrectAnswers && data[id].map((gameItem) => {
                        return selectedItems.includes(gameItem.name) ? (
                            <div className="game-list-item clicked" key={gameItem.name} id={gameItem.name} onClick={HandleClick}>
                                <div className="triangle-container">
                                    <div className="triangle"></div>
                                    <p className="triangle-text">{selectedItems.indexOf(gameItem.name) + 1}</p>
                                </div>

                                <img src={gameItem.image
                                } alt="IMG" />
                            </div>
                        ) : (
                            <div className="game-list-item" key={gameItem.name} id={gameItem.name} onClick={HandleClick}>
                                <img src={gameItem.image
                                } alt="IMG" />
                            </div>
                        )
                    })
                }

            </div>

            {
                countdown < 1 && !showCorrectAnswers && <div className="button-container" onClick={() => HandleConfirm()}>
                    <p>Confirm</p>
                </div>
            }

            <div className='bottom-left-svg'>
                <img src="/assets/start/bottom-left.svg" alt="" />
            </div>

            <div className='top-right-svg'>
                <img src="/assets/start/top-right.svg" alt="" />
            </div>

        </div>
    );
}

export default ShowGame;