/**
 * Inside the plugin function, `this` refers to the Liquid instance.
 *
 * @param Liquid: provides facilities to implement tags and filters.
 */

module.exports = function (Liquid) {
    this.registerTag('feed_meta', {
	  parse: function(token){
	  },
	  render: function(ctx, hash) {
		return ``;
	  }
	});
}
