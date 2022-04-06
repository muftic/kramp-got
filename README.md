# Kramp Hub Game Of Thrones

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

An application for displaying GoT characters data in a table. There are 2 API requests, 1 for character data and 1 for their ages.

To minimize API requests 
-the application has a cache to store fetched data.
-fetches only 10 characters per page/request

### Netlify live link
https://game-of-thrones-krump.netlify.app/

### Stack
-React, MaterialUI - styling and dataGrid, Axios

### Order of procedures
- fetch character data from https://anapioficeandfire.com/, extract names for agify query
- fetch ages from https://agify.io/
- process data and store to cache
- display data in a table

### Known bugs / TO DO's
Warning: Failed prop type: Invalid prop `formattedValue` supplied to `GridCell`, expected one of type [number, object, string, boolean]
- https://github.com/mui/mui-x/issues/4324 - MUI DataGrid error, probable fix next week

react-dom.development.js:86 Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot
-to do-

- turn book numbers to book names




