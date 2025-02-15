import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Add OrbitControls for camera movement
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 1, 5);
controls.update();

// Load the GLB model
const loader = new GLTFLoader();
let model, mixer;

loader.load(
  'assets/model.glb', // Replace with the correct path to your GLB file
  (gltf) => {
    console.log('GLB file loaded successfully:', gltf);
    model = gltf.scene;
    scene.add(model);

    // Debug: Log the model's bone structure
    model.traverse((node) => {
      if (node.isBone) {
        console.log('Bone found:', node.name);
      }
    });

    // Set up the animation mixer
    mixer = new THREE.AnimationMixer(model);

    // Create a Namaste animation
    createNamasteAnimation();
  },
  undefined,
  (error) => {
    console.error('Error loading GLB file:', error);
  }
);

// Function to create the Namaste animation
function createNamasteAnimation() {
  if (!model) return;

  // Get the arm bones (adjust names based on your GLB file's bone structure)
  const leftArm = model.getObjectByName('LeftArm'); // Replace with actual bone name
  const rightArm = model.getObjectByName('RightArm'); // Replace with actual bone name

  if (!leftArm || !rightArm) {
    console.error('Arm bones not found in the model.');
    return;
  }

  // Create keyframe tracks for the Namaste gesture
  const times = [0, 1, 2]; // Keyframe times (in seconds)
  const leftArmRotation = [
    new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0)), // Initial rotation
    new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 4, 0, 0)), // Mid rotation
    new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0)), // Final rotation
  ];
  const rightArmRotation = [
    new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0)), // Initial rotation
    new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 4, 0, 0)), // Mid rotation
    new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0)), // Final rotation
  ];

  // Create rotation tracks for the arms
  const leftArmTrack = new THREE.QuaternionKeyframeTrack(
    '.bones[LeftArm].quaternion', // Replace with the correct bone path
    times,
    leftArmRotation.flatMap((q) => [q.x, q.y, q.z, q.w])
  );
  const rightArmTrack = new THREE.QuaternionKeyframeTrack(
    '.bones[RightArm].quaternion', // Replace with the correct bone path
    times,
    rightArmRotation.flatMap((q) => [q.x, q.y, q.z, q.w])
  );

  // Create the animation clip
  const clip = new THREE.AnimationClip('Namaste', 2, [leftArmTrack, rightArmTrack]);

  // Play the animation
  const action = mixer.clipAction(clip);
  action.play();
}

// Animation loop
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);

  controls.update();
  renderer.render(scene, camera);
}

animate();

// Handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});