import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

var s3 = new aws.S3({
  secretAccessKey: process.env.S3_SECRET_KEY!,
  accessKeyId: process.env.S3_KEY!,
  region: "us-east-2",
});

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "baytdev",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + ".png");
    },
  }),
});

export default upload.array("images", 3);