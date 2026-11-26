/* ============================================================
   Série Durées CP — ÉPISODE 05 : LE GÂTEAU TOUT MOU. Outils : films/cp-commun.js + cp-duree.js.
   Mon gâteau doit cuire jusqu'à 3 heures ; mon horloge montre 3 heures : je le sors du four… il est tout mou !
   Mon horloge avance de 1 heure. Réponse C : on recule, il est 2 heures.
   Je remets mon gâteau au four. Et demain, je change d'horloge !
   Commentaire : une horloge retarde de 1 heure, elle montre 8 heures : quelle est la vraie heure ?
   ============================================================ */

/* Le four : centre bas (x, y), largeur w ; une vitre orange, deux boutons */
function fourCraie(c,x,y,w,z=1){ if(z<=0) return; const k=Math.min(1.1,z), h=w*.8; c.save(); c.translate(x,y); c.scale(k,k);
  c.lineJoin='round'; c.strokeStyle=CRAIE.blanc; c.lineWidth=6;
  c.fillStyle='#868e96'; c.beginPath(); c.roundRect(-w/2,-h,w,h,16); c.fill(); c.stroke();
  c.fillStyle='#ff922b'; c.beginPath(); c.roundRect(-w*.36,-h*.72,w*.72,h*.5,10); c.fill(); c.stroke();
  c.fillStyle='#f1f3f5'; for(const s of [-1,1]){ c.beginPath(); c.arc(s*w*.25,-h*.86,w*.05,0,7); c.fill(); }
  c.restore(); }
/* Le gâteau : centre bas (x, y), largeur w ; mou = 0 à 1 l'aplatit et le fait trembler (avec T) */
function gateauCraie(c,x,y,w,z=1,mou=0,T=0){ if(z<=0) return; const k=Math.min(1.1,z), ec=1+mou*(.35+.06*Math.sin(T*14)), h=w*.42/ec;
  c.save(); c.translate(x,y); c.scale(k*ec,k); c.lineJoin='round'; c.strokeStyle=CRAIE.blanc; c.lineWidth=5/ec;
  c.fillStyle='#a0522d'; c.beginPath(); c.roundRect(-w/2,-h,w,h,10); c.fill(); c.stroke();
  c.fillStyle='#f783ac'; c.beginPath(); c.roundRect(-w*.53,-h-w*.1,w*1.06,w*.16,12); c.fill();
  if(mou>0){ c.fillStyle='#f783ac'; for(const s of [-.3,.1,.38]){ c.beginPath(); c.ellipse(s*w,-h+w*.06+mou*w*.06,w*.05,w*.09*mou,0,0,7); c.fill(); } }
  c.fillStyle='#e03131'; c.beginPath(); c.arc(0,-h-w*.16,w*.07,0,7); c.fill(); c.restore(); }

/* 26/11, Frédéric : la fin des shorts comme celle des paysages, « Entraîne-toi sur eleveai.fr ou sur YouTube @eleveai974 », rien d'autre
   (même écran que films/cp-entier2.js) */
function finShortD(){ const css=document.createElement('style'); css.textContent='#f3,#f6{display:none!important;} #fin #f5{font-size:64px;}';
  document.head.append(css); document.getElementById('f4').innerHTML='<span>ou sur YouTube</span>'; }

