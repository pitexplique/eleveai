/* Série Périmètre CE2 : les shorts en dessin animé (ceinture blanche). Outils : films/ce2-commun.js
   (copie de cm1-commun.js), plus ici le chemin à la craie. Code couleur des paysages
   (manim/scripts/ce2/perimetre_ce2_commun.py) : le tour = le périmètre, toujours ORANGE ; le chemin
   de Ti Margo (avant correction) en jaune ; l'erreur en rouge.
   ÉPISODE 01 : LE BAC À SABLE. Ti Margo fait 6 m, 3 m, puis coupe par le milieu : « 9 m ! ». Non : le
   périmètre, c'est le bord, jusqu'au départ. Il recommence : 6, 3, 6, 3. Question : 18 m (B).
   Commentaire : un carnet carré de 9 cm de côté. */

/* Un chemin (liste de points [x, y]) tracé de u = 0 à 1 */
function cheminCraie(c,pts,u=1,coul=TOUR,lw=14){ if(u<=0) return; u=Math.min(1,u);
  const lg=[]; let tot=0; for(let k=1;k<pts.length;k++){ const l=Math.hypot(pts[k][0]-pts[k-1][0],pts[k][1]-pts[k-1][1]); lg.push(l); tot+=l; }
  let reste=tot*u; c.strokeStyle=coul; c.lineWidth=lw; c.lineCap='round'; c.lineJoin='round'; c.beginPath(); c.moveTo(...pts[0]);
  for(let k=1;k<pts.length&&reste>0;k++){ const v=Math.min(1,reste/lg[k-1]); c.lineTo(pts[k-1][0]+(pts[k][0]-pts[k-1][0])*v,pts[k-1][1]+(pts[k][1]-pts[k-1][1])*v); reste-=lg[k-1]; }
  c.stroke(); }
/* Le point au bout d'un chemin tracé jusqu'à u */
function boutChemin(pts,u){ u=Math.max(0,Math.min(1,u)); const lg=[]; let tot=0;
  for(let k=1;k<pts.length;k++){ const l=Math.hypot(pts[k][0]-pts[k-1][0],pts[k][1]-pts[k-1][1]); lg.push(l); tot+=l; }
  let reste=tot*u; for(let k=1;k<pts.length;k++){ if(reste<=lg[k-1]){ const v=lg[k-1]?reste/lg[k-1]:0; return [pts[k-1][0]+(pts[k][0]-pts[k-1][0])*v,pts[k-1][1]+(pts[k][1]-pts[k-1][1])*v]; } reste-=lg[k-1]; }
  return pts[pts.length-1]; }
function rond(c,x,y,r,coul){ c.fillStyle=coul; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); }
/* Le sable : un rectangle beige, quelques grains */
function sable(c,x,y,w,h){ c.fillStyle='#e9c46a'; c.fillRect(x,y,w,h); c.fillStyle='#d4a373';
  for(let k=0;k<40;k++){ const gx=x+((k*97)%Math.max(1,w-20))+10, gy=y+((k*53)%Math.max(1,h-20))+10; c.beginPath(); c.arc(gx,gy,4,0,7); c.fill(); }
  c.strokeStyle='#8a5a2b'; c.lineWidth=10; c.strokeRect(x,y,w,h); }
/* Une progression de 0 à 1 entre t0 et t1 */
const entre=(T,t0,t1)=>Math.max(0,Math.min(1,(T-t0)/Math.max(.05,t1-t0)));

