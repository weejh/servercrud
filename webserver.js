const app = require('./dev/dev.js')
const port = process.env.PORT || 12345
app.listen(port)
console.log(`Ready on port ${ port }`)
