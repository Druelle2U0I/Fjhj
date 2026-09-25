# Jour 5 — Le business plan : le construire, le lire, le challenger

> **Objectif du jour :** savoir construire un business plan (le récit et le
> modèle financier), savoir **le lire en 30 minutes comme un comité
> d'investissement**, et repérer les incohérences et les hypothèses trop
> optimistes.

---

## 1. Qu'est-ce qu'un business plan ?

Le BP a **deux volets indissociables** :

1. **Le récit** (*business plan narratif / investment memorandum*) : il
   explique **pourquoi** le projet va réussir (marché, stratégie, équipe,
   avantages concurrentiels, risques).
2. **Le modèle financier** : il traduit ce récit en **chiffres cohérents**
   (hypothèses, puis états financiers, puis flux, puis rendement et
   ratios).

> **Règle d'or :** chaque chiffre du modèle doit être justifié par le récit,
> et chaque affirmation du récit doit se retrouver dans les chiffres. Si le
> récit parle d'une « croissance forte » alors que le modèle affiche +40 %
> par an pendant 7 ans sans nouvelles embauches, il y a un problème.

### 1.1 BP d'entreprise ou BP de projet

| | BP d'entreprise (start-up, PME, ENMA Formation…) | BP de projet (SPV EnR, infra) |
|---|---|---|
| Horizon | 3 à 5 ans | **Durée de vie de l'actif : 20 à 40 ans** |
| Moteur | Croissance commerciale, clients, prix | Capacité × production × prix contracté |
| Incertitude principale | Adoption par le marché | Construction, ressource, prix |
| Sortie de valeur | Multiple de sortie | Flux sur la durée de vie + valeur résiduelle |
| Indicateurs clés | CA, marge brute, EBITDA, *burn rate*, *runway* | CFADS, DSCR, LLCR, TRI projet / actionnaire |

---

## 2. La structure du BP narratif (le plan type)

1. ***Executive summary*** (1 à 2 pages) : le projet, le besoin de
   financement, l'utilisation des fonds, le rendement et les risques clés.
   **C'est souvent la seule partie lue en entier.**
2. **Le projet / l'entreprise** : historique, activité, actionnariat.
3. **Le marché** : taille (TAM/SAM/SOM), croissance, tendances, cadre
   réglementaire. En EnR, cela couvre la PPE, les appels d'offres, les prix
   de marché et les PPA.
4. **L'offre et le modèle économique** : comment on gagne de l'argent, la
   structure des prix et des coûts.
5. **La concurrence et les avantages concurrentiels.**
6. **La stratégie et le plan d'action** : commercial, industriel,
   calendrier.
7. **L'équipe et la gouvernance** : expérience, historique de réussite,
   partenaires.
8. **Les aspects techniques** (pour un projet) : site, technologie,
   productible, raccordement, EPC, O&M.
9. **Les aspects juridiques et contractuels** : autorisations, foncier,
   contrats clés.
10. **Le plan financier** : hypothèses, P&L, bilan, flux, besoin et plan de
    financement, rendement.
11. **Les risques et leur atténuation** : une matrice de risques.
12. **Le financement demandé** : montant, structure, calendrier, sortie.
13. **Les annexes** : rapports d'experts, CV, contrats, modèle.

---

## 3. Le modèle financier : l'architecture

### 3.1 Les onglets standards

```
[ Couverture / Sommaire ]
[ Hypothèses (Inputs) ]  ← tout ce qui est saisi, en bleu
[ Calendrier (Timeline) ] ← dates, flags de période (construction, exploitation, dette)
[ Construction ] ← CAPEX, échéancier de dépenses, IDC (intérêts intercalaires), commissions
[ Revenus ] ← production × prix, indexation
[ OPEX ]
[ Fiscalité ] ← amortissements, IS, déficits reportables, IFER/CFE/taxe foncière, TVA
[ Dette ] ← tirages, intérêts, sculpting, réserves
[ Cascade (Waterfall) ]
[ États financiers ] ← P&L, bilan, flux
[ Fonds propres / Rendements ] ← TRI, VAN, dividendes, CCA
[ Ratios ] ← DSCR, LLCR, PLCR
[ Sensibilités / Scénarios ]
[ Contrôles (Checks) ]
[ Tableau de bord (Outputs) ]
```

