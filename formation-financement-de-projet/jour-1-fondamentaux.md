# Jour 1 — Les bases de la finance

> **Objectif du jour :** lire les trois états financiers, raisonner en flux
> de trésorerie, maîtriser la valeur temps de l'argent (actualisation, VAN,
> TRI) et comprendre le coût du capital (WACC). Sans ces bases, le reste du
> programme ne tient pas.

---

## 1. Pourquoi commencer par là ?

Un banquier comme un investisseur ne financent pas un projet : ils financent
**des flux de trésorerie futurs**. Toute la finance répond à trois
questions :

1. **Combien** d'argent le projet va-t-il générer ? C'est le rôle des états
   financiers et du business plan.
2. **Quand** cet argent arrivera-t-il ? C'est la valeur temps et
   l'actualisation.
3. **Avec quelle certitude** ? C'est le risque, qui se traduit par le taux
   exigé.

---

## 2. Les trois états financiers

### 2.1 Le compte de résultat (P&L, *income statement*)

Il mesure **la richesse créée sur une période**. Il suit la logique des
droits constatés (engagements), pas celle de l'encaissement.

```
  Chiffre d'affaires (CA)                    Revenue
– Achats consommés, charges externes         OPEX
– Impôts et taxes (hors IS)
– Charges de personnel
= EBE / EBITDA                               Earnings Before Interest, Taxes, Depreciation & Amortization
– Dotations aux amortissements et provisions D&A
= Résultat d'exploitation / EBIT
– Charges financières (intérêts)             Interest
+ Produits financiers
= Résultat courant avant impôt               EBT
– Impôt sur les sociétés (IS, 25 % en France) Tax
= Résultat net                               Net income
```

**Ce qu'il faut retenir :**

- **L'EBITDA (ou EBE)** est l'indicateur roi. Il représente le cash
  d'exploitation avant investissements, impôt et financement, et c'est lui
  qui paie la dette. Dans un projet EnR, l'EBITDA atteint souvent 70 à 85 %
  du chiffre d'affaires, car il n'y a pas de matière première à acheter :
  le soleil et le vent sont gratuits.
- **L'amortissement** n'est pas une sortie de cash. C'est la répartition
  comptable d'un investissement déjà payé. Il réduit pourtant l'impôt : on
  parle d'**économie d'impôt liée à l'amortissement** (*tax shield*).
- **Les intérêts** sont déductibles de l'IS, dans certaines limites. En
  France, la déductibilité des charges financières nettes est plafonnée à
  30 % de l'EBITDA fiscal ou à 3 M€, en retenant le montant le plus élevé.
  C'est un point clé dans les SPV très endettées.

### 2.2 Le bilan (*balance sheet*)

C'est une **photo du patrimoine à une date donnée**.

