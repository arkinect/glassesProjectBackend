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
    - AUTH0_DOMAIN="<Available from the Auth0 settings page>"
    - AUTH0_CLIENT_ID="<Available from the Auth0 settings page>"
    - AUTH0_API_AUDIENCE="<Available from the Auth0 settings page>"
    - AUTH0_CLIENT_SECRET="<Available from the Auth0 settings page>"
    - UPLOAD_DIRECTORY="<Path to directory where you can upload images to>"   
3. Update structure of mysql tables to reflect models.py (untested, confirm when used next)
    - cd to glassesProjectBackend
    - alembic revision --autogenerate -m "message"
    - alembic upgrade head
    - If the steps above failed try: 
        alembic stamp head, alembic upgrade head, alembic revision --autogenerate -m "message"


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
Branch names follow the form ("FB"|"BB")+<ticket number> where FB is for a feature branch and BB is for a bug branch

# Todo
This todo list is no longer in use, now using kanban in github projects
