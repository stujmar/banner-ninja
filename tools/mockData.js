const courses = [
    {
        id: 1,
        title: "Securing React Apps",
        slug: "react-secure",
        authorId: 1,
        category: "JavaScript"
    },
    {
        id: 2,
        title: "React the Big Picture",
        slug: "react-big-picture",
        authorId: 1,
        category: "JavaScript"
    },
    {
        id: 3,
        title: "Reuse Components",
        slug: "react-comps",
        authorId: 1,
        category: "JavaScript"
    },
    {
        id: 4,
        title: "Dev ENV",
        slug: "react-dev-env",
        authorId: 1,
        category: "JavaScript"
    },
    {
        id: 5,
        title: "Hanging Salami",
        slug: "hanging-salami",
        authorId: 2,
        category: "JavaScript"
    },
    {
        id: 6,
        title: "Beefing Bananas",
        slug: "banana-beefs",
        authorId: 2,
        category: "JavaScript"
    }
];

const authors = [
    {id: 1, name: "Real Author"},
    {id: 2, name: "Joke Auther"},
    {id: 3, name: "Stuart Marsh"}
];

const newCourse = {
    id: null,
    title: "",
    authorId: null,
    category: ""
};

// Using CommonJS style export so we can consume vua Node (without using Babel-node)
module.exports = {
    newCourse,
    courses,
    authors
};