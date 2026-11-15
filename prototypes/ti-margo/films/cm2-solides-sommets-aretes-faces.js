/* Série Solides CM2, ÉPISODE 02 : LA PYRAMIDE EN PAILLES (ceinture blanche, règle des shorts CM2). Outils : cm2-commun.js et
   films/cm2-solides.js (pyramide3, dessinerPoly, cav).
   Ti Margo construit une pyramide à base carrée : des pailles, une boule de pâte par sommet. 4 boules, c'est bon ?
   Il monte les pailles… la pointe tombe dans le vide. Question : 4 sommets en bas + 1 pointe = 5 boules (C).
   Commentaire : combien de pailles (d'arêtes) ? Le compte n'est jamais montré.
   L'ardoise fait 1056 × 720 : la pyramide à gauche, le texte à droite (Ti Margo cache le bas du milieu). */

const SAF_E=320, SAF_CX=270, SAF_CY=380, SAF_XT=800, SAF_PATE='#ffd43b', SAF_PAILLE='#ff922b';
/* Un texte qui s'écrit au fil de la voix : étapes [[instant, texte], …], calé à gauche sur sa forme finale centrée en x */
function safProg(c,etapes,T,x,y,taille,coul){ let s=''; for(const [t,e] of etapes) if(T>=t) s=e; if(!s) return;
  c.font=`800 ${taille}px "Segoe UI"`; const w=c.measureText(etapes[etapes.length-1][1]).width; ecrire(c,s,x-w/2,y,taille,coul,'left'); }
/* Une boule de pâte à modeler (z = grossissement) */
function safBoule(c,x,y,z=1,coul=SAF_PATE){ if(z<=0) return; const r=24*z; rond(c,x,y,r,coul); c.strokeStyle='#7c4a12'; c.lineWidth=4; c.beginPath(); c.arc(x,y,r,0,7); c.stroke();
  rond(c,x-r*.35,y-r*.35,r*.28,'rgba(255,255,255,.6)'); }
function safPaille(c,a,b,coul=SAF_PAILLE,lw=10){ c.strokeStyle=coul; c.lineWidth=lw; c.lineCap='round'; c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke(); }

