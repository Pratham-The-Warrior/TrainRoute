# Indian Railways Train Route Optimization Engine (C++)

A high-performance, **time-aware train route optimization engine** designed to compute optimal train routes between any two stations in the **Indian Railways network**.

The engine guarantees **minimum total travel time** while respecting all user-defined constraints and real-world operational conditions.

---

## 🚆 Key Features

The optimization engine accounts for:

* Train schedules with multiple intermediate stops
* Operating days per train
* Available train classes (2A, 3A, SL, etc.)
* Maximum allowed train switches (transfers)
* Maximum wait time between transfers
* Multi-day travel (cross-midnight logic)

---

## 1. Problem Overview

### 🎯 Goal

Find a sequence of trains and intermediate stations that:

* Minimizes **total travel time**, including waiting periods at transfers
* Respects **train availability** on the selected travel date
* Filters routes by **user-preferred classes**
* Adheres to **maximum switch** and **maximum wait time** constraints

---

### 📥 Input Parameters

| Parameter               | Description                                    |
| ----------------------- | ---------------------------------------------- |
| **Source Station**      | Station code `S` (e.g., `GKP`)                 |
| **Destination Station** | Station code `D` (e.g., `DR`)                  |
| **Travel Date**         | Specific date of departure                     |
| **Max Switches**        | Maximum number of allowed train changes (`K`)  |
| **Max Wait Time**       | Maximum allowed buffer between transfers (`W`) |
| **Classes**             | Preferred travel classes (2A, 3A, SL, etc.)    |

---

## 2. Input Data Format

Each train is represented using a structured **JSON format** to handle complex schedules and multi-day journeys.

```json
{
  "train_number": "12001",
  "train_name": "GKP DR SPL",
  "type": "Express",
  "classes_available": ["2A", "3A", "SL"],
  "operating_days": {
    "monday": true,
    "tuesday": true,
    "wednesday": false
  },
  "schedule": [
    {
      "station_code": "GKP",
      "station_name": "GORAKHPUR JN",
      "sequence_number": 1,
      "departure_time": "14:20",
      "arrival_time": null,
      "day_of_journey": 1
    },
    {
      "station_code": "DEOS",
      "station_name": "DEORIA SADAR",
      "sequence_number": 2,
      "departure_time": "15:22",
      "arrival_time": "15:19",
      "day_of_journey": 1
    }
  ]
}
```

### Data Processing Notes

* **Edges**: Consecutive schedule stops form directed edges in the graph
* **Temporal Adjustment**: Arrival and departure times are adjusted using `day_of_journey` for multi-day travel
* **Availability**: `operating_days` ensures a train is only considered if it runs on the requested date

---

## 3. Graph Representation

The engine constructs a **time-aware directed graph**:

* **Nodes**: Stations at specific timestamps (states)
* **Edges**: Train segments between consecutive stops
* **Edge Attributes**:

  * `train_number`
  * `departure_time`
  * `arrival_time`
  * `travel_time`

---

## 4. Algorithm: Time-Aware Dijkstra

### 4.1 Node Structure

```cpp
struct Node {
    string station;       // Station code
    int arrival_time;     // Absolute minutes from day start
    int total_time;       // Total travel time from source
    int switches;         // Number of train changes so far
    string current_train; // Train currently being used
};
```

---

### 4.2 Priority Queue

A **min-heap** ordered by `total_time` ensures that nodes with the shortest cumulative travel time are expanded first, guaranteeing optimality.

---

### 4.3 Relaxation / Edge Exploration

For each outgoing edge from the current station:

1. **Calculate Wait Time**

   [\text{wait_time} = edge.departure_time - current.arrival_time]

2. **Temporal Validation**

   * Skip if `wait_time < 0` (train already departed)
   * Skip if `wait_time > max_wait`

3. **Track Switches**

   * If `edge.train_number != current.current_train`, increment switch count
   * Skip if `switches > max_switches`

4. **Update Shortest Path**

   ```text
   new_total_time = current.total_time + wait_time + edge.travel_time
   ```

   * If `new_total_time` is better than the current best:

     * Update shortest distance
     * Push new node into the priority queue

---

### 4.4 Termination Condition

The algorithm terminates when the **destination station** is popped from the priority queue. This guarantees that the first visit to the destination yields the **globally optimal route**.

---

## 5. Handling Multiple Trains at a Station

Each station may have multiple outgoing trains with overlapping departure times. The Dijkstra engine evaluates **all feasible options**.

### Example (From UJJAIN → NDLS)

| Train | Departure | Arrival | Route      |
| ----- | --------- | ------- | ---------- |
| 12002 | 13:10     | 18:00   | BPL → NDLS |
| 12006 | 13:00     | 17:30   | KOTA       |
| 12008 | 13:20     | 17:50   | JBP → BPL  |

Even if a train initially moves away from the destination, it is retained in the search space. Dijkstra naturally discards suboptimal paths unless they lead to a faster overall arrival.

---

## 6. Constraints & Edge Cases

* **Operating Day Validation**: Only trains running on the selected date are included
* **Class Availability**: Trains lacking preferred classes are filtered out
* **Maximum Switches**: Paths exceeding the switch limit are pruned immediately
* **Cross-Midnight Travel**: `day_of_journey` is used to compute absolute time correctly
* **Intermediate Stops**: Every stop is treated as a valid transfer point, enabling granular route discovery

---

##Summary

This engine models Indian Railways as a **time-dependent graph** and applies a constrained, time-aware Dijkstra algorithm to efficiently compute optimal routes under real-world railway constraints.
