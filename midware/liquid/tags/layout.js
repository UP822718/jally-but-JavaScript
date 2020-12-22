const {
	BlockMode,
	assert,
	evalQuotedToken,
	TypeGuards,
	evalToken,
	Tokenizer,
	Emitter,
	Hash,
	TagToken,
	TopLevelToken,
	Context,
	TagImplOptions,
	Liquid
} = require('liquidjs');
export = {
	"parse": function(token,TopLevelToken) {
		const tokenizer = new Tokenizer(token.args)
		const file = this.liquid.options.dynamicPartials ? tokenizer.readValue() : tokenizer.readFileName()


	},
	"render": function(ctx, emitter) {

	}
}
