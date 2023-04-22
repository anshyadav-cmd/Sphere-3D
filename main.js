import * as Three from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

// creating scene
const scene = new Three.Scene();

// adding basic shape provide by three js

const geometry = new Three.SphereGeometry(3, 100, 100);
// (radius , width_segment , height_segment)
const material = new Three.MeshStandardMaterial({
  color: "#00ff83",
  roughness: 0.4,
});
const mesh = new Three.Mesh(geometry, material);

scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// light
const light = new Three.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
light.intensity = 1.25;
scene.add(light);

// Camera
const camera = new Three.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 20;
scene.add(camera);
// (field of view (keep it under 50 or you going to get bird eye view), aspect ratio (), not to show below, far);

//Renderer
const canvas = document.querySelector(".webGl");
const renderer = new Three.WebGLRenderer({ canvas });

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotateSpeed = 5;

// Resize

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

// timeline animation magicccccc
const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });

tl.fromTo("nav", { y: -100 }, { y: 0 });
tl.fromTo(".title", { opacity: 0 }, { opacity: 1 });

//Mouse Animation colorrrrr

let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => {
  mouseDown = true;
});
window.addEventListener("mouseup", () => {
  mouseDown = false;
});

window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    console.log("down -> true");
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150,
    ];
    console.log(Math.round((e.pageX / sizes.width) * 255));
    let newColor = new Three.Color(`rgb(${rgb.join(",")})`);
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    });
  }
});
