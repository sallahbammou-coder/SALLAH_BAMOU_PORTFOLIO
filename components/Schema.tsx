import {layouts,sequences} from './diagrams';
const x=(x:number)=>300+x*82,y=(y:number)=>155-y*79;
export function Schema({mode,variant,step}:{mode:'lab'|'skills';variant:number;step:number}){
 const which=mode==='skills'?5:variant,pts=layouts[which];
 return <svg viewBox="0 0 600 300" fill="none" aria-hidden="true">
   <path d="M40 155h520M300 35v226" stroke="#7c9bf7" strokeOpacity=".2" strokeDasharray="4 8"/>
   <ellipse cx="300" cy="155" rx="249" ry="103" stroke="#5874bb" strokeOpacity=".3"/>
   <ellipse cx="300" cy="155" rx="200" ry="80" stroke="#5874bb" strokeOpacity=".2"/>
   {sequences(which,pts.length).map(([a,b],i)=><path key={i} d={`M${x(a[0])} ${y(a[1])} L${x(b[0])} ${y(b[1])}`} stroke="#81a2ff" strokeWidth="2" strokeDasharray="4 5"/>)}
   {(which===1||which===5)&&<path d="m300 132 25 23-25 23-25-23Z" fill="#5075ff" stroke="#b3c7ff"/>}
   {pts.map(([a,b],i)=><g key={i} transform={`translate(${x(a)} ${y(b)})`} fill={i===step?'#305efb':'#101f3d'} stroke={i===step?'#e0e8ff':'#7394ed'} strokeWidth="1.4">
     {which===5?<><circle r="24" opacity=".65"/><circle r="18"/></>:which===2?<><path d="M-43 6v10L0 33 43 16V6M-43-3v10L0 24 43 7V-3"/><path d="M0-20 43-3 0 14-43-3Z"/></>:which===4?<><rect x="-22" y="-22" width="44" height="44"/><path d="M-31-10h9m-9 20h9m44-20h9m-9 20h9M-10-31v9m20-9v9M-10 22v9m20-9v9"/></>:which===1?<><path d="M-33 17v-28L0-23l33 12v28L0 30Z"/><path d="M-33-11 0 2l33-13M0 2v28"/></>:which===3&&i!==3?<path d="m0-24 29 24L0 24-29 0Z"/>:<><path d="M-23-25h31l14 13v37h-45Z"/><path d="M8-25v13h14M-13 15h24"/></>}
     <text textAnchor="middle" y={which===2?2:5} fill="#f1f5ff" stroke="none" fontFamily="monospace" fontSize="11">{String(i+1).padStart(2,'0')}</text>
   </g>)}
 </svg>;
}
