----------------------Register--------------------------------------------
(POST) > http://localhost:5000/api/auth/register
(body) => { 
    "name": "rohit mishra",
    "email":"rohitmhr.99@gmail.com",
    "password":"rohit123@",
    "phone":7987466251,
    "role":"user"
}
(response) => Registration successful

--------------------Get all user--------------------------
(GET)->http://localhost:5000/api/auth/users

----------------Login-----------------------------------
(POST) => http://localhost:5000/api/auth/login
(Body) => {
    "email":"rohitmhr.99@gmail.com",
    "password":"rohit123@"
} 
(response)-> { "auth": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzljMDMyMzlhMGExOTVhODViNTYwMiIsImlhdCI6MTY4NTcwMTM0MCwiZXhwIjoxNjg1Nzg3NzQwfQ.ZWEhaZnoDBeyG5XRP1jEvI4XioExyFiMV3Vl7fODfdE"
} 

-----------------UserInfo------------------------
(GET) => http://localhost:5000/api/auth/userInfo

(Headers) => key:x-access-token value:Token value from login

(response)-> {
    "_id": "6479c03239a0a195a85b5602",
    "name": "rohit mishra",
    "email": "rohitmhr.99@gmail.com",
    "password": "$2a$08$236X.sXgx3oXBu4raSzGk.ZIFS2dsKvLs27mL1zgAH/emkpkb3fwq",
    "phone": 7987466251,
    "role": "user",
    "__v": 0
}