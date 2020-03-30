export interface CubicBezierParam {
    p1x: number;
    p1y: number;
    p2x: number;
    p2y: number;
}

export class CubicBezier {
    context: CanvasRenderingContext2D;
    param: CubicBezierParam;
    size: number;
    offset: number;

    constructor(
        context: CanvasRenderingContext2D,
        size: number,
        offset: number,
        param: CubicBezierParam,
    ) {
        this.context = context;
        this.param = param;
        this.size = size;
        this.offset = offset;
    }

    private _draw() {
        this.context.beginPath();
        this.context.moveTo(0, this.offset + this.size);
        this.context.bezierCurveTo(
            this.param.p1x * this.size,
            this.offset + this.size - this.param.p1y * this.size,
            this.param.p2x * this.size,
            this.offset + this.size - this.param.p2y * this.size,
            this.size,
            this.offset,
        );
        this.context.stroke();
    }

    public update = (param?: CubicBezierParam) => {
        if (!!param) {
            this.param = param;
        }
        this._draw();
    };
}
