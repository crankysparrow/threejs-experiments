import{B as H,V as m,F as S,P as j,A as k,D,M as B,a as I,b as q,c as O,d as T,C as W}from"../../three.module-08dc1cdd.js";/* empty css                  */import{S as E,W as U}from"../../World-12b57747.js";import{T as J}from"../../timer-320e5c65.js";import{G as K}from"../../lil-gui.esm-ee8b5e9f.js";import"../../OrbitControls-f09e7187.js";class G extends H{constructor(a=(s,d,f)=>f.set(s,d,Math.cos(s)*Math.sin(d)),c=8,n=8){super(),this.type="ParametricGeometry",this.parameters={func:a,slices:c,stacks:n};const s=[],d=[],f=[],z=[],M=1e-5,g=new m,h=new m,p=new m,F=new m,P=new m,b=c+1;for(let r=0;r<=n;r++){const o=r/n;for(let u=0;u<=c;u++){const i=u/c;a(i,o,h),d.push(h.x,h.y,h.z),i-M>=0?(a(i-M,o,p),F.subVectors(h,p)):(a(i+M,o,p),F.subVectors(p,h)),o-M>=0?(a(i,o-M,p),P.subVectors(h,p)):(a(i,o+M,p),P.subVectors(p,h)),g.crossVectors(F,P).normalize(),f.push(g.x,g.y,g.z),z.push(i,o)}}for(let r=0;r<n;r++)for(let o=0;o<c;o++){const u=r*b+o,i=r*b+o+1,v=(r+1)*b+o+1,L=(r+1)*b+o;s.push(u,i,L),s.push(i,v,L)}this.setIndex(s),this.setAttribute("position",new S(d,3)),this.setAttribute("normal",new S(f,3)),this.setAttribute("uv",new S(z,2))}copy(a){return super.copy(a),this.parameters=Object.assign({},a.parameters),this}}const N=new J,Q=new E,l=new U(Q);l.renderer.shadowMap.enabled=!0;l.renderer.shadowMap.type=j;l.camera.position.set(0,10,100);const e={xMin:-10,xMax:10,yMin:-10,yMax:10,stacks:100,slices:100},R=new k("#0095ff",2),t=new D("#fff",3);t.castShadow=!0;l.scene.add(R,t);t.position.set(17,28,-19);t.lookAt(new m(0,0,0));t.shadow.camera.near=11;t.shadow.camera.far=40;t.shadow.camera.left=-20;t.shadow.camera.right=20;t.shadow.camera.top=20;t.shadow.camera.bottom=-20;t.shadow.camera.updateProjectionMatrix();const X=new B({color:"#fff",side:I}),Y=new G((y,a,c)=>{const n=y*(e.xMax-e.xMin)+e.xMin,s=a*(e.yMax-e.yMin)+e.yMin,d=Math.sqrt(n*n+s*s);c.set(n,s,d)},100,100),x=new q(Y,X);x.castShadow=!0;x.receiveShadow=!0;x.rotateOnAxis(new m(1,0,0),-Math.PI/2);l.scene.add(x);const V=new K,w=V.addFolder("Graph");w.add(e,"xMin",-10,0);w.add(e,"xMax",0,10);w.add(e,"yMin",-10,0);w.add(e,"yMax",0,10);w.add(e,"stacks",0,200).step(1);w.add(e,"slices",0,200).step(1);w.onFinishChange(()=>{x.geometry.dispose(),x.geometry=new G((y,a,c)=>{const n=y*(e.xMax-e.xMin)+e.xMin,s=a*(e.yMax-e.yMin)+e.yMin,d=Math.sqrt(n*n+s*s);c.set(n,s,d)},e.slices,e.stacks)});const Z=new O(20);l.scene.add(Z);const _=new T(t,5);l.scene.add(_);new W(t.shadow.camera);const C=V.addFolder("Light");C.add(t,"intensity",0,10);const A=C.addFolder("Position");A.add(t.position,"x",-50,50);A.add(t.position,"y",-50,50);A.add(t.position,"z",-50,50);A.onChange(()=>{t.lookAt(new m(0,0,0))});function $(){l.render()}N.on("tick",$);