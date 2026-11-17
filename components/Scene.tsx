'use client';
import {Canvas,useFrame,useThree} from '@react-three/fiber';
import {Environment,Lightformer,Line,PerspectiveCamera} from '@react-three/drei';
import {Component,useEffect,useMemo,useRef,type ReactNode} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import {layouts,sequences,type Coord} from './diagrams';

type Mode='hero'|'lab'|'skills'|'end';
type Props={mode:Mode;variant:number;step:number;active:boolean;onReady:(ready:boolean)=>void};
class Boundary extends Component<{children:ReactNode;report:Props['onReady']},{failed:boolean}>{
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true};}
 componentDidCatch(){this.props.report(false);}
 render(){return this.state.failed?null:this.props.children;}
}
function Signal({report}:{report:Props['onReady']}){
 const gl=useThree(s=>s.gl);const frames=useRef(0);
 useFrame(()=>{if(++frames.current===2)report(true);});
 useEffect(()=>{
   const lost=()=>report(false);
   gl.domElement.addEventListener('webglcontextlost',lost);
   return()=>{gl.domElement.removeEventListener('webglcontextlost',lost);report(false);};
 },[gl,report]);
 return null;
}
function useMotion(hero:boolean,active:boolean){
 const ref=useRef<THREE.Group>(null);
 const cam=useThree(s=>s.camera);
 const pointer=useRef({x:0,y:0});
 const travel=useRef(0);
 const time=useRef(0);
 const renderer=useThree(s=>s.gl);
 useEffect(()=>{
   const host=renderer.domElement.closest('.stage');
   if(!host||!active) return;
   function move(e:Event){const ev=e as PointerEvent;if(ev.pointerType==='touch'||!host)return;const {left,width,top,height}=host.getBoundingClientRect();pointer.current={x:((ev.clientX-left)/width-.5)*2,y:((ev.clientY-top)/height-.5)*2};}
   function leave(){pointer.current={x:0,y:0};}
   host.addEventListener('pointermove',move,{passive:true});host.addEventListener('pointerleave',leave);
   let trigger:ScrollTrigger|undefined;
   if(hero){gsap.registerPlugin(ScrollTrigger);trigger=ScrollTrigger.create({trigger:host.closest('.hero'),start:'top top',end:'bottom top',onUpdate:(s)=>{travel.current=s.progress;}});}
   return()=>{host.removeEventListener('pointermove',move);host.removeEventListener('pointerleave',leave);trigger?.kill();};
 },[active,hero,renderer]);
 useFrame((_,dt)=>{
   if(!ref.current||!active)return;
   const d=Math.min(.04,dt),p=pointer.current;
   time.current+=d;
   ref.current.rotation.y=THREE.MathUtils.damp(ref.current.rotation.y,p.x*.21+Math.sin(time.current*.43)*.19+travel.current*.92,3,d);
   ref.current.rotation.x=THREE.MathUtils.damp(ref.current.rotation.x,p.y*.15+Math.sin(time.current*.32)*.09+travel.current*.44,3,d);
   ref.current.rotation.z=THREE.MathUtils.damp(ref.current.rotation.z,Math.sin(time.current*.27)*.045-travel.current*.14,3,d);
   if(hero){cam.position.z=THREE.MathUtils.damp(cam.position.z,6.4-travel.current*.7,4,d);cam.position.y=THREE.MathUtils.damp(cam.position.y,travel.current*.24,4,d);cam.lookAt(0,0,0);}
 });
 return ref;
}
function Band({r,w,depth,start,len,rotation,color}:{r:number;w:number;depth:number;start:number;len:number;rotation:Coord;color:string}){
 const geo=useMemo(()=>{
   const s=new THREE.Shape();
   s.absarc(0,0,r+w,start,start+len,false);
   s.lineTo(Math.cos(start+len)*(r-w),Math.sin(start+len)*(r-w));
   s.absarc(0,0,r-w,start+len,start,true);
   s.closePath();
   const g=new THREE.ExtrudeGeometry(s,{depth,curveSegments:75,steps:1,bevelEnabled:true,bevelSegments:3,bevelThickness:.036,bevelSize:.035});
   g.translate(0,0,-depth/2);
   return g;
 },[r,w,depth,start,len]);
 useEffect(()=>()=>geo.dispose(),[geo]);
 return <mesh geometry={geo} rotation={rotation}><meshStandardMaterial color={color} metalness={.83} roughness={.23} envMapIntensity={1.35}/></mesh>;
}
function Core({hero,active}:{hero:boolean;active:boolean}){
 const ref=useMotion(hero,active);
 const dots=useMemo(()=>{
  const a=[];
  for(let i=0;i<179;i++){
   const r=1.86+(Math.sin(i*5.1)*.5+.5)*1.25, th=i*2.39996;
   a.push(Math.cos(th)*r,Math.sin(th)*r,Math.sin(i*21)*1.18-1.5);
  }
  return new Float32Array(a);
 },[]);
 return <group ref={ref} scale={hero?1:1.25}>
  <Band r={1.56} w={.12} depth={.293} start={.18} len={5.49} rotation={[.78,.18,-.58]} color="#bfcee8"/>
  <Band r={1.34} w={.10} depth={.246} start={1.17} len={5.52} rotation={[-.44,.89,.58]} color="#4265ed"/>
  <Band r={1.07} w={.09} depth={.152} start={2.1} len={5.61} rotation={[.4,-.76,.45]} color="#c4d3e8"/>
  <mesh rotation={[.14,-.38,-.28]}><torusGeometry args={[1.78,.014,8,140]}/><meshStandardMaterial metalness={.7} roughness={.26} color="#83a0f7"/></mesh>
  <mesh rotation={[.4,1,.19]}><icosahedronGeometry args={[.61,2]}/><meshStandardMaterial color="#194be0" metalness={.65} roughness={.22} flatShading emissive="#12358c" emissiveIntensity={.25}/></mesh>
  <mesh rotation={[.4,1,.19]}><icosahedronGeometry args={[.616,2]}/><meshBasicMaterial wireframe color="#7fa1f7" transparent opacity={.17}/></mesh>
  {hero&&<points><bufferGeometry><bufferAttribute attach="attributes-position" args={[dots,3]}/></bufferGeometry><pointsMaterial color="#8ba9ff" size={.018} sizeAttenuation transparent opacity={.53}/></points>}
 </group>;
}

