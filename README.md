# Simple Multi-Portal CAD Demo

This project provides a minimal computer-aided dispatch (CAD) sample with four portals: Civilian, Dispatch, Police, and Admin. Each portal uses shared authentication but exposes role-specific actions.

## Features
- Basic username/password login for all portals.
- Civilian portal to create calls for service.
- Dispatch portal to view calls, assign units, and set call statuses.
- Police portal for officers to view their assigned calls and update status (en-route, on-scene, clear).
- Admin portal to manage users, call types, and configuration.

## Getting started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Open `http://localhost:3000` in a browser and choose a portal.

## Default credentials
- Civilian: `civ` / `civpass`
- Dispatch: `dispatch` / `dispatchpass`
- Police: `police` / `policepass`
- Admin: `admin` / `adminpass`

The application keeps all data in memory for simplicity and is intended for demonstration purposes only.
