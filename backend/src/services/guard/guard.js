const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const User = require("../models/user/user");
const bcrypt = require("bcryptjs");
const upload = require("../utils/multerS3").upload;
const cognitoJwtVerifier = require("aws-jwt-verify")
dotenv.config();


// Cognito keys
let cognitoKeys = {
  cognito: {
    UserPoolId: process.env.UserPoolId,
    ClientId: process.env.ClientId
  },
}
// Rekognition Keys
let rekognitionKeys= {
  region: 'us-east-1',
  accessKeyId: process.env.ACCES_KEY_REKOGNITION,
  secretAccessKey: process.env.SECRET_ACCES_KEY_REKOGNITION,
}

// Translate keys
let translateKeys= {
  region: 'us-east-1',
  accessKeyId: process.env.ACCES_KEY_TRANSLATE,
  secretAccessKey: process.env.SECRET_ACCES_KEY_TRANSLATE
}

// configure cognito
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const cognito = new AmazonCognitoIdentity.CognitoUserPool(cognitoKeys.cognito);

// configure rekognition
var AWS = require('aws-sdk');
const rek = new AWS.Rekognition(rekognitionKeys);

// configure translate
const translate = new AWS.Translate(translateKeys);


module.exports.userLogin = async (req, res, next) => {
  let args = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    // Find the password
    const collectedPassword = await User.hashPassword(args);
    // Verify if exists the password
    if (collectedPassword.length > 0) {
      // Password collect
      const hashPassword = collectedPassword[0]["password"];
      // Verify coincidence
      if (bcrypt.compareSync(args.password, hashPassword)) {
        // credential data
        args = {
          email: args.email,
          password: hashPassword,
        };
        var authenticationData = {
          Username: args.email,
          Password: args.password,
        };
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
          authenticationData
        );
        var userData = {
          Username: args.email,
          Pool: cognito,
        };
        // Cognito idenity verification
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
          // OnSucces login
          onSuccess: async function (result) {
            const queryResult=await User.login(args);
            return res.status(200).json({
              status: 200,
              message: "Inicio de sesión exitoso de usuario 😎",
              data: [
                {
                  dpi: queryResult[0],
                  name: queryResult[1],
                  email: queryResult[2],
                  photo: queryResult[3],
                  token:result.idToken.jwtToken
                },
              ],
            });
          },
          onFailure: function (err) {
            //console.log(err);
            const jsonError = JSON.stringify(err);
            const parsedJsonError = JSON.parse(jsonError);
            if (parsedJsonError.code === "UserNotConfirmedException") {
              // If the email is not confirmed
              return res.status(401).json({
                status: 409,
                message: "Dirección de correo electrónico no confirmado 😢 , confírmalo para poder iniciar sesión.",
              });
            }
          },
        });
      }else{
        // If not exists a user coincidence
        return res.status(409).json({
          status: 409,
          message: "Correo o contraseña incorrectos 😢 , intenta de nuevo.",
        });
      }
    }else{
      // If not exists a user coincidence
      return res.status(409).json({
        status: 409,
        message: "Correo o contraseña incorrectos 😢 , intenta de nuevo.",
      });
    }
    
  } catch (error) {
    console.log(error);
    // if an error occurs
    res.status(400).json({ status: 400, message: error });
  }
};

