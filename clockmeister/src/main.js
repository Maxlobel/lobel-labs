import * as THREE from 'three';
import { createIllustratedRenderer } from './fallback.js';
import './styles.css';

const SWATCHES = [
  { name: 'Obsidian', hex: '#252B2A' },
  { name: 'Porcelain', hex: '#E9E2D5' },
  { name: 'Burnished brass', hex: '#BA8E55' },
  { name: 'Forest', hex: '#51685E' },
  { name: 'Slate', hex: '#657E8E' },
  { name: 'Terracotta', hex: '#B86C51' },
  { name: 'Cobalt', hex: '#526AA0' },
  { name: 'Blush', hex: '#D8A9A2' },
  { name: 'Marigold', hex: '#D9AD56' },
  { name: 'Oxide', hex: '#89776D' },
  { name: 'Burgundy', hex: '#77273F' },
];

const PARTS = [
  { id: 'drive', code: '01', name: 'Left sun gear', note: 'The golden wheel peeking out', defaultColor: '#D9AD56', radius: .9 },
  { id: 'upper', code: '02', name: 'Crown gear', note: 'The gear above the face', defaultColor: '#77273F', radius: 1.03 },
  { id: 'lower', code: '03', name: 'Right drive gear', note: 'The burgundy outer wheel', defaultColor: '#77273F', radius: .92 },
  { id: 'escape', code: '04', name: 'Center gear', note: 'The ivory wheel in the window', defaultColor: '#E9E2D5', radius: .83 },
  { id: 'seconds', code: '05', name: 'Lower detail gear', note: 'A flash of cobalt underneath', defaultColor: '#526AA0', radius: .64 },
  { id: 'frame', code: '06', name: 'Roman numeral face', note: 'The sculptural front plate', defaultColor: '#E9E2D5', radius: 2.2 },
  { id: 'hands', code: '07', name: 'Clock hands', note: 'The dark sweeping pointers', defaultColor: '#252B2A', radius: .6 },
  { id: 'pendulum', code: '08', name: 'Pendulum weight', note: 'The finishing movement below', defaultColor: '#252B2A', radius: .5 },
];

const PRESETS = [
  { id:'atelier', name:'Original', desc:'Inspired by the reference clock.', colors:['#D9AD56','#77273F','#77273F','#E9E2D5','#526AA0','#E9E2D5','#252B2A','#252B2A'] },
  { id:'midnight', name:'Midnight', desc:'Dark tones with a brass glow.', colors:['#BA8E55','#252B2A','#657E8E','#252B2A','#BA8E55','#E9E2D5','#252B2A','#252B2A'] },
  { id:'botanical', name:'Botanical', desc:'Gentle greens and soft neutrals.', colors:['#51685E','#89776D','#51685E','#E9E2D5','#D8A9A2','#E9E2D5','#252B2A','#51685E'] },
  { id:'playtime', name:'Playtime', desc:'A brighter kind of time.', colors:['#526AA0','#D9AD56','#B86C51','#D8A9A2','#526AA0','#E9E2D5','#252B2A','#526AA0'] },
];

const state = {
  colors: Object.fromEntries(PARTS.map(p => [p.id, p.defaultColor])),
  selected: 'drive',
  rotating: true,
  activePreset: 'atelier',
};
const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (motionReduced) state.rotating = false;

