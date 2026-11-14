/* Série Solides CE2, ÉPISODE 05 : LE CUBE EN SPAGHETTIS (ceinture orange). Outils : ce2-commun.js et
   films/ce2-solides.js (cav, CUBE_S, pyramide3).
   Ti Margo prend 8 spaghettis pour un cube : il en manque, le cube s'écroule.
   Question : 12 spaghettis (A) : 4 en haut, 4 en bas, 4 debout ; 8 boules pour les 8 sommets.
   Commentaire : combien de spaghettis pour une pyramide à base carrée ? */

FILMS.defi=function(outils){
  const DUR={'00-accroche':9.62,'01-oups':4.76,'02-question':14.09,'02b-reponse':9.66,'03-ouf':6.37,'04-commentaire':7.05,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,oup,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  const W=tab.W;

  const tJe=mot('00-accroche','Je'), tSpag=mot('00-accroche','spaghettis'), tBoules=mot('00-accroche','boules'),
        tArete=mot('00-accroche','arête'), t8=mot('00-accroche','8');
  const tTrous=mot('01-oups','trous'), tEcroule=mot('01-oups',"s'écroule");
  const tDebout=mot('03-ouf','debout'), tMange=mot('03-ouf','mange');
  const tPyr=mot('04-commentaire','pyramide'), tRep=mot('04-commentaire','Réponds');

  const SPAG='#ffe066', BOULE='#f783ac';
  const BAS=[[0,1],[1,5],[5,4],[4,0]], HAUT=[[3,2],[2,6],[6,7],[7,3]], DEBOUT=[[0,3],[1,2],[5,6],[4,7]];
  const e=280, ox=W/2-190, oy=560;
  const pr=CUBE_S.map(p=>cav(p,e,ox,oy));
  function baton(c,a,b,coul=SPAG,lw=11){ c.strokeStyle='#b08900'; c.lineWidth=lw+5; c.lineCap='round';
    c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke(); c.strokeStyle=coul; c.lineWidth=lw; c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke(); }
  function boule(c,p,k=1){ if(k<=0) return; rond(c,p[0],p[1],22*k,BOULE); rond(c,p[0]-7*k,p[1]-7*k,7*k,'#ffdeeb'); }
  /* les aretes dessinees une a une entre t0 et t1 */
  function aretes(c,liste,t0,t1,T,pts=pr){ liste.forEach(([i,j],k)=>{ const u=entre(T,t0+(t1-t0)*k/liste.length,t0+(t1-t0)*(k+1)/liste.length);
    if(u>0) baton(c,pts[i],[pts[i][0]+u*(pts[j][0]-pts[i][0]),pts[i][1]+u*(pts[j][1]-pts[i][1])]); }); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : une pyramide à base carrée en spaghettis, à compter */
      const P=pyramide3(4,1,1.15), o=centrer(P,300,W/2-60,390), pp=P.S.map(p=>cav(p,300,o.ox,o.oy));
      [[0,1],[1,2],[2,3],[3,0],[0,4],[1,4],[2,4],[3,4]].forEach(([i,j])=>baton(c,pp[i],pp[j]));
      pp.forEach(p=>boule(c,p));
      if(T>=tRep) ecrire(c,'?',W/2+330,330,150*zoom(T,tRep,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T<oup){ /* le paquet de spaghettis, les boules, puis 8 bâtons : le bas et 4 debout */
      if(T>=tSpag&&T<t8) for(let k=0;k<12;k++) baton(c,[150+k*14,180],[110+k*20,560],SPAG,9);
      if(T>=tBoules&&T<t8) for(let k=0;k<8;k++) boule(c,[W-330+(k%4)*70,300+Math.floor(k/4)*80],zoom(T,tBoules+k*.08,.3));
      if(T>=t8){ aretes(c,BAS,t8,t8+.8,T); aretes(c,DEBOUT,t8+.8,oup+.4,T);
        ecrire(c,'8',W-110,120,90*zoom(T,t8,.4),CRAIE.jaune); }
      tab.maj(); return; }
    if(T<q){ /* pas de dessus : les bâtons debout penchent et tombent */
      const u=lisse01(entre(T,tTrous,tEcroule+.6));
      for(const [i,j] of BAS) baton(c,pr[i],pr[j]);
      DEBOUT.forEach(([i,j],k)=>{ const s=k%2?1:-1, a=u*1.25*s+(k>1?.2*u:0), L=e;
        baton(c,pr[i],[pr[i][0]+Math.sin(a)*L,pr[i][1]-Math.cos(a)*L]); });
      [0,1,5,4].forEach(i=>boule(c,pr[i]));
      if(T>=tTrous) ecrire(c,'des trous !',W-230,140,62*zoom(T,tTrous,.4),CRAIE.faux);
      tab.maj(); return; }
    /* ouf : 12 spaghettis, 8 boules, le cube tient */
    for(const [i,j] of [...BAS,...DEBOUT,...HAUT]) baton(c,pr[i],pr[j]);
    pr.forEach(p=>boule(c,p));
    ecrire(c,'12',W-120,130,90,CRAIE.jaune);
    if(T>=tDebout) coche(c,W-120,330,.7);
    if(T>=tMange) ecrire(c,'miam ?',W-200,620,58*zoom(T,tMange,.4),CRAIE.blanc);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,tJe-.08,352,62,a0('Salut !')),
    ...suiteDe(oup,60,62,[a0('Je construis un cube'),a0('avec des spaghettis')],[a0('et des boules'),a0('de pâte à modeler.')],[a0('Un spaghetti par arête :'),a0('j’en prends 8 !')]),
    ...suiteDe(q,60,62,[a1('Hé !'),a1('Il reste des trous partout…')],[a1('mon cube s’écroule !')]),
    ...suiteDe(com,60,62,[a3('Ouf !'),a3('Mon cube tient debout.')],[a3('Je ne le mange pas…'),a3('pas encore !')]),
    ...suiteDe(f,60,60,[a4('À toi : pour une pyramide'),a4('à base carrée,'),a4('combien de spaghettis ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de spaghettis'),qd('faut-il pour un cube ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Un cube a 12 arêtes :'), r2=rd('4 en haut, 4 en bas,'), r3=rd('et 4 debout.'), r4=rd('Et 8 boules, pour les 8 sommets.');
  const tA=mot('02b-reponse','A');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    <g stroke="#ffe066" stroke-width="9" stroke-linecap="round"><line x1="80" y1="200" x2="190" y2="200"/><line x1="190" y1="200" x2="235" y2="160"/><line x1="235" y1="160" x2="125" y2="160"/><line x1="125" y1="160" x2="80" y2="200"/>
    <line x1="80" y1="200" x2="60" y2="95"/><line x1="190" y1="200" x2="215" y2="95"/></g>
    <g fill="#f783ac"><circle cx="80" cy="200" r="12"/><circle cx="190" cy="200" r="12"/><circle cx="235" cy="160" r="12"/><circle cx="125" cy="160" r="12"/></g>
    <text x="275" y="90" font-family="Segoe UI" font-weight="800" font-size="60" fill="#ff8787" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'8 spaghettis<br>pour un cube ?'+PARI,mini);
  return { clips,FIN,titre:'Le cube en spaghettis',ceinture:2,finTitre:tJe-.08,groupes,finClip:'05-abonne',
    cuts:[tJe-.08,oup,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['12 spaghettis',tq('A'),tq('12')],['8 spaghettis',tq('B'),tq('8')],['6 spaghettis',tq('C'),tq('6')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2,r3,r4],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tJe-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<oup){ T<t8?g.montre():g.fier(); }
      else if(T<q){ if(T<tEcroule+.6){ g.oups(); scene.ry=-.12+.3*lisse((T-tTrous)/.35); } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.pouce(); }
      else if(T<com){ T<tMange?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
