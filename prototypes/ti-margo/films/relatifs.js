/* Série Relatifs 4e : les 7 shorts. Décor commun, puis un FILMS.<épisode> par film. */
/* La miniature verticale : la question, la ceinture, la mention « Film d'animation 3D » */
function poserMiniature({$,carte,legende,panneau},t,html){ window.tiMargoMiniature=()=>{ window.MINI=true; window.tiMargo.aller(t);
  carte.style.display='none'; panneau.style.display='none'; $('titre').style.display='none';
  legende.style.cssText+=';display:block;top:60px;left:50px;right:50px;font-size:100px;line-height:1.1;padding:30px;'; legende.innerHTML=html;
  const e=$('echelle'); e.style.display='flex'; e.style.top='535px';
  const m=document.createElement('div'); m.className='cv'; m.textContent="Film d’animation 3D";
  m.style.cssText='left:176px;right:176px;bottom:36px;text-align:center;font-size:66px;background:#17452a;color:#fff;border-radius:999px;padding:14px 0;z-index:6;'; document.body.append(m); }; }

/* ---- Décor partagé : la droite graduée dressée, numérotée de −N à N, dans un studio ---- */
function poserDroite(N,GRAD){
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(9000,9000),new THREE.MeshBasicMaterial({color:0xefe3c2})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  /* Au loin, les hangars du studio de cinéma */
  for(let i=-9;i<=9;i++){ const h=3+((i*i*7)%5)*.8, m=new THREE.Mesh(new THREE.BoxGeometry(7,h,1),new THREE.MeshBasicMaterial({color:i%2?0xc4dcea:0xd3e6f0})); m.position.set(i*9,h/2,-34); scene3d.add(m); }
  /* La droite graduée : un portique AU-DESSUS de sa tête, pour qu'il ne cache jamais un nombre */
  const portique=new THREE.Group(); scene3d.add(portique);
  const cv=document.createElement('canvas'); cv.width=8192; cv.height=240; const g=cv.getContext('2d');
  const L=2*N*GRAD+2*GRAD, px=8192/L, X=v=>(v*GRAD+N*GRAD+GRAD)*px;
  g.fillStyle='#fffdf5'; g.fillRect(0,0,8192,240); g.fillStyle='#17452a'; g.fillRect(0,0,8192,14); g.fillRect(0,226,8192,14);
  g.textAlign='center'; g.textBaseline='middle'; g.font='800 150px "Segoe UI"';
  for(let v=-N;v<=N;v++){ g.fillStyle=v<0?'#d9480f':(v>0?'#1971c2':'#17452a'); g.fillText((v<0?'−':(v>0?'+':''))+Math.abs(v),X(v),128); g.fillStyle='#17452a'; g.fillRect(X(v)-5,14,10,24); g.fillRect(X(v)-5,202,10,24); }
  const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace; tx.anisotropy=8;
  const H=L*240/8192, YC=3.95;
  const bande=new THREE.Mesh(new THREE.PlaneGeometry(L,H),new THREE.MeshBasicMaterial({map:tx})); bande.position.set(0,YC,-1.5); portique.add(bande);
  const metal=new THREE.MeshBasicMaterial({color:0x4b5563});
  for(let v=-N;v<=N;v+=3){ const pied=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,YC,10),metal); pied.position.set((v+.5)*GRAD,YC/2,-1.56); portique.add(pied); }
  /* Le repère : le triangle au-dessus de lui pointe le nombre où il est */
  const reperes=new THREE.Mesh(new THREE.ConeGeometry(.17,.3,20),new THREE.MeshBasicMaterial({color:0x2f9a3a})); reperes.rotation.x=Math.PI; reperes.position.set(0,YC-H/2-.15,.2); portique.add(reperes);
  for(let v=-N;v<=N;v++){ const t2=new THREE.Mesh(new THREE.PlaneGeometry(.07,2.4),new THREE.MeshBasicMaterial({color:v===0?0x17452a:0xb9a878})); t2.rotation.x=-Math.PI/2; t2.position.set(v*GRAD,-.01,-.2); scene3d.add(t2); }
  return {portique,reperes};
}

