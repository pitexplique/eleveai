/* ============================================================
   Série Divisibilité 4e, ÉPISODE 06 : LES DEUX PHARES (nuit).
   Ti Margo, gardien de phare : le rouge clignote toutes les 6 s, le vert toutes les 8 s.
   La frise à la craie : 6, 12, 18, 24 et 8, 16, 24. Ensemble à 24 : le plus petit multiple commun.
   Outils (voixDe, enchainer, groupe, suiteDe, poserMiniature, PARI, poserTableau, CRAIE, ecrire,
   pop, tz, fleche, gestes) : films/divisibilite.js. Décor et dessins propres : préfixe « phare ».
   ============================================================ */

/* ---- La nuit sur la mer : ciel étoilé, lune, mer sombre, ponton, deux phares ---- */
function pharePoserNuit(){
  const mer=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0x123a5c})); mer.rotation.x=-Math.PI/2; mer.position.y=-.03; scene3d.add(mer);
  const ciel=new THREE.Mesh(new THREE.PlaneGeometry(220,70),new THREE.MeshBasicMaterial({color:0x0d1b3a})); ciel.position.set(0,22,-16); scene3d.add(ciel);
  const horizon=new THREE.Mesh(new THREE.PlaneGeometry(220,1.4),new THREE.MeshBasicMaterial({color:0x1b4f7a})); horizon.position.set(0,.7,-15.9); scene3d.add(horizon);
  { const et=new THREE.MeshBasicMaterial({color:0xfff5cf}); let gr=13; const al=()=>(gr=(gr*16807)%2147483647)/2147483647;
    for(let i=0;i<110;i++){ const s=new THREE.Mesh(new THREE.CircleGeometry(.03+al()*.05,8),et); s.position.set(-9+al()*18,1.6+al()*12,-15.8); scene3d.add(s); } }
  const lune=new THREE.Mesh(new THREE.CircleGeometry(.75,32),new THREE.MeshBasicMaterial({color:0xfff3bf})); lune.position.set(-4.6,10.2,-15.7); scene3d.add(lune);
  const creux=new THREE.Mesh(new THREE.CircleGeometry(.66,32),new THREE.MeshBasicMaterial({color:0x0d1b3a})); creux.position.set(-4.25,10.4,-15.69); scene3d.add(creux);
  /* reflets de lune sur l'eau */
  for(let k=0;k<7;k++){ const r=new THREE.Mesh(new THREE.PlaneGeometry(1.4-k*.13,.06),new THREE.MeshBasicMaterial({color:0x9ec5e8,transparent:true,opacity:.55-k*.05}));
    r.rotation.x=-Math.PI/2; r.position.set(-3.2+((k*37)%5)*.12,0,-9+k*1.1); scene3d.add(r); }
  /* le ponton du gardien */
  const ponton=new THREE.Group(); scene3d.add(ponton);
  for(let i=-5;i<=5;i++) piece(ponton,new RoundedBoxGeometry(.5,.12,4.6,2,.03),toon(i%2?0x8a5a2b:0x7a4d22),[i*.52,-.04,.6],CONTOUR_FIN);
  /* les deux phares, de part et d'autre de l'ardoise */
  const phares=[];
  for(const [x,c,nom] of [[-2.55,0xe03131,'rouge'],[2.55,0x2f9e44,'vert']]){
    const g=new THREE.Group(); g.position.set(x,0,-7); g.scale.setScalar(.4); scene3d.add(g);  /* la lampe juste sous l'ardoise */
    piece(g,new THREE.CylinderGeometry(1.2,1.4,.6,18),toon(0x495057),[0,.3,0],CONTOUR_SOMBRE);
    piece(g,new THREE.CylinderGeometry(.42,.66,4.2,20),toon(0xf8f9fa),[0,2.7,0],CONTOUR_SOMBRE);
    for(const y of [1.6,2.9,4.1]) piece(g,new THREE.CylinderGeometry(.6-(y-1.6)*.07,.63-(y-1.6)*.07,.42,20),toon(c),[0,y,.01],null);
    piece(g,new THREE.CylinderGeometry(.68,.68,.12,20),toon(0x343a40),[0,4.86,0],CONTOUR_FIN);
    const verre=new THREE.MeshBasicMaterial({color:0x555555});
    const lampe=piece(g,new THREE.CylinderGeometry(.36,.36,.62,20),verre,[0,5.24,0],CONTOUR_FIN);
    piece(g,new THREE.ConeGeometry(.5,.5,20),toon(c),[0,5.8,0],CONTOUR_FIN);
    const halo=new THREE.Mesh(new THREE.CircleGeometry(2.3,32),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:0,depthWrite:false}));
    halo.position.set(0,5.24,.45); g.add(halo);
    const faisceau=new THREE.Mesh(new THREE.PlaneGeometry(6.5,1.3),new THREE.MeshBasicMaterial({color:0xfff3bf,transparent:true,opacity:0,depthWrite:false}));
    faisceau.position.set(x<0?-3.2:3.2,5.24,.3); g.add(faisceau);
    phares.push({c,nom,verre,halo,faisceau});
  }
  return phares;
}

