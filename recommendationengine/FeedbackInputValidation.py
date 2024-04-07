from pydantic import BaseModel, Field, validator
from typing import Optional
from bson import ObjectId
import re


class ObjectIdStr(str):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError('Not a valid ObjectId')
        return str(v)


class FeedbackInput(BaseModel):
    recommendationResultId: ObjectIdStr = Field(
        ..., description="The recommendation result ID")
    actionType: str = Field(..., description="The type of action")
    sentimentScore: Optional[float] = Field(
        None, ge=0, le=1, description="The sentiment score")
    feedbackText: Optional[str] = Field(..., description="The feedback text")

    @validator('actionType')
    def action_type_must_be_valid(cls, v):
        valid_action_types = ['VISITED_RESTAURANT', 'SEARCHED', 'SUBMITTED_RATING',
                              'SUBMITTED_REVIEW', 'LIKE', 'DISLIKE', 'FAVOURITE', 'UNFAVOURITE']
        if v not in valid_action_types:
            raise ValueError(f"Invalid action type: {v}")
        return v

    @validator('feedbackText')
    def feedback_text_must_be_sanatised(cls, v):
        if v is not None:
            v = re.sub('<[^<]+?>', '', v)
            return v.stip()
        return v

    @validator('sentimentScore', pre=True)
    def sentiment_score_must_be_rounded(cls, v):
        if v is not None:
            try:
                v = float(v)
                return round(v, 2)
            except ValueError:
                raise ValueError('sentimentScore must be a valid number')
        return v
