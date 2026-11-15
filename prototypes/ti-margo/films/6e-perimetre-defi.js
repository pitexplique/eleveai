/* ============================================================
   Série Périmètre 6e — ÉPISODE 02 : LE RUBAN PILE POIL (le défi). Outils : films/6e-commun.js + 6e-perimetre.js.
   Ti Margo a 20 cm de ruban doré pour entourer une boîte cadeau, pile poil.
   Trois boîtes : A 6 × 5, B 10 × 10, C 7 × 3. Réponse C : 7 + 3 = 10, × 2 = 20 cm.
   Le piège B : 10 + 10 = 20, mais ce n'est que la moitié du tour (40 cm). Ouf : il s'est emballé dans la boîte.
   Commentaire : une AUTRE boîte rectangulaire qui marche avec 20 cm.
   ============================================================ */
/* L'ardoise (1056 × 720) à l'échelle : 36 px pour 1 cm, partout (le ruban de 20 cm = 720 px = le tour de C).
   Ti Margo cache le bas à gauche : A et C en haut à gauche, B à droite. */
const PX=36;
const rectDe=(x,y,w,h)=>[[x,y],[x+w*PX,y],[x+w*PX,y+h*PX],[x,y+h*PX]];
const BOITE_A=rectDe(170,190,6,5), BOITE_B=rectDe(640,170,10,10), BOITE_C=rectDe(170,450,7,3);
const RUBAN_Y=82, RUBAN_X0=50;
/* Après la réponse : la boîte C emballée, à gauche ; le calcul à droite */
const C_OUF=[[90,270],[405,270],[405,405],[90,405]], XR=830;
/* Le défi : une autre boîte, côtés inconnus (pas à l'échelle d'une réponse) */
const BOITE_DEFI=[[110,230],[490,230],[490,430],[110,430]];
const PAPIER={A:['#74c0fc','#1864ab'],B:['#faa2c1','#a61e4d'],C:['#8ce99a','#2b8a3e'],D:['#b197fc','#5f3dc4']};

/* Le ruban tout droit : x0 → x0 + u × 600 px (20 cm), avec ses deux bouts coupés en V */
function rubanDroit(c,x0,y,u=1){ if(u<=0) return; const L=20*PX*Math.min(1,u);
  c.strokeStyle=TOUR; c.lineWidth=18; c.lineCap='butt'; c.beginPath(); c.moveTo(x0,y); c.lineTo(x0+L,y); c.stroke();
  c.strokeStyle='#ffe066'; c.lineWidth=3; c.beginPath(); c.moveTo(x0,y-4); c.lineTo(x0+L,y-4); c.stroke(); }
/* Une boîte cadeau à la craie : le papier, et sa lettre au milieu */
function boite(c,pts,lettre,z=1,coul=PAPIER[lettre]){ if(z<=0) return; polyCraie(c,pts,z,coul[0],coul[1]);
  if(lettre!=='D'){ const cx=(pts[0][0]+pts[1][0])/2, cy=(pts[0][1]+pts[2][1])/2; ecrire(c,lettre,cx,cy,Math.min(84,(pts[2][1]-pts[0][1])*.8)*Math.min(1,z),'#17452a'); } }
/* Un nœud doré (centre x, y) */
function noeudDore(c,x,y,z=1){ if(z<=0) return; const k=Math.min(1.2,z);
  c.save(); c.translate(x,y); c.scale(k,k); c.fillStyle=TOUR; c.strokeStyle='#d9480f'; c.lineWidth=4;
  for(const s of [-1,1]){ c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(s*46,-52,s*62,-8); c.quadraticCurveTo(s*40,10,0,0); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(0,4); c.lineTo(s*26,44); c.lineTo(s*12,46); c.closePath(); c.fill(); c.stroke(); }
  c.fillStyle='#ffe066'; c.beginPath(); c.arc(0,0,12,0,7); c.fill(); c.stroke(); c.restore(); }
/* Une ligne de mots centrée en x, chaque morceau paraît à son instant (le mot dit) */
function ligneMots(c,T,morceaux,x,y,fs,coul){ c.font=`800 ${fs}px "Segoe UI"`; const esp=c.measureText(' ').width*1.25;
  const ws=morceaux.map(([s])=>c.measureText(s).width), tot=ws.reduce((a,b)=>a+b,0)+esp*(ws.length-1); let px=x-tot/2;
  morceaux.forEach(([s,t,k2],k)=>{ if(T>=t) ecrire(c,s,px,y,fs*zoom(T,t,.15),k2||coul,'left'); px+=ws[k]+esp; }); }

