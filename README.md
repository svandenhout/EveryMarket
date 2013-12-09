BoodSchappenRuilApp
===================

An application used to trade surplus groceries with other users

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

