import {
  HandLandmarker,
  FilesetResolver
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";

export async function initHandTracking(onPinch) {
  const video = document.getElementById("video");

  // Start camera
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 640, height: 480 }
  });
  video.srcObject = stream;
  await video.play();

  // Load MediaPipe vision files
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
  );

  // Create hand landmarker
  const handLandmarker = await HandLandmarker.createFromOptions(
    vision,
    {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-assets/hand_landmarker.task"
      },
      runningMode: "VIDEO",
      numHands: 1
    }
  );

  let lastPinchTime = 0;

  async function detect() {
    const now = performance.now();
    const results = handLandmarker.detectForVideo(video, now);

    if (results.landmarks.length > 0) {
      const hand = results.landmarks[0];

      const thumb = hand[4];
      const index = hand[8];

      const distance = Math.hypot(
        thumb.x - index.x,
        thumb.y - index.y
      );

      // 👌 Pinch detection
      if (distance < 0.08 && now - lastPinchTime > 800) {
        lastPinchTime = now;
        onPinch();
      }
    }

    requestAnimationFrame(detect);
  }

  detect();
}
