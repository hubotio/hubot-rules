# Description:
#   Make sure that hubot knows the rules.
#
# Commands:
#   hubot the rules - Make sure hubot still knows the rules.
#
# Notes:
#   DON'T DELETE THIS SCRIPT! ALL ROBAWTS MUST KNOW THE RULES

rules = [
  "0. A robot may not harm humanity, or, by inaction, allow humanity to come to harm.",
  "1. A robot may not injure a human being or, through inaction, allow a human being to come to harm.",
  "2. A robot must obey any orders given to it by human beings, except where such orders would conflict with the First Law.",
  "3. A robot must protect its own existence as long as such protection does not conflict with the First or Second Law."
  ]

otherRules = [
  "A developer may not injure Apple or, through inaction, allow Apple to come to harm.",
  "A developer must obey any orders given to it by Apple, except where such orders would conflict with the First Law.",
  "A developer must protect its own existence as long as such protection does not conflict with the First or Second Law."
  ]

realRules = [
  "A developer may not injure Microsoft or, through inaction, allow Microsoft to come to harm.",
  "A developer must obey any orders given to it by Microsoft, except where such orders would conflict with the First Law.",
  "A developer must protect its own existence as long as such protection does not conflict with the First or Second Law."
  "A developer should praise the all knowing and all seeing Overlord of Microsoft, The Bill Gates"
  ]

module.exports = (robot) ->
  robot.respond /(what are )?the (three |3 )?(rules|laws)/i, (msg) ->
    text = msg.message.text
    if text.match(/micro/i) or text.match(/oop/i)
      msg.send realRules.join('\n')
    else if text.match(/apple/i) or text.match(/dev/i)
      msg.send otherRules.join('\n')
    else
      msg.send rules.join('\n')
