// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x202020); // Dark gray background

// Add OrbitControls for user interaction
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 10;

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Load GLB model
const loader = new THREE.GLTFLoader();
loader.load('model.glb', function (gltf) {
    const model = gltf.scene;
    scene.add(model);

    // Auto-center model
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    model.position.sub(center); // Center the model
    model.scale.set(1, 1, 1);

    // Adjust camera position (Move in front of the model)
    camera.position.set(0, size.y * 0.5, size.z * 3);
    camera.lookAt(model.position);

    // Play animation if available
    if (gltf.animations.length > 0) {
        const mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(gltf.animations[0]); // Use first animation (change index if needed)
        action.play();

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            mixer.update(0.01); // Adjust speed if needed
            renderer.render(scene, camera);
        }
        animate();
    }
}, undefined, function (error) {
    console.error('Error loading GLB model:', error);
});

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
