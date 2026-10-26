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