FILMS.comprendre=function(outils){
  const DUR={'00-accroche':11.95,'01-erreur':9.13,'02-tour':8.6,'03-question':13.75,'03b-reponse':11.37,'04-commentaire':9.12,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'03-question':3.3,'03b-reponse':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,err,tou,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  const W=tab.W;

  /* Le bac à sable 6 m × 3 m : 120 px par mètre ; départ en bas à gauche */
  const S=120, w=6*S, h=3*S, X0=(W-w)/2, Y0=190;
  const D=[X0,Y0+h], B=[X0+w,Y0+h], H=[X0+w,Y0], G=[X0,Y0];
  const TOURP=[D,B,H,G,D];

  /* Les instants */
  const tJe=mot('00-accroche','Je'), tA6=mot('00-accroche','6'), tA3=mot('00-accroche','3'), tCoupe=mot('00-accroche','coupe'),
        tMil=mot('00-accroche','milieu'), tA9=mot('00-accroche','9');
  const tNon=mot('01-erreur','non'), tCouper=mot('01-erreur','Couper'), tPer=mot('01-erreur','périmètre'), tBord=mot('01-erreur','bord'),
        tDep=mot('01-erreur','départ');
  const tR6=mot('02-tour','6'), tR3=mot('02-tour','3'), tR6b=mot('02-tour','6',3), tR3b=mot('02-tour','3',3), tRev=mot('02-tour','revoilà');
  const tC9=mot('04-commentaire','9'), tCote=mot('04-commentaire','côté'), tCPer=mot('04-commentaire','périmètre'), tRep=mot('04-commentaire','Réponds');

  function cote(c,s,x,y,T0,T,coul=CRAIE.blanc){ if(T>=T0) ecrire(c,s,x,y,54*zoom(T,T0,.4),coul); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un carnet carré de 9 cm de côté */
      const s=330, x=(W-s)/2, y=200;
      c.fillStyle='#4dabf7'; c.fillRect(x,y,s,s); c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.strokeRect(x,y,s,s);
      c.strokeStyle='#1864ab'; c.lineWidth=4; for(let k=1;k<6;k++){ c.beginPath(); c.moveTo(x+30,y+k*s/6); c.lineTo(x+s-30,y+k*s/6); c.stroke(); }
      cote(c,'9 cm',x+s/2,y+s+50,tC9,T,CRAIE.jaune);
      if(T>=tCote){ c.strokeStyle=CRAIE.jaune; c.lineWidth=12; c.lineCap='round'; c.beginPath(); c.moveTo(x,y+s); c.lineTo(x+s,y+s); c.stroke(); }
      if(T>=tCPer) tourCraie(c,x,y,s,s,entre(T,tCPer,tCPer+1.2));
      if(T>=tRep) ecrire(c,'?',x+s/2,y+s/2,150*zoom(T,tRep,.6),CRAIE.jaune);
      tab.maj(); return; }
    sable(c,X0,Y0,w,h);
    rond(c,...D,16,CRAIE.jaune);
    if(T<err){ /* l'accroche : 6 m, 3 m, puis le raccourci par le milieu, en jaune */
      const u1=entre(T,tA6,tA6+.9), u2=entre(T,tA3,tA3+.6), u3=entre(T,tCoupe,tMil+.5);
      cheminCraie(c,[D,B],u1,CRAIE.jaune); cheminCraie(c,[B,H],u2,CRAIE.jaune); cheminCraie(c,[H,D],u3,CRAIE.jaune);
      cote(c,'6 m',X0+w/2,Y0+h+50,tA6,T); cote(c,'3 m',X0+w+70,Y0+h/2,tA3,T);
      const p=u3>0?boutChemin([H,D],u3):(u2>0?boutChemin([B,H],u2):boutChemin([D,B],u1));
      if(T>=tA6) rond(c,...p,20,'#e8590c');
      if(T>=tA9) ecrire(c,'le tour : 9 m ?',W/2,Y0-80,62*zoom(T,tA9,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T<tou){ /* l'erreur : le raccourci barré, le bord en orange */
      cheminCraie(c,[D,B,H],1,CRAIE.jaune); cheminCraie(c,[H,D],1,T>=tCouper?CRAIE.faux:CRAIE.jaune);
      cote(c,'6 m',X0+w/2,Y0+h+50,err,T); cote(c,'3 m',X0+w+70,Y0+h/2,err,T);
      if(T>=tNon){ const k=zoom(T,tNon,.5), mx=X0+w/2, my=Y0+h/2, d=46*k; c.strokeStyle=CRAIE.faux; c.lineWidth=16; c.lineCap='round';
        c.beginPath(); c.moveTo(mx-d,my-d); c.lineTo(mx+d,my+d); c.moveTo(mx+d,my-d); c.lineTo(mx-d,my+d); c.stroke(); }
      if(T>=tPer) ecrire(c,'le périmètre = le bord',W/2,Y0-80,60*zoom(T,tPer,.4),TOUR);
      if(T>=tBord) cheminCraie(c,TOURP,entre(T,tBord,tDep),TOUR,16);
      if(T>=tDep) rond(c,...D,16+10*Math.max(0,pop(T,tDep)-1),CRAIE.jaune);
      tab.maj(); return; }
    /* le vrai tour : 6, 3, 6, 3, retour au départ */
    const ts=[tR6,tR3,tR6b,tR3b], pts=[D,B,H,G,D];
    let bout=D;
    for(let k=0;k<4;k++){ const u=entre(T,ts[k],ts[k]+.6); cheminCraie(c,[pts[k],pts[k+1]],u,TOUR,16); if(u>0) bout=boutChemin([pts[k],pts[k+1]],u); }
    cote(c,'6 m',X0+w/2,Y0+h+50,tR6,T,TOUR); cote(c,'3 m',X0+w+70,Y0+h/2,tR3,T,TOUR);
    cote(c,'6 m',X0+w/2,Y0-50,tR6b,T,TOUR); cote(c,'3 m',X0-70,Y0+h/2,tR3b,T,TOUR);
    rond(c,...bout,20,'#e8590c');
    if(T>=tRev) coche(c,X0-60,Y0+h-10,.7);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-erreur'), a2=dit('02-tour'), a4=dit('04-commentaire'), qd=dit('03-question'), rd=dit('03b-reponse');
  const groupes=[
    groupe(acc+.1,tJe-.08,352,62,a0('Salut !')),
    ...suiteDe(err,60,62,[a0('Je fais le tour'),a0('du bac à sable.')],[a0('6 mètres… 3 mètres…')],[a0('et hop, je coupe'),a0('par le milieu !')],
      [a0('Le tour fait 9 mètres !')]),
    ...suiteDe(tou,60,62,[a1('Ah non !')],[a1('Couper par le milieu,'),a1('ce n’est pas faire le tour.')],[a1('Le périmètre, c’est le bord,'),a1('jusqu’au départ.')]),
    ...suiteDe(q,60,62,[a2('Je recommence.')],[a2('6 mètres, 3 mètres,'),a2('6 mètres, 3 mètres.')],[a2('Me revoilà au départ !')]),
    ...suiteDe(f,60,60,[a4('À toi : mon carnet'),a4('est un carré de'),a4('9 centimètres de côté.')],[a4('Quel est son périmètre ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien mesure le tour'),qd('du bac à sable ?')];
  const tq=(m,n=1)=>mot('03-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('6 + 3 = 9,');
  /* « 6 plus » compte déjà pour un « plus » : les « Plus » dits seuls sont le 2e et le 3e */
  const tP1=mot('03b-reponse','Plus',2), t15=mot('03b-reponse','15'), tP2=mot('03b-reponse','Plus',3), t18=mot('03b-reponse','18');
  const r2=[tP1,t15,'9 + 6 = 15,'], r3=[tP2,t18,'15 + 3 = 18.'];
  rd.jusque('Le'); const r4=rd('Le tour fait 18 mètres.');
  const tB=mot('03b-reponse','B');

  /* La miniature : le bac à sable et le raccourci barré */
  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    <rect x="40" y="65" width="250" height="125" fill="#e9c46a" stroke="#8a5a2b" stroke-width="6"/>
    <polyline points="40,190 290,190 290,65 40,190" fill="none" stroke="#ffd43b" stroke-width="9" stroke-linejoin="round"/>
    <path d="M150 110 l30 30 M180 110 l-30 30" stroke="#ff8787" stroke-width="10" stroke-linecap="round"/></svg>`;
  poserMiniature(outils,acc+1,'Le tour<br>fait 9 m ?'+PARI,mini);
  return { clips,FIN,titre:'Le tour du bac à sable',ceinture:0,finTitre:tJe-.08,groupes,finClip:'05-abonne',
    cuts:[tJe-.08,err,tou,q,r,com,f],
    question:{ qc:'03-question',rc:'03b-reponse',finR:com,cpt:fin('03-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['9 m',tq('A'),tq('9')],['18 m',tq('B'),tq('18')],['12 m',tq('C'),tq('12')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2,r3],suite:[r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<com, dansF=T>=f, gros=T<tJe-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<err){ if(T<tCoupe) g.montre(); else if(T<tA9) g.ouvre(); else g.fier(); }
      else if(T<tou){ if(T<tPer){ g.oups(); scene.ry=-.12+.3*lisse((T-tNon)/.35); } else g.montre(); }
      else if(T<q){ T<tRev?g.montre():g.fier(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tB?g.ouvre():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
