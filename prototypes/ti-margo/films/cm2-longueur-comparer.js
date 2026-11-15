/* ============================================================
   Série Longueurs CM2 — ÉPISODE 01 : QUEL AVION A GAGNÉ ? Outils : films/cm2-commun.js + cm2-longueur.js.
   Concours d'avions en papier : mon avion 3,8 m, celui de ma cousine 3,15 m. « 15, c'est plus que 8 : j'ai perdu… »
   3,8 = 3,80 : 80 cm contre 15 cm, mon avion est allé 65 cm plus loin (B). J'avais gagné sans le savoir.
   Commentaire : 2,6 m ou 2,45 m, lequel est le plus long ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 ; les deux vols à l'échelle (1,9 px par cm), depuis la ligne de lancer (x = 90) ;
   le raisonnement en haut de l'ardoise (Ti Margo ne cache que le tout bas, à gauche du milieu) */

/* Les marques des cues, MOT PAR MOT : un nombre dit en plusieurs mots (« trois virgule huit », « quatre-vingts centimètres »)
   a une marque par mot dit, toutes au même texte. On n'en garde qu'une par mot ÉCRIT : le nombre à la fin de son dernier mot
   (jamais avant que la voix l'ait dit en entier), l'unité à la sienne. Renvoie de quoi remettre les marques d'origine
   (la bouche de Ti Margo, dans le socle, bouge sur tous les mots dits). */
function lgMotParMot(){ const CL=(window.CUES||{})[VIDEO]||{}, ORIG={};
  for(const k in CL){ ORIG[k]=CL[k]; const l=CL[k], res=[];
    for(let i=0;i<l.length;){ let j=i; while(j+1<l.length&&l[j+1][1]===l[i][1]) j++;
      const W=l[i][1].trim().split(/\s+/);
      if(W.length===1) res.push([l[j][0],W[0]]);
      else { res.push([l[Math.max(i,j-1)][0],W[0]]); res.push([l[j][0],W.slice(1).join(' ')]); }
      i=j+1; }
    CL[k]=res; }
  return ()=>{ for(const k in ORIG) CL[k]=ORIG[k]; }; }
/* Un texte qui s'écrit au fil de la voix : étapes [[instant, texte], …] ; calé à gauche en x */
function lgProg(c,etapes,T,x,y,taille,coul,align='left'){ let s=''; for(const [t,e] of etapes) if(T>=t) s=e; if(!s) return;
  if(align==='center'){ c.font=`800 ${taille}px "Segoe UI"`; const W=c.measureText(etapes[etapes.length-1][1]).width; ecrire(c,s,x-W/2,y,taille,coul,'left'); }
  else ecrire(c,s,x,y,taille,coul,'left'); }

