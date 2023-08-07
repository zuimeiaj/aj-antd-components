const glob = require('glob')
const fs = require('fs')
const list = glob.sync('./node_modules/aj-antd-components/dist/utils/*.d.ts')
const demos = glob.sync('./src/pages/**/*.demo.vue')
function writeToPublic(list) {
  list.forEach((item) => {
    const data = fs.readFileSync(item, { encoding: 'utf-8' })
    fs.writeFileSync('./public/docs/' + item.split('/').pop(), data, { encoding: 'utf-8' })
  })
}

writeToPublic(list)
writeToPublic(demos)
