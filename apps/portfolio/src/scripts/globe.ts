import { AdditiveBlending, BackSide, BufferAttribute, BufferGeometry, Color, DoubleSide, Group, Line, LineBasicMaterial, Mesh, MeshBasicMaterial, NormalBlending, PerspectiveCamera, PlaneGeometry, Points, QuadraticBezierCurve3, RingGeometry, Scene, ShaderMaterial, SphereGeometry, Vector3, WebGLRenderer } from "three";

type Waypoint = { top: number; x: number; y: number; scale: number; opacity: number };

const HO_CHI_MINH: [number, number] = [10.8, 106.7];
const SEOUL: [number, number] = [37.5, 127];
const CAMERA_Z = 3.2;
const FOV = 40;
const DEFAULT_POSE = { x: 1.2, y: -0.1, scale: 1, opacity: 0.25 };
// Tốc độ bám theo vị trí cuộn, tính theo giây để máy yếu và máy mạnh chạy như nhau.
const FOLLOW_SPEED = 5;
// Máy không đủ 15 khung hình/giây thì dừng địa cầu, để nội dung và chữ vẫn phản hồi kịp.
const SLOW_FRAME_MS = 66;
const FRAMES_TO_MEASURE = 20;
const STATIC_RENDER_DELAY_MS = 150;
const STAR_COUNT = 1400;
const PACKET_COUNT = 5;
const MAX_UP_TILT = -0.95;
const LIGHT_OPACITY = 0.45;
// Vòng quỹ đạo quanh địa cầu: bán kính, độ nghiêng (rad) và số vòng mỗi giây.
const ORBITS = [
  { radius: 1.38, tiltX: 1.25, tiltZ: 0.35, speed: 0.045 },
  { radius: 1.62, tiltX: 1.05, tiltZ: -0.5, speed: -0.03 },
];
const ORBIT_POINTS = 720;
// Lúc mới vào, địa cầu trồi lên từ dưới thay vì hiện sẵn.
const INTRO_DROP = 0.4;
const INTRO_SCALE = 0.86;

const toVector = ([lat, lon]: [number, number], radius = 1) => {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new Vector3(-radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
};

async function loadLand() {
  const response = await fetch("/globe-land.bin");
  return new Int16Array(await response.arrayBuffer());
}

function buildDots(raw: Int16Array, step: number, pixelRatio: number) {
  const count = Math.floor(raw.length / 2 / step);
  const positions = new Float32Array(count * 3);
  const glow = new Float32Array(count);
  const distance = new Float32Array(count);
  const home = toVector(HO_CHI_MINH);
  for (let i = 0; i < count; i++) {
    const point = toVector([raw[i * 2 * step] / 100, raw[i * 2 * step + 1] / 100]);
    point.toArray(positions, i * 3);
    glow[i] = Math.max(0, 1 - point.distanceTo(home) / 0.34);
    distance[i] = point.angleTo(home) / Math.PI;
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("aGlow", new BufferAttribute(glow, 1));
  geometry.setAttribute("aDistance", new BufferAttribute(distance, 1));
  const material = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: { uBase: { value: new Color() }, uHot: { value: new Color() }, uRatio: { value: pixelRatio }, uTime: { value: 0 } },
    // Sóng lan từ điểm nhà ra khắp các châu lục: mép trước gắt, đuôi tan dần, càng xa càng yếu.
    vertexShader: `attribute float aGlow; attribute float aDistance; varying float vGlow; uniform float uRatio; uniform float uTime;
      void main() {
        float wave = fract(uTime * 0.14 - aDistance);
        float pulse = smoothstep(0.0, 0.03, wave) * (1.0 - smoothstep(0.03, 0.26, wave)) * (1.0 - aDistance * 0.75);
        vGlow = clamp(aGlow + pulse * 0.85, 0.0, 1.0);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = (2.5 + aGlow * 2.6 + pulse * 1.6) * uRatio * (3.2 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `varying float vGlow; uniform vec3 uBase; uniform vec3 uHot;
      void main() { float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; gl_FragColor = vec4(mix(uBase, uHot, vGlow), (0.85 + vGlow * 0.15) * smoothstep(0.5, 0.25, d)); }`,
  });
  return new Points(geometry, material);
}

function buildAtmosphere() {
  const material = new ShaderMaterial({
    transparent: true,
    side: BackSide,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: { uColor: { value: new Color("#7a68ff") } },
    vertexShader: `varying vec3 vNormal; void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `varying vec3 vNormal; uniform vec3 uColor; void main() { float edge = clamp(-dot(vNormal, vec3(0.0, 0.0, 1.0)) / 0.5, 0.0, 1.0); gl_FragColor = vec4(uColor, pow(edge, 2.4) * 0.7); }`,
  });
  return new Mesh(new SphereGeometry(1.15, 96, 96), material);
}

