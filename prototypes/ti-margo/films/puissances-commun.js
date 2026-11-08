/* Série Puissances : ce qui sert à tous ses films, toutes classes (chargé par page.html avant films/<série>.js).
   Code couleur de la série : bleu base, orange exposant, vert juste, rouge piège. */
{ const css=document.createElement('style'); css.textContent=`div#rebours{display:block;}
  #pause .ligne,#cq .ligne{display:block;}
  #legende.piege{color:#c92a2a;}
  #panneau .r{font-size:74px;text-align:center;white-space:nowrap;line-height:1.2;}
  .ex{color:#e8590c;}.ba{color:#1971c2;}.pi{color:#c92a2a;}
  .expo{display:inline-block;font-size:.66em;vertical-align:.55em;line-height:0;color:#e8590c;}
  .barre{text-decoration:line-through;text-decoration-color:#c92a2a;text-decoration-thickness:8px;}
  /* Cartes empilées : plus étroites, pour que la bonne réponse grossisse sans sortir du cadre */
  body:not(.cartes-en-ligne) .choix{margin-left:70px;margin-right:70px;}
  body.cartes-en-ligne #cA,body.cartes-en-ligne #cB,body.cartes-en-ligne #cC{display:inline-flex;width:27%;margin:8px 8px;box-sizing:border-box;}`; document.head.append(css); }

function gestes(P,T){ return {
  ouvre(){ P.gesteD='ouverte'; P.md.set(.86,2.02+Math.sin(T*3)*.06,.5); P.cd.set(.72,1.58,.2); P.tetY=.08+Math.sin(T*1.7)*.07; },
  montre(){ P.gesteD='index'; P.md.set(1.02,2.72+Math.sin(T*3)*.04,.42); P.cd.set(.86,1.95,.1); P.tetX=-.1; P.regX=-.2; P.regY=.25; },
  pouce(){ P.md.set(.95,2.32,.45); P.cd.set(.74,1.7,.14); P.gesteD='pouce'; P.tetZ=-.14; P.paupiere=-1.1; },
  reflechit(){ P.md.set(.44,2.3,.72); P.cd.set(.78,1.78,.34); P.gesteD='ouverte'; P.tetZ=.15; P.tetX=-.1; P.regX=-.28; P.regY=.35; P.qSway=Math.sin(T*3)*.3; },
  oups(){ P.gesteD='ouverte'; P.md.set(.98,2.42,.5); P.mg.set(-.98,2.42,.5); P.cd.set(.82,1.7,.2); P.cg.set(-.82,1.7,.2); P.tetZ=.16+Math.sin(T*2)*.03; P.tetX=-.06; P.paupiere=-1.25; }
}; }

/* La miniature verticale : la question, la ceinture, la mention « Dessin animé » */
function poserMiniature({$,carte,legende,panneau},t,html){ window.tiMargoMiniature=()=>{ window.MINI=true; window.tiMargo.aller(t);
  carte.style.display='none'; panneau.style.display='none'; $('titre').style.display='none'; $('fin').style.display='none';
  legende.style.cssText+=';display:block;top:60px;left:50px;right:50px;font-size:92px;line-height:1.08;padding:26px;'; legende.innerHTML=html;
  const e=$('echelle'); e.style.display='flex'; e.style.top='500px';
  const m=document.createElement('div'); m.className='cv'; m.textContent='Dessin animé';
  m.style.cssText='left:250px;right:250px;bottom:36px;text-align:center;font-size:72px;background:#17452a;color:#fff;border-radius:999px;padding:14px 0;z-index:6;'; document.body.append(m); }; }

/* Les instants d'un film, depuis les durées des clips.
   attentes : { clip: silence après lui } (défaut .25 s). Renvoie clips, A (début de chaque clip), CL (les cues),
   m(c,i) : l'instant du mot n° i du clip c ; dit(c,i,txt) : une phrase écrite, chaque mot prend l'instant de son rang
   (un signe seul suit le mot d'avant) ; FIN. */
