// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game-container').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

// Responsive Resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

// Barn Model
const barnGroup = new THREE.Group();
scene.add(barnGroup);

const barnFloor = new THREE.Mesh(
    new THREE.BoxGeometry(10, 0.2, 8),
    new THREE.MeshStandardMaterial({ color: 0x8B4513 })
);
barnFloor.position.y = 0.1;
barnGroup.add(barnFloor);

const wallGeometry = new THREE.ExtrudeGeometry(
    new THREE.Shape([
        new THREE.Vector2(-4, 0), new THREE.Vector2(4, 0),
        new THREE.Vector2(4, 3), new THREE.Vector2(-4, 3)
    ]),
    { depth: 0.2, bevelEnabled: false }
);
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xDEB887, roughness: 0.7 });
const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
backWall.position.set(0, 1.5, -4);
backWall.rotation.y = Math.PI;
barnGroup.add(backWall);

const leftWall = new THREE.Mesh(wallGeometry.clone(), wallMaterial);
leftWall.position.set(-5, 1.5, 0);
leftWall.rotation.y = Math.PI / 2;
barnGroup.add(leftWall);

const rightWall = new THREE.Mesh(wallGeometry.clone(), wallMaterial);
rightWall.position.set(5, 1.5, 0);
rightWall.rotation.y = -Math.PI / 2;
barnGroup.add(rightWall);

const roofBase = new THREE.Mesh(
    new THREE.ConeGeometry(6, 2, 4),
    new THREE.MeshStandardMaterial({ color: 0xA9A9A9, metalness: 0.2 })
);
roofBase.position.set(0, 3.5, 0);
roofBase.rotation.y = Math.PI / 4;
barnGroup.add(roofBase);

const doorFrameShape = new THREE.Shape()
    .moveTo(-1, 0).lineTo(-1, 3).lineTo(1, 3).lineTo(1, 0).moveTo(-0.2, 0).lineTo(-0.2, 3).moveTo(0.2, 0).lineTo(0.2, 3);
const doorFrameGeometry = new THREE.ExtrudeGeometry(doorFrameShape, { depth: 0.3, bevelEnabled: false });
const doorFrame = new THREE.Mesh(doorFrameGeometry, new THREE.MeshStandardMaterial({ color: 0x4B0082 }));
doorFrame.position.set(0, 1.5, 4);
barnGroup.add(doorFrame);

const lights = [];
for (let i = -4; i <= 4; i += 1.5) {
    const light = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xFFFF99 })
    );
    light.position.set(i, 2.7, -3.8);
    lights.push(light);
    barnGroup.add(light);
}

// Riley Model
const rileyGroup = new THREE.Group();
scene.add(rileyGroup);

const rileyBody = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.4, 1.2, 4, 8),
    new THREE.MeshStandardMaterial({ color: 0x006400 })
);
rileyBody.position.y = 0.6;
rileyGroup.add(rileyBody);

const rileyHead = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xF0E68C })
);
rileyHead.position.y = 1.3;
rileyGroup.add(rileyHead);

const lantern = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 0.3, 8),
    new THREE.MeshStandardMaterial({ color: 0xFFA500 })
);
lantern.position.set(0.3, 0.8, 0);
rileyGroup.add(lantern);

const rileyLight = new THREE.PointLight(0xFFA500, 1, 2);
rileyLight.position.set(0.3, 0.8, 0);
rileyGroup.add(rileyLight);

rileyGroup.position.set(-0.5, 0, 4);

// Vampire Model
const vampireGroupTemplate = new THREE.Group();

const vampireBody = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.35, 1.1, 4, 8),
    new THREE.MeshStandardMaterial({ color: 0x2F4F4F })
);
vampireBody.position.y = 0.55;
vampireGroupTemplate.add(vampireBody);

const cloak = new THREE.Mesh(
    new THREE.ConeGeometry(0.5, 1.5, 8),
    new THREE.MeshStandardMaterial({ color: 0x000000, transparent: true, opacity: 0.7 })
);
cloak.position.y = 0.5;
cloak.rotation.x = Math.PI / 2;
vampireGroupTemplate.add(cloak);

const vampireHead = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xF5F5F5 })
);
vampireHead.position.y = 1.2;
vampireGroupTemplate.add(vampireHead);

const eyeLeft = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xFF0000 })
);
eyeLeft.position.set(-0.1, 1.25, 0.2);
vampireGroupTemplate.add(eyeLeft);

const eyeRight = eyeLeft.clone();
eyeRight.position.set(0.1, 1.25, 0.2);
vampireGroupTemplate.add(eyeRight);

// Partygoer Model
const partygoerGroupTemplate = new THREE.Group();

const partyBody = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.3, 0.9, 4, 8),
    new THREE.MeshStandardMaterial({ color: 0x800080 })
);
partyBody.position.y = 0.45;
partygoerGroupTemplate.add(partyBody);

const arms = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.5, 0.1),
    new THREE.MeshStandardMaterial({ color: 0x00CED1 })
);
arms.position.y = 0.7;
partygoerGroupTemplate.add(arms);

