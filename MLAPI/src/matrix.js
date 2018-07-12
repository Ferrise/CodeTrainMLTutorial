var Matrix = class {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.matrix = [];

        for(let i = 0; i < this.rows; i++) {
            this.matrix[i] = [];
            for(let j = 0; j < this.cols; j++) {
                this.matrix[i][j] = 0;
            }
        }
    }

    randomize() {
        
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                this.matrix[i][j] = Math.floor(Math.random() * 10);
            }
        }
    }

    sum(n) {
        if(n instanceof Matrix) {
            for(let i = 0; i < this.rows; i++) {
                for(let j = 0; j < this.cols; j++) {
                    this.matrix[i][j] += n.matrix[i][j];
                }
            }
        } else {
            for(let i = 0; i < this.rows; i++) {
                for(let j = 0; j < this.cols; j++) {
                    this.matrix[i][j] += n;
                }
            }
        }
    }

    multiply(n) {
        // Uses Matrix product AB
        if(n instanceof Matrix) {
            if(this.cols !== n.rows) { return undefined; }
            let result = new Matrix(this.rows, n.cols);
            let a = this.matrix;
            let b = n.matrix;

            for(let i = 0; i < result.rows; i++) {
                for(let j = 0; j < result.cols; j++) {
                    // Dot product of values in col
                    let sum = 0;
                    for(let k = 0; k < this.cols; k++) {
                        sum += a[i][k] * b[k][j];
                    }
                    result.matrix[i][j] = sum;
                }
            }
            return result;
        } else {
            for(let i = 0; i < this.rows; i++) {
                for(let j = 0; j < this.cols; j++) {
                    this.matrix[i][j] *= n;
                }
            }
        }
    }
}