var app = new Vue({
	el: '#app',
	data: {
		errorMsg: "",
		successMsg: "",
		showCreateModal: false,
		showUpdateModal: false,
		showDeleteModal: false,
		posts: [],
		newPost: {title: "", body: ""},
		currentPost: {},
		dummyPostImage: [
			'https://images.unsplash.com/photo-1555982105-d25af4182e4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
			'https://images.unsplash.com/photo-1508423134147-addf71308178?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
			'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
			'https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
			'https://images.unsplash.com/photo-1467949576168-6ce8e2df4e13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
			'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
			'https://images.unsplash.com/photo-1550837368-6594235de85c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
			'https://images.unsplash.com/photo-1551431009-a802eeec77b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80',
		]
	},
	mounted: function() {
		this.getAllposts()
	},
	methods: {
		getAllposts() {
			axios.get("http://crud-vue-php.local/process.php?action=read").then(function(response) {
				if(response.data.error) {
					app.errorMsg = response.data.message
				}
				else {
					app.posts = response.data.posts
					for(var i = 0; i < app.posts.length; i ++) {
						app.posts[i].date = moment(app.posts[i].date, 'YYYY-MM-DD').format('YYYY年M月D日')
					}
				}
			})
		},

		createPosts() {
			var formData = app.toFormData(app.newPost)
			axios.post("http://crud-vue-php.local/process.php?action=create", formData).then(function(response) {
				app.newPost = {title: "", body: ""}
				if(response.data.error) {
					app.errorMsg = response.data.message
				}
				else {
					app.successMsg = response.data.message
					app.getAllposts()
				}
			})
		},

		updatePost() {
			var formData = app.toFormData(app.currentPost)
			axios.post("http://crud-vue-php.local/process.php?action=update", formData).then(function(response) {
				app.currentPost = {}
				if(response.data.error) {
					app.errorMsg = response.data.message
				}
				else {
					app.successMsg = response.data.message
					app.getAllposts()
				}
			})
		},

		deletePost() {
			var formData = app.toFormData(app.currentPost)
			axios.post("http://crud-vue-php.local/process.php?action=delete", formData).then(function(response) {
				app.currentPost = {}
				if(response.data.error) {
					app.errorMsg = response.data.message
				}
				else {
					app.successMsg = response.data.message
					app.getAllposts()
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

		selectPost(post) {
			app.currentPost = post
		},

		clearMsg() {
			app.errorMsg = ""
			app.successMsg = ""
		},

	}
})