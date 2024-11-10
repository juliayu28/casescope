from phi.agent import Agent
from phi.model.openai import OpenAIChat

lawyer_agent = Agent(
    name="Lawyer Agent",
    role="Your job is to analyze historical public records to identify effective legal arguments based on past hearing orders.",
    model=OpenAIChat(id="gpt-4o"),
    tools=[],
    instructions=[""],
    show_tool_calls=True,
    markdown=True,
)
