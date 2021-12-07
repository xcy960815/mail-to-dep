const smtp = require('smtp-protocol')
const { filterMailDomain, handleMailParse } = require('./utils')
const server = smtp.createServer(function (req) {
    req.on('to', function (to, ack) {
        filterMailDomain(to, ack) //过滤文件后缀
    })

    req.on('message', async function (stream, ack) {
        handleMailParse(stream, ack)
    })
    req.on('greeting', function (cmd, ack) {
        ack.accept()
    })
})

server.listen(25)
console.log('starting mail server listen port 25.')
