/* Série Divisibilité 4e : les 7 shorts (épisodes 01 à 07, voix 4e-div-<ép>-short).
   Outils communs, puis FILMS.diviseurs (épisode 05, le pilote). Les autres épisodes
   vivent dans films/divisibilite-<épisode>.js et réutilisent ces outils.
   Modèle : films/decimaux.js (voix mot à mot, tableau à la craie, miniature, gestes),
   dont voixDe, enchainer, suiteDe, poserMiniature, poserTableau, ecrire, pop et gestes sont recopiés ici
   (même code : à faire remonter dans short.js quand plus aucune session n'y touche). */

/* ---- La voix : chaque mot écrit prend l'instant exact où il est dit ----
   « ÷ » à l'écran se lit « divisé par » : il consomme ces deux mots. */
function voixDe(A){
  const CL=(window.CUES||{})[VIDEO]||{}, norme=s=>s.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,'');
  function dit(clip){ const l=CL[clip]; if(!l) throw new Error('clip sans instants : '+clip); let i=0;
    const f=txt=>{ const toks=txt.split(' '), tm=[]; let av=null;
      toks.forEach((w,k)=>{
        if(w==='÷'){ while(i<l.length&&['divise','par'].includes(norme(l[i][1]))){ av=A[clip]+l[i][0]; i++; } tm.push(av); return; }
        const n=norme(w); if(!n){ tm.push(av); return; }
        if(i>=l.length) throw new Error(`${clip} : plus de mots pour « ${txt} »`);
        const c=norme(l[i][1]); if(!c.includes(n)&&!n.includes(c)) throw new Error(`${clip} : écrit « ${w} », dit « ${l[i][1]} »`);
        av=A[clip]+l[i][0]; tm.push(av);
        const suit=toks[k+1]?norme(toks[k+1]):''; const double=l[i+1]&&l[i+1][1]===l[i][1]&&l[i][1].includes(' ');
        i+=double&&!(suit&&norme(l[i+1][1]).includes(suit))?2:1; });
      return [tm[0],tm[tm.length-1],txt,tm]; };
    f.saute=n=>{ i+=n; return f; };
    f.jusque=m=>{ const c=norme(m); while(i<l.length&&norme(l[i][1].split(/\s+/)[0])!==c) i++; return f; };
    return f; }
  /* L'instant du n-ième mot « m » d'un clip */
  function mot(clip,m,n=1){ const l=CL[clip], c=norme(m); let k=0;
    for(const [t,w] of l) if(w.split(/\s+/).some(x=>norme(x)===c)&&++k===n) return A[clip]+t;
    throw new Error(`${clip} : mot introuvable « ${m} »`); }
  return {dit,mot};
}
function enchainer(depart,liste,DUR,apres={},ecart=.2){ let t=depart; return liste.map(c=>{ const r=[c,+t.toFixed(2)]; t+=DUR[c]+(apres[c]??ecart); return r; }); }
const groupe=(de,a,top,fs,...phrases)=>({de,a,top,fs,phrases});
function suiteDe(fin,top,fs,...listes){ return listes.map((ph,k)=>groupe(ph[0][0]-.08,k+1<listes.length?listes[k+1][0][0]-.08:fin,top,fs,...ph)); }

/* ---- La miniature : Ti Margo plein cadre, le pari, la ceinture, la mention ---- */
function poserMiniature({$,carte,legende,panneau},t,html,dessin=''){ window.tiMargoMiniature=()=>{ window.MINI=true; window.tiMargo.aller(t);
  carte.style.display='none'; panneau.style.display='none'; $('titre').style.display='none'; $('fin').style.display='none';
  legende.style.cssText+=';display:block;top:60px;left:50px;right:50px;font-size:92px;line-height:1.08;padding:26px;'; legende.innerHTML=html;
  const e=$('echelle'); e.style.display='flex'; e.style.top='560px';
  if(dessin){ const d=document.createElement('div'); d.className='cv'; d.innerHTML=dessin; d.style.cssText='left:44px;top:732px;z-index:4;'; document.body.append(d); }
  const m=document.createElement('div'); m.className='cv'; m.textContent='Dessin animé';
  m.style.cssText='left:250px;right:250px;bottom:36px;text-align:center;font-size:72px;background:#17452a;color:#fff;border-radius:999px;padding:14px 0;z-index:6;'; document.body.append(m); }; }
