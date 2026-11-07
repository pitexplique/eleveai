/* Série Nombres décimaux 6e, épisode 05 : LE PARI DE LA LOUPE.
   « Aucun nombre entre 4,7 et 4,8 » ? La loupe montre 4,71, 4,72… puis 4,751, 4,752… : il y en a toujours.
   Chargé après films/decimaux.js : voixDe, enchainer, suiteDe, poserTableau, ecrire, pop, poserClasse, gestes…
   (droiteCraie et la loupe sont ici : decimaux-arrondir.js n'est pas chargé avec ce film). */

/* Deux morceaux dits, reliés par un mot que la voix a fondu dans un nombre (« 7 et ») */
function joindre(p1,mot,t,p2){ return [p1[0],p2[1],p1[2]+' '+mot+' '+p2[2],[...p1[3],t,...p2[3]]]; }
function droiteLoupe(c,x0,x1,y,n,grad,coul=CRAIE.blanc){
  c.strokeStyle=coul; c.lineCap='round'; c.lineWidth=8; c.beginPath(); c.moveTo(x0-34,y); c.lineTo(x1+34,y); c.stroke();
  for(let i=0;i<=n;i++){ if(i>0&&i<n&&i>grad) continue; const x=x0+(x1-x0)*i/n, h=(i===0||i===n)?34:20; c.lineWidth=(i===0||i===n)?8:5;
    c.beginPath(); c.moveTo(x,y-h); c.lineTo(x,y+h); c.stroke(); }
  return u=>x0+(x1-x0)*u;
}
function loupeCraie(c,x,y,r,a=1){ c.globalAlpha=a; c.fillStyle='rgba(116,192,252,.16)'; c.beginPath(); c.arc(x,y,r,0,7); c.fill();
  c.strokeStyle='#e9ecef'; c.lineWidth=14; c.beginPath(); c.arc(x,y,r,0,7); c.stroke();
  c.strokeStyle='#c08a3e'; c.lineWidth=26; c.lineCap='round'; c.beginPath(); c.moveTo(x+r*.72,y+r*.72); c.lineTo(x+r*1.45,y+r*1.45); c.stroke(); c.globalAlpha=1; }

