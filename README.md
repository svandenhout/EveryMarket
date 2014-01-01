BoodSchappenRuilApp
===================

An application used to query ingredients in the neigbourhood,
a user can register and put his food online for others to see. 
You will find the ingredients you don't allways have but sometimes 
need for a dish. Ingredients like flour, sugar, herbs and vegetables.

The app will try to emphasise home grown products, since the app
is location based. You can now truly eat local.

The app is not a mobile endeavor for the simple reason that this is
not truly person based. We don't need your location, we need the location
of the delicious ingredients you're keeping etc. 

Features KEEP IT SIMPLE STUPID
--------

- database for storing ~Users (or use facebook) & Products
- google maps geocoding for checking products in the neighbourhood

problems
- how do people approach each other

sollutions
- facebook chat api (seems like the best possibility)
- require facebook login (will change the system quite a bit)

extras (i will not do these)
- intergrate payment & shipping options

comments
- i'm such an idiot for making 2 models before everything was thought out....

Database structure
------------------

database has 2 tables, Users & groceries.
Obviously a user can have multiple groceries.

User (id, name, location, email)
Product (id, userId, name, description, picture)

User has many Procucts
Product has one User....

Models
------

the project has 2 models, User and product.
Both models are used to get, post, update and delete from
their respective databases. 

Sketches
--------

will upload sketches :)