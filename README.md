# **Fixit Forum**

Created by: Jeremy Simons
[Link to live site](https://ci-pp5-fixit-eda4cb59906b.herokuapp.com/)

<img src="docs/responsive.png" alt="A selection of different screen sizes showing the app home page.">

This documentation covers the design, features, hosting, and testing of the React front end of this application. For details on the back end please visit [this repository](https://github.com/jeremyhsimons/fixit_drf_api)

## Introduction

Fixit is the forum for any budding DIY enthusiast to link up with like minded tinkerers to solve problems together. Where developers pool knowledge on platforms like [Stack Overflow](https://stackoverflow.com/), Fixit aims to be the go-to place for any user to find help solving their problem. After all, why should people struggle alone when most technical problems (whether a busted bike derailleur or a blocked drain) have probably already been solved?

This first iteration of the site has a separate front end and back end design. User data is stored and distributed via a Django REST API, and the front end site which users interact with is a separate application made using React. This first iteration focuses user content into 3 main categories: 
1. Bikes, cars, and other vehicular mechanics.
2. Electronics and circuitry
3. A more general DIY category that could cover most home improvement projects/problems.

## Contents
* [Project Goals](#project-goals)<br>
    * [For the user](#for-the-user)
    * [For the site owner](#for-the-site-owner)
* [User Experience](#user-experience)<br>
    * [Target audience](#target-audience)
    * [User requirements](#user-requirements)
    * [User Manual](#user-manual)
    * [User Stories](#user-stories)
* [Design](#design)
    * [wireframes](#wireframes)
* [Features](#features)
    * [Feature Ideas for future development](#feature-ideas-for-future-development)
* [Technologies Used](#technologies-used)
* [Deployment & Local Development](#deployment--local-development)
    * [Heroku deployment](#heroku-deployment)
    * [Forking GitHub Repository](#forking-github-repository)
    * [Cloning GitHub Repository](#cloning-github-repository)
* [Testing](#testing)
* [Validation](#validation)
* [Bugs](#bugs)
* [Credits](#credits)

## Project Goals

## User Experience

### Target audience

### User requirements

### User Manual

Click the dropdown to view the user manual:
<details>
<summary>User Manual</summary>

</details><br>

### User Stories

## Design

#### Fonts

#### Colours

[Coolors.co](https://coolors.co/104f55-32746d-f4d8cd-01200f-011502) was used to generate the color palate of the site.

### Front End Libraries

### Wireframes

## Agile workflow

## Features

### Feature ideas for future development
  
## Technologies Used

### Languages used

### Frameworks/3rd party Libraries used for CSS and JS

### Other tools/websites/libraries used

## Deployment & Local Development

## Testing

## Validation

## Bugs

| Bug | Action Taken to Fix |
| --- | --- |
| When initially trying to run the react app using `$ npm start`. An error occurred saying that the build failed. | I tried installing and using an older long-term support version of node (v16.16.0). Once that was installed the command to start the app worked fine. Gitpod has been set to version 18.18 by default. |
| Submitting the signup form results a console error and doesn’t work as expected. The error is as follows: `Access to XMLHttpRequest at 'https://fixit-drf-api-b3b58b2bc39c.herokuapp.com/dj-rest-auth/registration/' from origin 'https://ci-pp5-fixit-eda4cb59906b.herokuapp.com' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource` | Heroku hadn’t saved environment variables properly. Re-doing this solved the problem |
| Submitting a post create form resulted in a 400 bad request from the API. The http response said that the author was a required field. | Author was not defined as a read-only field in the post serializer in the API. Adding this fixed the issue. |
| bookmarking a post results in a 405 error returned from the API | I had typed the wrong endpoint into my axiosRes instance. I had entered /bookmark/ instead of /bookmarks/. |
| Upvoting a comment worked, but the state didn’t update when the user upvoted, and the page had to refresh in order for the upvote to appear. | This was fixed by making sure that the return statement for the handleupvote function checked if the comment.id passed to the map was equal to the id supplied from the parent component |
| The post title is a link and this has changed the text color/styles. | I forgot to wrap the post title and content in a separate card body component *outside* the link component that wraps the post image. |


## Credits

### 3rd party code used

### images used

### Tutorials used

### 3rd party Python libraries/modules

### Other 3rd party libraries and online tools used

### Hosting platforms used.

### Acknowledgements
