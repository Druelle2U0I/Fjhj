# Jour 6 — Dérisquer un projet

> **Objectif du jour :** identifier tous les risques d'un projet, les
> mesurer, et surtout **les allouer à la partie la mieux placée pour les
> porter**. Dérisquer ne veut pas dire supprimer le risque : cela veut dire
> **le transférer, le réduire, le couvrir ou le rémunérer**.

---

## 1. La philosophie de l'allocation des risques

> **Principe fondamental :** chaque risque doit être porté par la partie
> qui est **la mieux placée pour le maîtriser** et/ou qui peut le porter
> **au coût le plus bas**.

- L'EPC maîtrise la construction, donc il porte le risque de coût et de
  délai.
- L'assureur mutualise les sinistres, donc il porte les risques de dommages.
- L'État ou l'acheteur porte le risque de prix, via le tarif ou le PPA.
- Le sponsor porte le risque de développement et le risque résiduel.
- **La SPV (et donc les prêteurs) ne doit garder que les risques qu'elle
  peut absorber** avec ses marges (DSCR, réserves).

Les quatre stratégies face à un risque :

| Stratégie | Exemples |
|---|---|
| **Éviter** | Ne pas construire en zone inondable, choisir une technologie éprouvée |
| **Réduire** | Études approfondies, fournisseurs de premier rang (*Tier 1*), redondance |
| **Transférer** | Contrats (EPC, O&M, PPA), assurances, couvertures, garanties |
| **Accepter et rémunérer** | DSCR plus élevé, réserves, fonds propres plus importants, prix plus élevé |

---

## 2. La matrice des risques d'un projet (le cœur du jour)

### 2.1 Les risques de développement

| Risque | Description | Atténuation |
|---|---|---|
| **Foncier** | Terrain non sécurisé, litiges | Promesse de bail emphytéotique notariée, droits réels, titres vérifiés |
| **Autorisations** | Refus du permis de construire, de l'autorisation environnementale (éolien : ICPE / autorisation environnementale unique), de la dérogation espèces protégées | Études environnementales solides, concertation locale, sponsor expérimenté |
| **Recours de tiers** | Contentieux devant le tribunal administratif ou la cour administrative d'appel. C'est fréquent en éolien | **Attendre la purge des recours** avant de financer (condition suspensive bancaire), ou garantie du sponsor |
| **Raccordement** | Coût, délai, capacité du réseau (S3REnR, PTF Enedis / RTE) | Proposition technique et financière (PTF) acceptée, convention de raccordement, file d'attente |
| **Tarif / contrat** | Échec à l'appel d'offres CRE, PPA non signé | Portefeuille de projets, calendrier des AO |
| **Acceptabilité** | Opposition locale | Financement participatif, retombées locales, dialogue |

Ces risques sont **binaires**. Ils sont portés par les **fonds propres du
développeur**, jamais par la dette de projet.

### 2.2 Les risques de construction

| Risque | Atténuation |
|---|---|
| **Dépassement de coûts** (*cost overrun*) | **Contrat EPC clé en main à prix fixe** (*lump-sum turnkey*), aléas dans le budget (5 à 10 %), ligne de dépassement de coûts (*standby facility*), garantie du sponsor |
| **Retard** | **Pénalités de retard** (*Liquidated Damages*, LDs) de l'EPC, dimensionnées pour couvrir le service de la dette et les pertes de revenus ; date butoir (*long-stop date*) ; assurance perte d'exploitation anticipée (ALOP / DSU) |
| **Performance à la mise en service** | Tests de performance (PR, puissance), **pénalités de performance** si la performance est inférieure à la garantie |
| **Défaillance de l'EPC** | EPC solide financièrement, **garantie de bonne fin** (*performance bond*, 10 % du contrat), garantie maison mère, retenue de garantie (5 %) |
| **Interfaces** (plusieurs lots) | Contrat EPC unique ou *wrap*, sinon accord d'interfaces et conseil technique renforcé |
| **Raccordement réseau** | Suivi Enedis / RTE, clauses de force majeure, garantie du sponsor si le retard est imputable au réseau |
| **Chaîne d'approvisionnement** | Fournisseurs de modules Tier 1 (liste BNEF), conformité au règlement européen sur le travail forcé, stock, clauses d'ajustement de prix |

**L'EPC ou le multi-contrats :**

