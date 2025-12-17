// --- STARFIELD (6000 STARS) ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg-canvas"),
    antialias: true,
    alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);

const starsGeometry = new THREE.BufferGeometry();
const starsCount = 6000;
const posArray = new Float32Array(starsCount * 3);
for (let i = 0; i < starsCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 350;
}
starsGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

const starsMaterial = new THREE.PointsMaterial({
    size: 0.8,
    color: 0xffffff,
    transparent: true,
    blending: THREE.AdditiveBlending,
});
const starMesh = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starMesh);

let mouseX = 0;
let mouseY = 0;
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX / window.innerWidth - 0.5;
    mouseY = e.clientY / window.innerHeight - 0.5;
});

function animate() {
    requestAnimationFrame(animate);
    starMesh.rotation.y += 0.0006;
    starMesh.position.x += (mouseX * 35 - starMesh.position.x) * 0.05;
    starMesh.position.y += (-mouseY * 35 - starMesh.position.y) * 0.05;
    renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- GSAP REVEALS & YEAR ---
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 1.2,
            scrollTrigger: { trigger: el, start: "top 90%" },
        }
    );
});

document.getElementById("year").textContent = new Date().getFullYear();
