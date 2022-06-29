from fastapi import APIRouter
from core.schema import article_generator, email_replyer, paraphraser, subtitle_generator, summarizer, translator

router = APIRouter()
router.include_router(article_generator.router)
router.include_router(email_replyer.router)
router.include_router(paraphraser.router)
router.include_router(subtitle_generator.router)
router.include_router(summarizer.router)
router.include_router(translator.router)
