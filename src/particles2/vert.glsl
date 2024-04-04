precision mediump float;

attribute float scale;

uniform float u_time;
uniform vec3 u_mouse;
uniform vec3 u_res;
uniform float u_strength;
uniform float u_waveSpeed;
uniform float u_waveStrength;

uniform float u_innerSize;

uniform float u_noiseSpeed;
uniform float u_noiseVal;

float PI = 3.1415926;

vec3 random3(vec3 c) {
  float j = 4096.0 * sin(dot(c, vec3(17.0, 59.4, 15.0)));
  vec3 r;
  r.z = fract(512.0 * j);
  j *= .125;
  r.x = fract(512.0 * j);
  j *= .125;
  r.y = fract(512.0 * j);
  return r - 0.5;
}
// https://thebookofshaders.com/edit.php#11/iching-03.frag
const float F3 = 0.3333333;
const float G3 = 0.1666667;
float snoise(vec3 p) {

  vec3 s = floor(p + dot(p, vec3(F3)));
  vec3 x = p - s + dot(s, vec3(G3));

  vec3 e = step(vec3(0.0), x - x.yzx);
  vec3 i1 = e * (1.0 - e.zxy);
  vec3 i2 = 1.0 - e.zxy * (1.0 - e);

  vec3 x1 = x - i1 + G3;
  vec3 x2 = x - i2 + 2.0 * G3;
  vec3 x3 = x - 1.0 + 3.0 * G3;

  vec4 w, d;

  w.x = dot(x, x);
  w.y = dot(x1, x1);
  w.z = dot(x2, x2);
  w.w = dot(x3, x3);

  w = max(0.6 - w, 0.0);

  d.x = dot(random3(s), x);
  d.y = dot(random3(s + i1), x1);
  d.z = dot(random3(s + i2), x2);
  d.w = dot(random3(s + 1.0), x3);

  w *= w;
  w *= w;
  d *= w;

  return dot(d, vec4(52.0));
}

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 fade(vec3 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }

float cnoise(vec3 P) {
  vec3 Pi0 = floor(P);        // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P);        // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
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

  vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
  vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
  vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
  vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
  vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
  vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
  vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
  vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);

  vec4 norm0 = taylorInvSqrt(
      vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(
      vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
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
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111),
                 fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}

// void main() {
//   vec3 pos = position;
//   // vUv = uv;

//   vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//   // vec2 uv = (pos.xz + u_res.xz / 2.0) / u_res.xz;

//   float elevation = sin(modelPosition.x * 4.0 + u_time) *
//                     sin(modelPosition.z * 1.5 + u_time) * 5.2;
//   for (float i = 1.0; i < 4.0; i++) {
//     elevation -=
//         abs(cnoise(vec3(modelPosition.xz * 3.0 * i, u_time * 0.2)) * 0.15 /
//         i);
//   }
//   modelPosition.y += elevation;
//   vec4 viewPosition = viewMatrix * modelPosition;
//   vec4 projectedPosition = projectionMatrix * viewPosition;
//   // vec2 mouse = (u_mouse.xz + u_res.xz / 2.0) / u_res.xz;

//   // float dist = distance(uv, mouse);
//   // v_dist = dist;
//   // v_toPointsCenter = distance(uv, vec2(0.5, 0.5));

//   // float angle = atan(uv.y - mouse.y, uv.x - mouse.x) + PI;

//   // /**
//   //  * Waves
//   //  */
//   // float adjust_y = sin(u_time * u_waveSpeed + u_waveA + cos(dist *
//   u_waveB))
//   // *
//   //                  u_waveStrength;
//   // float adjust_y_amt = smoothstep(1.0, 0.3, uv.x);
//   // adjust_y *= max(u_strength, 0.7);
//   // pos.y -= adjust_y * adjust_y_amt;

//   /**
//    * Apply
//    */
//   // uv.x -= cos(angle);
//   // uv.y -= sin(angle);
//   // uv.x += cos(angle);
//   // uv.y += sin(angle);

//   // convert uv.xy back to pos.xz
//   pos.x = uv.x * u_res.xz.x - u_res.xz.x / 2.0;
//   pos.z = uv.y * u_res.xz.y - u_res.xz.y / 2.0;

//   vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
//   gl_PointSize = scale * (300.0 / -mvPosition.z);

//   gl_Position = projectionMatrix * viewPosition;
// }

void main() {

  vec3 pos = position;
  vec2 uv = (pos.xz + u_res.xz / 2.0) / u_res.xz;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  float angle = atan(modelPosition.x, modelPosition.z);
  float distToCenter = length(modelPosition.xz);
  // float angleOffset = (1.0 / distToCenter) * u_time * 2.2;
  // angle += angleOffset;

  modelPosition.y += cos(angle + distToCenter + u_time);
  // modelPosition.y -= sin(angle - distToCenter + u_time);

  // float noiseVal = cnoise(vec3(modelPosition.xz * 0.1, u_time * 0.8)) * 0.1;

  // float elevation = sin(modelPosition.x * 0.8 + u_time) *
  //                   sin(modelPosition.z * 0.1 + u_time) * 3.0;
  // float distanceFromCenter = distance(uv, vec2(0.5, 0.5));

  // float dist = distance(uv, vec2(0.5, 0.5));
  // float angle = atan(uv.y - 0.5, uv.x - 0.5) + PI;

  // modelPosition.z += sin(angle + u_time) * 5.0;
  // modelPosition.x += cos(angle + u_time * 0.2) * 3.0;
  // modelPosition.z -= 10.0 * distanceFromCenter;
  // modelPosition.y -= cos(angle) * 5.5;

  // elevation -= abs(cnoise(vec3(modelPosition.xz * 0.1, u_time * 0.8)));
  // pos.y += elevation;
  // modelPosition.y += elevation;
  // modelPosition.x += cos(elevation) * 3.0;
  // modelPosition.y += elevation;

  // pos.x = uv.x * u_res.xz.x - u_res.xz.x / 2.0;
  // pos.z = uv.y * u_res.xz.y - u_res.xz.y / 2.0;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  // vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

  gl_PointSize = scale * (150.0 / -viewPosition.z);
  gl_Position = projectedPosition;

  // vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // float time = u_time * 0.5;
  // float elevation = sin(modelPosition.x * 20.0 + time) *
  //                   sin(modelPosition.z * 3.0 + time) * 0.5;

  // modelPosition.y += elevation;

  // // vElevation = elevation;
  // gl_PointSize = scale * (300.0 / -viewPosition.z);
  // gl_Position = projectedPosition;
}