/* Série Périmètre CE2, ÉPISODE 02 : LA GUIRLANDE DE LA CABANE (ceinture blanche). Outils : ce2-commun.js
   et films/ce2-perimetre.js (cheminCraie, boutChemin, rond, entre).
   Ti Margo entoure sa cabane (5 côtés : sol 4, mur 3, toit 3 et 3, mur 3) d'une guirlande : il compte
   4 + 3 + 3 + 3 = 13 m et oublie un mur. Question : 16 m (A). Commentaire : un triangle 5, 6, 7 cm. */

/* Les ampoules de la guirlande le long d'un chemin tracé jusqu'à u (elles clignotent si T est donné) */
function ampoules(c,pts,u,T=null){ const coul=['#ff6b6b','#ffd43b','#69db7c','#74c0fc','#da77f2'];
  for(let k=0;k<=40;k++){ const v=k/40; if(v>u) break; const [x,y]=boutChemin(pts,v);
    const on=T===null||Math.sin(T*6+k*1.7)>-.3; rond(c,x,y,on?11:7,on?coul[k%5]:'#868e96'); } }

FILMS.polygone=function(outils){
  const DUR={'00-accroche':13.43,'01-oups':5.9,'02-question':14.47,'02b-reponse':15.91,'03-ouf':5.42,'04-commentaire':9.77,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,oup,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  const W=tab.W;

  /* La cabane : sol 4 m, murs 3 m, toit 3 m + 3 m (pointe à 2,24 m au-dessus des murs) ; 85 px par mètre */
  const S=100, X0=(W-4*S)/2, YB=645;
  const BL=[X0,YB], BR=[X0+4*S,YB], TR=[X0+4*S,YB-3*S], PT=[X0+2*S,YB-(3+2.236)*S], TL=[X0,YB-3*S];
  const OUBLI=[BL,BR,TR,PT,TL], TOUT=[BL,BR,TR,PT,TL,BL];

  const tJe=mot('00-accroche','J\'entoure'), tSol=mot('00-accroche','sol'), tMur=mot('00-accroche','mur'),
        tA3=mot('00-accroche','3'), tToit=mot('00-accroche','toit'), tT3=mot('00-accroche','3',2), tT3b=mot('00-accroche','3',3),
        t13=mot('00-accroche','13');
  const tNon=mot('01-oups','non'), tBout=mot('01-oups','bout'), tMurO=mot('01-oups','mur');
  const tOuf=mot('03-ouf','Ouf'), tBrille=mot('03-ouf','brille');
  const tC5=mot('04-commentaire','5'), tC6=mot('04-commentaire','6'), tC7=mot('04-commentaire','7'), tRep=mot('04-commentaire','Réponds');

  function cabane(c){ c.fillStyle='#8a5a2b'; c.beginPath(); c.moveTo(...BL); [BR,TR,PT,TL].forEach(p=>c.lineTo(...p)); c.closePath(); c.fill();
    c.fillStyle='#5c3a1a'; c.fillRect(X0+1.4*S,YB-1.9*S,1.2*S,1.9*S);
    c.fillStyle='#a5d8ff'; c.fillRect(X0+.35*S,YB-2.4*S,.8*S,.7*S); c.fillRect(X0+2.85*S,YB-2.4*S,.8*S,.7*S); }
  function cote(c,s,x,y,T0,T,coul=CRAIE.blanc,taille=52){ if(T>=T0) ecrire(c,s,x,y,taille*zoom(T,T0,.4),coul); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un triangle 5, 6, 7 cm */
      const P1=[300,560], P2=[300+7*75,560], P3=[300+1.43*75,560-4.9*75];
      c.fillStyle='#364fc7'; c.beginPath(); c.moveTo(...P1); c.lineTo(...P2); c.lineTo(...P3); c.closePath(); c.fill();
      c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.stroke();
      cote(c,'5 cm',P1[0]-20,(P1[1]+P3[1])/2,tC5,T,CRAIE.jaune,56); cote(c,'6 cm',(P2[0]+P3[0])/2+90,(P2[1]+P3[1])/2,tC6,T,CRAIE.jaune,56);
      cote(c,'7 cm',(P1[0]+P2[0])/2,P1[1]+55,tC7,T,CRAIE.jaune,56);
      if(T>=tRep) ecrire(c,'?',(P1[0]+P2[0]+P3[0])/3,(P1[1]+P2[1]+P3[1])/3+20,130*zoom(T,tRep,.6),CRAIE.jaune);
      tab.maj(); return; }
    cabane(c);
    if(T>=ouf){ /* la guirlande fait tout le tour, elle brille */
      cheminCraie(c,TOUT,1,TOUR,10); ampoules(c,TOUT,1,T>=tBrille?T:null);
      if(T>=tOuf) coche(c,X0+4*S+40,YB-4.6*S,.75);
      tab.maj(); return; }
    if(T<oup){ /* l'accroche : sol, mur, toit, toit… 13 m */
      const us=[entre(T,tSol,tSol+.7),entre(T,tA3,tA3+.6),entre(T,tT3,tT3+.4),entre(T,tT3b,tT3b+.4)];
      const segs=[[BL,BR],[BR,TR],[TR,PT],[PT,TL]];
      segs.forEach((s,k)=>{ cheminCraie(c,s,us[k],TOUR,10); ampoules(c,s,us[k]); });
      cote(c,'4 m',X0+2*S,YB+45,tSol,T); cote(c,'3 m',X0+4*S+60,YB-1.5*S,tMur,T);
      cote(c,'3 m',X0+3.4*S,YB-4.4*S,tT3,T); cote(c,'3 m',X0+.6*S,YB-4.4*S,tT3b,T);
      if(T>=t13) ecrire(c,'13 m !',W/2,70,64*zoom(T,t13,.4),CRAIE.jaune);
      tab.maj(); return; }
    /* l'oubli : le mur de gauche nu, en pointillé rouge */
    cheminCraie(c,OUBLI,1,TOUR,10); ampoules(c,OUBLI,1);
    cote(c,'4 m',X0+2*S,YB+45,0,T); cote(c,'3 m',X0+4*S+60,YB-1.5*S,0,T); cote(c,'3 m',X0+3.4*S,YB-4.4*S,0,T); cote(c,'3 m',X0+.6*S,YB-4.4*S,0,T);
    if(T>=tBout){ c.setLineDash([18,16]); cheminCraie(c,[TL,BL],1,CRAIE.faux,10); c.setLineDash([]);
      ecrire(c,'?',X0-60,YB-1.5*S,110*zoom(T,tBout,.5),CRAIE.faux); }
    if(T>=tMurO) ecrire(c,'mur oublié !',W/2,70,62*zoom(T,tMurO,.4),CRAIE.faux);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,tJe-.08,352,62,a0('Salut !')),
    ...suiteDe(oup,60,62,[a0('J’entoure ma cabane'),a0('d’une guirlande.')],[a0('Le sol, 4 mètres.'),a0('Le mur, 3.')],[a0('Le toit, 3 et 3.')],
      [a0('Il me faut 13 mètres !')]),
    ...suiteDe(q,60,62,[a1('Oh non !')],[a1('Il manque un bout'),a1('de guirlande.')],[a1('J’ai oublié un mur !')]),
    ...suiteDe(com,60,62,[a3('Ouf ! La guirlande'),a3('fait tout le tour.')],[a3('Ça brille !')]),
    ...suiteDe(f,60,60,[a4('À toi : un triangle a'),a4('des côtés de 5,'),a4('6 et 7 centimètres.')],[a4('Quel est son périmètre ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de mètres'),qd('de guirlande pour'),qd('faire tout le tour ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.jusque('4'); const r1=rd('4 + 3 = 7,');
  /* « 4 plus » compte déjà pour un « plus » : les « Plus » dits seuls sont le 2e, le 3e et le 4e */
  const P=k=>mot('02b-reponse','Plus',k), R=n=>mot('02b-reponse',n);
  const r2=[P(2),R('10'),'7 + 3 = 10,'], r3=[P(3),R('13'),'10 + 3 = 13,'], r4=[P(4),R('16'),'13 + 3 = 16.'];
  const r5=[mot('02b-reponse','Cinq'),mot('02b-reponse','nombres'),'5 côtés, 5 nombres !'];
  const tA=mot('02b-reponse','A');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    <polygon points="105,215 225,215 225,125 165,58 105,125" fill="#8a5a2b"/>
    <polyline points="105,215 225,215 225,125 165,58 105,125" fill="none" stroke="#ff922b" stroke-width="8" stroke-linejoin="round"/>
    <line x1="105" y1="125" x2="105" y2="215" stroke="#ff8787" stroke-width="8" stroke-dasharray="12 10"/>
    <text x="70" y="182" font-family="Segoe UI" font-weight="800" font-size="56" fill="#ff8787" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Il me faut<br>13 m ?'+PARI,mini);
  return { clips,FIN,titre:'La guirlande de la cabane',ceinture:0,finTitre:tJe-.08,groupes,finClip:'05-abonne',
    cuts:[tJe-.08,oup,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['16 m',tq('A'),tq('16')],['13 m',tq('B'),tq('13')],['19 m',tq('C'),tq('19')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2,r3,r4],suite:[r5] },
    jouer(P_,T,cam){
      const g=gestes(P_,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tJe-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<oup){ T<t13?g.montre():g.fier(); }
      else if(T<q){ if(T<tMurO+.4){ g.oups(); scene.ry=-.12+.3*lisse((T-tNon)/.35); } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.pouce(); }
      else if(T<com){ T<tBrille?g.fier():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P_.jaw=.62; g.fier(); }
    } };
};