### 3.2 Les principes de construction (norme FAST ou équivalent)

- **Séparer** les entrées, les calculs et les sorties.
- **Une formule par ligne**, cohérente sur toute la ligne.
- **Utiliser des indicateurs de période (*flags*)**, c'est-à-dire des
  lignes à 1 ou 0 (période de construction, d'exploitation, de
  remboursement de la dette). On multiplie par ces flags au lieu d'écrire
  des `SI` imbriqués.
- **Pas de liens vers d'autres fichiers**, pas de macros inutiles, pas de
  cellules fusionnées dans les calculs.
- **Des unités explicites** : k€ ou M€, MWh ou GWh, nominal ou réel.
- **Des contrôles visibles** : bilan équilibré, trésorerie jamais
  négative, dette remboursée à la maturité, sources = emplois.

---

## 4. Construire le modèle, étape par étape

### Étape 1 : le calendrier

Il fixe la date de financial close, la durée de construction, la COD, la
durée d'exploitation et la périodicité : semestrielle pour la dette,
parfois mensuelle en construction.

### Étape 2 : les sources et les emplois (*sources & uses*)

C'est **le premier tableau que regarde un financeur**.

| Emplois (*Uses*) | M€ | Sources | M€ |
|---|---|---|---|
| Coût EPC / équipements | 29,5 | Dette senior | 28,0 |
| Raccordement | 2,5 | Fonds propres (capital + CCA) | 7,0 |
| Frais de développement + prime développeur | 1,2 | | |
| Frais de financement (commissions, conseils) | 0,8 | | |
| Intérêts intercalaires (IDC) | 0,5 | | |
| Constitution de la DSRA | — (garantie bancaire) | | |
| Aléas (*contingency*) | 0,5 | | |
| **Total** | **35,0** | **Total** | **35,0** |

**Les sources doivent toujours égaler les emplois.** Si un poste manque
(IDC, TVA, aléas, DSRA), le projet est sous-financé.

### Étape 3 : les revenus

```
Production (MWh) = Capacité (MW) × Productible spécifique (MWh/MW/an ou heures équivalentes) × Disponibilité × (1 – pertes) × (1 – dégradation)^t
Revenus = Production × Prix (tarif contractuel indexé, prix PPA, ou prix de marché capturé)
```

- **Productible** : il vient d'une étude de ressource indépendante (P50,
  P90), voir le jour 6.
- **Prix** : tarif CRE ou PPA, avec sa **formule d'indexation**, ou courbe
  de marché. En merchant, on utilise le **prix capturé**, qui est inférieur
  au prix de base à cause de la cannibalisation, et on retient un taux de
  capture.
- **Revenus annexes** : garanties d'origine, mécanisme de capacité,
  services système.

### Étape 4 : les OPEX

- O&M (contrat de maintenance), gestion d'actifs, loyer foncier (bail
  emphytéotique ou convention d'occupation).
- Assurances, taxes locales (**IFER**, **CFE**, **CVAE** en voie de
  suppression, **taxe foncière**).
- Surveillance, sécurité, entretien de la végétation, coûts de réseau
  (TURPE injection s'il y en a).
- Démantèlement, mesures environnementales, compensation.
- **L'indexation** : en général entre l'inflation et l'inflation + 0,5 %.
  Vérifie que l'indexation des revenus et celle des coûts sont
  cohérentes.

### Étape 5 : la fiscalité

- **Amortissements** : en linéaire sur la durée d'utilisation (20 à 30
  ans), avec une ventilation par composant (onduleurs sur 10 à 15 ans).
- **IS à 25 %**, déficits reportables en avant (plafonnés à 1 M€ + 50 %
  du bénéfice au-delà).
