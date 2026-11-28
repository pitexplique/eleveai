/* ============================================================
   Série Idriss, monnaie CP — SHORT 08 : « La vieille boîte à hameçons » (micro cp_monnaie_valeur), 28/11/2026.
   Voix (validée) : manim/voix/idriss-cp-valeur-short.json.
   De la vieille boîte sortent un billet de 10 € et quatre pièces de 1 € : combien ? Bonne réponse C (14 €).
   Ceinture blanche. Commentaire : deux billets de 5 € et une pièce de 2 €.
   ============================================================ */
FILMS['cp-valeur']=function(outils){
  const DUR={'00-accroche':8.945,'01-question':13.04,'01b-reponse':11.84,'02-commentaire':9.8,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();
  { const css=document.createElement('style'); css.textContent='#titre{font-size:62px!important;}'; document.head.append(css); } /* le titre tient sur une ligne */

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tIdriss=m0('Idriss'), tSecoue=m0('secoue'), tSort=m0('sort'), tDix0=m0('dix'), tQuatre0=m0('quatre');
  const mq=w=>mot('01-question',w), tCombien=mq('Combien');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tC=mr('C'), tDix=mr('Dix'), tOnze=mr('onze'), tDouze=mr('douze'), tTreize=mr('treize'), tQuatorze=mr('quatorze'), tQuatorze2=mr('quatorze',2), tA=mr('A'), tPieces=mr('pièces'), tArgent=mr("l'argent");
  const mc=(w,n=1)=>mot('02-commentaire',w,n), tDeuxC=mc('deux'), tCinqC=mc('cinq'), tPieceC=mc('pièce'), tDeuxC2=mc('deux',2), tCombienC=mc('Combien'), tRep=mc('réponds');
  const finTitre=tIdriss-.08;

  const BOITE=[560,480], BIL=[215,605], PCS=[[430,605],[545,605],[660,605],[775,605]];
  const tCompte=[tOnze,tDouze,tTreize,tQuatorze];
  function etal(c){ c.fillStyle='#c08550'; c.fillRect(0,480,1056,240); c.strokeStyle='#6b3a10'; c.lineWidth=5; c.beginPath(); c.moveTo(0,480); c.lineTo(1056,480); c.stroke();
    c.fillStyle='rgba(255,255,255,.15)'; c.fillRect(0,486,1056,10); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* deux billets de 5 € et une pièce de 2 € : combien ? */
      if(T>=tCinqC){ euroE(c,5,230,330,54,{z:zoom(T,tCinqC,.4),grand:1}); euroE(c,5,560,330,54,{z:zoom(T,tCinqC+.15,.4),grand:1}); }
      if(T>=tDeuxC2) euroE(c,2,875,330,82,{z:zoom(T,tDeuxC2,.4)});
      if(T>=tCombienC) ecrire(c,'= ?',528,580,150*zoom(T,tCombienC,.5),CRAIE.jaune);
      tab.maj(); return; }

    etal(c);
    idrissE(c,945,720,1.18,{T,montre:T>=tSort&&T<q?1:0});
    /* la boîte rouillée : secouée, puis le couvercle s'ouvre */
    const sec=T>=tSecoue&&T<tSort?1:0;
    boiteHameconsE(c,BOITE[0],BOITE[1]-4,240,{ouvre:entreE(T,tSort-.3,tSort+.2),tremble:sec,T});
    /* le billet et les quatre pièces sautent de la boîte */
    const sorties=[[BIL,tDix0,10],...PCS.map((p,k)=>[p,tQuatre0+k*.15,1])];
    sorties.forEach(([p,t0,v],k)=>{ if(T<t0-.3) return; const u=entreE(T,t0-.3,t0+.4); const pp=sautE([BOITE[0],BOITE[1]-110],p,u,170);
      const lu=T>=r&&T<com?((k===0&&T>=tDix&&T<tOnze+.1)||(k>0&&T>=tCompte[k-1]&&T<tCompte[k-1]+.9)||(T>=tQuatorze2&&T<tA)?.55+.45*Math.sin(T*5):0):0;
      euroE(c,v,pp[0],pp[1],v>2?50:50,{grand:1,lueur:lu,a:(1-u)*3}); });
    if(T<r){ if(T>=tCombien) ecrire(c,'?',528,140,150*zoom(T,tCombien,.5),CRAIE.jaune); }
    else {
      /* on compte : 10, puis 11, 12, 13, 14 au-dessus de chaque pièce */
      if(T>=tDix) ecrire(c,'10',BIL[0],505,62*zoom(T,tDix,.4),CRAIE.jaune);
      PCS.forEach((p,k)=>{ if(T>=tCompte[k]) ecrire(c,String(11+k),p[0],515,58*zoom(T,tCompte[k],.4),CRAIE.jaune); });
      if(T>=tQuatorze2) formuleE(c,T,528,130,['10','+','1','+','1','+','1','+','1','=','14 €'],
        Array(11).fill(tQuatorze2),64,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
      if(T>=tPieces){ ecrire(c,'5 pièces, pas 5 €',528,260,56*zoom(T,tPieces,.4),CRAIE.faux); }
      if(T>=tQuatorze2&&T<tA) for(const [x,y] of [[120,90],[940,200]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd("Combien d'argent dans la boîte ?")];
  const tq=(w,n=1)=>mot('01-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rep1=phraseE('14 € dans la boîte',[tQuatorze2,mr('euros'),mr('dans'),mr('la'),mr('boîte')]);

  poserMiniature(outils,q-.3,'Combien<br>dans la boîte ?',ardoiseMini([['10 € 1 € 1 € 1 € 1 €','#ffd43b'],['= ?']]));
  return { clips,FIN,titre:'La vieille boîte à hameçons',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['5 €',tq('A'),tq('euros',1)],['40 €',tq('B'),tq('euros',2)],['14 €',tq('C'),tq('euros',3)]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[rep1],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=finTitre&&T<f) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q) g.montre();
      else if(T<r) g.reflechit();
      else if(T<com){ T>=tQuatorze2&&T<tA?g.fier():g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
