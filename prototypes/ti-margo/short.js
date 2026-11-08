/* ============================================================
   LE CADRE D'UN SHORT 9:16 : ?video=<épisode>. Tout dépend de l'instant T (s) ;
   chaque mot écrit suit les instants mesurés sur la voix (films/<série>-cues.js).
   Commun : calques, titre et ceinture, carte question, écran de fin, bouche, caméra.
   Propre à chaque film : FILMS[<épisode>], dans films/<série>.js.
   Mode d'emploi : LISEZ-MOI.md
   ============================================================ */
const VIDEO=new URLSearchParams(location.search).get('video'); const MODE_VIDEO=!!VIDEO;
/* Format : vertical 1080×1920 par défaut ; ?format=paysage donne 1920×1080 (le JSON de la série dit "format": "paysage") */
const PAYSAGE=new URLSearchParams(location.search).get('format')==='paysage', LARGEUR=PAYSAGE?1920:1080, HAUTEUR=PAYSAGE?1080:1920;
if(!MODE_VIDEO) requestAnimationFrame(boucle);

const lisse=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};
const FILMS={};

function preparerVideo(){
  document.body.classList.add('video');
  document.getElementById('barre').style.display='none';
  controls.enabled=false;
  scene.video=true; scene.taille=.9;
  let graineV=12345; Math.random=()=> (graineV=(graineV*16807)%2147483647)/2147483647;

  const css=document.createElement('style');
  css.textContent=`
  body.video{background:linear-gradient(#a9dcf5 0%,#e6f6ff 62%,#fdf3d4 62%);}
  body.video canvas{z-index:2;}
  .cv{position:fixed;z-index:3;color:#17452a;font-weight:800;}
  #legende,#fin,#carte,#panneau{z-index:5;}
  #legende{left:50px;right:50px;top:150px;background:#fff;border:7px solid #17452a;border-radius:44px;padding:22px 30px;font-size:62px;line-height:1.16;text-align:center;text-wrap:balance;}
  #legende .ligne{display:block;}
  #titre{left:50px;right:50px;top:50px;text-align:center;font-size:76px;line-height:1.1;background:#fff;border:7px solid #17452a;border-radius:36px;padding:10px 0;}
  #echelle{left:50px;right:50px;top:180px;display:flex;justify-content:center;align-items:center;gap:14px;background:#fff;border:5px solid #17452a;border-radius:30px;padding:14px 18px 6px;flex-wrap:wrap;}
  .ceinture{width:96px;height:24px;border-radius:5px;border:3px solid #39424e;position:relative;opacity:.45;}
  .ceinture::after{content:"";position:absolute;left:34px;top:-7px;width:22px;height:32px;background:inherit;border:3px solid #39424e;border-radius:4px;}
  .ceinture.jour{opacity:1;width:150px;height:38px;}.ceinture.jour::after{left:58px;top:-8px;height:48px;width:28px;}
  #nomCeinture{width:100%;text-align:center;font-size:38px;margin-top:6px;}
  #carte{left:44px;right:44px;top:60px;background:#fff;border:7px solid #17452a;border-radius:44px;padding:22px 30px;display:none;text-align:center;}
  #carte .tete{display:inline-block;background:#f5a50a;border-radius:999px;padding:6px 36px;font-size:56px;margin-bottom:12px;}
  #carte .q{font-size:60px;line-height:1.14;margin-bottom:14px;min-height:64px;}
  .choix{display:flex;align-items:center;gap:22px;font-size:62px;border:5px solid #17452a;border-radius:26px;padding:4px 22px;margin:8px 10px;text-align:left;background:#fff;}
  .choix b{display:inline-flex;justify-content:center;align-items:center;width:80px;height:80px;border-radius:50%;background:#17452a;color:#fff;flex:none;}
  .choix.bon{background:#c7f4a1;border-color:#2f9a3a;}.choix.bon b{background:#2f9a3a;}
  .choix.pale{opacity:.35;}
  #pause{font-size:54px;margin-top:12px;min-height:64px;}
  #rebours{height:34px;border-radius:17px;background:#e4efe0;margin:12px 30px 2px;overflow:hidden;display:none;}
  #rebours i{display:block;height:100%;background:#f5a50a;}
  #panneau{left:44px;right:44px;bottom:120px;background:#fff;border:7px solid #17452a;border-radius:40px;padding:12px 18px;display:none;}
  #formule{font-size:82px;text-align:center;white-space:nowrap;line-height:1.2;min-height:100px;margin-top:6px;}
  .neg{color:#d9480f;}.pos{color:#1971c2;}.ok{color:#2f9a3a;}
  #fin{left:60px;right:60px;top:70px;background:#fff;border:7px solid #17452a;border-radius:44px;padding:28px;text-align:center;display:none;font-size:62px;line-height:1.2;}
  #fin .site{display:inline-block;margin:8px 0 18px;border:7px solid #f5a50a;border-radius:24px;padding:6px 34px;font-size:92px;}
  #fin .chaine{font-size:50px;color:#2f6f3f;}
  #fin .geste{display:flex;justify-content:center;align-items:center;gap:22px;margin:6px 0;}
  #fin .ico{font-size:72px;line-height:1;}
  .mot{visibility:hidden;}.mot.vu{visibility:visible;}`;
  document.head.append(css);
  const el=(id,html='',parent=document.body)=>{const d=document.createElement('div');d.id=id;d.className='cv';d.innerHTML=html;parent.append(d);return d;};
  const $=id=>document.getElementById(id);
  const COUL=['#f5f5f5','#facc15','#f97316','#22c55e','#3b82f6','#8b5a2b','#1a1a1a'], NOMS=['blanche','jaune','orange','verte','bleue','marron','noire'];

  const legende=el('legende');
  const carte=el('carte',`<div class="tete" id="ct"></div><div class="q" id="cq"></div>
    <div class="choix" id="cA"><b>A</b><span></span></div><div class="choix" id="cB"><b>B</b><span></span></div><div class="choix" id="cC"><b>C</b><span></span></div>
    <div id="rebours"><i></i></div><div id="pause"></div>`);
  const panneau=el('panneau');
  const fin=el('fin',`<div id="f1">Entraîne-toi sur</div><div class="site" id="f2">eleveai.fr</div>
    <div class="geste" id="f3"><span class="ico">👍</span><span>Mets un pouce</span></div>
    <div class="geste" id="f4"><span>Abonne-toi !</span></div><div class="chaine" id="f5">@eleveai974</div>
    <div class="geste" id="f6"><span class="ico">🔔</span><span>Active la cloche</span></div>`);

  /* ---- Texte : un mot n'apparaît que quand la voix le dit (avance 0 s) ---- */
  function mots(cont,phrases,T){
    if(cont._cle!==phrases){ cont._cle=phrases; cont.innerHTML='';
      /* Une phrase peut porter un 4e élément : l'instant exact de chaque mot */
      cont._m=[]; for(const [a,b,t,exact] of phrases){ const li=document.createElement('span'); li.className='ligne'; let av=0;
        t.split(' ').forEach((w,i)=>{ const sp=document.createElement('span'); sp.className='mot'; sp.textContent=w+' '; li.append(sp); cont._m.push({sp,t:exact?exact[i]:a+(b-a)*av/t.length}); av+=w.length+1; });
        cont.append(li); } }
    for(const m of cont._m) m.sp.classList.toggle('vu',T>=m.t);
  }
  /* Une formule en jetons : [[instant, texte, classe], …] */
  function jetons(cont,liste,T){
    if(cont._cle!==liste){ cont._cle=liste; cont.innerHTML=''; cont._m=liste.map(([t,s,c])=>{ const sp=document.createElement('span'); sp.className='mot '+(c||''); sp.innerHTML=s; cont.append(sp); return {sp,t}; }); }
    for(const m of cont._m) m.sp.classList.toggle('vu',T>=m.t);
  }

  const outils={ el,$,mots,jetons,legende,carte,panneau,fin,lisse };
  const film=FILMS[VIDEO](outils);
  const CL=(window.CUES||{})[VIDEO]||{};
  const A=Object.fromEntries(film.clips.map(([c,t])=>[c,t]));
  window.tiMargoClips=film.clips; window.tiMargoFin=film.FIN; window.tiMargoTics=film.tics||[];

  /* La bouche bouge quand la voix parle, et seulement alors (d'après les instants des mots) */
  const PAROLE=[];
  for(const [c,t0] of film.clips){ const l=CL[c]||[]; let a=null,p=null;
    for(const [t] of l){ if(a===null){a=t;} else if(t-p>.62){ PAROLE.push([t0+a,t0+p+.42]); a=t; } p=t; }
    if(a!==null) PAROLE.push([t0+a,t0+p+.42]); }
  const parle=T=>PAROLE.some(p=>T>=p[0]&&T<=p[1]);

  /* Titre et ceinture */
  const titre=el('titre',film.titre);
  const echelle=el('echelle',COUL.map((c,i)=>`<span class="ceinture${i===film.ceinture?' jour':''}" style="background:${c}"></span>`).join('')+`<div id="nomCeinture">Ceinture ${NOMS[film.ceinture]}</div>`);

  /* Les plans */
  let camX=0,camY=1.4,camZ=0,camD=13,camE=.1,dernierT=-1;
  const CUTS=film.cuts||[];

  window.tiMargoFilm=function(P,T){
    const couper=CUTS.some(c=>dernierT<c&&T>=c)||dernierT<0;
    scene.couper=couper; dernierT=T;
    P.jaw=parle(T)?.24+.42*Math.abs(Math.sin(T*9.3)*Math.sin(T*3.7+1)):.2;
    scene.x=0; scene.y=0; scene.z=0; scene.ry=-.12; scene.ySol=0; scene.cacherOmbre=false; scene.sansCrayon=true; scene.taille=.9;
    const c={x:0,y:1.4,z:0,d:13,e:.1};
    film.jouer(P,T,c,A);

    const kc=couper?1:.1; camX+=(c.x-camX)*kc; camY+=(c.y-camY)*kc; camZ+=(c.z-camZ)*kc; camD+=(c.d-camD)*kc; camE+=(c.e-camE)*kc;
    camera.fov=40; camera.near=Math.max(.1,camD*.06); camera.far=Math.max(3000,camD*8); camera.updateProjectionMatrix();
    camera.position.set(camX,camY+Math.sin(camE)*camD,camZ+Math.cos(camE)*camD); camera.lookAt(camX,camY,camZ);

    /* Titre pendant l'accroche, légendes */
    const dansTitre=T<film.finTitre;
    titre.style.display=echelle.style.display=dansTitre?'':'none';
    const gr=film.groupes.find(g=>T>=g.de&&T<g.a);
    legende.style.display=gr?'':'none';
    if(gr){ legende.style.top=gr.top+'px'; legende.style.fontSize=(gr.fs||62)+'px'; mots(legende,gr.phrases,T); }

    /* Carte question, puis réponse */
    const Q=film.question, q=T>=A[Q.qc]&&T<A[Q.rc], r=T>=A[Q.rc]&&T<Q.finR;
    carte.style.display=(q||r)?'block':'none';
    const ids=['cA','cB','cC'], tq=T-A[Q.qc], tr=T-A[Q.rc];
    if(q){
      $('ct').textContent='Question !'; $('ct').style.visibility=tq>=.1?'':'hidden'; $('cq').style.fontSize='';
      mots($('cq'),Q.phrase,T);
      ids.forEach((id,i)=>{ const e=$(id), [s,t1,t2]=Q.choix[i]; e.style.visibility=tq>=t1?'':'hidden'; e.lastElementChild.innerHTML=s; e.lastElementChild.style.visibility=tq>=t2?'':'hidden'; e.classList.remove('bon','pale'); e.style.transform=''; });
      mots($('pause'),Q.pause,T);
      const reb=T>=Q.cpt&&T<Q.cpt+3; $('rebours').style.display=reb?'':'none';
      if(reb) $('rebours').firstChild.style.width=(100*(1-(T-Q.cpt)/3))+'%';
    }
    if(r){
      jetons($('ct'),Q.tete,T); $('ct').style.visibility='';
      $('cq').style.fontSize='64px'; mots($('cq'),Q.reponse,T); mots($('pause'),Q.suite,T); $('rebours').style.display='none';
      ids.forEach((id,i)=>{ const e=$(id); e.style.visibility=''; e.lastElementChild.style.visibility=''; e.classList.toggle('pale',i!==Q.bonne&&tr>=Q.tBon); e.classList.toggle('bon',i===Q.bonne&&tr>=Q.tBon); });
      const z=tr<Q.tBon?1:1+.14*Math.sin(Math.min(1,(tr-Q.tBon)/.8)*Math.PI); $(ids[Q.bonne]).style.transform=`scale(${z})`;
    }

    /* Écran de fin */
    const f=T>=A[film.finClip]; fin.style.display=f?'block':'none';
    if(f){ const t=T-A[film.finClip]; for(const [id,d] of [['f1',.1],['f2',1.15],['f3',2.35],['f4',3.33],['f5',3.33],['f6',4.14]]) $(id).style.visibility=t>=d?'':'hidden'; }
  };
  action={nom:'film',t:0,def:{d:1e9,f:(t,P)=>window.tiMargoFilm(P,window.tiMargoT)}};
  renderer.setPixelRatio(1); renderer.setSize(LARGEUR,HAUTEUR); camera.aspect=LARGEUR/HAUTEUR; camera.updateProjectionMatrix();
}

