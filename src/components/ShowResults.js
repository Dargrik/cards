import { useParams } from "react-router-dom";

// get if result is correct or not from url params
// also get time and correct answers from url params
const ShowResults = () => {

    const { time } = useParams();
    const { correctAnswers } = useParams();
    const { isCorrect } = useParams();
    const { difficultyLevel } = useParams();
    const { category } = useParams();

    return (
        <div className="result-container">
            <div className="column">
                <div className="result-heading">
                    <img src={isCorrect === "true" ? "/assets/results/correct.svg" : "/assets/results/incorrect.svg"} alt="" />
                    <h1>{isCorrect === "true" ? "Das ist richtig!" : "Das ist falsch!"}</h1>
                    <div className="result-data">
                        <h2>Dauer: {time}s</h2>
                        <h2>Erfolg: {correctAnswers}%</h2>
                        <h2>Schwierigkeit: {difficultyLevel}.</h2>
                    </div>
                </div>


            </div>

            {
                isCorrect === "true" && difficultyLevel < 9 ? (
                    <div className="button-container" onClick={() => window.location.href = `/game/${category}/${parseInt(difficultyLevel) + 1}`}>
                        <p>Continue</p>
                    </div>
                ) : (
                    <div className="button-container" onClick={() => window.location.href = "/"}>
                        <p>Back to home</p>
                    </div>
                )
            }

            <div className='bottom-left-svg'>
                <img src="/assets/results/bottom-left.svg" alt="" />
            </div>

            <div className='top-right-svg'>
                <img src="/assets/results/top-right.svg" alt="" />
            </div>

        </div>
    );

}

export default ShowResults;