function initNeuralNetwork() {
    const canvas = document.getElementById("neural-network");

    if (!canvas) {
        return () => {};
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
        return () => {};
    }

    const desktopSettings = {
        nodes: 400,
        connectionDistance: 112,
        signals: 42,
        mouseRadius: 120
    };

    const smallerScreenSettings = {
        nodes: 280,
        connectionDistance: 78,
        signals: 29,
        mouseRadius: 90
    };

    const nodes = [];
    const signals = [];

    const mouse = {
        x: null,
        y: null
    };

    let settings = desktopSettings;
    let width = 0;
    let height = 0;
    let animationFrame;

    function updateSettings() {
        settings =
            window.innerWidth <= 900
                ? smallerScreenSettings
                : desktopSettings;
    }

    function resizeCanvas() {
        const rect = canvas.parentElement.getBoundingClientRect();
        const devicePixelRatio = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        width = rect.width;
        height = rect.height;

        canvas.width = width * devicePixelRatio;
        canvas.height = height * devicePixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(
            devicePixelRatio,
            0,
            0,
            devicePixelRatio,
            0,
            0
        );

        updateSettings();
        createNodes();
        createSignals();
    }

    function createNodes() {
        nodes.length = 0;

        for (let i = 0; i < settings.nodes; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                radius: Math.random() * 1.8 + 1.4,
                phase: Math.random() * Math.PI * 2,
                glow: Math.random() * 0.5 + 0.5
            });
        }
    }

    function getDistance(x1, y1, x2, y2) {
        const dx = x1 - x2;
        const dy = y1 - y2;

        return Math.sqrt(dx * dx + dy * dy);
    }

    function chooseConnection(signal) {
        const source = nodes[signal.from];

        if (!source) {
            return;
        }

        const nearbyNodes = [];

        nodes.forEach((node, index) => {
            if (index === signal.from) {
                return;
            }

            const distance = getDistance(
                source.x,
                source.y,
                node.x,
                node.y
            );

            if (distance < settings.connectionDistance) {
                nearbyNodes.push(index);
            }
        });

        if (nearbyNodes.length > 0) {
            signal.to =
                nearbyNodes[
                    Math.floor(
                        Math.random() * nearbyNodes.length
                    )
                ];
        } else {
            signal.to = null;
        }
    }

    function createSignals() {
        signals.length = 0;

        for (let i = 0; i < settings.signals; i++) {
            const signal = {
                from: Math.floor(
                    Math.random() * nodes.length
                ),
                to: null,
                progress: Math.random(),
                speed: 0.004 + Math.random() * 0.005
            };

            chooseConnection(signal);

            if (signal.to !== null) {
                signals.push(signal);
            }
        }
    }

    function handleMouseMove(event) {
        const rect = canvas.getBoundingClientRect();

        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    }

    function handleMouseLeave() {
        mouse.x = null;
        mouse.y = null;
    }

    function updateNodes(time) {
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            node.x +=
                Math.sin(
                    time * 0.00035 + node.phase
                ) * 0.05;

            node.y +=
                Math.cos(
                    time * 0.0003 + node.phase
                ) * 0.05;

            if (node.x < -5) {
                node.x = width + 5;
            }

            if (node.x > width + 5) {
                node.x = -5;
            }

            if (node.y < -5) {
                node.y = height + 5;
            }

            if (node.y > height + 5) {
                node.y = -5;
            }

            if (mouse.x === null || mouse.y === null) {
                return;
            }

            const distance = getDistance(
                node.x,
                node.y,
                mouse.x,
                mouse.y
            );

            if (
                distance >= settings.mouseRadius ||
                distance === 0
            ) {
                return;
            }

            const force =
                (settings.mouseRadius - distance) /
                settings.mouseRadius;

            node.x +=
                ((node.x - mouse.x) / distance) *
                force *
                1.5;

            node.y +=
                ((node.y - mouse.y) / distance) *
                force *
                1.5;
        });
    }

    function drawConnections() {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const nodeA = nodes[i];
                const nodeB = nodes[j];

                const dx = nodeA.x - nodeB.x;
                const dy = nodeA.y - nodeB.y;

                const distanceSquared =
                    dx * dx + dy * dy;

                const maxDistance =
                    settings.connectionDistance;

                if (
                    distanceSquared >=
                    maxDistance * maxDistance
                ) {
                    continue;
                }

                const distance = Math.sqrt(
                    distanceSquared
                );

                let opacity =
                    (1 - distance / maxDistance) *
                    0.22;

                let nearMouse = false;

                if (
                    mouse.x !== null &&
                    mouse.y !== null
                ) {
                    const midpointX =
                        (nodeA.x + nodeB.x) / 2;

                    const midpointY =
                        (nodeA.y + nodeB.y) / 2;

                    const mouseDistance = getDistance(
                        midpointX,
                        midpointY,
                        mouse.x,
                        mouse.y
                    );

                    if (
                        mouseDistance <
                        settings.mouseRadius
                    ) {
                        nearMouse = true;

                        opacity +=
                            (1 -
                                mouseDistance /
                                    settings.mouseRadius) *
                            0.07;
                    }
                }

                ctx.beginPath();
                ctx.moveTo(nodeA.x, nodeA.y);
                ctx.lineTo(nodeB.x, nodeB.y);

                ctx.strokeStyle =
                    `rgba(232, 201, 214, ${opacity})`;

                ctx.lineWidth = nearMouse ? 0.75 : 0.65;
                ctx.stroke();
            }
        }
    }

    function drawNodes(time) {
        nodes.forEach(node => {
            const pulse =
                Math.sin(
                    time * 0.0018 + node.phase
                );

            const radius = Math.max(
                node.radius + pulse * 0.2,
                0.8
            );

            let opacity = 0.75 + node.glow * 0.15;
            let nearMouse = false;

            if (
                mouse.x !== null &&
                mouse.y !== null
            ) {
                const distance = getDistance(
                    node.x,
                    node.y,
                    mouse.x,
                    mouse.y
                );

                if (distance < settings.mouseRadius) {
                    nearMouse = true;

                    opacity +=
                        (1 -
                            distance /
                                settings.mouseRadius) *
                        0.20;
                }
            }

            ctx.beginPath();

            ctx.arc(
                node.x,
                node.y,
                nearMouse ? radius * 1.15 : radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(232, 201, 214, ${opacity})`;

            ctx.shadowBlur = nearMouse ? 22 : 20;

            ctx.shadowColor = nearMouse
                ? "rgba(232, 201, 214, 1)"
                : "rgba(232, 201, 214, 0.75)";

            ctx.fill();
            ctx.shadowBlur = 0;
        });
    }

    function drawSignals() {
        signals.forEach(signal => {
            if (
                signal.to === null ||
                !nodes[signal.from] ||
                !nodes[signal.to]
            ) {
                chooseConnection(signal);
                return;
            }

            const start = nodes[signal.from];
            const end = nodes[signal.to];

            const x =
                start.x +
                (end.x - start.x) *
                    signal.progress;

            const y =
                start.y +
                (end.y - start.y) *
                    signal.progress;

            ctx.beginPath();

            ctx.arc(
                x,
                y,
                2.5,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = "#E8C9D6";
            ctx.shadowBlur = 18;
            ctx.shadowColor = "#E8C9D6";

            ctx.fill();
            ctx.shadowBlur = 0;

            signal.progress += signal.speed;

            if (signal.progress >= 1) {
                signal.progress = 0;
                signal.from = signal.to;
                chooseConnection(signal);
            }
        });
    }

    function drawMouseGlow() {
        if (
            mouse.x === null ||
            mouse.y === null
        ) {
            return;
        }

        const gradient = ctx.createRadialGradient(
            mouse.x,
            mouse.y,
            0,
            mouse.x,
            mouse.y,
            settings.mouseRadius
        );

        gradient.addColorStop(
            0,
            "rgba(232, 201, 214, 0.08)"
        );

        gradient.addColorStop(
            0.45,
            "rgba(104, 40, 71, 0.04)"
        );

        gradient.addColorStop(
            1,
            "rgba(104, 40, 71, 0)"
        );

        ctx.beginPath();

        ctx.arc(
            mouse.x,
            mouse.y,
            settings.mouseRadius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = gradient;
        ctx.fill();
    }

    function drawEdgeFade() {
        const gradient = ctx.createRadialGradient(
            width / 2,
            height / 2,
            height * 0.15,
            width / 2,
            height / 2,
            Math.max(width, height) * 0.72
        );

        gradient.addColorStop(
            0,
            "rgba(16, 9, 13, 0.08)"
        );

        gradient.addColorStop(
            0.42,
            "rgba(16, 9, 13, 0.04)"
        );

        gradient.addColorStop(
            0.68,
            "rgba(16, 9, 13, 0.12)"
        );

        gradient.addColorStop(
            1,
            "rgba(16, 9, 13, 0.42)"
        );

        ctx.fillStyle = gradient;

        ctx.fillRect(
            0,
            0,
            width,
            height
        );
    }

    function animate(time) {
        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        updateNodes(time);
        drawConnections();
        drawSignals();
        drawNodes(time);
        drawMouseGlow();
        drawEdgeFade();

        animationFrame =
            requestAnimationFrame(animate);
    }

    window.addEventListener(
        "resize",
        resizeCanvas
    );

    window.addEventListener(
        "mousemove",
        handleMouseMove
    );

    canvas.addEventListener(
        "mouseleave",
        handleMouseLeave
    );

    resizeCanvas();

    animationFrame =
        requestAnimationFrame(animate);

    return () => {
        cancelAnimationFrame(animationFrame);

        window.removeEventListener(
            "resize",
            resizeCanvas
        );

        window.removeEventListener(
            "mousemove",
            handleMouseMove
        );

        canvas.removeEventListener(
            "mouseleave",
            handleMouseLeave
        );
    };
}

export default initNeuralNetwork;