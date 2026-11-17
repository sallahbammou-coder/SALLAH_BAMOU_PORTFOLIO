'use client';
import {useEffect,useRef,useState,type FormEvent,type ReactNode} from 'react';
import dynamic from 'next/dynamic';
import {ArrowDown,ArrowDownToLine,ArrowRight,ArrowUpRight,Plus,Pause,Play,Menu,X,ScanLine,Mail} from 'lucide-react';
import {cv,email,phone,experience,education,skills,tr,asset,type Locale,type Bi} from '../content/profile';
import {projects,labels} from '../content/projects';
import {Schema} from './Schema';
const Scene=dynamic(()=>import('./Scene'),{ssr:false});
const num=(i:number)=>String(i+1).padStart(2,'0');
const anchors=['projets','parcours','competences','contact'];
const sections:Bi[]=[['Projets','Work'],['Parcours','Background'],['Compétences','Expertise'],['Contact','Contact']];
function Brand(){return <a href="#haut" className="brand"><img src={asset('/mark.svg')} alt="" width={31} height={31} className="brand-img"/> <span>SALLAH <b>BAMOU</b></span></a>}
function Eyebrow({index,children}:{index:string;children:ReactNode}){
 return <p className="eyebrow"><span className="cross">✳</span> {index} <span className="slash">/</span> {children}</p>;
}
function Stage({mode,variant=0,step=0,motion,label}:{mode:'hero'|'lab'|'skills'|'end';variant?:number;step?:number;motion:boolean;label:string}){
 const ref=useRef<HTMLDivElement>(null);
 const [near,setNear]=useState(false),[show,setShow]=useState(false),[ready,setReady]=useState(false);
 useEffect(()=>{
   const el=ref.current;if(!el||!('IntersectionObserver' in window))return;
   const preload=new IntersectionObserver(([e])=>{if(e.isIntersecting){setNear(true);preload.disconnect();}},{rootMargin:'130px'});
   const play=new IntersectionObserver(([e])=>setShow(e.isIntersecting));
   play.observe(el);preload.observe(el);return()=>{preload.disconnect();play.disconnect();};
 },[]);
 return <div ref={ref} className={'stage stage-'+mode+(ready&&motion&&near?' ready':'')} role="img" aria-label={label}>
    <div className="stage-grid"/>
    <div className="art-fallback">{mode==='hero'||mode==='end'?<img src={asset('/financial-core.webp')} alt="" loading={mode==='end'?'lazy':undefined} fetchPriority={mode==='hero'?'high':'low'} width={900} height={900}/>:<Schema mode={mode} variant={variant} step={step}/>}</div>
    {near&&motion&&<div className="live-scene" aria-hidden="true"><Scene mode={mode} variant={variant} step={step} active={show} onReady={setReady}/></div>}
 </div>;
}

