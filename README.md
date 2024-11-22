Github page link : https://kingwillex.github.io/AppFullStack/
Backend repository link: https://github.com/KingWillex/back-end-fullstack.git
Frontend link: https://github.com/KingWillex/AppFullStack.git





mongodb collections 
collection name :order
[{
  "_id": {
    "$oid": "673e1a9b76b1daa46cb19cac"
  },
  "customerDetails": {
    "firstName": "Adaghe King",
    "lastName": "Williams",
    "email": "willexofficial@gmail.com",
    "phone": "07448185900",
    "address": "49 talbot road eastham london",
    "city": "Newham",
    "state": "g",
    "zip": "E6 2RY"
  },
  "items": [
    {
      "productId": 102,
      "title": "Physics",
      "quantity": 5,
      "price": 20
    },
    {
      "productId": 101,
      "title": "Mathematics",
      "quantity": 1,
      "price": 15
    }
  ],
  "totalPrice": 35
},
{
  "_id": {
    "$oid": "6740af5ebe8a4326d07cbfaf"
  },
  "customerDetails": {
    "firstName": "Omar",
    "lastName": "Jassim",
    "email": "troveomar@gmail.com",
    "phone": "07904481118",
    "address": "1161, 5th Floor, Amanda House, 17 St. George Wharf",
    "city": "Vauxhall",
    "state": "Greater London",
    "zip": "SW8 2FE"
  },
  "items": [
    {
      "productId": 102,
      "title": "Physics",
      "quantity": 1,
      "price": 20
    }
  ],
  "totalPrice": 20
}]







collection name: products 
[{
  "_id": {
    "$oid": "673c8faebf62ae506caee147"
  },
  "id": 101,
  "title": "Mathematics",
  "price": 15,
  "description": "An essential subject focused on numbers, calculations, shapes, and patterns.",
  "image": "images/mathematics-textbook.jpg",
  "inventory": 4,
  "rating": 3
},
{
  "_id": {
    "$oid": "673c8faebf62ae506caee148"
  },
  "id": 102,
  "title": "Physics",
  "price": 20,
  "description": "A subject that explores the fundamental nature of the universe, from atoms to galaxies.",
  "image": "images/physics-textbook.jpg",
  "inventory": 4,
  "rating": 4
},
{
  "_id": {
    "$oid": "673c8faebf62ae506caee149"
  },
  "id": 103,
  "title": "Chemistry",
  "price": 18,
  "description": "The study of substances, their properties, and how they interact.",
  "image": "images/chemistry-textbook.jpg",
  "inventory": 5,
  "rating": 4
},
{
  "_id": {
    "$oid": "673c8faebf62ae506caee14a"
  },
  "id": 104,
  "title": "Biology",
  "price": 17.5,
  "description": "A subject focused on living organisms, their structure, function, and evolution.",
  "image": "images/biology-textbook.jpg",
  "inventory": 5,
  "rating": 4
},
{
  "_id": {
    "$oid": "673c8faebf62ae506caee14b"
  },
  "id": 105,
  "title": "Computer Science",
  "price": 25,
  "description": "The study of computers, algorithms, and computational systems.",
  "image": "images/computer-science-textbook.jpg",
  "inventory": 5,
  "rating": 4
},
{
  "_id": {
    "$oid": "673c8faebf62ae506caee14c"
  },
  "id": 106,
  "title": "History",
  "price": 12,
  "description": "An exploration of past events, civilizations, and cultural developments.",
  "image": "images/history-textbook.jpg",
  "inventory": 5,
  "rating": 4
},
{
  "_id": {
    "$oid": "673c8faebf62ae506caee14d"
  },
  "id": 107,
  "title": "Geography",
  "price": 14,
  "description": "The study of Earth's landscapes, environments, and human relationships with the planet.",
  "image": "images/geography-textbook.jpg",
  "inventory": 5,
  "rating": 4
},
{
  "_id": {
    "$oid": "673c8faebf62ae506caee14e"
  },
  "id": 108,
  "title": "English Literature",
  "price": 16.5,
  "description": "The study of written works, including prose, poetry, and drama.",
  "image": "images/english-literature-textbook.jpg",
  "inventory": 5,
  "rating": 4
},
{
  "_id": {
    "$oid": "673c8faebf62ae506caee14f"
  },
  "id": 109,
  "title": "Economics",
  "price": 19,
  "description": "The study of the economy, including production, consumption, and wealth distribution.",
  "image": "images/economics-textbook.jpg",
  "inventory": 5,
  "rating": 4
},
{
  "_id": {
    "$oid": "673c8faebf62ae506caee150"
  },
  "id": 110,
  "title": "Philosophy",
  "price": 22,
  "description": "An exploration of fundamental questions regarding existence, knowledge, values, and reason.",
  "image": "images/philosophy-textbook.jpg",
  "inventory": 5,
  "rating": 4
}]












