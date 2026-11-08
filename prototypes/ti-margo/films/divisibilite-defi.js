/* Série Divisibilité 4e, épisode 07 : LE COFFRE À CODE (défis de divisibilité, voix 4e-div-defi-short).
   Dans une salle d'escape game, un coffre au trésor fermé par un cadenas à 3 roues : 7, ?, 5.
   Indice : divisible par 9. 7 + 5 = 12, pour aller à 18 il manque 6 : 765, clic, ouvert du premier coup.
   Chargé après films/divisibilite.js : réutilise poserTableau, ecrire, pop, tz, fleche, gestes,
   poserMiniature, PARI, enchainer, groupe, suiteDe, CRAIE.
   Ce fichier ne définit que des noms préfixés defi (pour ne pas écraser les autres épisodes). */

/* La voix mot à mot (comme c39VoixDe de l'épisode 03), avec :
   « = » consomme un « égale » dit seul ; « ? » consomme « (un) chiffre caché » ; un signe qui suit
   un mot double (« 7 plus ») prend l'instant du second mot ; un nombre répété dans les marques
   (« 765 » en trois marques) n'est consommé qu'une fois. */
function defiVoixDe(A){
  const CL=(window.CUES||{})[VIDEO]||{}, norme=s=>s.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,'');
  function dit(clip){ const l=CL[clip]; if(!l) throw new Error('clip sans instants : '+clip); let i=0;
    const f=txt=>{ const toks=txt.split(' '), tm=[]; let av=null, t2=null;
      toks.forEach((w,k)=>{
        if(w==='÷'){ while(i<l.length&&['divise','par'].includes(norme(l[i][1]))){ av=A[clip]+l[i][0]; i++; } tm.push(av); return; }
        if(w==='='&&i<l.length&&norme(l[i][1])==='egale'){ av=A[clip]+l[i][0]; i++; tm.push(av); return; }
        if(w==='?'&&i<l.length&&['un','chiffre'].includes(norme(l[i][1]))){ if(norme(l[i][1])==='un') i++;
          av=A[clip]+l[i][0]; i++; if(i<l.length&&norme(l[i][1])==='cache') i++; tm.push(av); return; }
        const n=norme(w); if(!n){ if(t2!==null){ av=t2; t2=null; } tm.push(av); return; }
        if(i>=l.length) throw new Error(`${clip} : plus de mots pour « ${txt} »`);
        const c=norme(l[i][1]); if(!c.includes(n)&&!n.includes(c)) throw new Error(`${clip} : écrit « ${w} », dit « ${l[i][1]} »`);
        av=A[clip]+l[i][0]; tm.push(av); t2=null;
        const suit=toks[k+1]?norme(toks[k+1]):''; const double=l[i+1]&&l[i+1][1]===l[i][1]&&l[i][1].includes(' ');
        if(double&&!(suit&&norme(l[i+1][1]).includes(suit))){ t2=A[clip]+l[i+1][0]; i+=2; }
        else { const m=l[i][1]; i+=1; if(!m.includes(' ')) while(i<l.length&&l[i][1]===m) i++; } });
      return [tm[0],tm[tm.length-1],txt,tm]; };
    f.saute=n=>{ i+=n; return f; };
    f.jusque=m=>{ const c=norme(m); while(i<l.length&&norme(l[i][1].split(/\s+/)[0])!==c) i++; return f; };
    return f; }
  /* l'instant du n-ième mot « m » d'un clip */
  function mot(clip,m,n=1){ const l=CL[clip], c=norme(m); let k=0;
    for(const [t,w] of l) if(w.split(/\s+/).some(x=>norme(x)===c)&&++k===n) return A[clip]+t;
    throw new Error(`${clip} : mot introuvable « ${m} »`); }
  return {dit,mot};
}

