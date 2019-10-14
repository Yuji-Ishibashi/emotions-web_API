var vm = new Vue({
	el: "#app", //Vue.jsを使うタグのIDを指定
	data: {
		// Vue.jsで使う変数はここに記載する
		result: {
			sad: null,
			surprised: null,
			smile: null,
			calm: null,
			angry: null,
		}
	},
	methods: {
		// Vue.jsで使う関数はここで記述する
		getresult: function(){
			     // ユーザー情報取得APIにGETリクエストを送る
				fetch(url + "/result" + "?fileId=" + localStorage.getItem('filename'),
				 {method: "GET"})
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
					vm.result.sad = json.sad
					vm.result.surprised = json.surprised
					vm.result.smile = json.smile
					vm.result.calm = json.calm
					vm.result.angry = json.angry
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