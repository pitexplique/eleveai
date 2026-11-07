/* Série Nombres décimaux 6e, épisode 02 : LE CODE DU COFFRE-FORT. Le code = dixièmes, centièmes, millièmes
   de 5,762. Ti Margo tape 5, 7, 6 : raté, le 5 est le chiffre des unités. Le bon code : 7, 6, 2.
   Chargé après films/decimaux.js : voixDe, enchainer, groupe, suiteDe, poserTableau, ecrire, pop, cases,
   CRAIE, RANGS4, poserClasse, gestes, poserMiniature, PARI viennent de là. */

/* ---- Le coffre-fort : caisse, porte sur charnière (à gauche), roue, petit écran du code ---- */
function poserCoffre({x=1.15,z=.25,s=1}={}){
  const g=new THREE.Group(); g.position.set(x,0,z); g.scale.setScalar(s); g.rotation.y=-.18; scene3d.add(g);
  const gris=toon(0x64748b), clair=toon(0x94a3b8), fonce=toon(0x334155);
  piece(g,new RoundedBoxGeometry(1.3,1.4,1.1,3,.06),gris,[0,.78,0],CONTOUR_SOMBRE);
  for(const sx of [-1,1]) piece(g,new RoundedBoxGeometry(.22,.1,.9,2,.03),fonce,[sx*.48,.04,0],CONTOUR_SOMBRE);
  /* l'intérieur, vu quand la porte s'ouvre */
  const fond=new THREE.Mesh(new THREE.PlaneGeometry(1.08,1.18),new THREE.MeshBasicMaterial({color:0x111827})); fond.position.set(0,.78,.556); g.add(fond);
  /* la porte : son pivot est la charnière, à gauche */
  const porte=new THREE.Group(); porte.position.set(-.56,.78,.6); g.add(porte);
  piece(porte,new RoundedBoxGeometry(1.12,1.22,.08,2,.03),clair,[.56,0,0],CONTOUR_SOMBRE);
  const roue=piece(porte,new THREE.CylinderGeometry(.2,.2,.08,24),fonce,[.56,-.22,.07],CONTOUR_SOMBRE); roue.rotation.x=Math.PI/2;
  for(let k=0;k<3;k++){ const b=piece(porte,new THREE.BoxGeometry(.5,.05,.05),fonce,[.56,-.22,.12],null); b.rotation.z=k*Math.PI/3; b.userData.rayon=k; }
  const rayons=porte.children.filter(m=>m.userData.rayon!==undefined);
  const cv=document.createElement('canvas'); cv.width=384; cv.height=128; const c=cv.getContext('2d');
  const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace;
  const ecran=new THREE.Mesh(new THREE.PlaneGeometry(.84,.28),new THREE.MeshBasicMaterial({map:tx})); ecran.position.set(.56,.27,.05); porte.add(ecran);
  /* le petit coffre caché dedans */
  const petit=new THREE.Group(); petit.position.set(0,.5,.62); g.add(petit);
  piece(petit,new RoundedBoxGeometry(.6,.62,.5,2,.04),toon(0xf59f00),[0,0,0],CONTOUR_SOMBRE);
  piece(petit,new THREE.CylinderGeometry(.09,.09,.06,18),fonce,[.1,-.06,.27],CONTOUR_SOMBRE).rotation.x=Math.PI/2;
  piece(petit,new RoundedBoxGeometry(.36,.12,.03,2,.02),toon(0x1f2937),[0,.14,.26],null);
  petit.scale.setScalar(0);
  return {g,porte,rayons,petit,
    afficher(txt,coul){ c.fillStyle='#052e16'; c.fillRect(0,0,384,128); c.strokeStyle='#2f9e44'; c.lineWidth=8; c.strokeRect(4,4,376,120);
      c.fillStyle=coul||'#8ce99a'; c.font='800 86px "Segoe UI"'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(txt,192,68); tx.needsUpdate=true; }};
}

