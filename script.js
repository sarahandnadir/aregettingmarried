/* ====================================================
   Spatial Single-Page (SOOT-like) using Three + CSS3D
   ====================================================

Behavior:
- Move mouse → world subtly drifts (parallax).
- Scroll/trackpad → zoom in/out.
- Click any board or image frame → camera eases to focus.

Drop your images into /assets/images and keep the filenames
below, or change the paths in imgPaths.
*/

// Mount points
const webglRoot = document.getElementById('webgl-root');
const cssRoot   = document.getElementById('css3d-root');

/* ---------- THREE: Scenes, Camera, Renderers ---------- */
const sceneBG  = new THREE.Scene();
const camera   = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 0.1, 6000);
camera.position.set(0, 0, 1100); // start pulled back

const rendererBG = new THREE.WebGLRenderer({ antialias:true, alpha:true });
rendererBG.setSize(window.innerWidth, window.innerHeight);
rendererBG.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
rendererBG.setClearColor(0x000000, 0); // transparent over soft white
webglRoot.appendChild(rendererBG.domElement);

// CSS3D for crisp HTML “boards”
const sceneCSS = new THREE.Scene();
const rendererCSS = new THREE.CSS3DRenderer();
rendererCSS.setSize(window.innerWidth, window.innerHeight);
rendererCSS.domElement.style.pointerEvents = 'auto';
cssRoot.appendChild(rendererCSS.domElement);

/* ---------- Subtle dust background for depth ---------- */
const dustGeo = new THREE.BufferGeometry();
const COUNT = 900;
const positions = new Float32Array(COUNT*3);
for(let i=0;i<COUNT;i++){
  positions[i*3+0] = (Math.random()-0.5)*3400;
  positions[i*3+1] = (Math.random()-0.5)*2000;
  positions[i*3+2] = (Math.random()-0.5)*3600;
}
dustGeo.setAttribute('position', new THREE.BufferAttribute(positions,3));
const dustMat = new THREE.PointsMaterial({ color:0x999999, size:2, sizeAttenuation:true, opacity:.14, transparent:true });
const dust    = new THREE.Points(dustGeo, dustMat);
sceneBG.add(dust);

