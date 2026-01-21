```
[Frontend React SPA] 
      |
      | POST /api/route
      v
[Backend server.js] 
      |
      | validate input (validator.js)
      v
[engineBridge.js] 
      |
      | JSON via stdin
      v
[C++ Engine] 
      |
      | parses trains.json & request JSON
      | runs Dijkstra + constraints
      | outputs JSON via stdout
      v
[engineBridge.js]
      |
      | returns JSON to server.js
      v
[server.js] 
      |
      | responds to frontend
```

## Backend struture 
```

backend/
│
├── src/
│   ├── server.js           # Minimal Express server, defines API endpoints
│   ├── engineBridge.js     # Executes the C++ engine, sends request JSON, reads response JSON
│   └── validator.js        # Validates user input from frontend
│
├── package.json
└── .env                    # Optional: PORT, engine path
```