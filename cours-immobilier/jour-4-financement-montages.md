# JOUR 4 : Financement et montages bancaires

**Objectifs du jour**
- Maîtriser les mathématiques du crédit : mensualité, coût, amortissement, TAEG.
- Calculer une capacité d'emprunt comme un banquier (particulier et entreprise).
- Connaître tous les types de prêts et de garanties.
- Structurer un financement d'opération : dette senior, fonds propres, quasi-fonds propres, crowdfunding, associés.
- Monter un dossier bancaire qui obtient un « oui ».

> 🛠 Ouvre `simulateur-operations.xlsx`, onglets **Capacité** et **Amortissement**, et refais les exemples au fur et à mesure.

---

## 1. Les mathématiques du crédit

### 1.1 La mensualité d'un prêt amortissable (échéances constantes)
> **M = C × i / (1 − (1 + i)^−n)**, avec C = capital, i = taux annuel / 12, n = nombre de mois

Exemple : 200 000 € à 3,5 % sur 20 ans → i = 0,002917, n = 240 → **M = 1 159,92 €** (hors assurance). Coût total des intérêts : 1 159,92 × 240 − 200 000 = **78 381 €**.

Dans un prêt amortissable, **les premières échéances sont surtout composées d'intérêts**. Sur un prêt de 370 000 € à 3,6 % sur 25 ans, la 1ʳᵉ année rembourse 13 168 € d'intérêts et seulement 9 299 € de capital.

### 1.2 Les autres profils
- **In fine** : on ne paie que les intérêts, le capital est remboursé en une fois à l'échéance. Exemple : 200 000 € à 4 % sur 10 ans → 667 €/mois d'intérêts, 80 000 € d'intérêts au total, capital remboursé à la fin (souvent par la vente du bien ou par une **assurance-vie nantie**). Il maximise les intérêts déductibles et le cash-flow, et c'est le **standard du marchand de biens** sur 12 à 24 mois.
- **Différé partiel** : on paie seulement les intérêts pendant X mois (travaux, mise en location). **Différé total** : on ne paie rien, les intérêts sont capitalisés.
- **Prêt à paliers / lissage** : on combine plusieurs prêts (PTZ, prêt employeur) avec une mensualité globale constante.
- **Taux fixe ou variable (capé)** : en France, le fixe est la norme pour les particuliers, alors que les professionnels utilisent souvent l'**Euribor 3 mois + marge**.

### 1.3 TAEG et taux d'usure
- Le **TAEG** intègre tous les coûts obligatoires : intérêts, assurance exigée, frais de dossier, garantie, frais de courtage. C'est le seul taux comparable d'une offre à l'autre.
- Le **taux d'usure** (fixé chaque trimestre par la Banque de France) est le TAEG maximum légal pour les prêts aux particuliers. Un profil qui paie une assurance chère peut être bloqué par l'usure.

### 1.4 L'effet de levier
> **Rentabilité des fonds propres ≈ R + (R − i) × D / FP**
> R = rentabilité économique nette du bien, i = coût de la dette, D = dette, FP = fonds propres

Exemple : un immeuble à 6 % de rendement net, financé à 80 % à 3,6 % → 6 + (6 − 3,6) × 4 = **15,6 %** sur les fonds propres.
**Le levier est positif tant que R > i.** Si les taux montent au-dessus du rendement, il devient négatif et détruit de la valeur. C'est ce qui s'est passé pour beaucoup d'investisseurs en 2023.

---

## 2. La capacité d'emprunt d'un particulier (ou d'une SCI familiale à l'IR)

### 2.1 Les règles du HCSF (Haut Conseil de stabilité financière)
Juridiquement contraignantes pour les banques depuis 2022 :
- **Taux d'effort maximum de 35 %**, **assurance comprise**.
- **Durée maximale de 25 ans**, portée à **27 ans** si le différé d'amortissement est lié à un achat dans le neuf (VEFA, construction) ou dans l'ancien avec **au moins 10 % de travaux**.
- **Marge de flexibilité de 20 %** de la production trimestrielle de chaque banque, réservée en priorité à la résidence principale et aux primo-accédants. **L'investissement locatif pur y accède plus difficilement.** Pour un investisseur, la règle des 35 % est donc presque absolue.

### 2.2 Le calcul pas à pas
> **Taux d'effort = Total des mensualités de crédit (assurance incluse) / Revenus nets mensuels**

