/* Série Triangles 6e, épisode 06 : LE TOUR DE MAGIE. Ti Margo magicien déchire les trois coins :
   une vraie ligne droite, 180°, pour tous les triangles. Scène de théâtre, rideau rouge. */

/* La voix : mêmes règles que voixDe, mais « 180 degrés » peut arriver trois fois pour une seule fois dite */
function voixTri06(A){
  const norme=s=>s.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,''), CL={};
  for(const [k,l] of Object.entries((window.CUES||{})[VIDEO]||{})){ CL[k]=[]; for(const [t,w] of l){ const d=CL[k][CL[k].length-1]; if(!(d&&d[1]===w&&w.includes(' '))) CL[k].push([t,w]); } }
  function dit(clip){ const l=CL[clip]; if(!l) throw new Error('clip sans instants : '+clip); let i=0, prec='', av=null;
    const f=txt=>{ const tm=[]; txt.split(' ').forEach(w=>{ const n=norme(w); if(!n){ tm.push(av); return; }
        const c=i<l.length?norme(l[i][1]):'';
        if(prec.includes(n)&&!(c&&(c.includes(n)||n.includes(c)))){ tm.push(av); return; }
        if(i>=l.length) throw new Error(`${clip} : plus de mots pour « ${txt} »`);
        if(!c.includes(n)&&!n.includes(c)) throw new Error(`${clip} : écrit « ${w} », dit « ${l[i][1]} »`);
        av=A[clip]+l[i][0]; prec=c; tm.push(av); i++; });
      return [tm[0],tm[tm.length-1],txt,tm]; };
    f.saute=n=>{ i+=n; return f; };
    return f; }
  function mot(clip,m,n=1){ const l=CL[clip], c=norme(m); let k=0;
    for(const [t,w] of l) if(w.split(/\s+/).some(x=>norme(x)===c)&&++k===n) return A[clip]+t;
    throw new Error(`${clip} : mot introuvable « ${m} »`); }
  return {dit,mot};
}

/* Un triangle dont les angles sont vrais : angB et angC en degrés, base horizontale */
function triAngles(angB,angC,base,cx,baseY){ const r=Math.PI/180, angA=180-angB-angC, ab=base*Math.sin(angC*r)/Math.sin(angA*r);
  const B=[cx-base/2,baseY], C_=[cx+base/2,baseY]; return [[B[0]+ab*Math.cos(angB*r),baseY-ab*Math.sin(angB*r)],B,C_]; }
/* Le coin d'un polygone : sommet, direction du premier côté, ouverture */
function coin(V,U,W){ let a1=Math.atan2(U[1]-V[1],U[0]-V[0]), a2=Math.atan2(W[1]-V[1],W[0]-V[0]), d=((a2-a1)%(2*Math.PI)+2*Math.PI)%(2*Math.PI);
  if(d>Math.PI){ a1=a2; d=2*Math.PI-d; } return {V,a:a1,d}; }
/* Un coin déchiré : deux bords droits, le troisième en dents de scie */
function dessinerCoin(c,x,y,rot,ech,d,r,coul){ c.save(); c.translate(x,y); c.rotate(rot); c.scale(ech,ech); c.beginPath(); c.moveTo(0,0); c.lineTo(r,0);
  for(let i=1;i<6;i++){ const a=d*i/6, q=r*(i%2?.86:1.0); c.lineTo(q*Math.cos(a),q*Math.sin(a)); }
  c.lineTo(r*Math.cos(d),r*Math.sin(d)); c.closePath(); c.fillStyle=coul; c.fill(); c.strokeStyle='#17452a'; c.lineWidth=4/ech; c.lineJoin='round'; c.stroke(); c.restore(); }
const COINS06=['#e03131','#1971c2','#f5a50a','#2f9a3a'];

