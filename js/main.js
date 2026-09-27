const canvas = document.getElementById('polarCanvas');
const ctx = canvas.getContext('2d');
const curveSelect = document.getElementById('tipoCurva');
const paramA = document.getElementById('paramA');
const paramN = document.getElementById('paramN');
const valA = document.getElementById('valA');
const valN = document.getElementById('valN');

function drawGrid() {
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;

    // Ejes cartesianos de referencia
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, cy); ctx.lineTo(width, cy);
    ctx.moveTo(cx, 0); ctx.lineTo(cx, height);
    ctx.stroke();

    // Circunferencias concéntricas
    ctx.strokeStyle = '#edf2f7';
    for (let r = 40; r <= 160; r += 40) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

function drawCurve() {
    drawGrid();
    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;

    const a = parseFloat(paramA.value);
    const n = parseFloat(paramN.value);
    const type = curveSelect.value;

    valA.textContent = a;
    valN.textContent = n;

    ctx.strokeStyle = '#3182ce';
    ctx.lineWidth = 2;
    ctx.beginPath();

    let first = true;
    const scale = 40;

    for (let theta = 0; theta <= 4 * Math.PI; theta += 0.01) {
        let r = 0;
        if (type === 'rosa') {
            r = a * Math.cos(n * theta);
        } else if (type === 'cardioide') {
            r = a * (1 + Math.cos(theta));
        } else if (type === 'espiral') {
            r = a * theta;
        } else if (type === 'lemniscata') {
            let val = (a * a) * Math.cos(2 * theta);
            r = val >= 0 ? Math.sqrt(val) : 0;
        }

        const x = cx + r * scale * Math.cos(theta);
        const y = cy - r * scale * Math.sin(theta);

        if (first) {
            ctx.moveTo(x, y);
            first = false;
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
}

curveSelect.addEventListener('change', drawCurve);
paramA.addEventListener('input', drawCurve);
paramN.addEventListener('input', drawCurve);

drawCurve();

const grupoParamN = document.getElementById('grupoParamN');

function actualizarVisibilidadControles() {
    if (curveSelect.value === 'rosa') {
        grupoParamN.style.display = 'block';
    } else {
        grupoParamN.style.display = 'none';
    }
}

curveSelect.addEventListener('change', actualizarVisibilidadControles);
actualizarVisibilidadControles();