- **Revenus retenus** : salaires nets avant impôt (sur 12 mois, primes régulières lissées), BNC/BIC sur la moyenne des 2 ou 3 derniers bilans, dividendes réguliers, **loyers pondérés à 70 %** (la banque retient 70 % des loyers existants ou futurs, justifiés par un bail ou une estimation d'agence).
- **Charges** : toutes les mensualités en cours, y compris le crédit de la RP, les pensions versées et les crédits à la consommation. Le loyer de la RP n'entre pas dans le taux d'effort HCSF, mais il est regardé dans le **reste à vivre**.

**Exemple** : Maxence gagne 4 000 €/mois net et n'a pas de crédit.
- Mensualité maximum : 35 % × 4 000 = **1 400 €** assurance comprise.
- À 3,5 % sur 25 ans, la capacité est d'environ **266 000 €** avec une assurance de 0,3 % incluse dans les 1 400 € (≈ 280 000 € si l'on raisonnait hors assurance, ≈ 241 000 € hors assurance sur 20 ans).
- S'il achète un immeuble qui rapporte 2 000 €/mois de loyers, les revenus retenus passent à 4 000 + 70 % × 2 000 = 5 400 €, et la mensualité max à 1 890 € : la **capacité augmente**.

### 2.3 Méthode classique ou méthode différentielle
Certaines banques (surtout pour les investisseurs aguerris) appliquent la **méthode différentielle** : on ne met pas les loyers en revenus, on compare **70 à 80 % du loyer à la mensualité du prêt locatif**. Si le loyer pondéré couvre la mensualité, le crédit locatif n'augmente **pas** le taux d'effort. C'est très favorable pour enchaîner les acquisitions. Il faut **cibler les banques** qui l'appliquent, un courtier spécialisé les connaît.

### 2.4 Au-delà du ratio : ce que regarde vraiment la banque
- **Reste à vivre** : revenus − charges de crédit − loyer, avec une référence interne d'environ 800 à 1 200 € par adulte et 300 à 400 € par enfant, qui varie selon la banque.
- **Stabilité** : CDI hors période d'essai, ancienneté, ou 2 à 3 bilans pour un indépendant ou un dirigeant.
- **Tenue de compte** : aucun découvert ni rejet sur les 3 derniers mois, épargne régulière.
- **Apport** : les frais de notaire et de garantie au minimum (≈ 10 %) sont souvent exigés. Le financement à 110 % existe pour les profils solides.
- **Épargne résiduelle** après l'opération (idéalement plus de 6 mois de mensualités) et **patrimoine global**.
- **Saut de charge** : la différence entre ton loyer actuel et ta future mensualité (pour une RP).
- **Qualité du projet** : rendement cohérent, emplacement, DPE, travaux chiffrés.

---

## 3. Le financement des professionnels (MdB, SCI IS, holding)

### 3.1 Logique d'analyse
Pour une société, la banque raisonne en **capacité de remboursement de l'opération** et en **fonds propres**, et non en taux d'effort :

| Indicateur | Définition | Seuil usuel |
|---|---|---|
| **LTV** (*loan to value*) | Dette / valeur du bien | ≤ 70-80 % en locatif professionnel |
| **LTC** (*loan to cost*) | Dette / coût total de l'opération | ≤ 70-90 % en MdB |
| **DSCR** (*debt service coverage ratio*) | Revenu net d'exploitation annuel / annuités de la dette | ≥ 1,2 à 1,3 |
| **Fonds propres** | Apport + comptes courants + quasi-fonds propres | 10-30 % du coût de l'opération MdB |
| **Taux de pré-commercialisation** | Ventes signées / total | 30-50 % pour un crédit promoteur |

