# Jour 2 — Le marché bancaire et financier

> **Objectif du jour :** savoir qui prête, qui investit, pourquoi, à quel
> prix et sous quelles contraintes réglementaires. Un bon financeur de
> projet sait **à quelle porte frapper** pour chaque type de besoin.

---

## 1. La carte du système financier

```
                    ┌──────────────────────────────────────┐
                    │  ÉPARGNE (ménages, entreprises, États) │
                    └───────────────┬──────────────────────┘
          ┌─────────────────────────┼──────────────────────────┐
          ▼                         ▼                          ▼
  FINANCEMENT INTERMÉDIÉ    MARCHÉS FINANCIERS        GESTION D'ACTIFS
  (banques : dépôts →       (actions, obligations,    (assureurs, fonds de
   crédits)                  titrisation)             pension, fonds PE,
                                                      infra, dette privée)
          └─────────────────────────┼──────────────────────────┘
                                    ▼
                      ENTREPRISES / PROJETS / ÉTATS
```

- **L'Europe et la France sont historiquement « bancocentrées ».** Environ
  deux tiers du financement des entreprises passent par les banques. Aux
  États-Unis, c'est l'inverse : les marchés dominent.
- La tendance de fond depuis 2010 est la **désintermédiation**. La
  **dette privée** (*private debt*) et les **fonds d'infrastructure**
  prennent une part croissante, notamment parce que Bâle III rend certains
  crédits longs plus coûteux pour les banques.

---

## 2. Les banques

### 2.1 Les types de banques