const app = document.querySelector('#app');
app.innerHTML = [
  '<div class="site-shell">',
    '<header class="topbar">',
      '<a class="brand" href="#top" aria-label="ClockMiester home">',
        '<span class="brand-symbol" aria-hidden="true"><span class="brand-symbol-hand"></span></span>',
        '<span>Clock<span class="brand-serif">Miester</span></span>',
      '</a>',
      '<nav class="nav-links" aria-label="Main navigation"><a href="#studio">The studio</a><a href="#story">The idea</a></nav>',
      '<div class="topbar-right"><span class="prototype-pill"><span class="live-dot"></span> Interactive concept</span><a class="top-link" href="#studio">Start designing <span aria-hidden="true">↗</span></a></div>',
    '</header>',
    '<main id="top">',
      '<section class="intro" aria-labelledby="hero-title">',
        '<div class="intro-copy">',
          '<div class="eyebrow"><span class="eyebrow-line"></span> AN EXPERIMENT IN TIMEKEEPING</div>',
          '<h1 id="hero-title">Time, with a<br><em>personal touch.</em></h1>',
          '<p>Meet the clock that invites you into the making. Choose the colors, find your combination, and turn an everyday object into something uniquely yours.</p>',
        '</div>',
        '<div class="intro-side"><span class="intro-star">✳</span><p>Not just a clock.<br>Part object, part obsession.</p><span>DESIGN STUDY / 001</span></div>',
      '</section>',
      '<section id="studio" class="studio" aria-label="Interactive clock color studio">',
        '<div class="viewer-panel">',
          '<div class="viewer-top"><span class="viewer-kicker"><span class="little-square"></span> THE PENDULUM / CONCEPT 02</span><span class="viewer-prototype">PHOTO INSPIRED 3D MODEL</span></div>',
          '<div class="viewer-canvas" id="clock-canvas"><div class="viewer-halo"></div><div class="viewer-loading" id="viewer-loading"><span class="loading-cog">✳</span> Making time visible...</div></div>',
          '<div class="viewer-bottom">',
            '<div class="viewer-instruction"><span class="drag-symbol">↔</span><span>Drag to rotate <i></i> Scroll to zoom <i></i> Tap a gear to select</span></div>',
            '<div class="viewer-actions"><button id="reset-view" class="icon-button" type="button" aria-label="Reset view" title="Reset view">↺</button><button id="toggle-motion" class="icon-button" type="button" aria-label="Pause gear motion" title="Pause gear motion">Ⅱ</button></div>',
          '</div>',
          '<div class="viewer-selection" id="viewer-selection"><span class="selection-bullet"></span><span id="selection-caption">01 / Main drive gear</span></div>',
        '</div>',
        '<aside class="editor-panel">',
          '<div class="panel-overline"><span>COLOR STUDIO</span><span>01 / 03</span></div>',
          '<h2>Make it <em>yours.</em></h2>',
          '<p class="editor-intro">Start with a palette or give every piece its own personality.</p>',
          '<div class="editor-separator"></div>',
          '<div class="section-heading"><span>01</span><h3>Find your starting point</h3></div>',
          '<div class="preset-list" id="presets" role="group" aria-label="Color scheme presets"></div>',
          '<div class="editor-separator spaced"></div>',
          '<div class="section-heading"><span>02</span><h3>Make the details yours</h3></div>',
          '<label class="select-label" for="part-select">SELECT A COMPONENT</label>',
          '<div class="select-wrap"><select id="part-select" aria-label="Select clock component"></select><span class="select-chevron">⌄</span></div>',
          '<p class="part-note" id="part-note"></p>',
          '<div class="swatch-title"><span>CHOOSE A FINISH</span><span id="chosen-color">Burnished brass</span></div>',
          '<div class="swatches" id="swatches" role="group" aria-label="Component colors"></div>',
          '<div class="editor-separator spaced"></div>',
          '<div class="section-heading"><span>03</span><h3>Keep your combination</h3></div>',
          '<p class="save-note">This is an experimental preview. No order is placed, and the colors shown are illustrative.</p>',
          '<button class="primary-button" id="share-design" type="button">Copy my design link <span aria-hidden="true">↗</span></button>',
          '<button class="reset-colors" id="reset-colors" type="button">↺ &nbsp; Reset all colors</button>',
        '</aside>',
      '</section>',
      '<section class="bottom-note"><span class="note-spark">✳</span><p><strong>YOUR CLOCK, YOUR CALL.</strong> This concept is now inspired by a photograph of the real clock. Its mechanism, dimensions, colors, and movement remain illustrative until the actual CAD assembly is available.</p><span class="note-number">CM / V0.2</span></section>',
      '<section id="story" class="story-section"><div class="story-label">A SMALL STUDY IN OBJECTS</div><div class="story-content"><h2>The good stuff is <em>in the details.</em></h2><p>We think an object you live with should be worth looking at twice. ClockMiester explores the space between mechanical curiosity and personal expression. For now, it starts with one little question: what would your clock look like?</p><a href="#studio" class="story-link">Go back to the color studio <span>↗</span></a></div><div class="story-deco" aria-hidden="true">⌾</div></section>',
    '</main>',
    '<footer><a class="footer-brand" href="#top">Clock<span>Miester</span><small>®</small></a><span>THE CLOCK COLOR STUDIO / CONCEPT PREVIEW</span><a href="#top">BACK TO TOP ↑</a></footer>',
  '</div>',
  '<div id="toast" class="toast" role="status" aria-live="polite"></div>'
].join('');

