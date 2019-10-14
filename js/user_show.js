var vm = new Vue({
	el: "#app", //Vue.jsを使うタグのIDを指定
	data: {
		// Vue.jsで使う変数はここに記載する
		user: {
			userId: null,
			password: null,
			nickname: null,
			age: null
		},
		results: []
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
					alert('ユーザー情報の編集が完了しました。');
				})
				.catch(function(err){
					// レスポンスがエラーで返ってきたときの処理はここで記載する
					alert('ユーザー情報の編集に失敗しました。');
				})
		},
		deleteUser: function(){
				// ユーザー削除処理APIにPOSTリクエストを送る
				var test = window.confirm('本当に退会しますか');
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
					alert('ユーザー情報の削除が完了しました。');
				})
				.catch(function(err){
					// レスポンスがエラーで返ってきたときの処理はここで記載する
				})
		}

	},
	created: function(){
		// Vue.jsの読み込みが完了したときに実行する処理はここで記載する
		// ユーザー情報取得APIにGETリクエストを送る
		var thisuser = location.search.substring(1).split( '=' )[1];
		fetch(url + "/user" + "?userId=" + thisuser, {
			method: "GET"
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
			console.log(json);
			vm.user.userId = json.userId
			vm.user.nickname = json.nickname
			vm.user.age = json.age
			vm.user.password = json.password
		})
		.catch(function(err){
			// レスポンスがエラーで返ってきたときの処理はここで記載する
		})
		// 投稿結果取得APIにGETリクエストを送る
		fetch(url + "/user/results", {method: "GET"})
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
			console.log(json.results);
			result = json.results.filter(function (target) {
			// 		// return target.nickname.match(vm.query.nickname);
					return target.userId.match(vm.user.userId)
			// 		// vm.results = json.results;
			});
			vm.results = result;
		})
		.catch(function(err){
			// レスポンスがエラーで返ってきたときの処理はここで記載する
		})
	},
	computed: {
		// 計算した結果を変数として利用したいときはここに記載する

	}
})