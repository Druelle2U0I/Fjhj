# Jour 7 — Financer les énergies renouvelables, avec une étude de cas complète

> **Objectif du jour :** appliquer tout ce que tu as appris aux EnR en
> France et en Europe : les technologies, les mécanismes de revenus, la
> structuration par phase et les spécificités bancaires. Puis tu dérouleras
> **une étude de cas chiffrée complète**, à refaire dans Excel, et tu
> passeras l'examen final.

---

## Partie A — Le paysage des EnR

### 1. Les technologies et leurs profils de financement

| Technologie | CAPEX indicatif (France, milieu des années 2020) | Durée de vie | Taux de charge / productible | Spécificités de financement |
|---|---|---|---|---|
| **Solaire au sol** | ~0,55 à 0,80 M€/MWc (hors raccordement lourd) | 30 à 40 ans | 1 100 à 1 450 kWh/kWc | Le plus « bancable » : technologie simple, faible σ, levier de 75 à 85 % |
| **Solaire en toiture / ombrières** | ~0,7 à 1,2 M€/MWc | 25 à 30 ans | 1 000 à 1 350 kWh/kWc | Petits tickets : portefeuilles, crédit-bail, contrats d'occupation longs avec les propriétaires |
| **Agrivoltaïsme** | Supérieur au sol classique (structures hautes, trackers) | 30 à 40 ans | Variable | Cadre réglementaire (loi APER 2023, décret 2024) : service rendu à l'agriculture, suivi agronomique |
| **Éolien terrestre** | ~1,3 à 1,7 M€/MW | 20 à 30 ans (repowering) | 22 à 30 % | Risque de recours élevé, σ plus fort (P90 contraignant), garantie de démantèlement |
| **Éolien en mer posé / flottant** | 3 à 6 M€/MW et plus | 25 à 35 ans | 35 à 50 % | Projets de 0,5 à 3 Md€, appels d'offres pilotés par l'État, gros clubs bancaires, ECA, BEI |
| **Stockage par batteries (BESS)** | Coût en forte baisse, raisonner en €/kWh et en €/MW | 15 à 20 ans (remplacement des cellules) | Cycles/jour | Revenus en cascade (*merchant* dominant) : DSCR élevé, levier de 40 à 70 %, contrats de *tolling* ou de *floor* pour « bancabiliser » |
| **Hydroélectricité (petite hydro)** | Très variable | 40 à 80 ans | Variable | Concessions, régime des eaux |
| **Biométhane / méthanisation** | 5 à 15 M€ par unité agricole | 15 à 20 ans | Nm³/h injectés | Risque d'intrants (approvisionnement), risque opérationnel biologique, tarif d'achat ou nouveaux mécanismes de certificats |
| **Géothermie, réseaux de chaleur** | Élevé | 30 ans et plus | — | Subventions du Fonds Chaleur (ADEME), concessions publiques, risque géologique (garantie SAF Environnement pour la géothermie) |
| **Hydrogène vert** | Élevé, technologie jeune | — | — | Encore peu bancable sans contrat d'achat et subventions (IPCEI, mécanisme de soutien à la production) |

*Ces chiffres sont des ordres de grandeur à actualiser.*

### 2. Le cadre français (à connaître)

