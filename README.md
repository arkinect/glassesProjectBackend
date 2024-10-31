# glassesProjectBackend

# Stack
MySql
FastAPI
Node
React
TypeScript

# first time setup
Update structure of mysql tables to reflect models.py (untested, confirm when used next)
    alembic revision --autogenerate -m "message"
    alembic upgrade head

# Starting the app
start mySql 
    services/mysql80/start
    ensure .env file is correct

start venv
    venv/scripts activate

start backend
    navigate to FastAPI/App
    uvicorn main:app --reload

start frontend
    navigate to React/App
    npm run start

# other
See Autogen documentation for my FastAPI endpoints:
    http://127.0.0.1:8000/docs

# notes for developers

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

*** this may change