/* ============================================================
   ÉPISODE 03 : LE FILM À L'ENVERS. (−2) × (−3) = +6.
   ============================================================ */
FILMS.multiplication=function({el,$,mots,jetons,panneau}){
  const GRAD=1; const decor=poserDroite(12,GRAD);
  const clips=[['00-accroche',.4],['01-situation',12.2],['02-envers',25.7],['02q-question',34.1],['02r-reponse',49.0],['03-preuve',53.4],['04-quatre',64.6],['05-question',79.6],['06-abonne',92.0]];
  const a=Object.fromEntries(clips), acc=.4,sit=12.2,env=25.7,q=34.1,r=49.0,pre=53.4,qua=64.6,c=79.6,f=92.0;
  const G=(base,de,fin,top,phr,fs)=>({de:base+de,a:fin,top,fs,phrases:phr.map(([x,y,t])=>[base+x,base+y,t])});
  const groupes=[
    G(acc,.1,acc+3.7,410,[[.1,.6,'Salut !'],[1.46,2.9,'Moi, c’est Ti Margo.']]),
    G(acc,3.8,acc+8.45,410,[[3.8,5.65,'Moins par moins, ça fait plus.'],[6.67,7.75,'Tu paries que non ?']]),
    G(acc,8.48,sit-.05,60,[[8.48,10.35,'Je vais te le prouver avec un film.']]),
    G(sit,.1,sit+3.7,60,[[.1,1.5,'Je marche vers la gauche :'],[1.65,2.7,'2 pas par seconde.']]),
    G(sit,3.74,sit+6.7,60,[[3.74,4.75,'La gauche, c’est moins :'],[5.27,5.8,'−2.']]),
    G(sit,6.72,sit+11.2,60,[[6.72,7.8,'Pendant 3 secondes :']]),
    G(sit,11.23,env-.05,60,[[11.23,12.4,'J’arrive à −6.']]),
    G(env,.1,env+2.2,60,[[.1,1.45,'Je repars de zéro.']]),
    G(env,2.25,q-.05,60,[[2.25,4.05,'Je marche toujours vers la gauche,'],[4.2,5.9,'mais le film tourne à l’envers,'],[6.14,7.3,'pendant 3 secondes.']],56),
    G(pre,.1,pre+3.4,60,[[.1,.9,'À l’envers,'],[1.01,2.6,'je recule vers la droite !']]),
    G(pre,8.88,qua-.05,60,[[8.88,10.3,'Moins par moins : plus !']]),
    G(qua,.1,qua+2.0,60,[[.1,1.1,'Les quatre films.']]),
    G(qua,2.06,qua+5.3,60,[[2.06,3.9,'Vers la droite, à l’endroit :'],[4.08,4.6,'plus.']],56),
    G(qua,5.33,qua+8.4,60,[[5.33,7.05,'Vers la gauche, à l’endroit :'],[7.22,7.8,'moins.']],56),
    G(qua,8.44,qua+11.7,60,[[8.44,10.35,'Vers la droite, à l’envers :'],[10.51,11.1,'moins.']],56),
    G(qua,11.73,c-.05,60,[[11.73,13.5,'Vers la gauche, à l’envers :'],[13.65,14.2,'plus.']],56),
    G(c,.1,f-.05,60,[[.1,.6,'À toi :'],[.7,3.75,'je marche vers la droite, 5 pas par seconde.'],[4.6,7.45,'Le film tourne à l’envers pendant 4 secondes.'],[8.46,9.4,'Où j’arrive ?'],[10.05,11.7,'Réponds en commentaire !']],58)
  ];

  /* Le panneau du bas : la droite (un point = Ti Margo) et la formule */
  const XP=v=>60+(v+8)*(840/16);
  let g=''; for(let v=-8;v<=8;v++){ g+=`<line x1="${XP(v)}" x2="${XP(v)}" y1="54" y2="84" stroke="#17452a" stroke-width="5"/>`;
    if(v%2===0) g+=`<text x="${XP(v)}" y="128" font-size="38" font-weight="800" text-anchor="middle" fill="${v<0?'#d9480f':(v>0?'#1971c2':'#17452a')}">${v<0?'−':(v>0?'+':'')}${Math.abs(v)}</text>`; }
  panneau.innerHTML=`<svg id="axe" viewBox="0 0 960 140" width="100%" style="display:block"><line x1="30" x2="930" y1="69" y2="69" stroke="#17452a" stroke-width="6"/>${g}
    <circle id="point" cx="${XP(0)}" cy="69" r="26" fill="#2f9a3a" stroke="#fff" stroke-width="5"/></svg><div id="formule"></div><div id="table" style="display:none"></div>`;
  $('table').innerHTML=`<table style="width:100%;border-collapse:collapse;font-size:40px;text-align:center"><tr><td></td><td style="padding:2px;white-space:nowrap">à l’endroit</td><td style="padding:2px;white-space:nowrap">à l’envers</td></tr>
    <tr><td style="padding:0 6px;white-space:nowrap" id="lD">vers la droite</td><td id="t00" style="border:5px solid #17452a;font-size:72px;line-height:1.15;width:230px"></td><td id="t01" style="border:5px solid #17452a;font-size:72px;line-height:1.15;width:230px"></td></tr>
    <tr><td style="padding:0 6px;white-space:nowrap" id="lG">vers la gauche</td><td id="t10" style="border:5px solid #17452a;font-size:72px;line-height:1.15;width:230px"></td><td id="t11" style="border:5px solid #17452a;font-size:72px;line-height:1.15;width:230px"></td></tr></table>`;
  const CELLS=[['t00','+','pos',qua+4.08],['t10','−','neg',qua+7.22],['t01','−','neg',qua+10.51],['t11','+','pos',qua+13.65]];
  for(const [id,s,k] of CELLS){ $(id).textContent=s; $(id).className=k; }

  /* Le bandeau du film : à l'endroit ou à l'envers, et son chrono */
  const css=document.createElement('style');
  css.textContent=`#panneau{top:auto!important;bottom:120px!important;}
    .choix.bon{transform:scale(1.05)!important;}
    #bandeau{position:static;display:none;width:fit-content;margin:0 auto 6px;border-radius:999px;padding:6px 34px;color:#fff;font-size:50px;white-space:nowrap;}
    #clap{left:690px;top:640px;z-index:4;display:none;}
    body.envers canvas{filter:sepia(.55) saturate(.8) brightness(1.02);}`;
  document.head.append(css);
  el('bandeau','',panneau); el('clap',`<svg width="300" height="270" viewBox="0 0 300 270"><rect x="16" y="86" width="268" height="170" rx="14" fill="#17202b"/><g id="clapB"><rect x="16" y="26" width="268" height="52" rx="8" fill="#17202b"/><path d="M40 26l34 52M104 26l34 52M168 26l34 52M232 26l34 52" stroke="#fff" stroke-width="20"/></g><text x="150" y="190" font-size="72" font-weight="800" fill="#fff" text-anchor="middle">FILM</text></svg>`);

  const TICS=[];
  for(const t0 of [sit+6.72,pre+.1]) for(let i=1;i<=3;i++) TICS.push({t:t0+i,f:620+i*70});
  for(let i=0;i<3;i++) TICS.push({t:q+11.8+i,f:760});

  poserMiniature(arguments[0],6,'Moins × moins<br>= plus<div style="color:#e8590c;font-size:136px;margin-top:10px">TU PARIES ?</div>');
  const film={ clips,FIN:98.8,tics:TICS,titre:'Moins × moins = plus ?',ceinture:2,finTitre:acc+3.7,
    cuts:[env,q,pre,qua,qua+2.06,qua+5.33,qua+8.44,qua+11.73,c,f],groupes,finClip:'06-abonne',
    question:{ qc:'02q-question',rc:'02r-reponse',finR:pre,cpt:q+11.8,bonne:1,tBon:.62,
      phrase:[[q+1.63,q+2.6,'Où j’arrive ?']],pause:[[q+9.65,q+11.4,'Mets pause, et choisis !']],
      choix:[['<span class="neg">−6</span>',3.22,3.57],['<span class="pos">+6</span>',5.25,5.7],['<span class="neg">−5</span>',7.4,7.93]],
      tete:[[r+.1,'Réponse '],[r+.62,'B :']],reponse:[[r+1.05,r+1.75,'plus 6 !']],suite:[[r+2.75,r+3.3,'Regarde.']] },

    jouer(P,T,cam){
      /* La position sur la droite : ±2 par seconde, 3 vraies secondes */
      let pos=0, sens=0, envers=false, chrono=null;
      if(T>=sit+6.72&&T<env){ const t=Math.min(3,T-sit-6.72); pos=-2*t; sens=T<sit+9.72?-1:0; chrono=t; }
      if(T>=env&&T<pre) { envers=T>=env+5.35; }
      if(T>=pre&&T<qua){ const t=Math.min(3,Math.max(0,T-pre-.1)); pos=2*t; envers=true; sens=(T>=pre+.1&&T<pre+3.1)?-1:0; chrono=-t; }
      /* Les quatre films : 1,6 par seconde */
      const segs=[[qua+2.06,qua+5.3,1,false],[qua+5.33,qua+8.4,-1,false],[qua+8.44,qua+11.7,1,true],[qua+11.73,c-.05,-1,true]];
      let seg=null; for(const s of segs) if(T>=s[0]&&T<s[1]) seg=s;
      if(seg){ const t=T-seg[0]; envers=seg[3]; pos=(seg[3]?-1:1)*seg[2]*1.6*t; }

      scene.x=pos*GRAD; cam.x=scene.x+.15; cam.y=1.55;
      decor.reperes.position.x=scene.x; decor.portique.visible=T>=sit&&!(T>=q&&T<pre)&&T<f;
      const dansQ=T>=q&&T<pre, dansC=T>=c&&T<f, dansF=T>=f;
      if(dansQ||dansF){ cam.y=2.75; cam.d=13.6; }
      if(dansC){ cam.y=2.4; cam.d=13.2; }
      if(T<sit){ cam.y=1.75; cam.d=11.8; }

      const ouvre=()=>{ P.gesteD='ouverte'; P.md.set(.86,2.02+Math.sin(T*3)*.06,.5); P.cd.set(.72,1.58,.2); P.tetY=.08+Math.sin(T*1.7)*.07; };
      const montre=()=>{ P.gesteD='index'; P.md.set(1.02,2.72+Math.sin(T*3)*.04,.42); P.cd.set(.86,1.95,.1); P.tetX=-.08; P.regY=.3; };
      const pouce=()=>{ P.md.set(.95,2.32,.45); P.cd.set(.74,1.7,.14); P.gesteD='pouce'; P.tetZ=-.14; P.paupiere=-1.1; };
      const marche=(sensPied,rot)=>{ scene.ry=rot; const j=P.jaw; marcher(T*.766*sensPied,P); P.jaw=j; };

      if(T<acc+1.4){ const e=lisse((T-acc)*4)*lisse((acc+1.4-T)*4); P.md.set(.88,2.2+.68*e,.28); P.cd.set(.82,1.92,.06); P.gesteD='ouverte'; P.tourneD=Math.sin(T*11)*.42*e; }
      else if(T<sit) ouvre();
      else if(T<sit+6.72){ scene.ry=-.55; montre(); }
      else if(T<sit+9.72) marche(1,-1.25);
      else if(T<env){ scene.ry=-.2; ouvre(); }
      else if(T<q){ scene.ry=-.55; T<env+5.3?ouvre():montre(); }
      else if(T<r){ P.md.set(.44,2.3,.72); P.cd.set(.78,1.78,.34); P.gesteD='ouverte'; P.tetZ=.15; P.tetX=-.1; P.regX=-.28; P.regY=.35; P.qSway=Math.sin(T*3)*.3; }
      else if(T<pre){ ouvre(); }
      else if(T<pre+3.1){ if(T<pre+.1) ouvre(); else marche(-1,-1.25); }
      else if(T<pre+8.88){ ouvre(); }
      else if(T<qua){ const j=P.jaw; ACTIONS.eureka.f(T-pre-8.88,P); P.jaw=j; }
      else if(seg){ marche(seg[3]?-1:1,seg[2]>0?1.25:-1.25); }
      else if(T<c) ouvre();
      else if(dansC){ T<c+9.8?montre():pouce(); }
      else { T-f<2.35?ouvre():pouce(); }

      if(window.MINI){ decor.portique.visible=false; cam.x=.18; cam.y=2.55; cam.d=8.7; cam.e=.1; scene.x=0; scene.ry=-.12; P.jaw=.62; pouce();
        const k=$('clap'); k.style.cssText+=';display:block;left:10px;top:1210px;transform:scale(.9);'; $('bandeau').style.display='none'; panneau.style.display='none'; return; }
      /* Le bandeau */
      const b=$('bandeau'), voirB=(T>=sit+6.72&&T<q)||(T>=pre&&T<qua)||!!seg;
      b.style.display=voirB?'block':'none';
      document.body.classList.toggle('envers',envers&&!dansQ&&voirB);
      if(voirB){ b.style.background=envers?'#c92a2a':'#2f9a3a';
        const lib=envers?'◀◀ À L’ENVERS':'▶ À L’ENDROIT';
        const ch=chrono===null?'':`   ·   ${chrono<0?'−':''}${Math.floor(Math.abs(chrono)+1e-6)} s`;
        b.textContent=lib+ch; }

      /* La claquette */
      const cl=T>=acc+10.02&&T<sit; $('clap').style.display=cl?'block':'none';
      if(cl){ const u=T-acc-10.02; $('clapB').setAttribute('transform',`rotate(${u<.32?-22+u/.32*22:0} 16 78)`); }

      /* Le panneau du bas */
      const voirP=(T>=sit&&T<q)||(T>=pre&&T<c);
      panneau.style.display=voirP?'block':'none';
      if(voirP){
        const quatre=T>=qua; $('table').style.display=quatre?'':'none'; $('axe').style.display=quatre?'none':'block'; $('formule').style.display=quatre?'none':'';
        $('point').setAttribute('cx',XP(pos));
        if(quatre){ for(const [id,,,t] of CELLS) $(id).style.visibility=T>=t?'':'hidden';
          $('lD').style.color=(seg&&seg[2]>0)?'#d9480f':''; $('lG').style.color=(seg&&seg[2]<0)?'#d9480f':''; }
        else if(T<env) jetons($('formule'),F1,T);
        else if(T<q) jetons($('formule'),[],T);
        else jetons($('formule'),F2,T);
        $('formule').style.fontSize=T<env?'':'66px';
      }
    } };
  const F1=[[sit+8.24,'3 '],[sit+8.53,'× '],[sit+8.84,'(<span class="neg">−</span>','' ],[sit+9.10,'<span class="neg">2</span>) '],[sit+9.55,'= <span class="neg">−</span>'],[sit+9.87,'<span class="neg">6</span>']];
  const F2=[[pre+3.43,'(<span class="neg">−</span>'],[pre+3.77,'<span class="neg">2</span>) pas/s '],[pre+5.16,'× '],[pre+5.49,'(<span class="neg">−</span>'],[pre+5.75,'<span class="neg">3</span>) s '],[pre+6.82,'= '],[pre+7.19,'<span class="ok">+</span>'],[pre+7.53,'<span class="ok">6</span>']];
  return film;
};

