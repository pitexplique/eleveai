/* Série Solides CE2, ÉPISODE 04 : LE DÉ GÉANT (ceinture jaune). Outils : ce2-commun.js et
   films/ce2-solides.js (plierPatron, dessinerPatron : le pliage en 3D).
   Ti Margo colle 6 carrés en ligne et plie : un tunnel, le dessus et le dessous ouverts.
   Question : la croix (B). Il plie la croix : le dé se ferme, il le lance : 6.
   Commentaire : dans la croix, combien de carrés touchent le carré du milieu ? */

FILMS.patron=function(outils){
  const DUR={'00-accroche':9.36,'01-oups':5.92,'02-question':13.55,'02b-reponse':7.51,'03-ouf':6.19,'04-commentaire':7.22,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,oup,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  const W=tab.W;

  const tJe=mot('00-accroche','Je'), t6=mot('00-accroche','6'), tLigne=mot('00-accroche','ligne'), tPlie=mot('00-accroche','plie'), tPlie2=mot('00-accroche','plie',2);
  const tTunnel=mot('01-oups','tunnel'), tDessus=mot('01-oups','dessus'), tDessous=mot('01-oups','dessous');
  const tFerme=mot('03-ouf','fermé'), tLance=mot('03-ouf','lance'), t6b=mot('03-ouf','6');
  const tCroix=mot('04-commentaire','croix'), tMilieu=mot('04-commentaire','milieu'), tRep=mot('04-commentaire','Réponds');

  const SIX={a:'#ff8787',fond:'#ffd43b',c:'#69db7c',d:'#74c0fc',e:'#b197fc',f:'#ffa94d'};
  const CROIX={fond:'#ffd43b',g:'#ff8787',d:'#69db7c',av:'#74c0fc',ar:'#b197fc',couv:'#ffa94d'};
  /* La ligne de 6, dessinée debout, qui s'enroule vers l'arrière (axe vertical : un tunnel debout) */
  /* u = pliage (0 à plat, 1 fermé en tunnel) ; le fond reste en place, l'ensemble se recentre et grossit */
  function ligne(c,u,cy,{trou=false}={}){ const a=90*u, ang={a,c:a,d:a,e:a,f:a}, e=140+70*u, cx=W/2-e*(1.5-u);
    const P=plierPatron('ligne',ang,-90,-1); dessinerPatron(c,P,e,cx,cy,{couleurs:SIX});
    if(!trou) return;
    /* le haut du tunnel est ouvert : on voit l'intérieur, sombre, bordé de pointillés rouges */
    const fond=P.find(q=>q.nom==='fond'), m=fond.P.reduce((s,p)=>[s[0]+p[0]/4,s[1]+p[1]/4,s[2]+p[2]/4],[0,0,0]), o=cav(m,e,0,0);
    const pts=P.flatMap(q=>q.P), ym=Math.max(...pts.map(p=>p[1])), haut=[];
    for(const p of pts) if(Math.abs(p[1]-ym)<1e-3&&!haut.some(h=>Math.hypot(h[0]-p[0],h[2]-p[2])<1e-3)) haut.push(p);
    const pr=haut.map(p=>cav(p,e,cx-o[0],cy-o[1])), g=pr.reduce((s,p)=>[s[0]+p[0]/pr.length,s[1]+p[1]/pr.length],[0,0]);
    pr.sort((A,B)=>Math.atan2(A[1]-g[1],A[0]-g[0])-Math.atan2(B[1]-g[1],B[0]-g[0]));
    c.fillStyle='rgba(20,20,20,.88)'; c.strokeStyle=CRAIE.faux; c.lineWidth=8; c.setLineDash([18,12]);
    c.beginPath(); pr.forEach((p,j)=>j?c.lineTo(...p):c.moveTo(...p)); c.closePath(); c.fill(); c.stroke(); c.setLineDash([]); }
  function croix(c,tilt,u,v,cx,cy,e=130,opts={}){ dessinerPatron(c,plierPatron('croix',{g:90*u,d:90*u,av:90*u,ar:90*u,couv:90*v},tilt),e,cx,cy,{couleurs:CROIX,...opts}); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : la croix à plat, le carré du milieu entouré */
      croix(c,-90,0,0,W/2,330,120);
      if(T>=tMilieu){ c.strokeStyle='#ffffff'; c.lineWidth=12; c.strokeRect(W/2-60,270,120,120); }
      if(T>=tRep) ecrire(c,'?',W/2+330,330,150*zoom(T,tRep,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T<oup){ /* 6 carrés en ligne, puis on plie */
      if(T>=t6){ const u=lisse01(entre(T,tPlie,tPlie2+1.2)); ligne(c,u*.7,400); }
      if(T>=tLigne&&T<tPlie) ecrire(c,'6 carrés en ligne',W/2,100,58*zoom(T,tLigne,.4),CRAIE.blanc);
      tab.maj(); return; }
    if(T<q){ /* le tunnel : dessus et dessous ouverts */
      const u=.7+.3*lisse01(entre(T,oup,oup+.8)); ligne(c,u,470,{trou:T>=tDessus});
      if(T>=tTunnel) ecrire(c,'un tunnel !',W-200,110,62*zoom(T,tTunnel,.4),CRAIE.faux);
      if(T>=tDessus) ecrire(c,'dessus : ouvert',230,110,50*zoom(T,tDessus,.4),CRAIE.faux);
      if(T>=tDessous) ecrire(c,'dessous : ouvert',230,600,50*zoom(T,tDessous,.4),CRAIE.faux);
      tab.maj(); return; }
    /* ouf : la croix se couche, les côtés se relèvent, le couvercle se rabat ; un 6 sur le dessus */
    const t0=ouf, tilt=-90+90*lisse01(entre(T,t0,t0+.7)), u=lisse01(entre(T,t0+.7,t0+1.6)), v=lisse01(entre(T,t0+1.6,tFerme+.3));
    croix(c,tilt,u,v,W/2-80,520,200);
    if(T>=tLance){ const k=zoom(T,tLance,.5); ecrire(c,'6 !',W/2+300,250,110*k,CRAIE.jaune); }
    if(T>=tFerme) coche(c,W-110,640,.7);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,tJe-.08,352,62,a0('Salut !')),
    ...suiteDe(oup,60,62,[a0('Je fabrique un dé géant.')],[a0('6 carrés de carton,'),a0('collés en ligne.')],[a0('Je plie… je plie…')]),
    ...suiteDe(q,60,62,[a1('Hé !'),a1('C’est un tunnel !')],[a1('Le dessus et le dessous'),a1('sont ouverts !')]),
    ...suiteDe(com,60,62,[a3('Ouf !'),a3('Mon dé est fermé.')],[a3('Je le lance…'),a3('6 !')]),
    ...suiteDe(f,60,60,[a4('À toi : dans la croix,'),a4('combien de carrés touchent'),a4('le carré du milieu ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Quel dessin'),qd('fait un vrai dé ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('La croix :'), r2=rd('un fond,'), r3=rd('4 côtés qui se relèvent,'), r4=rd('et un couvercle qui se rabat.');
  const tB=mot('02b-reponse','B');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    ${[0,1,2,3,4,5].map(k=>`<rect x="${22+48*k}" y="100" width="46" height="46" fill="${['#ff8787','#ffd43b','#69db7c','#74c0fc','#b197fc','#ffa94d'][k]}" stroke="#7c4a12" stroke-width="4"/>`).join('')}
    <text x="165" y="210" font-family="Segoe UI" font-weight="800" font-size="56" fill="#ffd43b" text-anchor="middle">un dé ?</text></svg>`;
  poserMiniature(outils,acc+1,'6 carrés<br>= un dé ?'+PARI,mini);
  return { clips,FIN,titre:'Le dé géant',ceinture:1,finTitre:tJe-.08,groupes,finClip:'05-abonne',
    cuts:[tJe-.08,oup,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['les 6 carrés en ligne',tq('A'),tq('ligne')],['la croix',tq('B'),tq('croix')],['les 2 rangées de 3',tq('C'),tq('rangées')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2,r3,r4],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tJe-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<oup){ T<tPlie?g.montre():g.reflechit(); }
      else if(T<q){ if(T<tDessus){ g.oups(); scene.ry=-.12+.3*lisse((T-tTunnel)/.35); } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.pouce(); }
      else if(T<com){ T<tLance?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
