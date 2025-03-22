const socket = new WebSocket("wss://wordbombserver.onrender.com");
let gameInstance = null;

class WordBombGame {
    constructor(gameCode, playerName, isHost = false) {
        this.gameCode = gameCode;
        this.playerName = playerName;
        this.isHost = isHost;
        this.players = [];
        this.currentIndex = 0;
        this.combo = "";
        this.usedWords = new Set();
        this.apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
        this.turnTime = 10;
        this.timer = null;

        this.initializeConnection();
        this.updateUI();
    }

    initializeConnection() {
        if (socket.readyState === WebSocket.OPEN) {
            this.joinGame();
        } else {
            socket.addEventListener("open", () => this.joinGame());
        }
        socket.addEventListener("message", (event) => this.handleMessage(event));
    }

    joinGame() {
        socket.send(JSON.stringify({
            type: "joinGame",
            gameCode: this.gameCode,
            playerName: this.playerName,
            isHost: this.isHost
        }));
    }

    handleMessage(event) {
        const data = JSON.parse(event.data);
        console.log("Received:", data);

        switch (data.type) {
            case "gameState":
                this.players = data.players;
                this.currentIndex = data.currentIndex;
                this.combo = data.currentCombo;
                this.updateUI();
                this.startTurn();
                break;
            case "turnUpdate":
                this.currentIndex = data.currentIndex;
                this.combo = data.currentCombo;
                this.startTurn();
                break;
            case "error":
                this.displayMessage(data.message, "error");
                break;
            case "gameOver":
                this.endGame(data.winner);
                break;
        }
    }

    showCombo() {
        document.getElementById("combo-display").innerText = `Allowed letters: "${this.combo}"`;
    }

    async validateWord(word) {
        if (this.usedWords.has(word)) {
            this.displayMessage(`"${word}" has already been used!`, "error");
            return false;
        }
        if (!word.includes(this.combo)) {
            this.displayMessage(`Word must contain '${this.combo}'!`, "error");
            return false;
        }
        try {
            let response = await fetch(`${this.apiUrl}${word}`);
            if (!response.ok) throw new Error("Invalid word");
            this.displayMessage(`${word} is a valid word!`, "success");
            this.usedWords.add(word);
            socket.send(JSON.stringify({
                type: "submitWord",
                gameCode: this.gameCode,
                word,
                playerName: this.playerName
            }));
            return true;
        } catch (error) {
            this.displayMessage(`Word not found!`, "error");
            return false;
        }
    }

    startTurn() {
        clearTimeout(this.timer);
        this.updateUI();

        const timerBar = document.getElementById("timer-bar");
        timerBar.style.transition = "none";
        timerBar.style.height = "100%";
        setTimeout(() => {
            timerBar.style.transition = `height ${this.turnTime}s linear`;
            timerBar.style.height = "0%";
        }, 50);

        if (this.isMyTurn()) {
            this.timer = setTimeout(() => {
                this.displayMessage(`Time's up!`, "error");
                socket.send(JSON.stringify({ type: "timeOut", gameCode: this.gameCode }));
            }, this.turnTime * 1000);
        }
    }

    isMyTurn() {
        return this.players[this.currentIndex]?.name === this.playerName;
    }

    updateUI() {
        const currentPlayer = this.players[this.currentIndex];
        document.getElementById("player-turn").innerText = `Current Turn: ${currentPlayer?.name || "Waiting..."}`;
        document.getElementById("lives").innerText = this.players.map(p => `${p.name}: ${p.lives} lives`).join(" | ");

        const isMyTurn = this.isMyTurn();
        document.getElementById("word-input").disabled = !isMyTurn;
        document.getElementById("submit-word").disabled = !isMyTurn;

        if (isMyTurn) {
            this.displayMessage("It's your turn!", "info");
        } else {
            this.displayMessage(`Waiting for ${currentPlayer?.name} to play...`, "info");
        }

        this.showCombo();
        document.getElementById("game").classList.remove("hidden");
        document.getElementById("lobby").classList.add("hidden");
    }

    displayMessage(message, type) {
        const messageBox = document.getElementById("message");
        messageBox.innerText = message;
        messageBox.className = type;
    }

    endGame(winner) {
        this.displayMessage(`Game Over! ${winner} wins!`, "success");
        document.getElementById("word-input").disabled = true;
        document.getElementById("submit-word").disabled = true;
    }
}

document.getElementById("create-game").addEventListener("click", () => {
    const playerName = document.getElementById("player-name").value.trim();
    if (!playerName) return alert("Please enter your name");

    socket.send(JSON.stringify({
        type: "createGame",
        playerName: playerName
    }));
});

document.getElementById("join-game").addEventListener("click", () => {
    const gameCode = document.getElementById("game-code").value.trim().toUpperCase();
    const playerName = document.getElementById("player-name").value.trim();

    if (!gameCode || !playerName) return alert("Please enter both game code and your name");

    gameInstance = new WordBombGame(gameCode, playerName, false);
});

document.getElementById("submit-word").addEventListener("click", async () => {
    const wordInput = document.getElementById("word-input");
    const word = wordInput.value.trim().toLowerCase();
    if (!word || !gameInstance) return;

    if (await gameInstance.validateWord(word)) {
        wordInput.value = "";
    }
});

socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "game-created") {
        gameInstance = new WordBombGame(data.gameCode, document.getElementById("player-name").value.trim(), true);
        alert(`Game created! Your game code is: ${data.gameCode}`);
    }
});

socket.addEventListener("error", (error) => {
    console.error("WebSocket Error:", error);
    alert("There was an error with the game connection. Please try again.");
});

socket.addEventListener("close", (event) => {
    console.log("WebSocket closed. Attempting to reconnect...");
    setTimeout(() => {
        socket = new WebSocket("wss://iloveyuri.yurigoron.com");
        if (gameInstance) {
            gameInstance.initializeConnection();
        }
    }, 3000);
});