const partyHead = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xFFD700 })
);
partyHead.position.y = 0.9;
partygoerGroupTemplate.add(partyHead);

// Populate Scene
const partygoers = [];
for (let i = 0; i < 10; i++) {
    const pg = partygoerGroupTemplate.clone();
    pg.position.set(
        THREE.MathUtils.randFloat(-4, 4),
        0,
        THREE.MathUtils.randFloat(-3, 3)
    );
    partygoers.push(pg);
    scene.add(pg);
}

const vampires = [];
for (let i = 0; i < 3; i++) {
    const vamp = vampireGroupTemplate.clone();
    vamp.position.set(THREE.MathUtils.randFloat(-5, 5), 0, 6 + i * 2);
    vampires.push(vamp);
    scene.add(vamp);
}

// Ground
const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x1a2b3c });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Camera and Controls
camera.position.set(0, 5, 10);
camera.lookAt(0, 1, 0);

let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
let touchStartX = 0, touchStartY = 0;
let isDragging = false;

function handleInput() {
    if (isTouchDevice) {
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isDragging = true;
        });

        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                const touchX = e.touches[0].clientX;
                const touchY = e.touches[0].clientY;
                const deltaX = (touchX - touchStartX) * 0.002;
                const deltaY = (touchY - touchStartY) * 0.002;
                camera.position.x += deltaX;
                camera.position.y -= deltaY;
                camera.lookAt(0, 1, 0);
                touchStartX = touchX;
                touchStartY = touchY;
            }
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });
    } else {
        document.addEventListener('keydown', (e) => {
            const speed = 0.1;
            switch (e.key) {
                case 'ArrowLeft': camera.position.x -= speed; break;
                case 'ArrowRight': camera.position.x += speed; break;
                case 'ArrowUp': camera.position.y += speed; break;
                case 'ArrowDown': camera.position.y -= speed; break;
            }
            camera.lookAt(0, 1, 0);
        });
    }
}
handleInput();

// Dialogue System
const dialogueBox = document.getElementById('dialogue-box');
const dialogueText = document.getElementById('dialogue-text');
const inviteButton = document.getElementById('invite-button');
const denyButton = document.getElementById('deny-button');

let currentVampire = null;
let vampiresInvited = 0;
let vampiresDenied = 0;

const vampireDialogues = [
    "Please, I’m just a weary traveler seeking warmth. Won’t you let me in?",
    "I’m an old friend of someone inside! They’ll be so disappointed if I can’t join. Invite me in, please?",
    "I’m freezing out here! You wouldn’t leave someone to suffer, would you? Let me in!"
];

function approachNextVampire() {
    if (vampires.length === 0) {
        dialogueText.textContent = vampiresInvited === 0 ? "You kept the party safe! You win!" : "Game Over! Too many vampires got in!";
        inviteButton.style.display = 'none';
        denyButton.style.display = 'none';
        return;
    }

    currentVampire = vampires.shift();
    currentVampire.position.set(0, 0.5, 4);
    dialogueBox.classList.remove('hidden');
    dialogueText.textContent = vampireDialogues[vampiresInvited + vampiresDenied];

    if (isTouchDevice) {
        inviteButton.addEventListener('touchend', handleInvite, { once: true });
        denyButton.addEventListener('touchend', handleDeny, { once: true });
    } else {
        inviteButton.addEventListener('click', handleInvite, { once: true });
        denyButton.addEventListener('click', handleDeny, { once: true });
    }
}

function handleInvite() {
    vampiresInvited++;
    currentVampire.position.set(0, 0.5, 0);
    dialogueBox.classList.add('hidden');
    if (vampiresInvited >= 3) {
        dialogueText.textContent = "Game Over! All vampires got in!";
        inviteButton.style.display = 'none';
        denyButton.style.display = 'none';
    } else {
        setTimeout(approachNextVampire, 1000);
    }
}

function handleDeny() {
    vampiresDenied++;
    currentVampire.position.set(0, 0.5, 10);
    dialogueBox.classList.add('hidden');
    if (vampiresDenied + vampiresInvited === 3) {
        dialogueText.textContent = vampiresInvited === 0 ? "You kept the party safe! You win!" : "Game Over! Too many vampires got in!";
        inviteButton.style.display = 'none';
        denyButton.style.display = 'none';
    } else {
        setTimeout(approachNextVampire, 1000);
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    lights.forEach(light => {
        light.position.y = 2.7 + Math.sin(Date.now() * 0.001 + light.position.x) * 0.1;
    });

    partygoers.forEach(pg => {
        pg.rotation.y += 0.02;
        pg.position.y = 0.45 + Math.sin(Date.now() * 0.002 + pg.position.x) * 0.1;
    });

    if (currentVampire) {
        currentVampire.position.z = Math.max(4, currentVampire.position.z - 0.01);
    }

    renderer.render(scene, camera);
}
animate();

// Start Game
setTimeout(approachNextVampire, 1000);