| ACTIF (ce que la société possède) | PASSIF (comment c'est financé) |
|---|---|
| **Actif immobilisé** : centrales, terrains, logiciels, titres | **Capitaux propres** : capital, réserves, résultat |
| **Actif circulant** : stocks, créances clients, TVA à récupérer | **Quasi-fonds propres** : comptes courants d'associés, obligations convertibles |
| **Trésorerie** | **Dettes financières** : emprunts bancaires, obligations |
| | **Dettes d'exploitation** : fournisseurs, dettes fiscales et sociales |

**Équation fondamentale : Actif = Passif.** Dans un modèle financier, si le
bilan ne s'équilibre pas, le modèle est faux. C'est le premier contrôle
qu'on vérifie (*balance check*).

**Notions clés :**

- **BFR (Besoin en Fonds de Roulement, *working capital*)** = stocks +
  créances − dettes fournisseurs. C'est l'argent immobilisé par le cycle
  d'exploitation. Dans un projet EnR, il est faible : c'est surtout le
  décalage de paiement de l'acheteur d'électricité, en général 30 à 60
  jours, et la TVA pendant la construction.
- **Dette nette** = dettes financières − trésorerie.
- **Levier (*gearing*)** : Dette / (Dette + Fonds propres). En financement
  de projet EnR, on voit couramment 70 à 90 %.

### 2.3 Le tableau de flux de trésorerie (*cash flow statement*)

C'est **l'état le plus important en financement de projet**. Il répond à la
question : « Combien de cash est réellement entré et sorti ? »

```
  EBITDA
– Impôt sur les sociétés payé
± Variation du BFR
= Flux de trésorerie d'exploitation          Cash Flow from Operations (CFO)
– Investissements (CAPEX)
= Flux de trésorerie disponible (FCF)        Free Cash Flow (to firm)
+ Émissions de dette / apports de capital
– Remboursements de dette, intérêts
– Dividendes
= Variation de trésorerie
```

En financement de projet, on utilise un concept dérivé central, le
**CFADS** (*Cash Flow Available for Debt Service*), c'est-à-dire le flux
disponible pour servir la dette :

```
CFADS = EBITDA – IS payé – Δ BFR – CAPEX de maintenance (± mouvements de comptes de réserve)
```

C'est **le numérateur de tous les ratios bancaires**, que l'on étudiera au
jour 3.

> 💡 **Réflexe d'expert :** « Le résultat est une opinion, le cash est un
> fait. » Quand tu lis un BP, commence toujours par le tableau de flux, pas
> par le compte de résultat.

---

## 3. La valeur temps de l'argent

### 3.1 Le principe

Recevoir 1 000 € aujourd'hui vaut plus que recevoir 1 000 € dans 10 ans,
pour trois raisons :

1. **Le coût d'opportunité** : placé aujourd'hui, cet argent rapporte des
   intérêts.
2. **L'inflation** : il perd du pouvoir d'achat avec le temps.
3. **Le risque** : les 1 000 € futurs ne sont pas certains.

### 3.2 La capitalisation et l'actualisation

- **Capitaliser** (aller vers le futur) : `VF = VA × (1 + r)^n`
  - Exemple : 1 000 € placés à 8 % pendant 5 ans donnent
    1 000 × 1,08⁵ = **1 469 €**.
- **Actualiser** (revenir au présent) : `VA = VF / (1 + r)^n`
  - Exemple : 1 000 € reçus dans 10 ans, à 5 %, valent aujourd'hui
    1 000 / 1,05¹⁰ = **614 €**.

Le **facteur d'actualisation** vaut `1/(1+r)^n`. Plus le taux est élevé et
plus l'échéance est lointaine, moins le flux futur vaut aujourd'hui.

### 3.3 Les annuités, ou comment se calcule un prêt

Un prêt « amortissable à échéances constantes » se rembourse par une
annuité fixe :

```
Annuité = Capital × r / (1 – (1 + r)^–n)
```

Exemple : pour 1 M€ sur 10 ans à 5 %, l'annuité vaut **129 505 €/an**
(dans Excel : `=PMT(5%;10;-1000000)`, ou `=VPM` en version française).

Il existe trois grands profils d'amortissement d'une dette :

| Profil | Principe | Usage |
|---|---|---|
| **Annuités constantes** | Même montant chaque année. Les intérêts baissent et le capital remboursé augmente | Crédit immobilier, prêts corporate |
| **Amortissement constant** | Même capital remboursé chaque année, donc des échéances décroissantes | Crédit-bail, prêts d'équipement |
| **In fine (*bullet*)** | Seuls les intérêts sont payés, tout le capital est remboursé à la fin | Obligations, prêts relais, mezzanine |
| **Sculpté (*sculpted*)** | L'échéance suit le CFADS pour garder un DSCR constant | **Financement de projet** (voir le jour 3) |

### 3.4 La valeur actuelle nette (VAN, *NPV*)

```
VAN = – Investissement initial + Σ [ Flux_t / (1 + r)^t ]
```

- **VAN > 0** : le projet crée de la valeur au taux exigé r.
- **VAN < 0** : il en détruit.
- r est le **taux d'actualisation**, c'est-à-dire le rendement minimum
  exigé compte tenu du risque.

**Exemple :** on investit 100 et on reçoit 30 par an pendant 5 ans, avec
r = 8 %.

```
VAN = –100 + 30/1,08 + 30/1,08² + 30/1,08³ + 30/1,08⁴ + 30/1,08⁵
    = –100 + 119,78 = +19,78
```

Dans Excel : `=NPV(8%;B2:F2)+A2` (ou `=VAN`). Attention : la fonction
`NPV` d'Excel suppose que le premier flux tombe en fin de période 1. Le
flux de l'année 0 doit donc être ajouté à part.

### 3.5 Le taux de rendement interne (TRI, *IRR*)

Le TRI est **le taux qui annule la VAN**. C'est le rendement annuel moyen
du projet.

Dans l'exemple ci-dessus, **le TRI vaut 15,24 %** (dans Excel :
`=IRR(A2:F2)` ou `=TRI`). Comme le TRI est supérieur au taux exigé de 8 %,
le projet est acceptable.

**Les limites du TRI, à connaître absolument :**

