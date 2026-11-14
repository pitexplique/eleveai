/* Série Solides CE2, ÉPISODE 03 : LA PYRAMIDE PEINTE (ceinture blanche). Outils : ce2-commun.js et
   films/ce2-solides.js (pyramide3, dessinerPoly, centrer).
   Ti Margo peint sa pyramide : un pot par triangle, 4 pots. Il la soulève : dessous, un carré tout blanc.
   Question : 5 faces (A). Commentaire : une pyramide à base rectangulaire. */

FILMS.pyramide=function(outils){
  const DUR={'00-accroche':9.27,'01-oups':5.33,'02-question':13.87,'02b-reponse':8.73,'03-ouf':4.7,'04-commentaire':6.9,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,oup,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  const W=tab.W;

  const tJe=mot('00-accroche','Je'), tPyr=mot('00-accroche','pyramide'), tPot=mot('00-accroche','pot'), t4=mot('00-accroche','4'), t4b=mot('00-accroche','4',2);
  const tSoul=mot('01-oups','soulève'), tCarre=mot('01-oups','carré'), tBlanc=mot('01-oups','blanc');
  const tPeinte=mot('03-ouf','peinte'), tDessous=mot('03-ouf','dessous');
  const tRect=mot('04-commentaire','rectangulaire'), tRep=mot('04-commentaire','Réponds');

  const PEINT=['#ff6b6b','#51cf66','#339af0','#fcc419'], BASEC='#e599f7';
  const PY=pyramide3(4,1,1.15), INV=pyramide3(4,1,-1.15);
  function pot(c,x,y,coul,s=1){ c.fillStyle='#adb5bd'; c.fillRect(x-38*s,y-60*s,76*s,70*s); c.fillStyle=coul; c.beginPath(); c.ellipse(x,y-60*s,38*s,12*s,0,0,7); c.fill();
    c.strokeStyle='#495057'; c.lineWidth=4; c.beginPath(); c.arc(x,y-70*s,40*s,Math.PI*1.1,Math.PI*1.9); c.stroke(); }
  function pots(c,n,T,ts){ for(let k=0;k<n;k++){ const t0=ts?ts[k]:0; if(T>=t0) pot(c,150+120*k,690,k<4?PEINT[k]:BASEC,zoom(T,t0,.35)); } }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : une pyramide à base rectangulaire */
      const P=pyramide3(4,1,1.1,1.7), o=centrer(P,260,W/2,360); dessinerPoly(c,P,{...o,coul:'#ffd43b'});
      if(T>=tRect) ecrire(c,'base rectangle',W/2,80,56*zoom(T,tRect,.4),SFACE);
      if(T>=tRep) ecrire(c,'?',W/2+330,230,150*zoom(T,tRep,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T<oup){ /* la pyramide se peint, triangle après triangle, un pot par triangle */
      const o=centrer(PY,300,W/2,330), faces={};
      [1,2,3,4].forEach((k,j)=>{ if(T>=tPot+.35*j) faces[k]=PEINT[j]; });
      if(T>=tPyr) dessinerPoly(c,PY,{...o,coul:'#e8b04b',faces});
      if(T>=tPot) pots(c,4,T,[tPot,tPot+.35,tPot+.7,tPot+1.05]);
      if(T>=t4) ecrire(c,'4 triangles',W/2-220,90,56*zoom(T,t4,.4),CRAIE.blanc);
      if(T>=t4b) ecrire(c,'4 pots',W/2+260,90,56*zoom(T,t4b,.4),CRAIE.blanc);
      tab.maj(); return; }
    if(T<q){ /* il la soulève : le carré du dessous est tout blanc */
      const u=lisse01(entre(T,tSoul,tSoul+.7)), P=u<.5?PY:INV, o=centrer(P,300,W/2,330-60*u);
      dessinerPoly(c,P,{...o,coul:'#e8b04b',faces:u<.5?{1:PEINT[0],2:PEINT[1],3:PEINT[2],4:PEINT[3]}:{0:'#ffffff',1:PEINT[0],2:PEINT[1],3:PEINT[2],4:PEINT[3]}});
      pots(c,4,T);
      if(T>=tCarre){ const pr=INV.S.slice(0,4).map(p=>cav(p,o.e,o.ox,o.oy)); c.strokeStyle=CRAIE.faux; c.lineWidth=10;
        if(Math.sin(T*9)>-.2){ c.beginPath(); pr.forEach((p,j)=>j?c.lineTo(...p):c.moveTo(...p)); c.closePath(); c.stroke(); } }
      if(T>=tBlanc) ecrire(c,'un carré tout blanc !',W/2,90,56*zoom(T,tBlanc,.4),CRAIE.faux);
      tab.maj(); return; }
    /* ouf : la base est peinte aussi, 5 pots */
    const o=centrer(INV,300,W/2,300);
    dessinerPoly(c,INV,{...o,coul:'#e8b04b',faces:{0:T>=tPeinte?BASEC:'#ffffff',1:PEINT[0],2:PEINT[1],3:PEINT[2],4:PEINT[3]}});
    pots(c,5,T);
    if(T>=tDessous) coche(c,W-120,120,.8);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,tJe-.08,352,62,a0('Salut !')),
    ...suiteDe(oup,60,62,[a0('Je peins ma pyramide'),a0('en carton.')],[a0('Un pot de peinture'),a0('par triangle :')],[a0('4 triangles, 4 pots !')]),
    ...suiteDe(q,60,62,[a1('Hé !'),a1('Je la soulève…')],[a1('et dessous, il reste'),a1('un carré tout blanc !')]),
    ...suiteDe(com,60,62,[a3('Ouf ! Ma pyramide'),a3('est toute peinte…')],[a3('même en dessous !')]),
    ...suiteDe(f,60,60,[a4('À toi : une pyramide'),a4('à base rectangulaire'),a4('a combien de faces ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de faces'),qd('a ma pyramide'),qd('à base carrée ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('4 triangles,'), r2=rd('plus le carré du dessous :'), r3=rd('5 faces.'), r4=rd('Il me faut un pot de plus !');
  const tA=mot('02b-reponse','A');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    <polygon points="70,200 200,200 150,40" fill="#ff6b6b" stroke="#f8f9fa" stroke-width="4"/><polygon points="200,200 255,160 150,40" fill="#2f9e44" stroke="#f8f9fa" stroke-width="4"/>
    <text x="280" y="225" font-family="Segoe UI" font-weight="800" font-size="56" fill="#ffd43b" text-anchor="middle">4 ?</text></svg>`;
  poserMiniature(outils,acc+1,'4 triangles,<br>4 pots ?'+PARI,mini);
  return { clips,FIN,titre:'La pyramide peinte',ceinture:0,finTitre:tJe-.08,groupes,finClip:'05-abonne',
    cuts:[tJe-.08,oup,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['5 faces',tq('A'),tq('5')],['4 faces',tq('B'),tq('4')],['6 faces',tq('C'),tq('6')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2,r3,r4],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tJe-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<oup){ T<t4?g.montre():g.fier(); }
      else if(T<q){ if(T<tBlanc+.6){ g.oups(); scene.ry=-.12+.3*lisse((T-tSoul)/.35); } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.pouce(); }
      else if(T<com){ T<tDessous?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
