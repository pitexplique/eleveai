/* ============================================================
   Série Durées CP — ÉPISODE 04 : MA JOURNÉE DANS LA FUSÉE. Outils : films/cp-commun.js + cp-duree.js.
   Je me couche, je déjeune, puis je me lève : ça ne va pas du tout ! Je recommence : je me lève à 7 heures,
   je joue à 10 heures. Et après ? Réponse C : après 10 vient 11, c'est 11 heures.
   Dans l'espace aussi, les heures se suivent, même la tête en bas !
   Commentaire : quelle heure vient juste avant 4 heures ?
   ============================================================ */
FILMS['ordonner']=function(outils){
  const DUR={'00-accroche':8.34,'01-recommence':7.62,'02-question':12.75,'02b-reponse':5.62,'03-ouf':5.99,'04-commentaire':5.81,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.5,'01-recommence':.5,'02-question':3.3,'02b-reponse':.6,'03-ouf':.8,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,rec,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  /* les instants des mots */
  const tFusee=mot('00-accroche','fusée'), tCouche=mot('00-accroche','couche'), tDej=mot('00-accroche','déjeune'), tLeve=mot('00-accroche','lève'),
        tTout=mot('00-accroche','tout');
  const tRecom=mot('01-recommence','recommence'), t7=mot('01-recommence','7'), t10=mot('01-recommence','10'), tApres=mot('01-recommence','après');
  const tEspace=mot('03-ouf',"l'espace"), tSuivent=mot('03-ouf','suivent'), tTete=mot('03-ouf','tête');
  const tAvant=mot('04-commentaire','avant'), t4=mot('04-commentaire','4'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tCouche-.08;

  /* L'ardoise fait 1056 × 720. Le dessin en haut à gauche (Ti Margo cache le bas milieu-gauche), l'écrit à DROITE. */
  const RX=260, RY=230, RR=150, XD=760;
  const tourne=(T,t,d)=>T<t?0:lisse(Math.min(1,(T-t)/d));

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : juste avant 4 heures */
      horlogeCraie(c,RX,RY,RR,4,0,zoom(T,com+.1,.4));
      if(T>=t4){ ecrire(c,'?',XD-150,RY,110*zoom(T,t4,.5),CRAIE.jaune); ecrire(c,'4 heures',XD+120,RY,72*zoom(T,t4,.5),CRAIE.blanc); }
      if(T>=tAvant){ c.strokeStyle=CRAIE.jaune; c.lineWidth=8; c.lineCap='round'; const u=Math.min(1,(T-tAvant)/.4);
        c.beginPath(); c.moveTo(XD-20,RY+90); c.lineTo(XD-20-90*u,RY+90); c.stroke(); ecrire(c,'juste avant',XD,RY+160,52*zoom(T,tAvant,.4),CRAIE.jaune); }
      tab.maj(); return; }

    if(T>=ouf){ /* dans l'espace, la tête en bas : 10 heures, 11 heures, 12 heures */
      fuseeCraie(c,RX,RY+20,300,zoom(T,ouf+.1,.4),Math.PI*tourne(T,tTete,.8),T);
      if(T>=tSuivent){ ['10','11','12'].forEach((s,i)=>{ const u=Math.min(1,Math.max(0,(T-tSuivent)/.35-i)); if(u>0) ecrire(c,s+' h',XD-190+i*190,RY-40,62*u,i===1?CRAIE.ok:CRAIE.blanc); });
        c.strokeStyle=CRAIE.jaune; c.lineWidth=6; c.lineCap='round'; for(let i=0;i<2;i++) if(T>=tSuivent+.35*(i+1)){ const x=XD-95+i*190, y=RY-38;
          c.beginPath(); c.moveTo(x-16,y); c.lineTo(x+16,y); c.moveTo(x+6,y-9); c.lineTo(x+16,y); c.lineTo(x+6,y+9); c.stroke(); } }
      tab.maj(); return; }

    if(T>=rec){ /* je recommence : 7 heures, je me lève ; 10 heures, je joue ; et après ? */
      const h=T>=t10?10:7;
      if(T>=t7) horlogeCraie(c,RX,RY,RR,h,0,zoom(T,t7,.4));
      if(T>=t7) ecrire(c,'7 h : je me lève',XD,RY-110,56*zoom(T,t7,.4),CRAIE.blanc);
      if(T>=t10) ecrire(c,'10 h : je joue',XD,RY-10,56*zoom(T,t10,.4),CRAIE.blanc);
      if(T>=tApres) ecrire(c,'? : et après',XD,RY+90,56*zoom(T,tApres,.4),CRAIE.jaune);
      tab.maj(); return; }

    /* la journée à l'envers */
    fuseeCraie(c,RX,RY+10,300,zoom(T,acc+.2,.4),0,T);
    if(T>=tCouche) ecrire(c,'1. je me couche',XD,RY-110,54*zoom(T,tCouche,.4),CRAIE.blanc);
    if(T>=tDej) ecrire(c,'2. je déjeune',XD,RY-20,54*zoom(T,tDej,.4),CRAIE.blanc);
    if(T>=tLeve) ecrire(c,'3. je me lève',XD,RY+70,54*zoom(T,tLeve,.4),CRAIE.blanc);
    if(T>=tTout){ c.strokeStyle=CRAIE.faux; c.lineWidth=12; c.lineCap='round'; const u=Math.min(1,(T-tTout)/.4);
      c.beginPath(); c.moveTo(XD-210,RY-150); c.lineTo(XD-210+420*u,RY-150+260*u); c.stroke();
      if(T>=tTout+.2){ c.beginPath(); c.moveTo(XD+210,RY-150); c.lineTo(XD+210-420*u,RY-150+260*u); c.stroke(); } }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-recommence'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Ma journée dans la fusée.')),
    ...suiteDe(rec,60,60,[a0('Je me couche, je déjeune,'),a0('puis je me lève.')],[a0('Ça ne va pas du tout !')]),
    ...suiteDe(q,60,58,[a1('Je recommence.')],[a1('Je me lève à 7 heures.')],[a1('Je joue à 10 heures.')],[a1('Et après ?')]),
    ...suiteDe(com,60,62,[a3("Dans l'espace aussi,"),a3('les heures se suivent.')],[a3('Même quand on a'),a3('la tête en bas !')]),
    ...suiteDe(f,60,60,[a4('À toi : quelle heure vient'),a4('juste avant 4 heures ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Quelle heure vient juste'),qd('après 10 heures ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Après 10 vient 11.'), r2=rd("C'est 11 heures.");
  const tC=mot('02b-reponse','C');

  poserMiniature(outils,acc+1,'Ma journée<br>à l\'envers ?'+PARI,ardoiseMini([['1. je me couche',CRAIE.faux],['3. je me lève',CRAIE.faux]]));
  return { clips,FIN,titre:'Ma journée dans la fusée',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,rec,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['9 heures',tq('A'),tq('9')],['12 heures',tq('B'),tq('12')],['11 heures',tq('C'),tq('11')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      scene.y=0;
      for(const t of [tRecom,tTete]) if(T>=t-.05&&T<t+.5) scene.y=.3*Math.sin((T-t+.05)/.55*Math.PI);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<rec){ T<tTout?g.montre():g.oups(); }
      else if(T<q){ T<tApres?g.montre():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.pouce(); }
      else if(T<com){ T<tTete?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; scene.y=0; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