const byId = id => document.getElementById(id);
const sceneHost = byId('clock-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 100);
camera.position.set(0, 0, 12.8);
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true, powerPreference:'high-performance' });
} catch (error) {
  renderer = createIllustratedRenderer(state);
  byId('viewer-loading').textContent = 'Illustrated interactive mode';
  document.querySelector('.viewer-prototype').textContent = 'ILLUSTRATED PREVIEW';
}
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setClearColor(0x000000, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.75;
renderer.domElement.setAttribute('aria-label', 'Rotatable 3D model of a concept mechanical clock. Select gears to customize their colors.');
renderer.domElement.setAttribute('role', 'img');
sceneHost.appendChild(renderer.domElement);

scene.add(new THREE.HemisphereLight('#ffffff', '#958b77', 3.6));
const key = new THREE.DirectionalLight('#fff6e3', 5.2);
key.position.set(-3, 6, 8); scene.add(key);
const rim = new THREE.DirectionalLight('#c3d6cb', 2.6);
rim.position.set(5, -4, -2); scene.add(rim);
const soft = new THREE.PointLight('#f4d9ba', 65, 20);
soft.position.set(2, 3, 5); scene.add(soft);

const clock = new THREE.Group();
clock.rotation.set(-.055, -.14, 0);
scene.add(clock);
const internals = {};
const animatedGears = [];
const selectableMeshes = [];
let hourHand, minuteHand, pendulumGroup;

const metal = (hex, roughness=.35, metalness=.42) =>
  new THREE.MeshStandardMaterial({ color:hex, roughness, metalness, side:THREE.DoubleSide });
const charcoal = metal('#262e2d', .5, .45);
const internalBrass = metal('#ad8659', .28, .72);
const silver = metal('#d0c4b0', .31, .66);
const dark = metal('#3b4140', .52, .44);

function box(x,y,z,w,h,d,mat, angle=0) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);
  mesh.position.set(x,y,z); mesh.rotation.z=angle; mesh.castShadow=true;
  return mesh;
}
function tube(radius, thickness, z, material, segments=96) {
  const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius,thickness,10,segments),material);
  mesh.position.z = z;
  return mesh;
}
function plate(radius,depth,mat) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius,radius,depth,64),mat);
  mesh.rotation.x=Math.PI/2; return mesh;
}
function makeToothGeometry(radius, teeth, depth, cutouts=5) {
  const shape=new THREE.Shape();
  const root=radius*.87;
  for(let i=0;i<teeth*4;i++){
    const a=(i/(teeth*4))*Math.PI*2;
    const r=(i%4===1||i%4===2)?radius:root;
    const px=Math.cos(a)*r, py=Math.sin(a)*r;
    if(i===0) shape.moveTo(px,py); else shape.lineTo(px,py);
  }
  shape.closePath();
  const middle=new THREE.Path();
  middle.absarc(0,0,radius*.13,0,Math.PI*2,true);
  shape.holes.push(middle);
  if(radius>.5) {
    const holeR=radius*.115;
    for(let i=0;i<cutouts;i++){
      const a=i/cutouts*Math.PI*2;
      const ring=radius*.52;
      const cut=new THREE.Path();
      cut.absarc(Math.cos(a)*ring,Math.sin(a)*ring,holeR,0,Math.PI*2,true);
      shape.holes.push(cut);
    }
  }
  const geo=new THREE.ExtrudeGeometry(shape,{depth,steps:1,bevelEnabled:true,bevelThickness:.035,bevelSize:.035,bevelSegments:2,curveSegments:24});
  geo.translate(0,0,-depth/2);
  geo.computeVertexNormals();
  return geo;
}
function register(partId, root, colorable, hitMeshes, info={}) {
  internals[partId]={root,colorable,...info};
  hitMeshes.forEach(mesh=>{mesh.userData.partId=partId;selectableMeshes.push(mesh);});
}
function gear(spec) {
  const group=new THREE.Group();
  group.position.set(spec.x,spec.y,spec.z);
  const primary=metal(state.colors[spec.id],.34,.5);
  const shape=new THREE.Mesh(makeToothGeometry(spec.r,spec.teeth,.20,Math.max(4,Math.floor(spec.teeth/2))),primary);
  group.add(shape);
  const collar=tube(spec.r*.16,.039,.15,internalBrass,48); group.add(collar);
  const boss=plate(spec.r*.115,.26,internalBrass); boss.position.z=.12; group.add(boss);
  const cap=plate(spec.r*.058,.035,silver);cap.position.z=.27;group.add(cap);
  const detail=tube(spec.r*.73,.009,.12,primary);group.add(detail);
  if(spec.r>.7){
    const accents=4;
    for(let i=0;i<accents;i++){
      const a=(i/accents)*Math.PI*2;
      const bolt=plate(.027,.035,silver);
      bolt.position.set(Math.cos(a)*spec.r*.73,Math.sin(a)*spec.r*.73,.14);
      group.add(bolt);
    }
  }
  // Transparent selection plane also makes the openings easy to click.
  const hit=new THREE.Mesh(new THREE.CircleGeometry(spec.r*1.03,64),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide}));
  hit.position.z=.32;group.add(hit);
  clock.add(group);
  register(spec.id,group,[primary],[shape,hit],{x:spec.x,y:spec.y,z:spec.z,radius:spec.r});
  animatedGears.push({group,speed:spec.speed});
}
function createFrame(){
  const group=new THREE.Group();
  const material=metal(state.colors.frame,.68,.08);
  function rounded(path,x,y,w,h,r){
    path.moveTo(x+r,y);
    path.lineTo(x+w-r,y);path.quadraticCurveTo(x+w,y,x+w,y+r);
    path.lineTo(x+w,y+h-r);path.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
    path.lineTo(x+r,y+h);path.quadraticCurveTo(x,y+h,x,y+h-r);
    path.lineTo(x,y+r);path.quadraticCurveTo(x,y,x+r,y);
    path.closePath();
  }
  const face=new THREE.Shape();
  rounded(face,-2.08,-.60,4.16,3.50,.18);
  const left=new THREE.Path();rounded(left,-1.13,-.18,1.00,2.53,.09);
  const right=new THREE.Path();rounded(right,.13,-.18,1.00,2.53,.09);
  face.holes.push(left,right);
  const front=new THREE.Mesh(new THREE.ExtrudeGeometry(face,{depth:.18,steps:1,bevelEnabled:true,bevelSize:.028,bevelThickness:.03,bevelSegments:3,curveSegments:12}),material);
  front.position.z=.55;
  group.add(front);
  // Black Roman numerals and engraved detail are printed over the frame surface.
  const drawing=document.createElement('canvas');
  drawing.width=1024;drawing.height=860;
  const ctx=drawing.getContext('2d');
  ctx.clearRect(0,0,1024,860);
  ctx.fillStyle='#131b1b';ctx.textAlign='center';ctx.textBaseline='middle';
  const px=x=>(x+2.08)/4.16*1024;
  const py=y=>(2.90-y)/3.50*860;
  function numeral(text,x,y,size,angle=0){
    ctx.save();ctx.translate(px(x),py(y));ctx.rotate(angle);
    ctx.font='bold '+size+'px Georgia, serif';
    ctx.fillText(text,0,0);ctx.restore();
  }
  numeral('XI',-1.51,2.64,120);
  numeral('XII',0,2.64,119);
  numeral('I',1.58,2.64,121);
  numeral('IX',-1.64,1.42,96,-Math.PI/2);
  numeral('VIII',-1.64,.28,81,-Math.PI/2);
  numeral('III',1.63,1.42,101,Math.PI/2);
  numeral('IV',1.64,.26,104,Math.PI/2);
  numeral('VII',-1.51,-.40,112);
  numeral('VI',0,-.40,110);
  numeral('V',1.56,-.40,121);
  ctx.fillStyle='#69726f';
  for(let i=0;i<30;i++){
    const x=-1.18+i*(2.36/29);
    ctx.fillRect(px(x),py(2.46),2.5,5.5);
    ctx.fillRect(px(x),py(-.25),2.5,5.5);
  }
  const print=new THREE.Mesh(new THREE.PlaneGeometry(4.16,3.5),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(drawing),transparent:true,depthWrite:false,side:THREE.DoubleSide}));
  print.position.set(0,1.15,.80);
  group.add(print);
  // Fine white edge highlights emphasize the printed layers of the faceplate.
  group.add(box(0,2.89,.55,3.8,.034,.03,silver));
  clock.add(group);
  register('frame',group,[material],[front],{x:0,y:1.15,z:.60,radius:2});
}
function needle(length, width, material, z) {
  const shape=new THREE.Shape();
  shape.moveTo(-width*.42,-.14);
  shape.lineTo(-width*.58,.2);
  shape.lineTo(-width*.34,length*.69);
  shape.lineTo(0,length);
  shape.lineTo(width*.34,length*.69);
  shape.lineTo(width*.58,.2);
  shape.lineTo(width*.42,-.14);
  shape.closePath();
  const geo=new THREE.ExtrudeGeometry(shape,{depth:.058,bevelEnabled:true,bevelThickness:.015,bevelSize:.013,bevelSegments:2});
  const result=new THREE.Mesh(geo,material);result.position.z=z;return result;
}
function createHands(){
  const group=new THREE.Group();
  group.position.set(.13,.98,0);
  const material=metal(state.colors.hands,.39,.25);
  hourHand=needle(1.13,.28,material,.93);
  minuteHand=needle(1.60,.19,material,1.01);
  hourHand.rotation.z=-.72;
  minuteHand.rotation.z=-1.52;
  group.add(hourHand,minuteHand);
  const cap=plate(.16,.15,material);
  cap.position.z=1.13;group.add(cap);
  const center=plate(.06,.035,dark);
  center.position.z=1.23;group.add(center);
  clock.add(group);
  register('hands',group,[material],[hourHand,minuteHand],{x:.13,y:.98,z:1.08,radius:.7});
}
function createPendulum(){
  const material=metal(state.colors.pendulum,.42,.26);
  pendulumGroup=new THREE.Group();
  pendulumGroup.position.set(0,-.63,-.28);
  const rod=box(0,-1.72,.05,.038,3.43,.075,silver);
  const bob=plate(.51,.18,material);
  bob.position.set(0,-3.58,.13);
  const bobInset=tube(.46,.025,.25,material);
  bobInset.position.y=-3.58;
  pendulumGroup.add(rod,bob,bobInset);
  clock.add(pendulumGroup);
  register('pendulum',pendulumGroup,[material],[bob],{x:0,y:-4.21,z:-.15,radius:.51});
}
[
  {id:'drive',x:-1.91,y:1.43,z:.13,r:.90,teeth:20,speed:.00115},
  {id:'upper',x:.15,y:2.90,z:.16,r:1.03,teeth:23,speed:-.00155},
  {id:'lower',x:1.80,y:1.32,z:.12,r:.92,teeth:20,speed:-.00135},
  {id:'escape',x:-.20,y:1.21,z:.30,r:.83,teeth:18,speed:-.0019},
  {id:'seconds',x:.87,y:.15,z:.28,r:.64,teeth:14,speed:.00245},
].forEach(gear);
createPendulum();
createFrame();
createHands();

