/* Phase 9: Classical AI & Cognitive Computing (Weeks 43-45) */
window.LESSONS = window.LESSONS || {};
Object.assign(window.LESSONS, {

/* ---------- Week 43: Classical AI ---------- */
"w43-1": {
 m: "The agent-environment view from classical AI is the same framing used for today's LLM agents and robots.",
 e: "An agent senses its environment, decides and acts. Environments differ: fully or partly visible, predictable or random, one agent or many.",
 k: ["PEAS: performance, environment, actuators, sensors", "Reflex, model-based, goal-based, utility-based agents", "Environment types: observable, deterministic, episodic, static, discrete"],
 t: ["Read AIMA chapter 2 (or CS188 lecture 1)", "Write PEAS for a self-driving car, a chess bot and a customer-support LLM agent", "Classify each environment's properties"],
 q: [["What is a rational agent?", "One that chooses actions expected to maximise its performance measure given what it has perceived."]],
 x: ["Skipping the definitions; they appear in interviews"],
 d: "PEAS tables for three agents.",
 min: 45
},
"w43-2": {
 m: "Search algorithms power route planning, game AI, schedulers and even LLM tree search.",
 e: "Search explores possible moves like paths in a maze. BFS checks nearest paths first, DFS goes deep first, A* uses a smart guess of distance to the goal.",
 k: ["BFS: shortest path in unweighted graphs", "DFS: memory-light, not optimal", "Uniform-cost search for weighted graphs", "A*: f = g + h with an admissible heuristic", "Heuristics: Manhattan, Euclidean distance"],
 t: ["Implement BFS and A* on a grid maze", "Visualise explored cells for each", "Compare nodes explored", "Find a shortest route between Hyderabad metro stations with UCS using a small graph"],
 c: String.raw`import heapq
def astar(grid, start, goal):
    h = lambda p: abs(p[0] - goal[0]) + abs(p[1] - goal[1])
    frontier, came, g = [(h(start), start)], {start: None}, {start: 0}
    while frontier:
        _, cur = heapq.heappop(frontier)
        if cur == goal: break
        for d in ((0, 1), (1, 0), (0, -1), (-1, 0)):
            nxt = (cur[0] + d[0], cur[1] + d[1])
            if 0 <= nxt[0] < len(grid) and 0 <= nxt[1] < len(grid[0]) and grid[nxt[0]][nxt[1]] == 0:
                if nxt not in g or g[cur] + 1 < g[nxt]:
                    g[nxt] = g[cur] + 1; came[nxt] = cur; heapq.heappush(frontier, (g[nxt] + h(nxt), nxt))
    return came`,
 q: [["BFS vs DFS?", "BFS explores level by level and finds shortest paths in unweighted graphs; DFS goes deep first using less memory but isn't optimal."],
     ["What makes a heuristic admissible?", "It never overestimates the true cost to the goal, which guarantees A* finds an optimal path."]],
 x: ["Using a heuristic that overestimates"],
 d: "A* explores far fewer cells than BFS.",
 min: 75
},
"w43-3": {
 m: "Adversarial search is how classic game AI works, and the ideas return in AlphaGo-style systems.",
 e: "Minimax assumes you and your opponent both play perfectly: you pick the move that's best for you given their best reply. Alpha-beta skips moves that can't matter.",
 k: ["Game trees", "Minimax values", "Alpha-beta pruning", "Evaluation functions for deep games", "Monte Carlo Tree Search (MCTS)"],
 t: ["Implement minimax for tic-tac-toe", "Add alpha-beta and count nodes saved", "Play against it; it should never lose", "Read a short MCTS explainer"],
 q: [["How does alpha-beta pruning help?", "It skips branches that cannot affect the final decision, often reducing search dramatically without changing the result."],
     ["What is MCTS?", "Search that builds a tree by random playouts, balancing exploring new moves and exploiting good ones; used in AlphaGo."]],
 x: ["Forgetting to switch players between levels"],
 d: "Unbeatable tic-tac-toe with node counts.",
 min: 75
},
"w43-4": {
 m: "Constraint satisfaction solves scheduling, timetabling and puzzles, very common in real business problems.",
 e: "Variables, allowed values and rules. Find values for every variable that break no rule, like filling a Sudoku.",
 k: ["Variables, domains, constraints", "Backtracking search", "Constraint propagation (forward checking, AC-3)", "Heuristics: minimum remaining values", "OR-Tools CP-SAT for real problems"],
 t: ["Solve Sudoku with backtracking", "Add minimum-remaining-values ordering and compare speed", "Model a small class timetable with OR-Tools CP-SAT"],
 c: String.raw`def solve(b):
    for i in range(81):
        if b[i] == 0:
            r, c = divmod(i, 9)
            used = {b[r * 9 + k] for k in range(9)} | {b[k * 9 + c] for k in range(9)} | \
                   {b[(r // 3 * 3 + a) * 9 + c // 3 * 3 + d] for a in range(3) for d in range(3)}
            for v in range(1, 10):
                if v not in used:
                    b[i] = v
                    if solve(b): return True
            b[i] = 0
            return False
    return True`,
 q: [["What is a constraint satisfaction problem?", "Assigning values to variables from their domains so that all constraints are satisfied."],
     ["How does backtracking work?", "Assign values one at a time, and undo the last choice as soon as a constraint is violated."]],
 x: ["Brute force without pruning"],
 d: "Sudoku solved in under a second.",
 min: 60
},
"w43-5": {
 m: "Logic and knowledge representation are the roots of expert systems, knowledge graphs and today's neuro-symbolic AI.",
 e: "Write facts and rules precisely ('all humans are mortal; Kamal is human') so a computer can deduce new facts ('Kamal is mortal').",
 k: ["Propositional logic: AND, OR, NOT, IMPLIES", "First-order logic: predicates, variables, quantifiers", "Inference: modus ponens, resolution", "Forward and backward chaining", "Expert systems"],
 t: ["Write 10 facts and 5 rules about your family or a domain in Prolog-style or Python", "Implement forward chaining to derive new facts", "Try a small SAT problem with python-sat or Z3", "Write where logic beats ML and vice versa"],
 q: [["Forward vs backward chaining?", "Forward starts from facts and applies rules to derive everything; backward starts from a goal and works back to supporting facts."],
     ["Symbolic AI vs machine learning?", "Symbolic AI uses explicit rules and logic (interpretable, brittle); ML learns patterns from data (flexible, less interpretable)."]],
 x: ["Thinking symbolic AI is obsolete"],
 d: "Your rule engine derives new facts.",
 min: 60
},
"w43-p": {
 m: "Game and puzzle solvers are fun, visual proofs that you understand search and constraints.",
 e: "Build an unbeatable tic-tac-toe AI and a Sudoku solver with a simple UI.",
 k: ["Minimax with alpha-beta", "CSP backtracking with heuristics", "Streamlit or web UI"],
 t: ["Tic-tac-toe UI where you play the AI", "Sudoku solver that solves any valid puzzle and shows steps", "Measure solve time and nodes explored", "README explaining the algorithms"],
 q: [["How would you scale your game AI to chess?", "Depth-limited minimax with alpha-beta, a good evaluation function, move ordering, transposition tables, or MCTS with a learned policy."]],
 x: ["No explanation of the algorithm in the README"],
 d: "Both apps playable online.",
 min: 180
},

/* ---------- Week 44: Cognitive computing ---------- */
"w44-1": {
 m: "Cognitive computing is the idea of systems that perceive, reason, learn and talk. Knowing the term helps in enterprise and consulting conversations.",
 e: "It's an umbrella term (made famous by IBM Watson) for AI that mimics how people think: understanding language, using knowledge, reasoning with uncertainty and learning from interaction.",
 k: ["Perception: vision, speech", "Knowledge: graphs and ontologies", "Reasoning: logic and probability", "Learning: ML", "Interaction: natural conversation", "Today mostly realised with LLMs + tools + knowledge"],
 t: ["Read an overview of IBM Watson's Jeopardy system (DeepQA)", "Map each cognitive capability to what you've learned in this roadmap", "Write how a modern LLM agent covers or misses each"],
 q: [["What is cognitive computing?", "Systems that simulate human thought processes by combining language understanding, knowledge, reasoning and learning to assist decisions."],
     ["How does it relate to today's AI?", "LLMs with retrieval, tools and knowledge graphs now deliver most of the original cognitive computing vision."]],
 x: ["Treating it as a separate technology rather than a combination"],
 d: "Capability map written.",
 min: 45
},
"w44-2": {
 m: "Knowledge graphs store facts as connected entities, powering search, recommendations and GraphRAG.",
 e: "A knowledge graph is a web of facts: (Kamal)-[WORKS_AT]->(Deloitte), (Deloitte)-[LOCATED_IN]->(Hyderabad).",
 k: ["Nodes, relationships, properties", "Triples: subject, predicate, object", "Neo4j and Cypher", "Ontologies and RDF/SPARQL basics", "Extracting triples from text with LLMs"],
 t: ["Take a Neo4j GraphAcademy beginner course", "Create a graph of movies, actors and directors (Telugu cinema)", "Write 5 Cypher queries", "Extract triples from 5 news paragraphs with an LLM and load them"],
 c: String.raw`// Cypher
CREATE (r:Movie {title:"RRR", year:2022})
CREATE (s:Person {name:"S. S. Rajamouli"})-[:DIRECTED]->(r)
MATCH (p:Person)-[:DIRECTED]->(m:Movie) RETURN p.name, collect(m.title)`,
 q: [["Knowledge graph vs relational database?", "Graphs make relationships first-class and fast to traverse, which suits highly connected data and multi-hop queries."],
     ["What is GraphRAG?", "RAG that retrieves from a knowledge graph (entities and relationships, often with community summaries) to answer multi-hop or global questions."]],
 x: ["Inconsistent relationship names"],
 d: "A queryable graph built from text.",
 min: 75
},
"w44-3": {
 m: "Bayesian networks reason with uncertainty and are still used in medicine, risk and diagnostics.",
 e: "A graph of causes and effects with probabilities: if the grass is wet, how likely is it that it rained vs the sprinkler was on?",
 k: ["Directed acyclic graph of variables", "Conditional probability tables", "Inference: probability of causes given evidence", "Explaining away", "pgmpy library"],
 t: ["Build the rain/sprinkler/wet-grass network in pgmpy", "Query P(rain | wet grass)", "Add evidence that the sprinkler was on and observe explaining away", "Design a small network for a loan-default scenario"],
 q: [["What is a Bayesian network?", "A directed acyclic graph where nodes are variables and edges encode conditional dependencies, with probability tables for inference."],
     ["What is 'explaining away'?", "Evidence for one cause lowers the probability of another cause of the same effect."]],
 x: ["Adding cycles to the graph"],
 d: "You observed explaining away.",
 min: 60
},
"w44-4": {
 m: "Conversational AI is where perception, language and reasoning come together for users.",
 e: "A voice assistant listens (speech-to-text), understands intent, tracks the conversation state, decides a reply and speaks it back.",
 k: ["Intent detection and slot filling", "Dialogue state tracking", "Classic frameworks (Rasa) vs LLM-based assistants", "Speech in (ASR) and out (TTS)", "Handling interruptions and clarifications"],
 t: ["Design intents and slots for a train-ticket assistant", "Build it with an LLM + structured output for intents and slots", "Add Whisper for voice input and a TTS for voice output", "Test a conversation that needs clarification"],
 q: [["What are intents and slots?", "The intent is the user's goal (book_ticket); slots are the details needed (from, to, date)."]],
 x: ["Not asking clarifying questions when slots are missing"],
 d: "A voice conversation that books a mock ticket.",
 min: 75
},
"w44-5": {
 m: "Cognitive architectures and neuro-symbolic AI are active research directions for more reliable reasoning.",
 e: "Cognitive architectures model a whole mind (memory, attention, decision). Neuro-symbolic AI combines neural networks' learning with logic's precision.",
 k: ["SOAR and ACT-R: memory and production rules", "Working vs long-term memory", "Neuro-symbolic: LLM + solver, LLM + knowledge graph, program synthesis", "LLM agents as modern cognitive architectures"],
 t: ["Read an overview of SOAR and ACT-R", "Read about 'Cognitive Architectures for Language Agents (CoALA)'", "Build a tiny neuro-symbolic demo: LLM turns a word problem into Z3 constraints and the solver answers"],
 q: [["What is neuro-symbolic AI?", "Combining neural networks for perception and pattern learning with symbolic systems for logic and reasoning."]],
 x: ["Ignoring verification when combining LLMs and solvers"],
 d: "LLM + solver demo solves a puzzle.",
 min: 60
},
"w44-p": {
 m: "Knowledge-graph Q&A (GraphRAG) answers multi-hop questions that plain RAG struggles with.",
 e: "Build a graph from documents with an LLM, then answer questions by querying the graph.",
 k: ["LLM triple extraction", "Neo4j storage", "Text-to-Cypher with validation", "Compare with vector RAG"],
 t: ["Extract entities and relationships from 50+ documents", "Load into Neo4j", "LLM generates Cypher for user questions (read-only)", "Answer 15 multi-hop questions", "Compare accuracy with your vector RAG"],
 q: [["When is GraphRAG better than vector RAG?", "For multi-hop and aggregate questions across many documents, like 'which directors worked with actors who...'."]],
 x: ["Letting generated Cypher write to the database"],
 d: "Comparison table vs vector RAG.",
 min: 240
},

/* ---------- Week 45: Reinforcement learning ---------- */
"w45-1": {
 m: "RL is how agents learn from reward, from game AI to robotics to aligning LLMs.",
 e: "An agent tries actions, gets rewards or penalties, and learns a strategy (policy) that maximises total reward over time, like training a dog with treats.",
 k: ["Agent, environment, state, action, reward", "Markov decision process (MDP)", "Policy and value functions", "Discount factor gamma", "Exploration vs exploitation"],
 t: ["Watch the first lecture of David Silver's RL course or read Sutton & Barto chapter 1", "Solve a tiny grid world value iteration by hand for 2 steps", "Code value iteration for a 4x4 grid"],
 q: [["What is an MDP?", "States, actions, transition probabilities, rewards and a discount factor, where the future depends only on the current state."],
     ["Exploration vs exploitation?", "Trying new actions to learn more vs using the best-known action to gain reward."]],
 x: ["Rewards that accidentally encourage the wrong behaviour"],
 d: "Value iteration converges on your grid.",
 min: 60
},
"w45-2": {
 m: "Q-learning and DQN are the classic RL algorithms that learned to play Atari from pixels.",
 e: "Q-learning builds a cheat sheet: for each situation and action, how good is it? DQN replaces the cheat sheet with a neural network.",
 k: ["Q(s, a) update with the Bellman equation", "Epsilon-greedy exploration", "Experience replay", "Target network", "DQN for large state spaces"],
 t: ["Implement tabular Q-learning on FrozenLake", "Plot reward over episodes", "Tune epsilon decay", "Read the DQN Atari paper abstract and figure"],
 c: String.raw`import gymnasium as gym, numpy as np
env = gym.make("FrozenLake-v1", is_slippery=False)
Q = np.zeros((env.observation_space.n, env.action_space.n)); eps, a, g = 1.0, 0.8, 0.95
for ep in range(2000):
    s, _ = env.reset(); done = False
    while not done:
        act = env.action_space.sample() if np.random.rand() < eps else Q[s].argmax()
        s2, r, term, trunc, _ = env.step(act); done = term or trunc
        Q[s, act] += a * (r + g * Q[s2].max() - Q[s, act]); s = s2
    eps = max(0.05, eps * 0.995)`,
 q: [["Explain the Q-learning update.", "Move Q(s,a) toward the reward plus the discounted best Q-value of the next state."],
     ["Why does DQN use experience replay?", "Sampling past transitions randomly breaks correlations and stabilises training."]],
 x: ["Epsilon decaying too fast, so it never explores"],
 d: "Agent reliably reaches the goal.",
 min: 75
},
"w45-3": {
 m: "Policy gradients and PPO are the algorithms used in RLHF to train chat models.",
 e: "Instead of scoring actions, directly adjust the policy to make rewarding actions more likely. PPO does this carefully, in small safe steps.",
 k: ["Policy gradient: increase probability of actions with high return", "Advantage = better than expected?", "Actor-critic", "PPO: clipped updates for stability", "GRPO and similar variants used for LLM reasoning"],
 t: ["Read OpenAI Spinning Up's intro to policy optimisation", "Run PPO from stable-baselines3 on CartPole", "Plot learning curves", "Write how PPO is used in RLHF"],
 c: String.raw`from stable_baselines3 import PPO
model = PPO("MlpPolicy", "CartPole-v1", verbose=0).learn(total_timesteps=50_000)
model.save("ppo_cartpole")`,
 q: [["Why is PPO popular?", "Its clipped objective prevents destructively large policy updates, making training stable and simple to tune."],
     ["Value-based vs policy-based RL?", "Value-based learns action values and acts greedily; policy-based learns the policy directly and handles continuous actions well."]],
 x: ["Judging from one random seed"],
 d: "PPO solves CartPole.",
 min: 60
},
"w45-4": {
 m: "Gymnasium is the standard toolkit of RL environments; knowing it lets you try any algorithm quickly.",
 e: "Ready-made worlds (balancing poles, landing spacecraft, Atari games) with the same step/reset API.",
 k: ["env.reset(), env.step(action)", "Observation and action spaces", "Wrappers (record video, normalise)", "Custom environments"],
 t: ["Explore 5 environments and print their spaces", "Record a video of a random agent", "Write a custom environment (e.g. a simple inventory or traffic-light problem)", "Train PPO on your custom environment"],
 q: [["How would you frame a business problem as RL?", "Define state, actions, reward and episode; e.g. dynamic pricing with revenue as reward, with a simulator for safe training."]],
 x: ["Training on a real system without a simulator"],
 d: "A custom environment trained with PPO.",
 min: 75
},
"w45-5": {
 m: "Connecting RL back to LLMs closes the loop on how modern AI systems are aligned and taught to reason.",
 e: "In RLHF the 'environment' is a conversation, the 'action' is the model's reply, and the 'reward' comes from a model trained on human preferences.",
 k: ["Reward model from pairwise preferences", "PPO fine-tuning with a KL penalty to stay close to the base model", "DPO as a simpler alternative", "RL for reasoning with verifiable rewards (maths, code)", "Reward hacking"],
 t: ["Read the Hugging Face 'Illustrating RLHF' post", "Draw the RLHF pipeline", "Try a tiny DPO run with TRL on a small model (Colab)", "Write what reward hacking looks like in an LLM"],
 q: [["Why add a KL penalty in RLHF?", "To stop the model drifting too far from the base model and exploiting the reward model."],
     ["What is reward hacking?", "The model finds ways to score high reward without actually doing what was intended."]],
 x: ["Thinking RLHF adds knowledge"],
 d: "RLHF diagram and a tiny DPO run.",
 min: 75
},
"w45-p": {
 m: "Your Phase 9 capstone: a trained RL agent landing a spacecraft is a classic, visual achievement.",
 e: "Train an agent to land LunarLander and show a video of it.",
 k: ["PPO or DQN via stable-baselines3", "Hyperparameter tuning", "Video recording and learning curves"],
 t: ["Train PPO on LunarLander-v3", "Reach an average reward above 200", "Record videos at early, middle and final training", "Plot learning curves across 3 seeds", "Push the agent to the Hugging Face Hub with a video"],
 q: [["What was hardest about training the agent?", "Tuning and variance across seeds; describe what changes helped and how you measured them."]],
 x: ["Reporting a single lucky run"],
 d: "Average reward above 200 with a video.",
 min: 240
}
});
