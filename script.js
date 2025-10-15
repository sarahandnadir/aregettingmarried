// Zoom controls (clamped)
const stage = document.getElementById('stage');
const zoomLayer = document.getElementById('zoom-layer');
let scale = 1;
const MIN_ZOOM = 0.9;  // don't let content get too small
const MAX_ZOOM = 2.2;  // reasonable zoom-in
const ZOOM_STEP = 0.08;

function applyZoom() {
  zoomLayer.style.transform = `translateZ(0) scale(${scale.toFixed(3)})`;
}

function onWheel(e){
  e.preventDefault();
  const delta = Math.sign(e.deltaY);
  scale -= delta * ZOOM_STEP;
  scale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, scale));
  applyZoom();
}
window.addEventListener('wheel', onWheel, { passive:false });

// Basic pinch support on mobile (very light)
let lastDist = null;
window.addEventListener('touchmove', (e)=>{
  if(e.touches.length === 2){
    e.preventDefault();
    const [a,b] = e.touches;
    const dist = Math.hypot(a.pageX-b.pageX, a.pageY-b.pageY);
    if(lastDist !== null){
      const change = dist - lastDist;
      scale += change * 0.0008;
      scale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, scale));
      applyZoom();
    }
    lastDist = dist;
  }
},{passive:false});
window.addEventListener('touchend', ()=>{ lastDist = null; });

// Envelope open interaction
const envelope = document.getElementById('envelope');
const flap = document.getElementById('flap');
const hint = document.getElementById('hint');

function openEnvelope(){
  if(!envelope.classList.contains('open')){
    envelope.classList.add('open');
  }
}

// Click / tap to open
envelope.addEventListener('click', openEnvelope);

// Auto-open after a short delay (feels like the video)
setTimeout(openEnvelope, 900);

// Hide hint on first interaction
['click','wheel','touchstart'].forEach(evt=>{
  window.addEventListener(evt, ()=> hint && (hint.style.display='none'), { once:true });
});

// Initial zoom
applyZoom();