/* ---------- Content (your cleaned copy, EN only) ---------- */
const text = {
  save: {
    title: 'Save the Date[s]',
    intro: `We would love to celebrate with you, so we made this website to share the general dates as soon as possible.
Find the dates for each event below and details in the sections. Please note that the exact date of each event is still to be confirmed, but the week is finalized.`,
    timeline: [
      ['08–09/01/2026', 'Katib Kitab'],
      ['09–10/01/2026', 'Henna Night'],
      ['09–10/01/2026', 'Waleemeh'],
      ['TBA',           'Friends Night Out'],
      ['12–13/01/2026', 'Wedding Day'],
    ],
    noteLabel: 'General Note:',
    note: `Please ignore the basic visual language and very simple layout — I needed to send this out as soon as possible,
but I’m still too crazy for a Canva digital card. This was a great learning experience. Thanks for understanding.`
  },
  kk: {
    title: 'Katib Kitab',
    body: `A close family event. If you received this link, it’s unlikely you are invited to the Katib Kitab.`,
    cultural: `<span class="label" style="color: var(--magenta)">Cultural Note:</span>
The Katib Kitab is the marriage contract ceremony — a meaningful family gathering where the union officially becomes recognized.
It’s a spiritual moment led by a sheikh (religious leader), where a short reading, blessings, and vows take place. It’s quiet,
intimate, and deeply spiritual — the marriage is sealed in faith before the celebrations begin.`
  },
  hn: {
    title: 'Henna Night',
    body: `Please join us to celebrate Sarah’s Henna Night on the 9th — or 10th (final date coming soon) — of January, 2026.
Address [TBA], Amman, Jordan. Note that the Henna Night is for Sarah’s girls only (boys, please see Waleemeh).`,
    cap1: `1. Sarah wearing traditional Palestinian thobe and waquya, 2008.`,
    cultural: `<span class="label" style="color: var(--red)">Cultural Note:</span>
Since this is a Palestinian wedding, this note speaks specifically to Palestinian Henna traditions. The Henna Night is a joyful
pre-wedding celebration led mostly by the women in the family — a night where love is expressed through music, dance, and community.
It’s not a formal ceremony but a cultural gathering, where henna is applied to the bride’s hands as a symbol of blessing, beauty, and protection.
There are traditional songs, zaghareet (celebratory ululations), and moments of laughter that blend with unexpected emotion. It’s lively,
loud in the most loving way, and deeply rooted in Palestinian heritage — a celebration of womanhood, family, and the joy that comes before the wedding day.`
  },
  wl: {
    title: 'Waleemeh',
    body: `Please join us to celebrate Nadir’s Waleemeh on the 9th — or 10th (final date coming soon) — of January, 2026.
Address [TBA], Amman, Jordan. Note that the Waleemeh is for Nadir’s boys only (girls, please see Henna Night).`,
    cap2: `2. Nadir (right) and Ahmed (left) looking like the coolest revolutionaries, 2010.`,
    cultural: `<span class="label" style="color: var(--green)">Cultural Note:</span>
The Waleemeh is a traditional Palestinian wedding feast hosted by the groom’s side — an expression of generosity and community.
Guests are welcomed with food served in abundance, strong Arabic coffee, and the familiar rhythm of Palestinian dabke songs.
The joy rises naturally, and before long, a dabke line forms, feet striking the ground with pride and heritage. In Palestinian
tradition, the Waleemeh is not just about sharing a meal — it is about honoring guests, celebrating identity, and beginning the
wedding days with steps that carry both culture and belonging.`
  },
  fn: {
    title: 'Friends Night Out',
    body: `To be honest, we don’t really know if this will happen — but Sarah wants it to. We’ll spend a day out in Amman and share some of our favorite spots.`
  },
  wd: {
    title: 'Wedding Day',
    body: `The event of the year, right at the start. <i>Fin.</i>`,
    c16:  `16. Ipsum Lorem. n.d. loremipsum.com/2.html`,
    c17:  `17. Ibid.`
  },
  co: {
    title: 'Conclusion [come to our wedding.]',
    lines:[
      'Website made in 2 hours by Sarah.',
      'Nadir thinks it looks like a mission statement.',
      'Sarah just wants to share the dates.',
      'Nadir & Sarah want to celebrate with you.',
      'Proofreading (our maid of honor and best man — they didn’t proofread anything): Aiten Mahfouz, Mohammad Azhari.',
      'Typeset in: Helvetica Neue (Adobe Fonts).'
    ]
  }
};

/* ---------- Helpers to build HTML boards ---------- */
function boardHTML(title, bodyHTML, extrasHTML=''){
  return `
    <div class="h1-split">
      <div class="h1-left">${title}</div>
      <div class="h1-right">${title}</div>
    </div>
    ${bodyHTML}
    ${extrasHTML}
  `;
}

function SaveBoard(){
  const tl = text.save.timeline.map(([d,label]) => `
    <div class="timeline-row">
      <div class="timeline-date">${d}</div>
      <div class="timeline-link">${label}</div>
    </div>
  `).join('');
  const body = `
    <p class="lead">${text.save.intro}</p>
    <div class="timeline">${tl}</div>
    <div class="note">
      <div class="label caption">${text.save.noteLabel}</div>
      <div class="caption">${text.save.note}</div>
    </div>
  `;
  return boardHTML(text.save.title, body);
}

function KatibBoard(){
  const body = `<p class="body">${text.kk.body}</p>`;
  const extras = `<div class="cultural caption">${text.kk.cultural}</div>`;
  return boardHTML(text.kk.title, body, extras);
}

function HennaBoard(){
  const body = `<p class="body">${text.hn.body}</p>`;
  const extras = `
    <div class="caption" style="margin-top:.4rem">${text.hn.cap1}</div>
    <div class="cultural caption" style="margin-top:.6rem">${text.hn.cultural}</div>
  `;
  return boardHTML(text.hn.title, body, extras);
}

