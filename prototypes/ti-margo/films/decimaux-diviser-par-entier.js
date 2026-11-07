/* ============================================================
   Série Nombres décimaux 6e, ÉPISODE 11 : LE PARTAGE DE TI MARGO.
   10 € entre 4 copains : 10 ÷ 4 = 2, il reste 2… et Ti Margo garde les 2 € qui restent !
   Ses copains protestent : 2 € = 20 pièces de 10 centimes, on continue le partage : 2,5 € chacun.
   Chargé après films/decimaux.js : utilise voixDe, poserTableau, ecrire, pop, poserClasse, suiteDe, gestes…
   ============================================================ */
FILMS['diviser-par-entier']=function(outils){
  const {panneau}=outils;
  const DUR={'00-accroche':15.29,'01-copains':9.14,'02-question':14.10,'02b-reponse':11.04,'03-snif':7.77,'04-commentaire':8.36,'05-abonne':6.05};
  const clips=enchainer(.4,['00-accroche','01-copains','02-question','02b-reponse','03-snif','04-commentaire','05-abonne'],DUR,{'02-question':3.3,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,cop,q,r,snif,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];
  /* Deux bouts de phrase en une seule (« 0,5 » puis « euro », que la voix lie en un mot) */
  const joindre=(...ps)=>[ps[0][0],ps[ps.length-1][1],ps.map(p=>p[2]).join(' '),ps.flatMap(p=>p[3])];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  /* Les instants */
  const tJe=mot('00-accroche','Je'), t10=mot('00-accroche','10'), tCop4=mot('00-accroche','4'), tDiv=mot('00-accroche','divisé'), tQ2=mot('00-accroche','2'),
        tReste=mot('00-accroche','reste'), tChacun=mot('00-accroche','Chacun'), tGarde=mot('00-accroche','garde'),
        tParie=mot('00-accroche','paries');
  const tProt=mot('01-copains','protestent'), tLes=mot('01-copains','Les'), t20=mot('01-copains','20'), t10c=mot('01-copains','10'), tPeut=mot('01-copains','peut');
  const tEt4=mot('03-snif','fois'), t10s=mot('03-snif','10'), tRien=mot('03-snif','rien'), tSnif=mot('03-snif','Snif');
  const tC7=mot('04-commentaire','7'), tC4=mot('04-commentaire','4'), tCom=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');

  const z=(T,t)=>T>=t?1+.4*(Math.max(1,pop(T,t))-1):0;   // un pop plus doux : les mots longs ne débordent pas
  /* Un copain à la craie : une tête ronde ; humeur 1 content, −1 fâché */
  function copain(c,x,y,s=1,humeur=1,coul=CRAIE.u){ c.save(); c.translate(x,y); c.scale(s,s);
    c.fillStyle=coul; c.beginPath(); c.arc(0,0,56,0,7); c.fill();
    c.fillStyle='#1f3b2c'; for(const dx of [-20,20]){ c.beginPath(); c.arc(dx,-10,8,0,7); c.fill(); }
    c.strokeStyle='#1f3b2c'; c.lineWidth=7; c.lineCap='round'; c.beginPath();
    if(humeur>0) c.arc(0,10,24,.2*Math.PI,.8*Math.PI); else c.arc(0,40,22,1.2*Math.PI,1.8*Math.PI); c.stroke();
    if(humeur<0){ for(const sg of [-1,1]){ c.beginPath(); c.moveTo(sg*34,-34); c.lineTo(sg*8,-24); c.stroke(); } }
    c.fillStyle=coul; c.beginPath(); c.roundRect(-46,62,92,70,24); c.fill();
    c.restore(); }
  /* Une pièce à la craie */
  function piece2(c,x,y,rr,txt,coul=CRAIE.d,fs){ c.fillStyle=coul; c.beginPath(); c.arc(x,y,rr,0,7); c.fill(); c.strokeStyle='#1f3b2c'; c.lineWidth=Math.max(2,rr/8); c.beginPath(); c.arc(x,y,rr*.78,0,7); c.stroke();
    if(txt) ecrire(c,txt,x,y+2,fs||rr*.85,'#1f3b2c'); }
  /* Un billet de 10 € */
  function billet(c,x,y,s=1){ c.fillStyle='#ff8787'; c.beginPath(); c.roundRect(x-110*s,y-55*s,220*s,110*s,14*s); c.fill(); c.strokeStyle='#1f3b2c'; c.lineWidth=5*s; c.strokeRect(x-95*s,y-42*s,190*s,84*s);
    ecrire(c,'10 €',x,y+2,58*s,'#1f3b2c'); }
  const COUL=[CRAIE.u,CRAIE.c,CRAIE.ok,CRAIE.m];
  function quatre(c,y,s,humeur){ for(let k=0;k<4;k++) copain(c,150+k*170,y,s,humeur,COUL[k]); }

  function dessiner(T){ const c=tab.c; tab.effacer(); const W=tab.W;
    if(T>=com){ /* le défi : 7 € entre 4 copains */
      if(T>=tC7) for(let k=0;k<7;k++) piece2(c,140+k*72,110,32*Math.max(1,pop(T,tC7+k*.06)),'1 €',CRAIE.d,24);
      if(T>=tC7) ecrire(c,'7 €',W-140,110,80*z(T,tC7),CRAIE.d);
      if(T>=tC4) quatre(c,330,.9,1);
      if(T>=tCom) ecrire(c,'7 ÷ 4 = ?',W/2,590,104*z(T,tCom),CRAIE.blanc);
      tab.maj(); return; }
    if(T>=snif){ /* on vérifie : 4 × 2,5 = 10, Ti Margo ne garde rien */
      quatre(c,130,.8,1);
      for(let k=0;k<4;k++) ecrire(c,'2,5 €',150+k*170,265,48,CRAIE.d);
      if(T>=tEt4) ecrire(c,'4 × 2,5',W/2-110,430,100*z(T,tEt4),CRAIE.blanc);
      if(T>=t10s) ecrire(c,'= 10',W/2+200,430,100*z(T,t10s),CRAIE.ok);
      if(T>=t10s+.4){ c.strokeStyle=CRAIE.ok; c.lineWidth=14; c.lineCap='round'; c.beginPath(); c.moveTo(W/2+330,430); c.lineTo(W/2+365,465); c.lineTo(W/2+430,385); c.stroke(); }
      if(T>=tRien) ecrire(c,'Ti Margo : rien',W/2,600,80*z(T,tRien),CRAIE.faux);
      tab.maj(); return; }
    if(T>=cop){ /* les copains protestent : 2 € = 20 pièces de 10 centimes */
      quatre(c,120,.75,T>=tProt?-1:1);
      ecrire(c,'2 €',150,290,64,CRAIE.d,'left');
      if(T>=tLes) { piece2(c,330,290,44,'1 €'); piece2(c,430,290,44,'1 €'); }
      if(T>=t20){ ecrire(c,'=',530,290,70,CRAIE.blanc);
        for(let k=0;k<20;k++){ const tk=t20+k*.05; if(T>=tk) piece2(c,600+(k%10)*42,250+Math.floor(k/10)*80,18*Math.max(1,pop(T,tk,.3)),'',CRAIE.blanc); } }
      if(T>=t10c) ecrire(c,'20 pièces de 10 c',W/2,470,72*z(T,t10c),CRAIE.blanc);
      if(T>=tPeut) ecrire(c,'On partage encore !',W/2,610,72*z(T,tPeut),CRAIE.ok);
      tab.maj(); return; }
    /* l'accroche : le billet, les 4 copains, 10 ÷ 4 = 2 reste 2, Ti Margo garde 2 € */
    if(T>=t10) billet(c,150,110,.9*Math.max(1,pop(T,t10)));
    if(T>=tCop4) for(let k=0;k<4;k++) copain(c,360+k*170,110,.65*Math.max(1,pop(T,tCop4+k*.08)),1,COUL[k]);
    if(T>=tDiv) ecrire(c,'10 ÷ 4',W/2-230,330,96*z(T,tDiv),CRAIE.blanc);
    if(T>=tQ2) ecrire(c,'= 2',W/2+20,330,96*z(T,tQ2),CRAIE.blanc);
    if(T>=tReste) ecrire(c,'reste 2',W/2+260,330,80*z(T,tReste),CRAIE.faux);
    if(T>=tChacun) for(let k=0;k<4;k++) ecrire(c,'2 €',360+k*170,228,48*z(T,tChacun),CRAIE.d);
    if(T>=tGarde){ ecrire(c,'Ti Margo garde :',W/2-130,560,62*(1+.35*(z(T,tGarde)-1)),CRAIE.faux); piece2(c,W/2+250,560,40,'1 €'); piece2(c,W/2+345,560,40,'1 €'); }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-copains'), a3=dit('03-snif'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const salut=[a0('Salut !')];
  const groupes=[
    groupe(acc+.1,tJe-.08,352,62,...salut),
    ...suiteDe(cop,60,62,[a0('Je partage 10 euros'),a0('entre 4 copains.')],[a0('10 divisé par 4 :'),a0('2, et il reste 2.')],[a0('Chacun a 2 euros,'),a0('et je garde les 2 euros'),a0('qui restent !')],[a0('Tu paries que'),a0('c’est juste ?')]),
    ...suiteDe(q,60,60,[a1('Mes copains protestent !')],[a1('Les 2 euros qui restent,'),a1('ce sont 20 pièces'),a1('de 10 centimes.')],[a1('On peut encore'),a1('les partager.')]),
    ...suiteDe(com,60,62,[a3('Et 4 fois 2,5'),a3('ça fait bien 10.')],[a3('Je ne garde rien…')],[a3('Snif !')]),
    ...suiteDe(f,60,58,[a4('À toi : je partage 7 euros'),a4('entre 4 copains.')],[a4('Combien pour chacun ?'),a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien chacun'),qd('doit-il avoir ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('20 pièces divisées par 4 :'), r2=rd('5 pièces de 10 centimes'), r3=joindre(rd('chacun, 0,5'),rd.saute(-1)('euro.')),
    r4=joindre(rd('Chacun a 2,5'),rd.saute(-1)('euros.'));

  poserMiniature(outils,acc+1,'10 € entre<br>4 copains'+PARI,
    `<svg width="330" height="210" viewBox="0 0 330 210"><rect x="6" y="6" width="318" height="198" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/><text x="165" y="96" font-family="Segoe UI" font-weight="800" font-size="60" fill="#f8f9fa" text-anchor="middle">10 ÷ 4</text><text x="165" y="172" font-family="Segoe UI" font-weight="800" font-size="54" fill="#ff8787" text-anchor="middle">= 2 ?</text></svg>`);
  return { clips,FIN,titre:'Le partage de Ti Margo',ceinture:1,finTitre:tJe-.08,groupes,finClip:'05-abonne',
    cuts:[tJe-.08,cop,q,r,snif,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:snif,cpt:fin('02-question')+.1,bonne:1,tBon:.62,
      phrase:phraseQ,pause:pauseQ,
      choix:[['2 €',tq('A'),tq('2',1)],['2,5 €',tq('B'),tq('2',3)],['2,2 €',tq('C'),tq('2',5)]],
      tete:[[r+.1,'Réponse '],[r+.62,'B !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<snif, dansF=T>=f, gros=T<tJe-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gros) g.ouvre();
      else if(T<cop){ if(T<tDiv) g.montre(); else if(T<tGarde) g.reflechit(); else g.fier(); }
      else if(T<q){ if(T>=tProt&&T<tLes) { g.oups(); scene.ry=-.12+.3*lisse((T-tProt)/.35); } else if(T>=tLes) g.montre(); else g.fier(); }
      else if(T<r) g.reflechit();
      else if(T<snif){ T<r+.62?g.ouvre():g.pouce(); }
      else if(T<com){ if(T>=tRien) { g.oups(); scene.ry=-.12+.3*lisse((T-tRien)/.35); } else g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