FILMS['sommets-aretes-faces']=function(outils){
  const DUR={'00-accroche':10.19,'01-pointe':3.65,'02-question':13.05,'02b-reponse':7.53,'03-ouf':3.58,'04-commentaire':7.03,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,poi,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tBase=mot('00-accroche','Base'), tCarree=mot('00-accroche','carrée'), tBoule=mot('00-accroche','boule'), tSommet=mot('00-accroche','sommet'),
    t4=mot('00-accroche','4'), t4b=mot('00-accroche','4',2), tBon=mot('00-accroche','bon');
  const tMonte=mot('01-pointe','monte'), tPailles=mot('01-pointe','pailles'), tPointe=mot('01-pointe','pointe'), tTombe=mot('01-pointe','tombe'), tVide=mot('01-pointe','vide');
  const rC=mot('02b-reponse','C'), r4=mot('02b-reponse','4'), r4b=mot('02b-reponse','4',2), rBas=mot('02b-reponse','bas'), rPlus=mot('02b-reponse','plus'),
    r1=mot('02b-reponse','1'), r1b=mot('02b-reponse','1',2), rPointe=mot('02b-reponse','pointe'), r5=mot('02b-reponse','5'), r5b=mot('02b-reponse','5',2),
    rDonc=mot('02b-reponse','donc'), r5c=mot('02b-reponse','5',3), r5d=mot('02b-reponse','5',4);
  const tPlus=mot('03-ouf','plus'), tDebout=mot('03-ouf','debout');
  const cPailles=mot('04-commentaire','pailles'), cBase=mot('04-commentaire','base'), cCarree=mot('04-commentaire','carrée'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tBase-.08, finR=r4-.08;

  const PY=pyramide3(4,1,1.15), O=centrer(PY,SAF_E,SAF_CX,SAF_CY);
  const pr=PY.S.map(p=>cav(p,O.e,O.ox,O.oy));  /* 0-3 la base (3 = le coin du fond, caché), 4 la pointe */
  /* La pyramide en pailles : faces à peine teintées, pailles orange, celles de derrière en pointillés */
  const pyr=(c,opts={})=>dessinerPoly(c,PY,{...O,coul:'#74c0fc',alpha:.22,trait:SAF_PAILLE,lw:9,...opts});
  /* La base seule, posée à plat (on la voit d'en haut : 4 pailles pleines) */
  function base(c,z=1){ c.save(); c.translate(SAF_CX,pr[0][1]); c.scale(z,z); c.translate(-SAF_CX,-pr[0][1]);
    for(let k=0;k<4;k++) safPaille(c,pr[k],pr[(k+1)%4]); c.restore(); }
  /* les boules du bas : la k-ième paraît à ts[k] */
  const boulesBas=(c,T,ts)=>{ for(let k=0;k<4;k++) if(T>=ts[k]) safBoule(c,...pr[k],Math.min(1.3,zoom(T,ts[k],.6))); };

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : combien de pailles ? (on ne les compte pas) */
      pyr(c); for(let k=0;k<5;k++) safBoule(c,...pr[k],.8);
      if(T>=cPailles) ecrire(c,'? pailles',SAF_XT,200,80*zoom(T,cPailles,.5),CRAIE.jaune);
      if(T>=cBase) safProg(c,[[cBase,'base'],[cCarree,'base carrée']],T,SAF_XT,360,56,CRAIE.blanc);
      if(T>=tRep) ecrire(c,'?',SAF_XT,520,130*zoom(T,tRep,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T<poi){ /* la base carrée, une boule par sommet : 4 boules */
      if(T>=tBase) base(c,Math.min(1,zoom(T,tBase,.4)));
      if(T>=tBase) safProg(c,[[tBase,'base'],[tCarree,'base carrée']],T,SAF_XT,110,58,CRAIE.blanc);
      if(T>=tBoule) safProg(c,[[tBoule,'une boule']],T,SAF_XT,240,52,SAF_PATE);
      if(T>=tSommet) safProg(c,[[tSommet,'par sommet']],T,SAF_XT,305,52,SAF_PATE);
      boulesBas(c,T,[t4,t4+.12,t4+.24,t4b]);
      if(T>=t4) safProg(c,[[t4,'4'],[t4b,'4 boules']],T,SAF_XT,440,72,CRAIE.blanc);
      tab.maj(); return; }
    if(T<q){ /* il monte les 4 pailles… la pointe n'a pas de boule : tout tombe */
      const u=lisse01(entre(T,tMonte,tPailles+.5)), v=lisse01(entre(T,tTombe,tTombe+.6)), m=[.5,0,.5];
      PY.S.slice(0,4).forEach((p,k)=>{ const out=sub(p,m), haut=[p[0]+(PY.S[4][0]-p[0])*.97*u,p[1]+(PY.S[4][1]-p[1])*.97*u,p[2]+(PY.S[4][2]-p[2])*.97*u],
          bas=[p[0]+out[0]*1.15,0,p[2]+out[2]*1.15], e=[haut[0]+(bas[0]-haut[0])*v,haut[1]+(bas[1]-haut[1])*v,haut[2]+(bas[2]-haut[2])*v];
        if(u>0) safPaille(c,pr[k],cav(e,O.e,O.ox,O.oy)); });
      base(c); boulesBas(c,T,[0,0,0,0]);
      if(T>=tPointe){ c.save(); c.setLineDash([14,10]); cercle(c,...pr[4],48,CRAIE.faux,(T-tPointe)/.3); c.restore();
        ecrire(c,'?',pr[4][0],pr[4][1]+4,70*zoom(T,tPointe,.5),CRAIE.faux);
        safProg(c,[[tPointe,'la pointe']],T,SAF_XT,170,60,CRAIE.faux); }
      if(T>=tVide) safProg(c,[[tVide,'dans le vide !']],T,SAF_XT,280,54,CRAIE.faux);
      tab.maj(); return; }
    if(T<ouf){ /* la réponse : 4 sommets en bas, plus 1 pour la pointe, 5 sommets, 5 boules */
      pyr(c); boulesBas(c,T,[r4,r4+.11,r4+.22,r4b]);
      for(let k=0;k<4;k++) if(T>=r4+.11*Math.min(k,3)) ecrire(c,String(k+1),pr[k][0]+(k===1||k===2?42:-42),pr[k][1]+(k<2?40:-36),44,CRAIE.jaune);
      if(T>=r1){ safBoule(c,...pr[4],Math.min(1.3,zoom(T,r1,.6))); ecrire(c,'5',pr[4][0]+48,pr[4][1]-30,44,CRAIE.ok); }
      if(T>=r4) safProg(c,[[r4,'4'],[r4b,'4 sommets']],T,SAF_XT,110,58,CRAIE.blanc);
      if(T>=rBas) safProg(c,[[rBas,'en bas']],T,SAF_XT,175,48,CRAIE.blanc);
      if(T>=rPlus) safProg(c,[[rPlus,'+'],[r1,'+ 1'],[rPointe,'+ 1 pointe']],T,SAF_XT,280,58,CRAIE.ok);
      if(T>=r5) safProg(c,[[r5,'5'],[r5b,'5 sommets']],T,SAF_XT,400,64,CRAIE.jaune);
      if(T>=rDonc){ safProg(c,[[r5c,'5'],[r5d,'5 boules']],T,SAF_XT,520,64,SAF_PATE); }
      tab.maj(); return; }
    /* ouf : 5 boules, la pyramide tient debout */
    pyr(c); for(let k=0;k<4;k++) safBoule(c,...pr[k]);
    safBoule(c,...pr[4],Math.min(1.3,zoom(T,tPlus,.6)));
    if(T>=tPlus) safProg(c,[[tPlus,'+ 1 boule']],T,SAF_XT,200,62,SAF_PATE);
    if(T>=tDebout) coche(c,SAF_XT-60,420,.8);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-pointe'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('Je construis une pyramide'),a0('avec des pailles et'),a0('de la pâte à modeler.')),
    ...suiteDe(poi,60,62,[a0('Base carrée.')],[a0('Une boule de pâte'),a0('par sommet :')],[a0('4 boules, c’est bon !')]),
    ...suiteDe(q,60,62,[a1('Je monte les pailles…')],[a1('et la pointe tombe'),a1('dans le vide !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de boules de pâte'),qd('fallait-il ?')];
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const rr1=rd('4 sommets en bas,'), rr2=rd('plus 1 pour la pointe :'), rr3=rd('5 sommets, donc 5 boules.');
  groupes.push(...suiteDe(ouf,60,62,[rr1,rr2],[rr3]),
    ...suiteDe(com,60,62,[a3('Une boule de plus,')],[a3('et ma pyramide'),a3('tient debout !')]),
    ...suiteDe(f,60,60,[a4('À toi : combien de pailles'),a4('faut-il pour cette pyramide'),a4('à base carrée ?')],[a4('Réponds en commentaire !')]));

  /* Les choix s'écrivent au fil de la voix : « 4 », puis « 4 boules » */
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  const ETAPES=[['4',[[tq('4'),'4'],[tq('4',2),'4 boules']]],['8',[[tq('8'),'8'],[tq('8',2),'8 boules']]],['5',[[tq('5'),'5'],[tq('5',2),'5 boules']]]];
  const choix=[['4 boules',tq('A'),tq('4')],['8 boules',tq('B'),tq('8')],['5 boules',tq('C'),tq('5')]];
  function majChoix(T){ ETAPES.forEach(([,et],i)=>{ let s=et[et.length-1][1]; if(T<r) for(const [t,e] of et) if(T-q>=t) s=e; choix[i][0]=s; }); }

  const mini=`<svg width="290" height="220" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    <polygon points="45,200 175,200 225,150 95,150" fill="none" stroke="#ff922b" stroke-width="8" stroke-linejoin="round"/>
    ${[[45,200],[175,200],[225,150],[95,150]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="15" fill="#ffd43b" stroke="#7c4a12" stroke-width="3"/>`).join('')}
    <text x="135" y="120" font-family="Segoe UI" font-weight="800" font-size="90" fill="#ff8787" text-anchor="middle">?</text>
    <text x="275" y="95" font-family="Segoe UI" font-weight="800" font-size="60" fill="#ffd43b" text-anchor="middle">4 ?</text></svg>`;
  poserMiniature(outils,acc+1,'4 boules<br>ou 5 ?'+PARI,mini);
  return { clips,FIN,titre:'La pyramide en pailles',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,poi,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:2,tBon:rC-r,
      phrase:phraseQ,pause:pauseQ,choix,
      tete:[[r+.1,'Réponse '],[rC,'C !']],reponse:[],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); majChoix(T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<poi){ T<t4?g.montre():g.fier(); }
      else if(T<q){ if(T>=tTombe-.1){ g.oups(); scene.ry=-.12+.3*lisse((T-tTombe+.1)/.35); } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<rC?g.ouvre():g.pouce(); }
      else if(T<ouf){ T<r5?g.montre():g.fier(); }
      else if(T<com){ T<tDebout?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
