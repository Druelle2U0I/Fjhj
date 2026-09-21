export const company = {
  name: "ENMA Formation",
  tagline: "Vos équipes méritent le meilleur. Nous leur donnons les moyens d'y arriver.",
  description:
    "Formations sécurité incendie, secourisme, habilitations électriques, CACES, travail en hauteur, prévention des risques, management, qualité : ENMA Formation couvre l'ensemble de vos besoins en formation professionnelle. Certifié Qualiopi, financement OPCO pris en charge.",
  about:
    "Organisme de formation certifié Qualiopi, implanté dans les Hauts-de-France. Formations en intra-entreprise et en inter-entreprises, partout en Aisne et dans la Somme.",
  email: "maxence@enma-formation.fr",
  phone: "07 50 93 14 90",
  address: "18 rue des Verriers, 59200 Tourcoing",
  serviceArea: "Hauts-de-France — intervention en Aisne et dans la Somme",
};

// Numéros à confirmer avant mise en ligne définitive (déclaration
// d'activité et certification Qualiopi) — laisser vide tant qu'ils ne
// sont pas confirmés par ENMA Formation.
export const legal = {
  activityDeclaration: "",
  qualiopiCertificate: "",
};

export const stats = [
  { value: "35", label: "formations certifiées Qualiopi" },
  { value: "5", label: "départements couverts" },
  { value: "9", label: "domaines de formation" },
  { value: "100%", label: "formations finançables OPCO" },
];

export const pillars = [
  {
    title: "Expertise de terrain",
    text: "Nos intervenants connaissent les réalités des entreprises des Hauts-de-France et s'adaptent à chaque contexte.",
  },
  {
    title: "Ancrage régional",
    text: "Des formations sur mesure, alignées sur les réalités du marché du travail local.",
  },
  {
    title: "Qualité Qualiopi",
    text: "Des formations structurées, évaluées et en amélioration continue pour garantir la qualité.",
  },
  {
    title: "Accompagnement complet",
    text: "Nous gérons toute la conformité administrative et réglementaire, vous vous concentrez sur votre activité.",
  },
];

export const services = [
  {
    title: "Sécurité incendie & évacuation",
    description:
      "ENMA Formation forme vos équipes à la sécurité incendie et à l'évacuation.",
    trainings: [
      { title: "Exercice d'évacuation", duration: "1 demi-journée", format: "Intra ou inter-entreprises" },
      { title: "Premier témoin incendie", duration: "1 à 2 demi-journées", format: "Intra ou inter-entreprises" },
      { title: "Équipier d'évacuation", duration: "1 à 2 demi-journées", format: "Intra ou inter-entreprises" },
      { title: "Équipier de première intervention", duration: "2 demi-journées", format: "Intra-entreprise" },
    ],
  },
  {
    title: "Secours & premiers soins",
    description:
      "ENMA Formation forme vos équipes aux gestes de premiers secours.",
    trainings: [
      { title: "Gestes qui sauvent (GQS)", duration: "1 demi-journée", format: "Intra ou inter-entreprises" },
      { title: "Maintien et actualisation des compétences SST", duration: "2 demi-journées", format: "Intra-entreprise" },
      { title: "PSC 1 — Prévention et secours civiques niveau 1", duration: "2 demi-journées", format: "Intra ou inter-entreprises" },
      { title: "Sauveteur secouriste du travail (SST)", duration: "4 demi-journées", format: "Intra ou inter-entreprises" },
    ],
  },
  {
    title: "Habilitation électrique",
    description:
      "ENMA Formation prépare vos salariés électriciens et non électriciens à l'habilitation.",
    trainings: [
      { title: "Habilitation électrique — basse tension (NF C 18-510)", duration: "4 demi-journées", format: "Intra ou inter-entreprises" },
      { title: "Habilitation électrique — haute tension (NF C 18-510)", duration: "4 à 6 demi-journées", format: "Intra ou inter-entreprises" },
    ],
  },
  {
    title: "CACES & habilitations",
    description:
      "ENMA Formation forme vos conducteurs d'engins et de chariots à la conduite.",
    trainings: [
      { title: "AIPR — intervention à proximité des réseaux", duration: "2 demi-journées", format: "Intra-entreprise" },
      { title: "CACES R489 — conduite de chariots élévateurs", duration: "2 à 6 demi-journées", format: "Intra-entreprise" },
      { title: "Engins de chantier (R482)", duration: "4 à 10 demi-journées", format: "Intra ou inter-entreprises" },
      { title: "Gerbeur à conducteur accompagnant (R485)", duration: "2 à 4 demi-journées", format: "Intra ou inter-entreprises" },
      { title: "Grue de chargement (R490)", duration: "6 demi-journées", format: "Intra ou inter-entreprises" },
      { title: "PEMP — nacelle élévatrice (R486)", duration: "2 à 6 demi-journées", format: "Intra ou inter-entreprises" },
      { title: "Pont roulant (R484)", duration: "2 à 4 demi-journées", format: "Intra ou inter-entreprises" },
    ],
  },
  {
    title: "Travail en hauteur & échafaudages",
    description:
      "ENMA Formation forme vos équipes au travail en hauteur, au port du harnais et au montage d'échafaudages.",
    trainings: [
      { title: "Montage, démontage et utilisation des échafaudages de pied (R408)", duration: "4 à 6 demi-journées", format: "Intra ou inter-entreprises" },
      { title: "Montage, démontage et utilisation des échafaudages roulants et fixes (R457)", duration: "2 à 4 demi-journées", format: "Intra ou inter-entreprises" },
      { title: "Travail en hauteur et port du harnais", duration: "2 à 4 demi-journées", format: "Intra ou inter-entreprises" },
      { title: "Vérification des échafaudages", duration: "2 à 4 demi-journées", format: "Intra ou inter-entreprises" },
    ],
  },
  {
    title: "Prévention des risques professionnels",
    description:
      "ENMA Formation accompagne vos équipes dans la prévention des risques professionnels.",
    trainings: [
      { title: "Gestes et postures", duration: "1 à 2 demi-journées", format: "Intra-entreprise" },
      { title: "Gestion du stress", duration: "2 à 4 demi-journées", format: "Intra-entreprise" },
      { title: "Premiers secours en santé mentale (PSSM)", duration: "4 demi-journées", format: "Intra-entreprise" },
      { title: "Prévention de l'absentéisme", duration: "2 à 4 demi-journées", format: "Intra-entreprise" },
      { title: "Sécurité des salariés des entreprises extérieures — Niveau 1", duration: "2 demi-journées", format: "Intra-entreprise" },
    ],
  },
  {
    title: "Management & qualité",
    description:
      "ENMA Formation accompagne vos managers et vos équipes sur les compétences relationnelles.",
    trainings: [
      { title: "Faire face à l'agressivité et à l'incivilité", duration: "Durée à définir", format: "Intra-entreprise" },
      { title: "Gestion des conflits", duration: "4 demi-journées", format: "Intra-entreprise" },
      { title: "Les bases de la sécurité au quotidien", duration: "2 demi-journées", format: "Intra-entreprise" },
    ],
  },
  {
    title: "Photovoltaïque",
    description:
      "ENMA Formation forme les professionnels du solaire aux compétences techniques du photovoltaïque.",
    trainings: [
      { title: "Bureau d'études technique photovoltaïque", duration: "10 demi-journées", format: "Intra-entreprise" },
      { title: "Chiffrage et dimensionnement", duration: "4 demi-journées", format: "Intra-entreprise" },
      { title: "Contrôle par électroluminescence", duration: "Nous consulter", format: "Intra-entreprise" },
    ],
  },
  {
    title: "Collectivités et élus",
    description:
      "ENMA Formation accompagne les élus et les agents de la fonction publique territoriale dans leurs missions.",
    trainings: [
      { title: "Fonctions de l'élu", duration: "2 demi-journées", format: "Intra-entreprise" },
      { title: "Gestes et postures de l'élu", duration: "1 à 2 demi-journées", format: "Intra-entreprise" },
      { title: "Maîtriser la création d'un dossier de candidature à un appel d'offres public", duration: "Durée à définir", format: "Intra-entreprise" },
    ],
  },
];

