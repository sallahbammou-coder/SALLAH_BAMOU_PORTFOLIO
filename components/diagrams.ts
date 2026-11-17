export type Coord=[number,number,number];
export const layouts:Coord[][]=[
 [[-2.5,0,0],[-1.25,.53,0],[0,-.03,0],[1.25,.53,0],[2.5,0,0]],
 [[-1.7,.2,0],[1.7,.2,0]],
 [[-.8,-.85,.55],[0,0,0],[.8,.85,-.55]],
 [[-2.2,.52,0],[-.72,-.65,0],[.75,.45,0],[2.14,-.15,0]],
 [[-2.35,-.65,0],[-.8,-.65,0],[.8,-.65,0],[2.35,-.65,0],[2.35,.65,0],[.8,.65,0],[-.8,.65,0],[-2.35,.65,0]],
 [[0,1.07,0],[1.75,.43,0],[1.12,-.88,0],[-1.12,-.88,0],[-1.75,.43,0]]
];
export const sequences=(which:number,count:number):[Coord,Coord][]=>{
 const pts=layouts[which]; const origin:Coord=[0,0,-.38];
 if(which===5) return pts.map(p=>[origin,p]);
 if(which===1)return pts.map(p=>[origin,p]);
 return pts.slice(1,count).map((p,i)=>[pts[i],p]);
};
