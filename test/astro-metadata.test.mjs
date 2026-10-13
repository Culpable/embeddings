import assert from 'node:assert/strict'
import test from 'node:test'
import { tsImport } from 'tsx/esm/api'
const { resolveMetadata } = await tsImport('../src/lib/metadata.ts', import.meta.url)

test('metadata rejects empty, doubled or conflicting canonical values', () => {
 const context={ site:new URL('https://embeddings.au'), pathname:'/about/' }
 for(const input of [{title:'',description:'Useful description'}, {title:'About Us / Embeddings',description:'Useful description'}, {title:'About Us',description:''}, {title:'About Us',description:'Useful description',canonicalPath:'https://foreign.example/'}, {title:'About Us',description:'Useful description',canonicalPath:'/about/?x=1'}]) assert.throws(()=>resolveMetadata(input,context))
 assert.equal(resolveMetadata({title:'About Us',description:'Useful description'},context).documentTitle,'About Us / Embeddings')
 assert.equal(resolveMetadata({title:'Practical AI for Australian Businesses',titleMode:'prefixed',description:'Useful description'},{...context,pathname:'/'}).documentTitle,'Embeddings: Practical AI for Australian Businesses')
 assert.throws(()=>resolveMetadata({title:'Embeddings: Repeated',titleMode:'prefixed',description:'Useful description'},{...context,pathname:'/'}))
})
