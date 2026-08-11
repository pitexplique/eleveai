-- LA CLASSE DE DÉMONSTRATION « 6ᵉ TEST » — évaluation nationale de 6ᵉ.
--
-- POURQUOI (demande de M. Pelka, relayée par Frédéric le 11/08/2026) : il veut
-- se connecter avec SON code et voir la liste des entrants de 6ᵉ avec leurs
-- résultats. Sans données, la page est vide et ne démontre rien.
--
-- CE QUE LE SCRIPT CRÉE :
--   • 30 comptes élèves de 6ᵉ, codes 6ETEST-01 à 6ETEST-30 ;
--   • les résultats de l'épreuve de maths pour les 15 PREMIERS seulement.
--
-- ⚠️ LES QUINZE DERNIERS RESTENT VIERGES, ET C'EST VOULU. Du 16 au 30, les
-- comptes servent à passer l'épreuve pour de vrai avant la rentrée. Un
-- principal doit d'ailleurs voir les deux : ceux qui ont passé l'épreuve et
-- ceux qui ne l'ont pas encore passée. Une liste où tout le monde a un score
-- ne ressemble à aucune rentrée.
--
-- ⛔ À EFFACER AVANT LA RENTRÉE — voir demo_6e_dimitile_effacer.sql. Ces
-- résultats sont SIMULÉS : les laisser se mélanger aux vrais fausserait le
-- premier bilan de classe, celui sur lequel l'équipe va décider des groupes.
--
-- Les prénoms sont inventés et ne désignent aucun élève.
-- Les barèmes sont ceux du document professeur DEPP de septembre 2025 :
--   espace et géométrie   14 questions — à besoins ≤5,  satisfaisant ≥9
--   grandeurs et mesures  18 questions — à besoins ≤5,  satisfaisant ≥10
--   nombres et calculs    30 questions — à besoins ≤10, satisfaisant ≥17
--   automatismes          23 questions — à besoins ≤6,  satisfaisant ≥13
--   résolution problèmes  19 questions — à besoins ≤4,  satisfaisant ≥10
--
-- Le script est idempotent : on peut le rejouer sans créer de doublons.

do $$
declare
  -- ⚠️⚠️ METTRE ICI LE CODE ÉTABLISSEMENT DE M. PELKA, celui avec lequel il se
  -- connecte déjà. Sans ça, la classe se crée sous un établissement qui
  -- n'existe pas et il ne verra rien.
  v_etab text := 'REMPLACER-PAR-LE-CODE-DIMITILE';

  v_prenoms text[] := array[
    'Anaïs','Malik','Soline','Ryan','Kelly','Dimitri','Océane','Yohan',
    'Manon','Brandon','Laetitia','Kevin','Shana','Loïc','Emma',
    'Nathan','Alizée','Jordan','Maéva','Teddy','Cynthia','Bryan',
    'Ludivine','Steeve','Priscilla','Mickaël','Sabrina','Jean-Luc',
    'Fabiola','Rudy'
  ];

  i int;
  v_code text;
  v_eg int; v_gm int; v_nc int; v_auto int; v_rp int;