export default function Portfolio({locale}:{locale:Locale}){
 const fr=locale==='fr', t=(a:string,b:string)=>fr?a:b, txt=(a:Bi)=>tr(a,locale);
 const [paused,setPaused]=useState(false),[prefersReduced,setReduced]=useState(true),[menu,setMenu]=useState(false);
 const [current,setCurrent]=useState(0),[phase,setPhase]=useState(0),[skill,setSkill]=useState(0),[hash,setHash]=useState('');
 const [atlas,setAtlas]=useState(false),[enhanced,setEnhanced]=useState(false);
 const [draft,setDraft]=useState(''),[error,setError]=useState(false);
 const detail=useRef<HTMLElement>(null), project=projects[current], motion=!paused&&!prefersReduced;
 useEffect(()=>{
   setEnhanced(true);
   const m=matchMedia('(prefers-reduced-motion: reduce)');const sync=()=>setReduced(m.matches);sync();
   m.addEventListener('change',sync);return()=>m.removeEventListener('change',sync);
 },[]);
 useEffect(()=>{
   const sync=()=>{
     const h=location.hash;
     setHash(h);
     const found=projects.findIndex(p=>h==='#projet-'+p.slug);
     if(found>=0){setCurrent(found);setPhase(0);setAtlas(false);requestAnimationFrame(()=>detail.current?.scrollIntoView());}
     const match=/^#experience-([123])$/.exec(h);
     if(match){const d=document.getElementById('experience-'+match[1]) as HTMLDetailsElement|null;if(d)d.open=true;}
   };
   sync();window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync);
 },[]);
 function selectProject(i:number){
   setCurrent(i);setPhase(0);setAtlas(false);
   const h='#projet-'+projects[i].slug;
   if(location.hash!==h) history.replaceState(null,'',h);
   setHash(h);
 }
 function openCase(){detail.current?.scrollIntoView({behavior:motion?'smooth':'instant'});detail.current?.focus({preventScroll:true});}
 function prepare(e:FormEvent<HTMLFormElement>){
   e.preventDefault();
   const data=new FormData(e.currentTarget), name=String(data.get('name')).trim(), message=String(data.get('message')).trim();
   setDraft('');
   if(data.get('website'))return;
   if(name.length<2||message.length<10){setError(true);return;}
   setError(false);
   const body=t('Bonjour Sallah,','Hello Sallah,')+'\r\n\r\n'+message+'\r\n\r\n'+name+' · '+data.get('address');
   setDraft('mailto:'+email+'?subject='+encodeURIComponent(t('Prise de contact — Portfolio','Portfolio enquiry'))+'&body='+encodeURIComponent(body));
 }
 return <div className={motion?'site':'site reduced'} id="haut">
   <a className="skip" href="#main">{t('Aller au contenu','Skip to content')}</a>
   <header className="topbar">
      <Brand/>
      <nav id="navigation" className={menu?'nav is-open':'nav'} aria-label={t('Navigation principale','Main navigation')}>
       {sections.map((s,i)=><a key={anchors[i]} href={'#'+anchors[i]} onClick={()=>setMenu(false)}><span>{num(i)}.</span> {txt(s)}</a>)}
      </nav>
      <div className="header-actions">
        <button type="button" className="icon-button motion-button" aria-pressed={!motion} aria-label={t('Suspendre les animations','Pause animations')} onClick={()=>setPaused(x=>!x)} disabled={prefersReduced}>{motion?<Pause size={15}/>:<Play size={15}/>}</button>
        <a className="lang" href={asset('/'+(fr?'en':'fr')+'/'+hash)} lang={fr?'en':'fr'} hrefLang={fr?'en':'fr'} aria-label={t('Read in English','Lire en français')}><b>{fr?'FR':'EN'}</b><span>/</span>{fr?'EN':'FR'}</a>
        <button type="button" className="icon-button menu-button" aria-expanded={menu} aria-controls="navigation" aria-label={menu?t('Fermer le menu','Close menu'):t('Ouvrir le menu','Open menu')} onClick={()=>setMenu(!menu)}>{menu?<X size={21}/>:<Menu size={21}/>}</button>
      </div>
   </header>
   <main id="main">
    <section className="hero">
     <div className="wrap hero-inner">
       <div className="hero-copy">
         <p className="eyebrow hero-kicker"><i/>PAU, FRANCE <span className="slash">/</span> {t('DISPONIBLE EN ALTERNANCE','OPEN TO WORK-STUDY')}</p>
         <h1>SALLAH<br/>BAMOU<span>.</span></h1>
         <p className="hero-role">{t('AUDITEUR JUNIOR','JUNIOR AUDITOR')} <span>·</span> {t('AUDIT FINANCIER • COMPTABILITÉ • CONTRÔLE DE GESTION','FINANCIAL AUDIT • ACCOUNTING • MANAGEMENT CONTROL')}</p>
         <p className="hero-lead">{t('La précision des chiffres. La maîtrise des risques. La confiance dans les décisions.','Precision in numbers. Control over risk. Confidence in decisions.')}</p>
         <p className="hero-description">{t('Passionné par l’audit financier, la comptabilité et l’analyse des données, j’adopte une approche rigoureuse pour comprendre les enjeux financiers et fiabiliser l’information.','Drawn to financial audit, accounting and data analysis, I take a rigorous approach to understanding financial issues and making information more reliable.')}</p>
         <div className="hero-actions">
           <a className="button primary" href="#projets">{t('Explorer mes projets','Explore my work')} <ArrowUpRight size={17}/></a>
           <a className="button ghost" href={cv} download>{t('Télécharger mon CV','Download CV')} <ArrowDownToLine size={16}/></a>
         </div>
         <div className="hero-secondary"><a href="#parcours">{t('Découvrir mon parcours','Discover my background')} <ArrowRight size={14}/></a><a href="#contact">{t('Me contacter','Get in touch')} <ArrowRight size={14}/></a></div>
       </div>
       <figure className="hero-figure">
          <div className="corner tl"/><div className="corner tr"/><div className="corner bl"/><div className="corner br"/>
          <div className="figure-label"><ScanLine size={16}/> <span>FIG. 01 <i>/</i> THE FINANCIAL CORE</span></div>
          <Stage mode="hero" motion={motion} label={t('Gyroscope métallique autour d’un noyau bleu','Metal gyroscope around a blue core')}/>
          <span className="figure-axis" aria-hidden="true">+ Z</span>
          <figcaption><span>SB / 01</span><span>{t('PRÉCISION → CONFIANCE','PRECISION → TRUST')}</span></figcaption>
       </figure>
     </div>
     <div className="wrap hero-bottom"><a href="#projets"><ArrowDown size={15}/>{t('DÉFILER POUR EXPLORER','SCROLL TO EXPLORE')}</a><span>43° 18′ N &nbsp; 0° 22′ W</span></div>
    </section>
    <section id="projets" className="lab">
     <div className="wrap section-space">
       <Eyebrow index="01">{t('PROJETS SÉLECTIONNÉS','SELECTED WORK')}</Eyebrow>
       <div className="section-head"><h2>The Audit Lab<span>.</span></h2><p>{t('Cinq dossiers pour voir comment une pièce, un test ou un risque devient une information sur laquelle on peut s’appuyer.','Five case studies in turning a document, a test or a risk into information people can rely on.')}</p></div>
       <div className="lab-console">
        <div className="lab-index" role="group" aria-label={t('Choisir une étude de cas','Choose a case study')}>
          <div className="panel-label"><span>{t('INDEX DES DOSSIERS','CASE INDEX')}</span><span>01–05</span></div>
          {projects.map((p,i)=><button type="button" key={p.slug} aria-pressed={i===current} onClick={()=>selectProject(i)}><span className="index-num">{num(i)}</span><span>{txt(p.title)}</span><ArrowUpRight size={17}/></button>)}
        </div>
        <div className="lab-view">
          <div className="panel-label"><span><i/> {atlas?'AUDIT NETWORK':project.code+' / '+num(current)}</span>
            <button type="button" className="atlas-toggle" aria-pressed={atlas} onClick={()=>setAtlas(a=>!a)}>{t('Vue réseau','Network view')} <ScanLine size={14}/></button>
          </div>
          <Stage mode="lab" variant={atlas?5:current} step={atlas?current:phase} motion={motion} label={atlas?t('Réseau des cinq dossiers','Network of five case studies'):t('Représentation du dossier : ','Case diagram: ')+txt(project.title)}/>
          <div className="lab-foot">
            {atlas?<><p className="phase-note">{t('Sélectionnez un nœud numéroté pour ouvrir son dossier.','Select a numbered node to open its case.')}</p><div className="phases" role="group" aria-label={t('Nœuds des dossiers','Case nodes')}>{projects.map((p,i)=><button key={p.slug} type="button" className="atlas-node" aria-label={num(i)+' '+txt(p.title)} onClick={()=>selectProject(i)}>{num(i)}</button>)}</div></>:<>
            <div className="phases" role="group" aria-label={t('Phase du projet','Project phase')}>
              {project.steps.map((s,i)=><button type="button" key={i} aria-pressed={i===phase} onClick={()=>setPhase(i)}><span>{num(i)}</span> {txt(s.label)}</button>)}
            </div>
            <p className="phase-note" aria-live="polite"><span>{num(phase)}</span> {txt(project.steps[phase].info)}</p>
            <button type="button" className="read-case" onClick={openCase}>{t('Lire l’étude de cas','Read case study')} <ArrowDown size={14}/></button>
            </>}
          </div>
        </div>
       </div>
       <article ref={detail} className="case" id={'projet-'+project.slug} tabIndex={-1}>
        <div className="case-intro" key={project.slug+'title'}>
          <p className="mono tag">{t('ÉTUDE DE CAS','CASE STUDY')} / {num(current)}</p>
          <h3>{txt(project.title)}</h3><p>{txt(project.caption)}</p>
        </div>
        <dl className="case-notes" key={project.slug}>{project.fields.map((line,i)=><div key={i}><dt><span>{num(i)}.</span> {txt(labels[i])}</dt><dd>{txt(line)}</dd></div>)}</dl>
       </article>
       <div className="case-nav"><button type="button" onClick={()=>{selectProject((current+1)%projects.length);requestAnimationFrame(openCase);}}>{t('Dossier suivant','Next case')} <ArrowRight size={18}/></button></div>
     </div>
    </section>
    <section className="editorial" id="parcours">
      <div className="wrap section-space">
       <Eyebrow index="02">{t('PARCOURS','BACKGROUND')}</Eyebrow>
       <div className="section-head"><h2>{t('De Tanger à Pau','From Tangier to Pau')}<span>.</span></h2><p>{t('Deux écoles, une double diplomation et la même exigence : pouvoir expliquer ce que les chiffres racontent.','Two schools, a dual-degree pathway and the same standard: being able to explain the story behind the numbers.')}</p></div>
       <div className="about">
         <div className="about-sign"><span className="mono">SB / 02</span><svg aria-hidden="true" viewBox="0 0 300 155"><g stroke="currentColor" fill="none" strokeWidth="1.2"><ellipse cx="151" cy="79" rx="117" ry="34" transform="rotate(-19 151 79)"/><ellipse cx="151" cy="79" rx="108" ry="34" transform="rotate(25 151 79)"/><ellipse cx="151" cy="79" rx="33" ry="63" transform="rotate(27 151 79)"/><path d="M151 20v118M82 79h138"/><circle cx="151" cy="79" r="16"/></g><circle cx="151" cy="79" r="5" fill="currentColor"/></svg><span className="mono">{t('TANGER','TANGIER')} ↗ PAU</span></div>
         <div className="about-copy">
          <p>{t('Diplômé de l’ENCG Tanger en Audit et Contrôle de Gestion, je poursuis un Master 1 Audit et Expertise Comptable à l’ESC Pau Business School dans le cadre d’une double diplomation.','I graduated from ENCG Tangier in Audit and Management Control and am pursuing a Master 1 in Audit and Accounting Expertise at ESC Pau Business School through a dual-degree programme.')}</p>
          <p>{t('Mes expériences en comptabilité, reporting et audit m’ont donné le goût de remonter du chiffre à la pièce qui l’explique. Je m’intéresse à l’audit externe, notamment au commissariat aux comptes, au contrôle interne et à l’automatisation des travaux financiers.','Working in accounting, reporting and audit made me interested in tracing each figure back to the document that explains it. I’m particularly interested in external and statutory audit, internal control and automating financial work.')}</p>
         </div>
       </div>
       <div className="track">
         <div><h3>{t('Expérience','Experience')}</h3><p className="mono tag">{t('03 MISSIONS','03 ROLES')}</p></div>
         <div className="timeline">
          {experience.map((x,i)=><details key={x.name} id={'experience-'+(i+1)}>
            <summary><div><span className="mono date">{txt(x.dates)} · {txt(x.place)}</span><h4>{txt(x.role)}</h4><p>{x.name}</p></div><Plus size={22}/></summary>
            <ul>{x.detail.map((y,j)=><li key={j}>{txt(y)}</li>)}</ul>
          </details>)}
         </div>
       </div>
       <div className="track education">
         <div><h3>{t('Formation','Education')}</h3><p className="mono tag">{t('05 ÉTAPES','05 MILESTONES')}</p></div>
         <ol className="timeline">{education.map(x=><li key={x.school}><span className="mono date">{txt(x.dates)}</span><h4>{x.school}</h4><p>{txt(x.title)}</p><span className="place">{fr?x.location:x.location.replace('Tanger','Tangier').replace('Maroc','Morocco')}</span></li>)}</ol>
       </div>
      </div>
    </section>
    <section className="expertise" id="competences">
     <div className="wrap section-space">
       <Eyebrow index="03">{t('COMPÉTENCES','EXPERTISE')}</Eyebrow>
       <div className="section-head"><h2>{t('Carte d’expertise','Expertise map')}<span>.</span></h2><p>{t('Cinq domaines à explorer, avec des liens vers les missions et projets qui les mettent en pratique.','Explore five areas and follow their links to the roles and case studies where they come into play.')}</p></div>
       <div className="skill-map">
         <div className="skill-art"><div className="panel-label"><span>SB / {t('CARTOGRAPHIE','MAP')}</span><span>{num(skill)} / 05</span></div><Stage mode="skills" step={skill} motion={motion} label={t('Carte : ','Map: ')+txt(skills[skill].name)}/></div>
         <div className="skill-info">
          <div className="skill-picker" role="group" aria-label={t('Domaines de compétence','Expertise areas')}>{skills.map((s,i)=><button type="button" key={i} aria-pressed={i===skill} onClick={()=>setSkill(i)}><span>{num(i)}.</span> {txt(s.name)}</button>)}</div>
          <div className="skill-detail" aria-live="polite"><h3>{txt(skills[skill].name)}</h3><ul>{skills[skill].items.map((x,i)=><li key={i}>{txt(x)}</li>)}</ul></div>
          <div className="evidence">{skills[skill].evidence.map(x=><a key={x.target} href={x.target}>{txt(x.label)} <ArrowUpRight size={16}/></a>)}</div>
         </div>
       </div>
     </div>
    </section>
    <section className="opportunity" id="alternance">
      <div className="wrap section-space">
       <Eyebrow index="04">{t('OBJECTIF · ALTERNANCE','WORK-STUDY OBJECTIVE')}</Eyebrow>
       <div className="op-grid">
         <div><h2>{t('Construisons ensemble la fiabilité financière de demain.','Let’s build tomorrow’s financial reliability together.')}</h2>
          <p>{t('Je recherche une alternance en audit financier ou externe, comptabilité, expertise comptable, analyse financière ou contrôle de gestion.','I’m looking for a work-study position in financial or external audit, accounting, accounting practice, financial analysis or management control.')}</p>
          <div className="hero-actions"><a className="button paper" href="#contact">{t('Échanger ensemble','Start a conversation')} <ArrowUpRight size={17}/></a><a className="button white-outline" href={cv} download>{t('Télécharger mon CV','Download CV')} <ArrowDownToLine size={16}/></a></div>
         </div>
         <dl className="op-facts">
           <div><dt>{t('DURÉE','TERM')}</dt><dd>24 <small>{t('mois','months')}</small></dd></div>
           <div><dt>{t('RYTHME','WORK-STUDY SCHEDULE')}</dt><dd>7 / 3</dd><span>{t('Semaines en entreprise / à l’école','Weeks at work / at school')}</span></div>
           <div><dt>{t('MOBILITÉ','LOCATION')}</dt><dd>{t('France entière','Throughout France')}</dd></div>
         </dl>
       </div>
      </div>
    </section>
    <section className="contact editorial" id="contact">
     <div className="wrap section-space">
       <Eyebrow index="05">CONTACT</Eyebrow>
       <div className="contact-grid">
         <div className="contact-intro">
           <h2>{t('Parlons finance','Let’s talk finance')}<span>.</span></h2>
           <p>{t('Une mission, une alternance ou une question sur un dossier ? Écrivez-moi.','An engagement, a work-study role or a question about a case study? Get in touch.')}</p>
           <a className="contact-link" href={'mailto:'+email}><Mail size={17}/> {email} <ArrowUpRight size={15}/></a>
           <a className="contact-link" href={'tel:'+phone.href}>{phone.text} <ArrowUpRight size={15}/></a>
           <a className="contact-link" href={cv} download>{t('CV original (PDF)','Original CV (PDF)')} <ArrowDownToLine size={16}/></a>
           <Stage mode="end" motion={motion} label={t('Sculpture métallique de la signature','Metal signature sculpture')}/>
         </div>
         <form className="contact-form" onSubmit={prepare} onChange={()=>{if(draft)setDraft('');if(error)setError(false);}}>
           <label>{t('Votre nom','Your name')}<input required name="name" autoComplete="name" minLength={2} maxLength={100}/></label>
           <label>{t('Votre adresse e-mail','Your email address')}<input required type="email" name="address" autoComplete="email" maxLength={254}/></label>
           <label>{t('Votre message','Your message')}<textarea required name="message" minLength={10} maxLength={1200} rows={5}/></label>
           <div className="honey" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
           <p className="form-note">{t('Préparez un brouillon à envoyer depuis votre messagerie.','Prepare a draft to send through your email app.')}</p>
           <button type="submit" className="button primary" disabled={!enhanced}>{t('Préparer l’e-mail','Prepare email')} <ArrowUpRight size={17}/></button>
           <div className="contact-status" aria-live="polite">{error?t('Vérifiez votre nom et votre message.','Check your name and message.'):draft?t('Brouillon prêt. Vous pourrez le relire dans votre messagerie.','Draft ready. You can review it in your email app.'):''}</div>
           {draft&&<a className="draft" href={draft}>{t('Ouvrir le brouillon','Open draft')} <ArrowUpRight size={14}/></a>}
         </form>
       </div>
     </div>
    </section>
   </main>
   <footer><div className="wrap footer-inner"><Brand/><span className="mono">© 2026 · PAU, FRANCE</span><a className="mono" href="#haut">{t('RETOUR EN HAUT','BACK TO TOP')} <ArrowUpRight size={15}/></a></div></footer>
 </div>;
}
