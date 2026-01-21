# Project Documentation: Train Route Optimization System

---

## **1. Overview**


## Engine

- Loads `trains.json` once at startup for performance
- Communicates **only** via JSON over `stdin` / `stdout`
- Contains all algorithmic logic

## Backend

- Thin bridge; does **not** compute routes
- Validates all frontend input
- Provides security and controlled execution of the C++ binary

## Frontend

- Handles UI and API calls only
- Stores results in React state
- Renders cards and timeline views
- Optional:
  - Theming
  - Timeline animations
  - Color-coded classes

## Optional Tools

- **CMake** — cross-platform engine builds
- **ESLint / Prettier** — code formatting and linting
- **Git** — version control

---

## **2. C++ Train Engine Dependencies**

**Purpose:** Parse JSON, build train graph, run Dijkstra with constraints, output JSON results.

| Library / Tool | Purpose | Notes / Version | Installation |
|----------------|---------|-----------------|-------------|
| **nlohmann/json** | Parse JSON requests and `trains.json`; serialize output JSON | Header-only; C++11/C++17 compatible | Download `json.hpp` from [GitHub](https://github.com/nlohmann/json), place in `include/` |
| **STL containers** (`vector`, `unordered_map`, `priority_queue`, `string`) | Graph nodes/edges, Dijkstra priority queue | Built-in | No installation needed |
| **fstream** | Read `trains.json` file | Built-in | No installation needed |
| **chrono** | Measure computation time (optional) | Built-in | No installation needed |
| **sstream** | Convert HH:MM → minutes, minutes → HH:MM | Built-in | No installation needed |
| **algorithm** | Sort / filter routes | Built-in | No installation needed |

**Optional / Advanced:**

| Library / Tool | Purpose | Notes |
|----------------|---------|-------|
| Boost Graph Library | Alternative graph and Dijkstra | Adds heavy dependency; not recommended for minimal setup |
| CMake | Build system for cross-platform compilation | Optional |

```