Tentative Project Structure
```
train_route_app/
│
├── train_engine/                  # C++ routing engine
│   ├── data/trains/               # Hundreds of train JSON files
│   │   ├── 12002.json
│   │   └── ...
│   ├── include/
│   │   ├── Models.h               # Train, Station, RouteNode
│   │   ├── Graph.h                # Graph & Edge definitions
│   │   ├── Dijkstra.h             # Shortest path algorithm
│   │   └── JsonLoader.h           # Load train JSON files
│   ├── src/
│   │   ├── Models.cpp
│   │   ├── Graph.cpp
│   │   ├── Dijkstra.cpp
│   │   ├── JsonLoader.cpp
│   │   └── main.cpp               # CLI entry point
│   └── CMakeLists.txt
│
├── backend/                       # Node.js / Express backend
│   ├── app.js                     # Express app
│   ├── package.json
│   ├── routes/
│   │   └── route.js               # /route endpoint
│   └── utils/
│       └── engineClient.js        # Calls C++ engine binary
│
├── frontend/                       # React app
│   ├── package.json
│   ├── public/index.html
│   └── src/
│       ├── index.js
│       ├── App.js
│       ├── components/
│       │   ├── RouteForm.jsx      # IRCTC-style form
│       │   └── RouteDisplay.jsx   # Display route
│       └── api/
│           └── engineClient.js   # Calls backend API
│
└── README.md
```