FILMS['rang']=function(outils){
  const {$,panneau}=outils;
  const DUR={'00-accroche':16.64,'01-rate':7.17,'02-question':11.93,'02b-reponse':10.05,'03-ouvert':5.96,'04-commentaire':10.23,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,rat,q,r,ouv,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];
  /* l'instant du premier mot `m` dit après l'instant t (les nombres arrivent en plusieurs marques) */
  const CL=(window.CUES||{})[VIDEO]||{}, norme=s=>s.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,'');
  const apres=(clip,m,t)=>{ for(const [u,w] of CL[clip]) if(A[clip]+u>t+.01&&w.split(/\s+/).some(x=>norme(x)===norme(m))) return A[clip]+u; throw new Error(`${clip} : « ${m} » introuvable après ${t}`); };

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  const cof=poserCoffre();
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  /* Les instants */
  const tCoffre=mot('00-accroche','coffre'), tCode=mot('00-accroche','code'), tDix=mot('00-accroche','dixièmes'), tCen=mot('00-accroche','centièmes'),
        tMil=mot('00-accroche','millièmes'), tNb=mot('00-accroche','5'), tTape=mot('00-accroche','tape'), tParie=mot('00-accroche','paries');
  const k5=apres('00-accroche','5',tTape), k7=apres('00-accroche','7',k5), k6=apres('00-accroche','6',k7);
  const tBip=mot('01-rate','Bip'), tRate=mot('01-rate','Raté'), tLe5=mot('01-rate','5'), tVirg=mot('01-rate','virgule'), tUni=mot('01-rate','unités');
  const tClac=mot('03-ouvert','Clac'), tDedans=mot('03-ouvert','Dedans'), tAutre=mot('03-ouvert','autre');
  const tCNb=mot('04-commentaire','806'), tCD=mot('04-commentaire','dixièmes'), tCC=mot('04-commentaire','centièmes'), tCM=mot('04-commentaire','millièmes'),
        tRep=mot('04-commentaire','Réponds');
  const gros=T=>T<tCode-.1;

  /* L'ardoise */
  function dessiner(T){ const c=tab.c, W=tab.W; tab.effacer();
    if(T>=com){ /* le défi : le nombre, et trois cases à trouver (la réponse reste à l'élève) */
      if(T>=tCNb) ecrire(c,'806,415',W/2,105,140*Math.max(1,pop(T,tCNb)));
      else ecrire(c,'Nouveau code ?',W/2,105,96,CRAIE.d);
      const noms=[['dixièmes','d',tCD],['centièmes','c',tCC],['millièmes','m',tCM]];
      noms.forEach(([n,k,t],i)=>{ if(T<t) return; const x=W/2+(i-1)*330, z=Math.max(1,pop(T,t));
        c.strokeStyle=CRAIE[k]; c.lineWidth=8; c.setLineDash([22,14]); c.strokeRect(x-115,235,230,200); c.setLineDash([]);
        ecrire(c,'?',x,335,120*z,CRAIE[k]); ecrire(c,n,x,485,52,CRAIE[k]); });
      if(T>=tRep) ecrire(c,'Code = ?',W/2,610,76*Math.max(1,pop(T,tRep)),CRAIE.d);
      tab.maj(); return; }
    if(T>=rat){ /* les cases : 5 aux unités, puis 7, 6, 2 après la virgule */
      ecrire(c,'5,762',W/2,90,104);
      const tPose=rat+.15, bon=T>=r;
      cases(c,RANGS4,48,250,240,210,i=>{
        if(i===0) return {chiffre:5,z:T>=tLe5?Math.max(1,pop(T,tLe5)):(T>=tPose?1:0),coul:bon?'#adb5bd':CRAIE.u,cadre:T>=tUni&&!bon?CRAIE.faux:null};
        return {chiffre:[7,6,2][i-1],z:T>=tPose?1:0,cadre:bon?CRAIE.ok:null}; },40);
      if(T>=tUni&&!bon){ const u=Math.min(1,(T-tUni)/.4); c.strokeStyle=CRAIE.faux; c.lineWidth=10; c.beginPath(); c.arc(48+120,355,120*(.6+.4*u),0,7); c.stroke();
        ecrire(c,'unités !',48+120,560,58,CRAIE.faux); }
      if(T>=tVirg&&T<tVirg+.8&&!bon){ const z=pop(T,tVirg,.8); c.fillStyle=CRAIE.virgule; c.beginPath(); c.arc(48+240,250+210-26,15+20*z,0,7); c.fill(); }
      if(bon) ecrire(c,'Code : 7, 6, 2',W/2,600,76,CRAIE.ok);
      tab.maj(); return; }
    /* l'accroche : le nombre, et les chiffres que Ti Margo tape */
    if(T>=tNb){ const z=Math.max(1,pop(T,tNb)); ecrire(c,'5,762',W/2,260,230*z);
      /* sous chaque chiffre tapé, un trait : il a pris le 5, avant la virgule */
      c.font='800 230px "Segoe UI"'; const s='5,762', x0=W/2-c.measureText(s).width/2, mx=k=>x0+c.measureText(s.slice(0,k)).width+c.measureText(s[k]).width/2;
      for(const [t,k] of [[k5,0],[k7,2],[k6,3]]) if(T>=t){ const x=mx(k); c.strokeStyle=CRAIE.d; c.lineWidth=14; c.lineCap='round'; c.beginPath(); c.moveTo(x-50,400); c.lineTo(x+50,400); c.stroke(); }
    }
    if(T<tDix) ecrire(c,'Le code ?',W/2,300,130,CRAIE.d);
    if(T>=tDix&&T<tNb){ [['dixièmes','d',tDix],['centièmes','c',tCen],['millièmes','m',tMil]].forEach(([n,k,t],i)=>{ if(T>=t) ecrire(c,n,W/2,140+i*150,90*Math.max(1,pop(T,t)),CRAIE[k]); }); }
    if(T>=tTape){ const tape=[[k5,'5'],[k7,'7'],[k6,'6']].filter(([t])=>T>=t).map(x=>x[1]).join(' '); ecrire(c,'Je tape : '+tape,W/2,560,76,CRAIE.blanc); }
    tab.maj();
  }
  /* L'écran du coffre */
  function ecranCoffre(T){
    if(T>=tClac||T>=r+1.2&&T<ouv) cof.afficher('7 6 2','#8ce99a');
    else if(T>=tBip&&T<q) cof.afficher(T<tBip+1.2&&Math.floor((T-tBip)*5)%2?'':'✗ ✗ ✗','#ff8787');
    else { const tape=[[k5,'5'],[k7,'7'],[k6,'6']].filter(([t])=>T>=t).map(x=>x[1]); cof.afficher(tape.length?tape.join(' '):'_ _ _'); }
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-rate'), a3=dit('03-ouvert'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const salut=[a0('Salut !'),a0('Ce coffre cache un trésor.')];
  const groupes=[
    groupe(acc+.1,tCode-.1,352,62,...salut),
    ...suiteDe(rat,60,56,[a0('Le code : les chiffres'),a0('des dixièmes, des centièmes'),a0('et des millièmes de 5,762.')],[a0('Je tape 5, 7, 6 !')],[a0('Tu paries que ça s’ouvre ?')]),
    ...suiteDe(q,60,60,[a1('Bip ! Raté.')],[a1('Le 5 est avant la virgule :'),a1('c’est le chiffre des unités.')]),
    ...suiteDe(com,60,62,[a3('Clac !'),a3('Le coffre s’ouvre.')],[a3('Dedans…'),a3('un autre coffre !')]),
    ...suiteDe(f,60,58,[a4('À toi : le nouveau code,'),a4('ce sont les dixièmes,')],[a4('les centièmes et les millièmes'),a4('de 806,415.')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Quel est le bon code ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Après la virgule :'), r2=rd('7 dixièmes, 6 centièmes,'), r3=rd('2 millièmes.'), r4=rd('Le code est 7, 6, 2.');

  poserMiniature(outils,acc+1,'Le code :<br>5, 7, 6 ?'+PARI,
    `<svg width="380" height="210" viewBox="0 0 380 210"><rect x="6" y="6" width="368" height="198" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/><text x="190" y="140" font-family="Segoe UI" font-weight="800" font-size="104" fill="#f8f9fa" text-anchor="middle">5,762</text></svg>`);
  return { clips,FIN,titre:'Le code du coffre-fort',ceinture:0,finTitre:tCode-.1,groupes,finClip:'05-abonne',
    cuts:[tCode-.1,rat,q,r,ouv,com,f],
    tics:[{t:k5,f:1320},{t:k7,f:1320},{t:k6,f:1320},{t:tBip,f:330},{t:tClac,f:160}],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouv,cpt:fin('02-question')+.1,bonne:0,tBon:.66,
      phrase:phraseQ,pause:pauseQ,
      choix:[['7, 6, 2',tq('A'),tq('7',1)],['5, 7, 6',tq('B'),tq('5',1)],['2, 6, 7',tq('C'),tq('2',2)]],
      tete:[[r+.1,'Réponse '],[r+.66,'A !']],reponse:[r1,r2,r3],suite:[r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T); ecranCoffre(T);
      const dansQ=T>=q&&T<ouv, dansF=T>=f, gr=gros(T);
      tab.g.visible=!gr&&!dansQ&&!dansF&&!window.MINI;
      cof.g.visible=!dansQ&&!dansF;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gr){ scene.x=-.62; cam.d=9.8; cam.y=1.9; cam.x=.25; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }
      /* la porte s'ouvre au « Clac », la roue tourne avant ; le petit coffre sort à « autre » */
      const uo=T>=tClac?lisse(Math.min(1,(T-tClac)/.7)):0; cof.porte.rotation.y=-1.85*uo;
      const tour=T>=tClac-.6&&T<tClac?(T-tClac+.6)*5:0; cof.rayons.forEach(b=>b.rotation.z=b.userData.rayon*Math.PI/3+tour);
      const up=(T-tAutre)/.5; cof.petit.scale.setScalar(up<0?0:(up<1?Math.max(.001,lisse(up)*(1+.25*Math.sin(up*Math.PI))):1));
      if(T>=tBip&&T<tBip+.6) cof.g.position.x=1.15+Math.sin((T-tBip)*60)*.03; else cof.g.position.x=1.15;

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gr){ T<tCoffre+.9?g.montre():g.ouvre(); }
      else if(T<rat){ if(T<tTape) g.reflechit(); else if(T<tParie) g.montre(); else g.fier(); }
      else if(T<q){ if(T<tLe5){ g.oups(); scene.ry=-.12+.3*lisse((T-tBip)/.35); } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouv){ T<r+.66?g.ouvre():g.pouce(); }
      else if(T<com){ if(T>=tDedans) { g.oups(); } else if(T>=tClac) g.fier(); else g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); cof.g.visible=false; }
    } };
};
