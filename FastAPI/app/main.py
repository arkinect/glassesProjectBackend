from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
from typing import List, Dict
from pydantic import BaseModel

# Load test data
try:
    with open('../TestData/testData.json', 'r') as file:
        data = json.load(file)
        testData = data.get('testArray1', [])  # Get 'testArray1' from the loaded JSON
except FileNotFoundError:
    testData = []
    print("Warning: testData.json not found.")
except json.JSONDecodeError:
    testData = []
    print("Error: testData.json is not a valid JSON file.")
except Exception as e:
    testData = []
    print(f"Unexpected error: {e}")

# define response model
class Location(BaseModel):
    city: str

class Posting(BaseModel):
    prescription: str
    owner_name: str
    contact: str    
    location: Location

# app
app = FastAPI()

app.add_middleware(
    CORSMiddleware, 
    allow_origins=["http://localhost:3000"],
    allow_methods=["GET"]
)

@app.get('/api/market/', response_model=List[Posting])
def get_glasses_market() -> List[Posting]:
    print("Returning data")
    if not testData:
        raise HTTPException(status_code=500, detail="No data available.")
    return list(testData.values())
