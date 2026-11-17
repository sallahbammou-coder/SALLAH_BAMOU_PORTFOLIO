import {Shell,description} from '../shell';
export const metadata=description('en');
export default function Layout({children}:{children:React.ReactNode}){return <Shell locale="en">{children}</Shell>;}
