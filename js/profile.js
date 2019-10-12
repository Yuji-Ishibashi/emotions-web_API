var vm = new Vue({
	el: "#app", //Vue.jsを使うタグのIDを指定
	data: {
		// Vue.jsで使う変数はここに記載する
		user: {
			userId: null,
			password: null,
			nickname: null,
			age: null
		}
	},
	methods: {
		// Vue.jsで使う関数はここで記述する
		submit: function(){
				// ユーザー情報編集APIにPUTリクエストを送る
				fetch(url + "/user", {
					method: "PUT",
					headers:new Headers({
						"Authorization" : localStorage.getItem('token')
					}),
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
		},
		deleteUser: function(){
				// ユーザー削除処理APIにPOSTリクエストを送る
				fetch(url + "/user", {
					method: "DELETE",
					headers:new Headers({
						"Authorization" : localStorage.getItem('token')
					}),
					body: JSON.stringify({
						"userId" : localStorage.getItem('userId')
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
					location.href = "./login.html"
				})
				.catch(function(err){
					// レスポンスがエラーで返ってきたときの処理はここで記載する
				})
		}

	},
	created: function(){
		// Vue.jsの読み込みが完了したときに実行する処理はここで記載する
	},
	computed: {
		// 計算した結果を変数として利用したいときはここに記載する

	}
})