function LabNode({which,position,index,step,active}:{which:number;position:Coord;index:number;step:number;active:boolean}){
 const pick=index===step,ref=useRef<THREE.Group>(null);
 useFrame((_,dt)=>{if(ref.current&&active){
  const n=THREE.MathUtils.damp(ref.current.scale.x,pick?1.17:1,8,dt);
  ref.current.scale.setScalar(n);ref.current.position.z=THREE.MathUtils.damp(ref.current.position.z,position[2]+(pick?.27:0),8,dt);
 }});
 const plate=which===0||which===2||which===3&&index===3;
 const dims:Coord=which===2?[1.16,.56,.09]:which===3?[.66,.81,.09]:which===4?[.41,.41,.18]:[.51,.63,.12];
 const material=<meshStandardMaterial color={pick?'#4573ff':'#284a9b'} metalness={.35} roughness={.37} emissive={pick?'#1741c6':'#0a1543'} emissiveIntensity={pick?.72:.26}/>;
 return <group position={position} ref={ref} rotation={which===2?[-.42,.3,-.22]:[.12,.24,0]}>
    {which===5?<mesh><icosahedronGeometry args={[.24,1]}/>{material}</mesh>:which===1?<group>{[0,1,2].map(k=><mesh key={k} position={[(k-1)*.27,(k-1)*.12,0]}><boxGeometry args={[.22,.65-k*.115,.4]}/><meshStandardMaterial color={pick?'#6991ff':'#2a53a6'} metalness={.4} roughness={.35}/></mesh>)}</group>:which===3&&index<3?<mesh><octahedronGeometry args={[.34,0]}/>{material}</mesh>:<mesh><boxGeometry args={dims}/>{material}</mesh>}
    {plate&&[0,1,2].map(k=><mesh position={[-.025,.14-k*.10,dims[2]/2+.006]} key={k}><boxGeometry args={[dims[0]*(k===0?.58:.64),.012,.008]}/><meshBasicMaterial color={pick?'#d5e1ff':'#7592df'}/></mesh>)}
    {which===4&&[-1,1].map(side=>[-1,0,1].map(k=><mesh key={side+':'+k} position={[side*.235,k*.105,0]}><boxGeometry args={[.13,.036,.03]}/><meshBasicMaterial color={pick?'#bccdff':'#6483ce'}/></mesh>))}
    <mesh position={[0,plate?-.22:-.04,.16]}><sphereGeometry args={[.026,12,8]}/><meshBasicMaterial color={pick?'#dbe7ff':'#7297ff'}/></mesh>
 </group>;
}
function Lab({which,step,active}:{which:number;step:number;active:boolean}){
 const ref=useMotion(false,active),pts=layouts[which];
 return <group ref={ref}>
 {sequences(which,pts.length).map(([a,b],i)=><Line key={i} points={[a,b]} color={i===step||which===0&&i+1===step?'#a8bfff':'#365abb'} lineWidth={i===step?2:1}/>)}
 {pts.map((p,i)=><LabNode key={which+':'+i} which={which} position={p} index={i} step={step} active={active}/>)}
 {(which===1||which===5)&&<mesh position={[0,0,-.16]}><octahedronGeometry args={[.37,0]}/><meshStandardMaterial color="#82a5ff" metalness={.6} roughness={.25} emissive="#2040ac" emissiveIntensity={.45}/></mesh>}
 <group position={[0,0,-.79]} scale={[1.7,.83,1]}>{[1.07,1.38,1.72].map((r)=><mesh key={r}><torusGeometry args={[r,.007,5,100]}/><meshBasicMaterial color="#4366bf" transparent opacity={.5}/></mesh>)}</group>
 </group>;
}

