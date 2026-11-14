/* Série Solides CM1, ÉPISODE 02 : MON DÉ MAISON (ceinture jaune). Outils : cm1-commun.js et
   films/cm1-solides.js (plierPatron, dessinerPatron : le pliage en 3D, avec numéros).
   Ti Margo numérote son patron au hasard : le 1, et le 6 juste à côté. Oups : sur un vrai dé, 1 et 6
   sont face à face (ils font 7) ; deux carrés qui se touchent sont voisins.
   Question : en face du 3 ? le 4 (C). Il refait son dé, le plie, le lance : 4. Commentaire : en face du 1 ? */

FILMS.patron=function(outils){
  const DUR={'00-accroche':8.17,'01-oups':8.72,'02-question':13.43,'02b-reponse':9.75,'03-ouf':6.43,'04-commentaire':6.36,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,oup,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  const W=tab.W;

  const tJe=mot('00-accroche','Je'), tHasard=mot('00-accroche','hasard'), t1=mot('00-accroche','1'), t6=mot('00-accroche','6');
  const tTouche=mot('01-oups','touche'), tFace=mot('01-oups','face'), t7=mot('01-oups','7');
  const tVrai=mot('03-ouf','vrai'), tLance=mot('03-ouf','lance'), t4=mot('03-ouf','4');
  const tFace1=mot('04-commentaire','1'), tRep=mot('04-commentaire','Réponds');

  const DE='#f8f9fa', E=150;
  /* le centre écran d'un carré du patron à plat (tilt −90), le fond étant ancré en (cx, cy) */
  function centreCarre(nom,cx,cy,e){ const car=plierPatron('croix',{},-90), fond=car.find(x=>x.nom==='fond'), q=car.find(x=>x.nom===nom);
    const m=P=>P.reduce((a,p)=>[a[0]+p[0]/4,a[1]+p[1]/4,a[2]+p[2]/4],[0,0,0]), o=cav(m(fond.P),e,0,0), g=cav(m(q.P),e,cx-o[0],cy-o[1]); return g; }
  function croix(c,tilt,u,v,cx,cy,e,opts={}){ dessinerPatron(c,plierPatron('croix',{g:90*u,d:90*u,av:90*u,ar:90*u,couv:90*v},tilt),e,cx,cy,{coul:DE,...opts}); }

  function dessiner(T){ const c=tab.c; tab.effacer(); const X=W/2, Y=430;
    if(T>=com){ /* le défi : le 1 au milieu, un « ? » en face */
      const num={fond:'1'}; if(T>=tRep) num.couv='?';
      croix(c,-90,0,0,X-120,Y,E,{numeros:T>=tFace1?num:{},couleurs:T>=tRep?{couv:'#ffe066'}:{}});
      if(T>=tRep) ecrire(c,'?',X+300,300,150*zoom(T,tRep,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T<oup){ /* il écrit au hasard : 1 au milieu, 6 juste à côté */
      const num={}; if(T>=t1) num.fond='1'; if(T>=t6) num.d='6';
      croix(c,-90,0,0,X-60,Y,E,{numeros:num});
      if(T>=tHasard&&T<t1) ecrire(c,'au hasard…',X,70,56*zoom(T,tHasard,.4),CRAIE.blanc);
      tab.maj(); return; }
    if(T<q){ /* oups : le 1 TOUCHE le 6 ; sur un vrai dé, ils sont face à face et font 7 */
      croix(c,-90,0,0,X-60,Y,E,{numeros:{fond:'1',d:'6'},couleurs:T>=tTouche?{fond:'#ffc9c9',d:'#ffc9c9'}:{}});
      if(T>=tTouche){ const a=centreCarre('fond',X-60,Y,E), u=zoom(T,tTouche,.5);
        c.strokeStyle='#e03131'; c.lineWidth=24*Math.min(1,u); c.lineCap='round'; c.beginPath(); c.moveTo(a[0]+E/2,a[1]-E/2); c.lineTo(a[0]+E/2,a[1]+E/2); c.stroke();
        ecrire(c,'ils se touchent !',W-210,130,50*u,CRAIE.faux); }
      if(T>=tFace) ecrire(c,'vrai dé : face à face',X-40,660,50*zoom(T,tFace,.4),CRAIE.ok);
      if(T>=t7) ecrire(c,'1 + 6 = 7',W-150,360,56*zoom(T,t7,.4),CRAIE.jaune);
      tab.maj(); return; }
    /* ouf : le vrai dé (1-6, 2-5, 3-4), plié ; il le lance : 4 */
    const NUM={fond:'1',couv:'6',g:'2',d:'5',av:'3',ar:'4'};
    const t0=ouf+.2, tilt=-90+90*lisse01(entre(T,t0,t0+.7)), u=lisse01(entre(T,t0+.7,t0+1.6)), v=lisse01(entre(T,t0+1.6,tVrai+.3));
    croix(c,tilt,u,v,X-90,480,215,{numeros:NUM});
    if(T>=tVrai) coche(c,W-140,640,.7);
    if(T>=t4) ecrire(c,'4 !',W-170,240,120*zoom(T,t4,.5),CRAIE.jaune);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,tJe-.08,352,62,a0('Salut !')),
    ...suiteDe(oup,60,62,[a0('Je fabrique mon dé.')],[a0('J’écris les nombres au hasard :'),a0('1 ici, 6 juste à côté…')]),
    ...suiteDe(q,60,62,[a1('Hé ! Sur mon dé,'),a1('le 1 touche le 6 !')],[a1('Sur un vrai dé,'),a1('ils sont face à face,'),a1('et ils font 7 !')]),
    ...suiteDe(com,60,62,[a3('Ouf ! Mon dé'),a3('est un vrai dé.')],[a3('Je le lance… 4 !')]),
    ...suiteDe(f,60,60,[a4('À toi : sur un vrai dé,'),a4('quelle face est'),a4('en face du 1 ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Sur un vrai dé,'),qd('quelle face est'),qd('en face du 3 ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('7 moins 3, 4.'), r2=rd('Sur le patron, le 4'), r3=rd('n’est jamais collé au 3 :'), r4=rd('il y a un carré entre eux.');
  const tC=mot('02b-reponse','C');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    ${[[1,0],[0,1],[1,1],[2,1],[1,2],[1,3]].map(([x,y])=>`<rect x="${60+48*x}" y="${20+48*y}" width="46" height="46" fill="#f8f9fa" stroke="#7c4a12" stroke-width="4"/>`).join('')}
    <text x="131" y="125" font-family="Segoe UI" font-weight="800" font-size="38" fill="#3b2a14" text-anchor="middle">1</text>
    <text x="179" y="125" font-family="Segoe UI" font-weight="800" font-size="38" fill="#e03131" text-anchor="middle">6</text>
    <text x="270" y="130" font-family="Segoe UI" font-weight="800" font-size="80" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'1 à côté du 6 :<br>un vrai dé ?'+PARI,mini);
  return { clips,FIN,titre:'Mon dé maison',ceinture:1,finTitre:tJe-.08,groupes,finClip:'05-abonne',
    cuts:[tJe-.08,oup,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['le 6',tq('A'),tq('6')],['le 2',tq('B'),tq('2')],['le 4',tq('C'),tq('4')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2,r3,r4],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tJe-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<oup){ T<t1?g.montre():g.fier(); }
      else if(T<q){ if(T<tFace){ g.oups(); scene.ry=-.12+.3*lisse((T-oup)/.35); } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.pouce(); }
      else if(T<com){ T<tLance?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