FILMS['defi']=function(outils){
  const DUR={'00-accroche':8.63,'01-oups':5.31,'02-question':12.01,'02b-reponse':6.86,'03-ouf':5.44,'04-commentaire':9.61,'05-abonne':6.10};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.5,'01-oups':.5,'02-question':3.3,'02b-reponse':.6,'03-ouf':.8,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,oups,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  /* les instants des mots */
  const tCuire=mot('00-accroche','cuire'), tMon2=mot('00-accroche','Mon',2), tMontre=mot('00-accroche','montre'), tSors=mot('00-accroche','sors');
  const tMou=mot('01-oups','mou'), tOublie=mot('01-oups','oublié'), tAvance=mot('01-oups','avance');
  const tRemets=mot('03-ouf','remets'), tDemain=mot('03-ouf','demain'), tChange=mot('03-ouf','change');
  const tRetarde=mot('04-commentaire','retarde'), t8=mot('04-commentaire','8'), tQuelle=mot('04-commentaire','Quelle'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tMon2-.08;

  /* L'ardoise fait 1056 × 720. Le dessin en haut à gauche (Ti Margo cache le bas milieu-gauche), l'écrit à DROITE. */
  const RX=260, RY=230, RR=150, XD=760;
  const sort=(T,t,d)=>T<t?0:lisse(Math.min(1,(T-t)/d));

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : l'horloge retarde, elle montre 8 heures */
      horlogeCraie(c,RX,RY,RR,8,0,zoom(T,com+.1,.4));
      if(T>=tRetarde) ecrire(c,'retarde de 1 h',XD,RY-110,60*zoom(T,tRetarde,.4),'#a5b4fc');
      if(T>=t8) ecrire(c,'montre 8 heures',XD,RY-10,60*zoom(T,t8,.4),CRAIE.blanc);
      if(T>=tQuelle) ecrire(c,'vraie heure : ?',XD,RY+100,64*zoom(T,tQuelle,.5),CRAIE.jaune);
      tab.maj(); return; }

    if(T>=ouf){ /* le gâteau retourne au four ; demain, une nouvelle horloge */
      fourCraie(c,RX,RY+170,300,zoom(T,ouf+.1,.4));
      if(T>=tRemets) gateauCraie(c,RX+260-260*sort(T,tRemets,.9),RY+105,105,1,.25*(1-sort(T,tRemets,.9)),T);
      if(T>=tRemets) ecrire(c,'au four !',XD,RY-80,64*zoom(T,tRemets,.4),CRAIE.blanc);
      if(T>=tChange) ecrire(c,'nouvelle horloge',XD,RY+40,58*zoom(T,tChange,.4),CRAIE.ok);
      tab.maj(); return; }

    if(T>=oups){ /* le gâteau tout mou ; l'horloge avance de 1 heure */
      gateauCraie(c,RX,RY+170,220,1,sort(T,tMou,.5),T);
      if(T>=tMou) ecrire(c,'tout mou !',XD,RY-110,70*zoom(T,tMou,.4),CRAIE.faux);
      if(T>=tAvance){ horlogeCraie(c,RX,RY-120,72,3,0,zoom(T,tAvance,.4)); ecrire(c,"l'horloge avance",XD,RY,58*zoom(T,tAvance,.4),'#ffa94d');
        ecrire(c,'de 1 heure',XD,RY+80,58*zoom(T,tAvance,.4),'#ffa94d'); }
      tab.maj(); return; }

    /* le gâteau doit cuire jusqu'à 3 heures ; l'horloge montre 3 heures ; je le sors */
    horlogeCraie(c,RX,RY,RR,3,0,zoom(T,acc+.2,.4));
    if(T>=tCuire) ecrire(c,"cuire jusqu'à 3 h",XD,RY-110,56*zoom(T,tCuire,.4),CRAIE.blanc);
    if(T>=tMontre) ecrire(c,"l'horloge : 3 h",XD,RY-20,56*zoom(T,tMontre,.4),CRAIE.blanc);
    if(T>=tSors){ fourCraie(c,XD-110,RY+330,200,zoom(T,tSors,.4)); gateauCraie(c,XD-110+220*sort(T,tSors+.2,.8),RY+190,110,zoom(T,tSors,.4)); }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Mon gâteau doit cuire'),a0("jusqu'à 3 heures.")),
    ...suiteDe(oups,60,60,[a0('Mon horloge montre'),a0('3 heures.')],[a0('Je sors le gâteau'),a0('du four !')]),
    ...suiteDe(q,60,58,[a1('Il est tout mou !')],[a1("J'avais oublié :")],[a1('mon horloge avance'),a1('de 1 heure.')]),
    ...suiteDe(com,60,62,[a3('Je remets mon gâteau'),a3('au four.')],[a3('Et demain,'),a3("je change d'horloge !")]),
    ...suiteDe(f,60,60,[a4('À toi : une horloge'),a4('retarde de 1 heure.')],[a4('Elle montre 8 heures.')],[a4('Quelle est la vraie heure ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Quelle est'),qd('la vraie heure ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd("L'horloge avance de 1 heure."), r2=rd('On recule : il est 2 heures.');
  const tC=mot('02b-reponse','C');
  /* 26/11 (Frédéric) : pendant la question et la réponse, les DONNÉES RESTENT À L'ÉCRAN (comme le réveil, épisode 01) :
     une petite ardoise à droite de Ti Margo, sous la carte, dans la zone sûre des Shorts (x 470 → 890, y 860 → 1320).
     L'horloge montre 3 h, « avance de 1 h » ; à « On recule », la petite aiguille recule du 3 au 2. */
  const tAvR=mot('02b-reponse','avance'), tRecule=mot('02b-reponse','recule');
  const QX=470, QY=860, QW=420, QH=460;
  const ardQ=document.createElement('canvas'); ardQ.className='cv'; ardQ.width=QW*2; ardQ.height=QH*2;
  ardQ.style.cssText=`left:${QX}px;top:${QY}px;width:${QW}px;height:${QH}px;display:none;z-index:3;border-radius:28px;box-shadow:0 0 0 10px #8a5a2b,0 0 0 13px #5c3a1a,0 12px 26px rgba(0,0,0,.28);`;
  document.body.append(ardQ);
  function dessinerQ(T){ const c=ardQ.getContext('2d'); c.setTransform(2,0,0,2,0,0); c.clearRect(0,0,QW,QH);
    c.fillStyle='#1f3b2c'; c.fillRect(0,0,QW,QH);
    const u=sort(T,tRecule,.9);
    horlogeNum(c,QW/2,158,122,3-u,12,1,T>=tAvR&&T<tRecule+1.2?{h:1}:{});
    ecrire(c,'montre 3 h',QW/2,318,46,CRAIE.blanc);
    ecrire(c,'avance de 1 h',QW/2,370,46,'#ffa94d');
    if(T>=tRecule) ecrire(c,'on recule : 2 h',QW/2,424,46*zoom(T,tRecule,.4),CRAIE.ok); }
  finShortD();

  poserMiniature(outils,acc+1,'Mon gâteau<br>tout mou ?'+PARI,ardoiseMini([["l'horloge : 3 h",CRAIE.blanc],['avance de 1 h !',CRAIE.faux]]));
  return { clips,FIN,titre:'Le gâteau tout mou',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,oups,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['4 heures',tq('A'),tq('4')],['6 heures',tq('B'),tq('6')],['2 heures',tq('C'),tq('2')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      ardQ.style.display=dansQ&&!window.MINI?'block':'none';
      if(dansQ){ dessinerQ(T); scene.x=-1.2; }
      scene.y=0;
      for(const t of [tMou,tChange]) if(T>=t-.05&&T<t+.5) scene.y=.3*Math.sin((T-t+.05)/.55*Math.PI);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<oups){ T<tSors?g.montre():g.fier(); }
      else if(T<q){ T<tMou?g.montre():(T<tOublie?g.oups():g.reflechit()); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.pouce(); }
      else if(T<com){ T<tDemain?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; scene.y=0; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
