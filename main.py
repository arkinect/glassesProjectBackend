# from fastapi import FastAPI, Response
# from fastapi.middleware.cors import CORSMiddleware



# app = FastAPI()

# origins = [
#     'http://localhost:3000'
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
# )

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request

app = FastAPI()

# Sets the templates directory to the `build` folder from `npm run build`
# this is where you'll find the index.html file.
templates = Jinja2Templates(directory="D:/Documents/Code/JS/Stencil Site/glassessite/www")

# Mounts the `static` folder within the `build` folder to the `/static` route.
app.mount('/static', StaticFiles(directory="D:/Documents/Code/JS/Stencil Site/glassessite/www/build"), 'static')


# sets up a health check route. This is used later to show how you can hit
# the API and the React App url's
@app.get('/api/health')
async def health():
    return { 'status': 'healthy' }


# Defines a route handler for `/*` essentially.
# NOTE: this needs to be the last route defined b/c it's a catch all route
@app.get("/{rest_of_path:path}")
async def react_app(req: Request, rest_of_path: str):
    return templates.TemplateResponse('index.html', { 'request': req })