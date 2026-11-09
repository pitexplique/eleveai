/* ============================================================
   SAPHIR — short vertical (1080 × 1920) de l'épisode 1 « Le cercle des loups »
   Collé par scripts/film-saphir-short.mjs À L'INTÉRIEUR du bloc de episode1.js (il en voit les noms),
   juste avant sa première image. episode1.js n'est pas modifié.
   segments : les extraits, en temps de l'épisode ; PLANS_V : les cadrages verticaux, en temps de l'épisode.
   ============================================================ */
renderer.setSize(1080, 1920); camera.aspect = 1080 / 1920; camera.updateProjectionMatrix();
{
  const stV = document.createElement('style');
  stV.textContent = `#titreS{font-size:124px;padding-top:520px;letter-spacing:.32em;padding-left:.32em}
#finS .t{font-size:118px;letter-spacing:.28em;padding-left:.28em}#finS .s{font-size:54px;letter-spacing:.2em;padding-left:.2em}`;
  document.head.append(stV);
}
const versC0 = v => plat(C0.clone().sub(v)).normalize();
const PLANS_V = [
  /* 1. Le blanc, le titre : l'horizon bas, le traîneau minuscule au loin */
  [0, (u, T, x) => ({ p: Vx(-22, H(-22, 16) + 3.2, 16).lerp(Vx(-25, H(-25, 13) + 3, 13), T / 20), c: Vx(-52, 4.2, -1), f: 46 })],
  /* 2. L'attelage vient vers nous, de trois quarts : la file des chiens monte dans l'image */
  [21, (u, T, x) => ({ p: x.tp.clone().addScaledVector(x.av, 13.5).addScaledVector(x.lat, 2.6).add(Vx(0, 2.2, 0)), c: x.tp.clone().addScaledVector(x.av, 2.8).add(Vx(0, 1.0, 0)), f: 42 })],
  /* 3. Ce qu'il voit : le cercle des loups sur la crête */
  [A.p3 + 3, (u, T, x) => ({ p: x.tv.clone().addScaledVector(versC0(x.tv), 1.2).add(Vx(0, .25, 0)), c: C0.clone().add(Vx(0, H(C0.x, C0.z) + .7, 0)), f: L(34, 29, u) })],
  /* 4. Son visage, côté loups, pendant qu'il parle */
  [A.p3 + 7.5, (u, T, x) => ({ p: x.tv.clone().addScaledVector(versC0(x.tv), 5.2).add(Vx(0, .15, 0)), c: x.tv.clone().add(Vx(0, -.55, 0)), f: 38 })],
  /* 5. Plongée : le traîneau monte, le cercle en haut, le loup qui s'écarte */
  [P4 + 7, (u, T, x) => ({ p: x.tp.clone().addScaledVector(plat(x.tp.clone().sub(C0)).normalize(), 7.5).addScaledVector(Vx(versC0(x.tp).z, 0, -versC0(x.tp).x), 2).add(Vx(0, 12.5, 0)), c: x.tp.clone().lerp(C0, .5).add(Vx(0, .5, 0)), f: 54 })],
  /* 6. Au centre : les deux formes, l'écharpe rouge au vent, lui debout */
  [P5 + 17, (u, T, x) => { const m = P_FILLE.clone().lerp(P_STOP, .35); return { p: surSol(C0.clone().addScaledVector(rotY(gdir, -2.2), 4.2), 3.5), c: surSol(m.clone().addScaledVector(perp, -.35), 1.2), f: 62 }; }],
  /* 7. Elle ouvre les yeux : bleu saphir */
  [P5 + 25, (u, T, x) => ({ p: x.tf.clone().addScaledVector(gdir, L(1.3, 1.05, ss(0, 1, u))).addScaledVector(perp, L(.75, .6, ss(0, 1, u))).add(Vx(0, .1, 0)), c: x.tf.clone().add(Vx(0, -.21, 0)), f: 45 })],
  /* 8. « Là… Je te tiens. » : elle dans ses bras, l'écharpe rouge */
  [A6 - 2, (u, T, x) => { const m = x.tf.clone().lerp(x.tv, .5); return { p: x.tf.clone().addScaledVector(dirAngle(x.vh), .9).addScaledVector(latAngle(x.vh), 4.6).add(Vx(0, .3, 0)), c: m.clone().add(Vx(0, -.1, 0)), f: 40 }; }],
  /* 9. Le retour : derrière, en hauteur, la file des loups qui suit le traîneau */
  [P7 + 8, (u, T, x) => { const s = S(T), sl = surChemin(s).p, mi = surChemin(s - 13).p, d = plat(sl.clone().sub(mi)).normalize(); return { p: mi.clone().addScaledVector(d, -13).add(Vx(0, 8, 0)), c: mi.clone().lerp(sl, .45).add(Vx(0, .4, 0)), f: 46 }; }],
  /* 10. Les loups assis sur la colline, face à la cabane éclairée */
  [P8 + 3, (u, T, x) => { const d = plat(surSol(CABANE).sub(COLLINE)).normalize(); return { p: surSol(COLLINE.clone().addScaledVector(d, -11).addScaledVector(Vx(d.z, 0, -d.x), 2), 5.5), c: surSol(COLLINE.clone().lerp(CABANE, .55), 1.2), f: 44 }; }],
  /* 11. Ce qu'elle voit : le ciel, l'étoile bleue */
  [P8 + 13, (u, T, x) => ({ p: x.tf.clone().addScaledVector(x.av, .2).add(Vx(0, .35, 0)), c: x.tf.clone().addScaledVector(x.av, 20).add(Vx(0, L(25, 31, ss(0, 1, u)), 0)), f: 52 })]];
window.cameraShort = (T, x) => {
  let i = PLANS_V.length - 1; while (i > 0 && PLANS_V[i][0] > T) i--;
  const fin = (PLANS_V[i + 1] || [FIN])[0], u = Math.min(1, Math.max(0, (T - PLANS_V[i][0]) / (fin - PLANS_V[i][0])));
  const { p, c, f } = PLANS_V[i][1](u, T, x);
  const sol = H(p.x, p.z) + .4; if (p.y < sol) p.y = sol;
  camera.position.copy(p); camera.lookAt(c); camera.fov = f; camera.updateProjectionMatrix();
};
window.short = { segments: [
  [8, 13.5],                    /* le titre SAPHIR */
  [24, 29],                   /* l'attelage */
  [A.p3 + 4, A.p3 + 11.6],    /* le cercle des loups, « Qu'est-ce que vous gardez, vous… » */
  [P4 + 8, P4 + 14],          /* le cercle s'ouvre */
  [P5 + 18, P5 + 21.5],       /* l'écharpe rouge, les deux formes */
  [P5 + 26, P5 + 32],         /* les yeux bleu saphir */
  [A6 - 1, A6 + 6],           /* « Là… Je te tiens. », l'écharpe autour d'elle */
  [P7 + 12, P7 + 19],         /* les loups suivent */
  [P8 + 9, P8 + 13],          /* les loups assis devant la cabane */
  [P8 + 14.5, FIN]] };        /* l'étoile bleue, puis « SAPHIR — à suivre » */
