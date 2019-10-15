var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "rekognition_results";

exports.handler = (event, context, callback) => {
    var response = {
        statusCode: 200,
        headers : {
                "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify({"message" : "" })
    };

    // 取得対象のテーブル名をparamに宣言
    var param = {
        "TableName": tableName,
    };

    // dynamo.scan()で全件取得
    dynamo.scan(param, function(err, data) {
        if (err) {
            response.statusCode = 500;
            response.body = JSON.stringify({
                "message": "DynamoDB Error",
                "detail": err
            });
            callback(null, response);
            return;
        }

        // レスポンスボディの設定とコールバックを記述
        response.body = JSON.stringify({
            "results" : data.Items
        });
        callback(null, response);
    });

};