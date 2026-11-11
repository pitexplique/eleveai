/* Série CALCUL MENTAL 6e : épisode 02, LA SOUSTRACTION (short Ti Margo en dessin animé).
   Les outils (voixDe, enchainer, suiteDe, poserTableau, ecrire, ligneMots, barrer, coche, gestes…) viennent de films/mental.js. */

/* ---- Dessins à la craie propres à l'épisode ---- */
/* Un skate vu de profil : planche orange relevée aux deux bouts, deux roues */
function skateCraie(c,x,y,s=1){ const L=170*s, e=26*s;
  c.fillStyle='#ff922b'; c.strokeStyle='#f8f9fa'; c.lineWidth=6*s; c.lineJoin='round';
  c.beginPath(); c.moveTo(x-L,y-e*1.6); c.quadraticCurveTo(x-L+10*s,y,x-L+50*s,y); c.lineTo(x+L-50*s,y);
  c.quadraticCurveTo(x+L-10*s,y,x+L,y-e*1.6); c.lineTo(x+L-8*s,y-e*1.6-10*s); c.quadraticCurveTo(x+L-22*s,y-e,x+L-50*s,y-e);
  c.lineTo(x-L+50*s,y-e); c.quadraticCurveTo(x-L+22*s,y-e,x-L+8*s,y-e*1.6-10*s); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#adb5bd'; for(const dx of [-L+70*s,L-70*s]){ c.fillRect(x+dx-14*s,y,28*s,14*s); }
  c.fillStyle='#ffd43b'; for(const dx of [-L+70*s,L-70*s]){ c.beginPath(); c.arc(x+dx,y+30*s,20*s,0,7); c.fill(); c.stroke(); } }
/* Un billet vert ; `txt` écrit au centre (à son instant seulement) */
function billetCraie(c,x,y,s=1,txt=''){ const w=300*s, h=150*s;
  c.fillStyle='#b2f2bb'; c.strokeStyle='#2b8a3e'; c.lineWidth=8*s; c.beginPath(); c.roundRect(x-w/2,y-h/2,w,h,16*s); c.fill(); c.stroke();
  c.strokeStyle='#40c057'; c.lineWidth=4*s; c.beginPath(); c.roundRect(x-w/2+16*s,y-h/2+16*s,w-32*s,h-32*s,10*s); c.stroke();
  if(txt){ c.fillStyle='#1b5e20'; c.font=`800 ${70*s}px "Segoe UI"`; c.textAlign='center'; c.textBaseline='middle'; c.fillText(txt,x,y+4*s); } }
/* Un livre fermé : couverture bleue, tranche blanche */
function livreCraie(c,x,y,s=1){ const w=150*s, h=190*s;
  c.fillStyle='#f8f9fa'; c.fillRect(x-w/2+14*s,y-h/2+10*s,w,h);
  c.fillStyle='#4dabf7'; c.strokeStyle='#f8f9fa'; c.lineWidth=6*s; c.beginPath(); c.roundRect(x-w/2,y-h/2,w,h,10*s); c.fill(); c.stroke();
  c.fillStyle='#1971c2'; c.fillRect(x-w/2,y-h/2,22*s,h);
  c.fillStyle='#ffd43b'; c.fillRect(x-w/2+44*s,y-h/2+40*s,w-70*s,16*s); c.fillRect(x-w/2+44*s,y-h/2+70*s,w-90*s,12*s); }
