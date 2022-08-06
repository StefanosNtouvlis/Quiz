const username = document.querySelector("#username")
const saveScoreBtn = document.querySelector("#saveScoreBtn")
const finalScore = document.querySelector("#finalScore")
const endText = document.querySelector("#end-text")
const mostRecentScore = localStorage.getItem("mostRecentScore")


const highScores = JSON.parse(localStorage.getItem("highScores")) || []

const MAX_HIGH_SCORES = 5;

finalScore.innerHTML = mostRecentScore

if(mostRecentScore === 500){
endText.innerHTML = "Hmm you are not that dumb after all...<br>Put your name below to save your meager score :|"
}
if(mostRecentScore < 400 && mostRecentScore > 200){
    endText.innerHTML = "Hmm you are a bit dumb after all...<br>Put your name below to save your dissapointing score :/"
}

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem("highScores", JSON.stringify(highScores))
    window.location.assign('index.html')
}