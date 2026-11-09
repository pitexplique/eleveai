/* ============================================================
   SAPHIR — short vertical (1080 × 1920) de l'épisode 2 « Le milieu du cercle »
   Collé par scripts/film-saphir-short.mjs À L'INTÉRIEUR du bloc de episode2.js (il en voit les noms),
   juste avant sa première image. episode2.js n'est pas modifié.
   segments : les extraits, en temps de l'épisode ; PLANS_V : les cadrages verticaux, en temps de l'épisode.
   Les deux questions-pauses de l'épisode restent hors des extraits.
   ============================================================ */
renderer.setSize(1080, 1920); camera.aspect = 1080 / 1920; camera.updateProjectionMatrix();
{
  const stV = document.createElement('style');
  stV.textContent = `#titreS{padding-top:520px}#titreS .t{font-size:124px;letter-spacing:.32em;padding-left:.32em}#titreS .s{font-size:50px;letter-spacing:.12em}
#finS .t{font-size:118px;letter-spacing:.28em;padding-left:.28em}#finS .s{font-size:54px;letter-spacing:.2em;padding-left:.2em}
#finS .e{font-size:58px;margin-top:110px;padding:0 70px;line-height:1.45}#finS .e b{display:block;margin-top:40px;font-size:62px;color:#ffd27a}
#poeme{font-size:46px;padding:0 60px;bottom:170px}`;
  finS.querySelector('.e').innerHTML = 'Énigme :<br>pourquoi un cristal de neige<br>a-t-il toujours six branches ?<b>Réponds en commentaire !</b>';
  document.head.append(stV);
}
/* la page des calculs (gauche) : on la lit de haut en bas, à la place du vieil homme */
const PAGE_G = v => uvVersMonde(.25, v);
const PLANS_V = [
  /* 1. Le réveil : le feu, le titre */
  [0, u => ({ p: Vx(-2.3, 1.7, .7).lerp(Vx(-2.7, 1.8, .3), u), c: Vx(-5.3, 1.5, CZ), f: 50 })],
  /* 2. Elle ouvre les yeux : bleu saphir, l'écharpe rouge */
  [P1 + 11, (u, T, x) => ({ p: x.tf.clone().add(Vx(.75, 1.3, .3)), c: x.tf.clone().add(Vx(-.05, 0, 0)), f: L(40, 34, u) })],
  /* 3. Ce qu'elle voit : le grand-père à sa table */
  [P2 + 5, (u, T, x) => ({ p: Vx(2.2, 3.0, .7).lerp(Vx(2.5, 3.0, .4), u), c: x.tv.clone().add(Vx(0, -.6, .4)), f: 42 })],
  /* 4. Le cahier : les calculs, lisibles, de haut en bas */
  [P4, u => { const c = uvVersMonde(.25, .3); return { p: c.clone().add(Vx(0, 1.3, -.12)), c, f: 64 }; }],
  /* 5. Le compas, puis les huit traits et la lettre r */
  [P4 + 10, u => ({ p: Vx(CENTRE_DESSIN.x + .1, 2.6, -.55), c: CENTRE_DESSIN.clone().add(Vx(0, .25, -.15)), f: 40 })],
  /* 6. « Et le milieu, c'était toi. » : eux deux, à la table */
  [AM - 1, (u, T, x) => ({ p: Vx(3.0, 3.0, 1.1), c: Vx(3.4, 2.35, -2.2), f: 46 })],
  /* 7. Dehors, depuis la fenêtre : rien ne bouge */
  [P5 + 17, u => ({ p: Vx(6.15, 2.6, 2.8), c: Vx(27, 2.3, 4.5), f: L(30, 24, u) })],
  /* 8. Eux deux à la fenêtre, vus du dehors : « Les maths, ça sert simplement à comprendre le monde. » */
  [AW - 2, (u, T, x) => ({ p: Vx(9.2, 2.8, 1.6), c: Vx(5.9, 2.8, 2.75), f: 42 })],
  /* 9. Le cristal à six branches s'allume sur la vitre */
  [P6 + 12.5, (u, T, x) => ({ p: x.tf.clone().add(Vx(-.4, .35, -.3)).lerp(x.tf.clone().add(Vx(-.2, .45, -.2)), u), c: Vx(5.95, CRISTAL.y, CRISTAL.z), f: L(26, 20, u) })]];
/* En 9:16, le cadre serré sur les calculs passe sur le crayon et la règle posés à côté du cahier :
   pendant ce seul passage, on les pousse un peu plus loin sur la table (la scène de l'épisode n'est pas modifiée). */
const regle = scene3d.children.find(o => o.isMesh && o.geometry && o.geometry.parameters && o.geometry.parameters.width === .9 && o.geometry.parameters.depth === .1);
const REGLE0 = regle ? regle.position.clone() : null;
window.cameraShort = (T, x) => {
  const deplace = T >= P4 - 1 && T < AL - 1;
  if (regle) regle.position.copy(REGLE0).add(Vx(deplace ? .7 : 0, 0, 0));
  if (deplace) crayon.position.x += .7;
  let i = PLANS_V.length - 1; while (i > 0 && PLANS_V[i][0] > T) i--;
  const fin = (PLANS_V[i + 1] || [FIN])[0], u = Math.min(1, Math.max(0, (T - PLANS_V[i][0]) / (fin - PLANS_V[i][0])));
  const { p, c, f } = PLANS_V[i][1](u, T, x);
  camera.position.copy(p); camera.lookAt(c); camera.fov = f; camera.updateProjectionMatrix();
};
window.short = { segments: [
  [3.5, 8.5],                 /* le feu, « SAPHIR — Le milieu du cercle » */
  [P1 + 11.5, P1 + 17],       /* le réveil, les yeux bleu saphir */
  [P4 + 6, P4 + 10],          /* le cahier : 8 loups, 360° ÷ 8 = 45°, r ≈ 4 pas, P = 2 × π × r */
  [P4 + 10, P4 + 14],         /* le cercle au compas */
  [AL - .3, FM + 1.5],        /* « Hier, les loups étaient assis comme ça. Tous à la même distance. », les huit rayons,
                                 puis « Et le milieu, c'était toi. » */
  [P5 + 17.5, P5 + 21.5],     /* la fenêtre : les loups immobiles, personne ne bouge */
  [AW - 1, FW + 1],           /* « Les maths, ça sert simplement à comprendre le monde. » */
  [P6 + 13, P6 + 18.5],       /* le cristal à six branches */
  [FINS - 1, FIN]] };         /* fondu, « SAPHIR — à suivre » et l'énigme : réponds en commentaire */
