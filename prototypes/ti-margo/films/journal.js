/* ============================================================
   Série « journal » : la PAYSAGE (1920 × 1080) qui présente le Journal d'EleveAI,
   « comprendre le monde et le changer ». Voix validée par Frédéric le 10/11/2026 :
   manim/voix/journal-presentation-paysage.json (script : manim/journal-presentation-script.md).
   Ti Margo à gauche, une grande page de JOURNAL (papier crème) à droite, écrite à l'instant
   où la voix parle. Trois questions-pauses dessinées sur la page (B, C, A ; 5 s de compte à rebours).
   Outils recopiés de films/monde.js (voixDe, enchainer, suiteDe, poserTableau, gestes) : la page
   charge films/<série>.js seulement. Code couleur : les bonnes actions sont des cœurs roses,
   le « 2 » qui se répète est orange.
   ============================================================ */

/* ---- La voix : chaque mot écrit prend l'instant exact où il est dit (de films/monde.js) ---- */
function voixDe(A){
  const CL=(window.CUES||{})[VIDEO]||{}, norme=s=>s.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,'');
  function dit(clip){ const l=CL[clip]; if(!l) throw new Error('clip sans instants : '+clip); let i=0;
    const f=txt=>{ const toks=txt.split(' '), tm=[]; let av=null;
      toks.forEach((w,k)=>{
        const n=norme(w); if(!n){ tm.push(av); return; }
        if(i>=l.length) throw new Error(`${clip} : plus de mots pour « ${txt} »`);
        const c=norme(l[i][1]); if(!c.includes(n)&&!n.includes(c)) throw new Error(`${clip} : écrit « ${w} », dit « ${l[i][1]} »`);
        av=A[clip]+l[i][0]; tm.push(av);
        const suit=toks[k+1]?norme(toks[k+1]):''; const double=l[i+1]&&l[i+1][1]===l[i][1]&&l[i][1].includes(' ');
        i+=double&&!(suit&&norme(l[i+1][1]).includes(suit))?2:1;
        while(i<l.length&&l[i][1]===l[i-1][1]&&!l[i][1].includes(' ')) i++; });
      return [tm[0],tm[tm.length-1],txt,tm]; };
    return f; }
  function mot(clip,m,n=1){ const l=CL[clip], c=norme(m); let k=0;
    for(const [t,w] of l) if(w.split(/\s+/).some(x=>norme(x)===c)&&++k===n) return A[clip]+t;
    throw new Error(`${clip} : mot introuvable « ${m} »`); }
  return {dit,mot};
}
function enchainer(depart,liste,DUR,apres={},ecart=.3){ let t=depart; return liste.map(c=>{ const r=[c,+t.toFixed(2)]; t+=DUR[c]+(apres[c]??ecart); return r; }); }
const groupe=(de,a,top,fs,...phrases)=>({de,a,top,fs,phrases});

/* ---- La page de journal : une feuille crème sur pieds, redessinée à chaque image ---- */
function poserPage({L=6.6,H=3.75,x=1.85,y=2.75,z=-1.5,res=240}={}){
  const g=new THREE.Group(); g.position.set(x,y,z); scene3d.add(g);
  const cv=document.createElement('canvas'); cv.width=Math.round(L*res); cv.height=Math.round(H*res); const c=cv.getContext('2d');
  const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace; tx.anisotropy=8;
  piece(g,new RoundedBoxGeometry(L+.24,H+.24,.14,4,.05),toon(0x8a5a2b),[0,0,-.08],CONTOUR_SOMBRE);
  const face=new THREE.Mesh(new THREE.PlaneGeometry(L,H),new THREE.MeshBasicMaterial({map:tx})); face.position.z=.001; g.add(face);
  for(const s of [-1,1]) piece(g,new THREE.CylinderGeometry(.09,.11,y,10),toon(0x8a5a2b),[s*(L/2-.6),-y/2-H/4,-.14],CONTOUR_SOMBRE);
  return {g,c,W:cv.width,H:cv.height,maj(){ tx.needsUpdate=true; }};
}
const J={papier:'#fbf5e6',encre:'#1f2937',rouge:'#c92a2a',rose:'#e64980',orange:'#e8590c',vert:'#2f9e44',bleu:'#1971c2',gris:'#868e96',pale:'#e9e2cf',jaune:'#fff3bf',vertPale:'#d3f9d8'};
const pop=(T,t0,d=.5)=>{ const u=(T-t0)/d; return u<0?0:(u>=1?1:1+.7*Math.sin(u*Math.PI)); };
const Zj=(T,t,max=1.18)=>T>=t?Math.max(1,Math.min(max,pop(T,t))):0;
/* Un texte : serif (le journal) ou sans (les calculs), qui grandit puis retombe à son instant */
function ec(c,T,t,s,x,y,taille,coul=J.encre,{serif=false,align='center',max=1.15}={}){ if(T<t) return; const z=Math.max(1,Math.min(max,pop(T,t)));
  c.fillStyle=coul; c.font=`${serif?'700':'800'} ${taille*z}px ${serif?'Georgia,"Times New Roman",serif':'"Segoe UI"'}`; c.textAlign=align; c.textBaseline='middle'; c.fillText(s,x,y); }
/* Une ligne de mots, chacun visible à son instant (mise en page fixe : rien ne bouge) */
function ligneMots(c,T,mots,x,y,taille,coul=J.encre,{serif=false,align='center'}={}){
  c.font=`${serif?'700':'800'} ${taille}px ${serif?'Georgia,"Times New Roman",serif':'"Segoe UI"'}`; c.textBaseline='middle'; c.textAlign='left';
  const esp=c.measureText(' ').width, L=mots.map(([,s])=>c.measureText(s).width), tot=L.reduce((a,b)=>a+b,0)+esp*(mots.length-1);
  let gx=align==='center'?x-tot/2:x; c.fillStyle=coul;
  mots.forEach(([t,s],k)=>{ if(t!=null&&T>=t) c.fillText(s,gx,y); gx+=L[k]+esp; }); }
function cadre(c,x,y,w,h,{fond=null,trait=J.encre,ep=6,r=22,tirets=false}={}){ c.beginPath(); c.roundRect(x,y,w,h,r); if(fond){ c.fillStyle=fond; c.fill(); }
  if(trait){ c.setLineDash(tirets?[18,12]:[]); c.strokeStyle=trait; c.lineWidth=ep; c.stroke(); c.setLineDash([]); } }
function pastille(c,T,t,s,x,y,taille,fond,coul='#fff'){ if(T<t) return; const z=Math.max(1,Math.min(1.15,pop(T,t))); c.font=`800 ${taille*z}px "Segoe UI"`;
  const w=c.measureText(s).width+taille*1.1; cadre(c,x-w/2,y-taille*.78,w,taille*1.56,{fond,trait:null,r:taille*.78}); c.fillStyle=coul; c.textAlign='center'; c.textBaseline='middle'; c.fillText(s,x,y); }

/* ---- Les dessins ---- */
function coeur(c,x,y,r,coul=J.rose,z=1){ if(z<=0) return; r*=z; c.fillStyle=coul; c.beginPath();
  c.moveTo(x,y+r*.95); c.bezierCurveTo(x-r*1.6,y-r*.1,x-r*.9,y-r*1.25,x,y-r*.45); c.bezierCurveTo(x+r*.9,y-r*1.25,x+r*1.6,y-r*.1,x,y+r*.95); c.fill(); }
function terre(c,x,y,r,z=1){ if(z<=0) return; r*=z; c.save(); c.beginPath(); c.arc(x,y,r,0,7); c.fillStyle='#4dabf7'; c.fill(); c.clip();
  c.fillStyle='#51cf66'; for(const [a,b,s] of [[-.35,-.3,.42],[.38,.05,.36],[-.1,.5,.3],[.5,-.55,.2]]){ c.beginPath(); c.ellipse(x+a*r,y+b*r,s*r,s*r*.7,a,0,7); c.fill(); }
  c.restore(); c.strokeStyle=J.encre; c.lineWidth=Math.max(3,r*.04); c.beginPath(); c.arc(x,y,r,0,7); c.stroke(); }
