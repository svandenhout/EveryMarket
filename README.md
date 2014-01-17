BoodSchappenRuilApp
===================

An application to query for ingredients in the neigbourhood,
a user can register and put his ingredients online for others to see. 
You will find the ingredients you don't allways have but sometimes 
need for a dish. Ingredients like flour, sugar, herbs and vegetables.

The app will try to emphasise home grown products, since the app
is location based. You can now truly eat local.

The app is not a mobile endeavor for the simple reason that this is
not person based. We don't need your location, we need the location
of the delicious ingredients you're keeping etc. 

Features
--------

- database for storing facebook users, addresses & Products
- google maps geocoding for checking products in the neighbourhood
- contact other users via facebook messages
- posting, editing & deleting freshly grown ingredients.
- big map showing the location of the selected ingredients


ToDo:
- facebook chat api: the facebook chat api is only usable by using/ building a chatserver which is very bad for the project scope. I will use the api to send a message to a user.

- the most usable sollution will probably be let the seller select a timeframe
when users can visit to buy: not using this anymore, might be good but very hard to design

- intergrate the facebook messages into the app (might do later)
- intergrate payment & shipping options
- search

Database structure
------------------

database has 2 tables, Users & ingredients.
Obviously a user can have multiple ingredients.

Users (id, fb_id, name, location)
Ingredients (id, userId, name, description, picture)

User has many Products
Product has one User....

Models
------

the project has 2 models, User and product.
Both models are used to get, post, update and delete from
their respective tables. 

Sketches
--------

need to upload some sketches..