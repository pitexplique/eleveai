/* Série Solides CE2, ÉPISODE 02 : LES GOMMETTES DU DÉ (ceinture blanche). Outils : ce2-commun.js et
   films/ce2-solides.js (polyedre, dessinerPoly, centrer, pyramide3).
   Ti Margo colle une gommette sur 4 coins de son dé géant : fini ? Il le retourne : dessous, encore 4 coins.
   Question : 8 sommets (C). Commentaire : les sommets d'une pyramide à base carrée. */

FILMS.decrire=function(outils){
  const DUR={'00-accroche':10.09,'01-oups':5.64,'02-question':12.74,'02b-reponse':8.38,'03-ouf':4.42,'04-commentaire':6.51,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,oup,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  const W=tab.W;

  const tJe=mot('00-accroche','Je'), tDe=mot('00-accroche','dé'), t1=mot('00-accroche','1'), t2=mot('00-accroche','2'), t3=mot('00-accroche','3'),
        t4=mot('00-accroche','4'), tFini=mot('00-accroche','fini');
  const tRet=mot('01-oups','retourne'), tDessous=mot('01-oups','dessous'), tNus=mot('01-oups','nus');
  const tHuit=mot('03-ouf','8'), tBrille=mot('03-ouf','brille');
  const tPyr=mot('04-commentaire','pyramide'), tRep=mot('04-commentaire','Réponds');

  const DE=pave3(1,1,1), HAUT=[3,2,6,7], BAS=[0,1,5,4];
  /* Le dé : blanc, des points ; les gommettes jaunes sur les sommets déjà collés */
  function de(c,T,colles,{rouges=[],brille=0}={}){ const o=centrer(DE,330,W/2,370);
    const pr=dessinerPoly(c,DE,{...o,coul:'#f1f3f5',trait:'#495057',lw:6});
    const pt=(k,u,v)=>{ const f=DE.faces[k].f.map(i=>pr[i]); return [f[0][0]+u*(f[1][0]-f[0][0])+v*(f[3][0]-f[0][0]), f[0][1]+u*(f[1][1]-f[0][1])+v*(f[3][1]-f[0][1])]; };
    for(const [k,uvs] of [[0,[[.5,.5]]],[3,[[.28,.28],[.72,.72]]],[5,[[.25,.25],[.5,.5],[.75,.75]]]]) for(const [u,v] of uvs) rond(c,...pt(k,u,v),13,'#212529');
    for(const i of rouges){ const on=Math.sin(T*9)>-.2; if(on) cercle(c,...pr[i],34,CRAIE.faux); }
    colles.forEach(([i,t0])=>{ if(T>=t0) rond(c,...pr[i],24*zoom(T,t0,.35),SSOMMET); });
    if(brille>0) for(const i of [...HAUT,...BAS]){ const s=10+14*Math.abs(Math.sin(T*5+i)); c.strokeStyle='#fff3bf'; c.lineWidth=4;
      c.beginPath(); c.moveTo(pr[i][0]-s-28,pr[i][1]); c.lineTo(pr[i][0]-28,pr[i][1]); c.moveTo(pr[i][0]+28,pr[i][1]); c.lineTo(pr[i][0]+s+28,pr[i][1]); c.stroke(); }
    return pr; }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : une pyramide à base carrée */
      const P=pyramide3(4,1,1.15), o=centrer(P,330,W/2,380); dessinerPoly(c,P,{...o,coul:'#ffd43b'});
      if(T>=tRep) ecrire(c,'?',W/2+300,250,150*zoom(T,tRep,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T<oup){ /* 1, 2, 3, 4 : les coins du dessus */
      if(T>=tDe) de(c,T,HAUT.map((i,k)=>[i,[t1,t2,t3,t4][k]]));
      [t1,t2,t3,t4].forEach((t,k)=>{ if(T>=t) ecrire(c,String(k+1),120+90*k,90,64*zoom(T,t,.3),SSOMMET); });
      if(T>=tFini) coche(c,W-120,90,.7);
      tab.maj(); return; }
    if(T<q){ /* il retourne le dé : dessous, 4 coins tout nus */
      de(c,T,HAUT.map(i=>[i,0]),{rouges:T>=tDessous?BAS:[]});
      if(T>=tNus) ecrire(c,'4 coins tout nus !',W/2,62,58*zoom(T,tNus,.4),CRAIE.faux);
      tab.maj(); return; }
    /* ouf : 8 gommettes, le dé brille */
    de(c,T,[...HAUT,...BAS].map(i=>[i,0]),{brille:T>=tBrille?1:0});
    if(T>=tHuit) ecrire(c,'8 gommettes',W/2,62,62*zoom(T,tHuit,.4),SSOMMET);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,tJe-.08,352,62,a0('Salut !')),
    ...suiteDe(oup,60,62,[a0('Je colle une gommette'),a0('sur chaque coin'),a0('de mon dé géant.')],[a0('1, 2, 3, 4.')],[a0('4 coins, c’est fini !')]),
    ...suiteDe(q,60,62,[a1('Hé !'),a1('Je retourne le dé…')],[a1('dessous, il y a encore'),a1('des coins tout nus !')]),
    ...suiteDe(com,60,62,[a3('Ouf ! 8 gommettes :')],[a3('mon dé brille'),a3('de partout !')]),
    ...suiteDe(f,60,60,[a4('À toi : combien'),a4('de sommets a une pyramide'),a4('à base carrée ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de sommets'),qd('a un cube ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('4 coins en haut,'), r2=rd('et 4 coins en bas :'), r3=rd('8 sommets.'), r4=rd('6, ce sont les faces !');
  const tC=mot('02b-reponse','C');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    <polygon points="90,95 200,95 200,205 90,205" fill="#f1f3f5" stroke="#495057" stroke-width="4"/><polygon points="90,95 130,60 240,60 200,95" fill="#fff" stroke="#495057" stroke-width="4"/>
    <polygon points="200,95 240,60 240,170 200,205" fill="#ced4da" stroke="#495057" stroke-width="4"/>
    <circle cx="90" cy="95" r="12" fill="#ffd43b"/><circle cx="200" cy="95" r="12" fill="#ffd43b"/><circle cx="130" cy="60" r="12" fill="#ffd43b"/><circle cx="240" cy="60" r="12" fill="#ffd43b"/>
    <text x="280" y="225" font-family="Segoe UI" font-weight="800" font-size="60" fill="#ff8787" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'4 coins,<br>c’est fini ?'+PARI,mini);
  return { clips,FIN,titre:'Les gommettes du dé',ceinture:0,finTitre:tJe-.08,groupes,finClip:'05-abonne',
    cuts:[tJe-.08,oup,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['4 sommets',tq('A'),tq('4')],['6 sommets',tq('B'),tq('6')],['8 sommets',tq('C'),tq('8')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2,r3,r4],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tJe-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<oup){ T<tFini?g.montre():g.fier(); }
      else if(T<q){ if(T<tNus){ g.oups(); scene.ry=-.12+.3*lisse((T-tRet)/.35); } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.pouce(); }
      else if(T<com){ T<tBrille?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
