/* ============================================================
   Série Longueurs CM1 — ÉPISODE 02 : LA FICELLE DU CERF-VOLANT. Outils : films/cm1-commun.js + cm1-longueur.js.
   Il me faut 2 m de ficelle ; elle se vend au centimètre : « je demande 2 cm ! » Le vendeur donne un bout grand comme mon doigt.
   1 m = 100 cm, donc 2 m = 200 cm (C). Mon cerf-volant vole enfin… et moi avec !
   Commentaire : l'école est à 1 km de chez moi. Combien de mètres ?
   ============================================================ */
FILMS['convertir']=function(outils){
  fusionnerNombres();
  /* « 200 centimètres » a 3 marques identiques : on n'en garde que 2 (une par mot écrit) */
  { const CL=window.CUES[VIDEO]; for(const k in CL){ const res=[]; let n=0;
      for(const e of CL[k]){ const der=res[res.length-1]; n=der&&der[1]===e[1]?n+1:1; if(n<=e[1].trim().split(/\s+/).length) res.push(e); }
      CL[k]=res; } }
  const DUR={'00-accroche':11.39,'01-unite':5.08,'02-question':14.88,'02b-reponse':8.38,'03-ouf':3.5,'04-commentaire':7.92,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,uni,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tCerf=mot('00-accroche','cerf-volant'), tIl=mot('00-accroche','il'), t2m=mot('00-accroche','2'), tFic=mot('00-accroche','ficelle'),
        tMag=mot('00-accroche','magasin'), tCm=mot('00-accroche','centimètre'), tDemande=mot('00-accroche','demande'), t2cm=mot('00-accroche','centimètres');
  const tDonne=mot('01-unite','donne'), tPetit=mot('01-unite','petit'), tDoigt=mot('01-unite','doigt');
  const tVole=mot('03-ouf','vole'), tMoiO=mot('03-ouf','moi');
  const tEcole=mot('04-commentaire',"l'école"), t1km=mot('04-commentaire','1'), tChez=mot('04-commentaire','chez'),
        tCombien=mot('04-commentaire','Combien'), tMetres=mot('04-commentaire','mètres'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tIl-.08;

  /* À l'échelle : 4,2 px par cm ; 2 m de ficelle = 840 px, 2 cm = 8,4 px (le petit bout) */
  const X0=100, PX=4.2, YA=380, YB=515, YP=600;
  const deroule=(T,t,d=.8)=>T<t?0:Math.min(1,(T-t)/d);
  function cerfVolant(c,x,y,s,z){ if(z<=0) return; const k=Math.min(1.12,z)*s; c.lineJoin='round';
    const H=[x,y-70*k], D=[x+52*k,y-10*k], B=[x,y+80*k], G=[x-52*k,y-10*k], O=[x,y-10*k];
    for(const [p1,p2,coul] of [[H,D,'#e03131'],[D,B,'#1971c2'],[B,G,'#e03131'],[G,H,'#1971c2']]){
      c.fillStyle=coul; c.beginPath(); c.moveTo(...O); c.lineTo(...p1); c.lineTo(...p2); c.closePath(); c.fill(); }
    c.strokeStyle='#f8f9fa'; c.lineWidth=4; c.beginPath(); c.moveTo(...H); c.lineTo(...D); c.lineTo(...B); c.lineTo(...G); c.closePath(); c.stroke();
    c.beginPath(); c.moveTo(...H); c.lineTo(...B); c.moveTo(...G); c.lineTo(...D); c.stroke();
    c.strokeStyle=CRAIE.blanc; c.lineWidth=3; c.beginPath(); c.moveTo(...B); c.quadraticCurveTo(x+30*k,y+130*k,x-10*k,y+170*k); c.stroke();
    for(const [bx,by] of [[x+14*k,y+118*k],[x+4*k,y+150*k]]){ c.fillStyle=RUBAN3; c.beginPath(); c.moveTo(bx-12*k,by-8*k); c.lineTo(bx+12*k,by+8*k); c.lineTo(bx+12*k,by-8*k); c.lineTo(bx-12*k,by+8*k); c.closePath(); c.fill(); } }
  /* un doigt, debout (x, y = le bas) */
  function doigt(c,x,y,z){ if(z<=0) return; const k=Math.min(1.12,z), w=46*k, h=120*k;
    c.fillStyle='#f4c9a0'; c.strokeStyle='#f8f9fa'; c.lineWidth=4; c.beginPath(); c.roundRect(x-w/2,y-h,w,h,[w/2,w/2,8,8]); c.fill(); c.stroke();
    c.fillStyle='#fde2e4'; c.beginPath(); c.roundRect(x-w*.3,y-h+8*k,w*.6,30*k,10*k); c.fill(); }
  function maison(c,x,y,z){ if(z<=0) return; const k=Math.min(1.12,z); c.save(); c.translate(x,y); c.scale(k,k);
    c.fillStyle='#ffd8a8'; c.strokeStyle='#f8f9fa'; c.lineWidth=4; c.fillRect(-70,-110,140,110); c.strokeRect(-70,-110,140,110);
    c.fillStyle='#e03131'; c.beginPath(); c.moveTo(-90,-108); c.lineTo(0,-185); c.lineTo(90,-108); c.closePath(); c.fill(); c.stroke();
    c.fillStyle='#8a5a2b'; c.fillRect(-18,-60,36,60); c.fillStyle='#74c0fc'; c.fillRect(28,-90,30,28); c.restore(); }
  function ecole(c,x,y,z){ if(z<=0) return; const k=Math.min(1.12,z); c.save(); c.translate(x,y); c.scale(k,k);
    c.fillStyle='#ffe066'; c.strokeStyle='#f8f9fa'; c.lineWidth=4; c.fillRect(-120,-150,240,150); c.strokeRect(-120,-150,240,150);
    c.fillStyle='#1971c2'; c.beginPath(); c.moveTo(-135,-148); c.lineTo(0,-205); c.lineTo(135,-148); c.closePath(); c.fill(); c.stroke();
    c.fillStyle='#74c0fc'; for(const wx of [-95,-45,25,75]) c.fillRect(wx,-120,32,32);
    c.fillStyle='#8a5a2b'; c.fillRect(-22,-70,44,70);
    c.strokeStyle='#f8f9fa'; c.beginPath(); c.moveTo(0,-205); c.lineTo(0,-260); c.stroke(); c.fillStyle='#e03131'; c.fillRect(0,-260,40,24); c.restore(); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : l'école est à 1 km de chez moi */
      if(T>=tEcole) ecole(c,890,575,zoom(T,tEcole,.4));
      if(T>=tChez) maison(c,150,575,zoom(T,tChez,.4));
      if(T>=t1km){ const u=deroule(T,t1km,.8); c.strokeStyle=CRAIE.blanc; c.lineWidth=8; c.setLineDash([22,16]); c.beginPath(); c.moveTo(240,545); c.lineTo(240+(520)*u,545); c.stroke(); c.setLineDash([]);
        ecrire(c,'1 km',500,480,80*zoom(T,t1km,.4),CRAIE.jaune); }
      if(T>=tCombien) ecrire(c,'1 km =',400,190,96*zoom(T,tCombien,.4),CRAIE.blanc);
      if(T>=tMetres) ecrire(c,'? m',680,190,96*zoom(T,tMetres,.4),CRAIE.jaune);
      tab.maj(); return; }
    const rep=T>=ouf;
    /* le cerf-volant, en haut à gauche ; il vole à la fin */
    const vol=rep&&T>=tVole?Math.min(1,(T-tVole)/1.2):0;
    if(T>=tCerf) cerfVolant(c,130+60*vol,135-20*vol+(rep?Math.sin(T*3)*8*vol:0),.8,zoom(T,tCerf,.4));
    /* la ligne A : il me faut 2 m de ficelle (à l'échelle) */
    if(T>=t2m){ ecrire(c,'il me faut',X0,YA-62,50,CRAIE.gris,'left'); }
    rubanCraie(c,X0,YA,200*PX,RUBAN3,deroule(T,t2m,.9),30);
    if(T>=t2m) ecrire(c,rep?'2 m = 200 cm':'2 m',700,YA-62,(rep?62:72)*(rep?zoom(T,ouf,.4):zoom(T,t2m,.4)),rep?CRAIE.ok:CRAIE.jaune);
    if(rep){ const xm=X0+100*PX; c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.beginPath(); c.moveTo(xm,YA-26); c.lineTo(xm,YA+26); c.stroke();
      for(const xx of [X0+50*PX,X0+150*PX]) ecrire(c,'100 cm',xx,YA+56,48,CRAIE.ok); }
    if(!rep){
      if(T>=tCm) ecrire(c,'vendue au cm',760,130,58*zoom(T,tCm,.4),CRAIE.gris);
      if(T>=tDemande) ecrire(c,'je demande',X0,YB,50*zoom(T,tDemande,.4),CRAIE.gris,'left');
      if(T>=t2cm) ecrire(c,'2 cm',400,YB,72*zoom(T,t2cm,.4),T>=uni?CRAIE.faux:CRAIE.jaune,'left');
      /* le petit bout : 2 cm, à la même échelle */
      if(T>=tDonne){ const z=zoom(T,tDonne,.4); c.fillStyle=RUBAN3; c.fillRect(X0,YP-15*z,2*PX,30*z); c.strokeStyle='#f8f9fa'; c.lineWidth=2; c.strokeRect(X0,YP-15*z,2*PX,30*z); }
      if(T>=tPetit) cercle(c,X0+4,YP,50,CRAIE.faux,deroule(T,tPetit,.4));
      if(T>=tDoigt){ doigt(c,X0+130,YP+70,zoom(T,tDoigt,.4)*.85); ecrire(c,'grand comme mon doigt !',660,YP+10,46*zoom(T,tDoigt,.4),CRAIE.faux); }
    } else { /* la réponse : 1 m = 100 cm, donc 2 m = 200 cm */
      ecrire(c,'1 m = 100 cm',760,130,64,CRAIE.ok);
      ecrire(c,'je demande',X0,YB,50,CRAIE.gris,'left');
      ecrire(c,'200 cm',400,YB,72,CRAIE.ok,'left'); coche(c,680,YB-8,.45);
      if(T>=tMoiO) ecrire(c,'et moi avec !',650,YP+10,58*zoom(T,tMoiO,.4),CRAIE.jaune); }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-unite'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Pour mon cerf-volant,')),
    ...suiteDe(uni,60,60,[a0('il me faut 2 mètres'),a0('de ficelle.')],[a0('Au magasin, la ficelle'),a0('se vend au centimètre.')],
      [a0('Facile : je demande'),a0('2 centimètres !')]),
    ...suiteDe(q,60,62,[a1('Le vendeur me donne'),a1('un tout petit bout.')],[a1('Il est grand'),a1('comme mon doigt !')]),
    ...suiteDe(com,60,62,[a3('Mon cerf-volant vole enfin…'),a3('et moi avec !')]),
    ...suiteDe(f,60,60,[a4("À toi : l'école est"),a4('à 1 kilomètre de chez moi.')],[a4('Combien de mètres ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de centimètres'),qd('fallait-il demander ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd("1 mètre, c'est 100 centimètres."), r2=rd('Donc 2 mètres,'), r3=rd("c'est 200 centimètres.");
  const tC=mot('02b-reponse','C');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<polygon points="90,30 130,85 90,150 50,85" fill="#e03131" stroke="#f8f9fa" stroke-width="4"/><polygon points="90,30 130,85 90,85" fill="#1971c2"/><polygon points="90,150 50,85 90,85" fill="#1971c2"/>`+
    `<path d="M90 150 Q120 180 80 205" stroke="#f8f9fa" stroke-width="3" fill="none"/>`+
    `<rect x="30" y="205" width="190" height="20" rx="10" fill="${RUBAN3}" stroke="#f8f9fa" stroke-width="3"/>`+
    `<text x="268" y="170" font-family="Segoe UI" font-weight="800" font-size="150" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'2 m de ficelle<br>= ? cm'+PARI,mini);
  return { clips,FIN,titre:'Combien de centimètres ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,uni,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['2 centimètres',tq('A'),tq('2')],['20 centimètres',tq('B'),tq('20')],['200 centimètres',tq('C'),tq('200')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1],suite:[r2,r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<uni){ T<tDemande?g.montre():g.fier(); }
      else if(T<q){ T<tPetit?g.ouvre():g.oups(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.oups(); }
      else if(T<com){ T<tMoiO?g.fier():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
