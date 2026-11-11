/* Série CALCUL MENTAL 6e, épisode 03 : LES BONBONS. 16 paquets de 5 bonbons : Ti Margo calcule 16 × 10 = 160 !
   Non : un paquet n'a que 5 bonbons, la moitié de 10 → 80. Outils communs : films/mental.js (chargé avant). */

/* Un bonbon emballé : la boule et ses deux papillotes */
function bonbon(c,x,y,r,coul){ c.fillStyle=coul;
  for(const s of [-1,1]){ c.beginPath(); c.moveTo(x+s*r*.8,y); c.lineTo(x+s*r*1.75,y-r*.7); c.lineTo(x+s*r*1.75,y+r*.7); c.closePath(); c.fill(); }
  c.beginPath(); c.arc(x,y,r,0,7); c.fill(); c.fillStyle='rgba(255,255,255,.55)'; c.beginPath(); c.arc(x-r*.35,y-r*.35,r*.28,0,7); c.fill(); }
const COUL_BONBONS=['#ff6b6b','#74c0fc','#ffd43b','#8ce99a','#b197fc'];
/* Un paquet (sachet orange) ; avec `pleins`, ses 5 bonbons en quinconce dedans */
function paquet(c,x,y,s=1,pleins=true){ const w=92*s, h=112*s;
  c.fillStyle='#f08c00'; c.beginPath(); c.roundRect(x-w/2,y-h/2,w,h,12*s); c.fill();
  c.strokeStyle='#a65d00'; c.lineWidth=5*s; c.beginPath(); c.moveTo(x-w/2+6*s,y-h/2+16*s); c.lineTo(x+w/2-6*s,y-h/2+16*s); c.stroke();
  if(!pleins) return; const P=[[-22,0],[22,0],[0,26],[-22,52],[22,52]];
  P.forEach(([dx,dy],k)=>bonbon(c,x+dx*s,y-14*s+dy*s,10*s,COUL_BONBONS[k])); }