FILMS['encadrer']=function(outils){
  const {$,panneau}=outils;
  const DUR={'00-accroche':9.98,'01-loupe':12.16,'02-question':17.89,'02b-reponse':5.5,'03-encore':10.78,'04-commentaire':10.21,'05-abonne':6.04};
  const clips=enchainer(.4,['00-accroche','01-loupe','02-question','02b-reponse','03-encore','04-commentaire','05-abonne'],DUR,{'02-question':3.3,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,lo,q,r,enc,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  /* Les instants */
  const tIls=mot('00-accroche','Ils'), tColles=mot('00-accroche','collés'), tParie=mot('00-accroche','paries'), tEt0=mot('00-accroche','et');
  const tLoupe=mot('01-loupe','loupe'), tOh=mot('01-loupe','Oh'), tDix=mot('01-loupe','Dix'), tApp=mot('01-loupe','apparaissent'),
        t71=mot('01-loupe','4'), t72=mot('01-loupe','4',3), t73=mot('01-loupe','4',5);
  const tEnc=mot('03-encore','encore'), t751=mot('03-encore','4'), t752=mot('03-encore','4',3), tJamais=mot('03-encore','jamais'), tPerdu=mot('03-encore','perdu');
  const tEntre4=mot('04-commentaire','entre'), tEt4=mot('04-commentaire','et'), tComb=mot('04-commentaire','combien'), tRep=mot('04-commentaire','Réponds');

  function dessiner(T){ const c=tab.c; tab.effacer(); const W=tab.W;
    const z=t0=>Math.max(1,pop(T,t0)), lis=(t0,d=.5)=>Math.min(1,Math.max(0,(T-t0)/d));
    if(T>=com){ /* le défi : combien de 4,□□ entre 4,7 et 4,8 ? */
      if(T>=tEntre4){ ecrire(c,'4,7',200,170,96*z(tEntre4),CRAIE.u); ecrire(c,'4,8',856,170,96*z(tEt4+.3),CRAIE.u); }
      if(T>=tComb){ const zz=z(tComb); ecrire(c,'4,',W/2-130,180,120*zz,CRAIE.blanc);
        c.strokeStyle=CRAIE.d; c.lineWidth=7; c.setLineDash([18,12]); for(const k of [0,1]) c.strokeRect(W/2-70+k*120,105,100,150); c.setLineDash([]); }
      if(T>=tComb) ecrire(c,'Combien ?',W/2,470,110*z(tComb+1.2),CRAIE.d);
      if(T>=tRep) ecrire(c,'= ?',W/2,620,96*z(tRep),CRAIE.ok);
      tab.maj(); return; }
    if(T>=enc){ /* on zoome encore : 4,751, 4,752… */
      const y=400, X=droiteLoupe(c,130,926,y,10,T>=tEnc?Math.floor(9*lis(tEnc,.8)):0);
      ecrire(c,'4,75',X(0),y+90,56,CRAIE.u); ecrire(c,'4,76',X(1),y+90,56,CRAIE.u);
      if(T>=t751) ecrire(c,'4,751',X(.1)+20,y-84,58*z(t751),CRAIE.c);
      if(T>=t752) ecrire(c,'4,752',X(.2)+60,y+165,58*z(t752),CRAIE.c);
      if(T>=tJamais){ ecrire(c,'...',X(.68),y-90,80*z(tJamais),CRAIE.d); loupeCraie(c,X(.66),y,100+30*lis(tJamais,.6)); }
      else loupeCraie(c,X(.62),y,100,lis(enc,.4));
      tab.maj(); return; }
    if(T>=lo){ /* la loupe : dix petites marches entre 4,7 et 4,8 */
      const y=400, X=droiteLoupe(c,130,926,y,10,T>=tDix?Math.floor(9*lis(tDix,1.0)):0);
      ecrire(c,'4,7',X(0),y+90,60,CRAIE.u); ecrire(c,'4,8',X(1),y+90,60,CRAIE.u);
      if(T>=t71) ecrire(c,'4,71',X(.1),y-82,58*z(t71),CRAIE.c);
      if(T>=t72) ecrire(c,'4,72',X(.2)+30,y+92,58*z(t72),CRAIE.c);
      if(T>=t73) ecrire(c,'4,73',X(.3),y-82,58*z(t73),CRAIE.c);
      if(T>=tLoupe){ const u=lis(tLoupe,.8), xL=X(.85)-(X(.85)-X(.5))*u; if(T<tDix) loupeCraie(c,xL,y,120); }
      if(T>=tOh&&T<tDix) ecrire(c,'Oh !',W/2,140,90*z(tOh),CRAIE.d);
      tab.maj(); return; }
    /* l'accroche : 4,7 et 4,8, « collés » */
    if(T>=tIls){ const y=400, X=droiteLoupe(c,130,926,y,10,0);
      ecrire(c,'4,7',X(0),y+90,76,CRAIE.u); ecrire(c,'4,8',X(1),y+90,76,CRAIE.u);
      if(T>=tColles){ c.strokeStyle=CRAIE.faux; c.lineWidth=9; c.setLineDash([16,12]); c.beginPath(); c.moveTo(X(0)+20,y-60); c.quadraticCurveTo(W/2,y-180,X(1)-20,y-60); c.stroke(); c.setLineDash([]); }
      if(T>=tParie) ecrire(c,'?',W/2,y-200,120*z(tParie),CRAIE.d); }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-loupe'), a3=dit('03-encore'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const s1=a0('Salut !'), s2=a0('Je parie qu’il n’y a'), s3a=a0('aucun nombre entre 4,7'), s3=joindre(s3a,'et',tEt0,a0('4,8.'));
  const salut=[s1,s2,s3];
  const d1=joindre(a4('À toi : entre 4,7'),'et',tEt4,a4('4,8 :'));
  const groupes=[
    groupe(acc+.1,tIls-.08,352,58,...salut),
    ...suiteDe(lo,60,62,[a0('Ils sont collés !')],[a0('Tu paries ?')]),
    ...suiteDe(q,60,60,[a1('Ma loupe zoome'),a1('sur la droite...')],[a1('Oh !')],[a1('Dix petites marches'),a1('apparaissent :')],[a1('4,71 – 4,72 – 4,73...')]),
    ...suiteDe(com,60,60,[a3('Je zoome encore :'),a3('4,751 – 4,752...')],[a3('Ça ne s’arrête jamais !')],[a3('J’ai perdu mon pari.')]),
    ...suiteDe(f,50,42,[d1,a4('combien y a-t-il de nombres'),a4('avec deux chiffres'),a4('après la virgule ?'),a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const tQEt=mot('02-question','et');
  const phraseQ=[qd('Lequel est entre'),joindre(qd('4,7'),'et',tQEt,qd('4,8 ?'))];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('4,75 :'), r2=rd('pile au milieu.');

  poserMiniature(outils,acc+1,'Aucun nombre<br>entre 4,7 et 4,8'+PARI,
    `<svg width="290" height="138" viewBox="0 0 440 210"><rect x="6" y="6" width="428" height="198" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/><line x1="60" y1="90" x2="380" y2="90" stroke="#f8f9fa" stroke-width="8" stroke-linecap="round"/><line x1="80" y1="70" x2="80" y2="110" stroke="#f8f9fa" stroke-width="8"/><line x1="360" y1="70" x2="360" y2="110" stroke="#f8f9fa" stroke-width="8"/><text x="80" y="170" font-family="Segoe UI" font-weight="800" font-size="56" fill="#74c0fc" text-anchor="middle">4,7</text><text x="360" y="170" font-family="Segoe UI" font-weight="800" font-size="56" fill="#74c0fc" text-anchor="middle">4,8</text><text x="220" y="160" font-family="Segoe UI" font-weight="800" font-size="80" fill="#ffd43b" text-anchor="middle">?</text></svg>`);
  return { clips,FIN,titre:'Le pari de la loupe',ceinture:0,finTitre:tIls-.08,groupes,finClip:'05-abonne',
    cuts:[tIls-.08,lo,q,r,enc,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:enc,cpt:fin('02-question')+.1,bonne:1,tBon:.62,
      phrase:phraseQ,pause:pauseQ,
      choix:[['4,65',tq('A'),tq('4',5)],['4,75',tq('B'),tq('4',7)],['4,85',tq('C'),tq('4',9)]],
      tete:[[r+.1,'Réponse '],[r+.62,'B !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<enc, dansF=T>=f, gros=T<tIls-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gros) g.fier();
      else if(T<lo){ T<tParie?g.montre():g.fier(); }
      else if(T<q){ if(T>=tOh&&T<tDix) g.oups(); else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<enc){ T<r+.62?g.ouvre():g.pouce(); }
      else if(T<com){ if(T>=tPerdu){ g.oups(); scene.ry=-.12+.3*lisse((T-tPerdu)/.35); } else if(T>=tJamais-.3) g.ouvre(); else g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