function bus(c,x,y,s){ c.save(); c.translate(x,y); c.scale(s,s); c.fillStyle='#fcc419'; c.beginPath(); c.roundRect(-170,-80,340,130,24); c.fill(); c.strokeStyle=J.encre; c.lineWidth=5; c.stroke();
  c.fillStyle='#a5d8ff'; for(const fx of [-140,-70,0,70]) c.fillRect(fx,-60,52,46); c.fillStyle=J.encre; for(const rx of [-100,100]){ c.beginPath(); c.arc(rx,52,26,0,7); c.fill(); } c.restore(); }
function crayons(c,x,y,s){ c.save(); c.translate(x,y); c.scale(s,s); [['#fa5252',-.5],['#228be6',.1],['#40c057',.6]].forEach(([col,a],k)=>{ c.save(); c.translate(k*46-46,0); c.rotate(a);
  c.fillStyle=col; c.fillRect(-9,-60,18,100); c.fillStyle='#ffd8a8'; c.beginPath(); c.moveTo(-9,40); c.lineTo(9,40); c.lineTo(0,62); c.fill(); c.restore(); }); c.restore(); }
function gouter(c,x,y,s,coupe){ c.save(); c.translate(x,y); c.scale(s,s); const d=coupe?26:0;
  for(const sg of [-1,1]){ c.save(); c.translate(sg*d,0); c.fillStyle='#d9a066'; c.beginPath(); c.moveTo(0,-60); c.lineTo(sg*120,-60); c.quadraticCurveTo(sg*140,-60,sg*140,-40); c.lineTo(sg*140,40); c.quadraticCurveTo(sg*140,60,sg*120,60); c.lineTo(0,60); c.closePath(); c.fill();
    c.fillStyle='#7c4a1d'; for(const [px,py] of [[50,-25],[95,15],[40,30]]){ c.beginPath(); c.arc(sg*px,py,9,0,7); c.fill(); } c.restore(); } c.restore(); }
function virus(c,x,y,r,z){ if(z<=0) return; r*=z; c.strokeStyle=J.vert; c.fillStyle=J.vert; c.lineWidth=6; for(let k=0;k<10;k++){ const a=k*Math.PI/5; c.beginPath(); c.moveTo(x+Math.cos(a)*r,y+Math.sin(a)*r); c.lineTo(x+Math.cos(a)*r*1.35,y+Math.sin(a)*r*1.35); c.stroke(); c.beginPath(); c.arc(x+Math.cos(a)*r*1.4,y+Math.sin(a)*r*1.4,r*.13,0,7); c.fill(); }
  c.fillStyle='#2b8a3e'; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); }
function jBulle(c,x,y,r,z){ if(z<=0) return; r*=z; c.fillStyle='#fff'; c.strokeStyle=J.encre; c.lineWidth=5; c.beginPath(); c.ellipse(x,y,r*1.3,r,0,0,7); c.fill(); c.stroke();
  c.fillStyle=J.encre; for(const k of [-1,0,1]){ c.beginPath(); c.arc(x+k*r*.45,y,r*.13,0,7); c.fill(); } }
function ampoule(c,x,y,r,z){ if(z<=0) return; r*=z; c.fillStyle='#ffd43b'; c.beginPath(); c.arc(x,y-r*.2,r,0,7); c.fill(); c.fillStyle='#adb5bd'; c.fillRect(x-r*.45,y+r*.7,r*.9,r*.5);
  c.strokeStyle=J.orange; c.lineWidth=6; for(let k=-2;k<=2;k++){ const a=-Math.PI/2+k*.5; c.beginPath(); c.moveTo(x+Math.cos(a)*r*1.3,y-r*.2+Math.sin(a)*r*1.3); c.lineTo(x+Math.cos(a)*r*1.65,y-r*.2+Math.sin(a)*r*1.65); c.stroke(); } }
function jSoleil(c,x,y,r){ c.strokeStyle=J.orange; c.lineWidth=7; for(let k=0;k<12;k++){ const a=k*Math.PI/6; c.beginPath(); c.moveTo(x+Math.cos(a)*r*1.2,y+Math.sin(a)*r*1.2); c.lineTo(x+Math.cos(a)*r*1.55,y+Math.sin(a)*r*1.55); c.stroke(); }
  c.fillStyle='#fcc419'; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); }
function horloge(c,x,y,r,a){ c.fillStyle='#fff'; c.strokeStyle=J.encre; c.lineWidth=6; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); c.stroke();
  c.lineWidth=7; c.beginPath(); c.moveTo(x,y); c.lineTo(x+Math.sin(a)*r*.75,y-Math.cos(a)*r*.75); c.moveTo(x,y); c.lineTo(x,y-r*.5); c.stroke(); }
function arbre(c,x,y,s){ c.save(); c.translate(x,y); c.scale(s,s); c.fillStyle='#8a5a2b'; c.fillRect(-18,-150,36,150); c.fillStyle='#40c057'; for(const [a,b,r] of [[0,-230,95],[-70,-180,70],[70,-180,70]]){ c.beginPath(); c.arc(a,b,r,0,7); c.fill(); } c.restore(); }
function douche(c,x,y,s,T){ c.save(); c.translate(x,y); c.scale(s,s); c.strokeStyle=J.gris; c.lineWidth=12; c.beginPath(); c.moveTo(-90,-200); c.lineTo(-90,-150); c.lineTo(0,-150); c.stroke();
  c.fillStyle=J.gris; c.beginPath(); c.ellipse(20,-140,50,16,0,0,7); c.fill(); c.fillStyle='#74c0fc';
  for(let k=0;k<12;k++){ const yy=((T*260+k*37)%180); c.beginPath(); c.ellipse(-20+(k%5)*20,-120+yy,5,10,0,0,7); c.fill(); }
  c.strokeStyle=J.encre; c.lineWidth=6; c.beginPath(); c.moveTo(-60,70); c.lineTo(-50,140); c.lineTo(90,140); c.lineTo(100,70); c.stroke(); c.fillStyle='#a5d8ff'; c.fillRect(-52,110,146,28); c.restore(); }
function fleche(c,x1,y1,x2,y2,coul,ep=8){ c.strokeStyle=coul; c.fillStyle=coul; c.lineWidth=ep; c.lineCap='round'; c.beginPath(); c.moveTo(x1,y1); c.lineTo(x2,y2); c.stroke();
  const a=Math.atan2(y2-y1,x2-x1), h=26; c.beginPath(); c.moveTo(x2,y2); c.lineTo(x2-h*Math.cos(a-.45),y2-h*Math.sin(a-.45)); c.lineTo(x2-h*Math.cos(a+.45),y2-h*Math.sin(a+.45)); c.closePath(); c.fill(); }
function croix(c,x,y,w,coul=J.rouge){ c.strokeStyle=coul; c.lineWidth=10; c.beginPath(); c.moveTo(x-w/2,y-w/3); c.lineTo(x+w/2,y+w/3); c.moveTo(x+w/2,y-w/3); c.lineTo(x-w/2,y+w/3); c.stroke(); }
/* n cœurs en rangées de parLigne, à partir de x0, centrés sur y */
function coeurs(c,n,x0,y,pas,r,z,parLigne=16){ const li=Math.ceil(n/parLigne); for(let k=0;k<n;k++) coeur(c,x0+(k%parLigne)*pas,y+(Math.floor(k/parLigne)-(li-1)/2)*pas*.95,r,J.rose,z); }

