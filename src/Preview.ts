export class Preview {
    parent: HTMLDivElement;
    element: HTMLDivElement;
    afterImages: HTMLDivElement[];
    timer: number;
    afterImageCount: number;

    constructor() {
        this.parent = document.querySelector('#preview_area') as HTMLDivElement;
        this.element = document.querySelector('#circle') as HTMLDivElement;
        this.timer = 0;
        this.afterImageCount = 0;
        this.afterImages = [];
    }

    public prepare() {
        clearInterval(this.timer);
        this.afterImageCount = 0;
        this.element.style.transition = 'none';
        this.element.style.left = '50px';
        for (let i = this.afterImages.length - 1; i >= 0; i--) {
            this.parent.removeChild(this.afterImages[i]);
            this.afterImages.pop();
        }
    }

    public run(p1x: number, p1y: number, p2x: number, p2y: number) {
        this.element.style.transition = `left 2s cubic-bezier(${p1x}, ${p1y}, ${p2x}, ${p2y}) 0s`;
        this.element.style.left = '200px';
        this.timer = setInterval(this.makeAfterImage.bind(this), 100);
    }

    private makeAfterImage() {
        const left = this.element.offsetLeft;
        const afterImageEl = this.element.cloneNode() as HTMLDivElement;
        afterImageEl.style.transition = 'none';
        afterImageEl.style.left = left + 'px';
        this.parent.appendChild(afterImageEl);
        this.afterImages.push(afterImageEl);
        if (++this.afterImageCount >= 20) {
            clearInterval(this.timer);
            this.afterImageCount = 0;
        }
    }
}
