from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(
    title="Pet Platform - Recommender Service",
    description="ML-powered recommendation engine for pet adoption",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserPreferences(BaseModel):
    home_type: Optional[str] = None
    experience_level: str
    preferred_pet_types: List[str] = []
    willing_to_travel_km: int = 50

class RecommendationRequest(BaseModel):
    user_id: str
    user_preferences: UserPreferences
    limit: int = 20

class Recommendation(BaseModel):
    pet_id: str
    compatibility_score: float
    lifestyle_match_score: float
    experience_match_score: float
    reasons: List[str]

class RecommendationResponse(BaseModel):
    recommendations: List[Recommendation]
    model_version: str
    timestamp: str

@app.get("/")
def read_root():
    return {
        "service": "Pet Platform Recommender",
        "version": "1.0.0",
        "status": "healthy"
    }

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "recommender"}

@app.post("/api/v1/recommendations", response_model=RecommendationResponse)
def get_recommendations(request: RecommendationRequest):
    # TODO: Implement ML recommendation logic
    return RecommendationResponse(
        recommendations=[],
        model_version="1.0.0",
        timestamp="2024-01-01T00:00:00Z"
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
