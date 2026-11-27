/* ============================================================
   Série Nombres entiers CP — SHORT 09 : « Le petit train de la fête » (micro cp_entier_ordinal), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier2-dessins.js + cp-entier3-dessins.js. Voix : manim/voix/cp-entier-ordinal-short.json.
   Un petit train de 10 wagons ; l'ourson est dans le 9e wagon (compté depuis la locomotive). Question : C (le 9e) ; pièges 8e et 10e.
   ⭐ 27/11 : pas de « TU PARIES ? » écrit : l'accroche = le train de la fête qui arrive, l'ourson qui agite la patte + « Dans quel wagon ? ».
   Ceinture blanche. Commentaire : juste après le 11e ? La carte se range à droite sous l'ardoise, Ti Margo à gauche.
   ============================================================ */
FILMS['ordinal']=function(outils){
  const DUR={'00-accroche':10.72,'01-question':15.9,'01b-reponse':12.61,'02-commentaire':9.05,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':3.3,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tA=m0('À'), tPasse=m0('passe'), tOh=m0('Oh'), tMon=m0('Mon'), tDans=m0('Dans');
  const mq=w=>mot('01-question',w), tCompte=mq('compte');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tC=mr('C'), tR1=mr('Premier'), tR2=mr('deuxième'), tR3=mr('troisième'), tR8=mr('huitième'), tR9=mr('neuvième'), tLe=mr('Le'), tR9b=mr('neuvième',2), tNeuf=mr('Neuf'), tR9c=mr('neuvième',3), tF=mr('f'), tV=mr('v');
  const mc=w=>mot('02-commentaire',w), tOnz=mc('onzième'), tPlace=mc('place'), tRep=mc('réponds');
  const finTitre=tA-.08;

  /* le train : la locomotive à gauche (tournée vers la gauche), 10 wagons derrière ; l'ourson dans le 9e */
  const YB=560, WX=k=>168+k*88, WW=80, WH=104, COUL_W=['#4dabf7','#fcc419','#51cf66','#ff922b','#cc5de8','#ff6b6b','#20c997','#f783ac','#748ffc','#94d82d'];
  const TR=k=>{ if(k<3) return [tR1,tR2,tR3][k]; if(k<8) return tR3+(tR8-tR3)*(k-2)/5; return tR9; };
  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* à toi : juste après le 11e ? */
      const Y=330;
      if(T>=tOnz) ordinalZE(c,11,320,Y,170*zoom(T,tOnz,.5),CRAIE.r1);
      if(T>=tPlace){ ecrire(c,'→',570,Y,140,CRAIE.blanc); ecrire(c,'?',790,Y,190*zoom(T,tPlace,.5)*(1+.05*Math.sin(T*5)),CRAIE.jaune); }
      if(T>=tOnz) for(let k=0;k<12;k++) cubeE(c,120+k*74,640,58,COUL_CUBE[k%10],zoom(T,tOnz+k*.05,.5),k===11&&T>=tPlace?.6+.4*Math.sin(T*6):0);
      tab.maj(); return; }
    guirlandeE(c,0,1056,50,T); guirlandeE(c,0,1056,120,T+1.3,12);
    railsE(c,YB+14);
    const dx=T<finTitre?1100:1100*(1-douxE(entreE(T,tA,tOh)));
    c.save(); c.translate(dx,0);
    locoE(c,10,YB,150,T);
    for(let k=0;k<10;k++){ const lu=T>=r&&T>=TR(k)?1:(T>=q&&T<r&&k===8?.5+.3*Math.sin(T*4):0);
      /* l'ourson (avant qu'il ne saute) */
      if(k===8&&T<tLe+.2) oursonE(c,WX(k)+WW/2,YB-WH-24,1.6,T>=tOh&&T<q?1:0,T);
      wagonE(c,WX(k),YB,WW,COUL_W[k],lu,WH); }
    c.restore();
    /* « Je compte depuis la locomotive » : une flèche qui part de la locomotive */
    if(T>=tCompte&&T<r){ const u=entreE(T,tCompte,tCompte+1.2); c.strokeStyle=CRAIE.jaune; c.lineWidth=7; c.beginPath(); c.moveTo(60,640); c.lineTo(60+900*u,640); c.stroke();
      c.fillStyle=CRAIE.jaune; c.beginPath(); c.moveTo(60+900*u+24,640); c.lineTo(60+900*u-6,622); c.lineTo(60+900*u-6,658); c.closePath(); c.fill(); }
    if(T>=tDans&&T<r){ ecrire(c,'?',WX(8)+WW/2,330,110*zoom(T,tDans,.5)*(1+.05*Math.sin(T*5)),CRAIE.jaune);
      if(T<q) for(const [x,y] of [[WX(8)-40,290],[WX(8)+120,300]]) etincelle(c,x,y,12+6*Math.sin(T*6+x)); }
    /* la réponse : 1er, 2e, … 9e au-dessus des wagons ; l'ourson saute ; neuf → neuvième */
    if(T>=r){ for(let k=0;k<9;k++) rangE(c,k+1,WX(k)+WW/2,375,T,TR(k),k===8?CRAIE.ok:CRAIE.jaune,42);
      if(T>=tLe+.2&&T<tLe+1.4){ const [x,y]=sautE([WX(8)+WW/2,YB-WH-24],[-60,420],entreE(T,tLe+.2,tLe+1.4),260); oursonE(c,x,y,1.6,0,T); }
      if(T>=tNeuf){ const Y=200;
        motCouleursE(c,[['neu',CRAIE.blanc],['f',T>=tF?CRAIE.faux:CRAIE.blanc]],210,Y,90*zoom(T,tNeuf,.5));
        if(T>=tR9c){ ecrire(c,'→',405,Y,90,CRAIE.blanc); motCouleursE(c,[['neu',CRAIE.blanc],['v',T>=tV?CRAIE.ok:CRAIE.blanc],['ième',CRAIE.blanc]],720,Y,90*zoom(T,tR9c,.5)); }
        if(T>=tV) for(const [x,y] of [[520,130],[930,130]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); } }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); qd.jusque('Mon'); const phraseQ=[qd('Mon ourson est dans quel wagon ?')];
  const tq=w=>mot('01-question',w)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et compte !')];
  const r1=phraseE('1ᵉʳ, 2ᵉ, 3ᵉ… 8ᵉ, 9ᵉ.',[tR1,tR2,tR3,tR8,tR9]);
  const r2=phraseE('Le 9ᵉ wagon !',[tLe,tR9b,mr('wagon')]);

  poserMiniature(outils,q-.3,'Dans quel<br>wagon ?',ardoiseMini([['🚃🧸'],['?','#ffd43b']]));
  return { clips,FIN,titre:'Le petit train de la fête',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['le 8<sup>e</sup>',tq('A'),tq('huitième')],['le 10<sup>e</sup>',tq('B'),tq('dixième')],['le 9<sup>e</sup>',tq('C'),tq('neuvième')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=q&&T<com) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tOh?g.montre():(T<tDans?g.oups():g.reflechit()); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tLe?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.reflechit(); }
    } };
};
