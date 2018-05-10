class InjectTagPlugin {
    /**
     * 要插入的标签
     * @param {Array} options 
     * {
     *  js: [],
     *  css: [],
     * }
     */
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        const { head = [], body = [] } = this.options
        compiler.plugin('compilation', function (compilation, options) {
            compilation.plugin('html-webpack-plugin-alter-asset-tags', function (htmlPluginData, callback) {
                /** 
                 * { head, body }
                 */
                for (let i = 0, l = head.length; i < l; i += 1) {
                    const file = head[i];
                    let tag = null;
                    // 处理资源类型
                    if (/.js($|\?)/.test(file)) {
                        tag = {
                            tagName: 'script',
                            closeTag: true,
                            attributes: {
                                type: 'text/javascript',
                                src: file,
                            },
                        };
                    } else if (/.css($|\?)/.test(file)) {
                        tag = {
                            tagName: 'link',
                            selfClosingTag: true,
                            attributes: {
                                rel: 'stylesheet',
                                href: file,
                            },
                        };
                    }
                    htmlPluginData.head.push(tag);
                }
                for (let i = 0, l = body.length; i < l; i += 1) {
                    const file = body[i];
                    let tag = null;
                    // 处理资源类型
                    if (/.js($|\?)/.test(file)) {
                        tag = {
                            tagName: 'script',
                            closeTag: true,
                            attributes: {
                                type: 'text/javascript',
                                src: file,
                            },
                        };
                    } else if (/.css($|\?)/.test(file)) {
                        tag = {
                            tagName: 'link',
                            selfClosingTag: true,
                            attributes: {
                                rel: 'stylesheet',
                                href: file,
                            },
                        };
                    }
                    htmlPluginData.body.push(tag);
                }
                callback(null, htmlPluginData);
            });
        });
    }
}

module.exports = InjectTagPlugin;
