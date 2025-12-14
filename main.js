import { heartPositions } from "./particles/heart.js";
import { circlePositions } from "./particles/circle.js";
import { initHandTracking } from "./gestures.js";


const canvas = document.getElementById("three-canvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const particleCount = 1000;
const positions = new Float32Array(heartPositions);

// const positions = new Float32Array(particleCount * 3);

// for (let i = 0; i < particleCount * 3; i++) {
//   positions[i] = (Math.random() - 0.5) * 4;
// }

const particleGeometry = new THREE.BufferGeometry();

particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const particleMaterial = new THREE.PointsMaterial({
  color: 0xff3366,
  size: 0.05
});

const particles = new THREE.Points(
  particleGeometry,
  particleMaterial
);

scene.add(particles);

const shapes = [heartPositions, circlePositions];
let currentShapeIndex = 0;

function updateShape(newPositions) {
  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      new Float32Array(newPositions),
      3
    )
  );
}
let canSwitch = true;

initHandTracking(() => {
  if (!canSwitch) return;

  canSwitch = false;

  currentShapeIndex =
    (currentShapeIndex + 1) % shapes.length;

  updateShape(shapes[currentShapeIndex]);

  setTimeout(() => {
    canSwitch = true;
  }, 800);
});







// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);

// scene.add(cube);

function animate() {
  requestAnimationFrame(animate);
  particles.rotation.y += 0.002;
  renderer.render(scene, camera);
}

animate();
