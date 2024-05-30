db = db.getSiblingDB('emaildb');

db.createCollection('emails');

db.emails.insertOne({
    data: 'testing-data'
});

db.createUser(
    {
        user: "admin",
        pwd: "PamjEv431Qfmk",
        roles: [
            {
                role: "readWrite",
                db: "emaildb"
            }
        ]
    }
);