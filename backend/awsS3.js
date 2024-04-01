const AWS = require('aws-sdk')
const NAME_OF_BUCKET = process.env.AWS_BUCKET_NAME
const multer = require('multer')
const s3 = new AWS.S3({ apiVersion: "2006-03-01" })

// --------------------------- Public UPLOAD ------------------------
// deleteObject(params = {}, callback) => AWS.Reqest
const singlePublicFileUpload = async (file) => {
    const { originalname, mimetype, buffer } = await file;
    const path = require("path");
    // name of the file in your S3 bucket will be the date in ms plus the extension name
    const Key = new Date().getTime().toString() + path.extname(originalname);
    const uploadParams = {
        Bucket: NAME_OF_BUCKET,
        Key,
        Body: buffer,
        ACL: "public-read",
    };
    const result = await s3.upload(uploadParams).promise();

    // save the name of the file in your bucket as the key in your database to retrieve for later
    return result.Location;
};

const multiplePublicFileUpload = async (files) => {
    return await Promise.all(
        files.map((file) => {
            return singlePublicFileUpload(file);
        })
    );
};


const deleteSingleFile = async (fileKey) => {
    try {
        const deleteParams = {
            Bucket: NAME_OF_BUCKET,
            Key: fileKey
        }
        s3.deleteObject(deleteParams, (err, data) => {
            // if (err) console.log(err, err.stack);
            // else console.log(data);
        });
    }
    catch (e) {
        return e
    }
}

const deleteMultipleFiles = async (fileKeyArray) => {
    try {
        const params = {
            Bucket: NAME_OF_BUCKET,
            Delete: {
                Objects: [

                ],
                Quiet: false
            }
        }
        for (let key in fileKeyArray) {
            const obj = { Key: key }
            params.Delete.Objects.push(obj)
        }
        s3.deleteObjects(params, function (err, data) {
            // if (err) console.log(err, err.stack);
            // else console.log(data);
        })
    }
    catch (e) {
        return e
    }
}
// --------------------------- Prviate UPLOAD ------------------------

const singlePrivateFileUpload = async (file) => {
    const { originalname, mimetype, buffer } = await file;
    const path = require("path");
    // name of the file in your S3 bucket will be the date in ms plus the extension name
    const Key = new Date().getTime().toString() + path.extname(originalname);
    const uploadParams = {
        Bucket: NAME_OF_BUCKET,
        Key,
        Body: buffer,
    };
    const result = await s3.upload(uploadParams).promise();

    // save the name of the file in your bucket as the key in your database to retrieve for later
    return result.Key;
};

const multiplePrivateFileUpload = async (files) => {
    return await Promise.all(
        files.map((file) => {
            return singlePrivateFileUpload(file);
        })
    );
};

const retrievePrivateFile = (key) => {
    let fileUrl;
    if (key) {
        fileUrl = s3.getSignedUrl("getObject", {
            Bucket: NAME_OF_BUCKET,
            Key: key,
        });
    }
    return fileUrl || key;
};

// --------------------------- Storage ------------------------

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, "");
    },
});

const singleMulterUpload = (nameOfKey) => //'image' comes in
    multer({ storage: storage }).single(nameOfKey);
const multipleMulterUpload = (nameOfKey) =>
    multer({ storage: storage }).array(nameOfKey);

module.exports = {
    s3,
    singlePublicFileUpload,
    multiplePublicFileUpload,
    singlePrivateFileUpload,
    multiplePrivateFileUpload,
    retrievePrivateFile,
    singleMulterUpload,
    multipleMulterUpload,
    deleteSingleFile,
    deleteMultipleFiles
};
