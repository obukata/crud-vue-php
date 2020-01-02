var app = new Vue({
	el: '#app',
	data: {
		errorMsg: "",
		successMsg: "",
		showAddModal: false,
		showEditModal: false,
		showDeleteModal: false,
		users: [],
		newUser: {name: "", email: "", phone: ""},
		currentUser: {}
	},
	mounted: function() {
		this.getAllusers()
	},
	methods: {
		getAllusers() {
			axios.get("http://crud-vue-php.local/_process.php?action=read").then(function(response) {
				if(response.data.error) {
					app.errorMsg = response.data.message
				}
				else {
					app.users = response.data.users
					console.log(app.users)
				}
			})
		},

		addUser() {
			var formData = app.toFormData(app.newUser)
			axios.post("http://crud-vue-php.local/_process.php?action=create", formData).then(function(response) {
				app.newUser = {name: "", email: "", phone: ""}
				if(response.data.error) {
					app.errorMsg = response.data.message
				}
				else {
					app.successMsg = response.data.message
					app.getAllusers()
				}
			})
		},

		updateUser() {
			var formData = app.toFormData(app.currentUser)
			axios.post("http://crud-vue-php.local/_process.php?action=update", formData).then(function(response) {
				app.currentUser = {}
				if(response.data.error) {
					app.errorMsg = response.data.message
				}
				else {
					app.successMsg = response.data.message
					app.getAllusers()
				}
			})
		},

		deleteUser() {
			var formData = app.toFormData(app.currentUser)
			axios.post("http://crud-vue-php.local/_process.php?action=delete", formData).then(function(response) {
				app.currentUser = {}
				if(response.data.error) {
					app.errorMsg = response.data.message
				}
				else {
					app.successMsg = response.data.message
					app.getAllusers()
				}
			})
		},

		toFormData(obj) {
			var fd = new FormData
			for(var i in obj) {
				fd.append(i, obj[i])
			}
			return fd
		},

		selectUser(user) {
			app.currentUser = user
		},

		clearMsg() {
			app.errorMsg = ""
			app.successMsg = ""
		}
	}
})