const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const backToTopLink = document.getElementById("back-to-top");
const langEnButton = document.getElementById("lang-en");
const langDaButton = document.getElementById("lang-da");
const descriptionMeta = document.querySelector('meta[name="description"]');
const ogTitleMeta = document.querySelector('meta[property="og:title"]');
const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');

const sectionMap = new Map(
  navLinks
    .map((link) => {
      const id = link.getAttribute("href")?.replace("#", "");
      if (!id) {
        return null;
      }
      const section = document.getElementById(id);
      if (!section) {
        return null;
      }
      return [section, link];
    })
    .filter(Boolean)
);

const translations = {
  en: {
    htmlLang: "en",
    pageTitle: "Veronica Frydkjaer | Governance, Risk, and Compliance",
    metaDescription:
      "Governance, Risk, and Compliance professional focused on ISO 27001, NIST 800-53, CIS18, and practical IT security management.",
    ogTitle: "Veronica Frydkjaer | GRC Professional",
    skipLink: "Skip to main content",
    nav: {
      about: "About",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
      education: "Education",
      volunteering: "Volunteering",
      contact: "Contact"
    },
    hero: {
      title: "I help organizations mature IT security governance and risk management",
      lead1:
        "I am a structured and thorough GRC professional based in Copenhagen, with hands-on experience in risk assessments, compliance gap analysis, and implementation of practical controls. I am especially strong in written communication and management reporting, and I enjoy translating technical security work into clear decisions for leadership and cross-functional teams.",
      lead2:
        "Outside work and studies, I read technical literature regularly and stay active in volunteer communities. These experiences strengthen my communication style, empathy, and teamwork when collaborating across organizations.",
      connectButton: "Connect With Me",
      resumeEnButton: "Download Resume (EN)",
      resumeDaButton: "Download Resume (DA)"
    },
    experience: {
      title: "Experience",
      role1: "Student Worker",
      meta1: "The LEGO Group | Jan 2024 - Jan 2026",
      item11:
        "Assessed compliance with CIS18 Control 5 (IAM) and conducted an ISO 27005 risk assessment using STRIDE and attack trees as part of my bachelor thesis.",
      item12:
        "Facilitated cross-functional meetings where teams presented ongoing projects and dependencies to each other.",
      item13:
        "Wrote and distributed a department newsletter highlighting team deliverables and progress.",
      item14:
        "Developed a technical solution that reduced debugging time when Kubernetes clusters unintentionally changed egress IP.",
      role2: "Student Worker",
      meta2: "Tech Chapter (DevSecOps Consultancy) | Jun 2025 - Dec 2025",
      item21:
        "Performed gap analysis against CIS18 and NIST 800-53, prepared implementation plans, and advised executive management through concise reports and presentations.",
      item22:
        "Implemented outstanding NIST 800-53 controls through automated access review, an emergency break-glass script, and a phishing-campaign tool.",
      item23:
        "Presented implementation outcomes to executive management and improved compliance with a strategic customer's control requirements."
    },
    skillsTitle: "Skills",
    skillsAriaLabel: "Core professional skills",
    skills: [
      "Risk Management",
      "ISO 27001",
      "ISO 27002",
      "ISO 27005",
      "CIS18",
      "NIST 800-53",
      "ISMS",
      "Statement of Applicability (SoA)",
      "Compliance Report Writing",
      "Compliance Gap Analysis",
      "Threat Analysis",
      "Risk Matrix and Heat Maps",
      "Risk Appetite and Tolerance",
      "Mitigation Planning",
      "Contingency and Business Continuity Planning"
    ],
    projects: {
      title: "Projects",
      title1: "ISO 27005 Risk Assessment Thesis",
      body1:
        "Assessed CIS18 Control 5 (IAM) and performed a structured ISO 27005 risk assessment with STRIDE and attack trees to document threats, risks, and treatment priorities.",
      title2: "NIST 800-53 Control Implementation",
      body2:
        "Implemented practical controls including automated access reviews, an emergency break-glass script, and a phishing-campaign tool to close identified compliance gaps.",
      title3: "Kubernetes Egress IP Debugging Solution",
      body3:
        "Built a technical solution that reduced debugging time when cluster egress IP changes caused unexpected connectivity issues."
    },
    education: {
      title: "Education",
      role: "BA in IT Security",
      meta: "Copenhagen Business Academy | Aug 2022 - Jan 2026 | GPA: 11.8",
      item1:
        "Worked with CIS18, ISO 27001, ISO 27002, and ISO 27005 in realistic cases, presentations, exam projects, and the bachelor project.",
      item2:
        "Built practical competence in ISMS, SoA, asset classification, risk treatment and monitoring, and business continuity planning.",
      item3:
        "Worked with GDPR, ISO 27701, and ISO 27018, plus incident response and contingency planning.",
      item4:
        "Completed governance coursework focused on short and precise reporting for management."
    },
    volunteering: {
      title: "Volunteering",
      item1: "Coding Pirates Tutor • Coding Pirates Visma København (Mar 2026 - Present) — Teaching game programming in Scratch to children.",
      item2: "Barista • Ten Pillars of Coffee (Mar 2025 - Dec 2025)",
      item3: "Facilities Maintenance • Scandinavian Yoga And Meditation School (Mar 2026 - Present)"
    },
    contact: {
      title: "Contact",
      phoneLabel: "Phone",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      locationLabel: "Location",
      locationValue: "Valby, Copenhagen"
    },
    backToTop: "Back to top"
  },
  da: {
    htmlLang: "da",
    pageTitle: "Veronica Frydkjaer | Governance, Risiko og Compliance",
    metaDescription:
      "GRC-profil med fokus på ISO 27001, NIST 800-53, CIS18 og praktisk it-sikkerhedsledelse.",
    ogTitle: "Veronica Frydkjaer | GRC Profil",
    skipLink: "Spring til hovedindhold",
    nav: {
      about: "Om mig",
      experience: "Erfaring",
      skills: "Kompetencer",
      projects: "Projekter",
      education: "Uddannelse",
      volunteering: "Frivillighed",
      contact: "Kontakt"
    },
    hero: {
      title: "Jeg modner governance og risikostyring inden for it-sikkerhed",
      lead1:
        "Jeg er en struktureret og grundig GRC-profil i København med hands-on erfaring i risikovurderinger, compliance gap analysis og implementering af praktiske kontroller. Jeg er særligt stærk i skriftlig kommunikation og ledelsesrapportering, og jeg trives med at omsætte teknisk sikkerhedsarbejde til klare beslutningsoplæg.",
      lead2:
        "Uden for arbejde og studier læser jeg meget faglitteratur og er aktiv i frivillige fællesskaber. Det styrker min kommunikation, empati og samarbejdsevne på tværs af teams.",
      connectButton: "Kontakt mig",
      resumeEnButton: "Download CV (EN)",
      resumeDaButton: "Download CV (DA)"
    },
    experience: {
      title: "Erfaring",
      role1: "Studentermedhjælper",
      meta1: "The LEGO Group | jan 2024 - jan 2026",
      item11:
        "Vurderede efterlevelse af CIS18 kontrol 5 (IAM) og gennemførte en ISO 27005-risikovurdering med STRIDE og attack trees som trusselsanalyse i bachelorprojektet.",
      item12:
        "Faciliterede tværgående møder, hvor teams præsenterede igangværende projekter og afhængigheder for hinanden.",
      item13:
        "Skrev og udsendte et nyhedsbrev, der synliggjorde teamets leverancer i afdelingen.",
      item14:
        "Udviklede en teknisk løsning, der reducerede debugging-tid ved utilsigtede ændringer af egress IP i Kubernetes-clustre.",
      role2: "Studentermedhjælper",
      meta2: "Tech Chapter (DevSecOps-konsulenthus) | jun 2025 - dec 2025",
      item21:
        "Udførte 2. forsvarslinjes gap analysis af CIS18 og NIST 800-53, udarbejdede implementeringsplaner og rådgav direktionen gennem præcise rapporter og præsentationer.",
      item22:
        "Implementerede udestående NIST 800-53-kontroller gennem automatiseret access review, et emergency break-glass script og et phishing-kampagneværktøj.",
      item23:
        "Præsenterede resultaterne for direktionen, hvilket øgede compliance med en strategisk storkundes kontrolkrav."
    },
    skillsTitle: "Kompetencer",
    skillsAriaLabel: "Kernekompetencer",
    skills: [
      "Risikohåndtering",
      "ISO 27001",
      "ISO 27002",
      "ISO 27005",
      "CIS18",
      "NIST 800-53",
      "ISMS",
      "Statement of Applicability (SoA)",
      "Compliance-rapportskrivning",
      "Compliance gap analysis",
      "Trusselsanalyse",
      "Risikomatrix og heat maps",
      "Risikoappetit og tolerance",
      "Mitigeringsplaner",
      "Beredskabs- og business continuity-planer"
    ],
    projects: {
      title: "Projekter",
      title1: "ISO 27005-risikovurdering (bachelorprojekt)",
      body1:
        "Vurderede CIS18 kontrol 5 (IAM) og gennemførte en struktureret ISO 27005-risikovurdering med STRIDE og attack trees for at dokumentere trusler, risici og behandlingsprioriteter.",
      title2: "Implementering af NIST 800-53-kontroller",
      body2:
        "Implementerede praktiske kontroller som automatiseret access review, emergency break-glass script og phishing-kampagneværktøj for at lukke identificerede compliance-gaps.",
      title3: "Kubernetes egress IP-fejlfindingsløsning",
      body3:
        "Udviklede en teknisk løsning, der reducerede debugging-tiden ved ændringer i clusteres egress IP og deraf følgende forbindelsesproblemer."
    },
    education: {
      title: "Uddannelse",
      role: "BA i IT-sikkerhed",
      meta: "Erhvervsakademi København | aug 2022 - jan 2026 | Karaktersnit: 11,8",
      item1:
        "Arbejdede dybdegående med CIS18, ISO 27005, ISO 27001 og ISO 27002 i virkelighedsnære cases, præsentationer, eksamensprojekter og bachelorprojekt.",
      item2:
        "Opbyggede praktisk erfaring med ISMS, SoA, asset-klassificering, risikobehandling og overvågning samt beredskabs- og business continuity-planer.",
      item3:
        "Arbejdede med GDPR, ISO 27701 og ISO 27018 samt incident response og beredskabsarbejde.",
      item4:
        "Governance-kursus med fokus på korte, præcise rapporter til ledelsen samt aktiv i studiejobs og frivillige foreninger."
    },
    volunteering: {
      title: "Frivillighed",
      item1: "Coding Pirates Tutor • Coding Pirates Visma København (mar 2026 - nu) — Undervisning i spilprogrammering i Scratch til børn.",
      item2: "Barista • Ten Pillars of Coffee (mar 2025 - dec 2025)",
      item3: "Facilitetsvedligeholdelse • Scandinavian Yoga And Meditation School (mar 2026 - nu)"
    },
    contact: {
      title: "Kontakt",
      phoneLabel: "Telefon",
      emailLabel: "E-mail",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      locationLabel: "Lokation",
      locationValue: "Valby, København"
    },
    backToTop: "Til toppen"
  }
};

