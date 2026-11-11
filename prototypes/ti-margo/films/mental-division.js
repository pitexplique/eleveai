/* Série CALCUL MENTAL 6e : épisode 04, LA DIVISION (short Ti Margo en dessin animé).
   Les outils (voixDe, enchainer, suiteDe, poserTableau, ecrire, ligneMots, barrer, coche, gestes…) viennent de films/mental.js.
   ⛔ Division : le signe « ÷ », jamais 36/4. */

/* ---- Dessins à la craie propres à l'épisode ---- */
/* Un biscuit rond, doré, avec ses pépites de chocolat */
function biscuitCraie(c,x,y,r=18){ c.fillStyle='#e0a96d'; c.strokeStyle='#a0622d'; c.lineWidth=Math.max(2,r*.16);
  c.beginPath(); c.arc(x,y,r,0,7); c.fill(); c.stroke(); c.fillStyle='#5c3317';
  for(const [dx,dy] of [[-.4,-.3],[.35,-.35],[0,.1],[-.3,.45],[.4,.35]]){ c.beginPath(); c.arc(x+dx*r,y+dy*r,r*.13,0,7); c.fill(); } }
/* Un copain : buste de couleur, tête, yeux, bouche (sourire ou bouche ronde) */
function copainCraie(c,x,y,s=1,coul='#74c0fc',content=true){
  c.fillStyle=coul; c.beginPath(); c.arc(x,y+78*s,52*s,Math.PI,0); c.fill();
  c.fillStyle='#f1c27d'; c.beginPath(); c.arc(x,y,36*s,0,7); c.fill();
  c.fillStyle='#212529'; for(const dx of [-12,12]){ c.beginPath(); c.arc(x+dx*s,y-6*s,4.5*s,0,7); c.fill(); }
  c.strokeStyle='#212529'; c.lineWidth=4*s; c.lineCap='round'; c.beginPath();
  if(content) c.arc(x,y+6*s,14*s,.2*Math.PI,.8*Math.PI); else c.arc(x,y+16*s,7*s,0,7); c.stroke(); }
/* Une assiette ; n biscuits en grille dessus (n ≤ 9), ou un nombre écrit si l'assiette déborde */
function assietteCraie(c,x,y,s=1,n=0,txt=''){
  c.fillStyle='#f8f9fa'; c.strokeStyle='#adb5bd'; c.lineWidth=4*s; c.beginPath(); c.ellipse(x,y,70*s,24*s,0,0,7); c.fill(); c.stroke();
  if(n){ const col=3, rg=Math.ceil(n/col); for(let k=0;k<n;k++){ const i=k%col, j=Math.floor(k/col);
    biscuitCraie(c,x+(i-1)*30*s,y-10*s-(rg-1-j)*24*s,12*s); } }
  if(txt){ for(let k=0;k<7;k++) biscuitCraie(c,x+(k%4-1.5)*26*s,y-14*s-Math.floor(k/4)*22*s,12*s);
    ecrire(c,txt,x,y-78*s,58*s,CRAIE.faux); } }
/* Une paire de cerises */
function ceriseCraie(c,x,y,s=1){ c.strokeStyle='#40c057'; c.lineWidth=6*s; c.lineCap='round';
  c.beginPath(); c.moveTo(x-22*s,y); c.quadraticCurveTo(x-10*s,y-50*s,x+6*s,y-70*s); c.moveTo(x+24*s,y); c.quadraticCurveTo(x+16*s,y-40*s,x+6*s,y-70*s); c.stroke();
  c.fillStyle='#e03131'; for(const dx of [-22,24]){ c.beginPath(); c.arc(x+dx*s,y+8*s,22*s,0,7); c.fill(); }
  c.fillStyle='#ffc9c9'; for(const dx of [-28,18]){ c.beginPath(); c.arc(x+dx*s,y+2*s,6*s,0,7); c.fill(); } }
