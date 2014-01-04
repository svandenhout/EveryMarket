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

Features KEEP IT SIMPLE STUPID
--------

- database for storing ~Users (or use facebook) & Products
- google maps geocoding for checking products in the neighbourhood
- !nope post ingredients to facebook? (i don't like this)

problems
- how do people approach each other??

sollutions
- facebook chat api (seems like the best possibility) 
! the facebook chat api is only usable by using/ building a chatserver
! which is very bad for the project scope 
- require facebook login (will change the system quite a bit)
! is has that now...

- the most usable sollution will probably be let the seller select a timeframe
when users can visit to buy 


extras (i will not do these)
- intergrate payment & shipping options

comments
- i'm such an idiot for making 2 models before everything was thought out....

Database structure
------------------

database has 2 tables, Users & ingredients.
Obviously a user can have multiple ingredients.

Users (id, name, location, email)
Ingredients (id, userId, name, description, picture, timeframe)

User has many Procucts
Product has one User....

Models
------

the project has 2 models, User and product.
Both models are used to get, post, update and delete from
their respective tables. 

Sketches
--------

need to upload some sketches..