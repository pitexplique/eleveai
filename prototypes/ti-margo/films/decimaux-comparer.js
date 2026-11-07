/* Série Nombres décimaux 6e, épisode 03 : LA PLUS GROSSE BOUTEILLE. 1,5 L, 1,25 L, 1,125 L : Ti Margo prend
   « celle qui a le plus de chiffres ». On verse dans trois pots : la sienne est la moins remplie.
   Avec des zéros : 1,500 > 1,250 > 1,125. Ceinture jaune (une règle).
   Chargé après films/decimaux.js : enchainer, groupe, suiteDe, poserTableau, ecrire, pop, CRAIE, poserClasse,
   gestes, poserMiniature, PARI viennent de là. */

/* ---- La voix, mot par mot : la voix dit « 1 virgule 5 litre » ; les marques arrivent en
   « 1 virgule », « 1 virgule », « 5 litre », « 5 litre ». Chaque marque répétée est d'abord
   recoupée en ses mots (« 5 » puis « litre »), pour pouvoir écrire « 1,5 litre ». ---- */
function voixMots03(A){
  const norme=s=>s.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,''), CL=(window.CUES||{})[VIDEO]||{}, MOTS={};
  for(const [clip,l] of Object.entries(CL)){ const arr=[]; let i=0;
    while(i<l.length){ let j=i; while(j+1<l.length&&l[j+1][1]===l[i][1]) j++;
      const ws=l[i][1].trim().split(/\s+/), k=j-i+1;
      ws.forEach((w,n)=>{ const idx=ws.length===1?i:i+Math.round(n*(k-1)/(ws.length-1)); arr.push([l[idx][0],w]); }); i=j+1; }
    MOTS[clip]=arr; }
  function dit(clip){ const l=MOTS[clip]; if(!l) throw new Error('clip sans instants : '+clip); let i=0, av=null;
    const pris=()=>{ if(i>=l.length) throw new Error(`${clip} : plus de mots`); av=A[clip]+l[i][0]; return norme(l[i++][1]); };
    const f=txt=>{ const tm=[];
      txt.split(' ').forEach(w=>{ const n=norme(w); if(!n){ tm.push(av); return; }
        const dec=w.replace(/[.!?:;,]+$/,'').match(/^(\d+),(\d+)$/);
        if(dec){ const t0=A[clip]+l[i][0], a=pris(); if(a!==dec[1]) throw new Error(`${clip} : écrit « ${w} », dit « ${a} »`);
          if(i<l.length&&norme(l[i][1])==='virgule') i++;
          const b=pris(); if(!b.startsWith(dec[2])) throw new Error(`${clip} : « ${w} » : après la virgule, dit « ${b} »`);
          av=t0; tm.push(t0); return; }
        const c=pris(); if(!c.includes(n)&&!n.includes(c)) throw new Error(`${clip} : écrit « ${w} », dit « ${c} »`); tm.push(av); });
      return [tm[0],tm[tm.length-1],txt,tm]; };
    f.saute=n=>{ i+=n; return f; };
    f.jusque=m=>{ const c=norme(m); while(i<l.length&&norme(l[i][1])!==c) i++; return f; };
    return f; }
  /* l'instant du n-ième mot « m » (marques recoupées) */
  function mot(clip,m,n=1){ const c=norme(m); let k=0; for(const [t,w] of MOTS[clip]) if(norme(w)===c&&++k===n) return A[clip]+t;
    throw new Error(`${clip} : mot introuvable « ${m} » (${n})`); }
  return {dit,mot};
}

/* ---- À la craie : une bouteille de jus, un pot ---- */
const JUS='#ffa94d', JUS_F='#e8590c';
function bouteille(c,x,y,w,h,{plein=1,cadre=null}={}){ /* (x, y) : le milieu du bas */
  const col=w*.36, epaule=h*.22, corps=h-epaule-h*.12;
  c.lineJoin='round'; c.lineWidth=7; c.strokeStyle=cadre||CRAIE.blanc;
  const chemin=()=>{ c.beginPath(); c.moveTo(x-w/2,y); c.lineTo(x-w/2,y-corps); c.quadraticCurveTo(x-w/2,y-corps-epaule*.7,x-col/2,y-corps-epaule);
    c.lineTo(x-col/2,y-h+h*.06); c.lineTo(x+col/2,y-h+h*.06); c.lineTo(x+col/2,y-corps-epaule); c.quadraticCurveTo(x+w/2,y-corps-epaule*.7,x+w/2,y-corps); c.lineTo(x+w/2,y); c.closePath(); };
  if(plein>0){ c.save(); chemin(); c.clip(); c.fillStyle=JUS; const hj=(corps+epaule*.6)*plein; c.fillRect(x-w/2,y-hj,w,hj); c.restore(); }
  chemin(); c.stroke();
  c.fillStyle='#e03131'; c.fillRect(x-col/2-6,y-h,col+12,h*.08);
  c.fillStyle='rgba(255,255,255,.85)'; c.fillRect(x-w/2+8,y-corps*.62,w-16,corps*.3);
  c.fillStyle=JUS_F; c.beginPath(); c.arc(x,y-corps*.47,corps*.09,0,7); c.fill(); }