const COPAINS=['#74c0fc','#ffd43b','#faa2c1','#8ce99a','#b197fc','#ffa94d'];

/* ============================================================
   ÉPISODE 04 : LES BISCUITS. 36 biscuits pour 4 copains : Ti Margo « enlève 4 » → 32 chacun ! Non : 4 × 9 = 36, donc 9.
   ============================================================ */
FILMS['division']=function(outils){
  const {panneau}=outils;
  const DUR={'00-accroche':12.62,'01-copains':11.86,'02-question':10.29,'02b-reponse':10.03,'03-ouf':3.26,'04-commentaire':8.56,'05-abonne':6.05};
  const clips=enchainer(.4,['00-accroche','01-copains','02-question','02b-reponse','03-ouf','04-commentaire','05-abonne'],DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,cop,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  /* Les instants (« 4 copains » a deux instants : le 3e « 4 » est celui de « divisé par 4 ») */
  const tJe=mot('00-accroche','Je'), tPartage=mot('00-accroche','partage'), t36=mot('00-accroche','36'), tCopains=mot('00-accroche','copains'),
        tDiv=mot('00-accroche','Divisé'), t4par=mot('00-accroche','4',3), tEnl=mot('00-accroche','j\'enlève'), t4enl=mot('00-accroche','4',4),
        t32=mot('00-accroche','32'), tChacun=mot('00-accroche','chacun');
  const tPour=mot('01-copains','pour'), tFaudrait=mot('01-copains','faudrait'), t128=mot('01-copains','128'), tRecite=mot('01-copains','récite'),
        t4fois=mot('01-copains','fois'), t9=mot('01-copains','9'), t36c=mot('01-copains','36');
  const tOuf=mot('03-ouf','Ouf'), tJaloux=mot('03-ouf','jaloux');
  const tC42=mot('04-commentaire','42'), tC6=mot('04-commentaire','6'), tCombien=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');

  function dessiner(T){ const c=tab.c; tab.effacer(); const W=tab.W;
    if(T>=com){ /* le défi : 42 cerises pour 6 copains */
      if(T>=tC42){ for(let k=0;k<6;k++) ceriseCraie(c,110+(k%3)*95,150+Math.floor(k/3)*120,.85); }
      ligneMots(c,[['42 ÷',tC42,CRAIE.blanc],['6',tC6,CRAIE.d],['= ?',tCombien,CRAIE.ok]],W/2+170,230,120,T);
      if(T>=tC6) for(let k=0;k<6;k++) copainCraie(c,150+k*152,520,.95,COPAINS[k]);
      tab.maj(); return; }
    if(T>=ouf){ /* 9 biscuits chacun : personne n'est jaloux */
      ecrire(c,'36 ÷ 4 = 9',W/2,105,110*Math.max(1,pop(T,tOuf)),CRAIE.ok);
      for(let k=0;k<4;k++){ const x=170+k*240; copainCraie(c,x,330,1,COPAINS[k],true); assietteCraie(c,x,580,1.1,9); }
      if(T>=tJaloux) coche(c,W-150,95,.7);
      tab.maj(); return; }
    if(T>=cop){ /* 32 chacun ? Il faudrait 128 biscuits ! La table de 4 : 4 × 9 = 36 */
      ecrire(c,'32 chacun ?',W/2,70,76,CRAIE.faux);
      if(T>=tRecite) barrer(c,W/2-230,30,W/2+230,110);
      if(T>=tPour) for(let k=0;k<4;k++){ const x=170+k*240; copainCraie(c,x,165,.7,COPAINS[k],false); assietteCraie(c,x,350,.85,0,'32'); }
      if(T>=t128) ecrire(c,'4 × 32 = 128 !',W/2,460,92*Math.max(1,pop(T,t128)),CRAIE.faux);
      ligneMots(c,[['4 ×',t4fois,CRAIE.blanc],['9',t9,CRAIE.d],['= 36',t36c,CRAIE.ok]],W/2,620,96,T);
      tab.maj(); return; }
    const doux=t=>1+(Math.max(1,pop(T,t))-1)*.35; /* petit rebond : reste dans le tableau */
    /* l'accroche : 36 biscuits, 4 copains, « divisé par 4… j'enlève 4 » : 32 chacun ! */
    if(T>=t36){ for(let k=0;k<36;k++) biscuitCraie(c,60+(k%9)*46,60+Math.floor(k/9)*44,18);
      ecrire(c,'36 biscuits',W-270,120,80*doux(t36),CRAIE.blanc); }
    if(T>=tCopains){ for(let k=0;k<4;k++) copainCraie(c,90+k*110,290,.8,COPAINS[k]);
      ecrire(c,'4 copains',W-270,320,80*doux(tCopains),CRAIE.d); }
    ligneMots(c,[['36 ÷',tDiv,CRAIE.blanc],['4',t4par,CRAIE.d]],W/2,480,96,T);
    ligneMots(c,[['36 − 4',t4enl,CRAIE.faux],['= 32 !',t32,CRAIE.faux]],W/2,625,104,T);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-copains'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const salut=[a0('Salut !')];
  const groupes=[
    groupe(acc+.1,tJe-.08,352,62,...salut),
    ...suiteDe(cop,60,60,[a0('Je partage 36 biscuits'),a0('entre 4 copains.')],[a0('Divisé par 4…')],[a0('j’enlève 4 :'),a0('32 biscuits chacun !')],[a0.jusque('Tu')('Tu paries ?')]),
    ...suiteDe(q,60,60,[a1('32 biscuits chacun,'),a1('pour 4 copains ?')],[a1('Il faudrait'),a1('128 biscuits !')],[a1('Je récite la table de 4 :'),a1('4 fois 9, ça fait 36.')]),
    ...suiteDe(com,60,62,[a3('Ouf !'),a3('Personne n’est jaloux.')]),
    ...suiteDe(f,60,58,[a4('À toi : 42 cerises'),a4('pour 6 copains.')],[a4('Combien de cerises'),a4('pour chacun ?'),a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de biscuits pour chacun ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('4 fois 9, ça fait 36.'), r2=rd('Donc 36 divisé par 4, ça fait 9 biscuits chacun.');

  poserMiniature(outils,acc+1,'36 ÷ 4<br>= 32 ?'+PARI,
    `<svg width="330" height="210" viewBox="0 0 330 210"><rect x="6" y="6" width="318" height="198" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/><text x="165" y="92" font-family="Segoe UI" font-weight="800" font-size="62" fill="#f8f9fa" text-anchor="middle">36 ÷ 4</text><text x="165" y="170" font-family="Segoe UI" font-weight="800" font-size="62" fill="#ff8787" text-anchor="middle">= 32 ?</text></svg>`);
  return { clips,FIN,titre:'Les biscuits de Ti Margo',ceinture:1,finTitre:tJe-.08,groupes,finClip:'05-abonne',
    cuts:[tJe-.08,cop,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:.62,
      phrase:phraseQ,pause:pauseQ,
      choix:[['32',tq('A'),tq('32')],['9',tq('B'),tq('9')],['8',tq('C'),tq('8')]],
      tete:[[r+.1,'Réponse '],[r+.62,'B !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tJe-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.2) g.salut(T-acc,1.2);
      else if(gros) g.ouvre();
      else if(T<cop){ if(T<tDiv) g.montre(); else if(T<t32) g.reflechit(); else g.fier(); }
      else if(T<q){ if(T<tFaudrait) { g.oups(); scene.ry=-.12+.3*lisse((T-cop)/.35); } else if(T<tRecite) g.oups(); else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<r+.62?g.ouvre():g.pouce(); }
      else if(T<com){ T>=tOuf+.3?g.fier():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
