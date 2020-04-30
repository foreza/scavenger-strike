
[![Netlify Status](https://api.netlify.com/api/v1/badges/30c21f69-2d23-41dc-ae8a-0f6acbb562f9/deploy-status)](https://app.netlify.com/sites/pedantic-bartik-1bec1c/deploys)

[![foreza](https://circleci.com/gh/foreza/scavenger-strike.svg?style=svg)](https://app.circleci.com/pipelines/github/foreza/scavenger-strike)


Currently accessible: https://pedantic-bartik-1bec1c.netlify.app/

# scavenger-strike
A basic app that allows for questions/answers and provides a final prize - if you can get all of the answers right in a row!

Currently hosted for free (with thanks) on netlify.



Types of Question/Answers supported:
- 0: Single Text Input (with optional character count limit) - Answer should be a string. 
- 1: Multiple Choice - Answer should be an integer number (for the correct index) 
- 2: Single Numeric Input - Answer should be a number.
- 3: Multiple Word Input - Answer should be an array of strings.

Sample Question Structure:
```

Text Input Question:

{
    "type" : 0,
    "questionPrompt" : "What makes bacon crispy?",
    "maxCharactersAllowed" : 40,
    "answer" : "fat"
}

Multiple Choice Question:

{
    "type" : 1,
    "questionPrompt" : "What is bacon?",
    "possibleOptions" : [
        "oil",
        "fat",
        "lard",
        "kfc"
    ],
    "answer" : "oil"
}


Numeric Input Question:

{
    "type" : 2,
    "questionPrompt" : "What temperature makes bacon crispy?",
    "answer" : 100
}

Multiple Word Question:

{
    "type" : 3,
    "questionPrompt" : "What is bacon?",
    "answer" : [
        "What",
        "is",
        "bacon"
    ] 
}




