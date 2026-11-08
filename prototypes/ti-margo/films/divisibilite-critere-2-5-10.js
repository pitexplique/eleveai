/* Série Divisibilité 4e, épisode 02 : LA LOUPE (ÉCRAN DE STADE). 7 384 615 est-il divisible par 5 ?
   Ti Margo parie de répondre en une seconde : sa loupe ne regarde que le dernier chiffre. Puis les règles
   de 2, 5 et 10 sur l'écran géant du stade, la question 4 730, et le défi (plus petit nombre à 4 chiffres).
   Chargé après films/divisibilite.js : voixDe, enchainer, groupe, suiteDe, poserTableau, ecrire, pop,
   gestes, poserMiniature, PARI viennent de là. Tout ce qui est propre à l'épisode est préfixé « c2510 ». */

/* ---- Le stade de nuit : pelouse rayée, tribunes et public, projecteurs ---- */
function c2510PoserStade(){
  const sol=new THREE.Group(); scene3d.add(sol);
  for(let k=-12;k<=30;k++){ const b=new THREE.Mesh(new THREE.PlaneGeometry(900,1.5),new THREE.MeshBasicMaterial({color:k%2?0x2f9e44:0x37b24d}));
    b.rotation.x=-Math.PI/2; b.position.set(0,-.02,k*1.5); sol.add(b); }
  const ligne=new THREE.Mesh(new THREE.PlaneGeometry(900,.12),new THREE.MeshBasicMaterial({color:0xf8f9fa})); ligne.rotation.x=-Math.PI/2; ligne.position.set(0,-.01,-4.6); sol.add(ligne);
  const ciel=new THREE.Mesh(new THREE.PlaneGeometry(260,80),new THREE.MeshBasicMaterial({color:0x14213d})); ciel.position.set(0,24,-20); scene3d.add(ciel);
  /* les tribunes : six gradins, un public de toutes les couleurs */
  const PEAUX2510=[0x8d5524,0xc68642,0xe0ac69,0xf1c27d,0x5c3a21], public_=[], COUL=[0xe03131,0xf08c00,0xfcc419,0x1c7ed6,0xf8f9fa,0x7048e8,0x0ca678,0xe64980];
  const tribune=new THREE.Group(); scene3d.add(tribune);
  for(let k=0;k<6;k++){ const y=.45+k*.9, z=-6.6-k*1.15;
    const gr=new THREE.Mesh(new THREE.BoxGeometry(60,.9,1.15),new THREE.MeshBasicMaterial({color:k%2?0x343a40:0x3d4349})); gr.position.set(0,y-.45,z); tribune.add(gr);
    const mur=new THREE.Mesh(new THREE.PlaneGeometry(60,y+.1),new THREE.MeshBasicMaterial({color:0x212529})); mur.position.set(0,(y-.9)/2,z+.58); if(k===0) tribune.add(mur);
    for(let i=0;i<34;i++){ const x=-11.5+i*.7+(k%2)*.35, c=COUL[(i*5+k*3)%COUL.length], s=new THREE.Group();
      s.position.set(x,y,z); tribune.add(s);
      piece(s,new RoundedBoxGeometry(.34,.36,.22,2,.06),toon(c),[0,.18,0],null);
      piece(s,new THREE.SphereGeometry(.13,12,10),toon(PEAUX2510[(i+k)%PEAUX2510.length]),[0,.5,0],null);
      s.userData.y0=y; s.userData.ph=(i*7+k*3)%10/10; public_.push(s); } }
  /* deux projecteurs */
  for(const sx of [-1,1]){ const g=new THREE.Group(); g.position.set(sx*6.2,0,-10); scene3d.add(g);
    piece(g,new THREE.CylinderGeometry(.12,.16,11,10),toon(0x868e96),[0,5.5,0],CONTOUR_FIN);
    const lampe=new THREE.Mesh(new THREE.BoxGeometry(1.8,1,.2),new THREE.MeshBasicMaterial({color:0xfff3bf})); lampe.position.set(0,11.2,0); g.add(lampe);
    const halo=new THREE.Mesh(new THREE.CircleGeometry(2.4,32),new THREE.MeshBasicMaterial({color:0xfff9db,transparent:true,opacity:.18})); halo.position.set(0,11.2,-.1); g.add(halo); }
  return {
    /* le public saute de joie à partir de t0 */
    sauter(T,t0,d=1.8){ const u=T-t0, on=u>=0&&u<d;
      for(const s of public_) s.position.y=s.userData.y0+(on?Math.abs(Math.sin((u+s.userData.ph)*9))*.28*Math.min(1,(d-u)*2):0); } };
}

