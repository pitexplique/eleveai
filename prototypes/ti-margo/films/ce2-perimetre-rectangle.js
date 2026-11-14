/* Série Périmètre CE2, ÉPISODE 04 : LA BORDURE DU POTAGER DE MAMIE (ceinture jaune). Outils : ce2-commun.js
   et films/ce2-perimetre.js (cheminCraie, boutChemin, rond, entre).
   Ti Margo calcule 10 × 2 = 20 m de bordure pour un potager de 10 m sur 2 m : la bordure s'arrête avant la fin
   du tour. Multiplier, ce n'est pas faire le tour. Question : 24 m (A). Commentaire : un potager carré de 7 m. */

FILMS.rectangle=function(outils){
  const DUR={'00-accroche':12.39,'01-oups':7.02,'02-question':14.14,'02b-reponse':11.86,'03-ouf':6.49,'04-commentaire':9.57,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,oup,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  const W=tab.W;

  /* Le potager 10 m × 2 m : 80 px par mètre ; départ en bas à gauche */
  const S=80, w=10*S, h=2*S, X0=(W-w)/2, Y0=290;
  const D=[X0,Y0+h], B=[X0+w,Y0+h], H=[X0+w,Y0], G=[X0,Y0];
  const VINGT=[D,B,H,[X0+2*S,Y0]], MANQUE=[[X0+2*S,Y0],G,D];

  const tJe=mot('00-accroche','Je'), tPot=mot('00-accroche','potager'), t10=mot('00-accroche','10'), t2=mot('00-accroche','2'),
        tFois=mot('00-accroche','fois'), tAch=mot('00-accroche','j\'achète'), t2b=mot('00-accroche','2',3), t20=mot('00-accroche','20'), tBord=mot('00-accroche','bordure',2);
  const tNon=mot('01-oups','non'), tManque=mot('01-oups','manque'), tMult=mot('01-oups','Multiplier');
  const tTout=mot('03-ouf','tout'), tTour=mot('03-ouf','tour'), tPlanter=mot('03-ouf','planter');
  const tC7=mot('04-commentaire','7'), tCote=mot('04-commentaire','côté'), tCTour=mot('04-commentaire','tour'), tRep=mot('04-commentaire','Réponds');

  function cote(c,s,x,y,T0,T,coul=CRAIE.blanc,taille=50){ if(T>=T0) ecrire(c,s,x,y,taille*zoom(T,T0,.4),coul); }
  /* La terre du potager et ses petites pousses (des salades quand Mamie plante) */
  function potager(c,x,y,ww,hh,salades=0){ c.fillStyle='#6b4226'; c.fillRect(x,y,ww,hh);
    const n=Math.round(ww/S);
    for(let k=0;k<n;k++) for(let j=0;j<2;j++){ const px=x+(k+.5)*ww/n, py=y+(j+.5)*hh/2;
      if(salades>0){ const s=14+12*salades; c.fillStyle='#2f9e44'; c.beginPath(); c.arc(px,py,s,0,7); c.fill();
        c.fillStyle='#8ce99a'; c.beginPath(); c.arc(px,py,s*.55,0,7); c.fill(); }
      else { c.fillStyle='#69db7c'; c.beginPath(); c.ellipse(px-6,py,8,4,-.6,0,7); c.ellipse(px+6,py,8,4,.6,0,7); c.fill(); } } }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un potager carré de 7 m de côté */
      const s=300, x=(W-s)/2, y=190;
      c.fillStyle='#6b4226'; c.fillRect(x,y,s,s);
      for(let k=0;k<4;k++) for(let j=0;j<4;j++){ c.fillStyle='#69db7c'; c.beginPath(); c.arc(x+(k+.5)*s/4,y+(j+.5)*s/4,9,0,7); c.fill(); }
      c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.strokeRect(x,y,s,s);
      cote(c,'7 m',x+s/2,y+s+52,tC7,T,CRAIE.jaune,56);
      if(T>=tCote){ c.strokeStyle=CRAIE.jaune; c.lineWidth=12; c.lineCap='round'; c.beginPath(); c.moveTo(x,y+s); c.lineTo(x+s,y+s); c.stroke(); }
      if(T>=tCTour) tourCraie(c,x,y,s,s,entre(T,tCTour,tCTour+1.2));
      if(T>=tRep) ecrire(c,'?',x+s/2,y+s/2,150*zoom(T,tRep,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T<oup){ /* l'accroche : le potager, 10 m, 2 m, 10 × 2 = 20, la bordure de 20 m posée */
      if(T>=tPot) potager(c,X0,Y0,w,h);
      cote(c,'10 m',X0+w/2,Y0+h+52,t10,T); cote(c,'2 m',X0+w+62,Y0+h/2,t2,T);
      /* le calcul s'écrit nombre par nombre, chacun à son mot */
      if(T>=tFois) ecrire(c,T>=t20?'10 × 2 = 20 m':(T>=t2b?'10 × 2':'10 ×'),W/2-190,Y0-110,60,CRAIE.jaune,'left');
      if(T>=tAch){ const u=entre(T,tAch,tBord+.6); cheminCraie(c,VINGT,u,CRAIE.jaune,14);
        rond(c,...boutChemin(VINGT,u),18,'#e8590c'); }
      rond(c,...D,14,CRAIE.jaune);
      tab.maj(); return; }
    if(T<q){ /* l'oubli : il manque un grand morceau, la multiplication barrée */
      potager(c,X0,Y0,w,h);
      cote(c,'10 m',X0+w/2,Y0+h+52,oup,T); cote(c,'2 m',X0+w+62,Y0+h/2,oup,T);
      cheminCraie(c,VINGT,1,CRAIE.jaune,14);
      if(T>=tManque){ const on=Math.sin((T-tManque)*9)>-.2; if(on) cheminCraie(c,MANQUE,entre(T,tManque,tManque+.7),CRAIE.faux,14);
        ecrire(c,'?',X0-60,Y0-30,70*zoom(T,tManque,.4),CRAIE.faux); }
      ecrire(c,'10 × 2 = 20 m',W/2-190,Y0-110,60,CRAIE.jaune,'left');
      if(T>=tMult){ const k=entre(T,tMult,tMult+.5); c.strokeStyle=CRAIE.faux; c.lineWidth=10; c.lineCap='round';
        c.beginPath(); c.moveTo(W/2-200,Y0-120); c.lineTo(W/2-200+400*k,Y0-120); c.stroke(); }
      if(T>=tNon&&T<tManque) ecrire(c,'!',X0+2*S,Y0-40,80*zoom(T,tNon,.4),CRAIE.faux);
      tab.maj(); return; }
    /* ouf : la bordure fait tout le tour, Mamie plante ses salades */
    potager(c,X0,Y0,w,h,T>=tPlanter?entre(T,tPlanter,tPlanter+.8):0);
    tourCraie(c,X0,Y0,w,h,entre(T,tTout,tTour+.5),TOUR,16);
    cote(c,'10 m',X0+w/2,Y0+h+52,ouf,T,TOUR); cote(c,'10 m',X0+w/2,Y0-48,ouf,T,TOUR);
    cote(c,'2 m',X0+w+62,Y0+h/2,ouf,T,TOUR); cote(c,'2 m',X0-62,Y0+h/2,ouf,T,TOUR);
    if(T>=tTour+.5) coche(c,X0+w/2,Y0+h+150,.8);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,tJe-.08,352,62,a0('Salut !')),
    ...suiteDe(oup,60,62,[a0('Je pose une bordure'),a0('autour du potager de Mamie.')],[a0('10 mètres de long,'),a0('2 mètres de large.')],
      [a0('10 × 2 = 20 :')],[a0('j’achète 20 mètres'),a0('de bordure !')]),
    ...suiteDe(q,60,62,[a1('Oh non !')],[a1('Il manque'),a1('un grand morceau.')],[a1('Multiplier, ce n’est pas'),a1('faire le tour !')]),
    ...suiteDe(com,60,62,[a3('Ouf ! La bordure'),a3('fait tout le tour.')],[a3('Mamie peut planter'),a3('ses salades !')]),
    ...suiteDe(f,60,60,[a4('À toi : un potager carré'),a4('de 7 mètres de côté.')],[a4('Combien de bordure'),a4('pour en faire le tour ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de mètres de bordure'),qd('pour tout le tour ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Les deux longueurs :'), r1b=rd('10 + 10 = 20.'), r2=rd('Les deux largeurs :'), r2b=rd('2 + 2 = 4.'), r3=rd('20 + 4 = 24 mètres.');
  const tA=mot('02b-reponse','A');

  /* La miniature : le potager, la bordure trop courte */
  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    <rect x="35" y="120" width="260" height="56" fill="#6b4226"/>
    <polyline points="35,176 295,176 295,120 87,120" fill="none" stroke="#ffd43b" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>
    <text x="165" y="85" font-family="Segoe UI" font-weight="800" font-size="50" fill="#ffd43b" text-anchor="middle">10 × 2 ?</text></svg>`;
  poserMiniature(outils,acc+1,'Le tour<br>= 10 × 2 ?'+PARI,mini);
  return { clips,FIN,titre:'La bordure du potager',ceinture:1,finTitre:tJe-.08,groupes,finClip:'05-abonne',
    cuts:[tJe-.08,oup,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['24 mètres',tq('A'),tq('24')],['20 mètres',tq('B'),tq('20')],['12 mètres',tq('C'),tq('12')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r1b,r2,r2b,r3],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tJe-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<oup){ T<tFois?g.montre():(T<tAch?g.reflechit():g.fier()); }
      else if(T<q){ if(T<tMult){ g.oups(); scene.ry=-.12+.3*lisse((T-tNon)/.35); } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.pouce(); }
      else if(T<com){ T<tPlanter?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
