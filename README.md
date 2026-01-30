# Elementor Email Template Builder

A visual builder for Elementor Form email templates. This tool allows users to customize colors, fields, and fonts, and then export clean, responsive HTML to paste into the Elementor "Email" action.

## 🚀 How to Run Locally

Because this project uses **React** and **TypeScript** (.tsx files), browsers cannot open the `index.html` file directly from your hard drive due to security restrictions (CORS).

### Option 1: VS Code (Recommended)
1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
2. Open `index.html`.
3. Click **"Go Live"** at the bottom right of the window.

### Option 2: Python
If you have Python installed, open a terminal in this folder and run:
```bash
python3 -m http.server
```
Then open `http://localhost:8000`.

### Option 3: Node.js
If you have Node.js installed, you can use `serve`:
```bash
npx serve .
```

---

## 🌐 How to Deploy (GitHub Pages)

This app is designed to be "static-host friendly" using Babel Standalone, so you don't need a build step.

1. Upload these files to a GitHub repository.
2. Go to **Settings** > **Pages**.
3. Under **Branch**, select `main` (or master) and folder `/ (root)`.
4. Click **Save**.

Your app will be live at `https://<your-username>.github.io/<repo-name>/`.
