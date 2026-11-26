/* ============================================================
   Série Nombres entiers CP — PAYSAGE 06 : « Les sauts de la grenouille » (micro cp_entier_droite), 26/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier-paysage.js + cp-entier2-dessins.js. Voix : manim/voix/cp-entier-droite-paysage.json.
   Sur l'étang au lever du jour, la piste de la grenouille : chaque saut avance de un ; seuls 0, 5 et 10 sont écrits ;
   elle dort sur le 7 (5, puis 6, 7). Questions en plein milieu : la luciole → A (6) ; où est le 9 ? → C (le point bleu).
   ⭐ Pendant les questions, la piste tient à gauche de l'ardoise (x < 520) ; la carte est à droite.
   ============================================================ */
FILMS['droite']=function(outils){
  const DUR={'00-accroche':9.04,'01-sauts':7.34,'02-ranges':9.44,'03-trouver':12.18,'04-question':14.57,'04b-reponse':5.49,
    '05-question':13.65,'05b-reponse':7.94,'06-appris':6.79,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-sauts':.5,'02-ranges':1,'03-trouver':1.2,
    '04-question':3.3,'04b-reponse':1.4,'05-question':3.3,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,sa,ra,tr,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:60px!important;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w), tSur=m0('Sur'), tJour=m0('jour'), tPiste=m0('piste'), tGren=m0('grenouille'), tZero=m0('zéro');
  const ms=(w,n=1)=>mot('01-sauts',w,n), tSauts=[ms('un',2),ms('deux'),ms('trois')], tTrait=ms('trait');
  const mg=(w,n=1)=>mot('02-ranges',w,n), tNombres=mg('nombres'), tPetits=mg('petits'), tGrands=mg('grands'), tDix=mg('dix');
  const mt=(w,n=1)=>mot('03-trouver',w,n), tQuelques=mt('quelques'), tDort=mt('dort'), tCinq=mt('cinq'), tSix=mt('six'), tSept=mt('sept'), tSept2=mt('sept',2);
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tA=mr1('A'), tCinqR=mr1('cinq'), tSaut=mr1('saut'), tSixR=mr1('six');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tC=mr2('C'), tNeufR=mr2('Neuf'), tDixR=mr2('dix'), tArr=mr2('arrière'), tBleu=mr2('bleu');
  const tSautA=mot('06-appris','saut'), tParsA=mot('06-appris','pars');
  const finTitre=tSur-.08;

  /* la grande piste (histoire) : 0 à 10, de x 80 à 980 ; la petite (questions) : de x 40 à 490 */
  const G={x0:80,y0:480,dx:90}, Pt={x0:40,y0:420,dx:45};
  const NB=[...Array(11).keys()];
  /* la grenouille : où est-elle à l'instant T (avec ses sauts en cloche) */
  function placeGren(T){ const sauts=[[tSauts[0],0,1],[tSauts[1],1,2],[tSauts[2],2,3],[tDort-.5,3,7]];
    let v=0, u=1, de=0; for(const [t,a,b] of sauts){ if(T>=t-.35){ de=a; v=b; u=entreE(T,t-.35,t); } }
    return {de,v,u}; }
  function decor(c,T){ if(T>=tJour) soleilCouchant(c,880,320,80,entreE(T,tJour,tJour+1.5)); etangE(c,T,320); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris : la grenouille saute de 0 à 10 */
      decor(c,T); const n=Math.min(10,Math.floor(Math.max(0,T-ap-.3)/.6)), u=entreE((T-ap-.3)%.6,0,.4);
      const pos=pisteE(c,{...G,ecrits:[0,5,10],taille:64,allume:v=>v<=n&&T>=tSautA?.6:0});
      const a=pos(n), b=pos(Math.min(10,n+1)), p=n>=10?a:sautE(a,b,u,90);
      if(T>=tParsA) arcSautE(c,a,b,1,90,CRAIE.jaune);
      grenouilleE(c,p[0],p[1]-6,1.5); tab.maj(); return; }
    if(T>=q2){ /* où se cache le 9 ? trois points sur la petite piste */
      const pos=pisteE(c,{...Pt,ecrits:[0,5,10],taille:54,
        allume:v=>T>=r2&&((v===10&&T>=tDixR&&T<tArr)||(v===9&&T>=tArr))?1:0});
      /* le 9 écrit sous les nombres, pour ne pas toucher le 10 */
      if(T>=r2&&T>=tBleu){ const [x9,y9]=pos(9); ecrire(c,'9',x9,y9+108,54*zoom(T,tBleu,.5),CRAIE.ok); }
      const mq=w=>mot('05-question',w);
      for(const [v,coul,t] of [[3,'#ff6b6b',mq('rouge')],[7,'#51cf66',mq('vert')],[9,'#339af0',mq('bleu')]]) if(T>=t-.6){ const [x,y]=pos(v); pointE(c,x,y-60,coul,1.25*zoom(T,t-.6,.4),v===9&&T>=r2&&T>=tBleu?.5+.5*Math.sin(T*5):0); }
      if(T>=r2&&T>=tArr) arcSautE(c,pos(10),pos(9),entreE(T,tArr,tArr+.5),70,CRAIE.ok);
      if(T>=r2&&T>=tNeufR) ecrire(c,'9',260,170,130*zoom(T,tNeufR,.5),CRAIE.ok);
      tab.maj(); return; }
    if(T>=q1){ /* la luciole se pose sur le 6 */
      const pos=pisteE(c,{...Pt,ecrits:[0,5,10].concat(T>=r1&&T>=tSixR?[6]:[]),taille:54,couleur:v=>v===6?CRAIE.ok:(v===5&&T>=r1&&T>=tCinqR?CRAIE.jaune:CRAIE.blanc),
        allume:v=>T>=r1&&((v===5&&T>=tCinqR)||(v===6&&T>=tSixR))?1:0,zEcrit:v=>v===6?zoom(T,tSixR,.5):1});
      const tLu=mot('04-question','luciole'), [x6,y6]=pos(6), d=T<tLu?1:1-douxE(entreE(T,tLu,tLu+1.2));
      if(T>=tLu-.3){ const lx=x6+d*120, ly=y6-60-d*200+6*Math.sin(T*3); etincelle(c,lx,ly,26+5*Math.sin(T*5)); lucioleE(c,lx,ly,T,0,1); }
      if(T>=r1&&T>=tSaut-.3) arcSautE(c,pos(5),pos(6),entreE(T,tSaut-.3,tSaut+.2),70,CRAIE.ok);
      etoilesE(c,T,8,500,160);
      tab.maj(); return; }

    /* l'étang, la piste, la grenouille */
    decor(c,T);
    if(T<tPiste){ tab.maj(); return; }
    const histoire=T<tr, quelques=T>=tr&&T>=tQuelques;
    let ecrits=[];
    if(T>=tZero) ecrits.push(0);
    if(T>=sa) tSauts.forEach((t,k)=>{ if(T>=t) ecrits.push(k+1); });
    if(T>=ra&&T>=tNombres) for(let v=4;v<=10;v++) if(T>=tNombres+(v-4)*.5||v>=4&&T>=tDix) ecrits.push(v);
    if(T>=tr){ ecrits=quelques?[0,5,10]:NB.slice(); if(quelques&&T>=tSix) ecrits.push(6); if(quelques&&T>=tSept) ecrits.push(7); }
    ecrits=[...new Set(ecrits)];
    const allume=v=>{ if(T>=sa&&T<ra&&T>=tTrait) return .5+.5*Math.sin(T*5+v);
      if(T>=ra&&T<tr){ if(T>=tPetits&&T<tGrands&&v<=3) return 1; if(T>=tGrands&&T<tDix&&v>=7) return 1; if(T>=tDix&&v===10) return 1; }
      if(T>=tr&&((v===5&&T>=tCinq)||(v===6&&T>=tSix)||(v===7&&T>=tSept))) return 1; return 0; };
    const pos=pisteE(c,{...G,ecrits,taille:64,allume,couleur:v=>T>=tr&&v===7&&T>=tSept?CRAIE.ok:CRAIE.blanc,
      zEcrit:v=>T>=tr?(v===6?zoom(T,tSix,.5):v===7?zoom(T,tSept,.5):1):(T<ra&&v>=1&&v<=3?zoom(T,tSauts[v-1],.5):1)});
    if(T>=tr&&T>=tCinq){ if(T>=tSix-.35) arcSautE(c,pos(5),pos(6),entreE(T,tSix-.35,tSix),80); if(T>=tSept-.35) arcSautE(c,pos(6),pos(7),entreE(T,tSept-.35,tSept),80); }
    if(T>=tGren){ const {de,v,u}=placeGren(T), p=sautE(pos(de),pos(v),u,v-de>1?140:90), dort=T>=tr&&T>=tDort;
      grenouilleE(c,p[0],p[1]-6,1.5*zoom(T,tGren,.4),dort);
      if(dort) for(let k=0;k<3;k++){ const w=((T-tDort)*.6+k/3)%1; ecrire(c,'z',p[0]+40+w*60,p[1]-120-w*110,30+20*w,`rgba(255,255,255,${1-w})`); } }
    if(T>=tr&&T>=tSept2) for(const [x,y] of [[pos(7)[0]-70,300],[pos(7)[0]+70,280]]) etincelle(c,x,y,14+6*Math.sin(T*6+x));
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question'), mo=w=>mot('05-question',w);
  qa('Question !'); const phrase1=[qa('Une luciole se pose sur la piste.'),qa('Sur quel nombre ?')];
  qa.jusque('Mets'); const pause1=[qa('Mets pause, et compte les sauts !')];
  qb('Question !'); const phrase2=[phraseE('Où se cache le 9 ?',[mo('Où'),mo('se'),mo('cache'),mo('le'),mo('neuf'),mo('neuf')])];
  qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=w=>mot('04-question',w)-q1, tqb=w=>mot('05-question',w)-q2;
  const pt=coul=>`<span style="color:${coul};font-size:.8em">●</span> `;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,bonne:0,tBon:tA-r1,
      phrase:phrase1,pause:pause1,
      choix:[['6',tqa('A'),tqa('six')],['4',tqa('B'),tqa('quatre')],['7',tqa('C'),tqa('sept')]],
      tete:[[r1+.1,'Réponse '],[tA,'A !']],
      reponse:[phraseE('Je pars du 5 : un saut, 6 !',[mr1('Je'),mr1('pars'),mr1('du'),tCinqR,tCinqR,mr1('un'),tSaut,tSixR,tSixR])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,bonne:2,tBon:tC-r2,
      phrase:phrase2,pause:pause2,
      choix:[[pt('#ff6b6b')+'rouge',tqb('A'),tqb('rouge')],[pt('#51cf66')+'vert',tqb('B'),tqb('vert')],[pt('#339af0')+'bleu',tqb('C'),tqb('bleu')]],
      tete:[[r2+.1,'Réponse '],[tC,'C !']],
      reponse:[phraseE("9, c'est juste avant 10.",[tNeufR,mr2("c'est"),mr2('juste'),mr2('avant'),tDixR]),phraseE('Le point bleu.',[mr2('le'),mr2('point'),tBleu])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,tSept2,'Sur quel<br>nombre ?<div style="color:#e8590c;font-size:120px;margin-top:10px">TU PARIES ?</div>');
  return { clips,FIN,titre:'La piste de la grenouille',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,tr,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros||T<sa) g.ouvre();
      else if(T<q1) T>=tSept2?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
