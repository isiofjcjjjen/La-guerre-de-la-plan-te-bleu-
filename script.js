// Variables de base du jeu
const player = document.getElementById('player');
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
let score = 0;
let playerPositionX = 180; // Position initiale du joueur
const playerSpeed = 50; // Vitesse de déplacement du joueur
let isGameOver = false;

// Fonction pour déplacer le joueur
function movePlayer(event) {
    if (isGameOver) return;

    if (event.key === 'ArrowLeft' && playerPositionX > 0) {
        playerPositionX -= playerSpeed;
    } else if (event.key === 'ArrowRight' && playerPositionX < gameArea.offsetWidth - player.offsetWidth) {
        playerPositionX += playerSpeed;
    }

    player.style.left = playerPositionX + 'px';
}

// Créer un obstacle
function createObstacle() {
    if (isGameOver) return;

    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.width = '40px';
    obstacle.style.height = '40px';
    obstacle.style.backgroundColor = 'black';
    obstacle.style.position = 'absolute';
    obstacle.style.left = Math.random() * (gameArea.offsetWidth - 40) + 'px';
    obstacle.style.top = '-40px';

    gameArea.appendChild(obstacle);

    // Animation des obstacles
    obstacle.animate(
        [
            { top: '-40px' },
            { top: gameArea.offsetHeight + 'px' }
        ],
        {
            duration: 2000,
            iterations: Infinity
        }
    );

    // Vérifier la collision avec le joueur
    const obstacleCheckInterval = setInterval(() => {
        if (isGameOver) return;

        const playerRect = player.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
            playerRect.left < obstacleRect.left + obstacleRect.width &&
            playerRect.left + playerRect.width > obstacleRect.left &&
            playerRect.top < obstacleRect.top + obstacleRect.height &&
            playerRect.top + playerRect.height > obstacleRect.top
        ) {
            endGame();
        }
    }, 10);

    // Augmenter le score à chaque obstacle qui atteint le bas
    setTimeout(() => {
        if (isGameOver) return;
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }, 2000);
}

// Fin du jeu
function endGame() {
    isGameOver = true;
    scoreDisplay.textContent = `Game Over! Final Score: ${score}`;
    alert("Game Over! Tu as perdu.");
}

// Démarrer le jeu
function startGame() {
    document.addEventListener('keydown', movePlayer);
    setInterval(createObstacle, 3000); // Créer un nouvel obstacle toutes les 3 secondes
}

// Démarrer le jeu dès que le fichier est chargé
startGame();
