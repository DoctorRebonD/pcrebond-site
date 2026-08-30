# PC Rebond — activation de l'administration

Le site reste identique côté public. Les fonctions dynamiques sont préparées mais nécessitent trois ressources Cloudflare gratuites : D1, R2 et Access.

## 1. D1 — témoignages et index de galerie
Créer une base `pcrebond-data`, remplacer `A_REMPLACER_APRES_CREATION_D1` dans `wrangler.jsonc` par son ID, puis exécuter `schema.sql` sur cette base.

## 2. R2 — photos
Créer le bucket `pcrebond-media`. Il est lié au Worker sous le nom `MEDIA`.

## 3. Cloudflare Access — ADMIN uniquement
Créer une application Access pour `pcrebond.fr/admin.html` et une autre règle/application couvrant `pcrebond.fr/api/admin/*`.
Autoriser uniquement l'adresse e-mail de l'administrateur PC Rebond. Ne jamais créer de règle Bypass publique sur ces chemins.

## 4. Déploiement
Après création des ressources et configuration de l'ID D1 : `npx wrangler deploy`.

## Fonctionnement
- `/api/reviews` POST : public, enregistre toujours un avis en `pending`.
- `/api/reviews` GET : public, retourne seulement les avis `published`.
- `/admin.html` : interface ADMIN.
- `/api/admin/*` : publication/modification/suppression des avis et gestion des photos ; à protéger par Access.
- Les photos sont stockées dans R2 et visibles publiquement via `/media/...` seulement après ajout ADMIN.

## Sécurité
L'interface ADMIN n'est pas considérée sécurisée tant que Cloudflare Access n'est pas activé sur `/admin.html` ET `/api/admin/*`.