/* Les gestes de Ti Margo (de films/monde.js) */
function gestes(P,T){ return {
  ouvre(){ P.gesteD='ouverte'; P.md.set(.86,2.02+Math.sin(T*3)*.06,.5); P.cd.set(.72,1.58,.2); P.tetY=.08+Math.sin(T*1.7)*.07; },
  montre(){ P.gesteD='index'; P.md.set(1.02,2.72+Math.sin(T*3)*.04,.42); P.cd.set(.86,1.95,.1); P.tetX=-.1; P.regX=-.2; P.regY=.25; },
  pouce(){ P.md.set(.95,2.32,.45); P.cd.set(.74,1.7,.14); P.gesteD='pouce'; P.tetZ=-.14; P.paupiere=-1.1; },
  reflechit(){ P.md.set(.44,2.3,.72); P.cd.set(.78,1.78,.34); P.gesteD='ouverte'; P.tetZ=.15; P.tetX=-.1; P.regX=-.28; P.regY=.35; P.qSway=Math.sin(T*3)*.3; },
  salut(t,d=1.4){ const e=lisse(t*4)*lisse((d-t)*4); P.md.set(.88,2.2+.68*e,.28); P.cd.set(.82,1.92,.06); P.gesteD='ouverte'; P.tourneD=Math.sin(T*11)*.42*e; },
  oups(){ P.gesteD='ouverte'; P.md.set(.98,2.42,.5); P.mg.set(-.98,2.42,.5); P.cd.set(.82,1.7,.2); P.cg.set(-.82,1.7,.2); P.tetZ=.16+Math.sin(T*2)*.03; P.tetX=-.06; P.paupiere=-1.25; },
  fier(){ P.gesteD='pouce'; P.md.set(.9,2.5+Math.sin(T*4)*.05,.45); P.cd.set(.74,1.8,.14); P.tetZ=-.1; P.tetY=Math.sin(T*2)*.1; }
}; }

/* La voix validée, mot pour mot (manim/voix/journal-presentation-paysage.json) : les sous-titres en viennent */
const TEXTES={
  '00-situation':"Ce matin, dans le bus, Lina a fait tomber ses crayons. Je les ai ramassés. Et à la récré, Sam avait oublié son goûter : je lui ai donné la moitié du mien. Deux petites bonnes actions. Est-ce que ça peut changer le monde ?",
  '01-journal':"Pour le savoir, j'ouvre le Journal d'éleveai. Son nom : comprendre le monde, et le changer. Chaque jour, des articles sur l'espace, la santé, l'argent, le sport, la planète… et les maths qui les expliquent.",
  '02-une':"Aujourd'hui, à la Une : deux bonnes actions par jour, et la planète entière change en un mois. Je lis l'article. Le premier jour, je fais 2 bonnes actions. Le deuxième jour, Lina et Sam en font chacun 2 : ça fait 4. Le troisième jour : 8. Chaque jour, le nombre double.",
  '04-semaine':"Au début, c'est minuscule. Le 7e jour : 128 bonnes actions ce jour-là. Pas de quoi changer le monde… Attends un peu.",
  '05-maths':"Dans l'article, un encadré : Les maths derrière. Jour 2 : 2 au carré, 4. Jour 3 : 2 au cube, 8. Et le jour 30 : 2 puissance 30. Un milliard soixante-treize millions sept cent quarante et un mille huit cent vingt-quatre ! Plus d'un milliard, en un seul jour.",
  '07-total':"Même astuce au bout de 30 jours : le total, c'est 2 puissance 31, moins 2. Deux milliards cent quarante-sept millions quatre cent quatre-vingt-trois mille six cent quarante-six bonnes actions !",
  '09-vraie-vie':"Bien sûr, dans la vraie vie, la chaîne se casse souvent. Mais même si chacun ne transmettait qu'une fois par semaine, il faudrait 32 semaines : moins d'un an. C'est comme ça que se propagent un virus, une rumeur… ou une idée généreuse.",
  '10-metier':"D'ailleurs, ces calculs, c'est le métier d'une épidémiologiste : elle suit la façon dont les maladies se propagent.",
  '11-agir':"Et l'article finit par une phrase qui change le monde : Et toi, tu peux… Lance la chaîne aujourd'hui : fais une bonne action à deux personnes, et demande-leur d'en faire autant. Demain, compte combien ont continué.",
  '12-chiffres':"Dans le journal, il y a aussi les chiffres clés. Par exemple : trois cent mille kilomètres par seconde, la vitesse de la lumière.",
  '13-nouvelles':"Puis les autres nouvelles : le Soleil que tu vois a 8 minutes de retard. Ton cœur bat environ cent mille fois par jour.",
  '14-mission':"Et chaque jour, une mission. Un jour, le défi dehors : mesure la hauteur d'un arbre, sans y grimper, avec son ombre. Le lendemain, la bonne action du jour : économise l'eau de ta douche.",
  '15-appris':"Ce que tu as appris. Ce qui double chaque jour devient vite gigantesque. Et un article du journal se lit en trois temps : comprendre, se tester, agir.",
  '16-rendez-vous':"Le journal change chaque jour. Pour le trouver, clique sur le bandeau où je lis mon journal, en haut de toutes les pages."
};
/* Découpe une voix en sous-titres d'au plus 2 lignes de CAR caractères */
function decouper(txt,CAR=60){ const phrases=txt.split(/(?<=[.!?:…])\s+/), groupes=[];
  for(const p of phrases){ const lignes=[]; let cur='';
    for(const w of p.split(' ')){ if((cur+' '+w).trim().length>CAR&&cur){ lignes.push(cur); cur=w; } else cur=(cur+' '+w).trim(); }
    if(cur) lignes.push(cur);
    for(let k=0;k<lignes.length;k+=2) groupes.push(lignes.slice(k,k+2)); }
  return groupes; }