FILMS['multiplication']=function(outils){
  const {panneau}=outils;
  const DUR={'00-accroche':11.81,'01-compte':7.58,'02-question':12.53,'02b-reponse':9.36,'03-ouf':4.92,'04-commentaire':5.8,'05-abonne':6.05};
  const clips=enchainer(.4,['00-accroche','01-compte','02-question','02b-reponse','03-ouf','04-commentaire','05-abonne'],DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,cpt,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  /* Les instants */
  const tJai=mot('00-accroche','J\'ai'), t16=mot('00-accroche','16'), t5=mot('00-accroche','5'), t16f=mot('00-accroche','16',3),
        t10=mot('00-accroche','10'), t160=mot('00-accroche','160'), tDonc=mot('00-accroche','Donc'), t160b=mot('00-accroche','160',3);
  const tHe=mot('01-compte','Hé'), tFois=mot('01-compte','fois'), tC10=mot('01-compte','10'), tMais=mot('01-compte','Mais'),
        tPaquet=mot('01-compte','paquet'), tC5=mot('01-compte','5'), tMoitie=mot('01-compte','moitié'), tC10b=mot('01-compte','10',2);
  const tO80=mot('03-ouf','80'), tBeaucoup=mot('03-ouf','beaucoup'), tPartage=mot('03-ouf','partage');
  const tC28=mot('04-commentaire','28'), tCx5=mot('04-commentaire','5'), tRep=mot('04-commentaire','Réponds');

  function dessiner(T){ const c=tab.c; tab.effacer(); const W=tab.W;
    if(T>=com){ /* le défi : 28 × 5 */
      paquet(c,150,330,1.5);
      ligneMots(c,[['28 ×',tC28,CRAIE.blanc],['5',tCx5,CRAIE.d],['= ?',tRep,CRAIE.ok]],W/2+110,340,120,T);
      tab.maj(); return; }
    if(T>=ouf){ /* 80 bonbons, et Ti Margo partage */
      /* au-dessus de la tête de Ti Margo : rien ne descend sous y = 560 */
      const tas=[[110,470],[175,450],[240,475],[305,452],[370,478],[140,525],[205,515],[270,530],[335,518],[400,532]];
      if(T>=tO80) tas.forEach(([x,y],k)=>bonbon(c,x,y,22,COUL_BONBONS[k%5]));
      if(T>=tO80) ecrire(c,'80 bonbons',W/2,140,120*Math.max(1,pop(T,tO80)),CRAIE.ok);
      if(T>=tBeaucoup) ecrire(c,'c’est déjà beaucoup !',W/2,290,64,CRAIE.blanc);
      if(T>=tPartage){ const u=Math.min(1,(T-tPartage)/.5);
        for(const [x,y] of [[720,440],[900,520]]){ c.strokeStyle=CRAIE.d; c.lineWidth=8; c.lineCap='round'; c.beginPath();
          c.moveTo(450,490); c.lineTo(450+(x-70-450)*u,490+(y-490)*u); c.stroke();
          if(u>=1) for(let k=0;k<3;k++) bonbon(c,x-25+k*32,y-8+(k%2)*20,17,COUL_BONBONS[(k+2)%5]); } }
      tab.maj(); return; }
    if(T>=cpt){ /* × 10 ? Non : un paquet n'a que 5 bonbons, la moitié de 10 */
      if(T>=tFois) ecrire(c,'× 10 ?',230,110,110*Math.max(1,pop(T,tC10)),CRAIE.faux);
      if(T>=tMais) barrer(c,90,50,370,170);
      if(T>=tPaquet) paquet(c,820,180,1.45,T>=tC5);
      if(T>=tC5) ecrire(c,'5',950,110,90*Math.max(1,pop(T,tC5)),CRAIE.d);
      if(T>=tMoitie){ /* 10 places : 5 bonbons, 5 places vides */
        for(let k=0;k<10;k++){ const x=100+k*95+(k>=5?30:0), y=420;
          if(k<5) bonbon(c,x,y,22,COUL_BONBONS[k]);
          else { c.strokeStyle=CRAIE.blanc; c.lineWidth=5; c.setLineDash([12,10]); c.beginPath(); c.arc(x,y,24,0,7); c.stroke(); c.setLineDash([]); } }
        c.strokeStyle=CRAIE.d; c.lineWidth=7; c.setLineDash([18,12]); c.beginPath(); c.moveTo(100+4.5*95+15,350); c.lineTo(100+4.5*95+15,490); c.stroke(); c.setLineDash([]); }
      ligneMots(c,[['5 =',tMoitie,CRAIE.d],['la moitié',tMoitie,CRAIE.d],['de 10',tC10b,CRAIE.d]],W/2,600,84,T);
      tab.maj(); return; }
    /* l'accroche : 16 paquets de 5, puis 16 × 10 = 160 ! */
    if(T>=t16) for(let k=0;k<16;k++) paquet(c,95+(k%8)*124,115+Math.floor(k/8)*140,.95,T>=t5);
    ligneMots(c,[['16 ×',t16f,CRAIE.blanc],['10',t10,CRAIE.faux],['= 160',t160,CRAIE.blanc]],W/2,440,96,T);
    if(T>=t160b) ecrire(c,'160 bonbons !',W/2,600,110*Math.max(1,pop(T,t160b)),CRAIE.faux);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-compte'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const salut=[a0('Salut !')];
  const groupes=[
    groupe(acc+.1,tJai-.08,352,62,...salut),
    ...suiteDe(cpt,60,60,[a0('J’ai 16 paquets'),a0('de 5 bonbons.')],[a0('16 fois 10,'),a0('ça fait 160.')],[a0.jusque('Donc')('Donc j’ai 160 bonbons !')],[a0.jusque('Tu')('Tu paries ?')]),
    ...suiteDe(q,60,58,[a1('Hé !'),a1('J’ai calculé fois 10.')],[a1('Mais un paquet n’a'),a1('que 5 bonbons :')],[a1('la moitié de 10.')]),
    ...suiteDe(com,60,62,[a3('80 bonbons,'),a3('c’est déjà beaucoup.')],[a3('Je partage !')]),
    ...suiteDe(f,60,58,[a4('À toi : combien font'),a4('28 fois 5 ?'),a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien j’ai de bonbons ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('16 fois 10, ça fait 160.'); rd.jusque('La'); const r2=rd('La moitié de 160 : 80 bonbons.');

  poserMiniature(outils,acc+1,'16 × 5<br>= 160 ?'+PARI,
    `<svg width="330" height="210" viewBox="0 0 330 210"><rect x="6" y="6" width="318" height="198" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/><text x="165" y="92" font-family="Segoe UI" font-weight="800" font-size="62" fill="#f8f9fa" text-anchor="middle">16 × 5</text><text x="165" y="170" font-family="Segoe UI" font-weight="800" font-size="62" fill="#ff8787" text-anchor="middle">= 160 ?</text></svg>`);
  return { clips,FIN,titre:'Les bonbons de Ti Margo',ceinture:1,finTitre:tJai-.08,groupes,finClip:'05-abonne',
    cuts:[tJai-.08,cpt,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:.64,
      phrase:phraseQ,pause:pauseQ,
      choix:[['160',tq('A'),tq('160')],['21',tq('B'),tq('21')],['80',tq('C'),tq('80')]],
      tete:[[r+.1,'Réponse '],[r+.64,'C !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tJai-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.2) g.salut(T-acc,1.2);
      else if(gros) g.ouvre();
      else if(T<cpt){ if(T<t16f) g.montre(); else if(T<tDonc) g.reflechit(); else g.fier(); }
      else if(T<q){ if(T<tFois) { g.oups(); scene.ry=-.12+.3*lisse((T-cpt)/.35); } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<r+.64?g.ouvre():g.pouce(); }
      else if(T<com){ T>=tPartage?g.ouvre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