function poserTheatre(){
  const cp=document.createElement('canvas'); cp.width=256; cp.height=64; const p=cp.getContext('2d'); p.fillStyle='#8a5a2b'; p.fillRect(0,0,256,64); p.fillStyle='#6f4520'; p.fillRect(0,0,256,5); p.fillStyle='#9a6a36'; p.fillRect(0,5,256,3);
  const tp=new THREE.CanvasTexture(cp); tp.wrapS=tp.wrapT=THREE.RepeatWrapping; tp.repeat.set(30,180); tp.colorSpace=THREE.SRGBColorSpace;
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.MeshBasicMaterial({map:tp})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  const cr=document.createElement('canvas'); cr.width=512; cr.height=64; const q=cr.getContext('2d'); const gr=q.createLinearGradient(0,0,64,0); gr.addColorStop(0,'#7f1420'); gr.addColorStop(.5,'#c92a3a'); gr.addColorStop(1,'#7f1420');
  for(let i=0;i<8;i++){ q.save(); q.translate(i*64,0); q.fillStyle=gr; q.fillRect(0,0,64,64); q.restore(); }
  const tr=new THREE.CanvasTexture(cr); tr.wrapS=THREE.RepeatWrapping; tr.repeat.set(6,1); tr.colorSpace=THREE.SRGBColorSpace;
  const rideau=new THREE.Mesh(new THREE.PlaneGeometry(60,40),new THREE.MeshBasicMaterial({map:tr})); rideau.position.set(0,16,-5); scene3d.add(rideau);
  const frange=new THREE.Mesh(new THREE.PlaneGeometry(60,.28),new THREE.MeshBasicMaterial({color:0xf5c518})); frange.position.set(0,.3,-4.98); scene3d.add(frange);
  const rond=new THREE.Mesh(new THREE.CircleGeometry(2.1,48),new THREE.MeshBasicMaterial({color:0xffe9a8,transparent:true,opacity:.55})); rond.rotation.x=-Math.PI/2; rond.position.set(-.72,0,.2); scene3d.add(rond);
  return {rond};
}
function poserChapeau(){ const h=new THREE.Group(); h.position.set(0,.47,-.05); h.rotation.z=-.1; tete.add(h); const n=toon(0x20242c);
  piece(h,new THREE.CylinderGeometry(.5,.5,.045,28),n,[0,0,0],CONTOUR_SOMBRE);
  piece(h,new THREE.CylinderGeometry(.31,.29,.42,24),n,[0,.22,0],CONTOUR_SOMBRE);
  piece(h,new THREE.CylinderGeometry(.298,.298,.1,24),toon(0xe03131),[0,.07,0],null);
  return h; }

