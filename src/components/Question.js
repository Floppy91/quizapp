import React from "react";

export default function Question(props){

const [answerShuffle, setAnswerShuffle] = React.useState([])

// auf sonderzeichen durchsuchen (&#039; = ' //  &quot; = ")
function searchSonderzeichen(string){
    let result = string.replace("&#039;", "'")
    result = result.split("&quot;").join("'")

    return result
}


React.useEffect(()=> {
    const answerArray=[]

    answerArray.push(props.answerCorrect)
    for (const answer of props.answerFalse){
        answerArray.push(searchSonderzeichen(answer))
    }
    const answerShuffleArray = answerArray.sort(randomArray)

    function randomArray(a,b){
        return 0.5 - Math.random()
    }

    setAnswerShuffle(answerShuffleArray)

},[props.value])

    //Style vom Button der gewählten Antwort ändern
    function styleClickedAnswer(answer){
        if (props.showAnswer){
            //richtige Antwort anzeigen
            if(answer == props.answerCorrect){
                const rightColor = {'background-color': 'palegreen'}
                return rightColor
            //falls gewählte Antwort falsch ist, falsch anzeigen
            } else if(answer == props.clickedAnswer && answer !== props.answerCorrect){
                const wrongcolor = {'background-color': '#FF3030'}
                return wrongcolor
            }
            //geklickte Antwort farblich anzeigen
        } else if(answer == props.clickedAnswer) {
            // const color = {'background-color': 'lightgreen'}
            const color = {'border': 'solid 2.5px'}
                return color

        }
    
    }


    const displayAnswers = answerShuffle.map(answer => 
        <p style={styleClickedAnswer(answer)} 
        onClick={() => props.answerToggle(answer, props.id)}>{answer}</p>)
    
        

    return(
        <div className="question-container">

            <h4>{searchSonderzeichen(props.value)}</h4>
            <div className="answer-container">
                {displayAnswers}
            </div>
            <hr></hr>
        </div>
    )
}