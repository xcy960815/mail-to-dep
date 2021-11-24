const smtp = require('smtp-protocol')
const { filterMailDomain, handleMailParse } = require('./utils')
const server = smtp.createServer(function (req) {
    req.on('to', function (to, ack) {
        filterMailDomain(to, ack) //过滤文件后缀
    })

    req.on('message', async function (stream, ack) {
        handleMailParse(req, stream, ack)
    })
    req.on('greeting', function (_stream, ack) {
        ack.accept()
    })
})

server.listen(9025)
console.log('starting mail server listen port 9025.')
