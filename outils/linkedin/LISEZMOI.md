# Visuels LinkedIn Neotech Solutions

Cartes et carrousels 1080 × 1350 (portrait LinkedIn), faits sans outil externe ni image générée par IA.

- `base.css` : charte Neotech (bleu nuit #0D1B2A, or #C9A84C / #E8C97A, crème #F5F0E8 ; Lora pour les titres, Inter pour le texte ; polices dans `fonts/`, licence SIL OFL).
  Classes : `.slide.nuit` / `.slide.creme`, `.kicker`, `h1` / `h2` (avec `<em>` en or italique), `.filet`, `.chiffre`, `ol` / `ul`, `.encart`, `.source`, `.pied` (logo + contact), `.grain`.
- `exemple-commencez-petit.html` : exemple de référence validé (niveau de qualité attendu).
- Une page HTML par post dans `semaines/AAAA-MM-JJ/` (lundi de la semaine) ; chaque `<section class="slide">` devient une image.
- Rendu : `node outils/linkedin/render.mjs <page.html> linkedin <AAAA-MM-JJ-sujet>` (Playwright).
- Les images sont servies par GitHub Pages : `https://celine06800.github.io/neotech-media/linkedin/<fichier>.png`, pour que Metricool les récupère.

Règles (plan de campagne LinkedIn Neotech) : vouvoiement ; secret professionnel (aucun vrai cabinet, client ou dossier ; captures NeoDesk avec des données fictives uniquement) ;
toute règle ou tout chiffre URSSAF, CNBF, impôt ou TVA vérifié sur une source officielle et cité en `.source` ; jamais de prix, de date d'ouverture, de témoignage,
ni de « hébergé en France », « conforme RGPD » ou certification tant que Céline ne l'a pas confirmé. Les posts restent en brouillon dans Metricool jusqu'à sa validation.

## Vidéos (ajout du 02/11/2026)

Une petite vidéo animée toutes les 2 semaines, à la place d'un visuel fixe, sur le post qui s'y prête le mieux.

- Format : 1080 × 1350 (portrait 4:5), 15 à 30 s, 30 images/s, **sans son** (LinkedIn lance les vidéos en muet) : tout le message est écrit à l'écran, sans visage, sans image générée par IA.
- `anim.css` : animations à poser sur les éléments avec un délai `--d` (en secondes) : `.fondu`, `.monte`, `.gauche`, `.zoom`, `.trace` (filet qui se dessine), `.compteur`, `.sort` ; `.scene` = un écran plein qui entre à `--d` et sort à `--f` (contenu centré).
- Accroche lisible dès la 1re image : première scène et titre avec `--d:-1s`.
- Rendu : `node outils/linkedin/render-video.mjs <page.html> <durée_s> linkedin/<AAAA-MM-JJ-sujet>.mp4`, puis contrôle de 5 à 6 images avec ffmpeg avant mise en ligne.
- Une page par vidéo dans `semaines/AAAA-MM-JJ/` (avec `<link rel="stylesheet" href="../../anim.css">`).
- Exemple validé : voir la page `exemple-video-*.html` de ce dossier.
- Dans Metricool : `media` = l'adresse publique du MP4 (`https://celine06800.github.io/<dépôt>/linkedin/<fichier>.mp4`), `linkedinData {"type":"post"}`.
