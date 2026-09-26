import Portal from "@/components/portal";
const valid=["dashboard","catalog","rfqs","bookings","remediation","orders","emergency","admin"];
export async function generateMetadata({params}:{params:Promise<{section?:string[]}>}){const p=await params,s=p.section?.[0]||"dashboard";return{title:`${s[0].toUpperCase()+s.slice(1)} | CED`}}
export default async function Page({params}:{params:Promise<{section?:string[]}>}){const p=await params,s=p.section?.[0]||"dashboard";return <Portal section={valid.includes(s)?s:"dashboard"}/>}
