
const board = [
    // ... (tu array board)
];

const cars = [
    // ... (tu array cars)
];

function moveCar(event, carIndex) {
    const car = cars[carIndex];

    if (car) {
        const direction = car.name.includes("left") ? "left" : "top";
        const newPosition = calculateNewPosition(car, direction, event);

        if (isValidMove(newPosition, direction)) {
            car.position = newPosition;
            updateCarPosition(carIndex);
        }
    }
}

function calculateNewPosition(car, direction, event) {
    const rect = event.target.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    let left = car.position.left;
    let top = car.position.top;

    if (direction === "horizontal") {
        left = mouseX - car.size.width / 2;
    } else {
        top = mouseY - car.size.height / 2;
    }

    return { left, top };
}

function isValidMove(newPosition, direction) {
    // Verifica si la nueva posición está dentro de los límites del tablero
    // y no colisiona con otros coches en esa dirección.
    // Puedes implementar esta lógica según tus necesidades.
    // Aquí solo se comprueba que la nueva posición esté dentro del tablero.
    return (
        newPosition.left >= 0 &&
        newPosition.top >= 0 &&
        newPosition.left + cars[0].size.width <= board[0].length * 20 &&
        newPosition.top + cars[0].size.height <= board.length * 20
    );
}

function updateCarPosition(carIndex) {
    const car = cars[carIndex];
    const carElement = document.getElementById(car.name);

    if (carElement) {
        carElement.style.left = car.position.left + "px";
        carElement.style.top = car.position.top + "px";
    }
}

window.onload = function () {
    // Crear elementos div para representar los coches en el HTML
    for (let i = 0; i < cars.length; i++) {
        const car = cars[i];
        const carElement = document.createElement("div");
        carElement.id = car.name;
        carElement.className = "car";
        carElement.style.left = car.position.left + "px";
        carElement.style.top = car.position.top + "px";
        carElement.style.width = car.size.width + "px";
        carElement.style.height = car.size.height + "px";

        // Agregar evento de clic a cada coche
        carElement.addEventListener("click", (event) => moveCar(event, i));

        document.body.appendChild(carElement);
    }
};

