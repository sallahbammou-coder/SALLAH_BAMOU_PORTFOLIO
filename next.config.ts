import type {NextConfig} from 'next';
const config:NextConfig = {poweredByHeader:false,reactStrictMode:true,output:'export',trailingSlash:true,basePath:process.env.NEXT_PUBLIC_BASE_PATH||''};
export default config;