function setText(id, text) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = text;
  }
}

function renderSkills(items) {
  const skillsList = document.getElementById("skills-list");
  if (!skillsList) {
    return;
  }

  skillsList.innerHTML = "";
  items.forEach((item) => {
    const skill = document.createElement("span");
    skill.setAttribute("role", "listitem");
    skill.textContent = item;
    skillsList.appendChild(skill);
  });
}

function updateLanguageButtonState(language) {
  if (langEnButton) {
    const isEnglish = language === "en";
    langEnButton.classList.toggle("active", isEnglish);
    langEnButton.setAttribute("aria-pressed", String(isEnglish));
  }

  if (langDaButton) {
    const isDanish = language === "da";
    langDaButton.classList.toggle("active", isDanish);
    langDaButton.setAttribute("aria-pressed", String(isDanish));
  }
}

function applyLanguage(language) {
  const selectedLanguage = translations[language] ? language : "en";
  const t = translations[selectedLanguage];

  document.documentElement.lang = t.htmlLang;
  document.title = t.pageTitle;

  if (descriptionMeta) {
    descriptionMeta.setAttribute("content", t.metaDescription);
  }
  if (ogTitleMeta) {
    ogTitleMeta.setAttribute("content", t.ogTitle);
  }
  if (ogDescriptionMeta) {
    ogDescriptionMeta.setAttribute("content", t.metaDescription);
  }

  setText("skip-link", t.skipLink);
  setText("nav-about", t.nav.about);
  setText("nav-experience", t.nav.experience);
  setText("nav-skills", t.nav.skills);
  setText("nav-projects", t.nav.projects);
  setText("nav-education", t.nav.education);
  setText("nav-volunteering", t.nav.volunteering);
  setText("nav-contact", t.nav.contact);

  setText("hero-title", t.hero.title);
  setText("hero-lead-1", t.hero.lead1);
  setText("hero-lead-2", t.hero.lead2);
  setText("connect-button", t.hero.connectButton);
  setText("resume-en-button", t.hero.resumeEnButton);
  setText("resume-da-button", t.hero.resumeDaButton);

  setText("experience-title", t.experience.title);
  setText("exp-1-role", t.experience.role1);
  setText("exp-1-meta", t.experience.meta1);
  setText("exp-1-item-1", t.experience.item11);
  setText("exp-1-item-2", t.experience.item12);
  setText("exp-1-item-3", t.experience.item13);
  setText("exp-1-item-4", t.experience.item14);
  setText("exp-2-role", t.experience.role2);
  setText("exp-2-meta", t.experience.meta2);
  setText("exp-2-item-1", t.experience.item21);
  setText("exp-2-item-2", t.experience.item22);
  setText("exp-2-item-3", t.experience.item23);

  setText("skills-title", t.skillsTitle);
  const skillsList = document.getElementById("skills-list");
  if (skillsList) {
    skillsList.setAttribute("aria-label", t.skillsAriaLabel);
  }
  renderSkills(t.skills);

  setText("projects-title", t.projects.title);
  setText("project-1-title", t.projects.title1);
  setText("project-1-body", t.projects.body1);
  setText("project-2-title", t.projects.title2);
  setText("project-2-body", t.projects.body2);
  setText("project-3-title", t.projects.title3);
  setText("project-3-body", t.projects.body3);

  setText("education-title", t.education.title);
  setText("edu-role", t.education.role);
  setText("edu-meta", t.education.meta);
  setText("edu-item-1", t.education.item1);
  setText("edu-item-2", t.education.item2);
  setText("edu-item-3", t.education.item3);
  setText("edu-item-4", t.education.item4);

  setText("volunteering-title", t.volunteering.title);
  setText("vol-1", t.volunteering.item1);
  setText("vol-2", t.volunteering.item2);
  setText("vol-3", t.volunteering.item3);

  setText("contact-title", t.contact.title);
  setText("contact-phone-label", t.contact.phoneLabel);
  setText("contact-email-label", t.contact.emailLabel);
  setText("contact-linkedin-label", t.contact.linkedinLabel);
  setText("contact-github-label", t.contact.githubLabel);
  setText("contact-location-label", t.contact.locationLabel);
  setText("contact-location-value", t.contact.locationValue);

  setText("back-to-top", t.backToTop);

  updateLanguageButtonState(selectedLanguage);
  localStorage.setItem("site-language", selectedLanguage);
}

if (langEnButton) {
  langEnButton.addEventListener("click", () => applyLanguage("en"));
}

if (langDaButton) {
  langDaButton.addEventListener("click", () => applyLanguage("da"));
}

const savedLanguage = localStorage.getItem("site-language");
applyLanguage(savedLanguage || "en");

if (backToTopLink) {
  backToTopLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Ensure reload keeps the page at the top.
    if ("replaceState" in history) {
      history.replaceState(null, "", `${window.location.pathname}${window.location.search}#top`);
    } else {
      window.location.hash = "top";
    }
  });
}

if (sectionMap.size > 0 && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const relatedLink = sectionMap.get(entry.target);
        if (!relatedLink) {
          return;
        }
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove("active"));
          relatedLink.classList.add("active");
        }
      });
    },
    {
      threshold: 0.45,
      rootMargin: "-20% 0px -45% 0px"
    }
  );

  sectionMap.forEach((_, section) => observer.observe(section));
}
