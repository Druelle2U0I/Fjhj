# Jour 3 — Le financement bancaire

> **Objectif du jour :** comprendre comment une banque analyse, dimensionne,
> structure et sécurise un crédit, en corporate comme en financement de
> projet. Tu dois pouvoir lire une *term sheet* et **calculer le montant de
> dette qu'un projet peut supporter**.

---

## 1. Financement corporate ou financement de projet

| Critère | Financement corporate | Financement de projet (*project finance*) |
|---|---|---|
| Emprunteur | L'entreprise existante | Une **SPV** dédiée, créée pour le projet |
| Source de remboursement | Tous les flux de l'entreprise | **Uniquement les flux du projet** |
| Recours | Sur tout le bilan de l'entreprise | **Sans recours** (*non-recourse*) ou à **recours limité** (*limited recourse*) sur le sponsor |
| Analyse | Historique, bilan, notation de l'entreprise | Modèle financier prévisionnel et contrats |
| Levier | 2 à 4x l'EBITDA | 70 à 90 % du coût du projet, soit 8 à 12x l'EBITDA et plus |
| Maturité | 5 à 7 ans | 15 à 25 ans (EnR) |
| Documentation | Standard, légère | Lourde : contrats, sûretés, accord intercréanciers |
| Coût de montage | Faible | Élevé : conseils, due diligences, soit 2 à 4 % du projet |
| Taille minimum rentable | Aucune | ~5 à 10 M€ (en dessous, on passe à des portefeuilles ou à du corporate) |

### 1.1 Pourquoi un sponsor choisit-il le financement de projet ?

1. **Un levier élevé**, donc un TRI actionnaire élevé.
2. **Le cantonnement du risque** : si le projet échoue, le sponsor ne perd
   que sa mise. Le reste de son groupe est protégé.
3. **Une dette déconsolidée ou isolée**, qui préserve la capacité
   d'endettement du groupe.
4. **La discipline** : le suivi par les prêteurs et le LTA rend le projet
   plus robuste.
5. **Le partage du risque** avec des partenaires (co-sponsors) et avec les
   banques.

### 1.2 Les variantes de recours

- ***Non-recourse*** : aucun recours sur le sponsor. C'est la situation
  idéale une fois le projet en exploitation.
- ***Limited recourse*** : le sponsor garantit certains risques, par
  exemple :
  - les dépassements de coûts de construction (*cost overrun*) ;
  - un **engagement de fonds propres** (*equity commitment letter*, ECL) ;
  - une garantie de fin de travaux (*completion guarantee*) ;
  - la garantie d'un tirage sur une ligne de réserve.
- ***Full recourse*** : garantie totale du sponsor. On revient alors à du
  corporate déguisé.

---

## 2. Le cycle de vie d'un projet et son financement

```
 DÉVELOPPEMENT          CONSTRUCTION               EXPLOITATION                FIN DE VIE
 (2–7 ans)              (6–24 mois)                (20–40 ans)
 Foncier, études,       EPC, raccordement,         Production, O&M,            Démantèlement
 permis, raccordement,  mise en service (COD)      refinancement, cession      ou repowering
 tarif / PPA
 ───────────────        ───────────────            ───────────────
 Fonds propres          Dette de construction       Dette à terme (*term loan*),
 à risque               (+ fonds propres,           obligations, refinancement
 (développeur, VC,      prêt relais TVA,
 fonds de développement) prêt relais fonds propres)
```

- **Financial close** : la date de signature de tous les contrats de
  financement et de levée des **conditions suspensives** (*Conditions
  Precedent*, CP). Le premier tirage devient possible.
- **COD** (*Commercial Operation Date*) : la mise en service commerciale.
- **Conversion** : le passage du prêt de construction au prêt long terme,
  souvent au sein du même contrat (*mini-perm* ou *term conversion*).

---

## 3. Les produits de dette bancaire

### 3.1 Les tranches d'un financement de projet type

