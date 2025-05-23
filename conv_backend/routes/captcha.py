from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from ..db import get_db
from ..models import Captcha
from ..schemas.captcha_schema import CaptchaCreate, CaptchaOut

router = APIRouter(prefix="/captcha", tags=["Captcha"])

@router.post("/", response_model=CaptchaOut)
async def create_captcha(captcha: CaptchaCreate, db: AsyncSession = Depends(get_db)):
    new_captcha = Captcha(question=captcha.question, answer=captcha.answer)
    db.add(new_captcha)
    await db.commit()
    await db.refresh(new_captcha)
    return new_captcha
