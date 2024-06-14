// Get the canvas element and its context
let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

// Define the size of the box (snake segment and food size)
let box = 32;

// Initialize the snake as an array of coordinates
let snake = [];
snake[0] = { x: 8 * box, y: 8 * box };

// Define the obstacles
let obstacles = [
    { x: Math.floor(Math.random() * 15 + 1) * box, y: Math.floor(Math.random() * 15 + 1) * box },
    { x: Math.floor(Math.random() * 15 + 1) * box, y: Math.floor(Math.random() * 15 + 1) * box },
    // Add more obstacles as needed
];

// Define the score
let score = 0;

// Set the initial direction of the snake
let direction = "right";

// Create the food at a random position
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Function to draw the game background
function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Function to draw the obstacles
function drawObstacles() {
    context.fillStyle = "gray";
    for(let i = 0; i < obstacles.length; i++) {
        context.fillRect(obstacles[i].x, obstacles[i].y, box, box);
    }
}

// Function to draw the snake
function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Function to draw the food
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Event listener for arrow keys to change the direction of the snake
document.addEventListener('keydown', update);

// Listen for arrow key presses
document.addEventListener('keydown', changeDirection);

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

// Main game loop
function startGame() {
    // Check if the snake has hit the border, if so wrap it around
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    // Check if the snake has hit itself
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over :(');
        }
    }
    

    // Draw the game elements
    createBG();
    createSnake();
    drawFood();
    drawObstacles();
    drawScore();    

    // Get the next position of the snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Update the position based on the direction
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    // Increment the score when the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
    }

    // Check if the snake has eaten the food
    if (snakeX != food.x || snakeY != food.y) {
        // If not, remove the last segment of the snake
        snake.pop();
    } else {
        // If yes, generate new food and don't remove the last segment
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    // Add a new segment to the front of the snake
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // In the startGame function, check for collision with the obstacles
    for(let i = 0; i < obstacles.length; i++) {
        if(snakeX == obstacles[i].x && snakeY == obstacles[i].y) {
            clearInterval(game);
            alert('Game Over :(');
        }
    }

    snake.unshift(newHead);
}

// Display the score
function drawScore() {
    context.fillStyle = "black";
    context.font = "16px Arial";
    let textWidth = context.measureText("Score: " + score).width;
    context.fillText("Score: " + score, (canvas.width - textWidth) / 2, 20);
}

function changeDirection(event) {
    let key = event.keyCode;
    if( key == 37 && direction != "right") direction = "left";
    else if(key == 38 && direction != "down") direction = "up";
    else if(key == 39 && direction != "left") direction = "right";
    else if(key == 40 && direction != "up") direction = "down";
}

// Start the game loop
let game = setInterval(startGame, 100);