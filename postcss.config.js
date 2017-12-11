module.exports = (ctx) => ({
	map: ctx.options.map,
	plugins: [
		require('postcss-import')(),
		require('postcss-custom-properties')(),
		require('postcss-extend-rule')(),
		require('postcss-logical')(),
		require('postcss-nesting')(),
		require('postcss-media-fn')(),
		require('postcss-custom-media')(),
		require('postcss-media-minmax')(),
		require('postcss-dir-pseudo-class'),
		require('autoprefixer')()
	].concat(
		process.argv.includes('--compress') ? [
			require('cssnano')({
				normalizeUrl: false,
				preset: ['default', {
					normalizeUrl: false
				}]
			}),
			compress()
		] : [
			require('postcss-discard-comments')(),
			require('postcss-discard-duplicates')(),
			require('postcss-discard-overridden')(),
			require('postcss-discard-empty')(),
			require('postcss-merge-rules')(),
			require('postcss-calc')(),
			compress()
		]
	)
});

// tooling
const postcss = require('postcss');

// plugin
const compress = postcss.plugin('postcss-discard-tested-duplicate-declarations', (opts) => (root) => {
	const testProp  = opts && 'testProp' in opts ? opts.testProp : (prop) => !/^:*-/.test(prop);
	const testValue = opts && 'testValue' in opts ? opts.testValue : (value) => !/(^var|^\s*-|\s+-\w+-)/.test(value);

	root.walkRules((rule) => {
		var propsMap = {};

		rule.nodes.slice(0).forEach((decl) => {
			if (testProp(decl.prop) && testValue(decl.value)) {
				const prevDecl = propsMap[decl.prop];

				if (prevDecl) {
					if (testValue(prevDecl.value)) {
						if (decl.import || !prevDecl.import) {
							prevDecl.remove();

							propsMap[decl.prop] = decl;
						} else {
							decl.remove();
						}
					}
				} else {
					propsMap[decl.prop] = decl;
				}
			}
		})
	});
});
