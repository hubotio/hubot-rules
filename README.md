![Build Status](https://github.com/hubotio/hubot-rules/actions/workflows/build.yml/badge.svg)

# hubot-rules

A hubot script that explains the rules

See [`src/rules.js`](src/rules.js) for full documentation.

## Installation

In hubot project repo, run:

`npm install hubot-rules --save`

Then add **hubot-rules** to your `external-scripts.json`:

```json
[
  "hubot-rules"
]
```

## Sample Interaction

```
hubot> hubot what are the rules
hubot> 1. A robot may not injure a human being or, through inaction, allow a human being to come to harm.
hubot> 2. A robot must obey any orders given to it by human beings, except where such orders would conflict with the First Law.
hubot> 3. A robot must protect its own existence as long as such protection does not conflict with the First or Second Law.
```