| Tranche | Rôle | Caractéristiques |
|---|---|---|
| **Crédit de construction / *term loan*** | Financer le CAPEX | Tiré au fur et à mesure (*drawdown*), puis converti et amorti sur 15 à 20 ans |
| **Ligne de TVA** (*VAT facility*) | Préfinancer la TVA sur le CAPEX | Court terme, remboursée par le remboursement de TVA de l'État |
| **Prêt relais fonds propres** (*Equity Bridge Loan*, EBL) | Remplacer temporairement les fonds propres pendant la construction | Garanti par le sponsor, remboursé à la COD par l'apport réel de fonds propres. Il améliore le TRI actionnaire |
| **DSRF** (*Debt Service Reserve Facility*) | Remplacer une réserve de cash (DSRA) par une ligne de crédit ou une garantie | Évite de bloquer du cash |
| **Ligne de lettres de crédit** (*LC facility*) | Émettre des garanties (démantèlement, raccordement, PPA) | Commission de 1 à 2 % par an |
| **Ligne de fonds de roulement** (*working capital facility*) | Couvrir les décalages de trésorerie | Faible montant |
| **Swap de taux** | Fixer le taux | Contrat séparé, garanti par les mêmes sûretés, rang *pari passu* |

### 3.2 Les autres produits bancaires utiles

- **Crédit-bail** (*leasing*) : la banque achète l'actif et le loue. Il est
  très utilisé pour le **solaire en toiture** et les petits projets, et il
  est simple à mettre en place.
- **Crédit corporate / RCF** (*Revolving Credit Facility*) : il finance une
  holding ou un développeur.
- **Prêt de portefeuille** (*portfolio financing*) : il regroupe plusieurs
  petits projets pour atteindre une taille critique et mutualiser les
  risques.
- **Financement de holding (holdco)** : une dette au niveau de la holding,
  **structurellement subordonnée** à la dette des SPV. Elle est remboursée
  avec les dividendes remontés des SPV.
- **Affacturage, cession de créances Dailly** : ils mobilisent des créances,
  par exemple une subvention à recevoir.

---

## 4. L'analyse crédit : comment raisonne un banquier

### 4.1 En corporate : la grille des 5 C

1. ***Character*** : la qualité et l'historique du management et des
   actionnaires.
2. ***Capacity*** : la capacité de remboursement, mesurée par la dette
   nette / EBITDA, le taux de couverture des intérêts et le FCF.
3. ***Capital*** : le niveau de fonds propres, c'est-à-dire la mise de
   l'actionnaire.
4. ***Collateral*** : les sûretés et garanties.
5. ***Conditions*** : le marché, le secteur et le contexte économique.

**Ratios corporate classiques :**

- **Dette nette / EBITDA (*leverage*)** : moins de 3x, c'est confortable ;
  plus de 5x, c'est risqué.
- **EBITDA / intérêts (ICR, *interest cover*)** : au-dessus de 4x.
- **Gearing** (dette nette / fonds propres) : en dessous de 1x.
- **Dette financière / CAF** : moins de 3 à 4 ans.

### 4.2 En financement de projet : l'analyse de la robustesse des flux

Le banquier se pose six questions, dans cet ordre :

1. **Le projet va-t-il être construit dans les délais et le budget ?**
   C'est le risque de construction.
2. **Produira-t-il ce qui est prévu ?** C'est le risque de
   ressource et de performance.
3. **Sera-t-il vendu au prix prévu ?** C'est le risque de marché, de
   contrepartie et de prix.
4. **Les coûts seront-ils maîtrisés ?** C'est le risque d'OPEX.
5. **Que se passe-t-il si tout va mal ?** On le vérifie avec les scénarios
   de stress, le point mort (*breakeven*) et le cas P90.
6. **Si le projet fait défaut, peut-on récupérer notre argent ?** Cela
   dépend des sûretés, des droits de substitution (*step-in*) et de la
   valeur de revente.

---

## 5. Les ratios clés du financement de projet (à savoir par cœur)

### 5.1 Le DSCR : *Debt Service Coverage Ratio*

