/* Série Divisibilité 4e, épisode 03 : TI MARGO MAGICIEN (critères de divisibilité par 3 et par 9).
   Voix 4e-div-critere-3-9-short. Chargé après films/divisibilite.js : réutilise poserTableau,
   ecrire, pop, tz, fleche, gestes, poserMiniature, PARI, enchainer, groupe, suiteDe, CRAIE.
   Le tour : 123 456 789, la somme de ses chiffres fait 45 = 9 × 5 : divisible par 9.
   Ce fichier ne définit que des noms préfixés c39 (pour ne pas écraser les autres épisodes). */

/* La voix mot à mot, comme voixDe de divisibilite.js, avec trois réglages de plus :
   « = » consomme un « égale » dit seul ; « ? » consomme « chiffre caché » ; un signe
   (« + », « × ») qui suit un mot double (« 1 plus ») prend l'instant du second mot. */
function c39VoixDe(A){
  const CL=(window.CUES||{})[VIDEO]||{}, norme=s=>s.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,'');
  function dit(clip){ const l=CL[clip]; if(!l) throw new Error('clip sans instants : '+clip); let i=0;
    const f=txt=>{ const toks=txt.split(' '), tm=[]; let av=null, t2=null;
      toks.forEach((w,k)=>{
        if(w==='÷'){ while(i<l.length&&['divise','par'].includes(norme(l[i][1]))){ av=A[clip]+l[i][0]; i++; } tm.push(av); return; }
        if(w==='='&&i<l.length&&norme(l[i][1])==='egale'){ av=A[clip]+l[i][0]; i++; tm.push(av); return; }
        if(w==='?'&&i<l.length&&norme(l[i][1])==='chiffre'){ av=A[clip]+l[i][0]; i++; if(i<l.length&&norme(l[i][1])==='cache') i++; tm.push(av); return; }
        const n=norme(w); if(!n){ if(t2!==null){ av=t2; t2=null; } tm.push(av); return; }
        if(i>=l.length) throw new Error(`${clip} : plus de mots pour « ${txt} »`);
        const c=norme(l[i][1]); if(!c.includes(n)&&!n.includes(c)) throw new Error(`${clip} : écrit « ${w} », dit « ${l[i][1]} »`);
        av=A[clip]+l[i][0]; tm.push(av); t2=null;
        const suit=toks[k+1]?norme(toks[k+1]):''; const double=l[i+1]&&l[i+1][1]===l[i][1]&&l[i][1].includes(' ');
        if(double&&!(suit&&norme(l[i+1][1]).includes(suit))){ t2=A[clip]+l[i+1][0]; i+=2; } else i+=1; });
      return [tm[0],tm[tm.length-1],txt,tm]; };
    f.saute=n=>{ i+=n; return f; };
    f.jusque=m=>{ const c=norme(m); while(i<l.length&&norme(l[i][1].split(/\s+/)[0])!==c) i++; return f; };
    return f; }
  function mot(clip,m,n=1){ const l=CL[clip], c=norme(m); let k=0;
    for(const [t,w] of l) if(w.split(/\s+/).some(x=>norme(x)===c)&&++k===n) return A[clip]+t;
    throw new Error(`${clip} : mot introuvable « ${m} »`); }
  function entree(clip,k){ return A[clip]+CL[clip][k][0]; }
  return {dit,mot,entree};
}

