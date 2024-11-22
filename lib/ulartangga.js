class UlarTangga {
    constructor(players) {
        this.players = players;
        this.positions = {};
        players.forEach(player => (this.positions[player] = 1));
        this.snakes = {
            16: 6,
            47: 26,
            49: 11,
            56: 53,
            62: 19,
            64: 60,
            87: 24,
            93: 73,
            95: 75,
            98: 13
        };
        this.ladders = {
            1: 38,
            4: 14,
            9: 31,
            21: 42,
            28: 84,
            36: 44,
            51: 67,
            71: 91,
            80: 100
        };
    }

    rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    movePlayer(player, diceRoll) {
        let position = this.positions[player];
        position += diceRoll;

        if (position > 100) {
            position = 100 - (position - 100);
        }

        if (this.snakes[position]) {
            position = this.snakes[position];
            this.positions[player] = position;
            return { position, result: "snake" };
        } else if (this.ladders[position]) {
            position = this.ladders[position];
            this.positions[player] = position;
            return { position, result: "ladder" };
        } else {
            this.positions[player] = position;
            return { position, result: null };
        }
    }

    renderBoard() {
        let board = [];
        for (let row = 10; row >= 1; row--) {
            let start = row % 2 === 0 ? (row - 1) * 10 + 1 : row * 10;
            let end = row % 2 === 0 ? row * 10 : (row - 1) * 10 + 1;
            let line = [];
            for (let i = start; row % 2 === 0 ? i <= end : i >= end; row % 2 === 0 ? i++ : i--) {
                let cell = `${i}`.padStart(3, "0");
                let playersHere = Object.entries(this.positions)
                    .filter(([, pos]) => pos === i)
                    .map(([player]) => `P${this.players.indexOf(player) + 1}`);
                line.push(playersHere.length > 0 ? `${cell}(${playersHere.join(",")})` : cell);
            }
            board.push(line.join(" "));
        }
        return board.join("\n");
    }
}
module.exports = UlarTangga;
