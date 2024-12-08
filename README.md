# glassesProjectBackend

This is no longer just a repo for the backend

The goal is to provide a centralized place for individuals and charitable organizations to post used glasses for free with the goal of helping underinsured Canadians find glasses

# Stack
MySql
FastAPI
Node
React
TypeScript
Auth0

# First Time Setup
0. Create and activate venv, installing dependencies as needed
1. Install and setup mySQL (and optionally mySQL Workbench)
2. Create a .env file in glassesProjectBackend/.env with the following environment variables
    - MYSQL_URL="mysql+pymysql://root:<mySQL password>@localhost:<port>/<db name>"
    - UPLOAD_DIRECTORY="<Path to directory where you can upload images to>"   
3. Create a .env file in glassesProjectBackend/React/app.env with the following environment variables
    - REACT_APP_AUTH0_DOMAIN="<Available from the Auth0 settings page>"
    - REACT_APP_AUTH0_CLIENT_ID="<Available from the Auth0 settings page>"
4. Update structure of mysql tables to reflect models.py (untested, confirm when used next)
    - cd to glassesProjectBackend
    - alembic revision --autogenerate -m "message"
    - alembic upgrade head

# Starting the app
start mySql 
    In windows, navigate to: services/mysql80/start
    ensure .env file is correct

start venv
    cd to glassesProjectBackend
    venv/scripts activate

start backend
    cd to FastAPI/App
    uvicorn main:app --reload

start frontend
    cd to React/App
    npm run start

# Other
See Autogen documentation for my FastAPI endpoints:
    http://127.0.0.1:8000/docs

# Notes for developers

I have yet to decide on a complete structure for the backend. I'm just making it up as I go along

The structure for the front end is broadly 
1. create primitive components
    These are highly reusble components which can be implemented everywhere
    eg generic button, generic text entry, etc
2. use primitive components as part of larger components
    these are more specialized components with less reusability. these can have hard coded text and will be used in pages
3. use primitive and larger components in pages
    pages should call a small handful of components and take care of backend calls***
4. pages are refrenced in App.tsx
5. when writing scss, make use of colour variables available in index.css, or add new ones. 
    the goal is to be able to change the sites colours on a dime, as rn I'm just using different shades of purple. ideally the scss of primitive or larger components shouldnt use any hard coded colours or fonts (including text sizes)

Branch names follow the form ("FB"|"BB")+<ticket number> where FB is for a feature branch and BB is for a bug branch

*** this may change

# Todo
1. adding listings via listing page
2. add component for a prescription entry using cells
3. fix market page (idk y it isnt working)
4. add option in new form to use default location or select a new one (this will have to poll a db for the users default location and make that visible on the front end)

# Feature List
1. investigate auth0 to add accounts
2. ml model to predict prescription using pic through glasses (tissue box?)
3. data validation on listing form
4. add modal over market page with warning (tick box to not show again if logged in). same warning available from account maybe?