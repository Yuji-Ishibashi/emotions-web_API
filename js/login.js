var vm = new Vue({
	el: "#app", //Vue.jsを使うタグのIDを指定
	data: {
		// Vue.jsで使う変数はここに記載する
		mode: "login",
		submitText: "ログイン",
		toggleText: "新規登録",
		user: {
			userId: null,
			password: null,
			nickname: null,
			age: null
		}
	},
	methods: {
		// Vue.jsで使う関数はここで記述する
		toggleMode: function() {
			if (vm.mode == "login"){
				vm.mode = "signup";
				vm.submitText = "新規登録";
				vm.toggleText = "ログイン";
			} else if (vm.mode == "signup"){
				vm.mode = "login";
				vm.submitText = "ログイン";
				vm.toggleText = "新規登録";
			}
		},
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
	},
	computed: {
		// 計算した結果を変数として利用したいときはここに記載する

	}
})