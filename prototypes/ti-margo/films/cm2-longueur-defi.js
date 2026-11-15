/* ============================================================
   Série Longueurs CM2 — ÉPISODE 04 : COMBIEN DE BALLONS ? Outils : films/cm2-commun.js + cm2-longueur.js.
   Je décore la clôture du jardin (10 m) : un ballon tous les 2 m, du début jusqu'au bout. « 10 ÷ 2 : 5 ballons ! »
   J'accroche… et le dernier poteau reste tout nu. 10 ÷ 2 = 5 espaces ; un ballon au début et un au bout : 6 ballons (A).
   Commentaire : 1 km, un drapeau tous les 250 m, du départ à l'arrivée. Combien de drapeaux ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 ; la clôture en haut, à l'échelle (1 m = 85 px : 10 m = 850 px), un poteau tous les 2 m ;
   le calcul en bas à gauche (Ti Margo ne cache que le tout bas, à gauche du milieu) */

/* Les marques des cues, MOT PAR MOT : un nombre suivi de son unité (« 10 mètres », « 250 mètres ») a une marque par mot dit,
   toutes au même texte. On n'en garde qu'une par mot ÉCRIT : le nombre à la fin de son dernier mot, l'unité à la sienne.
   Renvoie de quoi remettre les marques d'origine (la bouche de Ti Margo, dans le socle, bouge sur tous les mots dits). */
function lgMotParMot(){ const CL=(window.CUES||{})[VIDEO]||{}, ORIG={};
  for(const k in CL){ ORIG[k]=CL[k]; const l=CL[k], res=[];
    for(let i=0;i<l.length;){ let j=i; while(j+1<l.length&&l[j+1][1]===l[i][1]) j++;
      const W=l[i][1].trim().split(/\s+/);
      if(W.length===1) res.push([l[j][0],W[0]]);
      else { res.push([l[Math.max(i,j-1)][0],W[0]]); res.push([l[j][0],W.slice(1).join(' ')]); }
      i=j+1; }
    CL[k]=res; }
  return ()=>{ for(const k in ORIG) CL[k]=ORIG[k]; }; }
/* Un texte qui s'écrit au fil de la voix : étapes [[instant, texte], …] ; calé à gauche (ou centré sur sa forme finale) */
function lgProg(c,etapes,T,x,y,taille,coul,align='left'){ let s=''; for(const [t,e] of etapes) if(T>=t) s=e; if(!s) return;
  if(align==='center'){ c.font=`800 ${taille}px "Segoe UI"`; const W=c.measureText(etapes[etapes.length-1][1]).width; ecrire(c,s,x-W/2,y,taille,coul,'left'); }
  else ecrire(c,s,x,y,taille,coul,'left'); }

