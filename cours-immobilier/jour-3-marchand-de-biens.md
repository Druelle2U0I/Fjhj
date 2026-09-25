# JOUR 3 : Le métier de marchand de biens (achat-revente)

**Objectifs du jour**
- Comprendre le statut juridique et fiscal du marchand de biens (MdB).
- Maîtriser la **TVA immobilière** et les **droits de mutation réduits**.
- Connaître les grandes familles d'opérations et leurs marges.
- Savoir chiffrer une opération à rebours et décider en 30 minutes si elle vaut le coup.
- Connaître les responsabilités et les assurances du vendeur professionnel.

---

## 1. Qu'est-ce qu'un marchand de biens ?

Le marchand de biens **achète des immeubles (ou des droits immobiliers) pour les revendre avec une plus-value**, en ajoutant souvent de la valeur : travaux, division, changement de destination, obtention d'un permis, découpe en lots.

### 1.1 Statut juridique
- C'est un **commerçant** : « tout achat de biens immeubles aux fins de les revendre » est un acte de commerce (art. L110-1 2° du Code de commerce).
  > Exception : celui qui achète **pour construire** puis vendre (promotion) exerce une activité **civile**, d'où les SCCV.
- **Aucun diplôme ni carte professionnelle** n'est exigé (pas de carte T, sauf si tu fais aussi de l'intermédiation pour le compte de tiers).
- **Immatriculation au RCS** (code NAF 68.10Z, « activités des marchands de biens immobiliers »).
- **Assujetti à la TVA** pour ses opérations immobilières.

### 1.2 Le risque de requalification pour un particulier
Un particulier qui achète et revend **de façon habituelle** avec une **intention spéculative** peut être requalifié en marchand de biens par l'administration. Les indices retenus :
- fréquence des opérations (plusieurs par an, sur plusieurs années) ;
- **intention de revendre dès l'achat** (courte détention, pas de mise en location) ;
- travaux de valorisation, division en lots ;
- financement par crédit court ou relais ;
- activité exercée par ailleurs dans l'immobilier.

**Conséquences** : les profits sont imposés en **BIC** au barème (et non en plus-value des particuliers), avec **TVA**, **cotisations sociales**, **intérêts de retard** et **majorations**. Si tu comptes faire plus d'une opération d'achat-revente, **crée une structure**.

### 1.3 Quelle structure choisir ?

| Structure | Fiscalité | Avantages | Inconvénients |
|---|---|---|---|
| **SAS / SASU à l'IS** (recommandée) | IS 15 % / 25 % | Souplesse des statuts, président assimilé salarié, entrée d'associés facile, logeable sous une holding | Charges sociales élevées si tu te rémunères, formalisme |
| **SARL / EURL à l'IS** | IS | Cadre connu des banques, gérant majoritaire TNS (cotisations plus faibles) | Statuts plus rigides |
| **Entreprise individuelle** | IR, BIC au barème + cotisations sociales sur tout le bénéfice | Simple | Marges taxées jusqu'à 45 % + ≈ 40 % de cotisations. À éviter dès que les marges sont significatives |

**Schéma recommandé pour un dirigeant qui a déjà une holding** :
```
            Maxence
               │
       Holding (Arbange Capital ?) — SAS à l'IS
        ┌──────┼───────────────┐
   SAS MdB   SCI IS locatif   ENMA Formation (exploitation)
 (achat-revente) (patrimoine)
```
- La **SAS MdB** réalise les marges et paie l'IS à 15 % jusqu'à 42 500 € (vérifier la condition de détention à 75 % par des personnes physiques ou par des sociétés qui la respectent elles-mêmes).
- Elle **remonte ses dividendes à la holding** en **régime mère-fille** : 95 % exonérés, soit environ 1,25 % d'impôt effectif.
- La holding **réinvestit** dans la SCI IS patrimoniale (apport en compte courant) ou dans de nouvelles opérations.
- Cloisonnement des risques : un sinistre sur une opération ne contamine pas le patrimoine locatif.

