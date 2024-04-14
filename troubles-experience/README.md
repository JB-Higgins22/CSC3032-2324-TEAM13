# MUSEUM OF THE TROUBLES & PEACE PROCESS - INTERACTIVE EXPERIENCE // QUB

# Introduction
The product vision for this project is as follows:

"
We propose to develop an interactive experience to be embedded on the ‘Museum of the Troubles and Peace’ website, prior to the opening of the museum. Our proposed solution, is an interactive conflict resolution ‘puzzle’, that encourages the user to learn about various concerns that were crucial during the 1998 peace talks, and how they were perceived on both sides of the political divide. The user is asked to achieve ‘balance’ by placing issues on either side of a ‘peace scale’, with the ideal outcome stressing that reasonable balance was difficult to achieve given the wider context of the Troubles. The user is encouraged to reflect on what they have learned, and leave comments for other users to consider.
This differs from other online museum experiences in that it has no dependence on the infrastructure of the museum itself. Instead, the solution is designed for users to learn and interact in a similar way to the proposed museum, so they can gauge their own interest in the project.
Anyone with an interest in the history of the troubles could be considered a beneficiary of this solution, however, we have formulated this idea specifically with potential investors in mind. They may want to interact with the solution to get a feel for the kind of lessons and conversations the museum can inspire. The ability to view the comments and reflections of other users could help investors gauge interest in the project, with a view to attracting more funding.
"

There are several key components to this project:

SCALES PAGE: The 'main' page of the application, the user is able to read about issues relating to peace in 
             Northern Ireland and can select actions in an attempt to bring us closer to peace. The perception
             of their actions are reflected on the scales. The user can hover over the scales to view quotes
             that surmise the attitudes of a particular side of the conflict. 

REFLECTIONS SPACE: The reflection space allows the user to leave reflections based on the lessons or thoughts
                   inspired by using the application. They are also able to view the reflections of others
                   which are visualised in a word cloud. These reflections are randomly retrieved from the 
                   database to eliminate bias. 

SETTINGS: The Settings can be accessed from every page in the application and allows the user to adjust
          the font size of text on screen, apply dark mode, apply high contrast mode, mute the soundtrack
          and access the login facility for the admin page.

ADMIN CONTROL: This page allows the system admin to approve or reject reflections submitted by users.
               It also provides the facility to populate the scales page with the desired 'Issue' data.

DATABASE: The facility through which data for the application is held


# Installing The Project
INSTALL NODE.JS AS NECESSARY FOR YOUR SYSTEM:
`https://nodejs.org/en/download/package-manager`