FILMS['defi']=function(outils){
  const remettre=lgMotParMot();
  const DUR={'00-accroche':10.62,'01-poteau':3.64,'02-question':12.59,'02b-reponse':8.6,'03-ouf':3.75,'04-commentaire':10.62,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,pot,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tUn=mot('00-accroche','Un'), tBallon=mot('00-accroche','ballon'), t2=mot('00-accroche','2'), tM2=mot('00-accroche','mètres',2),
        tDebut=mot('00-accroche','début'), tBout=mot('00-accroche','bout'),
        t10b=mot('00-accroche','10',2), tDiv=mot('00-accroche','divisé'), t2b=mot('00-accroche','2',2), t5=mot('00-accroche','5'),
        tBallons=mot('00-accroche','ballons');
  const tAccroche=mot('01-poteau',"J'accroche"), tDernier=mot('01-poteau','dernier'), tPoteau=mot('01-poteau','poteau'), tNu=mot('01-poteau','nu');
  const tA=mot('02b-reponse','A');
  const t6e=mot('03-ouf','6e'), tGonfle=mot('03-ouf','gonflé');
  const t1=mot('04-commentaire','1'), tKm=mot('04-commentaire','kilomètre'), tDrapeau=mot('04-commentaire','drapeau'),
        t250=mot('04-commentaire','250'), tM250=mot('04-commentaire','mètres'), tDepart=mot('04-commentaire','départ'),
        tArrivee=mot('04-commentaire',"l'arrivée"), tCombien=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tUn-.08;

  /* La clôture, à l'échelle : 85 px par mètre, de FX0 (0 m) à FX0 + 850 (10 m) ; un poteau tous les 2 m */
  const FX0=100, PM=85, FX=m=>FX0+m*PM, YP=250, YB=380, YBAL=165, YCAL=600;
  const BALC=['#ff6b6b','#4dabf7','#ffd43b','#69db7c','#da77f2','#ff922b'];
  const deroule=(T,t,d=.8)=>T<t?0:Math.min(1,(T-t)/d);
  function cloture(c){ c.lineJoin='round'; c.strokeStyle='#f8f9fa'; c.lineWidth=3; c.fillStyle='#c08550';
    for(const y of [YP+35,YP+100]){ c.fillRect(FX(0),y-7,FX(10)-FX(0),14); c.strokeRect(FX(0),y-7,FX(10)-FX(0),14); }
    for(let k=0;k<=5;k++){ const x=FX(2*k); c.beginPath(); c.moveTo(x-11,YB); c.lineTo(x-11,YP+8); c.lineTo(x,YP-6); c.lineTo(x+11,YP+8); c.lineTo(x+11,YB); c.closePath(); c.fill(); c.stroke(); } }
  /* un ballon accroché au poteau k (0 → 5), qui grossit quand z va de 0 à 1 */
  function ballon(c,k,z=1){ if(z<=0) return; const s=Math.min(1.15,z), x=FX(2*k), y=YBAL;
    c.strokeStyle='#f8f9fa'; c.lineWidth=3; c.beginPath(); c.moveTo(x,y+34*s); c.quadraticCurveTo(x+10,y+60,x,YP-6); c.stroke();
    c.fillStyle=BALC[k%6]; c.beginPath(); c.ellipse(x,y,26*s,34*s,0,0,7); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(x,y+34*s); c.lineTo(x-6,y+42*s); c.lineTo(x+6,y+42*s); c.closePath(); c.fill();
    c.fillStyle='rgba(255,255,255,.6)'; c.beginPath(); c.ellipse(x-9*s,y-12*s,6*s,10*s,-.4,0,7); c.fill(); }
  /* une flèche de cote horizontale (x1 → x2) à la hauteur y, tracée de u = 0 à 1 */
  function cote(c,x1,x2,y,u,coul=CRAIE.jaune){ flecheLongueur(c,x1,x2,y,coul,u,5); }
  function drapeauD(c,x,y,coul){ c.strokeStyle='#f8f9fa'; c.lineWidth=5; c.beginPath(); c.moveTo(x,y); c.lineTo(x,y-110); c.stroke();
    c.fillStyle=coul; c.beginPath(); c.moveTo(x,y-110); c.lineTo(x+58,y-92); c.lineTo(x,y-74); c.closePath(); c.fill(); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 1 km, un drapeau tous les 250 m, du départ à l'arrivée */
      const RY=330, R0=100, R1=950;
      if(T>=t1){ const u=deroule(T,t1,.8); c.strokeStyle=CRAIE.blanc; c.lineWidth=8; c.setLineDash([22,16]); c.beginPath(); c.moveTo(R0,RY); c.lineTo(R0+(R1-R0)*u,RY); c.stroke(); c.setLineDash([]);
        cote(c,R0,R1,RY-140,u,CRAIE.jaune); }
      lgProg(c,[[t1,'1'],[tKm,'1 km']],T,(R0+R1)/2,RY-195,72,CRAIE.jaune,'center');
      if(T>=tDrapeau){ const z=zoom(T,tDrapeau,.4); c.save(); c.translate(R0,RY); c.scale(z,z); drapeauD(c,0,0,'#ffd43b'); c.restore(); }
      if(T>=t250) cote(c,R0,R0+(R1-R0)/4,RY+60,deroule(T,t250,.4),CRAIE.blanc);
      lgProg(c,[[t250,'250'],[tM250,'250 m']],T,R0+(R1-R0)/8,RY+110,50,CRAIE.blanc,'center');
      if(T>=tDepart) ecrire(c,'départ',R0+40,RY+200,46*zoom(T,tDepart,.25),CRAIE.gris);
      if(T>=tArrivee) ecrire(c,'arrivée',R1-50,RY+200,46*zoom(T,tArrivee,.25),CRAIE.gris);
      if(T>=tCombien) ecrire(c,'?',640,RY+170,150*zoom(T,tCombien,.6),CRAIE.jaune);
      tab.maj(); return; }
    const rep=T>=ouf;
    cloture(c);
    cote(c,FX(0),FX(10),95,1,rep?CRAIE.ok:CRAIE.jaune); ecrire(c,'10 m',(FX(0)+FX(10))/2,50,56,rep?CRAIE.ok:CRAIE.jaune);
    if(T<pot){ /* l'accroche : un ballon tous les 2 m, du début jusqu'au bout ; « 10 ÷ 2 = 5 ballons ! » */
      if(T>=tBallon) ballon(c,0,zoom(T,tBallon,.5));
      if(T>=t2) cote(c,FX(0),FX(2),YB+30,deroule(T,t2,.4));
      lgProg(c,[[t2,'2'],[tM2,'2 m']],T,FX(1),YB+72,46,CRAIE.jaune,'center');
      if(T>=tDebut){ const u=deroule(T,tDebut,tBout+.3-tDebut), xb=FX(0)+(FX(10)-FX(0))*u;
        c.strokeStyle=CRAIE.gris; c.lineWidth=5; c.setLineDash([14,12]); c.beginPath(); c.moveTo(FX(0),505); c.lineTo(xb,505); c.stroke(); c.setLineDash([]);
        c.lineCap='round'; c.beginPath(); c.moveTo(xb-18,491); c.lineTo(xb,505); c.lineTo(xb-18,519); c.stroke(); }
      lgProg(c,[[t10b,'10'],[tDiv,'10 ÷'],[t2b,'10 ÷ 2'],[t5,'10 ÷ 2 = 5'],[tBallons,'10 ÷ 2 = 5 ballons !']],T,FX0,YCAL,58,CRAIE.jaune);
    } else if(!rep){ /* j'accroche les 5 ballons… le dernier poteau reste tout nu */
      for(let k=0;k<5;k++) ballon(c,k,zoom(T,tAccroche+k*.2,.5));
      cote(c,FX(0),FX(2),YB+30,1); ecrire(c,'2 m',FX(1),YB+72,46,CRAIE.jaune);
      ecrire(c,'10 ÷ 2 = 5 ballons',FX0,YCAL,58,CRAIE.faux,'left');
      if(T>=tDernier) cercle(c,FX(10),YP+40,78,CRAIE.faux,deroule(T,tDernier,.4));
      if(T>=tNu) ecrire(c,'tout nu !',FX(8)+20,YB+80,56*zoom(T,tNu,.4),CRAIE.faux);
    } else { /* la réponse : 5 espaces de 2 m ; 6 ballons, un à chaque poteau */
      for(let k=0;k<5;k++){ ballon(c,k); ecrire(c,String(k+1),FX(2*k+1),YB+45,44,CRAIE.ok); cote(c,FX(2*k)+16,FX(2*k+2)-16,YB+12,1,CRAIE.ok); }
      if(T>=t6e) ballon(c,5,zoom(T,t6e,.5));
      ecrire(c,'10 ÷ 2 = 5 espaces',FX0,YCAL,54,CRAIE.ok,'left');
      ecrire(c,'6 ballons',680,YCAL,60,CRAIE.ok,'left'); coche(c,970,YCAL-8,.32);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-poteau'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Je décore la clôture'),a0('du jardin : 10 mètres.')),
    ...suiteDe(pot,60,60,[a0('Un ballon'),a0('tous les 2 mètres,'),a0("du début jusqu'au bout.")],[a0('10 divisé par 2 :'),a0('5 ballons !')]),
    ...suiteDe(q,60,62,[a1("J'accroche…")],[a1('et le dernier poteau'),a1('reste tout nu !')]),
    ...suiteDe(com,60,62,[a3('Le 6e ballon…')],[a3("je l'avais gonflé"),a3('pour moi !')]),
    ...suiteDe(f,60,60,[a4('À toi : 1 kilomètre,')],[a4('un drapeau'),a4('tous les 250 mètres,')],[a4('du départ'),a4("à l'arrivée.")],
      [a4('Combien de drapeaux ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de ballons'),qd('fallait-il ?')];
  const mq=(m,n=1)=>mot('02-question',m,n), tq=(m,n=1)=>mq(m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('10 divisé par 2 :'), r2=rd('5 espaces.'), r3=rd('Avec un ballon au début'), r4=rd('et un au bout : 6 ballons.');
  /* Les choix s'écrivent au fil de la voix : « 6 », puis « 6 ballons » */
  const ETAPES=[[[mq('6'),'6'],[mq('ballons',2),'6 ballons']],[[mq('5'),'5'],[mq('ballons',3),'5 ballons']],[[mq('20'),'20'],[mq('ballons',4),'20 ballons']]];
  const choix=[['6 ballons',tq('A'),tq('6')],['5 ballons',tq('B'),tq('5')],['20 ballons',tq('C'),tq('20')]];
  function majChoix(T){ ETAPES.forEach((et,i)=>{ let s=et[et.length-1][1]; if(T<r) for(const [t,e] of et) if(T>=t) s=e; choix[i][0]=s; }); }

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="30" y="170" width="250" height="9" fill="#c08550" stroke="#f8f9fa" stroke-width="2"/><rect x="30" y="198" width="250" height="9" fill="#c08550" stroke="#f8f9fa" stroke-width="2"/>`+
    [0,1,2,3,4,5].map(k=>`<rect x="${26+k*50}" y="150" width="9" height="75" fill="#c08550" stroke="#f8f9fa" stroke-width="2"/>`).join('')+
    [0,1,2,3,4].map(k=>`<line x1="${30+k*50}" y1="150" x2="${30+k*50}" y2="118" stroke="#f8f9fa" stroke-width="2"/><ellipse cx="${30+k*50}" cy="100" rx="14" ry="19" fill="${BALC[k]}" stroke="#f8f9fa" stroke-width="2"/>`).join('')+
    `<text x="280" y="125" font-family="Segoe UI" font-weight="800" font-size="90" fill="#ffd43b" text-anchor="middle">?</text>`+
    `<text x="155" y="50" font-family="Segoe UI" font-weight="800" font-size="34" fill="#ffd43b" text-anchor="middle">10 m</text></svg>`;
  poserMiniature(outils,acc+1,'10 m de clôture :<br>5 ballons ?'+PARI,mini);
  remettre();
  return { clips,FIN,titre:'Combien de ballons ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,pot,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,choix,
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); majChoix(T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<pot){ T<t10b?g.montre():(T<tBallons?g.reflechit():g.fier()); }
      else if(T<q){ T<tDernier?g.montre():g.oups(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.pouce(); }
      else if(T<com){ T<tGonfle?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
