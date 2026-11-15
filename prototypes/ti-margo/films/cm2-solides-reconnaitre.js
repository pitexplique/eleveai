/* Série Solides CM2, ÉPISODE 01 : LE SOLIDE CACHÉ (ceinture blanche). Outils : cm2-commun.js et
   films/cm2-solides.js (cylindre, cone, ellipseBase, rond).
   Devinette du frère : un solide caché qui roule et a 2 disques. « Facile : une boule ! »
   Non : une boule n'a aucun disque plat. Question : un cylindre (A), comme une boîte de petits pois.
   Commentaire : 1 disque, je roule, une pointe : qui suis-je ? (le cône, jamais dessiné).
   L'ardoise fait 1056 × 720 : le dessin à gauche, le texte à droite (Ti Margo cache le bas du milieu). */

/* Le drap qui cache le solide (bosse arrondie), avec son « ? » ; s = échelle */
function rcDrap(c,x,y,s=1,coul='#9775fa'){ c.save(); c.translate(x,y); c.scale(s,s);
  c.fillStyle=coul; c.strokeStyle='#e5dbff'; c.lineWidth=6; c.lineJoin='round';
  c.beginPath(); c.moveTo(-170,110); c.bezierCurveTo(-150,40,-140,-130,0,-140); c.bezierCurveTo(140,-130,150,40,170,110);
  c.quadraticCurveTo(120,90,80,118); c.quadraticCurveTo(40,92,0,118); c.quadraticCurveTo(-40,92,-80,118); c.quadraticCurveTo(-120,90,-170,110); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle='rgba(229,219,255,.45)'; c.lineWidth=4; for(const dx of [-70,60]){ c.beginPath(); c.moveTo(dx,-90); c.quadraticCurveTo(dx+20,0,dx-10,95); c.stroke(); }
  c.restore(); ecrire(c,'?',x,y-10*s,150*s,CRAIE.jaune); }
/* La boule : un disque ombré, sans aucun bord plat */
function rcBoule(c,x,y,r,coul='#ff922b'){ const g=c.createRadialGradient(x-r*.35,y-r*.4,r*.1,x,y,r);
  g.addColorStop(0,'#fff4e6'); g.addColorStop(.35,coul); g.addColorStop(1,'#a33d00'); c.fillStyle=g; c.beginPath(); c.arc(x,y,r,0,7); c.fill();
  c.strokeStyle='#f8f9fa'; c.lineWidth=5; c.beginPath(); c.arc(x,y,r,0,7); c.stroke(); }
/* Un disque plat, vu de biais */
function rcDisque(c,x,y,rx,coul=CRAIE.jaune){ c.fillStyle=coul; c.strokeStyle='#f8f9fa'; c.lineWidth=5; c.beginPath(); c.ellipse(x,y,rx,rx*.36,0,0,7); c.fill(); c.stroke(); }
/* Une flèche courbe qui fait le tour (« il roule »), tracée de u = 0 à 1 */
function rcRoule(c,x,y,r,u,coul=CRAIE.blanc){ if(u<=0) return; u=Math.min(1,u); const a0=Math.PI*.15, a1=a0+Math.PI*1.45*u;
  c.strokeStyle=coul; c.fillStyle=coul; c.lineWidth=8; c.lineCap='round'; c.beginPath(); c.arc(x,y,r,a0,a1); c.stroke();
  const px=x+r*Math.cos(a1), py=y+r*Math.sin(a1), t=a1+Math.PI/2;
  c.beginPath(); c.moveTo(px+20*Math.cos(t),py+20*Math.sin(t)); c.lineTo(px+16*Math.cos(t-2.3),py+16*Math.sin(t-2.3)); c.lineTo(px+16*Math.cos(t+2.3),py+16*Math.sin(t+2.3)); c.closePath(); c.fill(); }
/* Un texte qui s'écrit au fil de la voix : étapes [[instant, texte], …], calé à gauche sur sa forme finale centrée en x */
function rcProg(c,etapes,T,x,y,taille,coul){ let s=''; for(const [t,e] of etapes) if(T>=t) s=e; if(!s) return;
  c.font=`800 ${taille}px "Segoe UI"`; const w=c.measureText(etapes[etapes.length-1][1]).width; ecrire(c,s,x-w/2,y,taille,coul,'left'); }
