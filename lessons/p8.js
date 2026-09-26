/* Phase 8: Agentic AI (Weeks 39-42) */
window.LESSONS = window.LESSONS || {};
Object.assign(window.LESSONS, {

/* ---------- Week 39: Agent fundamentals ---------- */
"w39-1": {
 m: "Agents are where LLMs stop just talking and start doing. It's the fastest-growing area of AI engineering.",
 e: "An agent is an LLM in a loop: it decides what to do, uses a tool (search, code, API), looks at the result, and decides the next step until the job is done.",
 k: ["LLM = the brain", "Tools = hands (functions it can call)", "Memory = what it remembers", "Loop = think, act, observe, repeat", "Stop condition = task done or budget used"],
 t: ["Draw the agent loop on paper", "List 5 tasks and decide: single LLM call, fixed workflow, or agent?", "Try an existing agent (e.g. Claude with tools) on a multi-step task and watch its steps"],
 q: [["What is an AI agent?", "A system where an LLM dynamically decides which tools to use and in what order, looping until it completes a goal."],
     ["When should you NOT build an agent?", "When a fixed workflow or single call solves it; agents add cost, latency and unpredictability."]],
 x: ["Calling every LLM app an agent"],
 d: "Your 5 tasks are classified with reasons.",
 min: 30
},
"w39-2": {
 m: "Anthropic's guide is the most practical, widely-cited framework for building agents that work.",
 e: "It says: start simple, use predictable workflows when you can, and reach for autonomous agents only when you need flexibility.",
 k: ["Augmented LLM: retrieval, tools, memory", "Workflows vs agents", "Keep it simple, be transparent, design tools carefully"],
 t: ["Read 'Building effective agents' fully", "Summarise each pattern in one line", "Note 3 pieces of advice you'll apply", "Read the linked cookbook examples"],
 q: [["What's the difference between a workflow and an agent?", "Workflows follow predefined code paths that orchestrate LLM calls; agents let the LLM direct its own process and tool use."]],
 x: ["Jumping to frameworks before understanding the patterns"],
 d: "One-line summary of each pattern.",
 min: 60
},
"w39-3": {
 m: "These five workflow patterns solve most real problems more reliably than a free-roaming agent.",
 e: "Chaining: step by step. Routing: send to the right specialist. Parallelisation: split or vote. Orchestrator-workers: a manager hands out subtasks. Evaluator-optimiser: write, critique, rewrite.",
 k: ["Prompt chaining with checks between steps", "Routing by classification", "Parallelisation: sectioning and voting", "Orchestrator-workers for unpredictable subtasks", "Evaluator-optimiser loops"],
 t: ["Build a 3-step chain: outline, draft, polish", "Build a router that sends questions to billing, tech or general prompts", "Build a parallel voter that runs 3 prompts and takes the majority", "Build an evaluator-optimiser loop for a LinkedIn post"],
 c: String.raw`def route(q):
    label = ask(f"Classify into billing, tech or general. Reply with one word.\n{q}").strip().lower()
    return {"billing": billing_prompt, "tech": tech_prompt}.get(label, general_prompt)(q)

def refine(task, rounds=3):
    draft = ask(task)
    for _ in range(rounds):
        critique = ask(f"Critique this against the task. Say DONE if good.\nTask: {task}\nDraft: {draft}")
        if "DONE" in critique: break
        draft = ask(f"Improve the draft using this feedback.\n{critique}\n\n{draft}")
    return draft`,
 q: [["When would you use routing?", "When inputs fall into distinct categories that are better handled by separate specialised prompts or models."],
     ["What is the evaluator-optimiser pattern?", "One LLM generates, another evaluates with feedback, and they loop until quality criteria are met."]],
 x: ["Loops with no max iterations"],
 d: "All four patterns working.",
 min: 90
},
"w39-4": {
 m: "ReAct is the classic reasoning-and-acting loop behind most agents.",
 e: "The model writes a thought ('I need today's weather'), takes an action (calls weather tool), reads the observation, and thinks again.",
 k: ["Thought, Action, Observation cycle", "Grounding reasoning in real tool results", "Reduces hallucination vs pure reasoning", "Modern models do this natively with tool calling"],
 t: ["Read the ReAct paper abstract and examples", "Trace a ReAct loop by hand for 'Is it hotter in Hyderabad or Chennai right now?'", "Write the prompt format a ReAct agent would use"],
 q: [["What is ReAct?", "A prompting pattern that interleaves reasoning traces with tool actions and their observations."]],
 x: ["Letting the model invent observations instead of calling tools"],
 d: "A hand-traced ReAct loop.",
 min: 40
},
"w39-5": {
 m: "Building an agent loop without a framework shows you exactly what frameworks do and helps you debug them.",
 e: "Give the model tool descriptions, run whatever tool it asks for, send back the result, and repeat until it answers.",
 k: ["Tool definitions with name, description and JSON schema", "Model returns tool_use blocks", "You execute and return tool_result", "Loop until stop_reason is end_turn", "Max steps as a safety limit"],
 t: ["Define a calculator tool and a get_weather tool", "Write the loop with the Anthropic SDK", "Ask a question that needs both tools", "Print every step", "Add a max-steps limit"],
 c: String.raw`tools = [{"name": "calculator", "description": "Evaluate a basic arithmetic expression.",
          "input_schema": {"type": "object", "properties": {"expr": {"type": "string"}}, "required": ["expr"]}}]
def run_tool(name, args):
    if name == "calculator": return str(eval(args["expr"], {"__builtins__": {}}))
messages = [{"role": "user", "content": "What is 18% GST on 2499?"}]
for _ in range(8):
    r = client.messages.create(model="claude-sonnet-4-5", max_tokens=500, tools=tools, messages=messages)
    messages.append({"role": "assistant", "content": r.content})
    if r.stop_reason != "tool_use": break
    results = [{"type": "tool_result", "tool_use_id": b.id, "content": run_tool(b.name, b.input)} for b in r.content if b.type == "tool_use"]
    messages.append({"role": "user", "content": results})
print(r.content[-1].text)`,
 q: [["How does tool calling work?", "You describe tools with JSON schemas; the model returns a structured request to call one; your code runs it and sends back the result for the model to use."],
     ["Why add a max-steps limit?", "To stop runaway loops that burn tokens or repeat actions."]],
 x: ["Using unrestricted eval on model output"],
 d: "Your agent uses two tools to answer.",
 min: 75
},
"w39-p": {
 m: "A from-scratch agent with real tools is the clearest proof you understand agents.",
 e: "An agent with a calculator, web search and a file reader that can answer multi-step questions.",
 k: ["Three tools with clean schemas", "Loop with step logging", "Safety limits"],
 t: ["Implement calculator (safe parser), web_search (a search API) and read_file tools", "Log every thought, tool call and result", "Test 10 multi-step questions", "Record failures and fix tool descriptions", "README with a trace example"],
 q: [["What did you learn about tool design?", "Clear names, descriptions, examples and helpful error messages matter more than the agent code."]],
 x: ["Vague tool descriptions"],
 d: "Agent solves most of your 10 questions.",
 min: 180
},

/* ---------- Week 40: Tools, memory and MCP ---------- */
"w40-1": {
 m: "Agents are only as good as their tools. Tool design is the most underrated agent skill.",
 e: "A tool is an interface for a new colleague: clear name, clear instructions, sensible inputs, and helpful errors when something goes wrong.",
 k: ["Descriptive names and descriptions with examples", "Few, well-scoped parameters", "Return concise, relevant results", "Actionable error messages", "Fewer, more capable tools often beat many tiny ones"],
 t: ["Rewrite your 3 tools' descriptions with examples and edge cases", "Make errors tell the model how to fix the call", "Test before/after on your 10 questions", "Truncate long tool outputs sensibly"],
 q: [["What makes a good agent tool?", "A clear purpose, precise schema, helpful description, concise output and errors that guide correction."]],
 x: ["Returning huge raw API responses to the model"],
 d: "Better success rate after rewriting tools.",
 min: 60
},
"w40-2": {
 m: "Memory lets agents handle long tasks and remember users across sessions.",
 e: "Short-term memory is the current conversation. Long-term memory is a notebook the agent can write to and search later.",
 k: ["Context window as short-term memory", "Summarising older turns", "Long-term memory in a database or vector store", "What to remember and what to forget", "Privacy considerations"],
 t: ["Add conversation summarisation when history gets long", "Add a save_note and search_notes tool backed by SQLite or Chroma", "Test that the agent recalls a fact from an earlier session", "Add a way to delete memories"],
 q: [["How do you give an agent long-term memory?", "Store important facts or summaries externally and retrieve relevant ones into context when needed."]],
 x: ["Saving everything, including sensitive data"],
 d: "Agent recalls a fact across sessions.",
 min: 60
},
"w40-3": {
 m: "MCP is the standard way to connect AI apps to tools and data, like USB-C for AI.",
 e: "Write a tool server once using the Model Context Protocol, and any MCP-compatible app (Claude, IDEs, agents) can use it.",
 k: ["MCP servers expose tools, resources and prompts", "Clients connect over stdio or HTTP", "Python SDK with FastMCP", "Use with Claude Desktop or your own agent"],
 t: ["Install the MCP Python SDK", "Build a server with 2 tools (e.g. expense tracker add/list)", "Test with the MCP Inspector", "Connect it to Claude Desktop or your agent"],
 c: String.raw`from mcp.server.fastmcp import FastMCP
mcp = FastMCP("expenses")
EXPENSES = []

@mcp.tool()
def add_expense(amount: float, category: str) -> str:
    """Record an expense in rupees under a category like food or travel."""
    EXPENSES.append((amount, category)); return f"Added Rs {amount} to {category}"

@mcp.tool()
def total(category: str | None = None) -> float:
    """Total spend, optionally for one category."""
    return sum(a for a, c in EXPENSES if category in (None, c))

if __name__ == "__main__":
    mcp.run()`,
 q: [["What is the Model Context Protocol?", "An open protocol that standardises how AI applications connect to external tools, data and prompts through servers."],
     ["Why use MCP instead of custom tool code?", "Build a tool integration once and reuse it across many clients and agents."]],
 x: ["Exposing destructive tools without confirmation"],
 d: "Your MCP server works in a client.",
 min: 75
},
"w40-4": {
 m: "Real agents touch real systems: the web, files and databases.",
 e: "Give your agent eyes (web search), a filing cabinet (files) and a ledger (database), each with safe limits.",
 k: ["Search APIs (Tavily, Brave, SerpAPI)", "Read-only file access in a sandbox folder", "SQL tool with read-only user", "Rate limits and timeouts per tool"],
 t: ["Add a web search tool", "Add a sandboxed file reader and writer", "Add a read-only SQL tool on a sample SQLite DB", "Ask a question that needs all three"],
 q: [["How would you let an agent query a database safely?", "Read-only credentials, allowed tables only, query timeouts, row limits and logging."]],
 x: ["Giving the agent write access to production data"],
 d: "Agent combines web, files and SQL in one answer.",
 min: 75
},
"w40-p": {
 m: "A research agent that writes cited reports is one of the most practical and impressive agent demos.",
 e: "Give it a topic; it searches, reads sources, takes notes and writes a report with citations.",
 k: ["Search + fetch + note tools", "Planning step before research", "Citations in the final report"],
 t: ["Plan: break the topic into 3-5 questions", "Search and read sources for each", "Save notes with URLs", "Write a markdown report with citations", "Evaluate 5 reports: are citations real and supportive?"],
 q: [["How did you prevent fabricated citations?", "Citations can only come from URLs actually fetched and saved in notes, and a final check verifies each one."]],
 x: ["Letting the model cite URLs it never fetched"],
 d: "Five reports with verified citations.",
 min: 240
},

/* ---------- Week 41: Frameworks and multi-agent ---------- */
"w41-1": {
 m: "LangGraph is widely used for production agents that need state, persistence and human approval.",
 e: "Draw your agent as a flowchart of steps (nodes) and arrows (edges). LangGraph runs it, saves progress, and can pause for your approval.",
 k: ["State schema shared across nodes", "Nodes = functions, edges = transitions", "Conditional edges for decisions", "Checkpointing to resume", "Interrupts for human-in-the-loop"],
 t: ["Build a LangGraph with nodes: plan, act, review", "Add a conditional edge that loops back if review fails", "Add a checkpointer and resume a run", "Add an interrupt that asks for approval before a 'send' step"],
 q: [["Why use a graph-based framework for agents?", "Explicit control flow, persistent state, retries, streaming and human-in-the-loop are easier to build and debug."]],
 x: ["Using a framework before you can build the loop yourself"],
 d: "A graph that pauses for approval.",
 min: 90
},
"w41-2": {
 m: "Knowing the main agent frameworks lets you choose the right one for a job, or none.",
 e: "Each framework is a different kitchen layout. The cooking (LLM + tools + loop) is the same.",
 k: ["LangGraph: explicit graphs and state", "CrewAI: role-based agent teams", "OpenAI Agents SDK: handoffs and guardrails", "Claude Agent SDK: the harness behind Claude Code", "Plain code: often enough"],
 t: ["Build the same small task (research + summarise) in 2 frameworks", "Compare lines of code, control and debugging", "Write a one-paragraph recommendation"],
 q: [["How do you choose an agent framework?", "By the control flow you need, observability, state persistence, team familiarity, and whether plain code would be simpler."]],
 x: ["Picking a framework for hype"],
 d: "Comparison paragraph written.",
 min: 90
},
"w41-3": {
 m: "Multi-agent systems split big tasks among specialists, useful for research, coding and content pipelines.",
 e: "A supervisor agent acts like a manager, handing work to a researcher, a writer and a reviewer, then combining their output.",
 k: ["Supervisor/orchestrator pattern", "Handoffs between agents", "Shared vs private context", "Costs multiply with agents", "Clear responsibilities per agent"],
 t: ["Build a supervisor with 2 worker agents", "Pass only needed context to each worker", "Log tokens used per agent", "Compare quality and cost vs a single agent"],
 q: [["When is multi-agent worth it?", "When subtasks are separable and benefit from different context or tools; otherwise one agent is cheaper and simpler."]],
 x: ["Agents chatting endlessly with no stop rule"],
 d: "Cost and quality comparison.",
 min: 75
},
"w41-4": {
 m: "The Hugging Face Agents course gives structured, free practice with certificates.",
 e: "Hands-on units covering agent fundamentals, frameworks and a final project.",
 k: ["Agent fundamentals", "smolagents, LlamaIndex, LangGraph units", "Use cases and final assignment"],
 t: ["Complete units 1-2", "Do the hands-on exercises", "Attempt the final assignment", "Add the certificate to LinkedIn"],
 q: [["What is a code agent?", "An agent that writes and runs code as its actions, instead of choosing from fixed JSON tool calls."]],
 x: ["Skipping hands-on parts"],
 d: "Units complete.",
 min: 300
},
"w41-p": {
 m: "A multi-agent content team shows orchestration skills in a way anyone can understand.",
 e: "A researcher, writer and editor agent that turn a topic into a polished article.",
 k: ["Supervisor + 3 specialists", "Human approval before publishing", "Traces of each agent's work"],
 t: ["Researcher gathers sources", "Writer drafts from the research", "Editor critiques and requests changes (max 2 rounds)", "Human approves the final version", "Show traces and token costs in the README"],
 q: [["How did you control cost and loops?", "Max rounds, token budgets per agent, and passing summaries instead of full histories."]],
 x: ["Unbounded revision loops"],
 d: "Articles produced with traces.",
 min: 240
},

/* ---------- Week 42: Reliable agents ---------- */
"w42-1": {
 m: "Agents fail in new ways. Evaluating them is essential before anyone trusts them.",
 e: "Test agents like interns: give standard tasks, check whether they finished, and review how they got there.",
 k: ["Task success rate on a benchmark set", "Trajectory evaluation: were steps sensible?", "Tool-call accuracy", "Cost and steps per task", "Regression tests after changes"],
 t: ["Write 20 test tasks with expected outcomes for your agent", "Run them and record success, steps, tokens", "Classify failures (bad plan, wrong tool, tool error, gave up)", "Fix the top failure type and re-run"],
 q: [["How do you evaluate an AI agent?", "A task suite with checkable outcomes, plus trajectory review, tool-call accuracy, cost and latency, tracked across versions."]],
 x: ["Only demoing successful runs"],
 d: "Success rate improved after a fix.",
 min: 75
},
"w42-2": {
 m: "You can't fix what you can't see. Tracing shows every step an agent took.",
 e: "Tracing records each LLM call, tool call, input, output, time and cost, like a flight recorder.",
 k: ["Traces and spans", "Langfuse (open source) or LangSmith", "OpenTelemetry-based tracing", "Cost and latency dashboards", "Link traces to user feedback"],
 t: ["Add Langfuse tracing to your agent", "Inspect a failed run step by step", "Add user feedback (thumbs up/down) to traces", "Build a view of cost per task"],
 q: [["What is LLM observability?", "Capturing prompts, responses, tool calls, latency, cost and feedback for every request so you can debug and improve."]],
 x: ["Logging prompts that contain personal data without masking"],
 d: "You debugged a failure from its trace.",
 min: 60
},
"w42-3": {
 m: "Agents with real permissions can cause real damage. Safety design is non-negotiable.",
 e: "Give agents the smallest set of keys they need, run code in a sandbox, and ask a human before anything irreversible.",
 k: ["Least privilege", "Sandboxed code execution (containers)", "Human approval for sending, paying, deleting", "Prompt injection from web pages and files", "Allow-lists for domains and actions"],
 t: ["List every action your agent can take and rate its risk", "Add approval for high-risk actions", "Test with a web page containing hidden injection instructions", "Run code tools in a Docker sandbox"],
 q: [["How do you make an agent safe to use?", "Least-privilege tools, sandboxing, human approval for irreversible actions, injection defences, and audit logs."]],
 x: ["Letting an agent send emails with no confirmation"],
 d: "Risk table and approvals in place.",
 min: 60
},
"w42-4": {
 m: "Agents can burn tokens fast. Controlling cost and latency makes them viable products.",
 e: "Budget the agent like a trip: cap steps and spending, use cheaper models for easy steps, and don't repeat work.",
 k: ["Max steps and token budgets", "Smaller models for routing and simple steps", "Caching tool results", "Parallel tool calls", "Summarising context between steps"],
 t: ["Measure average cost and time per task", "Add a token budget that stops runs gracefully", "Use a smaller model for planning or simple steps and compare", "Cache repeated tool calls"],
 q: [["How do you reduce an agent's cost?", "Fewer steps via better tools and prompts, smaller models where possible, caching, context trimming and budgets."]],
 x: ["Using the largest model for every step"],
 d: "Lower cost per task with the same success rate.",
 min: 45
},
"w42-p": {
 m: "Your Phase 8 capstone: a genuinely useful agent with human approval, evals and tracing.",
 e: "A job-hunt agent that finds matching roles, tailors your resume bullets and drafts outreach emails, but never sends anything without your approval.",
 k: ["Search, parse and draft tools", "Memory of your profile and preferences", "Approval step before any send", "Evals and tracing"],
 t: ["Profile store with your skills and preferences", "Job search tool (job board APIs or search) with filters", "Resume bullet tailoring per role", "Email drafting with approval (drafts only)", "20-task eval suite + Langfuse traces", "Demo video and README"],
 q: [["How did you keep a human in control?", "The agent can only create drafts; sending requires explicit approval in the UI, and every action is logged."]],
 x: ["Auto-applying or auto-sending"],
 d: "Working agent with evals and approval flow.",
 min: 480
}
});