/* ---- La scène de magicien : plancher, rideaux rouges, projecteur, étoiles ---- */
function c39PoserScene(){
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0x7a4a26})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  for(let i=-20;i<=20;i++){ const l=new THREE.Mesh(new THREE.PlaneGeometry(.04,60),new THREE.MeshBasicMaterial({color:0x5c3519})); l.rotation.x=-Math.PI/2; l.position.set(i*.9,-.015,0); scene3d.add(l); }
  const fond=new THREE.Mesh(new THREE.PlaneGeometry(200,60),new THREE.MeshBasicMaterial({color:0x1b1033})); fond.position.set(0,20,-12); scene3d.add(fond);
  const blanc=new THREE.MeshBasicMaterial({color:0xfff3bf});
  for(let k=0;k<70;k++){ const s=new THREE.Mesh(new THREE.CircleGeometry(.05+((k*37)%5)*.02,6),blanc); s.position.set(((k*53)%60)-30,2+((k*29)%24),-11.9); scene3d.add(s); }
  /* les rideaux : des plis rouges de chaque côté, et le lambrequin en haut */
  const rouge=toon(0xb91c1c), fonce=toon(0x7f1d1d), or=toon(0xf2c94c);
  for(const s of [-1,1]) for(let i=0;i<9;i++){
    piece(scene3d,new THREE.CylinderGeometry(.34,.34,12,14),i%2?fonce:rouge,[s*(4.1+i*.5),6,-6+i*.05],null); }
  piece(scene3d,new THREE.BoxGeometry(40,1.3,.3),rouge,[0,10.2,-5.8],null);
  for(let i=-19;i<=19;i++) piece(scene3d,new THREE.SphereGeometry(.16,10,8),or,[i,9.5,-5.6],null);
  /* l'estrade et le halo du projecteur au sol */
  piece(scene3d,new THREE.CylinderGeometry(2.6,2.75,.22,40),toon(0x3b1f5c),[-.7,.09,0],CONTOUR_SOMBRE);
  const halo=new THREE.Mesh(new THREE.CircleGeometry(2.2,40),new THREE.MeshBasicMaterial({color:0xffe9a8,transparent:true,opacity:.35})); halo.rotation.x=-Math.PI/2; halo.position.set(-.7,.21,0); scene3d.add(halo);
}

/* ---- Le haut-de-forme et la baguette de Ti Margo ---- */
function c39Costume(){
  const noir=toon(0x111827), ruban=toon(0xc0262d), blanc=toon(0xffffff);
  const h=new THREE.Group(); h.position.set(0,.6,-.2); h.rotation.set(-.32,0,.12); tete.add(h);
  piece(h,new THREE.CylinderGeometry(.5,.5,.05,32),noir,[0,0,0],CONTOUR_SOMBRE);
  piece(h,new THREE.CylinderGeometry(.3,.32,.62,28),noir,[0,.33,0],CONTOUR_SOMBRE);
  piece(h,new THREE.CylinderGeometry(.325,.325,.11,28),ruban,[0,.1,0],null);
  const b=new THREE.Group(); b.position.set(.02,.1,.12); b.rotation.set(.9,0,-.25); mainD.g.add(b);
  piece(b,new THREE.CylinderGeometry(.04,.04,.9,12),noir,[0,.3,0],CONTOUR_FIN);
  piece(b,new THREE.CylinderGeometry(.045,.045,.16,12),blanc,[0,.78,0],null);
  return {h,b};
}

/* Une étoile à cinq branches (les étincelles du tour) */
function c39Etoile(c,x,y,r,coul,a=0){ c.fillStyle=coul; c.beginPath();
  for(let k=0;k<10;k++){ const rr=k%2?r*.45:r, t=a-Math.PI/2+k*Math.PI/5; k?c.lineTo(x+rr*Math.cos(t),y+rr*Math.sin(t)):c.moveTo(x+rr*Math.cos(t),y+rr*Math.sin(t)); }
  c.closePath(); c.fill(); }
/* Un petit haut-de-forme à la craie */
function c39Chapeau(c,x,y,s){ c.fillStyle='#f8f9fa'; c.fillRect(x-60*s,y,120*s,14*s); c.fillRect(x-36*s,y-80*s,72*s,82*s); c.fillStyle='#ff8787'; c.fillRect(x-36*s,y-24*s,72*s,16*s); }

const C39_COUL=['#ffd43b','#74c0fc','#8ce99a','#ffa94d','#faa2c1','#b197fc','#63e6be','#ffc078','#f8f9fa'];

/* ============================================================
   ÉPISODE 03 : TI MARGO MAGICIEN. 123 456 789 : 1 + 2 + … + 9 = 45 = 9 × 5,
   donc divisible par 9. Le critère, pareil pour 3. La question : 2 024 et 3.
   ============================================================ */
