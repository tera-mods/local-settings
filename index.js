module.exports = function LocalSettings(mod) {
	mod.settings.$init({
		version: 1,
		defaults: {
			ui: null,
			chatOption: null
		}
	})

	// UI
	mod.hook('C_REQUEST_CLIENT_UI_SETTING', 1, event => {
		accountId = event.accountId

		if(mod.settings.ui) {
			mod.send('S_REPLY_CLIENT_UI_SETTING', 1, {
				accountId: event.accountId,
				uis: mod.settings.ui
			})
			return false
		}
	})

	mod.hook('S_REPLY_CLIENT_UI_SETTING', 1, event => {
		if(mod.settings.ui) return false
		mod.settings.ui = event.uis
	})

	mod.hook('C_SAVE_CLIENT_UI_SETTING', 1, event => {
		mod.settings.ui = event.uis
	})

	// Chat options
	mod.hook('C_REQUEST_CLIENT_CHAT_OPTION_SETTING', 1, event => {
		if(mod.settings.chatOption) {
			mod.send('S_REPLY_CLIENT_CHAT_OPTION_SETTING', 1, Object.assign({ accountId: event.accountId }, mod.settings.chatOption))
			return false
		}
	})

	mod.hook('S_REPLY_CLIENT_CHAT_OPTION_SETTING', 1, event => {
		if(mod.settings.chatOption) return false
		mod.settings.chatOption = event
	})

	mod.hook('C_SAVE_CLIENT_CHAT_OPTION_SETTING', 1, event => {
		delete event.accountId
		mod.settings.chatOption = event
	})
}