- **L'EPC clé en main** : un seul contractant responsable de tout. C'est
  plus cher (de 5 à 15 %), mais cela sécurise la banque.
- **Le multi-contrats** (*multi-contracting*) : modules, onduleurs, génie
  civil et électricité achetés séparément par le sponsor. C'est moins cher,
  mais **le risque d'interface reste dans la SPV**, et la banque demandera
  plus de fonds propres, plus d'aléas ou une garantie du sponsor.

### 2.3 Les risques d'exploitation

| Risque | Atténuation |
|---|---|
| **Ressource** (soleil, vent, eau) | Étude de productible indépendante, dimensionnement sur le P50 et le P90, DSCR suffisant, DSRA |
| **Performance technique / disponibilité** | Contrat **O&M avec garantie de disponibilité** (par exemple 98 à 99 %), pénalités, garanties constructeur (modules : 12 ans produit et 25 à 30 ans performance) |
| **Dégradation** | Hypothèse prudente (solaire 0,3 à 0,5 % par an) validée par le LTA |
| **OPEX** | Contrats long terme indexés, provision pour aléas |
| **Gros entretien / remplacements** | Réserve de maintenance (MRA) |
| **Défaillance de l'O&M** | Clause de remplacement, accord direct, marché liquide de prestataires |
| **Sinistres** | Assurance dommages et perte d'exploitation |
| **Cyber** | Sécurisation SCADA, assurance cyber |

### 2.4 Les risques de marché et de revenus

