/* ============================================================
   ÉPISODE 01 : L'ASCENSEUR FOU. −3 + 7 = 4, puis 4 − 5, −1 − 4, −5 + 5 = 0.
   La coupe d'un immeuble : la cage d'ascenseur EST la droite graduée, verticale.
   ============================================================ */
FILMS.addition=function({el,$,mots,jetons,panneau,carte,legende,fin,lisse}){
  /* ---- Les clips : tout le reste en découle ---- */
  const acc=.4,sit=11.3,q=18.4,r=32.0,tra=36.65,fou=47.25,sau=59.55,c=67.9,f=79.1,FIN=85.95;
  const clips=[['00-accroche',acc],['01-situation',sit],['01q-question',q],['01r-reponse',r],['02-trajet',tra],['03-fou',fou],['04-sauve',sau],['05-question',c],['06-abonne',f]];

  /* ---- Les légendes : chaque mot écrit à l'instant exact où il est dit ---- */
  const N=' ';
  const G=(base,de,fin,top,phr,fs)=>({de:base+de,a:fin,top,fs,phrases:phr.map(([t,l])=>[base+l[0],base+l[l.length-1],t,l.map(x=>base+x)])});
  const groupes=[
    G(acc,.1,acc+3.7,410,[['Salut'+N+'!',[.1]],['Moi, c’est Ti Margo.',[1.46,2.0,2.23,2.41]]]),
    G(acc,3.75,acc+6.8,60,[['Cet ascenseur est complètement fou.',[3.8,4.13,4.82,4.93,5.66]]]),
    G(acc,6.82,sit-.05,60,[['Tu paries que tu ne devines pas où il va me déposer'+N+'?',[6.88,7.06,7.43,7.62,7.79,7.94,8.36,8.57,8.7,8.84,9.01,9.17]]]),
    G(sit,.1,sit+3.55,60,[['Je suis au parking,',[.1,.32,.64,.81]],['au niveau −3.',[1.64,1.75,2.1]]]),
    G(sit,3.58,q-.05,60,[['J’appuie sur le bouton'+N+':',[3.6,4.09,4.32,4.47]],['+7.',[5.12]]]),
    G(tra,.1,tra+4.05,60,[['3 étages pour arriver à zéro,',[.1,.4,.88,1.12,1.56,1.65]],['le rez-de-chaussée.',[2.27,2.47]]]),
    G(tra,4.07,tra+7.25,60,[['Encore 4 étages'+N+':',[4.1,4.52,4.83]],['niveau 4.',[5.52,5.91]]]),
    G(tra,7.27,fou-.05,60,[['−3 + 7 = 4.',[7.29,7.91,8.25,8.58,8.92]]]),
    G(fou,.1,fou+2.55,60,[['Mais l’ascenseur s’emballe'+N+'!',[.1,.32,1.03]]]),
    G(fou,2.57,fou+5.92,60,[['−5'+N+':',[2.58]],['je tombe au niveau −1.',[3.61,3.82,4.09,4.18,4.53]]]),
    G(fou,5.93,fou+9.28,60,[['Encore −4'+N+':',[5.95,6.35]],['niveau −5.',[7.29,7.66]]]),
    G(fou,9.3,sau-.05,60,[['Au secours, c’est la cave'+N+'!',[9.32,9.46,10.31,10.53,10.69]]]),
    G(sau,.1,sau+2.65,60,[['+5'+N+':',[.1]],['zéro pile'+N+'!',[1.09,1.41]]]),
    G(sau,2.67,sau+4.58,60,[['Je saute dehors.',[2.69,2.91,3.19]]]),
    G(sau,4.6,c-.05,60,[['−5 + 5, ça fait zéro.',[4.61,5.27,5.6,6.29,6.52,6.73]]]),
    G(c,.1,f-.05,60,[['À toi'+N+':',[.1,.21]],['je pars du niveau 2.',[.7,.91,1.17,1.31,1.66]],['−5, +9, −7.',[2.81,3.84,4.81]],['À quel niveau j’arrive'+N+'?',[6.49,6.59,6.82,7.19]],['Réponds en commentaire'+N+'!',[8.65,9.1,9.23]]],56)
  ];

  /* ---- La formule du panneau ---- */
  const NEG=s=>`<span class="neg">${s}</span>`, POS=s=>`<span class="pos">${s}</span>`, OK=s=>`<span class="ok">${s}</span>`;
  const FORMULES=[
    [sit,[[sit+2.1,NEG('−')],[sit+2.37,NEG('3')+' '],[sit+5.12,POS('+')+' '],[sit+5.47,POS('7')+' '],[q+1.63,'= ?']]],
    [tra,[[tra,NEG('−3')+' '],[tra+.1,POS('+ 3')+' '],[tra+1.56,'= '],[tra+1.65,OK('0')]]],
    [tra+4.07,[[tra+4.07,'0 '],[tra+4.1,POS('+')+' '],[tra+4.52,POS('4')+' '],[tra+5.52,'= '],[tra+5.91,OK('4')]]],
    [tra+7.27,[[tra+7.29,NEG('−')],[tra+7.62,NEG('3')+' '],[tra+7.91,POS('+')+' '],[tra+8.25,POS('7')+' '],[tra+8.58,'= '],[tra+8.92,OK('4')]]],
    [fou,[]],
    [fou+2.57,[[fou+2.58,POS('4')+' '],[fou+2.58,NEG('−')+' '],[fou+2.91,NEG('5')+' '],[fou+4.18,'= '],[fou+4.53,OK('−')],[fou+4.79,OK('1')]]],
    [fou+5.93,[[fou+5.95,NEG('−1')+' '],[fou+6.35,NEG('−')+' '],[fou+6.63,NEG('4')+' '],[fou+7.29,'= '],[fou+7.66,OK('−')],[fou+7.92,OK('5')]]],
    [sau,[[sau+.1,NEG('−5')+' '],[sau+.1,POS('+')+' '],[sau+.38,POS('5')+' '],[sau+1.09,'= '],[sau+1.2,OK('0')]]],
    [sau+4.6,[[sau+4.61,NEG('−')],[sau+4.93,NEG('5')+' '],[sau+5.27,POS('+')+' '],[sau+5.6,POS('5')+' '],[sau+6.52,'= '],[sau+6.73,OK('0')]]],
    [c,[[c+1.66,POS('2')+' '],[c+2.81,NEG('−')+' '],[c+3.14,NEG('5')+' '],[c+3.84,POS('+')+' '],[c+4.22,POS('9')+' '],[c+4.81,NEG('−')+' '],[c+5.12,NEG('7')+' '],[c+7.19,'= ?']]]
  ];

  const css=document.createElement('style');
  css.textContent=`#panneau{top:auto!important;bottom:120px!important;}
    .choix.bon{transform:scale(1.05)!important;}
    #ligneP{display:flex;align-items:center;gap:20px;}
    #ecranN{flex:none;width:256px;background:#10202b;border-radius:26px;border:6px solid #39424e;color:#ffe066;text-align:center;padding:2px 0 8px;}
    #ecranN small{display:block;font-size:30px;letter-spacing:3px;color:#cfd8dc;line-height:1.25;}
    #valN{display:block;font-size:92px;line-height:1;font-variant-numeric:tabular-nums;min-height:92px;}
    #formule{flex:1;margin-top:0!important;font-size:74px!important;min-height:0!important;}`;
  document.head.append(css);
  panneau.innerHTML=`<div id="ligneP"><div id="ecranN"><small>NIVEAU</small><span id="valN"></span></div><div id="formule"></div></div>`;
  document.body.style.background='linear-gradient(#7cc8f5 0%,#c9ecff 100%)';

  /* ---- Le décor ---- */
  const H=2.2, XG=-6.2, XD=4.6, ZF=1.05, ZB=-1.2, YN=n=>n*H+H/2;
  const bm=c=>new THREE.MeshBasicMaterial({color:c});
  const boite=(w,h,d,c,x,y,z,p=scene3d)=>{ const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),bm(c)); m.position.set(x,y,z); p.add(m); return m; };
  const cyl=(rh,rb,h,c,x,y,z,p=scene3d)=>{ const m=new THREE.Mesh(new THREE.CylinderGeometry(rh,rb,h,24),bm(c)); m.position.set(x,y,z); p.add(m); return m; };
  const boule=(R,c,x,y,z,p=scene3d)=>{ const m=new THREE.Mesh(new THREE.SphereGeometry(R,20,14),bm(c)); m.position.set(x,y,z); p.add(m); return m; };
  const plaque=(txt,{w=1.5,h=1.15,fond='#fffdf5',coul='#17452a',bord='#17452a',fs=.72,rond=false}={},x=0,y=0,z=0,p=scene3d)=>{
    const K=256, cv=document.createElement('canvas'); cv.width=Math.round(w*K); cv.height=Math.round(h*K); const g=cv.getContext('2d');
    const R=rond?cv.height/2:cv.height*.16;
    g.beginPath(); g.roundRect(8,8,cv.width-16,cv.height-16,R); g.fillStyle=fond; g.fill(); g.lineWidth=16; g.strokeStyle=bord; g.stroke();
    g.fillStyle=coul; g.textAlign='center'; g.textBaseline='middle'; g.font=`800 ${cv.height*fs}px "Segoe UI"`; g.fillText(txt,cv.width/2,cv.height*.54);
    const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace; tx.anisotropy=8;
    const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tx,transparent:true})); m.position.set(x,y,z); p.add(m); return m; };
  const signe=n=>(n<0?'−':(n>0?'+':''))+Math.abs(n), teinte=n=>n<0?'#d9480f':(n>0?'#1971c2':'#17452a');

  /* La terre et l'herbe, autour de l'immeuble */
  boite(400,120,1,0x8a5a33,0,-60,-1.8);
  boite(400,H*1.5,1,0x7a4d2b,0,-1.5*H,-1.75); boite(400,H*2,1,0x5e3b22,0,-4*H,-1.7); boite(400,60,1,0x2f2030,0,-5.5*H-30,-1.65);
  for(const s of [[XD+.0+60,120],[XG-60,120]]){ boite(s[1],.25,3.6,0x5cb531,s[0],-.125,.25); boite(s[1],H*5.6,.2,0x7a4d2b,s[0],-2.8*H-.25,2.0); }
  for(const [x,y,R,k] of [[6.4,-1.2,.35,0x9a6a40],[8.2,-3.2,.5,0x6e4628],[-7.4,-2.1,.45,0x9a6a40],[-9,-4.2,.6,0x5a3a22],[6.9,-7,.55,0x5a3a22],[-7.1,-8.6,.5,0x46303a],[6.2,-10.4,.6,0x46303a]]) boule(R,k,x,y,2.05);
  /* Le trottoir */
  boite(60,.05,3.3,0xcfd4da,XD+30,.02,.3);
  /* L'arbre et les buissons de la rue */
  cyl(.16,.22,1.9,0x8b5a2b,7.3,.95,-.7); boule(1.05,0x3fa535,7.3,2.55,-.7); boule(.72,0x56c041,6.65,2.05,-.4); boule(.7,0x56c041,8,2.15,-.4);
  boule(.42,0x56c041,5.55,.25,-1); boule(.32,0x3fa535,6.1,.2,-1);
  boule(.35,0xff6b6b,5.5,.62,-1.05).scale.set(.3,.3,.3); boule(.35,0xffd43b,5.8,.45,-.9).scale.set(.3,.3,.3);
  /* Les nuages et le soleil */
  const nuages=[[-13,10],[9,12],[-9,5.4],[12,6.5]].map(([x,y])=>{ const g=new THREE.Group(); g.position.set(x,y,-4); scene3d.add(g); for(const [a,b,R] of [[0,0,1],[1,.1,.75],[-1,.05,.7]]) boule(R,0xffffff,a,b,0,g); return g; });
  boule(1.5,0xffd43b,-11,14,-5);

  /* Les pièces, de −5 à +6 */
  const MUR={'6':0xffc9c9,'5':0xa5d8ff,'4':0xffec99,'3':0xb2f2bb,'2':0xd0bfff,'1':0xffd8a8,'0':0xfff3bf,'-1':0xb8c2cc,'-2':0xa3afbb,'-3':0x92a0ae,'-4':0x5c6480,'-5':0x2a2040};
  for(let n=-5;n<=6;n++){
    const y=n*H;
    boite(XD-1.6,H,.1,MUR[n],(XD+1.6)/2,y+H/2,ZB); boite(-1.6-XG,H,.1,MUR[n],(XG-1.6)/2,y+H/2,ZB);
    /* Le sol de chaque niveau : sa tranche se voit bien */
    boite(XD-1.6,.16,ZF-ZB,n<0?0x4a5568:0xf8f9fa,(XD+1.6)/2,y-.08,(ZF+ZB)/2); boite(-1.6-XG,.16,ZF-ZB,n<0?0x4a5568:0xf8f9fa,(XG-1.6)/2,y-.08,(ZF+ZB)/2);
    /* La cloison de la cage, sauf aux deux portes (parking −3 et rez-de-chaussée) */
    boite(.1,H,ZF-ZB,n<0?0x39424e:0xced4da,-1.62,y+H/2,(ZF+ZB)/2);
    if(n!==-3&&n!==0) boite(.1,H,ZF-ZB,n<0?0x39424e:0xced4da,1.62,y+H/2,(ZF+ZB)/2);
    /* Le mur du bout */
    if(n!==0){ boite(.14,H,ZF-ZB,n<0?0x39424e:0xe9d8a6,XD,y+H/2,(ZF+ZB)/2); }
    boite(.14,H,ZF-ZB,n<0?0x39424e:0xe9d8a6,XG,y+H/2,(ZF+ZB)/2);
    /* Le niveau, peint en grand sur le mur du fond */
    if(n!==0){ plaque(signe(n),{w:1.0,h:.68,fond:'#ffffff',coul:teinte(n),bord:teinte(n)},3.3,y+1.62,-.3); for(const dx of [-.3,.3]) boite(.03,.22,.03,0x39424e,3.3+dx,y+2.04,-.31); }
  }
  boite(XD-XG+.3,.2,ZF-ZB,0xe03131,(XD+XG)/2,7*H+.1,(ZF+ZB)/2); boite(XD-XG+.3,.12,ZF-ZB,0x39424e,(XD+XG)/2,-5*H-.14,(ZF+ZB)/2);
  /* Le fond de la cage et ses rails */
  boite(3.2,12*H,.1,0x2d3a4b,0,H,ZB+.02);
  for(const x of [-1.15,1.15]) boite(.1,12*H,.08,0x8795a4,x,H,ZB+.1);
  /* La machine, sur le toit */
  boite(2,1,1.6,0x868e96,0,7*H+.7,0);
  const roue=cyl(.62,.62,.18,0xf5a50a,0,7*H+1.75,.55); roue.rotation.x=Math.PI/2;
  const rayon=boite(1.1,.1,.06,0x39424e,0,7*H+1.75,.68);
  cyl(.03,.03,1.7,0x39424e,-3.4,7*H+.95,0); boule(.1,0xe03131,-3.4,7*H+1.85,0);

  /* La droite graduée : un trait épais le long de la cage, une plaque par niveau */
  boite(.12,12*H+.3,.04,0x17452a,-1.78,H+.05,ZF+.04);
  const fl=new THREE.Mesh(new THREE.ConeGeometry(.22,.42,18),bm(0x17452a)); fl.position.set(-1.78,7*H+.3,ZF+.04); scene3d.add(fl);
  const PLAQUES={};
  for(let n=-5;n<=6;n++){ boite(.34,.1,.04,0x17452a,-1.92,YN(n),ZF+.04); PLAQUES[n]=plaque(signe(n),{w:1.5,h:1.2,coul:teinte(n),bord:n===0?'#17452a':teinte(n)},-2.9,YN(n),ZF+.08); }

  /* Le mobilier : une voiture par place de parking, un meuble par étage */
  const voiture=(x,y,k,k2)=>{ boite(2.1,.42,.95,k,x,y+.42,-.45); boite(1.2,.4,.86,k2,x-.08,y+.82,-.45);
    boite(.42,.3,.88,0xbde0fe,x-.38,y+.82,-.44); boite(.42,.3,.88,0xbde0fe,x+.24,y+.82,-.44);
    for(const dx of [-.66,.66]){ const w=cyl(.21,.21,1,0x17202b,x+dx,y+.22,-.45); w.rotation.x=Math.PI/2; const j=cyl(.09,.09,1.02,0xced4da,x+dx,y+.22,-.45); j.rotation.x=Math.PI/2; } };
  voiture(3.15,-3*H,0xe03131,0xc92a2a); voiture(3.15,-2*H,0x1c7ed6,0x1864ab); voiture(3.15,-1*H,0xfcc419,0xf59f00);
  for(const n of [-1,-2,-3]){ boite(.08,.02,1.5,0xfff3bf,2.0,n*H+.01,.1); boite(.08,.02,1.5,0xfff3bf,4.42,n*H+.01,.1); plaque('P',{w:.72,h:.72,fond:'#1971c2',coul:'#fff',bord:'#fff',fs:.8},-5.55,n*H+1.3,ZB+.07); }
  /* −4 : la chaudière */
  cyl(.55,.55,1.5,0xf76707,3.1,-4*H+.8,-.5); boite(.3,.3,.1,0xffe066,3.1,-4*H+.8,.05);
  for(const y of [.4,1.15,1.9]) { const t=cyl(.07,.07,2.6,0xadb5bd,-4.9,-4*H+y+.1,-.9); t.rotation.z=Math.PI/2; }
  cyl(.07,.07,1.1,0xadb5bd,2.2,-4*H+1.5,-.5); { const t=cyl(.07,.07,.9,0xadb5bd,2.65,-4*H+1.95,-.5); t.rotation.z=Math.PI/2; }
  /* −5 : la cave, tonneaux, toile d'araignée, yeux dans le noir */
  for(const [x,z] of [[2.5,-.6],[3.5,-.7]]) { cyl(.42,.42,.95,0x8b5a2b,x,-5*H+.48,z); for(const dy of [.25,.72]) cyl(.44,.44,.07,0x39424e,x,-5*H+dy,z); }
  cyl(.42,.42,.95,0x8b5a2b,3,-5*H+1.42,-.65);
  for(const a of [0,.5,1,1.5]){ const l=boite(1.25,.02,.02,0xced4da,4.5-.62*Math.cos(a),-4*H-.3-.62*Math.sin(a),ZB+.1); l.rotation.z=a; }
  for(const k of [.35,.7]){ const anneau=new THREE.Mesh(new THREE.RingGeometry(1.25*k-.012,1.25*k+.012,20,1,Math.PI,Math.PI/2),bm(0xced4da)); anneau.position.set(4.5,-4*H-.3,ZB+.1); scene3d.add(anneau); }
  const yeuxCave=[[-4.6,-5*H+1.35],[-5.3,-5*H+.7]].flatMap(([x,y])=>[-.1,.1].map(d=>boule(.07,0xffe066,x+d,y,ZB+.1)));
  const chauve=new THREE.Group(); scene3d.add(chauve); boule(.15,0x111016,0,0,0,chauve);
  const aileG=boite(.42,.04,.22,0x111016,-.26,0,0,chauve), aileD=boite(.42,.04,.22,0x111016,.26,0,0,chauve);
  for(const s of [-1,1]) boule(.03,0xffe066,s*.06,.04,.14,chauve);
  /* +1 : le bureau */
  boite(1.5,.08,.7,0xb5794a,3,H+.72,-.4); for(const x of [2.35,3.65]) boite(.08,.7,.6,0x8b5a2b,x,H+.35,-.4); boite(.62,.42,.05,0x17202b,3,H+1.02,-.55);
  /* +2 : la salle de classe */
  boite(2,1,.05,0x1f6b43,3.05,2*H+1.05,ZB+.08); boite(1.2,.06,.55,0xd9a066,2.8,2*H+.56,-.2); for(const x of [2.3,3.3]) boite(.06,.56,.5,0x8b5a2b,x,2*H+.28,-.2);
  /* +3 : la bibliothèque */
  boite(2,1.7,.3,0x8b5a2b,3.05,3*H+.85,-.95);
  for(let i=0;i<14;i++){ const k=[0xe03131,0xfcc419,0x1c7ed6,0x37b24d,0xf76707][i%5]; boite(.1,.4,.05,k,2.2+i*.125,3*H+(i%2?.42:1.12),-.78); }
  /* +4 : le salon */
  boite(1.7,.48,.65,0x37b24d,3,4*H+.28,-.55); boite(1.7,.5,.18,0x2b8a3e,3,4*H+.7,-.8); boite(.2,.3,.65,0x2b8a3e,2.2,4*H+.55,-.55); boite(.2,.3,.65,0x2b8a3e,3.8,4*H+.55,-.55);
  /* +5 : la chambre */
  boite(1.9,.3,.95,0xf8f9fa,3,5*H+.34,-.35); boite(1.25,.32,.97,0xe03131,3.32,5*H+.36,-.35); boite(.45,.18,.7,0xffe066,2.35,5*H+.56,-.35);
  /* +6 : les plantes du dernier étage */
  for(const x of [2.3,3,3.7]){ cyl(.2,.15,.36,0xd9480f,x,6*H+.2,-.6); boule(.3,0x37b24d,x,6*H+.62,-.6); }
  /* Rez-de-chaussée : le paillasson, le comptoir à gauche, le grand auvent de la porte */
  boite(1.5,.03,.9,0xc92a2a,3.1,.02,.3); boite(1.7,.85,.6,0xd9a066,-5,.43,-.5); boite(.7,.03,.5,0xffffff,-5,.87,-.5);
  boite(.14,.22,ZF-ZB,0xe9d8a6,XD,H-.11,(ZF+ZB)/2);
  for(let i=0;i<7;i++) boite(.26,.1,2.6,i%2?0xffffff:0xe03131,XD+.15+i*.26,H+.12-i*.035,0);
  /* Fenêtres, à gauche, dans les étages */
  for(let n=1;n<=6;n++){ boite(1.05,1,.04,0xffffff,-4.95,n*H+1.2,ZB+.07); boite(.92,.87,.05,0x9ad8ff,-4.95,n*H+1.2,ZB+.08); boite(.04,.87,.06,0xffffff,-4.95,n*H+1.2,ZB+.09); }

  /* ---- La cabine, ouverte vers nous ---- */
  const cabine=new THREE.Group(); scene3d.add(cabine);
  const CF=boite(2.9,2.1,.06,0xfff3bf,0,1.05,-.95,cabine);
  boite(2.96,.1,2,0x1971c2,0,-.05,0,cabine); boite(2.96,.14,2,0x1971c2,0,H-.08,0,cabine);
  boite(.08,2.1,2,0x1971c2,-1.46,1.05,0,cabine);
  const porte=new THREE.Group(); porte.position.set(1.46,H-.12,0); cabine.add(porte); boite(.08,2.04,2,0x74c0fc,0,-1.02,0,porte);
  for(const x of [-1.46,1.46]) boite(.1,2.2,.08,0x1864ab,x,1.05,1,cabine);
  /* Les trois boutons du mur du fond : le « +7 » est le gros */
  const bouton=(t,fond)=>plaque(t,{w:.66,h:.66,fond,coul:'#fff',bord:'#17452a',fs:.5,rond:true},.95,1.32,-.86,cabine);
  const bVide=bouton('','#868e96'), bPlus=bouton('+','#868e96'), b7=bouton('+7','#868e96'), b7Lum=bouton('+7','#1971c2');
  const socle=boite(.86,.86,.04,0xadb5bd,.95,1.32,-.92,cabine);
  /* Le repère vert, sur le flanc gauche de la cabine, qui pointe la droite graduée */
  const rep=new THREE.Mesh(new THREE.ConeGeometry(.2,.42,18),bm(0x2f9a3a)); rep.rotation.z=Math.PI/2; rep.position.set(-1.62+.1,H/2,ZF+.06); cabine.add(rep);
  /* Le gyrophare de l'alarme */
  const gyro=boule(.2,0x868e96,0,H+.14,.3,cabine); boite(.3,.06,.3,0x39424e,0,H+.02,.3,cabine);
  /* Le câble */
  const cable=cyl(.035,.035,1,0x17202b,0,0,.3);

  /* Les flèches du trajet, à gauche des plaques : leur longueur suit la cabine */
  const XF=-4.0, flechesM=[];
  const fleche=(de,k,txt,xPl=-5.02)=>{ const g=new THREE.Group(); scene3d.add(g); const coul=k<0?0xe8590c:0x1c7ed6;
    const barre=boite(.2,1,.04,coul,XF,0,ZF+.1,g), pte=new THREE.Mesh(new THREE.ConeGeometry(.28,.42,16),bm(coul)); pte.position.z=ZF+.1; g.add(pte);
    const pl=plaque(txt,{w:1.24,h:.95,fond:k<0?'#fff4e6':'#e7f5ff',coul:k<0?'#d9480f':'#1971c2',bord:k<0?'#d9480f':'#1971c2',fs:.7},xPl,0,ZF+.12,g);
    return {g,barre,pte,pl,de,k}; };
  /* [début du trajet, instant d'apparition du nombre, fin d'affichage] */
  const FL=[ {o:fleche(-3,1,'+3'),a:tra+.1,fin:fou,dep:-3,arr:0},{o:fleche(0,1,'+4'),a:tra+4.52,fin:fou,dep:0,arr:4},
    {o:fleche(4,-1,'−5'),a:fou+2.91,fin:sau,dep:4,arr:-1},{o:fleche(-1,-1,'−4'),a:fou+6.63,fin:sau,dep:-1,arr:-5},
    {o:fleche(-5,1,'+5'),a:sau+.38,fin:sau+4.6,dep:-5,arr:0} ];

  /* ---- Le trajet : [début, fin, de, à, façon] ---- */
  const FACON={ doux:u=>lisse(u), chute:u=>u*u, fuse:u=>1-(1-u)*(1-u) };
  const TRAJ=[[tra+.1,tra+1.95,-3,0,'doux'],[tra+4.1,tra+5.95,0,4,'doux'],[fou+2.91,fou+4.82,4,-1,'chute'],[fou+6.63,fou+7.92,-1,-5,'chute'],[sau+.38,sau+1.25,-5,0,'fuse']];
  const niveau=T=>{ let n=-3; for(const [a,b,de,ar,k] of TRAJ){ if(T>=b) n=ar; else if(T>=a) n=de+(ar-de)*FACON[k]((T-a)/(b-a)); } return n; };
  /* Un petit bip à chaque étage franchi, plus aigu en haut */
  const TICS=[]; for(const [a,b,de,ar,k] of TRAJ){ let av=de; for(let i=1;i<=200;i++){ const t=a+(b-a)*i/200, v=de+(ar-de)*FACON[k](i/200);
      const s=Math.sign(ar-de); if(Math.floor(s*v+1e-6)>Math.floor(s*av+1e-6)) TICS.push({t,f:Math.round(560*Math.pow(2,(v+5)/11))}); av=v; } }
  for(let i=0;i<3;i++) TICS.push({t:q+10.4+i,f:760});

  const ouvert=T=>{ if(T<sit+2.3) return 1; if(T<sit+2.9) return 1-lisse((T-sit-2.3)/.6); if(T<sau+1.6) return 0; if(T<c) return lisse((T-sau-1.6)/.7); if(T<f) return 0; return 1; };

  poserMiniature(arguments[0],sit+6,'−3 + 7<br>je sors où ?<div style="color:#e8590c;font-size:136px;margin-top:10px">TU PARIES ?</div>');

  const film={ clips,FIN,tics:TICS,titre:'L’ascenseur fou',ceinture:1,finTitre:acc+3.7,
    cuts:[acc+3.75,acc+6.82,sit,sit+3.58,q,tra,fou,fou+9.3,sau,sau+2.67,c,f],groupes,finClip:'06-abonne',
    question:{ qc:'01q-question',rc:'01r-reponse',finR:tra,cpt:q+10.4,bonne:1,tBon:.62,
      phrase:[[q+1.63,q+2.49,'À quel niveau je sors'+N+'?',[1.63,1.74,1.97,2.33,2.49].map(x=>q+x)]],
      pause:[[q+8.45,q+9.4,'Mets pause, et choisis'+N+'!',[8.45,8.66,9.29,9.4].map(x=>q+x)]],
      choix:[['<span class="neg">−10</span>',3.89,4.24],['<span class="pos">4</span>',5.82,6.27],['<span class="pos">10</span>',6.62,7.14]],
      tete:[[r+.1,'Réponse '],[r+.62,'B'+N+':']],
      reponse:[[r+1.05,r+1.44,'niveau 4'+N+'!',[1.05,1.44].map(x=>r+x)]],suite:[[r+2.83,r+3.3,'Regarde.']] },

    jouer(P,T,cam){
      const yEcran=v=>860+270*lisse((-v-2)/3);
      const vise=(x,yW,Y,d,e=.04)=>{ cam.x=x; cam.y=yW+(Y-960)/(2637/d); cam.d=d; cam.e=e; };
      scene.taille=.55; racine.rotation.order='YXZ'; racine.rotation.x=0;

      /* La position de la cabine, et ce qu'elle a de fou */
      let n=niveau(T), bosse=0, tremble=0;
      if(T>=acc+3.8&&T<acc+6.8){ const t=T-acc-3.8, e=lisse(t*2)*lisse((3-t)*3); n=-3+e*(1.25+1.25*Math.sin(t*t*1.5+t*3.4-1.57)); }
      if(T>=q&&T<tra) tremble=.012;
      if(T>=fou+.1&&T<fou+2.91){ const t=T-fou-.1; bosse=Math.sin(t*(11+t*5))*(.05+t*.11); tremble=.03; }
      /* Le rebond à l'arrivée */
      for(const [,b,,,k] of TRAJ) if(T>=b&&T<b+.7&&k!=='doux'){ const t=T-b; bosse+=(k==='chute'?.2:-.2)*Math.exp(-t*7)*Math.cos(t*22); }
      if(T>=c&&T<f){ n=2; tremble=.006; }
      if(T>=f) n=0;
      const yC=n*H+bosse+Math.sin(T*63)*tremble;
      cabine.position.y=yC;
      porte.scale.y=Math.max(.02,1-ouvert(T));
      /* Le câble monte jusqu'à la roue, qui tourne avec la cabine */
      const hautC=yC+H, hautM=7*H+1.7; cable.position.y=(hautC+hautM)/2; cable.scale.y=hautM-hautC; roue.rotation.y=n*1.3; rayon.rotation.z=n*1.3;
      /* La plaque du niveau grossit quand la cabine y est */
      for(let v=-5;v<=6;v++){ const z=1+.28*lisse(1-Math.abs(n+bosse/H-v)*1.8); PLAQUES[v].scale.set(z,z,1); }

      /* L'alarme */
      const alarme=T>=fou&&T<sau+1.25;
      gyro.material.color.set(alarme&&Math.sin(T*16)>0?0xff2222:0x868e96);
      const dansCave=T>=fou+7.92&&T<sau+.38;
      CF.material.color.set(alarme?(Math.sin(T*16)>0?(dansCave?0x8a6d6d:0xffa8a8):(dansCave?0x6b6b84:0xfff3bf)):0xfff3bf);
      /* Les boutons : rien d'écrit avant que la voix le dise */
      bVide.visible=T<sit+5.12; bPlus.visible=T>=sit+5.12&&T<sit+5.47; b7.visible=false; b7Lum.visible=T>=sit+5.47;
      bVide.visible=bVide.visible&&!(T>=c); if(T>=c){ b7Lum.visible=false; bVide.visible=true; bPlus.visible=false; }
      /* Le décor vivant */
      nuages.forEach((g,i)=>{ const L=52; g.position.x=((([-13,9,-9,12][i]+18+T*.45*(1+i*.2))%L)+L)%L-26; });
      chauve.position.set(3+Math.sin(T*1.1)*1.1,-5*H+1.75+Math.sin(T*2.3)*.14,.2); chauve.rotation.y=Math.cos(T*1.1)*.5; aileG.rotation.z=-.5*Math.sin(T*22); aileD.rotation.z=.5*Math.sin(T*22);
      yeuxCave.forEach((m,i)=>{ const ouv=Math.sin(T*.9+(i>>1)*2)>-.8; m.scale.y=ouv?1:.1; });

      /* Les flèches du trajet */
      for(const F of FL){ const voir=T>=F.a-.0001&&T<F.fin; F.o.g.visible=voir; if(!voir) continue;
        const niv=Math.abs(F.arr-F.dep)*Math.min(1,Math.abs(n-F.dep)/Math.abs(F.arr-F.dep)), s=Math.sign(F.arr-F.dep), y0=YN(F.dep), y1=y0+s*niv*H;
        const L=Math.max(.02,Math.abs(y1-y0)); F.o.barre.position.y=(y0+y1)/2; F.o.barre.scale.y=L;
        F.o.pte.position.set(XF,y1+s*.14,ZF+.1); F.o.pte.rotation.z=s>0?0:Math.PI; F.o.pl.position.y=(y0+y1)/2; }

      /* ---- Les gestes ---- */
      const ouvre=()=>{ P.gesteD='ouverte'; P.md.set(.86,2.02+Math.sin(T*3)*.06,.5); P.cd.set(.72,1.58,.2); P.tetY=.08+Math.sin(T*1.7)*.07; };
      const montre=()=>{ P.gesteD='index'; P.md.set(1.02,2.72+Math.sin(T*3)*.04,.42); P.cd.set(.86,1.95,.1); P.tetX=-.08; P.regY=.3; };
      const pouce=()=>{ P.md.set(.95,2.32,.45); P.cd.set(.74,1.7,.14); P.gesteD='pouce'; P.tetZ=-.14; P.paupiere=-1.1; };
      const marche=(sensPied,rot)=>{ scene.ry=rot; const j=P.jaw; marcher(T*.766*sensPied,P); P.jaw=j; };
      const auPlafond=(k=0)=>{ P.gesteD='ouverte'; P.md.set(.92,3.58+k,.25); P.cd.set(.98,2.7,.1); P.mg.set(-.92,3.58+k,.25); P.cg.set(-.98,2.7,.1); P.paupiere=-1.25; P.qEnroule=.72; P.qSway=Math.sin(T*9)*.5; };
      const dansCabine=()=>{ scene.x=.05; scene.z=.35; scene.y=yC; scene.ySol=yC; };
      const aLaRue=(x=5.2)=>{ scene.x=x; scene.z=.35; scene.y=0; scene.ySol=0.05; };
      const auParking=x=>{ scene.x=x; scene.z=.35; scene.y=-3*H; scene.ySol=-3*H; };

      /* ---- Les plans ---- */
      if(T<acc+3.75){ /* Le salut, au parking */
        auParking(2.35); vise(2.55,-3*H,1720,6.6);
        if(T<acc+1.4){ const e=lisse((T-acc)*4)*lisse((acc+1.4-T)*4); P.md.set(.88,2.2+.68*e,.28); P.cd.set(.82,1.92,.06); P.gesteD='ouverte'; P.tourneD=Math.sin(T*11)*.42*e; } else ouvre();
      }
      else if(T<acc+6.82){ /* La cabine vide monte et descend toute seule ; il la montre */
        auParking(2.35); vise(-.15,-3*H+H,1040,18.5);
        scene.ry=-.72; P.gesteD='index'; P.md.set(.5,2.3,1.12); P.cd.set(.52,1.9,.42); P.tetY=-.12; P.regY=-.25; P.tetX=-.05;
        const u=T-acc-5.66; if(u>=0&&u<.5){ P.sautY=Math.sin(u/.5*Math.PI)*.28; P.paupiere=-1.25; }
      }
      else if(T<sit){ /* Le pari : la caméra s'approche */
        auParking(2.35); const u=(T-acc-6.82)/(sit-acc-6.82); vise(2.55,-3*H,1500,11-3.6*lisse(u));
        scene.ry=-.14+Math.sin(T*2)*.05; pouce(); P.tetZ=-.14+Math.sin(T*3.1)*.05;
      }
      else if(T<sit+3.58){ /* Il entre dans la cabine */
        const u=lisse((T-sit-.3)/1.65); vise(-.4,-3*H+H/2,860,18);
        if(T<sit+.3){ auParking(2.35); ouvre(); }
        else if(T<sit+1.95){ auParking(2.35+(.05-2.35)*(T-sit-.3)/1.65); marche(1,-1.25); }
        else { dansCabine(); scene.ry=-.2+.1*lisse((T-sit-1.95)*3); T>=sit+1.64&&T<sit+2.8?montre():ouvre(); }
      }
      else if(T<q){ /* Le bouton */
        dansCabine(); vise(.42,yC+H/2-.12,900,8.3+Math.sin((T-sit)*.8)*.15);
        scene.ry=.42; P.tetY=.18; P.regY=.34; P.regX=.05; P.gesteD='index'; P.cd.set(.8,2.18,-.04);
        const app=T>=sit+5.3&&T<sit+6.1?1:0;
        P.md.set(1.12+.08*app,2.42,-.1-.46*app);
        const b=1+.14*Math.exp(-Math.max(0,T-sit-5.47)*5)*(T>=sit+5.47?1:0); b7Lum.scale.set(b,b,1);
      }
      else if(T<r){ /* La question : la cabine tremble, la caméra s'approche */
        dansCabine(); const u=(T-q)/(r-q); vise(-.75,yC+H/2,1230,27-6*lisse(u));
        scene.ry=-.12; P.md.set(.44,2.3,.72); P.cd.set(.78,1.78,.34); P.gesteD='ouverte'; P.tetZ=.15; P.tetX=-.1; P.regX=-.28; P.regY=.35; P.qSway=Math.sin(T*3)*.3;
      }
      else if(T<tra){ dansCabine(); const u=(T-r)/(tra-r); vise(-.75,yC+H/2,1230,21+4*lisse(u)); T<r+2.8?ouvre():montre(); }
      else if(T<fou){ /* Le trajet : la cabine monte et la droite se lit ; plan large pour la formule */
        dansCabine(); const u=lisse((T-tra-6.1)/1.1);
        const dt=24+10.5*u; vise(-1.25,(yC+H/2)*(1-u)+2.2*u,880+45*u,dt);
        scene.ry=-.12;
        if(T<tra+6.1){ P.gesteD='ouverte'; montre(); P.tetX=-.14; P.ty=.08; P.hanche+=Math.sin(T*9)*.012; }
        else if(T<tra+7.3) ouvre(); else pouce();
      }
      else if(T<fou+9.3){ /* Il s'emballe et tombe : il s'accroche au plafond */
        dansCabine(); const chute=T>=fou+2.91&&T<fou+4.82||T>=fou+6.63&&T<fou+7.92;
        if(T<fou+2.5) vise(-.8,yC+H/2,880,16.5+Math.sin(T*2)*.3,.04);
        else vise(-1.25,yC+H/2,yEcran(n),24);
        scene.ry=-.08+Math.sin(T*17)*.06; auPlafond(); P.jaw=Math.max(P.jaw,.55); P.tetX=-.1; P.tetZ=Math.sin(T*13)*.08;
        if(chute){ scene.y=yC+.12; P.pg.y=.34; P.pd.y=.34; P.pg.x=-.48; P.pd.x=.46; P.ecrase=-.03; }
        if(T>=fou+7.92&&T<fou+8.6){ P.ecrase=.32*Math.exp(-(T-fou-7.92)*6); }
        else if(T>=fou+4.82&&T<fou+5.4){ P.ecrase=.24*Math.exp(-(T-fou-4.82)*7); }
      }
      else if(T<sau){ /* La cave : il grelotte */
        dansCabine(); const u=lisse((T-fou-9.3)/2.2); vise(.55,yC+H/2,1130,11.5-.5*u);
        scene.x=.05+Math.sin(T*41)*.022; scene.ry=-.12; P.gesteD='poing'; P.md.set(.38,2.12+Math.sin(T*37)*.03,.72); P.cd.set(.74,1.72,.3); P.mg.set(-.38,2.14-Math.sin(T*37)*.03,.72); P.cg.set(-.74,1.72,.3);
        P.tetZ=Math.sin(T*33)*.05; P.tetX=.06; P.paupiere=-1.25; P.regY=.42; P.jaw=Math.max(P.jaw,.3)+Math.sin(T*47)*.05; P.qEnroule=1.1;
      }
      else if(T<sau+2.67){ /* La fusée jusqu'à zéro pile */
        dansCabine(); const dz=24-6*lisse((T-sau-1.25)/1); vise(-1.25-.1*lisse((T-sau-1.25)/1),yC+H/2,yEcran(n),dz);
        const fuse=T>=sau+.38&&T<sau+1.25;
        if(T<sau+1.25){ scene.ry=-.08; auPlafond(-.1); P.ecrase=fuse?.22:0; P.jaw=Math.max(P.jaw,.55); }
        else { const t=T-sau-1.25; P.sautY=t<.5?Math.sin(t/.5*Math.PI)*.1:0; scene.ry=-.12+1.32*lisse((T-sau-2.1)/.5); T<sau+2.15?montre():ouvre(); }
      }
      else if(T<c){ /* Il plonge dehors, atterrit, danse */
        const u=Math.min(1,Math.max(0,(T-sau-2.91)/1.05)), X=5.1;
        { const z=lisse((T-sau-4.1)/1.2); vise(2.95+1.45*z,0,1480,18.5-7*z); }
        if(T<sau+2.91){ scene.x=.05; scene.z=.35; scene.y=0; scene.ySol=0; scene.ry=1.2; P.hanche-=.2*lisse((T-sau-2.67)/.24); P.tx=.2; P.gesteD='ouverte'; P.md.set(1,1.3,.6); P.mg.set(-1,1.3,.6); }
        else if(T<sau+3.96){ scene.x=.05+(X-.05)*u; scene.z=.35; scene.y=Math.sin(u*Math.PI)*1.05; scene.ySol=0; scene.ry=1.2+.3*u;
          racine.rotation.x=1.25*Math.sin(u*Math.PI); P.gesteD='ouverte'; P.md.set(.55,3.25,.9); P.mg.set(-.55,3.25,.9); P.cd.set(.6,2.6,.4); P.cg.set(-.6,2.6,.4); P.jaw=Math.max(P.jaw,.55); P.pg.z=-.3; P.pd.z=-.3; P.qEnroule=.72; }
        else { aLaRue(X); const t=T-sau-3.96; scene.ry=lisse(t*2.5)*(-.14-1.5)+1.5;
          if(t<.5){ P.ecrase=.26*Math.exp(-t*7); pouce(); }
          else if(T<sau+6.73){ pouce(); P.tetZ=-.14+Math.sin(T*4)*.06; }
          else { const j=P.jaw; ACTIONS.danse.f(T-sau-6.73,P); P.jaw=j; } }
      }
      else if(T<f){ /* À toi : la cabine attend au niveau 2, la caméra recule pour montrer toute la droite */
        dansCabine(); const u=lisse((T-c-5.3)/3.2); vise(-.85,yC+H/2,1040,17+13*u);
        scene.ry=-.12+Math.sin(T*.9)*.06; T<c+1.6?montre():(T<c+8.6?ouvre():pouce());
      }
      else { /* La fin : dans la rue, sous l'écran de fin */
        aLaRue(5.1); vise(5.55,0,1770,8.2+Math.sin((T-f)*.5)*.2); scene.ry=-.14+Math.sin(T*1.4)*.05; T-f<2.35?ouvre():pouce();
      }

      if(window.MINI){ dansCabine(); scene.x=-.05; scene.z=.35; scene.ry=-.1; P.jaw=.62; pouce(); gyro.visible=false; socle.visible=false;
        cabine.position.y=-3*H; scene.y=-3*H; scene.ySol=-3*H; cam.x=.25; cam.d=5.2; cam.y=-3*H+(1700-960)/(2637/5.2); cam.e=.03; panneau.style.display='none'; for(const b of [bVide,bPlus,b7]) b.visible=false; b7Lum.visible=true; b7Lum.position.set(.98,1.55,-.86); b7Lum.scale.set(1,1,1); return; }

      /* ---- Le panneau du bas ---- */
      const voirP=T>=sit&&T<f;
      panneau.style.display=voirP?'block':'none';
      if(voirP){
        const dansC=T>=c, v=Math.round(n), lu=(T<sit+2.1)||(dansC&&T<c+1.66);
        const e=$('valN'); e.textContent=lu?'':signe(v);
        e.style.color=v<0?'#ff922b':(v>0?'#74c0fc':'#8ce99a');
        let lst=[]; for(const [deb,l] of FORMULES) if(T>=deb) lst=l;
        jetons($('formule'),lst,T);
      }
    } };
  return film;
};
