# Simple Multi-Portal CAD Demo

This project provides a minimal computer-aided dispatch (CAD) sample with four portals: Civilian, Dispatch, Police, and Admin. A single login controls which tools are visible based on your role, so you only see the actions you are permitted to use.

## Features
- Basic username/password login for all portals with a unified dashboard that hides actions you cannot access.
- Admin navigation to hop between portals without logging out again.
- Civilian tools to create calls for service, review their submissions, and add public or civ-only notes back to officers.
- Dispatch tools to view calls, assign rostered units, set call statuses, and remove units while auto-unassigning calls.
- Police tools for officers to view their assigned calls, add public or officer-only notes, and update status (en-route, on-scene, clear) with self-serve unit creation.
- Admin tools to manage users, call types, configuration, and review all generated units.

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
