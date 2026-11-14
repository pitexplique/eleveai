/* Série Solides CM1, ÉPISODE 03 : LA PYRAMIDE DE CAISSES (ceinture orange). Outils : cm1-commun.js et
   films/cm1-solides.js (caisses : des cubes empilés, opaques, du fond vers l'avant).
   Ti Margo empile 4 caisses en bas et 1 en haut ; vu d'en haut il en voit 4 : « 4 en tout ! ».
   Oups : une caisse est cachée sous celle du haut (elle ne flotte pas).
   Question : 2 × 2 en bas + 1 en haut = 5 (A). Commentaire : 3 × 3 + 2 × 2 + 1 ? */

FILMS.defi=function(outils){
  const DUR={'00-accroche':11.85,'01-oups':5.59,'02-question':17.48,'02b-reponse':9.43,'03-ouf':5.26,'04-commentaire':10.68,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,oup,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  const W=tab.W;

  const tJe=mot('00-accroche','J\'empile'), tHaut=mot('00-accroche','haut'), tRegarde=mot('00-accroche','regarde'),
    tVois=mot('00-accroche','vois'), tTout=mot('00-accroche','tout');
  const tCachee=mot('01-oups','cachée'), tFlotte=mot('01-oups','flotte');
  const t5=mot('03-ouf','5'), tDebout=mot('03-ouf','debout');
  const tBas=mot('04-commentaire','bas'), tMilieu=mot('04-commentaire','milieu'), tHaut2=mot('04-commentaire','haut'), tRep=mot('04-commentaire','Réponds');

  const BAS=[[0,0,0],[1,0,0],[0,0,1],[1,0,1]], HAUT=[0,1,1], TOUS=[...BAS,HAUT], CACHEE='0,0,1';
  const o=centrerCaisses(TOUS,225,W/2-30,400);
  /* le centre écran du DESSUS d'une caisse (pour y écrire un numéro) */
  const dessus=([x,y,z],oo=o)=>cav([x+.5,y+1,z+.5],oo.e,oo.ox,oo.oy);
  const devant=([x,y,z],oo=o)=>cav([x+.5,y+.5,z],oo.e,oo.ox,oo.oy);

  function dessiner(T){ const c=tab.c; tab.effacer(); const X=W/2;
    if(T>=com){ /* le défi : 3 × 3, 2 × 2, 1 */
      const P3=[], P2=[]; for(let x=0;x<3;x++) for(let z=0;z<3;z++) P3.push([x,0,z]);
      for(let x=0;x<2;x++) for(let z=0;z<2;z++) P2.push([x+.5,1,z+.5]);
      const pos=[...P3,...(T>=tMilieu?P2:[]),...(T>=tHaut2?[[1,2,1]]:[])];
      const oc=centrerCaisses([...P3,...P2,[1,2,1]],150,X-110,400);
      if(pos.length) caisses(c,pos,oc);
      if(T>=tRep) ecrire(c,'?',X+330,330,150*zoom(T,tRep,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T<oup){ /* il empile ; d'en haut, il voit 4 caisses */
      const pos=[...BAS,...(T>=tHaut?[HAUT]:[])];
      caisses(c,pos,o);
      if(T>=tRegarde){ const u=zoom(T,tRegarde,.4); rond(c,W-140,90,34*u,'#f8f9fa'); rond(c,W-140,90,15*u,'#1f3b2c'); }
      if(T>=tVois){ [[0,0,0],[1,0,0],[1,0,1],HAUT].forEach((p,k)=>{ if(T>=tVois+.15*k){ const d=dessus(p); ecrire(c,String(k+1),d[0],d[1]+4,66,CRAIE.jaune); } }); }
      if(T>=tTout) ecrire(c,'4 en tout ?',X,70,60*zoom(T,tTout,.4),CRAIE.blanc);
      tab.maj(); return; }
    if(T<q){ /* oups : la caisse cachée sous celle du haut */
      const al={}; if(T>=tCachee) TOUS.forEach(p=>{ const k=p.join(','); al[k]=k===CACHEE?1:.28; });
      caisses(c,TOUS,o,{alpha:al,couleurs:T>=tCachee?{[CACHEE]:'#ff6b6b'}:{}});
      if(T>=tCachee){ const p=devant([0,0,1]); c.save(); c.globalAlpha=1; ecrire(c,'cachée !',p[0]-200,p[1]+150,56*zoom(T,tCachee,.4),CRAIE.faux); c.restore(); }
      if(T>=tFlotte) ecrire(c,'elle ne flotte pas !',X,70,54*zoom(T,tFlotte,.4),CRAIE.jaune);
      tab.maj(); return; }
    /* ouf : 5 caisses, numérotées ; la pyramide tient debout */
    caisses(c,TOUS,o);
    if(T>=t5) ecrire(c,'5 caisses',X,70,62*zoom(T,t5,.4),CRAIE.ok);
    if(T>=tDebout) coche(c,W-150,620,.7);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,tJe-.08,352,62,a0('Salut !')),
    ...suiteDe(oup,60,62,[a0('J’empile des caisses'),a0('en pyramide.')],[a0('En haut, 1 caisse.')],
      [a0('Je regarde d’en haut…'),a0('je vois 4 caisses.')],[a0('Donc 4 caisses en tout !')]),
    ...suiteDe(q,60,62,[a1('Hé ! Il y a une caisse'),a1('cachée en dessous :')],[a1('la caisse du haut'),a1('ne flotte pas !')]),
    ...suiteDe(com,60,62,[a3('Ouf ! 5 caisses.')],[a3('Ma pyramide'),a3('tient debout !')]),
    ...suiteDe(f,60,60,[a4('À toi : une pyramide'),a4('de caisses avec')],[a4('3 fois 3 en bas,'),a4('2 fois 2 au milieu'),a4('et 1 en haut.')],
      [a4('Combien de caisses ?'),a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('En bas, 2 rangées'),qd('de 2 caisses.'),qd('En haut, 1 caisse.'),qd('Combien de caisses en tout ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('En bas : 2 fois 2, 4.'), r2=rd('En haut : 1.'), r3=rd('4 plus 1, 5 caisses.'), r4=rd('Celles du dessous'), r5=rd('comptent aussi !');
  const tA=mot('02b-reponse','A');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    <rect x="70" y="140" width="70" height="70" fill="#c8843a" stroke="#4a2c0a" stroke-width="5"/>
    <rect x="140" y="140" width="70" height="70" fill="#c8843a" stroke="#4a2c0a" stroke-width="5"/>
    <rect x="95" y="70" width="70" height="70" fill="#c8843a" stroke="#4a2c0a" stroke-width="5"/>
    <text x="265" y="130" font-family="Segoe UI" font-weight="800" font-size="80" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Combien<br>de caisses ?'+PARI,mini);
  return { clips,FIN,titre:'La pyramide de caisses',ceinture:2,finTitre:tJe-.08,groupes,finClip:'05-abonne',
    cuts:[tJe-.08,oup,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['5 caisses',tq('A'),tq('5')],['4 caisses',tq('B'),tq('4')],['3 caisses',tq('C'),tq('3')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2,r3,r4,r5],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tJe-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<oup){ T<tVois?g.montre():g.fier(); }
      else if(T<q){ if(T<tFlotte){ g.oups(); scene.ry=-.12+.3*lisse((T-oup)/.35); } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.pouce(); }
      else if(T<com){ T<tDebout?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