/* L'éclat d'un phare : 1 à l'instant t0, s'éteint en 0,7 s */
const phareEclat=(T,liste)=>liste.reduce((m,t0)=>{ const u=T-t0; return u<0||u>.7?m:Math.max(m,1-u/.7); },0);
function phareAllumer(p,e){ const base=new THREE.Color(0x555555), vif=new THREE.Color(p.c).lerp(new THREE.Color(0xffffff),.35);
  p.verre.color.copy(base.lerp(vif,Math.min(1,e*1.4))); p.halo.material.opacity=.7*e; p.faisceau.material.opacity=.45*e; }
/* Une lampe ronde à la craie, avec son nombre */
function phareRond(c,x,y,r,coul,txt,z=1){ if(z<=0) return; c.fillStyle=coul; c.beginPath(); c.arc(x,y,r*z,0,7); c.fill();
  if(txt) ecrire(c,txt,x,y+3,r*1.1*z,'#24452c'); }

FILMS.probleme=function(outils){
  const {$,panneau}=outils;
  const DUR={'00-accroche':11.555,'01-rythmes':13.805,'02-ensemble':11.7,'02q-question':17.31,'02r-reponse':13.51,'03-question':13.77,'04-abonne':6.045};
  const clips=enchainer(.4,['00-accroche','01-rythmes','02-ensemble','02q-question','02r-reponse','03-question','04-abonne'],DUR,{'02q-question':3.3,'03-question':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ry,en,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['04-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  const phares=pharePoserNuit(); const tab=poserTableau({L:3.8,H:3,x:0,y:4.6,fond:'#1f3a2a'});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;} div#rebours{display:block;} #carte #cq{font-size:52px;}'; document.head.append(css);

  /* Les instants */
  const tMes=mot('00-accroche','Mes'), tClig=mot('00-accroche','clignoter'), tEns0=mot('00-accroche','ensemble'), tParie=mot('00-accroche','paries'), tPlus=mot('00-accroche','plus');
  const tRouge=mot('01-rythmes','rouge'), t6s=mot('01-rythmes','6'), tVert=mot('01-rythmes','vert'), t8s=mot('01-rythmes','8');
  const R6=[6,12,18,24].map(n=>mot('01-rythmes',String(n),n===6?3:1))  /* « 6 secondes » compte deux fois */, V8=[8,16,24].map(n=>mot('01-rythmes',String(n),n===8?2:n===24?2:1));
  const t24=mot('02-ensemble','24'), tEns=mot('02-ensemble','Ensemble'), tPpcm=mot('02-ensemble','multiple'), t24s=mot('02-ensemble','24',2), tPerdu=mot('02-ensemble','Perdu');
  const t9=mot('03-question','9'), t12=mot('03-question','12'), tEns3=mot('03-question','ensemble'), tCombien=mot('03-question','combien'), tRep=mot('03-question','Réponds');

  /* Les éclats des deux phares */
  const ECL_R=[tClig,tEns0,tRouge,...R6,t24,tEns], ECL_V=[tClig,tEns0,tVert,...V8,t24,tEns];

  /* La frise des secondes, de 0 à 24 */
  const X0=86, U=30, YF=320, X=v=>X0+v*U;
  function frise(c){ c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.beginPath(); c.moveTo(X0-20,YF); c.lineTo(X(25.3),YF); c.stroke();
    for(let v=0;v<=24;v++){ const h=v%2?9:15; c.lineWidth=v%2?3:4; c.beginPath(); c.moveTo(X(v),YF-h); c.lineTo(X(v),YF+h); c.stroke(); }
    ecrire(c,'0',X(0),YF+44,44); }
  function saut(c,a,b,coul,haut,u=1){ c.strokeStyle=coul; c.lineWidth=7; c.beginPath();
    for(let s=0;s<=u+1e-6;s+=.04){ const x=X(a)+(X(b)-X(a))*s, y=YF-haut*(70+(b-a)*2)*4*s*(1-s); s?c.lineTo(x,y):c.moveTo(x,y); } c.stroke(); }

  function dessiner(T){ const c=tab.c, W=tab.W; tab.effacer();
    if(T>=com){ /* la question en commentaire : 9 s et 12 s, rien de la réponse */
      if(T>=t9){ phareRond(c,220,140,70,CRAIE.faux,'9',tz(T,t9)); ecrire(c,'secondes',220,255,46,CRAIE.faux); }
      if(T>=t12){ phareRond(c,W-220,140,70,CRAIE.ok,'12',tz(T,t12)); ecrire(c,'secondes',W-220,255,46,CRAIE.ok); }
      if(T>=tEns3) ecrire(c,'ensemble',W/2,340,60*Math.max(1,pop(T,tEns3)),CRAIE.petit);
      if(T>=tCombien) ecrire(c,'Dans combien de secondes ?',W/2,465,62,CRAIE.blanc);
      if(T>=tCombien+.6) ecrire(c,'?',W/2,610,150*Math.max(1,pop(T,tCombien+.6)),CRAIE.petit);
      tab.maj(); return; }
    if(T>=ry){ /* la frise : les éclats du rouge au-dessus, du vert en dessous */
      frise(c);
      if(T>=t6s){ phareRond(c,90,70,34,CRAIE.faux,'',tz(T,t6s)); ecrire(c,'6 s',175,74,58*Math.max(1,pop(T,t6s)),CRAIE.faux,'left'); }
      if(T>=t8s){ phareRond(c,W-245,70,34,CRAIE.ok,'',tz(T,t8s)); ecrire(c,'8 s',W-160,74,58*Math.max(1,pop(T,t8s)),CRAIE.ok,'left'); }
      R6.forEach((t0,k)=>{ if(T<t0) return; const u=Math.min(1,(T-t0)/.35); saut(c,k*6,(k+1)*6,CRAIE.faux,1,u);
        ecrire(c,String((k+1)*6),X((k+1)*6),YF-150,60*Math.max(1,pop(T,t0)),CRAIE.faux); });
      V8.forEach((t0,k)=>{ if(T<t0) return; const u=Math.min(1,(T-t0)/.35); saut(c,k*8,(k+1)*8,CRAIE.ok,-1,u);
        ecrire(c,String((k+1)*8),X((k+1)*8),YF+165,60*Math.max(1,pop(T,t0)),CRAIE.ok); });
      if(T>=t24){ const z=Math.max(1,pop(T,t24)); c.strokeStyle=CRAIE.petit; c.lineWidth=8; c.beginPath(); c.ellipse(X(24),YF,64*z,222*z,0,0,7); c.stroke(); }
      if(T>=tEns) ecrire(c,'ENSEMBLE !',W/2-12,74,50*Math.min(1.2,Math.max(1,pop(T,tEns))),CRAIE.petit);
      if(T>=t24s){ ecrire(c,'plus petit multiple commun :',W/2,560,44,CRAIE.blanc); }
      if(T>=t24s) ecrire(c,'24 secondes',W/2,622,58*Math.min(1.3,Math.max(1,pop(T,t24s))),CRAIE.petit);
      tab.maj(); return; }
    /* l'accroche : les deux lampes, et le pari */
    if(T>=tClig){ phareRond(c,W/2-150,230,90,CRAIE.faux,'',tz(T,tClig)); phareRond(c,W/2+150,230,90,CRAIE.ok,'',tz(T,tClig)); }
    if(T>=tEns0) ecrire(c,'ensemble',W/2,400,70*Math.max(1,pop(T,tEns0)),CRAIE.petit);
    if(T>=tPlus) ecrire(c,'plus jamais ?',W/2,560,96*Math.max(1,pop(T,tPlus)),CRAIE.blanc);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-rythmes'), a2=dit('02-ensemble'), a3=dit('03-question'), qd=dit('02q-question'), rd=dit('02r-reponse');
  const groupes=[
    groupe(acc+.1,tMes-.08,352,62,a0('Salut !'),a0('Moi, c’est Ti Margo,'),a0('gardien de phare.')),
    ...suiteDe(ry,60,58,[a0('Mes deux phares viennent'),a0('de clignoter ensemble.')],[a0('Tu paries qu’ils ne le'),a0('referont plus jamais ?')]),
    ...suiteDe(en,60,58,[a1('Le rouge clignote'),a1('toutes les 6 secondes.')],[a1('Le vert, toutes les 8.')],[a1('Rouge : 6, 12, 18, 24.'),a1('Vert : 8, 16, 24.')]),
    ...suiteDe(q,60,58,[a2('24 !'),a2('Ensemble, à nouveau.')],[a2('Le plus petit multiple commun'),a2('de 6 et 8 : 24 secondes.')],[a2('Perdu, ils recommencent !')]),
    ...suiteDe(f,60,54,[a3('À toi : un phare toutes les 9 secondes,'),a3('un autre toutes les 12.')],[a3('Ils clignotent ensemble.'),a3('Dans combien de secondes, au plus tôt,'),a3('recommencent-ils ?')],[a3('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Un phare toutes les 4 secondes,'),qd('un autre toutes les 6.'),qd('Ensemble au bout de…')];
  const tq=(m,n=1)=>mot('02q-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(3); const r1=rd('Multiples de 4 : 4, 8, 12.'), r2=rd('Multiples de 6 : 6, 12.'), r3=rd('24 marche aussi, mais 12 vient avant.');

  poserMiniature(outils,acc+1,'Mes 2 phares :<br>plus jamais ensemble'+PARI,
    `<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#0d1b3a" stroke="#8a5a2b" stroke-width="12"/>${
      [[95,'#e03131'],[235,'#2f9e44']].map(([x,cl])=>`<circle cx="${x}" cy="66" r="40" fill="${cl}" opacity=".35"/><polygon points="${x-22},226 ${x+22},226 ${x+13},86 ${x-13},86" fill="#f8f9fa"/><rect x="${x-17}" y="120" width="34" height="18" fill="${cl}"/><rect x="${x-19}" y="170" width="38" height="18" fill="${cl}"/><circle cx="${x}" cy="66" r="20" fill="${cl}"/><polygon points="${x-24},48 ${x+24},48 ${x},22" fill="${cl}"/>`).join('')}</svg>`);
  return { clips,FIN,titre:'Se retrouver ensemble',ceinture:2,finTitre:tMes-.08,groupes,finClip:'04-abonne',
    cuts:[tMes-.08,ry,en,q,r,com,f],
    question:{ qc:'02q-question',rc:'02r-reponse',finR:com,cpt:fin('02q-question')+.1,bonne:1,tBon:.64,
      phrase:phraseQ,pause:pauseQ,
      choix:[['10 secondes',tq('A'),tq('10')],['12 secondes',tq('B'),tq('12')],['24 secondes',tq('C'),tq('24')]],
      tete:[[r+.1,'Réponse '],[r+.64,'B : 12.']],reponse:[r1,r2],suite:[r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      phareAllumer(phares[0],window.MINI?0:phareEclat(T,ECL_R)); phareAllumer(phares[1],window.MINI?0:phareEclat(T,ECL_V));
      const dansQ=T>=q&&T<com, dansF=T>=f, gros=T<tMes-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gros) g.ouvre();
      else if(T<ry){ T<tParie?g.montre():g.fier(); }
      else if(T<en){ T<R6[0]-.3?g.montre():(T<V8[0]-.3?g.reflechit():g.montre()); }
      else if(T<q){ if(T>=tPerdu) g.fier(); else if(T>=t24&&T<tPpcm) g.oups(); else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<r+.64?g.ouvre():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
