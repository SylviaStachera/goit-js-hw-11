# Parcel template

This project was created with Parcel. For familiarization and setting additional features [refer to documentation](https://parceljs.org/).

## Preparing a new project

1. Make sure you have an LTS version of Node.js installed on your computer.
   [Download and install](https://nodejs.org/en/) if needed.
2. Clone this repository.
3. Change the folder name from `parcel-project-template` to the name of your project.
4. Create a new empty GitHub repository.
5. Open the project in VSCode, launch the terminal and link the project to the GitHub repository
   [by instructions](https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories#changing-a-remote-repositorys-url).
6. Install the project's dependencies in the terminal with the `npm install` command.
7. Start development mode by running the `npm start` command.
8. Go to [http://localhost:1234](http://localhost:1234) in your browser.
   This page will automatically reload after saving changes to the project files.

## Files and folders

- All stylesheet parshas should be in the `src/sass` folder and imported into the page stylesheets. For example, for `index.html` the style file is named `index.scss`.
- Add images to the `src/images` folder. The assembler optimizes them, but only when deploying the production version of the project. All this happens in the cloud so as not to burden your computer, as it can take a long time on weak machines.

## Deploy

To set up a project deployment, you need to perform a few additional steps to set up your repository. Go to the `Settings` tab and in the `Actions` subsection select the `General` item.

![GitHub actions settings](./assets/actions-config-step-1.png)

Scroll the page to the last section, in which make sure the options are selected as in the following image and click `Save`. Without these settings, the build will not have enough rights to automate the deployment process.

![GitHub actions settings](./assets/actions-config-step-2.png)

The production version of the project will be automatically built and deployed to GitHub Pages, in the `gh-pages` branch, every time the `main` branch is updated. For example, after a direct push or an accepted pull request. To do this, you need to edit the `homepage` field and the `build` script in the `package.json` file, replacing `your_username` and `your_repo_name` with your own, and submit the changes to GitHub.


```json
"homepage": "https://your_username.github.io/your_repo_name/",
"scripts": {
  "build": "parcel build src/*.html --public-url /your_repo_name/"
},
```

Next, you need to go to the settings of the GitHub repository (`Settings` > `Pages`) and set the distribution of the production version of files from the `/root` folder of the `gh-pages` branch, if this was not done automatically.

![GitHub Pages settings](./assets/repo-settings.png)

### Deployment status

The deployment status of the latest commit is displayed with an icon next to its ID.

- **Yellow color** - the project is being built and deployed.
- **Green color** - deployment completed successfully.
- **Red color** - an error occurred during linting, build or deployment.

More detailed information about the status can be viewed by clicking on the icon, and in the drop-down window, follow the link `Details`.

![Deployment status](./assets/status.png)

### Live page

After some time, usually a couple of minutes, the live page can be viewed at the address specified in the edited `homepage` property. For example, here is a link to a live version for this repository
[https://goitacademy.github.io/parcel-project-template](https://goitacademy.github.io/parcel-project-template).

If a blank page opens, make sure there are no errors in the `Console` tab related to incorrect paths to the CSS and JS files of the project (**404**). Most likely you have the wrong value for the `homepage` property or the `build` script in the `package.json` file.

## How it works

![How it works](./assets/how-it-works.png)

1. After each push to the `main` branch of the GitHub repository, a special script (GitHub Action) is launched from the `.github/workflows/deploy.yml` file.
2. All repository files are copied to the server, where the project is initialized and built before deployment.
3. If all steps are successful, the built production version of the project files is sent to the `gh-pages` branch. Otherwise, the script execution log will indicate what the problem is.


-------------------------------------------------------------------------------

## Task - Image Search
Create a frontend application for searching and browsing images based on keywords.

## Search Form
The search form is initially present in the HTML document. The user will enter the search query in the text input field. Upon submitting the form, an HTTP request needs to be made.

## HTTP Requests
Use the Pixabay public API as the backend. Register to obtain your unique API key and refer to the documentation.

Provide the following request parameters:

-key: Your unique API key.
-q: The search term entered by the user.
-image_type: Specify photo to retrieve only photos.
-orientation: Specify horizontal for horizontal images.
-safesearch: Set to true for Safe For Work image search.

The response will include an array of images matching the search criteria. Each image is described by an object, and the relevant properties are:

-webformatURL: Link to a small image.
-largeImageURL: Link to a large image.
-tags: Image description that can be used as the alt attribute.
-likes: Number of likes.
-views: Number of views.
-comments: Number of comments.
-downloads: Number of downloads.

If the backend returns an empty array, it means no matching images were found. In this case, show a notification saying "Sorry, there are no images matching your search query. Please try again." Use the notiflix library for notifications.

## Gallery and Image Cards
The div.gallery element is initially present in the HTML document. It should contain image cards. When searching with a new keyword, clear the gallery content completely to avoid mixing the results.

## Pagination
The Pixabay API supports pagination using the page and per_page parameters. Display 40 objects per page (default is 20).

Initial configuration:
-Set page parameter value to 1.

For each subsequent request:
-Increase the page parameter value by 1.

When searching with a new keyword:
-Reset the page parameter value to 1, as a new collection of images will be paginated.

There is already a <button> element in the HTML document. When clicked, it should send a request for the next group of images and add them to the existing gallery.

Initially, the button should be hidden. After the first request, it should appear below the gallery. When submitting a new search query, hide the button first, and show it again after a successful request.

The response from the backend includes the totalHits property, which represents the total number of images matching the search criteria (for a free account). If the user reaches the end of the collection, hide the button and show a notification saying "We're sorry, but you've reached the end of search results."

## Additional Features
Notification
After the first request, show a notification stating the total number of images found (totalHits). The notification should say "Hooray! We found ${totalHits} images."

SimpleLightbox Library
Implement the ability to display a larger version of an image using the SimpleLightbox library.

To use the library, modify each image card element into a link as described in the documentation. The library also provides a refresh() method that needs to be called each time a new group of image cards is added.

To include the library's CSS styles in the project, import them using an additional import statement, in addition to the one mentioned in the documentation.

## Smooth Page Scrolling
Implement smooth scrolling of the page after each request and when rendering each subsequent group of image cards. 

## Infinite Scroll
Instead of the "Load more" button, you can implement the technique of infinite scroll for loading images as the user scrolls down the page. You have the freedom to choose any library or implement the solution yourself.
