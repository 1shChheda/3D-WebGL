import './style.css'
import * as THREE from 'three';
import { gsap } from 'gsap';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'lil-gui';

/* DebugUI */
const gui = new dat.GUI();


/* Scene */
const scene = new THREE.Scene();

/* Object (Red Cube) */
// const geometry = new THREE.BoxGeometry(1, 1, 1, 3, 3, 2); // arg: height, width, depth

const geometry = new THREE.BufferGeometry();

const count = 5000;
const vertices = new Float32Array(count * 3 * 3);
for(let i = 0; i < count * 3 * 3; i++) {
    vertices[i] = (Math.random() - 0.5) * 4
}

geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

const material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } );
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/* Debug UI */

gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevation');
gui.add(mesh, 'visible');

const parameters = {
    color: 0xfff000,
    spin: () => {
        gsap.to(mesh.rotation, { duration: 1, y: 10 });
    }
};
gui.addColor(parameters, 'color')
    .onChange(() => {
        material.color.set(parameters.color)
    });

gui.add(parameters, 'spin');

// Key-Shortcut To Hide/Show Debug UI
window.addEventListener('keydown', (event) => {
    if (event.key === 'h') {
        if (gui._hidden)
            gui.show();
        else
            gui.hide();
    }
});

/* AxesHelper */
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/* Sizes (related to Camera) */
    // temporary values
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

/* Mouse Coordinates */

    // to store coordinates
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5; 
    cursor.y = - (event.clientY / sizes.height - 0.5);
});

/* Camera */
    // using Perspective Camera 
        // most common - mimics the way the human eye sees
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

    // NOTHING VISIBLE! bcoz the camera is inside the cube...need to move it backward
camera.position.z = 7; // since the dim. of cube is 1,1,1 -> position value is bigger than that, to get out of cube

// camera.position.x = 2;
// camera.position.y = 1;
scene.add(camera);

// camera.lookAt(new THREE.Vector3(3,0,0));
// camera.lookAt(mesh.position); 

/* Renderer */

    // grab canvas from HTML DOM
const canvas = document.querySelector('.webgl');

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

    // use "setSize()" method to update the size of the renderer
renderer.setSize(sizes.width, sizes.height);

/* Additional Controls */
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // smooth controls
// controls.enabled = false; // to Enable/Disable OrbitControls


/* To estimate Frame rate */
let clock = new THREE.Clock();

/* Create tween using "gsap" */
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
// gsap.to(mesh.position, { duration: 1, delay: 3, x: 0 });

/* Creating timeline for Gsap animations */
// gsap.timeline()
//     .to(mesh.position, { duration: 2, delay: 2, y: 2 })
//     .to(mesh.position, { duration: 3, delay: 3, z: 0.5, ease: 'bounce' })

// extra: to resize the window so that we don't have to reload again and again for new render when we resize the screen
window.addEventListener('resize', () => {

    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // update the camera too
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // to update the renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

});


/* FUllScreen Experience on double-click */
window.addEventListener('dblclick', () => {

    if(!document.fullscreenElement) {
        canvas.requestFullscreen();
    } else {
        document.exitFullscreen();
    }

});

function animate() {
    // elapsedTime: total time that has passed since the clock was started
        // continues to increase as long as the clock is running.
    const elapsedTime = clock.getElapsedTime();
    // console.log(elapsedTime);

    mesh.rotation.z = Math.cos(elapsedTime);
    
    /* for normal camera position controls */
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.position.y = cursor.y * 3;
    // camera.lookAt(mesh.position);

    controls.update(); // Update controls


    // NOW, RENDER!
    renderer.render(scene, camera); // arg: scene, camera
    window.requestAnimationFrame(animate);

}

animate();