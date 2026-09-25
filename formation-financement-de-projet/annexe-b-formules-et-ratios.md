# Annexe B — Formules et ratios (sur une page)

## La valeur temps

| Formule | Expression | Excel |
|---|---|---|
| Valeur future | `VF = VA × (1 + r)^n` | `=FV` (`=VC`) |
| Valeur actuelle | `VA = VF / (1 + r)^n` | `=PV` (`=VA`) |
| Facteur d'annuité | `(1 – (1 + r)^–n) / r` | |
| Annuité d'un prêt | `A = K × r / (1 – (1 + r)^–n)` | `=PMT` (`=VPM`) |
| VAN | `–I₀ + Σ Fₜ / (1 + r)^t` | `=NPV(r;F1:Fn)+F0` |
| TRI | taux r tel que VAN = 0 | `=IRR` / `=XIRR` |
| Fisher | `(1 + n) = (1 + r) × (1 + i)` | |

## Le coût du capital

| Formule | Expression |
|---|---|
| MEDAF | `Ke = Rf + β × (Rm – Rf)` |
| WACC | `E/(D+E) × Ke + D/(D+E) × Kd × (1 – t)` |
| Effet de levier | `ROE = ROA + (ROA – Kd) × D/E` |

## Les flux de trésorerie

```
EBITDA = CA – OPEX
CFADS  = EBITDA – IS payé – ΔBFR – CAPEX de maintenance (± réserves)
FCF (to firm) = EBITDA – IS (non levier) – ΔBFR – CAPEX
FCF to equity = CFADS – service de la dette ± mouvements de réserves
```

## Les ratios bancaires

| Ratio | Formule | Repère (EnR sous contrat) |
|---|---|---|
| **DSCR** | CFADS / (intérêts + capital) | 1,15 à 1,30x |
| **LLCR** | VAN(CFADS jusqu'à la maturité, au taux de la dette) / dette restante | ≈ DSCR moyen |
| **PLCR** | VAN(CFADS sur la durée de vie) / dette restante | > LLCR |
| **ICR** | CFADS / intérêts | > 2x |
| **Gearing** | Dette / (dette + fonds propres) | 70 à 85 % |
| **Dette / EBITDA** | Dette nette / EBITDA | Corporate < 3 à 4x |
| **Perte attendue** | PD × LGD × EAD | |
| **RAROC** | (revenus – coûts – perte attendue) / capital alloué | > 10 à 12 % |

## Le dimensionnement de la dette

```
Service de dette max_t = CFADS_t / DSCR cible
Dette (DSCR) = VAN(Service de dette max_t, taux de la dette)
Dette retenue = MIN(Dette DSCR P50 ; Dette DSCR P90 ; Gearing max × coût du projet)
Capital sculpté_t = CFADS_t / DSCR – Intérêts_t
```

## La production

```
Production = MW × productible (MWh/MW) × disponibilité × (1 – pertes) × (1 – dégradation)^t
Taux de charge = Production / (MW × 8 760 h)
P90 = P50 × (1 – 1,282 σ)       P99 = P50 × (1 – 2,326 σ)
P90 sur N ans : on divise la composante interannuelle de σ par √N
```

## Les revenus EnR

```
Complément de rémunération = (T – M0) × Production (+ prime de gestion)
Revenus merchant = Production × Prix de base × Taux de capture
```

## La valorisation

```
LCOE = [CAPEX + Σ OPEXₜ/(1+r)^t] / Σ [Productionₜ/(1+r)^t]
Valeur des titres = VE – Dette nette – Assimilés dette + Actifs hors exploitation
Post-money = Pré-money + Levée ; % investisseur = Levée / Post-money
Méthode VC : Valeur post-money = Valeur de sortie / (1 + TRI cible)^n
MOIC = Σ Flux reçus / Σ Flux investis
```

## Les ordres de grandeur

*Europe et France, milieu des années 2020, à actualiser.*

| Paramètre | Solaire au sol | Éolien terrestre |
|---|---|---|
| CAPEX | 0,55 à 0,80 M€/MWc | 1,3 à 1,7 M€/MW |
| Productible / taux de charge | 1 100 à 1 450 kWh/kWc (13 à 16 %) | 22 à 30 % |
| σ production (1 an) | 5 à 7 % | 10 à 15 % |
| OPEX | 15 à 30 k€/MWc/an (tout compris) | 40 à 70 k€/MW/an |
| Levier | 75 à 85 % | 70 à 80 % |
| Maturité de la dette | 18 à 20 ans (sous CfD de 20 ans) | 15 à 18 ans |
| TRI actionnaire | 6 à 10 % | 7 à 11 % |