/* ---- L'écran géant : lettres lumineuses ---- */
const C2510={blanc:'#f8f9fa',jaune:'#ffd43b',vert:'#69db7c',rouge:'#ff6b6b',orange:'#ff922b',gris:'#495057',c2:'#74c0fc',c5:'#ffa94d',c10:'#69db7c'};
/* Un nombre écrit chiffre par chiffre : coul(k, chiffre) ; renvoie le centre de chaque caractère */
function c2510Chiffres(c,s,xc,y,taille,coul){ c.font=`800 ${taille}px "Segoe UI"`; c.textBaseline='middle'; c.textAlign='left';
  let x=xc-c.measureText(s).width/2; const pos=[];
  for(let k=0;k<s.length;k++){ const ch=s[k], w=c.measureText(ch).width; if(ch!==' '){ c.fillStyle=typeof coul==='function'?coul(k,ch):coul; c.fillText(ch,x,y); } pos.push(x+w/2); x+=w; }
  return pos; }
/* Des jetons qui s'allument chacun à son instant, de gauche à droite à partir de x */
function c2510Jetons(c,toks,x,y,taille,coul,T){ for(const [s,t] of toks){ c.font=`800 ${taille}px "Segoe UI"`; const w=c.measureText(s).width;
  if(T>=t) ecrire(c,s,x+w/2,y,taille*(1+.35*(Math.max(1,pop(T,t))-1)),coul); x+=w+taille*.32; } }
/* La loupe */
function c2510Loupe(c,x,y,r){ c.fillStyle='rgba(255,255,255,.10)'; c.beginPath(); c.arc(x,y,r,0,7); c.fill();
  c.strokeStyle='#a0522d'; c.lineWidth=r*.24; c.lineCap='round'; c.beginPath(); c.moveTo(x+r*.74,y+r*.74); c.lineTo(x+r*1.5,y+r*1.5); c.stroke();
  c.strokeStyle='#ffd43b'; c.lineWidth=r*.14; c.beginPath(); c.arc(x,y,r,0,7); c.stroke(); }

