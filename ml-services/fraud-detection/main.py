from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uvicorn

app = FastAPI(
    title="Pet Platform - Fraud Detection Service",
    description="ML-powered fraud detection system",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RiskFactor(BaseModel):
    factor: str
    weight: float
    description: str

class FraudDetectionRequest(BaseModel):
    user_id: str
    action: str
    entity_id: Optional[str] = None
    entity_type: Optional[str] = None
    context: Optional[Dict[str, Any]] = None

class FraudDetectionResponse(BaseModel):
    is_suspicious: bool
    risk_score: float
    risk_factors: List[RiskFactor]
    recommended_action: str
    explanation: str

@app.get("/")
def read_root():
    return {
        "service": "Pet Platform Fraud Detection",
        "version": "1.0.0",
        "status": "healthy"
    }

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "fraud-detection"}

@app.post("/api/v1/detect", response_model=FraudDetectionResponse)
def detect_fraud(request: FraudDetectionRequest):
    # TODO: Implement fraud detection logic
    return FraudDetectionResponse(
        is_suspicious=False,
        risk_score=0.1,
        risk_factors=[],
        recommended_action="none",
        explanation="No suspicious activity detected"
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
