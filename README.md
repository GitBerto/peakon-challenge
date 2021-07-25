# Peakon-challenge
 
Welcome to the Peakon challenge test. 

## Setup

This repo is based on Create React App and Redux/Thunk.

- Clone the repo and run `npm install`.

After this, CRA will open a tab with the app running usually on `localhost:3000`.

## Architectural structure

This application run by default in dev mode, however it is possibile to configure multiple enviroments by setting a NODE_ENV variable:```NODE_ENV=production```.

### How multiple env works:

The main files that are responsable to load the app with differnt enviroments are: 

- **src/containers/Root.js** is resposable to load the app in dev or production mode requiring *./Root.dev.js* or *./Root.prod.js* file.

- **src/store/configureStore.js** is resposable to load the store in dev or product requiring *./configureStore.dev.js* or *./configureStore.prod.js* file

---
**NOTE** 

Steps to add a new configuation to the app or the store:

1. Create a **Root.[env].js** or **configureStore.[env].js** file.
2. Update the main configuration file in containers folder or store.
---

### Folder Structure
```
    - src
    |
    ---- components
    |   |
    |   ---- DropDownSearchList
    |   ---- ...
    |   ---- ...
    |
    ---- containers
    |   |
    |   - AppPage.js
    |   - Root.js
    |  ...
    ---- store
    |   |
    |   ---- actions
    |   |   |
    |   |   - employees.js
    |   |   - ...
    |
    |   ---- reducers
    |   |   |
    |   |   - index.js
    |   |   - employees.js
    |   |   - ...
    |
    |   - configureStore.js
    |   - ...
    |   - ...
    |
    ---- styles
    |   |
    |   ---- variables
    |   |   |
    |   |   - breakpoints.scss  
    |   |   - colors.scss
    |   |   - typography.scss
    |   - theme.scss
```

### Folder definition

- **components/** contains the list of components that are serving the app like (DropDownSearchList)

- **containers/** contains the app configuration files and the main components to render the pages base on React Route.

- **store/** contains the setup of the store, all reducers and actions.

- **sytles/** contains the global app sytles.

## Exercise Solution

The solution to this exercise is splitted between Redux, AppPage and the local DropDownSearchList state. 

- Redux is responable to manage the global data and works as source of true.
- AppPage is the exercise page, connected to Redux and render the DropDownSearchList with a specific list of props.
- DropDownSearchList is a generic and indipendent component that accept a list of props and can be reused in different contexts.

To guarantee that DropDownSearchList is indipendent, AppPage is serving all attributes that DropDownSearchList uses to render itself requiring also the main function when a user select an item, in this case I am passing the dispatch employeesFilter function from AppPage.

### Loda API data steps

1. AppPage dispatches fetchEmployees and requests the store to load the employees list.

2. Redux uses Thunk middlewere to fetch, cache and serving the response to AppPage, there is a mecchanism in the action to fetch the API request only if it has been not already fetched.

3. Once AppPage receive the emplyees data, it creates a props object that contains a strucred data adding employeesFilter dispatcher function and the list of items filtered.

### DropDownSearchList

DropDownSearchList is only responsable to render the data received, allowing the user to search or navigate through the list of employees and select one.

## Styles

This exercise has been built in Mobile First apporach and responsive layout using SCSS and BEM Syntax.

- *variables/* is the folder that is used to define the scss global variables and mixins.
- *theme.scss* is the css layout used by the pages (it is possible to create multiple layouts)
- every component has a specific index.scss file that has only the variables dipendency

To simpify the solution I managed the input style inside theme.scss

## Acceptence critearua completed
- When user clicks into the input, he/she sees the full list of managers.
- The list is limited to 2 managers.
- Navigate the list of managers by scrolling.
- Manager are filtered by name and last name.
- Filtering in case insensitive.
- Managers are filtered across first and last name.
- Confirms the selection with the enter key.
- User can navigate with arrow up and down (Bonus).
- Value begin kept and the list of is shown or hide when the user has or lose the focus.

## What is missed

Unit tests, I wasn't able to configure Jest to execute the unit tests for the actions and reducers.

