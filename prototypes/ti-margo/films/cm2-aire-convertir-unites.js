/* ============================================================
   Série Aire CM2 — ÉPISODE 03 : L'ALBUM D'AUTOCOLLANTS. Outils : films/cm2-commun.js.
   Une page carrée de 10 cm de côté (1 dm²), des autocollants de 1 cm².
   Sa sœur : 1 dm = 10 cm, donc 10 autocollants (une seule rangée !). Il y a 10 rangées : 10 × 10 = 100 (C).
   1 dm² = 100 cm². Commentaire : un album de 4 pages de 1 dm².
   ============================================================ */
/* La page sur l'ardoise (1056 × 720), à l'échelle : 1 cm = PAS_AL px ; coin haut-gauche (X_AL, Y_AL) ; le texte à droite */
const PAS_AL=50, X_AL=96, Y_AL=112, PAPIER_AL='#fff4d6', XR_AL=834;
/* La page vide de l'album (côté 10 cm), qui grossit quand z va de 0 à 1 */
function pageAlbum(c,x,y,s,z=1){ if(z<=0) return; const k=Math.min(1.12,z), cx=x+s/2, cy=y+s/2;
  c.save(); c.translate(cx,cy); c.scale(k,k); c.translate(-cx,-cy);
  c.fillStyle=PAPIER_AL; c.fillRect(x,y,s,s); c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.strokeRect(x,y,s,s); c.restore(); }
/* Un texte couché (lu de bas en haut), pour la mesure du côté gauche */
function ecrireCouche(c,s,x,y,taille,coul){ c.save(); c.translate(x,y); c.rotate(-Math.PI/2); ecrire(c,s,0,0,taille,coul); c.restore(); }
/* Un trait de mesure (craie jaune) le long d'un côté, tracé de u = 0 à 1 */
function traitAl(c,x1,y1,x2,y2,u){ if(u<=0) return; u=Math.min(1,u); c.strokeStyle=CRAIE.jaune; c.lineWidth=10; c.lineCap='round';
  c.beginPath(); c.moveTo(x1,y1); c.lineTo(x1+(x2-x1)*u,y1+(y2-y1)*u); c.stroke(); }

