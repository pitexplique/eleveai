/* Série « cadeau » : le short de la CARTE CADEAU Ti Margo (11/11/2026, Noël).
   Voix validée par Frédéric (manim/voix/cadeau-noel-short.json), 8 phrases.
   Pas de question-pause ni de ceinture : c'est un short de collecte, pas une leçon.
   Pas de numéro de téléphone à l'écran (vidéo publique) ; la carte montrée porte un code d'exemple
   MARGO-XXXX-XXXX (aucun vrai code dans la vidéo). Image : manim/sorties/ti-margo/cadeau-noel/_media/carte.png,
   faite par scripts/carte-cadeau-code.py. Outils recopiés de films/monde.js (voixDe, enchainer, gestes). */

function voixDe(A){
  const CL=(window.CUES||{})[VIDEO]||{}, norme=s=>s.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,'');
  function dit(clip){ const l=CL[clip]; if(!l) throw new Error('clip sans instants : '+clip); let i=0;
    return txt=>{ const toks=txt.split(' '), tm=[]; let av=null;
      toks.forEach((w,k)=>{ const n=norme(w); if(!n){ tm.push(av); return; }
        if(i>=l.length) throw new Error(`${clip} : plus de mots pour « ${txt} »`);
        const c=norme(l[i][1]); if(!c.includes(n)&&!n.includes(c)) throw new Error(`${clip} : écrit « ${w} », dit « ${l[i][1]} »`);
        av=A[clip]+l[i][0]; tm.push(av);
        const suit=toks[k+1]?norme(toks[k+1]):''; const double=l[i+1]&&l[i+1][1]===l[i][1]&&l[i][1].includes(' ');
        i+=double&&!(suit&&norme(l[i+1][1]).includes(suit))?2:1; });
      return [tm[0],tm[tm.length-1],txt,tm]; }; }
  function mot(clip,m,n=1){ const l=CL[clip], c=norme(m); let k=0;
    for(const [t,w] of l) if(w.split(/\s+/).some(x=>norme(x)===c)&&++k===n) return A[clip]+t;
    throw new Error(`${clip} : mot introuvable « ${m} »`); }
  return {dit,mot};
}
function enchainer(depart,liste,DUR,apres={},ecart=.35){ let t=depart; return liste.map(c=>{ const r=[c,+t.toFixed(2)]; t+=DUR[c]+(apres[c]??ecart); return r; }); }
function gestes(P,T){ return {
  ouvre(){ P.gesteD='ouverte'; P.md.set(.86,2.02+Math.sin(T*3)*.06,.5); P.cd.set(.72,1.58,.2); P.tetY=.08+Math.sin(T*1.7)*.07; },
  montre(){ P.gesteD='index'; P.md.set(1.02,2.72+Math.sin(T*3)*.04,.42); P.cd.set(.86,1.95,.1); P.tetX=-.1; P.regX=-.2; P.regY=.25; },
  pouce(){ P.md.set(.95,2.32,.45); P.cd.set(.74,1.7,.14); P.gesteD='pouce'; P.tetZ=-.14; P.paupiere=-1.1; },
  reflechit(){ P.md.set(.44,2.3,.72); P.cd.set(.78,1.78,.34); P.gesteD='ouverte'; P.tetZ=.15; P.tetX=-.1; P.regX=-.28; P.regY=.35; P.qSway=Math.sin(T*3)*.3; },
  salut(t,d=1.4){ const e=lisse(t*4)*lisse((d-t)*4); P.md.set(.88,2.2+.68*e,.28); P.cd.set(.82,1.92,.06); P.gesteD='ouverte'; P.tourneD=Math.sin(T*11)*.42*e; },
  fier(){ P.gesteD='pouce'; P.md.set(.9,2.5+Math.sin(T*4)*.05,.45); P.cd.set(.74,1.8,.14); P.tetZ=-.1; P.tetY=Math.sin(T*2)*.1; }
}; }

