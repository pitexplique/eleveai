/* ============================================================
   Série Nombres entiers CP — SHORT 05 : « Le pari des billes » (micro cp_entier_dizaine_unite), 26/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier2-dessins.js. Voix : manim/voix/cp-entier-dizaine-short.json.
   Le copain dit : 53 billes, 35 billes, c'est pareil (les mêmes chiffres). Question : a-t-il raison ? A (non, 53 c'est plus).
   Réponse : 5 paquets de 10 et 3 ; 3 paquets de 10 et 5. Ceinture blanche. Commentaire : 4 paquets de dix et 2 billes ?
   ⭐ La carte se range à droite sous l'ardoise, Ti Margo à gauche.
   ============================================================ */
FILMS['dizaine']=function(outils){
  const DUR={'00-accroche':10.66,'01-question':15.19,'01b-reponse':10.42,'02-commentaire':9.73,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':3.3,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();

  const m0=w=>mot('00-accroche',w);
  const tMon=m0('Mon'), t53=m0('cinquante-trois'), t35=m0('trente-cinq'), tPareil=m0('pareil'), tChif=m0('chiffres'), tPar=m0('paries');
  const mr=w=>mot('01b-reponse',w);
  const tA=mr('A'), tR53=mr('Cinquante-trois'), tPaq=mr('paquets'), tR35=mr('Trente-cinq'), tTrois=mr('trois'), tPlace=mr('place'), tChange=mr('change');
  const mc=w=>mot('02-commentaire',w), tQuatre=mc('quatre'), tDeux=mc('deux'), tComb=mc('combien'), tRep=mc('réponds');
  const finTitre=tMon-.08;

  /* les billes rangées : nd paquets de 10 (tubes) puis nu billes seules, à partir de x0 */
  function rangeBilles(c,T,x0,nd,nu,t0,pas=.22,lueurD=0,lueurU=0){
    for(let i=0;i<nd;i++) tubeDixE(c,x0+i*66,650,20,zoom(T,t0+i*pas,.4),lueurD);
    for(let k=0;k<nu;k++) billeE(c,x0+nd*66+14+k*42,628,19,COUL_BILLE[(k+2)%5],zoom(T,t0+nd*pas+.2+k*.12,.4)); }
  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* 4 paquets de dix et 2 billes : combien ? */
      rangeBilles(c,T,250,4,2,com+.1+(tQuatre-com)*.5,.18);
      if(T>=tQuatre) ecrire(c,'4',250+99,170,90*zoom(T,tQuatre,.5),CRAIE.r1);
      if(T>=tDeux) ecrire(c,'2',250+4*66+35,520,80*zoom(T,tDeux,.5),CRAIE.r0);
      if(T>=tComb){ ecrire(c,'= ?',800,420,150*zoom(T,tComb,.5),CRAIE.jaune); }
      tab.maj(); return; }
    if(T>=r&&T>=tR53){ /* la réponse : 53 = 5 paquets de 10 et 3 ; 35 = 3 paquets de 10 et 5 */
      const pl=T>=tPlace?.5+.5*Math.sin(T*5):0;
      nombreDUE(c,'53',255,130,150,[CRAIE.r1,CRAIE.r0],[T>=tPlace?1+.12*Math.sin(T*6):1,1]);
      rangeBilles(c,T,50,5,3,tR53+.3,.18,pl,0);
      if(T>=tR35){ nombreDUE(c,'35',790,130,150,[CRAIE.r1,CRAIE.r0],[T>=tPlace?1+.12*Math.sin(T*6):1,1]); rangeBilles(c,T,600,3,5,tR35+.3,.18,pl,0); }
      if(T>=tChange) for(const [x,y] of [[160,260],[700,260],[528,90]]) etincelle(c,x,y,16+6*Math.sin(T*6+x));
      tab.maj(); return; }
    /* deux sacs de billes qui brillent comme des planètes : 53 et 35 */
    etoilesE(c,T,10,1056,180);
    if(T>=t53){ sacE(c,270,650,300,'#c08550',zoom(T,t53,.4)); nombreDUE(c,'53',270,470,140*zoom(T,t53,.5),T>=tChif?[CRAIE.r1,CRAIE.r0]:[CRAIE.blanc,CRAIE.blanc]); }
    if(T>=t35){ sacE(c,786,650,300,'#9c6b3c',zoom(T,t35,.4)); nombreDUE(c,'35',786,470,140*zoom(T,t35,.5),T>=tChif?[CRAIE.r1,CRAIE.r0]:[CRAIE.blanc,CRAIE.blanc]); }
    if(T>=tPareil) ecrire(c,'=',528,470,120*zoom(T,tPareil,.5),T>=q?CRAIE.jaune:CRAIE.faux);
    if(T>=tPareil) ecrire(c,'?',528,330,100*zoom(T,tPareil+.2,.5),CRAIE.jaune);
    if(T>=tPar&&T<q) for(const [x,y] of [[140,170],[930,170],[528,220]]) etincelle(c,x,y,16+6*Math.sin(T*6+x));
    tab.maj();
  }

  const qd=dit('01-question'), rd=dit('01b-reponse');
  qd('Question !'); const phraseQ=[qd("Est-ce qu'il a raison ?")];
  const tq=w=>mot('01-question',w)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const r1=phraseE("53, c'est 5 paquets de 10.",[tR53,mr("c'est"),mr('cinq'),tPaq,mr('de'),mr('dix')]);
  const r2=phraseE('35 : 3 paquets.',[tR35,tR35,tTrois,tTrois]);

  poserMiniature(outils,q-.3,'53 et 35,<br>pareil ?'+PARI,ardoiseMini([['53 = 35 ?','#ffd43b']]));
  return { clips,FIN,titre:'Le pari des billes',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,tR53,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['non, 53 > 35',tq('A'),tq('cinquante-trois')],['oui, pareil',tq('B'),tq('oui')],['non, 35 > 53',tq('C'),tq('trente-cinq')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=q&&T<com) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tPareil?g.montre():(T<tPar?g.oups():g.fier()); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tChange?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
