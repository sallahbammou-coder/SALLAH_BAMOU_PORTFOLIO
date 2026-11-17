export const email = 'sallahbamou@gmail.com';
export const phone = { text: '07 51 17 87 44', href: '+33751178744' };
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const asset = (path:string) => basePath+path;
export const cv = asset('/Sallah-Bamou-CV.pdf');
export const locales = ['fr','en'] as const;
export type Locale = typeof locales[number];
export type Bi = [string,string];
export const tr = (s:Bi,l:Locale) => s[l==='fr'?0:1];
export const experience: { name:string; role:Bi; place:Bi; dates:Bi; detail:Bi[] }[] = [
  { name:'Benjelloun Consulting Audit & Expertise', role:['Auditeur junior','Junior auditor'], place:['Tanger, Maroc','Tangier, Morocco'], dates:['Jan. – juil. 2026','Jan – Jul 2026'], detail:[
    ['Réalisation de revues analytiques, de tests de contrôle interne et de tests substantifs sur les cycles comptables.','Performed analytical reviews, internal control testing and substantive procedures across accounting cycles.'],
    ['Vérification de la cohérence des états financiers avec les balances comptables et les pièces justificatives.','Checked financial statements against trial balances and supporting documents.'],
    ['Planification des missions, élaboration du programme de travail et documentation des constats d’audit.','Planned engagements, prepared work programmes and documented audit observations.']
  ]},
  { name:'UR Global Maroc', role:['Comptable junior','Junior accountant'], place:['Tanger, Maroc','Tangier, Morocco'], dates:['Jan. – juil. 2025','Jan – Jul 2025'], detail:[
    ['Tenue de la comptabilité générale et production des états financiers et des déclarations fiscales et sociales.','Maintained the general ledger and produced financial statements and tax and social security declarations.'],
    ['Élaboration des reportings financiers mensuels et des tableaux de bord pour la direction.','Prepared monthly financial reports and management dashboards.'],
    ['Analyse des coûts, des marges, de la rentabilité et des écarts budgétaires.','Analysed costs, margins, profitability and budget variances.']
  ]},
  { name:'Cabinet Fiduciaire', role:['Assistant comptable','Accounting assistant'], place:['Tinghir, Maroc','Tinghir, Morocco'], dates:['Jan. – avr. 2024','Jan – Apr 2024'], detail:[
    ['Saisie et traitement des pièces comptables, factures, relevés bancaires et notes de frais.','Recorded and processed supporting documents, invoices, bank statements and expense claims.'],
    ['Lettrage des comptes clients et fournisseurs et rapprochements bancaires.','Matched customer and supplier transactions and performed bank reconciliations.'],
    ['Contribution à la fiabilité des données financières à l’aide de logiciels comptables.','Helped improve the integrity of financial data using accounting software.']
  ]}
];
export const education: { dates:Bi; school:string; location:string; title:Bi }[] = [
  {dates:['2026 – en cours','2026 – present'],school:'ESC Pau Business School',location:'Pau, France',title:['Master 1 Programme Grande École · Audit et Expertise Comptable','Master 1 Grande École programme · Audit and Accounting Expertise']},
  {dates:['2024 – 2026','2024 – 2026'],school:'ENCG Tanger',location:'Tanger, Maroc',title:['Diplôme en Audit et Contrôle de Gestion','Degree in Audit and Management Control']},
  {dates:['2023 – 2024','2023 – 2024'],school:'ENCG Oujda',location:'Oujda, Maroc',title:['Troisième année en Audit et Contrôle de Gestion','Third year in Audit and Management Control']},
  {dates:['2021 – 2023','2021 – 2023'],school:'Classes Préparatoires Économiques',location:'Ouarzazate, Maroc',title:['CPGE Économie','Preparatory classes in Economics']},
  {dates:['2019 – 2021','2019 – 2021'],school:'Lycée Hassan II',location:'Tinjdad, Maroc',title:['Baccalauréat Sciences Économiques et Gestion','Baccalaureate in Economics and Management']}
];
export const skills: { name:Bi; items:Bi[]; evidence:{label:Bi; target:string}[] }[] = [
 {name:['Audit financier','Financial audit'],items:[['Planification et documentation','Planning and documentation'],['Contrôle interne et tests substantifs','Internal control and substantive testing'],['Analyse des risques et revues analytiques','Risk assessment and analytical reviews']],evidence:[{label:['Mission chez Benjelloun','Benjelloun engagement'],target:'#experience-1'},{label:['Audit de deux entreprises','Two-company audit'],target:'#projet-audit-deux-entreprises'}]},
 {name:['Comptabilité & fiscalité','Accounting & taxation'],items:[['Comptabilité générale et clôture','General accounting and closing'],['Rapprochements et états financiers','Reconciliation and financial statements'],['TVA, fiscalité et paie','VAT, taxation and payroll']],evidence:[{label:['Gestion comptable complète','End-to-end accounting'],target:'#projet-gestion-comptable'},{label:['Mission chez UR Global','UR Global engagement'],target:'#experience-2'}]},
 {name:['Analyse & pilotage','Analysis & management control'],items:[['Analyse financière, coûts et marges','Financial analysis, costs and margins'],['Suivi budgétaire','Budget monitoring'],['Reporting et tableaux de bord','Reporting and dashboards']],evidence:[{label:['Mission chez UR Global','UR Global engagement'],target:'#experience-2'}]},
 {name:['Outils & données','Tools & data'],items:[['Excel avancé','Advanced Excel'],['Sage Comptabilité et Sage Paie','Sage Accounting and Sage Payroll'],['Traitement des données ; intérêt pour l’automatisation et la Business Intelligence','Data processing; interest in automation and business intelligence']],evidence:[{label:['Travaux en cabinet fiduciaire','Accounting firm experience'],target:'#experience-3'}]},
 {name:['Langues','Languages'],items:[['Arabe · langue maternelle','Arabic · native'],['Français · courant','French · fluent'],['Anglais · opérationnel','English · working proficiency'],['Espagnol · débutant','Spanish · beginner']],evidence:[]}
];

