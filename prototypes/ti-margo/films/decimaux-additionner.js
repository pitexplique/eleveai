/* Série Nombres décimaux 6e, épisode 07 : LE PIÈGE DE LA MONNAIE.
   Ti Margo a 5 €, il achète des bonbons à 2,75 € : « 5 moins 2, ça fait 3, je garde les 75 centimes : 3,75 € ! »
   Il vérifie : 3,75 + 2,75 = 6,5, plus que ses 5 € ! 5 €, c'est 5,00 : il reste 2,25 €.
   Chargé après films/decimaux.js : voixDe, enchainer, suiteDe, poserTableau, ecrire, pop, poserClasse, gestes… */
FILMS['additionner']=function(outils){
  const DUR={'00-accroche':17.72,'01-verif':12.12,'02-question':15.4,'02b-reponse':11.72,'03-ouf':9.16,'04-commentaire':10.47,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ver,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  /* Les instants */
  const tAch=mot('00-accroche','J’achète'), t275=mot('00-accroche','2'), tMoins=mot('00-accroche','moins'), t2=mot('00-accroche','2',3),
        t3=mot('00-accroche','3'), t75=mot('00-accroche','garde'), t375=mot('00-accroche','3',2), tParie=mot('00-accroche','paries');
  const tV=mot('01-verif','vérifie'), tV375=mot('01-verif','3'), tV275=mot('01-verif','2'), tV65=mot('01-verif','6'), tQue=mot('01-verif','que'), tProb=mot('01-verif','problème');
  const tO225=A['03-ouf']+window.CUES[VIDEO]['03-ouf'][1][0], tO275=mot('03-ouf','2',3), tO5=mot('03-ouf','5'), tOuf=mot('03-ouf','Ouf');
  const t10=mot('04-commentaire','10'), tLivre=mot('04-commentaire','livre'), t640=mot('04-commentaire','6'), tRep=mot('04-commentaire','Réponds');

  /* Les dessins de l'ardoise */
  function billet(c,x,y,txt,z=1){ if(z<=0) return; const w=260*z,h=140*z;
    c.fillStyle='#8ce99a'; c.strokeStyle='#2b8a3e'; c.lineWidth=8; c.beginPath(); c.roundRect(x-w/2,y-h/2,w,h,16*z); c.fill(); c.stroke();
    c.strokeStyle='#2b8a3e'; c.lineWidth=4; c.beginPath(); c.arc(x-w*.3,y,h*.2,0,7); c.stroke();
    ecrire(c,txt,x+w*(txt.length>3?.18:.13),y+4,(txt.length>3?66:82)*z,'#1b4332'); }
  function bonbons(c,x,y){ c.fillStyle='#f783ac'; c.strokeStyle='#a61e4d'; c.lineWidth=6;
    c.beginPath(); c.moveTo(x-80,y-70); c.lineTo(x+80,y-70); c.lineTo(x+100,y+80); c.lineTo(x-100,y+80); c.closePath(); c.fill(); c.stroke();
    [['#ffd43b',-40,10],['#74c0fc',20,30],['#8ce99a',50,-20],['#ff8787',-10,-30]].forEach(([k,dx,dy])=>{ c.fillStyle=k; c.beginPath(); c.arc(x+dx,y+dy,22,0,7); c.fill(); });
    c.fillStyle='#f8f9fa'; c.beginPath(); c.moveTo(x-60,y-100); c.lineTo(x,y-70); c.lineTo(x+60,y-100); c.lineTo(x+40,y-70); c.lineTo(x-40,y-70); c.closePath(); c.fill(); }
  function etiq(c,x,y,txt,z=1){ if(z<=0) return; c.fillStyle='#fff3bf'; c.strokeStyle='#e8590c'; c.lineWidth=6; c.beginPath(); c.roundRect(x-130*z,y-48*z,260*z,96*z,14*z); c.fill(); c.stroke(); ecrire(c,txt,x,y+4,68*z,'#d9480f'); }
  function livre(c,x,y){ c.fillStyle='#4dabf7'; c.strokeStyle='#1864ab'; c.lineWidth=7; c.beginPath(); c.roundRect(x-80,y-105,160,210,10); c.fill(); c.stroke();
    c.fillStyle='#f8f9fa'; c.fillRect(x-50,y-60,100,24); c.fillRect(x-50,y-20,100,14); }
  const z=(T,t,k=.5)=>T<t?0:Math.max(1,pop(T,t)*k+(1-k));
  function coche(c,x,y){ c.strokeStyle=CRAIE.ok; c.lineWidth=18; c.lineCap='round'; c.beginPath(); c.moveTo(x,y); c.lineTo(x+40,y+50); c.lineTo(x+130,y-60); c.stroke(); }
  const W=tab.W;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 10 €, un livre à 6,40 € ; la réponse reste à l'élève */
      billet(c,240,170,'10 €',z(T,t10));
      if(T>=tLivre) livre(c,W-330,210);
      etiq(c,W-170,400,'6,40 €',z(T,t640));
      if(T>=tRep) ecrire(c,'Il reste : ?',W/2,610,92*z(T,tRep,.6),CRAIE.d);
      tab.maj(); return; }
    if(T>=ouf){ /* la preuve : 2,25 + 2,75 = 5,00 */
      const xd=W/2+170;
      if(T>=tO225) ecrire(c,'2,25',xd,120,110*z(T,tO225,.3),CRAIE.ok,'right');
      if(T>=tO275){ ecrire(c,'+',xd-330,265,110,CRAIE.blanc); ecrire(c,'2,75',xd,265,110*z(T,tO275,.3),CRAIE.blanc,'right');
        c.strokeStyle=CRAIE.blanc; c.lineWidth=9; c.beginPath(); c.moveTo(xd-380,345); c.lineTo(xd+20,345); c.stroke(); }
      if(T>=tO5) ecrire(c,'5,00',xd,440,120*z(T,tO5,.4),CRAIE.d,'right');
      if(T>=tO5+.3) ecrire(c,'= 5 €',W/2,610,96,CRAIE.ok);
      if(T>=tOuf) coche(c,W/2+250,600);
      tab.maj(); return; }
    if(T>=ver){ /* la vérification : 3,75 + 2,75 = 6,5, plus que 5 € */
      if(T>=tV375) ecrire(c,'3,75',W/2-30,140,104*z(T,tV375,.4),CRAIE.faux,'right');
      if(T>=tV275) ecrire(c,'+ 2,75',W/2+5,140,104*z(T,tV275,.4),CRAIE.blanc,'left');
      if(T>=tV65) ecrire(c,'= 6,5',W/2,300,130*z(T,tV65,.4),CRAIE.d);
      if(T>=tQue){ ecrire(c,'6,5 > 5 €',W/2,480,112*z(T,tQue,.4),CRAIE.faux); }
      if(T>=tProb){ const u=Math.min(1,(T-tProb)/.4); ecrire(c,'?!',W/2+380,480,150*(.6+.4*u)*z(T,tProb,.4),CRAIE.faux); }
      tab.maj(); return; }
    /* l'accroche : le billet, les bonbons, le calcul de travers */
    billet(c,W-210,140,'5 €');
    if(T>=t275-.3) bonbons(c,170,180);
    etiq(c,170,330,'2,75 €',z(T,t275));
    if(T>=tMoins) ecrire(c,'5 −',W/2+60,330,96*z(T,tMoins,.4),CRAIE.blanc,'right');
    if(T>=t2) ecrire(c,'2',W/2+90,330,96*z(T,t2,.4),CRAIE.blanc,'left');
    if(T>=t3) ecrire(c,'= 3',W/2+170,330,96*z(T,t3,.4),CRAIE.blanc,'left');
    if(T>=t75) ecrire(c,'+ 75 centimes',W/2+90,450,70*z(T,t75,.4),CRAIE.d);
    if(T>=t375) ecrire(c,'3,75 €',W/2+90,610,124*z(T,t375,.4),CRAIE.blanc);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-verif'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  /* « Et 2 virgule 25 plus 2 virgule 75 » : les instants sont mêlés (« Et 2 », « 25 plus ») ; posés à la main */
  const L3=window.CUES[VIDEO]['03-ouf'], o=k=>A['03-ouf']+L3[k][0];
  const ph=(txt,ts)=>[ts[0],ts[ts.length-1],txt,ts];
  const ouf1=ph('Et 2,25 + 2,75,',[o(0),o(1),o(3),o(5)]);
  a3.jusque('ça');
  const groupes=[
    groupe(acc+.1,tAch-.08,352,62,a0('Salut !'),a0('J’ai 5 euros.')),
    ...suiteDe(ver,60,60,[a0('J’achète des bonbons'),a0('à 2,75 €.')],[a0('5 moins 2, ça fait 3,'),a0('et je garde'),a0('les 75 centimes.')],[a0('Il me reste'),a0('3,75 € !')],[a0('Tu paries ?')]),
    ...suiteDe(q,60,62,[a1('Je vérifie :')],[a1('3,75 + 2,75'),a1('ça fait 6,5.')],[a1('C’est plus que'),a1('mes 5 € !')],[a1('Il y a un problème.')]),
    ...suiteDe(com,60,62,[ouf1,a3('ça fait bien 5.')],[a3('Ouf, mon porte-monnaie'),a3('est d’accord !')]),
    ...suiteDe(f,60,58,[a4('À toi : j’ai 10 €.')],[a4('J’achète un livre'),a4('à 6,40 €.')],[a4('Combien me reste-t-il ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien me reste-t-il ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('5 €, c’est 5,00.'), r2=rd('5,00 moins 2,75'), r3=rd('ça fait 2,25.');

  poserMiniature(outils,acc+1,'J’ai 5 €.<br>Bonbons : 2,75 €'+PARI,
    `<svg width="280" height="161" viewBox="0 0 330 190"><rect x="8" y="8" width="314" height="174" rx="20" fill="#8ce99a" stroke="#2b8a3e" stroke-width="12"/><circle cx="70" cy="95" r="38" fill="none" stroke="#2b8a3e" stroke-width="7"/><text x="215" y="128" font-family="Segoe UI" font-weight="800" font-size="96" fill="#1b4332" text-anchor="middle">5 €</text></svg>`);
  return { clips,FIN,titre:'Le piège de la monnaie',ceinture:1,finTitre:tAch-.08,groupes,finClip:'05-abonne',
    cuts:[tAch-.08,ver,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:.62,
      phrase:phraseQ,pause:pauseQ,
      choix:[['3,75 €',tq('A'),tq('3')],['2,25 €',tq('B'),tq('2')],['3,25 €',tq('C'),tq('3',3)]],
      tete:[[r+.1,'Réponse '],[r+.62,'B !']],reponse:[r1],suite:[r2,r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tAch-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<ver){ if(T<tMoins) g.montre(); else if(T<t375) g.reflechit(); else if(T<tParie) g.fier(); else g.pouce(); }
      else if(T<q){ if(T>=tQue){ g.oups(); scene.ry=-.12+.3*lisse((T-tQue)/.35); } else if(T>=tV) g.montre(); else g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<r+.62?g.ouvre():g.pouce(); }
      else if(T<com){ T>=tOuf?g.fier():g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.oups(); }
    } };
};
