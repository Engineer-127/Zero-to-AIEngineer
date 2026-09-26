/* Phase 4: Deep Learning (Weeks 18-24) */
window.LESSONS = window.LESSONS || {};
Object.assign(window.LESSONS, {

/* ---------- Week 18: Neural network fundamentals ---------- */
"w18-1": {
 m: "A neuron is the atom of every deep learning model, from image classifiers to GPT.",
 e: "A neuron takes inputs, multiplies each by a weight (how much it cares), adds a bias, and passes the total through an activation that decides how strongly to 'fire'.",
 k: ["output = activation(w · x + b)", "ReLU: max(0, x), the default", "Sigmoid: squashes to 0-1", "Tanh: squashes to -1 to 1", "Softmax: turns scores into probabilities that sum to 1"],
 t: ["Code a single neuron in NumPy with 3 inputs", "Implement ReLU, sigmoid, tanh and softmax", "Plot each activation from -5 to 5", "Build a layer of 4 neurons as one matrix multiply", "Explain why a network needs non-linear activations"],
 c: String.raw`import numpy as np
relu = lambda z: np.maximum(0, z)
sigmoid = lambda z: 1 / (1 + np.exp(-z))
def softmax(z):
    e = np.exp(z - z.max()); return e / e.sum()
x = np.array([0.5, -1.2, 3.0]); W = np.random.randn(4, 3); b = np.zeros(4)
print(relu(W @ x + b), softmax(np.array([2.0, 1.0, 0.1])))`,
 q: [["Why do we need non-linear activation functions?", "Without them, stacked layers collapse into one linear transformation and can't learn complex patterns."],
     ["Why is ReLU popular?", "It's cheap, doesn't saturate for positive values, so gradients flow well in deep networks."],
     ["What is the dying ReLU problem?", "Neurons stuck outputting zero never update; Leaky ReLU or GELU help."]],
 x: ["Softmax without subtracting the max (overflow)"],
 d: "You built a layer of neurons in NumPy.",
 min: 50
},
"w18-2": {
 m: "The loss function defines what 'good' means for your model. Choose wrong and it learns the wrong thing.",
 e: "The forward pass is the model's guess. The loss is the teacher's score of how wrong that guess was.",
 k: ["Forward pass: input through layers to output", "MSE for regression", "Cross-entropy for classification", "Loss is averaged over the batch"],
 t: ["Write a 2-layer network forward pass in NumPy", "Compute MSE for regression outputs", "Compute cross-entropy for softmax outputs by hand", "See how loss changes when the correct class probability goes from 0.9 to 0.1"],
 c: String.raw`import numpy as np
def cross_entropy(probs, label):
    return -np.log(probs[label] + 1e-12)
for p in (0.9, 0.5, 0.1):
    print(p, round(cross_entropy(np.array([p, 1 - p]), 0), 3))`,
 q: [["Why is cross-entropy better than MSE for classification?", "It heavily penalises confident wrong answers and gives stronger gradients with softmax."],
     ["What is a logit?", "The raw score before softmax or sigmoid."]],
 x: ["Applying softmax twice (once in the model, once in the loss)"],
 d: "You can compute loss for a batch by hand.",
 min: 45
},
"w18-3": {
 m: "Backpropagation is how every neural network learns. Understanding it removes the 'black box' feeling.",
 e: "After a wrong guess, blame flows backwards through the network. Each weight learns how much it contributed to the error and adjusts a little.",
 k: ["Chain rule applied layer by layer", "Gradients flow from loss back to each weight", "Local gradient × upstream gradient", "Then gradient descent updates weights"],
 t: ["Draw a tiny computation graph: loss = (w*x + b - y)^2", "Compute gradients by hand with the chain rule", "Verify with a numerical gradient", "Implement backprop for a 2-layer network on XOR in NumPy"],
 c: String.raw`import numpy as np
X = np.array([[0,0],[0,1],[1,0],[1,1]]); y = np.array([[0],[1],[1],[0]])
rng = np.random.default_rng(0); W1 = rng.normal(size=(2, 8)); W2 = rng.normal(size=(8, 1))
sig = lambda z: 1 / (1 + np.exp(-z))
for _ in range(5000):
    h = np.tanh(X @ W1); out = sig(h @ W2)
    d_out = (out - y) * out * (1 - out)
    d_h = d_out @ W2.T * (1 - h ** 2)
    W2 -= 0.5 * h.T @ d_out; W1 -= 0.5 * X.T @ d_h
print(out.round(2).ravel())`,
 q: [["Explain backpropagation.", "Computing the gradient of the loss with respect to each weight by applying the chain rule backwards from the output to the input."],
     ["What is the vanishing gradient problem?", "Gradients shrink as they pass back through many layers (e.g. sigmoid), so early layers barely learn."]],
 x: ["Memorising formulas without drawing the graph"],
 d: "Your NumPy network learns XOR.",
 min: 90
},
"w18-4": {
 m: "3Blue1Brown's neural network series is the clearest visual explanation of how networks learn.",
 e: "Watch it after coding XOR and everything will click into place.",
 k: ["What is a neural network (layers as feature detectors)", "Gradient descent in weight space", "Backprop intuitively and with calculus", "Transformers and attention (later chapters)"],
 t: ["Watch chapters 1-4", "Pause and sketch the digit network", "Write a 5-sentence explanation of backprop in your own words", "Watch the attention chapters and bookmark them for week 23"],
 q: [["How would you explain a neural network to a 10-year-old?", "Layers of tiny decision-makers; each looks at what the previous layer noticed and passes on what it finds, and they all get corrected when the final answer is wrong."]],
 x: ["Passive watching; pause and predict what comes next"],
 d: "Your own 5-sentence backprop explanation.",
 min: 90
},
"w18-5": {
 m: "Building autograd yourself (micrograd) is the single best exercise to truly understand PyTorch.",
 e: "Karpathy builds a tiny engine that tracks every operation and computes gradients automatically, in about 100 lines.",
 k: ["Value object storing data and grad", "Operations record their children", "Topological sort then backward()", "A tiny MLP on top"],
 t: ["Watch 'The spelled-out intro to neural networks and backpropagation: building micrograd'", "Code along, don't copy-paste", "Train the tiny MLP on a toy dataset", "Push micrograd to GitHub with notes"],
 c: String.raw`class Value:
    def __init__(self, data, _children=()):
        self.data, self.grad, self._prev, self._backward = data, 0.0, set(_children), lambda: None
    def __mul__(self, other):
        out = Value(self.data * other.data, (self, other))
        def _backward():
            self.grad += other.data * out.grad; other.grad += self.data * out.grad
        out._backward = _backward
        return out`,
 q: [["What is automatic differentiation?", "Recording operations in a graph during the forward pass, then applying the chain rule backwards to get exact gradients."],
     ["Why do gradients accumulate with += ?", "A value used in several places receives gradient from each use, and they must be summed."]],
 x: ["Copying the code without typing it yourself"],
 d: "Your micrograd trains a tiny network.",
 min: 180
},
"w18-p": {
 m: "Solving XOR with a network you wrote yourself proves you understand the core mechanics.",
 e: "XOR can't be solved by a straight line, so it needs a hidden layer. That's why deep learning exists.",
 k: ["Hidden layer + non-linearity", "Training loop in NumPy", "Decision boundary plot"],
 t: ["Clean up your NumPy XOR network into a class with forward, backward and train", "Plot the loss curve", "Plot the decision boundary", "Show that removing the activation makes it fail", "README explaining why XOR needs a hidden layer"],
 q: [["Why can't a single-layer perceptron solve XOR?", "XOR isn't linearly separable, so no single straight line splits the classes."]],
 x: ["Too few hidden units or too small a learning rate"],
 d: "Decision boundary plot shows XOR solved.",
 min: 120
},

/* ---------- Week 19: PyTorch ---------- */
"w19-1": {
 m: "PyTorch is the industry-standard deep learning framework; tensors and autograd are its core.",
 e: "A tensor is a NumPy array that can live on a GPU and remembers how it was calculated, so it can compute gradients for you.",
 k: ["torch.tensor, torch.randn, .shape, .dtype", ".to('cuda' or 'mps') for GPU", "requires_grad=True tracks operations", "loss.backward() fills .grad", "torch.no_grad() for inference"],
 t: ["Create tensors and do NumPy-style operations", "Move a tensor to GPU (Colab) or MPS (Mac)", "Fit y = 3x + 7 using autograd instead of hand-written gradients", "Compare speed of a big matrix multiply on CPU vs GPU"],
 c: String.raw`import torch
x = torch.linspace(0, 10, 100); y = 3 * x + 7 + torch.randn(100)
w = torch.zeros(1, requires_grad=True); b = torch.zeros(1, requires_grad=True)
for _ in range(2000):
    loss = ((w * x + b - y) ** 2).mean()
    loss.backward()
    with torch.no_grad():
        w -= 0.01 * w.grad; b -= 0.01 * b.grad
        w.grad.zero_(); b.grad.zero_()
print(w.item(), b.item())`,
 q: [["Why do we zero gradients each step?", "PyTorch accumulates gradients by default, so old gradients would add to new ones."],
     ["What does torch.no_grad() do?", "Turns off gradient tracking, saving memory and time during inference or manual updates."]],
 x: ["Forgetting to zero gradients"],
 d: "Autograd fits the line.",
 min: 50
},
"w19-2": {
 m: "Datasets and DataLoaders feed data efficiently in batches. Every PyTorch project uses them.",
 e: "Dataset is the library catalogue (how to get item i). DataLoader is the librarian who hands you shuffled stacks of books (batches).",
 k: ["Custom Dataset with __len__ and __getitem__", "DataLoader(batch_size, shuffle, num_workers)", "torchvision.datasets for standard data", "Transforms for preprocessing"],
 t: ["Write a Dataset for a CSV (Titanic features and label)", "Wrap it in a DataLoader with batch size 32", "Iterate one epoch and print batch shapes", "Load FashionMNIST with torchvision and a ToTensor transform"],
 c: String.raw`import torch
from torch.utils.data import Dataset, DataLoader
class TabularDS(Dataset):
    def __init__(self, X, y):
        self.X = torch.tensor(X, dtype=torch.float32); self.y = torch.tensor(y, dtype=torch.float32)
    def __len__(self): return len(self.y)
    def __getitem__(self, i): return self.X[i], self.y[i]
dl = DataLoader(TabularDS(X_np, y_np), batch_size=32, shuffle=True)
xb, yb = next(iter(dl)); print(xb.shape, yb.shape)`,
 q: [["Why shuffle training data?", "So batches aren't ordered in a way that biases learning, which improves generalisation."],
     ["What does num_workers do?", "Loads batches in parallel background processes to keep the GPU busy."]],
 x: ["Shuffling the validation loader (harmless but pointless)"],
 d: "Your custom Dataset works with a DataLoader.",
 min: 50
},
"w19-3": {
 m: "The training loop is the heartbeat of deep learning. You'll write it hundreds of times.",
 e: "For each batch: guess, measure the error, find who's to blame, adjust. Repeat for many epochs.",
 k: ["nn.Module with __init__ and forward", "nn.Linear, nn.ReLU, nn.Sequential", "Optimiser: torch.optim.Adam", "Loop: zero_grad, forward, loss, backward, step", "model.train() and model.eval()"],
 t: ["Define an MLP as an nn.Module", "Write a full training loop with validation each epoch", "Print train and val loss per epoch", "Save the best model with torch.save(model.state_dict())"],
 c: String.raw`import torch, torch.nn as nn
class MLP(nn.Module):
    def __init__(self, n_in, n_out):
        super().__init__()
        self.net = nn.Sequential(nn.Linear(n_in, 128), nn.ReLU(), nn.Linear(128, n_out))
    def forward(self, x): return self.net(x)
model = MLP(784, 10); opt = torch.optim.Adam(model.parameters(), 1e-3); lossf = nn.CrossEntropyLoss()
for epoch in range(5):
    model.train()
    for xb, yb in train_dl:
        opt.zero_grad(); loss = lossf(model(xb.view(len(xb), -1)), yb); loss.backward(); opt.step()`,
 q: [["What are the steps in a PyTorch training loop?", "zero gradients, forward pass, compute loss, backward, optimiser step."],
     ["Why call model.eval()?", "It switches layers like dropout and batch norm to inference behaviour."]],
 x: ["Forgetting model.eval() during validation"],
 d: "Your loop prints falling train and val loss.",
 min: 60
},
"w19-4": {
 m: "MNIST is the 'hello world' of deep learning; getting 97%+ proves your loop works.",
 e: "Teach a network to read handwritten digits from 28x28 pixel images.",
 k: ["Flatten images to 784 inputs", "10 output logits, CrossEntropyLoss", "Accuracy = argmax matches label"],
 t: ["Load MNIST or FashionMNIST", "Train your MLP for 5-10 epochs", "Reach 97%+ on MNIST (88%+ on FashionMNIST)", "Show 10 wrong predictions with their images", "Plot train vs val loss"],
 q: [["Your model gets 99% train and 85% test accuracy. What do you do?", "It's overfitting: add regularisation (dropout, weight decay), augmentation, more data or early stopping."]],
 x: ["Evaluating accuracy on the training set only"],
 d: "97%+ test accuracy with a mistakes gallery.",
 min: 75
},
"w19-5": {
 m: "Free GPUs let you train real models without buying hardware.",
 e: "Colab and Kaggle rent you a GPU for free in the browser, with limits.",
 k: ["Colab: Runtime > Change runtime type > GPU", "Kaggle: 30 GPU hours a week", "device = 'cuda' if torch.cuda.is_available() else 'cpu'", "Move both model and batches to the device", "Save checkpoints to Drive or Kaggle output"],
 t: ["Run your MNIST notebook on Colab GPU", "Time an epoch on CPU vs GPU", "Try the same on Kaggle", "Save a checkpoint and reload it after a session reset"],
 c: String.raw`device = "cuda" if torch.cuda.is_available() else ("mps" if torch.backends.mps.is_available() else "cpu")
model = model.to(device)
for xb, yb in train_dl:
    xb, yb = xb.to(device), yb.to(device)`,
 q: [["Why are GPUs faster for deep learning?", "Thousands of cores run the same matrix operations in parallel."]],
 x: ["Model on GPU but data on CPU (device mismatch error)"],
 d: "Measured GPU speedup.",
 min: 40
},
"w19-p": {
 m: "A drawing-pad demo makes your first deep learning model interactive and fun to share.",
 e: "Draw a digit in the browser, and your PyTorch model guesses it live.",
 k: ["Small CNN or MLP trained on MNIST", "Gradio Sketchpad input", "Preprocess the drawing to 28x28"],
 t: ["Train and save the model", "Build a Gradio app with a Sketchpad", "Resize, invert and normalise the drawing like MNIST", "Show top-3 probabilities", "Deploy to Hugging Face Spaces"],
 q: [["Why did your model struggle with some drawings?", "Distribution shift: user drawings differ from MNIST in thickness, centring and size; preprocessing and augmentation help."]],
 x: ["Forgetting that MNIST is white-on-black"],
 d: "A live link where friends can draw digits.",
 min: 150
},

/* ---------- Week 20: Training networks well ---------- */
"w20-1": {
 m: "The optimiser decides how weights move. AdamW is the default for transformers today.",
 e: "SGD walks downhill. Momentum is a ball that builds speed. Adam adapts the step size for each weight.",
 k: ["SGD: w -= lr * grad", "Momentum smooths updates", "Adam: adaptive per-parameter learning rates", "AdamW: Adam with proper weight decay"],
 t: ["Train the same MNIST model with SGD, SGD+momentum, Adam and AdamW", "Plot all four loss curves on one chart", "Note which converges fastest"],
 q: [["Adam vs SGD?", "Adam adapts learning rates per parameter and converges fast with little tuning; well-tuned SGD with momentum can generalise slightly better in some vision tasks."],
     ["What's the difference between Adam and AdamW?", "AdamW decouples weight decay from the gradient update, which regularises correctly."]],
 x: ["Using the same learning rate for SGD and Adam"],
 d: "One chart comparing four optimisers.",
 min: 50
},
"w20-2": {
 m: "The learning rate is the most important hyperparameter. Schedules make training faster and more stable.",
 e: "Take big steps when far from the goal, small careful steps as you get close. Warm-up is stretching before a run.",
 k: ["StepLR, CosineAnnealingLR, OneCycleLR", "Warm-up for transformers", "LR finder: increase LR until loss explodes", "scheduler.step() placement"],
 t: ["Plot 3 schedules over 20 epochs", "Train with constant LR vs cosine schedule and compare", "Run an LR range test and pick an LR", "Add warm-up for the first 5% of steps"],
 c: String.raw`sched = torch.optim.lr_scheduler.OneCycleLR(opt, max_lr=3e-3, total_steps=len(train_dl) * epochs)
for epoch in range(epochs):
    for xb, yb in train_dl:
        opt.zero_grad(); lossf(model(xb), yb).backward(); opt.step(); sched.step()`,
 q: [["Why use learning-rate warm-up?", "Early updates with random weights can be unstable; ramping up the LR avoids blowing up training, especially in transformers."]],
 x: ["Calling scheduler.step() per epoch when it's designed per batch"],
 d: "Scheduled run beats constant LR.",
 min: 50
},
"w20-3": {
 m: "Regularisation is how big networks generalise instead of memorising.",
 e: "Dropout randomly switches off neurons during training so none become lazy. Weight decay keeps weights small. Early stopping quits when the practice test stops improving.",
 k: ["nn.Dropout(p=0.1-0.5)", "weight_decay in the optimiser", "Early stopping with patience", "Data augmentation as regularisation"],
 t: ["Make your MNIST MLP bigger until it overfits", "Add dropout and compare", "Add weight decay and compare", "Implement early stopping with patience=3", "Table of results"],
 c: String.raw`best, patience, bad = float("inf"), 3, 0
for epoch in range(100):
    train_one_epoch(); val = evaluate()
    if val < best: best, bad = val, 0; torch.save(model.state_dict(), "best.pt")
    else:
        bad += 1
        if bad >= patience: break`,
 q: [["How does dropout work?", "During training it randomly zeroes activations with probability p, forcing redundancy; at inference all units are used."],
     ["Why is dropout turned off at inference?", "You want deterministic, full-strength predictions; scaling during training keeps expected values consistent."]],
 x: ["Leaving the model in train mode during evaluation"],
 d: "Regularised model has a smaller train/val gap.",
 min: 60
},
"w20-4": {
 m: "Normalisation layers make deep networks trainable. LayerNorm is inside every transformer.",
 e: "Normalisation re-centres the numbers flowing between layers so each layer gets inputs in a comfortable range.",
 k: ["BatchNorm: normalise across the batch (CNNs)", "LayerNorm: normalise across features (transformers)", "Learnable scale and shift", "Behaves differently in train and eval (BatchNorm)"],
 t: ["Add BatchNorm to your MLP and compare training speed", "Swap to LayerNorm", "Train with batch size 2 and see BatchNorm struggle", "Write when to use each"],
 q: [["BatchNorm vs LayerNorm?", "BatchNorm normalises each feature over the batch and depends on batch size; LayerNorm normalises over features per sample, so it works with any batch size and sequences."]],
 x: ["Tiny batches with BatchNorm"],
 d: "You can say which norm a transformer uses and why.",
 min: 45
},
"w20-5": {
 m: "Bad initialisation can stop a network from learning at all. Knowing why helps you debug.",
 e: "Start weights too big and signals explode; too small and they vanish. Good init keeps signal strength steady through the layers.",
 k: ["Xavier/Glorot init for tanh", "Kaiming/He init for ReLU", "Vanishing and exploding gradients", "Gradient clipping for exploding gradients", "Residual connections help very deep nets"],
 t: ["Build a 20-layer MLP with sigmoid and default init; watch it fail", "Switch to ReLU + Kaiming init", "Log gradient norms per layer", "Add gradient clipping with clip_grad_norm_"],
 c: String.raw`for m in model.modules():
    if isinstance(m, nn.Linear):
        nn.init.kaiming_normal_(m.weight, nonlinearity="relu"); nn.init.zeros_(m.bias)
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)`,
 q: [["How do you fix exploding gradients?", "Gradient clipping, lower learning rate, better initialisation, normalisation layers."],
     ["Why do residual connections help?", "They give gradients a direct path backwards, so very deep networks still train."]],
 x: ["Initialising all weights to zero (every neuron learns the same thing)"],
 d: "Your 20-layer net trains after the fixes.",
 min: 50
},
"w20-6": {
 m: "Experiment tracking is how teams compare runs. W&B is used widely in industry and research.",
 e: "Weights & Biases is a dashboard that records every training run's settings and curves automatically.",
 k: ["wandb.init(project, config)", "wandb.log({'loss': ..., 'acc': ...})", "Compare runs side by side", "TensorBoard as a local alternative"],
 t: ["Create a free W&B account", "Log your MNIST runs from this week", "Compare optimiser runs in one chart", "Share a report link in your README"],
 c: String.raw`import wandb
wandb.init(project="zero-to-ai", config={"lr": 1e-3, "opt": "adamw", "dropout": 0.2})
for epoch in range(10):
    wandb.log({"train_loss": tl, "val_loss": vl, "val_acc": va, "epoch": epoch})`,
 q: [["How do you keep track of many experiments?", "An experiment tracker (W&B, MLflow) logging config, metrics, code version and artifacts for every run."]],
 x: ["Not logging the config, so you can't reproduce the best run"],
 d: "A W&B report with 10 runs.",
 min: 40
},
"w20-p": {
 m: "Writing up what actually changed results is how you learn empirical deep learning, and how researchers think.",
 e: "Run 10 controlled experiments on one model and write a short report of what mattered.",
 k: ["Change one thing per run", "Same seed and data", "Tracked in W&B"],
 t: ["Choose a baseline (FashionMNIST MLP)", "Run 10 experiments: optimisers, LR, schedule, dropout, weight decay, batch size, width, depth, norm, init", "Put results in a table", "Write 5 conclusions", "Publish the W&B report link"],
 q: [["What had the biggest effect in your experiments?", "Usually learning rate and schedule; explain with your numbers."]],
 x: ["Different seeds per run, so noise hides the effect"],
 d: "Results table plus 5 conclusions.",
 min: 180
},

/* ---------- Week 21: CNNs ---------- */
"w21-1": {
 m: "Convolutions are how networks see. They power image models, and inspired ideas used across deep learning.",
 e: "A small filter slides across the image like a magnifying glass looking for one pattern (an edge, a corner) everywhere.",
 k: ["Kernel/filter size (3x3)", "Stride: how far the filter moves", "Padding keeps the size", "Pooling downsamples", "Output size = (W - K + 2P) / S + 1", "Parameter sharing makes CNNs efficient"],
 t: ["Apply a hand-made edge filter to an image with scipy or torch.conv2d", "Compute output sizes for 3 settings by hand, then check", "Build a small CNN (2 conv + pool layers) for FashionMNIST", "Compare accuracy and parameter count with your MLP"],
 c: String.raw`import torch.nn as nn
cnn = nn.Sequential(
    nn.Conv2d(1, 32, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
    nn.Conv2d(32, 64, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
    nn.Flatten(), nn.Linear(64 * 7 * 7, 128), nn.ReLU(), nn.Linear(128, 10))
print(sum(p.numel() for p in cnn.parameters()))`,
 q: [["Why CNNs over MLPs for images?", "They exploit spatial structure with shared filters, so far fewer parameters and translation-aware features."],
     ["Compute output size of a 32x32 input, 5x5 kernel, stride 1, no padding.", "28x28."],
     ["What does pooling do?", "Downsamples feature maps, reducing computation and adding small translation invariance."]],
 x: ["Wrong flatten size after convolutions"],
 d: "Your CNN beats your MLP with fewer parameters.",
 min: 75
},
"w21-2": {
 m: "Knowing the classic architectures helps you read papers and pick pretrained models.",
 e: "Each architecture was a breakthrough: LeNet read cheques, AlexNet won ImageNet with GPUs, VGG went deeper, ResNet added shortcuts to go really deep.",
 k: ["LeNet-5 (1998)", "AlexNet (2012): ReLU, dropout, GPUs", "VGG: stacks of 3x3 convs", "ResNet: residual/skip connections, 50-152 layers", "Modern: EfficientNet, ConvNeXt"],
 t: ["Implement a basic residual block in PyTorch", "Load resnet18 from torchvision and print its structure", "Count parameters of resnet18 vs vgg16", "Write one sentence on what each architecture contributed"],
 c: String.raw`class ResBlock(nn.Module):
    def __init__(self, c):
        super().__init__()
        self.body = nn.Sequential(nn.Conv2d(c, c, 3, padding=1), nn.BatchNorm2d(c), nn.ReLU(),
                                  nn.Conv2d(c, c, 3, padding=1), nn.BatchNorm2d(c))
    def forward(self, x): return torch.relu(x + self.body(x))`,
 q: [["What problem did ResNet solve?", "Degradation in very deep networks; skip connections let gradients flow so 100+ layer nets train well."]],
 x: ["Only memorising names without the key idea of each"],
 d: "You coded a residual block.",
 min: 50
},
"w21-3": {
 m: "Augmentation is free extra data and one of the most effective ways to improve vision models.",
 e: "Show the model the same photo flipped, rotated, cropped and recoloured, so it learns the object, not the exact pixels.",
 k: ["RandomHorizontalFlip, RandomResizedCrop, ColorJitter, RandomRotation", "Only augment training data", "Pick augmentations that keep the label true", "Albumentations library for more options"],
 t: ["Build a torchvision transform pipeline", "Visualise 9 augmented versions of one image", "Train your CNN with and without augmentation", "Compare validation accuracy"],
 c: String.raw`from torchvision import transforms as T
train_tf = T.Compose([T.RandomResizedCrop(224, scale=(0.7, 1)), T.RandomHorizontalFlip(),
                      T.ColorJitter(0.2, 0.2, 0.2), T.ToTensor(), T.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])])
val_tf = T.Compose([T.Resize(256), T.CenterCrop(224), T.ToTensor(), T.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])])`,
 q: [["When could augmentation hurt?", "When it changes the label, e.g. flipping digits 6/9 or text, or vertical flips for street scenes."]],
 x: ["Augmenting the validation set"],
 d: "Augmentation improves your validation score.",
 min: 50
},
"w21-4": {
 m: "Transfer learning lets you build great vision models with a few hundred images. It's how most real projects start.",
 e: "Borrow a model that already learned to see from millions of images, and just teach it your new categories.",
 k: ["Load pretrained weights (torchvision, timm)", "Replace the final layer", "Freeze the backbone, train the head", "Then unfreeze and fine-tune with a small LR", "Use the same normalisation as pretraining"],
 t: ["Download a small dataset (e.g. 5 Indian food classes)", "Load resnet18 or efficientnet from timm", "Train only the new head for 3 epochs", "Unfreeze and fine-tune 3 more epochs at a lower LR", "Compare with training from scratch"],
 c: String.raw`import timm, torch.nn as nn
model = timm.create_model("resnet18", pretrained=True, num_classes=5)
for p in model.parameters(): p.requires_grad = False
for p in model.get_classifier().parameters(): p.requires_grad = True`,
 q: [["What is transfer learning?", "Reusing a model trained on a large dataset as the starting point for a related task."],
     ["When would you freeze layers?", "With little data, freeze early layers (generic features) and train later layers and the head."]],
 x: ["Fine-tuning everything with a high LR and destroying the pretrained features"],
 d: "Pretrained model clearly beats from-scratch.",
 min: 75
},
"w21-5": {
 m: "fast.ai's top-down approach gets you to state-of-the-art results fast and teaches practical tricks.",
 e: "Build a working model in lesson 1, then learn how it works in later lessons.",
 k: ["Lesson 1: image classifier in minutes", "Lesson 2: deployment", "Lesson 3: how a neural net works"],
 t: ["Watch lessons 1-3 of Practical Deep Learning", "Run the Kaggle notebooks", "Build the 'is it a bird?' classifier with your own classes"],
 q: [["What's the fastest way to get a strong baseline image classifier?", "Fine-tune a pretrained model with sensible augmentation and a learning-rate finder."]],
 x: ["Skipping the notebooks"],
 d: "Lessons 1-3 done with your own classifier.",
 min: 240
},
"w21-p": {
 m: "A real image classifier on Indian food or plant disease is a relatable, impressive portfolio piece.",
 e: "Fine-tune a pretrained CNN on your chosen dataset and deploy a demo.",
 k: ["Transfer learning + augmentation", "Confusion matrix to see confused classes", "Grad-CAM to show where the model looks"],
 t: ["Choose Indian food (Kaggle 'Indian Food Images') or PlantVillage", "Fine-tune with augmentation", "Report accuracy and a confusion matrix", "Add Grad-CAM heatmaps for 5 images", "Gradio demo on Hugging Face Spaces"],
 q: [["How did you check the model looks at the right thing?", "Grad-CAM heatmaps showed it focuses on the food or leaf, not the background."]],
 x: ["Data leakage from near-duplicate images across splits"],
 d: "Live demo with Grad-CAM.",
 min: 240
},

/* ---------- Week 22: Sequence models ---------- */
"w22-1": {
 m: "RNNs introduce memory across time steps, the idea behind all sequence models.",
 e: "An RNN reads a sentence one word at a time and keeps a running summary (hidden state) of what it has read so far.",
 k: ["Hidden state h_t = tanh(W x_t + U h_(t-1) + b)", "Same weights at every step", "Backpropagation through time (BPTT)", "Vanishing gradients over long sequences"],
 t: ["Implement an RNN step in NumPy", "Run it over a sequence of 10 inputs", "Use nn.RNN to predict the next value of a sine wave", "Show it struggles with very long dependencies"],
 c: String.raw`rnn = nn.RNN(input_size=1, hidden_size=32, batch_first=True)
head = nn.Linear(32, 1)
out, h = rnn(x_seq)          # x_seq: (batch, time, 1)
pred = head(out[:, -1])`,
 q: [["What is backpropagation through time?", "Unrolling the RNN over the sequence and applying backprop through all time steps."],
     ["Why do plain RNNs struggle with long sequences?", "Gradients vanish or explode as they're multiplied through many steps."]],
 x: ["Confusing batch_first shapes"],
 d: "Your RNN predicts a sine wave.",
 min: 60
},
"w22-2": {
 m: "LSTMs and GRUs fixed the memory problem of RNNs and still appear in time-series and speech work.",
 e: "An LSTM has gates, like doors that decide what to remember, what to forget and what to output.",
 k: ["Forget, input and output gates", "Cell state carries long-term memory", "GRU: simpler, 2 gates", "Bidirectional variants"],
 t: ["Swap nn.RNN for nn.LSTM and nn.GRU on the sine task", "Try a longer sequence and compare", "Train an LSTM on a stock or temperature series", "Compare with your week-16 lag-feature model"],
 q: [["How does an LSTM solve vanishing gradients?", "Its cell state is updated additively through gates, giving gradients a more direct path across time."],
     ["LSTM vs GRU?", "GRU merges gates and has fewer parameters, often similar accuracy and faster."]],
 x: ["Assuming LSTMs beat simple baselines on every time series"],
 d: "LSTM beats plain RNN on long sequences.",
 min: 60
},
"w22-3": {
 m: "Embeddings turn words into vectors with meaning, the input layer of every language model.",
 e: "Words used in similar contexts get similar vectors: 'king' is near 'queen', and 'Hyderabad' is near 'Bengaluru'.",
 k: ["One-hot vs dense embeddings", "Word2Vec: skip-gram and CBOW", "GloVe: co-occurrence statistics", "nn.Embedding layer", "Vector arithmetic: king - man + woman ≈ queen"],
 t: ["Load pretrained GloVe vectors with gensim", "Find nearest words to 'cricket', 'python', 'hyderabad'", "Try analogies", "Use nn.Embedding in a small model"],
 c: String.raw`import gensim.downloader as api
wv = api.load("glove-wiki-gigaword-100")
print(wv.most_similar("cricket", topn=5))
print(wv.most_similar(positive=["king", "woman"], negative=["man"], topn=1))`,
 q: [["What is a word embedding?", "A dense vector representing a word so that similar words have similar vectors."],
     ["Static vs contextual embeddings?", "Word2Vec gives one vector per word; transformers give a different vector depending on context ('bank' of a river vs money)."]],
 x: ["Forgetting static embeddings can't handle multiple meanings"],
 d: "You ran analogies with GloVe.",
 min: 50
},
"w22-4": {
 m: "Attention was invented to fix seq2seq translation, and it became the core of transformers.",
 e: "Instead of cramming a whole sentence into one summary, the decoder looks back at every input word and focuses on the relevant ones.",
 k: ["Encoder-decoder (seq2seq)", "Bottleneck of a single context vector", "Attention weights = softmax of similarity scores", "Weighted sum of encoder states"],
 t: ["Read 'Visualizing A Neural Machine Translation Model' by Jay Alammar", "Compute attention by hand for 3 encoder vectors and 1 query", "Draw an attention heatmap for a toy example"],
 c: String.raw`import numpy as np
enc = np.array([[1, 0], [0, 1], [1, 1]], float); query = np.array([1, 0.2])
scores = enc @ query; weights = np.exp(scores) / np.exp(scores).sum()
print(weights.round(3), weights @ enc)`,
 q: [["What problem did attention solve?", "The fixed-size bottleneck in seq2seq; the decoder can directly access all encoder states."]],
 x: ["Thinking attention only exists in transformers"],
 d: "You computed attention weights by hand.",
 min: 45
},
"w22-5": {
 m: "makemore builds language models step by step, from counting to neural nets. It's the bridge to GPT.",
 e: "Karpathy builds a model that invents new names, first by counting letter pairs, then with neural networks.",
 k: ["Bigram model by counting", "Negative log-likelihood", "MLP language model", "Sampling from probabilities"],
 t: ["Watch makemore parts 1-2", "Code along", "Train on a list of Indian names", "Sample 20 new names"],
 q: [["What is a bigram language model?", "Predicts the next character or word using only the previous one, from counted frequencies."],
     ["How do you sample from a language model?", "Turn logits into probabilities, then draw from that distribution (optionally with temperature)."]],
 x: ["Skipping the counting version, which builds intuition"],
 d: "You generated new names.",
 min: 180
},
"w22-p": {
 m: "A name generator is a fun, shareable first language model.",
 e: "Train a character-level model on Indian names and generate new ones that sound real.",
 k: ["Character vocabulary", "MLP or LSTM language model", "Temperature sampling"],
 t: ["Collect 5,000+ Indian first names (Kaggle or GitHub lists)", "Train a char-level MLP or LSTM", "Sample with temperatures 0.5, 1.0, 1.5 and compare", "Filter out names that exist in training data", "Small Gradio app"],
 q: [["What does temperature do in sampling?", "Lower temperature makes outputs safer and more repetitive; higher makes them more creative and random."]],
 x: ["Only showing names copied from training data"],
 d: "Demo that generates new names.",
 min: 150
},

/* ---------- Week 23: Transformers ---------- */
"w23-1": {
 m: "Self-attention is the core of every modern LLM. Understanding Q, K, V is non-negotiable for AI engineers.",
 e: "Each word asks a question (query), each word advertises what it contains (key), and each word carries information (value). Words gather information from others whose keys match their question.",
 k: ["Q = XW_q, K = XW_k, V = XW_v", "scores = QK^T / sqrt(d_k)", "softmax over scores", "output = weights @ V", "Causal mask for GPT-style models"],
 t: ["Implement scaled dot-product attention in PyTorch", "Apply a causal mask", "Check against torch.nn.functional.scaled_dot_product_attention", "Visualise the attention matrix for a short sentence"],
 c: String.raw`import torch, math
def attention(Q, K, V, causal=False):
    scores = Q @ K.transpose(-2, -1) / math.sqrt(Q.size(-1))
    if causal:
        T = scores.size(-1); scores = scores.masked_fill(torch.triu(torch.ones(T, T), 1).bool(), float("-inf"))
    return torch.softmax(scores, -1) @ V`,
 q: [["Explain self-attention.", "Every token computes similarity between its query and all keys, turns them into weights with softmax, and takes a weighted sum of values."],
     ["Why divide by sqrt(d_k)?", "To keep dot products from growing with dimension, which would make softmax too peaky and gradients tiny."],
     ["What's the complexity of attention?", "O(n²) in sequence length, which is why long contexts are expensive."]],
 x: ["Forgetting the causal mask in a decoder"],
 d: "Your attention matches PyTorch's.",
 min: 75
},
"w23-2": {
 m: "Multi-head attention and positional encodings are the remaining pieces of the transformer block.",
 e: "Multiple heads are like several readers each paying attention to different things (grammar, meaning, names). Positional encoding tells the model word order.",
 k: ["Split d_model into h heads, attend in parallel, concatenate", "Sinusoidal vs learned positional embeddings", "RoPE in modern LLMs", "Transformer block: attention + MLP + residuals + LayerNorm"],
 t: ["Implement multi-head attention as an nn.Module", "Add sinusoidal positional encoding and plot it", "Assemble a full transformer block", "Count its parameters"],
 q: [["Why multiple heads?", "Each head can focus on different relationships in different subspaces."],
     ["Why do transformers need positional encoding?", "Attention is order-agnostic; without position information, 'dog bites man' equals 'man bites dog'."]],
 x: ["Mixing up head dimension reshapes"],
 d: "A working transformer block.",
 min: 75
},
"w23-3": {
 m: "Knowing encoder vs decoder models tells you which model to pick for a task.",
 e: "Encoders (BERT) read the whole text to understand it. Decoders (GPT) write text one token at a time. Encoder-decoders (T5) read then write.",
 k: ["BERT: bidirectional, masked LM, good for classification and embeddings", "GPT: causal, next-token prediction, generation", "T5/BART: translation and summarisation", "Most modern LLMs are decoder-only"],
 t: ["Run a BERT fill-mask pipeline", "Run a GPT-2 text-generation pipeline", "Run a T5 summarisation pipeline", "Make a table: model family, training objective, best tasks"],
 c: String.raw`from transformers import pipeline
print(pipeline("fill-mask", model="bert-base-uncased")("Hyderabad is famous for its [MASK]."))
print(pipeline("text-generation", model="gpt2")("The future of AI in India", max_new_tokens=30))`,
 q: [["BERT vs GPT?", "BERT is an encoder trained with masked language modelling for understanding; GPT is a decoder trained to predict the next token for generation."],
     ["Why are most LLMs decoder-only?", "Next-token prediction scales simply on raw text and supports generation for any task via prompting."]],
 x: ["Using BERT for open-ended generation"],
 d: "Your comparison table is filled in.",
 min: 50
},
"w23-4": {
 m: "Reading the original paper and the best visual guide gives you the vocabulary of modern AI.",
 e: "Jay Alammar's illustrated guide first, then the paper, which will now make sense.",
 k: ["Encoder and decoder stacks", "Attention visualisations", "Training details: label smoothing, warm-up"],
 t: ["Read The Illustrated Transformer", "Read 'Attention Is All You Need' sections 1-3", "Write a one-page summary in your own words", "List 5 terms you had to look up"],
 q: [["Summarise the transformer paper in 2 sentences.", "It replaced recurrence with self-attention, allowing parallel training and better long-range modelling, and achieved state-of-the-art translation."]],
 x: ["Trying to read the paper before the visual guide"],
 d: "One-page summary written.",
 min: 120
},
"w23-5": {
 m: "Building GPT from scratch is the moment LLMs stop being magic.",
 e: "Karpathy builds a small GPT that writes Shakespeare, line by line, in about 2 hours.",
 k: ["Character tokenisation", "Bigram baseline to transformer", "Self-attention, multi-head, feed-forward, residuals, LayerNorm", "Training and sampling"],
 t: ["Watch 'Let's build GPT: from scratch, in code, spelled out'", "Code along in a Colab notebook", "Train on Tiny Shakespeare", "Generate 500 characters"],
 q: [["How is GPT trained?", "Predict the next token for every position in huge amounts of text, minimising cross-entropy loss."]],
 x: ["Copying the final code without building up step by step"],
 d: "Your GPT generates Shakespeare-like text.",
 min: 240
},
"w23-p": {
 m: "Training a GPT on Telugu text shows real understanding and stands out on a portfolio.",
 e: "Take your from-scratch GPT and train it on Telugu (or Shakespeare) text.",
 k: ["Unicode handling for Telugu script", "Character vs subword tokenisation", "Train/val loss tracking"],
 t: ["Get Telugu text (Wikipedia dump or a public-domain book)", "Clean and tokenise at character level", "Train your nanoGPT on Colab GPU", "Plot train/val loss", "Share samples in the README with honest notes on quality"],
 q: [["What challenges did Telugu text bring?", "Complex script with combining characters; character-level models need more steps, and subword tokenisers split words unevenly."]],
 x: ["Training too long on tiny data and memorising it"],
 d: "Generated Telugu samples in your README.",
 min: 240
},

/* ---------- Week 24: Generative models ---------- */
"w24-1": {
 m: "Autoencoders teach compression and latent spaces, ideas used inside Stable Diffusion.",
 e: "An autoencoder squeezes an image into a tiny code and rebuilds it. A VAE makes that code space smooth so you can sample new images.",
 k: ["Encoder, bottleneck (latent), decoder", "Reconstruction loss", "VAE: mean and variance, reparameterisation trick", "KL divergence regulariser"],
 t: ["Train an autoencoder on MNIST with a 2D latent space", "Plot the latent space coloured by digit", "Convert to a VAE", "Generate new digits by sampling the latent space"],
 q: [["Autoencoder vs VAE?", "An autoencoder learns a deterministic code; a VAE learns a distribution over codes, so you can sample new data."],
     ["What is the reparameterisation trick?", "Sample z = mu + sigma * noise so gradients can flow through the sampling step."]],
 x: ["Latent space too large to visualise"],
 d: "Generated new digits from a VAE.",
 min: 75
},
"w24-2": {
 m: "GANs introduced adversarial training and produced the first photo-realistic generated faces.",
 e: "A forger (generator) makes fake paintings; a detective (discriminator) tries to catch them. Both get better until fakes look real.",
 k: ["Generator: noise to image", "Discriminator: real or fake", "Minimax game", "Mode collapse and instability", "DCGAN architecture"],
 t: ["Train a simple DCGAN on MNIST or FashionMNIST", "Save generated grids every epoch", "Make a GIF of improvement", "Note any mode collapse"],
 q: [["How is a GAN trained?", "Alternate: train the discriminator to tell real from fake, then train the generator to fool it."],
     ["What is mode collapse?", "The generator produces only a few kinds of outputs that fool the discriminator."]],
 x: ["Letting the discriminator get too strong too fast"],
 d: "A GIF of generated images improving.",
 min: 90
},
"w24-3": {
 m: "Diffusion models power Stable Diffusion, Midjourney-style tools and video generation.",
 e: "Take a photo, add noise step by step until it's static. Train a network to reverse one step. Then start from pure static and denoise into a new image.",
 k: ["Forward process: add Gaussian noise", "Reverse process: learned denoiser (U-Net)", "Predict the noise at each step", "Text conditioning with CLIP embeddings", "Latent diffusion works in a compressed space"],
 t: ["Visualise the forward noising of an image over 10 steps", "Run a pretrained DDPM on MNIST or butterflies with diffusers", "Read the Hugging Face diffusion course unit 1", "Explain diffusion to a friend in 3 sentences"],
 c: String.raw`from diffusers import DDPMPipeline
pipe = DDPMPipeline.from_pretrained("google/ddpm-cifar10-32")
pipe(num_inference_steps=100).images[0].save("sample.png")`,
 q: [["How do diffusion models generate images?", "They learn to reverse a gradual noising process, starting from noise and denoising step by step."],
     ["Why are diffusion models more stable than GANs?", "They train with a simple denoising regression loss instead of an adversarial game."]],
 x: ["Thinking diffusion 'copies' training images"],
 d: "Your 3-sentence explanation is clear.",
 min: 60
},
"w24-4": {
 m: "Finishing fast.ai part 1 rounds out your practical deep learning toolkit.",
 e: "Lessons 4-8: NLP, tabular, collaborative filtering and how models work from scratch.",
 k: ["NLP with transformers", "Tabular deep learning", "Collaborative filtering and embeddings", "Convolutions from scratch"],
 t: ["Watch lessons 4-8", "Run the notebooks", "Enter one Kaggle competition used in the course"],
 q: [["How do embeddings work in recommender systems?", "Users and items get learned vectors; their dot product predicts preference."]],
 x: ["Skipping the Kaggle practice"],
 d: "Part 1 complete.",
 min: 480
},
"w24-p": {
 m: "Your Phase 4 capstone: a deep learning project anyone can try online.",
 e: "Pick your strongest DL project (classifier, generator or language model), polish it and deploy it with Gradio.",
 k: ["Clean code in modules, not one notebook", "Model card: data, metrics, limits", "Hosted demo"],
 t: ["Choose the project", "Refactor into train.py, model.py, app.py", "Write a model card (data, metrics, limitations, intended use)", "Deploy on Hugging Face Spaces", "Post on LinkedIn with a GIF of the demo"],
 q: [["What are the limitations of your model?", "Name real ones: data bias, domain shift, failure cases you found, and how you'd fix them."]],
 x: ["Hiding failure cases"],
 d: "Live demo and model card.",
 min: 300
}
});
