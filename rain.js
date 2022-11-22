let w, h
let rain = []
let rainSound
let volume = 1
let colors = ['lightBlue', 'lime', 'white', 'orange', 'blue', 'yellow', 'red', 'purple', 'green', 'pink', 'brown']
let d = 0
let color = colors[d % colors.length]

class Drop {
    constructor() {
        this.radius = random(8, 15)
        this.pos = createVector(random(0, windowWidth), 0)
        this.vel = createVector(-1.5, random(25, 85))
    }
    show() {
        stroke(color)
        fill(color)
        circle(this.pos.x, this.pos.y, this.radius + 0)
    }
    rain() {
        if (this.pos.y < h - 20) {
            this.pos.add(this.vel)
        } else {
            this.pos = createVector(random(0, windowWidth), 0)
        }
    }
}

function preload() {
    rainSound = loadSound('assets/rain-2.mp3');
}

function setup() {
    //ellipseMode(CENTER)
    w = windowWidth
    h = windowHeight
    createCanvas(w, h)
    for (let i = 0; i < 60; i++) {
        rain.push(new Drop())
    }
    speeds = [createVector(-1.5, random(10, 25)), createVector(-1.5, random(25, 60)), createVector(-1.5, random(60, 120))]
}

function draw() {
    background(0)
    rain.forEach((drop) => {
        drop.show()
        drop.rain()
    })
}

function switchColors() {
    d = d + 1
    color = colors[d % colors.length]
}

function toggleBlue() {
    color = colors[colors.indexOf('lightBlue')]
}

function toggleGreen() {
    color = colors[colors.indexOf('lime')]
}

function toggleYellow() {
    color = colors[colors.indexOf('yellow')]
}

function toggleSound() {
    if (!rainSound.isPlaying()) {
        rainSound.loop()
    } else {
        rainSound.pause()
    }
}

function increaseVolume() {
    if (volume <= 1) {
        volume *= 1.1
    }
    rainSound.setVolume(volume)
    console.log(volume)
}

function decreaseVolume() {
    if (volume >= 0) {
        volume *= 0.9
    }
    rainSound.setVolume(volume)
    if (volume < 0.125) {
        rainSound.setVolume(0)
    }
    console.log(volume)
}

function keyPressed() {
    if (key === " ") {
        toggleSound()
    }
    if (key === "ArrowDown") {
        decreaseVolume()
    }
    if (key === "ArrowUp") {
        increaseVolume()
    }
}