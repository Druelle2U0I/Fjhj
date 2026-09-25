# Jour 4 — Le financement en fonds propres (*equity*)

> **Objectif du jour :** comprendre qui apporte les fonds propres, à quel
> stade, avec quelles attentes de rendement et quels droits. Savoir
> valoriser une entreprise ou un projet, lire une table de capitalisation,
> et comprendre un pacte d'actionnaires et une cascade de distribution
> (*waterfall*).

---

## 1. Pourquoi des fonds propres ?

Les fonds propres sont **l'argent à risque**. Ils sont payés en dernier,
après tous les créanciers, mais ils captent toute la hausse (*upside*).

- **Pour les prêteurs**, c'est un **coussin de sécurité** : plus il y a de
  fonds propres, plus le projet peut encaisser de pertes avant que la dette
  soit touchée.
- **Pour le sponsor**, c'est le « prix d'entrée » pour obtenir la dette et
  le contrôle.
- **Le principe clé** : les fonds propres doivent financer **les phases que
  la dette ne peut pas financer**. C'est le cas du développement, avec son
  risque binaire : obtenir ou non le permis, le raccordement, le tarif.

### 1.1 La hiérarchie du capital (*capital structure*)

```
   RISQUE ↑  RENDEMENT ↑
   ┌──────────────────────────────┐
   │ Actions ordinaires            │  ← dernier payé, contrôle, upside illimité
   ├──────────────────────────────┤
   │ Actions de préférence         │  ← priorité sur les dividendes / la liquidation
   ├──────────────────────────────┤
   │ Quasi-fonds propres :         │
   │ comptes courants d'associés,  │
   │ obligations convertibles (OC),│
   │ prêts participatifs, ORA      │
   ├──────────────────────────────┤
   │ Dette mezzanine / junior      │
   ├──────────────────────────────┤
   │ Dette senior (garantie)       │  ← premier payé, rendement faible
   └──────────────────────────────┘
   RISQUE ↓  RENDEMENT ↓
```

---

## 2. Les fonds propres dans une SPV de projet : la mécanique

### 2.1 Comment les fonds propres sont apportés

Dans une SPV, les « fonds propres » sont rarement 100 % du capital social.
On combine en général :

1. **Du capital social** : il est faible, souvent quelques milliers d'euros
   à quelques pourcents.
2. **Des comptes courants d'associés** (CCA, *shareholder loans*) : c'est
   l'essentiel de l'apport. Ils sont rémunérés, par exemple à 5 à 8 %, et
   **subordonnés à la dette senior**.

Pourquoi les CCA ?

- **Leurs intérêts sont déductibles**, dans les limites du taux maximal
  fiscal et des règles de sous-capitalisation. La fiscalité baisse donc.
- **Leur remboursement n'est pas un dividende.** Il n'y a pas besoin de
  résultat distribuable ni de réserve légale. On évite ainsi le **piège du
  cash** (*cash trap*), c'est-à-dire du cash disponible mais non
  distribuable faute de résultat comptable. Ce piège est fréquent les
  premières années, à cause des gros amortissements.
- **Ils offrent de la flexibilité** pour faire remonter le cash.

### 2.2 Quand les fonds propres sont apportés

- ***Equity first*** : les fonds propres sont dépensés d'abord, puis la
  dette est tirée. C'est la solution préférée des banques.
- ***Pro rata*** : fonds propres et dette sont tirés proportionnellement.
- ***Equity last*** : la dette d'abord, et les fonds propres à la COD, via
  un **prêt relais fonds propres (EBL)** garanti par le sponsor.
  Cela **améliore le TRI actionnaire**, car l'argent sort plus tard.
- **Engagement de fonds propres** (*Equity Commitment Letter*, ECL) : il
  est garanti par une maison mère notée ou par une lettre de crédit
  bancaire.

### 2.3 Les rendements attendus selon la phase

