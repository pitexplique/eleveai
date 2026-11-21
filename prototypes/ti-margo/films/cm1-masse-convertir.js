/* ============================================================
   Série Masse CM1 — ÉPISODE 03 : CONVERTIR. Outils : films/cm1-commun.js + cm1-masse.js.
   Le copain a 3 kg de pommes et veut des sachets de 500 g. Il calcule « 3 ÷ 500 »… zéro sachet !
   Mais les pommes sont là. Question : combien de sachets ? 6 (B) : 3 kg = 3 000 g = 6 × 500 g.
   Fin : les 6 sachets, « la même unité d'abord ! », puis la compote. Commentaire : 7 kg = ? g. Ceinture blanche.
   ⛔ 3 000 s'écrit avec une espace insécable (un seul jeton pour voixDe).
   ============================================================ */
FILMS['convertir']=function(outils){
  deuxAuPlusM();
  { /* « 500… » / « 3 000, c'est » / « 500 : » : un nombre seul a deux marques identiques de suite → une seule */
    for(const k of ['00-accroche','02b-reponse']){ const CR=window.CUES[VIDEO][k];
      window.CUES[VIDEO][k]=CR.filter((x,i)=>!(i>0&&CR[i-1][1]===x[1]&&/^[\d  ]+$/.test(x[1]))); } }
  const DUR={'00-accroche':12.21,'01-oups':3.29,'02-question':10.43,'02b-reponse':9.19,'03-fin':5.65,'04-commentaire':6.00,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.8,'01-oups':1.0,'02-question':3.3,'03-fin':1.4,'04-commentaire':2.2});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,oup,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];
  const NBSP=' ', N=x=>x.replace(/(\d) (\d{3})/g,'$1'+NBSP+'$2');

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tMon=mot('00-accroche','Mon'), t3=mot('00-accroche','3'), tPom=mot('00-accroche','pommes'),
        tSach=mot('00-accroche','sachets'), t500=mot('00-accroche','500'), tCalc=mot('00-accroche','calcule'),
        tZero=mot('00-accroche','zéro');
  const tMais=mot('01-oups','Mais'), tLa=mot('01-oups','là');
  const tB=mot('02b-reponse','B');
  const tMeme=mot('03-fin','même'), tComp=mot('03-fin','compote');
  const t7=mot('04-commentaire','7'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tMon-.08, SOL=590, XR=840;
  const CAG={x:265,s:1.25}, SV={x:578,s:1.0};   /* la cagette de 3 kg, le sachet vide de 500 g */
  const SX=[118,298,478], SY=[340,590];          /* les 6 sachets de la fin : 2 rangées de 3 */

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : 7 kg = ? g */
      const yH=tasPommesM(c,330,SOL,1.5,zoom(T,com,.4));
      if(T>=t7) ecrire(c,'7 kg',XR,200,110*zoom(T,t7,.4),CRAIE.blanc);
      if(T>=t7+.6) ecrire(c,'= ? g',XR,350,120*zoom(T,t7+.6,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=ouf){ /* la fin : les 6 sachets de 500 g ; puis la compote */
      if(T<tComp){ for(let i=0;i<6;i++){ const t0=ouf+.15+i*.25;
          sachetM(c,SX[i%3],SY[Math.floor(i/3)],1.15,zoom(T,t0,.35),true,'500 g'); } }
      else compoteM(c,330,SOL-30,1.8,zoom(T,tComp,.4));
      ecrire(c,'3 kg',XR,150,96,CRAIE.ok);
      ecrire(c,N('= 3 000 g'),XR,255,80,CRAIE.ok);
      if(T>=ouf+.6) ecrire(c,N('= 6 × 500 g'),XR,360,68*zoom(T,ouf+.6,.4),CRAIE.ok);
      if(T>=tMeme) ecrire(c,'même unité !',XR,470,60*zoom(T,tMeme,.4),CRAIE.jaune);
      if(T>=tComp) ecrire(c,'Compote !',XR,570,70*zoom(T,tComp,.4),CRAIE.gris);
      tab.maj(); return; }
    /* l'accroche : la cagette de 3 kg, le sachet vide de 500 g, le calcul faux du copain */
    if(T>=finTitre){ const yH=tasPommesM(c,CAG.x,SOL,CAG.s,zoom(T,tPom,.4));
      if(T>=t3) ecrire(c,'3 kg',CAG.x,Math.min(yH,SOL-200)-60,90*zoom(T,t3,.4),CRAIE.blanc);
      if(T>=tLa&&T<q){ const u=entreM(T,tLa,tLa+.5); c.strokeStyle=CRAIE.jaune; c.lineWidth=8; c.setLineDash([18,12]);
        c.beginPath(); c.ellipse(CAG.x,SOL-145,265,178,0,0,7*u); c.stroke(); c.setLineDash([]); } }
    if(T>=tSach){ sachetM(c,SV.x,SOL,SV.s,zoom(T,tSach,.4),false,T>=t500?'500 g':''); }
    if(T>=tCalc) ecrire(c,'3 ÷ 500',XR,190,100*zoom(T,tCalc,.4),CRAIE.faux);
    if(T>=tZero) ecrire(c,'= 0 sachet ?!',XR,320,70*zoom(T,tZero,.4),CRAIE.faux);
    if(T>=tMais) ecrire(c,'kg ou g ?',XR,460,66*zoom(T,tMais,.4),CRAIE.jaune);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(oup,60,60,[a0('Mon copain a'),a0('3 kilogrammes de pommes.')],[a0('Il veut des sachets'),a0('de 500 grammes.')],
      [a0('Il calcule :'),a0('3 divisé par 500…')],[a0('zéro sachet !')]),
    ...suiteDe(q,60,62,[a1('Zéro ?')],[a1('Mais les pommes sont là !')]),
    ...suiteDe(com,60,62,[a3("La même unité d'abord !")],[a3('Et maintenant…'),a3('compote pour tout le monde !')]),
    ...suiteDe(f,60,60,[a4('À toi : combien de grammes'),a4('dans 7 kilogrammes ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de sachets'),qd('de 500 grammes ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('3 kilogrammes,'), r2=rd(N("c'est 3 000 grammes.")), r3=rd(N("3 000, c'est 6 fois 500 :")),
    r4=rd('6 sachets.');

  poserMiniature(outils,acc+1,'3 kg de pommes :<br>combien de sachets ?'+PARI,
    ardoiseMini([['3 kg'],['÷','#ffd43b'],['500 g']]));
  return { clips,FIN,titre:'Combien de sachets ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,oup,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['15',tq('A'),tq('B')-.3],['6',tq('B'),tq('C')-.3],['0',tq('C'),tq('Mets')-.3]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<tCalc) g.montre();
      else if(T<oup) g.oups();
      else if(T<q){ T<tMais?g.oups():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.fier(); }
      else if(T<com){ T<tComp?g.montre():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
