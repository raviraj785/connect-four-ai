# 🎮 Connect Four AI

A browser-based **Connect Four game with an intelligent AI opponent**, built using pure HTML, CSS, and JavaScript.

The AI uses the **Minimax algorithm with Alpha-Beta Pruning** to analyze possible moves and make strategic decisions.

## 🌐 Live Demo

🔗 **[Play Connect Four AI](https://raviraj785.github.io/connect-four-ai/)**

---

## ✨ Features

- 🤖 Player vs AI
- 🎯 Minimax-based AI
- ⚡ Alpha-Beta Pruning
- 🟢 6 × 7 Connect Four board
- 🔴 Player pieces
- 🟡 AI pieces
- 🏆 Horizontal win detection
- 🏆 Vertical win detection
- 🏆 Diagonal win detection
- 🤝 Draw detection
- 🛡️ AI blocking logic
- 🎯 AI winning-move detection
- 📊 Score tracking
- 🎚️ Multiple difficulty levels
- 🔄 New Game
- ♻️ Reset Score
- ✨ Winning-piece animation
- 📱 Responsive design
- 🚀 GitHub Pages ready
- 📦 No external libraries required

---

## 🛠️ Tech Stack

- **HTML5** — Game structure
- **CSS3** — Styling and responsive UI
- **JavaScript** — Game logic and AI
- **Minimax Algorithm** — AI decision making
- **Alpha-Beta Pruning** — AI optimization

---

## 🧠 How the AI Works

The AI uses the **Minimax algorithm** to simulate possible future moves.

The AI tries to maximize its score while assuming that the player will always try to minimize the AI's score.

### AI Decision Process

```text
Current Board
      ↓
Generate Valid Moves
      ↓
Simulate AI Move
      ↓
Simulate Player Response
      ↓
Evaluate Board
      ↓
Minimax
      ↓
Alpha-Beta Pruning
      ↓
Select Best Move
