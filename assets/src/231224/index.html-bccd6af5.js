var J=Object.defineProperty;var U=(e,t,s)=>t in e?J(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var a=(e,t,s)=>(U(e,typeof t!="symbol"?t+"":t,s),s);import{V as M,G as X,e as Y,a as H,T as Z,b as $,f as Q,F as K,B as ee,g as te,h as ie,i as se,j as G,k as ae,l as oe,N as ne,L as re,R as ce,m as de,n as he,o as pe}from"../../three.module-3b5e661e.js";/* empty css                  */import{S as ue,W as le}from"../../World-d201038e.js";import{T as me}from"../../timer-4fbd4805.js";import{m as T,f as ye}from"../../utils-100a9827.js";import{a as ge}from"../../lil-gui.esm-ee8b5e9f.js";import"../../OrbitControls-9f56adc0.js";const P={linear:e=>e,quadratic:e=>e*(-(e*e)*e+4*e*e-6*e+4),cubic:e=>e*(4*e*e-9*e+6),elastic:e=>e*(33*e*e*e*e-106*e*e*e+126*e*e-67*e+15),inQuad:e=>e*e,outQuad:e=>e*(2-e),inOutQuad:e=>e<.5?2*e*e:-1+(4-2*e)*e,inCubic:e=>e*e*e,outCubic:e=>--e*e*e+1,inOutCubic:e=>e<.5?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1,inQuart:e=>e*e*e*e,outQuart:e=>1- --e*e*e*e,inOutQuart:e=>e<.5?8*e*e*e*e:1-8*--e*e*e*e,inQuint:e=>e*e*e*e*e,outQuint:e=>1+--e*e*e*e*e,inOutQuint:e=>e<.5?16*e*e*e*e*e:1+16*--e*e*e*e*e,inSine:e=>-Math.cos(e*(Math.PI/2))+1,outSine:e=>Math.sin(e*(Math.PI/2)),inOutSine:e=>-(Math.cos(Math.PI*e)-1)/2,inExpo:e=>Math.pow(2,10*(e-1)),outExpo:e=>-Math.pow(2,-10*e)+1,inOutExpo:e=>(e/=.5,e<1?Math.pow(2,10*(e-1))/2:(e--,(-Math.pow(2,-10*e)+2)/2)),inCirc:e=>-Math.sqrt(1-e*e)+1,outCirc:e=>Math.sqrt(1-(e=e-1)*e),inOutCirc:e=>(e/=.5,e<1?-(Math.sqrt(1-e*e)-1)/2:(e-=2,(Math.sqrt(1-e*e)+1)/2))},d=[e=>Math.cos(e*2),e=>Math.sin(e*2),e=>Math.sin(e),e=>Math.cos(e),(e,t=.2)=>Math.cos(Math.sin(e)*t)];class j{constructor(t,{count:s=30,thickness:i=.02,radius:o=4,opacity:r=.5,scaleFn:l=d[0],posFn:c=d[2],rotateSpeed:p=new M(0,0,0),speed:R=1,initRotation:k=new M(0,0,0),easingTime:x,easingShape:O,matcap:L,coverAmt:W=1}){a(this,"world");a(this,"meshes",[]);a(this,"scaleFn",d[0]);a(this,"posFn",d[2]);a(this,"easingShape","linear");a(this,"easingTime","linear");a(this,"material");a(this,"group");a(this,"rotateSpeed");a(this,"coverAmt",1);a(this,"initRotation",new M(0,0,0));a(this,"_opacity",.5);a(this,"_thickness",.02);a(this,"_count",30);a(this,"_radius",4);a(this,"scaleVar",2);a(this,"speed",1);this._count=s,this._thickness=i,this._radius=o,this._opacity=r,this.scaleFn=l,this.posFn=c,this.rotateSpeed=p,this.world=t,this.speed=R,this.coverAmt=W,this.initRotation=k,x&&(this.easingTime=x),O&&(this.easingShape=O),this.group=new X,this.material=new Y({color:"#fff",matcap:L,transparent:!0,side:H,opacity:this.opacity}),this.setupMeshes()}set visible(t){this.group.visible=t}get visible(){return this.group.visible}get blending(){return this.material.blending}set blending(t){this.material.blending=t}get opacity(){return this._opacity}set opacity(t){this._opacity=t,this.material.opacity=t}get radius(){return this._radius}set radius(t){this._radius=t,this.setupMeshes()}get count(){return this._count}set count(t){this._count=t,this.setupMeshes()}get thickness(){return this._thickness}set thickness(t){this._thickness=t,this.setupMeshes()}setupMeshes(){this.meshes.length>0&&this.meshes.forEach(t=>{this.world.scene.remove(t),this.group.remove(t),t.geometry.dispose()}),this.meshes=[];for(let t=0;t<this._count;t++){const s=new Z(this._radius,this._thickness,20,100),i=new $(s,this.material);i.rotateX(Math.PI/2),this.meshes.push(i)}this.group.add(...this.meshes),this.world.scene.add(this.group)}setColors(){this.meshes.forEach((t,s)=>{const i=s/this._count,o=t.geometry.attributes.position,r=o.count;let l=[],c=new Q;for(let p=0;p<r;p++){let R=o.getY(p),k=i,x=T(R,this._radius*-1,this._radius,0,1);c.setRGB(k,x,1-i),l.push(c.r,c.g,c.b)}t.geometry.setAttribute("color",new K(l,3))})}update(t){let s=t*1e-4*this.speed;const i=T(P[this.easingTime](ye(s)),0,1,-1,1);this.meshes.forEach((o,r)=>{let c=(P[this.easingShape](r/this.count)*this.coverAmt+i)*(Math.PI*2);c%=Math.PI*2,o.position.y=this.posFn(c)*this.radius;const p=T(this.scaleFn(c,this.scaleVar),-1,1,.1,1);o.scale.set(p,p,p)}),this.group.rotation.set(this.initRotation.x+this.rotateSpeed.x*t,this.initRotation.y+this.rotateSpeed.y*t,this.initRotation.z+this.rotateSpeed.z*t)}}class _{constructor(t,{count:s=100,size:i=1,opacity:o=.5,color:r="#fff",radius:l=10}={}){a(this,"geometry");a(this,"positions");a(this,"material");a(this,"mesh");a(this,"_count");a(this,"texture");a(this,"_color");a(this,"_size");a(this,"_opacity");a(this,"_radius");a(this,"rotateSpeed");this.texture=t,this._count=s,this._size=i,this._color=new Q(r),this._opacity=o,this._radius=l,this.rotateSpeed=new M(-1e-4,1e-4,0),this.geometry=new ee,this.setPositions(),this.material=new te,this.setupMaterial(),this.mesh=new ie(this.geometry,this.material)}get radius(){return this._radius}set radius(t){this._radius=t,this.setPositions()}get opacity(){return this._opacity}set opacity(t){this._opacity=t,this.setupMaterial()}get color(){return this._color}set color(t){this._color.set(t),this.setupMaterial()}get size(){return this._size}set size(t){this._size=t,this.setupMaterial()}get count(){return this._count}set count(t){this._count=t,this.setPositions()}getPointInSphere(){let t,s,i,o;do s=Math.random()*2-1,i=Math.random()*2-1,o=Math.random()*2-1,t=s*s+i*i+o*o;while(t>1);return{x:s,y:i,z:o}}setPositions(){this.positions=new Float32Array(this._count*3);for(let t=0;t<this._count;t++){let s=this.getPointInSphere();this.positions[t*3+0]=s.x*this._radius,this.positions[t*3+1]=s.y*this._radius,this.positions[t*3+2]=s.z*this._radius}this.geometry.setAttribute("position",new se(this.positions,3))}setupMaterial(){this.material.size=this._size,this.material.opacity=this._opacity,this.material.sizeAttenuation=!0,this.material.depthWrite=!1,this.material.transparent=!0,this.material.alphaMap=this.texture,this.material.blending=G,this.material.color=this._color,this.material.needsUpdate=!0}update(){this.mesh.rotateX(this.rotateSpeed.x),this.mesh.rotateY(this.rotateSpeed.y),this.mesh.rotateZ(this.rotateSpeed.z)}}const z=e=>({radius:e.radius,opacity:e.opacity,color:e.color.getHexString(),size:e.size,count:e.count,rotateSpeed:e.rotateSpeed,position:e.mesh.position}),I=e=>({speed:e.speed,radius:e.radius,opacity:e.opacity,thickness:e.thickness,count:e.count,scaleVar:e.scaleVar,coverAmt:e.coverAmt,scaleFn:d.indexOf(e.scaleFn),posFn:d.indexOf(e.posFn),easingTime:e.easingTime,easingShape:e.easingShape,blending:e.blending,visible:e.visible,initRotation:e.initRotation,rotateSpeed:e.rotateSpeed}),f=(e,t)=>{e.radius=t.radius,e.opacity=t.opacity,e.color=`#${t.color}`,e.size=t.size,e.count=t.count,e.rotateSpeed.set(t.rotateSpeed.x,t.rotateSpeed.y,t.rotateSpeed.z),e.mesh.position.set(t.position.x,t.position.y,t.position.z)},E=(e,t)=>{e.speed=t.speed,e.radius=t.radius,e.opacity=t.opacity,e.thickness=t.thickness,e.count=t.count,e.scaleVar=t.scaleVar,e.coverAmt=t.coverAmt,e.scaleFn=d[t.scaleFn],e.posFn=d[t.posFn],e.easingTime=t.easingTime,e.easingShape=t.easingShape,e.blending=t.blending,e.visible=t.visible,e.initRotation.set(t.initRotation.x,t.initRotation.y,t.initRotation.z),e.rotateSpeed.set(t.rotateSpeed.x,t.rotateSpeed.y,t.rotateSpeed.z)},A=[[{speed:0,radius:3,opacity:1,thickness:.027,count:29,scaleVar:2,coverAmt:1,scaleFn:2,posFn:1,easingShape:"linear",easingTime:"linear",blending:1,visible:!0,initRotation:{x:.26,y:0,z:.42},rotateSpeed:{x:3e-4,y:0,z:0}},{speed:.4,radius:5.24,opacity:1,thickness:.005,count:41,scaleVar:2,coverAmt:.07,scaleFn:0,posFn:2,easingShape:"outCubic",easingTime:"linear",blending:1,visible:!0,initRotation:{x:.58,y:.07,z:-.61},rotateSpeed:{x:0,y:0,z:0}}],[{speed:.8,radius:4.22,opacity:.3,thickness:.144,count:164,scaleVar:2,coverAmt:.15,scaleFn:1,posFn:3,easingShape:"inCubic",easingTime:"linear",blending:2,visible:!0,initRotation:{x:0,y:0,z:0},rotateSpeed:{x:0,y:0,z:0}},{speed:.4,radius:5.74,opacity:.447,thickness:.057,count:17,scaleVar:-2.05,coverAmt:.2,scaleFn:4,posFn:0,easingShape:"outCubic",easingTime:"linear",blending:1,visible:!1,initRotation:{x:0,y:0,z:0},rotateSpeed:{x:0,y:0,z:0}}],[{speed:0,radius:3,opacity:1,thickness:.02,count:115,scaleVar:2,coverAmt:1,scaleFn:0,posFn:2,easingShape:"inOutCubic",easingTime:"linear",blending:1,visible:!0,initRotation:{x:0,y:0,z:0},rotateSpeed:{x:0,y:0,z:0}},{speed:.3,radius:5,opacity:1,thickness:.045,count:29,scaleVar:2,coverAmt:.5,scaleFn:0,posFn:2,easingTime:"linear",easingShape:"linear",blending:1,visible:!0,initRotation:{x:0,y:0,z:1.57},rotateSpeed:{x:0,y:0,z:0}}],[{speed:1.6,radius:4.26,opacity:1,thickness:.018,count:46,scaleVar:2,coverAmt:.3,scaleFn:0,posFn:3,easingTime:"linear",easingShape:"quadratic",blending:1,visible:!0,initRotation:{x:-.64,y:.02,z:0},rotateSpeed:{x:0,y:0,z:0}},{speed:.4,radius:3.52,opacity:1,thickness:.005,count:41,scaleVar:2,coverAmt:.07,scaleFn:0,posFn:2,easingTime:"linear",easingShape:"outCubic",blending:1,visible:!1,initRotation:{x:.58,y:.07,z:-.61},rotateSpeed:{x:0,y:0,z:0}}]],C=[[{radius:10,opacity:.3,color:"4f2f63",size:10,count:50,rotateSpeed:{x:-1e-4,y:1e-4,z:0},position:{x:0,y:0,z:0}},{radius:10,opacity:.3,color:"0003e7",size:10,count:50,rotateSpeed:{x:-1e-4,y:1e-4,z:-18e-5},position:{x:0,y:0,z:0}},{radius:14,opacity:1,color:"ffffff",size:.1,count:300,rotateSpeed:{x:.001,y:-.001,z:0},position:{x:0,y:0,z:0}},{radius:14,opacity:1,color:"ffffff",size:.2,count:50,rotateSpeed:{x:5e-4,y:5e-4,z:5e-4},position:{x:0,y:0,z:0}}]],V=new me,Se=new ue,h=new le(Se),g=new ae,be=g.load("/stars/smoke_01.png"),xe=g.load("/stars/smoke_02.png"),ze=g.load("/stars/star_01.png"),fe=g.load("/stars/star_04.png"),B=g.load("/matcaps/blueish.png"),S=new _(be),b=new _(xe),m=new _(ze),y=new _(fe);m.rotateSpeed.set(.001,-.001,0);y.rotateSpeed.set(5e-4,5e-4,5e-4);h.scene.add(S.mesh,b.mesh,m.mesh,y.mesh);const F=new j(h,{matcap:B}),v=new j(h,{matcap:B});h.camera.position.set(0,0,10);h.controls.maxDistance=50;h.controls.enablePan=!1;h.scene.fog=new oe("#120b45",0,20);const w=(e,t,s)=>{const i=e.addFolder(s);i.add(t,"radius",0,20),i.add(t,"opacity",0,1),i.addColor(t,"color"),i.add(t,"size",0,20),i.add(t,"count",0,5e3);const o=i.addFolder("Rotate Speed").close();o.add(t.rotateSpeed,"x",-.02,.02,1e-4),o.add(t.rotateSpeed,"y",-.02,.02,1e-4),o.add(t.rotateSpeed,"z",-.02,.02,1e-4);const r=i.addFolder("Position").close();r.add(t.mesh.position,"x",-20,20),r.add(t.mesh.position,"y",-20,20),r.add(t.mesh.position,"z",-20,20),i.close()},N=(e,t,s)=>{const i=e.addFolder(s);i.add(t,"speed",0,4,.1),i.add(t,"radius",0,20),i.add(t,"opacity",0,1),i.add(t,"thickness",0,.5,.001),i.add(t,"count",0,1e3,1),i.add(t,"scaleVar",-10,10,.01),i.add(t,"coverAmt",0,1,.01),i.add(t,"scaleFn",d),i.add(t,"posFn",d),i.add(t,"easingTime",Object.keys(P)),i.add(t,"easingShape",Object.keys(P)),i.add(t,"blending",{Normal:pe,Additive:G}),i.add(t,"visible");const o=i.addFolder("Rotation").close();o.add(t.initRotation,"x",-Math.PI,Math.PI,.01),o.add(t.initRotation,"y",-Math.PI,Math.PI,.01),o.add(t.initRotation,"z",-Math.PI,Math.PI,.01),o.add(t.rotateSpeed,"x",-.02,.02,1e-4).name("speed x"),o.add(t.rotateSpeed,"y",-.02,.02,1e-4).name("speed y"),o.add(t.rotateSpeed,"z",-.02,.02,1e-4).name("speed z"),i.close()},Me=()=>[I(F),I(v)],Pe=()=>[z(S),z(b),z(m),z(y)],q=(e,t)=>{f(S,e[0]),f(b,e[1]),f(m,e[2]),f(y,e[3]),t&&t.controllersRecursive().forEach(s=>s.updateDisplay())},D=(e,t)=>{E(F,e[0]),E(v,e[1]),t&&t.controllersRecursive().forEach(s=>s.updateDisplay())},n=new ge;w(n,S,"Smoke 1");w(n,b,"Smoke 2");w(n,m,"Star 1");w(n,y,"Star 2");N(n,F,"Rings 1");N(n,v,"Rings 2");const u={copyPresetRings:()=>navigator.clipboard.writeText(JSON.stringify(Me(),null,2)),copyPresetParticles:()=>navigator.clipboard.writeText(JSON.stringify(Pe(),null,2)),particlesPreset:0,ringsPreset:0};n.add(u,"copyPresetRings");n.add(u,"copyPresetParticles");n.add(u,"ringsPreset",Object.keys(A)).onChange(()=>{const e=A[u.ringsPreset];D(e,n)});n.add(u,"particlesPreset",Object.keys(C)).onChange(()=>{const e=C[u.particlesPreset];q(e,n)});n.add(h.renderer,"toneMappingExposure",0,10,.5).name("Exposure");n.add(h.renderer,"toneMapping",{None:ne,Linear:re,Reinhard:ce,Cineon:de,ACESFilmic:he}).name("Tone Mapping");q(C[u.particlesPreset]);D(A[u.ringsPreset]);function _e(){F.update(V.elapsed),v.update(V.elapsed),S.update(),b.update(),m.update(),y.update(),h.render()}V.on("tick",_e);