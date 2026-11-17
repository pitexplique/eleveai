/* ============================================================
   Série « Séances » (6e) — ÉPISODE 01 : LE RESTAURANT DE LA CLASSE (17/11/2026).
   Outils : films/6e-commun.js. Le hub /seances raconte la séance vécue de Frédéric.
   Ti Margo raconte : un prof doit choisir pour 25 élèves. La carte : coach, exercices, cahier,
   découpage, vidéo. D'abord en CLASSE ENTIÈRE (les 25 en rangées) : un plat imposé, la carte
   mentale à colorier. Puis EN GROUPES (les 25 rejoignent 5 îlots) : chacun choisit à la carte.
   ⛔ Frédéric, 17/11 : « pas de question-pause » mais « et toi, que veux-tu faire ? », au choix,
   « pas de bonne réponse, un choix » → la carte du socle sans réponse (finR = début du clip
   suivant), son en-tête « Au choix ! » au lieu de « Question ! ».
   Fin : le dessert (des longueurs dans ce que tu aimes), puis « tu prends quoi ? » en commentaire.
   ============================================================ */
FILMS['restaurant']=function(outils){
  const DUR={'00-accroche':7.73,'01-carte':6.8,'02-impose':7.2,'03-groupes':4.95,'04-doute':5.45,'05-question':11.78,
    '06-choix':7.72,'07-dessert':4.27,'08-commentaire':6.27,'09-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.6,'02-impose':.6,'03-groupes':1.2,'04-doute':1,'05-question':3.3,'06-choix':1.6,'07-dessert':1.2,'08-commentaire':2.2});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,car,imp,grp,dou,q,cho,des,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['09-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  /* ⭐ 17/11, Frédéric : « le paysage et le short ? » → le MÊME film en 1920 × 1080 (série 6e-seance-paysage,
     qui relit ce fichier) : Ti Margo à gauche, un grand tableau à droite ; les dessins (prévus pour l'ardoise
     1056 × 720 du short) y sont agrandis ×1,25 et centrés. */
  poserClasse(); const tab=PAYSAGE?poserTableau({L:6.6,H:3.75,x:1.85,y:2.75}):poserTableau({L:4.4,H:3,x:0,y:4.55});
  if(PAYSAGE){ const c=tab.c, f=tab.fond, W=tab.W, H=tab.H;
    tab.effacer=()=>{ c.setTransform(1,0,0,1,0,0); c.fillStyle=f; c.fillRect(0,0,W,H); c.setTransform(1.25,0,0,1.25,(W-1056*1.25)/2,(H-720*1.25)/2); };
    const css2=document.createElement('style'); css2.textContent=`
      #titre{left:520px;right:520px;top:40px;font-size:70px;}
      #echelle{left:560px;right:560px;top:170px;}
      #legende{left:60px;right:60px;top:auto!important;bottom:28px;font-size:46px!important;padding:12px 26px;border-radius:30px;line-height:1.2;}
      #carte{left:760px!important;right:60px!important;top:90px!important;}
      #fin{left:430px;right:430px;top:60px;font-size:56px;padding:22px;}
      #fin .site{font-size:88px;margin:6px 0 12px;} #fin .geste{margin:4px 0;} #fin .ico{font-size:62px;}`;
    document.head.append(css2); }
  outils.panneau.style.display='none'; cssCartes();
  /* La carte du socle s'appelle « Au choix ! » ici : il n'y a pas de bonne réponse. */
  const css=document.createElement('style');
  css.textContent='#ct{font-size:0!important;}#ct::after{content:"Au choix !";font-size:56px;}';
  document.head.append(css);

  const t25=mot('00-accroche','25'), tPrend=mot('00-accroche','prend'), tCe=mot('00-accroche','Ce');
  const tPlats=['coach','exercices','cahier','découpage','vidéo'].map(m=>mot('01-carte',m));
  const tClasse=mot('02-impose','classe'), tImpose=mot('02-impose','imposé'), tColorier=mot('02-impose','colorier');
  const tGroupes=mot('03-groupes','groupes'), tChoisit=mot('03-groupes','choisit');
  const tEux=mot('04-doute','Eux');
  const tChoix=mot('06-choix','choix'), tChacun=mot('06-choix','Chacun'), tObj=mot('06-choix','objectif');
  const tLong=mot('07-dessert','longueurs'), tAimes=mot('07-dessert','aimes');
  const tQuoi=mot('08-commentaire','quoi'), tRep=mot('08-commentaire','Réponds');
  const finTitre=tCe-.08;

  /* ---- Les 25 élèves : en rangées (classe entière), puis dans leur îlot (en groupes) ---- */
  const PLATS=[['Coach','#74c0fc'],['Exercices','#ffc078'],['Cahier','#8ce99a'],['Découpage','#faa2c1'],['Vidéo','#b197fc']];
  const TAILLES=[7,6,4,3,5];                          /* 25 élèves */
  const ILOTS=[[215,240],[528,215],[841,240],[360,470],[700,470]];
  const RANG=k=>[260+(k%5)*150,200+Math.floor(k/5)*82];
  /* chaque place des rangées va dans un îlot (mélangé, toujours le même) */
  const ORDRE=[3,17,8,22,0,11,5,19,14,24,2,9,20,6,15,1,23,12,4,18,10,7,21,13,16];
  const ELEVES=[]; let k=0;
  TAILLES.forEach((n,g)=>{ for(let i=0;i<n;i++,k++){ const a=-Math.PI/2+i*2*Math.PI/n, r=n<=3?70:92;
    ELEVES.push({g,rang:RANG(ORDRE[k]),ilot:[ILOTS[g][0]+Math.cos(a)*r,ILOTS[g][1]+Math.sin(a)*r*.72]}); } });

  function eleve(c,x,y,s,coul,main=0){ c.lineWidth=6*s; c.strokeStyle=coul; c.fillStyle=coul;
    c.beginPath(); c.arc(x,y-14*s,15*s,0,7); c.fill();
    c.beginPath(); c.arc(x,y+26*s,24*s,Math.PI*1.08,Math.PI*1.92); c.stroke();
    if(main>0){ c.beginPath(); c.moveTo(x+18*s,y+8*s); c.lineTo(x+26*s,y-(14+30*main)*s); c.stroke(); } }
  function prof(c,x,y,s=1){ c.strokeStyle=CRAIE.blanc; c.fillStyle=CRAIE.blanc; c.lineWidth=7*s; c.lineCap='round';
    c.beginPath(); c.arc(x,y-70*s,24*s,0,7); c.stroke();
    c.beginPath(); c.moveTo(x,y-46*s); c.lineTo(x,y+30*s); c.moveTo(x,y-25*s); c.lineTo(x-34*s,y+5*s); c.moveTo(x,y-25*s); c.lineTo(x+34*s,y+5*s);
    c.moveTo(x,y+30*s); c.lineTo(x-24*s,y+80*s); c.moveTo(x,y+30*s); c.lineTo(x+24*s,y+80*s); c.stroke(); }
  function bulle(c,x,y,s,txt,coul=CRAIE.jaune){ if(s<=0) return; c.strokeStyle=CRAIE.blanc; c.lineWidth=5; c.beginPath(); c.ellipse(x,y,62*s,50*s,0,0,7); c.stroke();
    c.beginPath(); c.arc(x-48*s,y+62*s,9*s,0,7); c.stroke(); ecrire(c,txt,x,y+4,76*s,coul); }
  function table(c,x,y,r,coul){ c.fillStyle='rgba(255,255,255,.08)'; c.strokeStyle=coul; c.lineWidth=5; c.beginPath(); c.ellipse(x,y,r*.62,r*.42,0,0,7); c.fill(); c.stroke(); }
  /* La position d'un élève entre les rangées (u = 0) et son îlot (u = 1) */
  const place=(e,u)=>[e.rang[0]+(e.ilot[0]-e.rang[0])*u,e.rang[1]+(e.ilot[1]-e.rang[1])*u];
  const entre=(T,a,b)=>Math.max(0,Math.min(1,(T-a)/(b-a))), doux=u=>u*u*(3-2*u);

  function ilots(c,T,{u=1,noms=1,lueur=0}={}){
    if(u>=.6) ILOTS.forEach(([x,y],g)=>table(c,x,y,TAILLES[g]<=3?150:190,PLATS[g][1]));
    ELEVES.forEach((e,i)=>{ const [x,y]=place(e,u), coul=u>=.6?PLATS[e.g][1]:CRAIE.blanc, l=lueur?zoom(T,lueur+(i%5)*.06,.4):1;
      eleve(c,x,y,1.1*l,coul); });
    if(noms>0) ILOTS.forEach(([x,y],g)=>ecrire(c,PLATS[g][0],x,y+(TAILLES[g]<=3?100:118),40*noms,PLATS[g][1])); }

  /* ---- L'arbre (Frédéric, 17/11 : « un arbre avec chacun sa façon de monter ») : cinq élèves, cinq
     chemins jusqu'en haut — l'échelle, l'escalier, le tronc, les branches, la corde. ---- */
  const CHEMINS=[
    [[300,690],[300,450]],                                   /* l'échelle, jusqu'à mi-hauteur */
    [[150,690],[200,620],[250,550]],                          /* l'escalier : il saute de marche en marche */
    [[478,690],[478,330]],                                   /* le tronc, jusqu'en haut */
    [[600,690],[640,600],[600,510],[650,420]],                /* les branches, en zigzag */
    [[760,690],[760,290]]                                    /* la corde, jusqu'en haut */
  ];
  const surChemin=(ch,u)=>{ const n=ch.length-1, v=Math.min(n-1e-6,u*n), i=Math.floor(v), w=v-i;
    return [ch[i][0]+(ch[i+1][0]-ch[i][0])*w,ch[i][1]+(ch[i+1][1]-ch[i][1])*w]; };
  function arbre(c,T){ c.save(); c.translate(528*(1-.8),12); c.scale(.8,.8); arbreTrace(c,T); c.restore(); }
  function arbreTrace(c,T){ const z=zoom(T,tChacun,.3);
    c.fillStyle='#8a5a2b'; c.strokeStyle=CRAIE.blanc; c.lineWidth=5; c.beginPath(); c.roundRect(493,300,70,410,10); c.fill(); c.stroke();
    c.fillStyle='rgba(55,178,77,.55)';
    for(const [x,y,r] of [[528,190,150],[380,230,105],[676,230,105],[450,120,95],[606,120,95]]){ c.beginPath(); c.arc(x,y,r*z,0,7); c.fill(); c.stroke(); }
    c.strokeStyle='#c08550'; c.lineWidth=9;                  /* l'échelle */
    c.beginPath(); c.moveTo(270,700); c.lineTo(270,290); c.moveTo(330,700); c.lineTo(330,290);
    for(let y=680;y>300;y-=55){ c.moveTo(270,y); c.lineTo(330,y); } c.stroke();
    c.lineWidth=12; c.beginPath();                           /* l'escalier */
    for(const [x,y] of CHEMINS[1]){ c.moveTo(x-40,y+22); c.lineTo(x+40,y+22); } c.stroke();
    c.beginPath();                                           /* les branches */
    for(const [x,y] of CHEMINS[3].slice(1)){ c.moveTo(563,y+40); c.lineTo(x+(x>620?40:30),y+22); } c.stroke();
    c.strokeStyle=CRAIE.blanc; c.lineWidth=5; c.beginPath(); /* la corde, pendue à une branche */
    c.moveTo(676,262); c.lineTo(760,262); c.moveTo(760,262);
    for(let y=262;y<=700;y+=20) c.lineTo(760+Math.sin(y*.05+T*3)*6,y); c.stroke();
    CHEMINS.forEach((ch,g)=>{ const d=tChacun+.3+g*.25, u=doux(entre(T,d,d+2.6+g*.2));
      /* l'escalier et les branches : par sauts ; les autres : en continu */
      const v=(g===1||g===3)?(Math.floor(u*(ch.length-1)+.0001)+doux((u*(ch.length-1))%1))/(ch.length-1):u;
      const [x,y]=surChemin(ch,Math.min(1,v)), saut=(g===1||g===3)?Math.sin(((u*(ch.length-1))%1)*Math.PI)*28:0;
      eleve(c,x,y-saut-28,1.05,PLATS[g][1],g===0||g===2||g===4?.8:0); });
    /* « chacun a son objectif » : une étoile à la hauteur de chacun, pas la même pour tous */
    if(T>=tObj) CHEMINS.forEach((ch,g)=>{ const [x,y]=ch[ch.length-1]; etoile(c,x+(g===1?-60:62),y-70,30*zoom(T,tObj+g*.18,.5),PLATS[g][1]); }); }
  function etoile(c,x,y,r,coul){ if(r<=0) return; c.fillStyle=coul; c.strokeStyle=CRAIE.blanc; c.lineWidth=3; c.beginPath();
    for(let i=0;i<10;i++){ const a=-Math.PI/2+i*Math.PI/5, q=i%2?r*.45:r; c.lineTo(x+Math.cos(a)*q,y+Math.sin(a)*q); } c.closePath(); c.fill(); c.stroke(); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* « tu prends quoi ? » : la carte, et un point d'interrogation */
      ecrire(c,'Au menu :',470,80,64,CRAIE.blanc);
      PLATS.forEach(([n,coul],g)=>ecrire(c,n,470,180+g*82,60*zoom(T,com+.2+g*.15,.4),coul));
      if(T>=tQuoi) ecrire(c,'?',880,330,260*zoom(T,tQuoi,.5),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=des){ /* le dessert : un terrain de foot, sa longueur */
      ecrire(c,'Le dessert',528,80,70,CRAIE.jaune);
      if(T>=tLong){ const z=zoom(T,tLong,.4), x0=528-380*z, x1=528+380*z, y0=160, y1=440;
        c.fillStyle='rgba(55,178,77,.35)'; c.fillRect(x0,y0,x1-x0,y1-y0); c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.strokeRect(x0,y0,x1-x0,y1-y0);
        c.beginPath(); c.moveTo(528,y0); c.lineTo(528,y1); c.stroke(); c.beginPath(); c.arc(528,(y0+y1)/2,60*z,0,7); c.stroke();
        c.strokeStyle=CRAIE.r1; c.lineWidth=8; c.beginPath(); c.moveTo(x0,495); c.lineTo(x1,495);
        c.moveTo(x0+24,475); c.lineTo(x0,495); c.lineTo(x0+24,515); c.moveTo(x1-24,475); c.lineTo(x1,495); c.lineTo(x1-24,515); c.stroke(); }
      if(T>=tAimes) ecrire(c,'≈ 100 m',528,560,64*zoom(T,tAimes,.4),CRAIE.r1);
      tab.maj(); return; }
    if(T>=cho){ /* pas de bonne réponse : chacun son îlot ; puis l'arbre, chacun sa façon de monter */
      if(T>=tChacun){ arbre(c,T); tab.maj(); return; }
      ilots(c,T);
      if(T>=tChoix) ecrire(c,'ton choix !',528,360,80*zoom(T,tChoix,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=dou){ /* le prof ne sait pas ; eux, peut-être : les mains se lèvent */
      ilots(c,T,{noms:.85});
      prof(c,95,520,.8); bulle(c,92,340,.75*zoom(T,dou+.3,.5),'?');
      if(T>=tEux) ELEVES.forEach((e,i)=>{ if(i%2===0){ const [x,y]=place(e,1); eleve(c,x,y,1.1,PLATS[e.g][1],doux(entre(T,tEux+i*.03,tEux+.4+i*.03))); } });
      tab.maj(); return; }
    if(T>=grp){ /* en groupes : les 25 quittent les rangées pour leur îlot */
      const u=doux(entre(T,tGroupes,tGroupes+1.6));
      ecrire(c,'En groupes',528,58,54,CRAIE.jaune);
      ilots(c,T,{u,noms:T>=tChoisit?zoom(T,tChoisit,.4):0});
      tab.maj(); return; }
    if(T>=imp){ /* classe entière : les 25 en rangées, le plat imposé, la carte mentale */
      if(T>=tClasse) ecrire(c,'Classe entière',528,52,52*zoom(T,tClasse,.4),CRAIE.jaune);
      ELEVES.forEach(e=>eleve(c,e.rang[0],e.rang[1],1.1,CRAIE.blanc));
      if(T>=tColorier) ELEVES.forEach((e,i)=>{ const z=zoom(T,tColorier+(i%10)*.05,.4); if(z<=0) return;
        c.fillStyle=PLATS[i%5][1]; c.beginPath(); c.roundRect(e.rang[0]+30,e.rang[1]-8,36*z,28*z,5); c.fill(); });
      if(T>=tImpose) ecrire(c,'Plat imposé : la carte mentale',528,118,48*zoom(T,tImpose,.4),CRAIE.ok);
      tab.maj(); return; }
    if(T>=car){ /* la carte du restaurant */
      ecrire(c,'La carte',528,80,70,CRAIE.blanc);
      PLATS.forEach(([n,coul],g)=>{ if(T>=tPlats[g]) ecrire(c,n,528,180+g*84,64*zoom(T,tPlats[g],.4),coul); });
      tab.maj(); return; }
    /* l'accroche : le prof, ses 25 élèves, la question */
    prof(c,110,480,.85);
    if(T>=t25) ELEVES.forEach((e,i)=>{ const z=zoom(T,t25+i*.025,.4); if(z>0) eleve(c,e.rang[0],e.rang[1],1.1*z,CRAIE.blanc); });
    if(T>=tPrend) bulle(c,190,260,zoom(T,tPrend,.5),'?');
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-carte'), a2=dit('02-impose'), a3=dit('03-groupes'), a4=dit('04-doute'),
        a6=dit('06-choix'), a7=dit('07-dessert'), a8=dit('08-commentaire'), qd=dit('05-question');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(car,60,60,[a0('Ce matin, un prof doit choisir'),a0('pour 25 élèves.')],[a0("Qu'est-ce qu'il leur prend ?")]),
    ...suiteDe(imp,60,60,[a1('Sur la carte :')],[a1('le coach, les exercices,'),a1('le cahier, le découpage,'),a1('la vidéo.')]),
    ...suiteDe(grp,60,60,[a2("D'abord, en classe entière :")],[a2('un plat imposé pour tous.')],[a2('La carte mentale à colorier.')]),
    ...suiteDe(dou,60,60,[a3('Ensuite, en groupes :')],[a3('chacun choisit son plat,'),a3('à la carte.')]),
    ...suiteDe(q,60,60,[a4('Le prof ne sait pas'),a4('ce qui marche pour chacun.')],[a4('Eux, peut-être.')]),
    ...suiteDe(des,60,60,[a6('Pas de bonne réponse :'),a6("c'est ton choix !")],[a6('Chacun apprend à sa façon,')],[a6('et chacun a son objectif.')]),
    ...suiteDe(com,60,62,[a7('Et le dessert :')],[a7('va trouver des longueurs'),a7('dans ce que tu aimes !')]),
    ...suiteDe(f,60,60,[a8('Et toi, au restaurant'),a8('de la classe,')],[a8('tu prends quoi ?')],[a8('Réponds en commentaire !')])
  ];
  const phraseQ=[qd('Et toi, que veux-tu faire ?')];
  const tq=m=>mot('05-question',m)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];

  if(!PAYSAGE) poserMiniature(outils,car+1,'Le restaurant<br>de la classe',ardoiseMini([['Plat imposé'],['+ à la carte','#ffd43b']]));
  else window.tiMargoMiniature=()=>{ const {$,carte,legende}=outils; window.MINI=true; window.tiMargo.aller(car+1);
    carte.style.display='none'; legende.style.display='none'; $('titre').style.display='none'; $('fin').style.display='none'; $('echelle').style.display='none';
    const m=document.createElement('div'); m.className='cv';
    m.innerHTML='Le restaurant<br>de la classe<div style="color:#e8590c;font-size:84px;margin-top:8px">CHACUN SA FAÇON</div>';
    m.style.cssText='left:700px;right:60px;top:120px;z-index:6;font-size:100px;line-height:1.05;text-align:center;background:#fff;border:8px solid #17452a;border-radius:40px;padding:26px 20px;';
    document.body.append(m);
    const d=document.createElement('div'); d.className='cv'; d.textContent='Dessin animé';
    d.style.cssText='left:900px;right:260px;bottom:60px;text-align:center;font-size:64px;background:#17452a;color:#fff;border-radius:999px;padding:12px 0;z-index:6;'; document.body.append(d); };
  return { clips,FIN,titre:'Le restaurant de la classe',ceinture:0,finTitre,groupes,finClip:'09-abonne',
    cuts:[finTitre,car,imp,grp,dou,q,cho,des,com,f],
    /* Pas de bonne réponse : la carte s'arrête au début de « 06-choix » (finR), aucune n'est marquée. */
    question:{ qc:'05-question',rc:'06-choix',finR:cho,cpt:fin('05-question')+.1,bonne:-1,tBon:99,
      phrase:phraseQ,pause:pauseQ,
      choix:[['le coach',tq('A'),tq('B')-.3],['les exercices',tq('B'),tq('C')-.3],['le cours au cahier',tq('C'),tq('Mets')-.3]],
      tete:[],reponse:[],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<cho, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      if(PAYSAGE){ scene.x=-2.95; scene.ry=.22; cam.x=0; cam.y=2.3; cam.d=7.1; cam.e=.02;
        if(gros){ scene.x=0; scene.ry=-.12; cam.y=2.75; cam.d=8.6; }
        if(dansQ||dansF){ scene.x=-3.6; scene.ry=.25; } }
      else cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<car) T<tPrend?g.montre():g.reflechit();
      else if(T<dou) g.montre();
      else if(T<q) T<tEux?g.reflechit():g.ouvre();
      else if(T<cho) g.reflechit();
      else if(T<des) g.fier();
      else if(T<com) g.montre();
      else if(T<f){ T<tRep?g.ouvre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI&&PAYSAGE){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
      else if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
