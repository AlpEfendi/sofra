const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ctx=vm.createContext({});vm.runInContext(fs.readFileSync('nutrition.js','utf8')+'\n'+fs.readFileSync('data.js','utf8')+';globalThis.test={dinners,mealsFor};',ctx);
assert.equal(ctx.test.dinners.length,14);
for(let d=0;d<14;d++)for(const p of ['a','b']){const m=ctx.test.mealsFor(d,p);assert.equal(m.length,p==='a'?2:3);assert.equal(m.at(-1).time,'20:00');assert.equal(new Set(m.map(x=>x.id)).size,m.length);for(const x of m){assert.ok(x.lines.length);assert.ok(fs.existsSync('art/'+x.art+'.svg'));assert.ok(x.lines.every(l=>!String(l).includes('undefined')));assert.ok(Array.isArray(x.nutrition));assert.equal(x.nutrition.length,4);assert.ok(x.nutrition[0]>250&&x.nutrition[0]<1000);assert.ok(x.nutrition[1]>10)}}
assert.equal(ctx.test.dinners[0][2][0].a+ctx.test.dinners[0][2][0].b,340);
assert.equal(ctx.test.dinners[0][2][1].a+ctx.test.dinners[0][2][1].b,300);
const manifest=JSON.parse(fs.readFileSync('manifest.webmanifest'));for(const icon of manifest.icons)assert.ok(fs.existsSync(icon.src));
console.log('PASS: 28 profile/day combinations, dinner totals, illustrations and manifest icons.');

