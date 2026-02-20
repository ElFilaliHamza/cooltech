# CoolTech

A personal tech stack / tool catalog built with React and Vite. Browse, search, and filter tech tools and apps.
Here you will find only cool and useful tech. That either helps you or makes your life easier.

## Dev setup

1. **Clone and install**
   ```bash
   git clone <repo-url>
   cd cooltech
   pnpm install
   ```


2. **Run locally**
   ```bash
   pnpm start
   ```
   App runs at `http://localhost:5173` (or the port Vite prints).


## Contributing: adding new data inputs

New tech items are added via **`src/data/apps.json`**. Each entry is an object in the JSON array.

**Required shape for one item:**

| Field        | Type     | Description                          |
|-------------|----------|--------------------------------------|
| `id`        | string   | Unique slug (e.g. `my-tool`)         |
| `name`      | string   | Display name                         |
| `description` | string | Short description of the tool        |
| `category`  | string   | Primary category                     |
| `categories`| string[] | All categories (include primary)     |
| `tags`      | string[] | Tags for filtering (e.g. `Linux`, `FOSS`) |
| `details`   | object   | Optional extra fields                |

**`details` object (all optional):**

- `features` — main features
- `whenToUse` — when to use it
- `whenNotToUse` — when to avoid it
- `tips` — usage tips

**Example entry:**

```json
{
  "id": "my-tool",
  "name": "My Tool",
  "description": "A short description of what it does.",
  "category": "Utilities",
  "categories": ["Utilities", "CLI"],
  "tags": ["Linux", "FOSS"],
  "details": {
    "features": "Feature one, feature two.",
    "whenToUse": "When you need X.",
    "whenNotToUse": "When Y is enough.",
    "tips": "Pro tip here."
  }
}
```

Add your object to the array in `src/data/apps.json` (keep the list sorted or grouped as you prefer). The app uses this data for search and the grid; no code changes are needed beyond editing the JSON.

## License

MIT