- **Limitation de la déductibilité des intérêts** (le « rabot » de 30 %
  de l'EBITDA ou 3 M€).
- **TVA** : payée pendant la construction, puis remboursée (d'où la ligne
  de TVA).
- **Intégration fiscale** possible si la holding détient au moins 95 %
  de la SPV.

### Étape 6 : la dette

Elle comprend :

- les tirages pendant la construction ;
- les IDC capitalisés ;
- les commissions ;
- la conversion ;
- l'échéancier (sculpté ou autre) ;
- les intérêts, le swap et la DSRA ;
- le cash sweep.

Tout cela a été vu au jour 3.

### Étape 7 : la cascade et la distribution

Elle applique l'ordre des paiements, teste le lock-up, puis rembourse les
CCA et verse les dividendes selon le résultat distribuable.

### Étape 8 : les sorties

Tu dois produire :

- le TRI projet (avant et après impôt) ;
- le TRI actionnaire et la VAN des fonds propres ;
- le DSCR minimum et moyen, le LLCR ;
- le levier, le délai de récupération ;
- le **LCOE** (*Levelized Cost of Energy*, coût actualisé de l'énergie).

```
LCOE = VAN(CAPEX + OPEX) / VAN(Production)   (€/MWh)
```

Le LCOE permet de comparer des technologies et de savoir **à quel prix
minimum** il faut vendre l'électricité.

### Étape 9 : les sensibilités et les scénarios

- **Sensibilités une par une** : production P90, CAPEX +10 %, OPEX +10 %,
  prix −10 %, retard de 6 mois, taux +100 points de base, inflation ±1 %.
- **Scénarios combinés** : le « *downside case* » cumule plusieurs chocs.
- **Tables de données** : TRI en fonction du prix et du CAPEX.
- **Point mort** : le prix de l'électricité pour lequel le DSCR vaut 1,00x
  ou le TRI actionnaire vaut 0 %.

---

## 5. Lire un business plan en 30 minutes (la méthode)

### 5.1 L'ordre de lecture recommandé

| Minute | Ce que tu lis | Ce que tu cherches |
|---|---|---|
| 0–5 | *Executive summary* | Comprendre le projet, le besoin, le rendement annoncé et les **3 hypothèses qui font tout** |
| 5–10 | **Sources et emplois** | Tout est-il financé ? Y a-t-il des aléas, les IDC, la DSRA ? Quel levier ? Combien le sponsor met-il vraiment ? |
| 10–15 | **Hypothèses clés** | Production, prix, CAPEX, OPEX, inflation, taux, durée de vie : **compare-les à des repères de marché** |
| 15–20 | **Tableau de flux / CFADS** | Profil des flux, cohérence, cash réel et non résultat |
| 20–25 | **Ratios et rendements** | DSCR min, LLCR, TRI projet et actionnaire : **sont-ils trop beaux pour être vrais ?** |
| 25–30 | **Sensibilités et risques** | Le projet survit-il au P90 et à un prix −10 % ? Qu'est-ce qui le tue ? |

### 5.2 Les 7 questions de l'expert

1. **D'où viennent les revenus, et qui les garantit ?** Tarif d'État, PPA
   avec quelle contrepartie, marché ?
2. **Quelle part de la valeur dépend d'hypothèses non contractées ?** Les
   années merchant, la valeur terminale, les revenus annexes.
3. **Les coûts sont-ils complets et réalistes ?** Tous les OPEX, les gros
   entretiens, les taxes, le démantèlement.
4. **Qui a validé les hypothèses ?** Un expert indépendant ou le sponsor
   lui-même ?
5. **Les rendements sont-ils cohérents avec le risque ?** Un TRI
   actionnaire de 18 % sur du solaire sous tarif signale une erreur ou une
   hypothèse cachée.
6. **Que se passe-t-il dans le pire cas raisonnable ?**
7. **L'équipe a-t-elle déjà fait ça ?**

### 5.3 Les signaux d'alerte (*red flags*) les plus fréquents

**Sur les revenus :**

- une croissance en « crosse de hockey » sans explication ;
- un prix de marché supposé stable ou en hausse sans source ;
- aucune prise en compte de la cannibalisation ;
- une production au P50 présentée comme « prudente » ;
- une disponibilité de 100 % ;
- aucune dégradation des panneaux ;
- un taux de charge éolien supérieur à celui des parcs voisins ;
- une indexation des revenus supérieure à celle des coûts ;
- des revenus annexes non contractés intégrés au cas de base.

**Sur les coûts :**

- un CAPEX sans aléas ;
- un CAPEX en dessous du marché ;
- des OPEX qui n'augmentent pas ;
- l'oubli des taxes locales (IFER…), de l'assurance ou des gros
  remplacements (onduleurs) ;
- un démantèlement non provisionné.

**Sur le financement :**

- un DSCR moyen présenté à la place du DSCR minimum ;
- une maturité de dette supérieure à la durée du contrat ;
- un taux non couvert ;
- des IDC oubliés ;
- aucune DSRA ;
- des dividendes versés alors que le résultat est négatif (piège du
  cash).

**Sur le rendement :**

- un TRI calculé sans la valeur de sortie, ou au contraire dominé par
  elle ;
- un TRI très sensible à la date du premier flux ;
- des flux nominaux actualisés à un taux réel.

**Sur la modélisation :**

- des valeurs codées en dur ;
- un bilan qui ne s'équilibre pas ;
- de la trésorerie négative ;
- des formules incohérentes sur une ligne ;
- des circularités non maîtrisées ;
- aucun onglet de contrôles.

**Sur la qualité du dossier :**

- aucun rapport indépendant ;
- des autorisations non purgées de recours ;
- un foncier non sécurisé ;
- un raccordement non confirmé (pas de PTF / convention) ;
- un sponsor sans expérience.

### 5.4 Les tests de cohérence rapides (*sanity checks*)

**En EnR :**

- Productible solaire au sol en France : environ **1 100 à 1 450
  kWh/kWc/an**, selon la latitude, le suiveur (*tracker*) et le taux de
  couverture du sol.
- Éolien terrestre en France : un taux de charge d'environ **22 à 30 %**,
  soit 1 900 à 2 600 heures équivalentes pleine puissance, avec de fortes
  variations selon le site et la machine.
- La marge d'EBITDA d'un projet solaire sous tarif atteint **70 à 85 %**.
- Le TRI actionnaire d'un solaire sous contrat se situe à **6 à 10 %**. Au
  sol, le levier atteint **70 à 85 %**.

**En entreprise :**

- CA par salarié, taux de marge brute par rapport au secteur ;
- délais clients et fournisseurs ;
- évolution du BFR ;
- dépenses d'investissement comparées aux amortissements.

---

## 6. Challenger un BP : les questions à poser au sponsor

| Thème | Question |
|---|---|
| Revenus | « Quelle part de votre CA est déjà signée ? » / « Quelle est votre source pour la courbe de prix ? » |
| Production | « Qui a fait l'étude de productible ? Sur combien d'années de données ? Quelle est l'incertitude totale ? » |
| CAPEX | « Le contrat EPC est-il à prix fixe ? Quel niveau d'aléas ? Quels postes sont hors EPC ? » |
| Calendrier | « Quelle est la date de mise en service contractuelle ? Quelles pénalités en cas de retard ? » |
| Financement | « Avez-vous des offres bancaires ? À quel DSCR ? » |
| Fonds propres | « D'où viennent vos fonds propres ? Sont-ils sécurisés ? » |
| Sortie | « Qu'est-ce qui se passe après la fin du contrat tarifaire ? » |
| Risques | « Quel est le scénario qui vous empêche de dormir ? » |

---

## 7. Cas pratique : diagnostiquer un BP fictif

**Extrait d'un BP reçu :**

> « Parc solaire 20 MWc, Hauts-de-France. Productible 1 350 kWh/kWc.
> Tarif AO 85 €/MWh, 20 ans, indexé à 2 % par an. OPEX 180 k€/an (fixe).
> CAPEX 11 M€ (0,55 M€/MWc). Dette 90 % sur 20 ans. TRI actionnaire
> 22 %. »

**Ton diagnostic, ce qui doit t'alerter :**

1. **Le productible** : 1 350 kWh/kWc est optimiste pour les
   Hauts-de-France, où l'on attend plutôt 1 050 à 1 150 en fixe. Il y a
   environ 20 % de revenus en trop.
2. **L'indexation** : l'indexation du complément de rémunération CRE suit
   une formule définie, souvent partielle, pas « 2 % par an » de manière
   systématique. À vérifier dans le cahier des charges.
3. **Les OPEX** : 180 k€/an font 9 k€/MWc, ce qui est bas une fois
   intégrés le loyer, l'IFER, l'assurance et la taxe foncière. Surtout, ils
   sont **fixes sur 20 ans, sans inflation**.
4. **Le CAPEX** : 0,55 M€/MWc est dans le bas de la fourchette. Qu'en
   est-il du raccordement, des IDC, des aléas ?
5. **La dette** : 90 % sur 20 ans, avec une maturité égale à la durée du
   tarif, cela veut dire **aucune queue**. Aucune banque ne l'acceptera
   probablement.
6. **Le TRI actionnaire de 22 %** est incohérent avec un actif sous
   contrat. C'est la preuve que les hypothèses sont gonflées.

**Conclusion :** tu reconstruis un cas bancaire avec un productible de
1 100, des OPEX indexés et complets, un levier de 80 % sur 18 ans et un
DSCR de 1,20. Le TRI tombera probablement autour de 7 à 9 %, à vérifier
par le calcul.

---

## 8. Le BP d'une entreprise de services (application : ENMA Formation)

Pour un organisme de formation, un BP se construit autour des moteurs
suivants :

- **Volume** : nombre de sessions × stagiaires par session × taux de
  remplissage.
- **Prix** : prix par stagiaire ou par jour. Il faut distinguer le
  financement OPCO, CPF, entreprise, France Travail ou région, car les
  délais de paiement et les risques diffèrent.
- **Coûts variables** : formateurs vacataires, salles, supports.
- **Coûts fixes** : équipe permanente, locaux, **certification Qualiopi**
  (indispensable pour les fonds publics et mutualisés), marketing,
  plateformes numériques.
- **BFR** : les organismes financeurs paient souvent **après** la
  formation, parfois avec plusieurs mois de décalage. Le BFR peut donc
  être significatif. C'est un point clé pour le banquier.
- **Indicateurs clés** : taux de remplissage, CA par formateur, part du CA
  dépendant du CPF (risque réglementaire), récurrence des clients
  entreprises.
- **Financement adapté** : prêt bancaire garanti Bpifrance, prêt
  d'honneur (Initiative France, Réseau Entreprendre), affacturage des
  créances OPCO, fonds propres de business angels si le projet est à forte
  croissance (e-learning).

---

## 9. Exercices du jour 5

1. Construis dans Excel le tableau des sources et emplois d'un parc éolien
   de 30 MW (CAPEX 1,5 M€/MW, raccordement 3 M€, développement 2 M€, IDC
   1,2 M€, aléas 5 % de l'EPC, levier 75 %).
2. Calcule le LCOE d'un parc solaire : CAPEX 30 M€, OPEX 0,9 M€/an,
   production 60 GWh/an, 25 ans, taux de 6 %, sans dégradation.
3. Relis le cas pratique de la section 7 et rédige une note d'une page au
   comité d'investissement : recommandation, 5 points d'attention,
   demandes complémentaires.
4. Liste les 15 hypothèses les plus importantes d'un modèle solaire et,
   pour chacune, indique la source de validation attendue.

## ✅ Auto-évaluation

- [ ] Je connais le plan type d'un BP et l'architecture d'un modèle.
- [ ] Je sais construire le tableau des sources et emplois.
- [ ] Je sais lire un BP en 30 minutes avec la bonne méthode.
- [ ] Je connais au moins 20 signaux d'alerte.
- [ ] Je sais calculer un LCOE.
- [ ] Je sais poser les bonnes questions au sponsor.