const PARI='<div style="color:#e8590c;font-size:136px;margin-top:10px">TU PARIES ?</div>';

/* ---- Le panneau du jardinier : une ardoise sur pieds, écrite à la craie à chaque image ---- */
function poserTableau({L=4.4,H=3,x=0,y=4.5,z=-1.5,res=240,fond='#24452c',bois=0x8a5a2b,pieds=true}={}){
  const g=new THREE.Group(); g.position.set(x,y,z); scene3d.add(g);
  const cv=document.createElement('canvas'); cv.width=Math.round(L*res); cv.height=Math.round(H*res); const c=cv.getContext('2d');
  const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace; tx.anisotropy=8;
  piece(g,new RoundedBoxGeometry(L+.26,H+.26,.14,4,.05),toon(bois),[0,0,-.08],CONTOUR_SOMBRE);
  const face=new THREE.Mesh(new THREE.PlaneGeometry(L,H),new THREE.MeshBasicMaterial({map:tx})); face.position.z=.001; g.add(face);
  if(pieds) for(const s of [-1,1]) piece(g,new THREE.CylinderGeometry(.09,.11,y,10),toon(bois),[s*(L/2-.5),-y/2-H/4,-.14],CONTOUR_SOMBRE);
  return {g,c,W:cv.width,H:cv.height,fond,effacer(){ c.fillStyle=fond; c.fillRect(0,0,cv.width,cv.height); },maj(){ tx.needsUpdate=true; }};
}
const CRAIE={blanc:'#f8f9fa',petit:'#ffd43b',grand:'#74c0fc',ok:'#8ce99a',faux:'#ff8787',rose:'#faa2c1'};
function ecrire(c,s,x,y,taille=84,coul=CRAIE.blanc,align='center'){ c.fillStyle=coul; c.font=`800 ${taille}px "Segoe UI"`; c.textAlign=align; c.textBaseline='middle'; c.fillText(s,x,y); }
const pop=(T,t0,d=.5)=>{ const u=(T-t0)/d; return u<0?0:(u>=1?1:1+.7*Math.sin(u*Math.PI)); };
const tz=(T,t0)=>T>=t0?Math.max(1,pop(T,t0)):0;
/* Un tournesol vu d'en haut, à la craie */
function tournesol(c,x,y,r,z=1){ if(z<=0) return; r*=z; c.fillStyle='#ffd43b'; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); c.fillStyle='#7c4a1d'; c.beginPath(); c.arc(x,y,r*.34,0,7); c.fill(); }
/* lignes rangées de col tournesols, centrées en (x,y) */
function rect(c,lignes,col,x,y,pas,r,z){ for(let i=0;i<lignes;i++) for(let j=0;j<col;j++) tournesol(c,x+(j-(col-1)/2)*pas,y+(i-(lignes-1)/2)*pas,r,z); }
/* Une flèche à la craie */
function fleche(c,x1,y1,x2,y2,coul,ep=9){ c.strokeStyle=coul; c.fillStyle=coul; c.lineWidth=ep; c.lineCap='round'; c.beginPath(); c.moveTo(x1,y1); c.lineTo(x2,y2); c.stroke();
  const a=Math.atan2(y2-y1,x2-x1), h=26; c.beginPath(); c.moveTo(x2,y2); c.lineTo(x2-h*Math.cos(a-.45),y2-h*Math.sin(a-.45)); c.lineTo(x2-h*Math.cos(a+.45),y2-h*Math.sin(a+.45)); c.closePath(); c.fill(); }