function WaleemehBoard(){
  const body = `<p class="body">${text.wl.body}</p>`;
  const extras = `
    <div class="caption" style="margin-top:.4rem">${text.wl.cap2}</div>
    <div class="cultural caption" style="margin-top:.6rem">${text.wl.cultural}</div>
  `;
  return boardHTML(text.wl.title, body, extras);
}

function FriendsBoard(){
  const body = `<p class="body">${text.fn.body}</p>`;
  return boardHTML(text.fn.title, body);
}

function WeddingBoard(){
  const body = `<p class="body">${text.wd.body}</p>`;
  const extras = `
    <div class="caption" style="margin-top:.3rem">${text.wd.c16}</div>
    <div class="caption">${text.wd.c17}</div>
  `;
  return boardHTML(text.wd.title, body, extras);
}

function ConclusionBoard(){
  const body = text.co.lines.map(l => `<p class="body">${l}</p>`).join('');
  return boardHTML(text.co.title, body);
}

/* ---------- CSS3D object makers ---------- */
function makeBoard(innerHTML, widthPx = 760){
  const el = document.createElement('div');
  el.className = 'board';
  el.style.width = Math.min(widthPx, window.innerWidth*0.86) + 'px';
  el.innerHTML = innerHTML;
  const obj = new THREE.CSS3DObject(el);
  obj.element.style.pointerEvents = 'auto';
  obj.element.addEventListener('click', () => focusOn(obj.position, 800));
  return obj;
}

function makeImageFrame(src, alt='image', widthPx=340){
  const el = document.createElement('div');
  el.className = 'img-frame';
  el.style.width = Math.min(widthPx, window.innerWidth*0.48) + 'px';
  el.innerHTML = `<img src="${src}" alt="${alt}">`;
  const obj = new THREE.CSS3DObject(el);
  obj.element.style.pointerEvents = 'auto';
  obj.element.addEventListener('click', () => focusOn(obj.position, 800));
  return obj;
}

/* ---------- Build the spatial map ---------- */
const world = new THREE.Group();
sceneCSS.add(world);

// Layout (x,y,z). Designed to feel like a free-roam “field” similar to SOOT.
const layout = {
  save:     { pos:new THREE.Vector3(-700,  220,   40),  rot:new THREE.Euler(0,  0.10, 0) },
  kk:       { pos:new THREE.Vector3( -60,  320, -320),  rot:new THREE.Euler(0, -0.05, 0) },
  henna:    { pos:new THREE.Vector3( 620,  120, -120),  rot:new THREE.Euler(0, -0.10, 0) },
  waleemeh: { pos:new THREE.Vector3( 120, -130,  240),  rot:new THREE.Euler(0,  0.08, 0) },
  friends:  { pos:new THREE.Vector3(-620, -240,  340),  rot:new THREE.Euler(0,  0.04, 0) },
  wedding:  { pos:new THREE.Vector3( -80,  -20,  600),  rot:new THREE.Euler(0, -0.02, 0) },
  concl:    { pos:new THREE.Vector3( 560, -330,  560),  rot:new THREE.Euler(0, -0.14, 0) }
};

// Boards
const bSave   = makeBoard(SaveBoard(),     780); bSave.position.copy(layout.save.pos);     bSave.rotation.copy(layout.save.rot);     world.add(bSave);
const bKK     = makeBoard(KatibBoard(),    740); bKK.position.copy(layout.kk.pos);         bKK.rotation.copy(layout.kk.rot);         world.add(bKK);
const bHenna  = makeBoard(HennaBoard(),    760); bHenna.position.copy(layout.henna.pos);   bHenna.rotation.copy(layout.henna.rot);   world.add(bHenna);
const bWale   = makeBoard(WaleemehBoard(), 760); bWale.position.copy(layout.waleemeh.pos); bWale.rotation.copy(layout.waleemeh.rot); world.add(bWale);
const bFriend = makeBoard(FriendsBoard(),  700); bFriend.position.copy(layout.friends.pos); bFriend.rotation.copy(layout.friends.rot); world.add(bFriend);
const bWed    = makeBoard(WeddingBoard(),  740); bWed.position.copy(layout.wedding.pos);   bWed.rotation.copy(layout.wedding.rot);   world.add(bWed);
const bConc   = makeBoard(ConclusionBoard(),700); bConc.position.copy(layout.concl.pos);    bConc.rotation.copy(layout.concl.rot);    world.add(bConc);

