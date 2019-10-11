// APIにGETリクエストを送る
fetch(url + "/test/exho" + "?key1=value1&key2=value2&key3=value3", {
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
	})
	.catch(function(err){
		// レスポンスがエラーで返ってきたときの処理はここで記載する
	})
