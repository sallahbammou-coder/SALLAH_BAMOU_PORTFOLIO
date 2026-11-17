import {Shell,description} from '../shell';
export const metadata=description('fr');
export default function Layout({children}:{children:React.ReactNode}){return <Shell locale="fr">{children}</Shell>;}