| Phase | Risques principaux | TRI actionnaire cible (EnR Europe, indicatif) | Investisseurs typiques |
|---|---|---|---|
| **Développement précoce** (foncier, études) | Binaire : permis, recours, raccordement | 15 à 25 % et plus, ou valorisation en €/MW | Développeur, fonds de développement, VC, business angels |
| **Ready-to-Build** (permis purgé, tarif obtenu) | Construction, financement | 9 à 12 % | IPP, fonds value-add, *utilities* |
| **Construction** | Retards, surcoûts | 8 à 10 % | Idem |
| **Exploitation, contrat long** (core) | Production, O&M | 6 à 8 % | Fonds core, assureurs, fonds de pension |
| **Exploitation merchant** | Prix | 9 à 12 % | Fonds value-add, *utilities* |

**Conséquence :** **la valeur d'un projet augmente à chaque étape
dérisquée**, parce que le taux d'actualisation baisse. C'est le modèle
économique du **développeur** : il crée de la valeur en dérisquant, puis il
revend.

---

## 3. Le capital-risque et le capital-développement (entreprises)

Si tu finances une **société** (un développeur, une start-up cleantech,
un organisme de formation comme ENMA), les codes sont différents.

### 3.1 Les tours de financement

| Tour | Montant typique (France) | Objectif | Investisseurs |
|---|---|---|---|
| ***Love money* / pré-amorçage** | 10 à 200 k€ | Prototype, premiers clients | Famille, amis, fondateurs, BPI (Bourse French Tech) |
| **Amorçage (*seed*)** | 0,5 à 3 M€ | Trouver l'adéquation produit-marché (*product/market fit*) | Business angels, fonds d'amorçage |
| **Série A** | 3 à 15 M€ | Industrialiser, accélérer la croissance | VC |
| **Série B, C…** | 15 à 100 M€ et plus | Croissance, international | VC *growth*, fonds de croissance |
| **Capital-développement** | 5 à 50 M€ | Croissance d'une PME rentable, minoritaire | Fonds *growth* / *small cap* |
| **LBO** | Toute taille | Transmission, rachat par effet de levier | Private equity |

### 3.2 La valorisation pré-money et post-money

```
Post-money = Pré-money + Montant levé
% investisseur = Montant levé / Post-money
```

**Exemple de table de capitalisation (*cap table*) :**

| | Avant | Amorçage (pré 8 M€, levée 2 M€) | Série A (pré 20 M€, levée 5 M€) |
|---|---|---|---|
| Fondateurs | 100 % | 80 % | 64 % |
| Investisseur amorçage | — | 20 % | 16 % |
| Investisseur série A | — | — | 20 % |
| **Valorisation post-money** | | **10 M€** | **25 M€** |

**La dilution** : chaque tour réduit le pourcentage des anciens
actionnaires, mais **la valeur de leur part peut augmenter**. Ici, les
fondateurs passent de 80 % de 10 M€ (8 M€) à 64 % de 25 M€ (16 M€).

Le **BSPCE / pool d'options** (*ESOP*) : souvent créé *avant* la levée,
donc à la charge des fondateurs. C'est un point de négociation classique.

### 3.3 La méthode VC

On part de la valeur de sortie espérée et on l'actualise au TRI cible du
fonds :

```
Valeur post-money aujourd'hui = Valeur de sortie / (1 + TRI cible)^n  (puis ajustée pour la dilution future)
```

Exemple : une sortie à 60 M€ dans 6 ans, avec un TRI cible de 40 %, donne
60 / 1,4⁶ ≈ **8,0 M€ post-money**.

**Autre exemple :** on investit 5 M€ à 25 M€ post-money, soit 20 % du
capital. La dilution ultérieure réduit la part à 16 %. La sortie a lieu à
150 M€ après 5 ans : on récupère 24 M€, soit un **multiple de 4,8x** et un
**TRI d'environ 37 %**.

### 3.4 Les autres méthodes de valorisation

