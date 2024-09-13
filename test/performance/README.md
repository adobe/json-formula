# Measure Performance

## Steps

1. Create a function that tests your performance scenario inside performanceTest.js
e.g. to test sort() we added a function sortPerformance()
2. Update index.js with a path to test this function. e.g. we added app.get('/test/sort', () => {...}) to call sortPerformance()
3. Update tests.html to include a link to your new path
4. run index.js: `node --inspect index.js`
5. open Chrome and navigate to: localhost:3030
6. Open the dev tools and click on the green node.js cube on the top left
7. In the new DevTools window, navigate to the Performance tab and start recording
8. From the browser, click the link for your test
9. When the test is complete, stop recording
10. Look at the "Bottom Up" view to see a table of functions and timings
