/* La PAYSAGE (1920 × 1080) des nombres entiers CP (25/11/2026) : les dessins de films/cp-entier.js, relus ici
   (comme 6e-seance-paysage.js relit 6e-seance.js). Les films paysage sont dans films/cp-entier-paysage-<épisode>.js.
   ⚠ Relu par un <script> en ligne, pas par eval : les « const » de cp-entier.js (sautE, NOMBRES_E…) restent ainsi
   visibles des autres fichiers, comme quand page.html le charge lui-même. */
(function(){ const x=new XMLHttpRequest(); x.open('GET','films/cp-entier.js',false); x.send();
  const s=document.createElement('script'); s.textContent=x.responseText; document.head.append(s); })();

/* Le cadre commun des paysages CP : Ti Margo à gauche, le grand tableau à droite (dessins du short ×1,25).
   Pendant une question, l'ardoise reste visible : on dessine à GAUCHE de l'ardoise (x < 520), la carte va à droite. */
function cadrePaysageE(){
  const tab=poserTableau({L:6.6,H:3.75,x:1.85,y:2.75}); ardoisePaysage(tab);
  const css=document.createElement('style'); css.textContent=`
    #titre{left:300px;right:300px;top:40px;font-size:66px;}
    #echelle{left:560px;right:560px;top:170px;}
    #legende{left:420px;right:420px;padding:10px 26px;border-radius:30px;line-height:1.15;}
    #carte{left:1290px!important;right:30px!important;top:40px!important;padding:16px 20px!important;}
    #carte .choix{font-size:72px;margin:8px 4px;}
    #fin{left:430px;right:430px;top:60px;font-size:56px;padding:22px;}
    #fin .site{font-size:88px;margin:6px 0 12px;} #fin .geste{margin:4px 0;} #fin .ico{font-size:62px;}
    /* 26/11, Frédéric : « On laisse juste Entraîne-toi sur eleveai.fr ou youtube @eleveai974 » : ni pouce, ni abonnement, ni cloche */
    #f3,#f6{display:none!important;} #fin #f5{font-size:64px;}`;
  document.head.append(css);
  document.getElementById('f4').innerHTML='<span>ou sur YouTube</span>';
  return tab; }

/* La caméra des paysages : gros plan au titre, Ti Margo à gauche du tableau ensuite, seul à gauche pour la fin */
function camPaysageE(cam,{gros,fin}){ scene.x=-2.95; scene.ry=.22; cam.x=0; cam.y=2.3; cam.d=7.1; cam.e=.02;
  if(gros){ scene.x=0; scene.ry=-.12; cam.y=2.75; cam.d=8.6; }
  if(fin){ scene.x=-3.6; scene.ry=.25; } }

/* La miniature paysage : Ti Margo à gauche, le titre dans un cadre blanc à droite, « Dessin animé » */
function miniPaysageE(outils,t,html){ window.tiMargoMiniature=()=>{ const {$,carte,legende}=outils; window.MINI=true; window.tiMargo.aller(t);
  carte.style.display='none'; legende.style.display='none'; $('titre').style.display='none'; $('fin').style.display='none'; $('echelle').style.display='none';
  const m=document.createElement('div'); m.className='cv'; m.innerHTML=html;
  m.style.cssText='left:760px;right:60px;top:110px;z-index:6;font-size:112px;line-height:1.05;text-align:center;background:#fff;border:8px solid #17452a;border-radius:40px;padding:26px 20px;';
  document.body.append(m);
  const d=document.createElement('div'); d.className='cv'; d.textContent='Dessin animé';
  d.style.cssText='left:960px;right:260px;bottom:60px;text-align:center;font-size:64px;background:#17452a;color:#fff;border-radius:999px;padding:12px 0;z-index:6;'; document.body.append(d); }; }


/* Un doigt qui montre (emoji), pointe vers le bas, posé au-dessus de (x, y) */
function doigtE(c,x,y,taille=70){ c.font=`${taille}px "Segoe UI Emoji"`; c.textAlign='center'; c.textBaseline='bottom'; c.fillText('👇',x,y); }
