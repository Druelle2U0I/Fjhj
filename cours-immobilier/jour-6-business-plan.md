# JOUR 6 : Le business plan d'une opération immobilière

**Objectifs du jour**
- Connaître et calculer tous les indicateurs : rendements, cash-flow, TRI, VAN, multiple, DSCR, LTV, point mort.
- Construire un business plan complet et bancable pour 3 types d'opérations : achat-revente, immeuble locatif, division parcellaire.
- Faire des **stress tests** et une **analyse de sensibilité**.
- Présenter une opération en une page à une banque ou à un investisseur.

> 🛠 Travaille en parallèle dans `simulateur-operations.xlsx`, onglets **MdB** et **Locatif**.

---

## 1. La méthode : 7 blocs d'un business plan immobilier

1. **Synthèse (une page)** : le projet, les chiffres clés, le financement demandé, les risques et leurs parades.
2. **Hypothèses sourcées** : prix au m² (DVF), loyers (annonces, OLL), devis de travaux, taux de crédit (offre de principe), fiscalité retenue, calendrier.
3. **Tableau emplois / ressources** : ce que coûte l'opération et comment elle est financée. **Les deux colonnes doivent être égales.**
4. **Compte de résultat prévisionnel** : bilan de l'opération (MdB) ou résultat annuel sur 10 ans (locatif).
5. **Plan de trésorerie mensuel** : les décaissements (acte, situations de travaux, intérêts) et les encaissements (ventes, loyers). C'est lui qui montre le **besoin de trésorerie maximum**.
6. **Indicateurs de performance.**
7. **Scénarios et stress tests** : pessimiste, central et optimiste, plus une matrice de sensibilité.

---

## 2. Les indicateurs à maîtriser

| Indicateur | Formule | Lecture |
|---|---|---|
| **Rendement brut** | Loyers annuels HC / Prix d'achat | Indicateur d'annonce, souvent flatteur |
| **Rendement brut global** | Loyers annuels / (prix + frais + travaux + mobilier) | Plus honnête |
| **Rendement net** | (Loyers − vacance − charges non récupérables − TF − gestion − PNO) / coût total | Rentabilité réelle de l'actif, **avant crédit et impôt** |
| **Rendement net-net** | (Rendement net − impôts) / coût total | Après fiscalité |
| **Cash-flow** | Loyers encaissés − charges − mensualités (capital + intérêts + assurance) − impôts | Effort d'épargne (négatif) ou revenu (positif) |
| **Cash-on-cash** | Cash-flow annuel / fonds propres investis | Rendement de l'apport en trésorerie |
| **Marge nette (MdB)** | (Prix de vente HT − prix de revient − frais de vente) / Prix de vente | ≥ 15 % |
| **Rentabilité des fonds propres (ROE)** | Résultat net / fonds propres | ≥ 30 % par opération de MdB |
| **TRI** (taux de rendement interne) | Taux qui annule la VAN des flux (apport en négatif, cash-flows et revente en positif) | L'indicateur de référence des investisseurs. Compare des opérations de durées différentes |
| **VAN** | Σ flux actualisés au taux exigé | > 0 : l'opération crée de la valeur au-delà du taux exigé |
| **Multiple (MOIC)** | Total des flux récupérés / apport | « Combien de fois je récupère ma mise » |
| **DSCR** | Revenu net d'exploitation / annuité de la dette | ≥ 1,2-1,3 pour la banque |
| **LTV / LTC** | Dette / valeur ; dette / coût | Niveau de levier |
| **Point mort** | Prix de vente (ou loyer) minimum pour ne pas perdre d'argent | Marge de sécurité |

**Dans Excel** : `=TRI(plage_des_flux)` (ou `=TRI.PAIEMENTS(flux;dates)` pour des flux datés), `=VAN(taux;flux_1_à_n)+flux_0`, `=VPM(taux/12;n;-capital)` pour la mensualité.

---

## 3. Cas n°1 : opération d'achat-revente (marchand de biens)

Nous reprenons l'opération du jour 3 : appartement de 70 m² acheté 200 000 €, 60 000 € HT de travaux, revente 360 000 € après 9 mois, régime sans option TVA.

### 3.1 Emplois / ressources

| Emplois | € | Ressources | € |
|---|---|---|---|
| Prix d'achat | 200 000 | Prêt MdB in fine (80 % achat + travaux) | 217 600 |
| Frais d'acquisition (0,715 % + émoluments) | 4 500 | Fonds propres (holding ou associés) | 77 336 |
| Travaux TTC | 72 000 | | |
| Honoraires techniques | 3 600 | | |
| Frais financiers (intérêts + dossier + garantie) | 12 836 | | |
| Portage | 2 000 | | |
| **Total** | **294 936** | **Total** | **294 936** |