| Risque | Atténuation |
|---|---|
| **Prix de l'électricité** | Contrat long : **complément de rémunération CRE** (CfD), tarif d'achat, **PPA à prix fixe** ; *floor* ; cash sweep sur la part merchant ; DSCR merchant plus élevé |
| **Volume / profil** | PPA « *pay-as-produced* » (l'acheteur prend ce qui est produit) plutôt que « *baseload* » (profil fixe, risque de rachat au prix du marché) |
| **Cannibalisation et prix négatifs** | Prudence sur le taux de capture, stockage, clauses du CfD sur les heures à prix négatifs, orientation Est-Ouest |
| **Écrêtement** (*curtailment*) | Clauses de compensation réseau, analyse du réseau local |
| **Contrepartie** (l'acheteur fait défaut) | Acheteur *investment grade*, garantie maison mère, lettre de crédit, assurance-crédit, diversification ; l'État via EDF OA est considéré comme le meilleur risque |
| **Réglementaire / changement de loi** | Clauses de stabilité, *change-in-law* dans les contrats ; souvenir du **moratoire sur les tarifs solaires de 2010-2011** et de la **révision des contrats photovoltaïques d'avant 2011** par la loi de finances 2021 ; attention aux **contributions sur les rentes inframarginales** (2022-2023) |

### 2.5 Les risques financiers

| Risque | Atténuation |
|---|---|
| **Taux d'intérêt** | **Swap** sur 75 à 100 % de la dette, sur toute sa durée |
| **Inflation** | Indexation cohérente revenus / coûts, dette partiellement indexée |
| **Change** (modules en USD) | Couverture de change à terme pendant la construction, contrat EPC en euros |
| **Refinancement** | Éviter les structures *mini-perm* si le marché est incertain, ou prévoir un cash sweep de protection |
| **Liquidité** | DSRA, ligne de fonds de roulement |
| **Fiscalité** | Rescrit, avis fiscal, clause de *gross-up* |

### 2.6 Les autres risques

- **Force majeure** : catastrophe naturelle, guerre, pandémie. Couverte par
  les assurances et les clauses contractuelles.
- **Environnement et climat** : risques physiques (grêle, tempête,
  inondation, canicule) et de transition. De plus en plus exigés dans les
  due diligences.
- **Social et ESG** : droits humains dans la chaîne d'approvisionnement
  (le polysilicium), biodiversité, principes de l'Équateur (*Equator
  Principles*) pour les banques signataires.
- **Politique / pays** : pour l'international, assurance MIGA et agences
  de crédit export.
- **Juridique et documentaire** : contrats mal rédigés, incohérences entre
  les contrats (*back-to-back*).

---

## 3. Les contrats, premiers outils de dérisquage

### 3.1 La carte contractuelle d'une SPV EnR

```
                        ┌───────────────┐
                        │   SPONSORS     │
                        │ (pacte, CCA)   │
                        └──────┬────────┘
                               │ fonds propres
 ┌──────────┐   dette    ┌─────▼──────┐   PPA / CR EDF OA   ┌──────────────┐
 │ PRÊTEURS ├───────────►│    SPV      │◄───────────────────►│ ACHETEUR /    │
 │ (MLA,    │◄───────────┤  (société   │  revenus            │ ÉTAT          │
 │  agent)  │ sûretés    │  de projet) │                     └──────────────┘
 └──────────┘            └─┬───┬───┬──┘
          contrat EPC ┌────┘   │   └────┐ contrat O&M
                      ▼        │        ▼
                ┌──────────┐   │   ┌──────────┐
                │   EPC     │   │   │   O&M    │
                └──────────┘   │   └──────────┘
                    bail / foncier  assurances  raccordement (Enedis/RTE)
```

### 3.2 Le contrat EPC : les clauses clés

- **Prix fixe et forfaitaire** (*lump sum*), avec des variations limitées
  à des cas précis.
- **Date de réception garantie** et **pénalités de retard** plafonnées,
  souvent à 10 à 20 % du prix du contrat.
- **Garanties de performance** (puissance, performance ratio) et pénalités
  associées.
- **Plafond de responsabilité** (*liability cap*), souvent à 100 % du
  contrat.
- **Garanties** : garantie de bonne fin, garantie de restitution
  d'acompte, retenue de garantie, garantie maison mère.
- **Période de garantie** (*defects liability period*) : 2 ans.
- **Réception** : réception provisoire, puis réception définitive.
- **Accord direct** avec les prêteurs.

### 3.3 Le contrat O&M

- Périmètre : maintenance préventive et corrective, supervision, pièces de
  rechange, entretien du site.
- **Garantie de disponibilité** avec pénalités (et parfois des bonus).
- Durée de 5 à 10 ans, renouvelable, avec un prix indexé.
- Remplacement possible du prestataire en cas de sous-performance.

### 3.4 Le contrat de vente d'électricité

Il s'agit du contrat CRE / EDF OA ou d'un PPA :

- durée, prix, indexation ;
- profil (*pay-as-produced*, *baseload*) ;
- garanties d'origine ;
- clauses de résiliation, d'indemnités, de changement de loi ;
- sûretés de l'acheteur ;
- traitement des prix négatifs et de l'écrêtement.

### 3.5 Le principe du *back-to-back*

Les obligations de la SPV envers un tiers doivent être **reflétées** dans
ses contrats avec ses prestataires. Exemple : si le PPA exige une mise en
service au 1ᵉʳ juin avec des pénalités, l'EPC doit s'engager au plus tard
au 1ᵉʳ mai, avec des pénalités au moins équivalentes. **Tout écart entre
contrats est un risque qui reste dans la SPV.**

---

## 4. Le risque de ressource : P50, P90 et incertitudes

### 4.1 Les définitions

- **P50** : la production dépassée avec 50 % de probabilité. C'est
  l'estimation centrale.
- **P90** : la production dépassée avec **90 % de probabilité**. C'est le
  scénario prudent.
- **P99** : la production dépassée avec 99 % de probabilité. C'est un
  stress sévère.

### 4.2 Le calcul (hypothèse de distribution normale)

```
P90 = P50 × (1 – 1,282 × σ)      P99 = P50 × (1 – 2,326 × σ)
```

- **σ** représente l'incertitude totale, en % du P50. Elle combine
  l'incertitude sur la ressource, sur les mesures, sur le modèle et la
  **variabilité interannuelle**.
- **P90 à 1 an ou à 10 ans** : la variabilité interannuelle se réduit sur
  une moyenne de 10 ans (en √10). Le **P90 à 10 ans est donc supérieur au
  P90 à 1 an**.

**Ordres de grandeur :**

| Technologie | σ total (1 an) | P90 1 an / P50 |
|---|---|---|
| Solaire | 5 à 7 % | ~91 à 94 % |
| Éolien terrestre | 10 à 15 % | ~81 à 87 % |
| Éolien en mer | 8 à 12 % | ~85 à 90 % |
| Hydro au fil de l'eau | 10 à 20 % | variable |

**Exemple :** pour un solaire avec σ = 6,5 %, P90 = P50 × (1 − 1,282 ×
0,065) ≈ **P50 × 0,917**.

### 4.3 Comment les banques l'utilisent

La dette est dimensionnée pour respecter **à la fois** :

- un DSCR de 1,20 à 1,30x sur le P50 ;
- **et** un DSCR de 1,00 à 1,10x sur le P90 1 an (ou P99 pour certains).

C'est la contrainte la plus sévère qui l'emporte. **En éolien, c'est souvent
le P90 qui est contraignant**, car l'incertitude est plus forte qu'en
solaire.

---

## 5. Les assurances

### 5.1 Pendant la construction

- **TRC / CAR** (*Tous Risques Chantier / Construction All Risks*) :
  dommages matériels au chantier.
- **ALOP / DSU** (*Advance Loss of Profit / Delay in Start-Up*) : la perte
  de revenus en cas de retard causé par un sinistre. **Exigée par les
  prêteurs.**
- **Responsabilité civile** du maître d'ouvrage.
- **Transport** (*marine cargo*) : les équipements en transit.
- **Dommages-ouvrage**, selon les cas.

### 5.2 Pendant l'exploitation

- **Dommages matériels / bris de machine** (*property damage / machinery
  breakdown*).
- **Perte d'exploitation** (*business interruption*), avec une durée
  d'indemnisation de 12 à 24 mois.
- **Responsabilité civile** exploitation, y compris atteinte à
  l'environnement.

### 5.3 Les assurances financières

- **Garantie de productible / assurance météo** (*weather derivatives*,
  *proxy revenue swaps*) : c'est une niche.
- **Assurance-crédit** sur l'acheteur.
- **Garanties de performance des modules** couvertes par un assureur, en
  cas de faillite du fabricant.
- **Assurance de garanties de passif** (*W&I*) dans les opérations de
  M&A.

### 5.4 Les exigences des prêteurs

Les prêteurs doivent être **assurés additionnels** et **bénéficiaires de
la perte** (*loss payee*). Ils imposent aussi :

- une clause de **non-annulation sans préavis** ;
- une **délégation des indemnités** ;
- des assureurs notés au moins A- ;
- un revue par leur conseil en assurances.

---

## 6. Les due diligences (DD)

| DD | Qui ? | Ce qu'elle vérifie |
|---|---|---|
| **Technique** | LTA / IE (*Lender's Technical Advisor*), par exemple DNV, Tractebel, Everoze, Sgurr, UL, Axenne, Kiwa… | Productible, technologie, design, contrats EPC / O&M, budget, planning, raccordement, hypothèses d'OPEX, dégradation |
| **Juridique** | Avocats des prêteurs | Titres de propriété et foncier, autorisations et purge des recours, contrats, sociétés, sûretés |
| **Financière / modèle** | Auditeur du modèle (Big 4, Mazars / Forvis Mazars, Operis…) | Exactitude des calculs, cohérence avec les contrats et la term sheet |
| **Fiscale et comptable** | Conseil fiscal | Structure fiscale, TVA, IS, taxes locales, déductibilité |
| **Assurances** | Courtier / conseil des prêteurs | Programme d'assurance adapté |
| **Marché** | Conseil de marché (Aurora, Afry, Artelys, Compass Lexecon, Pexapark…) | Courbes de prix, taux de capture, PPA |
| **Environnement et social (E&S)** | Consultant E&S | Conformité réglementaire, principes de l'Équateur, taxonomie européenne |
| **KYC / conformité** | La banque | Connaissance des bénéficiaires effectifs, anti-blanchiment, sanctions |

**Le livrable :** chaque conseiller rend un **rapport** sur lequel les
prêteurs peuvent s'appuyer juridiquement (*reliance letter*). La levée des
points rouges fait partie des conditions suspensives.

---

## 7. Les stress tests et l'analyse de sensibilité

### 7.1 Les sensibilités standards demandées par les banques (EnR)

| Sensibilité | Choc typique |
|---|---|
| Production | P90 1 an, P90 10 ans, P99 |
| Disponibilité | −1 à −2 points |
| CAPEX | +10 % |
| OPEX | +10 à +15 % |
| Prix (part merchant) | −10 à −20 %, ou courbe basse |
| Retard de COD | +3 à +6 mois |
| Taux (part non couverte) | +100 à +200 points de base |
| Inflation | ±1 point |
| Dégradation | +0,2 %/an |
| Combiné (*downside*) | P90 + OPEX +10 % + prix −10 % |

On vérifie qu'**aucune sensibilité isolée ne fait passer le DSCR sous
1,00x**, et que la dette reste remboursable avant la fin du contrat.

### 7.2 L'analyse du point mort (*breakeven*)

La question est : **jusqu'où peut-on dégrader l'hypothèse avant que le
DSCR tombe à 1,00x ?**

Exemples de résultats : « le projet résiste à une baisse de production de
18 % » ou « le prix merchant peut tomber à 28 €/MWh ».

Plus l'écart entre le point mort et le cas de base est grand, **plus le
projet est robuste**.

### 7.3 Les simulations de Monte Carlo

Elles tirent au hasard des milliers de combinaisons d'hypothèses selon
leurs distributions de probabilité. On obtient une **distribution du TRI
et du DSCR** plutôt qu'un seul chiffre. Elles sont utilisées par les fonds
et les grandes banques, notamment pour le merchant et le stockage.

---

## 8. Les structures de dérisquage financier

- **Garanties publiques** : Bpifrance (garantie des prêts), BEI, garanties
  export.
- ***Credit enhancement*** : garantie d'un tiers noté, rehaussement par
  une tranche subordonnée.
- **Portefeuille** : la diversification géographique et technologique
  réduit la volatilité et améliore les conditions de la dette.
- **Contrat de liquidité ou prix plancher** (*floor*) : un tiers (trader,
  *utility*) garantit un prix minimum en échange d'une part de la hausse.
- **Couverture de production** : *proxy revenue swap*, contrat de volume.
- **Hybridation** : l'ajout d'une batterie permet de lisser les revenus et
  de capter des services.
- ***Step-in rights*** : ils permettent aux prêteurs de reprendre la main
  avant que les contrats ne soient résiliés.

---

## 9. La matrice de risques : le livrable type

| # | Risque | Prob. | Impact | Porté par | Atténuation | Risque résiduel |
|---|---|---|---|---|---|---|
| 1 | Recours contre le permis | Moyenne | Fort | Sponsor | Financial close après purge | Faible |
| 2 | Surcoût de construction | Moyenne | Moyen | EPC | Prix fixe, aléas de 5 % | Faible |
| 3 | Retard de COD | Moyenne | Moyen | EPC + assureur | LDs, ALOP | Faible |
| 4 | Production < P50 | Moyenne | Moyen | SPV | Dimensionnement P90, DSRA | Moyen |
| 5 | Défaillance de l'acheteur | Faible | Fort | SPV | État / EDF OA comme contrepartie | Très faible |
| 6 | Prix merchant après le CfD | Forte | Moyen | Sponsor | Dette remboursée avant la fin du CfD | Faible pour la dette |
| 7 | Hausse des taux | Moyenne | Moyen | Contrepartie du swap | Swap à 90 % | Très faible |
| 8 | Sinistre (grêle, incendie) | Faible | Fort | Assureur | Dommages et perte d'exploitation | Faible |

**Exercice :** remplis cette matrice pour un parc éolien et pour une
batterie de stockage, dont les risques de marché sont très différents.

---

## 10. Exercices du jour 6

1. Un parc éolien a un P50 de 100 GWh et une incertitude totale de 12 %.
   Calcule le P90 1 an et le P99.
2. Le contrat EPC prévoit des pénalités de retard de 15 k€ par jour,
   plafonnées à 10 % d'un contrat de 25 M€. Les revenus perdus sont de
   12 k€ par jour et le service de la dette de 8 k€ par jour. Les
   pénalités suffisent-elles ? Au bout de combien de jours le plafond
   est-il atteint ?
3. Explique à un sponsor pourquoi la banque refuse de financer avant la
   purge des recours sur le permis.
4. Quels sont les risques qui restent dans la SPV avec un multi-contrats ?
   Comment la banque va-t-elle réagir ?
5. Construis une matrice de 12 risques pour un projet de méthanisation
   agricole de 3 M€ (injection de biométhane).

## ✅ Auto-évaluation

- [ ] Je connais les 4 stratégies face à un risque et le principe
      d'allocation.
- [ ] Je sais citer au moins 25 risques et leur atténuation.
- [ ] Je connais les clauses clés de l'EPC et de l'O&M.
- [ ] Je sais calculer un P90 et expliquer la différence entre P90 1 an et
      10 ans.
- [ ] Je connais les assurances en construction et en exploitation.
- [ ] Je connais les due diligences et leurs livrables.
- [ ] Je sais construire une matrice de risques.
