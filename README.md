
# React GitHub Explorer 
## https://new-react-github-explorer.vercel.app/

A Github Repository finder using React & GitHub API

## Objectif

Faire un annuaire qui permette de chercher des repos sur github

Pour gagner du temps sur la mise en forme, utiliser une bibliothèque: Semantic-UI

### Composants REACT à créer

* SearchBar

* ReposResults (pour afficher les repos correspondant à la recherche)

* Message (pour afficher les erreurs et les informations)

### Comportement

Lorsque je submit le formulaire de recherche en appuyant sur entrer, une requête est faite pour récupérer les résultats.
En cas de resultats, ils s'affichent sous la barre de recherche, sous forme de cartes, comme sur l'image.

### Router :

- Une page de recherche directement à la racine `/` qui affiche le champ de recherche et les résultats que tu viens de créer
- Une page FAQ à l'adresse `/faq` qui affiche des questions et des réponses. Tu peux prendre les textes suivants
- une page d'erreur si on tape une mauvaise adresse
- un menu pour naviguer entre les pages. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.