/* ---- Décor commun : le sol et des projecteurs, de xMin à xMax ---- */
function poserStudio({couleurSol=0xefe3c2,xMin=-12,xMax=12,ecart=2,z=-3.4}={}){
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(9000,9000),new THREE.MeshBasicMaterial({color:couleurSol})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  const metal=new THREE.MeshBasicMaterial({color:0x4b5563}), jaune=new THREE.MeshBasicMaterial({color:0xffe08a});
  for(let x=xMin;x<=xMax;x+=ecart){ const g=new THREE.Group(); g.position.set(x,0,z);
    const pied=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,4.6,10),metal); pied.position.y=2.3; g.add(pied);
    const tetePr=new THREE.Mesh(new THREE.CylinderGeometry(.3,.42,.6,14),metal); tetePr.position.set(0,4.75,.1); tetePr.rotation.x=1.15; g.add(tetePr);
    const lum=new THREE.Mesh(new THREE.CircleGeometry(.36,16),jaune); lum.position.set(0,4.62,.38); lum.rotation.x=-.42; g.add(lum);
    scene3d.add(g); }
}

/* Appelé par page.html quand le film est chargé */
function demarrerTiMargo(){
  if(MODE_VIDEO){ if(!FILMS[VIDEO]) throw new Error('Film inconnu : '+VIDEO); preparerVideo(); }
  /* Pour vérifier une pose précise et, plus tard, exporter des images vers une vidéo */
  window.tiMargo={ jouer, lancerScene, arreterScene, avancer(sec){ for(let i=0;i<sec*60;i++) pas(1/60); renderer.render(scene3d,camera); }, camera, controls,
    /* Vidéo : image(T) avance de deux pas de 1/60 s (30 images/s) ; aller(T) saute à T pour un contrôle */
    image(T){ for(const d of [-1/60,0]){ window.tiMargoT=T+d; pas(1/60); scene.couper=false; } renderer.render(scene3d,camera); },
    aller(T){ for(let t=Math.max(0,T-1.5);t<T;t+=1/30) this.image(t); this.image(T); } };
}
