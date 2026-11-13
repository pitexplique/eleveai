/* ============================================================
   Série Aire CM1 — ÉPISODE 02 : LE CHOCOLAT PAS JUSTE. Outils : films/cm1-commun.js.
   La sœur de Ti Margo a 10 petits carrés, lui 6 seulement… mais ses carrés sont 2 fois plus gros
   (côté × 1,41 : l'aire double). 6 gros = 12 petits (A). Commentaire : 5 gros ou 9 petits ?
   ============================================================ */
const PETIT=70, GROS=99; /* 99 ≈ 70 × √2 : un gros carré a l'aire de 2 petits */
function choco(c,x,y,s,z=1,clair=false){ if(z<=0) return; const k=Math.min(1.25,z), d=s*(1-k)/2;
  c.fillStyle=clair?'#a0522d':'#6b3410'; c.strokeStyle='#3b1a05'; c.lineWidth=4; c.beginPath(); c.roundRect(x+d+3,y+d+3,s*k-6,s*k-6,8); c.fill(); c.stroke();
  c.strokeStyle='rgba(255,220,180,.35)'; c.lineWidth=3; c.beginPath(); c.roundRect(x+d+s*k*.18,y+d+s*k*.18,s*k*.64,s*k*.64,5); c.stroke(); }
function tablette(c,x,y,nc,nr,s,z=1,sauf=-1,clair=false){ let k=0; for(let j=0;j<nr;j++) for(let i=0;i<nc;i++,k++) if(k!==sauf) choco(c,x+i*s,y+j*s,s,z,clair); }
/* « 1 gros = 2 petits » dessiné : x, y = coin haut-gauche du gros */
function egalite(c,x,y,z=1){ if(z<=0) return; choco(c,x,y,GROS,z,true); ecrire(c,'=',x+GROS+50,y+GROS/2,80,CRAIE.jaune);
  choco(c,x+GROS+100,y+(GROS-PETIT)/2,PETIT,z); choco(c,x+GROS+100+PETIT,y+(GROS-PETIT)/2,PETIT,z); }