function chrono(ep,DUR,attentes={}){
  const clips=[]; let t=.4; const noms=Object.keys(DUR);
  for(const c of noms){ clips.push([c,+t.toFixed(2)]); t+=DUR[c]+(attentes[c]??.25); }
  const A=Object.fromEntries(clips), CL=window.CUES[ep], der=noms[noms.length-1];
  const m=(c,i)=>A[c]+CL[c][i][0];
  const dit=(c,i,txt)=>{ let k=i-1; const tm=txt.split(' ').map(w=>{ if(/[0-9a-zà-ÿ]/i.test(w)) k++; return m(c,Math.max(k,i)); }); return [tm[0],tm[tm.length-1],txt,tm]; };
  /* ec(c,'2:−3, 3:entre 4:parenthèses,') : une phrase écrite, chaque mot avec le rang du mot dit à cet instant.
     J(c,[[rang,html,classe],…]) : les mêmes rangs pour une formule en jetons. Ne jamais écrire un mot avant son rang. */
  const ec=(c,txt)=>{ let av=0; const l=txt.trim().split(/\s+/).map(x=>{ const g=/^(\d+):(.*)$/.exec(x); if(g){ av=m(c,+g[1]); return [av,g[2]]; } return [av,x]; }); return [l[0][0],l[l.length-1][0],l.map(x=>x[1]).join(' '),l.map(x=>x[0])]; };
  const J=(c,l)=>l.map(([i,s,k])=>[m(c,i),s,k]);
  return {clips,A,CL,m,dit,ec,J,FIN:+(A[der]+DUR[der]+.5).toFixed(2)};
}

/* Le panneau du bas, en n lignes. Renvoie afficher(T,[liste1,liste2,…]) ; une liste vide ou absente cache sa ligne. */
function lignesPanneau({panneau,$,jetons},n=3){
  panneau.innerHTML=Array.from({length:n},(_,i)=>`<div class="r" id="l${i+1}"></div>`).join('');
  return (T,ls)=>{ for(let i=0;i<n;i++){ const e=$('l'+(i+1)), l=ls[i]||[]; e.style.display=l.length?'':'none'; jetons(e,l,T); } };
}

/* Les écritures en couleur du panneau et des cartes */
const ex=s=>`<span class="ex">${s}</span>`, ba=s=>`<span class="ba">${s}</span>`, ok=s=>`<span class="ok">${s}</span>`, pi=s=>`<span class="pi">${s}</span>`, sup=s=>`<span class="expo">${s}</span>`;
const puiss=(b,e)=>ba(b)+sup(e);

/* Le décor le plus simple : un mur, un sol, une plinthe */
function poserPiece(mur,solC,plinthe){
  const m=new THREE.Mesh(new THREE.PlaneGeometry(120,60),new THREE.MeshBasicMaterial({color:mur})); m.position.set(0,30,-2.4); scene3d.add(m);
  const s=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:solC})); s.rotation.x=-Math.PI/2; s.position.y=-.02; scene3d.add(s);
  const p=new THREE.Mesh(new THREE.PlaneGeometry(120,.28),new THREE.MeshBasicMaterial({color:plinthe})); p.position.set(0,.14,-2.38); scene3d.add(p);
}

/* Un panneau plat dans le décor, dessiné sur un canvas (écran, affiche, chiffres d'une marche) :
   ecrire(cle,dessin) ne redessine que si la clé change. dessin(g,w,h) reçoit le contexte 2D. */
function ecran3d(larg,haut,pos,parent=scene3d,px=256){
  const cv=document.createElement('canvas'); cv.width=Math.round(larg*px); cv.height=Math.round(haut*px); const g=cv.getContext('2d');
  const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace; tx.anisotropy=8;
  const me=new THREE.Mesh(new THREE.PlaneGeometry(larg,haut),new THREE.MeshBasicMaterial({map:tx,transparent:true})); me.position.set(...pos); parent.add(me);
  let cle=null; return {mesh:me,g,ecrire(k,dessin){ if(k===cle) return; cle=k; g.clearRect(0,0,cv.width,cv.height); dessin(g,cv.width,cv.height); tx.needsUpdate=true; }};
}