1. **Il suppose le réinvestissement des flux au TRI lui-même.** C'est
   irréaliste quand le TRI est élevé. Le **TRI modifié (MIRR)** corrige ce
   biais.
2. **Il favorise les projets courts.** Comparons deux projets, avec
   r = 8 % :
   - A : −100, puis +60, +60 → TRI **13,1 %**, VAN **7,0**
   - B : −100, puis 0, 0, 0, 0, +180 → TRI **12,5 %**, VAN **22,5**

   A a le meilleur TRI, mais **B crée trois fois plus de valeur**. **La VAN
   est le bon critère de création de valeur. Le TRI est un indicateur de
   rendement.**
3. **Il peut y avoir plusieurs TRI** quand les flux changent de signe
   plusieurs fois, par exemple avec un démantèlement coûteux en fin de vie.
4. **Il dépend de la date des flux.** Utilise `XIRR` (`TRI.PAIEMENTS`) avec
   des dates réelles dès que les flux ne sont pas annuels.

**Les indicateurs complémentaires utilisés en fonds propres :**

- **Multiple (MOIC ou *money multiple*)** = total des flux reçus / total
  investi. Exemple : 2,0x, soit « on double sa mise ».
- **Délai de récupération (*payback*)** : le temps nécessaire pour
  récupérer la mise.
- **Le TRI et le multiple se lisent toujours ensemble.** Un TRI de 30 %
  sur 6 mois ne rapporte presque rien en valeur absolue.

### 3.6 Nominal ou réel, avant ou après impôt : la cohérence

C'est une règle d'or :

- Des **flux nominaux** (avec inflation) s'actualisent à un **taux
  nominal**.
- Des **flux réels** (en euros constants) s'actualisent à un **taux réel**.
- Relation de Fisher : `(1 + nominal) = (1 + réel) × (1 + inflation)`.
- Le raisonnement est le même pour l'impôt : des flux après impôt se
  comparent à un taux après impôt.

Mélanger les deux conventions est l'une des erreurs les plus fréquentes dans
les BP.

---

## 4. Le risque et le coût du capital

### 4.1 Rendement et risque

Un investisseur exige un rendement d'autant plus élevé que le risque est
grand. Voici une hiérarchie simplifiée des rendements exigés dans le monde
des projets, en ordres de grandeur :

| Instrument | Rendement exigé indicatif |
|---|---|
| OAT 10 ans (État français) | ~3 à 3,5 % |
| Dette senior de projet EnR avec contrat de complément de rémunération | Taux de swap + 1,3 à 2,2 %, soit ~4 à 5 % |
| Dette mezzanine ou holdco | 7 à 12 % |
| Fonds propres, actif EnR en exploitation sécurisé (*core infrastructure*) | 6 à 8 % |
| Fonds propres, projet EnR en construction | 8 à 11 % |
| Fonds propres, développement EnR (avant autorisations) | 12 à 20 % et plus |
| Capital-risque (start-up) | 25 à 40 % et plus |

### 4.2 Le coût des fonds propres : le MEDAF (CAPM)

```
Ke = Rf + β × (Rm – Rf) (+ primes spécifiques : taille, pays, risque projet)
```

- **Rf** : le taux sans risque (OAT 10 ans ou Bund).
- **β (bêta)** : la sensibilité au marché. Les *utilities* et
  infrastructures ont un bêta faible, de 0,5 à 0,8.
- **Rm – Rf** : la prime de risque du marché actions, de l'ordre de 5 à
  6 %.

En pratique, en infrastructure et en EnR, on raisonne plutôt en **TRI cible
de marché** (par exemple « les fonds acceptent 7 % pour du solaire
sécurisé ») qu'en MEDAF.

### 4.3 Le coût moyen pondéré du capital (CMPC ou WACC)

```
WACC = E/(D+E) × Ke + D/(D+E) × Kd × (1 – IS)
```

**Exemple :** 30 % de fonds propres à 10 % et 70 % de dette à 5 %, avec un
IS de 25 %.

```
WACC = 0,30 × 10 % + 0,70 × 5 % × 0,75 = 3,0 % + 2,625 % = 5,625 %
```

Le WACC sert à actualiser les **flux avant financement** (*unlevered free
cash flows*) pour obtenir la **valeur d'entreprise**.

> **Pourquoi la dette « crée de la valeur » en financement de projet :** la
> dette coûte moins cher que les fonds propres et ses intérêts sont
> déductibles. Plus on met de dette, plus le WACC baisse, jusqu'au point où
> le risque de défaut devient trop élevé. **Le financement de projet
> cherche la dette maximale que les flux peuvent supporter en toute
> sécurité.**