```
DSCR_t = CFADS_t / Service de la dette_t   (Service de la dette = intérêts + capital remboursé)
```

- C'est **le** ratio du financement de projet. On le mesure à chaque
  période, en général semestriellement.
- On distingue trois usages :
  - le **DSCR de dimensionnement** (*sizing DSCR*), utilisé pour calculer
    le montant de la dette ;
  - le **DSCR de blocage** (*lock-up DSCR*) : en dessous de ce seuil, on ne
    distribue plus de dividendes ;
  - le **DSCR de défaut** (*default DSCR*) : en dessous, c'est un cas de
    défaut.
- **Ordres de grandeur en Europe (EnR, milieu des années 2020) :**

| Type de revenus | DSCR de dimensionnement (P50) | DSCR (P90 1 an) |
|---|---|---|
| Tarif réglementé / CfD / complément de rémunération sur 20 ans | 1,15 – 1,25x | 1,05 – 1,10x |
| PPA corporate avec une contrepartie bien notée | 1,20 – 1,35x | 1,10 – 1,15x |
| Part merchant (prix de marché) | 1,50 – 2,00x (ou dette dimensionnée sur un prix plancher) | — |
| Stockage / batteries (revenus en cascade) | 1,40 – 2,00x selon la part contractée | — |

- **Lock-up** : souvent autour de 1,05 à 1,10x. **Défaut** : autour de
  1,00 à 1,05x.

### 5.2 Le LLCR : *Loan Life Coverage Ratio*

```
LLCR = VAN(CFADS jusqu'à la maturité de la dette, au taux de la dette) / Dette restante
```

Le LLCR mesure la capacité **globale** à rembourser la dette sur sa durée
restante. On le compare souvent au DSCR moyen.

### 5.3 Le PLCR : *Project Life Coverage Ratio*

```
PLCR = VAN(CFADS sur toute la durée de vie du projet) / Dette restante
```

La différence PLCR − LLCR mesure le **coussin après la dette** (*tail*),
c'est-à-dire la marge de manœuvre en cas de restructuration.

### 5.4 La queue (*tail*)

Le *tail* est la période entre la maturité de la dette et la fin de vie ou
de contrat du projet. **Les banques exigent une queue** d'au moins 2 à 5
ans pour les EnR afin de pouvoir étendre la dette en cas de difficulté.
Exemple : avec un CfD de 20 ans, la dette tombera à 17 ou 18 ans.

### 5.5 Le levier maximum (*gearing cap*)

Les prêteurs plafonnent aussi la dette à un **pourcentage du coût total du
projet**, de 70 à 90 % selon le risque. **La dette retenue est le minimum
entre la dette issue du DSCR et la dette issue du plafond de levier.**

### 5.6 Les autres ratios

- **ICR** (*Interest Cover Ratio*) : CFADS / intérêts. Il sert aux dettes
  in fine.
- **Dette / EBITDA** : utilisé pour les financements holdco et les
  portefeuilles.
- **Break-even** : le prix ou la production minimum pour que le DSCR
  atteigne 1,00x.

---

## 6. Le dimensionnement de la dette (*debt sizing*) : le cœur du métier

### 6.1 La méthode par le DSCR (*sculpting*)

On fixe un DSCR cible, par exemple 1,25x, et on calcule le service de la
dette maximum pour chaque période :

```
Service de dette max_t = CFADS_t / DSCR cible
Dette max = VAN(Service de dette max_t, au taux de la dette)
```

**Exemple simplifié :**

- CFADS constant de 3,0 M€/an ;
- DSCR cible de 1,25x, donc un service de dette de 2,4 M€/an ;
- maturité de 18 ans, taux all-in de 4,5 %, soit un facteur d'annuité de
  12,16.
- **Dette max = 2,4 × 12,16 ≈ 29,2 M€.**

Si le coût du projet est de 35 M€ :

- le levier ressort à 83 % ;
- si le plafond de levier est de 80 %, la **dette est plafonnée à
  28,0 M€** ;
