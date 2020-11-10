const express = require("express");
const dotenv = require("dotenv");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

dotenv.config();

const app = express();

const events = [];

app.use(express.json());

// app.get("/", (req, res, next) => {
//     res.send("I am Here!!!");
// });

app.use("/graphql", graphqlHTTP({
    schema: buildSchema(`

        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            // return [
            // "Romantic Cooking",
            // "Sailing",
            // "All night coding"
            // ];

            return events;
        },
        createEvent: (args) => {
            // dummy data echoed back to look like stored
            // const eventName = args.name;
            // return eventName;

            const event = {
                _id: Math.random().toString(),
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: args.eventInput.date
            }
            events.push(event);
            return event;
        }
        
    },
    graphiql: true
}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}!`));