1. **DCF** (*Discounted Cash Flows*) : on actualise les flux de trésorerie
   disponibles au WACC et on ajoute une valeur terminale. **C'est la
   méthode reine en infrastructure et en EnR**, car les flux sont
   prévisibles.
2. **Multiples de comparables** (*trading comps*) : VE/EBITDA, VE/CA ou
   P/E de sociétés cotées similaires.
3. **Transactions comparables** (*transaction comps*) : les prix payés lors
   de rachats récents. En EnR, on parle de **€/MW** ou de **€/MWc**.
4. **Actif net réévalué (ANR)** : pour les holdings et portefeuilles.
5. **Méthode VC / « First Chicago »** : pour les start-ups, avec des
   scénarios pondérés.

**En EnR, les repères de prix en €/MW (très indicatifs, très variables) :**

- Le **solaire au sol au stade RTB** en France se négocie souvent entre
  quelques dizaines et plus de 100 k€/MWc selon le tarif obtenu, le
  productible et le coût du raccordement.
- L'**éolien terrestre au stade RTB** est généralement plus cher par MW,
  car la rareté des permis et la durée de développement sont plus grandes.
- En exploitation, on raisonne en **DCF au TRI de marché** plutôt qu'en
  €/MW.

**Les paiements différés (*earn-out*) et paiements par étapes
(*milestone payments*)** sont courants dans les ventes de projets en
développement : une partie du prix est payée au permis purgé, une autre au
tarif obtenu, une autre à la COD.

### 3.5 De la valeur d'entreprise à la valeur des titres (*equity bridge*)

```
Valeur des titres (Equity value) = Valeur d'entreprise (EV) – Dette nette – Dettes assimilées (provisions démantèlement, CCA si tiers) + Actifs hors exploitation
```

C'est une étape essentielle dans une cession : **le prix se négocie
« sans trésorerie, sans dette »** (*cash-free / debt-free*). On ajoute un
ajustement pour le BFR normatif, et on choisit entre deux mécanismes :

- ***Locked box*** : le prix est figé à une date passée, et toute sortie de
  valeur (*leakage*) est interdite ensuite.
- ***Completion accounts*** : le prix est ajusté sur des comptes arrêtés au
  closing.

---

## 4. Le LBO en 5 minutes (utile pour la culture PE)

Un **LBO** (*Leveraged Buy-Out*) est le rachat d'une entreprise par une
holding financée par de la dette. Cette dette est remboursée par les
dividendes de la cible.

**Exemple :**

- On achète une entreprise pour une VE de 100, financée par 60 de dette et
  40 de fonds propres, sur la base d'un EBITDA de 10 (multiple de 10x).
- En 5 ans, l'EBITDA passe à 13. La revente se fait à 10x, soit une VE de
  130.
- La dette a été remboursée jusqu'à 35. La valeur des fonds propres est
  donc de 130 − 35 = **95**.
- On obtient un **multiple de 2,4x** et un **TRI d'environ 19 %**.

**Les trois leviers de création de valeur en LBO :**

1. la croissance de l'EBITDA ;
2. le désendettement ;
3. l'expansion du multiple de sortie.

---

## 5. Le pacte d'actionnaires : les clauses à connaître

