import type {Bi} from './profile';
export type Step = {label:Bi; info:Bi};
export type Project = {slug:string; code:string; title:Bi; caption:Bi; fields:[Bi,Bi,Bi,Bi,Bi,Bi,Bi]; steps:Step[]};
const step = (a:string,b:string,c:string,d:string):Step => ({label:[a,b],info:[c,d]});
export const projects:Project[] = [
{
slug:'gestion-comptable',code:'LEDGER', title:["Gestion comptable complète d’une entreprise","End-to-end company accounting"],
caption:['Comptabilité · Fiscalité · Projet académique','Accounting · Taxation · Academic project'],
fields:[
['Projet pratique couvrant le cycle comptable, de la pièce justificative aux travaux de fin d’exercice.','Practical project spanning the accounting cycle, from supporting documents to year-end work.'],
['Transformer des pièces de nature différente en comptes cohérents et exploitables pour préparer la TVA.','Turn different types of supporting documents into coherent accounts that can inform a VAT return.'],
['J’ai traité les pièces, enregistré les opérations, vérifié les comptes et préparé la déclaration de TVA dans le cadre du projet.','I processed documents, recorded transactions, checked accounts and prepared the VAT return as part of the project.'],
['Identifier la nature de chaque opération, contrôler l’imputation, rapprocher les écritures des justificatifs et revoir les soldes.','Identify each transaction type, check postings, reconcile entries with evidence and review balances.'],
['Comptabilité générale, contrôle des comptes, TVA et travaux de clôture.','General accounting, account review, VAT and closing work.'],
['Écritures et comptes revus, préparation de la déclaration de TVA et travaux de clôture du dossier.','Reviewed entries and accounts, VAT return preparation and year-end working papers.'],
['Un solde est plus facile à expliquer quand on peut remonter jusqu’à la pièce et à la décision d’imputation.','A balance is easier to explain when it can be traced to the original document and posting decision.']],
steps:[
step('Facture','Invoice','Identifier la nature de la dépense ou de la recette et relever la date, la base et la TVA.','Identify the expense or revenue and record the date, tax base and VAT.'),
step('Écriture','Entry','Choisir les comptes et enregistrer l’opération avec sa référence.','Select the accounts and record the transaction with its reference.'),
step('Grand livre','Ledger','Retrouver l’écriture dans le compte et suivre l’évolution du solde.','Trace the entry to the ledger account and track its balance.'),
step('Vérification','Review','Revenir à la pièce et vérifier les imputations et les soldes.','Return to the document and check postings and balances.'),
step('Déclaration TVA','VAT return','Rapprocher les éléments de TVA avec les comptes pour préparer la déclaration.','Reconcile VAT data to the accounting records to prepare the return.')]
},{
slug:'audit-deux-entreprises',code:'DUAL',title:['Audit financier de deux entreprises de secteurs différents','Financial audit of two companies in different industries'],
caption:['Audit financier · Projet de formation','Financial audit · Training project'],
fields:[
['Mise en pratique d’une démarche d’audit sur deux entreprises de secteurs différents, non précisés dans le brief.','Practical audit training using two companies from different industries; the industries were not specified in the brief.'],
['Adapter les travaux à deux environnements tout en gardant une démarche d’audit comparable.','Adapt the work to different environments while maintaining a consistent audit approach.'],
['J’ai participé à la compréhension des entreprises, à l’évaluation des risques, à la revue des contrôles et aux travaux sur les cycles.','I took part in understanding both businesses, assessing risks, reviewing controls and working on audit cycles.'],
['Relier la compréhension de l’activité aux comptes à examiner, sélectionner les tests, revoir les justificatifs et consigner les constats.','Connect the business context to accounts in scope, select tests, review evidence and document observations.'],
['Analyse des risques, contrôle interne, tests sur les cycles et documentation des preuves.','Risk assessment, internal control, cycle testing and evidence documentation.'],
['Travaux de revue, tests sur les cycles comptables et documentation des constats de formation.','Review work, accounting cycle tests and documentation of training observations.'],
['Les étapes restent comparables ; les risques prioritaires et les preuves pertinentes dépendent de chaque contexte.','The audit steps are comparable; priority risks and relevant evidence depend on each company.']],
steps:[
step('Entreprise A','Company A','Point de départ : comprendre le modèle d’activité et les opérations qui alimentent les comptes.','Starting point: understand the business model and the transactions behind the accounts.'),
step('Entreprise B','Company B','Point de comparaison : reprendre la même grille de lecture et l’adapter aux processus et aux preuves disponibles. Les secteurs ne sont pas divulgués.','Comparison: apply the same framework and adapt it to the processes and evidence available. Industries are not disclosed.')]
},{
slug:'regularisation-comptable',code:'STRATA',title:['Supervision et régularisation comptable sur trois exercices','Accounting supervision and regularisation across three years'],
caption:['Comptabilité · Reconstitution · En équipe','Accounting · Reconstruction · Team project'],
fields:[
['Revue collective d’un historique comptable présentant des incohérences sur plusieurs exercices.','Team review of historical accounts with inconsistencies spanning multiple years.'],
['Reconstituer les travaux d’un exercice complet et rassembler des éléments de dossier pour trois exercices.','Reconstruct accounting work for one full year and assemble working papers for three years.'],
['J’ai contribué à la revue des écritures, au repérage des anomalies et à la préparation des éléments de dossier, au sein de l’équipe.','As part of the team, I helped review entries, identify inconsistencies and prepare working papers.'],
['Comparer les pièces et les écritures, isoler les écarts, puis organiser les travaux de reconstitution et de régularisation.','Compare documents with postings, isolate differences and organise reconstruction and regularisation work.'],
['Revue comptable, traçabilité, documentation et coordination en équipe.','Account review, traceability, documentation and teamwork.'],
['Contribution à la reconstitution d’un exercice et éléments de dossier comptable pour trois exercices.','Contribution to one year’s reconstruction and working paper elements for three years.'],
['Une piste claire entre le constat, la pièce et le traitement facilite la reprise du dossier par l’équipe.','A clear trail from issue to evidence to treatment helps colleagues pick up the work.']],
steps:[
step('Exercice 1','Year 1','Repérer les incohérences et remettre les pièces en regard des écritures.','Identify inconsistencies and reconnect supporting records to their postings.'),
step('Exercice 2','Year 2','Illustration de la reconstitution : reprendre les travaux d’un exercice complet et documenter les éléments revus.','Reconstruction illustration: rework one full year and document the items reviewed.'),
step('Exercice 3','Year 3','Illustration du dossier : structurer les éléments des trois exercices pour faciliter leur revue. L’ordre ne désigne pas les années réelles.','Working paper illustration: organise the three years of documentation for review. The sequence does not identify the actual years.')]
},{
slug:'audit-interim',code:'MEMO',title:['Audit financier d’une entreprise du secteur de l’intérim','Financial audit of a temporary staffing company'],
caption:['Audit externe · Risques · En équipe','External audit · Risk · Team project'],
fields:[
['Mission collective d’audit financier dans une entreprise de travail temporaire.','Team financial audit engagement at a temporary staffing company.'],
['Relier les vérifications menées sur les cycles à une synthèse utilisable par le superviseur.','Connect cycle testing to a summary that the supervising professional could use.'],
['J’ai participé aux travaux sur les cycles, analysé les observations, préparé une note de synthèse et assisté le superviseur dans la préparation du rapport.','I worked on audit cycles, analysed observations, prepared a summary memorandum and assisted the supervisor with report preparation.'],
['Comprendre l’activité, examiner les informations comptables, effectuer les vérifications puis relier les constats aux pièces de travail.','Understand the business, review accounting information, perform checks and tie observations back to working papers.'],
['Audit par cycle, revue des justificatifs, analyse des constats et rédaction de synthèse.','Cycle auditing, evidence review, analysis of observations and summary writing.'],
['Travaux de vérification et note de synthèse ; assistance à la préparation du rapport.','Verification work and summary memorandum; support with report preparation.'],
['Une note utile permet au lecteur de retrouver à la fois le constat, le test et la preuve qui le soutient.','A useful memorandum lets the reader trace each observation to its test and supporting evidence.']],
steps:[
step('Cycles','Cycles','Situer les informations comptables dans le cycle auquel elles se rattachent.','Locate the accounting information within its corresponding cycle.'),
step('Risques','Risks','Relier les points d’attention aux contrôles et aux vérifications à mener.','Link areas of concern to relevant controls and checks.'),
step('Pièces de travail','Working papers','Conserver les références des tests et des justificatifs examinés.','Retain references to the tests performed and evidence reviewed.'),
step('Note de synthèse','Summary memorandum','Consolider les observations et permettre au superviseur de revenir au dossier.','Consolidate observations and let the supervisor trace each one back to the file.')]
},{
slug:'audit-informatique',code:'SYSTEM',title:['Mission d’audit financier d’une entreprise informatique','Financial audit engagement at an IT company'],
caption:['Audit financier · Secteur informatique','Financial audit · IT sector'],
fields:[
['Participation à une mission complète d’audit financier auprès d’une entreprise informatique.','Participation in a full financial audit engagement for an IT company.'],
['Comprendre les processus qui produisent l’information financière et identifier les points à vérifier.','Understand the processes that produce financial information and identify what needs verification.'],
['J’ai travaillé sur cette mission. Le brief ne précise pas la répartition des phases, présentées ici comme travaux de l’équipe.','I worked on the engagement. The brief does not specify how phases were assigned, so they are presented here as team activities.'],
['L’équipe a suivi le cycle présenté ci-dessous : compréhension de l’activité, risques et contrôles, planification, tests, revue des preuves, documentation et synthèse.','The team followed the lifecycle shown here: business understanding, risks and controls, planning, testing, evidence review, documentation and synthesis.'],
['Compréhension du cycle complet d’audit, de l’analyse des risques à la synthèse.','Understanding the complete audit lifecycle, from risk assessment to synthesis.'],
['Travaux d’audit de l’équipe, éléments de preuve, documentation et synthèse de mission.','Team audit work, supporting evidence, documentation and engagement summary.'],
['La pertinence de la preuve dépend de la compréhension préalable du flux qui a produit la donnée.','Evidence is more useful when the process that produced the data is understood first.']],
steps:[
step('Activité','Business','Décrire le modèle d’activité et les flux qui alimentent les comptes.','Describe the business model and flows that feed the accounts.'),
step('Risques','Risks','Repérer les points où une anomalie pourrait affecter l’information financière.','Identify where a misstatement could affect financial information.'),
step('Contrôles','Controls','Comprendre le rôle des contrôles dans ces flux.','Understand the role of controls in those flows.'),
step('Planification','Planning','Définir les travaux à conduire et leur ordre.','Define the procedures to perform and their order.'),
step('Tests','Testing','Effectuer les vérifications retenues et consigner les observations.','Perform the selected procedures and document observations.'),
step('Preuves','Evidence','Revoir les justificatifs qui étayent les travaux.','Review the supporting records behind the work.'),
step('Documentation','Documentation','Structurer les pièces et les relier aux travaux.','Organise the supporting records and link them to the procedures.'),
step('Synthèse','Completion','Rassembler les points observés pour la clôture de la mission.','Bring observations together for engagement completion.')]
}
];
export const labels:Bi[] = [['Contexte','Context'],['Enjeu','Challenge'],['Ma contribution','My contribution'],['Démarche','Approach'],['Compétences','Skills'],['Livrables','Deliverables'],['Enseignement','What I took away']];