FILMS['critere-3-9']=function(outils){
  const {panneau}=outils;
  const DUR={'00-accroche':14.98,'01-tour':14.5,'02-regle':9.82,'02q-question':14.42,'02r-reponse':8.62,'03-question':9.47,'04-abonne':6.04};
  const clips=enchainer(.4,['00-accroche','01-tour','02-regle','02q-question','02r-reponse','03-question','04-abonne'],DUR,{'02q-question':3.3,'03-question':1.5});
  const A=Object.fromEntries(clips), {dit,mot,entree}=c39VoixDe(A);
  const [acc,tou,reg,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['04-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  c39PoserScene(); const cos=c39Costume();
  const tab=poserTableau({L:4.4,H:3,x:0,y:4.55,fond:'#2a1846',bois:0xd4a017});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;} body.video{background:#1b1033;}'; document.head.append(css);

  /* Les instants */
  const tMagicien=mot('00-accroche','magicien'), tN=[entree('00-accroche',7),entree('00-accroche',10),entree('00-accroche',14)];
  const tParie=mot('00-accroche','paries'), t9a=mot('00-accroche','9'), tTrois=mot('00-accroche','trois');
  const tAdd=mot('01-tour','j\'additionne'), tP=[entree('01-tour',5),entree('01-tour',7),entree('01-tour',9)], tPl=[entree('01-tour',6),entree('01-tour',8)], tJusq=entree('01-tour',10), t9t=mot('01-tour','9'), t45=mot('01-tour','45');
  const tEt=entree('01-tour',14), tEg=mot('01-tour','égale'), t9f=entree('01-tour',16), tFois=entree('01-tour',17), t5=entree('01-tour',18), tAbra=mot('01-tour','Abracadabra'), tDiv=mot('01-tour','divisible');
  const tSomme=mot('02-regle','somme'), tR9=mot('02-regle','9'), tNombre=mot('02-regle','nombre'), tPareil=mot('02-regle','Pareil'), tR3=mot('02-regle','3'), tPas=mot('02-regle','Pas'), tMagie=mot('02-regle','magie'), tCrit=mot('02-regle','critère');
  const tC5=mot('03-question','5'), tCache=mot('03-question','chiffre'), tC2=mot('03-question','2'), tMult=mot('03-question','multiple');

  const NB=['1','2','3','4','5','6','7','8','9'];
  /* « 123 456 789 » : les 9 chiffres, en trois paquets séparés */
  const XN=k=>W0/2+(k-4)*92+(k<3?-28:(k>5?28:0));
  let W0=1056;

  function dessiner(T){ const c=tab.c, W=tab.W; W0=W; tab.effacer();
    if(T>=com){ /* le défi : 5 ? 2, rien de la réponse */
      const z=Math.max(1,pop(T,tC5));
      if(T>=tC5) ecrire(c,'5',W/2-210,200,200*z,CRAIE.blanc);
      if(T>=tCache){ const zz=Math.max(1,pop(T,tCache)); c.strokeStyle='#ffa94d'; c.lineWidth=10; c.setLineDash([22,14]); c.strokeRect(W/2-85,80,170,240); c.setLineDash([]); ecrire(c,'?',W/2,200,190*zz,'#ffa94d'); }
      if(T>=tC2) ecrire(c,'2',W/2+210,200,200*Math.max(1,pop(T,tC2)),CRAIE.blanc);
      if(T>=tMult) ecrire(c,'multiple de 9 ?',W/2,420,96*Math.max(1,pop(T,tMult)),CRAIE.petit);
      tab.maj(); return; }
    if(T>=reg){ /* le critère : somme ÷ 9, alors le nombre aussi ; pareil pour 3 */
      if(T>=tSomme) ecrire(c,'Somme des chiffres',W/2-120,80,70,CRAIE.blanc);
      if(T>=tR9) ecrire(c,'÷ 9 ✓',W/2+330,80,74*Math.max(1,pop(T,tR9)),CRAIE.ok);
      if(T>=tNombre){ fleche(c,W/2-120,128,W/2-120,178,CRAIE.blanc,9); ecrire(c,'le nombre',W/2-120,225,70,CRAIE.blanc); ecrire(c,'÷ 9 ✓',W/2+200,225,74*Math.max(1,pop(T,tNombre)),CRAIE.ok); }
      if(T>=tPareil) ecrire(c,'Pareil pour',W/2-120,350,70,CRAIE.grand);
      if(T>=tR3) ecrire(c,'÷ 3',W/2+200,350,84*Math.max(1,pop(T,tR3)),CRAIE.grand);
      if(T>=tPas){ c39Chapeau(c,150,530,.9); }
      if(T>=tMagie){ c.strokeStyle=CRAIE.faux; c.lineWidth=12; c.beginPath(); c.moveTo(80,430); c.lineTo(220,560); c.moveTo(220,430); c.lineTo(80,560); c.stroke(); }
      if(T>=tCrit){ const z=Math.max(1,pop(T,tCrit)); c.save(); c.translate(W/2+160,480); c.rotate(-.06); c.strokeStyle=CRAIE.petit; c.lineWidth=10; c.strokeRect(-240*z,-58*z,480*z,116*z); ecrire(c,'CRITÈRE',0,4,96*z,CRAIE.petit); c.restore(); }
      tab.maj(); return; }
    if(T>=tou){ /* le tour : on additionne les chiffres */
      NB.forEach((d,k)=>{ const on=T>=tAdd+k*.12; ecrire(c,d,XN(k),90,104*(on?Math.max(1,pop(T,tAdd+k*.12,.35)):1),on?C39_COUL[k]:CRAIE.blanc); });
      const y=215;
      if(T>=tP[0]) ecrire(c,'1',150,y,80,C39_COUL[0]); if(T>=tPl[0]) ecrire(c,'+',215,y,66);
      if(T>=tP[1]) ecrire(c,'2',280,y,80,C39_COUL[1]); if(T>=tPl[1]) ecrire(c,'+',345,y,66);
      if(T>=tP[2]) ecrire(c,'3',410,y,80,C39_COUL[2]);
      if(T>=tJusq){ ecrire(c,'+',475,y,66); ecrire(c,'…',555,y,80); ecrire(c,'+',635,y,66); }
      if(T>=t9t) ecrire(c,'9',700,y,80,C39_COUL[8]);
      if(T>=t45){ ecrire(c,'=',780,y,66); ecrire(c,'45',880,y,96*Math.max(1,pop(T,t45)),CRAIE.petit); }
      const y2=340;
      if(T>=tEt) ecrire(c,'45',W/2-200,y2,100,CRAIE.petit);
      if(T>=tEg) ecrire(c,'=',W/2-80,y2,84);
      if(T>=t9f) ecrire(c,'9',W/2+30,y2,100*Math.max(1,pop(T,t9f)),CRAIE.ok);
      if(T>=tFois) ecrire(c,'×',W/2+120,y2,80);
      if(T>=t5) ecrire(c,'5',W/2+210,y2,100,CRAIE.blanc);
      if(T>=tAbra){ const u=T-tAbra; for(let k=0;k<14;k++){ /* les étincelles, de part et d'autre (jamais sur un nombre) */
          const x=k%2?935+((k*37)%90):35+((k*53)%90), y=420+((k*71)%250)-Math.min(60,u*25);
          const z=Math.min(1,u*3)*(1+.3*Math.sin(u*8+k)); c39Etoile(c,x,y,20*z,C39_COUL[k%9],u*2+k); } }
      if(T>=tDiv) ecrire(c,'divisible par 9 !',W/2,465,88*Math.max(1,pop(T,tDiv)),CRAIE.ok);
      tab.maj(); return; }
    /* l'accroche : 123 456 789, ÷ 9 ?, en 3 s, TU PARIES ? */
    NB.forEach((d,k)=>{ const t0=tN[Math.floor(k/3)]+(k%3)*.08; if(T>=t0) ecrire(c,d,XN(k),95,104*Math.max(1,pop(T,t0,.35)),CRAIE.blanc); });
    if(T>=t9a) ecrire(c,'÷ 9 ?',W/2,230,110*Math.max(1,pop(T,t9a)),CRAIE.petit);
    if(T>=tTrois){ const u=Math.min(1,(T-tTrois)/3); ecrire(c,'en 3 s',W/2-90,355,84,CRAIE.grand);
      c.strokeStyle=CRAIE.grand; c.lineWidth=8; c.beginPath(); c.arc(W/2+160,355,46,0,7); c.stroke();
      c.beginPath(); c.moveTo(W/2+160,355); c.lineTo(W/2+160+40*Math.sin(u*2*Math.PI),355-40*Math.cos(u*2*Math.PI)); c.stroke(); }
    if(T>=tParie){ const z=Math.max(1,pop(T,tParie)); c.save(); c.translate(W/2,480); c.rotate(-.05); ecrire(c,'TU PARIES ?',0,0,108*z,'#ff922b'); c.restore(); }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-tour'), a2=dit('02-regle'), a3=dit('03-question'), qd=dit('02q-question'), rd=dit('02r-reponse');
  const g0=[a0('Salut !'),a0('Moi, c’est Ti Margo,'),a0('le magicien.')];
  const n0=[tN[0],tN[2],'123 456 789.',tN]; a0.jusque('Tu');  /* chaque paquet de chiffres sur son mot */
  const groupes=[
    groupe(acc+.1,tN[0]-.08,352,62,...g0),
    ...suiteDe(tou,60,58,[n0],[a0('Tu paries que je sais'),a0('s’il est divisible par 9,'),a0('en trois secondes ?')]),
    ...suiteDe(reg,60,58,[a1('Mon tour :'),a1('j’additionne les chiffres.')],[a1('1 + 2 + 3… jusqu’à 9 : 45.')],[a1('Et 45 = 9 × 5.')],[a1('Abracadabra :'),a1('divisible par 9 !')]),
    ...suiteDe(q,60,58,[a2('Si la somme des chiffres'),a2('est divisible par 9,'),a2('le nombre aussi.')],[a2('Pareil pour 3.')],[a2('Pas de magie :'),a2('c’est un critère.')]),
    ...suiteDe(f,60,56,[a3('À toi : dans 5 ? 2,'),a3('quel chiffre cacher'),a3('pour obtenir un multiple de 9 ?'),a3('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('2 024 est-il divisible par 3 ?')];
  const tq=(m,n=1)=>mot('02q-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(3); const r1=rd('2 + 0 + 2 + 4 = 8.'), r2=rd('8 n’est pas divisible par 3.');

  poserMiniature(outils,acc+1,'123 456 789<br>divisible par 9 ?'+PARI,
    `<svg width="330" height="210" viewBox="0 0 330 210"><rect x="6" y="6" width="318" height="198" rx="18" fill="#2a1846" stroke="#d4a017" stroke-width="12"/>
     <rect x="105" y="150" width="120" height="14" fill="#111827"/><rect x="128" y="62" width="74" height="92" fill="#111827"/><rect x="128" y="124" width="74" height="16" fill="#c0262d"/>
     ${[[60,60],[270,58],[52,150],[280,150],[165,34]].map(([x,y],k)=>`<text x="${x}" y="${y}" font-size="40" text-anchor="middle" fill="${['#ffd43b','#74c0fc','#8ce99a','#faa2c1','#ffa94d'][k]}">★</text>`).join('')}</svg>`);
  return { clips,FIN,titre:'Le critère de 3 et de 9',ceinture:2,finTitre:tN[0]-.08,groupes,finClip:'04-abonne',
    cuts:[tN[0]-.08,tou,reg,q,r,com,f],
    question:{ qc:'02q-question',rc:'02r-reponse',finR:com,cpt:fin('02q-question')+.1,bonne:1,tBon:.62,
      phrase:phraseQ,pause:pauseQ,
      choix:[['oui',tq('A'),tq('oui')],['non, la somme fait 8',tq('B'),tq('non')],['oui, il est pair',tq('C'),tq('oui',2)]],
      tete:[[r+.1,'Réponse '],[r+.62,'B : non.']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<com, dansF=T>=f, gros=T<tN[0]-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=10.6; cam.y=2.55; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }
      cos.b.visible=true;

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gros){ T>=tMagicien?g.fier():g.ouvre(); }
      else if(T<tou){ T<tParie?g.montre():g.fier(); }
      else if(T<reg){ if(T>=tAbra&&T<tDiv){ const u=T-tAbra; P.gesteD='poing'; P.md.set(.95+.25*Math.sin(u*9),2.75+.2*Math.sin(u*6),.5); P.cd.set(.86,1.95,.15); P.tetZ=-.1; P.jaw=.6; }
        else if(T>=tDiv) g.fier(); else if(T<tAdd+.4) g.reflechit(); else g.montre(); }
      else if(T<q){ if(T>=tPas&&T<tCrit) g.oups(); else if(T>=tCrit) g.fier(); else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<r+.62?g.ouvre():g.pouce(); }
      else if(T<f){ T<mot('03-question','Réponds')?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.3; scene.ry=-.12; cam.x=.2; cam.y=3.02; cam.d=10.4; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
