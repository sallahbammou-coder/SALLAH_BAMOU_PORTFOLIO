import type { Metadata } from 'next';
import type {Locale} from '../content/profile';
import {asset} from '../content/profile';
import '@fontsource-variable/manrope';
import '@fontsource-variable/space-grotesk';
import '@fontsource/ibm-plex-mono/400.css';
import './styles.css';

export function description(locale:Locale):Metadata {
 const fr=locale==='fr';
 const title=fr?'Sallah Bamou — Auditeur junior':'Sallah Bamou — Junior auditor';
 const description=fr?'Portfolio de Sallah Bamou. Audit financier, comptabilité et contrôle de gestion. Cinq projets et une recherche d’alternance de 24 mois en France.':'Sallah Bamou’s portfolio. Financial audit, accounting and management control. Five case studies and a search for a 24-month work-study role in France.';
 const base=process.env.SITE_URL;
 return {title,description, ...(base ? {metadataBase:new URL(base),alternates:{canonical:'/'+locale+'/',languages:{fr:'/fr/',en:'/en/','x-default':'/fr/'}}}:{}),openGraph:{title,description,type:'website',locale:fr?'fr_FR':'en_GB'},icons:{icon:asset('/mark.svg')}};
}
export function Shell({children,locale}:{children:React.ReactNode;locale:Locale}){
 return <html lang={locale}><body>{children}</body></html>;
}