const selectionMat=new THREE.MeshBasicMaterial({color:'#dfc18d',transparent:true,opacity:.68,depthWrite:false});
const selectionRing=tube(1.1,.017,.65,selectionMat);
clock.add(selectionRing);
function updateSelectionRing(){
  const info=internals[state.selected];
  selectionRing.geometry.dispose();
  selectionRing.geometry=new THREE.TorusGeometry(info.radius*1.09,.022,8,100);
  selectionRing.position.set(info.x,info.y,info.z+.33);
  selectionRing.visible=state.selected!=='hands'&&state.selected!=='frame';
}
function setSelected(id){
  if(!internals[id]) return;
  state.selected=id;
  byId('part-select').value=id;
  const part=PARTS.find(p=>p.id===id);
  byId('part-note').textContent=part.note;
  byId('selection-caption').textContent=part.code+' / '+part.name;
  byId('viewer-selection').classList.add('show');
  updateSelectionRing();
  renderSwatches();
  renderer.paint?.();
}
function setColor(id,hex,updatePreset=true){
  state.colors[id]=hex;
  internals[id].colorable.forEach(m=>m.color.set(hex));
  if(updatePreset) state.activePreset=null;
  renderPresets();
  renderSwatches();
  renderer.paint?.();
  window.history.replaceState(null,'',window.location.pathname+window.location.hash);
}
function applyPreset(preset){
  PARTS.forEach((p,i)=>{
    state.colors[p.id]=preset.colors[i];
    internals[p.id].colorable.forEach(m=>m.color.set(preset.colors[i]));
  });
  state.activePreset=preset.id;
  renderPresets(); renderSwatches();
  renderer.paint?.();
  window.history.replaceState(null,'',window.location.pathname+window.location.hash);
}
function renderPresets(){
  byId('presets').innerHTML=PRESETS.map(p=>
    '<button type="button" class="preset '+(p.id===state.activePreset?'active':'')+'" data-preset="'+p.id+'" aria-pressed="'+(p.id===state.activePreset)+'">'+
      '<span class="preset-colors">'+p.colors.slice(0,4).map(c=>'<span style="background:'+c+'"></span>').join('')+'</span>'+
      '<span class="preset-name">'+p.name+'</span><span class="preset-check">'+(p.id===state.activePreset?'✓':'↗')+'</span>'+
    '</button>'
  ).join('');
}
function closestSwatch(hex) {
  return SWATCHES.find(s=>s.hex.toLowerCase()===hex.toLowerCase());
}
function renderSwatches(){
  const current=state.colors[state.selected];
  byId('chosen-color').textContent=(closestSwatch(current)?.name||'Custom finish');
  byId('swatches').innerHTML=SWATCHES.map(c=>
    '<button type="button" class="swatch '+(c.hex===current?'chosen':'')+'" data-color="'+c.hex+'" aria-label="'+c.name+'" aria-pressed="'+(c.hex===current)+'" title="'+c.name+'"><span style="background:'+c.hex+'"></span></button>'
  ).join('');
}
byId('part-select').innerHTML=PARTS.map(p=>'<option value="'+p.id+'">'+p.code+' · '+p.name+'</option>').join('');
byId('part-select').addEventListener('change',e=>setSelected(e.target.value));
byId('presets').addEventListener('click',e=>{
  const button=e.target.closest('[data-preset]');
  if(button) applyPreset(PRESETS.find(p=>p.id===button.dataset.preset));
});
byId('swatches').addEventListener('click',e=>{
  const button=e.target.closest('[data-color]');
  if(button) setColor(state.selected,button.dataset.color);
});
byId('reset-colors').addEventListener('click',()=>{applyPreset(PRESETS[0]);setSelected('drive');showToast('Original palette restored');});
let toastTimer;
function showToast(message){
  const el=byId('toast');el.textContent=message;el.classList.add('show');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3000);
}
function makeShareUrl(){
  const colors=PARTS.map(p=>state.colors[p.id].slice(1)).join('.');
  return window.location.origin+window.location.pathname+'?palette='+encodeURIComponent(colors)+'#studio';
}
byId('share-design').addEventListener('click',async()=>{
  const url=makeShareUrl();
  try{await navigator.clipboard.writeText(url);showToast('Your design link is copied');}
  catch{window.prompt('Copy your design link:',url);}
});
function recoverSharedPalette(){
  const url=new URL(window.location.href);
  const raw=url.searchParams.get('palette');
  if(!raw) return;
  const values=raw.split('.');
  if(![PARTS.length,PARTS.length-1].includes(values.length)||!values.every(x=>/^[0-9a-fA-F]{6}$/.test(x))) return;
  PARTS.forEach((p,i)=>{
    const hex=values[i]?'#'+values[i].toUpperCase():p.defaultColor;
    state.colors[p.id]=hex;
    internals[p.id].colorable.forEach(m=>m.color.set(hex));
  });
  state.activePreset=null;
}
recoverSharedPalette();
renderPresets();
setSelected('drive');