### 4.4 L'effet de levier

C'est la formule clé pour comprendre pourquoi les sponsors adorent la
dette :

```
Rentabilité des fonds propres = Rentabilité économique + (Rentabilité économique – Coût de la dette) × D/E
```

**Exemple :** un projet rapporte 6 %, la dette coûte 4,5 % et D/E = 4
(80/20). La rentabilité des fonds propres atteint alors environ
**6 % + 1,5 % × 4 = 12 %**, avant impôt.

L'effet de levier est une arme à double tranchant. Si la rentabilité du
projet tombe sous le coût de la dette, **le levier détruit les fonds
propres**.

---

## 5. Les trois TRI d'un projet (à connaître par cœur)

| Indicateur | Flux utilisés | Pour qui ? |
|---|---|---|
| **TRI projet** (*project IRR*, *unlevered*) | CAPEX (−), puis flux après IS **sans dette** | Juger la qualité intrinsèque de l'actif |
| **TRI actionnaire** (*equity IRR*, *levered*) | Apports en fonds propres (−), puis dividendes, remboursement des comptes courants et produit de cession (+) | Les sponsors et fonds d'investissement |
| **TRI prêteur** | Décaissement (−), puis intérêts, commissions et remboursements (+) | La banque (proche du taux all-in) |

Règle : si le TRI projet dépasse le coût de la dette, alors **le TRI
actionnaire dépasse le TRI projet**. C'est l'effet de levier.

---

## 6. Excel, l'outil indispensable

Maîtrise ces fonctions dès aujourd'hui (entre parenthèses, le nom en
français) :

| Fonction | Usage |
|---|---|
| `NPV` (`VAN`), `XNPV` (`VAN.PAIEMENTS`) | Valeur actuelle nette |
| `IRR` (`TRI`), `XIRR` (`TRI.PAIEMENTS`) | Taux de rendement interne |
| `PMT` (`VPM`), `IPMT` (`INTPER`), `PPMT` (`PRINCPER`) | Annuité, part d'intérêts, part de capital |
| `SUMPRODUCT` (`SOMMEPROD`) | Sommes pondérées, comme une VAN sur des dates |
| `INDEX` / `MATCH` (`EQUIV`), `XLOOKUP` (`RECHERCHEX`) | Recherches |
| `MIN`, `MAX`, `IF` (`SI`) | Plafonds, planchers, conditions (cash sweep) |
| `EOMONTH` (`FIN.MOIS`), `EDATE` (`MOIS.DECALER`) | Gestion des dates et des périodes |
| Valeur cible (*goal seek*) et tables de données | Dimensionnement et sensibilités |

**Les bonnes pratiques de modélisation (norme FAST) :**

- Une ligne correspond à une formule, recopiée sur toute la ligne.
- Les hypothèses sont dans un onglet séparé, en couleur (bleu pour les
  entrées, noir pour les calculs).
- Aucun chiffre n'est codé en dur dans une formule.
- Le flux se lit de gauche à droite et de haut en bas.
- Des contrôles sont visibles : équilibre du bilan, trésorerie ≥ 0, dette
  remboursée à l'échéance.

---

## 7. Exercices du jour 1

1. Un projet coûte 10 M€ et rapporte 1,2 M€ par an pendant 15 ans. Calcule
   sa VAN à 6 % et à 9 %, ainsi que son TRI.
2. Construis le tableau d'amortissement d'un prêt de 5 M€ sur 12 ans à
   4,2 % en annuités constantes, puis en amortissement constant. Compare le
   total des intérêts payés.
3. Calcule le WACC d'un projet financé à 80 % par de la dette à 4,5 % et à
   20 % par des fonds propres à 9 %, avec un IS de 25 %.
4. Explique en 5 lignes pourquoi un projet peut avoir un TRI supérieur à
   un autre tout en ayant une VAN inférieure.
5. Convertis un taux nominal de 7 % en taux réel avec une inflation de 2 %.

Les corrigés se trouvent dans l'[annexe C](annexe-c-exercices-corriges.md).

## ✅ Auto-évaluation : tu as réussi la journée si tu sais…

- [ ] Passer de l'EBITDA au CFADS sans hésiter.
- [ ] Expliquer pourquoi l'amortissement n'est pas du cash mais réduit
      l'impôt.
- [ ] Calculer une VAN et un TRI à la main et dans Excel.
- [ ] Expliquer les limites du TRI.
- [ ] Calculer un WACC et expliquer l'effet de levier.
- [ ] Distinguer le TRI projet du TRI actionnaire.
