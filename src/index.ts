import './styles.scss';
import {CubicBezier, CubicBezierParam} from './CubicBezier';
import {Preview} from './Preview';

interface Position {
    x: number;
    y: number;
}

function updateElementPosition(el: HTMLElement, pos: Position) {
    el.style.left = pos.x + 'px';
    el.style.top = pos.y + 'px';
}

const canvasOffset = 50;
const size = 200;
const defaultCubicBezier: CubicBezierParam = {
    p1x: 0.4,
    p1y: 0,
    p2x: 0.2,
    p2y: 1,
};
const bezier = {...defaultCubicBezier};

const graph = document.querySelector('canvas')!;
graph.style.marginLeft = canvasOffset + 'px';
graph.width = size;
graph.height = size + canvasOffset * 2;
graph.style.top = canvasOffset + 'px';

const preview = new Preview();
const context = graph.getContext('2d')!;
const cubicBezier = new CubicBezier(context!, size, canvasOffset, bezier);
const p1El = document.querySelector('#p1') as HTMLDivElement;
const p2El = document.querySelector('#p2') as HTMLDivElement;
const valuesText = document.querySelector('#values') as HTMLDivElement;

const initPosition = (defaultX: number, defaultY: number): Position => {
  return  {
    x: defaultX * size + canvasOffset,
    y: size - defaultY * size + canvasOffset,
  };
};

const handleMouseMove = (event: MouseEvent, el: HTMLDivElement, elPosition: Position) => {
  let position = {x: event.clientX, y: event.clientY};
  const mouseMove = (event: MouseEvent) => {
    const deltaX = event.clientX - position.x;
    const deltaY = event.clientY - position.y;
    position = {x: event.clientX, y: event.clientY};
    elPosition.x! += deltaX;
    elPosition.y! += deltaY;
    updateElementPosition(el, elPosition);
    bezier.p1x += deltaX / size;
    bezier.p1y -= deltaY / size;
    render();
    updateValues();
  };
  const mouseUp = (event: MouseEvent) => {
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
    preview.run(bezier.p1x, bezier.p1y, bezier.p2x, bezier.p2y);
  };
  preview.prepare();
  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mouseup', mouseUp);
};

const p1ElPosition: Position = initPosition(defaultCubicBezier.p1x, defaultCubicBezier.p1y);
updateElementPosition(p1El, p1ElPosition);

const p2ElPosition: Position = initPosition(defaultCubicBezier.p2x, defaultCubicBezier.p2y);
updateElementPosition(p2El, p2ElPosition);


p1El.addEventListener('mousedown', (event: MouseEvent) => {
  handleMouseMove(event, p1El, p1ElPosition);
});

p2El.addEventListener('mousedown', (event: MouseEvent) => {
  handleMouseMove(event, p2El, p2ElPosition);
});

function onPaint() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    cubicBezier.update(bezier);
}

function render() {
    onPaint();
}

function updateValues() {
    valuesText.innerText = `${bezier.p1x.toFixed(2)}, ${bezier.p1y.toFixed(
        2,
    )}, ${bezier.p2x.toFixed(2)}, ${bezier.p2y.toFixed(2)}`;
}

render();
updateValues();