FILMS.noel=function({$,legende,panneau,carte:carteQ,fin}){
  const ORDRE=['00-noel','01-offre','02-carte','03-defi','04-prix','05-cinquante','06-site','07-commentaire'];
  const DUR={'00-noel':3.68,'01-offre':2.965,'02-carte':7.255,'03-defi':3.335,'04-prix':2.65,'05-cinquante':5.98,'06-site':4.27,'07-commentaire':4.03};
  const clips=enchainer(.5,ORDRE,DUR,{'00-noel':.5,'01-offre':.6,'05-cinquante':.8,'07-commentaire':1});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A), fin_=c=>A[c]+DUR[c];
  const FIN=+(fin_('07-commentaire')+2.6).toFixed(2);
  panneau.style.display='none'; fin.style.display='none';

  /* ---- Les instants ---- */
  const tOffre=mot('01-offre','Offre'), tAnime=mot('01-offre','animé');
  const tAn=mot('02-carte','an'), tDessins=mot('02-carte','dessins'), tCoach=mot('02-carte','coach');
  const tCode=mot('03-defi','code'), tDefi=mot('03-defi','défi');
  const tCarte1=mot('04-prix','carte'), t20=mot('04-prix','20');
  const t50=mot('05-cinquante','50'), tFinir=mot('05-cinquante','finir'), tEleves=mot('05-cinquante','élèves');
  const tPour=mot('06-site','Pour'), tSite=mot('06-site','éleveai');
  const tEcris=mot('07-commentaire','écris'), tQui=mot('07-commentaire','qui');

  /* ---- Le décor : un salon, le sapin à droite, le cadeau devant ---- */
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(400,400),new THREE.MeshBasicMaterial({color:0xe9c48c})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  for(let i=-30;i<=30;i++){ const l=new THREE.Mesh(new THREE.PlaneGeometry(.035,40),new THREE.MeshBasicMaterial({color:0xcf9f63})); l.rotation.x=-Math.PI/2; l.position.set(i*1.05,-.01,-8); scene3d.add(l); }
  const mur=new THREE.Mesh(new THREE.PlaneGeometry(200,60),new THREE.MeshBasicMaterial({color:0xfff3d6})); mur.position.set(0,20,-4); scene3d.add(mur);
  const bas=new THREE.Mesh(new THREE.PlaneGeometry(200,1.3),new THREE.MeshBasicMaterial({color:0xc9ebd2})); bas.position.set(0,.65,-3.98); scene3d.add(bas);
  const filet=new THREE.Mesh(new THREE.PlaneGeometry(200,.08),new THREE.MeshBasicMaterial({color:0x2f9a3a})); filet.position.set(0,1.3,-3.97); scene3d.add(filet);

  const sapin=new THREE.Group(); sapin.position.set(1.45,0,-2.7); sapin.scale.setScalar(.85); scene3d.add(sapin);
  piece(sapin,new THREE.CylinderGeometry(.18,.22,.6,12),toon(0x8a5a2b),[0,.3,0],CONTOUR_SOMBRE);
  piece(sapin,new RoundedBoxGeometry(.9,.5,.9,3,.05),toon(0xc92a2a),[0,.25,0],CONTOUR_SOMBRE);
  [[1.35,1.3,.95],[1.1,1.15,1.75],[.82,1,2.45],[.55,.85,3.05]].forEach(([r,h,y])=>piece(sapin,new THREE.ConeGeometry(r,h,18),toon(0x2f9e44),[0,y,0],CONTOUR_SOMBRE));
  const etoile=piece(sapin,new THREE.OctahedronGeometry(.26),toon(0xfcc419),[0,3.6,0],CONTOUR_FIN);
  const BOULES=[[.75,1.05,.85,0xe03131],[-.6,1.2,.8,0xfcc419],[.15,.9,1.15,0x1c7ed6],[.55,1.85,.7,0xfcc419],[-.45,1.95,.65,0xe03131],[.1,2.55,.55,0x1c7ed6],[-.25,2.9,.35,0xfcc419]];
  for(const [x,y,z,c] of BOULES) piece(sapin,new THREE.SphereGeometry(.13,14,10),toon(c),[x,y,z],CONTOUR_FIN);

  /* Le cadeau, devant Ti Margo : son couvercle s'envole quand la voix dit « Offre » */
  const cadeau=new THREE.Group(); cadeau.position.set(1.05,0,-.7); scene3d.add(cadeau);
  piece(cadeau,new RoundedBoxGeometry(1,.8,1,3,.05),toon(0xe03131),[0,.4,0],CONTOUR_SOMBRE);
  piece(cadeau,new THREE.BoxGeometry(.16,.82,1.04),toon(0xf6dc62),[0,.41,0],null);
  piece(cadeau,new THREE.BoxGeometry(1.04,.82,.16),toon(0xf6dc62),[0,.41,0],null);
  const couvercle=new THREE.Group(); couvercle.position.set(0,.84,0); cadeau.add(couvercle);
  piece(couvercle,new RoundedBoxGeometry(1.08,.18,1.08,3,.04),toon(0xc92a2a),[0,0,0],CONTOUR_SOMBRE);
  piece(couvercle,new THREE.BoxGeometry(.16,.2,1.1),toon(0xf6dc62),[0,0,0],null);
  for(const s of [-1,1]){ const n=piece(couvercle,new THREE.TorusGeometry(.16,.055,10,24),toon(0xf6dc62),[s*.15,.2,0],CONTOUR_FIN); n.rotation.set(0,s*.5,s*.6); }

  /* ---- Les calques HTML ---- */
  const css=document.createElement('style');
  css.textContent=`
  .cn{position:fixed;z-index:4;box-sizing:border-box;color:#17452a;font-weight:800;font-family:"Segoe UI",system-ui,sans-serif;display:none;transform-origin:50% 50%;text-align:center;}
  #cnCarte{left:50px;width:980px;top:330px;}
  #cnCarte img{display:block;width:100%;border-radius:26px;box-shadow:0 16px 0 rgba(23,69,42,.22);border:6px solid #17452a;}
  .anneau{position:absolute;border:10px solid #f5a50a;border-radius:28px;box-sizing:border-box;}
  #cnBulle{left:510px;right:70px;top:1090px;background:#fff;border:7px solid #17452a;border-radius:44px;padding:12px 18px;font-size:60px;line-height:1.1;}
  #cnPrix{left:520px;width:500px;top:440px;}
  #cnPrix .p{background:#f5a50a;color:#17452a;border-radius:60px;font-size:160px;line-height:1.2;padding:10px 0;border:7px solid #17452a;}
  #cnPrix .l{font-size:64px;margin-top:18px;}
  #cnBarre{left:60px;right:60px;top:380px;background:#fff;border:7px solid #17452a;border-radius:44px;padding:26px 34px;}
  #cnBarre .n{font-size:150px;line-height:1.05;color:#e8590c;font-variant-numeric:tabular-nums;}
  #cnBarre .l{font-size:58px;}
  #cnBarre .tube{height:70px;border-radius:35px;background:#e4efe0;border:5px solid #17452a;overflow:hidden;margin:22px 0 14px;}
  #cnBarre .tube i{display:block;height:100%;background:linear-gradient(90deg,#2f9a3a,#8ce99a);}
  #cnBarre .coeurs{font-size:70px;min-height:84px;}
  #cnFin{left:60px;right:60px;top:200px;background:#fff;border:7px solid #17452a;border-radius:44px;padding:30px 28px;font-size:66px;line-height:1.2;}
  #cnFin .site{display:inline-block;margin:10px 0 26px;border:7px solid #f5a50a;border-radius:24px;padding:6px 34px;font-size:100px;}
  #cnFin .com{font-size:62px;color:#2f6f3f;}
  #cnFin .qui{font-size:76px;color:#e8590c;margin-top:8px;}
  `;
  document.head.append(css);
  const calque=(id,html)=>{ const d=document.createElement('div'); d.id=id; d.className='cn'; d.innerHTML=html; document.body.append(d); return d; };
  const cCarte=calque('cnCarte','<img src="../../manim/sorties/ti-margo/cadeau-noel/_media/carte.png"><div class="anneau" id="cnAnneau"></div>');
  const cBulle=calque('cnBulle','Ton défi<br>t’attend !');
  const cPrix=calque('cnPrix','<div class="p">20 €</div><div class="l">la carte</div>');
  const cBarre=calque('cnBarre','<div class="n" id="cnN">0</div><div class="l">cartes sur 50</div><div class="tube"><i id="cnTube"></i></div><div class="coeurs" id="cnCoeurs"></div>');
  const cFin=calque('cnFin','<div id="cnF1">Pour avoir ta carte, va sur</div><div class="site" id="cnF2">eleveai.fr</div><div class="com" id="cnF3">Écris en commentaire :</div><div class="qui" id="cnF4">à qui tu l’offrirais ?</div>');

  window.tiMargoPret=false;
  const img=cCarte.querySelector('img'); (img.complete?Promise.resolve():img.decode()).then(()=>{ window.tiMargoPret=true; }).catch(e=>console.error('image manquante',e));

  const pop=(T,t0,d=.45,a=.3)=>{ const u=(T-t0)/d; return u<0?0:(u>=1?1:1+a*Math.sin(u*Math.PI)); };
  const ecran=(x,y,z)=>{ const p=new THREE.Vector3(x,y,z).project(camera); return [(p.x+1)/2*1080,(1-p.y)/2*1920]; };
  /* Le cadre orange autour d'une zone de la carte (coordonnées de l'image 1748 × 1240) */
  const anneau=$('cnAnneau');
  function entourer(x0,y0,x1,y1){ const k=968/1748; anneau.style.cssText=`display:block;left:${x0*k-8}px;top:${y0*k-8}px;width:${(x1-x0)*k+28}px;height:${(y1-y0)*k+28}px;`; }

  /* ---- Les sous-titres : exactement ce que dit la voix ---- */
  const D=Object.fromEntries(ORDRE.map(k=>[k,dit(k)]));
  const g=(de,a,...phrases)=>({de:Math.max(de,phrases[0][0]-.05),a,top:60,fs:60,phrases});
  const p02a=D['02-carte']('Avec cette carte, un enfant a un an de dessins animés avec moi,'), p02b=D['02-carte']('et un coach qui suit ses progrès.');
  const groupes=[
    g(A['00-noel']-.1,A['01-offre']-.1,D['00-noel']('Noël arrive… et tu ne sais pas quoi offrir ?')),
    g(A['01-offre']-.1,A['02-carte']-.1,D['01-offre']('Offre les maths… en dessin animé !')),
    g(A['02-carte']-.1,p02b[0]-.05,p02a), g(p02b[0]-.05,A['03-defi']-.1,p02b),
    g(A['03-defi']-.1,A['04-prix']-.1,D['03-defi']('Il tape son code… et son défi l’attend !')),
    g(A['04-prix']-.1,A['05-cinquante']-.1,D['04-prix']('Une carte, c’est 20 €.')),
    g(A['05-cinquante']-.1,A['06-site']-.1,D['05-cinquante']('Avec 50 cartes, Frédéric peut finir tous les dessins animés pour les élèves.'))
  ];

  /* La miniature : la carte, Ti Margo, « Dessin animé » */
  window.tiMargoMiniature=()=>{ window.MINI=true; window.tiMargo.aller(A['02-carte']+1);
    legende.style.display='none'; for(const e of [cBulle,cPrix,cBarre,cFin]) e.style.display='none';
    const t=document.createElement('div'); t.className='cv'; t.innerHTML='Le cadeau de Noël<div style="color:#e8590c;font-size:112px">20 € = 1 an</div>';
    t.style.cssText='left:50px;right:50px;top:60px;background:#fff;border:7px solid #17452a;border-radius:44px;padding:16px;font-size:88px;line-height:1.08;text-align:center;z-index:6;'; document.body.append(t);
    const m=document.createElement('div'); m.className='cv'; m.textContent='Dessin animé';
    m.style.cssText='left:250px;right:250px;bottom:36px;text-align:center;font-size:72px;background:#17452a;color:#fff;border-radius:999px;padding:14px 0;z-index:6;'; document.body.append(m); };

  return { clips,FIN,titre:'',ceinture:0,finTitre:0,groupes,question:{},finClip:null,
    cuts:[A['04-prix'],A['05-cinquante'],A['06-site']],
    jouer(P,T,cam){
      const G=gestes(P,T);
      scene.x=-.95; scene.ry=-.05; cam.e=0; cam.d=10.4; cam.y=3.75; cam.x=0;
      etoile.rotation.y=T*1.2; etoile.scale.setScalar(1+.08*Math.sin(T*4));

      /* Le couvercle s'envole, en tournant, sur « Offre » */
      const u=Math.max(0,Math.min(1,(T-tOffre)/.7));
      couvercle.position.set(-.5*u,.84+2.6*u-1.2*u*u,.3*u); couvercle.rotation.set(-.6*u,0,.9*u); couvercle.visible=u<1;

      /* La carte : sort du cadeau en tournant (01), reste en grand (02-03), puis petite à gauche (04) */
      const vCarte=T>=tOffre+.15&&T<A['05-cinquante'];
      cCarte.style.display=vCarte?'block':'none'; anneau.style.display='none';
      if(vCarte){
        if(T<A['04-prix']){
          const v=Math.min(1,(T-tOffre-.15)/1.1), e=lisse(v), [gx,gy]=ecran(cadeau.position.x+scene.x,1,cadeau.position.z);
          const dx=(gx-540)*(1-e), dy=(gy-(330+345))*(1-e), s=.12+.88*e;
          cCarte.style.transform=`translate(${dx}px,${dy}px) scale(${s}) rotateY(${(1-e)*720}deg)`;
          if(T>=tAn&&T<tDessins+.6) entourer(720,165,1668,330);                  /* « 1 an offert » */
          else if(T>=tCoach&&T<A['03-defi']) entourer(720,348,1668,540);          /* le coach */
          else if(T>=tCode&&T<A['04-prix']) entourer(720,730,1668,960);           /* le code */
        } else {
          const e=lisse(Math.min(1,(T-A['04-prix'])/.5));
          cCarte.style.transform=`translate(${-260*e}px,${120*e}px) scale(${1-.5*e})`;
        }
      }
      cBulle.style.display=T>=tDefi&&T<A['04-prix']?'block':'none'; if(T>=tDefi) cBulle.style.transform=`scale(${Math.max(.001,pop(T,tDefi,.45,.08))})`;
      cPrix.style.display=T>=t20&&T<A['05-cinquante']?'block':'none'; if(T>=t20) cPrix.style.transform=`scale(${Math.max(.001,pop(T,t20,.5,.15))})`;

      /* La barre des 50 cartes */
      const vB=T>=A['05-cinquante']&&T<A['06-site']; cBarre.style.display=vB?'block':'none';
      if(vB){ const n=Math.round(50*lisse(Math.max(0,Math.min(1,(T-t50)/(tFinir-t50+1.2)))));
        $('cnN').textContent=n; $('cnTube').style.width=(2*n)+'%'; $('cnCoeurs').textContent=T>=tEleves?'💛 💛 💛 💛 💛':''; }

      /* La fin : le site, puis la question en commentaire */
      const vF=T>=A['06-site']; cFin.style.display=vF?'block':'none';
      if(vF){ $('cnF1').style.visibility=T>=tPour?'':'hidden'; $('cnF2').style.visibility=T>=tSite?'':'hidden';
        $('cnF3').style.visibility=T>=tEcris?'':'hidden'; $('cnF4').style.visibility=T>=tQui?'':'hidden';
        cFin.style.transform=`scale(${Math.max(.001,pop(T,A['06-site'],.4,.08))})`; }

      /* Ti Margo */
      if(T<A['00-noel']+1.4) G.salut(T-A['00-noel'],1.4);
      else if(T<A['01-offre']) G.reflechit();
      else if(T<A['02-carte']) G.ouvre();
      else if(T<A['03-defi']) G.montre();
      else if(T<A['04-prix']) T>=tDefi?G.fier():G.montre();
      else if(T<A['05-cinquante']) G.ouvre();
      else if(T<A['06-site']) T>=tEleves?G.fier():G.montre();
      else G.pouce();

      if(window.MINI){ scene.x=-.8; cam.d=10.4; cam.y=4.05; P.jaw=.62; G.fier(); cBulle.style.display='none'; anneau.style.display='none'; cCarte.style.display='block'; cCarte.style.transform='translate(0px,70px) scale(.8)'; }
    } };
};
