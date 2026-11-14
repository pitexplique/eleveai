/* Série Périmètre CE2, ÉPISODE 05 : LA SCÈNE DE DANSE (ceinture orange). Outils : ce2-commun.js
   et films/ce2-perimetre.js (cheminCraie, boutChemin, rond, entre).
   Ti Margo colle deux tapis carrés de 2 m et met du scotch lumineux autour de CHAQUE tapis : 8 + 8 = 16 m.
   Mais le scotch du milieu, là où les tapis se touchent, ne brille pour personne. Question : 12 m (B) :
   la scène est un rectangle de 4 m sur 2. Commentaire : trois tapis carrés de 1 m collés en ligne. */

FILMS.defi=function(outils){
  const DUR={'00-accroche':12.18,'01-oups':7.74,'02-question':14.41,'02b-reponse':15.43,'03-ouf':5.32,'04-commentaire':9.41,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,oup,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  const W=tab.W;

  /* Deux tapis carrés de 2 m : 120 px par mètre, collés ils font 4 m × 2 m */
  const S=150, c2=2*S, X0=(W-2*c2)/2, Y0=215, XM=X0+c2;
  const NEON='#fff3bf', LUEUR='#ffd43b';

  const tJe=mot('00-accroche','Je'), tColle=mot('00-accroche','colle'), tTapis=mot('00-accroche','tapis'), t2=mot('00-accroche','2'),
        tScene=mot('00-accroche','scène'), tScotch=mot('00-accroche','scotch'), tChaque=mot('00-accroche','chaque'),
        t8=mot('00-accroche','8'), t8b=mot('00-accroche','8',3), t16=mot('00-accroche','16');
  const tHe=mot('01-oups','Hé'), tMilieu=mot('01-oups','milieu'), tTouchent=mot('01-oups','touchent'), tBrille=mot('01-oups','brille');
  const tBrilleO=mot('03-ouf','brille'), tAutour=mot('03-ouf','autour'), tMusique=mot('03-ouf','Musique');
  const tC3=mot('04-commentaire','trois'), tC1=mot('04-commentaire','1'), tLigne=mot('04-commentaire','ligne'),
        tCTour=mot('04-commentaire','tour'), tRep=mot('04-commentaire','Réponds');

  function cote(c,s,x,y,T0,T,coul=CRAIE.blanc,taille=50){ if(T>=T0) ecrire(c,s,x,y,taille*zoom(T,T0,.4),coul); }
  function tapis(c,x,y,s,coul){ c.fillStyle=coul; c.fillRect(x,y,s,s);
    c.strokeStyle='rgba(255,255,255,.18)'; c.lineWidth=3; for(let k=1;k<4;k++){ c.beginPath(); c.moveTo(x+k*s/4,y+8); c.lineTo(x+k*s/4,y+s-8); c.stroke(); } }
  /* Un trait de scotch lumineux (une lueur, puis le trait clair) */
  function neon(c,pts,u,eteint=false){ if(eteint){ cheminCraie(c,pts,u,'#868e96',9); return; }
    c.save(); c.shadowColor=LUEUR; c.shadowBlur=26; cheminCraie(c,pts,u,LUEUR,12); c.restore(); cheminCraie(c,pts,u,NEON,5); }
  const carre=(x,y,s)=>[[x,y+s],[x+s,y+s],[x+s,y],[x,y],[x,y+s]];
  function note(c,x,y,k){ c.fillStyle=CRAIE.jaune; c.font=`800 ${Math.round(64*k)}px Segoe UI`; c.textAlign='center'; c.fillText('♪',x,y); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : trois tapis carrés de 1 m collés en ligne */
      const s=190, x=(W-3*s)/2, y=230;
      ['#7048e8','#e64980','#1c7ed6'].forEach((coul,k)=>{ if(T>=tC3+k*.25){ tapis(c,x+k*s,y,s,coul); c.strokeStyle=CRAIE.blanc; c.lineWidth=5; c.strokeRect(x+k*s,y,s,s); } });
      cote(c,'1 m',x+s/2,y+s+52,tC1,T,CRAIE.jaune,52);
      if(T>=tCTour) tourCraie(c,x,y,3*s,s,entre(T,tCTour,tCTour+1.2),LUEUR,12);
      if(T>=tRep) ecrire(c,'?',W/2,y-80,130*zoom(T,tRep,.6),CRAIE.jaune);
      tab.maj(); return; }
    /* les deux tapis : écartés, puis collés à « colle »… « scène » */
    const ecart=T>=oup?0:70*(1-entre(T,tTapis+.9,tScene+.2));
    const xa=XM-c2-ecart, xb=XM+ecart;
    if(T>=tTapis||T>=oup){ tapis(c,xa,Y0,c2,'#7048e8'); tapis(c,xb,Y0,c2,'#e64980'); }
    if(T<oup){ /* l'accroche : 2 m, le scotch autour de chaque tapis, 8 + 8 = 16 */
      cote(c,'2 m',xa+c2/2,Y0+c2+52,t2,T); cote(c,'2 m',xb+c2/2,Y0+c2+52,t2,T);
      if(T>=tScotch){ neon(c,carre(xa,Y0,c2),entre(T,tScotch,tChaque)); neon(c,carre(xb,Y0,c2),entre(T,tChaque,tChaque+1)); }
      /* le calcul s'écrit nombre par nombre, chacun à son mot ; « 8 m » dans chaque tapis */
      if(T>=t8) ecrire(c,T>=t16?'8 + 8 = 16 m':(T>=t8b?'8 + 8':'8 +'),W/2-160,Y0-80,60,CRAIE.jaune,'left');
      if(T>=t8) ecrire(c,'8 m',xa+c2/2,Y0+c2/2+18,52*zoom(T,t8,.4),CRAIE.blanc);
      if(T>=t8b) ecrire(c,'8 m',xb+c2/2,Y0+c2/2+18,52*zoom(T,t8b,.4),CRAIE.blanc);
      tab.maj(); return; }
    if(T<q){ /* l'oubli : le scotch du milieu, là où les tapis se touchent, ne brille pour personne */
      const mil=[[XM,Y0+c2],[XM,Y0]], bordH=[[XM,Y0+c2],[XM+c2,Y0+c2],[XM+c2,Y0],[XM,Y0]], bordG=[[XM,Y0],[XM-c2,Y0],[XM-c2,Y0+c2],[XM,Y0+c2]];
      neon(c,bordH,1); neon(c,bordG,1);
      const eteint=T>=tBrille, rouge=T>=tMilieu&&!eteint&&Math.sin((T-tMilieu)*9)>-.2;
      if(rouge) cheminCraie(c,mil,1,CRAIE.faux,16); else neon(c,mil,1,eteint);
      cote(c,'2 m',XM-c2/2,Y0+c2+52,oup,T); cote(c,'2 m',XM+c2/2,Y0+c2+52,oup,T);
      if(T>=tTouchent&&!eteint) cercle(c,XM,Y0+c2/2,70,CRAIE.faux,entre(T,tTouchent,tTouchent+.5));
      if(T>=tBrille) ecrire(c,'?',XM,Y0-70,90*zoom(T,tBrille,.4),CRAIE.faux);
      if(T>=tHe&&T<tMilieu) ecrire(c,'!',XM,Y0-70,90*zoom(T,tHe,.4),CRAIE.faux);
      tab.maj(); return; }
    /* ouf : le scotch fait seulement le tour de la grande scène, qui brille ; musique */
    const u=entre(T,tBrilleO,tAutour+.6);
    c.save(); c.shadowColor=LUEUR; c.shadowBlur=30; tourCraie(c,XM-c2,Y0,2*c2,c2,u,LUEUR,12); c.restore();
    tourCraie(c,XM-c2,Y0,2*c2,c2,u,NEON,5);
    if(T>=tMusique){ const k=zoom(T,tMusique,.4); note(c,XM-c2-60,Y0+40+10*Math.sin(T*5),k); note(c,XM+c2+60,Y0+70+10*Math.sin(T*5+1),k); note(c,XM,Y0-50+8*Math.sin(T*4),k); }
    if(T>=tAutour+.6) coche(c,XM,Y0+c2+110,.8);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,tJe-.08,352,62,a0('Salut !')),
    ...suiteDe(oup,60,62,[a0('Je colle deux tapis carrés'),a0('de 2 mètres')],[a0('pour faire une grande'),a0('scène de danse.')],
      [a0('Je mets du scotch lumineux'),a0('autour de chaque tapis :')],[a0('8 + 8 = 16 mètres !')]),
    ...suiteDe(q,60,62,[a1('Hé ! J’ai mis du scotch'),a1('au milieu,')],[a1('là où les tapis'),a1('se touchent.')],[a1('Ça ne brille'),a1('pour personne !')]),
    ...suiteDe(com,60,62,[a3('Ouf ! Ma scène brille'),a3('tout autour.')],[a3('Musique !')]),
    ...suiteDe(f,60,60,[a4('À toi : trois tapis carrés'),a4('de 1 mètre, collés en ligne.')],[a4('Combien de scotch'),a4('pour le tour ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de mètres de scotch'),qd('pour le tour'),qd('de la grande scène ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r0=rd('La scène est un rectangle'), r0b=rd('de 4 mètres sur 2.'), r1=rd('4 + 2 = 6,');
  /* « 4 plus » est marqué deux fois (2 « plus ») : les « Plus » dits seuls sont le 3e et le 4e */
  const tP1=mot('02b-reponse','Plus',3), t10=mot('02b-reponse','10'), tP2=mot('02b-reponse','Plus',4), t12=mot('02b-reponse','12');
  const r2=[tP1,t10,'6 + 4 = 10,'], r3=[tP2,t12,'10 + 2 = 12 mètres.'];
  rd.jusque('Le'); const r4=rd('Le milieu, ce n’est pas le tour !');
  const tB=mot('02b-reponse','B');

  /* La miniature : deux tapis collés, du scotch partout, même au milieu */
  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    <rect x="45" y="80" width="120" height="120" fill="#7048e8"/><rect x="165" y="80" width="120" height="120" fill="#e64980"/>
    <rect x="45" y="80" width="240" height="120" fill="none" stroke="#ffd43b" stroke-width="8"/>
    <line x1="165" y1="80" x2="165" y2="200" stroke="#ff8787" stroke-width="10"/>
    <text x="165" y="60" font-family="Segoe UI" font-weight="800" font-size="46" fill="#ffd43b" text-anchor="middle">8 + 8 ?</text></svg>`;
  poserMiniature(outils,acc+1,'16 m<br>de scotch ?'+PARI,mini);
  return { clips,FIN,titre:'La scène qui brille',ceinture:2,finTitre:tJe-.08,groupes,finClip:'05-abonne',
    cuts:[tJe-.08,oup,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['16 mètres',tq('A'),tq('16')],['12 mètres',tq('B'),tq('12')],['8 mètres',tq('C'),tq('8')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r0,r0b,r1,r2,r3],suite:[r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tJe-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<oup){ T<t8?g.montre():g.fier(); }
      else if(T<q){ if(T<tMilieu+.6){ g.oups(); scene.ry=-.12+.3*lisse((T-tHe)/.35); } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.pouce(); }
      else if(T<com){ T<tMusique?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
