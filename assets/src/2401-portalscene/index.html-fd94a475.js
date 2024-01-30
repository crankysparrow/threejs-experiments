var _=Object.defineProperty;var b=(n,e,o)=>e in n?_(n,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):n[e]=o;var t=(n,e,o)=>(b(n,typeof e!="symbol"?e+"":e,o),o);import{a1 as M,B as T,i as p,S as h,j as L,h as E,_ as y,k as G,a0 as z,f as x,b as u,K as A,$ as B}from"../../three.module-3b5e661e.js";/* empty css                  */import{S as R,W as F}from"../../World-d201038e.js";import{a as j}from"../../lil-gui.esm-ee8b5e9f.js";import{G as k}from"../../GLTFLoader-4ab4de12.js";import"../../OrbitControls-9f56adc0.js";var I=`varying vec2 vUv;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
}`,W=`varying vec2 vUv;
uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;
uniform float uSpiralTightness;
uniform float uBlur;
uniform float uGlowStart;
uniform float uGlowEnd;
uniform float uDiv;
uniform float uWaveSpeed;
uniform float uSpiralSpeed;

#define PI 3.14159265358979323846
#define e  2.71828182845904523

vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec3 P) {
    vec3 Pi0 = floor(P); 
    vec3 Pi1 = Pi0 + vec3(1.0); 
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); 
    vec3 Pf1 = Pf0 - vec3(1.0); 
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    
    return 2.2 * n_xyz;
}

mat2 rotate2d(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

void main() {
    vec2 uv = vUv;
    uv -= 0.5;
    uv *= 2.0;

    float d0 = length(uv);
    float outerGlow = smoothstep(uGlowStart, uGlowEnd, d0);

    float a1 = cnoise(vec3(uv.x * -10.0, uv.y * -8.0, uTime * uWaveSpeed)) * PI;
    uv *= rotate2d(a1);

    float angle = atan(uv.y, uv.x);
    float offset = d0 + (angle/ (PI * 2.0)) * uSpiralTightness;
    float circles = mod(offset - uTime * uSpiralSpeed, uSpiralTightness);
    float c = circles;
    c /= uDiv;

    c = smoothstep(0.0, uBlur, c) - smoothstep(1.0 - uBlur , 1.0, c);
    c = max(c, 0.0);
    c += outerGlow;
    c = min(c, 1.0);
  
    vec3 color = mix(uColorStart, uColorEnd, c);
    gl_FragColor = vec4(color, 1.0);
}`;const v=(n,e={},o=[])=>{const l=document.createElement(n);return Object.keys(e).forEach(i=>{l.setAttribute(i,e[i])}),o.forEach(i=>{l.appendChild(typeof i=="string"?document.createTextNode(i):i)}),l},D=`
.loader__bar {
   position: fixed;
   z-index: 100;
   width: 100%;
   height: 10px;
   background: #ff8a2b;
   left: 0;
   bottom: 0;
   transition: transform 0.5s ease-out; 
   transform-origin: left;
   transform: scaleX(0);
}

.loader__cover {
   position: fixed;
   z-index: 99;
   width: 100%;
   height: 100%;
   background: #000;
   left: 0;
   top: 0;
   transition: opacity 0.8s ease-in-out;
}

.loader--finished .loader__bar,
.loader--finished .loader__cover {
   pointer-events: none;
}
.loader--finished .loader__bar {
   transition: transform 0.4s linear;
}
`;class U{constructor(e){t(this,"manager");t(this,"cover");t(this,"bar");t(this,"container");t(this,"style");t(this,"onReady");t(this,"onFinished",()=>{window.setTimeout(()=>{this.cover.style.opacity="0",this.onReady&&this.onReady()},1e3),window.setTimeout(()=>{this.bar.style.transform="scaleX(0)",this.bar.style.transformOrigin="right"},800),this.container.classList.add("loader--finished")});t(this,"onProgress",(e,o,l)=>{const i=o/l;console.log(i),this.bar.style.transform=`scaleX(${i})`});this.onReady=e,this.manager=new M(this.onFinished,this.onProgress),this.bar=v("div",{class:"loader__bar"}),this.cover=v("div",{class:"loader__cover"}),this.container=v("div",{class:"loader"},[this.bar,this.cover]),this.style=v("style",{},[D]),document.body.append(this.container,this.style)}}var q=`void main() {

    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;

    gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
}`,$=`uniform float uPixelRatio;
uniform float uSize;
uniform float uTime;

attribute float aScale;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    modelPosition.y += sin(uTime + modelPosition.x * 100.0) * aScale * 0.2;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = uSize * aScale * uPixelRatio;
    gl_PointSize *= (1.0 / -viewPosition.z);
}`;const H=(n=30)=>{const e=new Float32Array(n*3);for(let o=0;o<n;o++)e[o*3]=(Math.random()-.5)*4,e[o*3+1]=.25+Math.random()*1.25,e[o*3+2]=(Math.random()-.5)*4;return e},X=(n=30)=>{const e=new Float32Array(n);for(let o=0;o<n;o++)e[o]=Math.random();return e};class O{constructor(e){t(this,"world");t(this,"sizes");t(this,"points");t(this,"geometry");t(this,"material");t(this,"onResize",()=>{this.material.uniforms.uPixelRatio.value=this.sizes.pixelRatio});t(this,"tick",e=>{this.material.uniforms.uTime.value=e});this.geometry=new T,this.geometry.setAttribute("position",new p(H(),3)),this.geometry.setAttribute("aScale",new p(X(),1)),this.material=new h({uniforms:{uPixelRatio:{value:e.sizes.pixelRatio},uSize:{value:100},uTime:{value:0}},vertexShader:$,fragmentShader:q,transparent:!0,depthWrite:!1,blending:L}),this.points=new E(this.geometry,this.material),this.world=e,this.sizes=e.sizes,this.world.scene.add(this.points),this.sizes.on("resize",this.onResize)}}A.enabled=!0;const K=new R,a=new F(K),N=new B,d=new j;a.camera.near=.1;a.camera.far=100;a.camera.position.set(-.7,2,-3.5);a.camera.updateProjectionMatrix();a.renderer.outputColorSpace=y;a.controls.minPolarAngle=0;a.controls.maxPolarAngle=Math.PI/2-.1;a.controls.maxDistance=20;a.controls.minDistance=1;const P=new U,Y=new G(P.manager),J=new k(P.manager),w="/threejs-experiments",m=Y.load(w+"/scenes/portal/baked.jpg");m.flipY=!1;m.colorSpace=y;const Q=new z({map:m}),f=new z({color:"#ffe3d1"}),r=new h({vertexShader:I,fragmentShader:W,uniforms:{uTime:{value:0},uColorStart:{value:new x("#ffbdc2")},uColorEnd:{value:new x("#fffaff")},uSpiralTightness:{value:.45},uWaveSpeed:{value:.2},uSpiralSpeed:{value:.45},uBlur:{value:.43},uGlowStart:{value:.29},uGlowEnd:{value:.95},uDiv:{value:.34}}}),S=new O(a);J.load(w+"/scenes/portal/portal-merged.glb",n=>{const e=n.scene;e.traverse(c=>{c instanceof u&&(c.material=Q)});const o=e.children.find(c=>c.name==="poleLightA"),l=e.children.find(c=>c.name==="poleLightB"),i=e.children.find(c=>c.name==="portalLight");o instanceof u&&(o.material=f),l instanceof u&&(l.material=f),i instanceof u&&(i.material=r),a.scene.add(e)});const g={poleLightColor:f.color.getHexString(),clearColor:"#160e14",portalColorStart:r.uniforms.uColorStart.value.getHexString(),portalColorEnd:r.uniforms.uColorEnd.value.getHexString()};a.renderer.setClearColor(g.clearColor);d.addColor(g,"clearColor").onChange(n=>{a.renderer.setClearColor(n)});d.add(S.material.uniforms.uSize,"value",0,500,1).name("firefliesSize");d.addColor(g,"poleLightColor").onChange(n=>{f.color.set(n)});let s=d.addFolder("portal");s.addColor(g,"portalColorStart").onChange(n=>{r.uniforms.uColorStart.value.set(n)});s.addColor(g,"portalColorEnd").onChange(n=>{r.uniforms.uColorEnd.value.set(n)});s.add(r.uniforms.uSpiralTightness,"value",0,1,.01).name("spiralTightness");s.add(r.uniforms.uWaveSpeed,"value",0,2,.01).name("waveSpeed");s.add(r.uniforms.uSpiralSpeed,"value",0,2,.01).name("spiralSpeed");s.add(r.uniforms.uBlur,"value",0,1,.01).name("blur");s.add(r.uniforms.uGlowStart,"value",0,1,.01).name("glowStart");s.add(r.uniforms.uGlowEnd,"value",0,1,.01).name("glowEnd");s.add(r.uniforms.uDiv,"value",.01,1,.01).name("div");d.close();const C=()=>{const n=N.getElapsedTime();r.uniforms.uTime.value=n,S.tick(n),a.render(),window.requestAnimationFrame(C)};window.requestAnimationFrame(C);