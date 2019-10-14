var vm = new Vue({
	el: "#app", //Vue.jsを使うタグのIDを指定
	data: {
		// Vue.jsで使う変数はここに記載する
		users: [],
		query: {
			nickname: null,
			start: null,
			end: null
		}
	},
	methods: {
		// Vue.jsで使う関数はここで記述する
		submit: function(){
			if (vm.mode == "login"){
				// ログイン処理APIにPOSTリクエストを送る
				fetch(url + "/user/login", {
					method: "POST",
					body: JSON.stringify({
						"userId" : vm.user.userId,
						"password" : vm.user.password
					  })
					})
					.then(function(response) {
						if (response.status == 200) {
							return response.json();
						}
						// 200番以外のレスポンスはエラーを投げる
						return response.json().then(function(json) {
							throw new Error(json.message);
					  });
					})
					.then(function(json){
						// レスポンスが200で帰ってきたときの処理はここに記載する
						localStorage.setItem('token', json.token);
						localStorage.setItem('userId', vm.user.userId);
						location.href = "./profile.html"
					})
					.catch(function(err){
						// レスポンスがエラーで返ってきたときの処理はここで記載する
					})

			} else if (vm.mode == "signup") {
				// 新規登録処理APIにPOSTリクエストを送る
				fetch(url + "/user/signup", {
					method: "POST",
					body: JSON.stringify({
						"userId" : vm.user.userId,
						"password" : vm.user.password,
						"nickname" : vm.user.nickname,
						"age" : Number(vm.user.age)
					  })
					})
					.then(function(response) {
						if (response.status == 200) {
							return response.json();
						}
						// 200番以外のレスポンスはエラーを投げる
						return response.json().then(function(json) {
							throw new Error(json.message);
						});
					})
					.then(function(json){
						// レスポンスが200で帰ってきたときの処理はここに記載する
						var content = JSON.stringify(json, null, 2);
						console.log(content);
					})
					.catch(function(err){
						// レスポンスがエラーで返ってきたときの処理はここで記載する
					})

			}
		}
	},
	created: function(){
		// Vue.jsの読み込みが完了したときに実行する処理はここで記載する
		// ユーザー情報取得APIにGETリクエストを送る
		fetch(url + "/users", {method: "GET"})
			.then(function(response) {
				if (response.status == 200) {
					return response.json();
				}
				// 200番以外のレスポンスはエラーを投げる
				return response.json().then(function(json) {
					throw new Error(json.message);
				});
			})
			.then(function(json){
				// レスポンスが200で帰ってきたときの処理はここに記載する
				var content = JSON.stringify(json, null, 2);
				vm.users = json.users;
			})
			.catch(function(err){
				// レスポンスがエラーで返ってきたときの処理はここで記載する
			})
	},
	computed: {
		// 計算した結果を変数として利用したいときはここに記載する
		filteredUsers: function() {
			var result = this.users;
			if (this.query.nickname) {
				result = result.filter(function (target) {
					return target.nickname.match(vm.query.nickname);
				});
			}
			if (this.query.start) {
				result = result.filter(function (target) {
					return target.age >= vm.query.start;
				});
			}
			if (this.query.end) {
				result = result.filter(function (target) {
					return target.age <= vm.query.end;
				});
			}
			return result;
		}
	}
})