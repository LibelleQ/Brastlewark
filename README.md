# Brastlewark

This project is a web application that allows heroes to search and filter gnomes residing in Brastlewark.

## Features

- **Gnome Search**: Users can search for gnomes by their name using the search bar.
- **Filter** : Users can search with filters
- **Gnome List**: Gnomes that match the search and filters are displayed in a list.
- **Favorite Gnome**: Users can add their favorite gnomes to a special list for easy access. This feature allows users to personalize their experience and quickly navigate to the gnomes  they are most interested in.


## Approach

The project is built using React and follows the component architecture

- `GnomeList`: This component is responsible for displaying the list of gnomes.
- `SearchBar`: This component is responsible for the search bar.


# Libraries Used

## React
React is a JavaScript library for building user interfaces. It is used because it allows for the creation of reusable components, which makes code maintenance and readability easier.

## React DOM
React DOM is a library that provides DOM-specific methods for React. It is used to allow React to connect to the DOM in the browser.

## React Router DOM
React Router DOM is used for managing routes in the application. It is used to navigate between different pages of the application without reloading the page.

## React Scripts
React Scripts is a set of scripts from the Create React App toolkit. It is used to manage build, test, and start tasks for the application.

## @testing-library/react, @testing-library/jest-dom, @testing-library/user-event
These libraries are used for testing React components. They are used to simulate user behavior and verify that the application behaves as expected.

## @babel/plugin-proposal-private-property-in-object
This Babel plugin is used to transform the syntax of private properties in objects. It is used to enable this JavaScript feature that is not yet widely supported by all browsers.