/* ============================================================
   COLLECTE ULULE : « Ti Margo : les maths en dessin animé ».
   Film de présentation en PAYSAGE 1920 × 1080 (films/ulule.json : "format": "paysage").
   Voix validée par Frédéric : prototypes/ulule/video-ulule-voix.md (9 scènes).
   Images du film (photo, captures du site, extraits) : manim/sorties/ulule/_media/.
   Pas de ceinture, pas de fin YouTube : c'est une vidéo de collecte.
   ============================================================ */
FILMS.presentation=function({$}){
  const MEDIA='../../manim/sorties/ulule/_media/';

  /* ---- Les voix : durées mesurées sur les WAV (ffprobe), puis l'enchaînement ---- */
  const DUR={'01a-pizzas':4.205,'01b-coupe':2.115,'02a-plus':2.36,'02b-salut':5.45,'03a-frederic':7.395,'03b-decrochent':6.99,
    '04a-notion':6.93,'04b-dessin':3.74,'04c-video':3.36,'04d-coach':5.38,'04e-pays':5.725,'05a-parents':5.3,'05b-suivi':3.12,
    '06a-videos':3.645,'06b-visites':5.835,'06c-juste':4.91,'06d-relire':3.735,
    '07a-trois':5.76,'07b-relu':5.195,'07f-cadeau':6.435,'08-test':7.205,'09-ensemble':3.323,'10-budget':2.76};
  const APRES={'01a-pizzas':1.3,'01b-coupe':2.2,'02a-plus':.35,'02b-salut':.7,'03a-frederic':.45,'03b-decrochent':.7,'04a-notion':.25,'04b-dessin':.25,
    '04c-video':.9,'04d-coach':.35,'04e-pays':.9,'05a-parents':.35,'05b-suivi':.8,'06a-videos':.45,'06b-visites':.6,'06c-juste':.45,'06d-relire':1.0,
    '07a-trois':.35,'07b-relu':.8,'07f-cadeau':1.0,'08-test':.9,'09-ensemble':.6,'10-budget':6.0};
  const ORDRE=Object.keys(DUR); let t=.4;
  const clips=ORDRE.map(c=>{ const r=[c,+t.toFixed(2)]; t+=DUR[c]+APRES[c]; return r; });
  const A=Object.fromEntries(clips), fin=c=>A[c]+DUR[c];
  const BUDGET=+(A['10-budget']-.3).toFixed(2), CARTON=+(fin('10-budget')+6).toFixed(2), FIN=+(CARTON+5).toFixed(2);

  /* L'instant du n-ième mot « m » d'un clip, d'après films/ulule-cues.js */
  const CL=(window.CUES||{})[VIDEO]||{}, norme=s=>s.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,'');
  function mot(clip,m,n=1){ const l=CL[clip]; if(!l) throw new Error('clip sans instants : '+clip); const c=norme(m); let k=0;
    for(const [tt,w] of l) if(norme(w)===c&&++k===n) return A[clip]+tt;
    throw new Error(`${clip} : mot introuvable « ${m} »`); }

  /* ---- Les écrits : calque HTML au-dessus de la 3D ---- */
  const css=document.createElement('style');
  css.textContent=`
  .ul{position:fixed;z-index:4;box-sizing:border-box;white-space:nowrap;color:#17452a;font-weight:800;font-family:"Segoe UI",system-ui,sans-serif;display:none;transform-origin:50% 50%;}
  .boite{background:#fff;border:7px solid #17452a;border-radius:36px;padding:14px 34px;text-align:center;}
  .fr{display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;line-height:1;margin:0 .08em;}
  .fr b{display:block;padding:0 .12em;}.fr i{display:block;align-self:stretch;height:.09em;min-height:6px;background:currentColor;border-radius:4px;margin:.06em 0;}
  .pastille{display:inline-block;border-radius:999px;padding:8px 30px;background:#f5a50a;color:#fff;}
  #ruban{left:760px;right:40px;top:36px;height:112px;}
  #ruban .ligne{position:absolute;left:50px;right:50px;top:52px;height:10px;border-radius:5px;background:#17452a;opacity:.35;}
  #ruban .arret{position:absolute;top:14px;width:124px;margin-left:-62px;height:84px;border-radius:999px;background:#fff;border:6px solid #17452a;font-size:42px;display:flex;align-items:center;justify-content:center;box-sizing:border-box;}
  #ruban .arret.vu{background:#c7f4a1;}#ruban .arret.jour{background:#f5a50a;color:#fff;border-color:#c2410c;}
  .cadre{border:9px solid #17452a;border-radius:38px;overflow:hidden;background:#000;box-shadow:0 14px 0 rgba(23,69,42,.25);}
  .cadre canvas,.cadre img{display:block;width:100%;height:100%;}
  .trois{left:760px;right:40px;bottom:34px;display:flex;justify-content:center;gap:22px;background:none;}
  .trois span{background:#fff;border:6px solid #17452a;border-radius:28px;padding:8px 26px;font-size:46px;}
  .compteur{width:540px;}.compteur .n{font-size:150px;line-height:1.05;color:#e8590c;font-variant-numeric:tabular-nums;}.compteur .l{font-size:58px;}
  .ceint{display:inline-block;width:50px;height:22px;border-radius:5px;border:3px solid #39424e;vertical-align:middle;margin:0 5px;}
  #pays{left:800px;top:200px;width:1080px;padding:18px 18px 22px;}
  #pays .t{font-size:52px;margin-bottom:16px;}
  #pays .ligneP{display:flex;justify-content:center;align-items:flex-start;gap:18px;}
  #pays .p{display:flex;flex-direction:column;align-items:center;font-size:30px;line-height:1.1;white-space:nowrap;}
  #pays svg{width:120px;height:80px;border:3px solid #17452a;border-radius:8px;margin-bottom:8px;display:block;}
  `;
  document.head.append(css);
  const calque=(id,html,style='')=>{ const d=document.createElement('div'); d.id=id; d.className='ul'; d.innerHTML=html; d.style.cssText+=style; document.body.append(d); return d; };
  const frac=(n,d)=>`<span class="fr"><b>${n}</b><i></i><b>${d}</b></span>`;
  /* Grandit puis retombe à sa taille : pour insister sur ce que la voix dit */
  const pop=(T,t0,d=.45,a=.35)=>{ const u=(T-t0)/d; return u<0?0:(u>=1?1:1+a*Math.sin(u*Math.PI)); };
  function montrer(e,T,de,a,{z=true,base=''}={}){ const v=T>=de&&T<a; e.style.display=v?'block':'none';
    if(v) e.style.transform=`${base} scale(${z?Math.max(.001,pop(T,de,.45,.1)):1})`; return v; }
  /* Un point 3D → pixels de l'écran */
  const ecran=(x,y,z)=>{ const p=new THREE.Vector3(x,y,z).project(camera); return [(p.x+1)/2*1920,(1-p.y)/2*1080]; };

  /* ---- Les images : tout est chargé avant la première image du film ---- */
  window.tiMargoPret=false;
  const charge=src=>{ const i=new Image(); i.src=MEDIA+src; return i; };
  const EXTRAITS=[ /* [classe, dossier, vertical ?] : 2 s à 30 images/s, pris dans des vidéos déjà rendues */
    ['CP','cp',false],['CM','cm',false],['6e','6e',true],['4e','4e',true],['2de','2de',true],['Tle','tle',false]];
  const IMGS=EXTRAITS.map(([,d])=>Array.from({length:60},(_,k)=>charge(`${d}/${String(k+1).padStart(2,'0')}.jpg`)));
  const camembert=charge('budget-camembert.png'), photo=charge('frederic.webp'), capCoach=charge('coach-serie.png'), capParents=charge('parents-suivi.png'), capTablette=charge('coach-tablette.png');
  const TOUTES=[...IMGS.flat(),camembert,photo,capCoach,capParents,capTablette];
  Promise.all(TOUTES.map(i=>i.decode())).then(()=>{ texTablette.image=capTablette; texTablette.needsUpdate=true; window.tiMargoPret=true; })
    .catch(e=>{ console.error('image manquante', e); });

  /* ============ Le décor : un mur clair, un soubassement vert, un parquet ============ */
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(400,400),new THREE.MeshBasicMaterial({color:0xe9c48c})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  for(let i=-30;i<=30;i++){ const l=new THREE.Mesh(new THREE.PlaneGeometry(.035,40),new THREE.MeshBasicMaterial({color:0xcf9f63})); l.rotation.x=-Math.PI/2; l.position.set(i*1.05,-.01,-8); scene3d.add(l); }
  const mur=new THREE.Mesh(new THREE.PlaneGeometry(200,60),new THREE.MeshBasicMaterial({color:0xfff3d6})); mur.position.set(0,20,-4); scene3d.add(mur);
  const bas=new THREE.Mesh(new THREE.PlaneGeometry(200,1.3),new THREE.MeshBasicMaterial({color:0xc9ebd2})); bas.position.set(0,.65,-3.98); scene3d.add(bas);
  const filet=new THREE.Mesh(new THREE.PlaneGeometry(200,.08),new THREE.MeshBasicMaterial({color:0x2f9a3a})); filet.position.set(0,1.3,-3.97); scene3d.add(filet);

  /* ============ Scène 1-2 : les deux pizzas, sur des chevalets ============ */
  const PATE=toon(0xe0a050), SAUCE=toon(0xd9480f), FROMAGE=toon(0xffd866), PEPP=toon(0xb3261e), BASILIC=toon(0x2f9a3a);
  function pizza(n,R,x,y){
    const g=new THREE.Group(); g.position.set(x,y,0); scene3d.add(g);
    const pied=new THREE.Group(); g.add(pied);
    for(const s of [-1,1]) piece(pied,new THREE.CylinderGeometry(.05,.06,y+.2,8),toon(0x8a5a2b),[s*.55,-y/2+.02,-.25],CONTOUR_SOMBRE).rotation.z=-s*.12;
    piece(pied,new THREE.CylinderGeometry(.05,.06,y,8),toon(0x8a5a2b),[0,-y/2,-.5],CONTOUR_SOMBRE).rotation.x=-.3;
    const disque=(parent,th0,thL,seg)=>{ const d=new THREE.Group(); d.rotation.x=Math.PI/2; parent.add(d);
      piece(d,new THREE.CylinderGeometry(R,R,.14,seg,1,false,th0,thL),PATE,[0,0,0],CONTOUR_SOMBRE);
      piece(d,new THREE.CylinderGeometry(R*.88,R*.88,.05,seg,1,false,th0,thL),SAUCE,[0,-.09,0],null);
      piece(d,new THREE.CylinderGeometry(R*.84,R*.84,.04,seg,1,false,th0,thL),FROMAGE,[0,-.115,0],null);
      return d; };
    /* La garniture, posée sur le plan de la pizza (x vers la droite, y vers le haut, z vers nous) */
    const garnir=(parent,th0,thL)=>{ for(let k=0;k<7;k++){ const th=th0+thL*(.18+.64*((k*.37)%1)), r=R*(.3+.45*((k*.61)%1));
        const m=piece(parent,new THREE.CylinderGeometry(R*.13,R*.13,.04,16),k%3===2?BASILIC:PEPP,[r*Math.sin(th),-r*Math.cos(th),.16],null); m.rotation.x=Math.PI/2; } };
    const entiere=new THREE.Group(); g.add(entiere); disque(entiere,0,Math.PI*2,48); garnir(entiere,0,Math.PI*2);
    const parts=[];
    for(let k=0;k<n;k++){ const p=new THREE.Group(); g.add(p); const th0=k*2*Math.PI/n, thL=2*Math.PI/n;
      disque(p,th0,thL,Math.max(8,Math.round(48/n))); garnir(p,th0,thL); const m=th0+thL/2; p.userData.dir=[Math.sin(m),-Math.cos(m)]; parts.push(p); }
    return {g,entiere,parts,x,y};
  }
  const PZ_Y=1.75, pzA=pizza(4,.92,2.85,PZ_Y), pzB=pizza(3,.92,5.2,PZ_Y);
  function poserPizza(pz,T,tCoupe,tPart,perdue){
    const coupee=T>=tCoupe; pz.entiere.visible=!coupee; pz.parts.forEach((p,k)=>{ p.visible=coupee;
      const e=coupee?.09*lisse((T-tCoupe)/.35):0; p.position.set(p.userData.dir[0]*e,p.userData.dir[1]*e,0);
      if(k===perdue&&T>=tPart){ const u=Math.min(1,(T-tPart)/.7); p.position.y-=.9*u*u; p.position.z-=.6*u; p.rotation.z=-1.2*u; p.scale.setScalar(1-u); p.visible=u<1; } });
  }
  /* Le couteau, dans la main droite */
  const couteau=new THREE.Group(); couteau.position.set(0,.02,.1); mainD.g.add(couteau);
  piece(couteau,new THREE.CylinderGeometry(.06,.06,.42,10),toon(0x8a5a2b),[0,0,0],CONTOUR_FIN);
  piece(couteau,new THREE.BoxGeometry(.16,.66,.025),toon(0xdde3ea),[.03,.54,0],CONTOUR_SOMBRE);

  /* ============ Scènes 6-7 : la pile de vidéos, très haute, à côté de Ti Margo ============
     Chaque vidéo est une vignette épaisse, écran coloré et triangle « lecture » : aucun visage, seulement des vidéos. */
  const PILE_N=13, PILE_H=.355, PILE_X=6.3, PILE_Z=-1.0;
  const pile=new THREE.Group(); scene3d.add(pile);
  const triangle=new THREE.Shape(); triangle.moveTo(-.045,-.06); triangle.lineTo(.07,0); triangle.lineTo(-.045,.06); triangle.lineTo(-.045,-.06);
  const ECRANS=[0x3b82f6,0xf59f00,0x2f9e44,0x7048e8,0xe8590c,0x1098ad];
  const vignettes=Array.from({length:PILE_N},(_,k)=>{ const v=new THREE.Group(); pile.add(v);
    const dx=((k*.37)%1-.5)*.16, ry=((k*.61)%1-.5)*.22; v.userData={x:dx,y:.17+k*PILE_H,ry};
    piece(v,new RoundedBoxGeometry(1.7,.32,1.0,2,.03),toon(0x1f2937),[0,0,0],CONTOUR_SOMBRE);
    const e=new THREE.Mesh(new THREE.PlaneGeometry(1.45,.22),new THREE.MeshBasicMaterial({color:ECRANS[k%ECRANS.length]})); e.position.set(0,0,.505); v.add(e);
    const tri=new THREE.Mesh(new THREE.ShapeGeometry(triangle),new THREE.MeshBasicMaterial({color:0xffffff})); tri.position.set(-.45,0,.51); tri.scale.setScalar(1.3); v.add(tri);
    return v; });
  const cadeau=new THREE.Group(); scene3d.add(cadeau);
  piece(cadeau,new RoundedBoxGeometry(1,.8,1,3,.05),toon(0xe03131),[0,.4,0],CONTOUR_SOMBRE);
  piece(cadeau,new RoundedBoxGeometry(1.08,.18,1.08,3,.04),toon(0xc92a2a),[0,.84,0],CONTOUR_SOMBRE);
  piece(cadeau,new THREE.BoxGeometry(.16,.96,1.1),toon(0xf6dc62),[0,.47,0],null);
  piece(cadeau,new THREE.BoxGeometry(1.1,.96,.16),toon(0xf6dc62),[0,.47,0],null);
  for(const s of [-1,1]){ const n=piece(cadeau,new THREE.TorusGeometry(.16,.055,10,24),toon(0xf6dc62),[s*.15,1.04,0],CONTOUR_FIN); n.rotation.set(0,s*.5,s*.6); }

  /* ============ Scène 7 : le paquet cadeau ============ */
  /* ============ Scène 8 : la tablette, avec la vraie page du coach ============ */
  const tablette=new THREE.Group(); scene3d.add(tablette);
  piece(tablette,new RoundedBoxGeometry(2.3,1.78,.09,4,.08),toon(0x1f2937),[0,0,0],CONTOUR_SOMBRE);
  const texTablette=new THREE.Texture(); texTablette.colorSpace=THREE.SRGBColorSpace; texTablette.anisotropy=8;
  const ecranT=new THREE.Mesh(new THREE.PlaneGeometry(2.12,1.59),new THREE.MeshBasicMaterial({map:texTablette})); ecranT.position.z=.05; tablette.add(ecranT);

  /* ============ Les calques écrits ============ */
  const labA=calque('labA',frac(3,4),'font-size:84px;padding:6px 26px;'), labB=calque('labB',frac(2,3),'font-size:84px;padding:6px 26px;'); labA.classList.add('boite'); labB.classList.add('boite');
  const compare=calque('compare',`${frac(3,4)} <span style="color:#e8590c">&gt;</span> ${frac(2,3)}`,'font-size:110px;left:0;top:70px;width:100%;text-align:center;');
  compare.classList.add('boite'); compare.style.cssText+='left:auto;right:90px;width:auto;padding:10px 46px;';
  const nomTi=calque('nomTi','Ti Margo','left:250px;top:70px;font-size:70px;'); nomTi.classList.add('boite');
  const cadreFred=calque('cadreFred','','left:1150px;top:130px;width:330px;height:330px;border-radius:50%;overflow:hidden;border:10px solid #17452a;background:#fff;');
  cadreFred.append(photo); photo.style.cssText='width:100%;height:100%;object-fit:cover;display:block;';
  const nomFred=calque('nomFred','<div style="font-size:76px">Frédéric</div><div style="font-size:50px;color:#2f6f3f">professeur de maths</div>','left:1005px;top:520px;width:600px;'); nomFred.classList.add('boite');
  const l4e=calque('l4e','En 4<sup>e</sup>, beaucoup décrochent','left:900px;top:760px;width:880px;font-size:54px;'); l4e.classList.add('boite');
  const lCP=calque('lCP','Tout commence dès le CP','left:900px;top:890px;width:880px;font-size:54px;color:#e8590c;'); lCP.classList.add('boite');

  const POS=[100,300,500,700,900,1100].map(x=>x/1200*100);
  const ruban=calque('ruban','<div class="ligne"></div>'+EXTRAITS.map(([c],k)=>`<div class="arret" id="ar${k}" style="left:${POS[k]}%">${c}</div>`).join('')+
    '<div id="fleche" style="position:absolute;top:44px;font-size:34px;color:#17452a;opacity:.6"></div>');
  const cadreEx=calque('cadreEx','<canvas id="toileEx"></canvas>'); cadreEx.classList.add('cadre');
  const toile=cadreEx.querySelector('canvas'), ctx=toile.getContext('2d');
  const trois=calque('trois','<span id="t1">1 dessin animé</span><span id="t2">1 vidéo</span><span id="t3">1 coach</span>'); trois.classList.add('trois');
  const cadreCoach=calque('cadreCoach','','left:880px;top:172px;width:900px;height:563px;'); cadreCoach.classList.add('cadre'); cadreCoach.append(capCoach);
  const NOMS_C=['blanche','jaune','orange','verte','bleue','marron','noire'], COUL_C=['#f5f5f5','#facc15','#f97316','#22c55e','#3b82f6','#8b5a2b','#1a1a1a'];
  const ceintures=calque('ceintures',`<span id="cb">ceinture blanche</span> ${COUL_C.map(c=>`<span class="ceint" style="background:${c}"></span>`).join('')} <span id="cn">ceinture noire</span>`,
    'left:780px;width:1100px;top:770px;font-size:40px;padding:12px 10px;'); ceintures.classList.add('boite');

  /* Les drapeaux, dessinés en SVG (aucune image externe) */
  const etoile=(cx,cy,R,attr)=>{ const pts=[]; for(let i=0;i<5;i++){ const a=-Math.PI/2+i*4*Math.PI/5; pts.push((cx+R*Math.cos(a)).toFixed(2)+','+(cy+R*Math.sin(a)).toFixed(2)); } return `<polygon points="${pts.join(' ')}" ${attr}/>`; };
  const bandes=(a,b,c)=>`<rect width="40" height="80" fill="${a}"/><rect x="40" width="40" height="80" fill="${b}"/><rect x="80" width="40" height="80" fill="${c}"/>`;
  const svg=(x,w=120)=>`<svg viewBox="0 0 ${w} 80" preserveAspectRatio="none">${x}</svg>`;
  const PAYS=[
    ['France',svg(bandes('#002395','#fff','#ed2939'))],
    ['Belgique',svg(bandes('#000','#fae042','#ed2939'))],
    ['Suisse',svg('<rect width="120" height="80" fill="#da291c"/><rect x="52" y="16" width="16" height="48" fill="#fff"/><rect x="36" y="32" width="48" height="16" fill="#fff"/>')],
    ['Québec',svg('<rect width="120" height="80" fill="#003da5"/><rect x="52" width="16" height="80" fill="#fff"/><rect y="32" width="120" height="16" fill="#fff"/>'+
      [[26,16],[94,16],[26,64],[94,64]].map(([x,y])=>`<g transform="translate(${x},${y})" fill="#fff"><ellipse rx="3.2" ry="9"/><ellipse cx="-6" cy="1" rx="2.6" ry="6.5" transform="rotate(-28 -6 1)"/><ellipse cx="6" cy="1" rx="2.6" ry="6.5" transform="rotate(28 6 1)"/><rect x="-8" y="3" width="16" height="2.6"/></g>`).join(''))],
    ['Maroc',svg('<rect width="120" height="80" fill="#c1272d"/>'+etoile(60,42,22,'fill="none" stroke="#006233" stroke-width="3.6" stroke-linejoin="round"'))],
    ['Sénégal',svg(bandes('#00853f','#fdef42','#e31b23')+etoile(60,41,11,'fill="#00853f"'))],
    ['Côte<br>d’Ivoire',svg(bandes('#f77f00','#fff','#009e60'))]];
  const pays=calque('pays','<div class="t">Le programme de ton pays</div><div class="ligneP">'+PAYS.map(([n,d],i)=>`<div class="p" id="py${i}">${d}<span>${n}</span></div>`).join('')+'</div>'); pays.classList.add('boite');

  const titreSuivi=calque('titreSuivi','Le suivi de votre enfant','left:820px;top:60px;width:1000px;font-size:68px;'); titreSuivi.classList.add('boite');
  const cadreParents=calque('cadreParents','','left:820px;top:240px;width:1000px;height:579px;background:#041b33;'); cadreParents.classList.add('cadre'); cadreParents.append(capParents);
  const vraiSuivi=calque('vraiSuivi','Pas des fiches en plus : <span style="color:#2f9a3a">un vrai suivi</span>','left:800px;top:870px;width:1040px;font-size:50px;padding:14px 10px;'); vraiSuivi.classList.add('boite');

  const cV=calque('cV','<div class="n" id="nV">0</div><div class="l">vidéos</div>','left:760px;top:150px;'); cV.classList.add('boite','compteur');
  const cJ=calque('cJ','<div class="n" id="nJ">0</div><div class="l">visites par jour</div>','left:1320px;top:150px;'); cJ.classList.add('boite','compteur');
  const sansPub=calque('sansPub','sur eleveai.fr, sans aucune publicité','left:760px;top:560px;width:1100px;font-size:52px;'); sansPub.classList.add('boite');
  const erreur=calque('erreur','Chaque vidéo doit être <span style="color:#2f9a3a">juste</span>','left:720px;top:900px;width:1140px;font-size:52px;'); erreur.classList.add('boite');

  /* « 3 000 € » en grand, « = tous les dessins animés du collège » dessous, plus petit */
  const mille=calque('troisMille','<div style="font-size:110px;line-height:1.05;color:#e8590c">3 000 €</div><div id="milleSuite" style="font-size:42px;line-height:1.2">= tous les dessins animés<br>du collège</div>','left:720px;top:40px;width:600px;padding:12px 20px 16px;'); mille.classList.add('boite');
  const relues=calque('relues','✅ Relus par un futur professeur','left:720px;top:900px;width:1000px;font-size:52px;'); relues.classList.add('boite');
  const coches=Array.from({length:PILE_N},(_,k)=>calque('ck'+k,'✅','font-size:58px;line-height:1;'));
  const dix=calque('dix','<div style="font-size:94px;line-height:1.1"><span style="color:#e8590c">4,95 €</span> = 1 mois</div><div style="font-size:62px">🎁 à offrir</div>','left:960px;top:100px;width:900px;padding:18px 20px;'); dix.classList.add('boite');
  const enfants=calque('enfants','à ton enfant… ou à tes petits-enfants','left:960px;top:400px;width:900px;font-size:44px;padding:14px 10px;'); enfants.classList.add('boite');

  const adresse=calque('adresse','<div style="font-size:38px;color:#2f6f3f">Fais le test :</div><div style="font-size:70px;border:7px solid #f5a50a;border-radius:26px;padding:4px 18px;margin:8px 0 14px">eleveai.fr/coach</div><div style="font-size:52px">gratuit, sans compte</div>',
    'left:1170px;top:300px;width:700px;padding:22px 20px;'); adresse.classList.add('boite');

  const ensemble=calque('ensemble','Alors&nbsp;? On les finit ensemble&nbsp;?','left:360px;top:40px;width:1200px;font-size:70px;'); ensemble.classList.add('boite');
  const budget=calque('budget','','left:500px;top:86px;width:1360px;height:901px;border-radius:30px;'); budget.classList.add('cadre'); budget.style.background='#fff'; budget.append(camembert);
  const carton=calque('carton','<div style="font-size:68px;line-height:1.15">Ti Margo :<br>les maths en dessin animé</div><div class="pastille" style="font-size:64px;margin-top:30px">Soutenez-nous sur Ulule</div><div style="font-size:44px;margin-top:22px;color:#2f6f3f">eleveai.fr</div>',
    'left:830px;top:170px;width:1000px;padding:40px 30px;'); carton.classList.add('boite');

  /* ============ Les instants ============ */
  const tTq=mot('01a-pizzas','Trois'), tDt=mot('01a-pizzas','deux'), tCoupe=mot('01b-coupe','coupe'), tCoupeA=tCoupe+.55, tCoupeB=tCoupe+1.2;
  const tTombe=fin('01b-coupe')+.2, tPlus=mot('02a-plus','plus'), tTq2=mot('02a-plus','Trois'), tSalut=mot('02b-salut','Salut'), tMargo=mot('02b-salut','Ti');
  const tLui=mot('03a-frederic','Lui'), tFred=mot('03a-frederic','Frédéric'), tProf=mot('03a-frederic','professeur'), t4e=mot('03b-decrochent','quatrieme'), tCP=mot('03b-decrochent','dès');
  const tR0=A['04a-notion'], tR1=fin('04c-video'), PAS_R=(tR1-tR0)/6;
  const tDA=mot('04b-dessin','Un'), tVid=mot('04c-video','Une'), tCoach=mot('04d-coach','coach'), tBl=mot('04d-coach','blanche'), tNo=mot('04d-coach','noire');
  const tPays=A['04e-pays'], tProg=mot('04e-pays','programme'), tPart=mot('04e-pays','partout'), tFr=mot('04e-pays','français');
  const tParents=mot('05a-parents','parents'), tSuivi=mot('05b-suivi','Pas');
  const tV=mot('06a-videos','mille'), tJ=mot('06b-visites','Cinq'), tPub=mot('06b-visites','eleveai'), tErreur=A['06c-juste'], tErr=mot('06c-juste','chaque'), tRelire=A['06d-relire'];
  const t7=A['07a-trois'], tTous=mot('07a-trois','tous'), tRel=mot('07b-relu','relu'), tFutur=mot('07b-relu','professeur'), tCad=A['07f-cadeau'], tDix=mot('07f-cadeau','quatre'), tPetits=mot('07f-cadeau','petits-enfants');
  const tMille=mot('07a-trois','trois'), tCoche=k=>tRel+.05+(tFutur+.4-tRel)*k/(PILE_N-1);
  const tTest=A['08-test'], tAdr=mot('08-test','eleveai'), tGrat=mot('08-test','gratuit'), tFin=A['09-ensemble'];
  const S2=A['02a-plus'], S3=A['03a-frederic']-.2, S4=tR0-.2, S5=A['05a-parents']-.25, S6=A['06a-videos']-.25, S7=t7-.3, S8=tTest-.3, S9=tFin-.25;
  const cuts=[S3,S4,S5,S6,S7,S8,S9,BUDGET,CARTON];

  return {
    clips, FIN, titre:'', ceinture:0, finTitre:0, groupes:[], question:{}, finClip:null, cuts,
    jouer(P,T,c){
      const dans=(a,b)=>T>=a&&T<b;
      c.x=2.7; c.y=1.75; c.d=8.2; c.e=.08;
      scene.ry=-.12;
      /* Les gestes */
      const ouvre=()=>{ P.gesteD='ouverte'; P.md.set(.86,2.02+Math.sin(T*3)*.06,.5); P.cd.set(.72,1.58,.2); };
      const montre=()=>{ P.gesteD='index'; P.md.set(1.12,2.5+Math.sin(T*3)*.04,.4); P.cd.set(.86,1.85,.12); P.regY=.35; scene.ry=.25; };
      const pouce=()=>{ P.md.set(.95,2.32,.45); P.cd.set(.74,1.7,.14); P.gesteD='pouce'; P.tetZ=-.14; P.paupiere=-1.1; };
      const salut=(u,d=1.6)=>{ const e=lisse(u*4)*lisse((d-u)*4); P.md.set(.88,2.2+.68*e,.28); P.cd.set(.82,1.92,.06); P.gesteD='ouverte'; P.tourneD=Math.sin(T*11)*.42*e; };

      /* ---- Visibilité des objets 3D ---- */
      const s12=T<S3; pzA.g.visible=pzB.g.visible=s12; couteau.visible=T<tTombe;
      pile.visible=dans(tErreur,tCad+1.2); cadeau.visible=dans(tCad-.1,S8); tablette.visible=dans(S8,S9);

      /* ---- Scène 1 : « Trois quarts ou deux tiers… Attends, je coupe ! » ---- */
      if(T<S2){
        scene.ry=.45; P.regY=.3; P.gesteD='poing';
        const chop=dans(tCoupe-.1,tTombe)?Math.abs(Math.sin((T-tCoupe)*7.5)):0;
        P.md.set(1.0,2.0+.55*chop,.55); P.cd.set(.8,1.6,.2);
        if(T<A['01b-coupe']){ P.md.set(.95,1.95+Math.sin(T*2)*.05,.5); P.tetZ=.1; P.regX=-.1; }
      }
      poserPizza(pzA,T,tCoupeA,tTombe,0); poserPizza(pzB,T,tCoupeB,tTombe+.25,2);

      /* ---- Scène 2 : « Trois quarts, c'est plus ! Salut, moi c'est Ti Margo… » ---- */
      if(dans(S2,S3)){
        if(T<tSalut) pouce(); else if(T<tSalut+1.6) salut(T-tSalut); else ouvre();
        if(T<tSalut) { scene.ry=.25; P.regY=.2; }
      }
      const [ax,ay]=ecran(pzA.x,PZ_Y-1.25,0), [bx,by]=ecran(pzB.x,PZ_Y-1.25,0);
      if(montrer(labA,T,tTq,tPlus-.05,{base:'translate(-50%,0)'})) Object.assign(labA.style,{left:ax+'px',top:(ay-5)+'px'});
      if(montrer(labB,T,tDt,tPlus-.05,{base:'translate(-50%,0)'})) Object.assign(labB.style,{left:bx+'px',top:(by-5)+'px'});
      montrer(compare,T,tPlus-.05,S3); compare.style.top='60px';
      montrer(nomTi,T,tMargo,S3);

      /* ---- Scène 3 : Frédéric ---- */
      if(dans(S3,S4)){ if(T<tFred+2.5) montre(); else if(T<t4e) ouvre(); else if(T<tCP){ P.gesteD='ouverte'; P.tetZ=.16; P.paupiere=-1.25; P.md.set(.98,2.0,.5); } else montre(); }
      montrer(cadreFred,T,tLui,S4); montrer(nomFred,T,tFred,S4); montrer(l4e,T,t4e,S4); montrer(lCP,T,tCP,S4);

      /* ---- Scène 4 : le ruban CP → Tle, un vrai extrait à chaque arrêt ---- */
      const r4=dans(S4,S5);
      ruban.style.display=r4?'block':'none';
      const k=Math.max(0,Math.min(5,Math.floor((T-tR0)/PAS_R)));
      if(r4){ EXTRAITS.forEach((_,i)=>{ const e=$('ar'+i), vu=T>=tR0+i*PAS_R; e.classList.toggle('jour',T<tR1&&i===k&&vu); e.classList.toggle('vu',vu&&!(T<tR1&&i===k));
        e.style.transform=(T<tR1&&i===k&&vu)?`scale(${Math.max(1,pop(T,tR0+i*PAS_R)) *1.08})`:''; }); }
      const ex=dans(tR0,A['04d-coach']+.3);
      cadreEx.style.display=ex?'block':'none';
      if(ex){ const [,,vert]=EXTRAITS[k], u=T-(tR0+k*PAS_R), f=Math.min(59,Math.floor(u*30)), im=IMGS[k][f];
        const W=vert?372:960, H=vert?662:540, top=vert?172:226; toile.width=W; toile.height=H; ctx.drawImage(im,0,0,W,H);
        const z=lisse(u/.25); Object.assign(cadreEx.style,{width:W+'px',height:H+'px',left:(1330-W/2)+'px',top:top+'px',transform:`scale(${.85+.15*z})`,opacity:z}); }
      trois.style.display=dans(tDA,S5)?'flex':'none';
      if(trois.style.display!=='none') [['t1',tDA],['t2',tVid],['t3',tCoach]].forEach(([id,tt])=>{ const e=$(id); e.style.visibility=T>=tt?'':'hidden'; e.style.transform=`scale(${Math.max(1,pop(T,tt,.45,.15))})`; });
      if(T>=tR1) trois.style.bottom='34px';
      montrer(cadreCoach,T,A['04d-coach'],tPays-.05,{z:false}); cadreCoach.style.opacity=lisse((T-A['04d-coach'])/.3);
      if(montrer(ceintures,T,tBl,S5)){ $('cn').style.visibility=T>=tNo?'':'hidden'; [...ceintures.querySelectorAll('.ceint')].forEach((e,i)=>e.style.opacity=T>=tBl+(tNo-tBl)*i/6?1:.15); }
      /* « …le programme de ton pays » : la carte des pays remplace la capture du coach, les drapeaux arrivent un à un */
      if(montrer(pays,T,tProg-.1,S5,{z:false})){ pays.style.opacity=lisse((T-tProg+.1)/.3);
        /* la ligne des drapeaux s'ouvre juste avant le premier : jamais de grand blanc sous le titre */
        const lp=pays.querySelector('.ligneP'); lp.style.overflow='hidden'; lp.style.height=(170*lisse((T-tPart+.35)/.35)).toFixed(1)+'px'; $('pays').querySelector('.t').style.marginBottom=(16*lisse((T-tPart+.35)/.35)).toFixed(1)+'px';
        PAYS.forEach((_,i)=>{ const tt=tPart+(tFr-tPart)*i/6, e=$('py'+i); e.style.visibility=T>=tt?'':'hidden'; e.style.transform=`scale(${Math.max(1,pop(T,tt,.45,.12))})`; }); }
      if(r4){ if(T<tR1) montre(); else if(T<tCoach+1) ouvre(); else if(T<tPays) pouce(); else montre(); }

      /* ---- Scène 5 : la vue parent ---- */
      if(dans(S5,S6)){ if(T<tSuivi) montre(); else pouce(); }
      montrer(titreSuivi,T,tParents,S6); montrer(cadreParents,T,A['05a-parents'],S6,{z:false}); cadreParents.style.opacity=lisse((T-A['05a-parents'])/.3); montrer(vraiSuivi,T,tSuivi,S6);

      /* ---- Scène 6 : deux compteurs, puis la pile de vidéos qui monte : Ti Margo est débordé ---- */
      const compte=(id,t0,n)=>{ const u=lisse((T-t0)/1.3), v=Math.round(n*u); $(id).textContent=v.toLocaleString('fr-FR').replace(/ | /g,' '); };
      const s6=dans(S6,S7);
      montrer(cV,T,tV,tErreur,{z:false}); montrer(cJ,T,tJ,tErreur,{z:false}); compte('nV',tV,1500); compte('nJ',tJ,500);
      cV.style.transform=`scale(${Math.max(1,pop(T,tV+1.3,.45,.12))})`; cJ.style.transform=`scale(${Math.max(1,pop(T,tJ+1.3,.45,.12))})`;
      montrer(sansPub,T,tPub,tErreur); montrer(erreur,T,tErr,S7);
      /* les vignettes tombent une à une sur la pile ; elle vacille pendant « seul, Frédéric ne peut pas tout relire » */
      const recul=lisse((T-tCad+.3)/.8);
      pile.position.set(PILE_X+6*recul,0,PILE_Z); pile.rotation.z=dans(tRelire,S7)?Math.sin(T*5)*.025:0;
      vignettes.forEach((v,k)=>{ const u=lisse((T-tErreur-.1-k*.1)/.3), d=v.userData; v.visible=u>0; v.position.set(d.x,d.y+2.5*(1-u),0); v.rotation.y=d.ry; });
      if(s6){ if(T<tErreur) { if(T<tJ) montre(); else pouce(); }
        else { c.y=2.05; montre(); P.regY=.3; scene.ry=.3;
          if(T>=tRelire){ P.gesteD='ouverte'; P.paupiere=-1.25; P.md.set(.98,2.3,.5); P.mg.set(-.98,2.3,.5); P.cd.set(.82,1.7,.2); P.cg.set(-.82,1.7,.2); scene.ry=.2; P.regY=.1; } } }

      /* ---- Scène 7 : 3 000 €, chaque vidéo de la pile reçoit sa coche ; Ti Margo saute de joie ; le paquet cadeau ---- */
      const zc=pop(T,tCad+.2,.6); cadeau.scale.setScalar(Math.min(zc,1.25)); cadeau.position.set(3.05,0,.5); cadeau.rotation.y=-.3+Math.sin(T*2)*.05;
      if(dans(S7,S8)){ c.y=2.05;
        if(T<tRel){ montre(); }
        else if(T<tCad-.3){ ACTIONS.saut.f((T-tRel)%1.5,P); scene.ry=.25; }
        else if(T<tPetits) montre(); else pouce();
      }
      montrer(mille,T,tMille,tCad-.1);
      { const su=$('milleSuite'); su.style.visibility=T>=tTous?'':'hidden'; su.style.overflow='hidden'; su.style.height=(102*lisse((T-tTous+.3)/.3)).toFixed(1)+'px'; } montrer(relues,T,tRel,tCad-.1);
      coches.forEach((e,k)=>{ const tt=tCoche(k), v=T>=tt&&T<tCad-.1; e.style.display=v?'block':'none';
        if(v){ const d=vignettes[k].userData, [x,y]=ecran(PILE_X+d.x+.25,d.y,PILE_Z+.52); Object.assign(e.style,{left:(x-29)+'px',top:(y-29)+'px',transform:`scale(${Math.max(.001,pop(T,tt,.4,.45))})`}); } });
      montrer(dix,T,tDix,S8); montrer(enfants,T,tPetits-.6,S8);

      /* ---- Scène 8 : la tablette, l'adresse ---- */
      if(dans(S8,S9)){ c.x=2.6; c.y=1.85; c.d=7.4;
        tablette.position.set(2.1,1.95,.75); tablette.rotation.set(-.05,-.22,0);
        P.gesteD='ouverte'; P.md.set(1.05,1.75,.75); P.cd.set(.8,1.45,.4); P.tetY=.25; P.regY=.25; scene.ry=.1;
        if(T>=tAdr&&T<tGrat+1){ P.mg.set(-.86,2.25,.4); } }
      montrer(adresse,T,tAdr,S9);

      /* ---- Scène 9 : « Alors ? On les finit ensemble ? », puis le carton ---- */
      /* « Alors ? On les finit ensemble ? » : Ti Margo saute de joie, les bras grands ouverts */
      if(dans(S9,BUDGET)){ c.x=0; c.y=2.55; c.d=9.2; scene.ry=-.05; P.regX=0; P.regY=0;
        P.gesteD='ouverte'; P.md.set(1.2,2.45,.4); P.mg.set(-1.2,2.45,.4); P.cd.set(.9,1.9,.2); P.cg.set(-.9,1.9,.2);
        const u=T-tFin; if(u>=0&&u<3) ACTIONS.saut.f(u%1.5,P); else P.jaw=.6; }
      montrer(ensemble,T,tFin,BUDGET);
      /* ---- Le camembert du budget : la phrase, puis 6 s pour le lire ; un petit Ti Margo le montre ---- */
      if(dans(BUDGET,CARTON)){ c.x=5.6; c.y=3.05; c.d=11; montre(); P.regY=.4; scene.ry=.35; }
      montrer(budget,T,BUDGET,CARTON,{z:false}); budget.style.opacity=lisse((T-BUDGET)/.3);
      if(T>=CARTON){ c.x=2.7; c.y=1.75; c.d=8.2; salut((T-CARTON-.4)%2.6,2.6); }
      montrer(carton,T,CARTON+.15,FIN+1);
    }
  };
};