FILMS['critere-2-5-10']=function(outils){
  const {$,panneau}=outils;
  const DUR={'00-accroche':15.71,'01-loupe':8.91,'02-regles':13.40,'02q-question':14.39,'02r-reponse':5.80,'03-question':8.81,'04-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02q-question':3.3,'03-question':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,lo,rg,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['04-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  const stade=c2510PoserStade();
  const tab=poserTableau({L:4.4,H:3,x:0,y:4.55,fond:'#0b1220',bois:0x212529});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;} div#rebours{display:block;}'; document.head.append(css);

  /* Les instants */
  const tCe=mot('00-accroche','Ce'), t7=mot('00-accroche','7'), tNb=mot('00-accroche','384'), tParie=mot('00-accroche','paries'),
        tDiv=mot('00-accroche','divisible'), tSans=mot('00-accroche','sans'), tSec=mot('00-accroche','seconde');
  const tLoupe=mot('01-loupe','loupe'), tReg=mot('01-loupe','regarde'), tDer=mot('01-loupe','dernier'), t5l=mot('01-loupe','5'),
        tDivL=mot('01-loupe','Divisible'), tGagne=mot('01-loupe','Gagné');
  const R=(m,n=1)=>mot('02-regles',m,n);
  const tP=[R('Par',1),R('Par',2),R('Par',3)], tReste=R('reste'), tFiche=R('fiche');
  const L1=[['0,',R('0',1)],['2,',R('2',2)],['4,',R('4')],['6',R('6')],['ou',R('ou',1)],['8',R('8')]],
        L2=[['0',R('0',2)],['ou',R('ou',2)],['5',R('5',2)]], L3=[['0',R('0',3)]];
  const tPlus=mot('03-question','plus'), t4=mot('03-question','4'), tp2=mot('03-question','2'), tp5=mot('03-question','5'), tp10=mot('03-question','10'),
        tRep=mot('03-question','Réponds');
  const NB='7 384 615', gros=T=>T<tCe-.08;

  /* L'écran géant */
  function dessiner(T){ const c=tab.c, W=tab.W; tab.effacer();
    if(T>=com){ /* le défi : 4 cases, les trois diviseurs, la réponse reste à l'élève */
      if(T>=tPlus) ecrire(c,'Le plus petit nombre',W/2,95,72*Math.max(1,pop(T,tPlus)),C2510.blanc);
      if(T>=t4){ const z=Math.max(1,pop(T,t4)); for(let k=0;k<4;k++){ const x=W/2+(k-1.5)*170;
        c.strokeStyle=C2510.jaune; c.lineWidth=8; c.setLineDash([20,12]); c.strokeRect(x-68,215,136,170); c.setLineDash([]); ecrire(c,'?',x,302,110*z,C2510.jaune); }
        ecrire(c,'4 chiffres',W/2,445,58,C2510.jaune); }
      [['par 2',tp2,C2510.c2,-330],['par 5',tp5,C2510.c5,0],['par 10',tp10,C2510.c10,330]].forEach(([s,t,cl,dx])=>{ if(T>=t) ecrire(c,s,W/2+dx,590,82*Math.max(1,pop(T,t)),cl); });
      tab.maj(); return; }
    if(T>=rg){ /* les trois règles, chaque chiffre à son mot ; puis « le reste, je m'en fiche » */
      const Y=[95,225,355];
      [['Par 2 :',C2510.c2,L1],['Par 5 :',C2510.c5,L2],['Par 10 :',C2510.c10,L3]].forEach(([lab,cl,toks],k)=>{ if(T<tP[k]) return;
        ecrire(c,lab,345,Y[k],80*(1+.35*(Math.max(1,pop(T,tP[k]))-1)),cl,'right'); c2510Jetons(c,toks,395,Y[k],80,cl,T); });
      if(T>=tReste){ const z=Math.max(1,pop(T,tReste)); const pos=c2510Chiffres(c,NB,W/2,520,90*z,k=>k===NB.length-1?C2510.jaune:C2510.gris);
        c2510Loupe(c,pos[NB.length-1],520,44); }
      tab.maj(); return; }
    if(T>=lo){ /* la loupe glisse jusqu'au dernier chiffre : 5 ! */
      const fini=T>=tDer, pos=c2510Chiffres(c,NB,W/2,200,170,(k,ch)=>{
        if(!fini) return C2510.blanc;
        if(k<NB.length-1) return C2510.gris;
        return T>=t5l?C2510.vert:C2510.jaune; });
      if(T>=tLoupe){ const u=Math.max(0,Math.min(1,(T-tReg)/(tDer-tReg))), x=pos[0]+(pos[NB.length-1]-pos[0])*lisse(u);
        c2510Loupe(c,x,200,70*Math.min(1,(T-tLoupe)/.3+.3)); }
      if(T>=t5l&&T<t5l+.6) c2510Chiffres(c,NB,W/2,200,170,k=>k===NB.length-1?C2510.vert:'rgba(0,0,0,0)');
      if(T>=tDivL) ecrire(c,'Divisible par 5 ✓',W/2,385,86*Math.max(1,pop(T,tDivL)),C2510.vert);
      if(T>=tGagne){ ecrire(c,'GAGNÉ !',W/2,530,120*Math.max(1,pop(T,tGagne)),C2510.jaune);
        const cl=[C2510.rouge,C2510.jaune,C2510.vert,C2510.c2,C2510.orange];
        for(let k=0;k<46;k++){ const u=T-tGagne, x=(k*97)%W, y=-30+((k*53)%160)+u*(260+(k%5)*60);
          if(y<tab.H+20){ c.fillStyle=cl[k%5]; c.save(); c.translate(x,y); c.rotate(u*4+k); c.fillRect(-9,-5,18,10); c.restore(); } } }
      tab.maj(); return; }
    /* l'accroche : 7 chiffres, le nombre, le pari */
    if(T>=t7&&T<tNb) ecrire(c,'7 chiffres',W/2,190,120*Math.max(1,pop(T,t7)),C2510.jaune);
    if(T>=tNb) c2510Chiffres(c,NB,W/2,150,150*Math.max(1,pop(T,tNb)),C2510.blanc);
    if(T>=tParie) ecrire(c,'TU PARIES ?',W/2,315,118*Math.max(1,pop(T,tParie)),C2510.orange);
    if(T>=tDiv) ecrire(c,'divisible par 5 ?',W/2,440,76*Math.max(1,pop(T,tDiv)),C2510.blanc);
    if(T>=tSans) ecrire(c,'sans calculer, en 1 seconde',W/2,545,58,C2510.jaune);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-loupe'), a2=dit('02-regles'), a3=dit('03-question'), qd=dit('02q-question'), rd=dit('02r-reponse');
  const groupes=[
    groupe(acc+.1,tCe-.08,352,62,a0('Salut !'),a0('Moi, c’est Ti Margo.')),
    ...suiteDe(lo,60,58,[a0('Ce nombre a 7 chiffres :'),a0('7 384 615.')],[a0.jusque('Tu')('Tu paries que je dis'),a0('s’il est divisible par 5,'),a0('sans calculer, en une seconde ?')]),
    ...suiteDe(rg,60,58,[a1('Ma loupe ne regarde'),a1('qu’un chiffre : le dernier.')],[a1('5 !'),a1('Divisible par 5.'),a1('Gagné !')]),
    ...suiteDe(q,60,58,[a2('Par 2 : le dernier chiffre'),a2('est 0, 2, 4, 6 ou 8.')],[a2('Par 5 : 0 ou 5.'),a2('Par 10 : 0.')],[a2('Le reste du nombre,'),a2('je m’en fiche.')]),
    ...suiteDe(f,60,56,[a3('À toi : quel est le plus petit'),a3('nombre à 4 chiffres')],[a3('divisible par 2,'),a3('par 5 et par 10 ?'),a3('Réponds en commentaire !')])
  ];
  qd('Question !');
  /* « 4 730 est » arrive en six marques : le nombre, puis « divisible » */
  const x1=qd('4 730'); qd.jusque('divisible'); const x2=qd('divisible par…');
  const phraseQ=[[x1[0],x2[1],'4 730 est divisible par…',[...x1[3],x2[0]-.12,...x2[3]]]];
  const tq=(m,n=1)=>mot('02q-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('il finit par 0.'), r2=rd('Le 0 coche les trois cases !');

  poserMiniature(outils,acc+1,'7 384 615 :<br>divisible par 5 ?'+PARI,
    `<svg width="300" height="190" viewBox="0 0 300 190"><rect x="6" y="6" width="288" height="178" rx="18" fill="#0b1220" stroke="#212529" stroke-width="12"/>
      <text x="198" y="124" font-family="Segoe UI" font-weight="800" font-size="80" fill="#6c757d" text-anchor="end">…61</text>
      <text x="250" y="124" font-family="Segoe UI" font-weight="800" font-size="80" fill="#69db7c" text-anchor="middle">5</text>
      <circle cx="250" cy="96" r="40" fill="rgba(255,255,255,.1)" stroke="#ffd43b" stroke-width="8"/><line x1="279" y1="125" x2="292" y2="140" stroke="#a0522d" stroke-width="12" stroke-linecap="round"/></svg>`);
  return { clips,FIN,titre:'Divisible par 2, 5, 10',ceinture:1,finTitre:tCe-.08,groupes,finClip:'04-abonne',
    cuts:[tCe-.08,lo,rg,q,r,com,f],
    tics:[{t:tDer,f:880},{t:t5l,f:1320},{t:tGagne,f:660}],
    question:{ qc:'02q-question',rc:'02r-reponse',finR:com,cpt:fin('02q-question')+.1,bonne:2,tBon:.64,
      phrase:phraseQ,pause:pauseQ,
      choix:[['2 seulement',tq('A'),tq('2',1)],['5 seulement',tq('B'),tq('5',1)],['2, 5 et 10',tq('C'),tq('2',2)]],
      tete:[[r+.1,'Réponse '],[r+.64,'C !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T); stade.sauter(T,tGagne);
      const dansQ=T>=q&&T<com, dansF=T>=f, gr=gros(T);
      tab.g.visible=!gr&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gr){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gr) g.ouvre();
      else if(T<lo){ T<tParie?g.montre():g.fier(); }
      else if(T<rg){ if(T>=tGagne) g.fier(); else if(T<tDer) g.reflechit(); else g.montre(); }
      else if(T<q){ T>=tFiche-.3&&T<tFiche+.9?g.oups():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<r+.64?g.ouvre():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