/* La droite des bonds, mais à pas inégaux : pos[v] = place (0 → 1) de la valeur v sur le trait */
function droitePlaces(c,pos,x0,x1,y){ const X=v=>x0+pos[v]*(x1-x0);
  return { X,
    trait(){ c.strokeStyle=CRAIE.blanc; c.lineWidth=8; c.lineCap='round'; c.beginPath(); c.moveTo(x0-40,y); c.lineTo(x1+40,y); c.stroke(); },
    tic(v,T,t0,coul=CRAIE.blanc,ft=64){ if(T<t0) return; c.strokeStyle=coul; c.lineWidth=8; c.beginPath(); c.moveTo(X(v),y-24); c.lineTo(X(v),y+24); c.stroke();
      ecrire(c,String(v),X(v),y+70,ft*Math.max(1,pop(T,t0)),coul); },
    rond(v,T,t0,coul=CRAIE.u){ if(T<t0) return; const u=Math.min(1,(T-t0)/.35); c.strokeStyle=coul; c.lineWidth=7; c.beginPath(); c.arc(X(v),y+70,52,-Math.PI/2,-Math.PI/2+u*2*Math.PI); c.stroke(); },
    bond(a,b,txt,T,t0,coul=CRAIE.d,h=110){ if(T<t0) return; const u=Math.min(1,(T-t0)/.45), xa=X(a), xb=X(b), xm=(xa+xb)/2;
      c.strokeStyle=coul; c.lineWidth=8; c.lineCap='round'; c.beginPath();
      for(let k=0;k<=40*u;k++){ const s=k/40, xx=xa+(xb-xa)*s, yy=y-30-h*4*s*(1-s); k?c.lineTo(xx,yy):c.moveTo(xx,yy); } c.stroke();
      if(u>=1){ c.beginPath(); c.moveTo(xb-22,y-62); c.lineTo(xb,y-30); c.lineTo(xb+14,y-66); c.stroke(); ecrire(c,txt,xm,y-h-70,62*Math.max(1,pop(T,t0+.45)),coul); } } };
}

/* ============================================================
   ÉPISODE 02 : LE SKATE. Skate à 36 €, billet de 100 € : Ti Margo croit qu'on lui rend 74 € ! Non : 4 + 60 = 64 €.
   ============================================================ */
