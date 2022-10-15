let atom
let w, h
let rain = []
let rainSound
let volume = 1
let colors = ['blue', 'green', 'white']
let d = 0
let color = colors[d % colors.length]

class Drop {
    constructor() {
        this.radius = random(8, 15)
        this.pos = createVector(random(0, windowWidth), 0)
        this.vel = createVector(-1.5, random(10, 25))
    }
    show() {
        stroke(color)
        fill(color)
        circle(this.pos.x, this.pos.y, this.radius)
    }
    rain() {
        if (this.pos.y < h) {
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
    imageMode(CENTER)
    angleMode(DEGREES)
    w = windowWidth * 0.99
    h = windowHeight * 0.965
    createCanvas(w, h)
    for (let i = 0; i < 100; i++) {
        rain.push(new Drop())
    }
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

function mouseClicked() {
    switchColors()
}

function keyPressed() {
    console.log(key === "ArrowDown")
    if (key === " ") {
        if (!rainSound.isPlaying()) {
            rainSound.loop()
        } else {
            rainSound.pause()
        }
    } else {
        switchColors()
    }
    if (key === "ArrowDown") {
        if (volume >= 0) {
            volume *= 0.9
        }
        rainSound.setVolume(volume)
        if (volume < 0.1) {
            rainSound.setVolume(0)
        }
    }
    if (key === "ArrowUp") {
        if (volume <= 1) {
            volume *= 1.1
        }
        rainSound.setVolume(volume)
    }
}