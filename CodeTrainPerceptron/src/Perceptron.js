var CANVAS_WIDTH = 800
var CANVAS_HEIGHT = 800
var points = []
var p = undefined


function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    inputs = [-1, 0.5]
    for (var i = 0; i < 100; i++) {
        points.push(new Point());
    }
    p = new Perceptron()
    guess = p.guess(inputs)
    console.log(guess)
}

function draw() {
    background(255)
    stroke(0)
    line(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    points.forEach((point) => {
        point.show()
    })

    points.forEach((point) => {
        inputs = [point.x, point.y]
        target = point.label
        p.train(inputs, target)

        let guess = p.guess(inputs)
        if(guess === target) {
            fill(0, 255,0)
        } else {
            fill(255, 0, 0)
        }
        noStroke()
        ellipse(point.x, point.y, 16, 16)
    })



}

function sign(n) {
    if(n >= 0) {
        return 1
    }
    else {
        return -1
    }
}

class Perceptron {
    constructor(numWeights=2) {
        this.weights = []
        this.lr = 0.1
        //Initialize the weights randomly
        for (let i = 0; i < numWeights; i++) {
            this.weights[i] = Math.random() * 2 - 1
        }
    }

    guess(inputs) {
        let sum = 0
        //calculate weighted sum
        for (let i = 0; i < this.weights.length; i++) {
            sum += inputs[i] * this.weights[i]
        }

        return sign(sum)
    }

    train(inputs, target) {
        let guess = this.guess(inputs)
        let error = target - guess

        //Tune all the weights
        for(let i = 0; i < this.weights.length; i++) {
            this.weights[i] += error * inputs[i] * this.lr

        }
    }
    
}

//training
class Point {
    constructor() {
        this.x = Math.random() * CANVAS_WIDTH
        this.y = Math.random() * CANVAS_HEIGHT
        
        if(this.x > this.y) {
            this.label = 1
        }
        else {
            this.label = -1
        }
    }

    show(){
        stroke(0)
        if(this.label === 1) {
            fill(255)
        } else {
            fill(0)
        }
        ellipse(this.x, this.y, 32, 32)
    }
}