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
    description: "ENMA Formation forme vos équipes à la sécurité incendie et à l'évacuation.",
    trainings: [
      {
        title: "Exercice d'évacuation",
        duration: "1 demi-journée",
        format: "Intra ou inter-entreprises",
        description: ["Former des équipiers d'évacuation ne suffit pas : encore faut-il vérifier que l'organisation fonctionne réellement, en conditions proches du réel. L'article R4227-39 du Code du travail impose des exercices d'évacuation périodiques afin de familiariser l'ensemble du personnel avec les issues de secours et les procédures d'alerte. Ces exercices permettent de révéler les points faibles d'un plan d'évacuation (issue mal signalée, point de rassemblement inadapté, temps d'évacuation trop long) avant qu'ils ne deviennent critiques lors d'un sinistre réel.", "ENMA Formation organise pour votre établissement un exercice d'évacuation grandeur nature, avec déclenchement de l'alarme, observation du comportement des occupants et des équipiers, chronométrage du temps d'évacuation et vérification du point de rassemblement. L'exercice se conclut par un débriefing détaillé et un compte-rendu écrit formulant des axes d'amélioration concrets pour votre organisation."],
        audience: "Cet exercice s'adresse à l'ensemble des occupants d'un site : salariés, encadrement, équipiers d'évacuation et, le cas échéant, public accueilli dans l'établissement. Il ne nécessite aucun prérequis et constitue le complément indispensable des formations théoriques dispensées aux équipiers d'évacuation et équipiers de première intervention. La fréquence recommandée est d'au moins un exercice par an, davantage dans les établissements recevant du public ou présentant un effectif important ou une forte rotation de personnel.",
        funding: "L'exercice d'évacuation, en tant qu'action de formation pratique liée à une obligation réglementaire, est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences. ENMA Formation vous fournit l'ensemble des pièces justificatives nécessaires à votre dossier de financement : convention de formation, programme détaillé et compte-rendu d'exercice. Cette prestation peut être couplée avec les formations EPI/ESI et équipier d'évacuation pour une prise en charge globale de votre dispositif de sécurité incendie.",
      },
      {
        title: "Premier témoin incendie",
        duration: "1 à 2 demi-journées",
        format: "Intra ou inter-entreprises",
        description: ["Tout salarié, quel que soit son poste, peut un jour se trouver face à un début d'incendie. Contrairement à l'équipier de première intervention, le premier témoin n'a pas vocation à combattre systématiquement le feu : sa mission première est de donner l'alerte rapidement et correctement, de mettre en sécurité les personnes à proximité, et de ne s'engager dans une extinction que si les conditions le permettent en toute sécurité. Cette sensibilisation, bien que non détaillée nommément dans le Code du travail, répond à l'obligation générale de prévention de l'employeur (article L4121-1) qui doit informer l'ensemble de son personnel sur la conduite à tenir en cas de sinistre.", "À l'issue de cette sensibilisation, chaque participant est capable de reconnaître les signes d'un départ de feu, de déclencher l'alarme selon la procédure du site, de donner l'alerte aux secours extérieurs en transmettant les informations essentielles, et d'utiliser un extincteur de façon élémentaire si la situation le permet, sans se mettre en danger."],
        audience: "Cette sensibilisation s'adresse à l'ensemble des salariés d'une entreprise, sans distinction de poste ni de fonction, et ne nécessite aucun prérequis. Elle se distingue de la formation d'équipier de première intervention par un contenu plus général, centré sur les réflexes d'alerte et de mise en sécurité plutôt que sur la maîtrise technique de l'extinction. Elle constitue un socle minimal recommandé pour tout nouvel arrivant dans le cadre de son accueil sécurité, en complément de la formation des équipiers désignés.",
        funding: "Cette sensibilisation entre dans le champ des actions de formation à la sécurité et peut, à ce titre, être prise en charge par votre OPCO au titre du plan de développement des compétences. ENMA Formation vous fournit le programme pédagogique et les justificatifs nécessaires à votre demande de financement. Elle est fréquemment organisée en même temps que l'accueil sécurité des nouveaux embauchés ou dans le cadre d'une campagne annuelle de sensibilisation à la sécurité incendie pour l'ensemble du personnel.",
      },
      {
        title: "Équipier d'évacuation",
        duration: "1 à 2 demi-journées",
        format: "Intra ou inter-entreprises",
        description: ["L'évacuation d'un bâtiment en cas d'incendie ou d'alerte ne s'improvise pas : sans organisation claire, la panique et la désorientation des occupants augmentent considérablement les risques de blessure ou d'accident. L'article R4227-39 du Code du travail impose la mise en place de consignes de sécurité et, dans de nombreux établissements, la désignation de guides et serre-files chargés d'encadrer l'évacuation. Cette organisation est également exigée dans les établissements recevant du public (ERP) au titre du règlement de sécurité incendie.", "À l'issue de la formation, le participant est capable d'assurer les missions de guide-file ou de serre-file : reconnaître le signal d'alarme, diriger les occupants vers les issues de secours, vérifier que les locaux sont évacués, encadrer les personnes en situation de handicap et rendre compte au point de rassemblement. Une attestation individuelle est délivrée à l'issue de la session."],
        audience: "Cette formation s'adresse à tout salarié désigné pour tenir un rôle de guide ou de serre-file dans le cadre du plan d'évacuation de son établissement. Elle ne nécessite aucun prérequis particulier, si ce n'est une bonne connaissance des locaux et des circulations du site. Le nombre d'équipiers à former dépend de la configuration des locaux, du nombre d'occupants et du nombre d'issues de secours : nous vous conseillons sur le dimensionnement adapté à votre site lors de l'élaboration du devis, afin de garantir une couverture complète même en cas d'absence d'un équipier titulaire.",
        funding: "Cette formation, liée à une obligation réglementaire de sécurité incendie, est éligible à une prise en charge par votre OPCO dans le cadre du plan de développement des compétences. ENMA Formation établit un devis et un programme pédagogique détaillés pour appuyer votre demande de financement. Elle peut également être organisée en intra-entreprise pour former simultanément l'ensemble des guides et serre-files d'un même site, ce qui optimise le coût par participant et facilite la coordination du plan d'évacuation.",
      },
      {
        title: "Équipier de première intervention",
        duration: "2 demi-journées",
        format: "Intra-entreprise",
        description: ["En cas de départ de feu, les premières minutes sont décisives : un incendie non maîtrisé peut doubler de volume toutes les 30 secondes et rendre les locaux impraticables en quelques instants. Le Code du travail (article R4227-28) impose à l'employeur de désigner et de former du personnel capable d'intervenir immédiatement avec les moyens de première intervention (extincteurs, robinets d'incendie armés) avant l'arrivée des secours extérieurs. Cette obligation s'inscrit dans une démarche globale de prévention du risque incendie qui engage la responsabilité civile et pénale du chef d'établissement.", "À l'issue de la formation, l'équipier de première intervention est capable d'identifier les causes et le comportement du feu, de donner l'alerte selon la procédure interne, de choisir et d'utiliser le moyen d'extinction adapté à la nature du feu, et de limiter la propagation en attendant les secours. Une attestation individuelle de formation est remise à chaque participant à l'issue de la session."],
        audience: "Cette formation s'adresse à tout salarié désigné par l'employeur pour intégrer une équipe de première intervention (EPI) au sein de son établissement, quel que soit le secteur d'activité. Aucun prérequis technique n'est nécessaire : la formation est accessible à tout public apte physiquement à manipuler un extincteur. Il est recommandé de former plusieurs équipiers par site et par poste afin de garantir une présence permanente en cas d'absence ou de rotation d'équipe. Conformément aux préconisations de la commission de sécurité, un recyclage est conseillé tous les 2 ans afin de maintenir les automatismes et d'actualiser les connaissances face à l'évolution des consignes internes.",
        funding: "Cette formation est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences, dans la mesure où elle répond à une obligation réglementaire de sécurité incendie. ENMA Formation vous accompagne dans la constitution du dossier de financement : devis détaillé, programme pédagogique et convocation nominative sont fournis pour faciliter votre demande de prise en charge auprès de votre opérateur de compétences. Le financement peut également être mobilisé dans le cadre d'un budget formation interne ou d'une convention multi-sites pour les entreprises disposant de plusieurs établissements.",
      },
    ],
  },
  {
    title: "Secours & premiers soins",
    description: "ENMA Formation forme vos équipes aux gestes de premiers secours.",
    trainings: [
      {
        title: "Gestes qui sauvent (GQS)",
        duration: "1 demi-journée",
        format: "Intra ou inter-entreprises",
        description: ["Toutes les entreprises ou tous les particuliers ne disposent pas nécessairement du temps ou du budget pour une formation complète PSC1 ou SST. Le dispositif Gestes Qui Sauvent (GQS), porté au niveau national dans le cadre du plan de développement des compétences de premiers secours, offre une alternative courte et accessible : en une demi-journée, chaque participant acquiert les réflexes essentiels pour réagir face aux urgences vitales les plus fréquentes, en attendant l'arrivée des secours ou une formation plus complète.", "À l'issue de cette sensibilisation, le participant est capable de protéger une victime, d'alerter les secours de façon adaptée, d'arrêter une hémorragie externe, de désobstruer les voies aériennes et de reconnaître un arrêt cardiaque pour réaliser un massage cardiaque et utiliser un défibrillateur automatisé externe. Cette formation constitue un premier pas efficace vers une culture du secourisme au sein de l'entreprise ou du grand public."],
        audience: "Cette sensibilisation s'adresse à tout public, sans prérequis, et convient particulièrement aux entreprises souhaitant sensibiliser rapidement un grand nombre de collaborateurs, aux collectivités organisant des campagnes de sensibilisation citoyenne, ou à toute personne désireuse d'acquérir les réflexes de base avant d'envisager, dans un second temps, une formation PSC1 ou SST plus complète et plus approfondie. Sa durée courte en fait un format particulièrement adapté aux plannings contraints des entreprises.",
        funding: "La formation Gestes Qui Sauvent est éligible à une prise en charge par votre OPCO au titre des actions de sensibilisation à la sécurité, lorsqu'elle est organisée dans un cadre professionnel. ENMA Formation vous fournit le programme pédagogique et les justificatifs nécessaires à votre dossier de financement. Son format court permet d'organiser plusieurs sessions successives afin de sensibiliser l'ensemble de vos effectifs à moindre coût et sans impact majeur sur l'organisation du travail.",
      },
      {
        title: "Maintien et actualisation des compétences SST",
        duration: "2 demi-journées",
        format: "Intra-entreprise",
        description: ["Les gestes de premiers secours s'oublient vite lorsqu'ils ne sont pas pratiqués régulièrement, et le référentiel de secourisme évolue périodiquement pour intégrer les dernières recommandations médicales. C'est pourquoi le certificat SST délivré par l'INRS n'est valable que 24 mois : au-delà, le sauveteur secouriste du travail doit suivre une session de Maintien et Actualisation des Compétences (MAC SST) pour conserver la validité de son certificat. Un certificat expiré sans recyclage réalisé dans les délais impose de repasser l'intégralité de la formation initiale, plus longue et plus coûteuse.", "Cette journée de recyclage permet au sauveteur secouriste du travail de réviser l'ensemble des gestes de secours, d'échanger sur les situations rencontrées depuis sa dernière formation et d'actualiser ses connaissances au regard des évolutions du référentiel INRS. À l'issue de la session, le certificat SST est prolongé pour une nouvelle durée de 24 mois."],
        audience: "Cette formation s'adresse exclusivement aux titulaires d'un certificat SST en cours de validité, à suivre impérativement avant la date d'échéance des 24 mois pour éviter toute rupture de couverture. Aucun prérequis supplémentaire n'est demandé au-delà de la détention du certificat initial. Nous recommandons d'anticiper l'inscription au recyclage plusieurs semaines avant l'échéance afin de garantir une place disponible et d'éviter que votre entreprise ne se retrouve temporairement sans sauveteur secouriste opérationnel.",
        funding: "Le MAC SST est éligible à une prise en charge par votre OPCO au même titre que la formation initiale, dans le cadre du plan de développement des compétences. ENMA Formation vous fournit devis, convention et programme pédagogique pour faciliter votre demande de financement. Pour vous simplifier la gestion de vos échéances, nous proposons un suivi personnalisé et vous alertons à l'approche de la date d'expiration des certificats de vos salariés si vous le souhaitez.",
      },
      {
        title: "PSC 1 — Prévention et secours civiques niveau 1",
        duration: "2 demi-journées",
        format: "Intra ou inter-entreprises",
        description: ["La majorité des accidents de la vie courante et des malaises graves surviennent en dehors du cadre professionnel, dans un contexte où aucun professionnel de santé n'est immédiatement présent. Le dispositif national PSC1 (Prévention et Secours Civiques de niveau 1), défini par le ministère de l'Intérieur et dispensé selon un référentiel national unique, vise à démocratiser l'apprentissage des gestes qui sauvent auprès du plus grand nombre. Contrairement au SST, centré sur le contexte professionnel, le PSC1 couvre l'ensemble des situations d'urgence de la vie quotidienne.", "À l'issue de la formation, le participant est capable de protéger une victime et les témoins d'un sur-accident, d'alerter les secours de manière adaptée, et de réaliser les gestes de premiers secours face à une obstruction des voies aériennes, une hémorragie, une perte de connaissance, un arrêt cardiaque, un malaise ou un traumatisme. Une attestation nationale PSC1 est délivrée à l'issue de la session, reconnue par l'ensemble des acteurs du secourisme en France."],
        audience: "Cette formation s'adresse à tout public à partir de l'adolescence, sans aucun prérequis technique ou médical. Elle est particulièrement recommandée pour les salariés en dehors du cadre strictement professionnel du SST, les représentants du personnel, les encadrants d'activités périscolaires ou associatives, ainsi qu'à toute personne souhaitant être en mesure d'agir efficacement face à une urgence dans sa vie personnelle. Elle constitue également une excellente première étape avant d'envisager, pour les salariés directement concernés, une formation SST plus orientée sur le contexte professionnel.",
        funding: "Le PSC1 est éligible à une prise en charge par votre OPCO lorsqu'il est organisé dans un cadre professionnel, au titre des actions de sensibilisation à la sécurité. ENMA Formation vous accompagne dans le montage du dossier de financement en fournissant devis, programme et justificatifs de réalisation. Cette formation peut également être financée sur fonds propres ou proposée en avantage salarié dans le cadre d'une politique de qualité de vie au travail élargie à la sécurité personnelle des collaborateurs.",
      },
      {
        title: "Sauveteur secouriste du travail",
        duration: "4 demi-journées",
        format: "Intra ou inter-entreprises",
        description: ["Chaque année en France, des milliers d'accidents du travail surviennent alors qu'aucun témoin formé n'est présent pour intervenir dans les premières minutes, celles où le pronostic vital se joue souvent. Le Code du travail (article R4224-15) impose à l'employeur de disposer d'un nombre suffisant de travailleurs formés pour donner les premiers secours en cas d'accident, particulièrement dans les établissements présentant des risques particuliers. La formation Sauveteur Secouriste du Travail (SST), conçue et contrôlée par l'INRS, permet de répondre à cette obligation tout en dotant le salarié d'une double compétence : porter secours et contribuer à la prévention des risques professionnels de son entreprise.", "À l'issue de la formation, le sauveteur secouriste du travail est capable de protéger une victime et les témoins d'un sur-accident, d'examiner la victime pour rechercher les signes d'urgence vitale, d'alerter ou de faire alerter les secours de manière structurée, et de réaliser les gestes de secours adaptés face à un saignement, un étouffement, une brûlure, un traumatisme ou un arrêt cardiaque. Le certificat SST délivré par l'INRS est valable 24 mois et doit être maintenu à jour par un recyclage MAC SST."],
        audience: "Cette formation s'adresse à tout salarié désigné par son employeur pour intégrer le dispositif de secours interne à l'entreprise, sans prérequis particulier si ce n'est une aptitude physique compatible avec la réalisation des gestes de premiers secours (notamment le massage cardiaque). Elle est particulièrement recommandée dans les ateliers, ERP et chantiers où le risque d'accident est élevé, mais reste utile dans tout environnement de travail. La formation est accessible aux personnes en situation de handicap : contactez notre référent handicap pour étudier ensemble les adaptations pédagogiques et matérielles nécessaires avant la session.",
        funding: "La formation SST est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences, la prise en charge étant fréquemment intégrale pour les entreprises de moins de 50 salariés. ENMA Formation vous fournit l'ensemble des pièces nécessaires à votre dossier : convention de formation, programme conforme au référentiel INRS et convocations nominatives. Nous assurons également le suivi des échéances de recyclage MAC SST de vos salariés afin que votre effectif de sauveteurs secouristes reste opérationnel en continu.",
      },
    ],
  },
  {
    title: "Habilitation électrique",
    description: "ENMA Formation prépare vos salariés électriciens et non électriciens à l'habilitation.",
    trainings: [
      {
        title: "Habilitation électrique — basse tension (NF C 18-510)",
        duration: "4 demi-journées",
        format: "Intra ou inter-entreprises",
        description: ["L'habilitation électrique n'est pas une option administrative : sans titre valide, toute intervention sur une installation électrique sous tension est interdite par la loi, et engage la responsabilité de l'employeur comme celle du salarié en cas d'accident. Chaque année, l'électrisation reste l'une des causes majeures d'accidents graves et mortels au travail.\n\nCette formation prépare vos électriciens à l'habilitation basse tension B2V-BR-BC, conforme à la norme NF C 18-510, pour intervenir en sécurité sur les installations basse tension de votre entreprise. Elle couvre trois niveaux complémentaires : B2V pour les travaux hors tension et au voisinage, BR pour les interventions générales (dépannage, raccordement, remplacement), et BC pour la consignation. La formation alterne apports théoriques en salle et mises en situation pratiques sur plateau technique basse tension, dans des conditions proches du réel."],
        audience: "Cette formation s'adresse au personnel électricien amené à réaliser des travaux ou interventions sur des installations basse tension : électriciens de maintenance, techniciens, agents de travaux. Aucun diplôme n'est exigé, mais une aptitude médicale au poste de travail délivrée par le médecin du travail est nécessaire avant toute habilitation. Elle concerne aussi bien les primo-habilités que les électriciens confirmés en renouvellement — la norme NF C 18-510 ne fixe pas de durée de validité réglementaire, mais recommande un recyclage tous les 3 ans, périodicité que la plupart des employeurs retiennent.",
        funding: "Formation finançable par votre OPCO au titre du plan de développement des compétences. Nous vous remettons l'ensemble des documents nécessaires au montage du dossier : convention de formation, devis détaillé et programme pédagogique. Un point essentiel à connaître : le titre d'habilitation électrique n'est jamais délivré par l'organisme de formation, mais par l'employeur, sur la base des résultats aux évaluations théorique (QCM) et pratique que nous lui transmettons à l'issue de la session.",
      },
      {
        title: "Habilitation électrique — haute tension (NF C 18-510)",
        duration: "4 à 6 demi-journées",
        format: "Intra ou inter-entreprises",
        description: ["La haute tension ne pardonne pas l'improvisation : sans habilitation valide, toute intervention sur ces installations est interdite par la loi, et les conséquences d'un accident en haute tension sont presque toujours graves, voire mortelles. L'employeur comme le salarié engagent leur responsabilité en cas d'intervention non habilitée.\n\nCette formation prépare le personnel électricien confirmé à l'habilitation haute tension H2V-HC, conforme à la norme NF C 18-510. Elle couvre les travaux hors tension et au voisinage renforcé (H2V) ainsi que la consignation haute tension (HC). La haute tension impose des distances de sécurité plus strictes et une maîtrise technique plus poussée que la basse tension : la formation combine apports théoriques et mises en situation pratiques sur plateau technique haute tension."],
        audience: "Personnel électricien confirmé amené à réaliser des travaux ou des consignations sur des installations haute tension : techniciens et électriciens expérimentés, généralement déjà habilités en basse tension. Une aptitude médicale au poste de travail est requise. Cette habilitation demande une maîtrise technique plus poussée que la basse tension : une expérience préalable sur des installations électriques est fortement recommandée avant d'aborder ce niveau.",
        funding: "Formation finançable par votre OPCO au titre du plan de développement des compétences. Comme pour la basse tension, le titre d'habilitation haute tension est délivré par l'employeur, jamais par l'organisme de formation, sur la base des résultats aux évaluations théorique et pratique que nous lui transmettons. Convention, devis et programme détaillé vous sont remis pour constituer votre dossier.",
      },
    ],
  },
  {
    title: "CACES & habilitations",
    description: "ENMA Formation forme vos conducteurs d'engins et de chariots à la conduite.",
    trainings: [
      {
        title: "AIPR, intervention à proximité des réseaux",
        duration: "2 demi-journées",
        format: "Intra-entreprise",
        description: ["Chaque année, des centaines d'accidents et d'interruptions de service résultent de travaux réalisés à proximité de réseaux enterrés ou aériens mal identifiés (gaz, électricité, télécommunications, eau). La réforme anti-endommagement des réseaux (décret DT-DICT) impose depuis 2018 que tout intervenant sur un chantier à proximité de réseaux soit titulaire d'une Autorisation d'Intervention à Proximité des Réseaux (AIPR), délivrée après réussite à un examen national sur plateforme agréée. Cette obligation concerne aussi bien les opérateurs de travaux que l'encadrement et les concepteurs de projets.", "À l'issue de la préparation, le participant est capable de comprendre les démarches administratives de la réforme anti-endommagement, de lire un plan de réseaux et d'en interpréter le marquage-piquetage, d'appliquer les distances et techniques de sécurité adaptées à proximité d'un réseau, et de réagir correctement en cas d'endommagement ou de doute sur la localisation d'un réseau. La formation prépare spécifiquement à l'examen AIPR correspondant au profil du participant (opérateur, encadrant ou concepteur)."],
        audience: "Cette formation s'adresse aux opérateurs, encadrants et concepteurs de travaux intervenant à proximité de réseaux enterrés ou aériens, quel que soit le secteur d'activité (BTP, VRD, espaces verts, réseaux). Aucun prérequis technique n'est exigé, seule une maîtrise suffisante du français écrit et parlé est nécessaire pour passer l'examen final. Le profil visé (opérateur, encadrant ou concepteur) détermine le contenu de l'examen final : nous vous aidons à identifier le profil adapté à la fonction de chaque participant.",
        funding: "La préparation à l'AIPR est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences, en tant que formation réglementaire liée à la sécurité des travaux. ENMA Formation vous fournit devis, programme pédagogique et convention de formation pour appuyer votre dossier de financement. L'examen AIPR étant valable 5 ans, nous pouvons également organiser des sessions de renouvellement groupées pour l'ensemble de vos équipes intervenant sur chantier.",
      },
      {
        title: "CACES R489, conduite de chariots élévateurs",
        duration: "2 à 6 demi-journées",
        format: "Intra-entreprise",
        description: ["La conduite d'un chariot élévateur est une opération à risque : chute de charge, renversement de l'engin, collision avec un piéton figurent parmi les accidents du travail les plus graves recensés en entrepôt et sur chantier. L'article R4323-55 du Code du travail impose que tout conducteur de chariot automoteur à conducteur porté soit titulaire d'une autorisation de conduite délivrée par son employeur, elle-même fondée sur une évaluation des connaissances et savoir-faire conforme à la recommandation R489 de la CNAM. Cette formation constitue le socle indispensable à la délivrance de cette autorisation.", "À l'issue de la formation, le conducteur est capable d'appliquer les règles de circulation propres à son site, de vérifier son chariot avant la prise de poste, de manœuvrer en sécurité en charge comme à vide, et de réaliser les opérations de gerbage, dégerbage et chargement de véhicule dans le respect de la plaque de charge. La durée de la formation varie selon l'expérience du conducteur et le nombre de catégories visées : une journée suffit généralement pour un recyclage, jusqu'à trois jours pour une première qualification portant sur plusieurs catégories."],
        audience: "Cette formation s'adresse à toute personne appelée à conduire un chariot élévateur, qu'il s'agisse d'une première qualification ou d'un recyclage. Une aptitude médicale à la conduite délivrée par le médecin du travail est requise, ainsi qu'une maîtrise suffisante du français écrit et parlé pour comprendre les consignes de sécurité et répondre au test théorique. Le choix des catégories à faire certifier (1 à 6 selon la nomenclature R489) dépend du type de chariots utilisés sur votre site : nous vous aidons à identifier les catégories pertinentes lors de l'établissement du devis.",
        funding: "La formation CACES R489 est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences, dans la mesure où elle répond à une obligation réglementaire de sécurité liée à la conduite d'engins. ENMA Formation vous transmet le devis détaillé par catégorie visée, le programme pédagogique et la convention de formation nécessaires à votre demande de financement. Un accompagnement est également proposé pour la mise à jour des autorisations de conduite de l'ensemble de vos conducteurs, notamment lors du renouvellement périodique recommandé tous les 5 ans.",
      },
      {
        title: "Engins de chantier (R482)",
        duration: "4 à 10 demi-journées",
        format: "Intra ou inter-entreprises",
        description: ["Un engin de chantier mal maîtrisé figure parmi les premières causes d'accident grave sur les chantiers du BTP : renversement, ensevelissement, collision avec un piéton ou un réseau enterré. L'article R4323-55 du Code du travail impose que tout conducteur d'engin de chantier soit titulaire d'une autorisation de conduite délivrée par l'employeur, fondée sur une évaluation conforme à la recommandation R482 de la CNAM, qui couvre sept catégories d'engins (A à G) selon leur usage.", "Cette formation théorique et pratique alterne plateau technique et conditions réelles de chantier. À l'issue de la session, le conducteur est capable de vérifier son engin avant utilisation, de circuler en sécurité sur le chantier en tenant compte des zones de danger et des réseaux enterrés, et de réaliser les manœuvres propres à son engin (terrassement, chargement, nivellement) dans le respect des règles de stabilité."],
        audience: "Cette formation s'adresse à tout conducteur amené à utiliser un engin de chantier dans le cadre de son activité professionnelle. Une aptitude médicale à la conduite délivrée par le médecin du travail est requise. La catégorie R482 visée (de A à G) dépend directement du type d'engin utilisé dans votre activité : pelle, chargeuse, tractopelle, compacteur ou autre engin de chantier ; nous vous aidons à l'identifier lors de l'établissement du devis.",
        funding: "Cette formation est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences. ENMA Formation vous accompagne dans le montage du dossier de financement en fournissant devis par catégorie, programme pédagogique et convention de formation. Une préparation groupée à l'AIPR peut également être proposée pour les conducteurs intervenant à proximité de réseaux.",
      },
      {
        title: "Gerbeur à conducteur accompagnant (R485)",
        duration: "2 à 4 demi-journées",
        format: "Intra ou inter-entreprises",
        description: ["En entrepôt, la manutention avec un gerbeur mal maîtrisé expose à des risques réels de chute de charge et d'écrasement du conducteur ou des piétons évoluant à proximité. L'article R4323-55 du Code du travail impose que tout conducteur d'équipement de travail mobile automoteur, y compris les gerbeurs à conducteur accompagnant, soit titulaire d'une autorisation de conduite délivrée par l'employeur sur la base d'une évaluation conforme à la recommandation R485 de la CNAM.", "Cette formation combine apports théoriques et pratique de manutention en sécurité. À l'issue de la session, le conducteur est capable de choisir la catégorie de gerbeur adaptée à son usage, de réaliser les vérifications de prise de poste, de circuler en sécurité en entrepôt et de réaliser les opérations de gerbage et de dégerbage dans le respect de la stabilité de la charge et de l'engin."],
        audience: "Cette formation s'adresse à tout salarié amené à utiliser un gerbeur à conducteur accompagnant dans le cadre de ses fonctions en entrepôt ou en zone de stockage. Une aptitude médicale à la conduite délivrée par le médecin du travail est requise. La catégorie visée (1 pour une hauteur de levée inférieure ou égale à 2,50 mètres, 2 au-delà) dépend directement du matériel utilisé sur votre site : nous vous aidons à déterminer la catégorie adaptée lors de l'établissement du devis.",
        funding: "Cette formation est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences. ENMA Formation vous accompagne dans le montage du dossier de financement en fournissant devis, programme pédagogique et convention de formation. Elle peut être couplée avec d'autres formations CACES de votre parc d'engins pour optimiser l'organisation des sessions et le coût global de votre plan de formation.",
      },
      {
        title: "Grue de chargement (R490)",
        duration: "6 demi-journées",
        format: "Intra ou inter-entreprises",
        description: ["La grue de chargement, montée sur véhicule, permet de lever et déplacer des charges lourdes lors des opérations de livraison ou de chantier : une mauvaise stabilisation ou un défaut d'élingage peut entraîner le renversement du véhicule ou la chute de la charge. L'article R4323-55 du Code du travail impose que tout conducteur de grue de chargement soit titulaire d'une autorisation de conduite délivrée par l'employeur, fondée sur une évaluation conforme à la recommandation R490 de la CNAM.", "Cette formation alterne apports théoriques, découverte de la technologie et exercices pratiques de levage. À l'issue de la session, le conducteur est capable de mettre en station la grue en sécurité, de choisir et vérifier les accessoires de levage, de réaliser une opération de levage en respectant la trajectoire et la stabilité de la charge, et de réagir correctement en situation dégradée."],
        audience: "Cette formation s'adresse à tout conducteur amené à utiliser une grue de chargement dans le cadre de son activité professionnelle, notamment dans les secteurs du transport, de la livraison de matériaux ou du BTP. Une aptitude médicale à la conduite délivrée par le médecin du travail est requise. Aucune expérience préalable n'est exigée, mais une bonne compréhension des consignes écrites et orales est nécessaire pour suivre la partie théorique et réussir l'évaluation.",
        funding: "Cette formation est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences. ENMA Formation vous fournit devis, programme pédagogique et convention de formation pour appuyer votre demande de financement. Elle peut être organisée directement sur votre site avec votre propre matériel, sous réserve de sa conformité, afin de limiter les contraintes d'organisation.",
      },
      {
        title: "PEMP — nacelle élévatrice (R486)",
        duration: "2 à 6 demi-journées",
        format: "Intra ou inter-entreprises",
        description: ["Travailler en hauteur sur une plateforme élévatrice mobile de personnes (PEMP) mal maîtrisée multiplie les risques de basculement, de chute depuis la nacelle et de collision avec des obstacles aériens tels que des lignes électriques. L'article R4323-55 du Code du travail impose que tout conducteur de PEMP soit titulaire d'une autorisation de conduite délivrée par l'employeur, fondée sur une évaluation conforme à la recommandation R486 de la CNAM.", "À l'issue de la formation, le conducteur est capable de choisir le type de PEMP adapté à son intervention, de la mettre en station en sécurité, de travailler en hauteur dans la nacelle avec les équipements de protection individuelle requis, et de réagir correctement en cas de situation dégradée. La formation prépare à la catégorie A (élévation verticale) ou B (élévation multidirectionnelle) selon le matériel utilisé sur votre site."],
        audience: "Cette formation s'adresse à tout salarié amené à utiliser une plateforme élévatrice mobile de personnes dans le cadre de son activité (maintenance, montage, entretien d'espaces verts, bâtiment). Une aptitude médicale à la conduite ainsi que l'absence de vertige invalidant sont requises, le travail en nacelle exposant le conducteur au vide. Le choix de la catégorie (A ou B) dépend du type de PEMP utilisé sur votre site : nous vous aidons à l'identifier lors de l'établissement du devis.",
        funding: "Cette formation est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences. ENMA Formation vous fournit devis, programme pédagogique et convention de formation pour appuyer votre demande de financement. Elle peut être couplée avec une formation au port du harnais antichute pour les conducteurs amenés à travailler en hauteur en dehors de la nacelle elle-même.",
      },
      {
        title: "Pont roulant (R484)",
        duration: "2 à 4 demi-journées",
        format: "Intra ou inter-entreprises",
        description: ["Le pont roulant permet de déplacer des charges lourdes en hauteur, au-dessus des zones de travail et de circulation : une erreur de manœuvre ou un défaut d'élingage peut provoquer la chute de la charge sur des personnes ou des équipements, avec des conséquences potentiellement mortelles. L'article R4323-55 du Code du travail impose que tout conducteur d'appareil de levage soit titulaire d'une autorisation de conduite délivrée par l'employeur, fondée sur une évaluation conforme à la recommandation R484 de la CNAM.", "À l'issue de la formation, le conducteur est capable de vérifier son pont roulant avant utilisation, de choisir et vérifier les accessoires de levage adaptés à la charge, de piloter le pont en sécurité depuis le sol ou en cabine, et d'appliquer les gestes de commandement normalisés lors d'un levage encadré par un tiers. La formation alterne apports théoriques et exercices pratiques sur pont roulant."],
        audience: "Cette formation s'adresse à tout salarié amené à conduire un pont roulant dans le cadre de son activité, en atelier ou sur site industriel. Une aptitude médicale à la conduite délivrée par le médecin du travail est requise. Aucune expérience préalable n'est exigée, mais une bonne compréhension des consignes de sécurité écrites et orales est nécessaire pour suivre la partie théorique et réussir l'évaluation.",
        funding: "Cette formation est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences, en tant que formation réglementaire liée à la conduite d'appareils de levage. ENMA Formation vous fournit devis, programme pédagogique et convention de formation pour appuyer votre demande de financement. Elle peut être organisée directement sur votre site si vous disposez d'un pont roulant, ou dans nos locaux équipés à cet effet.",
      },
    ],
  },
  {
    title: "Travail en hauteur & échafaudages",
    description: "ENMA Formation forme vos équipes au travail en hauteur, au port du harnais et au montage d'échafaudages.",
    trainings: [
      {
        title: "Montage, démontage et utilisation des échafaudages de pied (R408)",
        duration: "4 à 6 demi-journées",
        format: "Intra ou inter-entreprises",
        description: ["Les échafaudages de pied, montés directement au sol et destinés à rester en place plusieurs jours voire plusieurs semaines, présentent des exigences de montage spécifiques liées à leur hauteur, à leur stabilisation et à la nature du support sur lequel ils reposent. Le décret du 1er septembre 2004 et les recommandations R.408 et R.457 de la CNAM imposent une formation approfondie pour toute personne chargée du montage, du démontage ou de la vérification de ce type d'ouvrage, plus complexe qu'un échafaudage roulant.", "Cette formation approfondie couvre l'ensemble des opérations liées à l'échafaudage de pied : réception du support et calcul de la répartition des charges, montage selon la notice du fabricant en tenant compte des cas particuliers (façades irrégulières, encorbellements), vérifications de mise et de remise en service, puis démontage en sécurité. À l'issue de la session, le participant maîtrise l'ensemble du cycle de vie de l'échafaudage de pied."],
        audience: "Cette formation s'adresse à tout salarié amené à monter, démonter ou utiliser des échafaudages fixes de pied dans le cadre de son activité, en particulier sur des chantiers de longue durée nécessitant un ouvrage stable et de grande hauteur. Aucun prérequis technique n'est exigé, mais une aptitude médicale au travail en hauteur est recommandée. Cette formation constitue un approfondissement recommandé pour les monteurs confrontés régulièrement à des configurations de montage complexes.",
        funding: "Cette formation est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences. ENMA Formation vous fournit devis, programme pédagogique et convention de formation pour appuyer votre demande de financement. Elle peut être couplée avec la formation aux échafaudages roulants pour les équipes amenées à utiliser les deux types d'ouvrages selon les chantiers.",
      },
      {
        title: "Montage, démontage et utilisation des échafaudages roulants et fixes (R457)",
        duration: "2 à 4 demi-journées",
        format: "Intra ou inter-entreprises",
        description: ["Un échafaudage mal monté représente un risque de chute immédiat pour son utilisateur comme pour les personnes évoluant à proximité : basculement, effondrement partiel ou rupture d'un plancher figurent parmi les causes récurrentes d'accident grave sur les chantiers. Le décret du 1er septembre 2004 et les recommandations R.408 et R.457 de la CNAM encadrent strictement les conditions de montage, de démontage et d'utilisation des échafaudages, qu'ils soient fixes de pied ou roulants sur roulettes.", "Cette formation couvre l'ensemble du cycle de vie de l'échafaudage roulant et fixe : réception du support, montage dans le respect de la notice du fabricant, vérifications de mise en service et journalières, puis démontage en sécurité. À l'issue de la session, le participant est capable de monter et démonter un échafaudage conforme, d'identifier les non-conformités et d'utiliser l'ouvrage en sécurité une fois celui-ci mis à disposition."],
        audience: "Cette formation s'adresse à tout salarié amené à monter, démonter ou utiliser des échafaudages fixes de pied ou roulants dans le cadre de son activité (BTP, industrie, maintenance de bâtiment). Aucun prérequis technique n'est exigé, mais une aptitude médicale au travail en hauteur est recommandée pour les opérations de montage réalisées en hauteur. Un recyclage périodique est conseillé afin de maintenir la maîtrise des procédures de montage et des évolutions réglementaires.",
        funding: "Cette formation est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences, en tant que formation réglementaire liée à la prévention du risque de chute de hauteur. ENMA Formation vous fournit devis, programme pédagogique et convention de formation pour appuyer votre demande de financement. Elle peut être organisée sur votre site avec votre propre matériel d'échafaudage afin de rapprocher la formation des conditions réelles d'utilisation.",
      },
      {
        title: "Travail en hauteur et port du harnais",
        duration: "2 à 4 demi-journées",
        format: "Intra ou inter-entreprises",
        description: ["La chute de hauteur reste l'une des principales causes d'accident mortel au travail en France, devant de nombreux autres risques professionnels pourtant plus médiatisés. L'article R4323-104 du Code du travail impose à l'employeur de former tout salarié amené à porter un équipement de protection individuelle contre les chutes, le harnais antichute ne devant être utilisé qu'en dernier recours, lorsque la protection collective (garde-corps, filets) n'est pas envisageable.", "Cette formation combine apports théoriques et mise en pratique sur structure dédiée ou directement sur votre site, afin d'ancrer les bons réflexes avant toute intervention réelle. À l'issue de la session, le participant est capable de choisir un point d'ancrage adapté, de vérifier son harnais et sa longe avant utilisation, de s'arrimer correctement selon la configuration de travail, et de réagir en cas de suspension accidentelle prolongée, situation qui présente un risque vital propre appelé syndrome du harnais."],
        audience: "Cette formation s'adresse à tout salarié amené à travailler en hauteur avec port du harnais antichute, quel que soit le secteur d'activité (bâtiment, industrie, maintenance, télécommunications, espaces verts). Une aptitude médicale au travail en hauteur délivrée par le médecin du travail est requise, ainsi qu'une absence de contre-indication au port prolongé d'un harnais. Un recyclage est recommandé tous les 1 à 3 ans selon la fréquence d'exposition au risque, afin de maintenir les automatismes de vérification et d'arrimage.",
        funding: "Cette formation est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences, en tant que formation réglementaire liée à la prévention du risque de chute de hauteur. ENMA Formation vous fournit devis, programme pédagogique et convention de formation pour appuyer votre demande de financement. Elle peut être organisée directement sur votre site afin d'entraîner les participants sur les points d'ancrage réels qu'ils utiliseront au quotidien.",
      },
      {
        title: "Vérification des échafaudages",
        duration: "2 à 4 demi-journées",
        format: "Intra ou inter-entreprises",
        description: ["Un échafaudage non vérifié peut dissimuler un défaut de montage invisible à l'usage courant : ancrage insuffisant, plancher mal fixé ou garde-corps manquant ne se révèlent parfois qu'au moment de l'accident. Le décret du 1er septembre 2004 impose une vérification de l'échafaudage avant sa première mise en service, après tout démontage-remontage, et à chaque changement de configuration, en complément des vérifications journalières réalisées par les utilisateurs eux-mêmes.", "Cette formation permet à la personne désignée d'identifier méthodiquement les non-conformités d'un échafaudage avant sa mise à disposition des équipes. À l'issue de la session, le participant est capable de conduire une vérification structurée selon une méthode reproductible, de renseigner le registre de sécurité, et de statuer sur l'autorisation ou l'interdiction d'utilisation de l'ouvrage vérifié."],
        audience: "Cette formation s'adresse aux personnes désignées par l'employeur pour assurer la vérification des échafaudages avant mise à disposition des équipes : chef d'équipe, responsable sécurité ou monteur confirmé. Une bonne connaissance préalable de la technologie des échafaudages est recommandée, une formation au montage d'échafaudages constituant un prérequis idéal avant cette formation de vérification. Elle s'adresse en priorité aux entreprises disposant de leur propre parc d'échafaudages ou intervenant régulièrement sur des chantiers avec montage d'ouvrages temporaires.",
        funding: "Cette formation est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences, en tant que formation réglementaire liée à la prévention du risque de chute de hauteur. ENMA Formation vous fournit devis, programme pédagogique et convention de formation pour appuyer votre demande de financement. Elle peut être organisée en complément d'une formation au montage d'échafaudages afin de former une même personne aux deux compétences complémentaires.",
      },
    ],
  },
  {
    title: "Prévention des risques professionnels",
    description: "ENMA Formation accompagne vos équipes dans la prévention des risques professionnels.",
    trainings: [
      {
        title: "Gestes et postures",
        duration: "1 à 2 demi-journées",
        format: "Intra-entreprise",
        description: ["Les troubles musculosquelettiques (TMS) constituent la première cause de maladie professionnelle reconnue en France, loin devant tous les autres risques professionnels. Lombalgies, tendinites, troubles du canal carpien : ces pathologies s'installent progressivement, souvent sans signal d'alarme franc, jusqu'à devenir invalidantes et générer un absentéisme durable. L'obligation générale de prévention de l'employeur (article L4121-1 du Code du travail) impose d'agir sur ce risque avant que les douleurs ne deviennent chroniques.", "Cette sensibilisation permet d'agir en amont, en donnant à chaque salarié les clés pour comprendre l'origine de ces troubles et adapter sa pratique quotidienne. À l'issue de la formation, le participant est capable d'identifier les situations à risque de son propre poste de travail, d'appliquer les principes de sécurité physique et d'économie d'effort, et de solliciter le bon geste plutôt que la bonne force pour limiter la sollicitation de son corps."],
        audience: "Cette formation s'adresse à tout salarié exposé à des manutentions manuelles, des postures contraignantes ou des mouvements répétitifs dans le cadre de son activité, quel que soit le secteur (industrie, logistique, bâtiment, tertiaire). Aucun prérequis n'est nécessaire. Elle est particulièrement recommandée aux postes identifiés comme à risque dans le document unique d'évaluation des risques professionnels (DUERP) de l'entreprise, et peut être adaptée aux spécificités de chaque métier représenté dans le groupe.",
        funding: "Cette formation est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences, en tant qu'action de prévention des risques professionnels. ENMA Formation vous fournit devis, programme pédagogique et convention de formation pour appuyer votre demande de financement. Elle peut être organisée sur votre site et adaptée aux postes de travail réels de vos salariés afin de maximiser la pertinence des exercices pratiques.",
      },
      {
        title: "Gestion du stress",
        duration: "2 à 4 demi-journées",
        format: "Intra-entreprise",
        description: ["Le stress chronique au travail impacte autant la santé des salariés que la performance de l'entreprise : troubles du sommeil, irritabilité, baisse de concentration et, à terme, risque d'épuisement professionnel. Les risques psychosociaux font partie intégrante des risques professionnels que l'employeur doit évaluer et prévenir au titre de son obligation générale de sécurité (article L4121-1 du Code du travail), au même titre que les risques physiques ou chimiques.", "Cette formation permet à chaque participant de comprendre les mécanismes physiologiques et psychologiques du stress, d'identifier ses propres sources de stress professionnel, et de mobiliser des techniques concrètes et applicables immédiatement au quotidien. À l'issue de la session, chaque participant repart avec un plan d'action personnel adapté à sa situation de travail."],
        audience: "Cette formation s'adresse à tout salarié exposé au stress professionnel souhaitant développer des techniques de gestion adaptées à sa situation, quel que soit son poste ou son secteur d'activité. Aucun prérequis n'est nécessaire. Elle est particulièrement recommandée dans les environnements à forte charge mentale ou relationnelle (relation client, encadrement, urgence) et peut être proposée en complément d'une démarche plus large de prévention des risques psychosociaux au sein de l'entreprise.",
        funding: "Cette formation est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences, en tant qu'action de prévention des risques psychosociaux. ENMA Formation vous fournit devis, programme pédagogique et convention de formation pour appuyer votre demande de financement. Elle peut être intégrée à une politique de qualité de vie et des conditions de travail (QVCT) plus globale, en complément d'autres actions de prévention.",
      },
      {
        title: "Premiers secours en santé mentale (PSSM)",
        duration: "4 demi-journées",
        format: "Intra-entreprise",
        description: ["Un collègue en difficulté psychologique ne le montre pas toujours clairement, et l'entourage professionnel se sent souvent démuni face à des signes de souffrance qu'il ne sait pas interpréter. Le programme Premiers Secours en Santé Mentale (PSSM), adaptation française du programme international Mental Health First Aid né en Australie et aujourd'hui déployé dans plus de 25 pays, vise à donner au plus grand nombre les outils pour repérer une souffrance psychique et orienter la personne concernée vers une aide adaptée, sans se substituer à un professionnel de santé.", "À l'issue de la formation, le participant est capable de reconnaître les signes de mal-être ou de crise chez un collègue, un proche ou lui-même, de déconstruire les idées reçues liées à la stigmatisation de la santé mentale, et d'appliquer la méthode AÉRER pour engager un dialogue bienveillant et orienter la personne vers les ressources appropriées."],
        audience: "Cette formation s'adresse à tout salarié, quel que soit son poste ou son niveau hiérarchique, souhaitant être en mesure d'aider un collègue ou un proche traversant une période de souffrance psychique. Aucun prérequis n'est nécessaire, et la formation n'exige aucune compétence préalable en santé mentale. Elle est particulièrement recommandée pour les managers et les représentants du personnel, en première ligne pour repérer les signaux de mal-être au sein des équipes, ainsi que dans le cadre d'une démarche globale de prévention des risques psychosociaux.",
        funding: "Cette formation est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences, en tant qu'action de prévention des risques psychosociaux. ENMA Formation vous fournit devis, programme pédagogique et convention de formation pour appuyer votre demande de financement. Elle s'inscrit pleinement dans une démarche de qualité de vie et des conditions de travail (QVCT) et peut être proposée à l'ensemble des collaborateurs dans le cadre d'une politique de prévention plus large.",
      },
      {
        title: "Prévention de l'absentéisme",
        duration: "2 à 4 demi-journées",
        format: "Intra-entreprise",
        description: ["Un absentéisme qui s'installe coûte cher à l'entreprise, en désorganisation comme en charge supplémentaire pour les équipes en place, et révèle souvent un mal-être plus profond que le simple arrêt maladie ne laisse paraître. Détecté tardivement, il devient un phénomène difficile à inverser ; repéré tôt par l'encadrement de proximité, il peut au contraire être traité à la racine, avant qu'il ne s'ancre durablement dans le fonctionnement d'une équipe.", "Cette formation permet de comprendre les causes multiples de l'absentéisme, de repérer les signaux d'alerte précoces au sein d'une équipe, et de mettre en place des actions de prévention adaptées à l'organisation de l'entreprise. À l'issue de la session, chaque participant est capable de distinguer les différentes formes d'absentéisme et de mobiliser les leviers managériaux appropriés à chaque situation."],
        audience: "Cette formation s'adresse aux managers, encadrants et responsables RH souhaitant prévenir et réduire l'absentéisme au sein de leurs équipes. Une première expérience d'encadrement est recommandée, bien qu'aucun prérequis formel ne soit exigé. Elle s'adresse particulièrement aux entreprises confrontées à un taux d'absentéisme en hausse ou souhaitant structurer une démarche de prévention avant que le phénomène ne s'installe durablement.",
        funding: "Cette formation est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences, en tant qu'action de développement des compétences managériales liées à la prévention. ENMA Formation vous fournit devis, programme pédagogique et convention de formation pour appuyer votre demande de financement. Elle peut être complétée par une formation à la gestion du stress ou aux risques psychosociaux pour une approche globale de la qualité de vie au travail.",
      },
      {
        title: "Sécurité des salariés des entreprises extérieures — Niveau 1",
        duration: "2 demi-journées",
        format: "Intra-entreprise",
        description: ["Sur un site industriel, la coactivité entre l'entreprise utilisatrice et les entreprises extérieures intervenant pour des opérations de maintenance, de travaux ou de prestations constitue une source majeure d'accidents du travail : méconnaissance des risques spécifiques du site, absence de coordination entre les équipes, ou non-respect des consignes locales de sécurité. Le référentiel France Chimie DT40 encadre la formation obligatoire des salariés d'entreprises extérieures intervenant sur des sites industriels, en particulier dans le secteur de la chimie et de la pétrochimie, afin de sécuriser cette coactivité.", "Cette formation de Niveau 1 permet au salarié d'une entreprise extérieure d'identifier les risques propres à un site industriel (chimique, incendie/explosion, électrique, mécanique) et de s'inscrire dans l'organisation de la prévention mise en place par le site accueillant. À l'issue de la session, le participant est capable d'appliquer les règles de sécurité du site, de comprendre les documents encadrant son intervention (plan de prévention, protocole de sécurité) et de réagir de manière adaptée face à une situation dégradée."],
        audience: "Cette formation s'adresse aux salariés d'entreprises extérieures amenés à intervenir sur un site industriel client, notamment dans les secteurs de la chimie, de la pétrochimie ou de l'industrie lourde. Aucun prérequis technique n'est exigé, mais une bonne compréhension des consignes écrites et orales est nécessaire pour appliquer les règles de sécurité propres à chaque site d'intervention. Cette formation de Niveau 1 constitue le socle minimal avant toute intervention sur un site relevant du référentiel France Chimie DT40.",
        funding: "Cette formation est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences, en tant que formation réglementaire de sécurité liée à l'intervention en entreprise extérieure. ENMA Formation vous fournit devis, programme pédagogique et convention de formation pour appuyer votre demande de financement. Elle peut être organisée en amont d'une campagne d'intervention groupée sur un site industriel afin de certifier l'ensemble d'une équipe avant le début des travaux.",
      },
    ],
  },
  {
    title: "Management & qualité",
    description: "ENMA Formation accompagne vos managers et vos équipes sur les compétences relationnelles.",
    trainings: [
      {
        title: "Faire face à l'agressivité et à l'incivilité",
        duration: "Durée à définir",
        format: "Intra-entreprise",
        description: ["Face à un public agressif ou incivil, la première réaction détermine souvent si la situation s'apaise ou s'aggrave : une posture inadaptée peut transformer une simple incivilité en agression physique. Les violences externes, provenant de personnes extérieures à l'entreprise, constituent un risque professionnel à part entière identifié par l'INRS, au même titre que les violences internes, et doivent à ce titre être intégrées à la démarche de prévention de l'entreprise.", "Cette formation permet d'identifier les situations à risque d'agressivité, d'adopter une posture professionnelle sécurisante face à une personne agressive, et d'appliquer les bonnes procédures après un incident. À l'issue de la session, chaque participant est capable de gérer ses propres émotions face à l'agressivité, de maintenir une distance de sécurité physique adaptée, et de déclencher les procédures d'alerte internes le cas échéant."],
        audience: "Cette formation s'adresse à tout salarié en contact avec du public, exposé à un risque d'agressivité ou d'incivilité dans le cadre de son activité : accueil, guichet, service client, intervention à domicile. Aucun prérequis n'est nécessaire. Elle est particulièrement recommandée dans les secteurs où le contact avec le public constitue le cœur de l'activité (commerce, administration, transport, établissements de santé) et peut être adaptée aux situations spécifiques rencontrées par chaque groupe de stagiaires.",
        funding: "Cette formation est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences, en tant qu'action de prévention des risques professionnels liés aux violences externes. ENMA Formation vous fournit devis, programme pédagogique et convention de formation pour appuyer votre demande de financement. Elle peut être construite à partir de scénarios représentatifs des situations réellement rencontrées par vos équipes pour renforcer la pertinence des mises en situation.",
      },
      {
        title: "Gestion des conflits",
        duration: "4 demi-journées",
        format: "Intra-entreprise",
        description: ["Un désaccord mal géré peut vite dégénérer en conflit ouvert, avec des conséquences durables sur l'ambiance de travail, la cohésion d'équipe et parfois la santé des personnes impliquées. Loin d'être une fatalité, le conflit suit une dynamique identifiable, faite de phases successives, qu'il est possible d'apprendre à repérer et à interrompre avant l'escalade. Prévenir les conflits interpersonnels s'inscrit pleinement dans l'obligation de l'employeur de préserver la santé physique et mentale de ses salariés.", "Cette formation permet de comprendre les mécanismes du conflit, de repérer les signaux d'alerte précoces et de mobiliser des techniques de communication concrètes pour désamorcer les tensions avant qu'elles ne s'installent. À l'issue de la session, chaque participant est capable d'identifier la phase dans laquelle se trouve une situation tendue et d'adapter sa posture et son discours en conséquence."],
        audience: "Cette formation s'adresse à tout salarié en relation avec du public ou avec une équipe, exposé à des situations de tension ou de désaccord dans le cadre de son activité (encadrement, relation client, accueil, coordination de projet). Aucun prérequis n'est nécessaire. Elle est particulièrement recommandée aux managers de proximité et aux personnes en contact fréquent avec du public, pour qui la gestion des tensions relationnelles fait partie intégrante de l'activité quotidienne.",
        funding: "Cette formation est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences, en tant qu'action de développement des compétences relationnelles et managériales. ENMA Formation vous fournit devis, programme pédagogique et convention de formation pour appuyer votre demande de financement. Elle peut être organisée en intra-entreprise à partir de situations réellement vécues par vos équipes pour un ancrage pédagogique maximal.",
      },
      {
        title: "Les bases de la sécurité au quotidien",
        duration: "2 demi-journées",
        format: "Intra-entreprise",
        description: ["Le manager de proximité est le premier maillon de la prévention des risques professionnels : c'est lui qui organise le travail au quotidien, qui repère les situations dangereuses avant qu'elles ne deviennent des accidents, et dont l'exemplarité conditionne l'adhésion de son équipe aux règles de sécurité. Pourtant, la sécurité est parfois perçue comme une contrainte annexe plutôt que comme une composante à part entière du rôle managérial, alors même que sa responsabilité civile et pénale peut être engagée en cas d'accident.", "Cette formation permet au manager d'intégrer pleinement la sécurité dans sa pratique managériale quotidienne : connaître ses obligations réglementaires, savoir évaluer et prévenir les risques de son équipe, et animer une véritable culture sécurité au sein de son périmètre. À l'issue de la session, le manager est capable de mobiliser les outils de prévention adaptés à son équipe et d'incarner l'exemplarité attendue de son rôle."],
        audience: "Cette formation s'adresse aux managers et encadrants de proximité souhaitant intégrer la sécurité dans leur pratique managériale quotidienne, quel que soit leur secteur d'activité. Aucun prérequis n'est nécessaire, bien qu'une première expérience d'encadrement facilite l'appropriation des concepts abordés. Elle est particulièrement recommandée pour les nouveaux managers découvrant leurs responsabilités en matière de sécurité, ainsi que pour tout encadrant souhaitant structurer sa démarche de prévention.",
        funding: "Cette formation est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences, en tant qu'action de développement des compétences managériales liées à la sécurité. ENMA Formation vous fournit devis, programme pédagogique et convention de formation pour appuyer votre demande de financement. Elle peut être intégrée à un parcours d'intégration pour tout nouveau manager prenant la responsabilité d'une équipe.",
      },
    ],
  },
  {
    title: "Photovoltaïque",
    description: "ENMA Formation forme les professionnels du solaire aux compétences techniques du photovoltaïque.",
    trainings: [
      {
        title: "Bureau d'études technique photovoltaïque",
        duration: "10 demi-journées",
        format: "Intra-entreprise",
        description: ["Un projet photovoltaïque mal dimensionné dès le bureau d'études compromet sa rentabilité pour des années : sous-dimensionnement qui limite la production, surdimensionnement qui alourdit l'investissement sans gain proportionnel, ou choix techniques inadaptés aux contraintes du site. La phase d'étude conditionne la totalité du cycle de vie de l'installation, bien avant la pose du premier module, et constitue le principal levier de maîtrise du risque technique et financier d'un projet.", "Cette formation couvre l'ensemble de la démarche du bureau d'études technique appliquée aux installations photovoltaïques : contexte technique, réglementaire et économique, calculs de dimensionnement, conception de l'installation et montage du dossier. À l'issue de la session, le participant est capable de conduire une étude complète, du cahier des charges client jusqu'au dossier financier et administratif finalisé."],
        audience: "Cette formation s'adresse aux chargés d'études, chargés de projet et référents techniques d'entreprises d'installation photovoltaïque souhaitant structurer ou approfondir leur démarche d'étude. Des bases en électricité et en calcul technique sont utiles pour suivre les séquences de dimensionnement dans de bonnes conditions, sans constituer un prérequis strict. Elle est particulièrement adaptée aux entreprises souhaitant internaliser tout ou partie de leurs études techniques plutôt que de les sous-traiter.",
        funding: "Cette formation est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences, en tant que formation technique liée au développement d'une activité photovoltaïque. ENMA Formation vous fournit devis, programme pédagogique et convention de formation pour appuyer votre demande de financement. Elle peut être construite à partir d'un cahier des charges réel issu de votre activité pour un ancrage pédagogique maximal.",
      },
      {
        title: "Chiffrage et dimensionnement",
        duration: "4 demi-journées",
        format: "Intra-entreprise",
        description: ["Un mauvais chiffrage peut transformer un projet photovoltaïque rentable en gouffre financier : sous-estimation des coûts de pose ou de raccordement, surestimation de la production attendue, ou choix d'équipements mal dimensionnés par rapport aux besoins réels du client. Dans un marché où la concurrence sur les devis est forte, la précision du chiffrage constitue à la fois un argument commercial et une protection contre les mauvaises surprises en cours de chantier.", "Cette formation couvre l'ensemble de la chaîne allant du calcul de production au chiffrage financier final : estimation du productible, dimensionnement technique des équipements, construction d'un devis chiffré et analyse de rentabilité. À l'issue de la session, le participant est capable de produire un chiffrage fiable et argumenté pour tout type d'installation photovoltaïque."],
        audience: "Cette formation s'adresse aux chargés d'affaires et techniciens amenés à chiffrer et dimensionner des installations photovoltaïques dans le cadre de leur activité commerciale ou technique. Des bases en électricité sont utiles mais ne constituent pas un prérequis strict, la formation reprenant les notions essentielles nécessaires au calcul. Elle est particulièrement recommandée pour les équipes commerciales souhaitant gagner en autonomie sur l'établissement des devis techniques.",
        funding: "Cette formation est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences, en tant que formation technique liée au développement d'une activité photovoltaïque. ENMA Formation vous fournit devis, programme pédagogique et convention de formation pour appuyer votre demande de financement. Elle peut être complétée par la formation Bureau d'études technique photovoltaïque pour les profils souhaitant approfondir la conception complète d'un projet.",
      },
      {
        title: "Contrôle par électroluminescence",
        duration: "Nous consulter",
        format: "Intra-entreprise",
        description: ["Une microfissure invisible à l'œil nu peut réduire la performance d'un module photovoltaïque pendant toute sa durée de vie sans jamais être détectée à temps par une simple inspection visuelle. Ces défauts, souvent liés au transport, au stockage ou à un défaut de fabrication, peuvent entraîner une perte de production significative voire l'apparition de points chauds (hot spots) présentant un risque d'incendie à moyen terme.", "Cette formation enseigne la technique de contrôle qualité par électroluminescence (EL), méthode non destructive qui révèle l'intérieur de la cellule photovoltaïque à la manière d'une radiographie. À l'issue de la session, le participant est capable de mettre en œuvre un contrôle EL sur site ou en atelier, d'interpréter les images obtenues pour distinguer un module sain d'un module défectueux, et de rédiger un compte-rendu de contrôle exploitable."],
        audience: "Cette formation s'adresse aux techniciens et installateurs amenés à contrôler la qualité de modules photovoltaïques, que ce soit à la réception d'une livraison, en cours de garantie ou dans le cadre d'une opération de maintenance. Aucun prérequis technique poussé n'est exigé, une connaissance de base des installations photovoltaïques étant suffisante pour suivre la formation. Elle est particulièrement recommandée pour les entreprises réalisant des contrôles qualité réguliers sur leurs propres installations ou pour le compte de tiers.",
        funding: "Cette formation est éligible à une prise en charge par votre OPCO au titre du plan de développement des compétences, en tant que formation technique liée au développement d'une activité photovoltaïque. ENMA Formation vous fournit devis, programme pédagogique et convention de formation pour appuyer votre demande de financement. Elle peut être organisée avec votre propre matériel de contrôle si vous en disposez déjà, afin d'ancrer la formation dans vos conditions réelles d'utilisation.",
      },
    ],
  },
  {
    title: "Collectivités et élus",
    description: "ENMA Formation accompagne les élus et les agents de la fonction publique territoriale dans leurs missions.",
    trainings: [
      {
        title: "Fonctions de l'élu",
        duration: "2 demi-journées",
        format: "Intra-entreprise",
        description: ["Débuter un mandat municipal, c'est intégrer en quelques semaines un fonctionnement institutionnel complexe : répartition des rôles au sein de l'équipe municipale, articulation avec l'intercommunalité, le Département, la Région et les services de l'État, sans oublier les responsabilités personnelles engagées par la fonction. Le Code général des collectivités territoriales reconnaît d'ailleurs à chaque élu un droit à la formation, financé par le DIFE, précisément pour lui permettre d'exercer son mandat en pleine connaissance de ses droits, devoirs et responsabilités.", "Cette formation permet à l'élu de bien débuter ou de consolider son mandat en clarifiant l'organisation de l'équipe municipale, le cadre institutionnel dans lequel s'inscrit l'action communale, et l'étendue de ses responsabilités personnelles. À l'issue de la session, le participant est capable de situer le rôle de chaque élu dans l'organisation municipale, de distinguer les responsabilités pénale, civile et politique, et d'adopter une posture d'exemplarité dans sa relation avec les habitants et les agents municipaux."],
        audience: "Cette formation s'adresse aux élus municipaux nouvellement élus souhaitant bien démarrer leur mandat, ainsi qu'aux élus en cours de mandat souhaitant consolider leur pratique institutionnelle. Aucun prérequis n'est nécessaire. Elle est particulièrement recommandée en tout début de mandat, dans les premiers mois suivant l'élection, période durant laquelle les nouveaux élus doivent rapidement s'approprier un grand nombre de notions institutionnelles et juridiques.",
        funding: "Cette formation est éligible au Droit Individuel à la Formation des Élus (DIFE), financé par une cotisation obligatoire prélevée sur les indemnités de fonction et mutualisée au niveau national, indépendamment du budget formation de la collectivité. ENMA Formation vous accompagne dans les démarches administratives liées à la mobilisation du DIFE. Elle constitue un excellent point de départ pour tout élu souhaitant construire progressivement son parcours de formation sur la durée du mandat.",
      },
      {
        title: "Gestes et postures de l'élu",
        duration: "1 à 2 demi-journées",
        format: "Intra-entreprise",
        description: ["Un mandat électif s'accompagne de sollicitations physiques souvent sous-estimées : réunions à rallonge en position assise prolongée, déplacements fréquents, stations debout lors d'inaugurations ou de cérémonies, prises de parole répétées. Contrairement à une idée reçue, l'exercice d'un mandat local n'est pas exempt de contraintes physiques, et ces sollicitations cumulées sur la durée d'un mandat peuvent générer fatigue chronique et troubles musculosquelettiques si elles ne sont pas anticipées.", "Cette sensibilisation aide l'élu à préserver sa santé physique tout au long de son mandat, en identifiant les situations à risque propres à son activité et en adoptant les postures et l'organisation adaptées. À l'issue de la formation, le participant est capable de repérer les sollicitations physiques de son quotidien d'élu, d'appliquer les principes d'économie d'effort adaptés, et de mieux gérer sa fatigue face à un emploi du temps souvent chargé."],
        audience: "Cette formation s'adresse aux élus municipaux souhaitant préserver leur santé physique dans l'exercice de leur mandat, quel que soit leur niveau de responsabilité (maire, adjoint, conseiller municipal). Aucun prérequis n'est nécessaire. Elle est particulièrement recommandée en début de mandat, période où les nouvelles sollicitations physiques liées à la fonction ne sont pas encore anticipées, mais reste utile à tout moment du mandat pour ajuster ses habitudes.",
        funding: "Cette formation est éligible au Droit Individuel à la Formation des Élus (DIFE), un droit personnel attaché à chaque élu local et indépendant du budget formation de la collectivité. ENMA Formation vous accompagne dans les démarches administratives liées à la mobilisation du DIFE, de l'inscription sur la plateforme dédiée jusqu'à la validation de la prise en charge. Cette formation peut être suivie de manière individuelle ou organisée collectivement pour plusieurs élus d'une même collectivité.",
      },
      {
        title: "Maîtriser la création d'un dossier de candidature à un appel d'offres public",
        duration: "Durée à définir",
        format: "Intra-entreprise",
        description: ["Un dossier de candidature incomplet ou mal ficelé peut disqualifier une offre pourtant compétitive dès le premier tri administratif, avant même que le contenu technique ou financier de la proposition ne soit examiné. La commande publique obéit à un formalisme strict, encadré par le Code de la commande publique, où le non-respect d'une pièce attendue ou d'un délai de remise peut suffire à écarter une candidature par ailleurs pertinente.", "Cette formation permet de comprendre la procédure de la commande publique, de réunir les pièces nécessaires à une candidature recevable, et de présenter une offre complète et convaincante. À l'issue de la session, le participant est capable d'analyser un avis de marché, de constituer un dossier de candidature complet incluant le mémoire technique, et de sécuriser sa candidature face aux points de vigilance les plus fréquents."],
        audience: "Cette formation s'adresse aux élus et agents territoriaux impliqués dans la réponse à des appels d'offres publics, que ce soit du côté de la collectivité qui lance la consultation ou du côté d'une structure candidate à un marché public. Aucun prérequis juridique n'est nécessaire, la formation reprenant les notions essentielles de la commande publique. Elle est particulièrement recommandée pour toute personne découvrant la procédure de réponse aux marchés publics ou souhaitant structurer sa pratique.",
        funding: "Cette formation est éligible au Droit Individuel à la Formation des Élus (DIFE) pour les élus locaux concernés. ENMA Formation vous accompagne dans les démarches administratives liées à la mobilisation du DIFE, de l'inscription sur la plateforme dédiée jusqu'à la validation de la prise en charge. Pour les agents territoriaux, d'autres dispositifs de financement de la formation professionnelle peuvent être mobilisés : n'hésitez pas à nous consulter pour identifier la solution adaptée à votre situation.",
      },
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
