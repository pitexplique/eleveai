/* ============================================================
   Série Nombres entiers CP — SHORT 12 : « Le coffre au trésor » (micro cp_entier_defi), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier2-dessins.js + cp-entier3-dessins.js. Voix : manim/voix/cp-entier-defi-short.json.
   Un coffre sur la plage ; son cadenas a deux roues « ? ? ». Le petit mot : le plus grand nombre avec un 2 et un 6.
   Question : A (62) ; pièges 26 (le plus petit) et 8 (2 + 6).
   ⭐ 27/11 : pas de « TU PARIES ? » écrit : l'accroche = le coffre qui brille, le cadenas « ? ? » + « Quel est le code ? ».
   Ceinture blanche. Commentaire : avec 1 et 9, le plus petit nombre. La carte se range à droite sous l'ardoise, Ti Margo à gauche.
   ============================================================ */
FILMS['defi']=function(outils){
  const DUR={'00-accroche':12.32,'01-question':12.23,'01b-reponse':10.69,'02-commentaire':8.06,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':3.3,'01b-reponse':1.6,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tJai=m0("J'ai"), tTresor=m0('trésor'), tCad=m0('cadenas'), tMot=m0('mot'), tGrand=m0('grand'), t2=m0('deux'), t6=m0('six'), tQuel=m0('Quel');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tA=mr('A'), tLe=mr('Le'), tPlus=mr('plus'), tGr=mr('grand'), tDev=mr('devant'), tSix=mr('six'), tPuis=mr('Puis'), tDeux=mr('deux'), t62=mr('Soixante-deux'), tClic=mr('Clic'), tOuvre=mr("s'ouvre");
  const mc=w=>mot('02-commentaire',w), tUn=mot('02-commentaire','un',2), tNeuf=mc('neuf'), tPetit=mc('petit'), tRep=mc('réponds');
  const finTitre=tJai-.08;

  const CX=500, CY=660, CW=560;
  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* à toi : avec 1 et 9, le plus petit nombre ? */
      if(T>=tUn) carteNumE(c,300,290,200,1,{a:-.08,z:zoom(T,tUn,.5)});
      if(T>=tNeuf) carteNumE(c,560,290,200,9,{a:.08,z:zoom(T,tNeuf,.5)});
      if(T>=tPetit){ ecrire(c,'le plus petit ?',430,590,76*zoom(T,tPetit,.5),CRAIE.blanc); ecrire(c,'?',830,290,170*(1+.05*Math.sin(T*5)),CRAIE.jaune); }
      tab.maj(); return; }
    /* la plage : le ciel, la mer, le sable */
    c.fillStyle='#74c0fc'; c.fillRect(0,0,1056,210); c.fillStyle='#ffe066'; c.beginPath(); c.arc(940,80,48,0,7); c.fill();
    merE(c,T,200); sableE(c,290);
    const ouvre=T>=r?entreE(T,tOuvre-.3,tOuvre+.8):0;
    coffreE(c,CX,CY,CW,{ouvre,brille:T>=tTresor?(T>=r?Math.max(.5,ouvre):.55+.25*Math.sin(T*3)):0});
    if(T>=tTresor&&T<r) for(const [x,y] of [[190,360],[810,350],[500,250]]) if(Math.sin(T*5+x)>.2) etincelle(c,x,y,12+5*Math.sin(T*7+x));
    /* le cadenas à deux roues */
    if(T>=tCad&&ouvre<.4){ const z=Math.min(1,zoom(T,tCad,.5));
      let r1='?', r2='?', t1=false, t2b=false;
      if(T>=r){ if(T>=tDev-.3&&T<tSix) t1=true; else if(T>=tSix) r1='6';
        if(T>=tPuis-.2&&T<tDeux) t2b=true; else if(T>=tDeux) r2='2'; }
      c.save(); c.globalAlpha=1-Math.min(1,ouvre*2.5); cadenasE(c,CX,CY-135,1.05*z,r1,r2,{tourne1:t1,tourne2:t2b,T,ouvert:T>=tClic?entreE(T,tClic,tClic+.3):0}); c.restore(); }
    /* le petit mot : « 2 et 6 » */
    if(T>=tMot&&T<r) petitMotE(c,905,300,T>=t2?2:'',T>=t6?6:'',zoom(T,tMot,.5));
    if(T>=tQuel&&T<r) ecrire(c,'?',CX,140,140*zoom(T,tQuel,.5)*(1+.05*Math.sin(T*5)),CRAIE.jaune);
    if(T>=r&&T>=t62){ plaqueNumE(c,62,CX,115,110*zoom(T,t62,.5)); }
    /* clic ! les étoiles s'envolent du coffre */
    if(ouvre>0) for(let k=0;k<9;k++){ const u=((T-tOuvre)*.6+k/9)%1; if(T<tOuvre-.2) break; etincelle(c,CX-230+k*58+20*Math.sin(T*2+k),420-u*330,10+10*(1-u),`rgba(255,236,153,${1-u})`); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); qd.jusque('Quel'); const phraseQ=[qd('Quel est le code du coffre ?')];
  const tq=(w,n=1)=>mot('01-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const r1=phraseE('Devant : 6',[tDev,tDev,tSix]);
  const r2=phraseE('6, puis 2 : 62 !',[tSix,tPuis,tDeux,tDeux,t62,t62]);

  poserMiniature(outils,q-.3,'Quel est<br>le code ?',ardoiseMini([['🔒'],['? ?','#ffd43b']]));
  return { clips,FIN,titre:'Le coffre au trésor',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['62',tq('A'),tq('soixante-deux')],['26',tq('B'),tq('vingt-six')],['8',tq('C'),tq('huit')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=q&&T<com) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tCad?g.fier():(T<tQuel?g.montre():g.reflechit()); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<t62?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.reflechit(); }
    } };
};
