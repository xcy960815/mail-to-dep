const { maildDomain } = require('./mail-config.js')
const simpleParser = require('mailparser').simpleParser // 解析邮件内容
/**
 * 解析邮件后缀 比如 @abc.com
 * @param {邮件来源信息} to
 * @param {Object} ack
 */
function filterMailDomain(to, ack) {
    const mailDomain = to.split('@')[1]
    if (mailDomain === maildDomain) {
        ack.accept()
    } else {
        console.log('不支持的邮箱地址后缀:', mailDomain)
        ack.reject()
    }
}
/**
 * 解析邮件内容
 * @param stream
 */
async function handleMailParse(stream, ack) {
    const parsed = await simpleParser(stream)
    const content = parsed.html || parsed.text
    console.log('content---content', content)
    const uploadAllAttachments = []
    const attachments = parsed.attachments
    attachments.forEach((attachment) => {
        const filename = attachment.filename
        const content = attachment.content
        const contentType = attachment.contentType
        console.log('处理附件：', filename)
        console.log('处理附件：', content)
        console.log('处理附件：', contentType)
    })

    ack.accept()
}
module.exports = { filterMailDomain, handleMailParse }
