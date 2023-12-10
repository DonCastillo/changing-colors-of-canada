# Changing Colors of Canada

## Concept
I've been interested in the US Elections since 2020 when Donald Trump and Joe Biden ran for presidents in the most consequential presidential elections in the US history. I remember seing different graphical representations of the live results - from choropleth maps showing the winner per state and the degree of their victories; to line graphs showing the change of lead over time. The visuals and their interactivity made complex data easier to comprehend to nontechnical people.

For this assignment, I created an interactive time-based visual graphics that show the election results in Canada based on the number of seats (in the House of Commons) political parties won in a province or territory. But unlike the visual maps that I saw in the 2020 US elections, I decided to show the complete history of the results, starting from 1867 until the recent election year. It perfectly embodies the time and space concept of the assignment because it shows you the rise and fall of the support of a province or territory to a party over time. It shows you which party is dominating and trailing. Geographically, you can see how divisive or united the country was during elections.

## Implementation
The first part of the imlementation was data gathering. Through research, I collected the election results from all 44 election years and entered them to a spreadsheet. I only focused on the number of seats won (not popular vote) by each running party in a province/territory. The number of seats in the House of Commons determine the government and the prime minister. Then, I translated the spreadsheet data into JSON.

With the use of Svelte as JS and Tailwind as CSS frameworks, I developed a webpage the displays the Canadian map overlaid by container element representing a column. Inside the columns are nodes representing the running parties. Then, using GSAP, I was able to animate the height of the nodes based on the ratio of the seats won by the party (i.e. seats won / total provincial seats).

## GSAP Evaluation
GSAP, in total, was easy to use because it lets you animate common CSS properties without manually creating CSS keyframes. It can animate almost all CSS properties, which in this assignment, the height, background color, and opacity of the nodes. Transitioning from the previous CSS state to the next CSS state (upon clicking the election year buttons) simulate the rise and fall of support to the parties.

### Running the app locally
npm i to install the packages and dependencies  
npm run dev to run in development mode  
npm run dev -- --open to start the server and open the app in a new browser tab  
npm run build to create a production version of your app  
npm run preview to preview the production build
