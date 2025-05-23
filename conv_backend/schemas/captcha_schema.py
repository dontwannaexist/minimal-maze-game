from pydantic import BaseModel

class CaptchaCreate(BaseModel):
    question: str
    answer: str

class CaptchaOut(BaseModel):
    id: int
    question: str

    class Config:
        orm_mode = True