- les fonds propres s'élèvent à 7,0 M€.

### 6.2 Pourquoi « sculpter » ?

Le CFADS n'est pas constant. Il baisse avec la dégradation des panneaux et
l'OPEX indexé sur l'inflation, et il est saisonnier. Le **profil sculpté**
adapte le remboursement au CFADS de chaque période pour que **le DSCR soit
constant** au niveau cible. Deux bénéfices :

1. On **maximise la dette** à DSCR donné.
2. On évite les périodes où le DSCR tomberait sous le seuil.

Dans Excel, la ligne clé est `Capital_t = CFADS_t / DSCR − Intérêts_t`.
Cela crée une **circularité** : les intérêts dépendent de la dette, qui
dépend des intérêts, et l'impôt dépend des intérêts. On la résout avec une
macro « copier-coller » (*copy-paste macro*) ou avec un calcul analytique.
**Évite l'itération Excel automatique, qui rend le modèle instable.**

### 6.3 Le cas de base bancaire (*banking case*)

La dette se dimensionne sur **le cas des banques**, pas sur celui du
sponsor. Il est généralement plus conservateur :

- production **P50**, avec une vérification sur le **P90** (voir le jour
  6) ;
- prix merchant venant d'une **courbe basse** d'un conseiller de marché ;
- OPEX validés par le LTA, avec une provision pour imprévus ;
- disponibilité technique prudente, par exemple 98 % pour le solaire.

---

## 7. Les mécanismes de protection des prêteurs

### 7.1 La cascade des flux (*cash flow waterfall*)

**C'est l'ordre dans lequel la trésorerie de la SPV est utilisée.** Il est
défini dans le contrat de crédit :

```
 1. Revenus encaissés
 2. – Impôts et taxes, OPEX (O&M, loyers, assurances)
 3. – Commissions des prêteurs et de l'agent
 4. – Intérêts de la dette senior et paiements nets du swap
 5. – Remboursement du capital de la dette senior
 6. – Reconstitution de la DSRA (réserve pour service de la dette)
 7. – Dotation de la MRA (réserve de maintenance)
 8. – Cash sweep obligatoire, s'il y en a un
 9. – Service de la dette junior / mezzanine (le cas échéant)
10. = Test de distribution (lock-up) : si OK → dividendes, remboursement des comptes courants d'associés
```

### 7.2 Les comptes de réserve

- **DSRA** (*Debt Service Reserve Account*) : elle contient en général **6
  mois de service de la dette**. Elle est constituée à la COD, souvent
  financée par la dette elle-même ou remplacée par une garantie bancaire
  (DSRF).
- **MRA / MMRA** (*Maintenance Reserve Account*) : elle provisionne les
  grosses dépenses, comme le remplacement des onduleurs (tous les 10 à 15
  ans en solaire) ou le *gearbox* d'une éolienne.
- **Réserve de démantèlement** : en France, les éoliennes exigent une
  **garantie financière de démantèlement**, dont le montant est fixé par
  arrêté (de l'ordre de 50 000 € par éolienne plus un complément selon la
  puissance).
- **Compte de distribution** : le cash en attente de distribution
  (*lock-up*).

### 7.3 Les covenants (engagements)

| Type | Exemples |
|---|---|
| **Covenants financiers** | DSCR historique et prévisionnel ≥ seuil, LLCR ≥ seuil |
| **Covenants positifs** (*affirmative*) | Fournir les comptes, maintenir les assurances et les autorisations, respecter les lois environnementales |
| **Covenants négatifs** | Interdiction d'emprunter ailleurs, de céder des actifs, de changer d'activité, de consentir des sûretés à d'autres (*negative pledge*), de modifier les contrats clés sans accord |
| **Engagement de changement de contrôle** | Accord des prêteurs requis si les sponsors cèdent le contrôle |

### 7.4 Les cas de défaut (*Events of Default*)