Postman in json format:
{
	"info": {
		"_postman_id": "6585b63d-de30-456c-925a-92d42f9d26ed",
		"name": "vue bookstore",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "33000676"
	},
	"item": [
		{
			"name": "http://localhost:3000/products/",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://back-end-fullstack-2.onrender.com/products",
					"protocol": "https",
					"host": [
						"back-end-fullstack-2",
						"onrender",
						"com"
					],
					"path": [
						"products"
					]
				}
			},
			"response": []
		},
		{
			"name": "http://localhost:3000/products/672a29325e531be48a463c5a",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://back-end-fullstack-2.onrender.com/products/673c8faebf62ae506caee147",
					"protocol": "https",
					"host": [
						"back-end-fullstack-2",
						"onrender",
						"com"
					],
					"path": [
						"products",
						"673c8faebf62ae506caee147"
					]
				}
			},
			"response": []
		},
		{
			"name": "http://localhost:3000/products",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n  \"id\": \"1\",\r\n  \"title\": \"Harry Potter and the Sorcerer's Stone\",\r\n  \"price\": 19.99,\r\n  \"description\": \"Harry Potter, a young boy, discovers that he is a wizard and is invited to attend a magical school called Hogwarts. There, he makes friends and confronts the dark wizard who killed his parents.\",\r\n  \"image\": \"images/14.png\",\r\n  \"inventory\": 500,\r\n  \"rating\": 4\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "https://back-end-fullstack-2.onrender.com/products",
					"protocol": "https",
					"host": [
						"back-end-fullstack-2",
						"onrender",
						"com"
					],
					"path": [
						"products"
					]
				}
			},
			"response": []
		},
		{
			"name": "http://localhost:3000/products/67392517b0b3b4c8fed26825",
			"request": {
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "https://back-end-fullstack-2.onrender.com/products/6740b050be8a4326d07cbfb0",
					"protocol": "https",
					"host": [
						"back-end-fullstack-2",
						"onrender",
						"com"
					],
					"path": [
						"products",
						"6740b050be8a4326d07cbfb0"
					]
				}
			},
			"response": []
		},
		{
			"name": "http://localhost:3000/products/purchase",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n  \"items\": [\r\n    { \"productId\": \"673c8faebf62ae506caee147\", \"quantity\": 1 },\r\n    { \"productId\": \"673c8faebf62ae506caee148\", \"quantity\": 1 }\r\n  ]\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "https://back-end-fullstack-2.onrender.com/products/purchase",
					"protocol": "https",
					"host": [
						"back-end-fullstack-2",
						"onrender",
						"com"
					],
					"path": [
						"products",
						"purchase"
					]
				}
			},
			"response": []
		},
		{
			"name": "https://back-end-fullstack-2.onrender.com/products/673c8faebf62ae506caee147",
			"request": {
				"method": "PATCH",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"rating\": 5\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "https://back-end-fullstack-2.onrender.com/products/673c8faebf62ae506caee147",
					"protocol": "https",
					"host": [
						"back-end-fullstack-2",
						"onrender",
						"com"
					],
					"path": [
						"products",
						"673c8faebf62ae506caee147"
					]
				}
			},
			"response": []
		}
	]
}
