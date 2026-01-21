# Train Route Optimization – Frontend (React)

A precise, production-ready frontend project structure for the Train Route Optimization system.

This structure explicitly supports **all search parameters**:

* From station
* To station
* Travel date
* Maximum switches
* Maximum wait time
* Preferred classes
* Sorting preference (time / switches)

and is optimized for clean UI, validation, API integration, and future extensibility.

---

## Final Project Structure

```
frontend/
│
├── public/
│   └── index.html
│
├── src/
│   ├── api.js
│   ├── App.jsx
│   ├── main.jsx
│
│   ├── SearchForm.jsx
│   ├── ResultsList.jsx
│   ├── RouteCard.jsx
│
│   ├── utils.js
│   └── styles.css
│
├── package.json
└── vite.config.js

```

---

## Parameter Mapping (Frontend → Engine)

| Parameter           | Component        | Field Name       |
| ------------------- | ---------------- | ---------------- |
| Source station      | StationSelector  | from             |
| Destination station | StationSelector  | to               |
| Travel date         | DateSelector     | date             |
| Maximum switches    | SwitchLimitInput | max_switches     |
| Maximum wait time   | WaitTimeInput    | max_wait_minutes |
| Preferred classes   | ClassSelector    | classes          |
| Sorting             | SortSelector     | sort_by          |

---

## API Layer

```
src/api/routeApi.js
```

Responsibilities:

* Build request payload
* Call backend `/api/route`
* Handle timeouts
* Parse engine output

Example payload:

```json
{
  "from": "CSTM",
  "to": "NDLS",
  "date": "2026-01-23",
  "max_switches": 2,
  "max_wait_minutes": 120,
  "classes": ["2A", "3A"],
  "sort_by": "time"
}
```

---

## Search UI Architecture

### SearchForm.jsx

Controls entire form state:

```js
{
  from: "",
  to: "",
  date: "",
  maxSwitches: 2,
  maxWait: 120,
  classes: [],
  sortBy: "time"
}
```

Subcomponents handle individual parameters.

---

### StationSelector.jsx

* Autocomplete dropdown
* Validates station code
* Prevents same source & destination

---

### DateSelector.jsx

* Calendar picker
* Prevents past dates

---

### SwitchLimitInput.jsx

* Numeric input / dropdown
* Range: 0–5

---

### WaitTimeInput.jsx

* Numeric input (minutes)
* Range: 0–720

---

### ClassSelector.jsx

* Checkbox group
* 2A / 3A / SL / CC etc

---

### SortSelector.jsx

Options:

* `time` → shortest total duration
* `switches` → minimum transfers

---

## Results UI Architecture

### RouteResults.jsx

* Receives optimized routes array
* Renders RouteCard list

---

### RouteCard.jsx

Displays:

* Total travel time
* Number of switches
* Departure date
* Arrival date
* Expandable list of segments

---

### RouteSegment.jsx

For each train segment:

* Train number
* From station
* To station
* Departure time
* Arrival time
* Waiting time

---

### SummaryBar.jsx

* Displays applied filters
* Shows computation time

---

## State & Logic Handling

```
useRouteSearch.js
```

Handles:

* Form submission
* API calls
* Loading state
* Error state
* Result storage

---

## Validation Rules

Located in:

```
src/utils/validators.js
```

Rules:

* Source != Destination
* Date >= today
* max_switches >= 0
* max_wait_minutes >= 0
* At least 1 class selected

---

## Data Flow

```
User Input
   ↓
SearchForm
   ↓
useRouteSearch
   ↓
routeApi
   ↓
Backend
   ↓
Train Engine
   ↓
ResultsPage
```

---

## Design Goals

* Parameter-complete
* Engine-compatible
* Form-first UI
* Mobile responsive
* Minimal state complexity
* Easy to test

---

## Next Implementation Steps

1. Create Vite project
2. Create folder structure
3. Build SearchForm UI
4. Add validation
5. Build Results UI
6. Connect API
7. Styling

---

This structure ensures the frontend fully supports **all routing parameters** and integrates cleanly with the backend and C++ train engine while remaining simple and maintainable.
