In the live match header, omit the stadium and the league title. 
In the #file:MatchControlPanel.tsx consider the repsonsiveness/adaptiveness of the component.
- Reduce the paddings and let's have a 3 in a row even button in the SM screens
- Add icons in the match stats cards #file:MatchStats.tsx 
- Also be smart to make the fields for players names a select or <datalist> with search functionality.
- Also refactor the inputs for each event type so that e.g corner kicks don't need a player field instead we increment corner count and also other events - #file:MatchDetailPage.tsx 
- Match stats container needs to look have all type of stats 