/* La boîte de conserve : le cylindre debout, l'étiquette verte, les petits pois */
function rcConserve(c,x,y,r,h,{etiquette=0,pois=0}={}){
  cylindre(c,x,y,r,h,'#adb5bd',{haut:'#dee2e6'});
  if(etiquette>0){ const ry=r*.32, h1=y-h*.78, h2=y-h*.2; c.save(); c.globalAlpha=Math.min(1,etiquette);
    c.fillStyle='#2f9e44'; c.beginPath(); c.moveTo(x-r,h2); c.lineTo(x-r,h1); c.ellipse(x,h1,r,ry,0,Math.PI,0,true); c.lineTo(x+r,h2); c.ellipse(x,h2,r,ry,0,0,Math.PI); c.fill();
    for(let k=0;k<5;k++){ const px=x-r*.6+k*r*.3, py=(h1+h2)/2+(k%2?14:-14); rond(c,px,py,r*.11,'#8ce99a'); }
    c.restore(); }
  if(pois>0) for(let k=0;k<9;k++){ if(pois<(k+1)/9) break; const a=k*2.4, d=(k%3)*.3+.15; rond(c,x+Math.cos(a)*r*d*.95,y-h+Math.sin(a)*r*.32*d*.9,r*.13,'#51cf66'); } }
/* Le goûter : un biscuit rond */
function rcBiscuit(c,x,y,r){ c.fillStyle='#d9a066'; c.strokeStyle='#7c4a12'; c.lineWidth=5; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); c.stroke();
  for(const [dx,dy] of [[-.4,-.3],[.3,-.4],[.1,.2],[-.3,.4],[.45,.3]]) rond(c,x+dx*r,y+dy*r,r*.1,'#5c3a1a'); }
function rcCroix(c,x,y,s,u=1){ if(u<=0) return; c.strokeStyle=CRAIE.faux; c.lineWidth=14; c.lineCap='round'; const d=s*Math.min(1,u);
  c.beginPath(); c.moveTo(x-d,y-d); c.lineTo(x+d,y+d); c.moveTo(x+d,y-d); c.lineTo(x-d,y+d); c.stroke(); }