begin
  -- ── 1. LES TRENTE COMPTES ────────────────────────────────────────────────
  for i in 1..30 loop
    v_code := '6ETEST-' || lpad(i::text, 2, '0');

    if not exists (
      select 1 from public.acces_etablissement
      where code_etablissement = v_etab and code_utilisateur = v_code
    ) then
      insert into public.acces_etablissement
        (code_etablissement, code_utilisateur, type_utilisateur,
         nom, classe, mot_de_passe, actif)
      values
        (v_etab, v_code, 'eleve',
         v_prenoms[i], '6e', 'test' || lpad(i::text, 2, '0'), true);
    end if;
  end loop;

  -- ── 2. LES RÉSULTATS DES QUINZE PREMIERS ─────────────────────────────────
  -- Les scores sont tirés autour d'un profil, pour que la classe ressemble à
  -- une classe : quelques élèves solides, un gros milieu fragile, quelques-uns
  -- en difficulté. Une distribution uniforme donnerait un histogramme plat,
  -- que M. Pelka ne reconnaîtrait pas.
  for i in 1..15 loop
    v_code := '6ETEST-' || lpad(i::text, 2, '0');

    -- Profil : 1-3 solides, 4-11 milieu, 12-15 en difficulté.
    if i <= 3 then
      v_eg := 9 + floor(random() * 6)::int;    -- 9..14
      v_gm := 11 + floor(random() * 8)::int;   -- 11..18
      v_nc := 18 + floor(random() * 13)::int;  -- 18..30
    elsif i <= 11 then
      v_eg := 5 + floor(random() * 5)::int;    -- 5..9
      v_gm := 6 + floor(random() * 5)::int;    -- 6..10
      v_nc := 10 + floor(random() * 8)::int;   -- 10..17
    else
      v_eg := 2 + floor(random() * 4)::int;    -- 2..5
      v_gm := 2 + floor(random() * 4)::int;    -- 2..5
      v_nc := 4 + floor(random() * 7)::int;    -- 4..10
    end if;

    -- Les deux tests spécifiques traversent les domaines : leurs réussites
    -- sont un sous-ensemble de celles de « grandeurs » et « nombres ».
    v_auto := least(23, greatest(0, round((v_gm * 8.0 / 18) + (v_nc * 15.0 / 30))::int));
    v_rp   := least(19, greatest(0, round((v_gm * 9.0 / 18) + (v_nc * 10.0 / 30))::int));

    if not exists (
      select 1 from public.resultats_evaluation_nationale
      where code_etablissement = v_etab
        and code_utilisateur = v_code
        and classe = '6e' and matiere = 'maths'
    ) then
      insert into public.resultats_evaluation_nationale
        (code_etablissement, code_utilisateur, nom, classe, matiere,
         score, total, duree_sec, chrono_ecoule, details, created_at)
      values (
        v_etab, v_code, v_prenoms[i], '6e', 'maths',
        v_eg + v_gm + v_nc, 62,
        -- Certains finissent en avance, d'autres sont coupés par le chrono.
        case when i % 5 = 0 then 3000 else 1500 + floor(random() * 1400)::int end,
        i % 5 = 0,
        jsonb_build_object(
          'simule', true,
          'groupe',
            case
              when (v_eg + v_gm + v_nc) >= 37 then 'satisfaisant'
              when (v_eg + v_gm + v_nc) > 19 then 'fragile'
              else 'a_besoins'
            end,
          'themes', jsonb_build_array(
            jsonb_build_object(
              'id','espace_geometrie','label','Espace et géométrie',
              'justes', v_eg, 'total', 14,
              'groupe', case when v_eg >= 9 then 'satisfaisant'
                             when v_eg > 5 then 'fragile'
                             else 'a_besoins' end),
            jsonb_build_object(
              'id','grandeurs_mesures','label','Grandeurs et mesures',
              'justes', v_gm, 'total', 18,
              'groupe', case when v_gm >= 10 then 'satisfaisant'
                             when v_gm > 5 then 'fragile'
                             else 'a_besoins' end),
            jsonb_build_object(
              'id','nombres_calculs','label','Nombres et calculs',
              'justes', v_nc, 'total', 30,
              'groupe', case when v_nc >= 17 then 'satisfaisant'
                             when v_nc > 10 then 'fragile'
                             else 'a_besoins' end)
          ),
          'tests', jsonb_build_array(
            jsonb_build_object(
              'id','automatisme','label','Automatismes',
              'justes', v_auto, 'total', 23,
              'groupe', case when v_auto >= 13 then 'satisfaisant'
                             when v_auto > 6 then 'fragile'
                             else 'a_besoins' end),
            jsonb_build_object(
              'id','resolution_probleme','label','Résolution de problèmes',
              'justes', v_rp, 'total', 19,
              'groupe', case when v_rp >= 10 then 'satisfaisant'
                             when v_rp > 4 then 'fragile'
                             else 'a_besoins' end)
          ),
          'micros', '[]'::jsonb
        ),
        -- Étalé sur la semaine, comme une vraie passation par demi-groupes.
        now() - (i || ' hours')::interval
      );
    end if;
  end loop;
end $$;

-- Contrôle : 30 comptes, 15 résultats.
-- select count(*) from public.acces_etablissement
--   where code_utilisateur like '6ETEST-%';
-- select count(*) from public.resultats_evaluation_nationale
--   where code_utilisateur like '6ETEST-%';