> Il est souvent pertinent de créer **une société par opération importante** (ou avec des associés différents) pour isoler les risques et faciliter l'entrée de co-investisseurs.

---

## 2. Les deux piliers fiscaux du marchand de biens

### 2.1 Les droits de mutation réduits : l'engagement de revendre (art. 1115 CGI)

Lorsqu'un MdB assujetti à la TVA achète un bien **non soumis à la TVA** (typiquement un bien ancien acheté à un particulier), il peut prendre, **dans l'acte d'acquisition**, l'**engagement de revendre dans un délai de 5 ans**.

- Il paie alors les droits réduits à **0,715 %** au lieu d'environ 5,8 à 6,3 %.
- Ses frais d'acquisition tombent à environ **2 à 2,5 %** tout compris, au lieu de 7,5 à 8,5 %.
- Sur un achat de 200 000 € : ≈ 4 500 € au lieu de ≈ 16 000 €, soit **11 500 € de marge en plus**.
- **Si la revente n'intervient pas dans les 5 ans** (ou si le bien est conservé), l'acquéreur doit payer les **droits de droit commun** et l'**intérêt de retard** (0,20 % par mois).
- Les reventes par lots comptent : chaque lot vendu dans le délai est régularisé.
- **Engagement de construire** (art. 1594-0 G A) : si tu achètes un terrain ou un bâtiment pour **construire ou rendre à l'état neuf** dans les 4 ans (prorogeable), tu paies un **droit fixe de 125 €**. C'est utile pour les opérations de promotion ou de rénovation lourde.

### 2.2 La TVA immobilière : le point technique le plus important

#### Principe
Un MdB est assujetti à la TVA. Le traitement de chaque revente dépend de la **nature du bien vendu** :

| Bien revendu | Régime de TVA à la revente |
|---|---|
| **Immeuble bâti achevé depuis plus de 5 ans** (« ancien ») | **Exonéré de TVA** de plein droit (art. 261-5-2° CGI), **sauf option** pour la TVA (art. 260-5° bis). Avec option et bien acquis sans droit à déduction : **TVA sur la marge** (art. 268) |
| **Immeuble neuf** (achevé depuis moins de 5 ans), **ou ancien rendu à l'état neuf** par les travaux | **TVA obligatoire sur le prix total** (art. 257 I 2 2°) |
| **Terrain à bâtir** | **TVA obligatoire**, calculée **sur la marge** si l'acquisition n'a pas ouvert droit à déduction (achat à un particulier), sinon sur le prix total |
| Terrain non constructible | Exonéré |

#### Les travaux qui « rendent à l'état neuf »
Un immeuble ancien est considéré comme **neuf** si les travaux (sur 2 ans) :
- rendent à l'état neuf la **majorité des fondations**, ou
- la **majorité des éléments hors fondations déterminant la résistance et la rigidité** de l'ouvrage (structure, planchers, charpente), ou
- la **majorité de la consistance des façades** (hors ravalement), ou
- **l'ensemble des éléments de second œuvre** (planchers non porteurs, huisseries extérieures, cloisons intérieures, installations sanitaires et de plomberie, installations électriques, et, en métropole, chauffage) **dans une proportion au moins égale à 2/3** pour chacun d'eux ;
- ou s'il s'agit d'une **surélévation** ou d'une **addition de construction**.

Dans ce cas, la revente se fait **TVA sur le prix total**. La TVA sur tous les travaux est récupérable, mais le coût pour un acheteur particulier augmente fortement. Tu dois le savoir **avant d'acheter** pour fixer le prix.

#### Calcul de la TVA sur marge
> Marge TTC = Prix de vente − Prix d'acquisition
> TVA due = Marge TTC × 20 / 120

La TVA sur les **travaux** et les **honoraires** reste **déductible**.

