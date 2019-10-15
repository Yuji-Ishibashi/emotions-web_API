const aws = require('aws-sdk');
const rekognition = new aws.Rekognition();
var dynamo = new aws.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
    // console.log('Received event:', JSON.stringify(event, null, 2));
    // ファイル名を取得
    var fileName = event.Records[0].s3.object.key;
    // ファイル名からuserIdを取得
    var userId = fileName.split( '*' )[0];

    // eventからobjectを取得
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const rekognitionParams = {
        Image: {
            S3Object: {
                Bucket: bucket,
                Name: key
            }
        },
        Attributes: ["ALL"]
    };

    try {
        // rekognitionで顔解析
        const data = await rekognition.detectFaces(rekognitionParams).promise();

        var json = JSON.stringify(data);
        json = JSON.parse( json );
        console.log("--------------------" + json.FaceDetails[0].Emotions);
        var emotions = json.FaceDetails[0].Emotions;

        // emotionsを配列で回して各感情のconfidenceを取得
        for (var i = 0; i < emotions.length; i++){
            if (emotions[i].Type == "SAD"){ var sadConfidence = emotions[i].Confidence.toFixed(2) }
            else if (emotions[i].Type == "ANGRY"){ var angryConfidence = emotions[i].Confidence.toFixed(2) }
            else if (emotions[i].Type == "SURPRISED"){ var surprisedConfidence = emotions[i].Confidence.toFixed(2) }
            else if (emotions[i].Type == "CALM"){ var calmConfidence = emotions[i].Confidence.toFixed(2) }
        }

        var params = {
            // テーブル名を指定
            TableName: 'rekognition_results',
            Item:{
                 userId: userId,
                 fileId: fileName,
                 smile: json.FaceDetails[0].Smile.Confidence.toFixed(2),
                 sad: sadConfidence,
                 angry: angryConfidence,
                 calm: calmConfidence,
                 surprised: surprisedConfidence
            },
            ReturnValues: "ALL_OLD"
        };
         const result = await dynamo.put(params).promise();
         callback(null,result.Attributes);

            } catch (err) {
                console.log(err);
                const message = `Error detecting face ${key} from bucket ${bucket}.`;
                throw new Error(message);
            }
};