module.exports.rekognitionLogin = async (req, res, next) => {
	upload.single("img")(req, res, async (err) => {
		if (req.file !== undefined) {
      // Image key
      const keyFile = req.file.key;
      const email= req.body.email;
			try {
        // Get the user data by the email
        const user = await User.getSpecificUser(email);
        //If the email not exists
        // If the email is not confirmed
        if(!user[0]){
          return res.status(401).json({
            status: 409,
            message: "El email ingresado, no pertenece a ninguna cuenta en SemiSocial, intenta de nuevo 💀",
          });
        }
        
        var userLoginData=undefined;
        const targetImage = user[0].profile_photo_key; // Image key of the current user
        // Faces match config
        const params = {
          SourceImage: {
            S3Object: {
              Bucket: process.env.BUCKET_NAME,
              Name: keyFile, // Image key of the login image
            },
          },
          TargetImage: {
            S3Object: {
              Bucket: process.env.BUCKET_NAME,
              Name: targetImage, // Image key of the current user
            },
          },
          SimilarityThreshold: 80, // Valid similarity percentage
        };
          // Compare images
          const data = await rek.compareFaces(params).promise();
          // If a coincidence exists
          if(data.FaceMatches.length>0){
            userLoginData=user[0];
          }
        if (userLoginData){
          var authenticationData = {
            Username: userLoginData.email,
            Password: userLoginData.password,
          };
          var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
            authenticationData
          );
          var userData = {
            Username: userLoginData.email,
            Pool: cognito,
          };
          // Cognito idenity verification
          var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
          cognitoUser.authenticateUser(authenticationDetails, {
            // OnSucces login
            onSuccess: async function (result) {
              return res.status(200).json({
                status: 200,
                message: "Inicio de sesión exitoso de usuario 😎",
                data: [
                  {
                    dpi: userLoginData.dpi,
                    name: userLoginData.name,
                    email: userLoginData.email,
                    photo: userLoginData.profile_photo,
                    token:result.idToken.jwtToken
                  },
                ],
              });
            },
            onFailure: function (err) {
              //console.log(err);
              const jsonError = JSON.stringify(err);
              const parsedJsonError = JSON.parse(jsonError);
              if (parsedJsonError.code === "UserNotConfirmedException") {
                // If the email is not confirmed
                return res.status(401).json({
                  status: 409,
                  message: "Dirección de correo electrónico no confirmado 😢 , confírmalo para poder iniciar sesión.",
                });
              }
            },
          });
        }else{
          // If not exists a user coincidence
          return res.status(409).json({
            status: 409,
            message: "La imagen proporcionada no tuvo coincidencias para hacer un login 😢 , intenta de nuevo.",
          });
        }
        
      } catch (error) {
        console.log(error);
        res.status(500).json({
          status: 500,
          message: "Error iniciando sesión con reconocimiento facial 💀",
				});
			}
		} else {
			return res
				.status(500)
				.json({
					status: 500,
					message: "Fallo en la carga de la imagen para el reconocimiento facial 💀",
				});
		}
	});
};

module.exports.verifyCognitoToken = async (token) => {
  // Tokens verificator
  const verifier = cognitoJwtVerifier.CognitoJwtVerifier.create({
    userPoolId: process.env.UserPoolId,
    tokenUse: "id", 
    clientId: process.env.ClientId,
  });

  try {
    // Waiting to promise resolve
    const payload = await verifier.verify(token);
    // If is a valid token
    const user={
      name:payload.name,
      email:payload.email,
    }
    return user;
  } catch (error) {
    return "invalid"
  }
};


module.exports.userRegistration = async (dpi,email,name,password) => {
  var parametersList = [];
  // name data
  var nameDatum = {
    Name: 'name',
    Value: name,
  }
  var nameParameter = new AmazonCognitoIdentity.CognitoUserAttribute(nameDatum);
  parametersList.push(nameParameter);
  // email data
  var emailDatum = {
    Name: 'email',
    Value: email,
  }
  var emailParameter = new AmazonCognitoIdentity.CognitoUserAttribute(emailDatum);
  parametersList.push(emailParameter);
  // password data
  var passwordDatum = {
    Name: 'custom:password',
    Value: password,
  }
  var passwordParameter = new AmazonCognitoIdentity.CognitoUserAttribute(passwordDatum);
  parametersList.push(passwordParameter);
  // dpi data
  var dpiDatum = {
    Name: 'custom:dpi',
    Value: dpi,
  }
  var dpiParameter = new AmazonCognitoIdentity.CognitoUserAttribute(dpiDatum);
  parametersList.push(dpiParameter);

  
  // Cognito signUp user
  cognito.signUp(
    email,
    password,
    parametersList,
    null,
    async (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("User: ",email," registered on cognito succesfully :)" );
      return;
    },
  )
}


module.exports.userProfileUpdate = async (email, password, dpi,name) => {
  const authenticationData = {
    Username: email,
    Password: password,
  };

  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );

  const userData = {
    Username: email,
    Pool: cognito,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (session) => {
      const attributeList = [];

      if (name) {
        attributeList.push(
          new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: 'name',
            Value: name,
          })
        );
      }

      if (dpi) {
        attributeList.push(
          new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: 'custom:dpi',
            Value: dpi,
          })
        );
      }

      cognitoUser.updateAttributes(attributeList, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('User data updated successfully on Cognito!');
      });
    },
    onFailure: (err) => {
      console.error('Authentication failed:', err);
    },
  });
};

// Labels by image
module.exports.labelsByImage = (keyFile) => {
  return new Promise((resolve, reject) => {
    const params = {
      Image: {
        S3Object: {
          Bucket: process.env.BUCKET_NAME,
          Name: keyFile, // Image key of the login image
        },
      },
      MaxLabels: 10, // cosas o similitudes que aparecen en la imagen
    };

    rek.detectLabels(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data.Labels);
      }
    });
  });
};


// Translate text
module.exports.translateText = (text,language) => {
  return new Promise((resolve, reject) => {
    let params = {
      SourceLanguageCode: 'auto',
      TargetLanguageCode: language,
      Text: text,
    };
    translate.translateText(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data.TranslatedText);
      }
    });
  });
};