| Clause | Contenu | Qui la veut |
|---|---|---|
| **Gouvernance** | Composition du conseil, **décisions réservées** (budget, endettement, cessions, contrats clés) à la majorité qualifiée | Les minoritaires |
| **Droit de préemption** | Priorité d'achat en cas de cession par un associé | Tous |
| **Inaliénabilité** (*lock-up*) | Interdiction de céder pendant X années | Le majoritaire, les prêteurs |
| **Sortie conjointe** (*tag-along*) | Le minoritaire peut vendre aux mêmes conditions que le majoritaire | Les minoritaires |
| **Sortie forcée** (*drag-along*) | Le majoritaire peut forcer les minoritaires à vendre | Le majoritaire, les fonds |
| **Anti-dilution** | Protection si un tour futur se fait à un prix inférieur (*ratchet*, moyenne pondérée) | Les investisseurs VC |
| **Préférence de liquidation** (*liquidation preference*) | L'investisseur récupère sa mise (1x, avec ou sans participation) avant les autres | Les investisseurs VC |
| ***Good leaver / Bad leaver*** | Prix de rachat des actions d'un dirigeant qui part | Les investisseurs |
| **Non-concurrence, exclusivité** | | Tous |
| **Deadlock** (blocage entre 50/50) | Mécanisme de sortie de crise, par exemple la clause « *shotgun* » ou « roulette russe » | Les co-sponsors 50/50 |
| **Clause de rendez-vous / liquidité** | Engagement d'organiser une sortie à horizon X | Les fonds |
| **Défaut de financement** (*funding default*) | Dilution punitive si un associé ne suit pas un appel de fonds | Les co-sponsors |

**En SPV EnR**, les clauses clés portent sur :

- les appels de fonds en construction et le défaut de financement ;
- les décisions réservées ;
- les transferts, qui doivent rester compatibles avec la clause de
  changement de contrôle du contrat de crédit ;
- l'accord de développement et le contrat de gestion d'actifs entre la SPV
  et le sponsor-développeur ;
- la politique de distribution.

---

## 6. La cascade de distribution d'un fonds (*distribution waterfall*)

C'est ainsi que les gains sont partagés entre les LPs (les investisseurs)
et le GP (le gérant). Le modèle européen, dit « *whole fund* », se déroule
ainsi :

1. **Retour du capital** : 100 % aux LPs jusqu'au remboursement de leurs
   apports.
2. **Rendement prioritaire (*preferred return / hurdle*)** : 100 % aux LPs
   jusqu'à un TRI de 8 %, par exemple.
3. **Rattrapage du GP (*catch-up*)** : 100 % (ou 80 %) au GP jusqu'à ce
   qu'il ait reçu 20 % des profits cumulés.
4. **Partage** : 80 % aux LPs et 20 % au GP (le *carried interest*).

**Exemple :**

- 100 M€ investis, 200 M€ distribués après 5 ans, soit un profit de
  100 M€.
- Le hurdle à 8 % sur 5 ans représente environ 46,9 M€ de rendement
  prioritaire.
- Avec un rattrapage complet, le GP obtient au final 20 % du profit, soit
  20 M€. Les LPs reçoivent 180 M€.

---

## 7. Les quasi-fonds propres et le financement hybride

| Instrument | Principe | Usage |
|---|---|---|
| **Comptes courants d'associés** | Prêt de l'associé, subordonné | Standard dans les SPV |
| **Obligations convertibles (OC)** | Dette convertible en actions | VC, PME, bridge entre deux tours |
| **Obligations remboursables en actions (ORA)** | Remboursement obligatoire en actions | Renforcement des fonds propres |
| **BSA, BSA AIR** | Bon de souscription d'actions / équivalent français du SAFE | Amorçage |
| **Prêt participatif** | Prêt à rémunération variable, assimilé aux fonds propres par les banques | Bpifrance, PME |
| **Dette mezzanine** | Dette subordonnée, souvent avec un intéressement au capital | LBO, holdco EnR |
| **Dette holdco** | Dette au niveau d'une holding, remboursée par les dividendes des SPV | Augmenter le levier global des IPP |
| **Actions de préférence** | Droits financiers ou politiques renforcés | Fonds, co-investisseurs |
| **Financement participatif** (*crowdfunding*) | Obligations ou minibons auprès du public | **Projets EnR locaux** (Lendosphere, Enerfip, Lumo, Miimosa…). C'est souvent un bonus dans les appels d'offres CRE |

**En EnR : l'investissement participatif et citoyen.** Dans les appels
d'offres CRE, l'engagement au financement participatif (collectivités,
citoyens) a pu donner lieu à un **bonus de prix** selon le cahier des
charges. Il sert aussi à obtenir l'**acceptabilité locale**.