| Type | Exemples (France et Europe) | Rôle en financement de projet |
|---|---|---|
| **Banques universelles / CIB** (*Corporate & Investment Banking*) | BNP Paribas, Société Générale, Crédit Agricole CIB, Natixis (BPCE), ING, Santander, SMBC, MUFG, Deutsche Bank | Arrangeurs de grands financements, souscription, couvertures de taux, syndication |
| **Banques mutualistes / régionales** | Crédit Agricole (caisses régionales), Crédit Mutuel Arkéa, Banque Populaire, Caisse d'Épargne, CIC | Financement de projets EnR de taille moyenne (5 à 100 M€), très actives dans le solaire et l'éolien locaux |
| **Banques spécialisées EnR / infra** | Triodos, la Banque des Territoires (CDC), ex-Unifergie (Crédit Agricole), BPI | Niches, petits tickets, projets citoyens |
| **Banques publiques et de développement** | **Bpifrance**, **BEI** (Banque européenne d'investissement), Banque des Territoires, KfW (Allemagne), BERD, AFD / Proparco (international) | Prêts longs, garanties, co-financement, effet catalyseur |
| **Agences de crédit export (ECA)** | Bpifrance Assurance Export, Euler Hermes (Allemagne), EKF (Danemark, très active dans l'éolien) | Garantissent les prêts liés à l'export d'équipements |

### 2.2 Comment une banque gagne de l'argent sur un crédit

```
Revenu de la banque = Marge d'intérêt + Commissions (arrangement, engagement, agent)
                    + Produits annexes (couverture de taux, cash management, change)
Coûts = Coût de la liquidité + Coût du risque (pertes attendues) + Coût des fonds propres réglementaires + Frais de gestion
```

La banque raisonne en **RAROC** (*Risk-Adjusted Return On Capital*) :

```
RAROC = (Revenus – Coûts – Pertes attendues) / Fonds propres économiques alloués
```

Un crédit est accepté si son RAROC dépasse le seuil de la banque, souvent
10 à 12 %. **C'est pourquoi les produits annexes comptent autant** : une
banque accepte une marge faible si elle obtient aussi le swap de taux, qui
est très rentable pour elle.

### 2.3 La perte attendue : PD, LGD, EAD

```
Perte attendue (EL) = PD × LGD × EAD
```

- **PD** (*Probability of Default*) : la probabilité de défaut à un an.
  Elle dépend de la notation interne.
- **LGD** (*Loss Given Default*) : la perte en cas de défaut, en % de
  l'exposition. Elle dépend des sûretés.
- **EAD** (*Exposure At Default*) : l'exposition au moment du défaut.

**Le financement de projet a historiquement un excellent taux de
récupération.** Les études de Moody's sur plusieurs décennies montrent des
taux de récupération moyens de l'ordre de 75 à 80 %, supérieurs aux prêts
corporate de même notation. La raison : l'actif continue de produire même
après un défaut.

### 2.4 La régulation bancaire (Bâle III, puis « Bâle IV » / CRR3)

- **Ratio de solvabilité** : les fonds propres doivent dépasser un
  pourcentage des **RWA** (*Risk-Weighted Assets*, actifs pondérés par le
  risque). Le minimum CET1 est de 4,5 %, auquel s'ajoutent des coussins.
  En pratique, les banques visent 12 à 14 %.
- **Pondérations en financement de projet** : sous l'approche
  « *slotting* » (*specialised lending*), les projets sont classés en
  catégories (fort, bon, satisfaisant, faible). Plus la catégorie est
  mauvaise, plus la banque doit mobiliser de fonds propres.
- **CRR3 (Bâle IV)**, en application dans l'UE depuis janvier 2025 :
  - un *output floor* limite l'avantage des modèles internes ;
  - un traitement plus favorable est prévu pour les projets de **haute
    qualité en phase d'exploitation** ;
  - un facteur de soutien existe pour les infrastructures.
- **Ratios de liquidité** : le **LCR** (liquidité à 30 jours) et surtout le
  **NSFR** (financement stable à 1 an). Ces ratios rendent les prêts à 20
  ans ou plus coûteux pour les banques. **Cela explique la montée des
  assureurs et des fonds de dette** sur les maturités longues.
- **Taxonomie verte européenne et GAR** (*Green Asset Ratio*) : les banques
  doivent publier la part de leurs actifs alignés sur la taxonomie. **Un
  projet EnR éligible est donc recherché**, ce qui peut se traduire par des
  marges plus basses.

---

## 3. Les banques centrales et les taux

### 3.1 La BCE et les taux directeurs

La BCE fixe notamment le **taux de la facilité de dépôt**, qui pilote les
taux courts de la zone euro.

Historique récent pour se repérer : taux négatifs jusqu'en 2022, remontée
rapide à 4 % en 2023, puis baisses successives à partir de juin 2024 pour
revenir autour de 2 % en 2025.

### 3.2 Les taux de référence

- **€STR** : le taux au jour le jour de la zone euro.
- **Euribor** (1, 3, 6 et 12 mois) : le taux interbancaire à terme. **La
  plupart des prêts de projet en euros sont indexés sur l'Euribor 3 ou 6
  mois.**
- **Taux de swap** (*swap rate*, taux fixe contre Euribor, sur 5, 10, 15
  ou 20 ans) : c'est lui qui fixe le coût d'une dette couverte.
- **Taux souverains** : OAT (France), Bund (Allemagne). Leur écart
  (*spread*) OAT–Bund mesure le risque France.

### 3.3 La construction du taux d'un prêt de projet

```
Taux all-in = Taux de base (Euribor, ou taux de swap si couvert) + Marge de crédit + (coût de liquidité / commissions lissées)
```

**Exemple :** un taux de swap à 18 ans de 2,5 % et une marge de 1,75 %
donnent **un taux all-in d'environ 4,25 à 4,5 %**, commissions incluses.

- La **marge** reflète le risque : elle est plus élevée en construction et
  plus basse en exploitation. Elle **augmente souvent par paliers**
  (*step-up*) au fil du temps pour inciter au refinancement.
- La **couverture de taux** (*swap*) : la SPV emprunte à taux variable et
  signe un swap « payeur de taux fixe » pour stabiliser ses charges. Les
  prêteurs exigent en général que **75 à 100 % de la dette soit
  couverte**.

### 3.4 La courbe des taux

- **Courbe normale** : les taux longs sont supérieurs aux taux courts.
- **Courbe inversée** : les taux courts sont supérieurs aux taux longs.
  C'était le cas en 2023, et c'est souvent un signal de récession.
- En financement de projet, une courbe pentue rend la couverture longue
  plus chère, ce qui pèse sur le dimensionnement de la dette.

---

## 4. Les marchés financiers

### 4.1 Le marché obligataire (*bond market*)

- Une **obligation** est un titre de dette négociable, avec un coupon fixe
  ou variable et un remboursement le plus souvent in fine.
- Les **obligations de projet** (*project bonds*) sont surtout utilisées
  pour les grands projets (plus de 300 M€) et pour le refinancement
  d'actifs en exploitation. Elles sont souvent souscrites en **placement
  privé** (*private placement*) par des assureurs.
- **L'Euro PP** est un placement privé obligataire à la française, conçu
  pour les ETI et les projets.
- **Les obligations vertes** (*green bonds*) suivent les Green Bond
  Principles de l'ICMA et, depuis 2024, le standard européen **EuGB**. Les
  fonds levés doivent être affectés à des actifs verts.
- **La notation** (S&P, Moody's, Fitch) : *investment grade* à partir de
  BBB-/Baa3, *high yield* en dessous. Beaucoup d'investisseurs
  institutionnels ne peuvent acheter que de l'*investment grade*.

### 4.2 Le marché actions (*equity market*)

- **Introduction en bourse (IPO)**, augmentations de capital.
- Quelques acteurs EnR cotés en France : Neoen (racheté par Brookfield en
  2024-2025), Voltalia, Albioma (racheté par KKR en 2022). Il y a aussi les
  *yieldcos*, des sociétés cotées détenant des actifs en exploitation et
  distribuant la majorité de leur cash.
- Les cotations sur Euronext Growth sont faites pour les PME.

### 4.3 La titrisation

C'est le regroupement de prêts ou d'actifs dans un véhicule qui émet des
titres découpés par niveau de risque (*tranches*). C'est encore rare pour
les projets EnR en Europe, mais cela se développe, par exemple pour les
portefeuilles de toitures solaires résidentielles.

---

## 5. Les investisseurs institutionnels et les fonds

### 5.1 Les investisseurs de long terme (*Limited Partners*, LPs)

Ce sont les apporteurs de capitaux :

- **Assureurs** (AXA, Allianz, CNP, Generali) : ils ont un passif long,
  donc ils cherchent des actifs longs. Grands acheteurs de dette
  d'infrastructure.
- **Fonds de pension** (APG, PGGM, CDPQ, CPP, Ontario Teachers') : ce sont
  les plus gros investisseurs mondiaux en infrastructure.
- **Fonds souverains** (GIC, ADIA, Norges, PIF).
- **Family offices**, banques privées, épargne salariale, ainsi que
  l'épargne retail via les fonds ELTIF 2.0, les FCPR et les unités de
  compte.

### 5.2 Les gérants de fonds (*General Partners*, GPs)

| Catégorie | Stratégie | Exemples (indicatifs) |
|---|---|---|
| **Fonds d'infrastructure core / core+** | Actifs en exploitation, contrats longs, TRI de 6 à 9 % | Macquarie (MIRA), Brookfield, Allianz Capital Partners, Meridiam, Mirova, Antin (plutôt value-add) |
| **Fonds d'infrastructure value-add** | Développement, construction, plateformes, TRI de 10 à 15 % | Antin, Ardian Infrastructure, InfraVia, Eurazeo Infra, Infranity, Omnes Capital |
| **Fonds de dette d'infrastructure** | Dette senior ou junior longue | AXA IM Alts, Ardian Infra Debt, BlackRock, Schroders Greencoat, Allianz GI, Sienna, EIFFEL |
| **Fonds de transition énergétique** | Développeurs EnR, nouvelles technologies (H₂, stockage) | Mirova, Eiffel Investment Group (Transition), Tikehau (T2), Omnes, Demeter, CIP (Copenhagen Infrastructure Partners) |
| **Private equity** (LBO) | Rachats d'entreprises avec effet de levier | Ardian, PAI, Eurazeo, Wendel, KKR, CVC |
| **Capital-risque** (*venture capital*) | Start-ups | Partech, Eurazeo, Breega, Demeter (climat), Bpifrance |

**Le fonctionnement d'un fonds fermé (*closed-end fund*) :**

- Durée de 10 à 12 ans, jusqu'à 15 à 25 ans pour certains fonds d'infra
  (fonds *open-ended*, dits « evergreen »).
- **Frais de gestion** : 1 à 2 % par an (*management fees*).
- **Intéressement (*carried interest*)** : environ 10 à 20 % de la
  surperformance, au-delà d'un **taux de rendement minimum (*hurdle*)** de
  l'ordre de 6 à 8 %.
- **Appels de fonds (*capital calls*)** : les LPs versent l'argent au fur
  et à mesure des investissements.
- **Conséquence pour toi** : un fonds a un **TRI cible** et une **durée de
  détention**. Il voudra connaître la **sortie** dès l'entrée.

### 5.3 Les acteurs industriels et énergéticiens (sponsors stratégiques)

- **Les *utilities* et majors** : EDF Renouvelables (EDF power solutions),
  Engie, TotalEnergies, RWE, Iberdrola, Enel, Ørsted, Statkraft.
- **Les IPP** (*Independent Power Producers*) : Neoen, Voltalia, Boralex,
  Valorem, Qair, Urbasolar (Axpo), JPEE, Technique Solaire, Arkolia, Apex,
  Photosol, Amarenco, GLHD, Reden…
- **Les développeurs purs** : ils développent le projet jusqu'au permis
  (*ready-to-build*, RTB) puis le revendent.

Il existe **deux modèles d'affaires** :

- ***Develop & Sell*** : on revend au RTB ou à la mise en service (COD) et
  on encaisse une marge de développement.
- ***Develop, Build & Own*** : on garde l'actif pour capter les flux sur 20
  à 40 ans. Ce modèle demande beaucoup de fonds propres.

---

## 6. L'écosystème public français et européen

| Acteur | Outils clés pour les projets |
|---|---|
| **Bpifrance** | Prêts verts, prêts participatifs, garanties (jusqu'à 70 %), fonds propres directs et via des fonds (fonds de fonds), **Prêt Vert / Prêt EnR**, soutien à l'innovation |
| **Banque des Territoires (Groupe Caisse des Dépôts)** | Fonds propres minoritaires dans les SPV EnR, prêts longs aux collectivités, soutien aux SEM et SPL |
| **BEI** | Prêts longs, souvent via des banques intermédiaires (*intermediated loans*), co-financement des grands projets, InvestEU |
| **ADEME** | Subventions (Fonds Chaleur, biomasse, géothermie), appels à projets |
| **CRE** (Commission de Régulation de l'Énergie) | Organise les **appels d'offres EnR** (PPE2), calcule les tarifs et la rémunération des EnR sous contrat |
| **EDF OA** (Obligation d'Achat) | Contrepartie historique des **contrats d'obligation d'achat et de complément de rémunération** |
| **Régions, SEM énergie** | Fonds régionaux EnR (Oser en Auvergne-Rhône-Alpes, Énergies POSIT'IF en Île-de-France, AREC Occitanie, etc.) |
| **Commission européenne** | Taxonomie, Innovation Fund, CEF Énergie, InvestEU, règles d'aides d'État |

---

## 7. Les métiers et rôles dans un financement

Qui fait quoi dans une opération de financement de projet :

| Rôle | Description |
|---|---|
| **Sponsor(s)** | Les actionnaires du projet. Ils développent, apportent les fonds propres et portent le risque résiduel |
| **SPV / SPC** (*Special Purpose Vehicle*, **société de projet**) | La société (souvent une SAS) qui détient l'actif, signe les contrats et emprunte |
| **Conseil financier** (*financial advisor*) | Il structure le financement, organise l'appel d'offres bancaire et négocie la term sheet pour le sponsor |
| **MLA** (*Mandated Lead Arranger*) | La banque (ou le groupe de banques) qui arrange la dette, s'engage sur le montant et négocie la documentation |
| **Arrangeur / *Bookrunner*** | Il organise la **syndication**, c'est-à-dire la revente d'une partie du prêt à d'autres banques |
| **Banque agent** (*facility agent*) | Elle gère le prêt au quotidien : tirages, paiements, circulation de l'information, votes |
| **Agent des sûretés** (*security agent / trustee*) | Il détient les sûretés pour le compte de tous les prêteurs |
| **Banque de compte** (*account bank*) | Elle tient les comptes nantis de la SPV |
| **Contreparties de couverture** (*hedging banks*) | Elles fournissent les swaps de taux et de change |
| **Avocats** (des prêteurs et du sponsor) | Documentation de crédit, sûretés, due diligence juridique |
| **Conseillers techniques** (*Lender's Technical Advisor*, LTA / IE) | Revue du productible, de la technologie, des contrats EPC et O&M, suivi de la construction |
| **Conseil en assurance** (*Lender's Insurance Advisor*) | Revue du programme d'assurances |
| **Auditeur du modèle** (*model auditor*) | Vérifie les calculs du modèle financier |
| **Conseil de marché** (*market advisor*) | Projections de prix de l'électricité, indispensables pour la part merchant |
| **Notaire / géomètre** | Foncier, baux emphytéotiques, servitudes |

### 7.1 Syndication et club deal

- **Prêt bilatéral** : une seule banque. C'est le cas des petits projets de
  moins de 20 à 30 M€.
- ***Club deal*** : un petit groupe de banques (2 à 5) qui s'engagent
  ensemble dès le départ, sans syndication.
- **Syndication** : le MLA souscrit l'ensemble du prêt (*underwriting*) puis
  le revend. Il porte donc un **risque de syndication** et se fait
  rémunérer avec une commission de prise ferme (*underwriting fee*).
- **Clauses *market flex*** : elles permettent à l'arrangeur de modifier le
  prix ou la structure si la syndication échoue.

### 7.2 Les commissions à connaître

| Commission | Assiette | Ordre de grandeur |
|---|---|---|
| ***Upfront / arrangement fee*** | Montant du prêt, payée à la signature | 0,75 à 2 % |
| ***Commitment fee*** | Montant non tiré, pendant la construction | 30 à 40 % de la marge, soit ~0,35 à 0,7 % par an |
| ***Agency fee*** | Forfait annuel | 10 à 50 k€ par an |
| ***Prepayment fee*** | Remboursement anticipé | 0 à 1 %, parfois dégressif |
| ***Hedging credit spread*** | Intégré au taux du swap | Quelques points de base |

---

## 8. Les grandes tendances du marché (à citer en entretien)

1. **La transition énergétique est le premier secteur du financement de
   projet** en Europe, en nombre d'opérations comme en volume.
2. **La part merchant augmente.** Avec la cannibalisation des prix solaires
   aux heures de production et les prix négatifs, les banques deviennent
   plus prudentes : DSCR plus élevés et maturités plus courtes sur la part
   non contractée.
3. **Les PPA corporate** (contrats de vente d'électricité directement à des
   entreprises) se développent comme alternative ou complément aux
   mécanismes publics.
4. **Hybridation et stockage** : solaire + batteries, *revenue stacking*,
   c'est-à-dire l'empilement de revenus (capacité, services système,
   arbitrage).
5. **Consolidation** : les grands fonds rachètent des IPP (Brookfield avec
   Neoen, KKR avec Albioma, etc.).
6. **Dette privée et assureurs** : ils se positionnent sur les maturités
   longues et les structures holdco.
7. **ESG et taxonomie** : SFDR (articles 8 et 9), taxonomie, *green
   loans*. Ce sont des conditions d'accès au capital.
8. **Hausse des taux en 2022-2023** : elle a fait baisser la valeur des
   actifs, a renchéri les projets et a relevé les tarifs des appels
   d'offres CRE.

---

## 9. Exercices du jour 2

1. Dessine de mémoire le schéma des acteurs d'un financement de projet
   (sponsor, SPV, MLA, agent, LTA, EPC, O&M, acheteur d'électricité,
   assureurs).
2. Calcule le taux all-in d'un prêt avec un taux de swap à 15 ans de
   2,6 %, une marge de 1,60 % et une commission d'arrangement de 1,5 %
   lissée sur une durée de vie moyenne de 9 ans.
3. Explique à quelqu'un de non financier pourquoi une banque accepte une
   marge de 1,3 % sur un projet solaire alors qu'elle en demande 3 % à une
   PME.
4. Pour chacun des besoins suivants, cite deux acteurs possibles :
   - (a) 2 M€ de fonds propres pour un développeur ;
   - (b) 80 M€ de dette senior pour un parc éolien ;
   - (c) 15 M€ de mezzanine holdco ;
   - (d) le rachat d'un portefeuille de 300 MW en exploitation.
5. Quelle est la différence entre un club deal et une syndication ?

## ✅ Auto-évaluation

- [ ] Je connais les grandes familles de financeurs et leur appétit de
      risque.
- [ ] Je sais construire un taux all-in.
- [ ] Je comprends PD × LGD × EAD et le RAROC.
- [ ] Je sais pourquoi Bâle III et IV poussent les assureurs et les fonds
      de dette sur le long terme.
- [ ] Je connais les rôles MLA, agent, LTA et agent des sûretés.
- [ ] Je connais le fonctionnement d'un fonds (GP, LP, hurdle, carried).