- **La PPE** (Programmation Pluriannuelle de l'Énergie) fixe les objectifs
  par filière et le calendrier des appels d'offres. **La PPE3** fixe la
  trajectoire à l'horizon 2030-2035 : vérifie la version en vigueur.
- **La loi APER** (Accélération de la Production d'EnR, mars 2023) a
  instauré :
  - les **zones d'accélération** définies par les communes ;
  - l'obligation d'ombrières solaires sur les parkings de plus de
    1 500 m² ;
  - le cadre de l'agrivoltaïsme ;
  - le partage de la valeur avec les territoires.
- **Les autorisations** :
  - solaire : permis de construire, étude d'impact au-dessus d'un certain
    seuil ;
  - éolien : **autorisation environnementale unique** (régime ICPE) ;
  - dans les deux cas, parfois une **dérogation espèces protégées**.
- **Le raccordement** :
  - Enedis (HTA et BT), RTE (HTB) ;
  - quote-part des **S3REnR** (schémas régionaux de raccordement), qui
    s'ajoute au coût du projet ;
  - la **PTF** (proposition technique et financière), puis la convention
    de raccordement.
- **La fiscalité spécifique** : l'**IFER** (imposition forfaitaire sur les
  entreprises de réseaux), en €/kW, s'applique au-delà de 100 kW. Il faut
  aussi compter la taxe foncière, la CFE, et la taxe sur les éoliennes en
  mer.
- **Le cadre européen** :
  - la **directive RED III** fixe l'objectif de 42,5 % d'EnR en 2030 ;
  - la **réforme du marché de l'électricité** de 2024 généralise les
    **CfD bidirectionnels** pour les nouveaux soutiens publics et favorise
    les PPA ;
  - la **taxonomie verte** et le **Net-Zero Industry Act** (critères de
    résilience et de durabilité dans les enchères) complètent le
    dispositif.

---

## Partie B — Les mécanismes de revenus (le cœur de la bancabilité)

### 3. Les cinq façons de vendre l'électricité EnR

#### 3.1 L'obligation d'achat (OA), ou tarif d'achat (*feed-in tariff*)

- EDF OA (ou une entreprise locale de distribution) achète toute la
  production à un **tarif fixe** pendant **20 ans**.
- Le **guichet ouvert** (sans appel d'offres) est réservé aux **petites
  installations**, par exemple le solaire sur bâtiment sous un certain
  seuil de puissance (arrêté tarifaire dit « S21 » et ses révisions). **Les
  seuils et les tarifs sont régulièrement révisés.**
- **Pour la banque**, c'est le meilleur risque : contrepartie de l'État,
  aucun risque de prix.

#### 3.2 Le complément de rémunération (CR), un CfD « à la française »

- Il est attribué par **appel d'offres CRE** : solaire au sol, solaire sur
  bâtiment, éolien terrestre, technologie neutre, etc. On gagne en offrant
  le **tarif de référence (T)** le plus bas, avec parfois des critères
  complémentaires (carbone, participatif).
- Le producteur **vend lui-même** son électricité sur le marché, en
  général via un **agrégateur**. Il reçoit ou verse ensuite la différence
  avec le tarif de référence :

```
Complément de rémunération = (T – M0) × Production  (+ prime de gestion)
M0 = prix de marché de référence (moyenne mensuelle pondérée par le profil de la filière)
```

- **Si M0 est inférieur à T**, l'État paie le complément. **Si M0 est
  supérieur à T, c'est le producteur qui reverse** : c'est arrivé
  massivement en 2022.
- **Contrat de 20 ans** en général. Le tarif est partiellement indexé
  selon le cahier des charges.
- **Les risques résiduels pour la SPV** :
  - l'**écart de profil** (*shape risk*) : le prix capturé par le parc
    diffère de M0 ;
  - le **coût de l'agrégateur** ;
  - les **heures à prix négatifs**, pour lesquelles des règles
    spécifiques s'appliquent selon le cahier des charges ;
  - la **date limite de mise en service**, sous peine de voir la durée du
    contrat réduite.
- **Pour la banque**, il reste excellent : DSCR de 1,15 à 1,25x.

#### 3.3 Le PPA corporate (*Power Purchase Agreement*)

C'est un contrat de gré à gré avec une entreprise consommatrice (industrie,
data centers, distribution…) ou un fournisseur (*utility*). Il dure 10 à 20
ans.

- **PPA physique** (*on-site* ou *off-site*, avec livraison via le réseau
  et un responsable d'équilibre) ou **PPA financier / virtuel** (un CfD
  privé, sans livraison physique).
- Les **profils** :
  - ***pay-as-produced*** : l'acheteur prend tout ce qui est produit.
    C'est le meilleur cas pour la SPV ;
  - ***baseload* / profil garanti** : la SPV doit livrer un profil fixe et
    rachète sur le marché ce qui manque, ce qui constitue un risque.
- **Le prix** peut être fixe, indexé, avec un **plancher et un plafond**
  (*collar*), ou décoté par rapport au marché.
- **Les garanties d'origine** (GO) sont en général transférées à
  l'acheteur.
- **Pour la banque**, tout repose sur la **qualité de crédit de
  l'acheteur** (notation, garantie maison mère, lettre de crédit) et sur
  les clauses de résiliation (indemnités). La durée de la dette est
  alignée sur celle du PPA, avec une queue.

#### 3.4 Le merchant (vente au prix de marché)

- La vente se fait sur les marchés spot et futures (EPEX Spot, EEX), sans
  contrat long.
- Les risques sont le prix, la **cannibalisation** (le prix capturé par le
  solaire baisse quand tout le monde produit à la même heure) et les prix
  négatifs.
- **Pour la banque**, cela signifie :
  - une dette dimensionnée sur une courbe de prix basse (*low case*) d'un
    conseiller de marché ;
  - un DSCR de 1,5 à 2,0x ;
  - une maturité plus courte ;
  - un cash sweep ;
  - un levier de 40 à 60 %.

#### 3.5 L'autoconsommation et les contrats locaux

- Autoconsommation individuelle ou collective (au sein d'un périmètre de
  quelques kilomètres) : un tiers-investisseur installe et vend
  l'électricité au consommateur sur le site.
- Le risque est celui du consommateur, sur toute la durée de vie.

### 4. Les revenus annexes

- **Garanties d'origine** : un certificat par MWh. Quand le producteur
  bénéficie d'un soutien public, les GO sont en principe mises aux enchères
  par l'État (et non vendues par lui).
- **Mécanisme de capacité** (certificats de capacité RTE) : surtout pour
  le stockage et les moyens pilotables.
- **Services système** : réserve primaire (FCR), secondaire (aFRR),
  mécanisme d'ajustement. Ce sont des revenus clés pour les batteries.
- **Appels d'offres long terme de capacité** : ils sécurisent des revenus
  de flexibilité.

### 5. L'échelle de la bancabilité (à retenir)

```
 + BANCABLE (levier élevé, DSCR bas, maturité longue, marge basse)
 │  Obligation d'achat EDF OA (tarif fixe 20 ans)
 │  Complément de rémunération CRE (CfD 20 ans)
 │  PPA pay-as-produced avec acheteur investment grade, 15-20 ans
 │  PPA avec acheteur non noté mais garanti / PPA baseload
 │  Contrat de floor / tolling (stockage)
 │  Merchant avec couverture partielle
 │  Merchant pur
 – BANCABLE (levier faible, DSCR élevé, maturité courte, sweep)
```

---

## Partie C — Structurer le financement d'un projet EnR, phase par phase

### 6. Le développement

- **Coûts** : de quelques centaines de k€ à plusieurs M€ par projet
  (études, mesures de vent sur 1 à 2 ans, études d'impact, foncier,
  raccordement, avocats).
- **Financement** : les fonds propres du développeur. Il existe aussi :
  - des **fonds de développement** qui financent un portefeuille contre
    une part de la valeur ;
  - des **partenariats de co-développement** (le développeur local
    s'associe à un IPP, avec des paiements par étapes) ;
  - des **ventes de projets au stade RTB**.
- **Mesurer la valeur créée** : on suit le portefeuille par **stade**
  (prospection, puis sécurisation foncière, dépôt, autorisation, purge,
  RTB), avec des **probabilités de succès** par stade pour valoriser le
  pipeline pondéré.

### 7. La construction et le financial close

- Les **conditions suspensives bancaires typiques en EnR** :
  - autorisations obtenues et **purgées de tout recours** ;
  - foncier sécurisé (bail signé et publié) ;
  - PTF ou convention de raccordement ;
  - contrat de revenus signé (lauréat CRE, contrat EDF OA, PPA) ;
  - EPC et O&M signés ;
  - rapports LTA, juridique et assurance ;
  - modèle audité ;
  - fonds propres apportés ou garantis ;
  - couverture de taux en place.
- **Les tirages** se font sur certificat du LTA, au fil de l'avancement.
- **Le pré-financement de la TVA** passe par une ligne dédiée.
- **La mise en service** (COD), puis la conversion en prêt à terme.

### 8. L'exploitation et l'optimisation

- **Refinancement** (*refinancing*) après 1 à 3 ans d'exploitation : le
  risque de construction a disparu, un historique de production existe.
  On obtient une marge plus basse, parfois une dette plus élevée
  (*re-leveraging*), ce qui augmente le TRI actionnaire. Il faut arbitrer
  avec les coûts de rupture du swap.
- **Portefeuille** : regrouper plusieurs SPV sous une même dette réduit
  les coûts et diversifie les risques. On peut aussi ajouter une **dette
  holdco** (remontée de dividendes), un *back-leverage* souvent financé par
  des fonds de dette.
- **Cession** : céder à un fonds core une fois l'actif en exploitation
  permet de recycler le capital.
- **Repowering et extension de durée** : en fin de contrat, remplacer les
  machines ou les modules permet de repartir pour un cycle.

### 9. Les points bancaires spécifiques aux EnR

- **La queue** : la dette est remboursée 2 à 3 ans avant la fin du CfD ou
  du PPA.
- **Le traitement de la période post-contrat** : la banque ne valorise que
  peu, voire pas du tout, les revenus merchant après le contrat.
- **La DSRA** : 6 mois, souvent sous forme de garantie bancaire.
- **La MRA** : pour les onduleurs (solaire) et les gros composants
  (éolien).
- **Le démantèlement** : en éolien, garantie financière obligatoire
  (arrêté ministériel) ; en solaire, provision ou engagement contractuel
  dans le bail.
- **Les *green loans*** : documentation conforme aux Green Loan Principles,
  avec parfois une marge réduite ou une clause de reporting ESG.
- **La saisonnalité** : le solaire produit beaucoup plus l'été, d'où des
  **échéances semestrielles** sculptées (le semestre d'été rembourse
  davantage).

---

## Partie D — Étude de cas complète : « Parc solaire du Causse, 50 MWc »

> **Consigne :** reproduis ce cas dans Excel, onglet par onglet. Les
> chiffres ci-dessous ont été calculés avec un modèle annuel simplifié. Ton
> modèle doit retrouver les mêmes ordres de grandeur.

### 10. Les hypothèses

| Catégorie | Hypothèse | Valeur |
|---|---|---|
| Technique | Puissance | 50 MWc (sud de la France) |
| | Productible P50 année 1 | 1 350 kWh/kWc, soit 67,5 GWh |
| | Dégradation | 0,4 %/an |
| | P90 1 an / P90 10 ans | −8 % / −5 % par rapport au P50 |
| | Durée d'exploitation | 30 ans |
| Revenus | Complément de rémunération CRE | T = 74 €/MWh, 20 ans (hypothèse : non indexé, par prudence) |
| | Prix merchant après le contrat (années 21 à 30) | 45 €/MWh (prix capturé prudent) |
| Coûts | OPEX année 1 (O&M, loyer, assurance, IFER, taxes, gestion) | 1,35 M€, indexé à 2 %/an |
| | CAPEX total (y compris raccordement, développement, frais, IDC, aléas) | 35,0 M€ (0,70 M€/MWc) |
| Fiscalité | IS | 25 % |
| | Amortissement | Linéaire sur 20 ans |
| Dette | Maturité | 18 ans après la COD (queue de 2 ans) |
| | Taux all-in (swap + marge + commissions lissées) | 4,5 %, couvert |
| | DSCR de dimensionnement | 1,20x (P50) |
| | Plafond de levier | 80 % |
| | Profil | Sculpté |

**Simplifications volontaires :** pas de période de construction modélisée
(les CAPEX sont dépensés en année 0), pas de BFR, pas de DSRA en cash, pas
de rabot fiscal. Ton modèle avancé pourra les ajouter.

### 11. Les sources et emplois

| Emplois | M€ | Sources | M€ |
|---|---|---|---|
| EPC (modules, onduleurs, structures, BOS) | 29,5 | Dette senior | **28,0** (80 %) |
| Raccordement (y compris quote-part S3REnR) | 2,5 | Fonds propres (capital + CCA) | **7,0** (20 %) |
| Développement et prime développeur | 1,2 | | |
| Frais de financement et conseils | 0,8 | | |
| Intérêts intercalaires | 0,5 | | |
| Aléas | 0,5 | | |
| **Total** | **35,0** | **Total** | **35,0** |

### 12. Le dimensionnement de la dette

1. **Méthode DSCR** : le service de la dette de chaque année vaut
   CFADS_t / 1,20. Sa VAN à 4,5 % sur 18 ans donne une **capacité de dette
   d'environ 31,6 M€**, soit 90 % du CAPEX.
2. **Méthode du levier** : 80 % × 35,0 = **28,0 M€**.
3. **Dette retenue = min(31,6 ; 28,0) = 28,0 M€.** C'est **le plafond de
   levier qui est contraignant**, pas le DSCR.

Conséquence : puisque la dette est réduite de manière homothétique, le DSCR
effectif ressort **au-dessus de la cible, à environ 1,34x**. Les banques
sont donc « sur-couvertes », ce qui est confortable pour elles.

**Question d'expert :** que ferait un sponsor dans cette situation ?

- Il négocierait **un plafond de levier plus élevé** (85 %).
- Ou il **baisserait son tarif** à l'appel d'offres pour être plus
  compétitif. Cette situation (DSCR largement supérieur à la cible) montre
  que le projet peut supporter un tarif plus bas.
- Ou il **ajouterait une dette holdco** au-dessus de la SPV.

### 13. Le tableau des flux (extrait, en M€)

| Année | 1 | 2 | 5 | 10 | 15 | 18 | 20 | 21 | 30 |
|---|---|---|---|---|---|---|---|---|---|
| Production (GWh) | 67,5 | 67,2 | 66,4 | 65,1 | 63,8 | 63,1 | 62,6 | 62,3 | 60,1 |
| Chiffre d'affaires | 5,00 | 4,98 | 4,92 | 4,82 | 4,72 | 4,67 | 4,63 | 2,80 | 2,70 |
| OPEX | (1,35) | (1,38) | (1,46) | (1,61) | (1,78) | (1,89) | (1,97) | (2,01) | (2,40) |
| **EBITDA** | **3,65** | 3,60 | 3,45 | 3,20 | 2,94 | 2,78 | 2,66 | 0,80 | 0,31 |
| IS payé | (0,16) | (0,16) | (0,17) | (0,19) | (0,22) | (0,24) | (0,23) | (0,20) | (0,08) |
| **CFADS** | **3,49** | 3,44 | 3,28 | 3,01 | 2,72 | 2,54 | 2,43 | 0,60 | 0,23 |
| Intérêts | (1,26) | (1,20) | (1,01) | (0,68) | (0,32) | (0,08) | — | — | — |
| Remboursement du capital | (1,33) | (1,36) | (1,43) | (1,56) | (1,71) | (1,81) | — | — | — |
| **Service de la dette** | **2,59** | 2,56 | 2,44 | 2,24 | 2,03 | 1,89 | — | — | — |
| **DSCR** | **1,34x** | 1,34x | 1,34x | 1,34x | 1,34x | 1,34x | — | — | — |
| Flux aux actionnaires | 0,89 | 0,88 | 0,84 | 0,77 | 0,70 | 0,65 | 2,43 | 0,60 | 0,23 |

**Ce qu'il faut observer :**

- **La marge d'EBITDA est d'environ 73 %** en année 1. Elle s'érode
  lentement, parce que les OPEX sont indexés alors que le tarif, par
  hypothèse, ne l'est pas. C'est un effet ciseau à surveiller.
- **Le DSCR est constant, grâce au sculpting** : le service de la dette
  suit la baisse du CFADS.
- **Les intérêts baissent et le capital remboursé augmente** au fil du
  temps.
- **La chute des revenus à l'année 21** correspond à la fin du complément
  de rémunération et au passage au merchant à 45 €/MWh. La dette est déjà
  remboursée depuis l'année 18 : **la banque n'a aucune exposition au
  merchant**, c'est tout l'intérêt de la queue.
- **Les années 19 et 20** : c'est la « récompense » de l'actionnaire, qui
  touche tout le CFADS.

### 14. Les résultats

| Indicateur | Valeur |
|---|---|
| Dette senior | 28,0 M€ (levier de 80 %) |
| Fonds propres | 7,0 M€ |
| DSCR minimum / moyen (P50) | 1,34x / 1,34x |
| LLCR | 1,34x |
| **TRI projet** (avant financement, après IS) | **~5,7 %** |
| **TRI actionnaire** | **~11,4 %** |
| Total des distributions aux actionnaires | ~23,0 M€, soit un **multiple d'environ 3,3x** sur 30 ans |
| VAN des fonds propres à 7 % | ~+3,2 M€ |
| **LCOE** (à 5 %) | **~61,5 €/MWh** |

**Comment lire ces résultats :**

- **L'effet de levier** : le TRI projet de 5,7 % dépasse le coût de la
  dette (4,5 %). Avec 80 % de dette, le TRI actionnaire est donc
  pratiquement **doublé**, à 11,4 %.
- **Un TRI actionnaire de 11,4 % est au-dessus du marché** pour un actif
  sous CfD (6 à 10 %). Dans un vrai appel d'offres, les concurrents
  auraient accepté un **tarif plus bas**, et le TRI serait tombé autour de
  8 %. C'est ce qu'on appelle la **compression des rendements par la
  concurrence**.
- **Le LCOE de 61,5 €/MWh** est inférieur au tarif de 74 €/MWh. La
  différence rémunère le risque et les fonds propres.

### 15. Les sensibilités (dette fixée à 28,0 M€ avec le même échéancier)

| Scénario | DSCR minimum | TRI actionnaire |
|---|---|---|
| **Cas de base P50** | **1,34x** | **11,4 %** |
| Production P90 10 ans (−5 %) | 1,25x | 8,5 % |
| Production P90 1 an (−8 %, chaque année) | 1,20x | 6,7 % |
| OPEX +15 % | 1,23x | 8,3 % |
| Prix −10 % | 1,16x | 5,4 % |
| **Point mort DSCR = 1,00x** | Prix ou production **en baisse d'environ 18 à 19 %** (~60 €/MWh) | — |

**Analyse bancaire :**

- **Le test P90 1 an est très largement respecté** : 1,20x, alors que la
  banque exige environ 1,05x.
- **Le projet résiste à une baisse de 18 % de ses revenus** avant de ne
  plus pouvoir payer la dette. Le risque bancaire est donc **faible**.
- **Pour l'actionnaire**, la sensibilité est forte : **le levier amplifie
  les écarts**. Une baisse de 10 % du prix fait passer le TRI de 11,4 % à
  5,4 %. C'est le revers de l'effet de levier.
- **Couverture de taux** : si la dette n'était pas couverte, une hausse
  des taux réduirait directement le DSCR. D'où l'exigence d'un swap.

### 16. La note de crédit (le format à produire)

> **Recommandation :** accord pour une dette senior de 28,0 M€ sur 18 ans.
>
> **Points forts :**
> - Revenus sécurisés par un complément de rémunération CRE de 20 ans.
> - Technologie éprouvée, avec des fournisseurs Tier 1.
> - DSCR de 1,34x (P50) et de 1,20x (P90 1 an).
> - Point mort à −18 % de revenus.
> - Aucune exposition au merchant sur la durée de la dette.
> - Levier de 80 %, conforme au marché.
>
> **Points d'attention :**
> 1. Effet ciseau OPEX indexés / tarif (partiellement) non indexé, à
>    vérifier dans le cahier des charges.
> 2. Heures à prix négatifs et écart de profil par rapport à M0.
> 3. Purge des recours sur le permis de construire (condition suspensive).
> 4. Le coût du raccordement et le calendrier Enedis / RTE.
> 5. La qualité de l'EPC et le plafond des pénalités.
>
> **Conditions :**
> - DSCR de lock-up à 1,10x et de défaut à 1,05x.
> - DSRA de 6 mois.
> - Swap à 90 % minimum.
> - Paquet de sûretés standard (titres, comptes, Dailly, accords directs).

---

## Partie E — Pour aller plus loin : les sujets d'expert

1. **Le financement du stockage** : empiler les revenus (arbitrage,
   capacité, services système, *tolling*), dimensionner sur les revenus
   contractés ou sur un *floor*, prévoir la dégradation et l'augmentation
   de capacité (*augmentation*).
2. **L'hybride solaire + stockage** : partage du raccordement, arbitrage
   intra-journalier, amélioration du taux de capture.
3. **L'éolien en mer** : financements multi-sources (banques commerciales,
   ECA, BEI), construction en mer (risques météo et navires), contrats
   multiples (turbine, fondations, câbles, installation).
4. **L'international** : risque pays, change, ECA, MIGA, banques de
   développement (IFC, BERD, AfDB), contrats « *take-or-pay* » avec des
   acheteurs publics.
5. **Le financement vert et durable** : *green bonds*, prêts indexés sur
   des objectifs ESG (*sustainability-linked loans*), taxonomie, SFDR.
6. **Le M&A d'actifs EnR** : processus d'enchères, valorisation DCF,
   ajustements de prix, garanties de passif (W&I).
7. **Le financement de plateformes** : dette corporate d'un IPP, lignes de
   développement, fonds propres pour des plateformes d'EnR.

---

## Partie F — Examen final (3 heures, sans notes)

**Section 1 : QCM et questions courtes (1 h)**

1. Définis le CFADS, le DSCR, le LLCR et le PLCR, et donne leurs formules.
2. Pourquoi le financement de projet se fait-il sans recours ? Quels
   risques le sponsor garde-t-il malgré tout ?
3. Explique le complément de rémunération CRE, avec un schéma.
4. Pourquoi la dette d'un projet sous CfD de 20 ans a-t-elle une maturité
   de 17 à 18 ans ?
5. Quelle est la différence entre un PPA *pay-as-produced* et un PPA
   *baseload* ? Lequel est préféré par les banques, et pourquoi ?
6. Cite 8 éléments du paquet de sûretés et 8 conditions suspensives.
7. Pourquoi Bâle III et le NSFR ont-ils favorisé les assureurs sur les
   financements longs ?
8. Quel est l'intérêt d'un prêt relais fonds propres pour l'actionnaire ?

**Section 2 : Cas pratique (1 h 30)**

Un parc éolien de 36 MW (12 éoliennes de 3 MW) présente les
caractéristiques suivantes :

- P50 de 90 GWh/an et incertitude de 12 % ;
- CAPEX de 55 M€ et OPEX de 2,4 M€/an, indexé à 2 % ;
- complément de rémunération à 86 €/MWh sur 20 ans ;
- dette à 4,6 % sur 17 ans, DSCR de 1,25x P50 / 1,05x P90 1 an, plafond
  de levier de 80 %.

Travail demandé :

1. Calcule le P90 1 an.
2. Calcule le CFADS de l'année 1 (IS forfaitaire de 0,5 M€).
3. Estime la dette selon le P50 et selon le P90 (annuités constantes pour
   simplifier), puis retiens la contrainte déterminante.
4. Calcule le levier et les fonds propres.
5. Rédige une note de crédit de 15 lignes.

**Section 3 : Oral (30 min)**

Présente le projet devant un comité de crédit fictif en 10 minutes, puis
réponds à 20 minutes de questions difficiles.

Le corrigé se trouve dans l'[annexe C](annexe-c-exercices-corriges.md).

---

## ✅ Tu es « expert opérationnel » si tu sais…

- [ ] Expliquer tous les mécanismes de revenus EnR et leur impact sur la
      dette.
- [ ] Structurer le financement d'un projet de son développement à son
      refinancement.
- [ ] Refaire l'étude de cas dans Excel, avec sculpting, sensibilités et
      point mort.
- [ ] Rédiger une note de crédit et une note d'investissement.
- [ ] Mener une discussion technique avec un banquier, un fonds et un
      développeur.
- [ ] Identifier en 30 minutes les faiblesses d'un business plan EnR.

**Après les 7 jours :** la suite (certifications, lectures, pratique) est
décrite dans l'[annexe E](annexe-e-ressources.md).
