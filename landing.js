document.addEventListener('DOMContentLoaded', () => {
    // Theme toggling
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    const html = document.documentElement;
    let isLight = false;

    themeToggle.addEventListener('click', () => {
        isLight = html.getAttribute('data-theme') === 'dark';
        if (isLight) {
            html.setAttribute('data-theme', 'light');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
            updateColors(true);
        } else {
            html.setAttribute('data-theme', 'dark');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
            updateColors(false);
        }
    });

    // Feature items fade in
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-item').forEach(el => observer.observe(el));
    document.querySelectorAll('.how-step').forEach(el => observer.observe(el));

    // --- TYPEWRITER TAGLINE ---
    const phrases = [
        'Read with clarity.',
        'Present with confidence.',
        'Speak without fear.',
        'Own the room.'
    ];
    const typeEl = document.getElementById('typewriter-text');
    let phraseIdx = 0, charIdx = 0, deleting = false;

    function typeLoop() {
        const current = phrases[phraseIdx];
        if (!deleting) {
            typeEl.textContent = current.slice(0, charIdx + 1);
            charIdx++;
            if (charIdx === current.length) {
                setTimeout(() => { deleting = true; typeLoop(); }, 2200);
                return;
            }
            setTimeout(typeLoop, 55);
        } else {
            typeEl.textContent = current.slice(0, charIdx - 1);
            charIdx--;
            if (charIdx === 0) {
                deleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                setTimeout(typeLoop, 300);
                return;
            }
            setTimeout(typeLoop, 28);
        }
    }
    setTimeout(typeLoop, 800);

    // --- THREE.JS SETUP ---
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();

    // Add some subtle fog for depth
    scene.fog = new THREE.FogExp2(0xF7F5F0, 0.0015);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.set(0, 0, 800);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- CREATE BEAUTIFUL SPACE EFFECT ---
    const particlesCount = 10000;
    const positions = new Float32Array(particlesCount * 3);
    const scales = new Float32Array(particlesCount);
    const colors = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 3000;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 3000;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 3000;

        scales[i] = Math.random() * 2 + 0.5;
        velocities[i] = Math.random() * 2 + 0.1; // forward speed
        
        // Colors will be dynamically updated in render based on depth & theme
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));

    // Custom shader material for glowing stars
    const vertexShader = `
        attribute float scale;
        attribute vec3 customColor;
        varying vec3 vColor;
        void main() {
            vColor = customColor;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = scale * (800.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
        }
    `;

    const fragmentShader = `
        varying vec3 vColor;
        void main() {
            vec2 xy = gl_PointCoord.xy - vec2(0.5);
            float ll = length(xy);
            if(ll > 0.5) discard;
            float alpha = pow(1.0 - (ll * 2.0), 1.5);
            gl_FragColor = vec4(vColor, alpha);
        }
    `;

    const material = new THREE.ShaderMaterial({
        uniforms: {
            color: { value: new THREE.Color(0xffffff) },
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Scroll interaction
    let scrollY = window.scrollY;
    document.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    function updateColors(isLightTheme) {
        if (isLightTheme) {
            scene.fog.color.setHex(0xF7F5F0);
            material.blending = THREE.NormalBlending;
        } else {
            scene.fog.color.setHex(0x1B201A);
            material.blending = THREE.AdditiveBlending;
        }
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        // Smooth camera rotation based on mouse
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;
        
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.02;
        
        // Add scroll effect to camera Z (fly faster as you scroll)
        const scrollOffset = scrollY * 0.5;
        camera.position.z = 800 - scrollOffset;
        
        camera.lookAt(scene.position);

        // Slowly rotate entire starfield
        particles.rotation.y -= 0.0005;
        particles.rotation.z -= 0.0002;

        const positions = particles.geometry.attributes.position.array;
        const colors = particles.geometry.attributes.customColor.array;

        let i = 0;
        const tempColor = new THREE.Color();
        
        for (let p = 0; p < particlesCount; p++) {
            // Move stars towards the camera (warp effect)
            positions[i + 2] += velocities[p] * 0.6;
            
            // If star passes camera, reset it far back
            if (positions[i + 2] > 1000) {
                positions[i + 2] = -2000;
                positions[i] = (Math.random() - 0.5) * 3000;
                positions[i + 1] = (Math.random() - 0.5) * 3000;
            }

            // Dynamic color based on Z position
            const zPos = positions[i + 2];
            // Normalize Z between -2000 and 1000 to a 0-1 value
            const normalizedZ = (zPos + 2000) / 3000;
            
            if (isLight) {
                tempColor.setHex(0x30362F).lerp(new THREE.Color(0x9BAA95), normalizedZ);
            } else {
                tempColor.setHex(0x9BAA95).lerp(new THREE.Color(0xDDE4D8), normalizedZ);
            }

            // Add some randomness to colors for a sparkling effect
            const flicker = Math.random() * 0.2 + 0.8;
            colors[i] = tempColor.r * flicker;
            colors[i + 1] = tempColor.g * flicker;
            colors[i + 2] = tempColor.b * flicker;

            i += 3;
        }

        particles.geometry.attributes.position.needsUpdate = true;
        particles.geometry.attributes.customColor.needsUpdate = true;

        renderer.render(scene, camera);
    }

    animate();

    // --- HAMBURGER MENU TOGGLE ---
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-link');

    if (menuToggle && menuClose && menuOverlay) {
        menuToggle.addEventListener('click', () => {
            menuOverlay.classList.add('active');
        });

        menuClose.addEventListener('click', () => {
            menuOverlay.classList.remove('active');
        });

        // Close menu when clicking outside menu-content
        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) {
                menuOverlay.classList.remove('active');
            }
        });

        // Close menu when clicking any link
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuOverlay.classList.remove('active');
                menuLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // Resize handler
    window.addEventListener('resize', () => {
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;
        
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

});
