var CANVAS_WIDTH = 800
var CANVAS_HEIGHT = 800
var points = []
var p = undefined

function f(x) {
    //y = mx + b
    return 0.3 * x
}

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    inputs = [-1, 0.5]
    for (var i = 0; i < 100; i++) {
        points.push(new Point())
    }
    p = new Perceptron(3)
    guess = p.guess(inputs)
    console.log(guess)
}
j

function draw() {
    background(255)
    stroke(0)
    var p1 = new Point(-1, f(-1))
    var p2 = new Point(1, f(1))
    line(p1.getPixelX(), p1.getPixelY(), p2.getPixelX(), p2.getPixelY())

    points.forEach((point) => {
        point.show()
    })

    var p3 = new Point(-1, p.guessY(-1))
    var p4 = new Point(1, p.guessY(1))
    line(p3.getPixelX(), p3.getPixelY(), p4.getPixelX(), p4.getPixelY())


    points.forEach((point) => {
        inputs = [point.x, point.y, point.bias]
        target = point.label
        p.train(inputs, target)

        let guess = p.guess(inputs)
        if(guess === target) {
            fill(0, 255, 0)
        } else {
            fill(255, 0, 0)
        }
        noStroke()
        ellipse(point.getPixelX(), point.getPixelY(), 16, 16)
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
    constructor(numWeights=3) {
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

    guessY(x) {
        let w0 = this.weights[0]
        let w1 = this.weights[1]
        let w2 = this.weights[2]
        return -(w2/w1) - (w0/w1) * x
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
    constructor(x=Math.random()*2 - 1, y=Math.random()*2 - 1) {
        this.x = x
        this.y = y
        this.bias = 1
        
        let lineY = f(this.x)

        if(this.y > lineY) {
            this.label = 1
        }
        else {
            this.label = -1
        }
    }

    getPixelX() {
        return map(this.x, -1, 1, 0, CANVAS_WIDTH)
    }
    
    getPixelY() {
        return  map(this.y, -1, 1, CANVAS_HEIGHT, 0)
    }

    show(){
        stroke(0)
        if(this.label === 1) {
            fill(255)
        } else {
            fill(0)
        }
        ellipse(this.getPixelX(), this.getPixelY(), 32, 32)
    }
}