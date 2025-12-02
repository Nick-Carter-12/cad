# Simple Multi-Portal CAD Demo

This project provides a minimal computer-aided dispatch (CAD) sample with four portals: Civilian, Dispatch, Police, and Admin. A single login controls which tools are visible based on your role, so you only see the actions you are permitted to use.

## Features
- Basic username/password login for all portals with a unified dashboard that hides actions you cannot access.
- Civilian tools to create calls for service.
- Dispatch tools to view calls, assign units, and set call statuses.
- Police tools for officers to view their assigned calls and update status (en-route, on-scene, clear).
- Admin tools to manage users, call types, and configuration.

## Getting started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Open `http://localhost:3000` in a browser and sign in with one of the demo accounts. The dashboard will reveal only the buttons your role can use.

## Default credentials
- Civilian: `civ` / `civpass`
- Dispatch: `dispatch` / `dispatchpass`
- Police: `police` / `policepass`
- Admin: `admin` / `adminpass`

The application keeps all data in memory for simplicity and is intended for demonstration purposes only.
