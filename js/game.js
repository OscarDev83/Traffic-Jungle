
class Game {

    constructor() {
        this.gameIntro = document.querySelector('#gameIntro');
        this.gameBoardElement = document.querySelector('#gameBoard');
        this.gameEnd = document.querySelector('#gameEnd');
        this.restartButton = document.querySelector("#restartButton")
        this.endTitle = document.querySelector("#endTitle")
        this.endTitle2 = document.querySelector("#endTitle2")
        this.paragraph = document.querySelector("#paragraph")
        this.boardRect = undefined
        this.board = board
        this.cars = cars
        this.gameIsOver = false
        this.gameIntervalId = undefined
        this.carMovementId = undefined
        this.initialCarPos = undefined
        this.totalCars = cars.length
        this.carsExitedCount = 0
        this.gameLoopFrequency = Math.round(1000 / 60)
        this.gameSize = {
            width: 600,
            height: 520
        }


    }

    start() {
        this.gameIntro.style.display = 'none'
        this.paragraph.style.display = 'none'
        this.gameBoardElement.style.display = 'block'
        this.gameEnd.style.display = 'none'
        this.endTitle.style.display = 'none'
        this.endTitle2.style.display = 'none'
        this.restartButton.style.display = 'none'

        this.setGameSize()
        this.drawBoard()
        this.drawCars()
        this.setEventListeners()
        this.gameIntervalId = setInterval(() => {
            this.gameLoop()
        }, this.gameLoopFrequency)
    }


    gameLoop() {
        this.checkCollisions()
        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId)
        }
    }


    setGameSize() {
        this.gameBoardElement.style.height = `${this.gameSize.height}px`;
        this.gameBoardElement.style.width = `${this.gameSize.width}px`;
        this.boardRect = this.gameBoardElement.getBoundingClientRect()
    }



    drawBoard() {

        this.board.forEach((eachRow, rowIndex) => {

            eachRow.forEach((eachCell, cellIndex) => {

                const cellElement = document.createElement('div')

                if (eachCell === 1) {
                    cellElement.style.backgroundColor = '#caff42'
                }
                if (eachCell === 0) {
                    cellElement.style.backgroundColor = 'grey'
                }
                const cellSize = 20
                const cellPosLeft = cellIndex * cellSize
                const cellPosTop = rowIndex * cellSize


                cellElement.style.position = 'absolute'
                cellElement.style.width = `${cellSize}px`
                cellElement.style.height = `${cellSize}px`
                cellElement.style.left = `${cellPosLeft}px`
                cellElement.style.top = `${cellPosTop}px`
                this.gameBoardElement.appendChild(cellElement)
            })
        })
    }

    drawCars() {

        this.cars.forEach((eachCar) => {

            let cellCar = document.createElement('div')

            cellCar.style.background = `url('${eachCar.image}')`
            cellCar.style.backgroundSize = 'cover'

            const carPosLeft = eachCar.position.left
            const carPosTop = eachCar.position.top


            cellCar.className = 'car-cell'
            cellCar.dataset.direction = eachCar.direction

            cellCar.style.position = 'absolute'
            cellCar.style.width = `${eachCar.size.width}px`
            cellCar.style.height = `${eachCar.size.height}px`
            cellCar.style.left = `${carPosLeft}px`
            cellCar.style.top = `${carPosTop}px`


            this.gameBoardElement.appendChild(cellCar)
        })
    }



    setEventListeners() {
        const cars = document.querySelectorAll('.car-cell')

        cars.forEach(eachCar => {
            eachCar.onclick = evt => this.moveCar(evt.target)
        });
        setInterval(() => {
            this.checkCollisions();
        }, 100);
    }

    moveCar(car) {
        const carRect = car.getBoundingClientRect()
        const direction = car.dataset.direction

        car.dataset.moving = 'true'

        this.initialCarPos = {
            top: car.style.top,
            left: car.style.left
        }

        let diffTop = Math.floor(carRect.top - this.boardRect.top)
        let diffLeft = Math.floor(carRect.left - this.boardRect.left)

        this.carMovementId = setInterval(() => {
            const carPosBottom = diffTop + carRect.height;
            const carPosRight = diffLeft + carRect.width

            if (direction === 'bottom') diffTop++
            else if (direction === 'top') diffTop--
            else if (direction === 'left') diffLeft--
            else if (direction === 'right') diffLeft++

            if (direction === 'top' || direction === 'bottom') car.style.top = `${diffTop}px`
            if (direction === 'left' || direction === 'right') car.style.left = `${diffLeft}px`


            if (diffTop === -10 || diffLeft === -64 || diffTop > carRect.top - 58 || diffLeft > carRect.left + 100) {

                clearInterval(this.carMovementId)
                car.remove()
                this.carsExitedCount++
                if (this.carsExitedCount === this.totalCars) {
                    this.endGame()
                }
            }
        }, 1);
    }


    checkCollisions() {
        const cars = document.querySelectorAll('.car-cell')

        cars.forEach(car1 => {

            const rect1 = car1.getBoundingClientRect()

            cars.forEach(car2 => {

                if (car1 !== car2) {

                    const rect2 = car2.getBoundingClientRect()

                    if (
                        rect1.top < rect2.bottom &&
                        rect1.bottom > rect2.top &&
                        rect1.left < rect2.right &&
                        rect1.right > rect2.left
                    ) {
                        if (car1.dataset.moving === 'true') this.resetCarPosition(car1)
                        if (car2.dataset.moving === 'true') this.resetCarPosition(car2)
                    }

                }
            })
        })
    }



    resetCarPosition(car) {

        clearInterval(this.carMovementId)

        car.style.left = this.initialCarPos.left
        car.style.top = this.initialCarPos.top

        car.dataset.moving = 'false'
    }

    restartGame() {
        this.gameIsOver = false
        this.carsExitedCount = 0
        this.gameBoardElement.innerHTML = ''
        this.drawBoard()
        this.drawCars()
        this.gameIntervalId = setInterval(() => {
            this.gameLoop()
        },
            this.gameLoopFrequency)
        this.setEventListeners()
        this.gameBoardElement.style.display = 'block'
        this.gameEnd.style.display = 'block'
        this.endTitle.style.display = 'block'
        this.endTitle2.style.display = 'block'
        this.restartButton.style.display = 'none'
    }

    endGame() {
        this.gameIsOver = true
        this.gameBoardElement.style.display = 'none'
        this.gameEnd.style.display = 'block'
        this.endTitle.style.display = 'block'
        this.endTitle2.style.display = 'block'
        this.restartButton.style.display = 'block'
    }
}
