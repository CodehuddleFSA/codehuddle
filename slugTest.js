var slug = require('slug')
var print = console.log.bind(console, '>')

print(slug('i ♥ unicode'))
// > i-love-unicode

print(slug('unicode ♥ is ☢')) // yes!
// > unicode-love-is-radioactive

print(slug('i ♥ unicode', '_')) // If you prefer something else then `-` as seperator
// > i_love_unicode

slug.charmap['♥'] = 'freaking love' // change default charmap or use option {charmap:{…}} as 2. argument
print(slug('I ♥ UNICODE'))
// > I-freaking-love-UNICODE

print(slug('☏-Number', {lower: true})) // If you prefer lower case
// > telephone-number

print(slug('i <3 unicode'))
// > i-love-unicode

print(slug('Google - Facebook', '_'))