/* ---- Le jardin : pelouse, ciel, haie, clôture, tournesols au fond ---- */
function poserJardin(){
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0x8fcf6a})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  const allee=new THREE.Mesh(new THREE.PlaneGeometry(3.2,40),new THREE.MeshBasicMaterial({color:0xe9d8a6})); allee.rotation.x=-Math.PI/2; allee.position.set(0,-.01,8); scene3d.add(allee);
  const ciel=new THREE.Mesh(new THREE.PlaneGeometry(200,60),new THREE.MeshBasicMaterial({color:0xbfe6ff})); ciel.position.set(0,20,-12); scene3d.add(ciel);
  const haie=new THREE.Mesh(new THREE.PlaneGeometry(200,2.2),new THREE.MeshBasicMaterial({color:0x3f8f3a})); haie.position.set(0,1.1,-11.9); scene3d.add(haie);
  const cloture=new THREE.Group(); cloture.position.set(0,0,-5); scene3d.add(cloture);
  for(let i=-16;i<=16;i++) piece(cloture,new RoundedBoxGeometry(.16,1.2,.08,2,.03),toon(0xffffff),[i*.6,.6,0],CONTOUR_FIN);
  for(const h of [.4,.95]) piece(cloture,new THREE.BoxGeometry(19.4,.1,.06),toon(0xffffff),[0,h,.06],null);
  for(let i=-9;i<=9;i++){ if(Math.abs(i)<2) continue; const f=new THREE.Group(), h=1.6+((i*i*5)%4)*.25; f.position.set(i*1.05,0,-4.3); scene3d.add(f);
    piece(f,new THREE.CylinderGeometry(.04,.05,h,8),toon(0x2f9e44),[0,h/2,0],null);
    piece(f,new THREE.CylinderGeometry(.34,.34,.06,16),toon(0xfcc419),[0,h,.04],CONTOUR_FIN).rotation.x=Math.PI/2;
    piece(f,new THREE.CylinderGeometry(.15,.15,.08,14),toon(0x7c4a1d),[0,h,.08],null).rotation.x=Math.PI/2; }
}

/* Les gestes de Ti Margo */
function gestes(P,T){ return {
  ouvre(){ P.gesteD='ouverte'; P.md.set(.86,2.02+Math.sin(T*3)*.06,.5); P.cd.set(.72,1.58,.2); P.tetY=.08+Math.sin(T*1.7)*.07; },
  montre(){ P.gesteD='index'; P.md.set(1.02,2.72+Math.sin(T*3)*.04,.42); P.cd.set(.86,1.95,.1); P.tetX=-.1; P.regX=-.2; P.regY=.25; },
  pouce(){ P.md.set(.95,2.32,.45); P.cd.set(.74,1.7,.14); P.gesteD='pouce'; P.tetZ=-.14; P.paupiere=-1.1; },
  reflechit(){ P.md.set(.44,2.3,.72); P.cd.set(.78,1.78,.34); P.gesteD='ouverte'; P.tetZ=.15; P.tetX=-.1; P.regX=-.28; P.regY=.35; P.qSway=Math.sin(T*3)*.3; },
  salut(t,d=1.4){ const e=lisse(t*4)*lisse((d-t)*4); P.md.set(.88,2.2+.68*e,.28); P.cd.set(.82,1.92,.06); P.gesteD='ouverte'; P.tourneD=Math.sin(T*11)*.42*e; },
  oups(){ P.gesteD='ouverte'; P.md.set(.98,2.42,.5); P.mg.set(-.98,2.42,.5); P.cd.set(.82,1.7,.2); P.cg.set(-.82,1.7,.2); P.tetZ=.16+Math.sin(T*2)*.03; P.tetX=-.06; P.paupiere=-1.25; },
  fier(){ P.gesteD='pouce'; P.md.set(.9,2.5+Math.sin(T*4)*.05,.45); P.cd.set(.74,1.8,.14); P.tetZ=-.1; P.tetY=Math.sin(T*2)*.1; }
}; }