FILMS.unite=function(outils){
  const DUR={'00-accroche':8.43,'01-chocolat':7.11,'02-question':11.34,'02b-reponse':7.76,'03-ouf':3.25,'04-commentaire':12.66,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,cho,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tSoeur=mot('00-accroche','sœur'), t10=mot('00-accroche','10'), tMoi=mot('00-accroche','Moi'), t6=mot('00-accroche','6'),
        tJuste=mot('00-accroche','juste');
  const tGros=mot('01-chocolat','gros'), tUn=mot('01-chocolat','Un'), t2=mot('01-chocolat','2');
  const tDonne=mot('03-ouf','donne');
  const t5=mot('04-commentaire','5'), t9=mot('04-commentaire','9'), tUnG=mot('04-commentaire','Un'), tRep=mot('04-commentaire','Réponds');

  const XS=80, YS=110, XM=80, YM=360; /* la tablette de la sœur (5 × 2 petits), la mienne (3 × 2 gros) */
  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 5 gros carrés ou 9 petits ? */
      tablette(c,XS,YS-40,5,1,GROS,T>=t5?zoom(T,t5,.4):0,-1,true);
      if(T>=t5) ecrire(c,'5 gros',XS+5*GROS+40,YS-40+GROS/2,58,CRAIE.jaune,'left');
      tablette(c,XS,YS+110,5,2,PETIT,T>=t9?zoom(T,t9,.4):0,9);
      if(T>=t9) ecrire(c,'9 petits',XS+5*PETIT+40,YS+110+PETIT,58,CRAIE.jaune,'left');
      if(T>=tUnG) egalite(c,XS,YS+330,zoom(T,tUnG,.4));
      if(T>=tRep) ecrire(c,'?',880,YS+380,140*zoom(T,tRep,.6),CRAIE.jaune);
      tab.maj(); return; }
    /* la tablette de la sœur, en haut */
    if(T>=tSoeur){ tablette(c,XS,YS,5,2,PETIT); ecrire(c,'ma sœur',XS,YS-45,44,CRAIE.gris,'left'); }
    if(T>=t10) ecrire(c,'10 carrés',XS+5*PETIT+40,YS+PETIT,58*zoom(T,t10,.4),CRAIE.blanc,'left');
    /* la mienne ; à « je lui en donne », un gros carré part vers la sœur */
    const part=T>=tDonne&&T>=ouf?lisse((T-tDonne)/.9):0;
    if(T>=tMoi){ const z=T>=tGros&&T<tUn?zoom(T,tGros,.3):1;
      tablette(c,XM,YM,3,2,GROS,z,part>0?5:-1,true);
      ecrire(c,'moi',XM,YM-45,44,CRAIE.gris,'left'); }
    if(part>0) choco(c,XM+2*GROS+(XS+5*PETIT+30-XM-2*GROS)*part,YM+GROS-(YM+GROS-YS-2*PETIT-15)*part,GROS,1,true); /* sous « 10 carrés » */
    if(T>=t6&&T<cho) ecrire(c,'6 carrés',XM+3*GROS+40,YM+GROS,58*zoom(T,t6,.4),T>=tJuste?CRAIE.faux:CRAIE.blanc,'left');
    if(T>=cho&&T<ouf){
      if(T>=tUn){ c.strokeStyle=CRAIE.jaune; c.lineWidth=8; c.strokeRect(XM,YM,GROS,GROS); }
      if(T>=t2) egalite(c,520,YM+10,zoom(T,t2,.4)); }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-chocolat'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,tMoi-.08,352,62,a0('Ma sœur a une tablette'),a0('de chocolat de 10 carrés.')),
    ...suiteDe(cho,60,62,[a0('Moi, seulement 6 carrés.')],[a0('Ce n’est pas juste !')]),
    ...suiteDe(q,60,62,[a1('Attends… mes carrés sont'),a1('deux fois plus gros !')],[a1('Un de mes gros carrés,'),a1('c’est 2 de ses'),a1('petits carrés.')]),
    ...suiteDe(com,60,62,[a3('Bon… je lui en donne'),a3('un morceau quand même.')]),
    ...suiteDe(f,60,60,[a4('À toi : une tablette'),a4('de 5 gros carrés,')],[a4('une autre de'),a4('9 petits carrés.')],
      [a4('Un gros carré,'),a4('c’est 2 petits.')],[a4('Laquelle est'),a4('la plus grande ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Mes 6 gros carrés,'),qd('ça fait combien'),qd('de petits carrés ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('6 × 2 :'), r2=rd('12 petits carrés.'), r3=rd('Ma tablette est plus'), r4=rd('grande que la sienne !');
  const tA=mot('02b-reponse','A');

  const p=(x,y,s,fond)=>`<rect x="${x}" y="${y}" width="${s}" height="${s}" rx="5" fill="${fond}" stroke="#3b1a05" stroke-width="3"/>`;
  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    [0,1,2,3,4].map(i=>p(30+i*34,32,32,'#6b3410')+p(30+i*34,66,32,'#6b3410')).join('')+
    [0,1,2].map(i=>p(30+i*48,118,46,'#a0522d')+p(30+i*48,166,46,'#a0522d')).join('')+
    `<text x="262" y="88" font-family="Segoe UI" font-weight="800" font-size="56" fill="#f8f9fa" text-anchor="middle">10</text><text x="262" y="190" font-family="Segoe UI" font-weight="800" font-size="56" fill="#ffd43b" text-anchor="middle">6</text></svg>`;
  poserMiniature(outils,acc+1,'10 carrés<br>contre 6 ?'+PARI,mini);
  return { clips,FIN,titre:'Le chocolat pas juste',ceinture:0,finTitre:tMoi-.08,groupes,finClip:'05-abonne',
    cuts:[tMoi-.08,cho,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['12',tq('A'),tq('12')],['8',tq('B'),tq('8')],['6',tq('C'),tq('6',2)]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tMoi-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<cho){ T<tJuste?g.montre():g.oups(); }
      else if(T<q){ T<tUn?g.reflechit():g.fier(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.pouce(); }
      else if(T<com) g.ouvre();
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