FILMS['soustraction']=function(outils){
  const {panneau}=outils;
  const DUR={'00-accroche':12.31,'01-vendeur':9.61,'02-question':13.68,'02b-reponse':10.48,'03-ouf':4.24,'04-commentaire':9.81,'05-abonne':6.05};
  const clips=enchainer(.4,['00-accroche','01-vendeur','02-question','02b-reponse','03-ouf','04-commentaire','05-abonne'],DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ven,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  /* Les instants */
  const tJach=mot('00-accroche','J\'achète'), tSkate=mot('00-accroche','skate'), t36=mot('00-accroche','36'), tPaie=mot('00-accroche','paie'),
        tBillet=mot('00-accroche','billet'), t100=mot('00-accroche','100'), t74=mot('00-accroche','74');
  const tDoigts=mot('01-vendeur','doigts'), tDe=mot('01-vendeur','De'), t36v=mot('01-vendeur','36'), t40=mot('01-vendeur','40'),
        tManque=mot('01-vendeur','manque'), t4=mot('01-vendeur','4'), t40b=mot('01-vendeur','40',2), t100v=mot('01-vendeur','100'),
        tManque2=mot('01-vendeur','manque',2), t60=mot('01-vendeur','60');
  const tOuf=mot('03-ouf','Ouf'), t10=mot('03-ouf','10'), tVendeur=mot('03-ouf','vendeur');
  const tLivre=mot('04-commentaire','livre'), tC58=mot('04-commentaire','58'), tC100=mot('04-commentaire','100'), tRend=mot('04-commentaire','rend'),
        tRep=mot('04-commentaire','Réponds');

  function dessiner(T){ const c=tab.c; tab.effacer(); const W=tab.W;
    if(T>=com){ /* le défi : un livre à 58 €, un billet de 100 €, combien on te rend ? */
      if(T>=tLivre) livreCraie(c,250,150,.95);
      if(T>=tC58) ecrire(c,'58 €',520,150,110*Math.max(1,pop(T,tC58)),CRAIE.blanc,'left');
      if(T>=tC100){ billetCraie(c,250,375,1); ecrire(c,'100 €',520,375,110*Math.max(1,pop(T,tC100)),CRAIE.d,'left'); }
      if(T>=tRend) ecrire(c,'? €',W/2,565,110*Math.max(1,pop(T,tRend)),CRAIE.ok);
      tab.maj(); return; }
    if(T>=ouf){ /* on rend 64 € : le vendeur n'a pas perdu 10 € */
      skateCraie(c,260,190,1.1);
      ecrire(c,'64 €',650,200,130*Math.max(1,pop(T,tOuf)),CRAIE.ok);
      if(T>=tOuf+.3) coche(c,830,190,.9);
      if(T>=t10) ecrire(c,'10 € ?',W/2,480,110*Math.max(1,pop(T,t10)),CRAIE.faux);
      if(T>=tVendeur) barrer(c,W/2-190,415,W/2+190,545);
      tab.maj(); return; }
    if(T>=ven){ /* 74 € ? Le vendeur compte : 36 → 40 (+ 4), 40 → 100 (+ 60) */
      ecrire(c,'74 € ?',190,95,90,CRAIE.faux);
      if(T>=tDoigts) barrer(c,60,45,320,145);
      skateCraie(c,800,105,.6);
      const d=droitePlaces(c,{36:0,40:.22,100:1},170,890,530);
      if(T>=tDe) d.trait();
      d.tic(36,T,t36v); d.tic(40,T,t40,CRAIE.u); d.rond(40,T,t40+.2); d.bond(36,40,'+ 4',T,t4-.45,CRAIE.d,90);
      d.tic(100,T,t100v,CRAIE.ok); d.bond(40,100,'+ 60',T,t60-.45,CRAIE.d,140);
      tab.maj(); return; }
    /* l'accroche : un skate à 36 €, un billet de 100 €, « 74 € ! » */
    if(T>=tSkate) skateCraie(c,290,140,1.2);
    if(T>=t36) ecrire(c,'36 €',780,140,110*Math.max(1,pop(T,t36)),CRAIE.blanc);
    if(T>=t100) billetCraie(c,270,390,1.25,'100 €');
    if(T>=t74) ecrire(c,'74 € !',610,390,120*Math.max(1,pop(T,t74)),CRAIE.faux,'left');
    if(T>=t74){ c.strokeStyle=CRAIE.faux; c.lineWidth=8; c.lineCap='round'; c.beginPath(); c.moveTo(495,390); c.lineTo(580,390); c.moveTo(555,365); c.lineTo(580,390); c.lineTo(555,415); c.stroke(); }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-vendeur'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const salut=[a0('Salut !')];
  const groupes=[
    groupe(acc+.1,tJach-.08,352,62,...salut),
    ...suiteDe(ven,60,60,[a0('J’achète un skate'),a0('à 36 euros.')],[a0('Je paie avec un billet'),a0('de 100 euros.')],[a0('Le vendeur va me rendre'),a0('74 euros !')],[a0.jusque('Tu')('Tu paries ?')]),
    ...suiteDe(q,60,60,[a1('Le vendeur compte'),a1('sur ses doigts.')],[a1('De 36 à 40,'),a1('il manque 4.')],[a1('De 40 à 100,'),a1('il manque 60.')]),
    ...suiteDe(com,60,62,[a3('Ouf ! Je n’ai pas volé'),a3('10 euros au vendeur.')]),
    ...suiteDe(f,60,58,[a4('À toi : un livre'),a4('coûte 58 euros.')],[a4('Tu paies avec'),a4('100 euros.')],[a4('Combien on te rend ?'),a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien on me rend ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('4 plus 60, ça fait 64 euros.'), r2=rd('Et 36 plus 64, ça fait bien 100.');

  poserMiniature(outils,acc+1,'100 − 36<br>= 74 ?'+PARI,
    `<svg width="330" height="210" viewBox="0 0 330 210"><rect x="6" y="6" width="318" height="198" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/><text x="165" y="92" font-family="Segoe UI" font-weight="800" font-size="58" fill="#f8f9fa" text-anchor="middle">100 − 36</text><text x="165" y="170" font-family="Segoe UI" font-weight="800" font-size="62" fill="#ff8787" text-anchor="middle">= 74 ?</text></svg>`);
  return { clips,FIN,titre:'Le skate de Ti Margo',ceinture:1,finTitre:tJach-.08,groupes,finClip:'05-abonne',
    cuts:[tJach-.08,ven,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:.62,
      phrase:phraseQ,pause:pauseQ,
      choix:[['74 €',tq('A'),tq('74')],['64 €',tq('B'),tq('64')],['136 €',tq('C'),tq('136')]],
      tete:[[r+.1,'Réponse '],[r+.62,'B !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tJach-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.2) g.salut(T-acc,1.2);
      else if(gros) g.ouvre();
      else if(T<ven){ if(T<tPaie) g.montre(); else if(T<t74) g.reflechit(); else g.fier(); }
      else if(T<q){ if(T<tDe) { g.oups(); scene.ry=-.12+.3*lisse((T-ven)/.35); } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<r+.62?g.ouvre():g.pouce(); }
      else if(T<com){ T>=tOuf+.3?g.fier():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
