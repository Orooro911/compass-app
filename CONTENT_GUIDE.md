# How to find and update content in the code

Use this pattern whenever you want to change text, labels, or options in the app.

---

## The 3-step formula

1. **Pick a phrase you see in the app**  
   Use something unique: a heading, button label, or a full sentence (e.g. `Evaluate opportunities and obstacles`, `Back to dashboard`, `Promote to Want`).

2. **Search for it in the project**  
   - **In one file:** `Cmd + F` (Mac) or `Ctrl + F` (Windows), then type the phrase.  
   - **In the whole project:** `Cmd + Shift + F` (Mac) or `Ctrl + Shift + F` (Windows), then type the phrase.

3. **Edit in place**  
   You’ll land on the line that contains that text. Change it, save, and the app will update (if the dev server is running).

**Tip:** If the phrase appears in more than one place, the search results list will show every match. Click each to see context and edit the right one.

---

## Where the main content lives (`app/dashboard/page.tsx`)

Almost all user-facing content is in **one file**: `app/dashboard/page.tsx`. It’s long, but content is grouped in named blocks at the **top** and in a few predictable spots.

### Top of file (roughly lines 7–140) — **start here for most copy**

| Search for this (name or a phrase inside) | What it controls |
|------------------------------------------|------------------|
| `MODULES` | Card titles and short descriptions: Life Roles, Shared Growth, Situations, Wants, Transformations. |
| `LIFE_ROLES_GROUPED` | Life role categories and the role names in each (e.g. "Personal Roles", "Professional Roles"). |
| `SHARED_GROWTH_GROUPED` | Relationship categories and names (e.g. "Core Relationships", "Work & Professional"). |
| `SITUATIONS_GROUPED` | Situation categories and names (e.g. "Long-Term Build & Advancement", "Direction & Identity"). |
| `DEFAULT_LIFE_ROLE_NAME` | The single default role at the top (e.g. "Personal Growth"). |
| `PRINCIPLES_BY_LEVEL` | Level names ("Level 1 — Foundation", etc.) and principle labels (P1, P2, … P9). |

**How to use:**  
- `Cmd + F` in `page.tsx` → type the constant name (e.g. `PRINCIPLES_BY_LEVEL`) or a unique phrase from the text (e.g. `Envision an ideal future`).  
- You’ll jump to that block; edit the strings inside the `[ ]` or `{ }`.

### Info lightboxes (Dashboard “i” icons) — **safest place to edit long copy**

All text for the **My Compass Dashboard**, **Life Roles**, **Shared Growth**, **Situations**, **Wants**, and **Transformations** info panels lives in one file with **no JSX**—so you can’t break the page by missing a `</p>` or quote.

| File | What it controls |
|------|------------------|
| **`app/dashboard/infoContent.ts`** | Every paragraph, heading, and bullet list in the six “i” info lightboxes. |

**How to edit:**  
- Open `app/dashboard/infoContent.ts`.  
- Find the section by name: `DASHBOARD_INFO`, `LIFE_ROLES_INFO`, `SHARED_GROWTH_INFO`, `SITUATIONS_INFO`, `WANTS_INFO`, `TRANSFORMATIONS_INFO`.  
- Edit only the **strings** inside `text: "..."` or `items: ["...", "..."]`.  
- Don’t change `type: "p"`, `type: "h3"`, or `type: "ul"`; don’t add or remove blocks.  
- Save the file. The app will hot-reload.

Use normal apostrophes and quotes in the strings (e.g. `you're`, `"i"`); you don’t need `&apos;` or `&quot;` here.

### Compass Framework lightbox (tabs + sub-tabs) — **`app/content/`**

Lightbox content that has **multiple tabs** (e.g. Overview / In Practice) or **sub-tabs** lives in the **`app/content/`** folder so it’s easy to find and keep organized.

| File | What it controls |
|------|------------------|
| **`app/content/compassFrameworkContent.ts`** | The **Compass Framework** lightbox (the “i” next to “Compass Framework” on the graphic). Two main tabs: **Overview** and **In Practice**. In Practice has sub-tabs: **Compass Graphic**, **Compass Modules**. |

