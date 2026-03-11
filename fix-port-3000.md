# Fix "address already in use 127.0.0.1:3000"

When you see **EADDRINUSE** or **address already in use**, an old dev server (or another app) is still using port 3000. Do this:

## Step 1: Stop whatever is on port 3000

In Terminal, run:

```bash
lsof -i :3000 -t | xargs kill
```

That finds the process IDs using port 3000 and kills them.

If you get "Permission denied", use:

```bash
lsof -i :3000 -t | xargs kill -9
```

(`kill -9` forces the process to stop.)

## Step 2: Start the dev server again

```bash
cd /Users/robertblackburn1/Desktop/compass-app
npm run dev
```

Wait until you see **Ready** and **http://127.0.0.1:3000**, then open that URL in your browser.

---

**Tip:** Whenever the dev server won't start because of "address already in use", run the Step 1 command, then run `npm run dev` again.
