# SPA

Project main core:
- This is a Single Page Application (SPA) built entirely using Vanilla JavaScript, HTML, and CSS. 
- The application demonstrates how to create a dynamic, client-side rendered web app without relying on external frameworks or libraries like React, Angular, or Vue.
- Client-Side Routing: Navigate between different "pages" without reloading the browser.
- Dynamic Content Loading: Fetch and display content dynamically based on user interactions.
- Responsive Design: Works seamlessly on desktop and mobile devices.
- Organized and reusable JavaScript modules for better maintainability.

Pending features:

   - [🥳] Submit a video request. (API: POST -> `/video-request`)      
   - [🥳] Show list of requests below the form. (API: GET -> `/video-request`)
   - [🥳] Vote up and down on each request. (API: PUT -> `/video-request/vote`)
   - [🥳] Sorting options `new first` the default one, and `top voted first`.
   - [🥳] Search box to search for video requests.
   - [ ] Client-side validation for the fields with * as required and for the email field, topic title should be max 100 length.
   - [ ] Add signup/login form with email.
   - [ ] Make votes unique so no one could cheat, using unique user, enhance the voting experience.
   - [ ] Make a super user capabilities, delete, add resolution video, and change status. all are only visible to him.
   - [ ] Add style to the super user capabilities and make filter by request statuses (`NEW`, `PLANNED`, `DONE`).
