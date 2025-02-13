// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x202020); // Dark gray background

// Add OrbitControls (for moving the model)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth movement
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 1; // Min zoom
controls.maxDistance = 10; // Max zoom

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Load .glb model
const loader = new THREE.GLTFLoader();
loader.load('model.glb', function (gltf) {
    const model = gltf.scene;
    scene.add(model);

    // Auto-center model
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    model.position.sub(center);
    model.scale.set(1, 1, 1);

    // Adjust camera based on model size
    camera.position.set(0, size.y * 1.5, size.z * 2);
    camera.lookAt(model.position);
}, undefined, function (error) {
    console.error('Error loading GLB model:', error);
});

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animate scene
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls on each frame
    renderer.render(scene, camera);
}
animate();
