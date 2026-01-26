# RapidRail Routing Engine (C++)

The RapidRail Engine is a high-performance routing core built in C++. It leverages a **Time-Aware Dijkstra Algorithm** to compute optimal train travel paths across the Indian Railways network, considering schedules, transfers, and user constraints.

---

## 🏗️ How It's Made

The engine is designed for maximum throughput and low latency. Here’s the development philosophy:

1.  **Language**: **C++20** – Chosen for its zero-cost abstractions and manual memory management, essential for processing large-scale railway graphs (thousands of nodes/edges) in milliseconds.
2.  **Dependencies**:
    *   `nlohmann/json`: A modern JSON library for header-only integration to handle IPC and configuration.
    *   `Standard Template Library (STL)`: Used for priority queues, maps, and vectors.
3.  **Build System**: Compiled using `g++` with `-O3` optimization flags to ensure the routing algorithm runs at peak performance.
4.  **Integration**: Designed as a standalone CLI tool that communicates via `stdin` and `stdout`, making it language-agnostic for any backend (Node.js in our case).

---

## ⚙️ Core Parameters

To calculate a route, the engine processes the following parameters:

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `source` | `string` | The 3-4 letter station code (e.g., `"GKP"`, `"NDLS"`). |
| `destination` | `string` | The target station code (e.g., `"DR"`, `"BCT"`). |
| `date` | `string` | Travel date in `YYYY-MM-DD` format to check operating days. |
| `max_switches` | `int` | Maximum allowed train changes (transfers). |
| `max_wait_time` | `int` | Maximum allowed minutes to wait at a transfer station. |
| `preferred_classes` | `array` | List of classes (e.g., `["2A", "3A", "SL"]`) to filter trains. |

---

## 🧠 How It Works (The Logic)

### 1. Graph Construction
The engine reads `trains.json` and builds a **Directed Acyclic Graph (DAG) for time-states**. 
*   **Nodes**: Represent a station at a specific arrival time.
*   **Edges**: Represent a train segment between two stations with travel time and departure details.

### 2. Time-Aware Dijkstra
The algorithm finds the shortest path by minimizing **Total Travel Time** (Travel Time + Wait Time at Transfers).

*   **Priority Queue**: Stores current "states" `{station, current_time, switches, total_travel_time}`.
*   **Relaxation**: For every possible train departing from the current station:
    *   Calculate `wait_time = train.departure - current_time`.
    *   Ensure `wait_time` is between 0 and `max_wait_time`.
    *   Increment `switches` if the train number changes.
    *   Prune the path if `switches > max_switches`.

### 3. Cross-Midnight Logic
The engine calculates absolute minutes from the start of the journey. If a train arrives at `02:00` on Day 2, it is treated as `1440 + 120 = 1560` minutes to maintain a linear timeline for Dijkstra.

---

## 📁 System Structure

```text
engine/
├── src/
│   └── train_engine.cpp      # Entry point & IPC handler
├── bin/
│   └── train_engine          # Optimized binary
├── data/
│   └── trains.json           # Raw IRCTC-style schedule data
├── include/
│   └── json.hpp              # JSON parsing header
└── utils/
    ├── graph.h/cpp           # Adjacency list & Graph building
    ├── dijkstra.h/cpp        # Core search algorithm implementation
    └── time_utils.h/cpp      # Time math & day-offset handlers
```

---

## 🚀 Execution Flow

1.  **Read**: Load `trains.json` into memory-efficient structures.
2.  **Parse**: Receive JSON request from `stdin`.
3.  **Filter**: Exclude trains not running on the requested date or lacking preferred classes.
4.  **Solve**: Run Dijkstra to find the globally optimal path.
5.  **Output**: Stream the path (segments, total time, switches) as JSON to `stdout`.