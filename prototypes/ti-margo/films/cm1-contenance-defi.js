/* ============================================================
   Série Contenance CM1 — ÉPISODE 04 : LE JUS DE LA FÊTE. Outils : films/cm1-commun.js + cm1-contenance.js.
   Fête de la classe : 2 bouteilles de 1 L, 25 élèves, un gobelet de 10 cL chacun. « 25 c'est bien plus que 2 ! »
   Même unité : 2 L = 200 cL ; 25 × 10 cL = 250 cL. Il manque 50 cL (B), soit 5 gobelets. Ti Margo achète une bouteille de plus.
   Commentaire : 3 bouteilles de 1 L, des gobelets de 20 cL : combien de gobelets ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 ; les dessins à gauche et en bas à droite (Ti Margo cache le bas du milieu) */
const BT=[100,225], BY=600;

FILMS['defi']=function(outils){
  fusionnerNombres();
  /* « deux cent cinquante moins » donne 4 jetons « 250 moins » : on en garde 2 (« 250 » puis « − ») */
  { const L=((window.CUES||{})[VIDEO]||{})['02b-reponse']; if(L){ let n=0; const g=L.filter(x=>x[1]!=='250 moins'||(++n,n===1||n===4)); L.splice(0,L.length,...g); } }
  const DUR={'00-accroche':16.84,'01-calcul':10.76,'02-question':14.38,'02b-reponse':7.34,'03-ouf':4.45,'04-commentaire':10.2,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,uni,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tBout=mot('00-accroche','bouteilles'), t1L=mot('00-accroche','1'), tEleves=mot('00-accroche','élèves'),
        tGob=mot('00-accroche','gobelet'), t10=mot('00-accroche','10'), tPlus=mot('00-accroche','plus'),
        tManque=mot('00-accroche','manque'), tJai=mot('00-accroche',"J'ai");
  const tUnite=mot('01-calcul','unité'), t200=mot('01-calcul','200'), t25g=mot('01-calcul','gobelets'), t250=mot('01-calcul','250');
  const tB=mot('02b-reponse','B'), t5g=mot('02b-reponse','5');
  const tAch=mot('03-ouf','bouteille'), tReste=mot('03-ouf','reste');
  const tC3=mot('04-commentaire','3'), tC20=mot('04-commentaire','20'), tCombien=mot('04-commentaire','Combien'),
        tRep=mot('04-commentaire','Réponds');
  const finTitre=tJai-.08, XR=770;

  function gobelet(c,x,y,s,z=1){ recipientCraie(c,'verre',x,y,70*s,90*s,.8,JUS,z); }
  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 3 bouteilles de 1 L, des gobelets de 20 cL */
      if(T>=tC3) for(let k=0;k<3;k++){ bouteilleCraie(c,90+k*115,BY,90,220,.85,JUS,zoom(T,tC3+k*.08,.4)); }
      if(T>=tC3) ecrire(c,'3 × 1 L',205,665,54*zoom(T,tC3,.4),CRAIE.jaune);
      if(T>=tC20){ const z=zoom(T,tC20,.4); gobelet(c,960,600,1.2,z); ecrire(c,'20 cL',960,665,50*z,CRAIE.jaune); }
      if(T>=tCombien) ecrire(c,'?',XR,330,220*zoom(T,tCombien,.6),CRAIE.jaune);
      tab.maj(); return; }
    /* les bouteilles de jus (2 × 1 L), puis la 3e quand Ti Margo en achète une */
    if(T>=tBout) BT.forEach((x,k)=>bouteilleCraie(c,x,BY,95,230,.85,JUS,zoom(T,tBout+k*.1,.4)));
    if(T>=ouf&&T>=tAch) bouteilleCraie(c,350,BY,95,230,.85,JUS,zoom(T,tAch,.4),'#e03131');
    if(T>=t1L){ const trois=T>=ouf&&T>=tAch; ecrire(c,trois?'3 × 1 L':'2 × 1 L',trois?225:162,665,52*zoom(T,trois?tAch:t1L,.4),CRAIE.jaune); }
    if(T>=tGob&&T<ouf){ const z=zoom(T,tGob,.4); gobelet(c,990,600,1.2,z); }
    if(T>=t10&&T<ouf) ecrire(c,'10 cL',990,665,48*zoom(T,t10,.4),CRAIE.jaune);
    if(T<uni){
      if(T>=tEleves) ecrire(c,'25 élèves',XR,140,86*zoom(T,tEleves,.4),CRAIE.jaune);
      if(T>=tGob) ecrire(c,'1 gobelet chacun',XR,235,60*zoom(T,tGob,.4),CRAIE.gris);
      if(T>=tPlus) ecrire(c,'25 > 2 ?',XR,355,96*zoom(T,tPlus,.4),CRAIE.faux);
      if(T>=tManque){ const z=zoom(T,tManque,.4); ecrire(c,'il en manque',XR,465,66*z,CRAIE.faux); ecrire(c,'plein ?',XR,545,66*z,CRAIE.faux); }
    } else if(T<ouf){ /* la même unité : des centilitres */
      if(T>=tUnite) ecrire(c,'même unité : cL',XR,120,64*zoom(T,tUnite,.4),CRAIE.gris);
      if(T>=t200) ecrire(c,'2 L = 200 cL',XR,240,84*zoom(T,t200,.4),CRAIE.ok);
      if(T>=t25g) ecrire(c,'25 × 10 cL',XR,360,80*zoom(T,t25g,.4),CRAIE.jaune);
      if(T>=t250) ecrire(c,'= 250 cL',XR,460,84*zoom(T,t250,.4),CRAIE.ok);
    } else { /* la réponse : il manque 50 cL, 5 gobelets ; une bouteille de plus */
      ecrire(c,'250 − 200',XR,105,72,CRAIE.ok); ecrire(c,'= 50 cL',XR,185,72,CRAIE.ok);
      ecrire(c,'il manque',XR,285,64,CRAIE.faux); ecrire(c,'5 gobelets',XR,360,72,CRAIE.faux);
      if(T>=tAch) ecrire(c,'+ 1 L = 100 cL',XR,470,68*zoom(T,tAch,.4),CRAIE.ok);
      if(T>=tReste) ecrire(c,'il reste 50 cL !',XR,570,66*zoom(T,tReste,.4),CRAIE.jaune); }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-calcul'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Fête de la classe !')),
    ...suiteDe(uni,60,60,[a0("J'ai 2 bouteilles de jus"),a0('de 1 litre.')],[a0('Nous sommes 25 élèves,'),a0('avec un gobelet'),a0('de 10 centilitres chacun.')],
      [a0('25 élèves,'),a0('2 bouteilles…')],[a0("25, c'est bien plus que 2 :"),a0('il en manque plein !')]),
    ...suiteDe(q,60,62,[a1('Attends,'),a1('je mets la même unité.')],[a1('2 litres :'),a1('200 centilitres.')],
      [a1('25 gobelets de 10 centilitres :'),a1('250 centilitres.')]),
    ...suiteDe(com,60,62,[a3("J'achète une bouteille de plus…")],[a3("et le reste, c'est pour moi !")]),
    ...suiteDe(f,60,60,[a4('À toi : 3 bouteilles'),a4('de 1 litre,')],[a4('et des gobelets'),a4('de 20 centilitres.')],
      [a4('Combien de gobelets'),a4('peut-on remplir ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Ai-je assez de jus ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('250 − 200 = 50 centilitres :'), r2=rd('il manque 5 gobelets.');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="35" y="80" width="46" height="130" rx="10" fill="#ff922b" stroke="#dee2e6" stroke-width="5"/><rect x="49" y="56" width="18" height="24" fill="#2f9e44"/>`+
    `<rect x="100" y="80" width="46" height="130" rx="10" fill="#ff922b" stroke="#dee2e6" stroke-width="5"/><rect x="114" y="56" width="18" height="24" fill="#2f9e44"/>`+
    `<path d="M165 160 L195 160 L190 205 L170 205 Z" fill="#ff922b" stroke="#dee2e6" stroke-width="4"/>`+
    `<text x="265" y="190" font-family="Segoe UI" font-weight="800" font-size="140" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'2 L de jus<br>pour 25 élèves ?'+PARI,mini);
  return { clips,FIN,titre:'Assez de jus ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,uni,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['oui, il en reste',tq('A'),tq('reste')],['non, il manque 50 cL',tq('B'),tq('centilitres')],['oui, tout juste',tq('C'),tq('juste')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<uni){ T<tPlus?g.montre():g.oups(); }
      else if(T<q){ T<t200?g.reflechit():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():(T<t5g?g.pouce():g.oups()); }
      else if(T<com){ T<tReste?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