export default function Scene(props:Props){
 const [hero,end]=[props.mode==='hero',props.mode==='end'];
 const core=hero||end;
 return <Boundary report={props.onReady}>
  <Canvas frameloop={props.active?'always':'demand'} dpr={[1,1.55]} gl={{alpha:true,antialias:true,powerPreference:'low-power'}} fallback={null}>
   <PerspectiveCamera makeDefault position={[0,0,hero?6.4:end?7.15:7.1]} fov={hero?40:end?42:34} near={.1} far={25}/>
   <ambientLight intensity={.73}/>
   <directionalLight position={[-3,4,4]} intensity={2.4} color="#cfdeff"/>
   <directionalLight position={[2,-2,1.75]} intensity={1.55} color="#487aff"/>
   {core?<><Environment resolution={128}>
     <Lightformer intensity={4.2} form="rect" position={[-2,3,3]} scale={[2,5,1]} rotation={[0,.34,.5]}/>
     <Lightformer intensity={2} form="rect" position={[3,-1,2]} scale={[1.2,4,1]} color="#5e88fe" rotation={[0,-.9,-.15]}/>
     <Lightformer intensity={3} form="rect" position={[0,3,-2]} scale={[4,1,1]} rotation={[1.2,0,0]}/>
   </Environment><Core hero={hero} active={props.active}/></>:<Lab which={props.mode==='skills'?5:props.variant} step={props.step} active={props.active}/>}
   <Signal report={props.onReady}/>
  </Canvas>
 </Boundary>;
}
