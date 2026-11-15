/* Série Volume 6e, ÉPISODE 01 : MA BOÎTE À TRÉSORS (ceinture blanche). Outils : 6e-commun.js et films/6e-volume.js.
   L'étiquette dit 20 cm³ ; chaque petit cube de 1 cm de côté, c'est 1 cm³. Question : combien de petits cubes ?
   20 (C), pas 23 : le petit 3 veut dire « cube ». Il en avait préparé 60 : avec les 40 en trop, un château.
   Commentaire : un coffre de 35 cm³ contient déjà 12 cubes, combien en manque-t-il ? */

/* « 20 cm³ » : le centre écran du petit 3 (pour l'entourer), le texte étant centré en (x, y) */
function centreDuTrois(c,txt,x,y,taille){ c.font=`800 ${taille}px "Segoe UI"`; const W=c.measureText(txt).width, w0=c.measureText(txt.slice(0,-1)).width, w3=W-w0;
  return [x-W/2+w0+w3/2,y-taille*.28]; }

FILMS.unite=function(outils){
  const DUR={'00-accroche':6.94,'01-cubes':8.19,'02-question':12.86,'02b-reponse':11.05,'03-ouf':6.99,'04-commentaire':12.55,'05-abonne':6.05};
  const B=baseFilm(outils,DUR), {clips,A,dit,mot,marque,acc,hist:cub,q,r,ouf,com,f,FIN,tab,W}=B;
  const m0=k=>marque('00-accroche',k), m1=k=>marque('01-cubes',k), mr=k=>marque('02b-reponse',k), m3=k=>marque('03-ouf',k), m4=k=>marque('04-commentaire',k);

  const tSur=mot('00-accroche','Sur'), tEtiq=mot('00-accroche','l\'étiquette'), t20=m0(10), t20c=m0(11), t20cu=m0(12);
  const tRemplis=mot('01-cubes','remplis'), tPetits=mot('01-cubes','petits'), t1=m1(8), t1c=m1(9), tCote=mot('01-cubes','côté'),
    tChaque=mot('01-cubes','Chaque'), t1b=m1(16), t1bc=m1(17), t1bcu=m1(18);
  const tC=mot('02b-reponse','C'), rCe=mot('02b-reponse','ce'), r20p=mr(7), r1=mr(11), r1c=mr(12), r1cu=mr(13), rLe=mot('02b-reponse','Le'),
    r3=mot('02b-reponse','3'), rCube=mr(19), rCompte=mot('02b-reponse','compte');
  const o60=mot('03-ouf','60'), o40=m3(6), o40t=mot('03-ouf','trop'), oConstruis=mot('03-ouf','construis'), oChateau=mot('03-ouf','château');
  const cCoffre=mot('04-commentaire','coffre'), c35=m4(5), c35c=m4(6), c35cu=m4(7), c12=m4(10), cCombien=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tSur-.08, finR=rCe-.08;

  const BL='#74c0fc';
  const ob=centrerBoite(0,5,0,2,0,2,82,330,430);          /* le coffre : 5 × 2 × 2 cubes */
  const ETIQ=[[t20,'20'],[t20c,'20 cm'],[t20cu,'20 cm³']];
  function etiquette(c,T,x,y){ /* l'étiquette pendue au coffre */
    if(T<tEtiq) return; const u=zoom(T,tEtiq,.4);
    c.save(); c.translate(x,y); c.scale(u,u); c.fillStyle='#fff3bf'; c.strokeStyle='#8a5a2b'; c.lineWidth=5;
    c.beginPath(); c.roundRect(-150,-50,300,100,18); c.fill(); c.stroke(); c.restore();
    prog(c,ETIQ,T,x,y+4,64,'#3b2a14'); }
  const VINGT=paveCubes(5,2,2);
  /* les 20 cubes, dans l'ordre de remplissage : d'abord le fond, rangée par rangée */
  const ORDRE=[...VINGT].sort((a,b)=>(a[1]-b[1])||(b[2]-a[2])||(a[0]-b[0]));

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un coffre de 35 cm³ (7 × 5 × 1), 12 cubes déjà dedans */
      const oc=centrerBoite(0,7,0,1,0,5,74,400,430);
      if(T>=cCoffre) coffre(c,7,1,5,oc,cc=>{ if(T>=c12){ const dd=ORDRE12.filter((_,k)=>T>=c12+.06*k); blocs(cc,dd,oc,{coul:BL}); } },{couvercle:false});
      if(T>=c35){ c.fillStyle='#fff3bf'; c.strokeStyle='#8a5a2b'; c.lineWidth=5; c.beginPath(); c.roundRect(700,70,300,100,18); c.fill(); c.stroke();
        prog(c,[[c35,'35'],[c35c,'35 cm'],[c35cu,'35 cm³']],T,850,124,64,'#3b2a14'); }
      if(T>=c12) ecrire(c,'12 cubes',850,620,56*zoom(T,c12,.4),BL);
      if(T>=cCombien) ecrire(c,'?',420,130,140*zoom(T,cCombien,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T<cub){ /* le coffre vide et son étiquette */
      coffre(c,5,2,2,ob);
      etiquette(c,T,820,250);
      tab.maj(); return; }
    if(T<q){ /* un petit cube tombe dans le coffre ; le petit cube de 1 cm de côté = 1 cm³ */
      coffre(c,5,2,2,ob,cc=>{ if(T>=tRemplis){ const u=lisse01(entre(T,tRemplis,tRemplis+.8)); blocs(cc,[[0,0,1]],ob,{coul:BL,decal:{'0,0,1':[0,3*(1-u),0]}}); } });
      if(T>=tPetits){ const oc={e:120,ox:760,oy:330}; blocs(c,[[0,0,0]],oc,{coul:BL,lw:5});
        const a=cav([0,0,0],120,760,330), b=cav([1,0,0],120,760,330);
        cote(c,[a[0],a[1]+34],[b[0],b[1]+34],(T-t1)/(tCote+.3-t1));
        if(T>=t1) prog(c,[[t1,'1'],[t1c,'1 cm']],T,(a[0]+b[0])/2,a[1]+90,54,CRAIE.jaune); }
      if(T>=t1b) prog(c,[[t1b,'= 1'],[t1bc,'= 1 cm'],[t1bcu,'= 1 cm³']],T,820,560,72,CRAIE.blanc);
      tab.maj(); return; }
    if(T<ouf){ /* la réponse : 20 petits cubes remplissent le coffre ; le petit 3 veut dire « cube » */
      coffre(c,5,2,2,ob,cc=>{ const dd=ORDRE.filter((_,k)=>T>=r20p+.06*k); blocs(cc,dd,ob,{coul:BL}); });
      const X=820, Y=150; ecrire(c,'20 cm³',X,Y,90,CRAIE.blanc);
      prog(c,[[r20p,'= 20 cubes']],T,X,Y+110,62,BL);
      if(T>=r1) prog(c,[[r1,'de 1'],[r1c,'de 1 cm'],[r1cu,'de 1 cm³']],T,X,Y+190,52,BL);
      if(T>=r3){ const [cx,cy]=centreDuTrois(c,'20 cm³',X,Y,90); cercle(c,cx,cy,34,CRAIE.faux,(T-r3)/.4); }
      if(T>=rCube) ecrire(c,'« cube »',X,Y+330,62*zoom(T,rCube,.4),CRAIE.faux);
      if(T>=rCompte){ const u=zoom(T,rCompte,.4); ecrire(c,'23',X,Y+440,70*u,CRAIE.faux);
        trait(c,[X-60,Y+470],[X+60,Y+410],(T-rCompte)/.4,CRAIE.faux,10); }
      tab.maj(); return; }
    /* ouf : le coffre plein (20) ; 60 préparés, 40 en trop → un château */
    coffre(c,5,2,2,ob,cc=>blocs(cc,VINGT,ob,{coul:BL}));
    if(T>=o60) ecrire(c,'60',850,90,96*zoom(T,o60,.5),CRAIE.jaune);
    if(T>=o40) prog(c,[[o40,'40'],[o40t,'40 en trop']],T,850,200,62,BL);
    if(T>=oConstruis){ const n=Math.min(40,Math.floor(40*entre(T,oConstruis,oChateau+.6))+1); blocs(c,CHATEAU.slice(0,n),och,{coul:BL,lw:3}); }
    tab.maj();
  }
  /* le château de 40 cubes : un mur 8 × 4, 4 créneaux, 2 tours de 2 cubes en plus */
  const CHATEAU=[...paveCubes(8,4,1),[0,4,0],[2,4,0],[5,4,0],[7,4,0],[0,5,0],[7,5,0],[0,6,0],[7,6,0]].sort((a,b)=>(a[1]-b[1])||(a[0]-b[0]));
  const och=centrerBoite(0,8,0,7,0,1,40,820,470);
  const ORDRE12=[...paveCubes(7,1,5)].sort((a,b)=>(a[2]-b[2])||(a[0]-b[0])).slice(0,12);

  const a0=dit('00-accroche'), a1=dit('01-cubes'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('Ma boîte à trésors est vide !')),
    ...suiteDe(cub,60,62,[a0('Sur l’étiquette, c’est écrit :'),a0('20 centimètres cubes.')]),
    ...suiteDe(q,60,62,[a1('Je la remplis avec des petits cubes'),a1('de 1 centimètre de côté.')],[a1('Chaque petit cube,'),a1('c’est 1 centimètre cube.')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de petits cubes'),qd('vont dans la boîte ?')];
  const CH=choixMotAMot(qd,q,r,[['A','60'],['B','23'],['C','20']],outils.$);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const rep1=rd('20 centimètres cubes,');
  groupes.push(...suiteDe(ouf,60,62,[rd('ce sont 20 petits cubes'),rd('de 1 centimètre cube.')],[rd('Le petit 3 veut dire « cube » :'),rd('on ne le compte pas.')]),
    ...suiteDe(com,60,62,[a3('J’en avais préparé 60…')],[a3('Avec les 40 en trop,'),a3('je me construis un château !')]),
    ...suiteDe(f,60,58,[a4('À toi : un coffre'),a4('de 35 centimètres cubes'),a4('contient déjà 12 petits cubes'),a4('de 1 centimètre cube.')],
      [a4('Combien en manque-t-il'),a4('pour le remplir ?')],[a4('Réponds en commentaire !')]));

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    <path d="M60 110 L200 110 L230 80 L90 80 Z" fill="#c98a55" stroke="#ffd43b" stroke-width="5"/>
    <rect x="60" y="110" width="140" height="90" fill="#9c5a2b" stroke="#ffd43b" stroke-width="5"/><path d="M200 110 L230 80 L230 170 L200 200 Z" fill="#7a4520" stroke="#ffd43b" stroke-width="5"/>
    <text x="130" y="168" font-family="Segoe UI" font-weight="800" font-size="40" fill="#fff3bf" text-anchor="middle">20 cm³</text>
    <text x="280" y="150" font-family="Segoe UI" font-weight="800" font-size="90" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'20 cm³ :<br>combien de cubes ?'+PARI,mini);
  return { clips,FIN,titre:'Ma boîte à trésors',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,cub,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:B.fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,choix:CH.choix,
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[rep1],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); CH.maj(T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.oups();
      else if(T<cub) g.montre();
      else if(T<q){ T<tChaque?g.ouvre():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tC?g.ouvre():g.pouce(); }
      else if(T<ouf){ T<rLe?g.montre():(T<rCompte?g.montre():g.fier()); }
      else if(T<com){ T<oConstruis?g.oups():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
