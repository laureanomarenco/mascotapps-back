"use strict";
// function login(email, password, callback) {
//     //this example uses the "pg" library
//     //more info here: https://github.com/brianc/node-postgres
//     const bcrypt = require('bcrypt');
//     const postgres = require('pg');
//     const conString = 'postgresql://postgres:DPEIk7R0jPRqEnKbDKYq@containers-us-west-43.railway.app:7152/railway';
//     postgres.connect(conString, function (err, client, done) {
//       if (err) return callback(err);
//       const query = 'SELECT id, nickname, email, password FROM users WHERE email = $1';
//       client.query(query, [email], function (err, result) {
//         // NOTE: always call `done()` here to close
//         // the connection to the database
//         done();
//         if (err || result.rows.length === 0) return callback(err || new WrongUsernameOrPasswordError(email));
//         const user = result.rows[0];
//         bcrypt.compare(password, user.password, function (err, isValid) {
//           if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));
//           return callback(null, {
//             user_id: user.id,
//             nickname: user.nickname,
//             email: user.email
//           });
//         });
//       });
//     });
//   }
// let multipleUserInfo = {
//   userProps: {
//     name: "lalito",
//     city: "Maracaibo",
//     contact: "1149344933",
//     image: "http://fotos.com/perritolindo.jpeg",
//     isDonator: null,
//   },
//   reviews: [
//     { id: "3232", comments: "muchos comentarios" },
//     { id: "233gadsS22", comments: "muchos comentarios más" },
//     { id: "123219808", comments: "muchos comentarios" },
//   ],
//   transactions: [
//     { id: "5813ha2jhd", status: "active", user_offering_id: "AusaAS84472" },
//     { id: "ASawdgjhd", status: "reviewed", user_offering_id: "AusaAS84472" },
//     { id: "11532shjhj", status: "ended", user_offering_id: "AusaAS84472" },
//   ],
// };
// - /users/contactInfo/
// Agregar el arreglo de reviews [{name:....., city:....., contact:....., image:...., isDonator:.....}, [{},{}{review}]]
// let multipleUserInfo = {
//   userProps: {
//     name: "Marito",
//     city: "Greenlandia, Salta",
//     contact: "1143920444",
//     image: "http://images.com/dogs/pictures/3234324.jpg",
//     isDonator: null,
//   },
//   reviews: [
//     {
//       id: "kudfgd3532",
//       comments: "comments largos",
//       reviewer_id: "KFHSA81221",
//     },
//     {
//       id: "332SFsa123",
//       comments: "comments cortos ",
//       reviewer_id: "KFHSA81221",
//     },
//     {
//       id: "opp93123",
//       comments: "comments mediums",
//       reviewer_id: "KFHSA81221",
//     },
//   ],
//   transactions: [
//     { id: "5813ha2jhd", status: "active", user_offering_id: "AusaAS84472" },
//     { id: "ASawdgjhd", status: "reviewed", user_offering_id: "AusaAS84472" },
//     { id: "11532shjhj", status: "ended", user_offering_id: "AusaAS84472" },
//   ],
// };
// let contactInfo = {
//   userProps: {
//     name: "Marito",
//     city: "Greenlandia, Salta",
//     contact: "1143920444",
//     image: "http://images.com/dogs/pictures/3234324.jpg",
//     isDonator: null,
//   },
//   reviews: [
//     {
//       id: "kudfgd3532",
//       comments: "comments largos",
//       reviewer_id: "KFHSA81221",
//     },
//     {
//       id: "332SFsa123",
//       comments: "comments cortos ",
//       reviewer_id: "KFHSA81221",
//     },
//     {
//       id: "opp93123",
//       comments: "comments mediums",
//       reviewer_id: "KFHSA81221",
//     },
//   ],
// };
// const infoTotal = {
//   userProps: { ...someUserInfo },
//   reviews: [...someUserReviews],
//   transactions: [...transactions],
// };
// async function getPostsOfUser (id:any) {
//   console.log(`Buscando los posteos de user con id: ${id}`);
//   try {
//     let postsOfUser = await db.Animal.findAll({where: {
//       UserId: id
//     }})
//     console.log(`${postsOfUser?.length} posts encontrados`);
//     return postsOfUser
//   } catch (error:any) {
//     return error.message
//   }
// }
