import React from "react";
import Question from './Question'


export default function Game(){
    //const [question, setQuestion] = React.useState()

    const [allQuestion, setAllQuestion] = React.useState([])
    const [checkAnswer, setCheckAnswer] = React.useState(false)
    const [comment, setComment] = React.useState({state: false, text:''})
    const [restart, setRestart] = React.useState(false)

    const url = 'https://opentdb.com/api.php?amount=5'
    let text = ''
    

    React.useEffect(() => {
        setRestart(false)
        fetch(url)
            .then(res => res.json())
            .then(data  => setAllQuestion(data.results))
        //console.log(allQuestion)
    },[restart])

    function answerHandle(answer, indexQuestion){
        //im State bei dem geklicken Frage ein clicked: Antwort einfügen
        const nextQuestion = allQuestion.map((item,i) => {
            if (indexQuestion === i){
                return {
                    ...item, clicked: answer
                } 
            } 
            else{
                return item
            }
        })
         setAllQuestion(nextQuestion)
        // console.log(answer, indexQuestion)
        // console.log(allQuestion)
        } 

    const displayQuestion = allQuestion.map((item, index) => 
        <Question 
            key={index}
            id={index} 
            value={item.question} 
            answerCorrect={item.correct_answer}
            answerFalse={item.incorrect_answers}
            answerToggle={answerHandle}
            clickedAnswer={item.clicked}
            showAnswer={checkAnswer}
            restart={restart}
            /> 
        )

        function showSolution(){
            const answerArray =[]
            let missingAnswer = 0
            let points = 0
            
            for (let i = 0; i< allQuestion.length; i++){
                answerArray.push(allQuestion[i].clicked)
                
                if(allQuestion[i].clicked === undefined){
                    missingAnswer = missingAnswer+1
                }
                if (allQuestion[i].clicked === allQuestion[i].correct_answer){
                    points = points + 1
                }
            }
            
            console.log(missingAnswer)
            console.log(answerArray)

            if (checkAnswer == false){
                if (missingAnswer !== 0){
                    setComment({state: true, text: `Answer all question, ${missingAnswer} are missing!`})
                } else {
                    setCheckAnswer(true)
                    setComment({state: true, text: `You answered ${points} of ${answerArray.length} correctly!`})
                }

            } else{
                    setComment({state: false, text: ''})
                    setCheckAnswer(false)
                    setRestart(true)
                }
            
        }


    return(
        <div className="game-container">
            {displayQuestion}
            {comment.state == true && <p>{comment.text}</p>}
            <button className="game-btn" onClick={showSolution} >
                {checkAnswer === false ? "Check answers!" : "Restart"}
            </button>

        </div>
    )
}