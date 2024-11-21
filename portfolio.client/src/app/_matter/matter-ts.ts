import Matter from 'matter-js';
import {
    Engine,
    Render,
    Runner,
    Composites,
    Common,
    MouseConstraint,
    Mouse,
    Composite,
    Bodies,
    IChamfer
} from 'matter-js';

export class MatterTs {
    static gyro(container: HTMLElement, bgColor:string) {
        // Create engine
        let engine = Engine.create();
        const world = engine.world;

        // Get container dimensions
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Create renderer
        const render = Render.create({
            element: container,
            engine: engine,
            options: {
                background: bgColor,
                wireframes:false,
                width: width, // Use container width
                height: height, // Use container height
            }
        });

        // render.canvas.style.background = 'green';

        Render.run(render);

        // Create runner
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Create stack of bodies
        const stack = Composites.stack(0, 0, 50, 100, 30, 30, function (x: number, y: number) {
            const sides = Math.round(Common.random(1, 8));
        
            // Round the edges of some bodies
            let chamfer: IChamfer | undefined = undefined;
            if (sides > 2 && Common.random() > 0.7) {
                chamfer = {
                    radius: 10
                };
            }
        
            // Function to generate more neutral/masculine colors
            function getMasculineColor() {
                const darkColors = [
                    '#1C1C1C',
                    '#2B1B1B',
                    '#2E2A3E',
                    '#1D2A3B',
                    '#3B2F2F',
                    '#3E1F2F',
                    '#2A2A2A',
                    '#2F2F3B',
                    '#3E3B3B',
                    '#29292A'
                ];
                
                
                // Select a random color from the masculine color palette
                return darkColors[Math.floor(Common.random(0, darkColors.length))];
            }
        
            // Create bodies with images
            switch (Math.round(Common.random(0, 1))) {
                case 0:
                    if (Common.random() < 0.8) {
                        const body = Bodies.rectangle(x, y, Common.random(25, 50), Common.random(25, 50), { chamfer: chamfer });
                        body.render.fillStyle = getMasculineColor();  // Assign masculine color
                        return body;
                    } else {
                        const body = Bodies.rectangle(x, y, Common.random(80, 120), Common.random(25, 30), { chamfer: chamfer });
                        body.render.fillStyle = getMasculineColor();  // Assign masculine color
                        return body;
                    }
                case 1:
                    const polyBody = Bodies.polygon(x, y, sides, Common.random(25, 50), { chamfer: chamfer });
                    polyBody.render.fillStyle = getMasculineColor();  // Assign masculine color
                    return polyBody;
                default:
                    const defaultBody = Bodies.rectangle(x, y, Common.random(25, 50), Common.random(25, 50), { chamfer });
                    defaultBody.render.fillStyle = getMasculineColor();  // Assign masculine color
                    return defaultBody;
            }
        });
        
        

        Composite.add(world, [
            stack,
            Bodies.rectangle(width / 2, 0, width, 1, { isStatic: true }), //Top border            
            Bodies.rectangle(width + 1, height / 2, 1, height, { isStatic: true }), // Right border
            Bodies.rectangle(width / 2, height, width, 1, { isStatic: true }), //Bottom border
            Bodies.rectangle(-1, height / 2, 1, height, { isStatic: true }), //Left border
        ]);

        // Gyro control
        if (typeof window !== 'undefined') {
            var updateGravity = function (event: any) {
                const orientation = typeof window.orientation !== 'undefined' ? window.orientation : 0;
                const gravity = engine.gravity;

                if (orientation === 0) {
                    gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
                    gravity.y = Common.clamp(event.beta, -90, 90) / 90;
                } else if (orientation === 180) {
                    gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
                    gravity.y = Common.clamp(-event.beta, -90, 90) / 90;
                } else if (orientation === 90) {
                    gravity.x = Common.clamp(event.beta, -90, 90) / 90;
                    gravity.y = Common.clamp(-event.gamma, -90, 90) / 90;
                } else if (orientation === -90) {
                    gravity.x = Common.clamp(-event.beta, -90, 90) / 90;
                    gravity.y = Common.clamp(event.gamma, -90, 90) / 90;
                }
            };

            window.addEventListener('deviceorientation', updateGravity);
        }

        // Mouse control
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

        Composite.add(world, mouseConstraint);

        render.mouse = mouse;
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: width, y: height }
        });

        // Return context for controlling the demo
        return {
            engine: engine,
            runner: runner,
            render: render,
            canvas: render.canvas,
            stop: function () {
                Matter.Render.stop(render);
                Matter.Runner.stop(runner);
                if (typeof window !== 'undefined') {
                    window.removeEventListener('deviceorientation', updateGravity);
                }
            }
        };
    };
}
