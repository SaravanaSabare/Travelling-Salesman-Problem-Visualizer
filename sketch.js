let points = [];
let order = [];
let totalPoints = 15;
let canvasSize = 600;
let bestDistance = Infinity;
let isSolving = false;
let solvingInterval;
let selectedPoint = null;

function setup() {
    let canvas = createCanvas(canvasSize, canvasSize);
    canvas.parent('canvas-container');
    generateRandomPoints();
    
    // Update point count display
    document.getElementById('pointCount').addEventListener('input', function() {
        totalPoints = this.value;
        document.getElementById('pointCountValue').textContent = totalPoints;
    });
}

function draw() {
    background(255);
    
    // Draw connecting lines
    stroke(0, 100);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let i = 0; i < order.length; i++) {
        vertex(points[order[i]].x, points[order[i]].y);
    }
    endShape();
    
    // Draw points
    fill(255, 0, 0);
    noStroke();
    for (let i = 0; i < points.length; i++) {
        ellipse(points[i].x, points[i].y, 10, 10);
    }
    
    // Highlight selected point
    if (selectedPoint !== null) {
        fill(0, 0, 255);
        ellipse(points[selectedPoint].x, points[selectedPoint].y, 15, 15);
    }
}

function mousePressed() {
    // Check if clicking on a point
    for (let i = 0; i < points.length; i++) {
        if (dist(mouseX, mouseY, points[i].x, points[i].y) < 10) {
            selectedPoint = i;
            return;
        }
    }
    
    // Add new point if not solving
    if (!isSolving) {
        points.push(createVector(mouseX, mouseY));
        order = Array.from({length: points.length}, (_, i) => i);
        calculateDistance();
    }
}

function mouseDragged() {
    if (selectedPoint !== null && !isSolving) {
        points[selectedPoint].x = mouseX;
        points[selectedPoint].y = mouseY;
        calculateDistance();
    }
}

function mouseReleased() {
    selectedPoint = null;
}

function generateRandomPoints() {
    points = [];
    for (let i = 0; i < totalPoints; i++) {
        points.push(createVector(
            random(20, width - 20),
            random(20, height - 20)
        ));
    }
    order = Array.from({length: points.length}, (_, i) => i);
    calculateDistance();
}

function calculateDistance() {
    let d = 0;
    for (let i = 0; i < order.length - 1; i++) {
        d += dist(
            points[order[i]].x, points[order[i]].y,
            points[order[i+1]].x, points[order[i+1]].y
        );
    }
    // Add distance back to start
    d += dist(
        points[order[order.length-1]].x, points[order[order.length-1]].y,
        points[order[0]].x, points[order[0]].y
    );
    
    document.getElementById('distance').textContent = `Total Distance: ${d.toFixed(2)}`;
    return d;
}

function solveTSP() {
    let improved = false;
    let bestDistance = calculateDistance();
    
    for (let i = 0; i < order.length - 1; i++) {
        for (let j = i + 1; j < order.length; j++) {
            // Try reversing the path between i and j
            reverseOrder(i, j);
            let newDistance = calculateDistance();
            
            if (newDistance < bestDistance) {
                bestDistance = newDistance;
                improved = true;
            } else {
                // Revert if not better
                reverseOrder(i, j);
            }
        }
    }
    return improved;
}

function reverseOrder(start, end) {
    while (start < end) {
        swap(order, start, end);
        start++;
        end--;
    }
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function startSolving() {
    if (isSolving) return;
    isSolving = true;
    document.getElementById('solve').textContent = "Solving...";
    document.getElementById('solve').classList.remove('solved');
    solvingInterval = setInterval(() => {
        let improved = solveTSP();
        if (!improved) {
            stopSolving();
            document.getElementById('solve').textContent = "Solved!";
            document.getElementById('solve').classList.add('solved');
        }
    }, 50);
}

function stopSolving() {
    clearInterval(solvingInterval);
    isSolving = false;
}

function resetSolution() {
    order = Array.from({length: points.length}, (_, i) => i);
    calculateDistance();
}

// Button event listeners
document.getElementById('generate').addEventListener('click', function() {
    stopSolving();
    generateRandomPoints();
    bestDistance = Infinity;
});

document.getElementById('solve').addEventListener('click', function() {
    if (isSolving) {
        stopSolving();
        this.textContent = "Solve TSP";
        this.classList.remove('solved');
    } else {
        startSolving();
    }
});

document.getElementById('reset').addEventListener('click', function() {
    stopSolving();
    resetSolution();
    document.getElementById('solve').textContent = "Solve TSP";
});