FILMS['somme-angle']=function(outils){
  const {$,panneau,el}=outils;
  const DUR={'00-accroche':11.39,'01-tour':9.99,'02-encore':8.83,'03-question':18.31,'03b-reponse':7.37,'04-commentaire':9.2,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'03-question':3.3,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixTri06(A);
  const [acc,tour,enc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserTheatre(); const tab=poserTableau({L:4.3,H:3,x:0,y:4.55}), chapeau=poserChapeau();
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;} #carte #cq{font-size:46px;} #cq .ligne{margin:2px 0;}'; document.head.append(css);

  /* Les deux triangles : 70°, 50°, 60° puis, tout pointu, 30°, 75°, 75° */
  const T1=triAngles(50,60,600,590,560), R1=135, T2=triAngles(75,75,290,600,590), R2=110;
  const coinsDe=S=>S.map((V,i)=>coin(V,S[(i+1)%3],S[(i+2)%3]));
  const M=[560,420];

  function triangle(c,T,S,R,tTrace,tDech,tCoins,tColle,tLigne,t180,ech){
    const cs=coinsDe(S), u=(T-tTrace)/.7;
    if(T<tTrace) return;
    const coupe=T>=tDech, fad=coupe?1-lisse((T-tColle)/.45):1;
    /* Le corps du triangle : entier avant, coins enlevés ensuite */
    if(fad>0){ c.save(); c.globalAlpha=fad;
      if(!coupe){ if(u>=1){ c.beginPath(); S.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1])); c.closePath(); c.fillStyle='#dbeafe'; c.fill(); }
        trait(c,S[0],S[1],u*3); trait(c,S[1],S[2],u*3-1); trait(c,S[2],S[0],u*3-2); }
      else { c.beginPath(); const pts=[]; cs.forEach(k=>{ pts.push([k.V[0]+R*Math.cos(k.a),k.V[1]+R*Math.sin(k.a)],[k.V[0]+R*Math.cos(k.a+k.d),k.V[1]+R*Math.sin(k.a+k.d)]); });
        /* Le bord restant : on suit le tour du triangle */
        const pol=[]; S.forEach((V,i)=>{ const N=S[(i+1)%3], L=Math.hypot(N[0]-V[0],N[1]-V[1]), ux=(N[0]-V[0])/L, uy=(N[1]-V[1])/L; pol.push([V[0]+ux*R,V[1]+uy*R],[N[0]-ux*R,N[1]-uy*R]); });
        pol.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1])); c.closePath(); c.fillStyle='#dbeafe'; c.fill();
        for(let i=0;i<6;i+=2) trait(c,pol[i],pol[i+1]); }
      c.restore(); }
    if(!coupe) return;
    /* Les trois coins : ils s'écartent, puis se collent pointes ensemble au-dessus de la ligne */
    let cumul=Math.PI; cs.forEach((k,i)=>{ const v=lisse((T-(tColle+i*.28))/.65), bis=k.a+k.d/2+Math.PI*0, ec=46*lisse((T-tDech)/.4);
      const dx=k.V[0]-(S[0][0]+S[1][0]+S[2][0])/3, dy=k.V[1]-(S[0][1]+S[1][1]+S[2][1])/3, n=Math.hypot(dx,dy);
      const x0=k.V[0]+dx/n*ec, y0=k.V[1]+dy/n*ec;
      let cible=cumul; cumul+=k.d;
      let rot=k.a, dr=cible-rot; dr=((dr+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;
      const flot=v>0&&v<1?-Math.sin(v*Math.PI)*40:0;
      dessinerCoin(c,x0+(M[0]-x0)*v,y0+(M[1]-y0)*v+flot,rot+dr*v,1+(ech-1)*v,k.d,R,COINS06[i]); });
    if(T>=tLigne){ const w=lisse((T-tLigne)/.35); c.strokeStyle=COUL.encre; c.lineWidth=14; c.lineCap='round'; c.beginPath(); c.moveTo(M[0]-400*w,M[1]+8); c.lineTo(M[0]+400*w,M[1]+8); c.stroke(); }
    if(T>=t180) texte(c,'180°',M[0],M[1]+128,128*Math.max(1,pop(T,t180,.6)*.6+.4),COUL.ok);
  }

  /* Instants */
  const tT1=mot('00-accroche','triangle'), tAbra=mot('01-tour','Abracadabra');
  const tD1=mot('01-tour','déchire'), tC1=mot('01-tour','coins'), tCo1=mot('01-tour','colle'), tL1=mot('01-tour','ligne'), t1=mot('01-tour','180');
  const tT2=mot('02-encore','triangle'), tD2=mot('02-encore','déchire'), tCo2=mot('02-encore','colle'), t2=mot('02-encore','180');
  const tCoins4=mot('04-commentaire','4'), tCotes4=mot('04-commentaire','4',2), tComb=mot('04-commentaire','Combien');
  const tSans=mot('00-accroche','sans'), tTu=mot('00-accroche','Tu'), tMaths=mot('03b-reponse','maths');
  const QUAD=[[230,130],[850,210],[770,620],[150,540]];

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ const u=lisse((T-com)/.4);
      trait(c,QUAD[0],QUAD[1]); trait(c,QUAD[1],QUAD[2]); trait(c,QUAD[2],QUAD[3]); trait(c,QUAD[3],QUAD[0]);
      c.fillStyle='#dbeafe'; c.beginPath(); QUAD.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1])); c.closePath(); c.fill();
      for(let i=0;i<4;i++) trait(c,QUAD[i],QUAD[(i+1)%4],1,COUL.cote,T>=tCotes4&&T<tComb?16:11);
      if(T>=tCoins4) QUAD.forEach((V,i)=>{ const k=coin(V,QUAD[(i+1)%4],QUAD[(i+3)%4]); dessinerCoin(c,V[0],V[1],k.a,Math.max(1,pop(T,tCoins4+i*.1,.5)*.4+.6),k.d,104,COINS06[i]); });
      if(T>=tComb) texte(c,'?',500,375,190*Math.max(1,pop(T,tComb,.6)*.5+.5),'#e8590c');
      tab.maj(); return; }
    if(T>=enc) triangle(c,T,T2,R2,tT2,tD2,tD2+.3,tCo2,tCo2+.7,t2,2.2);
    else triangle(c,T,T1,R1,tT1,tD1,tC1,tCo1,tL1,t1,1.9);
    /* Abracadabra : des étoiles sur le tableau */
    if(T>=tAbra&&T<tD1){ const k=T-tAbra; for(let i=0;i<9;i++){ const a=i*2.4+k*2, d=150+k*190+i*16, s=24*(1-k/2.4); if(s>0) texte(c,'★',516+Math.cos(a)*d,360+Math.sin(a)*d*.7,44+s,'#f5a50a'); } }
    tab.maj();
  }

  /* La question : le stade et la fourmi, dessinés sous la carte */
  const tStade=mot('03-question','stade'), tFourmi=mot('03-question','fourmi');
  const dessinQ=document.createElement('div'); dessinQ.className='cv'; dessinQ.style.cssText='left:34px;top:1150px;width:350px;;display:none;z-index:3;';
  dessinQ.innerHTML=`<div id="qS" style="position:relative;height:254px;"><svg width="350" height="254" viewBox="0 0 470 340"><ellipse cx="235" cy="170" rx="225" ry="160" fill="#4caf50" stroke="#fff" stroke-width="8"/><ellipse cx="235" cy="170" rx="165" ry="108" fill="none" stroke="#fff" stroke-width="5"/><path d="M235 42L60 268L410 268Z" fill="#fffdf5" fill-opacity=".85" stroke="#1971c2" stroke-width="9" stroke-linejoin="round"/></svg></div>
    <div id="qF" style="position:relative;height:142px;margin-top:8px;"><svg width="350" height="142" viewBox="0 0 470 190"><rect x="80" y="10" width="310" height="170" rx="26" fill="#fffdf5" stroke="#17452a" stroke-width="6"/><path d="M226 72L204 110L250 110Z" fill="#dbeafe" stroke="#1971c2" stroke-width="4" stroke-linejoin="round"/><g fill="#20242c"><circle cx="278" cy="112" r="9"/><circle cx="292" cy="112" r="8"/><circle cx="306" cy="110" r="10"/></g><g stroke="#20242c" stroke-width="3"><path d="M278 118l-5 12M290 118v12M298 118l5 12M306 102l8-11M311 104l10-6"/></g></svg></div>`;
  document.body.append(dessinQ);

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-tour'), a2=dit('02-encore'), a4=dit('04-commentaire'), qd=dit('03-question'), rd=dit('03b-reponse');
  const groupes=[
    groupe(acc+.1,acc+4.1,352,62,a0('Salut !'),a0('Je vais te faire'),a0('un tour de magie.')),
    groupe(acc+4.1,acc+7.05,60,62,a0('Dessine n’importe'),a0('quel triangle.')),
    groupe(acc+7.05,tour,60,54,a0('Tu paries que je devine'),a0('la somme de ses angles'),a0('sans le regarder ?')),
    groupe(tour+.1,tour+1.95,60,84,a1('Abracadabra !')),
    groupe(tour+1.95,tour+4.3,60,62,a1('Je déchire'),a1('les trois coins.')),
    groupe(tour+4.3,tour+6.55,60,62,a1('Je les colle'),a1('côte à côte.')),
    groupe(tour+6.55,enc,60,62,a1('Une ligne droite :'),a1('180° !')),
    groupe(enc+.1,enc+2.95,60,62,a2('Un autre triangle,'),a2('tout pointu.')),
    groupe(enc+2.95,enc+4.75,60,72,a2('Je déchire.')),
    groupe(enc+4.75,enc+6.3,60,72,a2('Je colle.')),
    groupe(enc+6.3,q,60,72,a2('Encore 180° !')),
    groupe(com+.1,com+4.6,60,60,a4('À toi : je déchire les'),a4('4 coins d’une figure'),a4('à 4 côtés.')),
    groupe(com+4.6,f,60,60,a4('Combien de degrés'),a4('en tout ?'),a4('Réponds en commentaire !'))
  ];
  qd('Question !');
  const phraseQ=[qd('Un triangle grand comme un stade,'),qd('et un triangle petit comme une fourmi.'),qd('Lequel a la plus grande somme d’angles ?')];
  const tq=m=>mot('03-question',m)-q;
  rd.saute(2); const r1=rd('180° pour tous les deux !'), r2=rd('Ce n’est pas de la magie :'), r3=rd('ce sont des maths.');
  qd.saute(11); const pauseQ=[qd('Mets pause, et choisis !')];

  poserMiniature(outils,acc+1,'Un tour de magie<br>sur les angles'+PARI,`<svg width="300" height="250" viewBox="0 0 360 300"><path d="M180 20L30 280L330 280Z" fill="#fffdf5" stroke="#1971c2" stroke-width="10" stroke-linejoin="round"/><path d="M180 20L145 82L215 82Z" fill="#e03131"/><path d="M30 280L66 218L102 280Z" fill="#1971c2"/><path d="M330 280L294 218L258 280Z" fill="#f5a50a"/></svg>`);
  return { clips,FIN,titre:'Le tour de magie',ceinture:1,finTitre:acc+4.1,groupes,finClip:'05-abonne',
    cuts:[acc+4.1,q,r,com,f],
    question:{ qc:'03-question',rc:'03b-reponse',finR:com,cpt:fin('03-question')+.1,bonne:2,tBon:.64,
      phrase:phraseQ,pause:pauseQ,
      choix:[['le stade',tq('A'),tq('le')],['la fourmi',tq('B'),mot('03-question','la',2)-q],['ils ont la même',tq('C'),tq('ils')]],
      tete:[[r+.1,'Réponse '],[r+.64,'C :']],reponse:[r1],suite:[r2,r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<com, dansF=T>=f, gros=T<acc+4.1;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      dessinQ.style.display=T>=q&&T<r&&!window.MINI?'block':'none';
      if(T>=q&&T<r){ $('qS').style.visibility=T>=tStade?'':'hidden'; $('qF').style.visibility=T>=tFourmi?'':'hidden'; }
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(T>=q&&T<r){ scene.x=.27; cam.d=11.6; cam.y=3.7; }
      if(T>=r&&T<com||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }
      /* Le chapeau saute au mot « maths » : plus besoin de magie */
      const sauts=T>=tAbra&&T<tAbra+.9?Math.sin((T-tAbra)/.9*Math.PI)*.34:0, part=T>=tMaths&&T<com?lisse((T-tMaths)/.5):0;
      chapeau.position.y=.47+sauts+part*.5; chapeau.rotation.z=-.1-part*.5; chapeau.visible=part<1&&T>=0;
      if(T>=com) { chapeau.position.y=.47; chapeau.rotation.z=-.1; chapeau.visible=true; }

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gros) g.ouvre();
      else if(T<tTu) g.montre();
      else if(T<tSans) g.ouvre();
      else if(T<tour){ /* Il se cache les yeux… et il triche : une main descend */
        const tr=lisse((T-(tSans+1.2))/.3);
        P.gesteD='ouverte'; P.gesteG='ouverte'; P.md.set(.3,3.08-.42*tr,.98); P.mg.set(-.3,3.08,.98); P.cd.set(.78,2.2,.45); P.cg.set(-.78,2.2,.45); P.tetX=-.04; }
      else if(T<tD1) g.salut(T-tour,1.9);
      else if(T<q){ T>=tL1&&T<enc||T>=t2?g.pouce():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<r+.64?g.ouvre():g.pouce(); }
      else if(T<f){ T<com+8.2?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.pouce(); }
    } };
};