// Image placeholders near boards — you’ll swap files later
const imgPaths = {
  save:     'assets/images/save-placeholder.jpg',
  katib:    'assets/images/katib-placeholder.jpg',
  henna:    'assets/images/henna-placeholder.jpg',
  waleemeh: 'assets/images/waleemeh-placeholder.jpg',
  friends:  'assets/images/friends-placeholder.jpg',
  wedding:  'assets/images/wedding-placeholder.jpg'
};

function placeImageNear(target, dx,dy,dz, w=340, src=imgPaths.save, alt='image'){
  const f = makeImageFrame(src, alt, w);
  f.position.copy(target.position).add(new THREE.Vector3(dx,dy,dz));
  f.rotation.copy(target.rotation);
  world.add(f);
  return f;
}

// A few starter frames
placeImageNear(bSave,   -260, -140,  -60, 360, imgPaths.save,   'Save placeholder');
placeImageNear(bKK,      300,   80,   70, 330, imgPaths.katib,  'Katib placeholder');
placeImageNear(bHenna,  -320, -120,   40, 360, imgPaths.henna,  'Henna placeholder');
placeImageNear(bWale,    300, -160,  -20, 360, imgPaths.waleemeh,'Waleemeh placeholder');
placeImageNear(bFriend, -280,   80,   40, 330, imgPaths.friends,'Friends Night placeholder');
placeImageNear(bWed,     300,  120,  -40, 360, imgPaths.wedding,'Wedding placeholder');

/* ---------- Camera motion & interactions ---------- */
let lookTarget = new THREE.Vector3(0,0,0);
function focusOn(pos, duration=800){
  // Move camera to look toward board; offset back on Z relative to distance to world center
  const distance = 700;
  const camPos = pos.clone().add(new THREE.Vector3(0,0,distance));
  new TWEEN.Tween(camera.position).to({x:camPos.x, y:camPos.y, z:camPos.z}, duration).easing(TWEEN.Easing.Quadratic.InOut).start();
  new TWEEN.Tween(lookTarget).to({x:pos.x, y:pos.y, z:pos.z}, duration).easing(TWEEN.Easing.Quadratic.InOut).start();
}

// Initial focus
focusOn(layout.save.pos, 900);

// Mouse parallax (SOOT-like drift)
const mouse = {x:0, y:0};
window.addEventListener('mousemove', (e)=>{
  mouse.x = (e.clientX / window.innerWidth )*2 - 1;
  mouse.y = (e.clientY / window.innerHeight)*2 - 1;
});

// Scroll/trackpad zoom
window.addEventListener('wheel',(e)=>{
  e.preventDefault();
  const dir = Math.sign(e.deltaY);
  const toCenter = camera.position.clone().sub(lookTarget);
  const len = toCenter.length();
  const nextLen = THREE.MathUtils.clamp(len + dir*80, 300, 2400);
  toCenter.setLength(nextLen);
  const nextPos = lookTarget.clone().add(toCenter);
  new TWEEN.Tween(camera.position).to({x:nextPos.x, y:nextPos.y, z:nextPos.z}, 180).easing(TWEEN.Easing.Quadratic.Out).start();
},{passive:false});

// Optional: focus on click anywhere on world background? Already handled by board clicks.

/* ---------- Render loop ---------- */
const clock = new THREE.Clock();
function animate(){
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  // Subtle dust motion
  dust.rotation.y += 0.00015;
  dust.rotation.x = Math.sin(t*0.05)*0.02;

  // Mouse parallax: nudge camera “look-at” point
  const parallax = new THREE.Vector3(mouse.x*60, -mouse.y*40, 0);
  const desired  = lookTarget.clone().add(parallax);
  camera.lookAt(desired);

  TWEEN.update();
  rendererBG.render(sceneBG, camera);
  rendererCSS.render(sceneCSS, camera);
}
animate();

// Resize
window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  rendererBG.setSize(window.innerWidth, window.innerHeight);
  rendererCSS.setSize(window.innerWidth, window.innerHeight);
});
