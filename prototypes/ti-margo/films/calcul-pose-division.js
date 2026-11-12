/* ============================================================
   ÉPISODE 04 : LE RESTE TROP GRAND. Ti Margo distribue 50 cartes à 6 joueurs : 6 × 7 = 42, chacun en a 7,
   il en reste 8. Il vérifie : avec 8 cartes, il peut encore en donner 1 à chacun des 6 joueurs. Le reste doit
   être plus petit que le diviseur : 6 × 8 = 48, 50 − 48 = 2, chacun a 8 cartes et il en reste 2.
   Outils : films/calcul-pose.js (ecrire, gestes, cadrer, fusionnerNombres…).
   ============================================================ */

/* Une carte à jouer à la craie (dos bleu), penchée de a radians */
function carteJeu(c,x,y,z=1,a=0,coul='#4dabf7'){ if(z<=0) return; c.save(); c.translate(x,y); c.rotate(a); c.scale(z,z);
  c.fillStyle='#f8f9fa'; c.strokeStyle='#495057'; c.lineWidth=4; c.beginPath(); c.roundRect(-34,-48,68,96,10); c.fill(); c.stroke();
  c.fillStyle=coul; c.beginPath(); c.roundRect(-26,-40,52,80,7); c.fill();
  c.strokeStyle='#f8f9fa'; c.lineWidth=3; c.beginPath(); c.moveTo(-26,-40); c.lineTo(26,40); c.moveTo(26,-40); c.lineTo(-26,40); c.stroke(); c.restore(); }
/* Un éventail de cartes (le paquet de 50) */
function eventail(c,x,y,z=1){ if(z<=0) return; for(let k=-4;k<=4;k++) carteJeu(c,x+k*20*z,y+Math.abs(k)*5*z,z,k*.16); }

/* La potence : dividende à gauche (chiffre des unités en xd), diviseur à droite, quotient dessous,
   puis la soustraction et le reste sous le dividende. Chaque élément : {txt, z, coul}. */
function potence(c,o){
  const {xd,y0,w=82,ft=110,dvd,dvr,q,sous,reste,lignes=1,cadreReste=null}=o;
  const X=k=>xd-k*w, xb=xd+w*.75, hq=ft*1.25;
  const vu=e=>e&&(e.z??1)>0, Z=e=>e.z??1;
  const chiffres=(e,y)=>{ if(!vu(e)) return; const s=String(e.txt); for(let j=0;j<s.length;j++) ecrire(c,s[j],X(s.length-1-j),y,ft*Z(e),e.coul||CRAIE.blanc); };
  if(lignes>0){ c.strokeStyle=CRAIE.blanc; c.lineWidth=9; c.lineCap='round'; c.beginPath();
    c.moveTo(xb,y0-ft*.6); c.lineTo(xb,y0-ft*.6+(ft*3.3)*Math.min(1,lignes)); c.moveTo(xb,y0+ft*.55); c.lineTo(xb+(w*2.6)*Math.min(1,lignes),y0+ft*.55); c.stroke(); }
  chiffres(dvd,y0);
  if(vu(dvr)) ecrire(c,String(dvr.txt),xb+w*.95,y0,ft*Z(dvr),dvr.coul||CRAIE.r0);
  if(vu(q)) ecrire(c,String(q.txt),xb+w*.95,y0+hq,ft*Z(q),q.coul||CRAIE.ok);
  if(vu(sous)){ chiffres(sous,y0+hq); ecrire(c,'−',X(String(sous.txt).length-1)-w*.85,y0+hq,ft*.8*Z(sous),CRAIE.gris);
    c.strokeStyle=CRAIE.gris; c.lineWidth=7; c.beginPath(); c.moveTo(X(1)-w*.6,y0+hq+ft*.62); c.lineTo(X(0)+w*.5,y0+hq+ft*.62); c.stroke(); }
  chiffres(reste,y0+hq*2.1);
  if(cadreReste){ c.strokeStyle=cadreReste; c.lineWidth=8; c.beginPath(); c.roundRect(X(0)-w*.62,y0+hq*2.1-ft*.62,w*1.24,ft*1.24,20); c.stroke(); }
  return {X,xb,yQ:y0+hq,yR:y0+hq*2.1};
}