Les principaux : non-paiement, DSCR de défaut non respecté, fausse
déclaration, perte d'une autorisation ou d'un contrat clé, insolvabilité
d'une contrepartie clé non remplacée, dépassement de la date butoir de
mise en service (*long-stop date*), changement de contrôle non autorisé.

En cas de défaut, les prêteurs peuvent :

- **exiger le remboursement anticipé** (accélération) ;
- **réaliser les sûretés** ;
- **se substituer** au sponsor en exerçant leurs droits de *step-in* dans
  les contrats clés.

### 7.5 Les sûretés (*security package*)

Le principe : les prêteurs doivent pouvoir **prendre le contrôle du projet
entier** et le faire tourner ou le revendre.

- **Nantissement des titres de la SPV**, qui permet de prendre le contrôle.
  En France, le **pacte commissoire** permet de devenir propriétaire des
  titres sans vente judiciaire.
- **Nantissement des comptes bancaires.**
- **Cession Dailly des créances**, à titre de garantie : créances du
  contrat EDF OA, du PPA, des indemnités d'assurance, du contrat EPC.
- **Délégation d'assurances.**
- **Hypothèque ou privilège** sur les actifs, ou droits sur le bail
  emphytéotique. C'est plus rare et plus coûteux en France.
- **Accords directs** (*direct agreements*) avec l'EPC, l'O&M,
  l'acheteur d'électricité et le bailleur. Ils donnent un droit de
  substitution aux prêteurs et un délai de préavis avant résiliation.
- **Subordination des comptes courants d'associés** : l'actionnaire est
  remboursé après les banques.
- **Fiducie-sûreté** : c'est une option en France.

### 7.6 Les autres mécanismes

- **Cash sweep** : une partie du cash excédentaire est affectée au
  remboursement anticipé. On l'utilise sur la part merchant ou en fin de
  contrat.
- **Tests de distribution** : les dividendes ne sont autorisés que si le
  DSCR historique et prévisionnel dépasse le seuil de lock-up, si les
  réserves sont pleines et s'il n'y a pas de défaut.
- ***Hedging policy*** : l'obligation de couvrir le taux (et le change si
  besoin).
- ***Mandatory prepayment*** : remboursement obligatoire en cas
  d'indemnités d'assurance, de pénalités EPC ou de cession.

---

## 8. La term sheet : lire et négocier

La **term sheet** est le résumé des conditions du financement. Elle est
négociée avant la documentation complète. Voici un exemple commenté :

| Rubrique | Exemple | Point de vigilance |
|---|---|---|
| Emprunteur | SPV Solaire Sud SAS | Vérifier qu'elle ne porte qu'un seul actif (*ring-fencing*) |
| Montant | 28 M€ (construction), convertible en *term loan* | Minimum entre le DSCR et le levier |
| Maturité | COD + 18 ans | La queue par rapport au CfD de 20 ans |
| Amortissement | Sculpté à un DSCR de 1,20x (P50) / 1,05x (P90 1 an) | **Le point le plus négocié** |
| Marge | Construction : 1,90 % ; années 1-5 : 1,65 % ; 6-10 : 1,80 % ; 11+ : 2,00 % | Le *step-up* incite au refinancement |
| Taux de référence | Euribor 6 mois, couvert à ≥ 80 % par swap | Coût du swap, ISDA, *credit spread* du swap |
| Commissions | Arrangement 1,50 % ; engagement 35 % de la marge | Se comparent en TRI « all-in » |
| DSRA | 6 mois de service de la dette | Cash ou garantie bancaire ? |
| Lock-up | DSCR historique < 1,10x | Plus il est bas, mieux c'est pour le sponsor |
| Défaut | DSCR historique < 1,03x | |
| Cash sweep | 50 % du cash excédentaire après l'année 18 / sur la part merchant | |
| Conditions de tirage | LTA, contrats signés, autorisations purgées de recours, fonds propres apportés | **Les fonds propres d'abord** (*equity first*) ou au prorata ? |
| Sûretés | Nantissement des titres, des comptes, Dailly, direct agreements | |
| Remboursement anticipé | Autorisé avec ou sans commission ; coût de rupture du swap | Flexibilité de refinancement |
| Changement de contrôle | Accord requis ; transferts autorisés vers des « acheteurs qualifiés » | **Crucial pour un sponsor qui veut revendre** |

