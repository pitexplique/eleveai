/* Série Aire CM1 : les shorts en dessin animé (ceinture blanche). Outils : films/cm1-commun.js.
   Code couleur des paysages (aire_cm1_commun.py) : le carreau bleu ciel = l'unité d'aire, le tour toujours orange.
   ÉPISODE 01 : LA FICELLE. Ti Margo veut couvrir le sol de sa cabane ; il mesure le tour (10 m) et achète
   10 m de ficelle. La ficelle fait le tour, le sol reste nu : le tour, c'est le périmètre ; pour couvrir,
   il faut l'aire (des carreaux). Question : 2 rangées de 3 carreaux → 6 (C). Commentaire : 2 rangées de 4. */

/* Le sol de la cabane sur l'ardoise : 3 × 2 cases de 150 px, coin haut-gauche (X0, Y0) */
const X0=150, Y0=230, S=150;
/* La pelote de ficelle (orange, comme le tour) */
function peloteCraie(c,x,y,r,z=1){ if(z<=0) return; r*=Math.min(1.25,z);
  c.fillStyle=TOUR; c.beginPath(); c.arc(x,y,r,0,7); c.fill();
  c.strokeStyle='#c2410c'; c.lineWidth=6; for(let k=0;k<3;k++){ c.beginPath(); c.ellipse(x,y,r*(.85-k*.25),r*.9,.5+k*.6,0,7); c.stroke(); }
  c.strokeStyle=TOUR; c.lineWidth=10; c.lineCap='round'; c.beginPath(); c.moveTo(x+r*.7,y+r*.7); c.quadraticCurveTo(x+r*1.3,y+r*1.4,x+r*.6,y+r*1.9); c.stroke(); }
/* Le cerf-volant : un losange, sa ficelle orange qui ondule */
function cerfVolant(c,x,y,z=1,T=0){ if(z<=0) return; const k=Math.min(1.25,z), w=110*k, h=150*k;
  c.fillStyle='#ffd43b'; c.strokeStyle='#e8590c'; c.lineWidth=7; c.beginPath(); c.moveTo(x,y-h); c.lineTo(x+w,y); c.lineTo(x,y+h*.8); c.lineTo(x-w,y); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(x,y-h); c.lineTo(x,y+h*.8); c.moveTo(x-w,y); c.lineTo(x+w,y); c.stroke();
  c.strokeStyle=TOUR; c.lineWidth=9; c.lineCap='round'; c.beginPath(); c.moveTo(x,y+h*.8);
  for(let i=1;i<=6;i++) c.lineTo(x+Math.sin(T*3+i)*24,y+h*.8+i*38); c.stroke(); }