# Database Installation
Navigate to PostgreSQL website (https://www.postgresql.org/download/) and select the appropriate installer. After installation, select and run the postgresql executable to open the wizard. Select the desired installation directory. Deselect the Stack Builder component and click next. Select the desired data directory (within the previously selected one). Continue navigating the wizard to install. You will be asked to configure a password for the database. The `database.js` file in the `Backend` is configured to use the default port of 5432, however this can be changed to suit your needs.

Upon installation click finish, and launch the pgAdmin application. 

In the left hand column navigate to `Servers -> PostgreSQL 16 -> Databases`. Right click on the `Databases` header and select to create a new database, call this database `troubles-museum`.

### Installing libraries in the backend:
Change directory in the terminal until you are in the Backend directory. This is the backend of the system.

Input the following commands:

`npm install bcrypt`

`npm install jsonwebtoken`

`npm install dotenv`

### Setting up your secret token:

In the Backend directory, create a file called ".env". This file will contain a secret key required for encrypting tokens for authorisation of users for admin functionality. You now need to create the secret key itself. 
It is simply a random string of letters and characters and symbols with no spaces.

***You could type one in randomly by selecting random keys on the keyboard or input the below code to the terminal.

In the terminal input the following code to create your secret key:

`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

Place your key in the .env file as shown:

`JWT_SECRET=YourKeyGoesHere`

You must also place the following variable in the .env file:

`SERVER_PASSWORD=YourPostgreSQLPasswordGoesHere`

By setting this to the passeword you chose during PostgreSQL installation the backend will be able to talk to the database.

### Creating your first user

In the terminal, make sure you are still in the /Backend directory.
input the following line into the terminal and run it.

`node .\setupUser.js`

Once you have created your user, you should delete the setupUser.js file from the directory to remove any risk of anyone using it without authorisation. You can keep a copy of it elsewhere on your machine if needed. Remember your username and password as it cannot be changed or recovered if misplaced.

If for whatever reason the above command does not execute, pay attention to your location in the file directory, you may need to run: 

`node setupUser.js`

You should now be able to serve the backend via `npm run dev`. The backend should serve on a localhost port, but this can be changed via the `database.js` file.

### Installing libraries in the backend:
You must run `npm install` inside both the top directory, and inside the `troubles-experience` directory. You should now be able to serve the frontend via `npm run start`.

# Running/Serving The Project
LOCAL SERVE BACKEND:
In the terminal, cd into the 'Backend' directory and run the command `npm run dev`

LOCAL SERVE FRONTEND:
In the terminal, cd into the 'troubles-experience' directory and run the command `npm run start`

LOCAL SERVE TESTS:
In the terminal, cd into the 'troubles-experience' directory and run the command `npm run test`.
Note that there should be no local serve of the database or frontend when running the test suite.
For a coverage report, run `npm run test-with-coverage`

BACKEND TESTS:
A collection of Postman tests for the backend have been provided at `Backend/backend-testing/Backend Testing.postman_collection.json`

# Populating the Application with Contextual Content
We have included a page for the user to view prior to engaging with the scales that provides the user with some context on the Troubles themselves.
We have accomodated for `THREE PARAGRAPHS` of content on this page, currently housing example content generated by AI. This content MUST be replaced with a version the Museum feels best provides the user with an unbiased understanding of the context of the troubles/peace process. 

This content can be found in a constant names `allContent` at `line 57` in the following file path:
`CSC3032-2324-TEAM13/troubles-experience/src/pages/pre-game-info/pre-game-info.js`

Content must be similarly ammended for the Results page, which is intended to provide the user with text explaining the impact of the peace process. This content can be found in a constant names `allContent` at `line 71` in the following file path:
`CSC3032-2324-TEAM13/troubles-experience/src/pages/results/results.js`
Do not remove the first item in this const array, as it will display the user's score on screen.

# Populating the Application with Issue Content
The main content that must be populated within the application is the content for the actual Issues the user will be asked to work through.
Populating this content will require an understanding of the format of each Issue:

Each Issue must contain a `Name`, `two paragraphs to serve as a description`, `an Image`, and `2 - 3 options for the user to choose from`.

Each Option within an issue must contain a `Name`, `positive impact on Nationalist Weight`, `positive impact on Unionist Weight` and `how the option could have been percieved on each side`.

We have provided facilities for `two phases of Issues`, ideally with Phase One focusing on the 1998 Peace Talks, and the second focusing on maintaining peace post-1998.
However, if you want to change the descriptions of these phases this can be done on `line 168` in file:
`CSC3032-2324-TEAM13/troubles-experience/src/pages/scales/scales.js`
If you decide to make changes to this, the changes must also be reflected on line `line 71` of `CSC3032-2324-TEAM13/troubles-experience/src/pages/results/results.js`, as well as `line 282` of `troubles-experience/src/__tests__/scales-page.test.js`, this will ensure that the tests continue to pass.

The system is built for `8 issues per phase. This is required`.

The issues themselves are populated via a form on the Admin Page, meaning there is minimal need to alter the code. You should however include the desired images in the `public` folder.
This means you can enter the image URLS on the form with ease (e.g. `/image.png`).

It is highly advised that you plan and discuss the issues you plan to include on paper before using the form. You will ideally want to design a combination of issues that are challenging
for the user to solve, giving consideration to the issue weights. Beneath is data for a very basic example issue:

Name: Dummy Issue 1 

Description One: This is a test issue. 

Description Two: This is a test issue. 

ImageURL: /dummyimage.jpeg 

-------------- 

Option A: Option A (Representative of total imbalance, + Nationalist) 

Option A Nationalist Weight: 100 

Option A Nationalist Perspective: Scales tipped totally in our favour. 

Option A Unionist Weight: 0 

Option A Unionist Perspective: No Weight Here. 

-------------- 

Option B: Option B (Representative of total balance) 

Option B Nationalist Weight: 100 

Option B Nationalist Perspective: Even 

Option B Unionist Weight: 100 

Option B Unionist Perspective: Even 

-------------- 

Option C: Option C (Representative of partial balance, + Unionist) 

Option C Nationalist Weight: 20 

Option C Nationalist Perspective: A little weight on this side 

Option C Unionist Weight: 80 

Option C Unionist Perspective: Lots of weight on this side. 

# Reflection Content: 
You may want to consider allowing members of the board to interact with the system and leave reflections so that the reflection page is populated before being deployed.
Note that the reflection page displays a maximum of 33 reflections at a time. If there are more than 33 in the database, the system will display 33 randomly selected reflections.

`As mentioned, every reflection needs to be approved or rejected through the Admin page before it populates the Word Cloud.`

# Content for Examination - FOR UNIVERSITY ASSESSMENT ONLY: 
As the above sections illustrate, the product vision works best when content is carefully considered. Of course, we recognise this won't be feasible for examination, so we have included a file `troubles-experience/examiner.txt` which contains content generated by AI, based on a prompt describing the concept, designed to help deomstrate the vision. We have also provided fake reviews to populate the reflection page with. This content has been included in SQL Queries to be executed in PGAdmin. In addition, we have provided all research carried out on the Peace Process prior to our requirements changing to allow the museum to populate the content.

Again, the content provided is AI generated for demonstration purposes ONLY, it is NOT to be used by the museum for deployment, and may not provide a historically accurate picture, or always demonstrate the novelty of the product. Of course, examiners are still welcome to follow the above sections to populate the app with their own content.

# Credits
THIS PROJECT WAS ITERATIVELY DEVELOPED BY:

BEN HETHERINGTON - bhetherington02@qub.ac.uk
JOHN HIGGINS - jhiggins29@qub.ac.uk
ADAM LYNCH - alynch19@qub.ac.uk
RORY McARDLE - rmcardle08@qub.ac.uk
THOMAS MORREN - tmorren01@qub.ac.uk

# Component Credits
Word Cloud - VisX Word Cloud by AirBnB / https://airbnb.io/visx/wordcloud
Bad Words - https://www.npmjs.com/package/bad-words
MUI - https://mui.com/
BCRYPT - https://www.npmjs.com/package/bcrypt
DOTENV - https://www.npmjs.com/package/dotenv
JSONWEBTOKEN - https://www.npmjs.com/package/jsonwebtoken

# Image Credits
Newspaper Background image - newspaper.jpeg - https://pixabay.com/photos/bundle-jute-rope-newspaper-1853667/ 

Shelf Image - shelf.png - https://pixabay.com/vectors/shelf-wood-wall-hanging-wooden-575408/ 

Newspaper Stack Image - newspaper-stack.png - https://pixabay.com/vectors/newspaper-news-journal-headline-152320/

Book Image - IMG_2965.PNG - Anthony Keyes

# Licence

MIT License

Copyright (c) [2024] [Ben Hetherington, John Higgins, Adam Lynch, Rory McArdle, Thomas Morren - Queen's University Belfast]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
