```
stdin JSON request
        ↓
train_engine.cpp
        ↓ parses → SearchRequest struct
utils/graph.cpp → build graph from trains.json
utils/dijkstra.cpp → run algorithm
utils/time_utils.cpp → handle times & day offsets
        ↓
stdout JSON result
```

```
engine/
│
├── train_engine.cpp          # Main C++ source file
├── train_engine              # Compiled binary
├── data/
│   └── trains.json           # Scraped Indian Railways data
├── include/
│   └── json.hpp              # nlohmann/json header for JSON parsing
├── CMakeLists.txt (optional) # If using CMake for build
└── utils/                    # Optional helper files
    ├── graph.h               # Graph structures (nodes, edges)
    ├── graph.cpp
    ├── dijkstra.h            # Dijkstra algorithm implementation
    ├── dijkstra.cpp
    ├── time_utils.h          # Time conversion / cross-midnight functions
    └── time_utils.cpp

```