(Les frais d'agence de la revente, 14 400 €, sont prélevés sur le prix de vente.)

### 3.2 Plan de trésorerie simplifié

| Mois | Événement | Décaissement | Encaissement | Trésorerie cumulée des fonds propres |
|---|---|---|---|---|
| M0 | Acte : prix + frais + frais de dossier + garantie ; déblocage du prêt sur le prix | 209 176 | 160 000 (prêt) | −49 176 |
| M1-M5 | Travaux (situations mensuelles) ; déblocage du prêt sur factures | 72 000 + 3 600 | 57 600 (prêt) | −67 176 |
| M1-M9 | Intérêts et portage | 10 160 | — | −77 336 |
| M9 | Vente : prix − agence − remboursement du prêt | — | 360 000 − 14 400 − 217 600 | **+50 664** (marge avant IS) |

**Besoin maximum de fonds propres** : environ 77 000 €. C'est ce montant qu'il faut **sécuriser avant de signer**.

### 3.3 Stress tests

| Scénario | Marge avant IS | % du prix de vente | Résultat net après IS |
|---|---|---|---|
| **Central** | 50 664 € | 14,1 % | 42 248 € |
| Travaux +20 % | 35 717 € | 9,9 % | 30 359 € |
| Délai +6 mois (15 mois de portage) | 43 891 € | 12,2 % | 37 168 € |
| Prix de vente −10 % (324 000 €) | 16 104 € | 5,0 % | 13 688 € |
| **Combiné** (les trois) | **−5 905 €** | −1,8 % | perte |

**Point mort de revente** : environ **308 000 €**, soit −14 % par rapport au prix visé.

**Lecture d'expert** : l'opération ne résiste pas au scénario combiné, et **c'est le prix de vente qui est le facteur le plus sensible**. Parades : acheter plus bas (à 185 000 €, la marge centrale passe à ≈ 18,5 %), faire valider le prix de revente par **2 ou 3 agents**, **pré-commercialiser**, figer les travaux par des **devis fermes**, et prévoir un plan B : louer le bien si la vente traîne. Le prêt doit alors pouvoir être converti, et l'engagement de revendre sous 5 ans laisse du temps.

### 3.4 Matrice de sensibilité (marge nette en % du prix de vente)

| Prix d'achat → / Prix de vente ↓ | 180 000 € | 190 000 € | 200 000 € |
|---|---|---|---|
| 340 000 € | ≈ 15,5 % | ≈ 12,5 % | ≈ 9 % |
| 360 000 € | ≈ 20 % | ≈ 17 % | ≈ 14 % |
| 380 000 € | ≈ 24 % | ≈ 21 % | ≈ 18 % |

La matrice montre en un coup d'œil **la zone où l'opération est « go »** (≥ 15 %).

---

## 4. Cas n°2 : immeuble de rapport en LMNP réel (détention 10 ans)

### 4.1 Hypothèses
- Immeuble de 4 T2 meublés : prix 300 000 €, notaire 24 000 €, travaux 60 000 €, mobilier 10 000 €, soit un **coût total de 394 000 €**.
- Loyers de 4 × 790 € = **37 920 €/an** (+1,5 %/an), un mois de vacance par an.
- Charges : gestion 7 %, taxe foncière 3 000 €, PNO 600 €, entretien 1 000 €, expert-comptable 600 € (+2 %/an).
- Financement : **apport de 24 000 €** (les frais de notaire), prêt de 370 000 € à 3,6 % sur 25 ans, assurance 0,3 % → **1 965 €/mois**.
- TMI 30 %, prélèvements sociaux 17,2 %.
- Revente à l'année 10 : valeur de 390 000 € indexée à +1,5 %/an, soit ≈ **452 600 €**, avec 5 % de frais de vente.

### 4.2 Indicateurs de l'année 1
- Rendement brut sur le prix : 37 920 / 300 000 = **12,6 %**. Rendement brut global : 37 920 / 394 000 = **9,6 %**.
- Loyers encaissés (11 mois) : 34 760 €. Charges : 7 633 €. **Rendement net : 27 127 / 394 000 = 6,9 %.**
- Annuité : 23 577 €. **Cash-flow avant impôt : +3 550 €/an** (≈ +296 €/mois).
- DSCR : 27 127 / 23 577 = **1,15**, un peu juste pour une banque exigeante. Pour atteindre 1,2, il faut un peu plus d'apport ou une durée plus longue.
- **Impôt : 0 €** les 5 premières années grâce à l'amortissement (≈ 14 600 €/an), puis un impôt faible (300 à 2 600 €/an) quand les intérêts diminuent.

### 4.3 Flux sur 10 ans et TRI

| Année | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Flux net après impôt (k€) | −24,0 | 3,6 | 3,9 | 4,3 | 4,7 | 5,1 | 5,2 | 4,6 | 4,6 | 4,6 | 4,6 + **110,0** (revente) |

**Revente en année 10** :
- Prix net vendeur : 452 600 − 22 600 (5 %) = 430 000 €.
- Capital restant dû : ≈ 260 100 €.
- Plus-value des particuliers avec **réintégration des amortissements** (LF 2025) : prix d'acquisition 384 000 € − 146 000 € d'amortissements déduits = 238 000 €, donc une plus-value de ≈ 192 000 €. Après abattements pour 10 ans de détention (IR −30 %, PS −8,25 %) : IR ≈ 25 500 €, PS ≈ 30 300 €, surtaxe ≈ 4 000 €, soit **≈ 60 000 € d'impôt**.
- **Cash net de la revente : ≈ 110 000 €.**

**Résultats** : **TRI après impôt ≈ 27 %**, **multiple ≈ 6,5×** l'apport. C'est la puissance du **levier bancaire** : avec 24 000 € d'apport, on contrôle un actif de près de 400 000 €.

> **Lecture d'expert** : la réintégration des amortissements coûte environ 30 000 € d'impôt à la revente par rapport à l'ancien régime. **Garder le bien plus longtemps** (abattements), ou avoir **structuré en SCI IS** pour réinvestir sans distribuer, sont les deux parades. **Le TRI est très sensible à l'hypothèse de revente** : refais le calcul avec une valorisation à 0 %/an.

---

## 5. Cas n°3 : division parcellaire (détachement d'un terrain à bâtir)

### 5.1 Le projet
Une maison sur un terrain de 1 000 m² est achetée **265 000 €** par ta SAS MdB. Le PLU (zone UB) permet de détacher un lot de 400 m² constructible.
- Déclaration préalable de division, bornage par un géomètre (4 500 €), viabilisation du lot (eau, électricité, assainissement : 15 000 €).
- Rafraîchissement de la maison : 24 000 € TTC.
- Revente de la maison avec 600 m² de terrain : **285 000 €**. Revente du terrain à bâtir : **125 000 €**.
- 10 mois d'opération, financement à 80 % à 5 % in fine.

### 5.2 Bilan

| Poste | Montant |
|---|---|
| Prix d'achat + frais (2,25 %) | 270 963 € |
| Travaux + géomètre + viabilisation | 43 500 € |
| Frais financiers (intérêts, dossier, garantie) | 15 565 € |
| Portage | 2 500 € |
| **Prix de revient** | **332 528 €** |
| Chiffre d'affaires TTC (285 000 + 125 000) | 410 000 € |
| TVA sur le terrain à bâtir | voir ci-dessous |
| Frais d'agence | 15 150 € |

**Le point clé : la TVA sur le terrain à bâtir**
- La revente d'un terrain à bâtir par un assujetti est **obligatoirement soumise à la TVA**.
- Il faut **ventiler le prix d'achat** entre la maison et le terrain détaché. Ici, au prorata des valeurs : 265 000 × 125/410 ≈ 80 800 € pour le terrain.
- **Hypothèse A : TVA sur marge** : (125 000 − 80 800) × 20/120 ≈ **7 370 €** → marge nette ≈ **54 950 €** (13,4 %), résultat net ≈ 45 470 €, **ROE ≈ 51 %**.
- **Hypothèse B : TVA sur le prix total** (si l'administration conteste la marge, parce que le terrain a été acquis comme partie d'un **terrain bâti** et revendu comme **terrain à bâtir** : jurisprudence *Icade*) : 125 000 / 6 ≈ **20 830 €** → marge ≈ **41 490 €** (10,1 %), ROE ≈ 40 %.
- **La différence de 13 500 € justifie un rescrit ou une consultation fiscale avant de signer.** Le prix d'achat doit être négocié sur la base de l'hypothèse la plus prudente.

---

## 6. Présenter l'opération : la fiche synthèse d'une page

```
OPÉRATION : [Nom], [adresse]                            Porteur : SAS [MdB] (groupe Arbange Capital)
TYPE : Rénovation-revente / division / locatif       Durée : 9 mois       Régime TVA : exonéré
─────────────────────────────────────────────────────────────────────────────────
ACHAT     200 000 €   (2 857 €/m², DVF secteur rénové : 5 100 €/m²)
TRAVAUX    72 000 € TTC (devis fermes de 3 entreprises, aléas 10 % inclus)
PRIX DE REVIENT  294 936 €          PRIX DE VENTE  360 000 € (5 143 €/m², 3 comparables joints)
MARGE NETTE  50 664 € (14,1 %)      ROE  55 %         POINT MORT DE VENTE  308 000 € (−14 %)
─────────────────────────────────────────────────────────────────────────────────
FINANCEMENT DEMANDÉ : prêt in fine de 217 600 € (LTC 74 %), 12 mois, garantie : HLSPD + caution du dirigeant
FONDS PROPRES : 77 336 € (26 %) apportés par la holding, disponibles (relevé joint)
─────────────────────────────────────────────────────────────────────────────────
RISQUES ET PARADES : dérive des travaux → devis fermes + maître d'œuvre ; prix de vente → pré-commercialisation
à M6, plan B location ; délai → planning avec pénalités de retard des entreprises
```

---

## 7. Les 12 erreurs qui tuent un business plan

1. Prendre le **prix d'annonce** comme prix de revente (au lieu du DVF).
2. Oublier la **vacance**, la **taxe foncière**, la **copropriété non récupérable**, la **CFE**, l'**expert-comptable**.
3. Sous-estimer les **travaux** et oublier les **aléas** (+10 à 15 %).
4. Oublier les **frais financiers intercalaires** et les **frais de garantie**.
5. Négliger la **TVA** (MdB) ou la **fiscalité de sortie** (plus-value, réintégration des amortissements).
6. Faire un calcul « en cash-flow » sans regarder l'**enrichissement** (capital remboursé), ou l'inverse.
7. Ne pas faire de **plan de trésorerie mensuel**, et manquer de fonds propres en milieu de chantier.
8. Retenir un **taux de crédit théorique** sans offre de principe.
9. Ne pas faire de **stress test**.
10. Ignorer la **réglementation** : DPE, encadrement des loyers, permis de louer, changement d'usage.
11. Oublier le **temps de commercialisation** (3 à 6 mois en moyenne pour vendre).
12. Ne pas documenter les **sources**. Une banque veut voir d'où viennent les chiffres.

---

## Checklist du jour 6
- [ ] Je sais calculer rendement brut, net, net-net, cash-flow, DSCR, TRI, VAN et multiple.
- [ ] J'ai refait les 3 cas dans le simulateur Excel.
- [ ] Je sais construire un tableau emplois / ressources et un plan de trésorerie mensuel.
- [ ] Je fais systématiquement 4 stress tests et une matrice de sensibilité.
- [ ] J'ai une trame de fiche synthèse d'une page prête pour ma banque.

## Quiz du jour 6
1. Un T2 coûte 150 000 € (+12 000 € de notaire, +18 000 € de travaux) et se loue 750 €/mois. Calcule le rendement brut et le rendement brut global.
2. Quelle est la différence entre le TRI et le cash-on-cash ?
3. Pourquoi faut-il un plan de trésorerie mensuel en MdB ?
4. Dans le cas n°1, quel est le facteur le plus sensible ?
5. Quelle est la VAN au taux de 8 % d'une opération : −50 000 € en année 0, +60 000 € en année 1 ?
6. Pourquoi ventile-t-on le prix d'achat dans une division parcellaire ?
7. Un immeuble a un revenu net d'exploitation de 20 000 € et une annuité de 18 000 €. La banque exige un DSCR de 1,25. Est-ce suffisant ? Quelle annuité maximum ?
8. Quelle est l'influence de la réintégration des amortissements LMNP sur le TRI ?

### Corrigés
1. Brut : 9 000 / 150 000 = **6,0 %**. Brut global : 9 000 / 180 000 = **5,0 %**.
2. Le **cash-on-cash** ne mesure que le rendement annuel en trésorerie de l'apport, une année donnée. Le **TRI** intègre **tous les flux dans le temps**, y compris la revente et l'enrichissement, et tient compte du moment où ils interviennent.
3. Pour identifier le **besoin maximum de trésorerie** (avant les ventes) et s'assurer que les fonds propres et les déblocages bancaires couvrent chaque mois de l'opération.
4. Le **prix de revente** : −10 % sur la vente fait tomber la marge de 14,1 % à 5 %.
5. −50 000 + 60 000 / 1,08 = **+5 556 €** : l'opération crée de la valeur au-delà de 8 %.
6. Parce que le terrain à bâtir revendu est soumis à la **TVA (sur marge si possible)**, alors que la maison ancienne est exonérée. Il faut donc déterminer la part du prix d'achat qui correspond au terrain pour calculer la marge.
7. DSCR = 20 000 / 18 000 = 1,11 : **insuffisant**. Annuité maximum = 20 000 / 1,25 = **16 000 €**. Il faut plus d'apport, une durée plus longue ou un loyer plus élevé.
8. Elle **augmente l'impôt de plus-value** à la revente, donc **diminue le flux final** et le TRI (environ 3 à 5 points dans notre exemple). Elle incite à allonger la durée de détention ou à revoir la structure.