function buildStars(pixelRatio: number) {
  const positions = new Float32Array(STAR_COUNT * 3);
  const phases = new Float32Array(STAR_COUNT);
  for (let i = 0; i < STAR_COUNT; i++) {
    positions.set([(Math.random() - 0.5) * 16, (Math.random() - 0.5) * 12, -2 - Math.random() * 6], i * 3);
    phases[i] = Math.random() * 6.28;
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("aPhase", new BufferAttribute(phases, 1));
  const material = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uRatio: { value: pixelRatio } },
    vertexShader: `attribute float aPhase; varying float vAlpha; uniform float uTime; uniform float uRatio;
      void main() { vAlpha = 0.35 + 0.45 * sin(uTime * 0.9 + aPhase); gl_PointSize = (1.0 + 1.4 * fract(aPhase * 7.31)) * uRatio; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `varying float vAlpha; void main() { if (length(gl_PointCoord - 0.5) > 0.5) discard; gl_FragColor = vec4(0.8, 0.82, 1.0, vAlpha); }`,
  });
  return new Points(geometry, material);
}

// Tinh vân phía sau: một mặt phẳng phủ kín màn, nhiễu fbm trôi chậm. Chỉ dùng ở nền tối.
function buildNebula() {
  const material = new ShaderMaterial({
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uAspect: { value: 1 }, uShift: { value: 0 }, uPointer: { value: new Vector3() } },
    vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 1.0, 1.0); }`,
    fragmentShader: `varying vec2 vUv; uniform float uTime; uniform float uAspect; uniform float uShift; uniform vec3 uPointer;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }
      float fbm(vec2 p) { float v = 0.0; float a = 0.5; for (int i = 0; i < 3; i++) { v += a * noise(p); p = p * 2.03 + 17.0; a *= 0.5; } return v; }
      void main() {
        vec2 p = vec2((vUv.x - 0.5) * uAspect, vUv.y - 0.5) * 1.7;
        p += uPointer.xy * 0.05;
        p.y += uShift * 0.6;
        float t = uTime * 0.02;
        float warp = fbm(p * 1.3 + vec2(t, -t * 0.7));
        float cloud = fbm(p * 1.1 + warp * 1.6 + vec2(-t * 0.6, t * 0.4));
        float mask = smoothstep(0.42, 0.9, cloud);
        vec3 color = mix(vec3(0.16, 0.12, 0.62), vec3(0.50, 0.24, 0.93), smoothstep(0.3, 0.8, warp));
        color = mix(color, vec3(0.20, 0.52, 0.98), smoothstep(0.62, 0.95, cloud) * 0.35);
        // Mép màn đậm hơn giữa màn, để chữ ở giữa vẫn nằm trên nền tối.
        float edge = smoothstep(0.1, 0.85, length(vUv - 0.5) * 1.35);
        gl_FragColor = vec4(color, mask * (0.14 + edge * 0.3));
      }`,
  });
  const nebula = new Mesh(new PlaneGeometry(2, 2), material);
  nebula.frustumCulled = false;
  nebula.renderOrder = -1;
  return nebula;
}

