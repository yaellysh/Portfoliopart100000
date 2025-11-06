import * as THREE from "three";
import { useEffect, useRef } from "react";
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current!;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1e-6,
      1e27
    );
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      logarithmicDepthBuffer: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0x777777));
    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(100, 100, 100);
    scene.add(dirLight);

    // Create labels
    const loader = new FontLoader();
    loader.load(
      process.env.PUBLIC_URL + "/fonts/helvetiker_regular.typeface.json",
      (font: Font) => {
        const labels = [
          { label: "About", size: 10, z: -100 },
          { label: "Projects", size: 20, z: -500 },
          { label: "Experience", size: 30, z: -1000 },
          { label: "Contact", size: 40, z: -2000 },
        ];

        labels.forEach((entry, i) => {
          const mat = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(i / labels.length, 0.5, 0.5),
          });
          const geo = new TextGeometry(entry.label, {
            font,
            size: entry.size,
            depth: entry.size / 4,
          });
          geo.computeBoundingBox();
          const mesh = new THREE.Mesh(geo, mat);
          mesh.position.x = -entry.size * 2;
          mesh.position.y = entry.size * 0.5;
          mesh.position.z = entry.z;
          scene.add(mesh);
        });
      }
    );

    // ---- Scroll Logic (no page scroll) ----
    let scrollSpeed = 0;
    let targetZ = 100;
    const scrollSensitivity = 0.02;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      scrollSpeed += event.deltaY * scrollSensitivity;
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    const animate = () => {
      requestAnimationFrame(animate);
      targetZ += scrollSpeed;
      scrollSpeed *= 0.9; // friction
      camera.position.z += (targetZ - camera.position.z) * 0.05; // easing
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    />
  );
}
