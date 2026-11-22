# Tic Tac Toe Web Application

An interactive, responsive Tic-Tac-Toe web game built with pure standard HTML5, CSS3, and vanilla JavaScript as part of the **Prodigy InfoTech Web Development Internship (Task 03)**.

---

## 🎮 Features

- **Two Game Modes**:
  - **2 Players (Local PvP)**: Two players take turns placing `X` and `O` on the same device.
  - **vs Computer (PvAI)**: Play against a balanced, responsive computer AI that defends against threats, seizes winning opportunities, and allows players to execute strategic forks to win.
- **Dynamic Scorecard**:
  - Left-hand side score for **Player X**.
  - Right-hand side score for **Player O / Computer**.
  - Bottom summary tracking **Ties** and **Total Games** played across matches.
- **Automatic Game Over Detection & Restart**:
  - Automatically identifies wins (across rows, columns, or diagonals) and draws.
  - Highlights winning triplets with an inverted contrast style.
  - Starts a live **5-second countdown** to automatically launch a fresh round.
  - Manual overrides ("New Game", "Reset Scores", or switching modes) immediately cancel active timers for seamless play.
- **Minimalist Aesthetic**:
  - High-contrast black and white styling with hand-drawn marker aesthetics.
  - Intersecting 4-line classic grid layout (`#`).
  - Mobile-responsive layout that adapts across desktop, tablet, and mobile screens.
- **Zero Dependencies**: Pure vanilla implementation without external frameworks, CDNs, or libraries.

---

## 📁 Project Structure

```text
PRODIGY_WD_03/
├── index.html    # Core semantic structure and DOM layout
├── style.css     # Responsive styles, grid layout, and marker aesthetics
├── script.js     # State tracking, win detection, AI logic, and timer automation
└── README.md     # Project documentation
```

---

## 🚀 Getting Started

No build tools or package managers required.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/PRODIGY_WD_03.git
   ```
2. **Navigate into the project folder**:
   ```bash
   cd PRODIGY_WD_03
   ```
3. **Launch the application**:
   - Double-click `index.html` to open it in any web browser, OR
   - Run a local server with VS Code Live Server or Python:
     ```bash
     python -m http.server 8000
     ```
     Then navigate to `http://localhost:8000` in your browser.

---

## 🕹️ How to Play

1. Choose your game mode using the top selector: **2 Players** or **vs Computer**.
2. Click any empty square on the grid to place your mark (`X` always goes first).
3. The first player to align 3 of their marks horizontally, vertically, or diagonally wins the round.
4. If all 9 squares are filled without 3 in a row, the match ends in a draw.
5. After a round ends, a 5-second countdown will automatically restart the game, or you can click **New Game** to start immediately.
6. Click **Reset Scores** at any time to clear the scoreboard back to zero.

---

## 🛠️ Built With

- **HTML5**: Semantic document structure
- **CSS3**: CSS Grid, Flexbox, responsive media queries
- **Vanilla JavaScript (ES6+)**: Event delegation, DOM manipulation, state machines, and timer management

---

## 📄 License

This project is licensed under the MIT License — free for educational and personal use.