**Structure in the file:**  
- `COMPASS_FRAMEWORK.title` — Lightbox title.  
- `COMPASS_FRAMEWORK.overview` — Array of blocks (paragraphs, lists, headings) for the **Overview** tab.  
- `COMPASS_FRAMEWORK.inPracticeSubTabs` — Array of `{ id, label, blocks }`; each item is one sub-tab (e.g. “Compass Graphic”, “Compass Modules”) with its own list of blocks.

**How to edit:**  
- Open `app/content/compassFrameworkContent.ts`.  
- To change **Overview** copy: edit the strings inside `overview` (each block has `type: "p"`, `type: "ul"`, etc., and `text` or `items`).  
- To change **In Practice** copy: edit the strings inside `inPracticeSubTabs` → pick the sub-tab by `label` (e.g. "Compass Graphic"), then edit the `blocks` array.  
- You can use `type: "pStrong"` for a short bold line (e.g. “Roles & Relationships”).  
- Don’t change tab/sub-tab `id` or `label` keys, or add/remove tabs; only edit the text.

Same as dashboard info: use normal apostrophes and quotes; no `&apos;` or `&quot;`.

**Adding more tabbed lightboxes later:** Use the same pattern: create a new file in `app/content/` (e.g. `someOtherLightboxContent.ts`) with a structure like `{ title, overview?, inPracticeSubTabs?, ... }` and wire it in the component that opens that lightbox.

### Principles (P1–P9) and Levels — **`app/content/principleAndLevelContent.ts`**

Content for the **principle** lightboxes (when you click P1, P2, … inside a role’s pyramid) lives in the same content area. Each principle has three tabs in the UI: **Overview**, **In Practice**, and **Apply**.

| File | What it controls |
|------|------------------|
| **`app/content/principleAndLevelContent.ts`** | **Principle** lightboxes: title, **Overview** text, and **In Practice** text for every role and principle (e.g. Achiever-P1 … Partner-P9). **Apply** is the user-editable tab (only visible for Situation/Want/Transformation); its content is saved per item in the database, not in this file. |

**Structure:**  
- `PRINCIPLE_CONTENT` — Object keyed by `"Role-P1"` … `"Role-P9"` (e.g. `"Achiever-P1"`, `"Leader-P3"`). Each value has `title`, `overview` (string), and `inPractice` (string).  
- Edit `overview` to change the **Overview** tab. Edit `inPractice` to change the **In Practice** tab. You can set a different `inPractice` per principle or use the shared default.

**Apply tab:** Shown only when the user is viewing a **Situation**, **Want**, or **Transformation** (not for Life Roles or Shared Growth). Each situation, want, and transformation stores its own Apply content; nothing to edit in the content file.

**Level content** (the “i” on each level in the pyramid) is still in **`app/Compass.tsx`** in `LEVEL_LIGHTBOX`. It can be moved into this content file later using the same block structure if you want it all in one place.

### Buttons, links, and inline messages (later in the file)

These are normal strings in JSX. Search for the **exact visible text**:

| If you want to change… | Search for… |
|------------------------|-------------|
| Back button | `Back to dashboard` |
| Add / Promote buttons | `Add new:`, `Promote to Want`, `Promote to Transformation` |
| Empty-state messages | `None yet.`, `Add content in P1, P2, and P3 to promote.` |
| Tooltip / title | `Add content in P1, P2, and P3 to promote.` |
| Long explanatory copy | `Before labeling something a meaningful want` or `Every entry begins as a Situation` |
| Cancel | `Cancel` (narrow by context: lightbox/modal vs elsewhere) |

Use **whole phrase** or **unique part** so you get one or two matches, then edit the right one.

---

## Quick reference

- **Find in this file:** `Cmd + F` / `Ctrl + F`  
- **Find in whole project:** `Cmd + Shift + F` / `Ctrl + Shift + F`  
- **Go to line:** `Cmd + G` / `Ctrl + G` (then type line number if you noted it from the map above)

**Formula:** **See it in the app → copy that phrase → search in code → edit.**
