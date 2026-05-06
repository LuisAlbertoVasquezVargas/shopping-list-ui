<!-- README.md -->

## shopping-list-ui

A minimalist, chat-driven terminal interface for managing the shopping list.
Part of the AI-powered ecosystem.

## 📥 Cloning the Repository

To set up the interface locally, clone the repository and navigate into the directory:

```bash
git clone https://github.com/LuisAlbertoVasquezVargas/shopping-list-ui.git
cd shopping-list-ui
```

## 🛠 Role
This is the **Interface Layer**. It captures natural language via a TUI-style chat and proxies requests to the `shopping-list-core` backend.

## 🔗 Ecosystem
- **Backend:** [shopping-list-core](https://github.com/LuisAlbertoVasquezVargas/shopping-list-core)
- **Database:** [shopping-list-db](https://github.com/LuisAlbertoVasquezVargas/shopping-list-db)

## 🚀 Setup
1. `npm install`
2. Ensure `shopping-list-core` is running on port 8000.
3. `npm run dev`