/* ---- La salle d'escape game : murs de pierre, plancher, torches, étagère, horloge ---- */
function defiSalle(){
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0x6b4423})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  for(let i=-20;i<=20;i++){ const l=new THREE.Mesh(new THREE.PlaneGeometry(.04,60),new THREE.MeshBasicMaterial({color:0x4a2f17})); l.rotation.x=-Math.PI/2; l.position.set(i*.8,-.015,0); scene3d.add(l); }
  const mur=new THREE.Mesh(new THREE.PlaneGeometry(200,60),new THREE.MeshBasicMaterial({color:0x3f3a4a})); mur.position.set(0,20,-12); scene3d.add(mur);
  /* les pierres du mur du fond, en quinconce */
  const pierres=[0x57506a,0x4c4660,0x615a75];
  for(let r=0;r<14;r++) for(let k=-14;k<=14;k++){
    const p=new THREE.Mesh(new THREE.PlaneGeometry(1.5,.62),new THREE.MeshBasicMaterial({color:pierres[(r*7+k*3+40)%3]}));
    p.position.set(k*1.6+(r%2)*.8,.36+r*.7,-11.9); scene3d.add(p); }
  /* deux torches : support, flamme (cône orange et cœur jaune) */
  for(const x of [-4.3,4.3]){ const t=new THREE.Group(); t.position.set(x,3.1,-6); scene3d.add(t);
    piece(t,new THREE.CylinderGeometry(.07,.05,.9,10),toon(0x5c3a1e),[0,0,0],CONTOUR_FIN);
    piece(t,new THREE.ConeGeometry(.2,.55,14),toon(0xff922b),[0,.68,0],null);
    piece(t,new THREE.ConeGeometry(.1,.32,12),toon(0xffe066),[0,.62,.06],null);
    const halo=new THREE.Mesh(new THREE.CircleGeometry(1.1,30),new THREE.MeshBasicMaterial({color:0xffc078,transparent:true,opacity:.18})); halo.position.set(0,.6,-.1); t.add(halo); }
  /* l'étagère à gauche, avec des livres et un sablier */
  const e=new THREE.Group(); e.position.set(-5.2,0,-5.6); scene3d.add(e);
  for(const h of [.9,1.9]) piece(e,new THREE.BoxGeometry(2.2,.08,.5),toon(0x8a5a2b),[0,h,0],CONTOUR_FIN);
  [0xc92a2a,0x1971c2,0x2f9e44,0xf08c00,0x7048e8].forEach((cl,k)=>piece(e,new THREE.BoxGeometry(.22,.6+(k%2)*.12,.36),toon(cl),[-.8+k*.27,1.24+(k%2)*.06,0],CONTOUR_FIN));
  piece(e,new THREE.ConeGeometry(.18,.32,12),toon(0xf2c94c),[.6,2.1,0],CONTOUR_FIN);
  piece(e,new THREE.ConeGeometry(.18,.32,12),toon(0xf2c94c),[.6,2.42,0],CONTOUR_FIN).rotation.x=Math.PI;
  /* l'horloge du compte à rebours, à droite */
  const h=new THREE.Group(); h.position.set(5.3,3.4,-6); scene3d.add(h);
  piece(h,new THREE.CylinderGeometry(.6,.6,.12,32),toon(0xf8f9fa),[0,0,0],CONTOUR_SOMBRE).rotation.x=Math.PI/2;
  piece(h,new THREE.BoxGeometry(.06,.42,.04),toon(0x212529),[0,.18,.08],null);
  piece(h,new THREE.BoxGeometry(.3,.06,.04),toon(0xc92a2a),[.13,0,.09],null);
}

/* ---- Le coffre au trésor : caisse en bois cerclée de métal, couvercle sur charnière (à l'arrière),
   pièces d'or dedans, cadenas à 3 roues sur le devant (petit écran des chiffres) ---- */
