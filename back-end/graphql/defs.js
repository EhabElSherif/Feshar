let Defs = `
# Enums
enum Type {ADMIN, GUEST, CRITIC}

enum Gender {MALE, FEMALE, OTHER}

enum Title {ACTOR, DIRECTOR}

# Types
type Genre {
    name: String
}

type Movie {
    name: String
    genres: [Genre]
    directors: [Person]
    producers: [Producer]
    parts: [Part]
    created_at: String
    cast: [Person]
    reviews: [Review]
    description: String
}

type Person {
    name: String
    gender: Gender
    title: Title
    image_url: String
    birth_date: String
    created_at: String
    nationality: Nationality
    description: String
}

type Nationality {
    name: String
}

type Producer {
    name: String
    owner: Person
    image_url: String
    birth_date: String
    created_at: String
    nationality: Nationality
    description: String
}

type Review {
    body: String
    rate: Float
    owner: User
    created_at: String
}

type Part {
    name: String
    image_url: String
    date: String
    part_number: Int
}

type Token {
    access: String
    token: String
}

type Name {
    first_name: String
    last_name: String
}

type User {
    username: String
    type: Type
    password: String
    email: String
    image_url: String
    phonenumber: String
    created_at: String
    tokens: [Token]
    name: Name
}

# inputs
input InputToken {
    access: String
    token: String
}

input InputName {
    first_name: String
    last_name: String
}

input UserSelectProperties {
    username: String
    email: String
}

input InputGenre {
    name: String
}

input InputNationality {
    name: String
}

input InputPerson {
    name: String
    gender: Gender
    title: Title
    image_url: String
    birth_date: String
    created_at: String
    nationality: InputNationality
    description: String
}

input InputProducer {
    name: String
    owner: InputPerson
    image_url: String
    birth_date: String
    created_at: String
    nationality: InputNationality
    description: String
}

input InputReview {
    body: String
    rate: Float
    owner: InputUser
    created_at: String
}

input InputUser {
    username: String
    type: Type
    password: String
    email: String
    image_url: String
    phonenumber: String
    created_at: String
    tokens: [InputToken]
    name: InputName
}

input InputMovie {
    name: String
    genres: [InputGenre]
    directors: [InputPerson]
    producers: [InputProducer]
    parts: [InputPart]
    created_at: String
    cast: [InputPerson]
    reviews: [InputReview]
    description: String
}

input InputMovieArrays {
    genres: [InputGenre]
    directors: [InputPerson]
    producers: [InputProducer]
    parts: [InputPart]
    cast: [InputPerson]
    reviews: [InputReview]
}

input InputMovieEdit {
    name: String
    created_at: String
    description: String
}

input InputPart {
    name: String
    image_url: String
    date: String
    part_number: Int
}

# Query
type Query {
    dump: String
}

# Mutation
type Mutation {
    dump: String
}
`;

module.exports = Defs;
