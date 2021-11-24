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
    console.log('simpleParser--simpleParser', simpleParser)
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
        uploadAllAttachments
            .push
            // uploadfile(
            //     proj_id,
            //     gitlabToken,
            //     at.content,
            //     at.filename,
            //     at.contentType
            // )
            ()
    })

    // Promise.all(uploadAllAttachments).then((resArr) => {
    //     for (let i = 0; i < resArr.length; i++) {
    //         const atRes = resArr[i]
    //         if (!atRes.markdown) {
    //             console.log(atRes)
    //         }
    //         if (content.indexOf('（可在附件中查看）') >= 0) {
    //             content = content.replace(
    //                 new RegExp(
    //                     `((${parsed.attachments[i].filename.replace(
    //                         /\./g,
    //                         '\\.'
    //                     )})|(${atRes.alt}))（可在附件中查看）`,
    //                     'g'
    //                 ),
    //                 atRes.markdown
    //             )
    //         } else {
    //             content = content.replace(
    //                 /<img.*?(?:>|\/>)/,
    //                 atRes.markdown
    //             )
    //         }
    //     }

    //     commitIssues(
    //         proj_id,
    //         gitlabToken,
    //         parsed.subject,
    //         content
    //     ).then((res) => {
    //         console.log('\n创建成功：' + res.web_url)
    //     })

    //     console.log('from: ' + req.from)
    //     console.log('to: ' + req.to)
    //     console.log('subject:' + parsed.subject)
    //     console.log(content)
    // })
    ack.accept()
}
module.exports = { filterMailDomain, handleMailParse }