function pot(c,x,y,w,h,niveau,cadre){ /* niveau : la hauteur de jus en pixels */
  if(niveau>0){ c.fillStyle=JUS; c.fillRect(x-w/2+5,y-niveau,w-10,niveau-4); c.fillStyle='rgba(255,255,255,.35)'; c.fillRect(x-w/2+5,y-niveau,w-10,8); }
  c.strokeStyle=cadre||CRAIE.blanc; c.lineWidth=cadre?11:7; c.lineCap='round'; c.beginPath(); c.moveTo(x-w/2,y-h); c.lineTo(x-w/2,y); c.lineTo(x+w/2,y); c.lineTo(x+w/2,y-h); c.stroke(); }
function coche(c,x,y,k=1){ c.strokeStyle=CRAIE.ok; c.lineWidth=16; c.lineCap='round'; c.beginPath(); c.moveTo(x-40*k,y); c.lineTo(x-8*k,y+32*k); c.lineTo(x+52*k,y-40*k); c.stroke(); }

FILMS['comparer']=function(outils){
  const {$,panneau}=outils;
  const DUR={'00-accroche':15.26,'01-verser':6.53,'02-question':15.85,'02b-reponse':11.87,'03-lecon':4.46,'04-commentaire':9.93,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixMots03(A);
  const [acc,ver,q,r,lec,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  /* Les instants */
  const tTrois=mot('00-accroche','Trois'), tB1=mot('00-accroche','1',1), tB2=mot('00-accroche','1',2), tB3=mot('00-accroche','1',3),
        tPrends=mot('00-accroche','prends'), tCelle=mot('00-accroche','celle'), tChif=mot('00-accroche','chiffres'), tParie=mot('00-accroche','paries');
  const tVerse=mot('01-verser','verse'), tPot=mot('01-verser','pot'), tOh=mot('01-verser','Oh'), tMoins=mot('01-verser','moins');
  const tCompris=mot('03-lecon','compris'), tPas=mot('03-lecon','pas');
  const tC1=mot('04-commentaire','2',1), tC2=mot('04-commentaire','2',2), tC3=mot('04-commentaire','2',3), tRep=mot('04-commentaire','Réponds');
  const gros=T=>T<tTrois-.08;

  const VOL=[1.5,1.25,1.125], NOMS=['1,5 L','1,25 L','1,125 L'], XS=[218,528,838], TB=[tB1,tB2,tB3];
  /* L'ardoise */
  function dessiner(T){ const c=tab.c, W=tab.W; tab.effacer();
    if(T>=com){ /* le défi : trois nombres à ranger, la réponse reste à l'élève */
      [['2,3',tC1],['2,03',tC2],['2,33',tC3]].forEach(([s,t],i)=>{ if(T>=t) ecrire(c,s,XS[i],150,110*Math.min(1.2,Math.max(1,pop(T,t))),[CRAIE.u,CRAIE.d,CRAIE.c][i]); });
      if(T>=tC3+.9){ for(let i=0;i<3;i++){ c.strokeStyle=CRAIE.blanc; c.lineWidth=7; c.setLineDash([20,14]); c.strokeRect(XS[i]-100,300,200,170); c.setLineDash([]); ecrire(c,'?',XS[i],385,100,CRAIE.blanc); }
        for(let i=0;i<2;i++) ecrire(c,'<',(XS[i]+XS[i+1])/2,385,76,CRAIE.d);
        ecrire(c,'du plus petit au plus grand',W/2,555,54,CRAIE.blanc); }
      if(T>=tRep) ecrire(c,'Réponds !',W/2,650,64*Math.max(1,pop(T,tRep)),CRAIE.ok);
      tab.maj(); return; }
    if(T>=ver){ /* les bouteilles en haut, les pots dessous ; on verse */
      const u=lisse(Math.min(1,Math.max(0,(T-tVerse)/2.4))), rouge=T>=tOh, gagne=T>=lec;
      for(let i=0;i<3;i++){ const x=XS[i];
        bouteille(c,x,165,80,140,{plein:1-u,cadre:i===2&&!gagne?CRAIE.d:null});
        ecrire(c,NOMS[i],x,200,46,i===2&&!gagne?CRAIE.d:CRAIE.blanc);
        if(T>=tPot) pot(c,x,620,200,330,u*VOL[i]/1.5*300,rouge&&i===2?CRAIE.faux:(gagne&&i===0?CRAIE.ok:null)); }
      if(T>=tMoins&&!gagne){ ecrire(c,'le moins !',XS[2],258,48,CRAIE.faux); }
      if(gagne){ coche(c,XS[0]+5,460,1.2); ecrire(c,'le plus !',XS[0],258,48,CRAIE.ok); }
      tab.maj(); return; }
    /* l'accroche : les trois bouteilles, à leur nombre */
    for(let i=0;i<3;i++){ if(T<TB[i]) continue; const z=Math.max(1,pop(T,TB[i])), x=XS[i];
      const choisie=i===2&&T>=tPrends;
      bouteille(c,x,470,150*Math.min(z,1.25),330*Math.min(z,1.25),{cadre:choisie?CRAIE.d:null});
      ecrire(c,NOMS[i],x,560,68,choisie?CRAIE.d:CRAIE.blanc); }
    if(T>=tChif){ const z=Math.max(1,pop(T,tChif)); c.strokeStyle=CRAIE.d; c.lineWidth=9; c.beginPath(); c.ellipse(XS[2],560,140*z,52*z,0,0,7); c.stroke();
      ecrire(c,'le plus de chiffres !',W/2,660,52,CRAIE.d); }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-verser'), a3=dit('03-lecon'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const salut=[a0('Salut !')];
  const groupes=[
    groupe(acc+.1,tTrois-.08,352,62,...salut),
    ...suiteDe(ver,60,58,[a0('Trois bouteilles de jus :'),a0('1,5 litre, 1,25 litre'),a0('et 1,125 litre.')],[a0('Je prends la plus grosse :'),a0('celle qui a le plus de chiffres !')],[a0('Tu paries que j’ai raison ?')]),
    ...suiteDe(q,60,60,[a1('On verse chaque bouteille'),a1('dans un pot.')],[a1('Oh non !')],[a1('Mon pot est le moins rempli.')]),
    ...suiteDe(com,60,60,[a3('J’ai compris :'),a3('le plus de chiffres,'),a3('ce n’est pas le plus grand !')]),
    ...suiteDe(f,60,58,[a4('À toi : range'),a4('du plus petit au plus grand :'),a4('2,3 ; 2,03 ; 2,33.')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Quelle bouteille contient'),qd('le plus de jus ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Avec des zéros :'), r2=rd('1,500 ; 1,250 ; 1,125.'), r3=rd('500 millièmes, c’est le plus.');

  poserMiniature(outils,acc+1,'1,5 L ou<br>1,125 L ?'+PARI,
    `<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
     <g transform="translate(-10,8) scale(.92)"><path d="M135 210 V120 Q135 95 152 88 V48 H178 V88 Q195 95 195 120 V210 Z" fill="#ffa94d" stroke="#f8f9fa" stroke-width="6"/><rect x="148" y="40" width="34" height="14" fill="#e03131"/></g>
     <text x="250" y="150" font-family="Segoe UI" font-weight="800" font-size="70" fill="#ffd43b" text-anchor="middle">?</text></svg>`);
  return { clips,FIN,titre:'La plus grosse bouteille',ceinture:1,finTitre:tTrois-.08,groupes,finClip:'05-abonne',
    cuts:[tTrois-.08,ver,q,r,lec,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:lec,cpt:fin('02-question')+.1,bonne:2,tBon:.64,
      phrase:phraseQ,pause:pauseQ,
      choix:[['1,125 litre',tq('A'),tq('1',1)],['1,25 litre',tq('B'),tq('1',2)],['1,5 litre',tq('C'),tq('1',3)]],
      tete:[[r+.1,'Réponse '],[r+.64,'C !']],reponse:[r1,r2],suite:[r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<lec, dansF=T>=f, gr=gros(T);
      tab.g.visible=!gr&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gr){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gr) g.ouvre();
      else if(T<ver){ if(T<tPrends) g.reflechit(); else if(T<tParie) g.montre(); else g.fier(); }
      else if(T<q){ if(T>=tOh){ g.oups(); scene.ry=-.12+.3*lisse((T-tOh)/.35); } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<lec){ T<r+.64?g.ouvre():g.pouce(); }
      else if(T<com){ T<tPas?g.reflechit():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