FILMS['reconnaitre']=function(outils){
  const DUR={'00-accroche':9.84,'01-indice':4.33,'02-question':11.87,'02b-reponse':9.24,'03-ouf':4.52,'04-commentaire':8.21,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ind,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  const W=tab.W, XD=290, XT=800;

  const tIl=mot('00-accroche','Il'), tCache=mot('00-accroche','caché'), tRoule=mot('00-accroche','roule'), t2=mot('00-accroche','2'),
    tFacile=mot('00-accroche','Facile'), tBoule=mot('00-accroche','boule');
  const tSecoue=mot('01-indice','secoue'), tBoule1=mot('01-indice','boule'), tAucun=mot('01-indice','aucun'), tDisque1=mot('01-indice','disque'), tPlat=mot('01-indice','plat');
  const rEt=mot('02b-reponse','et'), r2=mot('02b-reponse','2'), r2b=mot('02b-reponse','2',2), rPlats=mot('02b-reponse','plats'), rFace=mot('02b-reponse','face'),
    rFace2=mot('02b-reponse','face',2), rCyl=mot('02b-reponse','cylindre'), rBoite=mot('02b-reponse','boîte'), rConserve=mot('02b-reponse','conserve');
  const tPois=mot('03-ouf','petits'), tPois2=mot('03-ouf','pois'), tRate=mot('03-ouf','Raté'), tGouter=mot('03-ouf','goûter');
  const c1=mot('04-commentaire','1'), c1d=mot('04-commentaire','1',2), cRoule=mot('04-commentaire','roule'), cUne=mot('04-commentaire','une'), cPointe=mot('04-commentaire','pointe'),
    cQui=mot('04-commentaire','Qui'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tIl-.08, finR=rEt-.08;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : trois indices, et le drap ; le cône n'est jamais montré */
      rcDrap(c,XD,400,1.15,'#f06595');
      if(T>=c1){ rcProg(c,[[c1,'1'],[c1d,'1 disque']],T,XT,130,62,CRAIE.jaune); rcDisque(c,XT,215,70*Math.min(1,zoom(T,c1d,.4))); }
      if(T>=cRoule){ rcRoule(c,XT-150,360,40,(T-cRoule)/.6); ecrire(c,'je roule',XT+40,360,58*zoom(T,cRoule,.4),CRAIE.blanc); }
      if(T>=cUne) rcProg(c,[[cUne,'une'],[cPointe,'une pointe']],T,XT,490,58,'#ff8787');
      if(T>=cQui) ecrire(c,'?',XT,630,130*zoom(T,cQui,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T<ind){ /* le solide caché sous le drap ; il roule, il a 2 disques ; « une boule ! » */
      if(T>=tCache) rcDrap(c,XD,400,1.15*Math.min(1,zoom(T,tCache,.5)));
      if(T>=tRoule){ rcRoule(c,XT-150,120,40,(T-tRoule)/.6); ecrire(c,'il roule',XT+40,120,58*zoom(T,tRoule,.4),CRAIE.blanc); }
      if(T>=t2){ rcProg(c,[[t2,'2'],[t2+.18,'2 disques']],T,XT,240,58,CRAIE.jaune);
        rcDisque(c,XT-90,340,62*Math.min(1,zoom(T,t2,.4))); rcDisque(c,XT+90,340,62*Math.min(1,zoom(T,t2+.18,.4))); }
      if(T>=tBoule){ rcBoule(c,XT-150,520,66*Math.min(1,zoom(T,tBoule,.5))); ecrire(c,'boule !',XT+75,520,58*zoom(T,tBoule,.4),CRAIE.blanc); }
      tab.maj(); return; }
    if(T<q){ /* la boule n'a aucun disque plat */
      rcBoule(c,XD,380,150);
      if(T>=tBoule1) cercle(c,XD,380,175,CRAIE.jaune,(T-tBoule1)/.4);
      if(T>=tAucun) rcProg(c,[[tAucun,'aucun'],[tDisque1,'aucun disque'],[tPlat,'aucun disque plat']],T,XT,150,50,CRAIE.faux);
      if(T>=tDisque1){ rcDisque(c,XT,330,90); rcCroix(c,XT,330,70,(T-tPlat)/.3); }
      tab.maj(); return; }
    if(T<ouf){ /* la réponse : il roule, 2 disques plats face à face, un cylindre, une boîte de conserve */
      const X=XD, Y=560, R=130, H=330, ry=R*.32;
      cylindre(c,X,Y,R,H,'#4dabf7',{haut:T>=r2?CRAIE.jaune:'#a5d8ff'});
      /* le disque du dessous : jaune lui aussi, son bord de derrière reste en pointillés */
      if(T>=r2b){ c.fillStyle=CRAIE.jaune; c.globalAlpha=.9; c.beginPath(); c.ellipse(X,Y,R,ry,0,0,7); c.fill(); c.globalAlpha=1; ellipseBase(c,X,Y,R,ry,'#f8f9fa');
        c.strokeStyle=CRAIE.jaune; c.lineWidth=8; c.beginPath(); c.ellipse(X,Y,R,ry,0,0,Math.PI); c.stroke(); }
      if(T>=r2) rcProg(c,[[r2,'2'],[r2b,'2 disques'],[rPlats,'2 disques plats']],T,XT,120,54,CRAIE.jaune);
      if(T>=rFace){ /* les deux disques se font face : une flèche de l'un à l'autre */
        const u=entre(T,rFace,rFace2+.3); c.strokeStyle=CRAIE.jaune; c.fillStyle=CRAIE.jaune; c.lineWidth=6; c.setLineDash([14,10]);
        const xa=X+R+50; c.beginPath(); c.moveTo(xa,Y-H); c.lineTo(xa,Y-H+H*u); c.stroke(); c.setLineDash([]);
        for(const [yy,s] of [[Y-H,-1],[Y-H+H*u,1]]){ c.beginPath(); c.moveTo(xa,yy+s*4); c.lineTo(xa-14,yy-s*18); c.lineTo(xa+14,yy-s*18); c.closePath(); c.fill(); }
        rcProg(c,[[rFace,'face'],[rFace+.38,'face à'],[rFace2,'face à face']],T,XT,230,54,CRAIE.blanc); }
      if(T>=rCyl) ecrire(c,'un cylindre',XT,380,70*zoom(T,rCyl,.4),'#4dabf7');
      if(T>=rConserve){ const u=entre(T,rConserve,rConserve+.4); c.save(); c.globalAlpha=u;
        cylindre(c,XT,650,52,120,'#adb5bd',{haut:'#dee2e6'}); c.fillStyle='#2f9e44'; c.fillRect(XT-52,560,104,60); c.restore(); }
      tab.maj(); return; }
    /* ouf : une boîte de petits pois ; raté pour le goûter */
    rcConserve(c,XD,600,140,380,{etiquette:entre(T,tPois,tPois+.4),pois:entre(T,tPois2,tPois2+.8)});
    if(T>=tPois) rcProg(c,[[tPois,'petits'],[tPois2,'petits pois']],T,XT,130,60,'#8ce99a');
    if(T>=tRate){ rcBiscuit(c,XT,340,90); rcCroix(c,XT,340,100,(T-tRate)/.3); }
    if(T>=tGouter) ecrire(c,'goûter',XT,500,58*zoom(T,tGouter,.4),CRAIE.blanc);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-indice'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,352,62,a0('Devinette avec mon frère !')),
    ...suiteDe(ind,60,62,[a0('Il a caché un solide.')],[a0('Il roule,'),a0('et il a 2 disques.')],[a0('Facile : une boule !')]),
    ...suiteDe(q,60,62,[a1('Mon frère secoue la tête :')],[a1('une boule n’a aucun'),a1('disque plat…')])
  ];
  qd('Question !');
  const phraseQ=[qd('C’est quel solide ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const rr1=rd('Il roule,');
  const rr2=rd('et il a 2 disques plats'), rr3=rd('face à face :'), rr4=rd('c’est un cylindre.'), rr5=rd('Comme une boîte'), rr6=rd('de conserve !');
  const tA=mot('02b-reponse','A');
  groupes.push(...suiteDe(ouf,60,62,[rr2,rr3],[rr4],[rr5,rr6]),
    ...suiteDe(com,60,62,[a3('Une boîte de petits pois…')],[a3('Raté pour le goûter !')]),
    ...suiteDe(f,60,60,[a4('À toi : j’ai 1 disque,'),a4('je roule,'),a4('et j’ai une pointe.')],[a4('Qui suis-je ?'),a4('Réponds en commentaire !')]));

  const mini=`<svg width="290" height="220" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    <path d="M40 205 C50 170 55 70 120 66 C185 70 190 170 200 205 Q175 195 160 208 Q140 195 120 208 Q100 195 80 208 Q60 195 40 205 Z" fill="#9775fa" stroke="#e5dbff" stroke-width="5"/>
    <text x="120" y="172" font-family="Segoe UI" font-weight="800" font-size="90" fill="#ffd43b" text-anchor="middle">?</text>
    <ellipse cx="265" cy="90" rx="40" ry="15" fill="#ffd43b" stroke="#f8f9fa" stroke-width="4"/><ellipse cx="265" cy="160" rx="40" ry="15" fill="#ffd43b" stroke="#f8f9fa" stroke-width="4"/></svg>`;
  poserMiniature(outils,acc+1,'2 disques :<br>une boule ?'+PARI,mini);
  return { clips,FIN,titre:'Le solide caché',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,ind,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['un cylindre',tq('A'),tq('cylindre')],['une boule',tq('B'),tq('boule')],['un cône',tq('C'),tq('cône')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[rr1],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<ind){ T<tFacile?g.montre():g.fier(); }
      else if(T<q){ if(T<tAucun){ g.oups(); scene.ry=-.12+.3*lisse((T-ind)/.35); } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tA?g.ouvre():g.pouce(); }
      else if(T<ouf){ T<rCyl?g.montre():g.fier(); }
      else if(T<com){ T<tRate?g.montre():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
