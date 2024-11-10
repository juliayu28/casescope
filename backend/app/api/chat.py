from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Iterator
import json

from phi.agent import RunResponse
from phi.utils.pprint import pprint_run_response

from app.core.config import settings

from app.services.agent import lawyer_agent

router = APIRouter()


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: List[ChatMessage]


# TODO: should I also get and return a session id? Send tool calls too. Not just content
async def generate_response(query: str):
    try:

        response_stream: Iterator[RunResponse] = lawyer_agent.run(query, stream=True)
        if settings.ENVIRONMENT == "dev":
            # Print the response in markdown format
            pprint_run_response(response_stream, markdown=True)
        for chunk in response_stream:
            # print(chunk)
            yield f"data: {json.dumps({'delta': chunk.content})}\n\n"

    except Exception as e:
        yield f"data: {json.dumps({'error': str(e)})}\n\n"

    finally:
        yield "data: [DONE]\n\n"


@router.post("/achat")
async def chat(request: Request, chat_request: ChatRequest):
    try:
        return StreamingResponse(
            generate_response(chat_request.messages[-1].content),
            media_type="text/event-stream",
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.options("/chat")
async def chat_options():
    return {"message": "OK"}


@router.post("/chat")
async def chat(chat_request: ChatRequest):
    try:
        res = lawyer_agent.run(chat_request.messages[-1].content)
        return {"response": res.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