function defiCoffre({x=1.05,z=.3,s=.9}={}){
  const g=new THREE.Group(); g.position.set(x,0,z); g.scale.setScalar(s); g.rotation.y=-.22; scene3d.add(g);
  const bois=toon(0x9c5b26), fonce=toon(0x6b3a14), metal=toon(0x868e96), or=toon(0xfcc419);
  piece(g,new RoundedBoxGeometry(1.5,.82,.95,3,.05),bois,[0,.41,0],CONTOUR_SOMBRE);
  for(const sx of [-.55,.55]) piece(g,new THREE.BoxGeometry(.1,.84,.97),metal,[sx,.41,0],null);
  /* les pièces d'or (cachées tant que le couvercle est fermé) */
  const tas=new THREE.Group(); tas.position.set(0,.8,0); g.add(tas);
  for(let k=0;k<14;k++){ const m=piece(tas,new THREE.CylinderGeometry(.12,.12,.04,16),or,[((k*37)%9-4)*.13,((k*13)%3)*.05,((k*29)%5-2)*.14],CONTOUR_FIN); m.rotation.x=.3+k*.4; m.rotation.z=k*.7; }
  const lueur=new THREE.Mesh(new THREE.CircleGeometry(.55,30),new THREE.MeshBasicMaterial({color:0xffe066,transparent:true,opacity:0})); lueur.position.set(0,1.05,-.2); g.add(lueur);
  /* le couvercle : son pivot est la charnière, en haut à l'arrière */
  const couv=new THREE.Group(); couv.position.set(0,.82,-.47); g.add(couv);
  const dome=piece(couv,new THREE.CylinderGeometry(.47,.47,1.5,24,1,false,0,Math.PI),bois,[0,0,.47],CONTOUR_SOMBRE); dome.rotation.z=Math.PI/2;
  piece(couv,new THREE.BoxGeometry(1.5,.05,.95),fonce,[0,.02,.47],CONTOUR_FIN);
  for(const sx of [-.55,.55]){ const b=piece(couv,new THREE.CylinderGeometry(.49,.49,.1,24,1,false,0,Math.PI),metal,[sx,0,.47],null); b.rotation.z=Math.PI/2; }
  /* le cadenas : corps, anse, écran des 3 roues */
  const cad=new THREE.Group(); cad.position.set(0,.5,.52); g.add(cad);
  piece(cad,new RoundedBoxGeometry(.62,.46,.12,2,.04),toon(0xf59f00),[0,0,0],CONTOUR_SOMBRE);
  const anse=new THREE.Group(); cad.add(anse);
  piece(anse,new THREE.TorusGeometry(.19,.045,10,24,Math.PI),metal,[0,.23,0],CONTOUR_FIN);
  const cv=document.createElement('canvas'); cv.width=384; cv.height=160; const c=cv.getContext('2d');
  const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace;
  const ecran=new THREE.Mesh(new THREE.PlaneGeometry(.52,.22),new THREE.MeshBasicMaterial({map:tx})); ecran.position.set(0,-.03,.065); cad.add(ecran);
  return {g,couv,tas,lueur,cad,anse,
    afficher(ch,cadre){ c.fillStyle='#111827'; c.fillRect(0,0,384,160);
      ch.forEach(([s,coul],k)=>{ const x=20+k*120; c.fillStyle='#212529'; c.fillRect(x,14,104,132); c.strokeStyle=cadre||'#d4a017'; c.lineWidth=6; c.strokeRect(x,14,104,132);
        c.fillStyle=coul; c.font='800 104px "Segoe UI"'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(s,x+52,86); });
      tx.needsUpdate=true; }};
}

/* Une roue du cadenas, à la craie : cadre, chiffre (ou « ? » orange en pointillés) */
const DEFI_CACHE='#ffa94d';
/* le « pop » d'un écrit, limité à 1,25 (rien ne déborde sur son voisin) */
const zDefi=(T,t,d=.5)=>Math.min(1.25,Math.max(1,pop(T,t,d)));
function defiRoue(c,x,y,s,z=1,cadre=null,coul=null){ if(z<=0) return; z=Math.min(z,1.15); const w=150, h=190;
  c.fillStyle='#1b2b22'; c.fillRect(x-w/2,y-h/2,w,h);
  if(s==='?'){ c.strokeStyle=DEFI_CACHE; c.lineWidth=9; c.setLineDash([20,12]); c.strokeRect(x-w/2,y-h/2,w,h); c.setLineDash([]); ecrire(c,'?',x,y+4,150*z,DEFI_CACHE); }
  else { c.strokeStyle=cadre||CRAIE.blanc; c.lineWidth=8; c.strokeRect(x-w/2,y-h/2,w,h); ecrire(c,s,x,y+4,150*z,coul||CRAIE.blanc); } }
/* Une ligne de morceaux colorés, centrée en x : [[texte, couleur], …] */
function defiLigne(c,toks,x,y,taille=84){
  c.font=`800 ${taille}px "Segoe UI"`; const esp=c.measureText(' ').width, L=toks.map(k=>c.measureText(k[0]).width);
  let gx=x-(L.reduce((a,b)=>a+b,0)+esp*(toks.length-1))/2;
  toks.forEach(([s,coul],k)=>{ ecrire(c,s,gx+L[k]/2,y,taille,coul||CRAIE.blanc); gx+=L[k]+esp; }); }