/* Le gag : une boîte cadeau 3D autour de Ti Margo, ruban doré et nœud sur la tête */
function poserEmballage(){ const papier=toon(0xe03131), dore=toon(0xfcc419);
  const b=new THREE.Group(); racine.add(b);
  piece(b,new THREE.BoxGeometry(1.9,1.45,1.5),papier,[0,.72,.05],CONTOUR_SOMBRE);
  piece(b,new THREE.BoxGeometry(.26,1.47,1.52),dore,[0,.72,.05],null);
  piece(b,new THREE.BoxGeometry(1.92,.26,1.52),dore,[0,.72,.05],null);
  const n=new THREE.Group(); n.position.set(0,.6,0); tete.add(n);
  for(const s of [-1,1]){ const t=piece(n,new THREE.TorusGeometry(.2,.07,10,24),dore,[s*.19,.06,0],CONTOUR_FIN); t.rotation.set(0,s*.35,s*.55); }
  piece(n,new THREE.SphereGeometry(.1,12,10),dore,[0,0,0],CONTOUR_FIN);
  b.visible=n.visible=false; return {b,n}; }

FILMS['defi']=function(outils){
  const DUR={'00-accroche':8.14,'01-boites':11.15,'02-question':9.4,'02b-reponse':12.94,'03-ouf':4.64,'04-commentaire':8.14,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot,marque}=voixDe(A);
  const [acc,bo,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55}), emb=poserEmballage();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style');
  css.textContent='.choix svg{vertical-align:middle;margin-right:18px;} #cB.pale.piege{opacity:.85;}'; document.head.append(css);

  /* « 20 centimètres » a deux marques : « vingt » puis « centimètres » */
  const t20=mot('00-accroche','20'), tCm20=mot('00-accroche','centimètres',2), tRuban=mot('00-accroche','ruban'),
        tJe=mot('00-accroche','Je'), tBoite=mot('00-accroche','boîte'), tPile=mot('00-accroche','pile');
  const tA=mot('01-boites','A'), t6=mot('01-boites','6'), tCm6=mot('01-boites','centimètres',2), t5=mot('01-boites','5'),
        tB=mot('01-boites','B'), t10=mot('01-boites','10'), tCm10=mot('01-boites','centimètres',4), t10b=marque('01-boites',12),
        tCc=mot('01-boites','C'), t7=mot('01-boites','7'), tCm7=mot('01-boites','centimètres',6), t3=mot('01-boites','3');
  const tNoeud=mot('03-ouf','nœud'), tSauf=mot('03-ouf','sauf'), tEmb=mot('03-ouf','emballé');
  const c20=mot('04-commentaire','20'), cCm=mot('04-commentaire','centimètres',2), cRuban=mot('04-commentaire','ruban'),
        cAutre=mot('04-commentaire','AUTRE'), cRect=mot('04-commentaire','rectangulaire'), cMarche=mot('04-commentaire','marche'),
        cRep=mot('04-commentaire','Réponds');
  /* Les marques de la réponse (02b) : 2 « 7 », 3 « plus », 4 « 3 », 5 « 10 », 6 « fois », 7 « 2 », 8 « 20 », 9 « cm »,
     12 « B », 13 « 10 », 14 « plus », 15 « 10 », 16 « fait », 17 « 20 », 23 « moitié », 25 « tour », 26 « 40 », 27 « cm » */
  const m=k=>marque('02b-reponse',k);
  const finTitre=tJe-.08;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 20 cm de ruban, une AUTRE boîte rectangulaire, côtés inconnus */
      if(T>=cRuban) rubanDroit(c,RUBAN_X0,RUBAN_Y,(T-cRuban)/.6);
      ligneMots(c,T,[['20',c20],['cm',cCm]],RUBAN_X0+20*PX+130,RUBAN_Y,64,CRAIE.jaune);
      if(T>=cRect){ boite(c,BOITE_DEFI,'D',zoom(T,cRect,.3)); [0,1].forEach(i=>coteCraie(c,BOITE_DEFI,i,'? cm',zoom(T,cRect+.15+i*.1,.4),CRAIE.faux,56,i?96:48)); }
      if(T>=cAutre) ecrire(c,'AUTRE',XR+20,280,62*zoom(T,cAutre,.3),CRAIE.blanc);
      if(T>=cMarche) ecrire(c,'?',XR+20,470,200*zoom(T,cMarche,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=ouf){ /* la réponse : le ruban fait le tour de C, pile poil, et le nœud */
      boite(c,C_OUF,'C',1); tourPoly(c,C_OUF,1,TOUR,16);
      coteCraie(c,C_OUF,1,'3 cm',1,CRAIE.blanc,50,80); coteCraie(c,C_OUF,2,'7 cm',1,CRAIE.blanc,50,48);
      ecrire(c,'7 + 3 = 10',XR,230,56,CRAIE.blanc); ecrire(c,'10 × 2 = 20 cm',XR,320,56,CRAIE.ok);
      ecrire(c,'pile poil !',XR,420,56,CRAIE.jaune); coche(c,XR-60,530,.5);
      if(T>=tNoeud) noeudDore(c,(C_OUF[0][0]+C_OUF[1][0])/2,C_OUF[0][1]-34,zoom(T,tNoeud,.4));
      tab.maj(); return; }
    /* le ruban de 20 cm, tout droit, en haut (à l'échelle) */
    if(T>=tRuban) rubanDroit(c,RUBAN_X0,RUBAN_Y,(T-tRuban)/.7);
    if(T>=finTitre) ligneMots(c,T,[['20',t20],['cm',tCm20]],RUBAN_X0+20*PX+130,RUBAN_Y,64,CRAIE.jaune);
    if(T<bo){ /* l'accroche : une boîte cadeau qui attend son ruban */
      if(T>=tBoite){ const g=rectDe(600,250,8,5); boite(c,g,'D',zoom(T,tBoite,.3),['#ffd8a8','#d9480f']); ecrire(c,'?',(g[0][0]+g[1][0])/2,(g[0][1]+g[2][1])/2,110*zoom(T,tBoite,.4),'#d9480f'); }
      if(T>=tPile) ecrire(c,'pile poil ?',290,330,60*zoom(T,tPile,.3),CRAIE.jaune);
      tab.maj(); return; }
    /* les trois boîtes, chacune à son nom, chaque mesure à son nombre */
    if(T>=tA) boite(c,BOITE_A,'A',zoom(T,tA,.3));
    if(T>=t6) coteCraie(c,BOITE_A,0,T>=tCm6?'6 cm':'6',zoom(T,t6,.3),CRAIE.blanc,50,40);
    if(T>=t5) coteCraie(c,BOITE_A,3,'5 cm',zoom(T,t5,.3),CRAIE.blanc,50,86);
    if(T>=tB) boite(c,BOITE_B,'B',zoom(T,tB,.3));
    if(T>=t10) coteCraie(c,BOITE_B,2,T>=tCm10?'10 cm':'10',zoom(T,t10,.3),CRAIE.blanc,50,40);
    if(T>=t10b) coteCraie(c,BOITE_B,3,'10 cm',zoom(T,t10b,.3),CRAIE.blanc,50,96);
    if(T>=tCc) boite(c,BOITE_C,'C',zoom(T,tCc,.3));
    if(T>=t7) coteCraie(c,BOITE_C,2,T>=tCm7?'7 cm':'7',zoom(T,t7,.3),CRAIE.blanc,50,40);
    if(T>=t3) coteCraie(c,BOITE_C,3,'3 cm',zoom(T,t3,.3),CRAIE.blanc,50,86);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-boites'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0("J'ai 20 centimètres"),a0('de ruban doré.')),
    ...suiteDe(bo,60,62,[a0('Je veux entourer'),a0('une boîte cadeau')],[a0('pile poil, sans un'),a0('millimètre de trop !')]),
    ...suiteDe(q,60,62,[a1('Trois boîtes'),a1("m'attendent.")],[a1('A : 6 centimètres sur 5.')],
      [a1('B : 10 centimètres sur 10.')],[a1('C : 7 centimètres sur 3.')]),
    ...suiteDe(com,60,62,[a3('Le nœud est parfait…')],[a3("sauf que j'ai emballé"),a3('la boîte avec moi dedans !')]),
    ...suiteDe(f,60,60,[a4('À toi : avec 20 centimètres'),a4('de ruban,')],[a4('donne une AUTRE boîte'),a4('rectangulaire qui marche.')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Quelle boîte mon ruban'),qd('entoure-t-il exactement ?')];
  const tq=(w,n=1)=>mot('02-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  /* Une ligne écrite à la main : chaque morceau (séparé par une espace) prend l'instant donné */
  const L=(txt,ts)=>[ts[0],ts[ts.length-1],txt,ts];
  const r1=L('7 + 3 = 10',[m(2),m(3),m(4),m(5),m(5)]);
  const r2=L('10 × 2 = 20 cm',[m(6),m(6),m(7),m(8),m(8),m(9)]);
  const s1=L('Pour la B : 10 + 10 = 20…',[m(10),m(11),m(12),m(12),m(13),m(14),m(15),m(16),m(17)]);
  const s2=L("mais ce n'est que la moitié du tour",[m(18),m(19),m(20),m(21),m(22),m(23),m(24),m(25)]);
  const s3=L('40 cm !',[m(26),m(27),m(27)]);
  const tC=mot('02b-reponse','C');

  /* Les choix : chaque boîte en petit, à la même échelle (10 px pour 1 cm), le ruban se trace pendant le calcul */
  const K=10, svgBoite=(l,w,h)=>{ const x=(112-w*K)/2, y=(104-h*K)/2, [f0,f1]=PAPIER[l];
    return `<svg width="112" height="104" viewBox="0 0 112 104"><rect x="${x}" y="${y}" width="${w*K}" height="${h*K}" fill="${f0}" stroke="${f1}" stroke-width="3"/>`+
      `<path class="rub" d="M${x},${y}h${w*K}v${h*K}h${-w*K}z" fill="none" stroke="${TOUR}" stroke-width="7" stroke-linejoin="round" stroke-dasharray="0 999"/></svg>`; };
  const CH=[svgBoite('A',6,5)+'6 cm sur 5 cm', svgBoite('B',10,10)+'10 cm sur 10 cm', svgBoite('C',7,3)+'7 cm sur 3 cm'];
  /* longueur tracée (en cm) : C 7 sur « 7 », +3 sur « 3 », puis tout (20) sur « fois 2 » ; B 10, puis 20 (la moitié), puis 40 */
  const lisseU=(T,t,d=.35)=>Math.max(0,Math.min(1,(T-t)/d));
  const traceC=T=>7*lisseU(T,m(2))+3*lisseU(T,m(4))+10*lisseU(T,m(6),.9);
  const traceB=T=>10*lisseU(T,m(13))+10*lisseU(T,m(15))+20*lisseU(T,m(26),.7);
  function cartesChoix(T){ const ids=['cA','cB','cC'];
    ids.forEach((id,i)=>{ const sp=document.getElementById(id).lastElementChild; if(!sp.querySelector('svg')) sp.innerHTML=CH[i]; });
    const fixe=(id,cm)=>{ const p=document.querySelector('#'+id+' .rub'); if(p) p.setAttribute('stroke-dasharray',`${cm*K} 999`); };
    fixe('cA',0); fixe('cC',traceC(T)); fixe('cB',traceB(T));
    document.getElementById('cB').classList.toggle('piege',T>=m(12)); }

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<line x1="26" y1="40" x2="206" y2="40" stroke="#ff922b" stroke-width="10"/>`+
    `<text x="265" y="51" font-family="Segoe UI" font-weight="800" font-size="30" fill="#ffd43b" text-anchor="middle">20 cm</text>`+
    `<rect x="30" y="84" width="54" height="45" fill="#74c0fc" stroke="#1864ab" stroke-width="3"/><text x="57" y="118" font-family="Segoe UI" font-weight="800" font-size="34" fill="#17452a" text-anchor="middle">A</text>`+
    `<rect x="102" y="84" width="90" height="90" fill="#faa2c1" stroke="#a61e4d" stroke-width="3"/><text x="147" y="142" font-family="Segoe UI" font-weight="800" font-size="40" fill="#17452a" text-anchor="middle">B</text>`+
    `<rect x="30" y="150" width="63" height="27" fill="#8ce99a" stroke="#2b8a3e" stroke-width="3"/><text x="61" y="173" font-family="Segoe UI" font-weight="800" font-size="24" fill="#17452a" text-anchor="middle">C</text>`+
    `<text x="262" y="200" font-family="Segoe UI" font-weight="800" font-size="130" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'20 cm de ruban :<br>quelle boîte ?'+PARI,mini);
  return { clips,FIN,titre:'Le ruban pile poil',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,bo,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[[CH[0],tq('A'),tq('A')],[CH[1],tq('B'),tq('B')],[CH[2],tq('C'),tq('C')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[s1,s2,s3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      if(T>=r&&T<ouf) cartesChoix(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      /* le gag : emballé dans la boîte, du mot « emballé » jusqu'au défi */
      const emballe=T>=tEmb&&T<com&&!window.MINI, z=emballe?Math.min(1,zoom(T,tEmb,.4)):0;
      emb.b.visible=emb.n.visible=emballe; emb.b.scale.setScalar(Math.max(.01,z)); emb.n.scale.setScalar(Math.max(.01,z));

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<bo){ T<tPile?g.montre():g.fier(); }
      else if(T<q) g.montre();
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():(T<m(10)?g.fier():g.reflechit()); }
      else if(T<com){ T<tSauf?g.fier():g.oups(); }
      else if(T<f){ T<cRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
