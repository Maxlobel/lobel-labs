// Selectable SVG concept modeled after the supplied photograph.
// The WebGL experience uses a separate, depth-aware procedural construction.
const GEARS = [
  {id:'drive',x:-202,y:-65,r:96,teeth:22,speed:.00115},
  {id:'upper',x:8,y:-235,r:106,teeth:24,speed:-.00155},
  {id:'lower',x:196,y:-51,r:94,teeth:20,speed:-.00135},
  {id:'escape',x:-24,y:-27,r:86,teeth:19,speed:-.00190},
  {id:'seconds',x:87,y:91,r:66,teeth:16,speed:.00245},
];

function pathForGear(radius,teeth){
  let d='';
  for(let i=0;i<teeth*4;i++){
    const a=i/(teeth*4)*Math.PI*2;
    const r=(i%4===1||i%4===2)?radius:radius*.87;
    d+=(i===0?'M':'L')+(Math.cos(a)*r).toFixed(2)+' '+(Math.sin(a)*r).toFixed(2)+' ';
  }
  d+='Z ';
  function circularHole(x,y,r){
    return 'M '+(x+r).toFixed(2)+' '+y.toFixed(2)+' a '+r+' '+r+' 0 1 0 '+(-2*r)+' 0 a '+r+' '+r+' 0 1 0 '+(2*r)+' 0 Z ';
  }
  d+=circularHole(0,0,radius*.12);
  if(radius>49){
    const count=Math.max(5,Math.floor(teeth/2));
    for(let i=0;i<count;i++){
      const a=i/count*Math.PI*2;
      d+=circularHole(Math.cos(a)*radius*.57,Math.sin(a)*radius*.57,radius*.125);
    }
  }
  return d;
}
function roundedPath(x,y,w,h,r){
  return 'M '+(x+r)+' '+y+
    ' H '+(x+w-r)+' Q '+(x+w)+' '+y+' '+(x+w)+' '+(y+r)+
    ' V '+(y+h-r)+' Q '+(x+w)+' '+(y+h)+' '+(x+w-r)+' '+(y+h)+
    ' H '+(x+r)+' Q '+x+' '+(y+h)+' '+x+' '+(y+h-r)+
    ' V '+(y+r)+' Q '+x+' '+y+' '+(x+r)+' '+y+' Z';
}
function gearSvg(g,state){
  const d=pathForGear(g.r,g.teeth);
  return '<g id="art-'+g.id+'" data-partid="'+g.id+'" transform="translate('+g.x+' '+g.y+')">'+
    '<path d="'+d+'" fill="#2b1d1b" fill-rule="evenodd" transform="translate(5 8)" opacity=".23"/>'+
    '<path data-fill-part="'+g.id+'" d="'+d+'" fill="'+state.colors[g.id]+'" fill-rule="evenodd" stroke="#fcf5e9" stroke-opacity=".28" stroke-width="1.6"/>'+
    '<circle r="'+(g.r*.72)+'" fill="none" stroke="#fff9e6" stroke-opacity=".15" stroke-width="1.7"/>'+
    '<circle r="'+(g.r*.15)+'" fill="#bd8d53" stroke="#ead2a8" stroke-width="3"/>'+
    '<circle r="'+(g.r*.062)+'" fill="#f3ddba"/>'+
    '<circle data-select-part="'+g.id+'" r="'+(g.r+12)+'" class="art-selection"/>'+
  '</g>';
}
function pendulumSvg(state){
  return '<g id="art-pendulum" data-partid="pendulum" transform="rotate(0 0 156)">'+
    '<rect x="-2.8" y="151" width="5.6" height="385" rx="2" fill="#535a59"/>'+
    '<rect x="-1.1" y="155" width="1.5" height="375" fill="#c7cbc5" opacity=".8"/>'+
    '<circle cx="0" cy="543" r="52" fill="#1a201e" opacity=".16" transform="translate(5 6)"/>'+
    '<circle data-fill-part="pendulum" cx="0" cy="543" r="50" fill="'+state.colors.pendulum+'" stroke="#3f4640" stroke-width="1.4"/>'+
    '<circle cx="-10" cy="528" r="25" fill="#fff" opacity=".045" pointer-events="none"/>'+
    '<circle data-select-part="pendulum" cx="0" cy="543" r="62" class="art-selection"/>'+
  '</g>';
}
function faceSvg(state){
  const outer=roundedPath(-205,-211,410,373,18);
  const openings=roundedPath(-117,-122,106,258,9)+' '+roundedPath(10,-122,107,258,9);
  let ticks='';
  for(let i=0;i<22;i++){
    const x=-111+i*10.55;
    ticks+='<rect x="'+x+'" y="-130" width="2" height="4" rx="1" fill="#6a7370"/>';
    ticks+='<rect x="'+x+'" y="139" width="2" height="4" rx="1" fill="#6a7370"/>';
  }
  return '<g data-partid="frame">'+
    '<path d="'+outer+' '+openings+'" fill="#514940" fill-rule="evenodd" transform="translate(5 7)" opacity=".18"/>'+
    '<path data-fill-part="frame" d="'+outer+' '+openings+'" fill="'+state.colors.frame+'" fill-rule="evenodd" stroke="#d1cabd" stroke-width="2"/>'+
    '<path d="'+roundedPath(-117,-122,106,258,9)+' '+roundedPath(10,-122,107,258,9)+'" fill="none" stroke="#c6c2b7" stroke-width="2" pointer-events="none"/>'+
    '<g class="roman" fill="#171e1e" font-family="Georgia, Times New Roman, serif" font-weight="700" text-anchor="middle" pointer-events="none">'+
      '<text x="-151" y="-148" font-size="66">XI</text>'+
      '<text x="0" y="-149" font-size="73">XII</text>'+
      '<text x="151" y="-148" font-size="76">I</text>'+
      '<text x="-150" y="-31" font-size="61" transform="rotate(-90 -150 -51)">IX</text>'+
      '<text x="-149" y="63" font-size="58" transform="rotate(-90 -149 41)">VIII</text>'+
      '<text x="150" y="-31" font-size="61" transform="rotate(90 150 -51)">III</text>'+
      '<text x="150" y="65" font-size="62" transform="rotate(90 150 41)">IV</text>'+
      '<text x="-146" y="153" font-size="69">VII</text>'+
      '<text x="0" y="153" font-size="71">VI</text>'+
      '<text x="153" y="153" font-size="73">V</text>'+
    '</g>'+
    ticks+
    '<path data-select-part="frame" d="'+outer+'" class="art-selection"/>'+
  '</g>';
}
function handsSvg(state){
  return '<g data-partid="hands" transform="translate(8 -3)">'+
    '<g id="art-hour" transform="rotate(60)"><path data-fill-part="hands" fill="'+state.colors.hands+'" stroke="#161c1c" stroke-width="2" d="M-13 15 L-14 -20 L-10 -85 L0 -116 L10 -85 L14 -20 L13 15Z"/></g>'+
    '<g id="art-minute" transform="rotate(93)"><path data-fill-part="hands" fill="'+state.colors.hands+'" stroke="#161c1c" stroke-width="2" d="M-9 12 L-12 -19 L-7 -127 L0 -170 L7 -127 L12 -19 L9 12Z"/></g>'+
    '<circle r="13.5" fill="#1d2423"/><circle r="5" fill="#6d7370"/>'+
    '<circle data-select-part="hands" r="25" class="art-selection"/>'+
  '</g>';
}
function smallBehindGears(state){
  const d=pathForGear(37,12);
  return '<g pointer-events="none">'+
    '<path transform="translate(-65 60)" d="'+d+'" fill="#cc9c46" fill-rule="evenodd" opacity=".94"/>'+
    '<path transform="translate(42 -88)" d="'+d+'" fill="#bd8b46" fill-rule="evenodd" opacity=".95"/>'+
    '<circle cx="-65" cy="60" r="7" fill="#f8e1a3"/>'+
    '<circle cx="42" cy="-88" r="7" fill="#f8e1a3"/>'+
  '</g>';
}
export function createIllustratedRenderer(state){
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','-340 -345 680 960');
  svg.setAttribute('preserveAspectRatio','xMidYMid meet');
  svg.classList.add('fallback-svg');
  svg.innerHTML=[
    '<defs><radialGradient id="art-ground"><stop offset="0%" stop-color="#f7f5ec" stop-opacity=".9"/><stop offset="100%" stop-color="#e2e0d4" stop-opacity=".1"/></radialGradient></defs>',
    '<ellipse cx="0" cy="85" rx="316" ry="414" fill="url(#art-ground)"/>',
    pendulumSvg(state),
    ...GEARS.map(g=>gearSvg(g,state)),
    smallBehindGears(state),
    faceSvg(state),
    handsSvg(state)
  ].join('');
  const gearNodes=GEARS.map(g=>({spec:g,element:svg.querySelector('#art-'+g.id)}));
  const pendulum=svg.querySelector('#art-pendulum');
  const hour=svg.querySelector('#art-hour'),minute=svg.querySelector('#art-minute');
  let last=performance.now(),angle=0,lastDraw=0;
  function paint(){
    svg.querySelectorAll('[data-fill-part]').forEach(el=>{
      const color=state.colors[el.getAttribute('data-fill-part')];
      el.setAttribute('fill',color);
    });
    svg.querySelectorAll('[data-select-part]').forEach(el=>{
      el.classList.toggle('active',el.getAttribute('data-select-part')===state.selected);
    });
  }
  function render(){
    const now=performance.now();
    const factor=Math.min((now-last)/16.667,3);last=now;
    if(state.rotating)angle+=factor;
    if(now-lastDraw<32)return;
    lastDraw=now;
    for(const {spec:g,element} of gearNodes){
      const deg=angle*g.speed*180/Math.PI;
      element.setAttribute('transform','translate('+g.x+' '+g.y+') rotate('+(-deg)+')');
    }
    hour.setAttribute('transform','rotate('+(60+angle*.00035)+')');
    minute.setAttribute('transform','rotate('+(93+angle*.004)+')');
    pendulum.setAttribute('transform','rotate('+(state.rotating?Math.sin(now*.0012)*4.6:0)+' 0 156)');
  }
  function updateView(x,y,z){
    const scale=Math.min(1.23,Math.max(.82,12.8/z));
    svg.style.transform='perspective(900px) rotateX('+(-x*34)+'deg) rotateY('+(y*34)+'deg) scale('+scale+')';
  }
  paint();
  return {domElement:svg,setPixelRatio(){},setClearColor(){},setSize(){},paint,render,updateView,isIllustrated:true};
}
