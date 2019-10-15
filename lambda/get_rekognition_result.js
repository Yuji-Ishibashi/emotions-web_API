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

    var fileId = event.queryStringParameters.fileId;
    var userId = fileId.split( '*' )[0];
    console.log("-------" + userId);

    // 取得対象のテーブル名と検索に使うキーをparamに宣言
    var param = {
        "TableName": tableName,
        "Key": {
            "userId": userId,
            "fileId": fileId
        }
    };

    // dynamo.get()でDBからデータを取得
    dynamo.get(param, function(err, data) {
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
        response.body = JSON.stringify(data.Item);
        callback(null, response);
    });
    
};