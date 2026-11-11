/* ============================================================
   ÉPISODE 02 : LES COQUILLAGES ENVOLÉS. 52 coquillages − 17 : Ti Margo fait 7 − 2 (le petit ôté du grand)
   et trouve 45. Il vérifie avec une addition : 45 + 17 = 62, pas 52. Il faut casser une dizaine : 35.
   Outils : films/calcul-pose.js (poser, barrer, petit, gestes, cadrer…).
   ============================================================ */

/* Un seau de coquillages à la craie : le seau, des coquillages qui dépassent, le nombre écrit dessus */
function seauCraie(c,x,y,txt,z=1){ if(z<=0) return; const K=['#ffc9c9','#fff3bf','#ffd8a8','#eebefa','#d0ebff'];
  K.forEach((k,i)=>{ const cx=x+(i-2)*34, cy=y-96-(i%2)*14; c.fillStyle=k; c.strokeStyle='#7a4a1c'; c.lineWidth=3;
    c.beginPath(); c.moveTo(cx,cy+16); c.arc(cx,cy+16,24,Math.PI*1.1,Math.PI*1.9); c.closePath(); c.fill(); c.stroke(); });
  c.fillStyle='#4dabf7'; c.strokeStyle='#1864ab'; c.lineWidth=7; c.beginPath();
  c.moveTo(x-100,y-80); c.lineTo(x+100,y-80); c.lineTo(x+78,y+80); c.lineTo(x-78,y+80); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle='#1864ab'; c.lineWidth=6; c.beginPath(); c.arc(x,y-80,100,Math.PI*1.08,Math.PI*1.92); c.stroke();
  ecrire(c,txt,x,y+8,82*z,'#fff9db'); }