**Les éléments que le sponsor négocie en priorité :**

1. le DSCR de dimensionnement et le levier ;
2. la maturité ;
3. la marge ;
4. le seuil de lock-up ;
5. la flexibilité (changement de contrôle, refinancement, distributions) ;
6. le niveau de recours pendant la construction.

---

## 9. Le processus de financement bancaire, pas à pas

1. **Préparation** (sponsor et conseil) : modèle financier, mémorandum
   d'information (*information memorandum*), rapports techniques
   préliminaires, *data room*.
2. **Consultation des banques** : envoi d'une *Request for Proposal* (RFP)
   à 4 à 8 banques.
3. **Offres indicatives** (*indicative term sheets*), non engageantes.
4. **Sélection du ou des MLA**, signature d'un **mandat** (*mandate
   letter*) et d'une lettre de commissions.
5. **Due diligences des prêteurs** : LTA, juridique, assurance, audit du
   modèle, marché.
6. **Accord de crédit** (*credit approval*) en comité interne.
7. **Documentation** : contrat de crédit (*facilities agreement*), actes
   de sûretés, accords directs, contrats de couverture (ISDA), accord
   intercréanciers.
8. **Signature et financial close** : levée des conditions suspensives
   (*CP checklist*).
9. **Tirages** pendant la construction, sur certificat du LTA.
10. **Suivi** (*monitoring*) : reporting semestriel, calcul des ratios,
    certificats de conformité (*compliance certificates*), puis *waivers*
    et avenants si besoin.

**Durée typique :** 3 à 6 mois entre la RFP et le financial close pour un
projet EnR standard en France.

---

## 10. La restructuration : quand ça va mal

- ***Waiver*** : les prêteurs renoncent ponctuellement à se prévaloir d'un
  défaut technique.
- **Avenant** (*amendment*) : changement durable des conditions, par
  exemple un réaménagement de l'amortissement.
- ***Standstill*** : un gel des poursuites le temps de négocier.
- **Apport de fonds propres complémentaires** (*equity cure*) : le sponsor
  réinjecte du cash pour rétablir le DSCR.
- **Conversion de dette en capital**, ou prise de contrôle par les
  prêteurs.
- En France, il existe des procédures dédiées : **mandat ad hoc** et
  **conciliation** (amiables et confidentielles), ou **sauvegarde** et
  **redressement judiciaire** (collectives).

---

## 11. Exercices du jour 3

1. Un projet a un CFADS de 4,0 M€/an pendant 17 ans. Le taux all-in est de
   4,8 %, le DSCR cible de 1,20x et le coût total de 42 M€, avec un
   plafond de levier de 85 %. Calcule la dette maximale et les fonds
   propres nécessaires.
2. Explique pourquoi le sculpting permet d'emprunter plus qu'une annuité
   constante à DSCR minimum identique.
3. Classe par ordre de priorité, dans la cascade : dividendes, OPEX,
   intérêts seniors, DSRA, capital senior, mezzanine.
4. Le DSCR historique de l'année 6 est de 1,07x, avec un lock-up à 1,10x
   et un défaut à 1,03x. Que se passe-t-il ?
5. Rédige les 10 questions que tu poses à un sponsor avant d'envoyer son
   dossier en comité de crédit.

## ✅ Auto-évaluation

- [ ] Je sais expliquer la différence entre financement corporate et
      financement de projet en 1 minute.
- [ ] Je sais calculer un DSCR, un LLCR et une dette maximale.
- [ ] Je sais expliquer le sculpting et la circularité.
- [ ] Je connais par cœur la cascade des flux et les réserves.
- [ ] Je sais lire une term sheet et dire ce qui est négociable.
- [ ] Je connais le paquet de sûretés typique en France.