FILMS['convertir-unites']=function(outils){
  const DUR={'00-accroche':11.64,'01-soeur':8.6,'02-question':12.45,'02b-reponse':13.11,'03-ouf':4.99,'04-commentaire':11.12,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,soe,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  /* « 10 centimètres » a deux marques : la 1re = « dix », la 2e = « centimètres » ; nombre + unité s'écrit à la 2e */
  const tUne=mot('00-accroche','Une'), tPage=mot('00-accroche','page'), t10cm=mot('00-accroche','centimètres',2),
        tCote=mot('00-accroche','côté'), tDm2=mot('00-accroche','carré',1), tPetits=mot('00-accroche','petits'),
        tCm2=mot('00-accroche','carré',2);
  const tDm=mot('01-soeur','décimètre',2), tCm=mot('01-soeur','centimètres',2), t10=mot('01-soeur','10',3),
        tFacile=mot('01-soeur','Facile');
  const tC=mot('02b-reponse','C'), tIl=mot('02b-reponse','Il'), tRang=mot('02b-reponse','rangées',2),
        tFois=mot('02b-reponse','fois',2), t10b=mot('02b-reponse','10',6), t100=mot('02b-reponse','100'),
        tDm2b=mot('02b-reponse','carré'), tCm2b=mot('02b-reponse','carrés');
  const tPaquet=mot('03-ouf','paquet');
  const t4p=mot('04-commentaire','pages',2), tDm2c=mot('04-commentaire','carré',1), tCombien=mot('04-commentaire','Combien'),
        tRep=mot('04-commentaire','Réponds');
  const finTitre=tUne-.08, finR=tIl-.08;
  const S10=10*PAS_AL;

  /* Les autocollants : la rangée j (0 à 9), chacun grossit à son tour à partir de t0 */
  function rangee(c,j,T,t0,pas=.06){ for(let i=0;i<10;i++) carreauCraie(c,X_AL+i*PAS_AL,Y_AL+j*PAS_AL,PAS_AL,t0===null?1:zoom(T,t0+i*pas,.4)); }
  function mesures(c,T){ /* 10 cm en haut et à gauche, avec le trait jaune */
    traitAl(c,X_AL,Y_AL-8,X_AL+S10,Y_AL-8,(T-t10cm)/.5);
    if(T>=t10cm) ecrire(c,'10 cm',X_AL+S10/2,Y_AL-46,46*zoom(T,t10cm,.4),CRAIE.jaune);
    traitAl(c,X_AL-8,Y_AL,X_AL-8,Y_AL+S10,(T-tCote)/.5);
    if(T>=tCote) ecrireCouche(c,'10 cm',X_AL-46,Y_AL+S10/2,46*zoom(T,tCote,.4),CRAIE.jaune); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 4 pages de 1 dm² (à l'échelle entre elles) */
      const s=220, g=36;
      for(let k=0;k<4;k++){ const x=X_AL+(k%2)*(s+g), y=Y_AL+Math.floor(k/2)*(s+g); pageAlbum(c,x,y,s,Math.min(1.06,zoom(T,t4p+k*.1,.4))); }
      if(T>=t4p) ecrire(c,'4 pages',XR_AL,200,72*zoom(T,t4p,.4),CRAIE.jaune);
      if(T>=tDm2c) ecrire(c,'de 1 dm²',XR_AL,300,64*zoom(T,tDm2c,.4),CRAIE.blanc);
      if(T>=tCombien) ecrire(c,'?',XR_AL,470,200*zoom(T,tCombien,.6),CRAIE.jaune);
      tab.maj(); return; }
    pageAlbum(c,X_AL,Y_AL,S10,zoom(T,tPage,.4));
    if(T<finR){ /* l'accroche et la sœur */
      mesures(c,T);
      if(T>=tDm2) ecrire(c,'1 dm²',XR_AL,190,84*zoom(T,tDm2,.4),CRAIE.jaune);
      if(T>=tPetits){ carreauCraie(c,XR_AL-130,300,PAS_AL,zoom(T,tPetits,.4)); }
      if(T>=tCm2) ecrire(c,'1 cm²',XR_AL+40,326,64*zoom(T,tCm2,.4),CRAIE.r0);
      if(T>=soe){
        /* « 1 dm = 10 cm » sur une ligne : chaque morceau calé à gauche, à la suite du précédent */
        c.font='800 58px "Segoe UI"'; const x0=XR_AL-14-c.measureText('1 dm = 10 cm').width/2, w1=c.measureText('1 dm ').width;
        if(T>=tDm) ecrire(c,'1 dm',x0,450,58*zoom(T,tDm,.12),CRAIE.blanc,'left');
        if(T>=tCm) ecrire(c,'= 10 cm',x0+w1,450,58*zoom(T,tCm,.12),CRAIE.blanc,'left');
        if(T>=t10) rangee(c,0,T,t10);
      }
      tab.maj(); return; }
    /* la réponse : les 10 rangées se remplissent, 10 × 10 = 100 ; 1 dm² = 100 cm² */
    mesures(c,T);
    rangee(c,0,T,null);
    for(let j=1;j<10;j++) rangee(c,j,T,tIl+.15+(j-1)*.11,.02);
    if(T>=tRang) ecrire(c,'10 rangées',XR_AL,180,66*zoom(T,tRang,.4),CRAIE.jaune);
    if(T>=t10b) ecrire(c,'10 × 10',XR_AL,290,70*zoom(T,t10b,.4),CRAIE.blanc);
    if(T>=t100) ecrire(c,'= 100',XR_AL,380,80*zoom(T,t100,.4),CRAIE.ok);
    if(T>=tDm2b) ecrire(c,'1 dm²',XR_AL,500,64*zoom(T,tDm2b,.4),CRAIE.jaune);
    if(T>=tCm2b) ecrire(c,'= 100 cm²',XR_AL,585,64*zoom(T,tCm2b,.4),CRAIE.ok);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-soeur'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  qd('Question !');
  const phraseQ=[qd("Combien d'autocollants"),qd('pour remplir la page ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('10 autocollants,'), r2=rd("ce n'est qu'une rangée.");
  const r3=rd('Il y a 10 rangées :'), r4=rd('10 × 10 = 100 autocollants.'), r5=rd('1 décimètre carré,'), r6=rd("c'est 100 centimètres carrés.");
  r4[3][1]=tFois; /* le signe « × » paraît quand la voix dit « fois » */

  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0("Mon album d'autocollants !")),
    ...suiteDe(soe,60,62,[a0('Une page carrée'),a0('de 10 centimètres de côté :')],[a0('1 décimètre carré.')],
      [a0('Mes autocollants sont'),a0('des petits carrés'),a0('de 1 centimètre carré.')]),
    ...suiteDe(q,60,62,[a1('Ma sœur dit :'),a1('1 décimètre,'),a1("c'est 10 centimètres.")],[a1('Donc 10 autocollants'),a1('par page. Facile !')]),
    ...suiteDe(ouf,60,62,[r3],[r4],[r5,r6]),
    ...suiteDe(com,60,62,[a3('100 autocollants par page…')],[a3('Il me faut'),a3('un plus gros paquet !')]),
    ...suiteDe(f,60,60,[a4('À toi : un album'),a4('de 4 pages'),a4('de 1 décimètre carré.')],
      [a4("Combien d'autocollants"),a4('de 1 centimètre carré'),a4('pour tout remplir ?')],[a4('Réponds en commentaire !')])
  ];

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="30" y="30" width="190" height="190" fill="${PAPIER_AL}" stroke="#f8f9fa" stroke-width="4"/>`+
    [...Array(10)].map((_,i)=>`<rect x="${31+i*19}" y="31" width="17" height="17" rx="3" fill="#74c0fc" stroke="#1864ab" stroke-width="2"/>`).join('')+
    `<text x="276" y="170" font-family="Segoe UI" font-weight="800" font-size="130" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'1 dm² :<br>combien de cm² ?'+PARI,mini);
  return { clips,FIN,titre:'1 dm² = ? cm²',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,soe,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['10',tq('A'),tq('10')],['1&nbsp;000',tq('B'),tq('000')],['100',tq('C'),tq('100')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<soe) g.montre();
      else if(T<q){ T<tFacile?g.reflechit():g.oups(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tC?g.ouvre():g.pouce(); }
      else if(T<ouf){ T<t100?g.montre():g.fier(); }
      else if(T<com){ T<tPaquet?g.ouvre():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