⚠️ **Condition d'identité** : la jurisprudence (Conseil d'État et CJUE, affaire *Icade Promotion*, 2021) exige en principe que le bien revendu ait **la même qualification** que le bien acquis pour appliquer la TVA sur marge. Exemple : un terrain **bâti** acheté puis revendu comme **terrain à bâtir** après démolition. Sur ces cas limites, demande un **rescrit fiscal** ou l'avis d'un fiscaliste.

#### Option ou pas pour la TVA sur un bien ancien ? Exemple chiffré

Appartement ancien acheté 200 000 € à un particulier, 60 000 € HT de travaux (rafraîchissement, sans remise à l'état neuf), revente 360 000 € à un particulier.

| | **Sans option (exonéré)** | **Avec option (TVA sur marge)** |
|---|---|---|
| TVA collectée | 0 € | (360 000 − 200 000) × 20/120 = **26 667 €** |
| TVA sur travaux et honoraires | Non récupérable : coût de 72 000 + 3 600 € TTC | Récupérable : coût de 60 000 + 3 000 € HT |
| Agence à la revente | 14 400 € TTC | 12 000 € HT |
| **Marge avant IS** | **50 664 €** | **39 453 €** |

**Conclusion** : sur une rénovation légère revendue à des particuliers, **ne pas opter** est souvent plus rentable. L'option devient intéressante quand la **TVA récupérable sur les travaux dépasse la TVA sur la marge** (gros travaux, faible marge) ou quand l'acheteur est un assujetti qui récupère la TVA (investisseur professionnel, bailleur social).

> **TVA facturée par les artisans** : les travaux sur des logements achevés depuis plus de 2 ans peuvent bénéficier du taux de **10 %** (5,5 % pour la rénovation énergétique), sauf s'ils rendent l'immeuble neuf ou augmentent la surface de plancher de plus de 10 %. Le client remet une attestation à l'artisan. ⚠️ *À vérifier avec ton expert-comptable pour ton opération.* L'exemple ci-dessus retient 20 % par prudence : à 10 %, le scénario sans option est encore plus favorable.

---

## 3. Les grandes familles d'opérations

| Opération | Création de valeur | Marge nette cible (avant IS) | Durée | Points de vigilance |
|---|---|---|---|---|
| **Rénovation-revente** (appartement, maison) | Achat décoté d'un bien à rénover, revente au prix du « refait à neuf » | 10-20 % du prix de vente | 6-12 mois | Budget travaux, délai de revente, qualité des finitions |
| **Division d'un logement** (un T4 en deux T2, une maison en 3 lots) | Le prix au m² des petites surfaces est plus élevé | 15-25 % | 9-15 mois | **Permis de diviser** éventuel, surface minimale (**pas de lot < 14 m² et 33 m³**, art. L111-6-1 CCH), stationnement imposé par le PLU, compteurs, accord de copropriété |
| **Découpe d'immeuble** (achat en bloc, revente par lots) | Prime de détail : l'immeuble entier s'achète 20 à 40 % moins cher que la somme des lots | 15-30 % | 12-24 mois | EDD + règlement de copropriété (géomètre + notaire), **locataires en place** : droits de préemption spécifiques, accords collectifs |
| **Division parcellaire** (détachement de terrain à bâtir) | Créer un terrain constructible dans un grand jardin | 20-40 % | 6-18 mois | PLU (emprise, reculs, hauteur), **DP de division** ou permis d'aménager, bornage, viabilisation, TVA sur marge |
| **Changement de destination** (bureau, commerce, grange en logement) | Le logement vaut plus au m² | 15-30 % | 12-24 mois | Autorisation d'urbanisme, **changement d'usage** dans les grandes villes (Paris, communes de plus de 200 000 habitants et zones tendues sur délibération), normes (accessibilité, incendie) |
| **Valorisation administrative** (obtenir un permis puis revendre) | Un terrain avec permis purgé vaut plus | Variable | 6-18 mois | Recours des tiers, bonne relation avec la mairie |
| **Enchères, successions, liquidations** | Décote d'achat | Variable | Variable | Visite limitée, occupation, consignation |

### 3.1 Vente pendant les travaux : attention au régime VIR
Si tu vends un bien **avant la fin des travaux** à un particulier, en t'engageant à les réaliser, tu entres dans le régime de la **vente d'immeuble à rénover** (VIR, art. L262-1 et suivants CCH). Il est **d'ordre public** : contrat notarié, paiement échelonné, **garantie financière d'achèvement des travaux**. Sinon, **vends une fois les travaux réceptionnés**.

---

## 4. Chiffrer une opération : le bilan MdB

### 4.1 La structure du bilan
```
  PRIX DE VENTE (TTC ou HT selon régime TVA)
− TVA sur marge (le cas échéant)
= CHIFFRE D'AFFAIRES HT
− Prix d'acquisition
− Frais d'acquisition (≈ 2,25 % avec engagement de revendre)
− Travaux (+ 10 à 15 % d'aléas)
− Honoraires techniques (architecte, BET, géomètre, diagnostics, SPS)
− Assurances (dommages-ouvrage, RC promoteur le cas échéant)
− Frais financiers (intérêts, frais de dossier, garantie)
− Frais de portage (taxe foncière, charges de copropriété, énergie, assurance)
− Frais de commercialisation (agence, photos, home staging)
= MARGE NETTE AVANT IS
− IS
= RÉSULTAT NET
```

### 4.2 Exemple complet (régime sans option TVA)

Appartement de 70 m² à rénover acheté **200 000 €**, revendu **360 000 €** refait à neuf. 9 mois de portage. Financement bancaire de 80 % du prix et des travaux, à 5 % in fine.

| Poste | Montant |
|---|---|
| Prix d'achat | 200 000 € |
| Frais d'acquisition (engagement de revendre) | 4 500 € |
| Travaux TTC (60 000 € HT, TVA non récupérable) | 72 000 € |
| Honoraires (architecte, diagnostics) TTC | 3 600 € |
| Intérêts : 217 600 € × 5 % × 9/12 | 8 160 € |
| Frais de dossier bancaire (1 %) | 2 176 € |
| Garantie (hypothèque ou caution) | 2 500 € |
| Portage (TF, charges, assurance, énergie) | 2 000 € |
| **Prix de revient** | **294 936 €** |
| Agence à la revente (4 % TTC) | 14 400 € |
| **Prix de vente** | **360 000 €** |
| **Marge nette avant IS** | **50 664 €** (14,1 % du prix de vente) |
| IS : 15 % × 42 500 + 25 % × 8 164 | 8 416 € |
| **Résultat net** | **42 248 €** |
| Fonds propres mobilisés (prix de revient − prêt) | 77 336 € |
| **Rentabilité des fonds propres** | **≈ 55 % en moins d'un an** |

**Lecture** : la marge de 14,1 % est sous le seuil de confort de 15 %. Un aléa de +15 % de travaux ou une revente à 340 000 € la ramène vers 7 à 9 %. **Il faut renégocier l'achat.**

### 4.3 Le compte à rebours : quel prix d'achat maximum ?
On fixe la marge cible (ici 15 % du prix de vente, soit 54 000 €) et on remonte :

> Prix max ≈ (Prix de vente − Agence − Marge cible − Travaux − Honoraires − Portage − Garantie − Frais financiers) / (1 + frais d'acquisition)

Le calcul exact (les frais financiers dépendent du prix) donne un **prix d'achat maximum d'environ 196 000 €**. **L'offre** sera donc faite **à 180 000-185 000 €**, avec une marge de négociation. À 185 000 €, la marge atteint environ 18,5 %, et à 180 000 € environ 20 %.

### 4.4 Ratios de décision rapide
- **Marge nette ≥ 15 % du prix de vente** (≥ 20 % pour une division ou une opération complexe).
- **Marge brute** (prix de vente − prix d'achat − travaux) **≥ 25-30 %**.
- **Rentabilité des fonds propres ≥ 30 %** par opération.
- **Durée ≤ 12-18 mois.**
- **Point mort** : de combien le prix de revente peut-il baisser avant de perdre de l'argent ? Il faut une **résistance à −10 % minimum**.

---

## 5. Responsabilités, garanties et assurances

En tant que **vendeur professionnel**, tu es beaucoup plus exposé qu'un particulier.

1. **Garantie des vices cachés** : un professionnel est **présumé connaître les vices**, la clause d'exclusion de garantie est **inopposable** à un acheteur non professionnel.
2. **Garantie décennale** : celui qui vend, après achèvement, un ouvrage qu'il a construit **ou fait construire** est **réputé constructeur** (art. 1792-1 2° C. civ.). Si tes travaux touchent le gros œuvre, l'étanchéité, ou rendent l'ouvrage impropre à sa destination en cas de désordre, **ta responsabilité décennale** est engagée pendant 10 ans.
3. **Assurance dommages-ouvrage (DO)** : obligatoire pour le maître d'ouvrage qui fait réaliser des travaux de construction (art. L242-1 C. assurances), y compris pour des travaux de rénovation lourde assimilables à de la construction. Elle préfinance les réparations sans attendre la recherche de responsabilités. **Ne pas la souscrire** expose à des poursuites et fait fuir les acheteurs avertis. Budget : 2 à 5 % du coût des travaux.
4. **Artisans** : exige leurs **attestations décennale et RC Pro valides à la date d'ouverture du chantier**, avec les activités couvertes correspondant aux travaux.
5. **Diagnostics à jour** à la revente (DPE après travaux, électricité, gaz, Carrez) et **dossier des ouvrages exécutés** (factures, PV de réception, attestations).
6. **Obligation d'information** et de conseil renforcée.
7. **Locataires en place** : le congé pour vendre doit respecter la loi de 1989 (6 mois avant l'échéance). En cas de **première vente après division** d'un immeuble en lots, le locataire bénéficie d'un **droit de préemption** (art. 10 de la loi du 31 décembre 1975).

---

## 6. Déroulé type d'une opération (process à industrialiser)

1. **Sourcing** : agents, notaires, successions, enchères, prospection directe.
2. **Pré-étude en 30 minutes** : DVF, comparables des biens refaits, estimation des travaux au ratio €/m², compte à rebours.
3. **Visite technique** avec un artisan ou un maître d'œuvre ; photos, mesures, points durs.
4. **Étude urbanisme** si division ou changement de destination : PLU, rendez-vous au service urbanisme, CU.
5. **Offre** au prix calculé.
6. **Promesse** avec conditions suspensives (prêt, autorisation d'urbanisme purgée, accord de copropriété), **faculté de substitution**, **engagement de revendre** prévu dans l'acte.
7. **Montage du financement** (jour 4) : dossier banque avec bilan d'opération, devis, comparables.
8. **Acte authentique**, souscription de la DO, déclaration d'ouverture de chantier.
9. **Travaux** : planning, réunions de chantier hebdomadaires, suivi financier, réception avec réserves.
10. **Commercialisation** dès les 2/3 des travaux : photos pro, home staging, mandats à 2 ou 3 agences ou en exclusivité courte avec baisse d'honoraires.
11. **Revente**, puis **bilan post-opération** : écarts réel / prévisionnel, retours d'expérience.

## 7. Comptabilité et obligations
- Les biens sont comptabilisés en **stock** (et non en immobilisations) : **pas d'amortissement**.
- Frais d'acquisition et frais financiers de la période de travaux : incorporables au coût du stock ou passés en charges, selon les options comptables (à voir avec l'expert-comptable).
- **Déclarations de TVA** (CA3 mensuelles ou trimestrielles), **acomptes d'IS**, **CFE**, liasse fiscale.
- Garde un **dossier par opération** : acte, bilan prévisionnel, factures, attestations d'assurance, PV de réception.

---

## Checklist du jour 3
- [ ] Je sais expliquer pourquoi un particulier qui enchaîne les achats-reventes risque une requalification.
- [ ] Je connais les droits réduits de l'art. 1115 et leurs conditions.
- [ ] Je sais déterminer le régime TVA d'une revente : ancien exonéré, option marge, neuf, terrain à bâtir.
- [ ] Je sais reconnaître des travaux qui « rendent à l'état neuf ».
- [ ] Je sais construire un bilan MdB et calculer un prix d'achat maximum.
- [ ] J'ai défini ma structure (SAS MdB, idéalement sous holding) et mes critères d'opération.

## Quiz du jour 3
1. Pourquoi l'achat pour construire et vendre n'est-il pas un acte de commerce ?
2. Quels droits paie un MdB qui achète un bien ancien à un particulier avec engagement de revendre, et sous quel délai doit-il revendre ?
3. Un MdB revend un appartement ancien après de simples travaux de peinture et de cuisine. Quel est le régime de TVA par défaut ?
4. Calcule la TVA sur marge d'un terrain acheté 100 000 € à un particulier et revendu 160 000 € comme terrain à bâtir.
5. Cite deux des critères qui font qu'un immeuble rénové est considéré comme neuf.
6. Un MdB peut-il insérer une clause d'exclusion de la garantie des vices cachés dans la vente à un particulier ?
7. Pourquoi faut-il éviter de vendre à un particulier avant la fin des travaux ?
8. Quel est le prix d'achat maximum d'un bien si la revente est à 300 000 €, l'agence à 12 000 €, les travaux à 50 000 € TTC, tous les autres frais à 20 000 €, la marge cible à 15 % du prix de vente et les frais d'acquisition à 2,25 % ?
9. Quel est l'intérêt de placer la SAS MdB sous une holding ?
10. Quelle surface minimale doivent respecter les logements issus d'une division ?

### Corrigés
1. L'article L110-1 2° du Code de commerce exclut expressément l'achat en vue d'« édifier un ou plusieurs bâtiments et de les vendre en bloc ou par locaux » : c'est une activité civile (promotion, souvent en SCCV).
2. **0,715 %** (plus émoluments et débours, soit ≈ 2,25 % au total), avec une obligation de revendre **dans les 5 ans**.
3. **Exonération de TVA** (bien achevé depuis plus de 5 ans, travaux non constitutifs d'une remise à l'état neuf), sauf option pour la TVA sur marge.
4. (160 000 − 100 000) × 20/120 = **10 000 €**.
5. Remise à neuf de la majorité des fondations, ou de la majorité des éléments de structure, ou de la majorité des façades (hors ravalement), ou d'au moins 2/3 de **chacun** des éléments de second œuvre listés, ou une surélévation / addition de construction.
6. **Non** : le vendeur professionnel est présumé connaître les vices. La clause est inopposable à l'acquéreur non professionnel.
7. On entre dans le régime d'ordre public de la **vente d'immeuble à rénover** (VIR), qui impose notamment une **garantie financière d'achèvement**.
8. Marge cible : 45 000 €. Montant disponible pour l'achat et ses frais : 300 000 − 12 000 − 45 000 − 50 000 − 20 000 = 173 000 €. Prix max = 173 000 / 1,0225 ≈ **169 200 €**.
9. Les dividendes remontent quasiment sans impôt (**régime mère-fille**, 95 % exonérés), ce qui permet de **réinvestir** dans d'autres opérations ou dans le patrimoine locatif. Cela **isole les risques** et facilite l'entrée d'associés par opération.
10. Aucun local issu d'une division ne peut faire **moins de 14 m² et de 33 m³** (art. L111-6-1 CCH). Il doit aussi respecter les critères de **décence** (9 m² et 2,20 m de hauteur, ou 20 m³). La commune peut instaurer un **permis de diviser**.