FILMS['comparer']=function(outils){
  const remettre=lgMotParMot();
  const DUR={'00-accroche':13.18,'01-cousine':3.66,'02-question':13.11,'02b-reponse':12.01,'03-ouf':3.42,'04-commentaire':8.29,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,cou,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tMon=mot('00-accroche','Mon'), tAvion=mot('00-accroche','avion'), t38=mot('00-accroche','3,8'), tM1=mot('00-accroche','mètres'),
        tCousine=mot('00-accroche','cousine'), t315=mot('00-accroche','3,15'), tM2=mot('00-accroche','mètres',2),
        t15=mot('00-accroche','15'), tPlus=mot('00-accroche','plus'), t8=mot('00-accroche','8'), tPerdu=mot('00-accroche','perdu');
  const tSourit=mot('01-cousine','sourit'), tCompare=mot('01-cousine','compare');
  const tB=mot('02b-reponse','B');
  const tGagne=mot('03-ouf','gagné'), tSavais=mot('03-ouf','savais');
  const t26=mot('04-commentaire','2,6'), tC26=mot('04-commentaire','mètres'), tOu=mot('04-commentaire','ou'),
        t245=mot('04-commentaire','2,45'), tC245=mot('04-commentaire','mètres',2), tLequel=mot('04-commentaire','lequel'),
        tRep=mot('04-commentaire','Réponds');
  const finTitre=tMon-.08;

  /* Les deux vols, à l'échelle : 1,9 px par cm depuis la ligne de lancer ; 380 cm = 722 px, 315 cm = 598 px */
  const X0=90, PX=1.7, YM=300, YN=520, YH=100, EP=22;
  const deroule=(T,t,d=.8)=>T<t?0:Math.min(1,(T-t)/d);
  const lisse01=u=>u<=0?0:(u>=1?1:u*u*(3-2*u));
  /* un avion en papier (pointe vers la droite), centré en (x, y), penché de a */
  function avion(c,x,y,a,coul,k=1){ c.save(); c.translate(x,y); c.rotate(a); c.scale(k,k); c.lineJoin='round';
    c.fillStyle='#f8f9fa'; c.strokeStyle=coul; c.lineWidth=4;
    c.beginPath(); c.moveTo(40,0); c.lineTo(-34,-22); c.lineTo(-20,0); c.lineTo(-34,16); c.closePath(); c.fill(); c.stroke();
    c.fillStyle=coul; c.beginPath(); c.moveTo(40,0); c.lineTo(-20,0); c.lineTo(-30,10); c.closePath(); c.fill(); c.restore(); }
  /* un vol : l'avion part de la main (un peu au-dessus du sol), monte, retombe au bout de cm ; la trace en pointillé
     et le ruban de mesure au sol suivent l'avion (u = 0 → 1 entre t0 et t1) */
  function vol(c,Y,cm,coul,T,t0,t1){ if(T<t0) return; const L=cm*PX, u=lisse01((T-t0)/(t1-t0));
    const pt=v=>[X0+L*v,Y-18-34*(1-v)-110*Math.sin(Math.PI*v)];
    c.strokeStyle=CRAIE.gris; c.lineWidth=4; c.setLineDash([12,12]); c.beginPath();
    for(let i=0;i<=40;i++){ const v=u*i/40, [x,y]=pt(v); i?c.lineTo(x,y):c.moveTo(x,y); } c.stroke(); c.setLineDash([]);
    rubanCraie(c,X0,Y,L,coul,u,EP);
    const [x,y]=pt(u), [x2,y2]=pt(Math.min(1,u+.02)), a=u>=1?.12:Math.atan2(y2-y,x2-x);
    avion(c,x,y,a,coul); }
  /* une coupe de champion, posée en (x, y = le bas) */
  function coupe(c,x,y,z){ if(z<=0) return; const k=Math.min(1.12,z); c.save(); c.translate(x,y); c.scale(k,k);
    c.fillStyle='#ffd43b'; c.strokeStyle='#f8f9fa'; c.lineWidth=4; c.lineJoin='round';
    c.beginPath(); c.moveTo(-40,-100); c.lineTo(40,-100); c.quadraticCurveTo(38,-40,0,-34); c.quadraticCurveTo(-38,-40,-40,-100); c.closePath(); c.fill(); c.stroke();
    c.lineWidth=6; c.beginPath(); c.arc(-44,-80,16,Math.PI*.5,Math.PI*1.5); c.stroke(); c.beginPath(); c.arc(44,-80,16,-Math.PI*.5,Math.PI*.5); c.stroke();
    c.lineWidth=4; c.fillRect(-7,-34,14,20); c.strokeRect(-7,-34,14,20); c.fillRect(-28,-14,56,14); c.strokeRect(-28,-14,56,14); c.restore(); }
  /* une pelote de ficelle (le défi : on ne donne pas la réponse) */
  function pelote(c,x,y,R,coul,z){ if(z<=0) return; const k=Math.min(1.12,z); c.strokeStyle=coul; c.lineWidth=11; c.lineCap='round';
    for(let i=0;i<4;i++){ c.beginPath(); c.arc(x,y,R*k*(1-i*.22),0,Math.PI*2); c.stroke(); }
    c.beginPath(); c.moveTo(x+R*k,y); c.quadraticCurveTo(x+R*k*1.3,y+R*k*.9,x+R*k*1.75,y+R*k*.7); c.stroke(); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 2,6 m ou 2,45 m, en pelotes */
      if(T>=t26) pelote(c,250,330,120,RUBAN3,zoom(T,t26,.4));
      lgProg(c,[[t26,'2,6'],[tC26,'2,6 m']],T,250,560,76,CRAIE.jaune,'center');
      if(T>=t245) pelote(c,660,350,100,RUBAN4,zoom(T,t245,.4));
      lgProg(c,[[t245,'2,45'],[tC245,'2,45 m']],T,670,560,76,CRAIE.jaune,'center');
      if(T>=tOu) ecrire(c,'ou',455,560,54*zoom(T,tOu,.4),CRAIE.gris);
      if(T>=tLequel) ecrire(c,'?',950,330,200*zoom(T,tLequel,.6),CRAIE.jaune);
      tab.maj(); return; }
    const rep=T>=ouf;
    /* la ligne de lancer */
    c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.setLineDash([16,12]); c.beginPath(); c.moveTo(X0,200); c.lineTo(X0,600); c.stroke(); c.setLineDash([]);
    /* mon vol (380 cm) et celui de ma cousine (315 cm) ; l'étiquette s'écrit au bout du vol, au fil de la voix */
    if(T>=tAvion) ecrire(c,'mon avion',X0+16,YM+52,44*zoom(T,tAvion,.4),CRAIE.gris,'left');
    vol(c,YM,380,RUBAN,T,tAvion,tM1);
    if(rep) ecrire(c,'3,80 m',X0+380*PX+24,YM,58,CRAIE.ok,'left');
    else lgProg(c,[[t38,'3,8'],[tM1,'3,8 m']],T,X0+380*PX+24,YM,58,CRAIE.jaune);
    if(T>=tCousine) ecrire(c,'ma cousine',X0+16,YN+52,44*zoom(T,tCousine,.4),CRAIE.gris,'left');
    vol(c,YN,315,RUBAN2,T,tCousine,tM2);
    lgProg(c,[[t315,'3,15'],[tM2,'3,15 m']],T,X0+315*PX+24,YN,58,CRAIE.jaune);
    if(T<cou){ /* « 15, c'est plus que 8 : j'ai perdu… » */
      if(T>=t15) ecrire(c,'15',200,YH,100*zoom(T,t15,.4),CRAIE.faux);
      if(T>=tPlus) ecrire(c,'>',320,YH,90*zoom(T,tPlus,.4),CRAIE.blanc);
      if(T>=t8) ecrire(c,'8',430,YH,100*zoom(T,t8,.4),CRAIE.faux);
      if(T>=tPerdu) ecrire(c,"j'ai perdu…",760,YH,60*zoom(T,tPerdu,.4),CRAIE.gris);
    } else if(!rep){ /* « attends, compare mieux ! » */
      if(T>=tCompare) ecrire(c,'compare mieux !',528,YH,76*zoom(T,tCompare,.4),CRAIE.faux);
    } else { /* la réponse : 3,80 m > 3,15 m ; 80 cm contre 15 cm : 65 cm de plus */
      const xa=X0+315*PX, xb=X0+380*PX;
      ecrire(c,'3,80 m',290,YH,74,CRAIE.ok); ecrire(c,'>',528,YH,74,CRAIE.blanc); ecrire(c,'3,15 m',766,YH,74,CRAIE.jaune);
      c.strokeStyle=CRAIE.gris; c.lineWidth=4; c.setLineDash([10,10]); c.beginPath(); c.moveTo(xa,YN-24); c.lineTo(xa,YM+20); c.stroke(); c.setLineDash([]);
      flecheLongueur(c,xa,xb,YM+60,CRAIE.ok,deroule(T,ouf,.5),6);
      ecrire(c,'+ 65 cm',870,YM+75,48*zoom(T,ouf,.4),CRAIE.ok);
      if(T>=tGagne) coupe(c,960,YM-70,zoom(T,tGagne,.5)); }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-cousine'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0("Concours d'avions"),a0('en papier !')),
    ...suiteDe(cou,60,60,[a0('Mon avion : 3,8 mètres.')],[a0('Celui de ma cousine :'),a0('3,15 mètres.')],
      [a0("15, c'est plus que 8 :"),a0("j'ai perdu…")]),
    ...suiteDe(q,60,62,[a1('Ma cousine sourit :')],[a1('attends,'),a1('compare mieux !')]),
    ...suiteDe(com,60,62,[a3("J'avais gagné…")],[a3('et je ne le savais'),a3('même pas !')]),
    ...suiteDe(f,60,60,[a4('À toi : 2,6 mètres'),a4('ou 2,45 mètres,')],[a4('lequel est'),a4('le plus long ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Quel avion est allé'),qd('le plus loin ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd("3,8, c'est 3,80."), r2=rd('80 centimètres'), r3=rd('contre 15 :'), r4=rd('mon avion est allé'), r5=rd('65 centimètres plus loin !');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<line x1="30" y1="50" x2="30" y2="215" stroke="#f8f9fa" stroke-width="5" stroke-dasharray="12 9"/>`+
    `<rect x="30" y="98" width="160" height="20" rx="10" fill="${RUBAN}" stroke="#f8f9fa" stroke-width="3"/>`+
    `<polygon points="214,96 178,82 184,96 178,106" fill="#f8f9fa" stroke="${RUBAN}" stroke-width="3"/>`+
    `<rect x="30" y="178" width="133" height="20" rx="10" fill="${RUBAN2}" stroke="#f8f9fa" stroke-width="3"/>`+
    `<polygon points="187,176 151,162 157,176 151,186" fill="#f8f9fa" stroke="${RUBAN2}" stroke-width="3"/>`+
    `<text x="275" y="190" font-family="Segoe UI" font-weight="800" font-size="150" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'3,8 m ou 3,15 m :<br>qui a gagné ?'+PARI,mini);
  remettre();
  return { clips,FIN,titre:'Quel avion a gagné ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,cou,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['celui de ma cousine',tq('A'),tq('celui')],['le mien',tq('B'),tq('mien')],["c'est pareil",tq('C'),tq("c'est")]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2,r3],suite:[r4,r5] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<cou){ T<t15?g.montre():g.oups(); }
      else if(T<q){ T<tCompare?g.reflechit():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.pouce(); }
      else if(T<com){ T<tSavais?g.fier():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