const raycaster=new THREE.Raycaster();
const pointer=new THREE.Vector2();
let dragging=false,downX=0,downY=0,lastX=0,lastY=0,moved=false;
function pointerDown(e){
  dragging=true;moved=false;downX=lastX=e.clientX;downY=lastY=e.clientY;
  renderer.domElement.setPointerCapture(e.pointerId);
}
function pointerMove(e){
  if(!dragging) return;
  const dx=e.clientX-lastX,dy=e.clientY-lastY;
  if(Math.hypot(e.clientX-downX,e.clientY-downY)>5) moved=true;
  if(moved){
    clock.rotation.y=Math.max(-.82,Math.min(.82,clock.rotation.y+dx*.008));
    clock.rotation.x=Math.max(-.52,Math.min(.52,clock.rotation.x+dy*.007));
    renderer.updateView?.(clock.rotation.x,clock.rotation.y,camera.position.z);
  }
  lastX=e.clientX;lastY=e.clientY;
}
function pointerUp(e){
  if(!dragging) return;
  dragging=false;
  if(moved)return;
  if(renderer.isIllustrated){
    const part=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-partid]');
    if(part)setSelected(part.getAttribute('data-partid'));
    return;
  }
  const rect=renderer.domElement.getBoundingClientRect();
  pointer.set(((e.clientX-rect.left)/rect.width)*2-1,-((e.clientY-rect.top)/rect.height)*2+1);
  raycaster.setFromCamera(pointer,camera);
  const intersections=raycaster.intersectObjects(selectableMeshes,false);
  if(intersections.length)setSelected(intersections[0].object.userData.partId);
}
renderer.domElement.addEventListener('pointerdown',pointerDown);
renderer.domElement.addEventListener('pointermove',pointerMove);
renderer.domElement.addEventListener('pointerup',pointerUp);
renderer.domElement.addEventListener('pointercancel',()=>dragging=false);
renderer.domElement.addEventListener('wheel',e=>{
  e.preventDefault();
  camera.position.z=Math.max(renderer.isIllustrated?9.4:15,Math.min(renderer.isIllustrated?17:30,camera.position.z+e.deltaY*.008));
  renderer.updateView?.(clock.rotation.x,clock.rotation.y,camera.position.z);
}, {passive:false});
byId('reset-view').addEventListener('click',()=>{
  clock.rotation.set(-.055,-.14,0);camera.position.z=defaultZoom();
  renderer.updateView?.(clock.rotation.x,clock.rotation.y,camera.position.z);
  showToast('View reset');
});
const play=byId('toggle-motion');
function updateMotionButton(){
  play.textContent=state.rotating?'Ⅱ':'▶';
  play.setAttribute('aria-label',state.rotating?'Pause gear motion':'Play gear motion');
  play.title=state.rotating?'Pause gear motion':'Play gear motion';
}
play.addEventListener('click',()=>{state.rotating=!state.rotating;updateMotionButton();});
updateMotionButton();

function defaultZoom(){
  return !renderer.isIllustrated ? (sceneHost.clientWidth/sceneHost.clientHeight<1 ? 27 : 19.5) : 12.8;
}
let firstResize=true;
function resize(){
  const width=sceneHost.clientWidth,height=sceneHost.clientHeight;
  if(!width||!height)return;
  camera.aspect=width/height;camera.updateProjectionMatrix();
  if(firstResize){camera.position.z=defaultZoom();firstResize=false;}
  renderer.setSize(width,height,false);
}
const resizeObserver=new ResizeObserver(resize);
resizeObserver.observe(sceneHost);resize();
byId('viewer-loading').classList.add('hidden');
let last=performance.now();
function animate(now){
  requestAnimationFrame(animate);
  const step=Math.min((now-last)/16.667,3);last=now;
  if(state.rotating){
    animatedGears.forEach(g=>g.group.rotation.z+=g.speed*step);
    hourHand.rotation.z-=.000006*step;
    minuteHand.rotation.z-=.000070*step;
    pendulumGroup.rotation.z=Math.sin(now*.0012)*.095;
  }
  selectionRing.material.opacity=.52+.17*Math.sin(now*.0022);
  renderer.render(scene,camera);
}
requestAnimationFrame(animate);