FILMS.presentation=function(outils){
  const {el,$,legende,fin,panneau}=outils;
  const ORDRE=['00-situation','01-journal','02-une','03q-question','03r-reponse','04-semaine','05-maths','06q-question','06r-reponse','07-total','08q-question','08r-reponse',
    '09-vraie-vie','10-metier','11-agir','12-chiffres','13-nouvelles','14-mission','15-appris','16-rendez-vous','17-abonne'];
  const DUR={'00-situation':17.33,'01-journal':16.45,'02-une':21.385,'03q-question':17.895,'03r-reponse':11.94,'04-semaine':11.37,'05-maths':22.545,'06q-question':14.455,'06r-reponse':12.02,
    '07-total':13.13,'08q-question':18.52,'08r-reponse':10.505,'09-vraie-vie':17.37,'10-metier':7.86,'11-agir':14.83,'12-chiffres':9.825,'13-nouvelles':8.855,'14-mission':14.615,
    '15-appris':12.04,'16-rendez-vous':8.51,'17-abonne':9.745};
  /* Après chaque question : 5 s de compte à rebours (+ un souffle) ; des respirations après les écrans denses */
  const REBOURS=5;
  const clips=enchainer(.6,ORDRE,DUR,{'00-situation':.8,'01-journal':.6,'02-une':.9,'03q-question':REBOURS+.6,'03r-reponse':.9,'04-semaine':.6,'05-maths':1.2,'06q-question':REBOURS+.6,'06r-reponse':.9,
    '07-total':1.2,'08q-question':REBOURS+.6,'08r-reponse':1,'09-vraie-vie':.8,'10-metier':.8,'11-agir':1,'12-chiffres':.6,'13-nouvelles':.9,'14-mission':1,'15-appris':1.2,'16-rendez-vous':.8});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A), fin_=k=>A[k]+DUR[k];
  const FIN=+(fin_('17-abonne')+1).toFixed(2);
  const CL=(window.CUES||{})[VIDEO]||{}, at=(clip,k)=>A[clip]+CL[clip][k][0];
  /* Les mots d'un clip, à partir du n-ième mot « depuis » : [[instant, mot écrit], …] */
  const motsDe=(clip,txt,depuis,n=1)=>{ const l=CL[clip], norme=x=>x.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,''), aMot=(j,m)=>l[j][1].split(/\s+/).some(x=>norme(x)===m);
    let k=0, i=l.findIndex((x,j)=>aMot(j,norme(depuis))&&++k===n); if(i<0) throw new Error(clip+' : pas de « '+depuis+' »'); let av=null;
    return txt.split(' ').map(w=>{ const m=norme(w); if(!m) return [av,w]; let j=i; while(j<l.length&&!aMot(j,m)) j++;
      if(j>=l.length||j-i>3) throw new Error(clip+' : écrit « '+w+' », introuvable'); av=A[clip]+l[j][0];
      const p=l[j][1].split(/\s+/); if(norme(p[p.length-1])===m){ j++; while(j<l.length&&l[j][1]===l[j-1][1]) j++; } i=j; return [av,w]; }); };

  /* Le décor : un jardin d'école, la page du journal, Ti Margo à gauche */
  poserStudio({couleurSol:0x9fd67a,xMin:-14,xMax:14,ecart:3.5,z:-6});
  const ciel=new THREE.Mesh(new THREE.PlaneGeometry(300,80),new THREE.MeshBasicMaterial({color:0xcdeeff})); ciel.position.set(0,20,-14); scene3d.add(ciel);
  const pg=poserPage({x:1.58,y:2.5});
  panneau.style.display='none';

  /* Le cadre commun est fait pour le 9:16 : on règle titre, ceinture et sous-titres pour le paysage */
  const css=document.createElement('style'); css.textContent=`
    #titre{left:520px;right:520px;top:40px;font-size:70px;}
    #echelle{left:560px;right:560px;top:170px;}
    #legende{left:60px;right:60px;top:auto!important;bottom:34px;font-size:46px!important;padding:12px 26px;border-radius:30px;line-height:1.2;}
    #fin{left:430px;right:430px;top:60px;font-size:56px;padding:22px;}
    #fin .site{font-size:88px;margin:6px 0 12px;} #fin .geste{margin:4px 0;} #fin .ico{font-size:62px;}
    #anciens{display:none;}`;
  document.head.append(css);
  /* L'écran de fin du paysage : avec « Un commentaire » (le cadre ne connaît que le short) */
  fin.innerHTML=`<div id="anciens"><i id="f1"></i><i id="f2"></i><i id="f3"></i><i id="f4"></i><i id="f5"></i><i id="f6"></i></div>
    <div id="g1">Entraîne-toi sur</div><div class="site" id="g2">eleveai.fr</div>
    <div class="geste" id="g3"><span class="ico">👍</span><span>Un pouce</span></div>
    <div class="geste" id="g4"><span class="ico">💬</span><span>Un commentaire</span></div>
    <div class="geste" id="g5"><span>Abonne-toi !</span></div><div class="chaine" id="g6">@eleveai974</div>
    <div class="geste" id="g7"><span class="ico">🔔</span><span>La cloche</span></div>`;
  const tFin={g1:mot('17-abonne','Entraîne-toi'),g2:mot('17-abonne','éleveai'),g3:mot('17-abonne','pouce'),g4:mot('17-abonne','commentaire'),g5:mot('17-abonne','abonne-toi'),g6:mot('17-abonne','abonne-toi'),g7:mot('17-abonne','cloche')};

  /* ---- Les instants ---- */
  const S='00-situation', finTitre=mot(S,'Je')-.08;
  const QUESTIONS=['03q-question','03r-reponse','06q-question','06r-reponse','08q-question','08r-reponse'];

  /* Les sous-titres : la voix, mot à mot (pas pendant les questions, écrites sur la page, ni pendant la fin) */
  /* Les mots d'une voix, dans l'ordre, appariés mot pour mot (les jetons doublés « 2 puissance » sont sautés) */
  const seq=clip=>{ const l=CL[clip], norme=x=>x.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,''), aMot=(j,m)=>l[j][1].split(/\s+/).some(x=>norme(x)===m); let i=0;
    return txt=>{ const tm=[]; let av=null;
      for(const w of txt.split(' ')){ const m=norme(w); if(!m){ tm.push(av); continue; } let j=i; while(j<l.length&&!aMot(j,m)) j++;
        if(j>=l.length||j-i>3) throw new Error(clip+' : écrit « '+w+' », introuvable après « '+(l[i]||['',''])[1]+' »'); av=A[clip]+l[j][0]; tm.push(av);
        const p=l[j][1].split(/\s+/); if(norme(p[p.length-1])===m){ j++; while(j<l.length&&l[j][1]===l[j-1][1]&&l[j][1].includes(' ')) j++; } i=j; }
      return [tm[0],tm[tm.length-1],txt,tm]; }; };
  const groupes=[];
  ORDRE.forEach((k,i)=>{ if(!TEXTES[k]) return; const D=seq(k), liste=decouper(TEXTES[k]).map(gr=>gr.map(l=>D(l))), suite=A[ORDRE[i+1]]-.1;
    liste.forEach((ph,j)=>groupes.push(groupe(ph[0][0]-.08,j+1<liste.length?liste[j+1][0][0]-.08:suite,0,46,...ph))); });

  /* ---- Une carte question sur la page : tête, question, 3 choix côte à côte, compte à rebours, réponse ---- */
  function carteQ(c,T,W,H,o){ const enR=T>=A[o.rc];
    pastille(c,T,o.tTete,o.tete,W/2,70,44,o.tete==='Question !'?'#f5a50a':J.rouge);
    o.q.forEach((m,k)=>ligneMots(c,T,m,W/2,170+k*(o.fs||60)*1.27,o.fs||60,J.encre,{serif:true}));
    const bw=440, gap=40, x0=W/2-(3*bw+2*gap)/2, y=o.yChoix||360;
    o.choix.forEach(([tL,tV,s],k)=>{ if(T<tL) return; const x=x0+k*(bw+gap), bon=enR&&k===o.bonne&&T>=o.tBon, pale=enR&&k!==o.bonne&&T>=o.tBon;
      const z=bon?1+.12*Math.sin(Math.min(1,(T-o.tBon)/.8)*Math.PI):1; c.save(); c.translate(x+bw/2,y+60); c.scale(z,z); c.globalAlpha=pale?.35:1;
      cadre(c,-bw/2,-60,bw,120,{fond:bon?'#c7f4a1':'#fff',trait:bon?J.vert:J.encre,ep:6,r:26});
      c.fillStyle=bon?J.vert:J.encre; c.beginPath(); c.arc(-bw/2+62,0,40,0,7); c.fill(); c.fillStyle='#fff'; c.font='800 50px "Segoe UI"'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('ABC'[k],-bw/2+62,2);
      if(T>=tV){ c.fillStyle=J.encre; c.font=`800 ${s.length>7?46:58}px "Segoe UI"`; c.fillText(s,40,2); } c.restore(); });
    if(!enR){ ligneMots(c,T,o.pause,W/2,580,52,J.orange);
      const t0=fin_(o.qc)+.1; if(T>=t0&&T<t0+REBOURS){ cadre(c,W/2-420,650,840,36,{fond:'#e4efe0',trait:null,r:18}); cadre(c,W/2-420,650,840*(1-(T-t0)/REBOURS),36,{fond:'#f5a50a',trait:null,r:18}); } }
    return enR; }

  /* ---- Les instants de chaque écran ---- */
  const t={};
  // 00 : le bus, la récré, deux bonnes actions, le monde ?
  Object.assign(t,{bus:mot(S,'bus'),lina:mot(S,'Lina'),cray:mot(S,'crayons'),ram:mot(S,'ramassés'),recre:mot(S,'récré'),sam:mot(S,'Sam'),gou:mot(S,'goûter'),moi:mot(S,'moitié'),deux:mot(S,'Deux'),monde:mot(S,'monde')});
  // 01 : le journal
  const Jn='01-journal'; Object.assign(t,{jour:mot(Jn,'Journal'),compr:mot(Jn,'comprendre'),chg:mot(Jn,'changer'),esp:mot(Jn,"l'espace"),san:mot(Jn,'santé'),arg:mot(Jn,"l'argent"),spo:mot(Jn,'sport'),pla:mot(Jn,'planète'),mat:mot(Jn,'maths')});
  // 02 : la Une, jour 1-2-3
  const U='02-une'; Object.assign(t,{une:mot(U,'Une'),titreU:mot(U,'deux'),lis:mot(U,'lis'),j1:mot(U,'premier'),n1:at(U,25),j2:mot(U,'deuxième'),lina2:mot(U,'Lina'),sam2:mot(U,'Sam'),n2:mot(U,'4'),j3:mot(U,'troisième'),n3:mot(U,'8'),dbl:mot(U,'double')});
  // 03 : le défi de l'article (B)
  const Q1=motsDe('03q-question','Le 5e jour, combien de bonnes actions','Le'), Q1b=motsDe('03q-question','sont faites ce jour-là ?','sont');
  const q1={qc:'03q-question',rc:'03r-reponse',tTete:mot('03q-question','défi'),tete:'Le défi de l’article',q:[Q1,Q1b],bonne:1,
    choix:[[mot('03q-question','A',2),at('03q-question',20),'10'],[mot('03q-question','B'),at('03q-question',22),'32'],[mot('03q-question','C'),at('03q-question',24),'25']],
    pause:motsDe('03q-question','Mets pause, et choisis !','Mets'),tBon:mot('03r-reponse','B')};
  const R1=[mot('03r-reponse','2'),mot('03r-reponse','4'),mot('03r-reponse','8'),mot('03r-reponse','16'),mot('03r-reponse','32',2)], r1Pui=mot('03r-reponse','puissance'), r1Cinq=mot('03r-reponse','5'), r1Fois=mot('03r-reponse','fois');
  // 04 : jour 7
  const Se='04-semaine'; Object.assign(t,{mini:mot(Se,'minuscule'),j7:mot(Se,'7e'),n128:mot(Se,'128'),att:mot(Se,'Attends')});
  // 05 : les maths derrière
  const M='05-maths'; Object.assign(t,{enc:mot(M,'Les'),m2:mot(M,'carré'),m4:mot(M,'4'),m3:mot(M,'cube'),m8:mot(M,'8'),m30:mot(M,'30',2),mil:mot(M,'milliard'),mil2:mot(M,'soixante-treize'),mil3:mot(M,'sept'),mil4:mot(M,'huit'),plus:mot(M,'Plus'),seul:mot(M,'seul')});
  t.mJ2=mot(M,'Jour'); t.mJ3=mot(M,'Jour',2); t.mJ30=mot(M,'jour',3);
  // 06 : en tout après 3 jours (C)
  const Q2=motsDe('06q-question','Et en tout ? Après 3 jours,','Et'), Q2b=motsDe('06q-question','combien de bonnes actions depuis le début ?','combien');
  const q2={qc:'06q-question',rc:'06r-reponse',tTete:mot('06q-question','Question'),tete:'Question !',q:[Q2,Q2b],bonne:2,
    choix:[[mot('06q-question','A'),mot('06q-question','8'),'8'],[mot('06q-question','B'),mot('06q-question','16'),'16'],[mot('06q-question','C'),mot('06q-question','14'),'14']],
    pause:motsDe('06q-question','Mets pause, et choisis !','Mets'),tBon:mot('06r-reponse','C')};
  const R2={add:mot('06r-reponse','additionne'),a2:mot('06r-reponse','2'),a4:mot('06r-reponse','4'),a8:mot('06r-reponse','8'),reg:mot('06r-reponse','regarde'),pui:mot('06r-reponse','puissance'),q:mot('06r-reponse','4',3),moins:mot('06r-reponse','moins')};
  // 07 : le total au bout de 30 jours
  const To='07-total'; Object.assign(t,{tot:mot(To,'total'),p31:mot(To,'31'),moins:mot(To,'moins'),d1:mot(To,'Deux'),d2:mot(To,'cent'),d3:mot(To,'quatre'),d4:mot(To,'six'),ba:mot(To,'bonnes')});
  // 08 : toute la planète (A)
  const Q3a=motsDe('08q-question','La Terre compte environ 8 milliards d’habitants.','La'), Q3b=motsDe('08q-question','En combien de temps la chaîne','En'), Q3c=motsDe('08q-question','toucherait-elle tout le monde ?','toucherait-elle');
  const q3={qc:'08q-question',rc:'08r-reponse',tTete:mot('08q-question','Question'),tete:'Question !',q:[Q3a,Q3b,Q3c],fs:56,bonne:0,yChoix:400,
    choix:[[mot('08q-question','A'),mot('08q-question','32'),'≈ 32 jours'],[mot('08q-question','B'),mot('08q-question','4'),'≈ 4 ans'],[mot('08q-question','C'),mot('08q-question','mille'),'≈ 1 000 ans']],
    pause:motsDe('08q-question','Mets pause, et choisis !','Mets'),tBon:mot('08r-reponse','A')};
  const R3={j32:mot('08r-reponse','32',3),dep:mot('08r-reponse','dépasse'),pla:mot('08r-reponse','planète')};
  // 09 : la vraie vie
  const V='09-vraie-vie'; Object.assign(t,{casse:mot(V,'casse'),sem:mot(V,'semaine'),s32:mot(V,'32'),an:mot(V,'moins'),vir:mot(V,'virus'),rum:mot(V,'rumeur'),idee:mot(V,'idée'),gen:mot(V,'généreuse')});
  // 10 : le métier
  const Me='10-metier'; Object.assign(t,{metier:mot(Me,'métier'),epi:mot(Me,'épidémiologiste'),suit:mot(Me,'suit'),prop:mot(Me,'propagent')});
  // 11 : et toi, tu peux…
  const Ag='11-agir'; Object.assign(t,{etoi:mot(Ag,'toi'),lance:mot(Ag,'Lance'),fais:mot(Ag,'fais'),dem:mot(Ag,'demande-leur'),demain:mot(Ag,'Demain'),cont:mot(Ag,'continué')});
  // 12-13 : chiffres clés, autres nouvelles
  const Ch='12-chiffres'; Object.assign(t,{cc:mot(Ch,'chiffres'),c300:mot(Ch,'trois'),vit:mot(Ch,'vitesse')});
  const No='13-nouvelles'; Object.assign(t,{an_:mot(No,'autres'),sol:mot(No,'Soleil'),min8:mot(No,'8'),coe:mot(No,'cœur'),c100:mot(No,'cent')});
  // 14 : la mission
  const Mi='14-mission'; Object.assign(t,{mis:mot(Mi,'mission'),dehors:mot(Mi,'dehors'),haut:mot(Mi,'hauteur'),ombre:mot(Mi,'ombre'),lend:mot(Mi,'lendemain'),bonne:mot(Mi,'bonne'),dou:mot(Mi,'douche')});
  // 15 : ce que tu as appris
  const Ap='15-appris'; Object.assign(t,{app:mot(Ap,'appris'),dbl2:mot(Ap,'double'),gig:mot(Ap,'gigantesque'),trois:mot(Ap,'trois'),comp:mot(Ap,'comprendre'),test:mot(Ap,'tester'),agir:mot(Ap,'agir')});
  // 16 : le bandeau
  const Rv='16-rendez-vous'; Object.assign(t,{chg2:mot(Rv,'change'),cli:mot(Rv,'clique'),band:mot(Rv,'bandeau'),haut2:mot(Rv,'haut')});

  /* ---- La page, écran par écran ---- */
  function dessiner(T){ const c=pg.c, W=pg.W, H=pg.H; c.fillStyle=J.papier; c.fillRect(0,0,W,H);
    const entre=(a,b)=>T>=A[a]&&(b?T<A[b]:true);
    /* 16 : le bandeau du site */
    if(entre('16-rendez-vous','17-abonne')){
      ec(c,T,t.chg2-0,'Le journal change chaque jour',W/2,110,62,J.encre,{serif:true});
      if(T>=t.band-.2||T>=t.cli){ const y=330; cadre(c,90,y,W-180,190,{fond:'#fdf6e3',trait:J.encre,ep:5,r:10});
        c.fillStyle='#82c91e'; c.beginPath(); c.arc(220,y+95,62,0,7); c.fill(); c.fillStyle='#fff'; c.beginPath(); c.roundRect(178,y+66,84,60,6); c.fill(); c.strokeStyle=J.encre; c.lineWidth=3; c.strokeRect(178,y+66,84,60);
        ec(c,T,t.cli,'Le Journal d’EleveAI',330,y+70,58,J.encre,{serif:true,align:'left',max:1});
        ec(c,T,t.cli,'Comprendre le monde, et le changer',330,y+135,40,J.gris,{serif:true,align:'left',max:1});
        pastille(c,T,t.cli,'Lire',W-230,y+95,44,J.rouge);
        if(T>=t.cli){ const u=Math.min(1,(T-t.cli)/.9), cx=W-480+250*u, cy=y+330-235*u; c.fillStyle=J.encre; c.beginPath(); c.moveTo(cx,cy); c.lineTo(cx+22,cy+62); c.lineTo(cx+34,cy+38); c.lineTo(cx+60,cy+40); c.closePath(); c.fill();
          if(u>=1&&T<t.cli+1.6){ c.strokeStyle=J.orange; c.lineWidth=6; c.beginPath(); c.arc(cx,cy,30+40*((T-t.cli-.9)%0.7),0,7); c.stroke(); } } }
      ec(c,T,t.haut2,'en haut de toutes les pages',W/2,680,52,J.vert);
      pg.maj(); return; }
    /* 15 : ce que tu as appris */
    if(entre('15-appris')){
      ec(c,T,t.app,'Ce que tu as appris',W/2,90,72,J.rouge,{serif:true}); c.fillStyle=J.encre; c.fillRect(W/2-380,140,760,5);
      ec(c,T,t.gig,'Ce qui double chaque jour devient vite gigantesque.',W/2,250,52,J.encre);
      if(T>=t.gig){ [14,22,34,52].forEach((r,k)=>coeur(c,W/2-300+k*170,345,r,J.rose,Zj(T,t.gig+k*.15))); }
      ec(c,T,t.trois,'Un article se lit en trois temps :',W/2,460,52,J.encre);
      [[t.comp,'Comprendre',J.bleu],[t.test,'Se tester',J.orange],[t.agir,'Agir',J.vert]].forEach(([tt,s,col],k)=>pastille(c,T,tt,s,W/2-460+k*460,600,56,col));
      pg.maj(); return; }
    /* 14 : la mission du jour */
    if(entre('14-mission','15-appris')){
      ec(c,T,t.mis,'Chaque jour, une mission',W/2,80,62,J.encre,{serif:true});
      if(T>=t.dehors){ cadre(c,60,150,W/2-90,680,{fond:'#ebfbee',trait:J.vert,ep:6}); ec(c,T,t.dehors,'Le défi dehors',W/4+15,215,54,J.vert,{serif:true}); }
      if(T>=t.haut){ arbre(c,320,770,.9*Zj(T,t.haut)); ec(c,T,t.haut,'Mesure la hauteur',W/4+15,300,40); ec(c,T,t.haut,'d’un arbre… sans y grimper',W/4+15,350,40); }
      if(T>=t.ombre){ c.fillStyle='rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(460,775,170*Math.min(1,(T-t.ombre)/.6),16,0,0,7); c.fill();
        c.strokeStyle=J.encre; c.lineWidth=8; c.beginPath(); c.moveTo(620,775); c.lineTo(620,690); c.stroke(); c.fillStyle='rgba(0,0,0,.25)'; c.fillRect(620,768,60,14); ec(c,T,t.ombre,'avec son ombre',W/4+15,420,40,J.vert); }
      if(T>=t.bonne){ cadre(c,W/2+30,150,W/2-90,680,{fond:'#e7f5ff',trait:J.bleu,ep:6}); ec(c,T,t.bonne,'La bonne action du jour',W*3/4-15,215,44,J.bleu,{serif:true}); }
      if(T>=t.dou){ ec(c,T,t.dou,'Économise l’eau de ta douche',W*3/4-15,300,40); douche(c,W*3/4-15,600,1.25,T); }
      pg.maj(); return; }
    /* 13 : les autres nouvelles */
    if(entre('13-nouvelles','14-mission')){
      ec(c,T,t.an_,'Les autres nouvelles',W/2,80,62,J.encre,{serif:true}); if(T>=t.an_){ c.fillStyle=J.encre; c.fillRect(80,125,W-160,6); c.fillRect(80,137,W-160,2); }
      if(T>=t.sol){ jSoleil(c,330,380,90*Zj(T,t.sol)); ec(c,T,t.sol,'Le Soleil que tu vois',W/4+20,600,46,J.encre,{serif:true}); ec(c,T,t.min8,'a 8 minutes de retard',W/4+20,660,46,J.orange,{serif:true}); }
      if(T>=t.min8) horloge(c,560,400,70,(T-t.min8)*1.4);
      if(T>=t.coe){ c.fillStyle=J.encre; c.fillRect(W/2-3,200,6,560); const b=1+.12*Math.max(0,Math.sin(T*7.5)); coeur(c,W*3/4-20,380,95*b,'#e03131',Zj(T,t.coe));
        ec(c,T,t.coe,'Ton cœur bat environ',W*3/4-20,600,46,J.encre,{serif:true}); ec(c,T,t.c100,'100 000 fois par jour',W*3/4-20,660,46,J.rouge,{serif:true}); }
      pg.maj(); return; }
    /* 12 : les chiffres clés */
    if(entre('12-chiffres','13-nouvelles')){
      pastille(c,T,t.cc,'Les chiffres clés',W/2,90,48,J.encre);
      ec(c,T,t.c300,'300 000 km/s',W/2,330,170,J.bleu);
      if(T>=t.vit){ jSoleil(c,220,620,60); terre(c,W-220,620,55); const u=((T-t.vit)*.6)%1; c.strokeStyle='#fab005'; c.lineWidth=10; c.beginPath(); c.moveTo(320,620); c.lineTo(320+(W-640)*u,620); c.stroke();
        ec(c,T,t.vit,'la vitesse de la lumière',W/2,520,60,J.encre,{serif:true}); }
      pg.maj(); return; }
    /* 11 : et toi, tu peux… */
    if(entre('11-agir','12-chiffres')){
      if(T>=t.etoi){ cadre(c,90,90,W-180,690,{fond:'#ebfbee',trait:J.vert,ep:7}); ec(c,T,t.etoi,'Et toi, tu peux…',W/2,180,82,J.vert,{serif:true}); }
      ec(c,T,t.fais,'Fais une bonne action à 2 personnes',W/2,330,56,J.encre);
      if(T>=t.fais){ coeur(c,W/2-140,450,50,J.rose,Zj(T,t.fais)); coeur(c,W/2+140,450,50,J.rose,Zj(T,t.fais)); }
      ec(c,T,t.dem,'et demande-leur d’en faire autant.',W/2,560,50,J.encre);
      ec(c,T,t.demain,'Demain : combien ont continué ?',W/2,680,56,J.orange);
      pg.maj(); return; }
    /* 10 : le métier */
    if(entre('10-metier','11-agir')){
      pastille(c,T,t.metier,'Métier',W/2,90,46,J.bleu);
      ec(c,T,t.epi,'épidémiologiste',W/2,220,96,J.encre,{serif:true});
      if(T>=t.epi){ cadre(c,W/2-420,300,840,400,{fond:'#f1f3f5',trait:J.gris,ep:5});
        const n=Math.min(64,Math.floor(Math.pow(2,Math.max(0,(T-t.epi)*1.6)))); for(let k=0;k<n;k++){ const a=k*2.4, r=14*Math.sqrt(k); c.fillStyle='#e03131'; c.beginPath(); c.arc(W/2+Math.cos(a)*r*2.2,500+Math.sin(a)*r*1.2,9,0,7); c.fill(); } }
      ec(c,T,t.suit,'Elle suit la façon dont les maladies se propagent.',W/2,770,46,J.encre);
      pg.maj(); return; }
    /* 09 : la vraie vie */
    if(entre('09-vraie-vie','10-metier')){
      if(T<t.vir){ const X=[300,500,700,900,1100,1300], casse=T>=t.casse;
        X.forEach((x,k)=>{ const dx=casse&&k>=3?70:0; c.strokeStyle=casse&&(k===2||k===3)?J.rouge:J.encre; c.lineWidth=14; c.beginPath(); c.roundRect(x-110+dx,180,220,110,55); c.stroke(); });
        ec(c,T,t.casse,'crac !',W/2+40,110,70,J.rouge);
        ec(c,T,t.sem,'1 fois par semaine',W/2,430,64,J.encre); if(T>=t.s32){ fleche(c,W/2-120,500,W/2-120,560,J.encre); }
        ec(c,T,t.s32,'32 semaines',W/2-120,620,72,J.orange); ec(c,T,t.an,'< 1 an',W/2+260,620,72,J.vert);
        pg.maj(); return; }
      virus(c,W/2-480,380,90,Zj(T,t.vir)); jBulle(c,W/2,380,100,Zj(T,t.rum)); ampoule(c,W/2+480,380,100,Zj(T,t.idee));
      ec(c,T,t.vir,'un virus',W/2-480,610,58,J.vert); ec(c,T,t.rum,'une rumeur',W/2,610,58,J.encre); ec(c,T,t.idee,'une idée',W/2+480,610,58,J.orange); ec(c,T,t.gen,'généreuse',W/2+480,680,58,J.orange);
      pg.maj(); return; }
    /* 08 : toute la planète */
    if(entre('08q-question','09-vraie-vie')){ const enR=carteQ(c,T,W,H,q3);
      if(enR){ ec(c,T,R3.j32,'Jour 32 : total > 8 milliards',W/2,620,64,J.vert); if(T>=R3.pla){ terre(c,W/2,760,62,Zj(T,R3.pla)); for(let k=0;k<9;k++) coeur(c,W/2+Math.cos(k*.7)*95,760+Math.sin(k*.7)*80,16,J.rose,Zj(T,R3.pla+k*.08)); } }
      pg.maj(); return; }
    /* 07 : le total */
    if(entre('07-total','08q-question')){
      ec(c,T,t.tot,'En tout, après 30 jours :',W/2,90,58,J.encre,{serif:true});
      ec(c,T,t.tot,'2 + 4 + … + 2³⁰',W/2,230,90,J.rose);
      ec(c,T,t.p31,'= 2³¹',W/2-120,380,100,J.orange); ec(c,T,t.moins,'− 2',W/2+130,380,100,J.orange);
      const parts=[[t.d1,'2'],[t.d2,'147'],[t.d3,'483'],[t.d4,'646']]; c.font='800 130px "Segoe UI"'; c.textBaseline='middle';
      let s=''; for(const [tt,p] of parts) if(T>=tt) s+=(s?' ':'')+p; if(s){ c.fillStyle=J.vert; c.textAlign='left'; c.fillText('= '+s,W/2-560,560); }
      ec(c,T,t.ba,'bonnes actions !',W/2,720,60,J.encre);
      pg.maj(); return; }
    /* 06 : en tout après 3 jours */
    if(entre('06q-question','07-total')){ const enR=carteQ(c,T,W,H,q2);
      if(enR){ ligneMots(c,T,[[R2.a2,'2'],[R2.a2,'+'],[R2.a4,'4'],[R2.a4,'+'],[R2.a8,'8'],[R2.a8,'='],[R2.a8,'14']],W/2,600,72,J.rose);
        ligneMots(c,T,[[R2.reg,'14'],[R2.pui,'='],[R2.q,'2⁴'],[R2.moins,'−'],[R2.moins+.35,'2']],W/2,720,72,J.orange); }
      pg.maj(); return; }
    /* 05 : les maths derrière */
    if(entre('05-maths','06q-question')){
      pastille(c,T,t.enc,'Les maths derrière',W/2,80,46,J.rouge);
      ec(c,T,t.mJ2,'Jour 2 :',W/2-230,200,64,J.encre,{align:'right'}); ec(c,T,t.m2,'2²',W/2-170,200,72,J.orange,{align:'left'}); ec(c,T,t.m4,'= 4',W/2-40,200,64,J.encre,{align:'left'});
      ec(c,T,t.mJ3,'Jour 3 :',W/2-230,300,64,J.encre,{align:'right'}); ec(c,T,t.m3,'2³',W/2-170,300,72,J.orange,{align:'left'}); ec(c,T,t.m8,'= 8',W/2-40,300,64,J.encre,{align:'left'});
      ec(c,T,t.mJ30,'Jour 30 :',W/2-230,420,64,J.encre,{align:'right'}); ec(c,T,t.m30,'2³⁰',W/2-170,420,82,J.orange,{align:'left'});
      const parts=[[t.mil,'1'],[t.mil2,'073'],[t.mil3,'741'],[t.mil4,'824']]; let s=''; for(const [tt,p] of parts) if(T>=tt) s+=(s?' ':'')+p;
      if(s){ const z=T>=t.mil4?Math.max(1,Math.min(1.15,pop(T,t.mil4+.6))):1; c.font=`800 ${130*z}px "Segoe UI"`; c.textBaseline='middle'; c.textAlign='left'; c.fillStyle=J.vert; c.textAlign='center'; c.fillText('= '+s,W/2,580); }
      ec(c,T,t.plus,'Plus d’1 milliard',W/2,720,70,J.rose); ec(c,T,t.seul,'en 1 seul jour !',W/2,815,58,J.encre);
      pg.maj(); return; }
    /* 04 : jour 7 */
    if(entre('04-semaine','05-maths')){
      ec(c,T,t.mini,'minuscule…',W/2,90,56,J.gris,{serif:true});
      ec(c,T,t.j7,'Jour 7 :',W/2-140,210,80,J.encre); ec(c,T,t.n128,'128',W/2+140,210,100,J.orange);
      if(T>=t.n128) coeurs(c,128,170,540,38,13,Zj(T,t.n128),32);
      ec(c,T,t.att,'Attends un peu…',W/2,800,56,J.orange,{serif:true});
      pg.maj(); return; }
    /* 03 : le défi de l'article */
    if(entre('03q-question','04-semaine')){ const enR=carteQ(c,T,W,H,q1);
      if(enR){ R1.forEach((tt,k)=>{ ec(c,T,tt,String([2,4,8,16,32][k]),W/2-420+k*170,600,72,J.rose); if(k&&T>=tt) ec(c,T,tt,'×2',W/2-505+k*170,555,30,J.vert); });
        ligneMots(c,T,[[r1Pui,'2⁵'],[r1Cinq,'='],[r1Cinq,'32']],W/2-260,730,76,J.orange); if(T>=r1Fois){ ec(c,T,r1Fois,'2 × 5 = 10',W/2+300,730,64,J.gris); croix(c,W/2+300,730,320); } }
      pg.maj(); return; }
    /* 02 : la Une, puis jour après jour */
    if(entre('02-une','03q-question')){
      if(T<t.j1){ pastille(c,T,t.une,'À LA UNE',W/2,90,44,J.rouge);
        ec(c,T,t.titreU,'Deux bonnes actions par jour,',W/2,250,74,J.encre,{serif:true}); ec(c,T,t.titreU+.6,'et la planète entière',W/2,350,74,J.encre,{serif:true}); ec(c,T,t.titreU+1.2,'change en un mois',W/2,450,74,J.encre,{serif:true});
        if(T>=t.lis){ c.fillStyle=J.pale; for(let k=0;k<5;k++) c.fillRect(200,560+k*50,W-400-(k%2)*180,22); }
        pg.maj(); return; }
      const Y=[180,400,640], N=[2,4,8], TJ=[t.j1,t.j2,t.j3], TN=[t.n1,t.n2,t.n3];
      N.forEach((n,k)=>{ ec(c,T,TJ[k],'Jour '+(k+1)+' :',230,Y[k],60,J.encre,{max:1.05}); ec(c,T,TN[k],String(n),420,Y[k],84,J.orange); if(T>=TN[k]) coeurs(c,n,560,Y[k],95,34,Zj(T,TN[k]),8); });
      ec(c,T,t.lina2,'Lina',620,Y[1]-90,40,J.bleu); ec(c,T,t.sam2,'Sam',810,Y[1]-90,40,J.bleu);
      if(T>=t.dbl) ec(c,T,t.dbl,'× 2 chaque jour',W-260,Y[2]+150,56,J.vert);
      pg.maj(); return; }
    /* 01 : le journal */
    if(entre('01-journal','02-une')){
      ec(c,T,t.jour,'Le Journal d’EleveAI',W/2,130,110,J.encre,{serif:true}); if(T>=t.jour){ c.fillStyle=J.encre; c.fillRect(100,210,W-200,7); c.fillRect(100,226,W-200,3); }
      ec(c,T,t.compr,'Comprendre le monde,',W/2-8,300,62,J.gris,{serif:true,align:'right',max:1.05}); ec(c,T,t.chg,'et le changer',W/2+8,300,62,J.vert,{serif:true,align:'left',max:1.05});
      [[t.esp,'Espace',J.bleu],[t.san,'Santé','#e03131'],[t.arg,'Argent','#f08c00'],[t.spo,'Sport','#7048e8'],[t.pla,'Planète',J.vert]].forEach(([tt,s,col],k)=>pastille(c,T,tt,s,210+k*280,470,46,col));
      ec(c,T,t.mat,'+ les maths qui les expliquent',W/2,650,66,J.rouge,{serif:true});
      pg.maj(); return; }
    /* 00 : le bus, la récré */
    if(T>=t.bus){ cadre(c,60,60,W/2-90,520,{fond:'#fff9db',trait:J.encre,ep:5}); ec(c,T,t.bus,'Dans le bus',W/4+15,115,50,J.encre,{serif:true}); bus(c,W/4+15,300,1.05);
      ec(c,T,t.lina,'Lina',W/4-160,470,48,J.bleu); if(T>=t.cray) crayons(c,W/4+90,480,.9); if(T>=t.ram) coeur(c,W/4+260,170,42,J.rose,Zj(T,t.ram)); }
    if(T>=t.recre){ cadre(c,W/2+30,60,W/2-90,520,{fond:'#e7f5ff',trait:J.encre,ep:5}); ec(c,T,t.recre,'À la récré',W*3/4-15,115,50,J.encre,{serif:true});
      ec(c,T,t.sam,'Sam',W*3/4-200,470,48,J.bleu); if(T>=t.gou) gouter(c,W*3/4+40,320,1.1,T>=t.moi); if(T>=t.moi) coeur(c,W-150,170,42,J.rose,Zj(T,t.moi)); }
    if(T>=t.deux){ ec(c,T,t.deux,'2 bonnes actions',W/2-180,720,70,J.rose); }
    if(T>=t.monde){ terre(c,W/2+400,720,90,Zj(T,t.monde)); ec(c,T,t.monde,'?',W/2+540,690,110,J.orange); }
    pg.maj();
  }

  /* La miniature : Ti Margo, le journal, la question */
  window.tiMargoMiniature=()=>{ window.MINI=true; window.tiMargo.aller(t.titreU+2);
    legende.style.display='none'; $('titre').style.display='none'; $('fin').style.display='none';
    const m=document.createElement('div'); m.className='cv'; m.innerHTML='Le Journal d’EleveAI<div style="color:#e8590c;font-size:96px;margin-top:6px">COMPRENDRE LE MONDE</div>';
    m.style.cssText='left:820px;right:40px;top:60px;z-index:6;font-size:84px;line-height:1.05;text-align:center;background:#fff;border:7px solid #17452a;border-radius:36px;padding:20px;'; document.body.append(m);
    const d=document.createElement('div'); d.className='cv'; d.textContent='Dessin animé'; d.style.cssText='left:660px;right:660px;bottom:36px;text-align:center;font-size:60px;background:#17452a;color:#fff;border-radius:999px;padding:12px 0;z-index:6;'; document.body.append(d); };

  const cuts=[finTitre,...ORDRE.slice(1).map(k=>A[k])];
  return { clips,FIN,titre:'Le Journal d’EleveAI',ceinture:1,finTitre,groupes,finClip:'17-abonne',cuts,
    /* Les trois questions sont dessinées sur la page : la carte du cadre reste cachée */
    question:{qc:'17-abonne',rc:'17-abonne',finR:A['17-abonne'],cpt:1e9,bonne:0,tBon:0,phrase:[],pause:[],choix:[['',0,0],['',0,0],['',0,0]],tete:[],reponse:[],suite:[]},
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const gros=T<finTitre, dansF=T>=A['17-abonne'];
      pg.g.visible=!gros&&!dansF;
      scene.x=-2.95; scene.ry=.22; cam.x=0; cam.y=2.3; cam.d=7.1; cam.e=.02;
      if(gros){ scene.x=0; scene.ry=-.12; cam.x=0; cam.y=2.75; cam.d=8.6; }
      if(dansF){ scene.x=-3.6; scene.ry=.25; }
      /* les sous-titres : jamais pendant les questions */
      const dansQ=QUESTIONS.some((k,i)=>i%2===0&&T>=A[k]&&T<A[ORDRE[ORDRE.indexOf(QUESTIONS[i+1])+1]]);
      if(dansQ) legende.style.visibility='hidden'; else legende.style.visibility='';
      /* l'écran de fin, au fil des mots */
      for(const [id,tt] of Object.entries(tFin)) $(id).style.visibility=T>=tt?'':'hidden';

      const en=(a,b)=>T>=A[a]&&T<A[b];
      if(T<A[S]+1.6) g.salut(T-A[S],1.6);
      else if(en(S,'01-journal')){ T>=t.monde?g.reflechit():(T>=t.deux?g.fier():g.ouvre()); }
      else if(en('01-journal','02-une')) T>=t.mat?g.fier():g.montre();
      else if(en('02-une','03q-question')) T>=t.dbl?g.fier():g.montre();
      else if(en('03q-question','03r-reponse')) g.reflechit();
      else if(en('03r-reponse','04-semaine')) T<q1.tBon+.5?g.ouvre():g.pouce();
      else if(en('04-semaine','05-maths')) T>=t.att?g.fier():g.oups();
      else if(en('05-maths','06q-question')) T>=t.mil?g.oups():g.montre();
      else if(en('06q-question','06r-reponse')) g.reflechit();
      else if(en('06r-reponse','07-total')) T<q2.tBon+.5?g.ouvre():g.pouce();
      else if(en('07-total','08q-question')) T>=t.d1?g.oups():g.montre();
      else if(en('08q-question','08r-reponse')) g.reflechit();
      else if(en('08r-reponse','09-vraie-vie')) T<q3.tBon+.5?g.ouvre():g.fier();
      else if(en('09-vraie-vie','10-metier')) T<t.sem?g.oups():g.montre();
      else if(en('10-metier','11-agir')) g.montre();
      else if(en('11-agir','12-chiffres')) T>=t.fais?g.ouvre():g.montre();
      else if(en('12-chiffres','13-nouvelles')) g.montre();
      else if(en('13-nouvelles','14-mission')) g.montre();
      else if(en('14-mission','15-appris')) g.montre();
      else if(en('15-appris','16-rendez-vous')) T>=t.agir?g.pouce():g.montre();
      else if(en('16-rendez-vous','17-abonne')) T>=t.cli?g.montre():g.ouvre();
      else { T-A['17-abonne']<2.5?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=-4.6; scene.ry=.12; cam.x=0; cam.y=2.4; cam.d=9.2; P.jaw=.62; g.fier(); }
    } };
};
