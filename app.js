const board = document.querySelector('.board')
const turn = document.querySelector('.turn')
const playerX = document.querySelector('.points-x')
const playerO = document.querySelector('.points-o')

let scoreX = 0
let scoreO = 0
let currentTurn = 'X'

let arr = ['', '', '', '', '', '', '', '', '']
// game over or not logic
let gameCheckerA = () => {
    if(arr[0] == arr[4] && arr[4] == arr[8] && arr[4] !== ''){
        return arr[4]
    }
    else if(arr[2] == arr[4] && arr[4] == arr[6] && arr[4] !== ''){
        return arr[4]
    }
    return false
}
let gameCheckerB = () => {
    if(arr[0] == arr[3] && arr[3] == arr[6] && arr[3] !== ''){
        return arr[3]
    }
    else if(arr[1] == arr[4] && arr[4] == arr[7] && arr[4] !== ''){
        return arr[4]
    }
    else if(arr[2] == arr[5] && arr[5] == arr[8] && arr[5] !== ''){
        return arr[5]
    }
    return false
}
let gameCheckerC = () => {
    if(arr[0] == arr[1] && arr[1] == arr[2] && arr[1] !== ''){
        return arr[1]
    }
    else if(arr[3] == arr[4] && arr[4] == arr[5] && arr[4] !== ''){
        return arr[4]
    }
    else if(arr[6] == arr[7] && arr[7] == arr[8] && arr[7] !== ''){
        return arr[7]
    }
    return false
}


let gameCheck = () => {
    if(gameCheckerA()) return gameCheckerA() 
    if(gameCheckerB()) return gameCheckerB()
    if(gameCheckerC()) return gameCheckerC()
    return false
}

let isGameOver = () => {
    for(let ele of arr){
        if(ele === '') return false
    }
    return true
}


let setDelay = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

board.addEventListener('click', (e) => {
    if(e.target.classList.contains('cell')){
        if(e.target.classList.contains('done') == false){
            e.target.classList.add('done')
            e.target.innerHTML = currentTurn
            let id = e.target.getAttribute('id')
            // console.log(id)
            arr[+id[1]] = currentTurn
            // console.log(arr)
            if(gameCheck()){
                console.log('Winner found')
                turn.textContent = `Player ${currentTurn} is the winner`
                if(currentTurn == 'X') scoreX++
                else scoreO++
                playerO.innerHTML = `${scoreO}`
                playerX.innerHTML = `${scoreX}`

                // preventing clicks until the whole reset thing is done
                for(let i=0; i<9; i++){
                    let ele = document.querySelector(`#c${i}`)
                    ele.classList.add('done')
                }

                setDelay(3000)
                    .then(() => {
                        turn.textContent = 'Starting New Game'
                        return setDelay(500)
                    })
                    .then(() => {
                        turn.textContent += '.'
                        return setDelay(500)
                    })
                    .then(() => {
                        turn.textContent += '.'
                        return setDelay(500)
                    }).then(() => {
                        turn.textContent += '.'
                        return setDelay(1000)
                    })
                    .then(() => {
                        // console.log(ele)
                        for(let i=0; i<9; i++){
                            let ele = document.querySelector(`#c${i}`)
                            if(ele.classList.contains('done')){
                                ele.classList.remove('done')
                            }
                            ele.innerHTML = ''
                            arr[i] = ''
                        }
                        currentTurn = 'X'
                        turn.textContent = `${currentTurn}'s turn`
                    })
            }
            else if(isGameOver()){
                turn.textContent = `The game is a DRAW`
                setDelay(3000)
                    .then(() => {
                        turn.textContent = 'Starting New Game'
                        return setDelay(500)
                    })
                    .then(() => {
                        turn.textContent += '.'
                        return setDelay(500)
                    })
                    .then(() => {
                        turn.textContent += '.'
                        return setDelay(500)
                    }).then(() => {
                        turn.textContent += '.'
                        return setDelay(1000)
                    })
                    .then(() => {
                        // console.log(ele)
                        for(let i=0; i<9; i++){
                            let ele = document.querySelector(`#c${i}`)
                            ele.classList.remove('done')
                            ele.innerHTML = ''
                            arr[i] = ''
                            // ele = ele.nextSibling
                        }
                        currentTurn = 'X'
                        turn.textContent = `${currentTurn}'s turn`
                    })
            }
            else{
                if(currentTurn === 'X') currentTurn = 'O'
                else currentTurn = 'X'
                turn.textContent = `${currentTurn}'s turn`
            }
        }
    }
})