---

## 8. Lever des fonds propres : le processus

1. **Préparer les éléments** : un deck investisseurs de 15 à 20 slides, un
   BP et un modèle financier, une *data room*, un *teaser* d'une page.
2. **Cibler** : sélectionner 20 à 50 investisseurs selon le stade, le
   ticket, le secteur et la thèse d'investissement.
3. **Premier contact** : le teaser, puis la signature d'un accord de
   confidentialité (*NDA*).
4. **Rencontres** : pitch, questions-réponses.
5. **Lettre d'intention (*LOI*) ou *term sheet*** : prix, montant,
   principales clauses du pacte, conditions.
6. **Due diligences** : financière, juridique, technique, ESG.
7. **Documentation** : protocole d'investissement (*SPA / SHA*) et pacte.
8. ***Closing*** : versement des fonds.

**Pour une cession d'actifs EnR (M&A)**, on organise en général un
**processus d'enchères** (*auction*) :

- teaser, puis mémorandum d'information ;
- **offres indicatives non engageantes** (*NBO*), puis short-list ;
- data room et due diligences ;
- **offres fermes engageantes** (*BO*) ;
- **contrat de cession** (*SPA*) ;
- ***closing***, après levée des conditions suspensives (autorisations,
  accord des prêteurs, contrôle des investissements étrangers).

---

## 9. Les métriques que regarde un investisseur en capital

| Métrique | Question |
|---|---|
| **TRI actionnaire** | Le rendement dépasse-t-il mon hurdle ? |
| **Multiple (MOIC / TVPI / DPI)** | Combien de fois je récupère ma mise ? |
| **Délai de récupération** | Quand je rentre dans mes fonds ? |
| **Rendement en dividendes** (*cash yield*) | Combien je touche chaque année ? C'est crucial pour les fonds core |
| **Sensibilité du TRI** | Que devient mon TRI si le prix baisse de 10 % ? Et si la production est au P90 ? |
| **Valeur terminale / de revente** | Quelle part de mon TRI dépend de la sortie ? Plus elle est grande, plus c'est risqué |
| **Exposition au merchant** | Quelle part des revenus n'est pas contractée ? |
| **ESG / taxonomie** | Mon fonds est-il en article 8 ou 9 SFDR ? |

---

## 10. Exercices du jour 4

1. Une start-up lève 3 M€ sur une pré-money de 9 M€. Quel pourcentage
   prend l'investisseur ? Si un pool d'options de 10 % *post-money* doit
   être créé avant la levée, quelle est la part des fondateurs (100 %
   auparavant) après la levée ?
2. Un fonds vise un TRI de 30 % sur 5 ans. La sortie est estimée à 50 M€.
   Il investit 4 M€. Quel pourcentage doit-il obtenir, sans dilution
   ultérieure ?
3. Explique pourquoi une SPV utilise des comptes courants d'associés
   plutôt que du capital social.
4. Un développeur a dépensé 1 M€ pour développer 40 MWc de solaire. Au
   RTB, le projet a une VAN actionnaire de 4 M€ à 9 %. Un acheteur core
   l'évalue à 7 %. Explique qui capte quelle valeur et pourquoi.
5. Cite 5 clauses du pacte d'actionnaires qu'un minoritaire à 30 % dans
   une SPV EnR doit absolument obtenir.

## ✅ Auto-évaluation

- [ ] Je sais pourquoi la valeur d'un projet EnR augmente à chaque étape.
- [ ] Je sais calculer pré-money, post-money et dilution.
- [ ] Je connais les méthodes de valorisation et je sais laquelle utiliser
      quand.
- [ ] Je sais expliquer le pont entre valeur d'entreprise et valeur des
      titres.
- [ ] Je connais les clauses clés d'un pacte.
- [ ] Je sais expliquer une cascade de distribution de fonds.
- [ ] Je comprends le rôle des CCA et le piège du cash.
