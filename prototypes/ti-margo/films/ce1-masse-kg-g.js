/* ============================================================
   Série Masse CE1 — ÉPISODE 01 : LE CHATON DE « 1 GRAMME ». Outils : films/ce1-commun.js + ce1-masse.js.
   Le copain de Ti Margo écrit « 1 g » sur l'étiquette du chaton : c'est la masse d'un trombone !
   Question : le chaton pèse environ… 1 kilogramme (C). Le copain corrige, le chaton ronronne.
   Commentaire : un trombone pèse 1 gramme ; combien pèsent 10 trombones ?
   ============================================================ */
FILMS['kg-g']=function(outils){
  fusionnerNombres();  /* pas deuxAuPlusM : « 1 gramme. 1 gramme ? » = quatre marques de suite, deux occurrences */
  const DUR={'00-accroche':9.75,'01-oups':2.9,'02-question':12.8,'02b-reponse':7.68,'03-fin':5.34,'04-commentaire':7.75,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'01-oups':1.2,'02-question':3.3,'03-fin':1.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,sur,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tEti=mot('00-accroche',"l'étiquette"), tChat=mot('00-accroche','chaton'), tEcrit=mot('00-accroche','écrit'),
        tMasse=mot('00-accroche','masse'), tTromb=mot('00-accroche','trombone');
  const tLourd=mot('01-oups','lourd');
  const tCorr=mot('03-fin','corrige'), tRon=mot('03-fin','ronronne');
  const tTr=mot('04-commentaire','trombone'), tComb=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tEti-.08, HAUT=105, SOL=600, ROUX='#ffc078';
  const CH={x:270,y:590,s:2.4}, ET={x:790,y:230}, SE=1.6;

  function chaton(c,T,z=1){ chatCraie(c,CH.x,CH.y,CH.s,z,ROUX,false); }
  function ficelle(c){ c.strokeStyle='#ced4da'; c.lineWidth=4; c.beginPath(); c.moveTo(CH.x+50,CH.y-230); c.quadraticCurveTo(560,170,ET.x-150,ET.y); c.stroke(); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : 1 trombone = 1 g ; 10 trombones ? */
      if(T>=tTr){ trombone(c,200,340,3.0,zoom(T,tTr,.4)); ecrire(c,'1 g',200,560,80*zoom(T,tTr,.4),CRAIE.jaune); }
      if(T>=tComb){ for(let k=0;k<10;k++) trombone(c,480+(k%5)*125,290+Math.floor(k/5)*210,1.7,zoom(T,tComb+.08*k,.3));
        ecrire(c,'10 trombones ?',640,HAUT,62*zoom(T,tComb,.4),CRAIE.jaune); }
      tab.maj(); return; }
    if(T>=ouf){ /* le copain corrige : 1 kg ; le chaton ronronne */
      chaton(c,T); ficelle(c);
      if(T<tCorr+.9) etiquetteCraie(c,ET.x,ET.y,'1 g',1,1,undefined,SE);
      else etiquetteCraie(c,ET.x,ET.y,'1 kg',zoom(T,tCorr+.9,.4),0,'#d3f9d8',SE);
      if(T>=tCorr+.9) ecrire(c,'1 kilogramme',760,450,64*zoom(T,tCorr+.9,.4),CRAIE.ok);
      if(T>=tRon){ const u=Math.sin((T-tRon)*5)*.5+.5; ecrire(c,'ron… ron…',290,HAUT,58+8*u,CRAIE.blanc); }
      tab.maj(); return; }
    if(T>=sur){ /* un chaton, c'est bien plus lourd ! */
      chaton(c,T); ficelle(c); etiquetteCraie(c,ET.x,ET.y,'1 g',1,doux(entreM(T,tLourd,tLourd+.6)),undefined,SE);
      if(T>=tLourd) ecrire(c,'bien plus lourd !',800,450,58*zoom(T,tLourd,.4),CRAIE.ret);
      tab.maj(); return; }
    /* l'histoire : l'étiquette du chaton, « 1 g » ; c'est la masse d'un trombone */
    if(T>=tChat) chaton(c,T,zoom(T,tChat,.4));
    if(T>=tEcrit){ ficelle(c); etiquetteCraie(c,ET.x,ET.y,'1 g',zoom(T,tEcrit+.5,.4),0,undefined,SE); }
    if(T>=tMasse&&T<tTromb+.2) ecrire(c,'1 g ?',790,440,72,CRAIE.ret);
    if(T>=tTromb){ trombone(c,690,450,2.4,zoom(T,tTromb,.4)); ecrire(c,'= 1 g',860,450,72*zoom(T,tTromb,.4),CRAIE.jaune); }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(sur,60,60,[a0("Sur l'étiquette du chaton,"),a0('mon copain écrit :')],[a0('1 gramme. 1 gramme ?'),a0("C'est la masse d'un trombone !")]),
    ...suiteDe(q,60,62,[a1("Un chaton, c'est"),a1('bien plus lourd !')]),
    ...suiteDe(com,60,62,[a3('Mon copain corrige :'),a3('1 kilogramme.')],[a3('Le chaton ronronne !')]),
    ...suiteDe(f,60,58,[a4('À toi : un trombone'),a4('pèse 1 gramme.')],[a4('Combien pèsent'),a4('10 trombones ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Le chaton pèse environ…')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Un chaton pèse environ'), r2=rd('1 kilogramme.'), r3=rd("1 gramme, c'est un trombone !");
  const tC=mot('02b-reponse','C');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<path d="M70 95 L300 95 L300 185 L70 185 L40 140 Z" fill="#fff3bf" stroke="#8a5a2b" stroke-width="6"/><circle cx="68" cy="140" r="9" fill="#8a5a2b"/>`+
    `<text x="185" y="162" font-family="Segoe UI" font-weight="800" font-size="70" fill="#212529" text-anchor="middle">1 g ?</text></svg>`;
  poserMiniature(outils,acc+1,'Un chaton<br>de 1 g ?'+PARI,mini);
  return { clips,FIN,titre:'Combien pèse un chaton ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,sur,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['1 gramme',tq('A'),tq('gramme')],['100 kilogrammes',tq('B'),tq('kilogrammes')],['1 kilogramme',tq('C'),tq('kilogramme')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<tTromb) g.montre();
      else if(T<sur) g.rit?g.rit():g.oups();
      else if(T<q) g.oups();
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.fier(); }
      else if(T<com){ T<tRon?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