/* La jauge : n cases (rangées de 9), les `pleins` premières bleues, les autres vides ou orange */
function defiJauge(c,x,y,n,pleins,orange,z=1){ const p=78;
  for(let k=0;k<n;k++){ const i=Math.floor(k/9), j=k%9, cx=x+(j-4)*p, cy=y+i*(p+6), s=64*Math.min(1,z);
    if(k<pleins){ c.fillStyle=CRAIE.grand; c.fillRect(cx-s/2,cy-s/2,s,s); }
    else if(orange){ c.fillStyle=DEFI_CACHE; c.globalAlpha=.85; c.fillRect(cx-s/2,cy-s/2,s,s); c.globalAlpha=1; }
    c.strokeStyle=k<pleins?CRAIE.grand:(orange?DEFI_CACHE:'#adb5bd'); c.lineWidth=5; c.strokeRect(cx-s/2,cy-s/2,s,s); } }

/* ============================================================
   ÉPISODE 07 : LE COFFRE À CODE. 7 ? 5, divisible par 9 : 7 + 5 = 12, il manque 6 pour 18.
   765 : 7 + 6 + 5 = 18. La question : divisible par 9, donc par 3 (l'inverse est faux).
   La question en commentaire : 3 ? 0 divisible par 9 et par 10 (réponse 6 : 360).
   ============================================================ */
