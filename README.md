# Description

Berlin Coffee Map is a web application built using React, [Mapbox](https://www.mapbox.com/), Firebase and Google Places API. The application is designed to help coffee enthusiasts find the best coffee shops in Berlin.

The main feature of the application is an interactive map of Berlin that displays the location of all the coffee shops in the city. Users can zoom in and out of the map to explore different neighborhoods and find coffee shops in specific areas.
When a user clicks on a coffee shop on the map, a pop-up window will appear with information about the shop, including its name, address, website, photo and isOpen status. Users can also bookmark places as Favorites and build a route to selected place.
## Getting Started with Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Pre-requisites
1. Install Node.js https://nodejs.org/en/download
2. Install Firebase CLI https://firebase.google.com/docs/cli
3. Run `npm install` once in project root directory
4. Set environment variables for all properties used in `src/firebase/config.js`
5. Set environment variables for property used in `src/components/Map.js`
## Available Scripts
In the project directory, you can run:
### `npm dev`
Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.
The page will reload when you make changes.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