### 3.2 Le prêt marchand de biens
- **Forme** : prêt **in fine** (ou crédit de trésorerie) sur **12 à 24 mois**, remboursé à la revente.
- **Montant** : 70 à 90 % du prix d'achat **et des travaux**. Les travaux sont débloqués au fur et à mesure, **sur factures** ou situations de travaux.
- **Coût** : taux variable (Euribor + marge) ou fixe, **frais de dossier d'environ 1 %**, parfois une commission d'engagement.
- **Garanties** : hypothèque ou **hypothèque légale spéciale du prêteur de deniers** (l'ancien PPD, moins chère), **caution personnelle du dirigeant**, nantissement des parts, parfois une **promesse d'affectation hypothécaire** (non publiée, donc gratuite, mais plus fragile pour la banque).
- **Remboursement** : au fil des ventes de lots (**quotité de remboursement** par lot, souvent 100 à 120 % de la part de dette affectée au lot).
- **Clé** : ta **première opération** est la plus dure à financer. Avec un historique de 2 ou 3 opérations réussies, les conditions s'améliorent nettement.

### 3.3 Le crédit promoteur
- Pour la construction (SCCV) : exige un **permis purgé**, 30 à 50 % de **pré-commercialisation** en VEFA et 10 à 20 % de fonds propres.
- La banque délivre la **GFA** (garantie financière d'achèvement), obligatoire en VEFA.
- **Appels de fonds VEFA** (plafonds légaux) : 35 % à l'achèvement des fondations, 70 % à la mise hors d'eau, 95 % à l'achèvement, le solde à la livraison.

### 3.4 Le financement locatif en SCI IS ou en société
- **Prêt amortissable** sur 15 à 25 ans, pas soumis au HCSF si la société n'est pas une SCI familiale transparente.
- La banque regarde le **DSCR** de l'immeuble et le **patrimoine des associés** (caution).
- **Holding** : elle peut apporter les fonds propres en **compte courant** et se porter **caution** de sa filiale.

---

## 4. Les garanties bancaires

| Garantie | Principe | Coût indicatif | Commentaire |
|---|---|---|---|
| **Hypothèque conventionnelle** | Inscription sur le bien | ≈ 1,5 à 2 % du prêt + frais de mainlevée | Utilisable pour tous types de prêts, rechargeable depuis la réforme des sûretés de 2021 |
| **Hypothèque légale spéciale du prêteur de deniers** (ex-PPD) | Garantit le prix d'acquisition dans l'ancien | Moins chère (pas de taxe de publicité foncière) | Ne couvre pas les travaux (on combine avec une hypothèque) |
| **Caution d'un organisme** (Crédit Logement, CAMCA, SACCEF…) | Un tiers garantit le prêt | ≈ 1 à 1,5 %, dont une partie restituée en fin de prêt | Réservée aux particuliers et SCI familiales. Pas de frais de mainlevée |
| **Caution personnelle et solidaire** | Le dirigeant ou les associés garantissent sur leurs biens | Gratuite | Systématique en MdB et en SCI : négocier un **plafond** et une **durée** |
| **Nantissement** | Assurance-vie, compte titres, parts sociales, fonds de commerce | Faible | Typique des prêts in fine et des holdings |
| **Promesse d'affectation hypothécaire** | Engagement de consentir une hypothèque sur demande | Gratuite | Moins protectrice pour la banque |
| **Garantie autonome à première demande** | Engagement autonome d'un tiers | Variable | Montages sophistiqués |

---

## 5. L'assurance emprunteur
- Elle couvre le **décès, la PTIA**, et souvent l'**incapacité et l'invalidité** (ITT, IPT, IPP). Pour un investissement locatif, une couverture décès/PTIA peut suffire selon la banque.
- **Quotité** : pour un couple, 100 % sur chaque tête est plus protecteur, 50/50 est moins cher.
- **Délégation d'assurance** (lois Lagarde et Hamon) : tu peux choisir un autre assureur si les garanties sont **équivalentes**. C'est souvent 30 à 60 % moins cher que le contrat groupe bancaire.
- **Loi Lemoine (2022)** : **résiliation à tout moment**. **Plus de questionnaire de santé** si la part assurée est ≤ 200 000 € par personne **et** que le prêt se termine avant les 60 ans de l'emprunteur. **Droit à l'oubli** à 5 ans pour certaines pathologies (cancer, hépatite C).

## 6. Les autres sources de financement

| Source | Usage | Coût | Points clés |
|---|---|---|---|
| **Crowdfunding immobilier** (plateformes agréées PSFP par l'AMF) | Compléter les fonds propres d'un MdB ou d'un promoteur | 9 à 12 %/an | Obligations sur 12 à 36 mois, souvent **subordonnées** à la dette bancaire, que la banque assimile à des **quasi-fonds propres** |
| **Club deal / associés** | Réunir des investisseurs par opération | Partage de la marge | Exemple : les investisseurs apportent 80 % des fonds propres, puis la marge est partagée 50/50 **après remboursement des apports** et d'un rendement prioritaire (ex. 8 %) |
| **Comptes courants d'associés** | Financer la société sans augmentation de capital | Intérêts déductibles dans la limite du taux légal fiscal | Remboursables, souples |
| **Crédit vendeur** | Le vendeur accepte un paiement différé d'une partie du prix | Négocié | Utile en succession ou avec un vendeur non pressé. Garantie : privilège du vendeur |
| **Crédit-bail immobilier** | Murs professionnels (par exemple pour les locaux d'ENMA Formation) | Loyer financier | Option d'achat en fin de contrat, montage fiscal spécifique |
| **Prêt hypothécaire sur un bien libre** | Dégager des liquidités sur un bien déjà payé pour financer une nouvelle opération | Taux du marché | Accélère la constitution du patrimoine |
| **Prêt lombard** | Avance sur un portefeuille financier ou une assurance-vie | Faible | Pour les profils patrimoniaux |
| **PTZ, Action Logement, prêts aidés** | Résidence principale | 0 % ou faible | Réservés à la RP, sous conditions de ressources |

---

## 7. Montages types (du plus simple au plus sophistiqué)

**Montage 1 : investisseur débutant en nom propre (LMNP)**
Prêt amortissable de 20 à 25 ans, apport = frais de notaire, **caution Crédit Logement**, assurance déléguée, régime LMNP au réel. Le levier est maximal, avec les contraintes HCSF.

**Montage 2 : SCI familiale à l'IR**
Deux associés (par exemple conjoints ou parent/enfant), prêt au nom de la SCI avec **caution des associés**, capital faible et apport en compte courant. Objectif : transmission.

**Montage 3 : holding + SCI IS patrimoniale**
```
Holding (IS) ──compte courant + caution──▶ SCI IS ──prêt 20 ans + hypothèque──▶ Immeuble
     ▲                                          │
     └──────── dividendes (mère-fille) / remboursement de compte courant ◀────┘
```
Les loyers remboursent la dette. Le cash-flow remonte en remboursement du compte courant (sans impôt), puis en dividendes quasiment exonérés. La holding réinvestit.

**Montage 4 : opération de marchand de biens avec tour de table**
```
Coût total : 300 000 €
├── Prêt bancaire MdB in fine : 225 000 € (75 %)
├── Crowdfunding (obligations à 10 %, 18 mois) : 30 000 € (10 %)   } fonds propres
└── Fonds propres holding / associés : 45 000 € (15 %)              } + quasi-fonds propres = 25 %
```
Il faut vérifier que la **marge couvre les 10 % du crowdfunding** et que le rendement des fonds propres reste supérieur à 30 %.

**Montage 5 : démembrement**
- **Achat de la nue-propriété** d'un logement (souvent 55 à 65 % de la valeur), l'usufruit étant cédé pour 15 à 20 ans à un bailleur social (**ULS**). Pas de gestion, pas de fiscalité sur les loyers, pas d'IFI, et la pleine propriété revient automatiquement à la fin. Les intérêts d'emprunt sont déductibles des autres revenus fonciers.
- **Donation de la nue-propriété de parts de SCI** aux enfants : transmission optimisée (voir jour 2).

**Montage 6 : l'entreprise achète ses murs**
La SCI du dirigeant (ou détenue par la holding) achète les locaux et les loue à la société d'exploitation (ENMA Formation) par un **bail commercial** à loyer de marché. Le loyer est déductible chez l'exploitant et rembourse le crédit de la SCI. À la vente de l'entreprise, les murs restent une rente.
> ⚠️ Le loyer doit être **au prix du marché** (sinon, risque d'abus de biens sociaux ou d'acte anormal de gestion), et le montage doit avoir une vraie substance économique.

---

## 8. Le dossier bancaire qui obtient un « oui »

### 8.1 Contenu
1. **Présentation de l'emprunteur** : parcours, patrimoine, expérience immobilière (même modeste), structure juridique (organigramme holding / filiales).
2. **Présentation du projet** : adresse, photos, plans, description, état.
3. **Étude de marché** : comparables DVF (vente) et loyers de marché (location), avec les sources.
4. **Travaux** : devis détaillés d'entreprises assurées, planning.
5. **Business plan** : bilan d'opération ou tableau de cash-flow sur 10 ans, **stress tests** (voir jour 6).
6. **Plan de financement** : sources et emplois, apport, garanties proposées.
7. **Pièces** : pièce d'identité, 3 derniers bulletins de salaire ou 2-3 derniers bilans, 2 derniers avis d'imposition, 3 derniers relevés de compte, tableaux d'amortissement des crédits en cours, compromis, Kbis et statuts de la société.

### 8.2 Tactique de négociation
- **Mets les banques en concurrence** : 3 ou 4 banques + 1 courtier.
- **Négocie tout** : taux, frais de dossier (souvent réduits de moitié, parfois offerts), **IRA** (limitées par la loi à 6 mois d'intérêts et 3 % du capital remboursé pour les particuliers, **négociables à 0**), **modularité** des échéances, **transférabilité**, **garantie** (caution plutôt qu'hypothèque), **délégation d'assurance**.
- **Contreparties que la banque apprécie** : domiciliation des revenus, épargne transférée, comptes pro de la société (ENMA Formation, Arbange Capital), prévoyance. Chaque contrepartie se négocie contre un avantage.
- **Relation** : un bon banquier d'affaires ou de gestion privée est un **partenaire de long terme**. Tiens-le informé, livre tes bilans à l'heure, rembourse avant l'échéance sur les opérations MdB.
- **Offre de prêt (particuliers)** : **délai de réflexion de 10 jours**, acceptation au plus tôt le 11ᵉ jour, validité de 30 jours minimum.

---

## Checklist du jour 4
- [ ] Je sais calculer une mensualité et un coût de crédit, et lire un tableau d'amortissement.
- [ ] Je sais calculer ma capacité d'emprunt selon le HCSF et avec des loyers à 70 %.
- [ ] Je connais les ratios LTV, LTC et DSCR et les seuils des banques.
- [ ] Je connais les garanties et je sais laquelle négocier.
- [ ] J'ai identifié 3 banques et 1 courtier à rencontrer, et j'ai préparé mon dossier emprunteur.
- [ ] J'ai choisi le montage cible pour ma première opération.

## Quiz du jour 4
1. Calcule la mensualité d'un prêt de 150 000 € à 3,6 % sur 20 ans.
2. Revenus nets : 5 000 €/mois. Crédit auto en cours : 300 €/mois. Quelle mensualité immobilière maximum selon le HCSF ?
3. Qu'apporte la méthode différentielle à un investisseur qui enchaîne les achats ?
4. Un immeuble génère 30 000 € de revenu net d'exploitation par an. Les annuités d'emprunt sont de 24 000 €. Quel est le DSCR, et est-il bancable ?
5. Pourquoi le prêt in fine est-il adapté au MdB ?
6. Quelle est la différence entre l'hypothèque conventionnelle et la caution Crédit Logement ?
7. Quelles sont les deux conditions de la loi Lemoine pour ne pas remplir de questionnaire de santé ?
8. Rendement net de 5 %, taux de crédit de 4 %, financement à 90 %. Quelle rentabilité des fonds propres selon la formule du levier ?
9. Pourquoi une banque considère-t-elle les obligations de crowdfunding comme des quasi-fonds propres ?
10. Combien de temps dure le délai de réflexion d'une offre de prêt immobilier aux particuliers ?

### Corrigés
1. i = 0,003, n = 240 → M = 150 000 × 0,003 / (1 − 1,003^−240) ≈ **877,67 €**.
2. 35 % × 5 000 = 1 750 €, moins 300 € de crédit en cours = **1 450 €** assurance comprise.
3. Si le loyer pondéré (70-80 %) couvre la mensualité du nouveau crédit, celui-ci **n'augmente pas le taux d'effort**, ce qui permet d'emprunter à nouveau.
4. DSCR = 30 000 / 24 000 = **1,25** : c'est au-dessus du seuil habituel de 1,2, donc bancable.
5. La revente intervient en 12 à 24 mois : on ne paie que les intérêts pendant le portage, et le capital est remboursé en une fois par le prix de vente. Le cash-flow pendant les travaux est préservé.
6. L'hypothèque est une **sûreté réelle** inscrite sur le bien (coût fixe, frais de mainlevée). La caution est un **engagement d'un organisme tiers** qui paie la banque en cas de défaut, puis se retourne contre l'emprunteur. Elle est souvent moins chère et partiellement remboursée en fin de prêt.
7. La part assurée doit être **≤ 200 000 € par personne** et le prêt doit **se terminer avant les 60 ans** de l'emprunteur.
8. D/FP = 90/10 = 9 → 5 + (5 − 4) × 9 = **14 %**. Attention : si le rendement tombe à 3,5 %, on obtient 3,5 + (−0,5) × 9 = −1 %.
9. Parce qu'elles sont **subordonnées** à la dette bancaire (remboursées après la banque) et qu'elles absorbent donc les pertes avant elle, comme des fonds propres.
10. **10 jours** : l'offre ne peut être acceptée que le 11ᵉ jour.
