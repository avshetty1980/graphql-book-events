const express = require("express");
const dotenv = require("dotenv");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

dotenv.config();

const app = express();

app.use(express.json());

// app.get("/", (req, res, next) => {
//     res.send("I am Here!!!");
// });

app.use("/graphql", graphqlHTTP({
    schema: buildSchema(`

        type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            createEvent(name: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return [
            "Romantic Cooking",
            "Sailing",
            "All night coding"
            ];
        },
        createEvent: (args) => {
            const eventName = args.name;
            return eventName;
        }
        
    },
    graphiql: true
}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}!`));