FILMS.soustraction=function(outils){
  const DUR={'00-accroche':17.97,'01-verif':10.11,'02-question':13.61,'02b-reponse':15.82,'03-ouf':7.13,'04-commentaire':6.55,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ver,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  const W=tab.W;

  /* Les instants */
  const t52=mot('00-accroche','52'), tDonne=mot('00-accroche','J\'en'), t17=mot('00-accroche','17'), tU=mot('00-accroche','unités'),
        t7=mot('00-accroche','7'), t2=mot('00-accroche','2'), t5=mot('00-accroche','5'), tD=mot('00-accroche','dizaines'),
        t5b=mot('00-accroche','5',2), t1=mot('00-accroche','1'), t4=mot('00-accroche','4'), t45=mot('00-accroche','45'),
        tParie=mot('00-accroche','paries');
  const tV=mot('01-verif','vérifie'), tV45=mot('01-verif','45'), tV17=mot('01-verif','17'), tV62=mot('01-verif','62'),
        tV52=mot('01-verif','52'), tProb=mot('01-verif','problème');
  const tO35=mot('03-ouf','35'), tO17=mot('03-ouf','17'), tO52=mot('03-ouf','52'), tOuf=mot('03-ouf','Ouf');
  const t73=mot('04-commentaire','73'), t48=mot('04-commentaire','48'), tRep=mot('04-commentaire','Réponds');

  const XU=700, Y0=250, H=135; /* la pose, à droite de l'ardoise ; le seau à gauche */
  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 73 − 48, la réponse reste à l'élève */
      poser(c,{xu:W/2+75,y0:Y0,lignes:[{txt:'73',z:T>=t73?zoom(T,t73):0},{txt:'48',z:T>=t48?zoom(T,t48):0}],signe:T>=t48?'−':'',barre:T>=t48?1:0});
      if(T>=tRep) ecrire(c,'?',W/2+75-75,Y0+2*H+60,130*zoom(T,tRep,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=ouf){ /* la bonne pose : la dizaine cassée (5 → 4, 2 → 12), 35, et la preuve 35 + 17 = 52 */
      const xu=520;
      const p=poser(c,{xu,y0:Y0,lignes:[{txt:'52'},{txt:'17'}],signe:'−',res:{txt:'35',coul:CRAIE.ok}});
      barrer(c,p.X(1),Y0); petit(c,'4',p.X(1),Y0-H*.66); petit(c,'1',p.X(0)-150*.42,Y0-H*.58);
      if(T>=tO35) ecrire(c,'35',680,Y0+H*.35,92*zoom(T,tO35,.4),CRAIE.ok,'left');
      if(T>=tO17) ecrire(c,'+ 17',800,Y0+H*.35,92*zoom(T,tO17,.4),CRAIE.blanc,'left');
      if(T>=tO52) ecrire(c,'= 52',680,Y0+H*1.35,92*zoom(T,tO52,.4),CRAIE.ok,'left');
      if(T>=tOuf) coche(c,880,Y0+H*1.3,.7);
      tab.maj(); return; }
    if(T>=ver){ /* la vérification : 45 + 17 = 62, mais il en avait 52 */
      if(T>=tV45) ecrire(c,'45',W/2-255,150,104*zoom(T,tV45,.4),CRAIE.blanc);
      if(T>=tV17) ecrire(c,'+ 17',W/2-70,150,104*zoom(T,tV17,.4),CRAIE.blanc);
      if(T>=tV62) ecrire(c,'= 62',W/2+215,150,104*zoom(T,tV62,.4),T>=tV52?CRAIE.faux:CRAIE.ok);
      if(T>=tV52){ ecrire(c,'Mais j’avais',W/2-90,340,80,CRAIE.blanc); ecrire(c,'52',W/2+230,340,104*zoom(T,tV52,.4),CRAIE.jaune); }
      if(T>=tProb) ecrire(c,'62 ≠ 52 ?!',W/2,540,110*zoom(T,tProb,.4),CRAIE.faux);
      tab.maj(); return; }
    /* l'accroche : le seau de 52, la soustraction posée avec l'erreur (7 − 2 au lieu de 2 − 7) */
    seauCraie(c,190,230,'52',zoom(T,t52,.4));
    if(T>=t17){ const u=lisse((T-t17)/.6); ecrire(c,'− 17',190+40*u,500,90*zoom(T,t17,.4),CRAIE.faux); }
    const enU=T>=tU&&T<tD, enD=T>=tD&&T<t45;
    const p=poser(c,{xu:XU,y0:Y0,lignes:[{txt:'52',z:T>=t52?1:0},{txt:'17',z:T>=t17?1:0}],signe:T>=t17?'−':'',barre:T>=t17?1:0,
      cadre:{0:enU?CRAIE.r0:null,1:enD?CRAIE.r1:null},
      res:{txt:'45',z:k=>k===0?(T>=t5?zoom(T,t5,.4):0):(T>=t4?zoom(T,t4,.4):0),coul:T>=t45?CRAIE.blanc:undefined}});
    /* la flèche de l'erreur : le 7 du bas « monte » au-dessus du 2 */
    if(T>=t7&&T<tD){ const u=lisse((T-t7)/.5); c.strokeStyle=CRAIE.faux; c.lineWidth=8; c.lineCap='round';
      const x=XU+115, y1=Y0+H, y2=Y0+(H)*(1-u); c.beginPath(); c.moveTo(x,y1); c.lineTo(x,y2); c.stroke();
      if(u>=1){ c.beginPath(); c.moveTo(x-22,y2+26); c.lineTo(x,y2); c.lineTo(x+22,y2+26); c.stroke(); }
      if(T>=t2) ecrire(c,'7 − 2',XU+235,Y0+H*.5,60,CRAIE.faux); }
    if(T>=t45){ c.strokeStyle=CRAIE.jaune; c.lineWidth=8; c.beginPath(); c.roundRect(XU-235,p.yRes-75,310,150,24); c.stroke(); }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-verif'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,tDonne-.08,352,62,a0('Salut !'),a0('J’avais 52 coquillages.')),
    ...suiteDe(ver,60,62,[a0('J’en donne 17.')],[a0('Pour les unités,'),a0('7 − 2 = 5.')],[a0('Pour les dizaines,'),a0('5 − 1 = 4.')],
      [a0('Il me reste'),a0('45 coquillages !')],[a0('Tu paries ?')]),
    ...suiteDe(q,60,62,[a1('Je vérifie : 45 + 17,'),a1('ça fait 62.')],[a1('Mais j’avais'),a1('52 coquillages !')],[a1('Il y a un problème.')]),
    ...suiteDe(com,60,62,[a3('Et 35 + 17,'),a3('ça fait bien 52.')],[a3('Ouf, je n’ai'),a3('rien perdu !')]),
    ...suiteDe(f,60,60,[a4('À toi : combien font'),a4('73 − 48 ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien me reste-t-il'),qd('de coquillages ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('En haut, il y a 2.'), r2=rd('2 − 7, impossible :'), r3=rd('je casse une dizaine.'),
    r4=rd('12 − 7 = 5.'), r5=rd('Il reste 4 dizaines :'), r6=rd('4 − 1 = 3.'), r7=rd('Ça fait 35.');
  const tB=mot('02b-reponse','B');

  poserMiniature(outils,acc+1,'52 coquillages<br>− 17'+PARI,ardoiseMini([['52 − 17'],['= 45 ?','#ff8787']],320,240));
  return { clips,FIN,titre:'Les coquillages envolés',ceinture:1,finTitre:tDonne-.08,groupes,finClip:'05-abonne',
    cuts:[tDonne-.08,ver,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['45',tq('A'),tq('45')],['35',tq('B'),tq('35')],['25',tq('C'),tq('25')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2,r3,r4],suite:[r5,r6,r7] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tDonne-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<ver){ if(T<tU) g.montre(); else if(T<t45) g.reflechit(); else if(T<tParie) g.fier(); else g.pouce(); }
      else if(T<q){ if(T>=tV52){ g.oups(); scene.ry=-.12+.3*lisse((T-tV52)/.35); } else if(T>=tV) g.montre(); else g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.pouce(); }
      else if(T<com){ T>=tOuf?g.fier():g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
