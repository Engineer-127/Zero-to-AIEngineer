/* Phase 5: Computer Vision & Perception (Weeks 25-29) */
export default {

/* ---------- Week 25: Image fundamentals and OpenCV ---------- */
"w25-1": {
 m: "Every vision model starts from pixels and colour spaces. Knowing them helps you preprocess correctly and debug weird results.",
 e: "An image is a grid of pixels. Each pixel in colour has three numbers (red, green, blue). HSV describes the same colour as hue, saturation and brightness, which is easier for picking colours.",
 k: ["Shape (H, W, C), uint8 0-255", "OpenCV loads BGR, not RGB", "Grayscale, HSV, LAB colour spaces", "Resolution and aspect ratio"],
 t: ["Load an image with OpenCV and print shape and dtype", "Convert BGR to RGB and display with matplotlib", "Convert to HSV and isolate a coloured object (e.g. a red ball) with inRange", "Split and show the three channels separately"],
 c: String.raw`import cv2, numpy as np
img = cv2.imread("photo.jpg"); rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
mask = cv2.inRange(hsv, (0, 120, 70), (10, 255, 255))
cv2.imwrite("red_only.jpg", cv2.bitwise_and(img, img, mask=mask))`,
 q: [["Why does OpenCV use BGR?", "Historical convention from early camera and Windows formats; you must convert to RGB for most other libraries."],
     ["Why use HSV for colour detection?", "Hue separates colour from brightness, so thresholds work under varying lighting."]],
 x: ["Showing a BGR image in matplotlib and getting blue faces"],
 d: "You isolated one colour from a photo.",
 min: 50
},
"w25-2": {
 m: "OpenCV is the standard toolkit for image processing in production pipelines.",
 e: "OpenCV is Photoshop for code: read, resize, crop, draw boxes and text, and save.",
 k: ["cv2.imread, imwrite, resize, cvtColor", "Cropping with slicing", "cv2.rectangle, cv2.putText, cv2.circle", "Interpolation modes for resizing"],
 t: ["Resize an image to 224x224 and to half size keeping aspect ratio", "Crop the centre", "Draw a labelled bounding box on a face or object", "Batch-resize a folder of images"],
 c: String.raw`import cv2
img = cv2.imread("photo.jpg"); h, w = img.shape[:2]
small = cv2.resize(img, (w // 2, h // 2), interpolation=cv2.INTER_AREA)
cv2.rectangle(img, (50, 50), (250, 250), (0, 255, 0), 2)
cv2.putText(img, "Person 0.93", (50, 45), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
cv2.imwrite("boxed.jpg", img)`,
 q: [["Which interpolation for shrinking vs enlarging?", "INTER_AREA for shrinking; INTER_LINEAR or INTER_CUBIC for enlarging."]],
 x: ["Passing (height, width) to cv2.resize, which expects (width, height)"],
 d: "A folder of resized images and one annotated image.",
 min: 45
},
"w25-3": {
 m: "Filters and edges were the original computer vision, and CNN filters learn the same kinds of patterns.",
 e: "Blurring averages neighbours to remove noise. Edge detection finds where brightness changes sharply, which outlines objects.",
 k: ["GaussianBlur, medianBlur", "Sharpening kernels", "Sobel gradients in x and y", "Canny edge detector with two thresholds"],
 t: ["Blur an image with 3 kernel sizes", "Apply a sharpening kernel with filter2D", "Compute Sobel x and y and combine", "Run Canny with different thresholds and pick the best", "Compare with the first-layer filters of a CNN (look up a visualisation)"],
 c: String.raw`import cv2, numpy as np
gray = cv2.imread("photo.jpg", cv2.IMREAD_GRAYSCALE)
blur = cv2.GaussianBlur(gray, (5, 5), 0)
edges = cv2.Canny(blur, 50, 150)
sharp = cv2.filter2D(gray, -1, np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]]))`,
 q: [["How does Canny edge detection work?", "Smooth, compute gradients, thin edges with non-maximum suppression, then keep strong edges and connected weak ones (hysteresis)."]],
 x: ["Running Canny on a noisy image without blurring"],
 d: "Clean edge map of an object.",
 min: 45
},
"w25-4": {
 m: "Thresholding and contours solve many real problems (counting objects, reading documents) without any deep learning.",
 e: "Thresholding turns an image into black and white. Contours trace the outlines of the white blobs so you can measure and count them.",
 k: ["Binary and Otsu thresholding", "Adaptive threshold for uneven lighting", "findContours, contourArea, boundingRect", "Morphology: erode, dilate, open, close"],
 t: ["Count coins in a photo using threshold + contours", "Use morphological opening to remove specks", "Draw bounding boxes and areas", "Try adaptive threshold on a photo of a page"],
 c: String.raw`import cv2
gray = cv2.imread("coins.jpg", 0)
_, th = cv2.threshold(cv2.GaussianBlur(gray, (7, 7), 0), 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
th = cv2.morphologyEx(th, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)))
contours, _ = cv2.findContours(th, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
print(len([c for c in contours if cv2.contourArea(c) > 200]), "coins")`,
 q: [["What is Otsu's method?", "Automatically picks the threshold that best separates the two brightness groups in the histogram."],
     ["Erosion vs dilation?", "Erosion shrinks white regions and removes small noise; dilation grows them and fills small holes."]],
 x: ["Touching objects merging into one contour"],
 d: "Your script counts coins correctly.",
 min: 50
},
"w25-5": {
 m: "Real-world vision runs on video: CCTV, webcams, drones. Processing frames is the basic loop.",
 e: "A video is a flipbook of images. You read one frame, process it, show it, and repeat very fast.",
 k: ["cv2.VideoCapture(0) for webcam or a file path", "Loop: read, process, show", "FPS measurement", "VideoWriter to save output", "Press q to quit"],
 t: ["Show your webcam feed with FPS on screen", "Apply grayscale and edge detection live", "Detect motion by differencing consecutive frames", "Save a 10-second processed clip"],
 c: String.raw`import cv2, time
cap = cv2.VideoCapture(0); prev = None
while True:
    ok, frame = cap.read()
    if not ok: break
    gray = cv2.GaussianBlur(cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY), (21, 21), 0)
    if prev is not None:
        motion = cv2.threshold(cv2.absdiff(prev, gray), 25, 255, cv2.THRESH_BINARY)[1]
        cv2.imshow("motion", motion)
    prev = gray
    if cv2.waitKey(1) & 0xFF == ord("q"): break
cap.release(); cv2.destroyAllWindows()`,
 q: [["How would you build a basic motion detector?", "Blur frames, take the absolute difference between consecutive frames, threshold it, and look for large changed regions."]],
 x: ["Forgetting to release the camera"],
 d: "Live motion detection works.",
 min: 50
},
"w25-p": {
 m: "A document scanner is a practical, satisfying classic-CV project that uses everything this week.",
 e: "Take a phone photo of a page, find its 4 corners, and warp it flat like a scanner app.",
 k: ["Edge detection + largest 4-point contour", "Perspective transform", "Adaptive threshold for a clean scan"],
 t: ["Detect edges and find the largest quadrilateral contour", "Order the 4 corners", "Warp with getPerspectiveTransform and warpPerspective", "Apply adaptive threshold for a black-and-white scan", "Streamlit app where users upload a photo and download the scan"],
 q: [["How does a perspective transform work?", "It maps 4 source points to 4 destination points with a 3x3 homography matrix, straightening the view."]],
 x: ["Corners in the wrong order giving a mirrored scan"],
 d: "Uploading a tilted page returns a flat scan.",
 min: 180
},

/* ---------- Week 26: Object detection ---------- */
"w26-1": {
 m: "Knowing the difference between vision tasks helps you pick the right model and data format.",
 e: "Classification: 'there's a dog'. Detection: 'there's a dog here (box)'. Segmentation: 'these exact pixels are the dog'.",
 k: ["Classification: one label per image", "Detection: boxes + labels", "Semantic segmentation: label per pixel", "Instance segmentation: separate each object", "Keypoints/pose"],
 t: ["Run a pretrained classifier, detector and segmenter on the same image", "Compare their outputs side by side", "Write which task fits: counting cars, measuring a tumour, tagging photos"],
 c: String.raw`from ultralytics import YOLO
for weights in ("yolo11n-cls.pt", "yolo11n.pt", "yolo11n-seg.pt"):
    YOLO(weights)("street.jpg")[0].save(filename=weights.replace(".pt", ".jpg"))`,
 q: [["Semantic vs instance segmentation?", "Semantic labels every pixel with a class; instance also separates different objects of the same class."]],
 x: ["Using detection when you need exact shapes"],
 d: "Three outputs compared.",
 min: 40
},
"w26-2": {
 m: "IoU, NMS and mAP are how detection is measured and cleaned up. They come up in every CV interview.",
 e: "IoU measures how much two boxes overlap. NMS removes duplicate boxes on the same object. mAP averages precision over classes and IoU thresholds.",
 k: ["IoU = overlap area / union area", "NMS: keep the highest-scoring box, drop overlaps above a threshold", "Precision-recall per class", "mAP@0.5 and mAP@0.5:0.95"],
 t: ["Implement IoU in Python", "Implement NMS for a list of boxes and scores", "Compare with torchvision.ops.nms", "Explain mAP@0.5:0.95 in plain words"],
 c: String.raw`def iou(a, b):
    x1, y1 = max(a[0], b[0]), max(a[1], b[1]); x2, y2 = min(a[2], b[2]), min(a[3], b[3])
    inter = max(0, x2 - x1) * max(0, y2 - y1)
    area = lambda r: (r[2] - r[0]) * (r[3] - r[1])
    return inter / (area(a) + area(b) - inter)
print(iou((0, 0, 10, 10), (5, 5, 15, 15)))`,
 q: [["What is IoU?", "Intersection over union: overlap between predicted and true boxes divided by their combined area."],
     ["What is non-maximum suppression?", "Removing lower-scoring boxes that overlap a higher-scoring box too much, so each object gets one box."],
     ["What does mAP@0.5:0.95 mean?", "Mean average precision averaged over IoU thresholds from 0.5 to 0.95, rewarding precise boxes."]],
 x: ["Box format confusion (xyxy vs xywh)"],
 d: "Your NMS matches torchvision's.",
 min: 60
},
"w26-3": {
 m: "Knowing detector families helps you trade speed for accuracy on a real project.",
 e: "Two-stage detectors first propose regions, then classify them (accurate, slower). One-stage detectors predict boxes in one pass (fast, great for real time).",
 k: ["R-CNN, Fast, Faster R-CNN with region proposals", "YOLO and SSD: single pass", "Anchors vs anchor-free", "DETR: transformer-based detection"],
 t: ["Run Faster R-CNN (torchvision) and YOLO on the same video", "Measure FPS and compare detections", "Write a table: model, FPS, quality notes, when to use"],
 q: [["One-stage vs two-stage detectors?", "Two-stage (Faster R-CNN) propose then refine, usually more accurate; one-stage (YOLO) predict directly, much faster."],
     ["Why is YOLO good for real time?", "It predicts all boxes in a single forward pass of the network."]],
 x: ["Choosing by accuracy alone when you need 30 FPS"],
 d: "Comparison table filled.",
 min: 45
},
"w26-4": {
 m: "Good labels matter more than a fancy model. Labelling is a real part of CV work.",
 e: "Draw boxes around objects in your own photos and export them in the format YOLO expects.",
 k: ["Roboflow or CVAT for labelling", "YOLO format: class x_center y_center width height (normalised)", "Train/val/test splits", "Label consistency guidelines"],
 t: ["Collect 100-200 images of your target (helmets, number plates, a product)", "Label them in Roboflow or CVAT", "Write 3 labelling rules and follow them", "Export in YOLO format", "Check a few label files by drawing them back on the images"],
 q: [["How would you ensure label quality?", "Clear guidelines, a second person reviewing a sample, and checking disagreements and model errors."]],
 x: ["Inconsistent boxes (tight on some, loose on others)"],
 d: "A labelled dataset in YOLO format.",
 min: 120
},
"w26-5": {
 m: "Training a custom detector is one of the most in-demand practical CV skills.",
 e: "Ultralytics makes training YOLO on your own data almost as easy as training a scikit-learn model.",
 k: ["data.yaml pointing to images and labels", "model.train(data, epochs, imgsz)", "Validation mAP and confusion matrix", "Export to ONNX"],
 t: ["Train YOLO nano on your dataset for 50 epochs on Colab", "Read results.png and the confusion matrix", "Run inference on new images and a video", "Export to ONNX"],
 c: String.raw`from ultralytics import YOLO
model = YOLO("yolo11n.pt")
model.train(data="data.yaml", epochs=50, imgsz=640)
metrics = model.val(); print(metrics.box.map50)
model("test_video.mp4", save=True)
model.export(format="onnx")`,
 q: [["Your detector misses small objects. What do you try?", "Higher input resolution, tiling, more small-object examples, and a model variant suited to small objects."]],
 x: ["Too few images per class"],
 d: "mAP@0.5 reported and a processed video saved.",
 min: 120
},
"w26-p": {
 m: "A traffic helmet or number-plate detector is a relevant Indian use case with visible impact.",
 e: "Detect riders without helmets (or number plates) in traffic video.",
 k: ["Custom YOLO training", "Video inference with counts", "Handling false positives"],
 t: ["Use your labelled data plus a public dataset from Roboflow Universe", "Train YOLO and tune confidence threshold", "Process a traffic video, drawing boxes and a live count", "Report mAP and 5 failure cases", "Demo video in the README"],
 q: [["What would it take to deploy this on a traffic camera?", "Edge hardware (Jetson), optimised model (TensorRT/ONNX), privacy handling, and monitoring for night and rain conditions."]],
 x: ["Only testing in daylight clips"],
 d: "Annotated demo video with counts.",
 min: 240
},

/* ---------- Week 27: Segmentation, tracking, pose, OCR ---------- */
"w27-1": {
 m: "Segmentation gives pixel-level understanding, essential for medical imaging, self-driving and photo editing.",
 e: "Instead of drawing a box around a cat, you colour exactly the cat's pixels.",
 k: ["U-Net: encoder-decoder with skip connections", "Mask R-CNN for instance masks", "Metrics: IoU per class, Dice", "Loss: cross-entropy + Dice"],
 t: ["Run a pretrained DeepLabV3 or YOLO-seg on street images", "Overlay masks on images", "Train a small U-Net on a simple dataset (e.g. Oxford pets masks)", "Compute Dice score"],
 q: [["Why does U-Net use skip connections?", "They carry fine spatial detail from the encoder to the decoder, giving sharp mask edges."],
     ["Dice vs IoU?", "Both measure overlap; Dice = 2*intersection / (sum of areas), and is common as a loss for imbalanced masks."]],
 x: ["Using accuracy on masks that are 95% background"],
 d: "Mask overlays and a Dice score.",
 min: 75
},
"w27-2": {
 m: "Segment Anything lets you segment any object with a click, a big shift in how CV tools are built.",
 e: "SAM is a foundation model for masks: point at something, it cuts it out.",
 k: ["Prompt types: points, boxes", "Automatic mask generation", "SAM 2 for video", "Combine with a detector for labelled masks"],
 t: ["Run SAM with a point prompt on your photo", "Run it with a box from YOLO", "Generate all masks automatically", "Build a 'click to cut out' Gradio demo"],
 q: [["What is a foundation model in vision?", "A large model pretrained on huge data that transfers to many tasks with prompting or light fine-tuning, like SAM or CLIP."]],
 x: ["Running the largest SAM on CPU and waiting forever"],
 d: "Click-to-cut-out demo works.",
 min: 60
},
"w27-3": {
 m: "Tracking turns detections into identities over time: counting people, following vehicles, sports analytics.",
 e: "Detection finds cars in each frame. Tracking says 'this is the same car as last frame' and gives it an ID.",
 k: ["Tracking-by-detection", "Kalman filter predicts motion", "Hungarian matching of detections to tracks", "SORT, DeepSORT (appearance), ByteTrack", "ID switches as a failure mode"],
 t: ["Run YOLO with ByteTrack on a traffic video", "Draw IDs and trails", "Count vehicles crossing a line", "Note when IDs switch"],
 c: String.raw`from ultralytics import YOLO
model = YOLO("yolo11n.pt")
for r in model.track("traffic.mp4", tracker="bytetrack.yaml", stream=True, persist=True):
    ids = r.boxes.id
    print(0 if ids is None else len(ids), "objects tracked")`,
 q: [["How does SORT work?", "Detect objects each frame, predict each track's next position with a Kalman filter, and match detections to tracks by IoU with the Hungarian algorithm."],
     ["What does DeepSORT add?", "Appearance embeddings so tracks survive occlusion and reduce ID switches."]],
 x: ["Counting the same car multiple times without a crossing line"],
 d: "Accurate line-crossing count.",
 min: 60
},
"w27-4": {
 m: "Pose estimation powers fitness apps, sign language, gesture control and sports analysis.",
 e: "Find the key joints of a body (shoulders, elbows, knees) and connect them into a stick figure.",
 k: ["Keypoints and skeletons", "MediaPipe Pose, Hands, Face Mesh", "YOLO-pose", "Angles between joints"],
 t: ["Run MediaPipe Pose on your webcam", "Compute the elbow angle live", "Run MediaPipe Hands and count raised fingers", "Show the angle on screen"],
 c: String.raw`import numpy as np
def angle(a, b, c):
    a, b, c = map(np.array, (a, b, c))
    ba, bc = a - b, c - b
    return np.degrees(np.arccos(np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))))`,
 q: [["How would you build a push-up counter?", "Track the elbow angle over time with pose estimation and count a rep each time it goes below and back above thresholds."]],
 x: ["Using raw pixel coordinates without handling missing keypoints"],
 d: "Live elbow angle and finger count.",
 min: 60
},
"w27-5": {
 m: "OCR turns images of text into data: invoices, IDs, number plates, forms.",
 e: "OCR finds where the text is, then reads each word.",
 k: ["Tesseract (classic)", "EasyOCR and PaddleOCR (deep learning, many languages incl. Telugu)", "Preprocessing: grayscale, threshold, deskew", "Vision-language models for document understanding"],
 t: ["Run Tesseract and EasyOCR on a printed receipt photo", "Compare accuracy", "Try a Telugu or Hindi text image with EasyOCR", "Extract total amount with a regex"],
 c: String.raw`import easyocr, re
reader = easyocr.Reader(["en", "te"])
text = " ".join(t for _, t, _ in reader.readtext("receipt.jpg"))
print(re.findall(r"total\s*[:\-]?\s*(\d+[\.,]?\d*)", text, re.I))`,
 q: [["How would you improve OCR accuracy?", "Better image preprocessing, a model trained for the language and layout, and post-processing with dictionaries or rules."]],
 x: ["Skipping preprocessing on skewed or dark photos"],
 d: "Extracted the total from a receipt.",
 min: 50
},
"w27-p": {
 m: "A gym rep counter is fun, useful and demonstrates pose estimation clearly.",
 e: "Count squats, push-ups or bicep curls from your webcam with form feedback.",
 k: ["MediaPipe Pose", "Joint-angle state machine for reps", "On-screen feedback"],
 t: ["Pick 2 exercises and the joints that matter", "Implement a state machine: up to down to up = 1 rep", "Show count and a form tip (e.g. 'go lower')", "Record a demo video", "README with how it works"],
 q: [["How did you avoid double-counting reps?", "A state machine with separate up and down thresholds (hysteresis), so jitter near one threshold doesn't count."]],
 x: ["Single threshold causing jittery counts"],
 d: "Demo video with correct counts.",
 min: 180
},

/* ---------- Week 28: Modern and multimodal vision ---------- */
"w28-1": {
 m: "Vision Transformers brought the transformer to images and underpin today's multimodal models.",
 e: "Cut an image into 16x16 patches, treat each patch like a word, and feed the sequence to a transformer.",
 k: ["Patch embedding", "CLS token and positional embeddings", "Needs lots of data or pretraining", "DeiT, Swin, DINOv2"],
 t: ["Load a pretrained ViT with timm and classify an image", "Visualise its attention map for one image", "Fine-tune ViT on your food dataset and compare with ResNet"],
 q: [["How does ViT process an image?", "Splits it into patches, linearly embeds each, adds position embeddings and runs a transformer encoder."],
     ["ViT vs CNN?", "ViT has fewer built-in assumptions so needs more data, but scales very well; CNNs are more data-efficient on small datasets."]],
 x: ["Training ViT from scratch on 1,000 images"],
 d: "ViT vs ResNet comparison.",
 min: 60
},
"w28-2": {
 m: "CLIP connects images and text in one space, enabling zero-shot classification and text-to-image search.",
 e: "CLIP learned from millions of image-caption pairs so that a photo of a dog and the text 'a photo of a dog' end up close together.",
 k: ["Image encoder + text encoder", "Contrastive training", "Zero-shot: compare image to text prompts", "Image search by text"],
 t: ["Run CLIP zero-shot on 5 images with 5 text labels", "Try prompt variations ('a photo of a ...')", "Embed 50 of your photos and search by text"],
 c: String.raw`import torch, clip
from PIL import Image
model, preprocess = clip.load("ViT-B/32")
image = preprocess(Image.open("dosa.jpg")).unsqueeze(0)
labels = ["a photo of dosa", "a photo of biryani", "a photo of pizza"]
with torch.no_grad():
    probs = model(image, clip.tokenize(labels))[0].softmax(-1)
print(dict(zip(labels, probs[0].tolist())))`,
 q: [["How does zero-shot classification with CLIP work?", "Embed the image and a text prompt for each class, then pick the class whose text embedding is most similar."],
     ["What is contrastive learning?", "Training to pull matching pairs together and push non-matching pairs apart in embedding space."]],
 x: ["Using bare labels instead of prompts"],
 d: "Text search over your photos works.",
 min: 60
},
"w28-3": {
 m: "Vision-language models let you ask questions about images, a key capability of modern AI assistants.",
 e: "Show the model a picture and ask 'what's wrong with this machine?' or 'read this bill', and it answers in text.",
 k: ["VLM = vision encoder + LLM", "Captioning, VQA, document understanding", "Open models (Qwen-VL, LLaVA, SmolVLM) and API models (Claude, GPT)", "Prompting with images"],
 t: ["Send an image to a VLM API (e.g. Claude) and ask 3 questions", "Run a small open VLM locally or on Colab", "Compare answers on a receipt and a street scene", "Note hallucinations"],
 q: [["How are VLMs built?", "A vision encoder turns the image into tokens projected into the LLM's embedding space, and the LLM reads them alongside text."]],
 x: ["Trusting VLM counts and small text without checking"],
 d: "Comparison of two VLMs with noted errors.",
 min: 60
},
"w28-4": {
 m: "Image generation is a huge Gen AI area; knowing the pipeline lets you build creative and product tools.",
 e: "Stable Diffusion turns a text prompt into an image by denoising random noise, guided by the text.",
 k: ["Text encoder, U-Net/DiT denoiser, VAE decoder", "Guidance scale", "Negative prompts", "Schedulers and steps", "Image-to-image and inpainting"],
 t: ["Generate images with diffusers (SD-Turbo or SDXL-Turbo for speed)", "Vary guidance scale and steps", "Try image-to-image on your photo", "Try inpainting to replace an object"],
 c: String.raw`from diffusers import AutoPipelineForText2Image
import torch
pipe = AutoPipelineForText2Image.from_pretrained("stabilityai/sd-turbo", torch_dtype=torch.float16).to("cuda")
pipe("a watercolour of Charminar at sunset", num_inference_steps=2, guidance_scale=0.0).images[0].save("out.png")`,
 q: [["What does the guidance scale do?", "How strongly the image follows the prompt versus being more varied and natural."]],
 x: ["Ignoring licence terms of models and outputs"],
 d: "A grid of generations with different settings.",
 min: 60
},
"w28-5": {
 m: "The Hugging Face CV course ties together modern vision with free, hands-on notebooks.",
 e: "A free course covering CNNs, transformers, generative models and multimodal vision.",
 k: ["Vision transformers", "Multimodal models", "Generative vision", "3D vision basics"],
 t: ["Complete the units on vision transformers and multimodal models", "Run the notebooks", "Write 5 key takeaways"],
 q: [["Where does self-supervised learning (e.g. DINOv2) help in vision?", "It learns strong features from unlabelled images, so you need fewer labels downstream."]],
 x: ["Only reading, not running notebooks"],
 d: "Units done with notes.",
 min: 240
},
"w28-p": {
 m: "Searching your own photos by typing a sentence is a delightful demo of multimodal AI.",
 e: "Embed your photo gallery with CLIP and let users type 'birthday cake' or 'beach at sunset' to find photos.",
 k: ["CLIP image embeddings stored once", "Text query embedding", "Cosine similarity or FAISS for search"],
 t: ["Embed 500+ photos with CLIP and save embeddings", "Build a search function with top-k results", "Add FAISS for speed", "Gradio app with a search box and image grid", "Demo GIF in README"],
 q: [["How does it scale to a million photos?", "Store embeddings in a vector index (FAISS, a vector DB) with approximate nearest-neighbour search."]],
 x: ["Recomputing image embeddings on every search"],
 d: "Typing a sentence returns the right photos.",
 min: 180
},

/* ---------- Week 29: Perception beyond 2D ---------- */
"w29-1": {
 m: "Cameras measure the 3D world through a lens. Calibration and stereo are the basis of robotics and AR.",
 e: "Calibration learns your camera's quirks (focal length, distortion). Two cameras side by side, like your eyes, let you judge depth.",
 k: ["Pinhole camera model and intrinsics matrix", "Lens distortion", "Calibration with a checkerboard", "Stereo disparity to depth"],
 t: ["Print a checkerboard and calibrate your webcam with OpenCV", "Undistort an image", "Compute a disparity map from a stereo image pair (Middlebury dataset)", "Explain why closer objects have larger disparity"],
 q: [["What are camera intrinsics?", "Internal parameters: focal lengths, principal point and distortion coefficients."],
     ["How does stereo vision estimate depth?", "Matches points between two views; depth is inversely proportional to disparity."]],
 x: ["Too few calibration images from similar angles"],
 d: "Undistorted image and a disparity map.",
 min: 75
},
"w29-2": {
 m: "Monocular depth models give 3D understanding from a single photo, useful for AR, robotics and effects.",
 e: "A neural network looks at one photo and guesses how far away each pixel is, like you can with one eye closed.",
 k: ["Relative vs metric depth", "Depth Anything, MiDaS/DPT", "Depth maps as colour images", "Uses: bokeh, 3D photos, obstacle detection"],
 t: ["Run Depth Anything on 5 photos", "Visualise depth maps", "Blur the background using depth for a portrait effect", "Run it on webcam frames"],
 c: String.raw`from transformers import pipeline
from PIL import Image
depth = pipeline("depth-estimation", model="depth-anything/Depth-Anything-V2-Small-hf")
depth(Image.open("room.jpg"))["depth"].save("room_depth.png")`,
 q: [["Relative vs metric depth?", "Relative depth orders pixels by distance; metric depth gives real units like metres."]],
 x: ["Treating relative depth as metres"],
 d: "Portrait-mode effect from depth.",
 min: 50
},
"w29-3": {
 m: "Point clouds are how LiDAR and 3D scanners see the world; self-driving and robotics depend on them.",
 e: "A point cloud is a 3D scatter of dots, each an (x, y, z) position measured by a laser or depth camera.",
 k: ["Point clouds, voxels, meshes", "Open3D: read, visualise, downsample, estimate normals", "Plane segmentation with RANSAC", "Clustering points into objects", "Depth map to point cloud"],
 t: ["Load a sample point cloud in Open3D", "Downsample with voxels", "Segment the floor plane with RANSAC", "Cluster remaining points with DBSCAN", "Convert your depth map from yesterday into a point cloud"],
 c: String.raw`import open3d as o3d
pcd = o3d.io.read_point_cloud(o3d.data.PLYPointCloud().path).voxel_down_sample(0.02)
plane, inliers = pcd.segment_plane(0.01, 3, 1000)
objects = pcd.select_by_index(inliers, invert=True)
labels = objects.cluster_dbscan(eps=0.05, min_points=10)
print(max(labels) + 1, "objects")`,
 q: [["What is RANSAC?", "Randomly fit a model to small subsets, count points that agree, and keep the best; robust to outliers."],
     ["How does LiDAR measure distance?", "Times how long laser pulses take to bounce back."]],
 x: ["Forgetting to downsample huge clouds"],
 d: "Floor removed and objects clustered.",
 min: 60
},
"w29-4": {
 m: "Robots and cars combine sensors because each one fails differently. Sensor fusion is core to autonomy.",
 e: "Camera sees colour but not distance well, LiDAR sees distance but not colour, IMU feels motion. Fused together, they cover each other's blind spots.",
 k: ["Camera, LiDAR, radar, IMU, GPS strengths and weaknesses", "Early vs late fusion", "Kalman filter for combining noisy measurements", "Projecting LiDAR points onto camera images"],
 t: ["Make a table of sensor strengths and failure modes (rain, night, fog)", "Implement a 1D Kalman filter that fuses noisy position readings", "Read the KITTI dataset description and look at a sample frame with LiDAR projected on the image"],
 c: String.raw`x, P = 0.0, 1.0; Q, R = 0.01, 0.5
for z in measurements:
    P += Q
    K = P / (P + R)
    x += K * (z - x); P *= (1 - K)`,
 q: [["Why fuse camera and LiDAR?", "Cameras give rich semantics, LiDAR gives accurate depth; together they detect and locate objects more reliably."],
     ["What does a Kalman filter do?", "Combines predictions and noisy measurements, weighting each by its uncertainty, to estimate the true state."]],
 x: ["Assuming one sensor is always right"],
 d: "Your Kalman filter smooths noisy readings.",
 min: 60
},
"w29-5": {
 m: "Models are useful only if they run where they're needed, often on small devices with no GPU.",
 e: "Export to ONNX (a universal model format), then run it with a fast runtime on a laptop CPU, Raspberry Pi or Jetson.",
 k: ["ONNX export from PyTorch or Ultralytics", "ONNX Runtime", "Quantisation (INT8) for speed", "TensorRT (NVIDIA) and OpenVINO (Intel)", "Measure latency and FPS"],
 t: ["Export your YOLO or classifier to ONNX", "Run it with onnxruntime", "Compare FPS of PyTorch vs ONNX Runtime on CPU", "Try dynamic INT8 quantisation and compare accuracy"],
 c: String.raw`import onnxruntime as ort, numpy as np
sess = ort.InferenceSession("model.onnx", providers=["CPUExecutionProvider"])
inp = sess.get_inputs()[0].name
out = sess.run(None, {inp: np.random.rand(1, 3, 640, 640).astype(np.float32)})`,
 q: [["What is quantisation?", "Using lower-precision numbers (e.g. INT8 instead of FP32) to make models smaller and faster, with a small accuracy cost."],
     ["What is ONNX?", "An open model format that lets models from different frameworks run on many runtimes and devices."]],
 x: ["Measuring speed with the first (warm-up) run only"],
 d: "FPS comparison table.",
 min: 50
},
"w29-p": {
 m: "Your Phase 5 capstone combines detection, tracking and depth into one real-time perception system.",
 e: "A webcam app that detects objects, tracks them with IDs and estimates how near each one is, running fast via ONNX.",
 k: ["YOLO detection + ByteTrack", "Depth model for distance ranking", "ONNX Runtime for speed", "On-screen overlay"],
 t: ["Detect and track people and objects from webcam", "Estimate relative distance of each tracked object with a depth model", "Warn when something gets 'too close'", "Export models to ONNX and report FPS", "Record a demo and write the README"],
 q: [["How would you make this run on a Jetson?", "TensorRT-optimised models, smaller input size, running depth less often than detection, and batching work across frames."]],
 x: ["Running depth on every frame and killing FPS"],
 d: "Real-time demo with IDs and proximity warnings.",
 min: 300
}
};