export const topTrainings = [
  {
    title: "CACES R489 — conduite de chariots élévateurs",
    duration: "2 à 6 demi-journées",
    format: "Intra-entreprise",
  },
  {
    title: "AIPR — intervention à proximité des réseaux",
    duration: "2 demi-journées",
    format: "Intra-entreprise",
  },
  {
    title: "Sauveteur secouriste du travail (SST)",
    duration: "4 demi-journées",
    format: "Intra ou inter-entreprises",
  },
];

export const funding = {
  intro:
    "ENMA Formation est certifié Qualiopi au titre des actions de formation. Cette certification conditionne l'accès aux fonds publics et mutualisés.",
  points: [
    {
      title: "Aucune démarche de votre côté",
      text: "Nous montons le dossier de financement pour vous : vous n'avez aucune démarche administrative à effectuer.",
    },
    {
      title: "Financement OPCO",
      text: "Plan de développement des compétences, alternance, dispositifs conventionnels : selon votre branche et votre effectif, tout ou partie du coût pédagogique est financé.",
    },
    {
      title: "Mise en place rapide",
      text: "Une fois le dossier validé, les sessions peuvent généralement être programmées sous deux à quatre semaines.",
    },
  ],
};

export const accessibility = {
  text: "ENMA Formation s'engage à rechercher, en lien avec chaque client, des solutions d'adaptation pour favoriser l'accueil des personnes en situation de handicap (allongement des sessions, pauses plus fréquentes, supports adaptés, salles accessibles). Les demandes d'aménagement sont à formuler avant l'inscription auprès de notre référent handicap.",
  referent: "Maxence Druelle, référent handicap",
};

export const team = [
  {
    name: "Maxence Druelle",
    role: "Conseiller formation",
    email: "maxence@enma-formation.fr",
    bio: "Votre interlocuteur pour construire le parcours de formation adapté à vos besoins et à votre financement OPCO.",
  },
  {
    name: "Kenza Kessad",
    role: "Secrétaire administrative",
    email: "kenza@enma-formation.com",
    bio: "Votre contact pour le suivi administratif de vos dossiers de formation et de financement.",
  },
];