FILMS.division=function(outils){
  fusionnerNombres();
  const DUR={'00-accroche':12.91,'01-verif':11.46,'02-question':15.46,'02b-reponse':11.18,'03-ouf':6.47,'04-commentaire':9.56,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ver,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  const W=tab.W;

  /* Les instants */
  const t50=mot('00-accroche','50'), t6=mot('00-accroche','6'), t7=mot('00-accroche','7'), t42=mot('00-accroche','42'),
        t8=mot('00-accroche','8'), tParie=mot('00-accroche','paries'), tFois=mot('00-accroche','fois');
  const tV=mot('01-verif','vérifie'), tV8=mot('01-verif','8'), tV8b=mot('01-verif','8',3), tV1=mot('01-verif','1'),
        tV6=mot('01-verif','6'), tPb=mot('01-verif','problème');
  const tO2=mot('03-ouf','2'), tO6=mot('03-ouf','6'), tOuf=mot('03-ouf','Ouf');
  const t45=mot('04-commentaire','45'), t7c=mot('04-commentaire','7'), tCb=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');
  const tFinT=t50-.08;

  const XD=640, Y0=150; /* la potence à droite de l'ardoise ; l'éventail de cartes à gauche */

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 45 ÷ 7, la réponse reste à l'élève */
      const p=potence(c,{xd:W/2-40,y0:200,dvd:{txt:'45',z:T>=t45?zoom(T,t45):0},dvr:{txt:'7',z:T>=t7c?zoom(T,t7c):0},lignes:T>=t7c?1:0});
      if(T>=tCb){ ecrire(c,'?',p.xb+82*.95,p.yQ,120*zoom(T,tCb,.6),CRAIE.jaune); ecrire(c,'?',p.X(0),p.yR,120*zoom(T,tCb,.6),CRAIE.jaune); }
      tab.maj(); return; }
    if(T>=ouf){ /* la bonne division : 8 au quotient, 50 − 48 = 2, et 2 est plus petit que 6 */
      potence(c,{xd:XD,y0:Y0,dvd:{txt:'50'},dvr:{txt:'6'},q:{txt:'8'},sous:{txt:'48',z:1},reste:{txt:'2',z:1,coul:CRAIE.ok},
        cadreReste:T>=tO2?CRAIE.ok:null});
      if(T>=tO2) ecrire(c,'2',150,330,110*zoom(T,tO2,.4),CRAIE.ok);
      if(T>=tO6) ecrire(c,'< 6',300,330,110*zoom(T,tO6,.4),CRAIE.ok);
      if(T>=tOuf) coche(c,170,500,.8);
      tab.maj(); return; }
    if(T>=ver){ /* la vérification : 8 cartes en trop ; 1 de plus pour chacun des 6 joueurs */
      const z8=T>=tV8?zoom(T,tV8,.4):0;
      for(let k=0;k<8;k++){ const dans=T>=tV1&&k<6; carteJeu(c,W/2-350+k*100,170-(dans?28:0),z8,0,dans?'#ffd43b':'#4dabf7'); }
      if(T>=tV8) ecrire(c,'Il reste 8 cartes',W/2,300,64*zoom(T,tV8,.4),CRAIE.blanc);
      if(T>=tV1) ecrire(c,'+ 1 pour chacun des 6',W/2,400,64*zoom(T,tV1,.4),CRAIE.jaune);
      if(T>=tPb){ ecrire(c,'8',W/2-130,540,120*zoom(T,tPb,.4),CRAIE.faux); ecrire(c,'> 6 !',W/2+70,540,110*zoom(T,tPb,.4),CRAIE.faux); }
      tab.maj(); return; }
    /* l'accroche : l'éventail de 50 cartes, la division posée avec l'erreur (7 au quotient, reste 8) */
    eventail(c,215,230,zoom(T,t50,.4));
    if(T>=t50) ecrire(c,'50 cartes',215,400,66*zoom(T,t50,.4),CRAIE.jaune);
    if(T>=t6) ecrire(c,'6 joueurs',215,480,58*zoom(T,t6,.4),CRAIE.blanc);
    potence(c,{xd:XD,y0:Y0,dvd:{txt:'50',z:T>=t50?zoom(T,t50,.4):0},dvr:{txt:'6',z:T>=t6?zoom(T,t6,.4):0},lignes:T>=t6?Math.min(1,(T-t6)/.4):0,
      q:{txt:'7',z:T>=t7?zoom(T,t7,.4):0,coul:CRAIE.blanc},sous:{txt:'42',z:T>=t42?zoom(T,t42,.4):0},
      reste:{txt:'8',z:T>=t8?zoom(T,t8,.4):0,coul:CRAIE.blanc},cadreReste:T>=t8?CRAIE.jaune:null});
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-verif'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,tFinT,352,62,a0('Salut !'),a0('Je distribue')),
    ...suiteDe(ver,60,62,[a0('50 cartes à 6 joueurs.')],[a0('6 × 7 = 42.')],[a0('Chacun en a 7,'),a0('et il m’en reste 8 !')],
      [a0('Tu paries ?')]),
    ...suiteDe(q,60,62,[a1('Je vérifie.')],[a1('Il me reste 8 cartes.')],[a1('Mais avec 8 cartes,'),a1('je peux encore en donner')],
      [a1('1 à chacun des 6 joueurs !')],[a1('Il y a un problème.')]),
    ...suiteDe(com,60,62,[a3('Le reste, 2, est'),a3('plus petit que 6.')],[a3('Ouf, la partie'),a3('peut commencer !')]),
    ...suiteDe(f,60,60,[a4('À toi : 45 billes'),a4('pour 7 copains.')],[a4('Combien pour chacun,'),a4('et combien en reste-t-il ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de cartes pour chacun ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('6 × 8 = 48.'), r2=rd('50 − 48 = 2.'), r3=rd('Chacun a 8 cartes,'), r4=rd('et il en reste 2.');
  const tB=mot('02b-reponse','B');

  poserMiniature(outils,acc+1,'50 cartes<br>pour 6 joueurs'+PARI,ardoiseMini([['50 ÷ 6'],['= 7','#ff8787'],['reste 8 ?','#ff8787']],330,270));
  return { clips,FIN,titre:'Le reste trop grand',ceinture:1,finTitre:tFinT,groupes,finClip:'05-abonne',
    cuts:[tFinT,ver,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['7, il en reste 8',tq('A'),tq('8')],['8, il en reste 2',tq('B'),tq('2')],['9, il en reste 0',tq('C'),tq('0')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tFinT;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<ver){ if(T<tFois) g.montre(); else if(T<t8) g.reflechit(); else if(T<tParie) g.fier(); else g.pouce(); }
      else if(T<q){ if(T>=tPb){ g.oups(); scene.ry=-.12+.3*lisse((T-tPb)/.35); } else if(T>=tV) g.montre(); else g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.pouce(); }
      else if(T<com){ T>=tOuf?g.fier():g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