// Một vòng quỹ đạo: vệt sáng kiểu sao chổi chạy quanh, phần còn lại của vòng chỉ mờ mờ.
function buildOrbit(radius: number, speed: number, pixelRatio: number) {
  const positions = new Float32Array(ORBIT_POINTS * 3);
  const turns = new Float32Array(ORBIT_POINTS);
  for (let i = 0; i < ORBIT_POINTS; i++) {
    const turn = i / ORBIT_POINTS;
    positions.set([Math.cos(turn * Math.PI * 2) * radius, 0, Math.sin(turn * Math.PI * 2) * radius], i * 3);
    turns[i] = turn;
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("aTurn", new BufferAttribute(turns, 1));
  const material = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uSpeed: { value: speed }, uRatio: { value: pixelRatio }, uColor: { value: new Color() } },
    vertexShader: `attribute float aTurn; varying float vAlpha; uniform float uTime; uniform float uSpeed; uniform float uRatio;
      void main() {
        float head = fract(aTurn * sign(uSpeed) - uTime * abs(uSpeed));
        float tail = pow(head, 7.0);
        vAlpha = 0.16 + tail * 0.84;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = (1.2 + pow(head, 60.0) * 5.0 + tail * 1.4) * uRatio * (3.2 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `varying float vAlpha; uniform vec3 uColor; void main() { float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; gl_FragColor = vec4(uColor, vAlpha * smoothstep(0.5, 0.15, d)); }`,
  });
  return new Points(geometry, material);
}

function readWaypoints(): Waypoint[] {
  // Màn dọc hoặc hẹp không đủ chỗ đặt địa cầu cạnh chữ, nên mục nào có tư thế riêng cho màn hẹp thì dùng tư thế đó.
  const isCramped = innerWidth < 1024 || innerWidth / innerHeight < 1.15;
  return [...document.querySelectorAll<HTMLElement>("[data-globe]")].map((section) => {
    const [x, y, scale, opacity] = ((isCramped && section.dataset.globeNarrow) || section.dataset.globe || "").split(" ").map(Number);
    const rect = section.getBoundingClientRect();
    return { top: rect.top + scrollY + rect.height / 2, x, y, scale, opacity };
  });
}

function poseAt(waypoints: Waypoint[], center: number) {
  if (!waypoints.length) return DEFAULT_POSE;
  if (center <= waypoints[0].top) return waypoints[0];
  for (let i = 1; i < waypoints.length; i++) {
    const previous = waypoints[i - 1];
    const next = waypoints[i];
    if (center > next.top) continue;
    const raw = (center - previous.top) / (next.top - previous.top);
    const t = raw * raw * (3 - 2 * raw);
    const mix = (a: number, b: number) => a + (b - a) * t;
    return { x: mix(previous.x, next.x), y: mix(previous.y, next.y), scale: mix(previous.scale, next.scale), opacity: mix(previous.opacity, next.opacity) };
  }
  return waypoints[waypoints.length - 1];
}

export async function startGlobe(canvas: HTMLCanvasElement) {
  const isReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isNarrow = () => innerWidth < 768;
  const pixelRatio = Math.min(devicePixelRatio, isNarrow() ? 1.5 : 2);

  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: !isNarrow(), powerPreference: "low-power" });
  renderer.setPixelRatio(pixelRatio);
  const scene = new Scene();
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 30);
  camera.position.z = CAMERA_Z;

  const nebula = buildNebula();
  scene.add(nebula);

  const stars = buildStars(pixelRatio);
  scene.add(stars);

  const globe = new Group();
  const spinner = new Group();
  globe.add(spinner);
  scene.add(globe);

  // Khối cầu chỉ ghi độ sâu, để các điểm ở mặt sau bị che.
  const occluder = new Mesh(new SphereGeometry(0.985, 48, 48), new MeshBasicMaterial({ colorWrite: false }));
  spinner.add(occluder);

  const atmosphere = buildAtmosphere();
  globe.add(atmosphere);

  // Viền sáng phía trong mép địa cầu.
  const innerGlow = new Mesh(
    new SphereGeometry(0.99, 96, 96),
    new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: { uColor: { value: new Color("#7a68ff") } },
      vertexShader: `varying vec3 vNormal; void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `varying vec3 vNormal; uniform vec3 uColor; void main() { gl_FragColor = vec4(uColor, pow(1.0 - vNormal.z, 3.2) * 0.75); }`,
    }),
  );
  globe.add(innerGlow);

  const dots = buildDots(await loadLand(), isNarrow() ? 2 : 1, pixelRatio);
  spinner.add(dots);

  const orbits = ORBITS.map(({ radius, tiltX, tiltZ, speed }) => {
    const orbit = buildOrbit(radius, speed, pixelRatio);
    orbit.rotation.set(tiltX, 0, tiltZ);
    globe.add(orbit);
    return orbit;
  });

  const from = toVector(HO_CHI_MINH, 1.005);
  const to = toVector(SEOUL, 1.005);
  const control = from.clone().add(to).multiplyScalar(0.5).normalize().multiplyScalar(1.28);
  const curve = new QuadraticBezierCurve3(from, control, to);
  const arcMaterial = new LineBasicMaterial({ transparent: true, opacity: 0.8 });
  spinner.add(new Line(new BufferGeometry().setFromPoints(curve.getPoints(64)), arcMaterial));

  const packetPositions = new Float32Array(PACKET_COUNT * 3);
  const packetGeometry = new BufferGeometry();
  packetGeometry.setAttribute("position", new BufferAttribute(packetPositions, 3));
  const packetMaterial = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { uColor: { value: new Color() }, uRatio: { value: pixelRatio } },
    vertexShader: `uniform float uRatio; void main() { gl_PointSize = 6.0 * uRatio; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `uniform vec3 uColor; void main() { float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; gl_FragColor = vec4(uColor, smoothstep(0.5, 0.1, d)); }`,
  });
  spinner.add(new Points(packetGeometry, packetMaterial));

  const ringMaterials = [0, 1, 2].map(() => new MeshBasicMaterial({ transparent: true, side: DoubleSide, depthWrite: false }));
  const rings = ringMaterials.map((material, index) => {
    const ring = new Mesh(new RingGeometry(0.97, 1, 64), material);
    const anchor = index === 2 ? SEOUL : HO_CHI_MINH;
    ring.position.copy(toVector(anchor, 1.01));
    ring.lookAt(toVector(anchor, 2));
    spinner.add(ring);
    return ring;
  });

  function applyTheme() {
    const isDark = document.documentElement.classList.contains("dark");
    const baseColor = isDark ? "#8f8cff" : "#4f46e5";
    const hotColor = isDark ? "#e6e9ff" : "#3122c9";
    dots.material.uniforms.uBase.value.set(baseColor);
    dots.material.uniforms.uHot.value.set(hotColor);
    dots.material.blending = isDark ? AdditiveBlending : NormalBlending;
    dots.material.needsUpdate = true;
    arcMaterial.color.set(isDark ? "#c7d2fe" : "#4f46e5");
    packetMaterial.uniforms.uColor.value.set(isDark ? "#ffffff" : "#3122c9");
    for (const material of ringMaterials) material.color.set(isDark ? "#c7d2fe" : "#4f46e5");
    for (const orbit of orbits) {
      orbit.material.uniforms.uColor.value.set(isDark ? "#c7d2fe" : "#4f46e5");
      orbit.material.blending = isDark ? AdditiveBlending : NormalBlending;
      orbit.material.needsUpdate = true;
    }
    nebula.visible = isDark;
    atmosphere.visible = isDark;
    innerGlow.visible = isDark;
    stars.visible = isDark;
  }

  let waypoints = readWaypoints();
  let viewHeight = 0;
  let viewWidth = 0;

  function resize() {
    const width = innerWidth;
    const height = innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    nebula.material.uniforms.uAspect.value = camera.aspect;
    viewHeight = 2 * Math.tan((FOV * Math.PI) / 360) * CAMERA_Z;
    viewWidth = viewHeight * camera.aspect;
    waypoints = readWaypoints();
  }

  const current = { ...DEFAULT_POSE, ...poseAt(waypoints, scrollY + innerHeight / 2) };
  if (!isReducedMotion) {
    current.y -= INTRO_DROP;
    current.scale *= INTRO_SCALE;
    current.opacity = 0;
  }
  const pointer = { x: 0, y: 0, currentX: 0, currentY: 0 };
  const homeAngle = (-196 * Math.PI) / 180;
  const homeTilt = (HO_CHI_MINH[0] * Math.PI) / 180;

  function renderFrame(time: number, damping: number) {
    const target = poseAt(waypoints, scrollY + innerHeight / 2);
    // Màn hẹp: địa cầu luôn ở giữa và mờ hơn, để không đè lên chữ.
    const narrow = isNarrow();
    const targetX = narrow ? 0 : target.x;
    const targetScale = narrow ? target.scale * 0.72 : target.scale;
    // Màn hẹp không có chỗ né chữ: chỉ hiện khi địa cầu nằm dưới đáy màn. Nền sáng thì chấm đậm hơn nên hạ thêm.
    const themeFactor = document.documentElement.classList.contains("dark") ? 1 : LIGHT_OPACITY;
    const targetOpacity = (narrow && target.y > -1 ? 0 : target.opacity) * themeFactor;
    current.x += (targetX - current.x) * damping;
    current.y += (target.y - current.y) * damping;
    current.scale += (targetScale - current.scale) * damping;
    current.opacity += (targetOpacity - current.opacity) * damping;
    pointer.currentX += (pointer.x - pointer.currentX) * 0.05;
    pointer.currentY += (pointer.y - pointer.currentY) * 0.05;

    globe.position.set((current.x * viewWidth) / 2, (current.y * viewHeight) / 2, 0);
    globe.scale.setScalar(current.scale);
    canvas.style.opacity = String(current.opacity);

    const seconds = time / 1000;
    const scrollProgress = scrollY / Math.max(document.documentElement.scrollHeight - innerHeight, 1);
    spinner.rotation.y = homeAngle + Math.sin(seconds * 0.12) * 0.2 + scrollProgress * 0.35 + pointer.currentX * 0.2;
    // Địa cầu nằm thấp thì nghiêng lên để Việt Nam vẫn ở trong khung nhìn.
    spinner.rotation.x = homeTilt + Math.max(current.y * 0.72, MAX_UP_TILT) + pointer.currentY * 0.1;

    stars.material.uniforms.uTime.value = seconds;
    stars.position.set(-pointer.currentX * 0.12, scrollProgress * 2 + pointer.currentY * 0.08, 0);
    dots.material.uniforms.uTime.value = seconds;
    nebula.material.uniforms.uTime.value = seconds;
    nebula.material.uniforms.uShift.value = scrollProgress;
    nebula.material.uniforms.uPointer.value.set(pointer.currentX, -pointer.currentY, 0);
    for (const orbit of orbits) orbit.material.uniforms.uTime.value = seconds;

    for (let i = 0; i < PACKET_COUNT; i++) {
      curve.getPoint((seconds * 0.22 + i / PACKET_COUNT) % 1).toArray(packetPositions, i * 3);
    }
    packetGeometry.attributes.position.needsUpdate = true;

    rings.forEach((ring, index) => {
      const pulse = (seconds * 0.45 + index * 0.5) % 1;
      ring.scale.setScalar(index === 2 ? 0.022 : 0.02 + pulse * 0.1);
      ringMaterials[index].opacity = index === 2 ? 0.9 : 1 - pulse;
    });

    renderer.render(scene, camera);
  }

  applyTheme();
  resize();

  new MutationObserver(() => {
    applyTheme();
    if (isReducedMotion) renderFrame(0, 1);
  }).observe(document.documentElement, { attributeFilter: ["class"] });
  addEventListener("resize", () => {
    resize();
    if (isReducedMotion) renderFrame(0, 1);
  });

  if (isReducedMotion) {
    renderFrame(0, 1);
    addEventListener("scroll", () => renderFrame(0, 1), { passive: true });
    return;
  }

  addEventListener("pointermove", (event) => {
    pointer.x = (event.clientX / innerWidth - 0.5) * 2;
    pointer.y = (event.clientY / innerHeight - 0.5) * 2;
  }, { passive: true });

  // Chiều cao trang đổi sau khi font và hiệu ứng ổn định.
  setTimeout(() => (waypoints = readWaypoints()), 1500);

  let isRunning = false;
  let previousTime = 0;
  let measuredFrames = 0;
  let measuredMs = 0;
  let isTooSlow = false;

  const switchToStatic = () => {
    isTooSlow = true;
    isRunning = false;
    let timer = 0;
    addEventListener("scroll", () => {
      clearTimeout(timer);
      timer = window.setTimeout(() => renderFrame(performance.now(), 1), STATIC_RENDER_DELAY_MS);
    }, { passive: true });
  };

  const loop = (time: number) => {
    if (!isRunning) return;
    const frameMs = time - previousTime;
    const elapsed = Math.min(frameMs / 1000, 0.25);
    previousTime = time;
    renderFrame(time, 1 - Math.exp(-FOLLOW_SPEED * elapsed));
    if (measuredFrames < FRAMES_TO_MEASURE) {
      measuredFrames++;
      measuredMs += frameMs;
      if (measuredFrames === FRAMES_TO_MEASURE && measuredMs / FRAMES_TO_MEASURE > SLOW_FRAME_MS) return switchToStatic();
    }
    requestAnimationFrame(loop);
  };
  const setRunning = (shouldRun: boolean) => {
    if (isTooSlow || shouldRun === isRunning) return;
    isRunning = shouldRun;
    if (isRunning) {
      previousTime = performance.now();
      requestAnimationFrame(loop);
    }
  };
  document.addEventListener("visibilitychange", () => setRunning(!document.hidden));
  setRunning(!document.hidden);
}
