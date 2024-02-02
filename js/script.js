


window.onload = function () {
    const startButton = document.getElementById("startButton")
    this.paragraph.style.display = 'block'
    this.restartButton.style.display = 'none'
    this.endTitle.style.display = 'none'
    this.endTitle2.style.display = 'none'
    const sound = new Audio('Audio/desgraciaus_coches_choque.mp3')
    startButton.addEventListener("click", function () {
        sound.play()
        startGame()


    });

    this.restartButton.addEventListener("click", function () {
        restartGame()
    });
}

function startGame() {
    game = new Game()
    game.start()
    startButton.remove()

}

function restartGame() {

    this.restartButton.style.display = 'block'
    location.reload()
}
