import{V as y,W as R,S,P as W,H as E,O as H,aC as P,e as v,g as A,M as V}from"../../three.module-6d2b003e.js";/* empty css                  */import{O as j}from"../../OrbitControls-2bf56c4d.js";function z(e,t,m,n,i){return(e-t)*(i-n)/(m-t)+n}function G(e=0,t=1){return z(Math.random(),0,1,e,t)}const r=new y,o=new y(window.innerWidth,window.innerHeight),k=15066597,s=new R({antialias:!0});s.setPixelRatio(window.devicePixelRatio);s.setSize(o.x,o.y);s.setClearColor(k);document.body.appendChild(s.domElement);const h=new S,w=new W(40,o.x/o.y,1,300);w.position.set(-100,0,-50);const d=new j(w,s.domElement);d.zoomSpeed=.5;d.autoRotate=!0;d.autoRotateSpeed=.5;d.enableDamping=!0;d.update();const f=new E(16777215,986895,3);f.position.set(0,20,0);h.add(f);function q(e=5,t=1,m=16726560){const n=new P(e,1),i=n.getAttribute("position"),b=i.count;let a=new v,u={};for(let l=0;l<b;l++){a.fromBufferAttribute(i,l);let p=[a.x,a.y,a.z].join(",");u[p]||(u[p]={x:a.x+Math.random()*t,y:a.y+Math.random()*t,z:a.z+Math.random()*t});let{x:C,y:L,z:O}=u[p];i.setXYZ(l,C,L,O)}n.computeVertexNormals();const g=new A({color:m});return new V(n,g)}let x=new H,c=-30;for(;c<=32;){let e=-30;for(;e<=32;){let m=z(Math.abs(c)+Math.abs(e),0,62,6,2),n=q(m);n.position.z=c,n.position.x=e,n.position.y=G(-30,30),x.add(n);let i=Math.abs(e);e+=i>15?15:i>10?12:10}let t=Math.abs(c);c+=t>15?15:t>10?12:10}h.add(x);function B(e){r.x=e.clientX/window.innerWidth*2-1,r.y=-(e.clientY/window.innerHeight)*2+1}function D(){o.x=window.innerWidth,o.y=window.innerHeight,w.aspect=o.x/o.y,w.updateProjectionMatrix(),s.setSize(o.x,o.y)}function M(){x.children.forEach(e=>{e.rotation.x=r.x*.5+e.position.x,e.rotation.y=r.y*.5-e.position.y,e.rotation.z=(r.x+r.y)*.5+e.position.z}),d.update(),s.render(h,w),requestAnimationFrame(M)}requestAnimationFrame(M);document.addEventListener("mousemove",B);window.addEventListener("resize",D);