/* ============================================================
   ÉPISODE 05 : LES TOURNESOLS. 24 tournesols en rectangle : 1 × 24, 2 × 12, 3 × 8, 4 × 6.
   Les paires se croisent à 6 × 4 : les huit diviseurs de 24, aucun oublié.
   ============================================================ */
FILMS.diviseurs=function(outils){
  const {$,panneau}=outils;
  const DUR={'00-accroche':12.36,'01-paires':11.39,'02-stop':11.92,'03-liste':10.58,'03q-question':9.47,'03r-reponse':5.75,'04-question':5.61,'05-abonne':6.04};
  const clips=enchainer(.4,['00-accroche','01-paires','02-stop','03-liste','03q-question','03r-reponse','04-question','05-abonne'],DUR,{'03q-question':3.3,'04-question':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,pa,st,li,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserJardin(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;} div#rebours{display:block;}'; document.head.append(css);

  /* Les instants */
  const tJai=mot('00-accroche','J\'ai'), t24=mot('00-accroche','24'), tRect=mot('00-accroche','rectangle'), tParie=mot('00-accroche','paries');
  const tPaires=mot('01-paires','paires'), tR=[1,2,3,4].map(k=>mot('01-paires',String(k)));
  const t5=mot('02-stop','5'), tReste=mot('02-stop','reste'), tNon=mot('02-stop','non'), t6=mot('02-stop','6'), tDeja=mot('02-stop','déjà'), tCroisent=mot('02-stop','croisent'), tArrete=mot('02-stop','j\'arrête');
  const LISTE=[1,2,3,4,6,8,12,24], tL=LISTE.map((n,k)=>mot('03-liste',String(n),n===24?2:1)), tHuit=mot('03-liste','Huit'), tAucun=mot('03-liste','Aucun');
  const tCombien=mot('04-question','combien'), t30=mot('04-question','30');

  /* 24 tournesols en vrac (toujours les mêmes) */
  const VRAC=[]; { let s=7; const rnd=()=>(s=(s*16807)%2147483647)/2147483647;
    while(VRAC.length<24){ const p=[120+rnd()*816,150+rnd()*480]; if(VRAC.every(v=>Math.hypot(v[0]-p[0],v[1]-p[1])>78)) VRAC.push(p); } }
  const LIGNES=[90,195,300,405,510,615], XS=300, XX=400, XG=500;

  function dessiner(T){ const c=tab.c, W=tab.W; tab.effacer();
    if(T>=com){ /* le défi : 30 tournesols, la question, rien de la réponse */
      if(T>=tCombien) ecrire(c,'Combien de diviseurs',W/2,110,74,CRAIE.blanc);
      if(T>=t30) ecrire(c,'a 30 ?',W/2,250,130*Math.max(1,pop(T,t30)),CRAIE.petit);
      if(T>=t30) for(let k=0;k<30;k++) tournesol(c,150+(k%10)*84,440+Math.floor(k/10)*90,26,tz(T,t30+k*.02));
      tab.maj(); return; }
    if(T>=li){ /* la liste, les paires reliées par des arcs */
      ecrire(c,'Les diviseurs de 24 :',W/2,70,62,CRAIE.grand);
      const XL=[70,180,290,400,510,620,775,950], X=k=>XL[k];
      LISTE.forEach((n,k)=>{ const z=tz(T,tL[k]); if(z) ecrire(c,String(n)+(k<7?',':''),X(k),430,84*z,[1,2,3,4].includes(n)?CRAIE.petit:CRAIE.grand); });
      const arcs=[[0,7],[1,6],[2,5],[3,4]], cl=['#8ce99a','#74c0fc','#ffa94d','#faa2c1'];
      arcs.forEach(([a,b],k)=>{ const t0=tL[7]+.35+k*.3; if(T<t0) return; const u=Math.min(1,(T-t0)/.4);
        const x1=X(a)-6,x2=X(b)-6,h=50+(b-a)*22; c.strokeStyle=cl[k]; c.lineWidth=8; c.beginPath();
        for(let s=0;s<=u+1e-6;s+=.02){ const x=x1+(x2-x1)*s, y=370-h*4*s*(1-s); s?c.lineTo(x,y):c.moveTo(x,y); } c.stroke(); });
      if(T>=tHuit) ecrire(c,'Huit.',W/2,560,100*Math.max(1,pop(T,tHuit)),CRAIE.petit);
      if(T>=tAucun) ecrire(c,'Aucun oublié !',W/2,665,72*Math.max(1,pop(T,tAucun)),CRAIE.ok);
      tab.maj(); return; }
    if(T>=st){ /* les paires en deux colonnes ; 5 non ; 6 × 4 déjà trouvé ; les colonnes se croisent */
      [[1,24],[2,12],[3,8],[4,6]].forEach(([a,b],k)=>{ const y=LIGNES[k];
        ecrire(c,String(a),XS,y,80,CRAIE.petit); ecrire(c,'×',XX,y,64); ecrire(c,String(b),XG,y,80,CRAIE.grand); });
      if(T>=t5) ecrire(c,'5',XS,LIGNES[4],80*Math.max(1,pop(T,t5)),CRAIE.petit);
      if(T>=tReste) ecrire(c,'il reste 4',780,LIGNES[4],54,CRAIE.faux);
      if(T>=tNon) ecrire(c,'✗',XG,LIGNES[4],90*Math.max(1,pop(T,tNon)),CRAIE.faux);
      if(T>=t6){ const z=Math.max(1,pop(T,t6)); ecrire(c,'6',XS,LIGNES[5],80*z,CRAIE.petit); ecrire(c,'×',XX,LIGNES[5],64); ecrire(c,'4',XG,LIGNES[5],80*z,CRAIE.grand); }
      if(T>=tDeja){ c.strokeStyle=CRAIE.ok; c.lineWidth=8; c.strokeRect(230,LIGNES[3]-50,340,100); c.strokeRect(230,LIGNES[5]-50,340,100);
        fleche(c,600,LIGNES[5],600,LIGNES[3]+40,CRAIE.ok); ecrire(c,'déjà trouvé !',800,LIGNES[5],54*Math.max(1,pop(T,tDeja)),CRAIE.ok); }
      if(T>=tCroisent){ const u=Math.min(1,(T-tCroisent)/.6);
        fleche(c,170,LIGNES[0]-30,170,LIGNES[0]-30+(LIGNES[3]+30-LIGNES[0]+30)*u,CRAIE.petit,10);
        fleche(c,640,LIGNES[3]+30,640,LIGNES[3]+30-(LIGNES[3]-LIGNES[0]+60)*u,CRAIE.grand,10); }
      if(T>=tArrete) ecrire(c,'STOP',830,LIGNES[1]+50,110*Math.max(1,pop(T,tArrete)),CRAIE.faux);
      tab.maj(); return; }
    if(T>=pa){ /* chaque rectangle, une paire */
      const R=[[1,24,W/2,75,41,16],[2,12,245,330,35,14],[3,8,640,330,35,14],[4,6,920,330,35,14]];
      const LAB=[[W/2,150],[250,500],[640,500],[920,500]];
      R.forEach(([a,b,x,y,p,rr],k)=>{ const z=tz(T,tR[k]); if(!z) return; rect(c,a,b,x,y,p,rr,1);
        ecrire(c,String(a),LAB[k][0]-80,LAB[k][1],64*z,CRAIE.petit); ecrire(c,'×',LAB[k][0],LAB[k][1],54); ecrire(c,String(b),LAB[k][0]+80,LAB[k][1],64*z,CRAIE.grand); });
      if(T<tR[0]) VRAC.forEach(([x,y])=>tournesol(c,x,y,24));
      tab.maj(); return; }
    /* l'accroche : les 24 tournesols en vrac */
    if(T>=t24) VRAC.forEach(([x,y],k)=>tournesol(c,x,y,24,tz(T,t24+k*.03)));
    if(T>=tRect){ const u=Math.min(1,(T-tRect)/.5); c.strokeStyle=CRAIE.petit; c.lineWidth=7; c.setLineDash([24,16]); c.strokeRect(80,110,896*u,560); c.setLineDash([]); }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-paires'), a2=dit('02-stop'), a3=dit('03-liste'), a4=dit('04-question'), qd=dit('03q-question'), rd=dit('03r-reponse');
  const groupes=[
    groupe(acc+.1,tJai-.08,352,62,a0('Salut !'),a0('Moi, c’est Ti Margo.')),
    ...suiteDe(pa,60,58,[a0('J’ai 24 tournesols'),a0('à planter en rectangle.')],[a0('Tu paries que je trouve'),a0('tous les rectangles,'),a0('sans en oublier un seul ?')]),
    ...suiteDe(st,60,58,[a1('Ma méthode : par paires.')],[a1('1 rangée de 24.'),a1('2 rangées de 12.')],[a1('3 rangées de 8.'),a1('4 rangées de 6.')]),
    ...suiteDe(li,60,58,[a2('5 rangées ?'),a2('Il en reste 4 : non.')],[a2('6 rangées ?'),a2('C’est 6 × 4 :'),a2('déjà trouvé !')],[a2('Les paires se croisent :'),a2('j’arrête.')]),
    ...suiteDe(q,60,58,[a3('Les diviseurs de 24 :'),a3('1, 2, 3, 4, 6, 8, 12, 24.')],[a3('Huit.'),a3('Aucun oublié !')]),
    ...suiteDe(f,60,56,[a4('À toi : combien de diviseurs'),a4('a 30 ?'),a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Lequel n’est pas un diviseur de 24 ?')];
  const tq=m=>mot('03q-question',m)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(3); const r1=rd('24 ÷ 9 : 2,'), r2=rd('et il reste 6.');

  poserMiniature(outils,acc+1,'24 tournesols,<br>tous les rectangles'+PARI,
    `<svg width="330" height="210" viewBox="0 0 330 210"><rect x="6" y="6" width="318" height="198" rx="18" fill="#24452c" stroke="#8a5a2b" stroke-width="12"/>${
      Array.from({length:24},(_,k)=>{ const x=50+(k%6)*46, y=48+Math.floor(k/6)*38; return `<circle cx="${x}" cy="${y}" r="16" fill="#ffd43b"/><circle cx="${x}" cy="${y}" r="7" fill="#7c4a1d"/>`; }).join('')}</svg>`);
  return { clips,FIN,titre:'Tous les diviseurs',ceinture:2,finTitre:tJai-.08,groupes,finClip:'05-abonne',
    cuts:[tJai-.08,pa,st,li,q,r,com,f],
    question:{ qc:'03q-question',rc:'03r-reponse',finR:com,cpt:fin('03q-question')+.1,bonne:2,tBon:.64,
      phrase:phraseQ,pause:pauseQ,
      choix:[['6',tq('A'),tq('6')],['8',tq('B'),tq('8')],['9',tq('C'),tq('9')]],
      tete:[[r+.1,'Réponse '],[r+.64,'C : 9.']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<com, dansF=T>=f, gros=T<tJai-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gros) g.ouvre();
      else if(T<pa){ T<tParie?g.montre():g.fier(); }
      else if(T<st){ T<tPaires+.3?g.reflechit():g.montre(); }
      else if(T<li){ if(T>=tNon&&T<t6) g.oups(); else if(T>=tArrete) g.fier(); else g.montre(); }
      else if(T<q){ T>=tAucun?g.fier():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<r+.64?g.ouvre():g.pouce(); }
      else if(T<f){ T<mot('04-question','Réponds')?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