FILMS.comprendre=function(outils){
  const DUR={'00-accroche':10.07,'01-ficelle':12.38,'02-question':13.2,'02b-reponse':7.74,'03-ouf':5.74,'04-commentaire':8.89,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,fic,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  const W=tab.W;

  /* Les instants */
  const tJe=mot('00-accroche','Je'), tSol=mot('00-accroche','sol'), tTour=mot('00-accroche','tour'), t10=mot('00-accroche','10'),
        tAch=mot('00-accroche','J\'achète'), t10b=mot('00-accroche','10',3), tFic=mot('00-accroche','ficelle');
  const tOups=mot('01-ficelle','Oups'), tNu=mot('01-ficelle','nu'), tPer=mot('01-ficelle','périmètre'), tAire=mot('01-ficelle','l\'aire'),
        tCar=mot('01-ficelle','carreaux');
  const tOuf=mot('03-ouf','Ouf'), tOFic=mot('03-ouf','ficelle'), tCerf=mot('03-ouf','cerf-volant');
  const tC2=mot('04-commentaire','2'), tC4=mot('04-commentaire','4'), tRep=mot('04-commentaire','Réponds');

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 2 rangées de 4 carreaux, la réponse reste à l'élève */
      const x=(W-4*S)/2, y=200;
      solVide(c,x,y,4,2,S,T>=tC4);
      if(T>=tC2) ecrire(c,'2 rangées',x+2*S,y+2*S+60,56*zoom(T,tC2,.4),CRAIE.jaune);
      if(T>=tC4) ecrire(c,'4 carreaux',x+2*S,y-60,56*zoom(T,tC4,.4),CRAIE.jaune);
      if(T>=tRep) ecrire(c,'?',x+2*S,y+S,150*zoom(T,tRep,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=ouf){ /* le sol couvert de 6 carreaux ; la ficelle garde son tour… pour le cerf-volant */
      solVide(c,X0,Y0,3,2,S,false);
      for(let j=0;j<2;j++) for(let i=0;i<3;i++) carreauCraie(c,X0+i*S,Y0+j*S,S);
      if(T>=tOuf) coche(c,X0+3*S-90,Y0-70,.8);
      if(T<tCerf) peloteCraie(c,830,370,80,T>=tOFic?zoom(T,tOFic,.4):1);
      else cerfVolant(c,830,250,zoom(T,tCerf,.4),T);
      tab.maj(); return; }
    /* l'accroche et la ficelle : le sol nu, son tour orange, la pelote */
    if(T>=tSol) solVide(c,X0,Y0,3,2,S,false);
    tourCraie(c,X0,Y0,3*S,2*S,T>=fic?1:(T-tTour)/Math.max(.6,t10-tTour));
    if(T<fic){
      if(T>=t10) ecrire(c,'le tour : 10 m',X0+1.5*S,Y0-70,62*zoom(T,t10,.4),TOUR);
      if(T>=tAch) peloteCraie(c,830,360,80,zoom(T,tAch,.4));
      if(T>=t10b) ecrire(c,'10 m',830,560,64*zoom(T,t10b,.4),TOUR);
    } else {
      peloteCraie(c,830,360,62);
      if(T>=tOups&&T<tPer) ecrire(c,'?',X0+1.5*S,Y0+S,150*(T>=tNu?zoom(T,tNu,.5):1),CRAIE.faux);
      if(T>=tPer) ecrire(c,'périmètre',X0+1.5*S,Y0-70,66*zoom(T,tPer,.4),TOUR);
      if(T>=tAire){ c.fillStyle='rgba(116,192,252,.35)'; c.fillRect(X0+8,Y0+8,3*S-16,2*S-16);
        ecrire(c,'aire',X0+1.5*S,Y0+S,96*zoom(T,tAire,.4),'#d0ebff'); }
      if(T>=tCar){ carreauCraie(c,770,Y0+2*S+20,S*.8,zoom(T,tCar,.4)); }
    }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-ficelle'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,tJe-.08,352,62,a0('Salut !')),
    ...suiteDe(fic,60,62,[a0('Je veux couvrir'),a0('le sol de ma cabane.')],[a0('J’ai fait le tour :'),a0('10 mètres.')],[a0('J’achète 10 mètres'),a0('de ficelle !')]),
    ...suiteDe(q,60,62,[a1('Oups ! La ficelle'),a1('fait le tour…')],[a1('mais le sol est'),a1('toujours tout nu !')],[a1('Le tour, c’est'),a1('le périmètre.')],
      [a1('Pour couvrir le sol,'),a1('il faut l’aire :'),a1('des carreaux.')]),
    ...suiteDe(com,60,62,[a3('Ouf !'),a3('Et la ficelle ?')],[a3('Je la garde pour'),a3('mon cerf-volant.')]),
    ...suiteDe(f,60,60,[a4('À toi : un sol de'),a4('2 rangées de 4 carreaux.')],[a4('Combien de carreaux'),a4('pour le couvrir ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Mon sol a 2 rangées'),qd('de 3 carreaux.'),qd('Combien de carreaux'),qd('pour le couvrir ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('3 carreaux,'), r2=rd('+ 3 carreaux :'), r3=rd('6 carreaux.'), r4=rd('Mon sol est couvert !');
  const tC=mot('02b-reponse','C');

  /* La miniature : le sol entouré de ficelle, deux carreaux posés */
  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    <rect x="45" y="50" width="240" height="160" fill="#6b4a2b"/>
    <rect x="49" y="54" width="72" height="72" rx="6" fill="#74c0fc" stroke="#1864ab" stroke-width="4"/><rect x="129" y="54" width="72" height="72" rx="6" fill="#74c0fc" stroke="#1864ab" stroke-width="4"/>
    <rect x="45" y="50" width="240" height="160" fill="none" stroke="#ff922b" stroke-width="10"/></svg>`;
  poserMiniature(outils,acc+1,'Ficelle<br>ou carreaux ?'+PARI,mini);
  return { clips,FIN,titre:'La ficelle de la cabane',ceinture:0,finTitre:tJe-.08,groupes,finClip:'05-abonne',
    cuts:[tJe-.08,fic,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['10',tq('A',2),tq('10')],['5',tq('B'),tq('5')],['6',tq('C'),tq('6')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2,r3],suite:[r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tJe-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<fic){ if(T<tTour) g.montre(); else if(T<tAch) g.reflechit(); else g.fier(); }
      else if(T<q){ if(T<tPer){ g.oups(); scene.ry=-.12+.3*lisse((T-tOups)/.35); } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.pouce(); }
      else if(T<com){ T<tOFic?g.fier():g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