FILMS.defi=function(outils){
  const {panneau}=outils;
  const DUR={'00-accroche':9.72,'01-indices':12.14,'02-ouvert':13.32,'02q-question':14.5,'02r-reponse':9.49,'03-question':10.68,'04-abonne':6.05};
  const clips=enchainer(.4,['00-accroche','01-indices','02-ouvert','02q-question','02r-reponse','03-question','04-abonne'],DUR,{'02q-question':3.3,'03-question':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=defiVoixDe(A);
  const [acc,ind,ouv,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['04-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  defiSalle(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55,fond:'#1f3a2b',bois:0x5c3a1e});
  const cof=defiCoffre();
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;} div#rebours{display:block;} body.video{background:#3f3a4a;}'; document.head.append(css);

  /* Les instants */
  const tCe=mot('00-accroche','Ce'), tCoffre=mot('00-accroche','coffre'), t3ch=mot('00-accroche','chiffres'), tParie=mot('00-accroche','paries'), tCoup=mot('00-accroche','coup');
  const i7=mot('01-indices','7'), iCh=mot('01-indices','chiffre'), i5=mot('01-indices','5'), iDiv=mot('01-indices','divisible'), i9=mot('01-indices','9');
  const iPlus=mot('01-indices','7',2), i12=mot('01-indices','12'), i18=mot('01-indices','18'), iManque=mot('01-indices','manque'), i6=mot('01-indices','6');
  const o7=mot('02-ouvert','7'), o6=mot('02-ouvert','6'), o5=mot('02-ouvert','5'), o765=mot('02-ouvert','765'), oClic=mot('02-ouvert','Clic');
  const oSom=mot('02-ouvert','7',2), o18=mot('02-ouvert','18'), oDiv=mot('02-ouvert','divisible'), oOuvert=mot('02-ouvert','Ouvert');
  const c3=mot('03-question','3'), cCh=mot('03-question','chiffre'), c0=mot('03-question','0'), cDiv=mot('03-question','divisible'), c10=mot('03-question','10');
  const cQuel=mot('03-question','Quel'), cRep=mot('03-question','Réponds');
  const gros=T=>T<tCe-.1;

  /* L'ardoise */
  function dessiner(T){ const c=tab.c, W=tab.W; tab.effacer();
    if(T>=com){ /* le défi : 3 ? 0, ÷ 9 et ÷ 10, rien de la réponse */
      defiRoue(c,W/2-170,150,'3',tz(T,c3)); defiRoue(c,W/2,150,'?',tz(T,cCh)); defiRoue(c,W/2+170,150,'0',tz(T,c0));
      if(T>=cDiv) ecrire(c,'÷ 9',W/2-150,365,100*zDefi(T,cDiv),CRAIE.petit);
      if(T>=c10){ ecrire(c,'et',W/2,365,70); ecrire(c,'÷ 10',W/2+170,365,100*zDefi(T,c10),CRAIE.petit); }
      if(T>=cQuel) ecrire(c,'Quel chiffre ?',W/2,560,96*zDefi(T,cQuel),DEFI_CACHE);
      tab.maj(); return; }
    if(T>=ouv){ /* 765 : la somme fait 18, divisible par 9, ouvert */
      const tr=T>=o765;
      const vert=tr?CRAIE.ok:null;
      defiRoue(c,W/2-170,130,'7',1,vert); defiRoue(c,W/2,130,T>=o6?'6':'?',T>=o6?zDefi(T,o6):1,vert,DEFI_CACHE); defiRoue(c,W/2+170,130,'5',1,vert);
      if(T>=o7&&T<o7+.5) { c.strokeStyle=CRAIE.petit; c.lineWidth=10; c.strokeRect(W/2-170-82,130-102,164,204); }
      if(T>=o5&&T<o5+.5) { c.strokeStyle=CRAIE.petit; c.lineWidth=10; c.strokeRect(W/2+170-82,130-102,164,204); }
      if(tr) ecrire(c,'765',W/2+400,130,74*zDefi(T,o765),CRAIE.ok);
      if(T>=oSom) defiLigne(c,[['7'],['+'],['6',DEFI_CACHE],['+'],['5'],['='],['18',T>=o18?CRAIE.petit:'rgba(0,0,0,0)']],W/2,340,90);
      if(T>=oDiv) ecrire(c,'÷ 9 ✓',W/2,465,90*zDefi(T,oDiv),CRAIE.ok);
      if(T>=oOuvert){ const z=zDefi(T,oOuvert); c.save(); c.translate(W/2,615); c.rotate(-.04); ecrire(c,'OUVERT !',0,0,104*z,CRAIE.ok); c.restore(); }
      tab.maj(); return; }
    if(T>=ind){ /* 7 ? 5, ÷ 9 ; 7 + 5 = 12 ; la jauge de 18 : il manque 6 */
      defiRoue(c,250,120,'7',tz(T,i7)); defiRoue(c,420,120,'?',tz(T,iCh)); defiRoue(c,590,120,'5',tz(T,i5));
      if(T>=iDiv) ecrire(c,'÷ 9 ?',870,120,96*zDefi(T,i9),CRAIE.petit);
      if(T>=iPlus) ecrire(c,'7 + 5 =',W/2-60,300,84);
      if(T>=i12) ecrire(c,'12',W/2+150,300,90*zDefi(T,i12),CRAIE.grand);
      if(T>=i18){ defiJauge(c,W/2,445,18,12,T>=iManque,zDefi(T,i18));
        ecrire(c,'18',W/2+410,483,70,CRAIE.blanc); }
      if(T>=i6) ecrire(c,'il manque 6',W/2,640,84*zDefi(T,i6),DEFI_CACHE);
      tab.maj(); return; }
    /* l'accroche : trois roues inconnues, TU PARIES ? */
    if(T>=t3ch) [-1,0,1].forEach(k=>defiRoue(c,W/2+k*170,250,'?',tz(T,t3ch+(k+1)*.12)));
    if(T>=tParie){ const z=zDefi(T,tParie); c.save(); c.translate(W/2,540); c.rotate(-.05); ecrire(c,'TU PARIES ?',0,0,108*z,'#ff922b'); c.restore(); }
    tab.maj();
  }
  /* Le cadenas du coffre suit l'ardoise */
  const D='#f8f9fa', Q='#ffa94d', V='#8ce99a';
  function cadenas(T){
    if(T>=com) cof.afficher([['3',T>=c3?D:'#495057'],['?',Q],['0',T>=c0?D:'#495057']]);
    else if(T>=o765) cof.afficher([['7',V],['6',V],['5',V]],'#2f9e44');
    else if(T>=o6) cof.afficher([['7',D],['6',Q],['5',D]]);
    else if(T>=i7) cof.afficher([['7',D],['?',Q],['5',T>=i5?D:'#495057']]);
    else cof.afficher([['?',Q],['?',Q],['?',Q]]);
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-indices'), a2=dit('02-ouvert'), a3=dit('03-question'), qd=dit('02q-question'), rd=dit('02r-reponse');
  const groupes=[
    groupe(acc+.1,tCe-.1,352,62,a0('Salut !'),a0('Moi, c’est Ti Margo.')),
    ...suiteDe(ind,60,58,[a0('Ce coffre a un code'),a0('à 3 chiffres.')],[a0('Tu paries que je l’ouvre'),a0('du premier coup ?')]),
    ...suiteDe(ouv,60,58,[a1('Le code : 7 ? 5.'),a1('Indice : divisible par 9.')],[a1('7 + 5 = 12.')],[a1('Pour aller à 18,'),a1('il manque 6.')]),
    ...suiteDe(q,60,58,[a2('7, 6, 5 : 765.'),a2('Clic !')],[a2('7 + 6 + 5 = 18,'),a2('divisible par 9.')],[a2('Ouvert du premier coup !')]),
    ...suiteDe(f,60,56,[a3('À toi : le code'),a3('3 ? 0 est divisible'),a3('par 9 et par 10.')],[a3('Quel est le chiffre caché ?'),a3('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Un nombre divisible par 9 est-il toujours divisible par 3 ?')];
  const tq=(m,n=1)=>mot('02q-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(3); const r1=rd('9 = 3 × 3.'), r2=rd('L’inverse est faux :'), r3=rd('6 est divisible par 3, pas par 9.');

  poserMiniature(outils,acc+1,'7 ? 5 : le code<br>du premier coup'+PARI,
    `<svg width="300" height="166" viewBox="0 0 380 210"><rect x="6" y="6" width="368" height="198" rx="18" fill="#1f3a2b" stroke="#5c3a1e" stroke-width="12"/>
     ${[['7','#f8f9fa'],['?','#ffa94d'],['5','#f8f9fa']].map(([s,cl],k)=>`<rect x="${42+k*104}" y="38" width="88" height="128" fill="#1b2b22" stroke="${cl}" stroke-width="6" ${s==='?'?'stroke-dasharray="14 9"':''}/><text x="${86+k*104}" y="138" font-family="Segoe UI" font-weight="800" font-size="96" fill="${cl}" text-anchor="middle">${s}</text>`).join('')}</svg>`);
  return { clips,FIN,titre:'Le coffre à code',ceinture:2,finTitre:tCe-.1,groupes,finClip:'04-abonne',
    cuts:[tCe-.1,ind,ouv,q,r,com,f],
    tics:[{t:i7,f:1320},{t:i5,f:1320},{t:o7,f:1320},{t:o6,f:1320},{t:o5,f:1320},{t:oClic,f:160}],
    question:{ qc:'02q-question',rc:'02r-reponse',finR:com,cpt:fin('02q-question')+.1,bonne:0,tBon:.67,
      phrase:phraseQ,pause:pauseQ,
      choix:[['oui',tq('A'),tq('oui')],['non',tq('B'),tq('non')],['seulement s’il est pair',tq('C'),tq('seulement')]],
      tete:[[r+.1,'Réponse '],[r+.67,'A : oui !']],reponse:[r1],suite:[r2,r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T); cadenas(T);
      const dansQ=T>=q&&T<com, dansF=T>=f, gr=gros(T);
      tab.g.visible=!gr&&!dansQ&&!dansF&&!window.MINI;
      cof.g.visible=!dansQ&&!dansF;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gr){ scene.x=-.62; cam.d=9.8; cam.y=1.9; cam.x=.25; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }
      /* le clic : l'anse saute, le couvercle s'ouvre, l'or brille ; il se referme pour le défi */
      const uo=T>=oClic&&T<com?lisse(Math.min(1,(T-oClic)/.8)):0;
      cof.anse.position.y=.12*(T>=oClic&&T<com?lisse(Math.min(1,(T-oClic)/.25)):0);
      cof.couv.rotation.x=-1.9*uo; cof.lueur.material.opacity=.55*uo*(.8+.2*Math.sin(T*6));
      if(T>=oClic&&T<oClic+.35) cof.g.position.y=Math.abs(Math.sin((T-oClic)*18))*.05; else cof.g.position.y=0;

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gr) g.ouvre();
      else if(T<ind){ if(T<tParie) g.montre(); else g.fier(); }
      else if(T<ouv){ T<iPlus?g.montre():(T<i6?g.reflechit():g.fier()); }
      else if(T<q){ if(T>=oClic&&T<oSom) g.fier(); else if(T>=oOuvert) g.fier(); else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<r+.67?g.ouvre():g.pouce(); }
      else if(T<f){ T<cRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); cof.g.visible=false; }
    } };
};
